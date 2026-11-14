import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, ArrowRight, Gauge, Cog, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const StationHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Service Station Workshop Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/service-station.jpg"
          alt="Prisha Xpress Commercial Service Station"
          className="w-full h-full object-cover object-[65%_center] md:object-center filter brightness-100 contrast-100"
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
              { label: 'Service Station' },
            ]}
            theme="dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Industrial Typography inside Translucent Readability Panel */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-xs sm:text-sm font-bold text-white"
              >
                <Wrench className="w-4 h-4 text-purple-300" />
                <span>Heavy Commercial Vehicle Maintenance & Service Hubs</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
              >
                Supporting Transportation Through{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-amber-200">
                  Service Station Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-gray-100 leading-relaxed font-medium"
              >
                Purpose-built commercial service stations equipped with heavy multi-axle drive-through bays, maintenance tooling, and experienced diesel mechanics. Minimizing highway downtime through scheduled periodic servicing.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  to="/contact?service=service-station"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
                >
                  Book Fleet Servicing
                </Button>
                <Button
                  to="/services/auto-spares"
                  variant="glass"
                  size="lg"
                  icon={<Cog className="w-4 h-4 text-purple-300" />}
                >
                  Quality Auto Spares
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Industrial Specifications Badge (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="p-6 sm:p-7 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-emerald-400" />
                  Workshop Facilities
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Drive-Through Bays
                </span>
              </div>

              <div className="space-y-3 text-xs text-gray-200">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold">Turnaround Workflow</span>
                  <span className="font-bold text-white font-mono flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-300" /> Scheduled Express Bays
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold">Vehicle Inspection</span>
                  <span className="font-bold text-white font-mono">Multi-Point Safety Checks</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold">Parts & Lubricants</span>
                  <span className="font-bold text-emerald-400 font-mono">Commercial Grade Spares</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-px-primary/40 to-px-violet/40 border border-purple-400/30 text-xs text-purple-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Heavy multi-axle pits engineered for full trailers and commercial rigids.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
