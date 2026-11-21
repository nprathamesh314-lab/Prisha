// PRISHA XPRESS PVT. LTD. - ABOUT US PAGE
// ROUTE: /about
// REDESIGNED 8-SECTION HIGH-PERFORMANCE CORPORATE PAGE

import React, { useState, useEffect } from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { Button } from '../components/common/Button';
import { AboutStrengthsSlider } from '../components/about/AboutStrengthsSlider';
import { AboutStatisticsSection } from '../components/about/AboutStatisticsSection';
import {
  Target,
  Eye,
  Building2,
  Users,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Calendar,
  Truck,
} from 'lucide-react';

// Multilingual translations for the About Us Hero Section
const heroTranslations = {
  en: {
    badge: 'ABOUT PRISHA XPRESS PVT. LTD.',
    breadcrumbLabel: 'About Us',
    title: 'Helping Your Business with Reliable Transport Services',
    description:
      'Prisha Xpress Pvt. Ltd. provides transport, logistics, professional drivers and fleet management services to businesses across India. We help companies manage their transport needs safely and smoothly.',
    primaryBtn: 'Explore Our Services',
    secondaryBtn: 'Business Enquiry',
  },
  hi: {
    badge: 'प्रिशा एक्सप्रेस प्राइवेट लिमिटेड के बारे में',
    breadcrumbLabel: 'हमारे बारे में',
    title: 'विश्वसनीय परिवहन सेवाओं के साथ आपके व्यवसाय को आगे बढ़ाना',
    description:
      'प्रिशा एक्सप्रेस प्राइवेट लिमिटेड पूरे भारत में व्यवसायों को परिवहन, लॉजिस्टिक्स, पेशेवर चालक और बेड़ा प्रबंधन सेवाएं प्रदान करती है। हम कंपनियों को उनकी परिवहन आवश्यकताओं को सुरक्षित और सुचारू रूप से प्रबंधित करने में मदद करते हैं।',
    primaryBtn: 'हमारी सेवाएं देखें',
    secondaryBtn: 'व्यावसायिक पूछताछ',
  },
  mr: {
    badge: 'प्रिशा एक्सप्रेस प्रायव्हेट लिमिटेड बद्दल',
    breadcrumbLabel: 'आमच्याबद्दल',
    title: 'विश्वासार्ह वाहतूक सेवांसह तुमच्या व्यवसायाला सक्षम बनवणे',
    description:
      'प्रिशा एक्सप्रेस प्रायव्हेट लिमिटेड संपूर्ण भारतातील व्यवसायांना वाहतूक, लॉजिस्टिक्स, व्यावसायिक चालक आणि ताफा व्यवस्थापन सेवा पुरवते. आम्ही कंपन्यांना त्यांच्या वाहतुकीच्या गरजा सुरक्षितपणे आणि सुरळीतपणे व्यवस्थापित करण्यास मदत करतो.',
    primaryBtn: 'आमच्या सेवा पहा',
    secondaryBtn: 'व्यवसाय चौकशी',
  },
};

