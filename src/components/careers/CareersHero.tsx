// PRISHA XPRESS PVT. LTD. - CAREERS PAGE HERO SECTION
// ROUTE: /careers
// "BUILD YOUR FUTURE WITH PRISHA XPRESS" - COMPACT, PREMIUM, HIGH-CONTRAST HERO
// VISIBLE OFFICE PHOTOGRAPHY, SUBTLE PURPLE OVERLAY, COMPACT GLASS CONTENT BOX (MAX-W 780PX)
// 3 COMPACT PILL-SHAPED TRUST POINTS (TRANSPARENT HIRING, DRIVER SUPPORT, PUNE OFFICE)

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Briefcase,
  CheckCircle2,
} from 'lucide-react';

const careersHeroTranslations = {
  en: {
    badge: 'CAREERS & PROFESSIONAL OPPORTUNITIES',
    titleLine1: 'Build Your Future',
    titleLine2: 'with Prisha Xpress',
    desc: 'Explore job opportunities with Prisha Xpress. Join our team and grow with us in the transportation and logistics industry.',
    trust: [
      'Transparent Hiring Process',
      'Driver Support & Timely Payments',
      'Corporate Office in Pune',
    ],
  },
  hi: {
    badge: 'करियर और व्यावसायिक अवसर',
    titleLine1: 'अपना भविष्य बनाएं',
    titleLine2: 'प्रिशा एक्सप्रेस के साथ',
    desc: 'प्रिशा एक्सप्रेस के साथ नौकरी के अवसरों का पता लगाएं। हमारी टीम में शामिल हों और परिवहन एवं लॉजिस्टिक्स उद्योग में हमारे साथ आगे बढ़ें।',
    trust: [
      'पारदर्शी भर्ती प्रक्रिया',
      'ड्राइवर सहायता और समय पर भुगतान',
      'पुणे में कॉर्पोरेट कार्यालय',
    ],
  },
  mr: {
    badge: 'करिअर आणि व्यावसायिक संधी',
    titleLine1: 'तुमचे भविष्य घडवा',
    titleLine2: 'प्रिशा एक्सप्रेस सोबत',
    desc: 'प्रिशा एक्सप्रेससह रोजगाराच्या संधी शोधा. आमच्या टीममध्ये सामील व्हा आणि वाहतूक व लॉजिस्टिक्स क्षेत्रात आमच्यासोबत प्रगती करा.',
    trust: [
      'पारदर्शक भरती प्रक्रिया',
      'ड्रायव्हर सहाय्य आणि वेळेवर पेमेंट',
      'पुण्यातील कॉर्पोरेट मुख्यालय',
    ],
  },
};

export const CareersHero: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const shouldReduceMotion = useReducedMotion();

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

  const t = careersHeroTranslations[lang];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: shouldReduceMotion ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const pillContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: shouldReduceMotion ? 0 : 0.25,
      },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative text-white overflow-hidden bg-[#160424] flex items-center justify-center min-h-[360px] sm:min-h-[410px] md:min-h-[450px] lg:min-h-[480px] lg:max-h-[500px] pt-24 pb-10 sm:pt-28 sm:pb-12 lg:pt-32 lg:pb-14">
      {/* ==================================================================== */}
      {/* BACKGROUND PHOTOGRAPH & BALANCED SUBTLE OVERLAY                     */}
      {/* Visible office photo with 35-50% purple overlay (not an opaque wall) */}
      {/* ==================================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/assets/images/careers-staff.jpg"
          alt="Corporate Careers at Prisha Xpress"
          initial={shouldReduceMotion ? { scale: 1 } : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 7, ease: 'easeOut' }}
          className="w-full h-full object-cover object-center filter brightness-[0.95] contrast-[1.05]"
          loading="eager"
        />
        {/* Subtle purple gradient overlay: keeps image clearly visible */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#1A052E]/60 via-[#1A052E]/40 to-[#1A052E]/60"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#1A052E]/45 via-transparent to-[#1A052E]/65"
          aria-hidden="true"
        />
      </div>

      {/* ==================================================================== */}
      {/* COMPACT CENTRED CONTENT BOX (MAX-WIDTH ~780PX)                        */}
      {/* ==================================================================== */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center">
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[780px] mx-auto p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl bg-[#1A052E]/70 backdrop-blur-md border border-purple-300/30 shadow-2xl space-y-3.5"
        >
          {/* Small label: CAREERS & PROFESSIONAL OPPORTUNITIES */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#EAD5FF] border border-purple-300/25 shadow-xs">
              <Briefcase className="w-3.5 h-3.5 text-purple-200" />
              <span>{t.badge}</span>
            </div>
          </motion.div>

          {/* Main Heading: Build Your Future with Prisha Xpress */}
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-white tracking-tight leading-[1.2]">
              {t.titleLine1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-purple-300 inline-block">
                {t.titleLine2}
              </span>
            </h1>
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants}>
            <p className="text-xs sm:text-sm md:text-base text-[#F5EDF9] max-w-2xl mx-auto leading-relaxed font-normal">
              {t.desc}
            </p>
          </motion.div>

          {/* 3 Trust points in a compact row */}
          <motion.div
            variants={pillContainerVariants}
            initial="hidden"
            animate="visible"
            className="pt-2 flex flex-wrap justify-center items-center gap-2 sm:gap-2.5"
          >
            {t.trust.map((point, idx) => (
              <motion.span
                key={idx}
                variants={pillVariants}
                whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                transition={{ duration: 0.15 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 sm:py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] sm:text-xs text-white transition-all duration-200 shadow-xs cursor-default font-medium"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{point}</span>
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
