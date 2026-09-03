import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Compass,
  MessageSquare,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  Route
} from 'lucide-react';
import { motion } from 'motion/react';
import { COMPANY_DATA } from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';

interface ContactPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [service, setService] = useState('Turnkey Home Construction');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleCopyCoords = () => {
    navigator.clipboard.writeText('25.3956, 82.5698');
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. HERO HEADER */}
      <section className="bg-[#0B1B3D] text-white py-16 sm:py-20 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider"
            >
              <span>Connect With Our Engineers</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight"
            >
              Contact Abdul Salam Construction Company
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans"
            >
              Have a plot to build on or an existing structure to renovate in Bhadohi? Reach out to our engineering office or schedule an on-site visit today.
            </motion.p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT DETAILS & INTERACTIVE FORM */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Office Details & Landmark (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-lg transition-all rounded-sm"
            >
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                  Registered Head Office
                </span>
                <h3 className="font-heading font-black text-xl text-[#0B1B3D] mt-1">
                  Bhadohi Main Office
                </h3>
              </div>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#E58A1F]/10 text-[#E58A1F] flex-shrink-0 mt-0.5 rounded-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0B1B3D] block font-heading font-bold text-sm">
                      Company Address:
                    </strong>
                    <p className="mt-1 leading-relaxed text-gray-600">
                      {COMPANY_DATA.address.line1},<br />
                      {COMPANY_DATA.address.line2},<br />
                      {COMPANY_DATA.address.city} - {COMPANY_DATA.address.pincode},<br />
                      {COMPANY_DATA.address.state}, India
                    </p>
                    <div className="mt-2 p-2.5 bg-gray-50 border border-gray-200 text-[11px] text-[#0B1B3D] font-medium rounded-sm flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0" />
                      <span>Landmark: {COMPANY_DATA.address.landmark}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                  <div className="p-2 bg-[#E58A1F]/10 text-[#E58A1F] flex-shrink-0 mt-0.5 rounded-sm">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0B1B3D] block font-heading font-bold text-sm">
                      Visiting & Consultation Hours:
                    </strong>
                    <p className="text-gray-600 mt-1">
                      {COMPANY_DATA.contact.officeHours}
                    </p>
                    <p className="text-gray-500 text-[11px] mt-0.5">
                      Sunday: Site Inspections & Prior Appointments Only
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-gray-100">
                  <div className="p-2 bg-[#E58A1F]/10 text-[#E58A1F] flex-shrink-0 mt-0.5 rounded-sm">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-[#0B1B3D] block font-heading font-bold text-sm">
                      Official Inquiries:
                    </strong>
                    <p className="text-gray-600 mt-0.5">
                      {COMPANY_DATA.contact.emailDisplay}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center"
                  onClick={onOpenConsultationModal}
                >
                  Schedule an Engineer Site Visit
                </Button>
              </div>
            </motion.div>

            {/* Quality Commitment Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-[#0B1B3D] text-white p-6 border border-[#2A2A2A] space-y-3 rounded-sm shadow-md"
            >
              <div className="flex items-center gap-2 text-[#E58A1F]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-heading font-black text-sm uppercase tracking-wider text-white">
                  Direct Engineer Consultation
                </span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                When you visit our Bhadohi office, you discuss your project directly with experienced civil engineers and project coordinators—not sales agents.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Interactive Inquiry Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-7 bg-white border border-gray-200 p-8 sm:p-10 shadow-sm rounded-sm"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto rounded-full">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#0B1B3D]">
                  Message Successfully Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
                  Thank you, <span className="font-bold text-[#0B1B3D]">{name}</span>. Our civil project engineer will review your site requirements and contact you at <span className="font-bold text-[#0B1B3D]">{phone}</span>.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setLocation('');
                      setMessage('');
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                    Direct Project Inquiry
                  </span>
                  <h2 className="font-heading font-black text-2xl text-[#0B1B3D] mt-1">
                    Send Us Your Project Details
                  </h2>
                  <p className="text-xs text-gray-600 mt-1">
                    Fill out the form below to receive a call back from our site engineering team.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aslam Khan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                      Plot Location in Bhadohi *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harirampur, Aurai Road"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none bg-white rounded-sm"
                  >
                    <option value="Turnkey Home Construction">Turnkey Residential Home Construction</option>
                    <option value="Commercial Complex">Commercial Complex / Retail Showroom</option>
                    <option value="Architectural Design & 3D">Architectural Design & 2D/3D Floor Plan</option>
                    <option value="RCC Civil Structure">Civil Structure & RCC Framework</option>
                    <option value="Home Renovation">Renovation & Floor Addition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Plot Size & Project Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about plot dimensions (e.g. 30x50 ft), number of floors (G+1/G+2), and when you plan to start..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-300 text-sm focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  className="w-full justify-center"
                >
                  SUBMIT INQUIRY FOR ENGINEERING REVIEW
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 3. GEOTAGGED OFFICE LOCATION & HIGHWAY NAVIGATION HUB (GEO & LOCAL SEO) */}
      <section className="py-16 bg-[#0B1B3D] text-white border-t border-[#1E3A5F]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/15 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider rounded-xs">
              <Navigation className="w-3.5 h-3.5" />
              <span>Official Geolocation & Navigation</span>
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-white">
              Bhadohi Engineering Office & Highway Transit Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Strategically positioned along the Aurai Road corridor with rapid connectivity to NH-19 (Grand Trunk Road), Bhadohi Railway Station, and Gyanpur District Collectorate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Map Container (7 cols) */}
            <div className="lg:col-span-7 bg-[#070F1E] border border-[#1E3A5F] rounded-xs overflow-hidden flex flex-col">
              <div className="bg-[#0A1628] px-4 py-3 border-b border-[#1E3A5F] flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                  <MapPin className="w-4 h-4 text-[#E58A1F]" />
                  <span>Phase-II, Rajpura Colony, Aurai Road, Bhadohi</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded-xs">
                  GPS: 25.3956° N, 82.5698° E
                </span>
              </div>

              {/* Embedded Interactive Map Frame */}
              <div className="w-full h-80 sm:h-96 relative bg-slate-900">
                <iframe
                  title="Abdul Salam Construction Company Office Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14427.659972304919!2d82.56158229828456!3d25.395604179374465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fe26500000001%3A0x0!2sBhadohi%2C%20Uttar%20Pradesh%20221401!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-90 hover:opacity-100 transition-opacity"
                />
              </div>

              <div className="p-4 bg-[#0A1628] border-t border-[#1E3A5F] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCoords}
                    className="px-3 py-1.5 bg-[#132A5C] hover:bg-[#1E3A5F] border border-[#2B4C80] text-xs font-semibold text-slate-200 rounded-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedCoords ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Coordinates Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E58A1F]" />
                        <span>Copy Coordinates (25.3956, 82.5698)</span>
                      </>
                    )}
                  </button>
                </div>

                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=25.3956,82.5698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 bg-[#E58A1F] hover:bg-[#C87514] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Live Route Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Geo Logistics & Verification Details (5 cols) */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {/* NAP Box */}
              <div className="p-6 bg-[#070F1E] border border-[#1E3A5F] rounded-xs space-y-4">
                <div className="border-b border-[#1E3A5F] pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                    Local Business Verification (NAP)
                  </span>
                  <h3 className="font-heading font-bold text-base text-white mt-0.5">
                    M/S ABDUL SALAM CONSTRUCTIONS COMPANY
                  </h3>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <dt className="text-slate-400 font-medium">District & State</dt>
                    <dd className="text-white font-semibold mt-0.5">Bhadohi (Sant Ravidas Nagar), UP</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Postal PIN Code</dt>
                    <dd className="text-white font-semibold mt-0.5">221401</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Registered GSTIN</dt>
                    <dd className="font-mono text-[#E58A1F] font-bold mt-0.5">{COMPANY_DATA.gstin}</dd>
                  </div>
                  <div>
                    <dt className="text-slate-400 font-medium">Region Code</dt>
                    <dd className="text-white font-semibold mt-0.5">IN-UP (India)</dd>
                  </div>
                </dl>
              </div>

              {/* Transit Distance Matrix */}
              <div className="p-6 bg-[#070F1E] border border-[#1E3A5F] rounded-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-200">
                  <Route className="w-4 h-4 text-[#E58A1F]" />
                  <span>Transit Distances to Surrounding Hubs</span>
                </div>

                <div className="space-y-2 text-xs divide-y divide-[#1E3A5F]/50">
                  {[
                    { hub: 'Aurai Road Highway Corridor', dist: '0.2 km', time: '1 min' },
                    { hub: 'Bhadohi Railway Station', dist: '2.8 km', time: '8 mins' },
                    { hub: 'Gyanpur District Collectorate', dist: '12.5 km', time: '18 mins' },
                    { hub: 'Gopiganj (GT Road / NH-19)', dist: '18.0 km', time: '25 mins' },
                    { hub: 'Varanasi Babatpur Airport (VNS)', dist: '48.0 km', time: '55 mins' },
                    { hub: 'Prayagraj Civil Lines Corridor', dist: '78.0 km', time: '1 hr 30 mins' }
                  ].map((item, idx) => (
                    <div key={idx} className="pt-2 flex items-center justify-between text-slate-300">
                      <span className="font-medium">{item.hub}</span>
                      <span className="text-[#E58A1F] font-mono text-[11px] font-bold">
                        {item.dist} ({item.time})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Site Consultation Banner */}
              <div className="p-4 bg-gradient-to-r from-[#0B1B3D] to-[#132A5C] border border-[#E58A1F]/40 rounded-xs flex items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-white">Need an Engineer on Your Plot?</p>
                  <p className="text-[11px] text-slate-300">We provide zero-obligation on-site plot inspections across Bhadohi district.</p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onOpenConsultationModal}
                  className="whitespace-nowrap"
                >
                  Book Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
