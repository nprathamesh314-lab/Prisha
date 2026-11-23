// PRISHA XPRESS PVT. LTD. - SERVICE PROCESS JOURNEY SECTION
// ROUTE: /services/service-station
// "YOUR VEHICLE, OUR CARE – FROM CHECK-UP TO READY" - COMPACT ANIMATED SERVICE JOURNEY
// DESKTOP: HORIZONTAL CONNECTED 4-STEP TIMELINE
// MOBILE: ULTRA-COMPACT VERTICAL TIMELINE (NO OVERSIZED CARDS, ZERO SCROLL FATIGUE)
// COLORS: #7200B8 (PURPLE), #292033 (DARK HEADING), #514B59 (DESCRIPTION), #FBF8FE (BACKGROUND)

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ClipboardCheck,
  Search,
  Wrench,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const journeyTranslations = {
  en: {
    badge: 'OUR SERVICE PROCESS',
    titlePart1: 'Your Vehicle, Our Care – ',
    titleHighlight: 'From Check-up to Ready',
    desc: 'At Prisha Xpress, we take care of your commercial vehicles through proper inspection, timely servicing and maintenance support. Our goal is to keep your vehicles in good condition and reduce unexpected breakdowns.',
    steps: [
      {
        num: '01',
        title: 'Vehicle Inspection',
        desc: 'We check your vehicle to identify any problems.',
        icon: ClipboardCheck,
      },
      {
        num: '02',
        title: 'Problem Identification',
        desc: 'We find out what needs repair or maintenance.',
        icon: Search,
      },
      {
        num: '03',
        title: 'Repair & Servicing',
        desc: 'Our team carries out the required servicing and repairs.',
        icon: Wrench,
      },
      {
        num: '04',
        title: 'Final Safety Check',
        desc: 'We check the vehicle before it is ready to go.',
        icon: ShieldCheck,
      },
    ],
    trustStatement:
      'Careful vehicle checks. Timely maintenance. Better support for your transport operations.',
  },
  hi: {
    badge: 'हमारी सर्विस प्रक्रिया',
    titlePart1: 'आपका वाहन, हमारी देखभाल – ',
    titleHighlight: 'जांच से लेकर तैयारी तक',
    desc: 'प्रिशा एक्सप्रेस में, हम उचित निरीक्षण, समय पर सर्विसिंग और रखरखाव सहायता के माध्यम से आपके कमर्शियल वाहनों की देखभाल करते हैं। हमारा लक्ष्य आपके वाहनों को अच्छी स्थिति में रखना और अप्रत्याशित खराबी को कम करना है।',
    steps: [
      {
        num: '01',
        title: 'वाहन निरीक्षण',
        desc: 'हम किसी भी समस्या की पहचान करने के लिए आपके वाहन की जांच करते हैं।',
        icon: ClipboardCheck,
      },
      {
        num: '02',
        title: 'समस्या की पहचान',
        desc: 'हम पता लगाते हैं कि किस चीज़ की मरम्मत या रखरखाव की आवश्यकता है।',
        icon: Search,
      },
      {
        num: '03',
        title: 'मरम्मत और सर्विसिंग',
        desc: 'हमारी टीम आवश्यक सर्विसिंग और मरम्मत कार्य करती है।',
        icon: Wrench,
      },
      {
        num: '04',
        title: 'अंतिम सुरक्षा जांच',
        desc: 'वाहन जाने के लिए तैयार होने से पहले हम पूरी सुरक्षा जांच करते हैं।',
        icon: ShieldCheck,
      },
    ],
    trustStatement:
      'सावधानीपूर्वक वाहन जांच। समय पर रखरखाव। आपके परिवहन कार्यों के लिए बेहतर समर्थन।',
  },
  mr: {
    badge: 'आमची सर्व्हिस प्रक्रिया',
    titlePart1: 'तुमचे वाहन, आमची काळजी – ',
    titleHighlight: 'तपासणीपासून प्रवासासाठी सज्जतेपर्यंत',
    desc: 'प्रिशा एक्सप्रेसमध्ये, आम्ही योग्य तपासणी, वेळेवर सर्व्हिसिंग आणि देखभाल सहाय्याद्वारे तुमच्या व्यावसायिक वाहनांची काळजी घेतो. वाहने उत्तम स्थितीत ठेवणे आणि अनपेक्षित बिघाड कमी करणे हे आमचे ध्येय आहे.',
    steps: [
      {
        num: '01',
        title: 'वाहन तपासणी',
        desc: 'कोणतीही समस्या शोधण्यासाठी आम्ही तुमच्या वाहनाची सखोल तपासणी करतो.',
        icon: ClipboardCheck,
      },
      {
        num: '02',
        title: 'समस्येचा शोध',
        desc: 'कोणत्या भागाची दुरुस्ती किंवा देखभाल आवश्यक आहे हे आम्ही निश्चित करतो.',
        icon: Search,
      },
      {
        num: '03',
        title: 'दुरुस्ती आणि सर्व्हिसिंग',
        desc: 'आमची तज्ज्ञ टीम आवश्यक ती सर्व्हिसिंग आणि दुरुस्ती पूर्ण करते.',
        icon: Wrench,
      },
      {
        num: '04',
        title: 'अंतिम सुरक्षा तपासणी',
        desc: 'वाहन रस्त्यावर उतरण्यापूर्वी आम्ही अंतिम सुरक्षा तपासणी करतो.',
        icon: ShieldCheck,
      },
    ],
    trustStatement:
      'काळजीपूर्वक वाहन तपासणी. वेळेवर देखभाल. तुमच्या वाहतूक व्यवसायासाठी विश्वासार्ह आधार.',
  },
};

