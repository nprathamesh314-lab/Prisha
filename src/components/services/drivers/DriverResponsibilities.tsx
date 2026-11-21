import React, { useState, useEffect } from 'react';
import { FadeIn } from '../../animations/FadeIn';
import { SectionHeading } from '../../common/SectionHeading';
import {
  Truck,
  ClipboardCheck,
  ShieldCheck,
  HeartHandshake,
  FileText,
  AlertTriangle,
} from 'lucide-react';

// Multilingual translations for DriverResponsibilities component
const responsibilitiesTranslations = {
  en: {
    badge: 'TRUSTED & VERIFIED DRIVERS',
    title: 'Why Businesses Trust Prisha Xpress Drivers',
    subtitle:
      'Your goods are in safe hands. Our verified, experienced drivers follow strict safety rules to ensure your material reaches on time and without damage.',
    trustNote:
      '100% Police-Verified & Heavy-License (HMV) Drivers | Smooth Billing with Fast e-POD',
    roles: [
      {
        title: 'Safe & Disciplined Highway Driving',
        desc: 'Following strict speed limits, proper lane rules, and mandatory rest breaks so your shipment travels safely without accident risks.',
      },
      {
        title: 'Full Vehicle Check Before Every Trip',
        desc: 'Checking tyres, brakes, lights, engine oil, and container locks before starting the journey to prevent mid-route breakdowns.',
      },
      {
        title: '100% Goods & Seal Safety',
        desc: 'Ensuring tarpaulins (tirpal), container locks, and safety seals stay completely intact and tamper-free from pickup to delivery.',
      },
      {
        title: 'Polite & Professional Behavior at Gates',
        desc: 'Respectful coordination with your factory staff, security guards, and warehouse teams for smooth, hassle-free loading and unloading.',
      },
      {
        title: 'Instant Digital Delivery Proof (e-POD)',
        desc: 'Collecting receiver signatures, photo proofs, and timely updates on our app right after unloading so your billing never gets delayed.',
      },
      {
        title: '24/7 Live Updates from Pune Control Room',
        desc: 'Immediate reporting of traffic jams, weather delays, or route issues directly to our 24/7 Pune operations desk so you are never left guessing.',
      },
    ],
  },
  hi: {
    badge: 'विश्वसनीय एवं सत्यापित चालक',
    title: 'व्यवसाय प्रिशा एक्सप्रेस चालकों पर क्यों भरोसा करते हैं',
    subtitle:
      'आपका माल सुरक्षित हाथों में है। हमारे सत्यापित और अनुभवी चालक सख्त सुरक्षा नियमों का पालन करते हैं ताकि आपका माल समय पर और बिना किसी नुकसान के पहुंचे।',
    trustNote:
      '100% पुलिस-सत्यापित और भारी-लाइसेंस (HMV) चालक | तेज़ e-POD के साथ सुगम बिलिंग',
    roles: [
      {
        title: 'सुरक्षित एवं अनुशासित राजमार्ग ड्राइविंग',
        desc: 'सख्त गति सीमा, उचित लेन नियमों और अनिवार्य विश्राम का पालन ताकि आपका माल बिना किसी दुर्घटना जोखिम के सुरक्षित पहुंचे।',
      },
      {
        title: 'प्रत्येक यात्रा से पहले वाहन की पूर्ण जांच',
        desc: 'रास्ते में खराबी से बचने के लिए यात्रा शुरू करने से पहले टायर, ब्रेक, लाइट, इंजन ऑयल और कंटेनर लॉक की पूरी जांच।',
      },
      {
        title: '100% माल और सील की सुरक्षा',
        desc: 'पिकअप से डिलीवरी तक तिरपाल, कंटेनर लॉक और सुरक्षा सील को पूरी तरह सुरक्षित और छेड़छाड़-मुक्त रखना।',
      },
      {
        title: 'गेट पर विनम्र और पेशेवर व्यवहार',
        desc: 'सुगम और परेशानी मुक्त लोडिंग-अनलोडिंग के लिए आपके फैक्ट्री स्टाफ, गार्ड और वेयरहाउस टीम के साथ सम्मानजनक समन्वय।',
      },
      {
        title: 'तुरंत डिजिटल डिलीवरी प्रमाण (e-POD)',
        desc: 'अनलोडिंग के तुरंत बाद ऐप पर हस्ताक्षर और फोटो प्रमाण संग्रह ताकि आपकी बिलिंग प्रक्रिया में कभी देरी न हो।',
      },
      {
        title: 'पुणे कंट्रोल रूम से 24/7 लाइव अपडेट',
        desc: 'ट्रैफ़िक जाम, मौसम या मार्ग संबंधी समस्याओं की तुरंत हमारे 24/7 पुणे ऑपरेशंस डेस्क पर रिपोर्टिंग।',
      },
    ],
  },
  mr: {
    badge: 'विश्वासू आणि पडताळणी केलेले चालक',
    title: 'उद्योग आणि व्यवसाय प्रिशा एक्सप्रेस चालकांवर का विश्वास ठेवतात',
    subtitle:
      'तुमचा माल सुरक्षित हातात आहे. आमचे अनुभवी चालक सुरक्षा नियमांचे काटेकोर पालन करतात, ज्यामुळे तुमचे साहित्य वेळेवर आणि विनानुकसान पोहोचते.',
    trustNote:
      '100% पोलीस पडताळणी झालेले आणि HMV परवानाधारक चालक | जलद e-POD सह सुरळीत बिलिंग',
    roles: [
      {
        title: 'सुरक्षित आणि शिस्तबद्ध महामार्ग ड्रायव्हिंग',
        desc: 'कठोर गती मर्यादा, योग्य लेन नियम आणि विश्रांतीचे पालन, ज्यामुळे कोणतीही दुर्घटना न होता मालाची सुरक्षित वाहतूक होते.',
      },
      {
        title: 'प्रत्येक प्रवासापूर्वी वाहनाची संपूर्ण तपासणी',
        desc: 'प्रवासात बिघाड टाळण्यासाठी निघण्यापूर्वी टायर्स, ब्रेक्स, दिवे, इंजिन ऑइल आणि कंटेनर लॉकची अचूक तपासणी.',
      },
      {
        title: '100% माल आणि सील सुरक्षा',
        desc: 'पिकअपपासून डिलिव्हरीपर्यंत ताडपत्री (तिरपाल), कंटेनर लॉक आणि सुरक्षा सील पूर्णपणे सुरक्षित व अभेद्य ठेवणे.',
      },
      {
        title: 'गेटवर आदरयुक्त आणि व्यावसायिक वर्तन',
        desc: 'सुरळीत लोडिंग आणि अनलोडिंगसाठी फॅक्टरी कर्मचारी, सुरक्षा रक्षक आणि वेअरहाऊस टीमशी आदरयुक्त समन्वय.',
      },
      {
        title: 'त्वरित डिजिटल डिलिव्हरी पुरावा (e-POD)',
        desc: 'अनलोडिंगनंतर लगेचच रिसिव्हरची स्वाक्षरी आणि फोटो पुरावे ॲपवर नोंदवणे, जेणेकरून बिलिंगमध्ये कधीही विलंब होणार नाही.',
      },
      {
        title: 'पुणे कंट्रोल रूमकडून 24/7 थेट अपडेट्स',
        desc: 'ट्रॅफिक, हवामान किंवा मार्गातील अडचणींची त्वरित आमच्या २४/७ पुणे ऑपरेशन्स डेस्कला माहिती देणे.',
      },
    ],
  },
};

