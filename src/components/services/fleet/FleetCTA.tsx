// PRISHA XPRESS PVT. LTD. - 3PL FLEET MANAGEMENT FINAL CTA SECTION
// ROUTE: /services/3pl-fleet-management
// FULL-WIDTH AUTHENTIC WAREHOUSE & TRUCK BACKGROUND WITH DARK PURPLE GRADIENT OVERLAY
// HIGH-CONTRAST PURE WHITE HEADINGS, DUAL ACTION BUTTONS & ACCESSIBLE MOTION GRAPHICS

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PhoneCall, Truck, Sparkles } from 'lucide-react';

const ctaTranslations = {
  en: {
    badge: '3PL FLEET MANAGEMENT',
    title: 'Looking for a Reliable Fleet Management Partner?',
    desc: 'Let Prisha Xpress manage your fleet operations. We help businesses with vehicle management, driver support, maintenance coordination and smooth transportation operations.',
    btnProposal: 'Request a Fleet Proposal',
    btnCall: 'Call Us: +91 7276897727',
  },
  hi: {
    badge: '3PL बेड़ा प्रबंधन',
    title: 'क्या आप एक विश्वसनीय बेड़ा प्रबंधन भागीदार की तलाश में हैं?',
    desc: 'प्रिशा एक्सप्रेस को अपने बेड़े के संचालन का प्रबंधन करने दें। हम व्यवसायों को वाहन प्रबंधन, ड्राइवर सहायता, रखरखाव समन्वय और सुचारू परिवहन संचालन में मदद करते हैं।',
    btnProposal: 'फ्लीट प्रपोजल का अनुरोध करें',
    btnCall: 'कॉल करें: +91 7276897727',
  },
  mr: {
    badge: '3PL ताफा व्यवस्थापन',
    title: 'विश्वसनीय ताफा व्यवस्थापन भागीदाराच्या शोधात आहात?',
    desc: 'प्रिशा एक्सप्रेसला तुमच्या ताफ्याचे कामकाज व्यवस्थापित करू द्या. आम्ही वाहनांचे व्यवस्थापन, चालक सहाय्य, देखभाल समन्वय आणि सुरळीत वाहतूक कामकाजात व्यवसायांना मदत करतो.',
    btnProposal: 'ताफा प्रस्तावाची विनंती करा',
    btnCall: 'आम्हाला कॉल करा: +91 7276897727',
  },
};

export const FleetCTA: React.FC = () => {
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

  const t = ctaTranslations[lang] || ctaTranslations.en;

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative py-20 sm:py-24 lg:py-28 overflow-hidden text-white">
      {/* 1. Full-Width Commercial Logistics Truck & Warehouse Background Image */}
      <div className="absolute inset-0 z-0">
        <motion.img
          src="/assets/images/fleet-warehouse.jpg"
          alt="Prisha Xpress Commercial Trucks and Fleet Warehouse"
          className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
          initial={false}
          animate={
            shouldReduceMotion
              ? { scale: 1 }
              : { scale: [1, 1.04, 1] }
          }
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* 2. Deep Purple Gradient Overlays for High-Contrast White Text Visibility */}
        {/* Base rich dark purple gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1E0533]/95 via-[#2D0A4D]/88 to-[#1E0533]/95" />

        {/* Mobile vertical gradient reinforcement */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-[#1E0533]/95 via-[#2D0A4D]/90 to-[#1E0533]/95" />

        {/* Radial soft purple ambient lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2)_0%,transparent_75%)] pointer-events-none" />

        {/* Subtle moving light shimmer beam */}
        {!shouldReduceMotion && (
          <motion.div
            className="absolute -top-24 -left-1/2 w-full h-96 bg-gradient-to-r from-transparent via-purple-300/10 to-transparent skew-x-12 pointer-events-none"
            animate={{ x: ['0%', '200%'] }}
            transition={{
              repeat: Infinity,
              duration: 10,
              ease: 'linear',
            }}
          />
        )}
      </div>

      {/* 3. Centred Clean Content (No Oversized Box) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="space-y-6 sm:space-y-7"
        >
          {/* Small Top Label */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 shadow-sm">
              <Truck className="w-4 h-4 text-purple-300" />
              <span>{t.badge}</span>
            </span>
          </motion.div>

          {/* Main Heading (Pure Crisp White, 2 Lines Max on Desktop) */}
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-sm"
          >
            {t.title}
          </motion.h2>

          {/* Description (Soft Lavender / Off-White, Readable on Desktop & Mobile) */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-purple-100 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            {t.desc}
          </motion.p>

          {/* Action Buttons (Side by Side on Desktop, Stacked Vertically on Mobile) */}
          <motion.div
            variants={itemVariants}
            className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <Link
              to="/contact?service=3pl-fleet-management#enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white hover:bg-purple-50 text-px-primary font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>{t.btnProposal}</span>
              <ArrowRight className="w-4 h-4 text-px-primary group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Secondary Button */}
            <a
              href="tel:+917276897727"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <PhoneCall className="w-4 h-4 text-purple-200" />
              <span>{t.btnCall}</span>
            </a>
          </motion.div>

          {/* Subtle Trust Note */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex items-center justify-center gap-2 text-xs text-purple-200/80 font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Dedicated fleet operations team based in Kharadi, Pune</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
