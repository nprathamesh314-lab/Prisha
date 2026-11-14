// PRISHA XPRESS PVT. LTD. - TERMS & CONDITIONS
// ROUTE: /terms-and-conditions
// CORPORATE COMMERCIAL TERMS AND WEBSITE USAGE GOVERNANCE

import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { companyInfo } from '../data/companyData';
import {
  FileCheck,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const TermsAndConditionsPage: React.FC = () => {
  const lastUpdated = 'November 15, 2026';

  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'acceptance-of-terms', title: '2. Acceptance of Terms' },
    { id: 'about-prisha-xpress', title: '3. About Prisha Xpress' },
    { id: 'website-usage', title: '4. Website Usage' },
    { id: 'our-services', title: '5. Our Services' },
    { id: 'driver-hiring-services', title: '6. Truck Driver Hiring Services' },
    { id: 'driver-registration-verification', title: '7. Driver Registration and Verification' },
    { id: 'fleet-management-services', title: '8. Fleet Management Services' },
    { id: 'transportation-services', title: '9. Transportation Services' },
    { id: 'service-station-auto-spares', title: '10. Service Station and Auto Spares' },
    { id: 'customer-responsibilities', title: '11. Customer Responsibilities' },
    { id: 'enquiries-service-requests', title: '12. Enquiries and Service Requests' },
    { id: 'payments-commercial-agreements', title: '13. Payments and Commercial Agreements' },
    { id: 'limitation-of-liability', title: '14. Limitation of Liability' },
    { id: 'intellectual-property', title: '15. Intellectual Property' },
    { id: 'third-party-links', title: '16. Third-Party Links' },
    { id: 'changes-to-terms', title: '17. Changes to Terms' },
    { id: 'governing-law-jurisdiction', title: '18. Governing Law and Jurisdiction' },
    { id: 'contact-information', title: '19. Contact Information' },
  ];

  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="Legal & Commercial Terms"
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using Prisha Xpress services and website."
        image="/assets/images/corporate-hq.jpg"
        breadcrumbs={[{ label: 'Terms & Conditions' }]}
      >
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-purple-200 mt-2">
          <Calendar className="w-4 h-4 text-purple-300" />
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </PageHero>

      {/* SECTION 2: CONTENT & NAVIGATION */}
      <section className="py-14 lg:py-20 bg-px-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Desktop Sticky Table of Contents (4 cols) */}
            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-3xl bg-white border border-px-border shadow-soft-purple/30 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                  <FileCheck className="w-5 h-5 text-px-primary" />
                  <h3 className="font-bold text-px-dark text-base">Table of Contents</h3>
                </div>
                <nav className="space-y-1 text-xs font-medium text-gray-600 max-h-[70vh] overflow-y-auto pr-2">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block py-1.5 px-2.5 rounded-lg hover:bg-px-lavender hover:text-px-primary transition-colors truncate"
                    >
                      {section.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-3 border-t border-gray-100 text-[11px] text-gray-500">
                  <p className="font-semibold text-px-dark">{companyInfo.name}</p>
                  <p>CIN: {companyInfo.cin}</p>
                </div>
              </div>
            </aside>

            {/* Main Content Area (8 cols) */}
            <div className="lg:col-span-8 space-y-8">
              {/* Notice Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-purple-50/80 border border-purple-200/80 flex items-start gap-3.5 text-xs sm:text-sm text-px-deep">
                <AlertCircle className="w-5 h-5 text-px-primary shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-px-dark">Master Terms & Individual Service Contracts</p>
                  <p className="leading-relaxed text-gray-700">
                    These Terms & Conditions govern general website access and preliminary service inquiries. Commercial transportation operations, dedicated driver staffing arrangements, and 3PL fleet supervision are additionally governed by formal written Service Level Agreements (SLAs) executed between Prisha Xpress Pvt. Ltd. and the client entity.
                  </p>
                </div>
              </div>

              {/* 1. Introduction */}
              <article id="introduction" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Introduction</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Welcome to the website of <strong>Prisha Xpress Pvt. Ltd.</strong> ("Prisha Xpress", "Company", "we", "us", or "our"). These Terms & Conditions ("Terms") govern your access to and use of our website (<a href="https://www.prishaxpress.com" className="text-px-primary font-bold hover:underline">prishaxpress.com</a>), our career and recruitment portals, and our commercial inquiries infrastructure.
                  </p>
                </div>
              </article>

              {/* 2. Acceptance of Terms */}
              <article id="acceptance-of-terms" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Acceptance of Terms</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    By accessing, browsing, or using this website, submitting an inquiry, registering as a commercial driver, or submitting a job application, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <Link to="/privacy-policy" className="text-px-primary font-bold hover:underline">Privacy Policy</Link>. If you do not agree to these Terms, please do not use this website.
                  </p>
                </div>
              </article>

              {/* 3. About Prisha Xpress */}
              <article id="about-prisha-xpress" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">About Prisha Xpress</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    <strong>Prisha Xpress Pvt. Ltd.</strong> is a corporate company duly registered in India under the Companies Act, 2013, holding Corporate Identification Number (CIN) <span className="font-mono font-bold text-px-primary">{companyInfo.cin}</span>, with its corporate headquarters situated at {companyInfo.address}.
                  </p>
                  <p>
                    The company operates in commercial transportation, driver hiring solutions, third-party logistics (3PL) fleet management, heavy commercial vehicle service stations, and automotive spare parts distribution.
                  </p>
                </div>
              </article>

              {/* 4. Website Usage */}
              <article id="website-usage" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Website Usage</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>You agree to use this website only for lawful purposes related to legitimate business and employment inquiries. You agree not to:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>Submit falsified, fraudulent, or impersonated identity, licensing, or commercial business details.</li>
                    <li>Attempt to breach, probe, or scan website security, servers, databases, or authentication mechanisms.</li>
                    <li>Introduce malicious code, viruses, automated bots, scrapers, or disruptive scripts.</li>
                    <li>Use website communication channels to transmit unsolicited marketing, spam, or defamatory material.</li>
                  </ul>
                </div>
              </article>

              {/* 5. Our Services */}
              <article id="our-services" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Our Services</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>Prisha Xpress provides five primary logistics service verticals:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-px-bg border border-px-border">
                      <p className="text-xs font-bold text-px-dark">1. Truck Drivers On Hire</p>
                      <p className="text-xs text-gray-600 mt-0.5">Professional, verified commercial truck drivers for line-haul and short-haul operations.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-px-bg border border-px-border">
                      <p className="text-xs font-bold text-px-dark">2. 3PL Fleet Management</p>
                      <p className="text-xs text-gray-600 mt-0.5">End-to-end supervision, telemetry tracking, and operational governance for corporate vehicle fleets.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-px-bg border border-px-border">
                      <p className="text-xs font-bold text-px-dark">3. Transportation & Logistics</p>
                      <p className="text-xs text-gray-600 mt-0.5">Scheduled freight line-haul transit connecting Maharashtra and key western industrial corridors.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-px-bg border border-px-border">
                      <p className="text-xs font-bold text-px-dark">4. Service Station & Spares</p>
                      <p className="text-xs text-gray-600 mt-0.5">Commercial vehicle maintenance bays and certified OEM truck spare parts distribution.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* 6. Truck Driver Hiring Services */}
              <article id="driver-hiring-services" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Truck Driver Hiring Services</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    When enterprise clients engage Prisha Xpress for commercial driver staffing:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>All placed drivers undergo verification of their statutory RTO commercial driving license and identity credentials.</li>
                    <li>Drivers are deployed in accordance with the specific vehicle categories, schedules, and route guidelines specified in the commercial contract.</li>
                    <li>Clients must ensure that vehicles assigned to placed drivers are roadworthy, legally registered, insured, and compliant with the Motor Vehicles Act, 1988.</li>
                  </ul>
                </div>
              </article>

              {/* 7. Driver Registration and Verification */}
              <article id="driver-registration-verification" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Driver Registration and Verification</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Commercial drivers registering via our driver portal (<Link to="/careers/driver-registration" className="text-px-primary font-bold hover:underline">/careers/driver-registration</Link>) warrant that:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>All submitted licenses, badges, certificates, and personal identity documents are authentic, valid, and unencumbered.</li>
                    <li>They possess the requisite qualifications to operate the vehicle classes selected in their registration profile.</li>
                    <li>Registration on this portal constitutes an application for placement screening and does not create an automatic, binding guarantee of employment until formal verification and engagement terms are completed.</li>
                  </ul>
                </div>
              </article>

              {/* 8. Fleet Management Services */}
              <article id="fleet-management-services" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Fleet Management Services</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    3PL Fleet Management services involve dispatch control room oversight, telematics coordination, preventive servicing schedules, and operational reporting. Specific service levels, uptime metrics, reporting intervals, and commercial management fees are defined in individual written contracts between the client and Prisha Xpress.
                  </p>
                </div>
              </article>

              {/* 9. Transportation Services */}
              <article id="transportation-services" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    9
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Transportation Services</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Freight carriage by road is conducted subject to the Carriage by Road Act, 2007 and standard consignment note / Lorry Receipt (LR) terms. Consignors must declare cargo nature accurately and ensure goods comply with applicable transit documentation (e-Way bills, tax invoices, and statutory permits).
                  </p>
                </div>
              </article>

              {/* 10. Service Station and Auto Spares */}
              <article id="service-station-auto-spares" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    10
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Service Station and Auto Spares</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Commercial vehicle maintenance, hydraulic inspections, and component replacements performed at our service hubs follow manufacturer specifications. Auto spare parts distributed by Prisha Xpress are genuine OEM parts accompanied by manufacturer warranties where applicable.
                  </p>
                </div>
              </article>

              {/* 11. Customer Responsibilities */}
              <article id="customer-responsibilities" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    11
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Customer Responsibilities</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>Customers and enterprise partners agree to:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>Provide accurate, complete cargo details, weights, and pickup/delivery timelines.</li>
                    <li>Ensure cargo is safely packaged and legally permitted for commercial transport under Indian law.</li>
                    <li>Provide safe, timely access for loading and unloading at designated dispatch and delivery bays.</li>
                    <li>Treat commercial drivers and fleet crew with dignity, respect, and compliance with humane working standards.</li>
                  </ul>
                </div>
              </article>

              {/* 12. Enquiries and Service Requests */}
              <article id="enquiries-service-requests" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    12
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Enquiries and Service Requests</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Submitting an inquiry through our Business Enquiry form (<Link to="/#enquiry" className="text-px-primary font-bold hover:underline">/#enquiry</Link>) or Contact page constitutes a preliminary request for information and commercial discussion. It does not establish a binding service contract until a formal quotation and agreement are approved by both parties.
                  </p>
                </div>
              </article>

              {/* 13. Payments and Commercial Agreements */}
              <article id="payments-commercial-agreements" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    13
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Payments and Commercial Agreements</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Payment terms, billing schedules, credit limits, detention charges, and GST invoice terms are agreed upon in writing within individual commercial contracts or purchase orders. Unless otherwise stated in a written contract, invoices are payable as per agreed corporate payment cycles.
                  </p>
                </div>
              </article>

              {/* 14. Limitation of Liability */}
              <article id="limitation-of-liability" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    14
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Limitation of Liability</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    To the maximum extent permitted under applicable law, Prisha Xpress Pvt. Ltd. shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of this website.
                  </p>
                  <p>
                    Liability for freight transit, vehicle supervision, or driver staffing is governed strictly by the liability clauses set forth in the specific commercial contract or LR terms, subject to statutory limits under the Carriage by Road Act, 2007.
                  </p>
                </div>
              </article>

              {/* 15. Intellectual Property */}
              <article id="intellectual-property" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    15
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Intellectual Property</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    All content, text, graphics, logos, brand assets, photography, layouts, and software code on this website are the intellectual property of <strong>Prisha Xpress Pvt. Ltd.</strong> or its licensors, protected under the Copyright Act, 1957 and Trade Marks Act, 1999 of India. No part may be reproduced, modified, or distributed without prior written consent.
                  </p>
                </div>
              </article>

              {/* 16. Third-Party Links */}
              <article id="third-party-links" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    16
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Third-Party Links</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    This website may contain links to external sites (such as WhatsApp, navigation maps, or government transport portals). Prisha Xpress does not endorse and is not responsible for the content, privacy practices, or accuracy of third-party platforms.
                  </p>
                </div>
              </article>

              {/* 17. Changes to Terms */}
              <article id="changes-to-terms" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    17
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Changes to Terms</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    We reserve the right to revise or update these Terms & Conditions at any time. Updates will take effect immediately upon being posted on this page. Your continued use of the website following any update signifies your acceptance of the revised Terms.
                  </p>
                </div>
              </article>

              {/* 18. Governing Law and Jurisdiction */}
              <article id="governing-law-jurisdiction" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    18
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Governing Law and Jurisdiction</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    These Terms & Conditions shall be governed by, interpreted, and construed in accordance with the <strong>laws of the Republic of India</strong>.
                  </p>
                  <p>
                    Any dispute, claim, or controversy arising out of or in connection with the use of this website or preliminary services shall be subject to the exclusive jurisdiction of the <strong>competent courts located in Pune, Maharashtra, India</strong>.
                  </p>
                </div>
              </article>

              {/* 19. Contact Information */}
              <article id="contact-information" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    19
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Contact Information</h2>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    For inquiries, clarifications, or legal correspondence concerning these Terms & Conditions, please contact our corporate office:
                  </p>

                  <div className="p-5 rounded-2xl bg-px-bg border border-px-border space-y-3 text-sm">
                    <p className="font-bold text-px-dark text-base">{companyInfo.name}</p>
                    <p className="text-xs text-gray-600">CIN: {companyInfo.cin}</p>
                    <p className="text-gray-700"><strong>Headquarters:</strong> {companyInfo.address}</p>
                    <p className="text-gray-700"><strong>Telephone:</strong> {companyInfo.phone}</p>
                    <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${companyInfo.email}`} className="text-px-primary font-bold hover:underline">{companyInfo.email}</a></p>
                    <p className="text-gray-700"><strong>Operating Hours:</strong> {companyInfo.businessHours}</p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
