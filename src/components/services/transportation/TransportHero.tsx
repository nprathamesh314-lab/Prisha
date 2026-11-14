import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { Button } from '../../common/Button';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const TransportHero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-px-deep text-white">
      {/* Background Natural Daylight Highway Freight Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/network-map.jpg"
          alt="Prisha Xpress Commercial Transportation on Highway"
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
              { label: 'Transportation' },
            ]}
            theme="dark"
          />
        </div>

        <div className="max-w-3xl">
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/15 shadow-2xl space-y-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-purple-200"
            >
              <Compass className="w-4 h-4 text-purple-300" />
              <span>Pan-India Freight Movement • Precision Corridors</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15]"
            >
              Moving Your Business Forward with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-300 to-pink-100">
                Transportation
              </span>{' '}
              Solutions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal"
            >
              Synchronized road freight connecting western industrial belts to north, south, and eastern trade corridors. Engineered for enterprises demanding committed transit timelines, cargo protection, and professional highway execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                to="/contact?service=transportation"
                variant="white"
                size="lg"
                icon={<ArrowRight className="w-5 h-5 text-px-primary" />}
              >
                Book Freight Movement
              </Button>
              <Button
                to="/network"
                variant="glass"
                size="lg"
                icon={<MapPin className="w-4 h-4 text-purple-300" />}
              >
                Explore Highway Routes
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
