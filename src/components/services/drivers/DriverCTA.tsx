import React, { useState, useEffect } from 'react';
import { ArrowRight, UserCheck, PhoneCall } from 'lucide-react';
import { Button } from '../../common/Button';
import { FadeIn } from '../../animations/FadeIn';

// Multilingual translations for DriverCTA component
const ctaTranslations = {
  en: {
    leftCard: {
      topLabel: 'FOR COMPANIES & FLEET OWNERS',
      heading: 'Hire Trusted, Verified Drivers Today',
      description:
        'Keep your trucks moving without delays. Get police-verified, HMV-licensed drivers for long-route trips or monthly factory contracts—backed by 24/7 Pune support.',
      button: 'Hire a Driver Now',
      phone: 'Call Pune Desk: +91 7276897727',
    },
    rightCard: {
      topLabel: 'FOR TRUCK DRIVERS',
      heading: 'Drive with Prisha Xpress — Earn with Respect',
      description:
        'Get regular trips, on-time direct bank salary and 24/7 highway support from a company that respects its drivers.',
      button: 'Apply as a Driver',
    },
  },
  hi: {
    leftCard: {
      topLabel: 'कंपनियों और बेड़ा मालिकों के लिए',
      heading: 'आज ही विश्वसनीय और सत्यापित चालक किराए पर लें',
      description:
        'अपने ट्रकों को बिना किसी देरी के गतिमान रखें। लंबी दूरी की यात्राओं या मासिक फैक्ट्री अनुबंधों के लिए पुलिस-सत्यापित, HMV-लाइसेंस प्राप्त चालक प्राप्त करें—24/7 पुणे सहायता के साथ।',
      button: 'अभी चालक किराए पर लें',
      phone: 'पुणे डेस्क को कॉल करें: +91 7276897727',
    },
    rightCard: {
      topLabel: 'ट्रक चालकों के लिए',
      heading: 'प्रिशा एक्सप्रेस के साथ जुड़ें — सम्मान के साथ कमाएं',
      description:
        'चालकों का सम्मान करने वाली कंपनी से नियमित फेरे, समय पर सीधा बैंक वेतन और 24/7 राजमार्ग सहायता प्राप्त करें।',
      button: 'चालक के रूप में आवेदन करें',
    },
  },
  mr: {
    leftCard: {
      topLabel: 'कंपन्या आणि ताफा मालकांसाठी',
      heading: 'आजच विश्वासू आणि पडताळणी केलेले चालक भाड्याने घ्या',
      description:
        'तुमचे ट्रक्स विनाविलंब धावत ठेवा. लांब पल्ल्याच्या फेऱ्यांसाठी किंवा मासिक फॅक्टरी करारासाठी पोलीस-पडताळणी झालेले, HMV-परवानाधारक चालक मिळवा—२४/७ पुणे सहाय्यासह.',
      button: 'आता चालक भाड्याने घ्या',
      phone: 'पुणे डेस्कला कॉल करा: +91 7276897727',
    },
    rightCard: {
      topLabel: 'ट्रक चालकांसाठी',
      heading: 'प्रिशा एक्सप्रेससोबत काम करा — सन्मानाने कमवा',
      description:
        'चालकांचा आदर करणाऱ्या कंपनीकडून नियमित फेऱ्या, वेळेवर थेट बँक खात्यात पगार आणि २४/७ महामार्ग सहाय्य मिळवा.',
      button: 'चालक म्हणून अर्ज करा',
    },
  },
};

export const DriverCTA: React.FC = () => {
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

  const t = ctaTranslations[lang] || ctaTranslations.en;

  return (
    <section className="py-20 bg-px-deep text-white relative overflow-hidden">
      {/* Background Warehouse Image with High Contrast Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/fleet-warehouse.jpg"
          alt="Prisha Xpress Logistics & Fleet Warehouse"
          className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-90 contrast-105"
        />
        {/* Desktop directional gradient */}
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-px-deep/95 via-px-deep/80 to-px-deep/65" />
        {/* Mobile vertical gradient */}
        <div className="sm:hidden absolute inset-0 bg-gradient-to-b from-px-deep/95 via-px-deep/85 to-px-deep/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(164,75,192,0.25)_0%,transparent_60%)] pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card 1: For Companies & Fleet Owners */}
          <FadeIn direction="right">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl h-full flex flex-col justify-between space-y-6 relative overflow-hidden group">
              {/* Top Glass Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-white/15 border border-white/25 text-xs font-bold uppercase tracking-wider text-purple-200">
                  {t.leftCard.topLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {t.leftCard.heading}
                </h3>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                  {t.leftCard.description}
                </p>
              </div>

              <div className="relative z-10 pt-2 flex flex-wrap items-center gap-4">
                <Button
                  to="/contact?service=truck-drivers-on-hire"
                  variant="white"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4 text-px-primary group-hover:translate-x-1 transition-transform" />}
                >
                  {t.leftCard.button}
                </Button>
                <a
                  href="tel:+917276897727"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-200 hover:text-white transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-purple-300" />
                  <span>{t.leftCard.phone}</span>
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: For Truck Drivers */}
          <FadeIn direction="left">
            <div className="p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl h-full flex flex-col justify-between space-y-6 relative overflow-hidden group">
              {/* Top Glass Reflection Highlight */}
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-3xl pointer-events-none" />

              <div className="relative z-10 space-y-4">
                <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-xs font-bold uppercase tracking-wider text-amber-200">
                  {t.rightCard.topLabel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
                  {t.rightCard.heading}
                </h3>
                <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                  {t.rightCard.description}
                </p>
              </div>

              <div className="relative z-10 pt-2">
                <Button
                  to="/careers/driver"
                  variant="white"
                  size="md"
                  icon={<UserCheck className="w-4 h-4 text-px-primary" />}
                >
                  {t.rightCard.button}
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};