// Multilingual translations for the About Us Company Information Section ("WHO WE ARE")
const overviewTranslations = {
  en: {
    badge: 'WHO WE ARE',
    title: 'Your Trusted Partner for Transport and Fleet Services',
    desc1:
      'Prisha Xpress Pvt. Ltd. provides transport, logistics, professional driver services and fleet management solutions for businesses. We also support commercial vehicle servicing and spare parts requirements.',
    desc2:
      'We are based in Kharadi, Pune, Maharashtra. We help businesses and fleet operators manage their transportation needs through reliable services and dedicated support.',
    overlayHeading: 'Our Head Office',
    overlayLocation: 'Kharadi, Pune – 411014',
    overlayBadge: 'Pune, Maharashtra',
    cards: [
      {
        label: 'ESTABLISHED',
        value: '22 November 2023',
      },
      {
        label: 'HEAD OFFICE',
        value: 'Kharadi, Pune (MH)',
      },
      {
        label: 'SERVICES',
        value: 'Transport & Fleet Management',
      },
    ],
  },
  hi: {
    badge: 'हम कौन हैं',
    title: 'परिवहन और बेड़ा सेवाओं के लिए आपका विश्वसनीय भागीदार',
    desc1:
      'प्रिशा एक्सप्रेस प्राइवेट लिमिटेड व्यवसायों के लिए परिवहन, लॉजिस्टिक्स, पेशेवर चालक सेवाएं और बेड़ा प्रबंधन समाधान प्रदान करती है। हम वाणिज्यिक वाहन सर्विसिंग और स्पेयर पार्ट्स की आवश्यकताओं में भी सहायता करते हैं।',
    desc2:
      'हम खराड़ी, पुणे, महाराष्ट्र में स्थित हैं। हम व्यवसायों और बेड़ा ऑपरेटरों को उनकी परिवहन आवश्यकताओं को विश्वसनीय सेवाओं और समर्पित सहायता के माध्यम से प्रबंधित करने में मदद करते हैं।',
    overlayHeading: 'हमारा प्रधान कार्यालय',
    overlayLocation: 'खराड़ी, पुणे – 411014',
    overlayBadge: 'पुणे, महाराष्ट्र',
    cards: [
      {
        label: 'स्थापना',
        value: '22 नवंबर 2023',
      },
      {
        label: 'प्रधान कार्यालय',
        value: 'खराड़ी, पुणे (MH)',
      },
      {
        label: 'सेवाएं',
        value: 'परिवहन और बेड़ा प्रबंधन',
      },
    ],
  },
  mr: {
    badge: 'आम्ही कोण आहोत',
    title: 'वाहतूक आणि ताफा व्यवस्थापनासाठी तुमचा विश्वासू भागीदार',
    desc1:
      'प्रिशा एक्सप्रेस प्रायव्हेट लिमिटेड व्यवसायांसाठी वाहतूक, लॉजिस्टिक्स, व्यावसायिक चालक सेवा आणि ताफा व्यवस्थापन सोल्यूशन्स पुरवते. आम्ही व्यावसायिक वाहनांची दुरुस्ती आणि स्पेअर पार्ट्सच्या गरजांसाठीही सहाय्य करतो.',
    desc2:
      'आमचे कार्यालय खराडी, पुणे, महाराष्ट्र येथे आहे. आम्ही व्यवसाय आणि फ्लीट ऑपरेटर्सना विश्वासार्ह सेवा आणि समर्पित सहाय्याद्वारे त्यांच्या वाहतुकीच्या गरजा पूर्ण करण्यात मदत करतो.',
    overlayHeading: 'आमचे मुख्य कार्यालय',
    overlayLocation: 'खराडी, पुणे – 411014',
    overlayBadge: 'पुणे, महाराष्ट्र',
    cards: [
      {
        label: 'स्थापना',
        value: '22 नोव्हेंबर 2023',
      },
      {
        label: 'मुख्य कार्यालय',
        value: 'खराडी, पुणे (MH)',
      },
      {
        label: 'सेवा',
        value: 'वाहतूक आणि ताफा व्यवस्थापन',
      },
    ],
  },
};

const overviewIcons = [Calendar, MapPin, Truck];

