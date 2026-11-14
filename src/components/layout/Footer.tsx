import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Shield,
  MessageCircle,
} from 'lucide-react';
import { companyInfo, servicesData } from '../../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-px-deep text-white relative overflow-hidden border-t-4 border-px-primary">
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-px-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-px-violet/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 relative z-10">
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
            <p className="text-gray-300 text-sm leading-relaxed">
              Prisha Xpress Pvt. Ltd. is a modern technology-driven logistics and
              transportation enterprise delivering high-efficiency 3PL fleet
              management, certified driver staffing, dedicated service stations,
              and pan-India freight corridors.
            </p>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1.5 text-xs">
              <p className="text-px-lavender font-semibold">
                Corporate Identification Number (CIN):
              </p>
              <p className="font-mono text-gray-200 tracking-wider">
                {companyInfo.cin}
              </p>
            </div>
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/917276897727?text=Hello%20Prisha%20Xpress%2C%20I%20would%20like%20to%20enquire%20about%20your%20services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with us on WhatsApp</span>
            </a>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-px-lavender">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-px-accent transition-transform group-hover:translate-x-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-px-accent transition-transform group-hover:translate-x-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/network" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-px-accent transition-transform group-hover:translate-x-1" />
                  Our Network
                </Link>
              </li>
              <li>
                <Link to="/careers" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-px-accent transition-transform group-hover:translate-x-1" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/csr" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-px-accent transition-transform group-hover:translate-x-1" />
                  CSR Initiatives
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors flex items-center gap-1.5 group">
                  <ArrowRight className="w-3.5 h-3.5 text-px-accent transition-transform group-hover:translate-x-1" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-px-lavender">
              Our Services
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-300">
              {servicesData.map((svc) => (
                <li key={svc.id}>
                  <Link
                    to={svc.slug}
                    className="hover:text-white transition-colors flex items-start gap-1.5 group"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-px-accent mt-0.5 shrink-0 transition-transform group-hover:translate-x-1" />
                    <span>{svc.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Support (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-px-lavender">
              Contact & Registered Office
            </h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-px-accent shrink-0 mt-1" />
                <p className="leading-snug">
                  {companyInfo.address}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-px-accent shrink-0" />
                <a
                  href={`tel:${companyInfo.phone}`}
                  className="hover:text-white transition-colors"
                >
                  {companyInfo.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-px-accent shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {companyInfo.email}
                </a>
              </div>
            </div>

            {/* Operational Commitment Badge */}
            <div className="pt-2 space-y-3">
              <div className="p-3 rounded-xl bg-px-primary/30 border border-px-primary/40 flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-300 shrink-0" />
                <p className="text-xs text-gray-200">
                  <strong className="text-white">Trusted Logistics Partner:</strong>{' '}
                  100% verified crew & insured commercial transit.
                </p>
              </div>

              {/* Social Channels Policy Notice */}
              <p className="text-[11px] text-gray-400 leading-relaxed italic">
                *Official company social media channels are undergoing formal corporate verification and will be published upon launch.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>
            © {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-gray-200 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/terms" className="hover:text-gray-200 transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-gray-600">•</span>
            <Link to="/contact" className="hover:text-gray-200 transition-colors">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
