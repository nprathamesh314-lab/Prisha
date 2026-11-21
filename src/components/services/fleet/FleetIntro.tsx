import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { CheckCircle2 } from 'lucide-react';

// Multilingual translations for FleetIntro component
const introTranslations = {
  en: {
    badge: 'SMART CARE & ON-ROAD SUPPORT',
    title: 'Keeping Every Truck Safe, Working & On Schedule',
    subtitle:
      'How our fleet management helps you prevent highway breakdowns, control fuel and repair costs, and get more life out of your vehicles.',
    leftSubheading: 'Fix Problems Before the Truck Stops on the Highway',
    p1: 'Many truck owners in India only fix a problem after a vehicle breaks down on a highway. That leads to costly crane/towing charges, late deliveries, unhappy customers, driver trouble, and expensive emergency repair bills.',
    companyName: 'Prisha Xpress Pvt. Ltd.',
    p2After:
      ' changes that with regular, planned fleet care. With timely vehicle checks, genuine replacement parts, and trained, disciplined drivers, we keep your trucks running smoothly and earning for your business.',
    checklist: [
      'Regular Vehicle & Safety Checks Before Trips',
      'Quick Action Plans to Avoid Highway Breakdowns',
      '24/7 Tracking & Support from Our Pune Control Room',
    ],
  },
  hi: {
    badge: 'स्मार्ट देखभाल और ऑन-रोड सहायता',
    title: 'हर ट्रक को सुरक्षित, चालू और समय पर रखना',
    subtitle:
      'हमारा फ्लीट प्रबंधन आपको हाईवे ब्रेकडाउन रोकने, ईंधन और मरम्मत लागत नियंत्रित करने तथा वाहनों की उम्र बढ़ाने में कैसे मदद करता है।',
    leftSubheading: 'हाईवे पर ट्रक रुकने से पहले समस्याओं को ठीक करें',
    p1: 'भारत में कई ट्रक मालिक हाईवे पर गाड़ी खराब होने के बाद ही समस्या ठीक कराते हैं। इससे महंगे क्रेन/टोइंग शुल्क, लेट डिलीवरी, असंतुष्ट ग्राहक, चालक की परेशानी और महंगे इमरजेंसी मरम्मत बिल होते हैं।',
    companyName: 'प्रिशा एक्सप्रेस प्राइवेट लिमिटेड',
    p2After:
      ' नियमित और सुनियोजित फ्लीट देखभाल से इसे बदलता है। समय पर वाहन जांच, असली स्पेयर पार्ट्स और प्रशिक्षित, अनुशासित चालकों के साथ, हम आपके ट्रकों को सुचारू रूप से चलाते और कमाते रखते हैं।',
    checklist: [
      'ट्रिप से पहले नियमित वाहन और सुरक्षा जांच',
      'हाईवे ब्रेकडाउन से बचने के लिए त्वरित कार्य योजनाएं',
      'हमारे पुणे कंट्रोल रूम से 24/7 ट्रैकिंग और सहायता',
    ],
  },
  mr: {
    badge: 'स्मार्ट काळजी आणि ऑन-रोड सहाय्य',
    title: 'प्रत्येक ट्रक सुरक्षित, कार्यरत आणि वेळेवर ठेवणे',
    subtitle:
      'आमचे ताफा व्यवस्थापन तुम्हाला महामार्गावरील ब्रेकडाऊन रोखण्यासाठी, इंधन आणि दुरुस्ती खर्च नियंत्रित करण्यासाठी आणि वाहनांचे आयुष्य वाढवण्यासाठी कशी मदत करते.',
    leftSubheading: 'महामार्गावर ट्रक थांबण्यापूर्वी समस्यांचे निवारण करा',
    p1: 'भारतातील अनेक ट्रक मालक महामार्गावर गाडी बंद पडल्यानंतरच दुरुस्ती करतात. त्यामुळे महागडे क्रेन/टोईंग शुल्क, उशिरा पोहोचणे, नाराज ग्राहक, चालकांचे हाल आणि महागडी आणीबाणी दुरुस्ती बिले येतात.',
    companyName: 'प्रिशा एक्सप्रेस प्रायव्हेट लिमिटेड',
    p2After:
      ' नियमित आणि सुनियोजित ताफा देखभालीद्वारे यामध्ये बदल घडवून आणते. वेळेवर वाहन तपासणी, अस्सल सुटे भाग आणि प्रशिक्षित, शिस्तबद्ध चालकांसह, आम्ही तुमचे ट्रक्स सुरळीत धावत ठेवतो.',
    checklist: [
      'फेरीपूर्वी नियमित वाहन आणि सुरक्षा तपासणी',
      'महामार्गावरील ब्रेकडाऊन टाळण्यासाठी तत्पर कृती योजना',
      'आमच्या पुणे नियंत्रण कक्षाकडून २४/७ ट्रॅकिंग आणि सहाय्य',
    ],
  },
};

export const FleetIntro: React.FC = () => {
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading, Paragraphs & Checkmark List (6 cols) */}
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-px-dark leading-tight">
              {t.leftSubheading}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t.p1}
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              <strong className="text-px-dark font-bold">{t.companyName}</strong>
              {t.p2After}
            </p>

            {/* Checkmark List */}
            <div className="space-y-3 pt-2">
              {t.checklist.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm sm:text-base font-bold text-px-dark">
                  <div className="p-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Truck Fleet Image (6 cols) */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep group">
              <img
                src="/assets/images/fleet-warehouse.jpg"
                alt="Prisha Xpress Commercial Truck Fleet Operations"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-px-deep/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};