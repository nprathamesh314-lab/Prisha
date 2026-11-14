import React from 'react';
import { SectionHeading } from '../../common/SectionHeading';
import { Accordion, AccordionItem } from '../../common/Accordion';

const driverFaqs: AccordionItem[] = [
  {
    id: 'd-faq-1',
    question: 'How does Prisha Xpress verify commercial driver backgrounds?',
    answer:
      'Every driver undergoes rigorous identity and license validation via national transport portals, address verification via Aadhaar, physical fitness reviews, and past employer route checks before being admitted to our active pool.',
  },
  {
    id: 'd-faq-2',
    question: 'What types of commercial vehicles do your drivers handle?',
    answer:
      'Our drivers operate a wide spectrum of commercial vehicles including Light Commercial Vehicles (LCVs), Medium Commercial Vehicles (MCVs), Heavy Motor Vehicles (HMVs), multi-axle trailers, and temperature-controlled reefer trucks.',
  },
  {
    id: 'd-faq-3',
    question: 'Can we hire drivers for short-term surges or long-term dedicated contracts?',
    answer:
      'Yes. We offer both dedicated monthly contracts for enterprise fleet operations and flexible surge staffing during high-volume seasonal spikes such as festive periods or agricultural harvest peaks.',
  },
  {
    id: 'd-faq-4',
    question: 'What happens if a driver encounters a roadside emergency or illness?',
    answer:
      'Our 24/7 central Pune operations desk provides continuous highway support. In case of mechanical issues or medical emergencies, we coordinate backup drivers and highway assistance immediately.',
  },
];

export const DriverFaqSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Driver Inquiries"
          title="Frequently Asked Questions"
          subtitle="Clear answers on vetting standards, hiring contracts, and driver welfare practices."
        />

        <Accordion items={driverFaqs} />
      </div>
    </section>
  );
};