export const StationServiceCategories: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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

  const t = journeyTranslations[lang];

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-[#FBF8FE] relative overflow-hidden" id="service-process">
      {/* Subtle background decoration */}
      <div
        className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================================================================== */}
        {/* SECTION HEADER                                                     */}
        {/* ================================================================== */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-3xl mx-auto space-y-3.5 mb-10 sm:mb-14"
        >
          {/* Small label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/70 border border-purple-200 text-[#7200B8] text-xs font-bold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#7200B8]" />
            <span>{t.badge}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#292033] tracking-tight leading-tight">
            {t.titlePart1}
            <span className="text-[#7200B8] relative inline-block">
              {t.titleHighlight}
              <span
                className="absolute bottom-1 left-0 w-full h-1.5 bg-purple-200/70 -z-10 rounded-full"
                aria-hidden="true"
              />
            </span>
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-[#514B59] leading-relaxed max-w-2xl mx-auto">
            {t.desc}
          </p>
        </motion.div>

        {/* ================================================================== */}
        {/* DESKTOP LAYOUT (Horizontal Connected Journey) - md:block           */}
        {/* ================================================================== */}
        <div className="hidden md:block">
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-purple-100 shadow-sm relative">
            
            {/* Animated Connecting Timeline Line */}
            <div className="absolute top-[82px] left-[12%] right-[12%] h-0.5 bg-purple-100 -z-0">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full bg-gradient-to-r from-[#7200B8] via-purple-500 to-[#7200B8] origin-left"
              />
            </div>

            {/* 4 Connected Step Nodes */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-4 gap-6 relative z-10"
            >
              {t.steps.map((step, idx) => {
                const IconComponent = step.icon;
                const isHovered = hoveredIndex === idx;

                return (
                  <motion.div
                    key={step.num}
                    variants={stepVariants}
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    className="flex flex-col items-center text-center group cursor-default"
                  >
                    {/* Small Step Number Pill */}
                    <div
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full mb-3 transition-colors duration-300 ${
                        isHovered
                          ? 'bg-[#7200B8] text-white shadow-xs'
                          : 'bg-purple-100/80 text-[#7200B8]'
                      }`}
                    >
                      Step {step.num}
                    </div>

                    {/* Step Icon Node */}
                    <motion.div
                      whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs border-2 ${
                        isHovered
                          ? 'bg-[#7200B8] text-white border-[#7200B8] shadow-md shadow-purple-500/20'
                          : 'bg-white text-[#7200B8] border-purple-200 group-hover:border-[#7200B8]'
                      }`}
                    >
                      <IconComponent className="w-6 h-6 transition-transform duration-300" />
                    </motion.div>

                    {/* Step Title */}
                    <h3
                      className={`text-base font-bold text-[#292033] mt-4 tracking-tight transition-colors duration-300 ${
                        isHovered ? 'text-[#7200B8]' : 'group-hover:text-[#7200B8]'
                      }`}
                    >
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs sm:text-sm text-[#514B59] mt-1.5 leading-relaxed max-w-[220px]">
                      {step.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Trust statement below timeline */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-8 pt-6 border-t border-purple-100/80 flex items-center justify-center gap-2.5 text-center"
            >
              <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-[#7200B8] shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#7200B8]" />
              </div>
              <p className="text-xs sm:text-sm font-semibold text-[#292033]">
                {t.trustStatement}
              </p>
            </motion.div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* MOBILE LAYOUT (Compact Vertical Timeline) - md:hidden              */}
        {/* Fits in 1-2 screen heights, no huge cards, zero scroll fatigue     */}
        {/* ================================================================== */}
        <div className="block md:hidden">
          <div className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm relative">
            
            {/* Continuous Vertical Connecting Line */}
            <div className="absolute left-[37px] top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#7200B8] via-purple-400 to-[#7200B8]" />

            {/* 4 Compact Timeline Rows */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="space-y-4 relative z-10"
            >
              {t.steps.map((step) => {
                const IconComponent = step.icon;

                return (
                  <motion.div
                    key={step.num}
                    variants={stepVariants}
                    className="flex items-start gap-3.5 group"
                  >
                    {/* Small Node with Icon */}
                    <div className="w-9 h-9 rounded-xl bg-white border-2 border-purple-300 text-[#7200B8] flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#7200B8] group-hover:text-white transition-colors duration-200 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 bg-purple-50/40 border border-purple-100/70 rounded-xl p-3 shadow-2xs">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-purple-100 text-[#7200B8]">
                          Step {step.num}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-[#292033] leading-snug">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-xs text-[#514B59] leading-snug">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Trust statement on mobile */}
            <div className="mt-5 pt-4 border-t border-purple-100 flex items-center justify-center gap-2 text-center">
              <ShieldCheck className="w-4 h-4 text-[#7200B8] shrink-0" />
              <p className="text-[11px] font-medium text-[#292033] leading-snug">
                {t.trustStatement}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
