import React, { useState, useEffect } from 'react';
import { FadeIn } from '../../animations/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';
import {
  FileCheck,
  ShieldCheck,
  Handshake,
  TrendingUp,
} from 'lucide-react';

// Multilingual translations for DriverIntro component
const introTranslations = {
  en: {
    badge: 'HUMAN-CENTRED LOGISTICS',
    title: 'Supporting the Drivers Who Keep India Moving',
    subtitle:
      'We believe drivers are an important part of the transport industry. At Prisha Xpress, we aim to provide drivers with respect, proper support and opportunities to grow.',
    contentHeading: 'Respectful Work, Reliable Support',
    contentDescription:
      'We want our drivers to work in a safe and supportive environment. We focus on proper document checks, clear communication and fair working practices.',
    imageOverlay: {
      label: 'Verified Commercial Drivers',
      tag: 'Pune Operations',
    },
    features: [
      {
        title: 'Document Verification',
        description:
          'We check the required driving licence and other documents before assigning driving work.',
      },
      {
        title: 'Safety and Driving Guidance',
        description:
          'We encourage safe driving practices and proper care while travelling.',
      },
      {
        title: 'Fair Treatment and Support',
        description:
          'We believe in respectful communication and clear working terms.',
      },
      {
        title: 'Opportunities to Grow',
        description:
          'We aim to support drivers in improving their skills and work experience.',
      },
    ],
  },
  hi: {
    badge: 'मानव-केंद्रित लॉजिस्टिक्स',
    title: 'भारत को गतिमान रखने वाले चालकों को सहयोग',
    subtitle:
      'हमारा मानना है कि चालक परिवहन उद्योग का एक अत्यंत महत्वपूर्ण हिस्सा हैं। प्रिशा एक्सप्रेस में हमारा उद्देश्य चालकों को सम्मान, उचित सहायता और आगे बढ़ने के अवसर प्रदान करना है।',
    contentHeading: 'सम्मानजनक कार्य, विश्वसनीय सहायता',
    contentDescription:
      'हम चाहते हैं कि हमारे चालक एक सुरक्षित और सहयोगी वातावरण में काम करें। हम उचित दस्तावेज़ जांच, स्पष्ट संचार और निष्पक्ष कार्यप्रणाली पर ध्यान केंद्रित करते हैं।',
    imageOverlay: {
      label: 'सत्यापित वाणिज्यिक चालक',
      tag: 'पुणे संचालन',
    },
    features: [
      {
        title: 'दस्तावेज़ सत्यापन',
        description:
          'हम ड्राइविंग कार्य सौंपने से पहले आवश्यक ड्राइविंग लाइसेंस और अन्य दस्तावेजों की जांच करते हैं।',
      },
      {
        title: 'सुरक्षा एवं ड्राइविंग मार्गदर्शन',
        description:
          'हम यात्रा के दौरान सुरक्षित ड्राइविंग प्रथाओं और उचित देखभाल को प्रोत्साहित करते हैं।',
      },
      {
        title: 'निष्पक्ष व्यवहार और सहयोग',
        description:
          'हम सम्मानजनक संवाद और काम की स्पष्ट शर्तों में विश्वास करते हैं।',
      },
      {
        title: 'आगे बढ़ने के अवसर',
        description:
          'हमारा उद्देश्य चालकों को उनके कौशल और कार्य अनुभव को बेहतर बनाने में सहयोग करना है।',
      },
    ],
  },
  mr: {
    badge: 'मानव-केंद्रित लॉजिस्टिक्स',
    title: 'भारताला गतिमान ठेवणाऱ्या चालकांना भक्कम पाठबळ',
    subtitle:
      'आमचा ठाम विश्वास आहे की चालक हा वाहतूक उद्योगाचा अविभाज्य भाग आहेत. प्रिशा एक्सप्रेसमध्ये आम्ही चालकांना सन्मान, योग्य पाठबळ आणि प्रगतीच्या संधी देण्याचे ध्येय ठेवतो.',
    contentHeading: 'सन्मानपूर्वक काम, विश्वासार्ह पाठबळ',
    contentDescription:
      'आमच्या चालकांनी सुरक्षित आणि पोषक वातावरणात काम करावे ही आमची भूमिका आहे. आम्ही योग्य कागदपत्र तपासणी, स्पष्ट संवाद आणि न्याय्य कार्यपद्धतीवर भर देतो.',
    imageOverlay: {
      label: 'पडताळणी केलेले व्यावसायिक चालक',
      tag: 'पुणे ऑपरेशन्स',
    },
    features: [
      {
        title: 'कागदपत्र पडताळणी',
        description:
          'ड्रायव्हिंगचे काम देण्यापूर्वी आम्ही आवश्यक ड्रायव्हिंग लायसन्स आणि इतर कागदपत्रांची खात्री करतो.',
      },
      {
        title: 'सुरक्षा आणि ड्रायव्हिंग मार्गदर्शन',
        description:
          'आम्ही प्रवासादरम्यान सुरक्षित ड्रायव्हिंग पद्धती आणि वाहनाची योग्य काळजी घेण्यास प्रोत्साहन देतो.',
      },
      {
        title: 'सन्मानपूर्वक वागणूक आणि सहाय्य',
        description:
          'आम्ही आदरयुक्त संवाद आणि कामाच्या स्पष्ट अटींवर विश्वास ठेवतो.',
      },
      {
        title: 'प्रगतीच्या संधी',
        description:
          'चालकांची कौशल्ये आणि कामाचा अनुभव वृद्धिंगत करण्यासाठी पाठबळ देणे हे आमचे उद्दिष्ट आहे.',
      },
    ],
  },
};

