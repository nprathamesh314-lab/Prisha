// PRISHA XPRESS PVT. LTD. - SERVICE STATION HERO SECTION
// ROUTE: /services/service-station
// "KEEP YOUR TRUCKS & FLEET READY ON THE HIGHWAY" - SIMPLE INDIAN ENGLISH COPY
// INTERACTIVE PURPLE CENTER CARD: SUBTLE 3D TILT, DYNAMIC GLOW SHIFT, MOBILE TOUCH FEEDBACK
// DUAL ACTION BUTTONS: BOOK SERVICE ENQUIRY WITH ARROW SLIDE & DIRECT PHONE CALL

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Wrench,
  ShieldCheck,
  Cog,
  ArrowRight,
  Sparkles,
  Phone,
  Zap,
} from 'lucide-react';
import { Breadcrumbs } from '../../common/Breadcrumbs';

const heroTranslations = {
  en: {
    badge: 'Pune Fleet Service & Maintenance',
    title: 'Keep Your Trucks & Fleet Ready on the Highway',
    desc: 'Book regular truck checkups, priority service lanes, or company AMC plans at our Pune service station. Fast turnaround so your vehicles spend less time waiting and more time on the road.',
    btnPrimary: 'Book Service Enquiry',
    btnCall: 'Call +91 7276897727',
    quickPills: [
      { text: 'Priority Highway Service Lanes', icon: Zap },
      { text: 'Multi-Axle Inspection Pits', icon: Wrench },
      { text: 'Company Fleet AMC Plans', icon: ShieldCheck },
    ],
    highlights: [
      {
        title: 'Vehicle Maintenance',
        desc: 'Regular servicing and maintenance support for commercial vehicles.',
        icon: Wrench,
      },
      {
        title: 'Vehicle Inspection',
        desc: 'Checking important vehicle parts to support safe and smooth operations.',
        icon: ShieldCheck,
      },
      {
        title: 'Spare Parts Support',
        desc: 'Support with vehicle parts and maintenance requirements.',
        icon: Cog,
      },
    ],
    activeBays: 'Dedicated commercial workshop pits for heavy multi-axle trucks in Pune',
  },
  hi: {
    badge: 'पुणे फ्लीट सर्विस और मेंटेनेंस',
    title: 'अपने ट्रकों और बेड़े को हाईवे पर तैयार रखें',
    desc: 'हमारे पुणे सर्विस स्टेशन पर नियमित ट्रक चेकअप, प्राथमिकता सर्विस लेन, या कंपनी AMC प्लान बुक करें। तेज़ टर्नअराउंड ताकि आपके वाहन कम समय प्रतीक्षा करें और अधिक समय सड़क पर रहें।',
    btnPrimary: 'सर्विस पूछताछ बुक करें',
    btnCall: 'कॉल करें +91 7276897727',
    quickPills: [
      { text: 'प्राथमिकता हाईवे सर्विस लेन', icon: Zap },
      { text: 'मल्टी-एक्सल इंस्पेक्शन पिट', icon: Wrench },
      { text: 'कंपनी फ्लीट AMC प्लान', icon: ShieldCheck },
    ],
    highlights: [
      {
        title: 'वाहन रखरखाव',
        desc: 'कमर्शियल वाहनों के लिए नियमित सर्विसिंग और रखरखाव सहायता।',
        icon: Wrench,
      },
      {
        title: 'वाहन निरीक्षण',
        desc: 'सुरक्षित और सुचारू संचालन में सहायता के लिए महत्वपूर्ण वाहन भागों की जांच।',
        icon: ShieldCheck,
      },
      {
        title: 'स्पेयर पार्ट्स सहायता',
        desc: 'वाहन के पुर्जों और रखरखाव आवश्यकताओं में सहायता।',
        icon: Cog,
      },
    ],
    activeBays: 'पुणे में कमर्शियल वर्कशॉप पिट्स और प्रशिक्षित हैवी-व्हीकल मैकेनिक',
  },
  mr: {
    badge: 'पुणे ताफा सर्व्हिस आणि देखभाल',
    title: 'तुमचे ट्रक्स आणि ताफा महामार्गावर सदैव सज्ज ठेवा',
    desc: 'आमच्या पुणे सर्व्हिस स्टेशनवर नियमित ट्रक तपासणी, प्राधान्य सर्व्हिस लेन किंवा कंपनी AMC प्लॅन बुक करा. जलद टर्नअराउंडमुळे तुमची वाहने कमी वेळ थांबतील आणि अधिक वेळ रस्त्यावर धावतील.',
    btnPrimary: 'सर्व्हिस चौकशी नोंदवा',
    btnCall: 'कॉल करा +91 7276897727',
    quickPills: [
      { text: 'प्राधान्य महामार्ग सर्व्हिस लेन', icon: Zap },
      { text: 'मल्टी-एक्सल तपासणी खड्डे', icon: Wrench },
      { text: 'कंपनी ताफा AMC योजना', icon: ShieldCheck },
    ],
    highlights: [
      {
        title: 'वाहन देखभाल',
        desc: 'व्यावसायिक वाहनांसाठी नियमित सर्व्हिसिंग आणि देखभाल सहाय्य.',
        icon: Wrench,
      },
      {
        title: 'वाहन तपासणी',
        desc: 'सुरक्षित आणि सुरळीत कामकाजासाठी महत्त्वाच्या वाहन भागांची तपासणी.',
        icon: ShieldCheck,
      },
      {
        title: 'सुटे भाग सहाय्य',
        desc: 'वाहनांचे सुटे भाग आणि देखभाल गरजांमध्ये सातत्यपूर्ण मदत.',
        icon: Cog,
      },
    ],
    activeBays: 'पुण्यामध्ये कमर्शियल वर्कशॉप खड्डे आणि प्रशिक्षित अवजड वाहन मेकॅनिक',
  },
};

