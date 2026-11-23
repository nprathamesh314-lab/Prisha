import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2 } from 'lucide-react';

interface NetworkLogisticsVideoProps {
  className?: string;
}

export const NetworkLogisticsVideo: React.FC<NetworkLogisticsVideoProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [inView, setInView] = useState(false);

  // Viewport & Battery Optimization: Auto play when visible, pause when scrolled away
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (videoRef.current) {
          if (entry.isIntersecting && !prefersReducedMotion) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          } else {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);

    // Pause immediately if browser tab is switched or minimized
    const handleVisibility = () => {
      if (document.hidden && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else if (!document.hidden && videoRef.current && inView && !prefersReducedMotion) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [inView]);

  // Toggle Play/Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Toggle Mute
  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Fullscreen helper
  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`relative w-full max-w-5xl mx-auto my-8 sm:my-12 ${className}`}
    >
      {/* Outer Glow & Premium Frame */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-slate-950 ring-1 ring-purple-500/25">
        
        {/* 16:9 Responsive Video Container */}
        <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
          <video
            ref={videoRef}
            src="/assets/videos/prisha-logistics-network.mp4"
            poster="/assets/images/network-map.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => setIsVideoLoaded(true)}
            onError={() => setHasError(true)}
            className="w-full h-full object-cover block"
            aria-label="Prisha Xpress Logistics Animation - Pan-India Commercial Fleet & Air Network"
          />

          {/* Loading Skeleton Indicator (Fades out when video is ready) */}
          {!isVideoLoaded && !hasError && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center transition-opacity duration-300">
              <div className="w-10 h-10 border-3 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Fallback Static Poster in case video is unsupported */}
          {hasError && (
            <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center text-white p-6 text-center">
              <img
                src="/assets/images/network-map.jpg"
                alt="Prisha Xpress Logistics Network"
                className="absolute inset-0 w-full h-full object-cover opacity-75"
              />
              <div className="relative z-10 max-w-md bg-slate-950/80 p-5 rounded-2xl border border-white/20">
                <p className="text-sm font-bold text-white">Prisha Xpress Transport Network</p>
                <p className="text-xs text-gray-300 mt-1">
                  Connecting cities across India through monitored road and air transport corridors.
                </p>
              </div>
            </div>
          )}

          {/* Discreet, Elegant Video Controls Overlay (Bottom Right Corner) */}
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-20 flex items-center gap-2">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-md transition-all cursor-pointer hover:scale-105"
              title={isPlaying ? 'Pause video' : 'Play video'}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300" />
              ) : (
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 fill-emerald-400" />
              )}
            </button>

            {/* Mute/Unmute Toggle */}
            <button
              type="button"
              onClick={toggleMute}
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-md transition-all cursor-pointer hover:scale-105"
              title={isMuted ? 'Unmute sound' : 'Mute sound'}
              aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? (
                <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
              ) : (
                <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
              )}
            </button>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={handleFullscreen}
              className="hidden sm:inline-flex p-2 sm:p-2.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md border border-white/20 shadow-md transition-all cursor-pointer hover:scale-105"
              title="Fullscreen"
              aria-label="View Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