const roleIcons = [
  Truck,
  ClipboardCheck,
  ShieldCheck,
  HeartHandshake,
  FileText,
  AlertTriangle,
];

export const DriverResponsibilities: React.FC = () => {
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

  const t = responsibilitiesTranslations[lang] || responsibilitiesTranslations.en;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-px-bg relative overflow-hidden border-t border-purple-100/60">
      {/* Decorative Ambient Purple Glow Shapes */}
      <div className="absolute top-1/4 -right-24 w-96 h-96 bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        {/* Subtle Trust Note */}
        <div className="mb-10 -mt-6 sm:-mt-8 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-purple-100/80 border border-purple-200/70 text-px-primary text-xs sm:text-sm font-bold shadow-xs text-center backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{t.trustNote}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.roles.map((role, idx) => {
            const Icon = roleIcons[idx];
            return (
              <FadeIn key={role.title} delay={idx * 0.08} direction="up">
                <div className="p-6 sm:p-7 rounded-[22px] bg-white border border-purple-100/90 hover:border-purple-300 shadow-soft-purple hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group">
                  <div className="space-y-4">
                    {/* Circular Avatar Style Badge */}
                    <div className="w-14 h-14 rounded-2xl bg-purple-100/75 flex items-center justify-center text-px-primary shadow-xs border border-purple-200/50 group-hover:scale-110 group-hover:bg-px-primary group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-black text-px-dark tracking-tight group-hover:text-px-primary transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {role.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
