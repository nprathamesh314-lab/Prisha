import React, { useState, useEffect } from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { Accordion, AccordionItem } from '../../common/Accordion';

// Multilingual translations for DriverFaqSection component
const faqTranslations = {
  en: {
    badge: 'COMMON QUESTIONS',
    title: 'Frequently Asked Questions',
    subtitle:
      'Honest, straightforward answers about our driver verification, vehicle types, flexible hiring plans, and 24/7 backup support.',
    faqs: [
      {
        id: 'd-faq-1',
        question: 'How do you verify your drivers before hiring them?',
        answer:
          'Every driver goes through strict Aadhaar address verification, police background checks, RTO heavy license (HMV/LMV) validation on government portals, medical/eye fitness checks, and reference checks from past transport employers before joining our team.',
      },
      {
        id: 'd-faq-2',
        question:
          'Which types of trucks and commercial vehicles can your drivers drive?',
        answer:
          'Our drivers are experienced in handling all types of commercial vehicles—including Tata Ace/Bolero pickups, Eicher/Canter tempos, 14ft to 32ft closed containers, open-body trucks, multi-axle trailers, and refrigerated (reefer) vehicles.',
      },
      {
        id: 'd-faq-3',
        question:
          'Can we hire drivers for just a few days, or only on monthly contracts?',
        answer:
          'Both options are available. Whether you need extra drivers for urgent peak-season dispatches, single round-trips, or dedicated monthly/yearly contracts for your company fleet, we offer flexible plans with zero long-term lock-in hassle.',
      },
      {
        id: 'd-faq-4',
        question:
          'What if a driver falls sick or faces an emergency during a trip?',
        answer:
          'Your delivery never stops. Our 24/7 Pune control room immediately coordinates roadside help and arranges a verified backup driver so your truck and goods reach the destination safely and on schedule.',
      },
    ],
  },
  hi: {
    badge: 'सामान्य प्रश्न',
    title: 'अक्सर पूछे जाने वाले प्रश्न',
    subtitle:
      'हमारे चालक सत्यापन, वाहन प्रकार, लचीली भर्ती योजनाओं और 24/7 बैकअप सहायता के बारे में स्पष्ट और सीधे उत्तर।',
    faqs: [
      {
        id: 'd-faq-1',
        question: 'आप चालकों को नियुक्त करने से पहले उनका सत्यापन कैसे करते हैं?',
        answer:
          'प्रत्येक चालक हमारी टीम में शामिल होने से पहले सख्त आधार पता सत्यापन, पुलिस पृष्ठभूमि जांच, सरकारी पोर्टलों पर आरटीओ भारी लाइसेंस (HMV/LMV) सत्यापन, चिकित्सा/नेत्र स्वास्थ्य जांच और पिछले नियोक्ताओं से संदर्भ जांच से गुजरता है।',
      },
      {
        id: 'd-faq-2',
        question:
          'आपके चालक किस प्रकार के ट्रक और वाणिज्यिक वाहन चला सकते हैं?',
        answer:
          'हमारे चालक सभी प्रकार के वाणिज्यिक वाहनों को चलाने में अनुभवी हैं—जिनमें टाटा ऐस/बोलेरो पिकअप, आयशर/कैंटर टेम्पो, 14 फीट से 32 फीट के बंद कंटेनर, ओपन-बॉडी ट्रक, मल्टी-एक्सल ट्रेलर और रेफ्रिजरेटेड (रीफ़र) वाहन शामिल हैं।',
      },
      {
        id: 'd-faq-3',
        question:
          'क्या हम केवल कुछ दिनों के लिए चालक रख सकते हैं, या केवल मासिक अनुबंध पर?',
        answer:
          'दोनों विकल्प उपलब्ध हैं। चाहे आपको पीक-सीजन के लिए अतिरिक्त चालकों की आवश्यकता हो, सिंगल राउंड-ट्रिप के लिए या अपने कॉर्पोरेट बेड़े के लिए मासिक/वार्षिक अनुबंध की, हम बिना किसी दीर्घकालिक लॉक-इन के लचीली योजनाएं प्रदान करते हैं।',
      },
      {
        id: 'd-faq-4',
        question:
          'यदि यात्रा के दौरान चालक बीमार पड़ जाए या कोई आपात स्थिति आ जाए तो क्या होगा?',
        answer:
          'आपकी डिलीवरी कभी नहीं रुकती। हमारा 24/7 पुणे कंट्रोल रूम तुरंत सड़क किनारे सहायता का समन्वय करता है और एक सत्यापित बैकअप चालक की व्यवस्था करता है ताकि आपका ट्रक और माल समय पर गंतव्य तक पहुंचे।',
      },
    ],
  },
  mr: {
    badge: 'नेहमी विचारले जाणारे प्रश्न',
    title: 'वारंवार विचारले जाणारे प्रश्न',
    subtitle:
      'आमची चालक पडताळणी, वाहनांचे प्रकार, लवचिक भरती योजना आणि २४/७ बॅकअप सहाय्याबद्दल स्पष्ट आणि प्रामाणिक उत्तरे.',
    faqs: [
      {
        id: 'd-faq-1',
        question: 'कामावर घेण्यापूर्वी तुम्ही चालकांची पडताळणी कशी करता?',
        answer:
          'प्रत्येक चालक आमच्या ताफ्यात सामील होण्यापूर्वी कठोर आधार पत्ता पडताळणी, पोलीस पार्श्वभूमी तपासणी, सरकारी पोर्टलवर RTO हेवी लायसन्स (HMV/LMV) पडताळणी, वैद्यकीय/दृष्टी तपासणी आणि पूर्वीच्या वाहतूक मालकांकडून संदर्भ तपासणी प्रक्रियेतून जातो.',
      },
      {
        id: 'd-faq-2',
        question:
          ' तुमचे चालक कोणत्या प्रकारचे ट्रक आणि व्यावसायिक वाहने चालवू शकतात?',
        answer:
          'आमचे चालक सर्व प्रकारची व्यावसायिक वाहने चालवण्यात अनुभवी आहेत—ज्यामध्ये टाटा एस/बोलेरो पिकअप, आयशर/कॅन्टर टेम्पो, १४ फूट ते ३२ फूट बंद कंटेनर्स, ओपन-बॉडी ट्रक्स, मल्टी-अॅक्सल ट्रेलर आणि रेफ्रिजरेटेड (रीफर) वाहनांचा समावेश आहे.',
      },
      {
        id: 'd-faq-3',
        question:
          'आम्ही चालकांना काही दिवसांसाठी भाड्याने घेऊ शकतो की फक्त मासिक करारावर?',
        answer:
          'दोन्ही पर्याय उपलब्ध आहेत. तुम्हाला गर्दीच्या हंगामात तातडीच्या डिस्पॅचसाठी अतिरिक्त चालक हवे असतील, सिंगल राउंड-ट्रिपसाठी हवे असतील किंवा तुमच्या कंपनीच्या ताफ्यासाठी मासिक/वार्षिक करार हवा असेल, आम्ही लवचिक योजना ऑफर करतो.',
      },
      {
        id: 'd-faq-4',
        question:
          'प्रवासादरम्यान चालक आजारी पडल्यास किंवा आणीबाणी उद्भवल्यास काय होते?',
        answer:
          'तुमची डिलिव्हरी कधीही थांबत नाही. आमचे २४/७ पुणे कंट्रोल रूम त्वरित रस्त्यावर सहाय्य पुरवते आणि पडताळणी केलेला बॅकअप चालक पाठवते, ज्यामुळे तुमचा ट्रक आणि माल सुरक्षितपणे वेळेवर पोहोचतो.',
      },
    ],
  },
};

export const DriverFaqSection: React.FC = () => {
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

  const t = faqTranslations[lang] || faqTranslations.en;

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white relative overflow-hidden border-t border-purple-100/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge={t.badge}
          title={t.title}
          subtitle={t.subtitle}
        />

        <div className="mt-8 sm:mt-10">
          <Accordion items={t.faqs as AccordionItem[]} />
        </div>
      </div>
    </section>
  );
};
