import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../../common/SectionHeading';
import { Activity, Wrench, Fuel, Layers, CheckCircle2 } from 'lucide-react';

// Multilingual translations for FleetTelemetryDashboard component
const telemetryTranslations = {
  en: {
    badge: 'LIVE TRACKING & FLEET CARE',
    title: 'How We Track & Care for Your Fleet',
    subtitle:
      'Clear visibility into every truck and predictable monthly running costs—so you always know where your vehicles and goods stand.',
    cards: [
      {
        metric: 'High Uptime',
        metricLabel: 'ON-TIME FOCUS',
        title: 'Smooth Trip & Truck Scheduling',
        desc: 'Matching available trucks and trailers with ready loads quickly so your vehicles spend less time waiting at gates or depots.',
        bottomLabel: 'Checked & Active',
      },
      {
        metric: 'Every 3,000 km',
        metricLabel: 'REGULAR CHECKUP',
        title: 'Regular Safety & Engine Checks',
        desc: 'Checking brakes, springs, steering, tyres, and engine health on schedule so small issues are caught before they cause breakdowns.',
        bottomLabel: 'Checked & Active',
      },
      {
        metric: 'Up to 12–15%',
        metricLabel: 'DIESEL & COST SAVING',
        title: 'Better Diesel Mileage & Less Idling',
        desc: 'Guiding drivers on steady speeds, smart routes, and proper tyre air pressure to cut extra diesel burn and unnecessary idling.',
        bottomLabel: 'Checked & Active',
      },
      {
        metric: 'All-in-One',
        metricLabel: 'COMPLETE FLEET CARE',
        title: 'Drivers, Servicing & Parts in One Plan',
        desc: 'Verified drivers, regular servicing, genuine parts, and trip support managed together under one simple agreement.',
        bottomLabel: 'Checked & Active',
      },
    ],
  },
  hi: {
    badge: 'लाइव ट्रैकिंग और बेड़ा देखभाल',
    title: 'हम आपके बेड़े को कैसे ट्रैक और संभालते हैं',
    subtitle:
      'हर ट्रक की स्पष्ट दृश्यता और अनुमानित मासिक परिचालन लागत—ताकि आप हमेशा जानें कि आपके वाहन और माल कहाँ हैं।',
    cards: [
      {
        metric: 'उच्च अपटाइम',
        metricLabel: 'समय पर डिलीवरी लक्ष्य',
        title: 'सुगम ट्रिप और ट्रक शेड्यूलिंग',
        desc: 'उपलब्ध ट्रकों और ट्रेलरों को तैयार माल के साथ तेजी से जोड़ना ताकि आपके वाहन गेट या डिपो पर कम समय रुकें।',
        bottomLabel: 'जांचा और सक्रिय',
      },
      {
        metric: 'प्रत्येक 3,000 किमी',
        metricLabel: 'नियमित जांच',
        title: 'नियमित सुरक्षा और इंजन जांच',
        desc: 'ब्रेक, स्प्रिंग्स, स्टीयरिंग, टायर और इंजन स्वास्थ्य की समय पर जांच ताकि छोटी समस्याएं ब्रेकडाउन बनने से पहले पकड़ी जा सकें।',
        bottomLabel: 'जांचा और सक्रिय',
      },
      {
        metric: '12–15% तक',
        metricLabel: 'डीजल और लागत बचत',
        title: 'बेहतर डीजल माइलेज और कम आइडलिंग',
        desc: 'अतिरिक्त डीजल खपत और अनावश्यक आइडलिंग रोकने के लिए चालकों को स्थिर गति, स्मार्ट रूट और सही टायर प्रेशर का मार्गदर्शन।',
        bottomLabel: 'जांचा और सक्रिय',
      },
      {
        metric: 'ऑल-इन-वन',
        metricLabel: 'पूर्ण बेड़ा देखभाल',
        title: 'चालक, सर्विसिंग और पार्ट्स एक ही योजना में',
        desc: 'सत्यापित चालक, नियमित सर्विसिंग, असली पार्ट्स और ट्रिप सहायता—सब एक सरल अनुबंध के तहत प्रबंधित।',
        bottomLabel: 'जांचा और सक्रिय',
      },
    ],
  },
  mr: {
    badge: 'थेट ट्रॅकिंग आणि ताफा काळजी',
    title: 'आम्ही तुमच्या ताफ्याची काळजी आणि ट्रॅकिंग कसे करतो',
    subtitle:
      'प्रत्येक ट्रकची स्पष्ट दृश्यमानता आणि अंदाजण्याजोगे मासिक परिचालन खर्च—जेणेकरून तुमची वाहने आणि माल कुठे आहेत हे नेहमी समजेल.',
    cards: [
      {
        metric: 'उच्च अपटाइम',
        metricLabel: 'वेळेवर पोहोच लक्ष्य',
        title: 'सुरळीत फेरी आणि ट्रक नियोजन',
        desc: 'उपलब्ध ट्रक्स आणि ट्रेलर्स तयार मालासह त्वरित जुळवणे जेणेकरून तुमची वाहने गेट किंवा डेपोवर कमी वेळ थांबतील.',
        bottomLabel: 'तपासलेले आणि सक्रिय',
      },
      {
        metric: 'प्रत्येक ३,००० किमी',
        metricLabel: 'नियमित तपासणी',
        title: 'नियमित सुरक्षा आणि इंजिन तपासणी',
        desc: 'ब्रेक, स्प्रिंग्स, स्टेअरिंग, टायर्स आणि इंजिनची वेळेवर तपासणी जेणेकरून लहान समस्या ब्रेकडाऊन होण्यापूर्वी समजतील.',
        bottomLabel: 'तपासलेले आणि सक्रिय',
      },
      {
        metric: '१२–१५% पर्यंत',
        metricLabel: 'डिझेल व खर्च बचत',
        title: 'उत्तम डिझेल मायलेज आणि कमी आयडलिंग',
        desc: 'अतिरिक्त डिझेल जळणे आणि अनावश्यक आयडलिंग कमी करण्यासाठी चालकांना योग्य वेग, स्मार्ट मार्ग आणि योग्य टायर प्रेशरचे मार्गदर्शन.',
        bottomLabel: 'तपासलेले आणि सक्रिय',
      },
      {
        metric: 'सर्व काही एकाच ठिकाणी',
        metricLabel: 'संपूर्ण ताफा काळजी',
        title: 'चालक, सर्व्हिसिंग आणि पार्ट्स एकाच योजनेत',
        desc: 'पडताळणी झालेले चालक, नियमित सर्व्हिसिंग, अस्सल सुटे भाग आणि फेरी सहाय्य एका सोप्या कराराखाली एकत्रित व्यवस्थापित.',
        bottomLabel: 'तपासलेले आणि सक्रिय',
      },
    ],
  },
};