export const StationHero: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const shouldReduceMotion = useReducedMotion();

  // Desktop interactive 3D tilt & dynamic glow tracking
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number; isHovered: boolean }>({
    x: 0,
    y: 0,
    isHovered: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5
    setMouseOffset({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0, isHovered: false });
  };

  // Detect language changes from document or localStorage
  useEffect(() => {
    const detectLang = () => {
      const docLang = document.documentElement.lang?.slice(0, 2).toLowerCase();
      const stored = localStorage.getItem('px_selected_language')?.toLowerCase();
      if (stored === 'hi' || docLang === 'hi') setLang('hi');
      else if (stored === 'mr' || docLang === 'mr') setLang('mr');
      else setLang('en');
    };

    detectLang();
    window.addEventListener('languagechange', detectLang);
    return () => window.removeEventListener('languagechange', detectLang);
  }, []);

  const t = heroTranslations[lang] || heroTranslations.en;

  // Staggered entrance animation variants (respecting prefers-reduced-motion)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const rightPanelVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-28 pb-16 lg:py-24 overflow-hidden text-white">
      {/* =========================================================================
          1. LAYER 1: Full-Width Real Commercial Service Station Workshop Photography
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/assets/images/service-station.jpg"
          alt="Prisha Xpress Commercial Vehicle Service Station and Heavy Trucks"
          className="w-full h-full object-cover object-[65%_center] md:object-center filter brightness-100 contrast-105"
          initial={false}
          animate={
            shouldReduceMotion
              ? { scale: 1 }
              : { scale: [1, 1.04, 1] }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* =========================================================================
            2. LAYER 2: Balanced 20-30% Purple Brand Overlays & Ambient Shimmer
            ========================================================================= */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A052E]/80 via-[#2A0845]/55 to-[#1A052E]/35 hidden md:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A052E]/90 via-[#2A0845]/65 to-[#1A052E]/35 md:hidden pointer-events-none" />

        {/* Ambient moving light shimmer */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent skew-x-12 pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              repeat: Infinity,
              duration: 14,
              ease: 'linear',
            }}
          />
        )}
      </div>

      {/* Ambient background glow orbs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* =========================================================================
          3. LAYER 3: Main Content Grid (Left: Interactive Purple Card; Right: Capabilities)
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Breadcrumbs Navigation */}
        <div className="mb-4 sm:mb-6 flex justify-start">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Service Station' },
            ]}
            theme="dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* =========================================================================
              LEFT COLUMN: Interactive Purple Glassmorphic Card (7 cols)
              Responsive 3D Tilt on Desktop, Dynamic Glow Shift, Mobile Touch Feedback
              ========================================================================= */}
          <div className="lg:col-span-7">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.995 }}
              style={{
                perspective: 1000,
                transformStyle: 'preserve-3d',
              }}
              animate={
                shouldReduceMotion || !mouseOffset.isHovered
                  ? { rotateX: 0, rotateY: 0 }
                  : {
                      rotateX: -mouseOffset.y * 5, // subtle max ~2.5 degrees
                      rotateY: mouseOffset.x * 5,  // subtle max ~2.5 degrees
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 22,
              }}
              className="relative p-6 sm:p-9 lg:p-11 rounded-[28px] bg-[#1A052E]/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:border-white/30 transition-colors duration-300 space-y-5 sm:space-y-6 text-white overflow-hidden group select-none"
            >
              {/* Dynamic Ambient Purple Glow Layer shifting with mouse */}
              {!shouldReduceMotion && mouseOffset.isHovered && (
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(550px circle at ${(mouseOffset.x + 0.5) * 100}% ${(mouseOffset.y + 0.5) * 100}%, rgba(168, 85, 247, 0.22), transparent 70%)`,
                  }}
                />
              )}

              {/* Shifting Top Glass Reflection Highlight */}
              <div
                className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-[28px] pointer-events-none transition-transform duration-300"
                style={
                  !shouldReduceMotion && mouseOffset.isHovered
                    ? { transform: `translate3d(${mouseOffset.x * 12}px, ${mouseOffset.y * 8}px, 0)` }
                    : undefined
                }
              />

              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="relative z-10 space-y-5 sm:space-y-6"
              >
                {/* 1. Pill Badge */}
                <motion.div variants={itemVariants} className="flex justify-start">
                  <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 shadow-sm hover:bg-white/20 hover:border-purple-300/40 transition-all cursor-default">
                    <Wrench className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-300 animate-pulse" />
                    <span>{t.badge}</span>
                  </span>
                </motion.div>

                {/* 2. Main Heading (Pure Crisp White, High Contrast) */}
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.18] drop-shadow-md"
                >
                  Keep Your Trucks & Fleet{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-amber-200">
                    Ready on the Highway
                  </span>
                </motion.h1>

                {/* 3. Subtitle (Light Lavender with Strong Contrast Against Background) */}
                <motion.p
                  variants={itemVariants}
                  className="text-sm sm:text-base md:text-lg text-purple-100/95 font-normal leading-relaxed max-w-2xl drop-shadow-xs"
                >
                  {t.desc}
                </motion.p>

                {/* 4. Interactive Quick-Focus Pills */}
                <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 pt-1">
                  {t.quickPills.map((pill, idx) => {
                    const PillIcon = pill.icon;
                    return (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/18 border border-white/15 hover:border-purple-300/50 text-xs font-semibold text-purple-100 hover:text-white backdrop-blur-sm transition-all duration-200 cursor-default hover:scale-[1.02] shadow-2xs"
                      >
                        <PillIcon className="w-3.5 h-3.5 text-purple-300 shrink-0" />
                        <span>{pill.text}</span>
                      </span>
                    );
                  })}
                </motion.div>

                {/* 5. Action Buttons (Primary & Secondary) */}
                <motion.div
                  variants={itemVariants}
                  className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
                >
                  {/* Primary Button: Book Service Enquiry → with smooth arrow slide on hover */}
                  <Link
                    to="/contact?service=vehicle-servicing#enquiry"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 sm:py-4 rounded-xl bg-white hover:bg-purple-50 text-px-primary font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
                  >
                    <span>{t.btnPrimary}</span>
                    <ArrowRight className="w-4 h-4 text-px-primary group-hover:translate-x-1.5 transition-transform duration-200" />
                  </Link>

                  {/* Secondary Button: Call +91 7276897727 with gentle press/scale effect */}
                  <a
                    href="tel:+917276897727"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 sm:py-4 rounded-xl bg-white/12 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm shadow-md hover:-translate-y-0.5 active:scale-95 transition-all duration-300 group"
                  >
                    <Phone className="w-4 h-4 text-purple-300 group-hover:rotate-12 transition-transform duration-200" />
                    <span>{t.btnCall}</span>
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Three Attractive Service Highlights Panel (5 cols)
              ========================================================================= */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightPanelVariants}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-7 rounded-3xl bg-[#1A052E]/70 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
              {/* Panel Top Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/15">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  Service Capabilities
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Active Bays
                </span>
              </div>

              {/* 3 Service Highlights Cards with subtle interactive hover states */}
              <div className="space-y-3">
                {t.highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/18 border border-white/15 hover:border-purple-300/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 flex items-start gap-3.5 group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-purple-200 shrink-0 group-hover:scale-105 group-hover:bg-purple-500/30 transition-all duration-200 mt-0.5">
                        <Icon className="w-5 h-5 text-purple-200" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-purple-100/90 leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Subtle Trust Note */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-purple-200 flex items-center gap-2 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{t.activeBays}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
