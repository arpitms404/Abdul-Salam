import React, { useState } from 'react';
import {
  PACKAGES_DATA,
  PACKAGE_COMPARISON_SECTIONS
} from '../data/companyData';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { OfficialQuotationViewer } from '../components/quotation/OfficialQuotationViewer';
import { PackageCard } from '../components/packages/PackageCard';
import {
  Check,
  Info,
  ShieldCheck,
  FileText,
  Sparkles,
  Building2,
  Phone,
  Layers,
  FileCheck,
  Scale,
  IndianRupee
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PackagesPageProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: (packageId?: string) => void;
  onOpenConsultationModal: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeTab, setActiveTab] = useState<'packages' | 'quotation' | 'comparison' | 'models'>('packages');
  const [selectedQuotationPackageId, setSelectedQuotationPackageId] = useState<string>('standard');
  const [packageFilter, setPackageFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const handleViewOfficialQuotation = (pkgId: string) => {
    setSelectedQuotationPackageId(pkgId);
    setActiveTab('quotation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredPackages = PACKAGES_DATA.filter((pkg) => {
    if (packageFilter === 'all') return true;
    if (packageFilter === 'commercial') return pkg.id === 'essential' || pkg.id === 'custom';
    if (packageFilter === 'residential') return pkg.id === 'standard' || pkg.id === 'premium' || pkg.id === 'custom';
    return true;
  });

  return (
    <div className="w-full bg-[#F8FAFC]">
      {/* 1. PAGE HEADER */}
      <section className="bg-[#0B1B3D] text-white py-12 sm:py-16 border-b border-[#2A2A2A]">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-[#E58A1F]/10 border border-[#E58A1F]/30 text-[#E58A1F] text-xs font-bold uppercase tracking-wider"
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Turnkey Engineering Rates & Client BOQ</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight"
          >
            Transparent Construction Packages
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 max-w-3xl leading-relaxed"
          >
            Structured turnkey construction rates crafted with verified concrete mix ratios (3:2:1), genuine Fe 550D TMT steel rebars, authorized brand fixtures, and transparent milestone billing across Bhadohi and Varanasi.
          </motion.p>
        </div>
      </section>

      {/* 2. TAB SWITCHER */}
      <section className="border-b border-gray-200 bg-white sticky top-16 z-30 shadow-xs">
        <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center justify-between gap-4 py-3 overflow-x-auto">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { key: 'packages', label: 'Package Tiers (₹1,500 – ₹2,650)', icon: Building2 },
              { key: 'quotation', label: 'Official Client Quotation & BOQ', icon: FileCheck, isHighlight: true },
              { key: 'comparison', label: 'Brand & Technical Matrix', icon: Layers },
              { key: 'models', label: 'Contract Models (Cost-Plus vs Lump-Sum)', icon: Scale }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <motion.button
                  key={tab.key}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-xs whitespace-nowrap flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#0B1B3D] text-white shadow-md ring-2 ring-[#E58A1F]'
                      : tab.isHighlight
                      ? 'bg-[#E58A1F]/10 text-[#0B1B3D] border border-[#E58A1F] hover:bg-[#E58A1F]/20'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#E58A1F]' : tab.isHighlight ? 'text-[#E58A1F]' : 'text-gray-500'}`} />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <span className="text-xs text-gray-500 font-semibold">Need custom estimate?</span>
            <button
              onClick={onOpenConsultationModal}
              className="text-xs font-black text-[#E58A1F] hover:text-[#0B1B3D] underline cursor-pointer uppercase tracking-wider"
            >
              Talk to Lead Engineer
            </button>
          </div>
        </div>
      </section>

      {/* 3. TAB VIEWS */}
      <AnimatePresence mode="wait">
        {/* TAB A: PACKAGE CARDS (MAIN VIEW) */}
        {activeTab === 'packages' && (
          <motion.section
            key="packages"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-12 sm:py-16 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-10"
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
              <SectionHeading
                badge="Standardized Engineering Tiers"
                title="Transparent Construction Packages"
                highlightWords={['Construction', 'Packages']}
                description="Engineered turn-key packages covering civil masonry, RCC casting, plumbing, electricals, flooring, woodwork, and premium painting with zero hidden extras."
              />

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1.5 rounded-sm border border-gray-200 self-start md:self-auto flex-wrap">
                {[
                  { key: 'all', label: 'All Packages (4)' },
                  { key: 'residential', label: 'Residential Turnkey' },
                  { key: 'commercial', label: 'Commercial & Hall' }
                ].map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setPackageFilter(f.key as any)}
                    className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer rounded-xs ${
                      packageFilter === f.key
                        ? 'bg-[#0B1B3D] text-white shadow-xs'
                        : 'text-gray-600 hover:text-[#0B1B3D] hover:bg-gray-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* UPGRADED 4-TIER PACKAGE CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isPopular={pkg.id === 'standard'}
                  onSelectPackage={(id) => onOpenQuoteModal(id)}
                  onViewOfficialQuotation={handleViewOfficialQuotation}
                  onBookConsultation={onOpenConsultationModal}
                />
              ))}
            </div>

            {/* Quick Summary Note & Trust Guarantee */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="p-4 bg-white border border-gray-200 rounded-xs flex items-start gap-3 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider">
                    Authentic Industrial Brands
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    UltraTech Weather Plus / ACC Gold ('Not for Sale' industrial grade), Tata / Jindal 550D TMT, Jaquar, Kajaria, and Astral fittings only.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-xs flex items-start gap-3 shadow-2xs">
                <Building2 className="w-5 h-5 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider">
                    Standardized Measurement Rules
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Clear calculation formula: Slab Area at 100%, Double Slab (Do Chhatti) at 50%, and Staircase Steps at 150%.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-white border border-gray-200 rounded-xs flex items-start gap-3 shadow-2xs">
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1B3D] uppercase tracking-wider">
                    7-Stage Milestone Protection
                  </h4>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Pay strictly per stage: 20% Booking, 10% Plinth, 15% Columns, 10% Walls, 20% Slab Casting, 5% Plaster, and 20% Handover.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs Bar */}
            <div className="p-6 bg-[#0B1B3D] text-white rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="font-heading font-black text-xl text-white">
                  Want an Itemized Bill of Quantities (BOQ) for Your Site?
                </h3>
                <p className="text-xs text-gray-300">
                  We generate exact structural estimates based on your plot dimensions and soil condition in Bhadohi.
                </p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <Button
                  variant="primary"
                  size="md"
                  showArrow
                  onClick={() => onOpenQuoteModal('standard')}
                >
                  CALCULATE YOUR ESTIMATE
                </Button>

                <Button
                  variant="white"
                  size="md"
                  onClick={() => setActiveTab('quotation')}
                >
                  VIEW OFFICIAL QUOTATION
                </Button>
              </div>
            </div>
          </motion.section>
        )}

        {/* TAB B: OFFICIAL QUOTATION & BOQ DOCUMENT */}
        {activeTab === 'quotation' && (
          <motion.section
            key="quotation"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-10 sm:py-16 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
          >
            <OfficialQuotationViewer
              initialPackageId={selectedQuotationPackageId}
              onOpenConsultationModal={onOpenConsultationModal}
              onOpenQuoteModal={onOpenQuoteModal}
            />
          </motion.section>
        )}

        {/* TAB C: COMPREHENSIVE COMPARISON MATRIX TABLE */}
        {activeTab === 'comparison' && (
          <motion.section
            key="comparison"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-8"
          >
            <SectionHeading
              badge="Detailed Matrix"
              title="Side-by-Side Specification Comparison"
              highlightWords={['Specification', 'Comparison']}
              description="Examine exactly what materials, mix ratios, and brand caps are included across our packages to make an informed decision."
            />

            <div className="bg-white border border-gray-200 overflow-x-auto shadow-sm rounded-sm">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#0B1B3D] text-white text-xs uppercase tracking-wider">
                    <th className="p-4 font-heading font-black">Feature / Material Component</th>
                    <th className="p-4 font-heading font-black">Open Hall (₹1,500)</th>
                    <th className="p-4 font-heading font-black bg-[#E58A1F] text-white">Standard (₹1,850)</th>
                    <th className="p-4 font-heading font-black">Premium + POP (₹2,250)</th>
                    <th className="p-4 font-heading font-black">Custom Villa (₹2,650+)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs">
                  {PACKAGE_COMPARISON_SECTIONS.map((section, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <tr className="bg-gray-100 font-heading font-bold text-[#0B1B3D]">
                        <td colSpan={5} className="p-3 uppercase tracking-wider bg-slate-100">
                          {section.category}
                        </td>
                      </tr>
                      {section.features.map((feat, rIdx) => (
                        <tr key={rIdx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-bold text-gray-800">{feat.featureName}</td>
                          <td className="p-3.5 text-gray-600">{String(feat.essential)}</td>
                          <td className="p-3.5 bg-orange-50/50 font-semibold text-[#0B1B3D] border-x border-orange-100">
                            {String(feat.standard)}
                          </td>
                          <td className="p-3.5 text-gray-600">{String(feat.premium)}</td>
                          <td className="p-3.5 text-gray-600">{String(feat.custom)}</td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center pt-4">
              <Button
                variant="primary"
                size="lg"
                showArrow
                onClick={() => onOpenQuoteModal('standard')}
              >
                REQUEST CUSTOM ESTIMATE BASED ON MATRIX
              </Button>
            </div>
          </motion.section>
        )}

        {/* TAB D: CONTRACT MODELS */}
        {activeTab === 'models' && (
          <motion.section
            key="models"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="py-16 sm:py-20 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 space-y-12"
          >
            <SectionHeading
              badge="Execution Frameworks"
              title="Flexible Construction Contracting Models"
              highlightWords={['Contracting', 'Models']}
              description="Choose the contract structure that gives you maximum confidence, control, and financial clarity."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cost-Plus Model */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-2 border-gray-200 hover:border-[#E58A1F] p-6 sm:p-8 space-y-5 transition-all shadow-sm hover:shadow-xl rounded-sm"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 text-xs font-black uppercase tracking-wider rounded-sm">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Model A: Cost-Plus Management</span>
                </div>

                <h3 className="font-heading font-black text-2xl text-[#0B1B3D]">
                  Transparent Cost-Plus Contract
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  You pay the actual factory/dealer invoice cost for all cement, steel, bricks, sand, and fixtures, plus a fixed pre-agreed contractor management fee (typically 12%–15%) for site supervision and engineering oversight.
                </p>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-[#0B1B3D]">Key Benefits:</h4>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>100% Bill Verification:</strong> Inspect original vendor GST vouchers and weigh-bridge slips.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Flexible Customization:</strong> Change brand specifications anytime during construction without contract penalty.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Direct Savings:</strong> Any bulk purchasing discount from distributors is passed directly to you.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Button
                    variant="primary"
                    size="md"
                    onClick={onOpenConsultationModal}
                  >
                    Discuss Cost-Plus Model
                  </Button>
                </div>
              </motion.div>

              {/* Lump-Sum Turnkey Model */}
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="bg-white border-2 border-gray-200 hover:border-[#E58A1F] p-6 sm:p-8 space-y-5 transition-all shadow-sm hover:shadow-xl rounded-sm"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-[#E58A1F] border border-orange-200 text-xs font-black uppercase tracking-wider rounded-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Model B: Turnkey Lump-Sum</span>
                </div>

                <h3 className="font-heading font-black text-2xl text-[#0B1B3D]">
                  Fixed-Price Turnkey Contract
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  A single fixed price per square foot agreed upon in advance based on detailed architectural blueprints, BOQ specifications, and milestone completion stages.
                </p>

                <div className="space-y-2 border-t border-gray-100 pt-4 text-xs">
                  <h4 className="font-bold uppercase tracking-wider text-[#0B1B3D]">Key Benefits:</h4>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span><strong>Budget Certainty:</strong> Protect yourself against market fluctuations in steel and cement prices.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span><strong>Clear Milestone Payments:</strong> Pay only when each stage (Plinth, Slab, Masonry, Plaster) is certified.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Management Burden:</strong> We handle all supplier logistics, deliveries, and day-to-day site operations.</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => onOpenQuoteModal('standard')}
                  >
                    Discuss Turnkey Model
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};


