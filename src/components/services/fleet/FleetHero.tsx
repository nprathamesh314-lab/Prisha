import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ArrowRight, ShieldCheck, Activity, Wrench } from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const FleetHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Commercial Fleet & Warehouse Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/fleet-warehouse.jpg"
          alt="Prisha Xpress Commercial Fleet Operations"
          className="w-full h-full object-cover object-[70%_center] md:object-center filter brightness-100 contrast-100"
        />
        {/* Soft Ambient Directional Support Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep/75 via-px-deep/35 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/85 via-px-deep/45 to-transparent md:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8">
        <div className="mb-6 flex justify-start">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: '3PL Fleet Management' },
            ]}
            theme="dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Tech Typography & CTAs inside Translucent Readability Panel */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold text-white"
              >
                <Cpu className="w-4 h-4 text-purple-300" />
                <span>Next-Gen Fleet Operations & 3PL Coordination</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
              >
                Smart Fleet Management{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-indigo-200">
                  Solutions for Business
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-gray-100 leading-relaxed font-medium"
              >
                Transform your commercial fleet from a cost center into a predictable, high-utilization asset. We integrate proactive preventive maintenance, verified driver staffing, and disciplined dispatch coordination.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  to="/contact?service=3pl-fleet-management"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
                >
                  Request Fleet Assessment
                </Button>
                <Button
                  to="/network"
                  variant="glass"
                  size="lg"
                  icon={<Activity className="w-4 h-4 text-purple-300" />}
                >
                  Inspect Network Corridors
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Layered Dashboard HUD Composition (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="p-6 sm:p-7 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-5"
            >
              {/* Dashboard Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-200">
                    Fleet Supervision Model
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                  Illustrative Framework
                </span>
              </div>

              {/* Operational Framework Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-gray-400 mb-1">
                    <span className="text-[11px] font-semibold text-purple-200">Maintenance</span>
                    <Wrench className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <p className="text-base font-bold text-white">Periodic Service</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">Scheduled Health Checks</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between text-gray-400 mb-1">
                    <span className="text-[11px] font-semibold text-purple-200">Driver Roster</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-purple-300" />
                  </div>
                  <p className="text-base font-bold text-white">Vetted Crews</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">Assigned Highway Pilots</p>
                </div>
              </div>

              {/* Transit Coordination Bar */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-gray-300">
                  <span>Dispatch & Route Planning</span>
                  <span className="text-emerald-400 font-bold">Standard Operating Procedure</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-r from-px-primary via-px-violet to-emerald-400 rounded-full" />
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-px-primary/30 border border-purple-400/30 text-xs text-purple-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Centralized management from Prisha Xpress Pune Hub.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
