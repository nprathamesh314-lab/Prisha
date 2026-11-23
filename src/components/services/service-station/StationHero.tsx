// PRISHA XPRESS PVT. LTD. - SERVICE STATION HERO SECTION
// ROUTE: /services/service-station
// "KEEPING YOUR VEHICLES READY FOR EVERY JOURNEY" - SIMPLE INDIAN ENGLISH, HIGH-CONTRAST WHITE/LAVENDER TEXT
// 3 ATTRACTIVE SERVICE HIGHLIGHTS (MAINTENANCE, INSPECTION, SPARE PARTS) ON RIGHT
// BALANCED 20-30% PURPLE OVERLAY WITH CLEARLY VISIBLE WORKSHOP TRUCK PHOTOGRAPHY

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Wrench,
  ShieldCheck,
  Cog,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Breadcrumbs } from '../../common/Breadcrumbs';

const heroTranslations = {
  en: {
    badge: 'COMMERCIAL VEHICLE SERVICE STATION',
    title: 'Keeping Your Vehicles Ready for Every Journey',
    desc: 'Prisha Xpress provides vehicle servicing and maintenance support to help businesses keep their trucks in good working condition. Our team helps with vehicle checks, regular servicing and maintenance coordination.',
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
    btnBook: 'Book Vehicle Servicing',
    btnSpares: 'Explore Spare Parts',
  },
  hi: {
    badge: 'कमर्शियल वाहन सर्विस स्टेशन',
    title: 'आपके वाहनों को हर यात्रा के लिए तैयार रखना',
    desc: 'प्रिशा एक्सप्रेस व्यवसायों को उनके ट्रकों को अच्छी कार्यशील स्थिति में रखने में मदद करने के लिए वाहन सर्विसिंग और रखरखाव सहायता प्रदान करती है। हमारी टीम वाहन जांच, नियमित सर्विसिंग और रखरखाव समन्वय में मदद करती है।',
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
    btnBook: 'वाहन सर्विसिंग बुक करें',
    btnSpares: 'स्पेयर पार्ट्स देखें',
  },
  mr: {
    badge: 'व्यावसायिक वाहन सर्व्हिस स्टेशन',
    title: 'तुमची वाहने प्रत्येक प्रवासासाठी सज्ज ठेवणे',
    desc: 'प्रिशा एक्सप्रेस व्यवसायांचे ट्रक्स चांगल्या स्थितीत ठेवण्यासाठी वाहन सर्व्हिसिंग आणि देखभाल सहाय्य प्रदान करते. आमची टीम वाहन तपासणी, नियमित सर्व्हिसिंग आणि देखभाल समन्वयात मदत करते.',
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
    btnBook: 'वाहन सर्व्हिसिंग बुक करा',
    btnSpares: 'सुटे भाग पाहा',
  },
};

export const StationHero: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const shouldReduceMotion = useReducedMotion();

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

  // Staggered entrance animation variants
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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
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
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-28 pb-16 lg:py-24 overflow-hidden text-white">
      {/* =========================================================================
          1. LAYER 1: Full-Width Real Commercial Service Station Workshop Photography
          Workshop, mechanics, and heavy trucks remain clearly visible & colorful
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
              : { scale: [1, 1.05, 1] }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* =========================================================================
            2. LAYER 2: Balanced 20-30% Purple Gradient Overlay
            Leaves trucks, tools and workshop interior sharp and clearly visible
            ========================================================================= */}
        {/* Subtle horizontal gradient overlay: slightly deeper behind left text, clear on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A052E]/75 via-[#2A0845]/45 to-[#1A052E]/30 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A052E]/85 via-[#2A0845]/55 to-[#1A052E]/30 md:hidden" />

        {/* Subtle moving ambient light shimmer across background */}
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

      {/* =========================================================================
          3. LAYER 3: Main Content Grid (Left: Typography & Buttons; Right: 3 Highlights)
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
              LEFT COLUMN: High-Contrast White Heading, Light Lavender Description & Buttons
              ========================================================================= */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="lg:col-span-7 space-y-5 sm:space-y-6"
          >
            {/* Small Label Badge */}
            <motion.div variants={itemVariants} className="flex justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 shadow-sm">
                <Wrench className="w-4 h-4 text-purple-300" />
                <span>{t.badge}</span>
              </span>
            </motion.div>

            {/* Main Heading (Pure Crisp White, Clearly Visible on Desktop & Mobile) */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15] drop-shadow-md"
            >
              Keeping Your Vehicles{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-amber-200">
                Ready for Every Journey
              </span>
            </motion.h1>

            {/* Description (Light Lavender with Strong Contrast Against Background) */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base md:text-lg text-purple-100 font-normal leading-relaxed max-w-2xl drop-shadow-xs"
            >
              {t.desc}
            </motion.p>

            {/* Action Buttons (Side by Side on Desktop, Stacked on Mobile) */}
            <motion.div
              variants={itemVariants}
              className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
              {/* Primary Button */}
              <Link
                to="/contact?service=vehicle-servicing#enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-purple-50 text-px-primary font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>{t.btnBook}</span>
                <ArrowRight className="w-4 h-4 text-px-primary group-hover:translate-x-1.5 transition-transform" />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/services/auto-spares"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <Cog className="w-4 h-4 text-purple-200" />
                <span>{t.btnSpares}</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Three Attractive Service Highlights Panel (5 cols)
              ========================================================================= */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={rightPanelVariants}
            className="lg:col-span-5"
          >
            <div className="p-6 sm:p-7 rounded-3xl bg-[#1A052E]/65 backdrop-blur-md border border-white/20 shadow-2xl space-y-4">
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

              {/* 3 Service Highlights Cards */}
              <div className="space-y-3">
                {t.highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 hover:border-purple-300/60 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-3.5 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center text-purple-200 shrink-0 group-hover:scale-105 group-hover:bg-purple-500/30 transition-all duration-200 mt-0.5">
                        <Icon className="w-5 h-5 text-purple-200" />
                      </div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm font-bold text-white group-hover:text-purple-200 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-purple-100/85 leading-relaxed font-normal">
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
                <span>Dedicated commercial workshop pits for heavy multi-axle trucks</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