const panelIcons = [Activity, Wrench, Fuel, Layers];

export const FleetTelemetryDashboard: React.FC = () => {
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

  const t = telemetryTranslations[lang] || telemetryTranslations.en;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="py-20 bg-px-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {t.cards.map((card, idx) => {
            const Icon = panelIcons[idx];
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative p-7 rounded-3xl bg-white border border-px-border shadow-soft-purple hover:shadow-[0_20px_35px_-10px_rgba(112,47,138,0.18)] hover:border-purple-300 transition-all duration-500 ease-out hover:-translate-y-1.5 flex flex-col justify-between h-full"
              >
                {/* Top Corner Subtle Glow on Hover */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-tr-3xl rounded-bl-full pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-500" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between gap-3">
                    {/* Top-Left Icon Badge with Subtle Hover Motion */}
                    <div className="p-3 rounded-2xl bg-px-lavender text-px-primary group-hover:scale-110 group-hover:bg-purple-100 group-hover:text-px-violet group-hover:shadow-sm transition-all duration-400 ease-out shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Top-Right Metric and Sub-Label */}
                    <div className="text-right">
                      <span className="text-lg font-black text-px-deep font-mono block tracking-tight group-hover:text-px-primary transition-colors duration-300">
                        {card.metric}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-purple-700/80 tracking-wider block mt-0.5">
                        {card.metricLabel}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base sm:text-lg font-bold text-px-dark leading-snug group-hover:text-px-primary transition-colors duration-300 pt-1">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom Checked & Active Status Badge */}
                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-bold text-px-violet relative z-10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{card.bottomLabel}</span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};