import React, { useState, useEffect, useRef } from 'react';

interface YoutubeHeroBackgroundProps {
  videoId: string;
  opacity?: number;
}

export const YoutubeHeroBackground: React.FC<YoutubeHeroBackgroundProps> = ({
  videoId,
  opacity = 0.45,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Build the embed URL with all required parameters for background playback
  const embedUrl = `https://www.youtube.com/embed/${videoId}?` + new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    rel: '0',
    showinfo: '0',
    iv_load_policy: '3',
    modestbranding: '1',
    loop: '1',
    playlist: videoId,    // Required for loop to work with single video
    fs: '0',
    autohide: '1',
    playsinline: '1',
    disablekb: '1',
    enablejsapi: '0',    // No API needed — simpler & more reliable
    origin: window.location.origin,
  }).toString();

  // Fade in after iframe loads
  const handleLoad = () => {
    // Small delay to let the video buffer and start playing
    setTimeout(() => setIsLoaded(true), 800);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Retry mechanism: if iframe doesn't report loaded after 8s, force show it
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded && !hasError) {
        setIsLoaded(true);
      }
    }, 8000);
    return () => clearTimeout(timer);
  }, [isLoaded, hasError]);

  if (hasError) return null;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0">
      {/* YouTube iframe scaled to cover viewport without letterboxing */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full aspect-video"
        style={{
          width: 'auto',
          height: 'auto',
          opacity: isLoaded ? opacity : 0,
          transition: 'opacity 1.5s ease-in-out',
        }}
      >
        <iframe
          ref={iframeRef}
          src={embedUrl}
          title="Background video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={false}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          className="w-full h-full border-0 pointer-events-none"
          style={{
            border: 'none',
            pointerEvents: 'none',
          }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </div>

      {/* Click-blocker overlay to prevent any interaction with the iframe */}
      <div className="absolute inset-0 z-[1]" />
    </div>
  );
};
