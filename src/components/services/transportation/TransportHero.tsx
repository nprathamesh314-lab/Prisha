// PRISHA XPRESS PVT. LTD. - TRANSPORTATION SERVICE HERO SECTION
// ROUTE: /services/transportation
// PREMIUM CINEMATIC LOGISTICS HERO: VIVID HIGHWAY FREIGHT TRUCKS BACKGROUND
// LEFT-ALIGNED SEMI-TRANSPARENT LIGHT GLASS PANEL WITH HIGH-CONTRAST DARK PURPLE TEXT
// 3 SERVICE HIGHLIGHTS, DUAL ACTION BUTTONS, ACCESSIBLE FRAMER MOTION & MULTILINGUAL

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Clock,
  Compass,
} from 'lucide-react';
import { Breadcrumbs } from '../../common/Breadcrumbs';

const heroTranslations = {
  en: {
    badge: 'PAN-INDIA TRANSPORT SERVICES',
    title: 'Moving Your Goods Safely Across India',
    desc: 'We provide reliable transportation services to help businesses move their goods from one place to another on time. Our team supports smooth delivery, proper coordination and safe transportation.',
    highlights: [
      { label: 'Reliable Goods Transport', icon: ShieldCheck },
      { label: 'On-Time Delivery Coordination', icon: Clock },
      { label: 'Support Across India', icon: Compass },
    ],
    btnBook: 'Book Transportation',
    btnExplore: 'Explore Our Services',
  },
  hi: {
    badge: 'अखिल भारतीय परिवहन सेवाएं',
    title: 'पूरे भारत में आपका माल सुरक्षित पहुंचाना',
    desc: 'हम व्यवसायों को उनका माल एक स्थान से दूसरे स्थान पर समय पर पहुंचाने के लिए विश्वसनीय परिवहन सेवाएं प्रदान करते हैं। हमारी टीम सुचारू डिलीवरी, उचित समन्वय और सुरक्षित परिवहन का समर्थन करती है।',
    highlights: [
      { label: 'विश्वसनीय माल परिवहन', icon: ShieldCheck },
      { label: 'समय पर डिलीवरी समन्वय', icon: Clock },
      { label: 'पूरे भारत में सहायता', icon: Compass },
    ],
    btnBook: 'परिवहन बुक करें',
    btnExplore: 'हमारी सेवाएं देखें',
  },
  mr: {
    badge: 'अखिल भारतीय वाहतूक सेवा',
    title: 'संपूर्ण भारतात तुमचा माल सुरक्षितपणे पोहोचवणे',
    desc: 'व्यवसायांना त्यांचा माल एका ठिकाणाहून दुसऱ्या ठिकाणी वेळेवर नेण्यासाठी आम्ही विश्वसनीय वाहतूक सेवा प्रदान करतो. आमची टीम सुरळीत डिलिव्हरी, योग्य समन्वय आणि सुरक्षित वाहतुकीस मदत करते.',
    highlights: [
      { label: 'विश्वसनीय माल वाहतूक', icon: ShieldCheck },
      { label: 'वेळेवर डिलिव्हरी समन्वय', icon: Clock },
      { label: 'संपूर्ण भारतात पाठबळ', icon: Compass },
    ],
    btnBook: 'वाहतूक बुक करा',
    btnExplore: 'आमच्या सेवा पाहा',
  },
};

export const TransportHero: React.FC = () => {
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
  const panelVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
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

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center pt-28 pb-16 lg:py-24 overflow-hidden">
      {/* =========================================================================
          1. LAYER 1: Full-Width Real Commercial Logistics Freight Photography
          Trucks and highway road clearly visible and not obscured by dark overlay
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/assets/images/network-map.jpg"
          alt="Prisha Xpress Commercial Transportation on Highway"
          className="w-full h-full object-cover object-[75%_center] lg:object-[80%_center] filter brightness-105 contrast-100"
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
            2. LAYER 2: Light Purple Transparent Overlay (15-25%)
            Ensures trucks, highway, and background landscape stay vibrant and visible
            ========================================================================= */}
        {/* Soft directional gradient: slightly darker behind the left card, fully clear on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-950/35 via-purple-900/20 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/45 via-purple-900/25 to-purple-900/15 md:hidden" />

        {/* Subtle moving ambient light shimmer across background */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
            animate={{ x: ['-100%', '200%'] }}
            transition={{
              repeat: Infinity,
              duration: 12,
              ease: 'linear',
            }}
          />
        )}
      </div>

      {/* =========================================================================
          3. LAYER 3: Left-Aligned Light-Purple / White Glass Content Panel
          Takes ~55-60% width on desktop, leaving trucks clearly visible on the right
          ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Breadcrumbs Navigation */}
        <div className="mb-4 sm:mb-6 flex justify-start">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Transportation' },
            ]}
            theme="dark"
          />
        </div>

        {/* Content Glass Panel */}
        <div className="w-full lg:max-w-2xl xl:max-w-[640px]">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={panelVariants}
            className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-white/92 backdrop-blur-md border border-white/70 shadow-2xl space-y-5 sm:space-y-6 text-px-dark relative overflow-hidden"
          >
            {/* Fine Top Border Shine */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-300 via-px-primary to-purple-300 opacity-60" />

            {/* Small Label Badge */}
            <motion.div variants={itemVariants} className="flex justify-start">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/90 border border-purple-200 text-xs sm:text-sm font-bold uppercase tracking-wider text-px-primary shadow-2xs">
                <Truck className="w-4 h-4 text-px-primary" />
                <span>{t.badge}</span>
              </span>
            </motion.div>

            {/* Main Heading (Pure Dark Purple, Simple & Direct Indian English) */}
            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-black text-px-dark tracking-tight leading-[1.2]"
            >
              {t.title}
            </motion.h1>

            {/* Description (Readable, Clear, Plain English) */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-[#F5C7FF] drop-shadow-[0_1px_2px_rgba(26,5,46,0.85)] leading-relaxed font-normal"
            >
              {t.desc}
            </motion.p>

            {/* 3 Visual Highlights */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1"
            >
              {t.highlights.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 rounded-2xl bg-purple-50/80 border border-purple-100/90 flex items-center gap-2.5 text-xs font-bold text-px-dark shadow-2xs hover:bg-purple-100/70 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-purple-200/60 flex items-center justify-center text-px-primary shrink-0 shadow-2xs">
                      <Icon className="w-4 h-4 text-px-primary" />
                    </div>
                    <span className="leading-tight">{item.label}</span>
                  </div>
                );
              })}
            </motion.div>

            {/* Action Buttons (Side by Side on Desktop, Stacked on Mobile) */}
            <motion.div
              variants={itemVariants}
              className="pt-2 flex flex-col sm:flex-row items-center gap-3.5"
            >
              {/* Primary Button */}
              <Link
                to="/contact?service=transportation#enquiry"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-px-primary hover:bg-px-violet text-white font-bold text-sm shadow-soft-purple hover:shadow-glow-purple hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>{t.btnBook}</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1.5 transition-transform" />
              </Link>

              {/* Secondary Button */}
              <Link
                to="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-purple-50 text-px-primary font-bold text-sm border border-purple-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all duration-300"
              >
                <span>{t.btnExplore}</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
