import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ShieldCheck,
  Calculator,
  Percent,
  Layers,
  Sparkles,
  Phone,
  MapPin,
  FileCheck,
  CheckSquare,
  HelpCircle,
  Clock,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';
import {
  COMPANY_DATA,
  PACKAGES_DATA,
  CIVIL_WORKS_BREAKDOWN,
  MATERIAL_BRAND_SPECS,
  MEASUREMENT_RULES,
  PAYMENT_SCHEDULE,
  QUOTATION_EXCLUSIONS,
  QUOTATION_TERMS_AND_CONDITIONS
} from '../../data/companyData';
import { ConstructionPackage } from '../../types';

interface OfficialQuotationViewerProps {
  initialPackageId?: string;
  onOpenConsultationModal?: () => void;
  onOpenQuoteModal?: () => void;
}

export const OfficialQuotationViewer: React.FC<OfficialQuotationViewerProps> = ({
  initialPackageId = 'standard',
  onOpenConsultationModal,
  onOpenQuoteModal
}) => {
  const [selectedPackageId, setSelectedPackageId] = useState<string>(initialPackageId);
  const [activeTab, setActiveTab] = useState<'particulars' | 'brands' | 'payment_rules' | 'exclusions' | 'terms'>('particulars');
  
  // Interactive Live Calculation State
  const [slabArea, setSlabArea] = useState<number>(1200);
  const [doChhattiArea, setDoChhattiArea] = useState<number>(200);
  const [stairArea, setStairArea] = useState<number>(150);
  const [floorsCount, setFloorsCount] = useState<number>(2);
  const [clientName, setClientName] = useState<string>('Valued Client');
  const [projectSite, setProjectSite] = useState<string>('Indira Mill Crossing, Chauri Road, Bhadohi');
  const [includeGst, setIncludeGst] = useState<boolean>(true);

  const selectedPackage = PACKAGES_DATA.find((p) => p.id === selectedPackageId) || PACKAGES_DATA[1];
  const rate = selectedPackage.ratePerSqFt;

  // Calculation matching the measurement formula:
  // Slab Area = 100%, Double Slab (Do Chhatti) = 50%, Stair Area = 150%
  const totalFloorSlabArea = slabArea * floorsCount;
  const effectiveDoChhatti = doChhattiArea * 0.5;
  const effectiveStair = stairArea * 1.5;
  const totalBillableSqFt = Math.round(totalFloorSlabArea + effectiveDoChhatti + effectiveStair);
  
  const isSingleFloor = floorsCount === 1;
  const singleFloorExtraFactor = isSingleFloor ? 1.25 : 1.0; // 25% surcharge for base structure if only 1 floor
  
  const baseAmount = Math.round(totalBillableSqFt * rate * singleFloorExtraFactor);
  const gstAmount = includeGst ? Math.round(baseAmount * 0.18) : 0;
  const grandTotal = baseAmount + gstAmount;

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-8">
      {/* 1. OFFICIAL QUOTATION HEADER / LETTERHEAD BAR */}
      <div className="bg-white border-2 border-[#0B1B3D] p-6 sm:p-8 rounded-sm shadow-sm relative overflow-hidden">
        {/* Watermark accent */}
        <div className="absolute right-4 bottom-2 opacity-[0.03] text-[#0B1B3D] pointer-events-none select-none font-black text-8xl font-heading hidden sm:block">
          ASC BHADOHI
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-[#0B1B3D]/20 pb-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#0B1B3D] text-white text-[10px] font-black uppercase tracking-widest">
              OFFICIAL CLIENT PROPOSAL & BOQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] font-heading tracking-tight">
              {COMPANY_DATA.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#E58A1F]">
              GSTIN: {COMPANY_DATA.gstin} • Registered Turnkey Engineering Firm
            </p>
            <p className="text-xs text-slate-600">
              <span className="font-bold">Head Office:</span> {COMPANY_DATA.address.fullAddress}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-[#0B1B3D] hover:bg-[#132A5C] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
              title="Print official quotation letterhead"
            >
              <Printer className="w-4 h-4 text-[#E58A1F]" />
              <span>Print Official Quotation</span>
            </button>
            <button
              onClick={onOpenConsultationModal}
              className="px-4 py-2.5 bg-[#E58A1F] hover:bg-[#C87514] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <span>Confirm with Engineer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs text-slate-700 bg-slate-50/80 p-3 border border-slate-200 mt-4 rounded-xs">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#E58A1F] flex-shrink-0" />
            <span><strong className="text-[#0B1B3D]">Office Phones:</strong> {COMPANY_DATA.contact.phoneDisplay}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#E58A1F] flex-shrink-0" />
            <span><strong className="text-[#0B1B3D]">Site Hotline:</strong> +91 93052 15202</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#E58A1F] flex-shrink-0" />
            <span><strong className="text-[#0B1B3D]">Coverage:</strong> Bhadohi, Aurai, Gyanpur, Gopiganj</span>
          </div>
        </div>
      </div>

      {/* 2. TIER SELECTOR TABS */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black uppercase tracking-wider text-[#0B1B3D]">
            Select Quotation Rate Tier:
          </label>
          <span className="text-xs font-medium text-slate-500">
            Rates are strictly per SQFT built-up area (+ 18% GST)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PACKAGES_DATA.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;
            return (
              <motion.button
                key={pkg.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`p-4 text-left border transition-all cursor-pointer rounded-xs relative ${
                  isSelected
                    ? 'border-[#E58A1F] bg-[#E58A1F]/5 shadow-md ring-2 ring-[#E58A1F]/50'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {pkg.badge && (
                  <span className={`inline-block text-[9px] font-black uppercase px-2 py-0.5 mb-2 rounded-xs ${
                    isSelected ? 'bg-[#E58A1F] text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {pkg.badge}
                  </span>
                )}
                <div className="flex items-baseline justify-between gap-1">
                  <h4 className="font-heading font-black text-sm text-[#0B1B3D]">
                    {pkg.name}
                  </h4>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-[#0B1B3D] font-heading">
                    ₹{pkg.ratePerSqFt.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">/ sq.ft</span>
                  <span className="text-[10px] font-bold text-[#E58A1F] ml-1">+ 18% GST</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                  {pkg.tagline}
                </p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 3. INTERACTIVE LIVE ESTIMATOR & MEASUREMENT FORMULA COMPUTATION */}
      <div className="bg-[#0B1B3D] text-white p-6 sm:p-8 rounded-sm shadow-md border-2 border-[#1E3A5F]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#1E3A5F] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E58A1F] uppercase tracking-wider mb-1">
              <Calculator className="w-4 h-4" />
              <span>Official Measurement & Cost Computation Engine</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-heading">
              Live Quotation Estimator for Your Plot
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Based on official formula: <strong className="text-white">Slab Area (100%)</strong> + <strong className="text-white">Do Chhatti (50%)</strong> + <strong className="text-white">Stair Area (150%)</strong>
            </p>
          </div>

          <div className="bg-[#070F1E] border border-[#1E3A5F] p-4 rounded-xs text-right min-w-[280px]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Estimated Total ({selectedPackage.name})
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#E58A1F] font-heading my-0.5">
              ₹{grandTotal.toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-400">
              {totalBillableSqFt.toLocaleString('en-IN')} Billable Sq.Ft {includeGst ? '• Incl. 18% GST' : '• Excl. GST'}
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-6">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Single Floor Slab Area (Sq.Ft) [100%]
            </label>
            <input
              type="number"
              value={slabArea}
              onChange={(e) => setSlabArea(Math.max(100, Number(e.target.value) || 0))}
              className="w-full bg-[#070F1E] border border-[#1E3A5F] text-white px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-[#E58A1F]"
              placeholder="e.g. 1200"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Clear horizontal outer slab projection
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Number of Floors (Storeys)
            </label>
            <select
              value={floorsCount}
              onChange={(e) => setFloorsCount(Number(e.target.value))}
              className="w-full bg-[#070F1E] border border-[#1E3A5F] text-white px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-[#E58A1F]"
            >
              <option value={1}>1 Floor (Note: +25% Base Structure Surcharge)</option>
              <option value={2}>2 Floors (Ground + 1st Floor)</option>
              <option value={3}>3 Floors (Ground + 1st + 2nd Floor / B+G+2)</option>
              <option value={4}>4 Floors (Basement + G + 2 + Terrace)</option>
            </select>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Total Slab: {(slabArea * floorsCount).toLocaleString('en-IN')} sq.ft
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Do Chhatti / Loft Slab (Sq.Ft) [50%]
            </label>
            <input
              type="number"
              value={doChhattiArea}
              onChange={(e) => setDoChhattiArea(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-[#070F1E] border border-[#1E3A5F] text-white px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-[#E58A1F]"
              placeholder="e.g. 200"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Billable at 50%: {effectiveDoChhatti} sq.ft
            </span>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Staircase Projection (Sq.Ft) [150%]
            </label>
            <input
              type="number"
              value={stairArea}
              onChange={(e) => setStairArea(Math.max(0, Number(e.target.value) || 0))}
              className="w-full bg-[#070F1E] border border-[#1E3A5F] text-white px-3 py-2 text-sm rounded-xs focus:outline-none focus:border-[#E58A1F]"
              placeholder="e.g. 150"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Billable at 150%: {effectiveStair} sq.ft
            </span>
          </div>
        </div>

        {/* Breakdown Badges */}
        <div className="mt-6 pt-5 border-t border-[#1E3A5F]/70 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <span>
              <strong>Base Cost:</strong> ₹{baseAmount.toLocaleString('en-IN')}
            </span>
            <span>•</span>
            <span>
              <strong>GST (18%):</strong> ₹{gstAmount.toLocaleString('en-IN')}
            </span>
            {isSingleFloor && (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[10px] rounded-xs">
                +25% Single Floor Base Structure Applied
              </span>
            )}
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none text-slate-200">
            <input
              type="checkbox"
              checked={includeGst}
              onChange={(e) => setIncludeGst(e.target.checked)}
              className="w-4 h-4 accent-[#E58A1F]"
            />
            <span>Include 18% GST in Calculation</span>
          </label>
        </div>
      </div>

      {/* 4. DOCUMENT SECTIONS TAB NAVIGATION */}
      <div className="bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm">
        <div className="flex items-center border-b border-slate-200 bg-slate-50 overflow-x-auto">
          {[
            { key: 'particulars', label: '1. Civil Works Breakdown (10 Categories)', icon: Layers },
            { key: 'brands', label: '2. Approved Material Brands', icon: ShieldCheck },
            { key: 'payment_rules', label: '3. Measurement & 7-Stage Payments', icon: Percent },
            { key: 'exclusions', label: '4. 17 Itemized Exclusions', icon: AlertTriangle },
            { key: 'terms', label: '5. Terms & Conditions', icon: FileCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer border-r border-slate-200 ${
                  isActive
                    ? 'bg-white text-[#0B1B3D] border-b-2 border-b-[#E58A1F] shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3D] hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#E58A1F]' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: 10 CIVIL WORK CATEGORIES */}
          {activeTab === 'particulars' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <h3 className="font-heading font-black text-xl text-[#0B1B3D]">
                    Detailed Technical Specifications & Work Scope
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    10-part civil and finishing breakdown conforming strictly to M/S Abdul Salam Constructions Company standards.
                  </p>
                </div>
                <span className="px-3 py-1 bg-[#E58A1F]/10 text-[#E58A1F] font-bold text-xs uppercase border border-[#E58A1F]/30 rounded-xs">
                  Active Tier: {selectedPackage.name} (₹{selectedPackage.ratePerSqFt}/sqft)
                </span>
              </div>

              <div className="space-y-6">
                {CIVIL_WORKS_BREAKDOWN.map((category) => (
                  <div key={category.id} className="border border-slate-200 rounded-xs overflow-hidden">
                    <div className="bg-[#0B1B3D] text-white px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-[#E58A1F] text-white font-black text-xs flex items-center justify-center rounded-xs">
                          {category.id}
                        </span>
                        <h4 className="font-heading font-bold text-sm tracking-wide">
                          {category.name}
                        </h4>
                      </div>
                      {category.rate && (
                        <span className="text-xs font-bold text-[#E58A1F] bg-white/10 px-2.5 py-0.5 rounded-xs">
                          {category.rate}
                        </span>
                      )}
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                            <th className="p-3 border-r border-slate-200 w-1/4">Particulars / Scope</th>
                            <th className="p-3 border-r border-slate-200 w-1/4">Engineered Specification / Mix Ratio</th>
                            <th className="p-3 border-r border-slate-200 w-1/6">Allowed Rate Cap</th>
                            <th className="p-3">Remarks & Authorized Brands</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {category.particulars.map((item, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-3 font-semibold text-[#0B1B3D] border-r border-slate-200">
                                {item.item}
                              </td>
                              <td className="p-3 font-mono font-medium text-slate-800 border-r border-slate-200 bg-slate-50/50">
                                {item.specifications}
                              </td>
                              <td className="p-3 font-bold text-[#E58A1F] border-r border-slate-200">
                                {item.rate || 'Included in Base Rate'}
                              </td>
                              <td className="p-3 text-slate-600">
                                {item.remarks}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: APPROVED MATERIAL BRANDS */}
          {activeTab === 'brands' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-heading font-black text-xl text-[#0B1B3D]">
                  Authorized Material Brand Specifications
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  We use strictly genuine, factory-tested construction inputs with direct manufacturer supply (No substandard counterfeits).
                </p>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0B1B3D] text-white font-bold">
                      <th className="p-3 w-12 text-center border-r border-[#1E3A5F]">S.No</th>
                      <th className="p-3 w-1/4 border-r border-[#1E3A5F]">Work Category</th>
                      <th className="p-3 w-1/4 border-r border-[#1E3A5F]">Item & Grade</th>
                      <th className="p-3 w-1/4 border-r border-[#1E3A5F]">Authorized Brand / Source</th>
                      <th className="p-3">Quality Assurance Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {MATERIAL_BRAND_SPECS.map((spec) => (
                      <React.Fragment key={spec.serialNo}>
                        {spec.items.map((item, idx) => (
                          <tr key={idx} className="hover:bg-slate-50">
                            {idx === 0 && (
                              <td
                                rowSpan={spec.items.length}
                                className="p-3 text-center font-bold text-[#0B1B3D] bg-slate-100/70 border-r border-slate-200 align-top"
                              >
                                {spec.serialNo}
                              </td>
                            )}
                            {idx === 0 && (
                              <td
                                rowSpan={spec.items.length}
                                className="p-3 font-bold text-[#0B1B3D] bg-slate-50/50 border-r border-slate-200 align-top"
                              >
                                {spec.category}
                              </td>
                            )}
                            <td className="p-3 font-semibold text-slate-800 border-r border-slate-200">
                              <div>{item.item}</div>
                              <div className="text-[11px] text-slate-500 font-normal">{item.specification}</div>
                            </td>
                            <td className="p-3 font-bold text-[#0B1B3D] border-r border-slate-200 bg-amber-50/30">
                              {item.brand}
                            </td>
                            <td className="p-3 text-slate-600">
                              {item.remarks || 'Standard BIS / ISI Quality'}
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MEASUREMENT & 7-STAGE PAYMENT MILESTONES */}
          {activeTab === 'payment_rules' && (
            <div className="space-y-8">
              {/* Measurement Rules */}
              <div className="space-y-4">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                    Measurement Rules for Built-Up Area
                  </h3>
                  <p className="text-xs text-slate-600">
                    All calculations adhere strictly to the standardized civil measurement formula.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {MEASUREMENT_RULES.map((rule, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 border border-slate-200 rounded-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#0B1B3D] uppercase">
                          {rule.item}
                        </span>
                        <span className="px-2.5 py-0.5 bg-[#0B1B3D] text-[#E58A1F] font-black text-xs rounded-xs">
                          {rule.percentage}%
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7-Stage Payment Schedule */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="border-b border-slate-200 pb-3">
                  <h3 className="font-heading font-black text-lg text-[#0B1B3D]">
                    7-Stage Milestone Payment Schedule
                  </h3>
                  <p className="text-xs text-slate-600">
                    Milestone-linked payouts ensure zero risk and complete transparency for the property owner.
                  </p>
                </div>

                <div className="overflow-x-auto border border-slate-200 rounded-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#0B1B3D] text-white font-bold">
                        <th className="p-3 w-24 border-r border-[#1E3A5F]">Milestone</th>
                        <th className="p-3 w-1/4 border-r border-[#1E3A5F]">Stage Name</th>
                        <th className="p-3 w-24 text-center border-r border-[#1E3A5F]">Percentage</th>
                        <th className="p-3 w-32 border-r border-[#1E3A5F]">Calculated Amount</th>
                        <th className="p-3">Work Deliverable & Conditions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {PAYMENT_SCHEDULE.map((stage, idx) => {
                        const stageAmount = Math.round((grandTotal * stage.percentage) / 100);
                        return (
                          <tr key={idx} className="hover:bg-slate-50">
                            <td className="p-3 font-bold text-[#0B1B3D] bg-slate-100/60 border-r border-slate-200">
                              {stage.step}
                            </td>
                            <td className="p-3 font-bold text-slate-800 border-r border-slate-200">
                              {stage.stageName}
                            </td>
                            <td className="p-3 font-black text-center text-[#E58A1F] border-r border-slate-200 font-heading text-sm">
                              {stage.percentage}%
                            </td>
                            <td className="p-3 font-bold text-[#0B1B3D] border-r border-slate-200 bg-slate-50/80">
                              ₹{stageAmount.toLocaleString('en-IN')}
                            </td>
                            <td className="p-3 text-slate-600">
                              <div>{stage.description}</div>
                              {stage.note && (
                                <div className="text-[11px] font-bold text-amber-700 mt-1 bg-amber-50 p-1.5 border border-amber-200">
                                  {stage.note}
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: 17 ITEMIZE EXCLUSIONS */}
          {activeTab === 'exclusions' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold uppercase rounded-xs mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Clear Scope Boundaries</span>
                </div>
                <h3 className="font-heading font-black text-xl text-[#0B1B3D]">
                  Itemized Scope Exclusions
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  To maintain total pricing transparency, the following 17 items are excluded from the standard turnkey rate and may be quoted as separate custom works upon request:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {QUOTATION_EXCLUSIONS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-slate-50 border border-slate-200 rounded-xs flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
                  >
                    <span className="w-6 h-6 bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center flex-shrink-0 rounded-xs mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: TERMS & CONDITIONS */}
          {activeTab === 'terms' && (
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-4">
                <h3 className="font-heading font-black text-xl text-[#0B1B3D]">
                  Terms & Conditions
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  Official contract clauses governing site execution, owner responsibilities, and timeline validity:
                </p>
              </div>

              <div className="space-y-4">
                {QUOTATION_TERMS_AND_CONDITIONS.map((clause) => (
                  <div
                    key={clause.pointNumber}
                    className="p-4 bg-slate-50 border border-slate-200 rounded-xs space-y-2"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-[#0B1B3D] text-[#E58A1F] text-xs font-black flex items-center justify-center rounded-xs flex-shrink-0 mt-0.5">
                        {clause.pointNumber}
                      </span>
                      <p className="text-xs text-slate-800 leading-relaxed font-medium">
                        {clause.english}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Digital Sign-off Representation */}
              <div className="pt-6 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border border-dashed border-slate-300 p-6 text-center space-y-3 bg-slate-50/50">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                    Property Owner / Client Acceptance
                  </span>
                  <div className="h-12 flex items-end justify-center">
                    <span className="text-xs text-slate-400">Signature / Seal: ______________________</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    Name: {clientName} • Site: {projectSite}
                  </p>
                </div>

                <div className="border border-dashed border-[#0B1B3D]/40 p-6 text-center space-y-3 bg-slate-50/50">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B1B3D] block">
                    For {COMPANY_DATA.name}
                  </span>
                  <div className="h-12 flex items-end justify-center">
                    <span className="text-xs font-bold text-[#0B1B3D]">Authorized Engineering Signatory</span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    GSTIN: {COMPANY_DATA.gstin} • Ph: {COMPANY_DATA.contact.phoneDisplay}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
