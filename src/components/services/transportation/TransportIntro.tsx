// PRISHA XPRESS PVT. LTD. - TRANSPORTATION SERVICE INTRO SECTION
// ROUTE: /services/transportation
// "RELIABLE TRANSPORT FOR EVERY BUSINESS" - SIMPLE INDIAN ENGLISH, 4 SERVICE HIGHLIGHTS, 2 STATS BOXES
// ATTRACTIVE 2-COLUMN LAYOUT WITH LARGE TRANSPORTATION PHOTO & ACCESSIBLE MOTION

import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../../common/SectionHeading';
import {
  CalendarCheck,
  ShieldCheck,
  UserCheck,
  FileCheck,
  Truck,
  Clock,
  Sparkles,
} from 'lucide-react';

const introTranslations = {
  en: {
    badge: 'OUR TRANSPORTATION SERVICES',
    title: 'Reliable Transport for Every Business',
    subtitle:
      'We help businesses move their goods safely from one city to another. Our team focuses on timely delivery, vehicle checks and proper transport coordination.',
    leftHeading: 'Safe and Reliable Long-Distance Transport',
    p1: 'At Prisha Xpress, we help businesses transport goods across different cities and states. Whether you need to move industrial materials, automobile parts or other products, our team works to make every delivery smooth and on time.',
    p2: 'We plan every trip carefully. Our team coordinates vehicles, checks their condition and supports drivers to ensure safe transportation.',
    highlights: [
      {
        title: 'Planned Deliveries',
        desc: 'We plan transport schedules to help goods reach on time.',
        icon: CalendarCheck,
      },
      {
        title: 'Vehicle Safety Checks',
        desc: 'Vehicles are checked before starting the journey.',
        icon: ShieldCheck,
      },
      {
        title: 'Verified Drivers',
        desc: 'Drivers are checked and selected for transport work.',
        icon: UserCheck,
      },
      {
        title: 'Cargo Insurance',
        desc: 'Insurance support for goods during transportation.',
        icon: FileCheck,
      },
    ],
    whyChooseTitle: 'Why Businesses Choose Prisha Xpress',
    benefits: [
      {
        title: 'On-Time Delivery',
        desc: 'We plan deliveries carefully to avoid unnecessary delays.',
        icon: Clock,
      },
      {
        title: 'Transport Support',
        desc: 'Our team coordinates vehicles and transportation needs.',
        icon: Truck,
      },
      {
        title: 'Safety First',
        desc: 'We focus on vehicle checks and safe goods transportation.',
        icon: ShieldCheck,
      },
    ],
    imageBadge: 'Prisha Xpress Logistics Terminal',
  },
  hi: {
    badge: 'हमारी परिवहन सेवाएं',
    title: 'हर व्यवसाय के लिए विश्वसनीय परिवहन',
    subtitle:
      'हम व्यवसायों को उनका माल एक शहर से दूसरे शहर सुरक्षित पहुंचाने में मदद करते हैं। हमारी टीम समय पर डिलीवरी, वाहन जांच और उचित परिवहन समन्वय पर ध्यान केंद्रित करती है।',
    leftHeading: 'सुरक्षित और विश्वसनीय लंबी दूरी का परिवहन',
    p1: 'प्रिशा एक्सप्रेस में, हम विभिन्न शहरों और राज्यों में माल परिवहन में व्यवसायों की मदद करते हैं। चाहे आपको औद्योगिक सामग्री, ऑटोमोबाइल पार्ट्स या अन्य उत्पाद ले जाने हों, हमारी टीम हर डिलीवरी को सुचारू और समय पर करने के लिए काम करती है।',
    p2: 'हम प्रत्येक यात्रा की सावधानीपूर्वक योजना बनाते हैं। सुरक्षित परिवहन सुनिश्चित करने के लिए हमारी टीम वाहनों का समन्वय करती है, उनकी स्थिति की जांच करती है और ड्राइवरों को सहयोग देती है।',
    highlights: [
      {
        title: 'नियोजित डिलीवरी',
        desc: 'हम समय पर माल पहुंचाने के लिए परिवहन कार्यक्रम की योजना बनाते हैं।',
        icon: CalendarCheck,
      },
      {
        title: 'वाहन सुरक्षा जांच',
        desc: 'यात्रा शुरू करने से पहले वाहनों की पूरी जांच की जाती है।',
        icon: ShieldCheck,
      },
      {
        title: 'सत्यापित ड्राइवर',
        desc: 'ड्राइवरों की जांच कर उन्हें परिवहन कार्य के लिए चुना जाता है।',
        icon: UserCheck,
      },
      {
        title: 'कार्गो बीमा',
        desc: 'परिवहन के दौरान माल के लिए बीमा सहायता।',
        icon: FileCheck,
      },
    ],
    whyChooseTitle: 'व्यवसाय प्रिशा एक्सप्रेस को क्यों चुनते हैं',
    benefits: [
      {
        title: 'समय पर डिलीवरी',
        desc: 'अनावश्यक देरी से बचने के लिए हम डिलीवरी की सावधानीपूर्वक योजना बनाते हैं।',
        icon: Clock,
      },
      {
        title: 'परिवहन सहायता',
        desc: 'हमारी टीम वाहनों और परिवहन की जरूरतों का समन्वय करती है।',
        icon: Truck,
      },
      {
        title: 'सुरक्षा सर्वोपरि',
        desc: 'हम वाहन जांच और सुरक्षित माल परिवहन पर ध्यान केंद्रित करते हैं।',
        icon: ShieldCheck,
      },
    ],
    imageBadge: 'प्रिशा एक्सप्रेस लॉजिस्टिक्स टर्मिनल',
  },
  mr: {
    badge: 'आमच्या वाहतूक सेवा',
    title: 'प्रत्येक व्यवसायासाठी विश्वसनीय वाहतूक',
    subtitle:
      'आम्ही व्यवसायांना त्यांचा माल एका शहरातून दुसऱ्या शहरात सुरक्षितपणे पोहोचवण्यास मदत करतो. आमची टीम वेळेवर डिलिव्हरी, वाहन तपासणी आणि योग्य वाहतूक समन्वयावर लक्ष केंद्रित करते.',
    leftHeading: 'सुरक्षित आणि विश्वसनीय लांब पल्ल्याची वाहतूक',
    p1: 'प्रिशा एक्सप्रेसमध्ये, आम्ही विविध शहरांमध्ये आणि राज्यांमध्ये माल पोहोचवण्यासाठी व्यवसायांना मदत करतो. तुम्हाला औद्योगिक साहित्य, ऑटोमोबाईल सुटे भाग किंवा इतर उत्पादने वाहून न्यायची असली तरी, प्रत्येक डिलिव्हरी सुरळीत आणि वेळेवर करण्यासाठी आमची टीम काम करते.',
    p2: 'आम्ही प्रत्येक फेरीचे काळजीपूर्वक नियोजन करतो. सुरक्षित वाहतूक सुनिश्चित करण्यासाठी आमची टीम वाहनांचे समन्वय साधते, त्यांची स्थिती तपासते आणि चालकांना सहकार्य करते.',
    highlights: [
      {
        title: 'नियोजित डिलिव्हरी',
        desc: 'माल वेळेवर पोहोचण्यासाठी आम्ही वाहतूक वेळापत्रकांचे नियोजन करतो.',
        icon: CalendarCheck,
      },
      {
        title: 'वाहन सुरक्षा तपासणी',
        desc: 'प्रवास सुरू करण्यापूर्वी वाहनांची पूर्ण तपासणी केली जाते.',
        icon: ShieldCheck,
      },
      {
        title: 'पडताळणी झालेले चालक',
        desc: 'वाहतूक कामासाठी चालकांची तपासणी करून निवड केली जाते.',
        icon: UserCheck,
      },
      {
        title: 'कार्गो विमा',
        desc: 'वाहतुकीदरम्यान मालासाठी विमा सहाय्य.',
        icon: FileCheck,
      },
    ],
    whyChooseTitle: 'व्यवसाय प्रिशा एक्सप्रेस का निवडतात',
    benefits: [
      {
        title: 'वेळेवर डिलिव्हरी',
        desc: 'अनावश्यक विलंब टाळण्यासाठी आम्ही डिलिव्हरीचे काळजीपूर्वक नियोजन करतो.',
        icon: Clock,
      },
      {
        title: 'वाहतूक सहाय्य',
        desc: 'आमची टीम वाहने आणि वाहतूक गरजांचे समन्वय साधते.',
        icon: Truck,
      },
      {
        title: 'सुरक्षा प्रथम',
        desc: 'आम्ही वाहन तपासणी आणि सुरक्षित माल वाहतुकीवर भर देतो.',
        icon: ShieldCheck,
      },
    ],
    imageBadge: 'प्रिशा एक्सप्रेस लॉजिस्टिक्स टर्मिनल',
  },
};

