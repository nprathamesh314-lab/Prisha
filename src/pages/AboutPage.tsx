// PRISHA XPRESS PVT. LTD. - ABOUT US PAGE
// ROUTE: /about
// REDESIGNED 8-SECTION HIGH-PERFORMANCE CORPORATE PAGE

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/animations/PageTransition';
import { FadeIn } from '../components/animations/FadeIn';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { Button } from '../components/common/Button';
import { AboutStrengthsSlider } from '../components/about/AboutStrengthsSlider';
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

// Multilingual translations for Section 3: Mission and Vision
const missionVisionTranslations = {
  en: {
    badge: 'CORPORATE PURPOSE',
    title: 'Our Mission and Vision',
    subtitle: 'What we do today and what we aim to achieve in the future.',
    mission: {
      label: 'OUR MISSION',
      heading: 'Providing Reliable Transport Services',
      description:
        'Our mission is to provide reliable transport services, skilled commercial drivers and proper fleet support to help businesses manage their daily transportation needs.',
      points: [
        'Fair and respectful treatment of drivers.',
        'Focus on timely deliveries and good service.',
      ],
    },
    vision: {
      label: 'OUR VISION',
      heading: 'To Become a Trusted Logistics Partner Across India',
      description:
        'Our vision is to grow as a trusted transport and logistics company by providing good service, following honest business practices and supporting our drivers and customers.',
      points: [
        'Expand our transport services across India.',
        'Use technology to improve transport operations.',
      ],
    },
  },
  hi: {
    badge: 'कॉर्पोरेट उद्देश्य',
    title: 'हमारा मिशन और विज़न',
    subtitle: 'हम आज क्या करते हैं और भविष्य में क्या हासिल करना चाहते हैं।',
    mission: {
      label: 'हमारा मिशन',
      heading: 'विश्वसनीय परिवहन सेवाएं प्रदान करना',
      description:
        'हमारा मिशन व्यवसायों को उनकी दैनिक परिवहन आवश्यकताओं के प्रबंधन में मदद करने के लिए विश्वसनीय परिवहन सेवाएं, कुशल वाणिज्यिक चालक और उचित बेड़ा सहायता प्रदान करना है।',
      points: [
        'चालकों के साथ निष्पक्ष और सम्मानजनक व्यवहार।',
        'समय पर डिलीवरी और अच्छी सेवा पर ध्यान केंद्रित करना।',
      ],
    },
    vision: {
      label: 'हमारा विज़न',
      heading: 'पूरे भारत में एक विश्वसनीय लॉजिस्टिक्स भागीदार बनना',
      description:
        'हमारा विज़न अच्छी सेवा प्रदान करके, ईमानदार व्यावसायिक प्रथाओं का पालन करके और अपने चालकों व ग्राहकों का समर्थन करके एक विश्वसनीय परिवहन और लॉजिस्टिक्स कंपनी के रूप में विकसित होना है।',
      points: [
        'पूरे भारत में हमारी परिवहन सेवाओं का विस्तार करना।',
        'परिवहन संचालन को बेहतर बनाने के लिए तकनीक का उपयोग करना।',
      ],
    },
  },
  mr: {
    badge: 'कंपनीचा उद्देश',
    title: 'आमचे ध्येय आणि दृष्टीक्षेप',
    subtitle: 'आम्ही आज काय करतो आणि भविष्यात काय साध्य करण्याचे आमचे ध्येय आहे.',
    mission: {
      label: 'आमचे मिशन',
      heading: 'विश्वासार्ह वाहतूक सेवा पुरवणे',
      description:
        'व्यवसायांना त्यांच्या दैनंदिन वाहतुकीच्या गरजा पूर्ण करण्यात मदत करण्यासाठी विश्वासार्ह वाहतूक सेवा, कुशल व्यावसायिक चालक आणि योग्य ताफा सहाय्य प्रदान करणे हे आमचे ध्येय आहे.',
      points: [
        'चालकांशी सन्मानपूर्वक आणि न्याय्य वागणूक.',
        'वेळेवर डिलिव्हरी आणि चांगल्या सेवेवर भर.',
      ],
    },
    vision: {
      label: 'आमचे व्हिजन',
      heading: 'संपूर्ण भारतात एक विश्वासू लॉजिस्टिक्स भागीदार बनणे',
      description:
        'उत्तम सेवा देऊन, प्रामाणिक व्यावसायिक पद्धतींचा अवलंब करून आणि आमचे चालक व ग्राहकांना पाठबळ देऊन एक विश्वासार्ह वाहतूक व लॉजिस्टिक्स कंपनी म्हणून विकसित होणे ही आमची दृष्टी आहे.',
      points: [
        'संपूर्ण भारतात आमच्या वाहतूक सेवांचा विस्तार करणे.',
        'वाहतूक ऑपरेशन्स सुधारण्यासाठी तंत्रज्ञानाचा वापर करणे.',
      ],
    },
  },
};

