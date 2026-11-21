import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Users,
  FileCheck,
  Handshake,
  Truck,
  MonitorSmartphone,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';

// Multilingual translations for Core Strengths Section
const translations = {
  en: {
    badge: 'CORE STRENGTHS',
    title: 'Why Businesses Choose Prisha Xpress',
    subtitle:
      'We provide transport services, driver support and fleet management solutions to help businesses manage their daily operations.',
    pageOf: 'of',
    prevLabel: 'Previous slide',
    nextLabel: 'Next slide',
    cards: [
      {
        heading: 'Reliable Transport Services',
        description:
          'We focus on proper transport planning and dispatch to help businesses move their goods smoothly.',
        bottomLabel: 'Reliable Service',
      },
      {
        heading: 'Dedicated Team Support',
        description:
          'Our team helps customers, fleet owners and drivers with their transport-related requirements.',
        bottomLabel: 'Customer Support',
      },
      {
        heading: 'Clear Service Terms',
        description:
          'We aim to provide clear information about services, pricing and business terms before starting work.',
        bottomLabel: 'Business Transparency',
      },
      {
        heading: 'Services That Meet Your Needs',
        description:
          'We provide transport and driver services based on the requirements of each business.',
        bottomLabel: 'Business Support',
      },
      {
        heading: 'Better Fleet Management',
        description:
          'We support fleet operations through driver coordination, vehicle maintenance support and transport planning.',
        bottomLabel: 'Fleet Support',
      },
      {
        heading: 'Technology for Better Service',
        description:
          'We use digital tools where available to support communication and improve transport operations.',
        bottomLabel: 'Digital Support',
      },
    ],
    cta: {
      badge: 'BUSINESS ENQUIRY',
      heading: 'Looking for Reliable Transport Services?',
      description:
        'Tell us about your business transport requirements. Our team will help you find the right service.',
      button: 'Discuss Your Requirements',
    },
  },
  hi: {
    badge: 'प्रमुख विशेषताएं',
    title: 'व्यवसाय प्रिशा एक्सप्रेस को क्यों चुनते हैं',
    subtitle:
      'हम व्यवसायों को उनके दैनिक संचालन को प्रबंधित करने में मदद करने के लिए परिवहन सेवाएं, चालक सहायता और बेड़ा प्रबंधन समाधान प्रदान करते हैं।',
    pageOf: 'का',
    prevLabel: 'पिछली स्लाइड',
    nextLabel: 'अगली स्लाइड',
    cards: [
      {
        heading: 'विश्वसनीय परिवहन सेवाएं',
        description:
          'हम व्यवसायों को उनके माल की सुचारू ढुलाई में मदद करने के लिए उचित परिवहन योजना और प्रेषण पर ध्यान केंद्रित करते हैं।',
        bottomLabel: 'विश्वसनीय सेवा',
      },
      {
        heading: 'समर्पित टीम सहायता',
        description:
          'हमारी टीम ग्राहकों, बेड़े के मालिकों और चालकों को उनकी परिवहन संबंधी आवश्यकताओं में पूरी मदद करती है।',
        bottomLabel: 'ग्राहक सहायता',
      },
      {
        heading: 'स्पष्ट सेवा शर्तें',
        description:
          'हमारा उद्देश्य कार्य शुरू करने से पहले सेवाओं, मूल्य निर्धारण और व्यावसायिक शर्तों के बारे में स्पष्ट जानकारी देना है।',
        bottomLabel: 'व्यावसायिक पारदर्शिता',
      },
      {
        heading: 'आपकी आवश्यकताओं के अनुसार सेवाएं',
        description:
          'हम प्रत्येक व्यवसाय की व्यक्तिगत आवश्यकताओं के आधार पर परिवहन और चालक सेवाएं प्रदान करते हैं।',
        bottomLabel: 'व्यावसायिक सहायता',
      },
      {
        heading: 'बेहतर बेड़ा प्रबंधन',
        description:
          'हम चालक समन्वय, वाहन रखरखाव सहायता और परिवहन योजना के माध्यम से बेड़ा संचालन का समर्थन करते हैं।',
        bottomLabel: 'ताफा सहाय्य',
      },
      {
        heading: 'बेहतर सेवा के लिए तकनीक',
        description:
          'हम संचार में सहायता और परिवहन संचालन को बेहतर बनाने के लिए उपलब्ध डिजिटल उपकरणों का उपयोग करते हैं।',
        bottomLabel: 'डिजिटल सहायता',
      },
    ],
    cta: {
      badge: 'व्यावसायिक पूछताछ',
      heading: 'विश्वसनीय परिवहन सेवाओं की तलाश है?',
      description:
        'हमें अपनी व्यावसायिक परिवहन आवश्यकताओं के बारे में बताएं। हमारी टीम आपको सही सेवा खोजने में मदद करेगी।',
      button: 'अपनी आवश्यकताएं साझा करें',
    },
  },
  mr: {
    badge: 'मुख्य वैशिष्ट्ये',
    title: 'उद्योग आणि व्यवसाय प्रिशा एक्सप्रेसला का निवडतात',
    subtitle:
      'आम्ही व्यवसायांना त्यांचे दैनंदिन कामकाज व्यवस्थापित करण्यात मदत करण्यासाठी वाहतूक सेवा, चालक सहाय्य आणि ताफा व्यवस्थापन उपाय प्रदान करतो.',
    pageOf: 'पैकी',
    prevLabel: 'मागील स्लाइड',
    nextLabel: 'पुढील स्लाइड',
    cards: [
      {
        heading: 'विश्वासार्ह वाहतूक सेवा',
        description:
          'आम्ही व्यवसायांना त्यांच्या मालाची सुरळीत वाहतूक करण्यासाठी योग्य नियोजन आणि वेळेवर पाठवणीवर लक्ष केंद्रित करतो.',
        bottomLabel: 'विश्वासार्ह सेवा',
      },
      {
        heading: 'समर्पित टीम सहाय्य',
        description:
          'आमची टीम ग्राहक, ताफा मालक आणि चालकांना त्यांच्या वाहतूकविषयक गरजांसाठी तत्परतेने मदत करते.',
        bottomLabel: 'ग्राहक सहाय्य',
      },
      {
        heading: 'पारदर्शक व्यावसायिक अटी',
        description:
          'काम सुरू करण्यापूर्वी सेवा, दर आणि व्यावसायिक अटींविषयी स्पष्ट माहिती देणे हे आमचे उद्दिष्ट आहे.',
        bottomLabel: 'व्यावसायिक पारदर्शकता',
      },
      {
        heading: 'तुमच्या गरजांनुसार सेवा',
        description:
          'आम्ही प्रत्येक व्यवसायाच्या गरजेनुसार वाहतूक आणि व्यावसायिक चालक सेवा पुरवतो.',
        bottomLabel: 'व्यावसायिक सहाय्य',
      },
      {
        heading: 'उत्कृष्ट ताफा व्यवस्थापन',
        description:
          'आम्ही चालक समन्वय, वाहन देखभाल आणि वाहतूक नियोजनाद्वारे ताफा ऑपरेशन्सना पाठबळ देतो.',
        bottomLabel: 'ताफा सहाय्य',
      },
      {
        heading: 'उत्कृष्ट सेवेसाठी तंत्रज्ञान',
        description:
          'आम्ही संवाद साधण्यासाठी आणि वाहतूक ऑपरेशन्स सुधारण्यासाठी उपलब्ध डिजिटल साधनांचा वापर करतो.',
        bottomLabel: 'डिजिटल सहाय्य',
      },
    ],
    cta: {
      badge: 'व्यवसाय चौकशी',
      heading: 'विश्वासार्ह वाहतूक सेवेच्या शोधात आहात?',
      description:
        'तुमच्या व्यावसायिक वाहतुकीच्या गरजा आम्हाला सांगा. आमची टीम तुम्हाला योग्य सेवा निवडण्यात मदत करेल.',
      button: 'तुमच्या गरजांवर चर्चा करा',
    },
  },
};

