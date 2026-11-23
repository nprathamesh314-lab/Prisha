// PRISHA XPRESS PVT. LTD. - TRANSPORTATION TRUST & SOLUTIONS SECTION
// ROUTE: /services/transportation
// "TRANSPORT SOLUTIONS YOU CAN DEPEND ON" - PREMIUM CUSTOMER TRUST SECTION
// 2-COLUMN LAYOUT: 4 TRUST BENEFITS WITH PURPLE ICONS ON LEFT, LARGE FLEET WAREHOUSE PHOTO ON RIGHT
// ACCESSIBLE MOTION, MULTILINGUAL (EN, HI, MR) & FULL RESPONSIVENESS

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Route,
  Users,
  Truck,
  Headset,
  Sparkles,
} from 'lucide-react';

const trustTranslations = {
  en: {
    badge: 'CUSTOMER TRUST & RELIABILITY',
    title: 'Transport Solutions You Can Depend On',
    desc: 'At Prisha Xpress, we help businesses manage their transportation needs with proper planning, vehicle coordination and reliable customer support.',
    benefits: [
      {
        title: 'Reliable Coordination',
        desc: 'We coordinate transport requirements from start to delivery.',
        icon: Route,
      },
      {
        title: 'Experienced Team',
        desc: 'Support from a team that understands transport operations.',
        icon: Users,
      },
      {
        title: 'Vehicle Availability',
        desc: 'Transport options based on your business requirements.',
        icon: Truck,
      },
      {
        title: 'Customer Support',
        desc: 'Our team is available to assist with your enquiries.',
        icon: Headset,
      },
    ],
    imageBadge: 'Prisha Xpress Logistics & Fleet Operations',
  },
  hi: {
    badge: 'विश्वसनीय परिवहन समाधान',
    title: 'परिवहन समाधान जिन पर आप भरोसा कर सकते हैं',
    desc: 'प्रिशा एक्सप्रेस में, हम उचित योजना, वाहन समन्वय और विश्वसनीय ग्राहक सहायता के साथ व्यवसायों को उनकी परिवहन आवश्यकताओं को प्रबंधित करने में मदद करते हैं।',
    benefits: [
      {
        title: 'विश्वसनीय समन्वय',
        desc: 'हम शुरू से लेकर डिलीवरी तक परिवहन आवश्यकताओं का समन्वय करते हैं।',
        icon: Route,
      },
      {
        title: 'अनुभवी टीम',
        desc: 'परिवहन संचालन को समझने वाली टीम का सहयोग।',
        icon: Users,
      },
      {
        title: 'वाहन उपलब्धता',
        desc: 'आपकी व्यावसायिक आवश्यकताओं के आधार पर परिवहन विकल्प।',
        icon: Truck,
      },
      {
        title: 'ग्राहक सहायता',
        desc: 'हमारी टीम आपकी पूछताछ में सहायता के लिए उपलब्ध है।',
        icon: Headset,
      },
    ],
    imageBadge: 'प्रिशा एक्सप्रेस लॉजिस्टिक्स और फ्लीट ऑपरेशंस',
  },
  mr: {
    badge: 'विश्वसनीय वाहतूक उपाय',
    title: 'तुम्ही विसंबून राहू शकता असे वाहतूक उपाय',
    desc: 'प्रिशा एक्सप्रेसमध्ये, आम्ही योग्य नियोजन, वाहन समन्वय आणि विश्वसनीय ग्राहक पाठबळासह व्यवसायांना त्यांच्या वाहतूक गरजा व्यवस्थापित करण्यास मदत करतो.',
    benefits: [
      {
        title: 'विश्वसनीय समन्वय',
        desc: 'आम्ही सुरुवातीपासून डिलिव्हरीपर्यंत वाहतूक गरजांचे समन्वय साधतो.',
        icon: Route,
      },
      {
        title: 'अनुभवी टीम',
        desc: 'वाहतूक कामकाज समजणाऱ्या अनुभवी टीमचे पाठबळ.',
        icon: Users,
      },
      {
        title: 'वाहन उपलब्धता',
        desc: 'तुमच्या व्यावसायिक गरजेनुसार उपलब्ध वाहतूक पर्याय.',
        icon: Truck,
      },
      {
        title: 'ग्राहक सहाय्य',
        desc: 'आमची टीम तुमच्या चौकशीमध्ये मदत करण्यासाठी सदैव उपलब्ध आहे.',
        icon: Headset,
      },
    ],
    imageBadge: 'प्रिशा एक्सप्रेस लॉजिस्टिक्स आणि ताफा कामकाज',
  },
};

export const TransportServicesEditorial: React.FC = () => {
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

  const t = trustTranslations[lang] || trustTranslations.en;

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-px-bg relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Heading, Description & 4 Trust Benefits
              ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:col-span-6 space-y-6"
          >
            {/* Small Label Badge */}
            <motion.div variants={itemVariants} className="flex justify-start">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-px-primary border border-purple-200 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-px-primary shrink-0" />
                <span>{t.badge}</span>
              </span>
            </motion.div>

            {/* Main Section Title */}
            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl font-black text-px-dark tracking-tight leading-tight"
            >
              {t.title}
            </motion.h2>

            {/* Description Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal"
            >
              {t.desc}
            </motion.p>

            {/* Four Trust Benefits in 2-Column Grid (1 col on small mobile) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2"
            >
              {t.benefits.map((b, idx) => {
                const Icon = b.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 hover:border-purple-200 hover:bg-purple-100/60 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5 group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white border border-purple-200/70 flex items-center justify-center text-px-primary shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-purple-50 transition-all duration-200 mt-0.5">
                      <Icon className="w-4 h-4 text-px-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-px-dark">
                        {b.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Large Authentic Commercial Trucks & Warehouse Photography
              ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={imageVariants}
            className="lg:col-span-6"
          >
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
              {/* Subtle ambient glow behind image frame */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-px-primary/20 via-purple-300/15 to-transparent rounded-3xl blur-md pointer-events-none" />

              <img
                src="/assets/images/fleet-warehouse.jpg"
                alt="Prisha Xpress Commercial Trucks at Logistics Warehouse"
                className="w-full h-[360px] sm:h-[420px] lg:h-[480px] object-cover object-center filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient edge vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Floating Bottom Badge */}
              <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-px-deep/85 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <Truck className="w-3.5 h-3.5 text-purple-200 shrink-0" />
                <span className="truncate">{t.imageBadge}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
