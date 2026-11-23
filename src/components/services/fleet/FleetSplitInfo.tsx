// PRISHA XPRESS PVT. LTD. - 3PL FLEET MANAGEMENT COMPARISON SECTION
// ROUTE: /services/3pl-fleet-management
// CUSTOMER-FRIENDLY BEFORE VS AFTER COMPARISON (IN-HOUSE VS PRISHA XPRESS DEDICATED SUPPORT)
// FULL MULTILINGUAL SUPPORT (EN, HI, MR) & ACCESSIBLE MOTION GRAPHICS

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Clock,
  Wrench,
  Users,
  AlertTriangle,
  Route,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const splitTranslations = {
  en: {
    badge: 'WHY CHOOSE PRISHA XPRESS?',
    title: 'Manage Your Fleet Better with Prisha Xpress',
    subtitle:
      'Managing trucks, drivers and daily transport operations can take a lot of time. Prisha Xpress helps businesses manage these activities with dedicated transport and fleet support.',
    leftCard: {
      badge: 'WITHOUT DEDICATED FLEET SUPPORT',
      title: 'Managing Fleet Yourself',
      desc: 'Handling all fleet activities on your own can increase your daily workload.',
      points: [
        {
          title: 'More Daily Follow-ups',
          desc: 'You need to coordinate drivers, vehicles and transport schedules yourself.',
        },
        {
          title: 'Maintenance Coordination',
          desc: 'You need to arrange vehicle servicing and repairs when required.',
        },
        {
          title: 'Driver Management',
          desc: 'Managing driver availability, documents and daily requirements takes time.',
        },
        {
          title: 'Transport Delays',
          desc: 'Unexpected vehicle or driver issues can affect delivery schedules.',
        },
      ],
    },
    rightCard: {
      badge: 'WITH PRISHA XPRESS',
      title: 'Dedicated Fleet Management Support',
      desc: 'Our team helps businesses manage transport and fleet activities more smoothly.',
      points: [
        {
          title: 'Transport Coordination',
          desc: 'Support for daily transport planning and vehicle coordination.',
        },
        {
          title: 'Vehicle Maintenance Support',
          desc: 'Assistance with vehicle servicing and maintenance coordination.',
        },
        {
          title: 'Driver Support',
          desc: 'Support with driver requirements and availability.',
        },
        {
          title: 'Better Fleet Planning',
          desc: 'Help businesses organise their fleet operations and reduce unnecessary delays.',
        },
      ],
    },
    bottom: {
      title: 'Focus More on Growing Your Business',
      desc: 'Let Prisha Xpress support your transport and fleet management activities while you focus on your customers and business growth.',
      buttonText: 'Explore 3PL Fleet Management',
    },
  },
  hi: {
    badge: 'प्रिशा एक्सप्रेस क्यों चुनें?',
    title: 'प्रिशा एक्सप्रेस के साथ अपने बेड़े को बेहतर ढंग से संभालें',
    subtitle:
      'ट्रक, ड्राइवर और दैनिक परिवहन संचालन को संभालने में काफी समय लग सकता है। प्रिशा एक्सप्रेस समर्पित सहायता के साथ इन गतिविधियों को संभालने में व्यवसायों की मदद करती है।',
    leftCard: {
      badge: 'समर्पित बेड़ा सहायता के बिना',
      title: 'स्वयं बेड़ा प्रबंधन',
      desc: 'सभी बेड़ा गतिविधियों को खुद संभालने से आपका दैनिक कार्यभार बढ़ सकता है।',
      points: [
        {
          title: 'अधिक दैनिक फॉलो-अप',
          desc: 'आपको ड्राइवर, वाहन और परिवहन समय-सारणी का समन्वय खुद करना पड़ता है।',
        },
        {
          title: 'रखरखाव समन्वय',
          desc: 'आवश्यकता पड़ने पर वाहन सर्विसिंग और मरम्मत का प्रबंध खुद करना होता है।',
        },
        {
          title: 'ड्राइवर प्रबंधन',
          desc: 'ड्राइवर उपलब्धता, दस्तावेज और दैनिक जरूरतों को संभालने में समय लगता है।',
        },
        {
          title: 'परिवहन में देरी',
          desc: 'अचानक वाहन या ड्राइवर की समस्याओं से डिलीवरी कार्यक्रम प्रभावित हो सकते हैं।',
        },
      ],
    },
    rightCard: {
      badge: 'प्रिशा एक्सप्रेस के साथ',
      title: 'समर्पित बेड़ा प्रबंधन सहायता',
      desc: 'हमारी टीम व्यवसायों को परिवहन और बेड़ा गतिविधियों को अधिक सुचारू रूप से चलाने में मदद करती है।',
      points: [
        {
          title: 'परिवहन समन्वय',
          desc: 'दैनिक परिवहन योजना और वाहन समन्वय के लिए सक्रिय सहायता।',
        },
        {
          title: 'वाहन रखरखाव सहायता',
          desc: 'वाहन सर्विसिंग और समय पर रखरखाव समन्वय में सहयोग।',
        },
        {
          title: 'ड्राइवर सहायता',
          desc: 'ड्राइवर आवश्यकताओं और उपलब्धता में निरंतर सहायता।',
        },
        {
          title: 'बेहतर बेड़ा योजना',
          desc: 'व्यवसायों को अपने बेड़े के संचालन को व्यवस्थित करने और अनावश्यक देरी को कम करने में मदद।',
        },
      ],
    },
    bottom: {
      title: 'अपने व्यवसाय के विकास पर अधिक ध्यान दें',
      desc: 'प्रिशा एक्सप्रेस को अपनी परिवहन और बेड़ा गतिविधियों में मदद करने दें, जबकि आप अपने ग्राहकों और व्यावसायिक विकास पर ध्यान केंद्रित करें।',
      buttonText: '3PL बेड़ा प्रबंधन जानें',
    },
  },
  mr: {
    badge: 'प्रिशा एक्सप्रेस का निवडावी?',
    title: 'प्रिशा एक्सप्रेससह तुमचा ताफा अधिक चांगल्या प्रकारे व्यवस्थापित करा',
    subtitle:
      'ट्रक्स, चालक आणि दैनंदिन वाहतूक कामकाज हाताळण्यात बराच वेळ जाऊ शकतो. प्रिशा एक्सप्रेस समर्पित वाहतूक आणि ताफा सहाय्याने व्यवसायांना मदत करते.',
    leftCard: {
      badge: 'समर्पित ताफा सहाय्याशिवाय',
      title: 'स्वतः ताफा व्यवस्थापन करणे',
      desc: 'सर्व ताफा कामकाज स्वतः सांभाळल्याने तुमचा दैनंदिन कामाचा ताण वाढू शकतो.',
      points: [
        {
          title: 'अधिक दैनंदिन पाठपुरावा',
          desc: 'तुम्हाला चालक, वाहने आणि वाहतूक वेळापत्रकांचे समन्वय स्वतः करावे लागते.',
        },
        {
          title: 'देखभाल समन्वय',
          desc: 'गरज भासल्यास वाहनांची सर्व्हिसिंग आणि दुरुस्ती स्वतः आयोजित करावी लागते.',
        },
        {
          title: 'चालक व्यवस्थापन',
          desc: 'चालकांची उपलब्धता, कागदपत्रे आणि दैनंदिन गरजा सांभाळण्यात वेळ खर्च होतो.',
        },
        {
          title: 'वाहतुकीस विलंब',
          desc: 'अचानक उद्भवणाऱ्या वाहन किंवा चालक समस्यांमुळे डिलिव्हरीच्या वेळापत्रकावर परिणाम होऊ शकतो.',
        },
      ],
    },
    rightCard: {
      badge: 'प्रिशा एक्सप्रेससह',
      title: 'समर्पित ताफा व्यवस्थापन सहाय्य',
      desc: 'आमची टीम व्यवसायांना वाहतूक आणि ताफ्याची कामे अधिक सुरळीतपणे चालवण्यास मदत करते.',
      points: [
        {
          title: 'वाहतूक समन्वय',
          desc: 'दैनंदिन वाहतूक नियोजन आणि वाहन समन्वयासाठी सक्रिय पाठबळ.',
        },
        {
          title: 'वाहन देखभाल सहाय्य',
          desc: 'वाहन सर्व्हिसिंग आणि वेळेवर देखभालीच्या समन्वयात मदत.',
        },
        {
          title: 'चालक सहाय्य',
          desc: 'चालकांच्या गरजा आणि उपलब्धतेमध्ये सातत्यपूर्ण सहकार्य.',
        },
        {
          title: 'उत्तम ताफा नियोजन',
          desc: 'व्यवसायांना ताफ्याचे कामकाज व्यवस्थित करण्यास आणि अनावश्यक विलंब टाळण्यास मदत.',
        },
      ],
    },
    bottom: {
      title: 'तुमचा व्यवसाय वाढवण्यावर अधिक लक्ष केंद्रित करा',
      desc: 'प्रिशा एक्सप्रेसला तुमच्या वाहतूक आणि ताफा व्यवस्थापनात मदत करू द्या, जेणेकरून तुम्ही ग्राहक आणि व्यवसाय वाढीवर लक्ष देऊ शकाल.',
      buttonText: '3PL ताफा व्यवस्थापन पाहा',
    },
  },
};

