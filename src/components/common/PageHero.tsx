import React from 'react';
import { motion } from 'framer-motion';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface PageHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  image?: string;
  imagePosition?: string;
  breadcrumbs: BreadcrumbItem[];
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badge,
  title,
  subtitle,
  image = '/assets/images/corporate-hq.jpg',
  imagePosition = 'object-center',
  breadcrumbs,
  children,
}) => {
  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 bg-px-deep text-white overflow-hidden min-h-[460px] flex items-center justify-center">
      {/* Natural Daylight Photography Background */}
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className={`w-full h-full object-cover ${imagePosition} filter brightness-100 contrast-100`}
        />
        {/* Soft Ambient Balance Layer - Keeps photo bright and natural */}
        <div className="absolute inset-0 bg-gradient-to-r from-px-deep/60 via-transparent to-px-deep/40 hidden md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-px-deep/75 via-transparent to-px-deep/30 md:hidden" />
      </div>

      {/* Content Container inside an Executive Translucent Glass Readability Panel */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-px-deep/80 backdrop-blur-md border border-white/20 shadow-2xl text-center space-y-4"
        >
          {/* Breadcrumbs */}
          <div className="flex justify-center">
            <Breadcrumbs items={breadcrumbs} theme="dark" />
          </div>

          {/* Badge */}
          {badge && (
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-xs font-bold uppercase tracking-wider text-purple-200 border border-white/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                {badge}
              </span>
            </div>
          )}

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight max-w-3xl mx-auto text-white">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-100 max-w-2xl mx-auto leading-relaxed font-medium whitespace-pre-line">
            {subtitle}
          </p>

          {children && (
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              {children}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
