import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { HeroSliderSection } from '../components/sections/HeroSliderSection';
import { StatsStripSection } from '../components/sections/StatsStripSection';
import { CompanyIntroSection } from '../components/sections/CompanyIntroSection';
import { ServicesCarouselSection } from '../components/sections/ServicesCarouselSection';
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection';
import { WorkflowTimelineSection } from '../components/sections/WorkflowTimelineSection';
import { AnimatedStatisticsSection } from '../components/sections/AnimatedStatisticsSection';
import { TestimonialSliderSection } from '../components/sections/TestimonialSliderSection';
import { CareersSection } from '../components/sections/CareersSection';
import { BusinessEnquirySection } from '../components/sections/BusinessEnquirySection';

export const HomePage: React.FC = () => {
  return (
    <PageTransition>
      {/* 2. Hero: Full-Width Truck Image Slider */}
      <HeroSliderSection />

      {/* 3. Company Highlights: One-Line Animated Statistics Strip */}
      <StatsStripSection />

      {/* 4. About Prisha: Image + Short Company Introduction */}
      <CompanyIntroSection />

      {/* 5. Services: Swipeable Service Carousel (2-3 cards at a time) */}
      <ServicesCarouselSection />

      {/* 6. Why Choose Us: Three Compact Animated Features */}
      <WhyChooseUsSection />

      {/* 7. Workflow: Animated Transportation Timeline */}
      <WorkflowTimelineSection />

      {/* 8. Our Numbers: Animated Statistics Section */}
      <AnimatedStatisticsSection />

      {/* 9. Testimonials: Single-Card Testimonial Slider */}
      <TestimonialSliderSection />

      {/* 10. Careers: Two Compact Recruitment Panels */}
      <CareersSection />

      {/* 11. Business Enquiry: Short Validated Corporate Form */}
      <BusinessEnquirySection />
    </PageTransition>
  );
};