const leftIcons = [Clock, Wrench, Users, AlertTriangle];
const rightIcons = [Route, ShieldCheck, UserCheck, TrendingUp];

export const FleetSplitInfo: React.FC = () => {
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

  const t = splitTranslations[lang] || splitTranslations.en;

  // Animation variants
  const headerVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const cardLeftVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const cardRightVariants = {
    hidden: { opacity: 0, x: shouldReduceMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle background ambient purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centred Heading & Subtitle */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-px-lavender/80 text-px-primary border border-px-border shadow-xs">
            <span className="w-2 h-2 rounded-full bg-px-primary animate-ping" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-px-dark tracking-tight leading-tight">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-700 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* 2-Column Comparison Cards (Side-by-Side on Desktop, Stacked on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* LEFT CARD – Managing Your Fleet Yourself */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardLeftVariants}
            className="group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-rose-50/70 via-rose-50/20 to-white border border-rose-200/80 shadow-xs hover:shadow-md hover:border-rose-300 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="mb-6 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-100/80 text-rose-700 border border-rose-200">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{t.leftCard.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-px-dark tracking-tight">
                  {t.leftCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {t.leftCard.desc}
                </p>
              </div>

              {/* 4 Points */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={listVariants}
                className="space-y-3 sm:space-y-3.5"
              >
                {t.leftCard.points.map((pt, idx) => {
                  const Icon = leftIcons[idx] || AlertCircle;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/80 border border-rose-100 hover:bg-white hover:border-rose-200 hover:shadow-2xs transition-all duration-200 flex items-start gap-3.5 group/item"
                    >
                      <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200/70 flex items-center justify-center text-rose-600 shrink-0 group-hover/item:scale-105 group-hover/item:bg-rose-100 transition-all duration-200 mt-0.5">
                        <Icon className="w-4 h-4 text-rose-600" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                          {pt.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT CARD – Prisha Xpress Fleet Support */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardRightVariants}
            className="group rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-purple-50/80 via-purple-50/30 to-white border-2 border-purple-300 shadow-soft-purple hover:shadow-glow-purple hover:border-px-primary hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Soft decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-200/40 to-transparent rounded-bl-full pointer-events-none" />

            <div>
              {/* Card Header */}
              <div className="mb-6 space-y-2 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100 text-px-primary border border-purple-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.rightCard.badge}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-px-dark tracking-tight">
                  {t.rightCard.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {t.rightCard.desc}
                </p>
              </div>

              {/* 4 Points */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={listVariants}
                className="space-y-3 sm:space-y-3.5 relative z-10"
              >
                {t.rightCard.points.map((pt, idx) => {
                  const Icon = rightIcons[idx] || CheckCircle2;
                  return (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5 group/item"
                    >
                      <div className="w-9 h-9 rounded-xl bg-purple-100/80 border border-purple-200 flex items-center justify-center text-px-primary shrink-0 group-hover/item:scale-105 group-hover/item:bg-purple-200 transition-all duration-200 mt-0.5">
                        <Icon className="w-4 h-4 text-px-primary" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                          {pt.title}
                        </h4>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Horizontal Highlight Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={bottomVariants}
          className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-50/90 via-white to-purple-50/90 border border-purple-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1.5 text-center md:text-left max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-px-primary shrink-0" />
              <h4 className="text-base sm:text-lg md:text-xl font-black text-px-dark tracking-tight">
                {t.bottom.title}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.bottom.desc}
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-px-primary hover:bg-px-violet text-white font-bold text-xs sm:text-sm shadow-soft-purple hover:shadow-glow-purple transition-all duration-300 shrink-0 group w-full md:w-auto text-center"
          >
            <span>{t.bottom.buttonText}</span>
            <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