const featureIcons = [FileCheck, ShieldCheck, Handshake, TrendingUp];

export const DriverIntro: React.FC = () => {
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

  const t = introTranslations[lang] || introTranslations.en;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-purple-50/25 to-white relative overflow-hidden">
      {/* Decorative Ambient Purple Glow Shapes */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mt-10 sm:mt-12">
          {/* Left Column: Authentic Driver & Operations Photo */}
          <div className="lg:col-span-6 relative">
            <FadeIn direction="right">
              <div className="relative rounded-[24px] overflow-hidden shadow-2xl border-4 border-white bg-px-deep group">
                <img
                  src="/assets/images/careers-driver.jpg"
                  alt="Professional Commercial Driver at Prisha Xpress"
                  className="w-full h-auto object-cover object-center max-h-[540px] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-xl bg-purple-100 text-px-primary">
                      <ShieldCheck className="w-4 h-4 text-px-primary" />
                    </div>
                    <span className="font-bold text-px-dark text-xs sm:text-sm">
                      {t.imageOverlay.label}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full font-bold bg-purple-100/80 text-px-primary text-[11px] border border-purple-200/50">
                    {t.imageOverlay.tag}
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Narrative & 4 Features */}
          <div className="lg:col-span-6 space-y-6">
            <FadeIn direction="left">
              <h3 className="text-2xl sm:text-3xl font-black text-px-dark tracking-tight leading-snug">
                {t.contentHeading}
              </h3>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {t.contentDescription}
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {t.features.map((feat, idx) => {
                  const Icon = featureIcons[idx];
                  return (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-100/90 hover:border-purple-300 hover:bg-white shadow-[0_4px_20px_0_rgba(104,19,154,0.04)] hover:shadow-soft-purple/50 transition-all duration-200 flex flex-col justify-between group"
                    >
                      <div className="space-y-2.5">
                        <div className="w-10 h-10 rounded-xl bg-purple-100/80 text-px-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-px-primary group-hover:text-white transition-all duration-200 shadow-xs">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-px-dark group-hover:text-px-primary transition-colors">
                          {feat.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                          {feat.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
