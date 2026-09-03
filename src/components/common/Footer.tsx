import React from 'react';
import {
  MapPin,
  Clock,
  Mail,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Globe,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { Logo } from './Logo';
import { COMPANY_DATA, SERVICES_DATA, SERVICE_AREAS_DATA } from '../../data/companyData';

interface FooterProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenQuoteModal }) => {
  const currentYear = new Date().getFullYear();

  const handleLink = (href: string) => {
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#070F1E] text-slate-300 border-t-2 border-[#E58A1F] w-full">
      {/* Top Banner: Quick Contact & Quote Strip */}
      <div className="border-b border-[#1E3A5F]/60 bg-[#0A1628] py-8 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#E58A1F]/15 border border-[#E58A1F]/30 text-[#E58A1F]">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                Planning a Construction Project in Bhadohi or Nearby?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                Get an authentic cost estimate, 2D/3D architectural consultation, and dependable engineering supervision.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 bg-[#E58A1F] hover:bg-[#C87514] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 group shadow-sm"
            >
              <span>GET FREE ESTIMATE</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleLink('/contact')}
              className="px-5 py-2.5 bg-[#0B1B3D] hover:bg-[#132A5C] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-all border border-[#1E3A5F] cursor-pointer"
            >
              Contact Our Office
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Column 1: Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="footer" size="md" />
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Abdul Salam Construction Company is a premier residential and commercial construction firm operating in Bhadohi, Uttar Pradesh. We focus on transparent contracts, high-grade materials, and dependable on-site engineering supervision.
            </p>

            <div className="pt-2 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                <span>
                  {COMPANY_DATA.address.line1}, {COMPANY_DATA.address.line2},{' '}
                  {COMPANY_DATA.address.city} - {COMPANY_DATA.address.pincode},{' '}
                  {COMPANY_DATA.address.state}, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E58A1F] flex-shrink-0" />
                <span>{COMPANY_DATA.contact.officeHours}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E58A1F] flex-shrink-0" />
                <span>{COMPANY_DATA.contact.emailDisplay}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Construction Services */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#1E3A5F] pb-2.5 mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <a
                    href={`/services#${srv.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLink(`/services#${srv.slug}`);
                    }}
                    className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F] transition-colors" />
                    <span>{srv.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#1E3A5F] pb-2.5 mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/');
                  }}
                  className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F]" />
                  <span>Home</span>
                </a>
              </li>
              <li>
                <a
                  href="/packages"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/packages');
                  }}
                  className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F]" />
                  <span>Construction Packages</span>
                </a>
              </li>
              <li>
                <a
                  href="/projects"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/projects');
                  }}
                  className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F]" />
                  <span>Our Projects</span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/about');
                  }}
                  className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F]" />
                  <span>About Us</span>
                </a>
              </li>
              <li>
                <a
                  href="/service-areas"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/service-areas');
                  }}
                  className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F]" />
                  <span>Service Areas</span>
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/faq');
                  }}
                  className="hover:text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-[#E58A1F]" />
                  <span>Frequently Asked Questions</span>
                </a>
              </li>
              <li>
                <a
                  href="/get-a-quote"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLink('/get-a-quote');
                  }}
                  className="hover:text-[#E58A1F] font-semibold text-[#E58A1F] transition-colors flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-[#E58A1F]" />
                  <span>Get A Free Quote</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Coverage Locations */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#1E3A5F] pb-2.5 mb-4">
              Coverage Locations
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {SERVICE_AREAS_DATA.map((area) => (
                <li key={area.id} className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                  <span>{area.name}</span>
                </li>
              ))}
            </ul>
            
            <div className="mt-4 pt-3 border-t border-[#1E3A5F]">
              <a
                href="/service-areas"
                onClick={(e) => {
                  e.preventDefault();
                  handleLink('/service-areas');
                }}
                className="text-xs text-[#E58A1F] hover:underline font-semibold flex items-center gap-1"
              >
                <span>View Full Coverage Map</span>
                <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Popular Search Localities Banner */}
        <div className="mt-12 pt-8 border-t border-[#1E3A5F]/60">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Popular Construction Locations in Bhadohi & Surrounding Corridors:
          </p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-300">
            {[
              'Harirampur',
              'Aurai Road',
              'Civil Lines Bhadohi',
              'Station Road',
              'Maryadpatti',
              'Gyanpur',
              'Gopiganj GT Road',
              'Suriyawan',
              'Aurai Tehsil',
              'Khamaria',
              'Chauri Road',
              'Varanasi-Bhadohi Corridor'
            ].map((loc, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-[#0A1628] border border-[#1E3A5F] hover:border-[#E58A1F] hover:text-white transition-colors cursor-default"
              >
                {loc}
              </span>
            ))}
          </div>
        </div>

        {/* Local GEO & Business Verification Strip (Local SEO & GEO) */}
        <div className="mt-8 pt-6 border-t border-[#1E3A5F]/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Navigation className="w-3.5 h-3.5 text-[#E58A1F]" />
              <span>Geo Coordinates:</span>
              <strong className="text-white font-mono">25.3956° N, 82.5698° E</strong>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Globe className="w-3.5 h-3.5 text-[#E58A1F]" />
              <span>Region:</span>
              <strong className="text-white">Bhadohi (IN-UP, PIN 221401)</strong>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <span>GSTIN:</span>
              <strong className="text-[#E58A1F] font-mono">{COMPANY_DATA.gstin}</strong>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://maps.google.com/?q=25.3956,82.5698"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#E58A1F] transition-colors flex items-center gap-1"
            >
              <span>View Office on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#E58A1F] transition-colors flex items-center gap-1"
            >
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="text-slate-600">|</span>
            <a
              href="/llms.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-[#E58A1F] transition-colors flex items-center gap-1 font-mono text-[11px]"
              title="Machine-readable Generative Engine Optimization feed"
            >
              <span>llms.txt</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Terms */}
      <div className="bg-[#050B16] py-5 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-[#13233F] text-xs text-slate-500 w-full">
        <div className="w-full max-w-[1920px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} Abdul Salam Construction Company. All Rights Reserved. • We Build Your Vision.
          </p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLink('/about')}
              className="hover:text-slate-300 transition-colors"
            >
              Company Profile
            </button>
            <button
              onClick={() => handleLink('/contact')}
              className="hover:text-slate-300 transition-colors"
            >
              Site Consultation
            </button>
            <button
              onClick={() => handleLink('/faq')}
              className="hover:text-slate-300 transition-colors"
            >
              FAQ & Policies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
