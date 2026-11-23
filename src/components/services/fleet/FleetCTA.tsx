// PRISHA XPRESS PVT. LTD. - 3PL FLEET MANAGEMENT FINAL CTA SECTION
// ROUTE: /services/3pl-fleet-management
// PREMIUM COMPOSITION: VIVID TRUCK & WAREHOUSE BACKGROUND WITH LIGHT PURPLE OVERLAY (30-40%)
// CENTRED GLASS-EFFECT CONTENT PANEL, 3 KEY HIGHLIGHTS, DUAL ACTION BUTTONS & MOTION

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, PhoneCall, Truck, UserCheck, Wrench } from 'lucide-react';

const ctaTranslations = {
  en: {
    badge: '3PL FLEET MANAGEMENT',
    title: 'Looking for a Reliable Fleet Management Partner?',
    desc: 'Let Prisha Xpress take care of your fleet operations. From vehicle management and driver support to maintenance coordination, our team helps keep your business moving smoothly.',
    highlights: [
      { label: 'Fleet Operations Support', icon: Truck },
      { label: 'Driver Coordination', icon: UserCheck },
      { label: 'Vehicle Maintenance Support', icon: Wrench },
    ],
    btnEnquiry: 'Business Enquiry',
    btnCall: 'Call Us: +91 7276897727',
  },
  hi: {
    badge: '3PL बेड़ा प्रबंधन',
    title: 'क्या आप एक विश्वसनीय बेड़ा प्रबंधन भागीदार की तलाश में हैं?',
    desc: 'प्रिशा एक्सप्रेस को अपने बेड़े के संचालन का ध्यान रखने दें। वाहन प्रबंधन और ड्राइवर सहायता से लेकर रखरखाव समन्वय तक, हमारी टीम आपके व्यवसाय को सुचारू रूप से चलाने में मदद करती है।',
    highlights: [
      { label: 'फ्लीट ऑपरेशंस सहायता', icon: Truck },
      { label: 'ड्राइवर समन्वय', icon: UserCheck },
      { label: 'वाहन रखरखाव सहायता', icon: Wrench },
    ],
    btnEnquiry: 'व्यावसायिक पूछताछ',
    btnCall: 'कॉल करें: +91 7276897727',
  },
  mr: {
    badge: '3PL ताफा व्यवस्थापन',
    title: 'विश्वसनीय ताफा व्यवस्थापन भागीदाराच्या शोधात आहात?',
    desc: 'प्रिशा एक्सप्रेसला तुमच्या ताफ्याचे कामकाज सांभाळू द्या. वाहन व्यवस्थापन आणि चालक सहाय्यापासून ते देखभाल समन्वयापर्यंत, आमची टीम तुमचा व्यवसाय सुरळीत ठेवण्यास मदत करते.',
    highlights: [
      { label: 'ताफा कामकाज सहाय्य', icon: Truck },
      { label: 'चालक समन्वय', icon: UserCheck },
      { label: 'वाहन देखभाल सहाय्य', icon: Wrench },
    ],
    btnEnquiry: 'व्यावसायिक विचारणा',
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

  // Stagger animation container
  const panelVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.15,
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
    <section className="relative min-h-[580px] lg:min-h-[620px] flex items-center justify-center py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* =========================================================================
          1. LAYER 1: Full-Width Real Commercial Logistics Truck & Warehouse Photo
          ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src="/assets/images/fleet-warehouse.jpg"
          alt="Prisha Xpress Commercial Logistics Fleet and Warehouse"
          className="w-full h-full object-cover object-center filter brightness-100 contrast-105"
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
            2. LAYER 2: Subtle 30-40% Dark Purple Gradient Overlay
            (Warehouse, trucks, asphalt and sky remain clearly visible)
            ========================================================================= */}
        {/* Subtle horizontal gradient overlay (~35% purple) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A052E]/45 via-[#2A0845]/35 to-[#1A052E]/45" />

        {/* Subtle bottom vignette to blend naturally */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150326]/60 via-transparent to-[#150326]/30" />

        {/* Subtle moving ambient light shimmer */}
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
          3. LAYER 3: Centred Glass-Effect Content Panel (Rounded ~24px)
          Surrounding warehouse/truck background stays clearly visible around it
          ========================================================================= */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={panelVariants}
          className="p-6 sm:p-10 lg:p-12 rounded-[24px] bg-[#1A052E]/65 backdrop-blur-md border border-white/20 shadow-2xl text-center space-y-6 sm:space-y-7 relative overflow-hidden"
        >
          {/* Subtle top border highlight shine */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Small Label Badge */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-200 shadow-sm">
              <Truck className="w-4 h-4 text-purple-300" />
              <span>{t.badge}</span>
            </span>
          </motion.div>

          {/* Main Heading (Pure Crisp White, 2 Lines Max on Desktop, 27-30px on Mobile) */}
          <motion.h2
            variants={itemVariants}
            className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-3xl mx-auto drop-shadow-md"
          >
            {t.title}
          </motion.h2>

          {/* Description (White with High Readability Contrast, ~15-16px on Mobile) */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base md:text-lg text-purple-100/95 font-normal leading-relaxed max-w-2xl mx-auto"
          >
            {t.desc}
          </motion.p>

          {/* 3 Visual Highlights in a Horizontal Row on Desktop / Wrapped on Mobile */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-1"
          >
            {t.highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-sm text-xs sm:text-sm font-semibold text-white/95 shadow-sm transition-all duration-200 group"
                >
                  <Icon className="w-4 h-4 text-purple-300 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </motion.div>

          {/* Action Buttons (Side by Side on Desktop, Stacked Vertically on Mobile) */}
          <motion.div
            variants={itemVariants}
            className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          >
            {/* Primary Button */}
            <Link
              to="/contact?service=3pl-fleet-management#enquiry"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white hover:bg-purple-50 text-px-primary font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span>{t.btnEnquiry}</span>
              <ArrowRight className="w-4 h-4 text-px-primary group-hover:translate-x-1.5 transition-transform" />
            </Link>

            {/* Secondary Button */}
            <a
              href="tel:+917276897727"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/30 backdrop-blur-sm shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <PhoneCall className="w-4 h-4 text-purple-200" />
              <span>{t.btnCall}</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
