import React from 'react';
import { motion } from 'framer-motion';
import { Cog, ArrowRight, ShieldCheck, Box } from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const SparesHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Commercial Truck Auto Spares Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/auto-spares-hero.jpg"
          alt="Automotive Commercial Spare Parts & Logistics Hub"
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
              { label: 'Auto Spares' },
            ]}
            theme="dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Product Showcase Typography inside Translucent Readability Panel */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-purple-200"
              >
                <Box className="w-4 h-4 text-purple-300" />
                <span>Heavy Commercial Vehicle Spares & Fitment Support</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
              >
                Auto Spares and{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-amber-200">
                  Transportation Support
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal"
              >
                Protect vehicle uptime with reliable replacement components. From air brake valves, brake discs, and filtration kits to heavy suspension leaf springs and commercial lubricants, we ensure consistent availability for fleet operators.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  to="/contact?service=auto-spares"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
                >
                  Inquire for Auto Spares
                </Button>
                <Button
                  to="/services/service-station"
                  variant="glass"
                  size="lg"
                  icon={<Cog className="w-4 h-4 text-purple-300" />}
                >
                  Fitment at Service Station
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Premium Product Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="p-6 sm:p-7 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Commercial Grade Spares
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Ready Inventory
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-gray-200">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold">Braking & Air Systems</span>
                  <span className="font-bold text-white font-mono">Discs, Drums & Valves</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold">Filtration & Fluids</span>
                  <span className="font-bold text-white font-mono">Fuel, Oil & Air Filters</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                  <span className="font-semibold">Suspension & Axles</span>
                  <span className="font-bold text-emerald-400 font-mono">Leaf Springs & Bearings</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-px-primary/40 to-px-violet/40 border border-purple-400/30 text-xs text-purple-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Immediate fitment and technical consultation at Pune workshop.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