const cardIcons = [
  ShieldCheck,
  Users,
  FileCheck,
  Handshake,
  Truck,
  MonitorSmartphone,
];

export const AboutStrengthsSlider: React.FC = () => {
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

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

  // Responsive itemsPerPage calculation
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  const totalCards = cardIcons.length;
  const totalPages = Math.ceil(totalCards / itemsPerPage);

  // Clamp current page when itemsPerPage changes
  useEffect(() => {
    if (currentPage >= totalPages) {
      setCurrentPage(Math.max(0, totalPages - 1));
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const nextSlide = useCallback(() => {
    setCurrentPage((prev) => (prev >= totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentPage((prev) => (prev <= 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  // Auto-slide every 5.5 seconds with pause on hover
  useEffect(() => {
    if (isPaused) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) {
      setIsPaused(false);
      return;
    }
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 40;

    if (diff > threshold) {
      nextSlide();
    } else if (diff < -threshold) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  const t = translations[lang] || translations.en;

  return (
    <section
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF5FF] via-purple-50/40 to-[#FAF5FF] relative overflow-hidden border-t border-purple-100/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Decorative Ambient Purple Glass Shapes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[420px] h-[420px] bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 bg-purple-100/50 rounded-full blur-2xl pointer-events-none" />

      {/* Subtle Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#68139A_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 lg:mb-12 gap-4">
          <div>
            <SectionHeading
              badge={t.badge}
              title={t.title}
              subtitle={t.subtitle}
              className="mb-0 text-left"
            />
          </div>

          {/* Slider Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="text-xs font-semibold text-gray-500 mr-2 hidden sm:block">
              <span className="text-px-primary font-bold">{currentPage + 1}</span> {t.pageOf}{' '}
              {totalPages}
            </div>
            <button
              onClick={prevSlide}
              aria-label={t.prevLabel}
              className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-200/80 text-px-dark hover:bg-px-primary hover:text-white hover:border-px-primary transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label={t.nextLabel}
              className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm border border-purple-200/80 text-px-dark hover:bg-px-primary hover:text-white hover:border-px-primary transition-all duration-200 active:scale-95 shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track Container */}
        <div className="overflow-hidden -mx-2 px-2 py-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentPage * 100}%)`,
            }}
          >
            {t.cards.map((card, index) => {
              const Icon = cardIcons[index];
              return (
                <div
                  key={index}
                  className="px-2.5 sm:px-3 shrink-0"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <div
                    className="group relative rounded-[22px] p-6 sm:p-7 md:p-8 flex flex-col justify-between h-full
                               bg-white/70 backdrop-blur-[16px]
                               border border-purple-200/60 hover:border-purple-300/90
                               shadow-[0_8px_32px_0_rgba(104,19,154,0.07)]
                               hover:shadow-[0_18px_40px_0_rgba(104,19,154,0.15)]
                               hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  >
                    {/* Top Glass Reflection Highlight */}
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/70 via-white/20 to-transparent rounded-t-[22px] pointer-events-none" />

                    {/* Card Content Top Block */}
                    <div className="relative z-10 space-y-4 sm:space-y-5">
                      {/* Top Header: Icon & Number Badge */}
                      <div className="flex items-center justify-between">
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-purple-100/75 border border-purple-200/50 text-px-primary shadow-xs group-hover:scale-110 group-hover:rotate-1 transition-all duration-300">
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>

                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-px-primary border border-purple-200/60 shadow-xs">
                          0{index + 1}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-black text-px-dark tracking-tight leading-snug group-hover:text-px-primary transition-colors">
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

                      <span className="text-[11px] font-semibold text-purple-400 group-hover:text-px-primary transition-colors">
                        Prisha Xpress
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Go to slide page ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentPage === idx
                  ? 'w-8 bg-px-primary'
                  : 'w-2.5 bg-purple-200 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>

        {/* Business Enquiry Call to Action */}
        <div className="mt-12 sm:mt-16 relative rounded-[22px] overflow-hidden p-6 sm:p-8 md:p-10 bg-gradient-to-r from-purple-100/90 via-purple-50 to-purple-100/70 border border-purple-200/80 shadow-[0_8px_32px_0_rgba(104,19,154,0.08)]">
          {/* Subtle Ambient Decorative Glass Highlights */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-200/30 rounded-full blur-xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-px-primary px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-purple-200/60 shadow-xs inline-block">
                {t.cta.badge}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-px-dark tracking-tight">
                {t.cta.heading}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {t.cta.description}
              </p>
            </div>

            <div className="shrink-0">
              <Link
                to="/contact#enquiry"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-px-primary text-white font-bold text-sm sm:text-base shadow-md hover:bg-purple-800 hover:shadow-lg active:scale-95 transition-all duration-200 group"
              >
                <span>{t.cta.button}</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
