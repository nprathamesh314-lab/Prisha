import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, ShieldCheck, Headset, CheckCircle2 } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { FadeIn } from '../animations/FadeIn';

// Multilingual translations for English, Hindi, and Marathi
const translations = {
  en: {
    badge: 'WHY CHOOSE US',
    title: 'Why Businesses Choose Prisha Xpress',
    subtitle:
      'Reliable transport, trained drivers and dedicated support to help your business run smoothly across India.',
    cards: [
      {
        heading: 'Reliable Transport Operations',
        description:
          'We focus on timely deliveries and smooth transportation to support your daily business needs.',
        bottomLabel: 'Reliable Operations',
      },
      {
        heading: 'Trained and Verified Drivers',
        description:
          'Our drivers undergo licence and document checks to support safe and reliable transportation.',
        bottomLabel: 'Driver Verification',
      },
      {
        heading: 'Dedicated Customer Support',
        description:
          'Our support team helps customers with their transport and fleet-related requirements.',
        bottomLabel: 'Customer Support',
      },
    ],
  },
  hi: {
    badge: 'हमें क्यों चुनें',
    title: 'व्यवसाय प्रिशा एक्सप्रेस को क्यों चुनते हैं',
    subtitle:
      'विश्वसनीय परिवहन, प्रशिक्षित चालक और समर्पित सहायता ताकि पूरे भारत में आपका व्यवसाय सुचारू रूप से चले।',
    cards: [
      {
        heading: 'विश्वसनीय परिवहन संचालन',
        description:
          'हम आपकी दैनिक व्यावसायिक आवश्यकताओं के लिए समय पर डिलीवरी और सुचारू परिवहन पर ध्यान केंद्रित करते हैं।',
        bottomLabel: 'विश्वसनीय संचालन',
      },
      {
        heading: 'प्रशिक्षित और सत्यापित चालक',
        description:
          'सुरक्षित और विश्वसनीय परिवहन सुनिश्चित करने के लिए हमारे चालक लाइसेंस और दस्तावेज़ जांच से गुजरते हैं।',
        bottomLabel: 'चालक सत्यापन',
      },
      {
        heading: 'समर्पित ग्राहक सहायता',
        description:
          'हमारी सहायता टीम परिवहन और बेड़े संबंधी आवश्यकताओं में ग्राहकों की पूरी मदद करती है।',
        bottomLabel: 'ग्राहक सहायता',
      },
    ],
  },
  mr: {
    badge: 'आम्हाला का निवडावे',
    title: 'उद्योग आणि व्यवसाय प्रिशा एक्सप्रेसला का निवडतात',
    subtitle:
      'संपूर्ण भारतात तुमचा व्यवसाय सुरळीत चालण्यासाठी विश्वासार्ह वाहतूक, प्रशिक्षित चालक आणि समर्पित सहाय्य.',
    cards: [
      {
        heading: 'विश्वासार्ह वाहतूक ऑपरेशन्स',
        description:
          'आम्ही तुमच्या दैनंदिन व्यावसायिक गरजा पूर्ण करण्यासाठी वेळेवर डिलिव्हरी आणि सुरळीत वाहतुकीवर लक्ष केंद्रित करतो.',
        bottomLabel: 'विश्वासार्ह ऑपरेशन्स',
      },
      {
        heading: 'प्रशिक्षित आणि पडताळणी केलेले चालक',
        description:
          'सुरक्षित आणि विश्वासार्ह वाहतुकीसाठी आमचे चालक परवाना आणि कागदपत्र पडताळणी प्रक्रियेतून जातात.',
        bottomLabel: 'चालक पडताळणी',
      },
      {
        heading: 'समर्पित ग्राहक सहाय्य',
        description:
          'आमची सहाय्य टीम ग्राहकांना त्यांच्या वाहतूक आणि ताफाविषयक गरजांसाठी तत्परतेने मदत करते.',
        bottomLabel: 'ग्राहक सहाय्य',
      },
    ],
  },
};

const cardIcons = [Truck, ShieldCheck, Headset];

export const WhyChooseUsSection: React.FC = () => {
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

  const t = translations[lang] || translations.en;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF5FF] via-purple-50/40 to-[#FAF5FF] relative overflow-hidden">
      {/* Decorative Ambient Purple Glass Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[420px] h-[420px] bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#68139A_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-10 sm:mt-12">
          {t.cards.map((card, index) => {
            const Icon = cardIcons[index];
            return (
              <FadeIn key={index} delay={index * 0.12} direction="up">
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="group relative rounded-[22px] p-6 sm:p-8 flex flex-col justify-between h-full
                             bg-white/70 backdrop-blur-[16px]
                             border border-purple-200/60 hover:border-purple-300/90
                             shadow-[0_8px_32px_0_rgba(104,19,154,0.07)]
                             hover:shadow-[0_18px_40px_0_rgba(104,19,154,0.15)]
                             transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle Top Glass Reflection Highlight */}
                  <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-[22px] pointer-events-none" />

                  {/* Card Content Top Block */}
                  <div className="relative z-10 space-y-4 sm:space-y-5">
                    {/* Icon Container */}
                    <div className="flex items-center justify-between">
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/75 border border-purple-200/50 text-px-primary shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>

                      {/* Top Accent Pill */}
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-px-primary border border-purple-200/60 shadow-xs">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Heading */}
                    <h3 className="text-lg sm:text-xl font-black text-px-dark tracking-tight leading-snug">
                      {card.heading}
                    </h3>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Label Section */}
                  <div className="relative z-10 pt-5 sm:pt-6 mt-6 border-t border-purple-100/80 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100/60 border border-purple-200/50 text-px-primary text-xs font-bold tracking-wide">
                      <CheckCircle2 className="w-3.5 h-3.5 text-px-primary shrink-0" />
                      {card.bottomLabel}
                    </span>

                    <span className="text-[11px] font-semibold text-gray-400 group-hover:text-px-primary transition-colors">
                      Prisha Verified
                    </span>
                  </div>
                </motion.div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
