// PRISHA XPRESS PVT. LTD. - SERVICE STATION INTRO SECTION
// ROUTE: /services/service-station
// "KEEPING YOUR TRUCKS IN GOOD CONDITION" - SIMPLE INDIAN ENGLISH, 4 FEATURE ITEMS, WORKSHOP PHOTOGRAPHY
// HIGH-CONTRAST DARK NAVY (#21152D) & DARK GREY (#4B4654) WITH PRISHA PURPLE (#5B198A) ACCENTS

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Wrench,
  Gauge,
  ShieldCheck,
  Truck,
  Sparkles,
} from 'lucide-react';

const introTranslations = {
  en: {
    badge: 'VEHICLE CARE & MAINTENANCE',
    titlePart1: 'Keeping Your Trucks in ',
    titleHighlight: 'Good Condition',
    p1: 'Regular vehicle maintenance helps prevent unexpected breakdowns and keeps your business moving. Prisha Xpress provides servicing and maintenance support for commercial vehicles.',
    p2: 'Our team helps with regular vehicle checks, engine servicing, brake inspection and other maintenance requirements. We focus on keeping vehicles ready for their next journey.',
    features: [
      {
        title: 'Regular Vehicle Servicing',
        desc: 'Routine checks and maintenance.',
        icon: Wrench,
      },
      {
        title: 'Engine & Brake Checks',
        desc: 'Checking important vehicle parts.',
        icon: Gauge,
      },
      {
        title: 'Vehicle Safety Checks',
        desc: 'Checking vehicles before they return to the road.',
        icon: ShieldCheck,
      },
      {
        title: 'Commercial Vehicle Support',
        desc: 'Maintenance support for heavy vehicles.',
        icon: Truck,
      },
    ],
    imageBadge: 'Commercial Vehicle Care',
    imageSub: 'Heavy Truck Workshop',
  },
  hi: {
    badge: 'वाहन देखभाल और रखरखाव',
    titlePart1: 'आपके ट्रकों को ',
    titleHighlight: 'अच्छी स्थिति में रखना',
    p1: 'नियमित वाहन रखरखाव अप्रत्याशित खराबी को रोकने में मदद करता है और आपके व्यवसाय को चालू रखता है। प्रिशा एक्सप्रेस कमर्शियल वाहनों के लिए सर्विसिंग और रखरखाव सहायता प्रदान करती है।',
    p2: 'हमारी टीम नियमित वाहन जांच, इंजन सर्विसिंग, ब्रेक निरीक्षण और अन्य रखरखाव आवश्यकताओं में मदद करती है। हम वाहनों को उनकी अगली यात्रा के लिए तैयार रखने पर ध्यान केंद्रित करते हैं।',
    features: [
      {
        title: 'नियमित वाहन सर्विसिंग',
        desc: 'नियमित जांच और रखरखाव।',
        icon: Wrench,
      },
      {
        title: 'इंजन और ब्रेक जांच',
        desc: 'महत्वपूर्ण वाहन भागों की जांच।',
        icon: Gauge,
      },
      {
        title: 'वाहन सुरक्षा जांच',
        desc: 'सड़क पर लौटने से पहले वाहनों की जांच।',
        icon: ShieldCheck,
      },
      {
        title: 'कमर्शियल वाहन सहायता',
        desc: 'भारी वाहनों के लिए रखरखाव सहायता।',
        icon: Truck,
      },
    ],
    imageBadge: 'कमर्शियल वाहन देखभाल',
    imageSub: 'हैवी ट्रक वर्कशॉप',
  },
  mr: {
    badge: 'वाहन काळजी आणि देखभाल',
    titlePart1: 'तुमचे ट्रक्स ',
    titleHighlight: 'चांगल्या स्थितीत ठेवणे',
    p1: 'नियमित वाहन देखभाल अनपेक्षित बिघाड टाळण्यास मदत करते आणि तुमचा व्यवसाय सुरळीत सुरू ठेवते. प्रिशा एक्सप्रेस व्यावसायिक वाहनांसाठी सर्व्हिसिंग आणि देखभाल सहाय्य प्रदान करते.',
    p2: 'आमची टीम नियमित वाहन तपासणी, इंजिन सर्व्हिसिंग, ब्रेक तपासणी आणि इतर देखभाल गरजांमध्ये मदत करते. वाहने त्यांच्या पुढच्या प्रवासासाठी सज्ज ठेवण्यावर आमचा भर असतो.',
    features: [
      {
        title: 'नियमित वाहन सर्व्हिसिंग',
        desc: 'नियमित तपासणी आणि देखभाल.',
        icon: Wrench,
      },
      {
        title: 'इंजिन आणि ब्रेक तपासणी',
        desc: 'महत्त्वाच्या वाहन भागांची तपासणी.',
        icon: Gauge,
      },
      {
        title: 'वाहन सुरक्षा तपासणी',
        desc: 'रस्त्यावर परतण्यापूर्वी वाहनांची तपासणी.',
        icon: ShieldCheck,
      },
      {
        title: 'व्यावसायिक वाहन सहाय्य',
        desc: 'जड वाहनांसाठी देखभाल सहाय्य.',
        icon: Truck,
      },
    ],
    imageBadge: 'व्यावसायिक वाहन काळजी',
    imageSub: 'हेवी ट्रक वर्कशॉप',
  },
};

