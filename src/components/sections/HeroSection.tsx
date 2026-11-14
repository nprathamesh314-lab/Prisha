import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, ShieldCheck, ChevronDown, CheckCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-px-deep pt-24 pb-16 lg:py-0">
      {/* Natural Daylight Photography Background - Unfiltered & Bright */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/hero-fleet.jpg"
          alt="Prisha Xpress Commercial Transportation Fleet"
          className="w-full h-full object-cover object-[80%_center] md:object-[70%_center] filter brightness-100 contrast-100"
        />
        {/* Subtle Ambient Support Gradient - Keeps photo bright and natural */}
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep/75 via-px-deep/35 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/85 via-px-deep/45 to-transparent md:hidden" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & CTAs inside a Translucent Readability Panel */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6 text-white">
              {/* Trust Pill */}
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-px-lavender shadow-md"
              >
                <ShieldCheck className="w-4 h-4 text-purple-300" />
                <span>Prisha Xpress Pvt. Ltd. • Corporate Logistics</span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15]"
              >
                Empowering Your Fleet,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-pink-200">
                  Elevating Your Efficiency
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-sm sm:text-base lg:text-lg text-gray-200 leading-relaxed font-normal"
              >
                A modern corporate transportation, logistics, and fleet solutions company.
                Delivering verified commercial truck driver hiring, 3PL fleet management,
                specialized truck servicing, and automotive spare parts from Pune.
              </motion.p>

              {/* Quick Value Props List */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs sm:text-sm text-gray-200 pt-1"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Professional Driver Hiring</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3PL Fleet Supervision</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Commercial Service & Spares</span>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="flex flex-wrap items-center gap-3 sm:gap-4 pt-3"
              >
                <Button
                  to="#enquiry"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary group-hover:translate-x-1 transition-transform" />}
                >
                  Business Enquiry
                </Button>

                <Button
                  to="/contact"
                  variant="glass"
                  size="lg"
                  icon={<Phone className="w-4 h-4 text-purple-300" />}
                >
                  Contact Us
                </Button>

                <Button
                  to="/services"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:text-purple-200 text-sm font-semibold"
                >
                  Explore Services →
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Operations Overview Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative rounded-3xl p-6 bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-purple-200">
                    Operations Base
                  </p>
                  <h3 className="text-xl font-bold text-white">Prisha Xpress Logistics</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-semibold text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Active
                </div>
              </div>

              {/* Verified Operational Pillars (No fake stats) */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-purple-200 font-semibold uppercase tracking-wider">Fleet Base</p>
                  <p className="text-base font-bold text-white mt-1">Pune & Talegaon</p>
                  <p className="text-[11px] text-gray-300">Central Depot</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-purple-200 font-semibold uppercase tracking-wider">Vehicle Scope</p>
                  <p className="text-base font-bold text-white mt-1">Rigids & Trailers</p>
                  <p className="text-[11px] text-gray-300">Commercial Fleet</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-purple-200 font-semibold uppercase tracking-wider">Driver Cell</p>
                  <p className="text-base font-bold text-white mt-1">RTO Verified</p>
                  <p className="text-[11px] text-gray-300">Safety Trained</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-xs text-purple-200 font-semibold uppercase tracking-wider">Corridors</p>
                  <p className="text-base font-bold text-white mt-1">Western Belts</p>
                  <p className="text-[11px] text-gray-300">Highway Transit</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-r from-px-primary/40 to-px-violet/40 border border-purple-400/30">
                <p className="text-xs font-semibold text-purple-100">
                  "Streamlining commercial highway transit with verified driver welfare and tech-enabled fleet reliability."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-1 text-white/70 hover:text-white cursor-pointer transition-colors"
        onClick={() => {
          const introElem = document.getElementById('company-intro');
          introElem?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] font-bold tracking-widest uppercase">Scroll to explore</span>
        <div className="animate-bounce">
          <ChevronDown className="w-4 h-4 text-purple-300" />
        </div>
      </div>
    </section>
  );
};
