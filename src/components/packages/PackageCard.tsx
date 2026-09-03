import React, { useState } from 'react';
import { ConstructionPackage } from '../../types';
import { Button } from '../common/Button';
import {
  Check,
  Building2,
  Droplets,
  Layers,
  DoorClosed,
  Paintbrush,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  FileText,
  Sparkles,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PackageCardProps {
  pkg: ConstructionPackage;
  isPopular?: boolean;
  onSelectPackage: (packageId: string) => void;
  onViewOfficialQuotation?: (packageId: string) => void;
  onBookConsultation?: () => void;
  compactMode?: boolean;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  isPopular = false,
  onSelectPackage,
  onViewOfficialQuotation,
  onBookConsultation,
  compactMode = false
}) => {
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<number>(0);

  // Category Icon helper
  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.includes('Structural') || categoryName.includes('Civil')) {
      return <Building2 className="w-3.5 h-3.5 text-[#0B1B3D]" />;
    }
    if (categoryName.includes('Flooring') || categoryName.includes('Stone') || categoryName.includes('Finishes')) {
      return <Layers className="w-3.5 h-3.5 text-[#E58A1F]" />;
    }
    if (categoryName.includes('Sanitary') || categoryName.includes('Plumbing') || categoryName.includes('Bath')) {
      return <Droplets className="w-3.5 h-3.5 text-blue-600" />;
    }
    if (categoryName.includes('Woodwork') || categoryName.includes('Doors') || categoryName.includes('Windows') || categoryName.includes('Joinery')) {
      return <DoorClosed className="w-3.5 h-3.5 text-amber-700" />;
    }
    if (categoryName.includes('Painting') || categoryName.includes('POP') || categoryName.includes('Plaster')) {
      return <Paintbrush className="w-3.5 h-3.5 text-emerald-600" />;
    }
    return <Sparkles className="w-3.5 h-3.5 text-[#E58A1F]" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`bg-white border flex flex-col justify-between relative transition-all duration-300 rounded-sm ${
        isPopular
          ? 'border-[#E58A1F] shadow-xl ring-2 ring-[#E58A1F]/30 bg-gradient-to-b from-amber-50/20 via-white to-white'
          : 'border-gray-200 hover:border-[#0B1B3D]/30 shadow-sm hover:shadow-xl'
      }`}
    >
      {/* Popular/Badge Ribbon */}
      {pkg.badge && (
        <div className="absolute -top-3.5 left-6 px-3.5 py-1 bg-[#E58A1F] text-white text-[11px] font-black uppercase tracking-wider rounded-sm shadow-md flex items-center gap-1.5 z-10">
          <Sparkles className="w-3 h-3" />
          <span>{pkg.badge}</span>
        </div>
      )}

      {/* CARD MAIN BODY */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Title & Hindi Subtitle */}
          <div className="pt-2">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#E58A1F] bg-[#E58A1F]/10 px-2 py-0.5 rounded-xs">
                {pkg.tier} SPECIFICATION TIER
              </span>
              {pkg.officialPdfRef && (
                <span className="text-[10px] font-semibold text-gray-500 flex items-center gap-1">
                  <FileText className="w-3 h-3 text-[#0B1B3D]" />
                  <span>Official Proposal</span>
                </span>
              )}
            </div>

            <h3 className="font-heading font-black text-xl sm:text-2xl text-[#0B1B3D] leading-tight mt-1">
              {pkg.name}
            </h3>

            <p className="text-xs text-gray-600 mt-2.5 leading-relaxed min-h-[38px]">
              {pkg.tagline}
            </p>
          </div>

          {/* Pricing Highlight Box */}
          <div className="my-5 p-4 bg-slate-50/90 border border-slate-200 rounded-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[#E58A1F]/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-baseline justify-between flex-wrap gap-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Turnkey All-Inclusive Rate
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200 rounded-xs">
                Verified BOQ Rates
              </span>
            </div>

            <div className="flex items-baseline gap-1.5 mt-1.5">
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#0B1B3D] tracking-tight">
                ₹{pkg.ratePerSqFt.toLocaleString('en-IN')}
              </span>
              <span className="text-xs font-bold text-gray-600">/ sq.ft</span>
              <span className="text-xs font-black text-[#E58A1F] ml-1">{pkg.gstRate}</span>
            </div>

            <p className="text-[11px] text-gray-500 mt-1.5 flex items-center gap-1">
              <Info className="w-3 h-3 text-[#E58A1F] flex-shrink-0" />
              <span>Calculated on standard built-up slab area (100% slab, 50% do chhatti, 150% stairs).</span>
            </p>
          </div>

          {/* Key Engineering Credentials / Pills */}
          {pkg.keyPills && pkg.keyPills.length > 0 && (
            <div className="mb-5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                Included Engineering Standards:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {pkg.keyPills.slice(0, 6).map((pill, pIdx) => (
                  <span
                    key={pIdx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-white border border-gray-200 hover:border-[#E58A1F] text-[11px] font-semibold text-[#0B1B3D] rounded-xs shadow-2xs transition-colors"
                  >
                    <Check className="w-3 h-3 text-[#E58A1F]" />
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights List with Professional Copywriting */}
          <div className="space-y-2 border-t border-gray-100 pt-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-[#0B1B3D] flex items-center justify-between">
              <span>Core Scope Highlights</span>
              <span className="text-[10px] font-semibold text-[#E58A1F]">10 Work Categories</span>
            </h4>

            <div className="space-y-2.5">
              {pkg.highlights.slice(0, compactMode ? 4 : 6).map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-snug">
                  <div className="w-4 h-4 rounded-full bg-[#E58A1F]/15 text-[#E58A1F] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="leading-relaxed">{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STRUCTURED TECHNICAL SPECIFICATIONS (Expandable / Drawer) */}
          {pkg.structuredFeatures && pkg.structuredFeatures.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowFullSpecs(!showFullSpecs)}
                className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-[#0B1B3D] flex items-center justify-between rounded-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#E58A1F]" />
                  <span>{showFullSpecs ? 'Hide Itemized Specs' : 'View Itemized Material & Brand Caps'}</span>
                </div>
                {showFullSpecs ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </button>

              <AnimatePresence>
                {showFullSpecs && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 space-y-4 text-xs"
                  >
                    {/* Category Tab Selector */}
                    <div className="flex gap-1 overflow-x-auto pb-1 border-b border-gray-200">
                      {pkg.structuredFeatures.map((cat, cIdx) => (
                        <button
                          key={cIdx}
                          type="button"
                          onClick={() => setActiveCategoryTab(cIdx)}
                          className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-xs whitespace-nowrap transition-all cursor-pointer ${
                            activeCategoryTab === cIdx
                              ? 'bg-[#0B1B3D] text-white shadow-xs'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {cat.category.split('&')[0]}
                        </button>
                      ))}
                    </div>

                    {/* Active Category Items */}
                    {pkg.structuredFeatures[activeCategoryTab] && (
                      <div className="bg-slate-50/70 p-3.5 border border-gray-200 space-y-2.5 rounded-xs">
                        <div className="flex items-center gap-1.5 font-heading font-bold text-xs text-[#0B1B3D] border-b border-gray-200 pb-1.5">
                          {getCategoryIcon(pkg.structuredFeatures[activeCategoryTab].category)}
                          <span>{pkg.structuredFeatures[activeCategoryTab].category}</span>
                        </div>

                        <div className="space-y-2">
                          {pkg.structuredFeatures[activeCategoryTab].items.map((item, itIdx) => (
                            <div key={itIdx} className="flex items-start justify-between gap-2 text-xs border-b border-dashed border-gray-200 pb-1.5 last:border-0 last:pb-0">
                              <span className="font-semibold text-gray-800">{item.label}:</span>
                              <div className="text-right">
                                <span className="text-gray-700 font-medium block">{item.value}</span>
                                {item.cap && (
                                  <span className="text-[10px] font-bold text-[#E58A1F] bg-[#E58A1F]/10 px-1.5 py-0.2 rounded-xs inline-block mt-0.5">
                                    {item.cap}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="pt-6 mt-6 border-t border-gray-200 space-y-2">
          <Button
            variant={isPopular ? 'primary' : 'secondary'}
            size="md"
            className="w-full justify-center shadow-xs"
            onClick={() => onSelectPackage(pkg.id)}
          >
            <span>SELECT {pkg.name.toUpperCase()}</span>
          </Button>

          {onViewOfficialQuotation && (
            <button
              type="button"
              onClick={() => onViewOfficialQuotation(pkg.id)}
              className="w-full py-2 px-3 text-xs font-bold text-[#0B1B3D] hover:text-[#E58A1F] hover:bg-slate-50 border border-gray-200 rounded-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[#E58A1F]" />
              <span>View Official BOQ & Quotation</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
