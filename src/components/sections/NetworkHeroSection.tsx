import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '../common/Breadcrumbs';

export const NetworkHeroSection: React.FC = () => {
  const handleScrollToNetwork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('explore-network');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] flex items-center overflow-hidden bg-px-deep text-white pt-28 pb-14 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
      {/* 1. FULL-WIDTH BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 select-none">
        <img
          src="/assets/images/network-hero-india.jpg"
          alt="Prisha Xpress Pan-India Transportation Network"
          fetchPriority="high"
          className="w-full h-full object-cover object-[74%_center] sm:object-[68%_center] md:object-[65%_center] lg:object-center filter brightness-[0.98] contrast-[1.02]"
        />

        {/* Desktop Left-to-Right Reading Gradient (deep dark purple behind text, right side map & truck crystal clear) */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#0e0018]/95 via-[#180128]/85 via-48% to-transparent pointer-events-none" />

        {/* Mobile & Tablet Vertical Reading Gradient (ensures ultra-sharp text contrast while keeping background visible) */}
        <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#0e0018]/92 via-[#180128]/85 to-[#0e0018]/90 pointer-events-none" />

        {/* Ambient Purple Light Blob behind Text */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-purple-700/30 blur-3xl pointer-events-none" />

        {/* Subtle Bottom Transition to White Section */}
        <div className="absolute bottom-0 left-0 right-0 h-10 sm:h-14 bg-gradient-to-t from-white via-white/30 to-transparent pointer-events-none" />
      </div>

      {/* 2. LIGHTWEIGHT ANIMATED VISUAL ENHANCEMENTS OVER MAP & ROUTES */}
      {/* Glowing Ambient Halo over India Map */}
      <motion.div
        animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.96, 1.04, 0.96] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[6%] right-[4%] sm:right-[6%] lg:right-[8%] w-64 h-64 sm:w-80 sm:h-80 lg:w-[420px] lg:h-[420px] rounded-full bg-purple-500/25 blur-3xl pointer-events-none z-[1]"
      />

      {/* Subtle Animated Route Streams along Map Orbits (Desktop/Tablet) */}
      <svg
        className="hidden md:block absolute top-[8%] right-[2%] lg:right-[4%] w-[460px] lg:w-[520px] h-[330px] pointer-events-none z-[2]"
        viewBox="0 0 520 330"
        fill="none"
        aria-hidden="true"
      >
        <motion.ellipse
          cx="260"
          cy="165"
          rx="195"
          ry="80"
          transform="rotate(-15 260 165)"
          stroke="url(#routeStream1)"
          strokeWidth="1.5"
          strokeDasharray="14 180"
          animate={{ strokeDashoffset: [0, -380] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'linear' }}
          opacity="0.8"
        />
        <motion.ellipse
          cx="260"
          cy="165"
          rx="165"
          ry="92"
          transform="rotate(22 260 165)"
          stroke="url(#routeStream2)"
          strokeWidth="1.5"
          strokeDasharray="16 160"
          animate={{ strokeDashoffset: [0, -340] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          opacity="0.7"
        />
        <defs>
          <linearGradient id="routeStream1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#C084FC" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#7200B8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="routeStream2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#A855F7" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#68139A" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Gentle Pulsing Location Pin Rings Aligned with Map Nodes */}
      <div className="hidden md:block absolute inset-0 pointer-events-none z-[2]" aria-hidden="true">
        {/* Northern Region (Delhi NCR) */}
        <div className="absolute top-[22%] right-[24%] lg:right-[22%]">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-70" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-200/50 border border-white/60" />
          </span>
        </div>
        {/* Western Region (Pune HQ / Mumbai) */}
        <div className="absolute top-[34%] right-[29%] lg:right-[27%]">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-300/60 border border-white/80 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          </span>
        </div>
        {/* Southern Region (Bengaluru / Chennai) */}
        <div className="absolute top-[44%] right-[26%] lg:right-[24%]">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-70" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-200/50 border border-white/60" />
          </span>
        </div>
        {/* Eastern Region (Kolkata) */}
        <div className="absolute top-[28%] right-[16%] lg:right-[15%]">
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-70" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-purple-200/50 border border-white/60" />
          </span>
        </div>
        {/* North-Eastern Region (Guwahati) */}
        <div className="absolute top-[23%] right-[8%] lg:right-[9%]">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-300 opacity-60" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-200/40 border border-white/50" />
          </span>
        </div>
      </div>

      {/* Subtle Truck Headlight Shimmer on Highway (Desktop) */}
      <motion.div
        animate={{ opacity: [0.15, 0.35, 0.15], x: [0, 6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute bottom-[18%] right-[24%] w-60 h-14 bg-gradient-to-r from-transparent via-purple-300/20 to-white/20 blur-xl pointer-events-none z-[1]"
        aria-hidden="true"
      />

      {/* 3. HTML CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text & CTA Content */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-4 sm:space-y-5">
            {/* Breadcrumbs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Breadcrumbs
                items={[{ label: 'Our Network' }]}
                theme="dark"
                className="bg-black/40 text-white border-white/30 shadow-md font-semibold"
              />
            </motion.div>

            {/* Small Label / Eyebrow Badge (Pure bright white text for maximum readability) */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/30 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-white shadow-md drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>OUR NETWORK | PAN-INDIA TRANSPORTATION</span>
              </span>
            </motion.div>

            {/* Main Heading (Pure crisp white with subtle drop-shadow) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[30px] sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.14] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            >
              Connecting Businesses Across India
            </motion.h1>

            {/* Description (Pure bright solid white text with drop-shadow for 100% crystal clear visibility) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-[16px] sm:text-[17px] lg:text-[19px] text-white font-medium leading-relaxed max-w-xl drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]"
            >
              Prisha Xpress helps businesses transport goods across India. We work to make transportation simple, safe and reliable, with proper vehicle planning and delivery coordination.
            </motion.p>

            {/* CTA Button & Supporting Line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="pt-2 sm:pt-3 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href="#explore-network"
                  onClick={handleScrollToNetwork}
                  className="group inline-flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 rounded-2xl bg-gradient-to-r from-px-primary via-purple-600 to-px-primary hover:from-purple-600 hover:to-px-primary text-white text-sm sm:text-base font-bold shadow-xl shadow-purple-950/60 hover:shadow-purple-700/60 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 w-full sm:w-auto border border-white/20"
                >
                  <span className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Explore Our Network</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300 text-white shrink-0" />
                </a>

                {/* Supporting Line (Pure bright white text) */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  <span>One Network. Nationwide Transportation.</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Open Space on Desktop to Showcase India Map & Truck */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-6 pointer-events-none min-h-[360px]" />
        </div>
      </div>
    </section>
  );
};
