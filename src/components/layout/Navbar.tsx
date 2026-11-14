import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
  Cpu,
  Truck,
  Wrench,
  Cog,
  Users,
} from 'lucide-react';
import { companyInfo } from '../../data/companyData';
import { Button } from '../common/Button';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'Our Network', href: '/network' },
  { label: 'Truck Drivers', href: '/drivers' },
  { label: 'Careers', href: '/careers' },
  { label: 'CSR', href: '/csr' },
  { label: 'Contact Us', href: '/contact' },
];

const serviceDropdownItems = [
  {
    title: 'Truck Drivers On Hire',
    href: '/services/truck-drivers-on-hire',
    desc: 'Vetted, trained and insured commercial drivers',
    icon: Users,
    badge: 'Popular',
  },
  {
    title: '3PL Fleet Management',
    href: '/services/3pl-fleet-management',
    desc: 'Real-time telematics and AI predictive maintenance',
    icon: Cpu,
    badge: 'Tech',
  },
  {
    title: 'Transportation',
    href: '/services/transportation',
    desc: 'Reliable pan-India long-haul and regional freight',
    icon: Truck,
  },
  {
    title: 'Service Station',
    href: '/services/service-station',
    desc: 'Specialized commercial vehicle maintenance hubs',
    icon: Wrench,
  },
  {
    title: 'Auto Spares',
    href: '/services/auto-parts',
    desc: '100% genuine certified heavy vehicle spares',
    icon: Cog,
  },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const isNavbarTransparent = isHomePage && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isNavbarTransparent
            ? 'bg-gradient-to-b from-px-deep/90 via-px-deep/40 to-transparent backdrop-blur-[2px] py-4'
            : 'bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-px-border/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="flex items-center gap-2.5 bg-white py-1.5 px-3 rounded-2xl shadow-sm border border-px-border/80 group-hover:shadow-md transition-all">
                <img
                  src="/prisha-logo.png"
                  alt="Prisha Xpress Pvt. Ltd."
                  className="h-10 w-auto object-contain"
                />
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-black tracking-wider text-px-deep leading-tight">
                    PRISHA XPRESS
                  </span>
                  <span className="text-[10px] font-bold text-px-violet uppercase tracking-widest leading-none">
                    PVT. LTD.
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1.5" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.href);

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                      onFocus={() => setServicesDropdownOpen(true)}
                    >
                      <button
                        onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                        onKeyDown={(e) => {
                          if (e.key === 'Escape') setServicesDropdownOpen(false);
                        }}
                        className={`flex items-center gap-1 px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-px-primary ${
                          isNavbarTransparent
                            ? isActive
                              ? 'text-white bg-white/20'
                              : 'text-gray-100 hover:text-white hover:bg-white/10'
                            : isActive
                            ? 'text-px-primary bg-px-lavender/60'
                            : 'text-px-dark hover:text-px-primary hover:bg-px-lavender/40'
                        }`}
                        aria-expanded={servicesDropdownOpen}
                        aria-haspopup="true"
                        aria-label="Services dropdown menu"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            servicesDropdownOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 w-80 mt-1 py-3 bg-white rounded-2xl shadow-xl border border-px-border/80 z-50 overflow-hidden"
                            role="menu"
                            aria-label="Logistics Services Submenu"
                          >
                            <div className="px-4 pb-2 mb-2 border-b border-gray-100">
                              <p className="text-xs font-bold uppercase tracking-wider text-px-violet">
                                Core Logistics Capabilities
                              </p>
                            </div>
                            <div className="space-y-1 px-2">
                              {serviceDropdownItems.map((service) => {
                                const IconComponent = service.icon;
                                return (
                                  <Link
                                    key={service.title}
                                    to={service.href}
                                    role="menuitem"
                                    onClick={() => setServicesDropdownOpen(false)}
                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-px-lavender/40 transition-colors group focus:outline-none focus-visible:bg-px-lavender/50"
                                  >
                                    <div className="p-2 rounded-lg bg-px-lavender text-px-primary group-hover:bg-px-primary group-hover:text-white transition-colors shrink-0">
                                      <IconComponent className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <p className="text-sm font-bold text-px-dark group-hover:text-px-primary truncate">
                                          {service.title}
                                        </p>
                                        {service.badge && (
                                          <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold bg-px-lavender text-px-primary">
                                            {service.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-px-muted line-clamp-1 mt-0.5">
                                        {service.desc}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                            <div className="mt-2 pt-2 px-3 border-t border-gray-100 bg-gray-50/50">
                              <Link
                                to="/services"
                                role="menuitem"
                                onClick={() => setServicesDropdownOpen(false)}
                                className="flex items-center justify-between text-xs font-bold text-px-primary hover:text-px-deep py-1"
                              >
                                <span>View all logistics services</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`relative px-2.5 xl:px-3 py-2 text-xs xl:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-px-primary ${
                      isNavbarTransparent
                        ? isActive
                          ? 'text-white bg-white/20'
                          : 'text-gray-100 hover:text-white hover:bg-white/10'
                        : isActive
                        ? 'text-px-primary bg-px-lavender/60'
                        : 'text-px-dark hover:text-px-primary hover:bg-px-lavender/40'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className={`absolute bottom-0 left-2.5 right-2.5 h-0.5 rounded-full ${
                          isNavbarTransparent ? 'bg-white' : 'bg-px-primary'
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3">
              <a
                href={`tel:${companyInfo.phone}`}
                className={`flex items-center gap-1.5 text-xs font-semibold px-2 xl:px-2.5 py-2 rounded-lg transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-px-primary ${
                  isNavbarTransparent
                    ? 'text-gray-100 hover:text-white'
                    : 'text-px-dark hover:text-px-primary'
                }`}
                aria-label={`Call Prisha Xpress at ${companyInfo.phone}`}
              >
                <Phone className="w-3.5 h-3.5 text-px-accent" />
                <span>{companyInfo.phone}</span>
              </a>

              <Button
                to={isHomePage ? '#enquiry' : '/#enquiry'}
                onClick={(e) => {
                  if (isHomePage) {
                    e.preventDefault();
                    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                variant={isNavbarTransparent ? 'white' : 'primary'}
                size="sm"
                icon={<ArrowRight className="w-4 h-4" />}
                className="whitespace-nowrap shadow-sm hover:shadow-md"
              >
                Business Enquiry
              </Button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-xl focus:outline-none ${
                  isNavbarTransparent
                    ? 'text-white hover:bg-white/10'
                    : 'text-px-dark hover:bg-px-lavender/50'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 lg:hidden flex flex-col overflow-y-auto"
            >
              <div className="p-4 flex items-center justify-between border-b border-gray-100 bg-white">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/prisha-logo.png"
                    alt="Prisha Xpress"
                    className="h-10 w-auto object-contain"
                  />
                  <div>
                    <span className="text-xs font-black text-px-deep block">PRISHA XPRESS</span>
                    <span className="text-[9px] font-bold text-px-violet tracking-widest uppercase">PVT. LTD.</span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 flex-1 space-y-1">
                {navItems.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.href);

                  if (item.hasDropdown) {
                    return (
                      <div key={item.label} className="border-b border-gray-100 pb-2">
                        <button
                          onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                          className="flex items-center justify-between w-full p-3 font-bold text-px-dark hover:text-px-primary rounded-xl"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              mobileServicesOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        {mobileServicesOpen && (
                          <div className="ml-3 pl-3 border-l-2 border-px-lavender space-y-1 mt-1">
                            {serviceDropdownItems.map((s) => (
                              <Link
                                key={s.title}
                                to={s.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 px-3 text-sm font-medium text-gray-700 hover:text-px-primary hover:bg-px-lavender/30 rounded-lg"
                              >
                                {s.title}
                              </Link>
                            ))}
                            <Link
                              to="/services"
                              onClick={() => setMobileMenuOpen(false)}
                              className="block py-2 px-3 text-xs font-bold text-px-primary"
                            >
                              View All Services →
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block p-3 font-bold rounded-xl text-base transition-colors ${
                        isActive
                          ? 'bg-px-lavender text-px-primary font-extrabold'
                          : 'text-px-dark hover:text-px-primary hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-5 border-t border-gray-100 bg-gray-50/60 space-y-3">
                <Button
                  to={isHomePage ? '#enquiry' : '/#enquiry'}
                  variant="primary"
                  className="w-full justify-center py-3 text-sm font-bold shadow-md"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isHomePage) {
                      setTimeout(() => {
                        document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
                      }, 200);
                    }
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Business Enquiry
                </Button>

                <div className="pt-2 text-center text-xs text-gray-500">
                  <p className="font-semibold text-px-dark">Prisha Xpress Pvt. Ltd.</p>
                  <p className="mt-1">CIN: {companyInfo.cin}</p>
                  <a
                    href={`tel:${companyInfo.phone}`}
                    className="mt-2 inline-flex items-center gap-1.5 text-px-primary font-bold"
                  >
                    <Phone className="w-3.5 h-3.5" /> {companyInfo.phone}
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
