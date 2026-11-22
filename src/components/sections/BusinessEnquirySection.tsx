// PRISHA XPRESS PVT. LTD. - CORPORATE BUSINESS ENQUIRY FORM SECTION
// COMPLIES WITH: PHASE 1, PHASE 9, PHASE 10 & PHASE 11 SPECIFICATIONS
// FULLY CONNECTED TO BUSINESS ENQUIRY BACKEND WITH RESEND EMAIL DISPATCH

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  MessageCircle,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  ArrowRight,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { companyInfo } from '../../data/companyData';
import { businessEnquiryService } from '../../services/enquiryService';
import {
  BusinessEnquiryServiceType,
  PreferredContactMethod,
} from '../../types/enquiry';

interface FormState {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  service: BusinessEnquiryServiceType;
  requirements: string;
  contactMethod: PreferredContactMethod;
}

const enquiryTranslations = {
  en: {
    leftBadge: 'CORPORATE FLEET PARTNERSHIP',
    leftHeading: 'Request a Tailored Logistics & Fleet Solution',
    leftDescription:
      'Tell us about your transport or fleet requirements. Our team will review your needs and contact you to discuss a suitable solution.',
    point1Title: 'Personalised Business Support',
    point1Desc:
      'Our team will understand your transport and fleet requirements and help you find the right service.',
    point2Title: 'Clear Business Communication',
    point2Desc:
      'Get clear information about services, pricing and business requirements before proceeding.',
    point3Title: 'Multiple Fleet Services',
    point3Desc:
      'Explore truck driver hiring, 3PL fleet management, transportation, vehicle servicing and auto-spares.',
    callButton: 'Call Company',
    whatsappButton: 'Chat on WhatsApp',
    rightHeading: 'Submit Your Business Enquiry',
    rightSubtitle: 'Share your requirements with us. Our team will get in touch with you.',
    labelFullName: 'Full Name *',
    placeholderFullName: 'Enter your name or representative name',
    labelCompanyName: 'Company / Business Name',
    placeholderCompanyName: 'e.g. Acme Logistics, Tata Steel vendor, etc.',
    labelPhone: 'Phone Number *',
    placeholderPhone: '10-digit mobile number (+91)',
    labelEmail: 'Business Email *',
    placeholderEmail: 'corporate or personal email address',
    labelService: 'Service Required *',
    labelRequirements: 'Operational Requirements *',
    placeholderRequirements:
      'Tell us about your vehicle requirements, pickup and delivery locations, transport routes, load capacity or number of drivers needed.',
    labelContactMethod: 'Preferred Contact Method',
    submitButton: 'Submit Business Enquiry',
    submittingButton: 'Submitting Enquiry...',
    privacyNotice:
      'We respect your privacy. The submitted information will strictly be used by Prisha Xpress Pvt. Ltd. to evaluate and respond to your business enquiry.',
    successTitle: 'Thank You!',
    successSub: 'Your business enquiry has been submitted successfully.',
    refLabel: 'Your Enquiry Reference:',
    successNote:
      'Our team will review your requirements and contact you via your preferred communication channel.',
    backHome: 'Back to Home',
    submitAnother: 'Submit Another Enquiry',
    errName: 'Please enter your full name (minimum 2 characters).',
    errPhone: 'Please enter a valid 10-digit mobile number.',
    errEmail: 'Please enter a valid email address.',
    errRequirements: 'Please describe your requirements (at least 10 characters).',
  },
  hi: {
    leftBadge: 'कॉर्पोरेट बेड़ा साझेदारी',
    leftHeading: 'अनुकूलित लॉजिस्टिक्स और बेड़ा समाधान का अनुरोध करें',
    leftDescription:
      'अपनी परिवहन या बेड़ा आवश्यकताओं के बारे में हमें बताएं। हमारी टीम आपकी आवश्यकताओं की समीक्षा करेगी और उपयुक्त समाधान पर चर्चा करने के लिए आपसे संपर्क करेगी।',
    point1Title: 'व्यक्तिगत व्यावसायिक सहायता',
    point1Desc:
      'हमारी टीम आपकी परिवहन और बेड़े की आवश्यकताओं को समझेगी और सही सेवा खोजने में आपकी मदद करेगी।',
    point2Title: 'स्पष्ट व्यावसायिक संचार',
    point2Desc:
      'आगे बढ़ने से पहले सेवाओं, कीमतों और व्यावसायिक शर्तों के बारे में स्पष्ट जानकारी प्राप्त करें।',
    point3Title: 'विविध बेड़ा सेवाएं',
    point3Desc:
      'ट्रक चालक भर्ती, 3PL बेड़ा प्रबंधन, परिवहन, वाहन सर्विसिंग और ऑटो-स्पेयर की सुविधा उपलब्ध है।',
    callButton: 'कंपनी को कॉल करें',
    whatsappButton: 'व्हाट्सएप पर चैट करें',
    rightHeading: 'अपनी व्यावसायिक पूछताछ दर्ज करें',
    rightSubtitle: 'अपनी आवश्यकताएं हमारे साथ साझा करें। हमारी टीम आपसे संपर्क करेगी।',
    labelFullName: 'पूरा नाम *',
    placeholderFullName: 'अपना नाम दर्ज करें',
    labelCompanyName: 'कंपनी / व्यवसाय का नाम',
    placeholderCompanyName: 'जैसे: आपकी कंपनी या फर्म का नाम',
    labelPhone: 'फ़ोन नंबर *',
    placeholderPhone: '10 अंकों का मोबाइल नंबर',
    labelEmail: 'व्यावसायिक ईमेल *',
    placeholderEmail: 'ईमेल पता दर्ज करें',
    labelService: 'आवश्यक सेवा *',
    labelRequirements: 'परिचालन आवश्यकताएं *',
    placeholderRequirements:
      'हमें अपनी वाहन आवश्यकताओं, पिकअप और डिलीवरी स्थानों, परिवहन मार्गों, भार क्षमता या आवश्यक चालकों की संख्या के बारे में बताएं।',
    labelContactMethod: 'पसंदीदा संपर्क माध्यम',
    submitButton: 'व्यावसायिक पूछताछ सबमिट करें',
    submittingButton: 'सबमिट किया जा रहा है...',
    privacyNotice:
      'हम आपकी गोपनीयता का सम्मान करते हैं। सबमिट की गई जानकारी का उपयोग प्रिशा एक्सप्रेस प्राइवेट लिमिटेड द्वारा केवल आपकी व्यावसायिक पूछताछ का जवाब देने के लिए किया जाएगा।',
    successTitle: 'धन्यवाद!',
    successSub: 'आपकी व्यावसायिक पूछताछ सफलतापूर्वक सबमिट कर दी गई है।',
    refLabel: 'आपका संदर्भ नंबर:',
    successNote:
      'हमारी टीम आपकी आवश्यकताओं की समीक्षा करेगी और आपके पसंदीदा माध्यम से आपसे संपर्क करेगी।',
    backHome: 'होम पेज पर वापस जाएं',
    submitAnother: 'दूसरी पूछताछ दर्ज करें',
    errName: 'कृपया अपना पूरा नाम दर्ज करें।',
    errPhone: 'कृपया मान्य 10 अंकों का मोबाइल नंबर दर्ज करें।',
    errEmail: 'कृपया एक मान्य ईमेल पता दर्ज करें।',
    errRequirements: 'कृपया अपनी आवश्यकताओं का विवरण कम से कम 10 अक्षरों में लिखें।',
  },
  mr: {
    leftBadge: 'कॉर्पोरेट ताफा भागीदारी',
    leftHeading: 'अनुकूलित वाहतूक आणि ताफा उपायांची मागणी करा',
    leftDescription:
      'तुमच्या वाहतूक किंवा ताफ्याच्या गरजांबद्दल आम्हाला सांगा. आमची टीम तुमच्या गरजांचा आढावा घेईल आणि योग्य उपायावर चर्चा करण्यासाठी तुमच्याशी संपर्क साधेल.',
    point1Title: 'वैयक्तिकृत व्यावसायिक सहाय्य',
    point1Desc:
      'आमची टीम तुमच्या वाहतूक आणि ताफ्याच्या गरजा समजून घेईल आणि तुम्हाला योग्य सेवा निवडण्यात मदत करेल.',
    point2Title: 'स्पष्ट व्यावसायिक संवाद',
    point2Desc:
      'पुढे जाण्यापूर्वी सेवा, दर आणि व्यावसायिक नियमांबद्दल स्पष्ट व पारदर्शक माहिती मिळवा.',
    point3Title: 'विविध ताफा सेवा',
    point3Desc:
      'ट्रक चालक भरती, 3PL ताफा व्यवस्थापन, वाहतूक, वाहन सर्व्हिसिंग आणि सुटे भाग उपलब्ध.',
    callButton: 'कंपनीला कॉल करा',
    whatsappButton: 'व्हॉट्सअॅपवर चॅट करा',
    rightHeading: 'तुमची व्यावसायिक चौकशी सादर करा',
    rightSubtitle: 'तुमच्या गरजा आमच्याशी शेअर करा. आमची टीम लवकरच तुमच्याशी संपर्क साधेल.',
    labelFullName: 'पूर्ण नाव *',
    placeholderFullName: 'तुमचे नाव किंवा प्रतिनिधीचे नाव',
    labelCompanyName: 'कंपनी / व्यवसायाचे नाव',
    placeholderCompanyName: 'उदा. फर्म किंवा कंपनीचे नाव',
    labelPhone: 'फोन नंबर *',
    placeholderPhone: '१० अंकी मोबाईल नंबर',
    labelEmail: 'व्यावसायिक ईमेल *',
    placeholderEmail: 'ईमेल पत्ता टाका',
    labelService: 'आवश्यक सेवा *',
    labelRequirements: 'परिचालन गरजा *',
    placeholderRequirements:
      'आम्हाला तुमच्या वाहनांच्या गरजा, पिकअप आणि डिलिव्हरी ठिकाणे, वाहतूक मार्ग, वजन क्षमता किंवा आवश्यक चालकांच्या संख्येबद्दल सांगा.',
    labelContactMethod: 'पसंतीचा संपर्क मार्ग',
    submitButton: 'व्यावसायिक चौकशी पाठवा',
    submittingButton: 'चौकशी पाठवत आहे...',
    privacyNotice:
      'आम्ही तुमच्या गोपनीयतेचा आदर करतो. सबमिट केलेली माहिती प्रिशा एक्सप्रेस प्रायव्हेट लिमिटेडद्वारे फक्त तुमच्या व्यावसायिक चौकशीला प्रतिसाद देण्यासाठी वापरली जाईल.',
    successTitle: 'धन्यवाद!',
    successSub: 'तुमची व्यावसायिक चौकशी यशस्वीरित्या सबमिट झाली आहे.',
    refLabel: 'तुमचा संदर्भ क्रमांक:',
    successNote:
      'आमची टीम तुमच्या गरजांचा अभ्यास करून तुमच्या पसंतीच्या संपर्क मार्गाने तुमच्याशी संपर्क साधेल.',
    backHome: 'मुख्य पानावर परत जा',
    submitAnother: 'दुसरी चौकशी सादर करा',
    errName: 'कृपया तुमचे पूर्ण नाव टाका.',
    errPhone: 'कृपया वैध १० अंकी मोबाईल नंबर टाका.',
    errEmail: 'कृपया वैध ईमेल पत्ता टाका.',
    errRequirements: 'कृपया तुमच्या गरजेबद्दल किमान १० अक्षरांमध्ये माहिती द्या.',
  },
};

