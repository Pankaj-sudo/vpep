/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, LogOut, ClipboardList, Settings, Dna, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ADMIN_EMAILS } from '../products.ts';


interface HeaderProps {
  currentView: 'shop' | 'track' | 'orders' | 'admin' | 'coa';
  setCurrentView: (view: 'shop' | 'track' | 'orders' | 'admin' | 'coa') => void;
  cartCount: number;
  openCart: () => void;
  user: any;
  setTrackOrderId: (id: string) => void;
  wishlistCount: number;
  openWishlist: () => void;
  onSignIn: () => void;
  onSignOut: () => void;
}

export default function Header({
  currentView,
  setCurrentView,
  cartCount,
  openCart,
  user,
  setTrackOrderId,
  wishlistCount,
  openWishlist,
  onSignIn,
  onSignOut
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // Scroll-aware state: transparent at top, blurred+solid on scroll
  const [scrolled, setScrolled] = useState(false);

  const isAdmin = user && ADMIN_EMAILS.map(e => e.toLowerCase()).includes((user.email || '').toLowerCase());

  // ─── Scroll-aware background transition ────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    onSignIn();
  };

  const handleSignOut = () => {
    onSignOut();
    setDropdownOpen(false);
  };


  const handleNavigate = (view: 'shop' | 'track' | 'orders' | 'admin' | 'coa') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-500 ${
        scrolled
          ? 'border-[#1E2D45] bg-[#0A0F1E]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.08)]'
          : 'border-transparent bg-[#0A0F1E]/60 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <motion.div 
          onClick={() => handleNavigate('shop')} 
          className="flex cursor-pointer items-center space-x-3 group"
          id="nav-logo"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
          <div className="flex h-8 w-8 rounded-full border-2 border-accent items-center justify-center relative transition-all duration-300 group-hover:rotate-45">
            <div className="w-3.5 h-3.5 bg-accent rounded-sm rotate-45" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold tracking-tighter uppercase text-white flex items-center">
              Vita<span className="text-accent">Pep</span>
            </h1>
            <p className="hidden md:block text-[8px] font-mono text-[#8896B3] mt-[-3px] tracking-[0.2em] uppercase">
              Precision Peptides
            </p>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {[
            { id: 'nav-shop',  label: 'Shop Peptides',  view: 'shop'   as const },
            { id: 'nav-track', label: 'Track Order',    view: 'track'  as const },
            ...(user ? [{ id: 'nav-my-orders', label: 'My Orders', view: 'orders' as const }] : []),
          ].map(item => (
            <motion.button
              key={item.id}
              id={item.id}
              onClick={() => handleNavigate(item.view)}
              className={`nav-link-animated px-4 py-2 rounded-lg text-xs font-semibold tracking-widest uppercase transition-colors duration-200 cursor-pointer ${
                currentView === item.view
                  ? 'text-accent font-bold active'
                  : 'text-[#8896B3] hover:text-white'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {item.label}
            </motion.button>
          ))}

          {isAdmin && (
            <motion.button
              id="nav-admin"
              onClick={() => handleNavigate('admin')}
              className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-all duration-200 cursor-pointer ${
                currentView === 'admin' ? 'border-accent/50 bg-accent/10' : ''
              }`}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span className="flex items-center space-x-1">
                <Settings className="h-3 w-3 animate-spin-slow" />
                <span>Admin Console</span>
              </span>
            </motion.button>
          )}
        </nav>

        {/* Desktop Action Buttons (Cart + Profile) */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Wishlist Icon */}
          <motion.button
            id="header-wishlist-btn"
            onClick={openWishlist}
            className="relative p-2 rounded-full border border-[#1E2D45] bg-[#111827]/50 text-[#8896B3] hover:text-white hover:border-accent/40 hover:bg-[#1E2D45] transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <Heart className={`h-4.5 w-4.5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            <AnimatePresence>
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white leading-none"
                >
                  {wishlistCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Cart Icon */}
          <motion.button
            id="header-cart-btn"
            onClick={openCart}
            className="relative p-2 rounded-full border border-[#1E2D45] bg-[#111827]/50 text-[#8896B3] hover:text-white hover:border-accent/40 hover:bg-[#1E2D45] transition-colors duration-300 cursor-pointer"
            whileHover={{ scale: 1.1, y: -1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-bg-deep leading-none"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <motion.button
                id="user-avatar-dropdown-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#1E2D45] bg-[#111827]/50 hover:bg-[#1E2D45] hover:border-accent/30 transition-colors duration-300 text-xs font-semibold uppercase tracking-wider text-white cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="max-w-[100px] truncate">
                  {user.displayName?.split(' ')[0] || 'User'}
                </span>
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setDropdownOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 mt-2 w-52 origin-top-right rounded-xl border border-[#1E2D45] bg-[#111827] p-1.5 shadow-2xl z-40"
                    >
                      <div className="px-3 py-2 border-b border-[#1E2D45] mb-1">
                        <p className="text-xs font-semibold text-white max-w-full truncate">{user.displayName}</p>
                        <p className="text-[9px] font-mono text-[#8896B3] truncate mt-0.5">{user.email}</p>
                      </div>

                      <button
                        onClick={() => { handleNavigate('orders'); setDropdownOpen(false); }}
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#8896B3] hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer"
                      >
                        <ClipboardList className="h-4 w-4 text-accent" />
                        <span>My Purchases</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => { handleNavigate('admin'); setDropdownOpen(false); }}
                          className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-[#8896B3] hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer"
                        >
                          <Settings className="h-4 w-4 text-accent" />
                          <span>Admin Console</span>
                        </button>
                      )}

                      <button
                        onClick={handleSignOut}
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-danger hover:bg-danger/10 transition-all mt-1 cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.button
              id="header-sign-in-btn"
              onClick={handleSignIn}
              className="px-4 py-2 border border-[#1E2D45] rounded-full text-xs font-semibold hover:bg-[#1E2D45] flex items-center uppercase tracking-wider text-white hover:border-accent/40 hover:shadow-[0_0_15px_rgba(0,212,255,0.1)] transition-all duration-300 cursor-pointer bg-[#111827]/50"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              <span>Sign In with Google</span>
            </motion.button>
          )}
        </div>

        {/* Mobile menu button & Mobile Cart */}
        <div className="flex items-center space-x-3.5 md:hidden">
          {/* Mobile Wishlist */}
          <motion.button
            onClick={openWishlist}
            className="relative p-2 rounded-lg border border-border bg-bg-card text-text-muted hover:text-white transition-all cursor-pointer"
            id="mobile-wishlist-btn"
            whileTap={{ scale: 0.88 }}
          >
            <Heart className={`h-5 w-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white leading-none">
                {wishlistCount}
              </span>
            )}
          </motion.button>

          {/* Mobile Cart */}
          <motion.button
            onClick={openCart}
            className="relative p-2 rounded-lg border border-border bg-bg-card text-text-muted hover:text-white transition-all cursor-pointer"
            id="mobile-cart-btn"
            whileTap={{ scale: 0.88 }}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-bg-deep leading-none">
                {cartCount}
              </span>
            )}
          </motion.button>

          {/* Toggle */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg border border-border bg-bg-card text-text-muted hover:text-white transition-all cursor-pointer"
            id="mobile-menu-toggle"
            whileTap={{ scale: 0.88 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen
                ? <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}><X className="h-5 w-5" /></motion.span>
                : <motion.span key="open"  initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}><Menu className="h-5 w-5" /></motion.span>
              }
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Drawer menu — spring height animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-border bg-bg-deep overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-4 space-y-3">
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: 'Shop Peptides', view: 'shop'   as const },
                  { label: 'Track Order',   view: 'track'  as const },
                  ...(user ? [{ label: 'My Orders', view: 'orders' as const }] : []),
                ].map((item, i) => (
                  <motion.button
                    key={item.view}
                    onClick={() => handleNavigate(item.view)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full py-2.5 px-4 text-left rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      currentView === item.view
                        ? 'bg-accent/10 border border-accent/20 text-accent font-semibold'
                        : 'text-text-muted hover:bg-bg-card hover:text-white'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}

                {isAdmin && (
                  <button
                    onClick={() => handleNavigate('admin')}
                    className={`w-full py-3 px-4 text-left rounded-lg text-sm font-semibold border border-accent/30 bg-accent/5 text-accent cursor-pointer`}
                  >
                    Admin Control Panel
                  </button>
                )}
              </div>

              <div className="pt-4 border-t border-border/60">
                {user ? (
                  <div className="flex items-center justify-between bg-bg-card p-3 rounded-xl border border-border">
                    <div className="flex items-center space-x-3">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName}
                          className="h-9 w-9 rounded-full object-cover border border-accent/20"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
                          <User className="h-5 w-5 text-accent" />
                        </div>
                      )}
                      <div className="max-w-[130px] truncate">
                        <p className="text-xs font-semibold text-white truncate">{user.displayName}</p>
                        <p className="text-[10px] font-mono text-text-muted truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 border border-danger/30 rounded-lg text-danger hover:bg-danger/10 transition-all cursor-pointer"
                      title="Sign Out"
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleSignIn}
                    className="w-full py-3 rounded-lg bg-accent text-bg-deep font-bold text-center hover:bg-accent-dim shadow-[0_0_15px_rgba(0,212,255,0.2)] transition-all flex items-center justify-center cursor-pointer"
                  >
                    <svg className="h-4.5 w-4.5 mr-2.5 flex-shrink-0" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                    </svg>
                    <span>Sign In with Google</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