export const AboutPage: React.FC = () => {
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

  const hero = heroTranslations[lang] || heroTranslations.en;
  const overview = overviewTranslations[lang] || overviewTranslations.en;

  return (
    <PageTransition>
      {/* SECTION 1: HERO SECTION */}
      <PageHero
        badge={hero.badge}
        title={hero.title}
        subtitle={hero.description}
        image="/assets/images/hero-fleet.jpg"
        breadcrumbs={[{ label: hero.breadcrumbLabel }]}
      >
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            to="/services"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          >
            {hero.primaryBtn}
          </Button>
          <Button
            to="/contact#enquiry"
            variant="glass"
            size="md"
          >
            {hero.secondaryBtn}
          </Button>
        </div>
      </PageHero>

      {/* SECTION 2: COMPANY OVERVIEW ("WHO WE ARE") */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Genuine Company Photograph with Location Badge */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden shadow-soft-purple border-4 border-white bg-px-deep aspect-[4/3] group">
                <img
                  src="/assets/images/company-team.jpg"
                  alt="Prisha Xpress Management & Fleet Operations Team"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-transparent pointer-events-none" />

                {/* Headquarters Location Indicator */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md text-xs flex justify-between items-center">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-px-dark text-xs sm:text-sm truncate">{overview.overlayHeading}</p>
                      <p className="text-xs text-gray-700 font-medium truncate">{overview.overlayLocation}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-px-lavender text-px-primary font-bold text-[10px] tracking-wide shrink-0 ml-2 whitespace-nowrap">
                    {overview.overlayBadge}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Concise Company Introduction */}
            <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-px-primary text-xs font-bold uppercase tracking-wider border border-purple-100">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {overview.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-px-dark tracking-tight leading-tight">
                  {overview.title}
                </h2>
              </div>

              <div className="space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                <p>
                  {overview.desc1}
                </p>
                <p>
                  {overview.desc2}
                </p>
              </div>

              {/* Three Company Information Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {overview.cards.map((card, idx) => {
                  const Icon = overviewIcons[idx];
                  return (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-purple-50/70 border border-purple-200/70 hover:border-purple-300 transition-colors flex flex-col justify-between h-full shadow-xs"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-7 h-7 rounded-lg bg-purple-100 text-px-primary flex items-center justify-center shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-px-violet">
                          {card.label}
                        </p>
                      </div>
                      <p className="text-xs sm:text-sm font-black text-px-dark leading-snug">
                        {card.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: OUR MISSION & VISION */}
      <section className="py-14 lg:py-20 bg-px-bg border-t border-px-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Corporate Purpose"
            title="Our Purpose and Direction"
            subtitle="Guiding principles steering our operational execution and long-term industry partnerships."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Mission Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/30 hover:border-px-primary/40 hover:shadow-soft-purple transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-px-violet px-3 py-1 rounded-full bg-px-lavender/70 border border-purple-100">
                    Our Mission
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-px-dark">
                  Deliver Dependable Fleet Operations
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  To empower Indian transport enterprises with skilled commercial drivers, proactive vehicle maintenance and transparent fleet management, improving efficiency across their operations.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Dignified, fair working practices for commercial drivers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero-compromise on-time delivery commitments for clients</span>
                </li>
              </ul>
            </div>

            {/* Vision Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/30 hover:border-px-primary/40 hover:shadow-soft-purple transition-all duration-300 space-y-4 flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-px-violet px-3 py-1 rounded-full bg-px-lavender/70 border border-purple-100">
                    Our Vision
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-px-dark">
                  India's Most Trusted Logistics Partner
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed font-normal">
                  To become a trusted logistics and fleet management partner recognized for integrity, operational discipline, technological readiness and respect for the driver community.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-gray-100 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Integrated multi-service hubs along major national corridors</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transparent, technology-enabled supply chain operations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE PRISHA XPRESS (SINGLE HORIZONTAL ANIMATED SLIDER) */}
      <AboutStrengthsSlider />

      {/* SECTION 5: OUR COMMITMENT (COMBINED COMPACT SECTION) */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Two-Way Commitment"
            title="Balancing Customer Value with Driver Welfare"
            subtitle="Reliable logistics depends on honoring commitments to both the businesses we serve and the people who keep transportation moving."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Column 1: Commitment to Customers */}
            <div className="p-6 sm:p-8 rounded-3xl bg-px-bg border border-px-border shadow-xs hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-px-violet">
                      Corporate Service
                    </span>
                    <h3 className="text-xl font-bold text-px-dark">
                      Commitment to Customers
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-normal mb-5">
                  We partner with enterprise clients and fleet owners to deliver predictable freight movements with strict operational governance.
                </p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-purple-100/60 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent commercial communication and clear pricing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Planned transportation operations and strict schedule adherence</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Professional, verified driver support and safety protocol compliance</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Attention to delivery schedules and tailored business requirements</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Commitment to Drivers & Employees */}
            <div className="p-6 sm:p-8 rounded-3xl bg-px-bg border border-px-border shadow-xs hover:border-px-primary/40 transition-all duration-300 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-px-primary flex items-center justify-center shadow-xs">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-px-violet">
                      People & Community
                    </span>
                    <h3 className="text-xl font-bold text-px-dark">
                      Commitment to Drivers & Employees
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed font-normal mb-5">
                  Commercial drivers are the backbone of our economy. We champion dignity, fair treatment, and health security on every highway journey.
                </p>
              </div>

              <ul className="space-y-3 pt-4 border-t border-purple-100/60 text-xs sm:text-sm text-gray-800 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Respectful workplace practices and dignified highway conditions</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Fair and transparent treatment without discrimination or delays</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Driver welfare initiatives, including routine vision and health checkup camps</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Continuous opportunities for skills development and professional advancement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: OUR IMPACT IN NUMBERS (PREMIUM STATISTICS) */}
      <AboutStatisticsSection />

      {/* SECTION 7: BUSINESS ENQUIRY CTA */}
      <CTASection
        badge="Connect with Leadership"
        title="Let's Plan Your Fleet Strategy Together"
        subtitle="Speak with our team in Kharadi, Pune to explore driver staffing, transportation, fleet management and other business solutions."
        primaryBtnText="Business Enquiry"
        primaryBtnLink="/contact#enquiry"
        secondaryBtnText="Explore Our Services"
        secondaryBtnLink="/services"
        image="/assets/images/hero-fleet.jpg"
      />

      {/* SECTION 8: PROFESSIONAL FOOTER (Rendered globally via Footer in App.tsx) */}
    </PageTransition>
  );
};