const SERVICES_OPTIONS: BusinessEnquiryServiceType[] = [
  'Truck Drivers on Hire',
  '3PL Fleet Management',
  'Transportation',
  'Service Station',
  'Auto-Spares',
  'Other',
];

const CONTACT_METHODS: PreferredContactMethod[] = ['Phone Call', 'WhatsApp', 'Email'];

export const BusinessEnquirySection: React.FC = () => {
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

  const t = enquiryTranslations[lang] || enquiryTranslations.en;

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    service: 'Truck Drivers on Hire',
    requirements: '',
    contactMethod: 'Phone Call',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReference, setSubmittedReference] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = t.errName;
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      newErrors.phone = t.errPhone;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t.errEmail;
    }

    if (!formData.requirements.trim() || formData.requirements.trim().length < 10) {
      newErrors.requirements = t.errRequirements;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double-clicks
    if (!validate()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await businessEnquiryService.submitEnquiry({
        full_name: formData.fullName,
        company_name: formData.companyName,
        phone_number: formData.phone,
        email: formData.email,
        service_required: formData.service,
        operational_requirements: formData.requirements,
        preferred_contact_method: formData.contactMethod,
      });

      if (result.success && result.referenceId) {
        setSubmittedReference(result.referenceId);
      } else {
        setErrorMessage(
          result.error || 'Could not process submission. Please verify your details and retry.'
        );
      }
    } catch (err: any) {
      setErrorMessage(
        err.message || 'An unexpected connection error occurred. Your entered information is preserved.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedReference(null);
    setFormData({
      fullName: '',
      companyName: '',
      phone: '',
      email: '',
      service: 'Truck Drivers on Hire',
      requirements: '',
      contactMethod: 'Phone Call',
    });
    setErrors({});
    setErrorMessage(null);
  };

  return (
    <section id="enquiry" className="scroll-mt-28 py-16 lg:py-24 bg-px-bg relative overflow-hidden">
      {/* Background Soft Purple Glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT SECTION: Value Proposition & Direct Contact (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <FadeIn direction="right">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-px-primary border border-purple-200 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-px-primary" />
                {t.leftBadge}
              </span>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-px-dark tracking-tight leading-tight">
                {t.leftHeading}
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                {t.leftDescription}
              </p>
            </FadeIn>

            {/* Three Information Points */}
            <FadeIn direction="right" delay={0.3}>
              <div className="space-y-4 pt-2">
                {/* Point 1 */}
                <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-px-primary shrink-0 mt-0.5">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-px-dark">
                      1. {t.point1Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      {t.point1Desc}
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-px-primary shrink-0 mt-0.5">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-px-dark">
                      2. {t.point2Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      {t.point2Desc}
                    </p>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="p-4 rounded-2xl bg-white border border-px-border shadow-xs flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-px-primary shrink-0 mt-0.5">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-px-dark">
                      3. {t.point3Title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                      {t.point3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Direct Contact Buttons */}
            <FadeIn direction="right" delay={0.4}>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-gray-50 border border-purple-200 text-px-dark hover:text-px-primary text-xs sm:text-sm font-bold shadow-xs inline-flex items-center gap-2 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-px-primary" />
                  <span>{t.callButton}: {companyInfo.phone}</span>
                </a>

                <a
                  href="https://wa.me/917276897727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20discuss%20a%20business%20enquiry."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs inline-flex items-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.whatsappButton}</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT SECTION: Form or Success Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-[28px] bg-white border border-px-border shadow-soft-purple relative overflow-hidden">
              {/* Success View */}
              {submittedReference ? (
                <div className="text-center py-6 sm:py-10 space-y-6 animate-fadeIn">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-px-dark">
                      {t.successTitle}
                    </h3>
                    <p className="text-base text-gray-700 font-medium">
                      {t.successSub}
                    </p>
                  </div>

                  {/* Highlighted Reference Box */}
                  <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 max-w-md mx-auto space-y-1.5 shadow-inner">
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-700 block">
                      {t.refLabel}
                    </span>
                    <span className="text-2xl font-black font-mono text-px-primary block select-all">
                      {submittedReference}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    {t.successNote}
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
                    <Link
                      to="/"
                      className="px-6 py-3 rounded-xl bg-px-primary hover:bg-px-violet text-white text-sm font-bold shadow-soft-purple transition-all inline-flex items-center gap-2"
                    >
                      <span>{t.backHome}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-px-dark text-sm font-bold transition-all inline-flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4 text-gray-600" />
                      <span>{t.submitAnother}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Main Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-px-dark">
                      {t.rightHeading}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {t.rightSubtitle}
                    </p>
                  </div>

                  {/* Submission Error Banner */}
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">Submission Notice: </strong>
                        {errorMessage}
                      </div>
                    </div>
                  )}

                  {/* Row 1: Full Name & Company Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-1.5">
                        {t.labelFullName}
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder={t.placeholderFullName}
                        className={`w-full px-4 py-3 rounded-xl bg-white border ${
                          errors.fullName ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-300 focus:border-px-primary'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-1.5">
                        {t.labelCompanyName}
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder={t.placeholderCompanyName}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-px-primary text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  {/* Row 2: Phone Number & Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-1.5">
                        {t.labelPhone}
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder={t.placeholderPhone}
                        className={`w-full px-4 py-3 rounded-xl bg-white border ${
                          errors.phone ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-300 focus:border-px-primary'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-1.5">
                        {t.labelEmail}
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.placeholderEmail}
                        className={`w-full px-4 py-3 rounded-xl bg-white border ${
                          errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-300 focus:border-px-primary'
                        } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all`}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Service Required Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-1.5">
                      {t.labelService}
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value as BusinessEnquiryServiceType })
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white border border-gray-300 focus:border-px-primary text-sm font-medium focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all cursor-pointer"
                      disabled={isSubmitting}
                    >
                      {SERVICES_OPTIONS.map((srv) => (
                        <option key={srv} value={srv}>
                          {srv}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Row 4: Operational Requirements (Textarea) */}
                  <div>
                    <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-1.5">
                      {t.labelRequirements}
                    </label>
                    <textarea
                      rows={4}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder={t.placeholderRequirements}
                      className={`w-full px-4 py-3 rounded-xl bg-white border ${
                        errors.requirements ? 'border-rose-400 focus:ring-rose-200' : 'border-gray-300 focus:border-px-primary'
                      } text-sm focus:outline-none focus:ring-2 focus:ring-px-primary/20 transition-all resize-y`}
                      disabled={isSubmitting}
                    />
                    {errors.requirements && (
                      <p className="text-[11px] text-rose-600 mt-1 font-medium">{errors.requirements}</p>
                    )}
                  </div>

                  {/* Row 5: Preferred Contact Method */}
                  <div>
                    <label className="block text-xs font-bold text-px-dark uppercase tracking-wider mb-2">
                      {t.labelContactMethod}
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {CONTACT_METHODS.map((method) => {
                        const isSelected = formData.contactMethod === method;
                        return (
                          <button
                            key={method}
                            type="button"
                            onClick={() => setFormData({ ...formData, contactMethod: method })}
                            className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center ${
                              isSelected
                                ? 'bg-purple-100 text-px-primary border-purple-300 shadow-xs'
                                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                            }`}
                            disabled={isSubmitting}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 text-[11px] text-gray-600 leading-relaxed">
                    {t.privacyNotice}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-px-primary hover:bg-px-violet text-white font-bold text-sm sm:text-base shadow-soft-purple hover:shadow-glow-purple disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        <span>{t.submittingButton}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.submitButton}</span>
                        <Send className="w-4 h-4 text-white" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