export const TransportIntro: React.FC = () => {
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

  const t = introTranslations[lang] || introTranslations.en;

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
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-32 w-96 h-96 bg-purple-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* =========================================================================
              LEFT COLUMN: Headings, Simple Plain English Paragraphs & 4 Highlights
              ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:col-span-6 space-y-6"
          >
            {/* Left Subheading */}
            <motion.h3
              variants={itemVariants}
              className="text-2xl sm:text-3xl font-extrabold text-px-dark tracking-tight leading-tight"
            >
              {t.leftHeading}
            </motion.h3>

            {/* Paragraph 1 */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal"
            >
              {t.p1}
            </motion.p>

            {/* Paragraph 2 */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal"
            >
              {t.p2}
            </motion.p>

            {/* 4 Information Highlights in 2x2 Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-2"
            >
              {t.highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl bg-px-bg/80 border border-px-border/80 hover:border-purple-300 hover:shadow-xs hover:-translate-y-0.5 transition-all duration-200 flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 group-hover:bg-purple-200 transition-all duration-200 mt-0.5">
                      <Icon className="w-4 h-4 text-px-primary" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-xs sm:text-sm font-bold text-px-dark">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Why Businesses Choose Prisha Xpress */}
            <motion.div variants={itemVariants} className="pt-2 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-px-primary">
                <Sparkles className="w-3.5 h-3.5 text-px-primary shrink-0" />
                <span>{t.whyChooseTitle}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {t.benefits.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 hover:border-purple-200 hover:bg-purple-100/60 hover:-translate-y-0.5 hover:shadow-2xs transition-all duration-200 flex flex-col justify-between space-y-1.5 group"
                    >
                      <div className="w-7 h-7 rounded-xl bg-white border border-purple-200/80 flex items-center justify-center text-px-primary shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        <Icon className="w-3.5 h-3.5 text-px-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <h5 className="text-xs font-bold text-px-dark">
                          {b.title}
                        </h5>
                        <p className="text-[11px] text-gray-600 leading-snug">
                          {b.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Large Commercial Transportation & Warehouse Photography
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
              <div className="absolute -inset-1 bg-gradient-to-tr from-px-primary/20 via-purple-300/10 to-transparent rounded-3xl blur-md pointer-events-none" />

              <img
                src="/assets/images/logistics-hub.jpg"
                alt="Prisha Xpress Commercial Freight Trucks at Logistics Hub"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover object-center filter brightness-100 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient edge vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-px-deep/70 via-transparent to-transparent opacity-80 pointer-events-none" />

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
