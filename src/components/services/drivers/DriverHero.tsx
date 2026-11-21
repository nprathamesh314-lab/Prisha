import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheck,
  FileCheck,
  Headset,
  ArrowRight,
  UserPlus,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

// Multilingual translations for DriverHero component
const heroTranslations = {
  en: {
    badge: 'TRUSTED DRIVER SUPPORT',
    breadcrumbServices: 'Services',
    breadcrumbCurrent: 'Truck Drivers On Hire',
    title: 'Reliable Truck Drivers for Your Business',
    highlightTitle: 'The Right Drivers for Your Transport Needs',
    description:
      'Prisha Xpress helps businesses find suitable commercial truck drivers for their transport and fleet requirements. We focus on driver verification, proper documentation and reliable support.',
    hireBtn: 'Hire Drivers',
    registerBtn: 'Register as a Driver',
    card: {
      heading: 'Our Driver Support',
      subtitle: 'Verified Driver Staffing & Verification',
      features: [
        {
          title: 'Driver Verification',
          description:
            'Driver details and required documents are checked as part of the verification process.',
        },
        {
          title: 'Licence Checks',
          description:
            'Commercial driving licence details are checked before driver placement.',
        },
        {
          title: 'Dedicated Support',
          description:
            'Support is available for businesses and drivers during the service process.',
        },
      ],
      footerBadge: 'Verified Fleet Support',
      footerLocation: 'Pan-India Operations',
    },
  },
  hi: {
    badge: 'विश्वसनीय चालक सहायता',
    breadcrumbServices: 'सेवाएं',
    breadcrumbCurrent: 'किराए पर ट्रक चालक',
    title: 'आपके व्यवसाय के लिए विश्वसनीय ट्रक चालक',
    highlightTitle: 'आपकी परिवहन आवश्यकताओं के लिए सही चालक',
    description:
      'प्रिशा एक्सप्रेस व्यवसायों को उनकी परिवहन और बेड़ा आवश्यकताओं के लिए उपयुक्त वाणिज्यिक ट्रक चालक खोजने में मदद करती है। हम चालक सत्यापन, उचित दस्तावेज़ीकरण और विश्वसनीय सहायता पर ध्यान केंद्रित करते हैं।',
    hireBtn: 'चालक किराए पर लें',
    registerBtn: 'चालक के रूप में पंजीकरण करें',
    card: {
      heading: 'हमारी चालक सहायता',
      subtitle: 'सत्यापित चालक स्टाफिंग और सहायता',
      features: [
        {
          title: 'चालक सत्यापन',
          description:
            'सत्यापन प्रक्रिया के भाग के रूप में चालक के विवरण और आवश्यक दस्तावेजों की जांच की जाती है।',
        },
        {
          title: 'लाइसेंस जांच',
          description:
            'चालक की नियुक्ति से पहले वाणिज्यिक ड्राइविंग लाइसेंस विवरण की पूरी जांच की जाती है।',
        },
        {
          title: 'समर्पित सहायता',
          description:
            'सेवा प्रक्रिया के दौरान व्यवसायों और चालकों दोनों के लिए सहायता उपलब्ध रहती है।',
        },
      ],
      footerBadge: 'सत्यापित बेड़ा सहायता',
      footerLocation: 'अखिल भारतीय संचालन',
    },
  },
  mr: {
    badge: 'विश्वासार्ह चालक सहाय्य',
    breadcrumbServices: 'सेवा',
    breadcrumbCurrent: 'भाडेतत्त्वावर ट्रक चालक',
    title: 'तुमच्या व्यवसायासाठी विश्वासार्ह ट्रक चालक',
    highlightTitle: 'तुमच्या वाहतूक गरजांसाठी योग्य चालक',
    description:
      'प्रिशा एक्सप्रेस व्यवसायांना त्यांच्या वाहतूक आणि ताफ्याच्या गरजांसाठी योग्य व्यावसायिक ट्रक चालक शोधण्यात मदत करते. आम्ही चालक पडताळणी, योग्य कागदपत्रे आणि विश्वासार्ह पाठबळावर भर देतो.',
    hireBtn: 'चालक भाड्याने घ्या',
    registerBtn: 'चालक म्हणून नोंदणी करा',
    card: {
      heading: 'आमचे चालक सहाय्य',
      subtitle: 'पडताळणी केलेले चालक स्टाफिंग आणि सहाय्य',
      features: [
        {
          title: 'चालक पडताळणी',
          description:
            'पडताळणी प्रक्रियेचा भाग म्हणून चालकाचे तपशील आणि आवश्यक कागदपत्रांची तपासणी केली जाते.',
        },
        {
          title: 'परवाना तपासणी',
          description:
            'चालक नियुक्तीपूर्वी व्यावसायिक ड्रायव्हिंग लायसन्सच्या तपशीलांची खात्री केली जाते.',
        },
        {
          title: 'समर्पित सहाय्य',
          description:
            'सेवा प्रक्रियेदरम्यान व्यवसाय आणि चालक दोघांसाठी तत्पर सहाय्य उपलब्ध असते.',
        },
      ],
      footerBadge: 'पडताळणी केलेले ताफा सहाय्य',
      footerLocation: 'अखिल भारतीय ऑपरेशन्स',
    },
  },
};

