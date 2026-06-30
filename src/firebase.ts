/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect,
  getRedirectResult,
  signOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDocFromServer, 
  collection, 
  setDoc, 
  getDoc, 
  getDocs, 
  updateDoc, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase client
const app = initializeApp(firebaseConfig);
export const db = firebaseConfig.firestoreDatabaseId ? getFirestore(app, firebaseConfig.firestoreDatabaseId) : getFirestore(app); /* CRITICAL: The app will break without this line */
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Error logging specifications mandated by the system
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Validation constraint upon startup
export async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection verified and active ✔");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase reported client is offline. Verify configuration and sandbox ingress networks.");
    } else {
      console.log("Firebase connection tested successfully.");
    }
  }
}

// Run connection validation immediately
testConnection();

// --- Auth readiness gate ---
// Resolves once onAuthStateChanged fires for the first time, meaning the
// Firebase Auth SDK has finished loading any persisted credentials.
// This prevents Firestore writes from racing ahead of token propagation.
let _authReadyResolve: (user: FirebaseUser | null) => void;
export const authReadyPromise: Promise<FirebaseUser | null> = new Promise((resolve) => {
  _authReadyResolve = resolve;
});

const _unsubAuthReady = onAuthStateChanged(auth, (user) => {
  _authReadyResolve(user);
  _unsubAuthReady(); // Only need the first emission
});

// Handle redirect result AFTER auth is ready (for signInWithRedirect fallback on mobile)
// This replaces the old top-level getRedirectResult() call that fired before auth was initialized.
export async function handleRedirectResult(): Promise<FirebaseUser | null> {
  // Wait until Firebase Auth has fully loaded any persisted credentials
  await authReadyPromise;

  try {
    const result = await getRedirectResult(auth);
    if (result?.user) {
      console.log('[Firebase] Redirect sign-in successful:', result.user.displayName);
      await syncUserProfile(result.user);
      return result.user;
    }
  } catch (error: any) {
    console.warn('[Firebase] Redirect result error (may be safe to ignore):', error?.code);
  }
  return null;
}

// Sync authenticated user profile data with Firestore
// Includes retry-once logic for permission-denied errors (covers mobile redirect token propagation delays)
export async function syncUserProfile(user: any, _retryCount = 0) {
  if (!user) return;

  // Ensure the user's ID token is fresh before writing
  try {
    await user.getIdToken(/* forceRefresh */ true);
  } catch (tokenErr) {
    console.warn('[Firebase] Token refresh failed, proceeding with existing token:', tokenErr);
  }

  const userRef = doc(db, 'users', user.uid);
  
  try {
    // Attempt to read existing profile
    const snap = await getDoc(userRef);
    if (!snap.exists()) {
      // First-time registration
      const newUserPayload = {
        userId: user.uid,
        name: user.displayName || 'Anonymous Researcher',
        email: user.email || '',
        photoURL: user.photoURL || '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      await setDoc(userRef, newUserPayload);
    } else {
      // Existing profile update
      await setDoc(userRef, {
        name: user.displayName || snap.data()?.name || 'Anonymous Researcher',
        photoURL: user.photoURL || snap.data()?.photoURL || '',
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
  } catch (error: any) {
    // Retry once after a delay for permission-denied errors
    // This covers edge cases where the auth token hasn't fully propagated to Firestore yet
    const isPermissionDenied = error?.code === 'permission-denied' 
      || (error?.message && error.message.includes('Missing or insufficient permissions'));
    
    if (isPermissionDenied && _retryCount < 1) {
      console.warn(`[Firebase] Permission denied on syncUserProfile (attempt ${_retryCount + 1}), retrying in 1.5s...`);
      await new Promise(resolve => setTimeout(resolve, 1500));
      return syncUserProfile(user, _retryCount + 1);
    }

    try {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    } catch (fErr) {
      console.warn("Could not sync user profile in database due to rule constraints:", fErr);
    }
  }
}

// Fetch user profile
export async function fetchUserProfile(uid: string) {
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    try {
      handleFirestoreError(error, OperationType.GET, `users/${uid}`);
    } catch (fErr) {
      console.warn("Could not fetch user profile from database due to rule constraints:", fErr);
    }
    return null;
  }
}

// Helpers for Auth
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await syncUserProfile(result.user);
    return result.user;
  } catch (err: any) {
    const errorCode = err?.code || '';
    console.error("Google authentication failed in SDK:", err);
    
    // If popup is blocked or unauthorized domain, fall back to redirect-based auth
    if (
      errorCode === 'auth/popup-blocked' ||
      errorCode === 'auth/unauthorized-domain' ||
      errorCode === 'auth/operation-not-supported-in-this-environment'
    ) {
      console.log('[Firebase] Falling back to signInWithRedirect...');
      await signInWithRedirect(auth, googleProvider);
      return null;
    }
    throw err;
  }
};

export const signInWithGoogle = loginWithGoogle;

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const logOut = logoutUser;

