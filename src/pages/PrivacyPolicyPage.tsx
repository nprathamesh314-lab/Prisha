// PRISHA XPRESS PVT. LTD. - PRIVACY POLICY
// ROUTE: /privacy-policy
// COMPLIANT WITH INFORMATION TECHNOLOGY ACT, 2000 & DIGITAL PERSONAL DATA PROTECTION FRAMEWORKS

import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { companyInfo } from '../data/companyData';
import {
  Shield,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  const lastUpdated = 'November 15, 2026';

  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'information-we-collect', title: '2. Information We Collect' },
    { id: 'personal-information', title: '3. Personal Information' },
    { id: 'driver-registration', title: '4. Driver Registration Information' },
    { id: 'business-enquiry', title: '5. Business Enquiry Information' },
    { id: 'how-we-use-information', title: '6. How We Use Your Information' },
    { id: 'information-sharing', title: '7. Information Sharing and Disclosure' },
    { id: 'data-security', title: '8. Data Security' },
    { id: 'cookies-analytics', title: '9. Cookies and Website Analytics' },
    { id: 'third-party-services', title: '10. Third-Party Services' },
    { id: 'data-retention', title: '11. Data Retention' },
    { id: 'your-privacy-rights', title: '12. Your Privacy Rights' },
    { id: 'policy-updates', title: '13. Policy Updates' },
    { id: 'contact-information', title: '14. Contact Information' },
  ];

  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="Legal & Data Governance"
        title="Privacy Policy"
        subtitle="Your privacy matters to us. Learn how Prisha Xpress collects, uses and protects your information."
        image="/assets/images/corporate-hq.jpg"
        breadcrumbs={[{ label: 'Privacy Policy' }]}
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
                  <Shield className="w-5 h-5 text-px-primary" />
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
                  <p className="font-bold text-px-dark">Commitment to Data Confidentiality</p>
                  <p className="leading-relaxed text-gray-700">
                    This Privacy Policy applies to the web portal of <strong>Prisha Xpress Pvt. Ltd.</strong> (<code>prishaxpress.com</code>) and governs data collected through our corporate website, commercial driver registration portals, staff application workflows, and business enquiry forms.
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
                    <strong>Prisha Xpress Pvt. Ltd.</strong> ("Prisha Xpress", "Company", "we", "our", or "us"), incorporated under the Companies Act, 2013 (CIN: <span className="font-mono font-bold text-px-primary">{companyInfo.cin}</span>) with headquarters at {companyInfo.address}, respects your privacy and is committed to protecting the personal and operational data you share with us.
                  </p>
                  <p>
                    This policy describes our practices regarding the collection, storage, processing, transfer, and safeguarding of information obtained from visitors, enterprise clients, transport partners, prospective staff members, and commercial truck driver candidates accessing our website and digital services.
                  </p>
                </div>
              </article>

              {/* 2. Information We Collect */}
              <article id="information-we-collect" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Information We Collect</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    We collect information directly from you when you submit forms on our website, communicate with our operations team via WhatsApp or telephone, or apply for driver placement or corporate employment. We do not engage in automated covert data harvesting or profiling beyond standard web server diagnostics.
                  </p>
                  <p>The categories of data we collect depend on how you interact with our website:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>General contact details submitted via general inquiries and support requests.</li>
                    <li>Professional employment and technical qualifications submitted via the Staff Application portal.</li>
                    <li>RTO licensing, commercial vehicle operational history, and identity verification documents submitted via the Driver Registration portal.</li>
                    <li>Freight specifications, route requirements, and corporate contact details submitted via the Business Enquiry form.</li>
                  </ul>
                </div>
              </article>

              {/* 3. Personal Information */}
              <article id="personal-information" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Personal Information</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    When you contact Prisha Xpress or interact with our public features, we may collect identifiable personal details including:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-2xl bg-px-bg border border-px-border">
                      <p className="text-xs font-bold text-px-dark">Contact Identification</p>
                      <p className="text-xs text-gray-600 mt-0.5">Full name, mobile phone number, WhatsApp contact number, and corporate email address.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-px-bg border border-px-border">
                      <p className="text-xs font-bold text-px-dark">Professional Identity</p>
                      <p className="text-xs text-gray-600 mt-0.5">Designation, department, company name, office address, and professional CV/resume details.</p>
                    </div>
                  </div>
                </div>
              </article>

              {/* 4. Driver Registration Information */}
              <article id="driver-registration" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    4
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Driver Registration Information</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Our Driver Registration workflow (<Link to="/careers/driver-registration" className="text-px-primary font-bold hover:underline">/careers/driver-registration</Link>) collects specific data strictly required under Indian transport and motor vehicle regulations for driver vetting and placement:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li><strong>Statutory Licenses:</strong> Driving license number, license category (Heavy Commercial Vehicle - HCV, Light Commercial Vehicle - LCV, Hazardous Material endorsement), issuing RTO, and validity date.</li>
                    <li><strong>Identity Proofs:</strong> Government-issued identification (Aadhaar card / PAN card / Voter ID) for background screening and identity authentication.</li>
                    <li><strong>Driving Experience:</strong> Years of commercial highway driving experience, specific vehicle types operated (multi-axle trailers, rigid trucks, tippers, container carriers), and preferred route corridors.</li>
                    <li><strong>Emergency Contact & Address:</strong> Permanent residential address, current location, and verified emergency contact information.</li>
                  </ul>
                  <p className="text-xs text-gray-600 italic">
                    Driver documents uploaded to our recruitment system are stored in access-controlled private cloud storage buckets with Row-Level Security (RLS) enabled.
                  </p>
                </div>
              </article>

              {/* 5. Business Enquiry Information */}
              <article id="business-enquiry" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    5
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Business Enquiry Information</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Enterprise clients requesting logistics proposals or 3PL fleet supervision provide information necessary to formulate service level agreements (SLAs):
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>Business entity name, registration details, and registered operating address.</li>
                    <li>Designated contact person details (name, corporate email, mobile number).</li>
                    <li>Specific logistics service vertical requested (Truck Drivers On Hire, 3PL Fleet Management, Scheduled Freight Transport, Commercial Service Station, Auto Spare Parts).</li>
                    <li>Operational scope: Origin-destination corridors, payload tonnage estimates, dispatch frequencies, and SLA requirements.</li>
                  </ul>
                </div>
              </article>

              {/* 6. How We Use Your Information */}
              <article id="how-we-use-information" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    6
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">How We Use Your Information</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>We process collected data exclusively for legitimate operational, recruitment, and contractual purposes:</p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li><strong>Service Execution:</strong> Reviewing and responding to corporate business enquiries, preparing quotations, executing transport SLAs, and scheduling fleet dispatches.</li>
                    <li><strong>Driver Screening & Placement:</strong> Performing statutory license verification, checking commercial credentials, assigning drivers to client fleets, and maintaining driver welfare rosters.</li>
                    <li><strong>Staff Recruitment:</strong> Evaluating applications for operational positions (dispatch controllers, workshop technicians, logistics managers) at our Pune HQ and regional depots.</li>
                    <li><strong>Customer Communication:</strong> Providing shipment tracking updates, invoicing, emergency roadside assistance, and operational alerts.</li>
                    <li><strong>Regulatory Compliance:</strong> Complying with Indian transport laws, labor standards, corporate tax obligations, and lawful law enforcement requests.</li>
                  </ul>
                </div>
              </article>

              {/* 7. Information Sharing and Disclosure */}
              <article id="information-sharing" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    7
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Information Sharing and Disclosure</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    <strong>We do not sell, rent, trade, or monetize your personal or commercial data.</strong> We disclose information only under the following limited operational circumstances:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-800">
                    <li><strong>Enterprise Fleet Partners:</strong> Driver profiles (name, verified license credentials, operational experience) are shared with authorized fleet clients for driver deployment.</li>
                    <li><strong>Verified Service Providers:</strong> Secure technology partners providing database infrastructure, telematics hosting, and secure cloud storage under strict confidentiality agreements.</li>
                    <li><strong>Statutory Authorities:</strong> When required by applicable Indian law, court order, or police directive in connection with transport safety or official investigations.</li>
                  </ul>
                </div>
              </article>

              {/* 8. Data Security */}
              <article id="data-security" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    8
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Data Security</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Prisha Xpress employs standard technological and administrative measures to protect your data against unauthorized access, loss, alteration, or disclosure:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>HTTPS/TLS 1.3 encryption across all public website pages and submission endpoints.</li>
                    <li>PostgreSQL Row-Level Security (RLS) policies ensuring restricted role-based administrative access to driver and applicant documents.</li>
                    <li>Separation of public assets from private document storage buckets.</li>
                    <li>Regular administrative credential reviews and operational audit logging.</li>
                  </ul>
                  <p className="text-xs text-gray-600">
                    While we maintain rigorous safeguards, no Internet data transmission is 100% impenetrable. We encourage users to maintain secure credentials and notify us immediately of any suspected breach.
                  </p>
                </div>
              </article>

              {/* 9. Cookies and Website Analytics */}
              <article id="cookies-analytics" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    9
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Cookies and Website Analytics</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Our website uses essential session cookies to enable basic navigation, page routing, and form submission states. We do not use third-party advertising cookies or cross-site tracking pixels.
                  </p>
                  <p>
                    Standard web server logs may temporarily record anonymous diagnostic data, such as IP addresses, browser versions, and access timestamps, strictly for server performance monitoring and security troubleshooting.
                  </p>
                </div>
              </article>

              {/* 10. Third-Party Services */}
              <article id="third-party-services" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    10
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Third-Party Services</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    Our web platform is hosted on modern infrastructure including Vercel (frontend edge delivery) and Supabase (cloud database & secure document storage). Links to external platforms (e.g. WhatsApp for direct chat, Google Maps for depot navigation) are governed by the respective privacy policies of those third-party providers.
                  </p>
                </div>
              </article>

              {/* 11. Data Retention */}
              <article id="data-retention" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    11
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Data Retention</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    We retain personal information only for as long as necessary to fulfill the operational purpose for which it was collected:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li><strong>Driver & Staff Applications:</strong> Retained for the duration of the recruitment screening process and, for placed drivers/employees, throughout their tenure plus statutory record retention periods.</li>
                    <li><strong>Business Inquiries:</strong> Retained for active client communication and commercial relationship records.</li>
                    <li><strong>Unsuccessful Candidate Data:</strong> Archived or safely purged upon conclusion of the hiring cycle unless the candidate consents to retention for future openings.</li>
                  </ul>
                </div>
              </article>

              {/* 12. Your Privacy Rights */}
              <article id="your-privacy-rights" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    12
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Your Privacy Rights</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    In accordance with applicable Indian laws and data protection regulations, you have the right to:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-gray-800">
                    <li>Request confirmation of whether we hold personal information concerning you.</li>
                    <li>Request access to or a copy of your personal data stored in our records.</li>
                    <li>Request correction or updating of inaccurate, outdated, or incomplete details.</li>
                    <li>Request withdrawal of consent or erasure of personal records, subject to statutory transport recordkeeping requirements.</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please submit a written request to our Data Officer at <a href={`mailto:${companyInfo.email}`} className="text-px-primary font-bold hover:underline">{companyInfo.email}</a>.
                  </p>
                </div>
              </article>

              {/* 13. Policy Updates */}
              <article id="policy-updates" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    13
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Policy Updates</h2>
                </div>
                <div className="space-y-3 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    We may periodically update this Privacy Policy to reflect modifications in our logistics operations, legal requirements, or technological safeguards. Any revisions will be published on this page with an updated "Last Updated" date. Continued usage of our web platform after such publication signifies your acceptance of the revised terms.
                  </p>
                </div>
              </article>

              {/* 14. Contact Information */}
              <article id="contact-information" className="p-6 sm:p-8 rounded-3xl bg-white border border-px-border shadow-soft-purple/20 space-y-4 scroll-mt-28">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-100 text-px-primary flex items-center justify-center font-bold text-sm">
                    14
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-px-dark">Contact Information</h2>
                </div>
                <div className="space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                  <p>
                    For inquiries, clarifications, or grievances regarding this Privacy Policy or our data handling practices, please contact our administrative desk:
                  </p>

                  <div className="p-5 rounded-2xl bg-px-bg border border-px-border space-y-3 text-sm">
                    <p className="font-bold text-px-dark text-base">{companyInfo.name}</p>
                    <p className="text-xs text-gray-600">CIN: {companyInfo.cin}</p>
                    <p className="text-gray-700"><strong>Address:</strong> {companyInfo.address}</p>
                    <p className="text-gray-700"><strong>Phone:</strong> {companyInfo.phone}</p>
                    <p className="text-gray-700"><strong>Email:</strong> <a href={`mailto:${companyInfo.email}`} className="text-px-primary font-bold hover:underline">{companyInfo.email}</a></p>
                    <p className="text-gray-700"><strong>Hours:</strong> {companyInfo.businessHours}</p>
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