const featureIcons = [ShieldCheck, FileCheck, Headset];

export const DriverHero: React.FC = () => {
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
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Commercial Driver & Fleet Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/careers-driver.jpg"
          alt="Professional Commercial Driver at Prisha Xpress"
          className="w-full h-full object-cover object-[75%_center] md:object-center filter brightness-90 contrast-105"
        />
        {/* Dark Purple Overlays to ensure high text contrast and zero text readability issues */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#200336]/95 via-[#2E084D]/90 to-[#200336]/80 hidden md:block pointer-events-none" />
        <div className="absolute inset-0 bg-[#200336]/92 md:hidden pointer-events-none" />
      </div>

      {/* Decorative Ambient Purple Glow Shapes */}
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
          {/* Left Column: Heading, Description & Action Buttons (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.3)] space-y-6 text-white relative overflow-hidden">
              {/* Top Glass Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-[24px] pointer-events-none" />

              {/* Small Label Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold text-purple-200 uppercase tracking-wider"
              >
                <ShieldCheck className="w-4 h-4 text-purple-300" />
                <span>{t.badge}</span>
              </motion.div>

              {/* Main Heading & Highlighted Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.18]"
              >
                {t.title}
                <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-100 to-purple-300">
                  {t.highlightTitle}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative z-10 text-base sm:text-lg text-gray-100 leading-relaxed font-normal"
              >
                {t.description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative z-10 flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  to="/contact?service=truck-drivers-on-hire"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary group-hover:translate-x-1 transition-transform" />}
                >
                  {t.hireBtn}
                </Button>
                <Button
                  to="/careers/driver"
                  variant="glass"
                  size="lg"
                  icon={<UserPlus className="w-4 h-4 text-purple-200" />}
                >
                  {t.registerBtn}
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Redesigned Clean Driver Support Glassmorphism Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative p-6 sm:p-8 rounded-[24px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_16px_40px_0_rgba(0,0,0,0.3)] hover:border-white/30 transition-all duration-300 space-y-6 overflow-hidden"
            >
              {/* Top Glass Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-[24px] pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex items-center gap-3.5 pb-4 border-b border-white/15">
                <div className="p-3 rounded-2xl bg-purple-500/25 border border-purple-300/30 text-purple-200 shadow-xs">
                  <Users className="w-6 h-6 text-purple-200" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {t.card.heading}
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-200/90 font-medium">
                    {t.card.subtitle}
                  </p>
                </div>
              </div>

              {/* Three Driver Support Features */}
              <div className="relative z-10 space-y-4">
                {t.card.features.map((feature, idx) => {
                  const Icon = featureIcons[idx];
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-300/40 transition-all duration-200 flex items-start gap-3.5 group"
                    >
                      <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-300/30 text-purple-200 shrink-0 group-hover:scale-110 group-hover:text-white transition-all duration-200">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Reassurance Strip */}
              <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-purple-200 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  {t.card.footerBadge}
                </span>
                <span className="font-semibold text-white/90">
                  {t.card.footerLocation}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
