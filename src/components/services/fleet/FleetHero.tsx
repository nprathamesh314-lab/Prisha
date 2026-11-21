import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, Activity, CheckCircle2, Wrench, ShieldCheck } from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

// Multilingual translations for FleetHero component
const heroTranslations = {
  en: {
    badge: 'END-TO-END FLEET & 3PL MANAGEMENT',
    breadcrumbServices: 'Services',
    breadcrumbCurrent: '3PL Fleet Management',
    title: 'Hassle-Free Fleet Management for Your Business',
    subheading:
      'Stop worrying about truck breakdowns, driver shortages, and delayed trips. From timely vehicle servicing and police-verified drivers to daily route planning, we manage your entire fleet operations so your business runs smoothly and profitably.',
    primaryBtn: 'Business Enquiry',
    secondaryBtn: 'View Our Delivery Routes',
    trustStrip: [
      'Police-Verified HMV Drivers',
      '24/7 Pune Control Room',
      'Flexible Monthly & Yearly Contracts',
    ],
    card: {
      header: 'HOW WE MANAGE YOUR FLEET',
      badge: 'LIVE PUNE CONTROL',
      miniCard1: {
        label: 'Vehicle Care',
        title: 'Timely Servicing',
        subtext: 'Preventing Road Breakdowns',
      },
      miniCard2: {
        label: 'Driver Team',
        title: 'Verified Drivers',
        subtext: 'Trained Highway & Local Staff',
      },
      progress: {
        leftLabel: 'Trip & Route Planning',
        rightLabel: 'On-Time Delivery Tracking',
      },
      footerNote: '24/7 Live Supervision from Prisha Xpress Pune Hub.',
    },
  },
  hi: {
    badge: 'एंड-टू-एंड फ्लीट और 3PL प्रबंधन',
    breadcrumbServices: 'सेवाएं',
    breadcrumbCurrent: '3PL फ्लीट प्रबंधन',
    title: 'आपके व्यवसाय के लिए परेशानी मुक्त फ्लीट प्रबंधन',
    subheading:
      'ट्रक ब्रेकडाउन, चालक की कमी और लेट ट्रिप की चिंता छोड़ें। समय पर वाहन सर्विसिंग और पुलिस-सत्यापित चालकों से लेकर दैनिक रूट प्लानिंग तक, हम आपके पूरे बेड़े का प्रबंधन करते हैं ताकि आपका व्यवसाय सुचारू रूप से चले।',
    primaryBtn: 'व्यावसायिक पूछताछ',
    secondaryBtn: 'हमारे डिलीवरी रूट्स देखें',
    trustStrip: [
      'पुलिस-सत्यापित HMV चालक',
      '24/7 पुणे कंट्रोल रूम',
      'लचीले मासिक और वार्षिक अनुबंध',
    ],
    card: {
      header: 'हम आपके फ्लीट का प्रबंधन कैसे करते हैं',
      badge: 'लाइव पुणे कंट्रोल',
      miniCard1: {
        label: 'वाहन देखभाल',
        title: 'समय पर सर्विसिंग',
        subtext: 'सड़क ब्रेकडाउन की रोकथाम',
      },
      miniCard2: {
        label: 'चालक दल',
        title: 'सत्यापित चालक',
        subtext: 'प्रशिक्षित हाईवे और स्थानीय स्टाफ',
      },
      progress: {
        leftLabel: 'ट्रिप और रूट प्लानिंग',
        rightLabel: 'समय पर डिलीवरी ट्रैकिंग',
      },
      footerNote: 'प्रिशा एक्सप्रेस पुणे हब से 24/7 लाइव निगरानी।',
    },
  },
  mr: {
    badge: 'एंड-टू-एंड ताफा आणि 3PL व्यवस्थापन',
    breadcrumbServices: 'सेवा',
    breadcrumbCurrent: '3PL ताफा व्यवस्थापन',
    title: 'तुमच्या व्यवसायासाठी त्रासमुक्त ताफा व्यवस्थापन',
    subheading:
      'ट्रक ब्रेकडाऊन, चालकांची टंचाई आणि लेट ट्रिप्सची चिंता सोडा. वेळेवर वाहन सर्व्हिसिंग आणि पोलीस-पडताळणी झालेल्या चालकांपासून ते दैनंदिन रूट प्लॅनिंगपर्यंत, आम्ही तुमच्या संपूर्ण ताफ्याचे व्यवस्थापन करतो जेणेकरून तुमचा व्यवसाय सुरळीत चालेल.',
    primaryBtn: 'व्यावसायिक चौकशी',
    secondaryBtn: 'आमचे वाहतूक मार्ग पहा',
    trustStrip: [
      'पोलीस-पडताळणी झालेले HMV चालक',
      '२४/७ पुणे कंट्रोल रूम',
      'लवचिक मासिक आणि वार्षिक करार',
    ],
    card: {
      header: 'आम्ही तुमचा ताफा कसा व्यवस्थापित करतो',
      badge: 'थेट पुणे नियंत्रण',
      miniCard1: {
        label: 'वाहन काळजी',
        title: 'वेळेवर सर्व्हिसिंग',
        subtext: 'रस्त्यावरील ब्रेकडाऊन रोखणे',
      },
      miniCard2: {
        label: 'चालक संघ',
        title: 'पडताळणी केलेले चालक',
        subtext: 'प्रशिक्षित महामार्ग आणि स्थानिक कर्मचारी',
      },
      progress: {
        leftLabel: 'ट्रिप आणि रूट प्लॅनिंग',
        rightLabel: 'वेळेवर पोहोच ट्रॅकिंग',
      },
      footerNote: 'प्रिशा एक्सप्रेस पुणे हबकडून २४/७ थेट देखरेख.',
    },
  },
};

