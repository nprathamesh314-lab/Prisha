import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Users, Truck, UsersRound, Route, ShieldCheck, Sparkles } from 'lucide-react';

interface CountUpProps {
  end: number;
  duration?: number;
  trigger: boolean;
  className?: string;
}

const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2.0,
  trigger,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!trigger) return;

    if (prefersReducedMotion) {
      setDisplayValue(end.toLocaleString('en-US'));
      return;
    }

    let startTimestamp: number | null = null;
    let animationFrameId: number;
    let lastRenderedValue = -1;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = (timestamp - startTimestamp) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const currentValue = Math.round(0 + end * easedProgress);
      if (currentValue !== lastRenderedValue) {
        lastRenderedValue = currentValue;
        setDisplayValue(currentValue.toLocaleString('en-US'));
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(end.toLocaleString('en-US'));
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [trigger, end, duration, prefersReducedMotion]);

  return <span className={className}>{displayValue}</span>;
};

interface AboutStatItem {
  id: string;
  value: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isLargeNumber?: boolean;
}

const aboutStatsData: AboutStatItem[] = [
  {
    id: 'about-stat-drivers',
    value: 753,
    title: 'Drivers Network',
    description: 'Vetted HCV & LCV commercial drivers.',
    icon: Users,
  },
  {
    id: 'about-stat-fleet',
    value: 79,
    title: 'Fleet Optimization',
    description: 'Commercial logistics units across key routes.',
    icon: Truck,
  },
  {
    id: 'about-stat-staff',
    value: 187,
    title: 'Dedicated Staff',
    description: 'HQ dispatch and technical support team.',
    icon: UsersRound,
  },
  {
    id: 'about-stat-km',
    value: 7080300,
    title: 'Km Tracked',
    description: 'Cumulative commercial freight movement.',
    icon: Route,
    isLargeNumber: true,
  },
];

export const AboutStatisticsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 25,
      scale: prefersReducedMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.1,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Our Impact in Numbers"
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#1E0434] via-[#2D064E] to-[#19032B] overflow-hidden text-white"
    >
      {/* Decorative Moving Ambient Gradients & Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle radial dot mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(164,75,192,0.18)_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />

        {/* Ambient Glowing Blobs */}
        <div className="absolute -top-24 left-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-px-primary/25 blur-[100px] sm:blur-[140px] transform-gpu" />
        <div className="absolute -bottom-24 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-px-violet/20 blur-[110px] sm:blur-[150px] transform-gpu" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[250px] bg-purple-600/12 blur-[130px] transform-gpu" />

        {/* Subtle Animated Floating Dots */}
        {!prefersReducedMotion && (
          <>
            <motion.div
              animate={{
                y: [0, -18, 0],
                opacity: [0.25, 0.6, 0.25],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/4 left-[8%] w-2 h-2 rounded-full bg-purple-300/40 blur-[1px]"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1,
              }}
              className="absolute top-1/3 right-[10%] w-2.5 h-2.5 rounded-full bg-purple-400/35 blur-[1px]"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                opacity: [0.15, 0.45, 0.15],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className="absolute bottom-1/4 left-[18%] w-2 h-2 rounded-full bg-white/30 blur-[1px]"
            />
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [0.2, 0.55, 0.2],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute bottom-1/3 right-[20%] w-1.5 h-1.5 rounded-full bg-purple-300/40 blur-[1px]"
            />
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-4 text-xs font-bold text-purple-200 uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300 shrink-0" />
            <span>OUR IMPACT IN NUMBERS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight"
          >
            Our Numbers. Our Strength. Your Trust.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-sm sm:text-base lg:text-lg text-purple-200/90 font-medium leading-relaxed max-w-2xl mx-auto"
          >
            Behind every successful operation is a strong network of people, vehicles and operational excellence.
          </motion.p>
        </div>

        {/* 4 Premium Cards Grid: 2 per row on mobile, 4 in 1 row on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6 items-stretch"
        >
          {aboutStatsData.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : {
                        y: -5,
                        transition: { duration: 0.25, ease: 'easeOut' },
                      }
                }
                className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 bg-gradient-to-br from-[#2D064E] via-[#35065C] to-[#200438] border border-purple-400/25 hover:border-purple-300/50 shadow-[0_12px_36px_rgba(20,2,36,0.45)] hover:shadow-[0_16px_48px_rgba(104,19,154,0.35)] transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
              >
                {/* Subtle top ambient edge highlight */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/40 to-transparent pointer-events-none" />
                <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-px-violet/15 blur-xl group-hover:bg-px-violet/30 transition-all duration-300 pointer-events-none" />

                {/* Top Section: Icon & Value */}
                <div>
                  <div className="flex items-center justify-between mb-3 sm:mb-5">
                    <motion.div
                      variants={iconVariants}
                      className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/10 border border-white/15 text-purple-200 group-hover:text-white group-hover:bg-px-primary/60 group-hover:border-purple-300/60 transition-all duration-300 shadow-inner shrink-0"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  </div>

                  {/* Large Number with Count-Up */}
                  <div className="my-1 sm:my-2 min-w-0">
                    <div
                      className={`font-black text-white tracking-tight tabular-nums whitespace-nowrap overflow-hidden text-ellipsis ${
                        item.isLargeNumber
                          ? 'text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl'
                          : 'text-2xl xs:text-3xl sm:text-4xl lg:text-5xl'
                      }`}
                    >
                      <CountUp end={item.value} trigger={isInView} />
                    </div>
                  </div>
                </div>

                {/* Bottom Section: Title & Natural Wrapped Description */}
                <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-purple-400/20">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-[15px] text-purple-200 mt-1 sm:mt-1.5 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Verification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl bg-white/5 border border-purple-400/20 text-xs sm:text-sm text-purple-200/90 shadow-sm max-w-2xl mx-auto">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300 shrink-0" />
            <span>Official figures reflecting verified Prisha Xpress operational telemetry and network milestones.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
