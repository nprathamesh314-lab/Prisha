import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  MessageCircle,
} from 'lucide-react';
import { companyInfo } from '../../data/companyData';
import { prefetchRoute } from '../../utils/prefetchRoute';

// Official Social Media Channels Data
const socialLinks = [
  {
    name: 'X (Twitter)',
    url: 'https://x.com/prishaxpress',
    hoverClass: 'hover:bg-black hover:border-black hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/people/Prisha-Xpress-Pvt-Ltd/100089768081375/',
    hoverClass: 'hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/prishaxpress/',
    hoverClass:
      'hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/prisha-xpress-pvt-ltd/posts/?viewAsMember=true',
    hoverClass: 'hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

// Quick links
const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Our Network', path: '/network' },
  { label: 'Careers', path: '/careers' },
  { label: 'CSR Initiatives', path: '/csr' },
  { label: 'Contact Us', path: '/contact' },
];

// Core company services
const servicesLinks = [
  { label: 'Truck Drivers on Hire', path: '/services/truck-drivers-on-hire' },
  { label: '3PL Fleet Management', path: '/services/fleet-management' },
  { label: 'Transportation', path: '/services/transportation' },
  { label: 'Service Station', path: '/services/service-station' },
  { label: 'Auto Spares', path: '/services/auto-spares' },
];

export const Footer: React.FC = () => {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-px-deep text-white relative overflow-hidden border-t-4 border-px-primary">
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-px-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-px-violet/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Company Profile (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-block">
              <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl shadow-lg border border-white/20 inline-flex">
                <img
                  src="/prisha-logo.png"
                  alt="Prisha Xpress Pvt. Ltd."
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <p className="text-xs font-black text-px-deep tracking-wider">PRISHA XPRESS</p>
                  <p className="text-[10px] font-bold text-px-violet tracking-widest uppercase">PVT. LTD.</p>
                </div>
              </div>
            </Link>

            {/* Simplified, natural company description */}
            <p className="text-gray-100 text-[15px] sm:text-base leading-relaxed font-normal">
              Prisha Xpress Pvt. Ltd. provides transport and logistics services to businesses. We help companies move goods through reliable transportation and fleet management services.
            </p>

            {/* Clear and readable CIN display */}
            <div className="p-4 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1">
              <p className="text-xs font-bold text-purple-200 uppercase tracking-wider">
                Corporate Identification Number (CIN)
              </p>
              <p className="font-mono text-sm sm:text-[15px] font-semibold text-white tracking-wider">
                {companyInfo.cin}
              </p>
            </div>

            {/* Direct WhatsApp Action */}
            <div>
              <a
                href="https://wa.me/917276897727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold tracking-wide text-white border-b border-white/10 pb-2">
              QUICK LINKS
            </h3>
            <ul className="space-y-3 text-[15px] text-gray-200">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onMouseEnter={() => prefetchRoute(link.path)}
                    className="hover:text-white transition-colors flex items-center gap-2 group font-medium"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-purple-300 transition-transform group-hover:translate-x-1" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold tracking-wide text-white border-b border-white/10 pb-2">
              OUR SERVICES
            </h3>
            <ul className="space-y-3 text-[15px] text-gray-200">
              {servicesLinks.map((svc) => (
                <li key={svc.path}>
                  <Link
                    to={svc.path}
                    onMouseEnter={() => prefetchRoute(svc.path)}
                    className="hover:text-white transition-colors flex items-start gap-2 group font-medium"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-purple-300 mt-1 shrink-0 transition-transform group-hover:translate-x-1" />
                    <span>{svc.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us & Follow Us (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="space-y-3.5">
              <h3 className="text-lg font-bold tracking-wide text-white border-b border-white/10 pb-2">
                CONTACT US
              </h3>
              <div className="space-y-3 text-[15px] text-gray-100">
                {/* Clickable Google Maps Address */}
                <a
                  href="https://maps.google.com/?q=Kharadi,+Pune+-+411014,+Maharashtra,+India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 hover:text-white transition-colors group"
                >
                  <MapPin className="w-4 h-4 text-purple-300 shrink-0 mt-1 group-hover:text-emerald-400 transition-colors" />
                  <span className="leading-snug">
                    Kharadi, Pune – 411014, Maharashtra, India
                  </span>
                </a>

                {/* Clickable Phone Number */}
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-purple-300 shrink-0" />
                  <a
                    href="tel:+917276897727"
                    className="hover:text-white font-semibold transition-colors"
                  >
                    +91 7276897727
                  </a>
                </div>

                {/* Clickable Email */}
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-purple-300 shrink-0" />
                  <a
                    href="mailto:info@prishaxpress.com"
                    className="hover:text-white transition-colors"
                  >
                    info@prishaxpress.com
                  </a>
                </div>
              </div>
            </div>

            {/* Our Commitment Card */}
            <div className="p-3.5 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm space-y-1">
              <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider">
                <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>OUR COMMITMENT</span>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-normal">
                We focus on reliable transport services, driver support and safe movement of goods.
              </p>
            </div>

            {/* Follow Us Section with Official Brand Social Media Logos */}
            <div className="space-y-2.5 pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-200">
                FOLLOW US
              </h4>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow Prisha Xpress on ${social.name}`}
                    className={`w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white transition-all duration-300 flex items-center justify-center shadow-md hover:-translate-y-1 hover:shadow-lg ${social.hoverClass}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-purple-200 font-medium">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} PRISHA XPRESS PVT. LTD. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy-policy"
              onMouseEnter={() => prefetchRoute('/privacy-policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-purple-300/60">•</span>
            <Link
              to="/terms-and-conditions"
              onMouseEnter={() => prefetchRoute('/terms-and-conditions')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </Link>
            <span className="text-purple-300/60">•</span>
            <Link
              to="/contact"
              onMouseEnter={() => prefetchRoute('/contact')}
              className="hover:text-white transition-colors"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