export const FleetHero: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');

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

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Commercial Fleet & Warehouse Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/fleet-warehouse.jpg"
          alt="Prisha Xpress Commercial Fleet Operations"
          className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-95 contrast-105"
        />
        {/* Subtle dark overlay over background truck photo for sharp card contrast & zero visual clutter */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        {/* Directional brand gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#200336]/90 via-[#2E084D]/75 to-[#200336]/60 hidden md:block pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#200336]/95 via-[#200336]/80 to-[#200336]/55 md:hidden pointer-events-none" />
      </div>

      {/* Ambient subtle glow lights */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs
            items={[
              { label: t.breadcrumbServices, href: '/services' },
              { label: t.breadcrumbCurrent },
            ]}
            theme="dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading, Subheading & Action Buttons inside Purple Glassmorphic Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.3)] hover:border-white/30 transition-all duration-300 space-y-6 text-white relative overflow-hidden">
              {/* Top Glass Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-[24px] pointer-events-none" />

              {/* Top Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold text-purple-200 uppercase tracking-wider"
              >
                <Cpu className="w-4 h-4 text-purple-300" />
                <span>{t.badge}</span>
              </motion.div>

              {/* Main Heading: 100% Bright Pure White (text-white) with zero dark text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18]"
              >
                {t.title}
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative z-10 text-base sm:text-lg text-gray-100 leading-relaxed font-normal"
              >
                {t.subheading}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-10 flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  to="/contact?service=3pl-fleet-management"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary group-hover:translate-x-1 transition-transform" />}
                >
                  {t.primaryBtn}
                </Button>
                <Button
                  to="/network"
                  variant="glass"
                  size="lg"
                  icon={<Activity className="w-4 h-4 text-purple-200" />}
                >
                  {t.secondaryBtn}
                </Button>
              </motion.div>

              {/* Subtle Trust Strip Below Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="relative z-10 pt-4 border-t border-white/15 flex flex-wrap items-center gap-y-2 gap-x-3 text-xs sm:text-sm font-medium text-[#E9D5FF]"
              >
                <span className="inline-flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                  {t.trustStrip[0]}
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                  {t.trustStrip[1]}
                </span>
                <span className="text-white/40 hidden sm:inline">•</span>
                <span className="inline-flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                  {t.trustStrip[2]}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right Column: High-Contrast Right Summary Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="relative p-6 sm:p-8 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.3)] hover:border-white/30 transition-all duration-300 space-y-5 overflow-hidden"
            >
              {/* Top Glass Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-[24px] pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-white/15">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6EE7B7] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#6EE7B7]" />
                  </span>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E9D5FF]">
                    {t.card.header}
                  </span>
                </div>
                <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 border border-[#6EE7B7]/40 text-[#6EE7B7] tracking-wider uppercase">
                  {t.card.badge}
                </span>
              </div>

              {/* Operational Framework Mini Cards Grid */}
              <div className="relative z-10 grid grid-cols-2 gap-3.5">
                {/* Mini Card 1: Vehicle Care */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-300/40 transition-all duration-200 space-y-1 group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#E9D5FF]">{t.card.miniCard1.label}</span>
                    <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-300/30 text-purple-200 group-hover:text-white transition-colors">
                      <Wrench className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                    {t.card.miniCard1.title}
                  </p>
                  <p className="text-xs text-purple-100/90 leading-tight">
                    {t.card.miniCard1.subtext}
                  </p>
                </div>

                {/* Mini Card 2: Driver Team */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-300/40 transition-all duration-200 space-y-1 group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-[#E9D5FF]">{t.card.miniCard2.label}</span>
                    <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-300/30 text-purple-200 group-hover:text-white transition-colors">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    </div>
                  </div>
                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                    {t.card.miniCard2.title}
                  </p>
                  <p className="text-xs text-purple-100/90 leading-tight">
                    {t.card.miniCard2.subtext}
                  </p>
                </div>
              </div>

              {/* Progress Bar Row */}
              <div className="relative z-10 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                  <span className="text-[#E9D5FF]">{t.card.progress.leftLabel}</span>
                  <span className="text-[#6EE7B7] font-bold">{t.card.progress.rightLabel}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-white/15 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-px-primary via-purple-400 to-[#6EE7B7] rounded-full" />
                </div>
              </div>

              {/* Bottom Footer Note */}
              <div className="relative z-10 p-3.5 rounded-2xl bg-white/10 border border-white/20 text-xs sm:text-sm text-purple-100 flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#6EE7B7] shrink-0" />
                <span className="font-medium text-white/95">{t.card.footerNote}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};