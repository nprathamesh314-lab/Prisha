import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { HeroSection } from '../components/sections/HeroSection';
import { CompanyIntroSection } from '../components/sections/CompanyIntroSection';
import { ServicesSection } from '../components/sections/ServicesSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { OurNetworkSection } from '../components/sections/OurNetworkSection';
import { HowWeWorkSection } from '../components/sections/HowWeWorkSection';
import { CareersSection } from '../components/sections/CareersSection';
import { BusinessEnquirySection } from '../components/sections/BusinessEnquirySection';
import { ContactPreviewSection } from '../components/sections/ContactPreviewSection';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      {/* Section A: Hero Experience */}
      <HeroSection />

      {/* Section B: Company Introduction */}
      <CompanyIntroSection />

      {/* Section C: Our Services */}
      <ServicesSection />

      {/* Section D: Why Choose Prisha Xpress? */}
      <WhyChooseUsSection />

      {/* Section E: Published Client Voice & Testimonials */}
      <TestimonialsSection />

      {/* Section F: Our Network */}
      <OurNetworkSection />

      {/* Section F: How We Work */}
      <HowWeWorkSection />

      {/* Section G: Careers */}
      <CareersSection />

      {/* Section H: Business Enquiry */}
      <BusinessEnquirySection />

      {/* Section I: Contact Preview */}
      <ContactPreviewSection />
    </PageTransition>
  );
};
