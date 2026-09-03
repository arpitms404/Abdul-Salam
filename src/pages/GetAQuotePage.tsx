import React, { useState } from 'react';
import {
  PACKAGES_DATA,
  SERVICES_DATA,
  COMPANY_DATA
} from '../data/companyData';
import { Button } from '../components/common/Button';
import { SectionHeading } from '../components/common/SectionHeading';
import {
  Calculator,
  CheckCircle2,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface GetAQuotePageProps {
  onNavigate: (href: string) => void;
  onOpenConsultationModal: () => void;
}

export const GetAQuotePage: React.FC<GetAQuotePageProps> = ({
  onNavigate,
  onOpenConsultationModal
}) => {
  const [plotArea, setPlotArea] = useState<number>(1500);
  const [floors, setFloors] = useState<number>(2);
  const [selectedService, setSelectedService] = useState('residential-construction');
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [soilType, setSoilType] = useState('Normal (Standard Load Bearing)');
  const [elevationStyle, setElevationStyle] = useState('Modern Minimalist');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Harirampur / Aurai Road');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedPkg = PACKAGES_DATA.find((p) => p.id === selectedPackage) || PACKAGES_DATA[1];
  const ratePerSqFt = selectedPkg.ratePerSqFt;
  const estimatedBuiltUp = Math.round(plotArea * floors * 0.85); // 85% FAR efficiency
  const baseCost = estimatedBuiltUp * ratePerSqFt;

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
      {/* 1. PAGE HEADER */}
      <section className="bg-[#0B1B3D] text-white py-14 sm:py-20 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Cost Calculator & BOQ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            Calculate Construction Cost for Your Plot
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed"
          >
            Estimate your residential home or commercial project budget in Bhadohi with transparent rate parameters.
          </motion.p>
        </div>
      </section>

      {/* 2. CALCULATOR & FORM GRID */}
      <section className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Calculator Controls & Live Estimate (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="lg:col-span-7 bg-white border border-gray-200 p-6 sm:p-8 space-y-8 rounded-sm shadow-sm"
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                Step 1: Configuration
              </span>
              <h2 className="font-heading font-black text-2xl text-[#0B1B3D] mt-1">
                Project Parameters
              </h2>
            </div>

            {/* Construction Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Construction Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_DATA.map((srv) => (
                  <motion.button
                    key={srv.id}
                    type="button"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedService(srv.id)}
                    className={`p-2.5 text-left border text-xs font-bold transition-all cursor-pointer rounded-sm ${
                      selectedService === srv.id
                        ? 'border-[#E58A1F] bg-[#E58A1F]/10 text-[#E58A1F] shadow-xs'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {srv.title}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Package Tier */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Specification Tier
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PACKAGES_DATA.map((pkg) => (
                  <motion.button
                    key={pkg.id}
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedPackage(pkg.id)}
                    className={`p-3 text-left border transition-all cursor-pointer rounded-sm ${
                      selectedPackage === pkg.id
                        ? 'border-[#E58A1F] bg-[#E58A1F]/10 ring-1 ring-[#E58A1F] shadow-xs'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className={`text-xs font-black ${selectedPackage === pkg.id ? 'text-[#E58A1F]' : 'text-[#0B1B3D]'}`}>
                      {pkg.name}
                    </p>
                    <p className="text-[11px] font-bold text-gray-500 mt-1">
                      ₹{pkg.ratePerSqFt}/sq.ft
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Plot Dimensions Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-700">Plot / Ground Area</span>
                <span className="font-extrabold text-[#E58A1F] text-sm">{plotArea} sq.ft</span>
              </div>
              <input
                type="range"
                min="600"
                max="5000"
                step="50"
                value={plotArea}
                onChange={(e) => setPlotArea(Number(e.target.value))}
                className="w-full accent-[#E58A1F] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400">
                <span>600 sq.ft (Single plot)</span>
                <span>2500 sq.ft (Standard duplex)</span>
                <span>5000 sq.ft (Large villa)</span>
              </div>
            </div>

            {/* Floors Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold uppercase tracking-wider text-gray-700">Number of Floors</span>
                <span className="font-extrabold text-[#E58A1F] text-sm">
                  {floors === 1 ? 'Ground Floor Only' : `Ground + ${floors - 1} Floors (${floors} Levels)`}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-full accent-[#E58A1F] cursor-pointer"
              />
            </div>

            {/* Real-time Calculation Result Box */}
            <motion.div
              layout
              className="bg-[#0B1B3D] text-white p-6 border border-[#2A2A2A] space-y-4 rounded-sm shadow-md"
            >
              <div className="flex justify-between items-start border-b border-[#2A2A2A] pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E58A1F]">
                    Estimated Built-Up Area
                  </span>
                  <p className="font-heading font-black text-2xl text-white">
                    {estimatedBuiltUp.toLocaleString()} <span className="text-xs font-normal text-gray-400">sq.ft</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Base Package Rate
                  </span>
                  <p className="font-heading font-black text-xl text-white">
                    ₹{ratePerSqFt}/sq.ft
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Calculated Budget Range:</span>
                  <p className="font-heading font-black text-2xl sm:text-3xl text-[#E58A1F]">
                    ₹{(baseCost * 0.96).toLocaleString('en-IN')} – ₹{(baseCost * 1.05).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: BOQ Request Submission Form (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="lg:col-span-5 bg-white border border-gray-200 p-6 sm:p-8 rounded-sm shadow-sm"
          >
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-green-50 border border-green-200 text-green-600 flex items-center justify-center mx-auto rounded-full">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#0B1B3D]">
                  Estimate Request Received!
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Thank you, <span className="font-bold text-[#0B1B3D]">{name}</span>. A detailed Bill of Quantities (BOQ) with material breakdown for your <span className="font-bold text-[#0B1B3D]">{estimatedBuiltUp} sq.ft</span> project will be shared to <span className="font-bold text-[#0B1B3D]">{phone}</span> via WhatsApp.
                </p>
                <div className="pt-4">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                    }}
                  >
                    Calculate Another Estimate
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E58A1F]">
                    Step 2: Get Formal BOQ
                  </span>
                  <h3 className="font-heading font-black text-xl text-[#0B1B3D] mt-1">
                    Receive Itemized Bill of Quantities
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Our site engineers will cross-check your estimate with current cement/steel rates in Bhadohi.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mohd. Aslam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-300 text-xs focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-300 text-xs focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Plot Location in Bhadohi
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Harirampur, Aurai Road, Bhadohi"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-300 text-xs focus:border-[#E58A1F] focus:outline-none rounded-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Elevation / Architectural Style Preference
                  </label>
                  <select
                    value={elevationStyle}
                    onChange={(e) => setElevationStyle(e.target.value)}
                    className="w-full px-3.5 py-2 border border-gray-300 text-xs focus:border-[#E58A1F] focus:outline-none bg-white rounded-sm"
                  >
                    <option value="Modern Minimalist">Modern Minimalist Glass & Louvers</option>
                    <option value="Classic Indian Contemporary">Classic Indian Contemporary</option>
                    <option value="Ultra-Luxury Villa Aesthetics">Ultra-Luxury Villa Aesthetics</option>
                    <option value="Commercial Showroom Facade">Commercial Showroom Facade</option>
                  </select>
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full justify-center"
                  >
                    SEND DETAILED BOQ TO MY WHATSAPP
                  </Button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};
