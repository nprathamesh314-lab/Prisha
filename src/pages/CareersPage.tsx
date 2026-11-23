// PRISHA XPRESS PVT. LTD. - CAREERS LANDING HUB
// ROUTE: /careers

import React from 'react';
import { Link } from 'react-router-dom';
import { PageTransition } from '../components/animations/PageTransition';
import { Button } from '../components/common/Button';
import { CareersHero } from '../components/careers/CareersHero';
import {
  Building2,
  Truck,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  FileCheck2,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const CareersPage: React.FC = () => {
  return (
    <PageTransition>
      {/* 1. Compact Premium Careers Hero Section */}
      <CareersHero />

      {/* 2. Clear Disclaimer Note */}
      <section className="bg-px-lavender/60 border-y border-purple-200/60 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start sm:items-center gap-3 text-xs sm:text-sm text-px-dark font-medium justify-center text-center sm:text-left">
            <AlertCircle className="w-5 h-5 text-px-primary shrink-0 mt-0.5 sm:mt-0" />
            <p>
              <strong className="font-bold text-px-deep">Important Notice:</strong> Submitting an application does not guarantee employment or driver approval. All applications are subject to company review and verification.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Two Completely Separate Recruitment Application Cards */}
      <section className="py-20 lg:py-28 bg-px-bg relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-px-violet">
              Choose Your Pathway
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-px-dark mt-2 tracking-tight">
              Select Your Application Stream
            </h2>
            <p className="mt-3 text-gray-700 text-sm sm:text-base font-normal">
              Our recruitment workflows and verification pathways are strictly dedicated. Please choose the module matching your professional background.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* CARD 1 – STAFF APPLICATION */}
            <div className="group bg-white rounded-3xl border border-px-border shadow-soft-purple hover:shadow-2xl hover:border-px-primary/40 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative h-64 overflow-hidden bg-px-lavender">
                <img
                  src="/assets/images/careers-staff.jpg"
                  alt="Prisha Xpress Corporate Staff & Office Administration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/90 via-px-deep/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-black text-px-primary shadow-sm">
                    <Building2 className="w-3.5 h-3.5 text-px-violet" />
                    Corporate & Office Roles
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
                    Corporate Department
                  </span>
                  <h3 className="text-2xl font-black text-white">Staff Application</h3>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    For office and non-driver employees interested in Administration, HR, Operations, Accounts, IT and other departments.
                  </p>

                  <div className="border-t border-gray-100 pt-4 space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Key Highlights:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-px-violet shrink-0" />
                        <span>Corporate HQ in Pune with competitive CTC and health coverage</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-px-violet shrink-0" />
                        <span>Openings for both Freshers and Experienced logistics professionals</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-px-violet shrink-0" />
                        <span>6-step streamlined online application wizard with resume upload</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/careers/staff" className="block">
                    <Button
                      variant="primary"
                      className="w-full py-4 text-sm sm:text-base justify-center shadow-md group-hover:shadow-lg group-hover:bg-px-violet"
                    >
                      <span>Apply for Staff Position</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <p className="text-[11px] text-gray-400 text-center mt-2.5">
                    Reference format: PX-STF-2026-XXXX
                  </p>
                </div>
              </div>
            </div>

            {/* CARD 2 – DRIVER REGISTRATION */}
            <div className="group bg-white rounded-3xl border border-px-border shadow-soft-purple hover:shadow-2xl hover:border-px-primary/40 transition-all duration-300 overflow-hidden flex flex-col">
              <div className="relative h-64 overflow-hidden bg-px-deep">
                <img
                  src="/assets/images/careers-driver.jpg"
                  alt="Prisha Xpress Commercial Truck Captain"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-px-deep/95 via-px-deep/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-px-primary text-white text-xs font-black shadow-sm">
                    <Truck className="w-3.5 h-3.5 text-px-accent" />
                    Fleet & Transport Operations
                  </span>
                </div>
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
                    Fleet & Highway Operations
                  </span>
                  <h3 className="text-2xl font-black text-white">Driver Registration</h3>
                </div>
              </div>

              <div className="p-8 sm:p-10 flex flex-col flex-grow justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    For truck and commercial vehicle drivers interested in joining the Prisha Xpress driver network.
                  </p>

                  <div className="border-t border-gray-100 pt-4 space-y-2.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Key Highlights:
                    </p>
                    <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-px-violet shrink-0" />
                        <span>Guaranteed on-time monthly settlements & trip mileage incentives</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-px-violet shrink-0" />
                        <span>Driver rest lounges at key service station hubs across Maharashtra</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-px-violet shrink-0" />
                        <span>Dedicated document verification cell (Private & secure storage)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-4">
                  <Link to="/careers/driver" className="block">
                    <Button
                      variant="primary"
                      className="w-full py-4 text-sm sm:text-base justify-center bg-px-deep hover:bg-px-primary shadow-md group-hover:shadow-lg"
                    >
                      <span>Register as Driver</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <p className="text-[11px] text-gray-400 text-center mt-2.5">
                    Reference format: PX-DRV-2026-XXXX
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Company Culture & Trust Pillars */}
      <section className="py-16 bg-white border-t border-px-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-px-bg border border-px-border">
              <div className="p-3 rounded-xl bg-purple-100 text-px-primary shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-px-dark text-base">Verified & Compliant</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Incorporated corporate enterprise (CIN: U49231PN2023PTC225810) operating under strict Indian labor and transport compliances.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-px-bg border border-px-border">
              <div className="p-3 rounded-xl bg-purple-100 text-px-primary shrink-0">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-px-dark text-base">Separate Data Architecture</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Candidate documents and information are stored in independent private storage buckets with strict Row Level Security.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-2xl bg-px-bg border border-px-border">
              <div className="p-3 rounded-xl bg-purple-100 text-px-primary shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-px-dark text-base">Transparent Career Growth</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                  Structured career paths from junior logistics coordinators to regional station heads, and from truck captains to fleet trainers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};
