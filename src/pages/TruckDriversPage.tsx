import React from 'react';
import { PageTransition } from '../components/animations/PageTransition';
import { PageHero } from '../components/common/PageHero';
import { SectionHeading } from '../components/common/SectionHeading';
import { FadeIn } from '../components/animations/FadeIn';
import { CTASection } from '../components/common/CTASection';
import { Button } from '../components/common/Button';
import {
  UserCheck,
  ShieldCheck,
  Award,
  CheckCircle2,
  FileText,
  HeartHandshake,
  ArrowRight,
  ClipboardCheck,
  Truck,
  AlertTriangle,
} from 'lucide-react';

const driverResponsibilities = [
  {
    icon: Truck,
    title: 'Safe & Defensive Highway Operation',
    desc: 'Operate commercial vehicles in full compliance with national speed limits, lane disciplines, and mandatory driver rest schedules.',
  },
  {
    icon: ClipboardCheck,
    title: 'Pre-Trip Vehicle & Cargo Inspection',
    desc: 'Check tire pressures, brake fluids, lights, container seals, and load lashings prior to commencing any line-haul journey.',
  },
  {
    icon: ShieldCheck,
    title: 'Cargo Care & Transit Security',
    desc: 'Ensure goods remain intact, sealed, and protected from environmental damage or unauthorized transit tampering.',
  },
  {
    icon: HeartHandshake,
    title: 'Professional Consignee Etiquette',
    desc: 'Maintain polite, professional demeanor at all loading hubs, factory docks, and destination delivery warehouses.',
  },
  {
    icon: FileText,
    title: 'Prompt Digital Proof of Delivery',
    desc: 'Obtain authorized recipient signatures and timestamps on delivery documentation for immediate digital confirmation.',
  },
  {
    icon: AlertTriangle,
    title: 'Immediate Incident Reporting',
    desc: 'Promptly inform the central Pune control tower in the event of highway bottlenecks, bad weather, or mechanical anomalies.',
  },
];

const applicationSteps = [
  {
    step: '01',
    title: 'Visit Driver Registration',
    desc: 'Navigate to the online registration portal or contact our Pune onboarding desk.',
  },
  {
    step: '02',
    title: 'Submit Your Information',
    desc: 'Provide your personal details, commercial driving licence category, and verified highway experience.',
  },
  {
    step: '03',
    title: 'Company Reviews Application',
    desc: 'Our driver operations team checks application details against company safety and route prerequisites.',
  },
  {
    step: '04',
    title: 'Document & Skill Verification',
    desc: 'Commercial licence validity, Aadhaar, background check, and practical vehicle handling orientation.',
  },
  {
    step: '05',
    title: 'Onboarding & Application Decision',
    desc: 'Approved drivers receive safety kit, official briefing, and immediate trip assignments.',
  },
];

export const TruckDriversPage: React.FC = () => {
  return (
    <PageTransition>
      {/* SECTION 1: HERO */}
      <PageHero
        badge="Commercial Driver Careers"
        title="Drive Your Future Forward with Prisha Xpress"
        subtitle="Join an enterprise network of over 1,000 professional heavy commercial drivers. Enjoy respect, steady trip assignments, timely settlements, and driver safety protections."
        image="/assets/images/careers-driver.jpg"
        breadcrumbs={[{ label: 'Truck Drivers' }]}
      >
        <Button
          to="/careers?type=driver"
          variant="white"
          size="lg"
          icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
        >
          Register as Driver
        </Button>
      </PageHero>

      {/* SECTION 2: DRIVER OPPORTUNITIES */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Driver Opportunities"
            title="A Dignified, Rewarding Career on the Road"
            subtitle="At Prisha Xpress, commercial drivers are not treated as casual labor—they are valued micro-entrepreneurs essential to India's economy."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <p className="text-base text-gray-700 leading-relaxed">
                Prisha Xpress Pvt. Ltd. connects skilled heavy commercial drivers with high-priority freight operations across India. We believe that safe, satisfied drivers make the best logistics partners.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Through our standardized onboarding process, every driver is documented, verified, and equipped with safety and etiquette training. We ensure transparent trip accounting, timely settlements, and direct coordination with our Pune operations team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-px-bg border border-px-border">
                  <UserCheck className="w-5 h-5 text-px-primary mb-2" />
                  <h4 className="text-sm font-bold text-px-dark">Documented Identity</h4>
                  <p className="text-xs text-gray-500 mt-1">Legitimate commercial records and background checks.</p>
                </div>
                <div className="p-4 rounded-2xl bg-px-bg border border-px-border">
                  <Award className="w-5 h-5 text-px-primary mb-2" />
                  <h4 className="text-sm font-bold text-px-dark">Professional Training</h4>
                  <p className="text-xs text-gray-500 mt-1">Highway etiquette, fuel conservation, and safety protocols.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-px-deep">
                <img
                  src="/assets/images/company-team.jpg"
                  alt="Driver & Operations Team Coordination"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: DRIVER RESPONSIBILITIES */}
      <section className="py-20 bg-px-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Professional Standards"
            title="Core Responsibilities of a Prisha Xpress Driver"
            subtitle="Our clients trust us because our drivers adhere to high standards of road discipline, safety, and cargo care."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {driverResponsibilities.map((resp, idx) => {
              const Icon = resp.icon;
              return (
                <FadeIn key={resp.title} delay={idx * 0.1} direction="up">
                  <div className="p-7 rounded-3xl bg-white border border-px-border hover:border-px-primary/40 hover:shadow-card-hover transition-all duration-300 h-full flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="p-3 rounded-2xl bg-px-lavender text-px-primary w-fit">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-px-dark">{resp.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        {resp.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: APPLICATION PROCESS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Onboarding Journey"
            title="Our 5-Step Driver Application Process"
            subtitle="A transparent, straightforward path from application to active highway driving."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {applicationSteps.map((st, i) => (
              <FadeIn key={st.step} delay={i * 0.1} direction="up">
                <div className="p-6 rounded-3xl bg-px-bg border border-px-border h-full flex flex-col justify-between relative">
                  <div>
                    <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-px-primary to-px-violet">
                      {st.step}
                    </span>
                    <h3 className="text-sm font-bold text-px-dark mt-3">{st.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">{st.desc}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-px-border/60 flex items-center gap-1.5 text-[11px] font-bold text-px-violet">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Step {st.step}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: REGISTRATION CTA */}
      <CTASection
        badge="Join Our Network"
        title="Interested in Joining Our Driver Network?"
        subtitle="Take the next step in your driving career. Register your details today and our onboarding coordinator will guide you through document verification."
        primaryBtnText="Register as Driver"
        primaryBtnLink="/careers?type=driver"
        secondaryBtnText="Contact Onboarding Desk"
        secondaryBtnLink="/contact"
      />
    </PageTransition>
  );
};