export const StationIntro: React.FC = () => {
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

  const t = introTranslations[lang];

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageRevealVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden" id="vehicle-maintenance">
      {/* Subtle background lavender accent circle */}
      <div
        className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -left-40 w-80 h-80 bg-purple-50/60 rounded-full blur-2xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ================================================================== */}
          {/* LEFT COLUMN: Headings, Descriptions, and 4 Feature Items           */}
          {/* ================================================================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Small label badge */}
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-[#5B198A] text-xs font-bold tracking-wider uppercase shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#5B198A]" />
                <span>{t.badge}</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#21152D] tracking-tight leading-[1.18]">
                {t.titlePart1}
                <span className="text-[#5B198A] relative inline-block">
                  {t.titleHighlight}
                  <span
                    className="absolute bottom-1 left-0 w-full h-1.5 bg-purple-200/60 -z-10 rounded-full"
                    aria-hidden="true"
                  />
                </span>
              </h2>
            </motion.div>

            {/* Paragraph 1 */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-[#4B4654] leading-relaxed font-normal">
                {lang === 'en' ? (
                  <>
                    Regular vehicle maintenance helps prevent unexpected breakdowns and keeps your business moving.{' '}
                    <strong className="text-[#21152D] font-semibold">Prisha Xpress</strong> provides servicing and maintenance support for commercial vehicles.
                  </>
                ) : (
                  t.p1
                )}
              </p>
            </motion.div>

            {/* Paragraph 2 */}
            <motion.div variants={itemVariants}>
              <p className="text-sm sm:text-base text-[#4B4654] leading-relaxed">
                {t.p2}
              </p>
            </motion.div>

            {/* 4 Feature Items */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
            >
              {t.features.map((feature, idx) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    whileHover={shouldReduceMotion ? {} : { y: -3 }}
                    className="group p-4 sm:p-4.5 rounded-2xl bg-purple-50/40 hover:bg-purple-50/80 border border-purple-100 hover:border-purple-300 transition-all duration-300 shadow-xs hover:shadow-md"
                  >
                    <div className="flex items-start gap-3.5">
                      <motion.div
                        whileHover={shouldReduceMotion ? {} : { rotate: 8, scale: 1.1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                        className="w-11 h-11 rounded-xl bg-purple-100 text-[#5B198A] flex items-center justify-center shrink-0 group-hover:bg-[#5B198A] group-hover:text-white transition-colors duration-300 shadow-xs mt-0.5"
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.div>
                      <div className="space-y-0.5">
                        <h3 className="text-sm sm:text-base font-bold text-[#21152D] group-hover:text-[#5B198A] transition-colors leading-snug">
                          {feature.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4B4654] leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* ================================================================== */}
          {/* RIGHT COLUMN: Professional Vehicle Service Station Photograph     */}
          {/* ================================================================== */}
          <motion.div
            variants={imageRevealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              {/* Subtle ambient purple glow */}
              <div
                className="absolute -inset-2 bg-gradient-to-tr from-purple-600/15 via-purple-400/10 to-transparent rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500 pointer-events-none"
                aria-hidden="true"
              />

              {/* Main image container with rounded corners and subtle shadow */}
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900">
                <img
                  src="/assets/images/service-station.jpg"
                  alt="Prisha Xpress Commercial Vehicle Service Station"
                  className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle bottom gradient to guarantee floating badge visibility */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Small floating label: Commercial Vehicle Care */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="absolute bottom-5 left-5 right-5 sm:right-auto bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-purple-100 shadow-xl flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-[#5B198A] flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4 text-[#5B198A]" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-[#21152D] leading-tight">
                      {t.imageBadge}
                    </div>
                    <div className="text-[11px] text-[#4B4654] font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>{t.imageSub}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
