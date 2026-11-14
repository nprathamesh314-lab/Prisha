import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, UserCheck, ArrowRight, Star } from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const DriverHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Commercial Driver & Fleet Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/careers-driver.jpg"
          alt="Professional Commercial Driver at Prisha Xpress"
          className="w-full h-full object-cover object-[75%_center] md:object-center filter brightness-100 contrast-100"
        />
        {/* Soft Ambient Directional Balance: Subtle on left for panel, clear on right to showcase driver & trucks */}
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep/75 via-px-deep/35 to-transparent hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/85 via-px-deep/45 to-transparent md:hidden" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex justify-start">
          <Breadcrumbs
            items={[
              { label: 'Services', href: '/services' },
              { label: 'Truck Drivers On Hire' },
            ]}
            theme="dark"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Human Story & Typography inside Translucent Readability Panel */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6 text-white">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-purple-200"
              >
                <Heart className="w-4 h-4 text-pink-400" />
                <span>Human-Centred Logistics • Respecting the Hands on the Wheel</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
              >
                Reliable Truck Driver{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-300">
                  Hiring Solutions
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal"
              >
                Connecting commercial fleet operators and logistics enterprises with trained, verified commercial truck drivers. Rigorous RTO licence validation, highway discipline coaching, and dedicated transit coordination for dependable operations.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-wrap items-center gap-4 pt-2"
              >
                <Button
                  to="/contact?service=truck-drivers-on-hire"
                  variant="white"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
                >
                  Hire Verified Drivers
                </Button>
                <Button
                  to="/careers?type=driver"
                  variant="glass"
                  size="lg"
                  icon={<UserCheck className="w-4 h-4 text-purple-300" />}
                >
                  Register as a Driver
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Driver Profile Showcase Card (5 cols) */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="relative p-7 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6"
            >
              {/* Circular Avatar Hero Composition */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-300 shadow-glow-purple shrink-0">
                  <img
                    src="/assets/images/careers-driver.jpg"
                    alt="Verified Commercial Driver Profile"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 right-0 p-1 bg-emerald-500 rounded-full border-2 border-white">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">
                    Vetted Commercial Crew
                  </h3>
                  <p className="text-xs text-purple-200">
                    HMV & Transport Endorsed Drivers
                  </p>
                </div>
              </div>

              {/* Verified Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-black text-white">1,000+</p>
                  <p className="text-[11px] text-purple-200">Trained Drivers</p>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-black text-white">100%</p>
                  <p className="text-[11px] text-purple-200">Insured Trips</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-px-primary/40 to-px-violet/40 border border-purple-300/30 text-xs text-purple-100 flex items-center gap-3">
                <UserCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>
                  <strong>Micro-Entrepreneur Model:</strong> Direct driver welfare, fair compensation, and zero broker exploitation.
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