// Multilingual translations for Section 5: Our Commitment
const commitmentTranslations = {
  en: {
    badge: 'TWO-WAY COMMITMENT',
    title: 'Balancing Customer Value with Driver Welfare',
    subtitle:
      'We believe good transport services start with happy customers and well-supported drivers. We work to provide reliable service to businesses while treating our drivers and employees with respect.',
    customer: {
      label: 'CUSTOMER COMMITMENT',
      title: 'Reliable Service for Every Customer',
      description:
        'We work with businesses and fleet owners to provide dependable transport services, timely deliveries and proper support.',
      points: [
        'Clear communication and transparent pricing.',
        'Proper transport planning and delivery schedules.',
        'Trained drivers and professional service.',
        'Support based on business requirements.',
      ],
    },
    driver: {
      label: 'DRIVER & EMPLOYEE CARE',
      title: 'Respect and Support for Our Drivers',
      description:
        'Our drivers and employees play an important role in our work. We believe in treating everyone with respect and providing a safe and supportive working environment.',
      points: [
        'Respectful treatment and fair working practices.',
        'Support for drivers during their work.',
        'Focus on road safety and driver well-being.',
        'Opportunities to learn and improve skills.',
      ],
    },
  },
  hi: {
    badge: 'दोतरफा प्रतिबद्धता',
    title: 'ग्राहक संतुष्टि और चालक कल्याण में संतुलन',
    subtitle:
      'हमारा मानना है कि अच्छी परिवहन सेवा खुशहाल ग्राहकों और सशक्त चालकों से शुरू होती है। हम अपने चालकों और कर्मचारियों का सम्मान करते हुए व्यवसायों को विश्वसनीय सेवा प्रदान करते हैं।',
    customer: {
      label: 'ग्राहक प्रतिबद्धता',
      title: 'प्रत्येक ग्राहक के लिए विश्वसनीय सेवा',
      description:
        'हम व्यवसायों और बेड़ा मालिकों के साथ मिलकर भरोसेमंद परिवहन सेवाएं, समय पर डिलीवरी और उचित सहायता प्रदान करते हैं।',
      points: [
        'स्पष्ट संवाद और पारदर्शी मूल्य निर्धारण।',
        'उचित परिवहन योजना और डिलीवरी कार्यक्रम।',
        'प्रशिक्षित चालक और पेशेवर सेवा।',
        'व्यावसायिक आवश्यकताओं के अनुसार सहायता।',
      ],
    },
    driver: {
      label: 'चालक एवं कर्मचारी कल्याण',
      title: 'हमारे चालकों के लिए सम्मान और सहयोग',
      description:
        'हमारे चालक और कर्मचारी हमारे कार्य में महत्वपूर्ण भूमिका निभाते हैं। हम सभी के साथ सम्मानपूर्वक व्यवहार करने और एक सुरक्षित वातावरण प्रदान करने में विश्वास रखते हैं।',
      points: [
        'सम्मानजनक व्यवहार और निष्पक्ष कार्यप्रणाली।',
        'काम के दौरान चालकों को निरंतर सहयोग।',
        'सड़क सुरक्षा और चालक कल्याण पर विशेष ध्यान।',
        'कौशल सीखने और सुधारने के अवसर।',
      ],
    },
  },
  mr: {
    badge: 'दुहेरी बांधिलकी',
    title: 'ग्राहक मूल्य आणि चालक कल्याण यांचा समतोल',
    subtitle:
      'आम्हाला विश्वास आहे की उत्तम वाहतूक सेवा ही समाधानी ग्राहक आणि समर्थ चालकांमुळेच शक्य होते. आम्ही आमच्या चालकांचा आणि कर्मचाऱ्यांचा आदर राखत व्यवसायांना विश्वासार्ह सेवा देतो.',
    customer: {
      label: 'ग्राहक बांधिलकी',
      title: 'प्रत्येक ग्राहकासाठी विश्वासार्ह सेवा',
      description:
        'आम्ही व्यवसाय आणि ताफा मालकांना विश्वासार्ह वाहतूक सेवा, वेळेवर डिलिव्हरी आणि योग्य सहाय्य देण्यासाठी एकत्र काम करतो.',
      points: [
        'स्पष्ट संवाद आणि पारदर्शक दर.',
        'योग्य वाहतूक नियोजन आणि डिलिव्हरी वेळापत्रक.',
        'प्रशिक्षित चालक आणि व्यावसायिक सेवा.',
        'व्यवसायाच्या गरजांनुसार योग्य सहाय्य.',
      ],
    },
    driver: {
      label: 'चालक आणि कर्मचारी कल्याण',
      title: 'आमच्या चालकांसाठी आदर आणि पाठबळ',
      description:
        'आमचे चालक आणि कर्मचारी आमच्या कामात महत्त्वाची भूमिका बजावतात. आम्ही प्रत्येकाशी सन्मानाने वागण्यावर आणि सुरक्षित कार्य वातावरण देण्यावर विश्वास ठेवतो.',
      points: [
        'सन्मानपूर्वक वागणूक आणि न्याय्य कार्यपद्धती.',
        'कामादरम्यान चालकांना तत्पर सहाय्य.',
        'रस्ता सुरक्षा आणि चालकांच्या आरोग्यावर भर.',
        'कौशल्य शिकण्याची आणि प्रगतीची संधी.',
      ],
    },
  },
};

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
  const purpose = missionVisionTranslations[lang] || missionVisionTranslations.en;
  const commitment = commitmentTranslations[lang] || commitmentTranslations.en;

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
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF5FF] via-purple-50/40 to-[#FAF5FF] relative overflow-hidden border-t border-purple-100/80">
        {/* Decorative Ambient Purple Glass Shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[420px] h-[420px] bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* Subtle Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#68139A_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge={purpose.badge}
            title={purpose.title}
            subtitle={purpose.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 sm:mt-12">
            {/* Card 1: Mission */}
            <FadeIn delay={0.1} direction="up">
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
                {/* Top Glass Reflection Highlight */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-[22px] pointer-events-none" />

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  {/* Top Bar: Icon Container & Small Label */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/75 border border-purple-200/50 text-px-primary shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                      <Target className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-100/70 backdrop-blur-sm text-px-primary border border-purple-200/60 shadow-xs">
                      {purpose.mission.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-black text-px-dark tracking-tight leading-snug">
                    {purpose.mission.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {purpose.mission.description}
                  </p>
                </div>

                {/* Supporting Points */}
                <div className="relative z-10 pt-5 sm:pt-6 mt-6 border-t border-purple-100/80">
                  <ul className="space-y-3 text-xs sm:text-sm text-gray-800 font-medium">
                    {purpose.mission.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>

            {/* Card 2: Vision */}
            <FadeIn delay={0.2} direction="up">
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
                {/* Top Glass Reflection Highlight */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-[22px] pointer-events-none" />

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  {/* Top Bar: Icon Container & Small Label */}
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/75 border border-purple-200/50 text-px-primary shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                      <Eye className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>

                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-100/70 backdrop-blur-sm text-px-primary border border-purple-200/60 shadow-xs">
                      {purpose.vision.label}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-xl sm:text-2xl font-black text-px-dark tracking-tight leading-snug">
                    {purpose.vision.heading}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {purpose.vision.description}
                  </p>
                </div>

                {/* Supporting Points */}
                <div className="relative z-10 pt-5 sm:pt-6 mt-6 border-t border-purple-100/80">
                  <ul className="space-y-3 text-xs sm:text-sm text-gray-800 font-medium">
                    {purpose.vision.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE PRISHA XPRESS (SINGLE HORIZONTAL ANIMATED SLIDER) */}
      <AboutStrengthsSlider />

      {/* SECTION 5: OUR COMMITMENT (COMBINED COMPACT SECTION) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF5FF] via-purple-50/40 to-[#FAF5FF] relative overflow-hidden border-t border-purple-100/80">
        {/* Decorative Ambient Purple Glass Shapes */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 w-[420px] h-[420px] bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* Subtle Mesh Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#68139A_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            badge={commitment.badge}
            title={commitment.title}
            subtitle={commitment.subtitle}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-10 sm:mt-12">
            {/* Card 1: Customer Commitment */}
            <FadeIn delay={0.1} direction="up">
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
                {/* Top Glass Reflection Highlight */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-[22px] pointer-events-none" />

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/75 border border-purple-200/50 text-px-primary shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                      <Building2 className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-100/70 backdrop-blur-sm text-px-primary border border-purple-200/60 shadow-xs">
                      {commitment.customer.label}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-px-dark tracking-tight leading-snug">
                    {commitment.customer.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {commitment.customer.description}
                  </p>
                </div>

                <div className="relative z-10 pt-5 sm:pt-6 mt-6 border-t border-purple-100/80">
                  <ul className="space-y-3 text-xs sm:text-sm text-gray-800 font-medium">
                    {commitment.customer.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>

            {/* Card 2: Driver & Employee Care */}
            <FadeIn delay={0.2} direction="up">
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
                {/* Top Glass Reflection Highlight */}
                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-[22px] pointer-events-none" />

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/75 border border-purple-200/50 text-px-primary shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                      <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-purple-100/70 backdrop-blur-sm text-px-primary border border-purple-200/60 shadow-xs">
                      {commitment.driver.label}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-px-dark tracking-tight leading-snug">
                    {commitment.driver.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                    {commitment.driver.description}
                  </p>
                </div>

                <div className="relative z-10 pt-5 sm:pt-6 mt-6 border-t border-purple-100/80">
                  <ul className="space-y-3 text-xs sm:text-sm text-gray-800 font-medium">
                    {commitment.driver.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
      </section>


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
