import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  MapPin,
  Calculator,
  PhoneCall,
  FileSpreadsheet,
  ArrowRight,
  HardHat,
  Clock,
  Layers,
  Check,
  HelpCircle,
  Sparkles,
  Award
} from 'lucide-react';
import { COMPANY_DATA, PACKAGES_DATA } from '../../data/companyData';
import { Button } from '../common/Button';

interface MasterConstructionHeroProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: (packageId?: string) => void;
  onOpenConsultationModal: () => void;
}

type HeroTab = 'estimator' | 'specs' | 'milestones';

export const MasterConstructionHero: React.FC<MasterConstructionHeroProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeTab, setActiveTab] = useState<HeroTab>('estimator');
  const [builtUpArea, setBuiltUpArea] = useState<number>(1500);
  const [selectedPackageId, setSelectedPackageId] = useState<'hall' | 'standard' | 'premium'>('standard');

  // Package rates as defined in official quotation documents
  const rates = {
    hall: { rate: 1500, label: 'Residential Hall', sub: 'Open-Span / Base Layout' },
    standard: { rate: 1850, label: 'Standard Residential', sub: 'Most Popular Turnkey' },
    premium: { rate: 2250, label: 'Premium Residential', sub: 'Luxury with POP Ceilings' }
  };

  const currentRate = rates[selectedPackageId].rate;
  const baseCost = builtUpArea * currentRate;
  const gstAmount = Math.round(baseCost * 0.18);
  const totalCostWithGst = baseCost + gstAmount;

  // Engineering material approximations
  const cementBags = Math.round(builtUpArea * 0.42); // ~0.40 - 0.43 bags per sq.ft built-up area
  const steelTons = Number((builtUpArea * 0.0038).toFixed(1)); // ~3.6 - 4.0 kg per sq.ft
  const sandTrucks = Math.round(builtUpArea * 0.0028); // Estimated morang loads

  const formatRupees = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <section className="relative bg-[#070F1E] text-white overflow-hidden border-b border-[#1E3A5F]">
      {/* Background Architectural Scrim & Authentic Imagery */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/hero_house.jpg"
          alt="Abdul Salam Construction Residential Project"
          className="w-full h-full object-cover object-center opacity-25 filter brightness-[0.8] contrast-[1.1]"
          onError={(e) => {
            // Graceful fallback to unsplash architectural villa
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85';
          }}
        />
        {/* Subtle Architectural Blueprint Grid & Atmospheric Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070F1E] via-[#070F1E]/90 to-[#070F1E]/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-transparent to-[#070F1E]/60" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-14 lg:py-18">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: BRAND AUTHORITY, VALUE & CLEAR PROMISE       */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Business Entity Identity & Location Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 bg-[#0B1B3D]/90 border border-[#25456E] backdrop-blur-md text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E58A1F] animate-pulse" />
              <span className="font-bold text-white tracking-wider">M/S ABDUL SALAM CONSTRUCTIONS COMPANY</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300">GSTIN: {COMPANY_DATA.gstin}</span>
              <span className="hidden sm:inline text-gray-500">|</span>
              <span className="hidden sm:inline text-[#E58A1F]">Bhadohi, UP</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.1] text-white text-balance">
                Premier Residential Turnkey Construction & Civil Engineering{' '}
                <span className="text-[#E58A1F]">in Bhadohi</span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-sans font-normal">
                From ground excavation and engineered RCC foundation to final key handover. 
                Constructed with certified <strong className="text-white font-semibold">UltraTech / ACC Cement</strong>, 
                <strong className="text-white font-semibold"> Fe 550D TMT Steel</strong>, and first-class 
                <strong className="text-white font-semibold"> Awwal Red Bricks</strong> with 100% itemized BOQ transparency — zero hidden charges.
              </p>
            </div>

            {/* Official Package Rates Quick Cards */}
            <div className="space-y-2 pt-1">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#E58A1F]" />
                <span>Official Quotation Packages (Per Sq.Ft Roof Slab Area + 18% GST)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1. Residential Hall */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackageId('hall');
                    setActiveTab('estimator');
                  }}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    selectedPackageId === 'hall'
                      ? 'bg-[#0B1B3D] border-[#E58A1F] ring-1 ring-[#E58A1F]'
                      : 'bg-[#0A1424]/80 border-slate-700/80 hover:border-slate-500 hover:bg-[#0E1E38]'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-400 font-medium">Residential Hall</div>
                  <div className="text-lg font-black text-white font-heading mt-0.5">₹1,500 <span className="text-xs font-normal text-slate-400">/ sq.ft</span></div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">+ 18% GST • 2x2 Tiles, Cera</div>
                </button>

                {/* 2. Standard Residential */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackageId('standard');
                    setActiveTab('estimator');
                  }}
                  className={`p-3 text-left border transition-all cursor-pointer relative ${
                    selectedPackageId === 'standard'
                      ? 'bg-[#0B1B3D] border-[#E58A1F] ring-1 ring-[#E58A1F]'
                      : 'bg-[#0A1424]/80 border-slate-700/80 hover:border-slate-500 hover:bg-[#0E1E38]'
                  }`}
                >
                  <div className="absolute -top-2 right-2 px-1.5 py-0.5 bg-[#E58A1F] text-white text-[9px] font-mono font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div className="text-[11px] font-mono text-[#E58A1F] font-medium">Standard Home</div>
                  <div className="text-lg font-black text-white font-heading mt-0.5">₹1,850 <span className="text-xs font-normal text-slate-400">/ sq.ft</span></div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">+ 18% GST • Jaquar, Marble</div>
                </button>

                {/* 3. Premium Residential */}
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPackageId('premium');
                    setActiveTab('estimator');
                  }}
                  className={`p-3 text-left border transition-all cursor-pointer ${
                    selectedPackageId === 'premium'
                      ? 'bg-[#0B1B3D] border-[#E58A1F] ring-1 ring-[#E58A1F]'
                      : 'bg-[#0A1424]/80 border-slate-700/80 hover:border-slate-500 hover:bg-[#0E1E38]'
                  }`}
                >
                  <div className="text-[11px] font-mono text-slate-400 font-medium">Premium Villa</div>
                  <div className="text-lg font-black text-white font-heading mt-0.5">₹2,250 <span className="text-xs font-normal text-slate-400">/ sq.ft</span></div>
                  <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">+ 18% GST • Designer POP Ceiling</div>
                </button>
              </div>
            </div>

            {/* Civil Standards Credibility Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-[#091529]/80 border border-slate-700/60 p-2.5">
                <span className="block text-[10px] font-mono text-slate-400 uppercase">Concrete Mix</span>
                <span className="font-bold text-xs sm:text-sm text-white font-mono">3:2:1 Ratio</span>
                <span className="block text-[10px] text-slate-400">IS 456 Structural</span>
              </div>
              <div className="bg-[#091529]/80 border border-slate-700/60 p-2.5">
                <span className="block text-[10px] font-mono text-slate-400 uppercase">Steel Grade</span>
                <span className="font-bold text-xs sm:text-sm text-[#E58A1F] font-mono">Fe 550D TMT</span>
                <span className="block text-[10px] text-slate-400">Tata / Jindal / Equal</span>
              </div>
              <div className="bg-[#091529]/80 border border-slate-700/60 p-2.5">
                <span className="block text-[10px] font-mono text-slate-400 uppercase">Kiln Bricks</span>
                <span className="font-bold text-xs sm:text-sm text-white font-mono">1st Class Awwal</span>
                <span className="block text-[10px] text-slate-400">9" (6:1) / 4.5" (5:1)</span>
              </div>
              <div className="bg-[#091529]/80 border border-slate-700/60 p-2.5">
                <span className="block text-[10px] font-mono text-slate-400 uppercase">Payment Model</span>
                <span className="font-bold text-xs sm:text-sm text-emerald-400 font-mono">7-Stage Milestones</span>
                <span className="block text-[10px] text-slate-400">Pay on Work Pass</span>
              </div>
            </div>

            {/* Action Buttons & Contact Quick Action */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                showArrow
                onClick={() => onOpenQuoteModal(selectedPackageId)}
                className="font-black text-sm shadow-xl shadow-[#E58A1F]/20 px-6 py-3.5 tracking-wide"
              >
                GET DETAILED BOQ QUOTATION
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={onOpenConsultationModal}
                className="border-slate-500 text-white hover:bg-white hover:text-[#070F1E] font-bold text-sm"
              >
                Book Free Site Inspection
              </Button>

              <a
                href={`tel:${COMPANY_DATA.contact.phone}`}
                className="inline-flex items-center gap-2 px-4 py-3 bg-[#0D1F3C] border border-[#23456F] text-xs font-mono text-slate-200 hover:text-white hover:border-[#E58A1F] transition-all"
              >
                <PhoneCall className="w-3.5 h-3.5 text-[#E58A1F]" />
                <span>Call Engineer: {COMPANY_DATA.contact.phoneDisplay.split('/')[0].trim()}</span>
              </a>
            </div>

            {/* Physical Site Office Notice */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-1">
              <MapPin className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0" />
              <span className="truncate">
                Registered Engineering Office: Phase-II, Rajpura Colony, Opp. H.P. Petrol Pump, Aurai Road, Bhadohi
              </span>
            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: INTERACTIVE ESTIMATOR & PROJECTION CARD    */}
          {/* ========================================================= */}
          <div className="lg:col-span-5">
            <div className="bg-[#0B172B]/95 border border-[#1E3B64] shadow-2xl p-5 sm:p-6 backdrop-blur-xl relative">
              
              {/* Card Header & Tab Switcher */}
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#E58A1F]/20 text-[#E58A1F] border border-[#E58A1F]/40">
                    <Calculator className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-sm sm:text-base text-white">
                      Live Construction Estimator
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400">
                      Bhadohi & Eastern UP Turnkey Rates
                    </p>
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex items-center gap-1 bg-[#060D1A] p-0.5 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveTab('estimator')}
                    className={`px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                      activeTab === 'estimator'
                        ? 'bg-[#E58A1F] text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Estimate
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specs')}
                    className={`px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                      activeTab === 'specs'
                        ? 'bg-[#E58A1F] text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('milestones')}
                    className={`px-2.5 py-1 text-[11px] font-mono transition-colors cursor-pointer ${
                      activeTab === 'milestones'
                        ? 'bg-[#E58A1F] text-white font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    7 Stages
                  </button>
                </div>
              </div>

              {/* TAB 1: LIVE ESTIMATOR */}
              {activeTab === 'estimator' && (
                <div className="space-y-4">
                  {/* Built-up area slider & input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-300 font-bold uppercase">Roof Slab Built-up Area</span>
                      <div className="flex items-center gap-1 bg-[#081224] border border-slate-700 px-2.5 py-1 text-[#E58A1F] font-bold">
                        <span>{builtUpArea.toLocaleString('en-IN')}</span>
                        <span className="text-[10px] text-slate-400 font-normal">SQ.FT</span>
                      </div>
                    </div>

                    <input
                      type="range"
                      min="600"
                      max="4000"
                      step="50"
                      value={builtUpArea}
                      onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#E58A1F]"
                    />

                    {/* Quick Preset Buttons */}
                    <div className="flex items-center justify-between gap-1.5 pt-1">
                      {[800, 1200, 1500, 2000, 2500].map((area) => (
                        <button
                          key={area}
                          type="button"
                          onClick={() => setBuiltUpArea(area)}
                          className={`flex-1 py-1 text-[10px] font-mono border transition-colors cursor-pointer ${
                            builtUpArea === area
                              ? 'bg-[#E58A1F] text-white border-[#E58A1F] font-bold'
                              : 'bg-[#081224] text-slate-400 border-slate-800 hover:text-white hover:border-slate-600'
                          }`}
                        >
                          {area} sqft
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Package Selector Pills */}
                  <div className="space-y-1.5">
                    <label className="block text-[11px] font-mono text-slate-400 uppercase">
                      Select Construction Specification Tier:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedPackageId('hall')}
                        className={`p-2 text-center border text-xs font-mono transition-all cursor-pointer ${
                          selectedPackageId === 'hall'
                            ? 'bg-[#0E264D] border-[#E58A1F] text-white font-bold ring-1 ring-[#E58A1F]'
                            : 'bg-[#081224] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div>Hall</div>
                        <div className="font-bold text-[#E58A1F]">₹1,500</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPackageId('standard')}
                        className={`p-2 text-center border text-xs font-mono transition-all cursor-pointer ${
                          selectedPackageId === 'standard'
                            ? 'bg-[#0E264D] border-[#E58A1F] text-white font-bold ring-1 ring-[#E58A1F]'
                            : 'bg-[#081224] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div>Standard</div>
                        <div className="font-bold text-[#E58A1F]">₹1,850</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedPackageId('premium')}
                        className={`p-2 text-center border text-xs font-mono transition-all cursor-pointer ${
                          selectedPackageId === 'premium'
                            ? 'bg-[#0E264D] border-[#E58A1F] text-white font-bold ring-1 ring-[#E58A1F]'
                            : 'bg-[#081224] border-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        <div>Premium</div>
                        <div className="font-bold text-[#E58A1F]">₹2,250</div>
                      </button>
                    </div>
                  </div>

                  {/* Live Cost Output Box */}
                  <div className="bg-[#070F1E] border border-[#1C365C] p-3.5 space-y-2.5">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Base Construction Cost ({builtUpArea} sqft × ₹{currentRate}):</span>
                      <span className="font-mono font-bold text-white">{formatRupees(baseCost)}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Applicable GST (18% Statutory):</span>
                      <span className="font-mono">{formatRupees(gstAmount)}</span>
                    </div>

                    <div className="border-t border-slate-800 pt-2 flex items-baseline justify-between">
                      <div>
                        <span className="block text-[11px] font-mono text-slate-400 uppercase">
                          Estimated Total Turnkey Handover
                        </span>
                        <span className="text-[10px] text-[#E58A1F]">Zero Cost Escalation Guarantee</span>
                      </div>
                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-black text-white font-mono">
                          {formatLakhs(totalCostWithGst)}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          ({formatRupees(totalCostWithGst)})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Material Projection Chips */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono text-slate-300 bg-[#091529] p-2 border border-slate-800">
                    <div>
                      <span className="block text-slate-400">Est. Cement</span>
                      <strong className="text-white text-xs font-mono">~{cementBags} Bags</strong>
                    </div>
                    <div>
                      <span className="block text-slate-400">Fe 550D Steel</span>
                      <strong className="text-[#E58A1F] text-xs font-mono">~{steelTons} Tons</strong>
                    </div>
                    <div>
                      <span className="block text-slate-400">Milestone Pass</span>
                      <strong className="text-emerald-400 text-xs font-mono">7 Verified Stages</strong>
                    </div>
                  </div>

                  {/* Direct Action Button */}
                  <button
                    type="button"
                    onClick={() => onOpenQuoteModal(selectedPackageId)}
                    className="w-full py-3 bg-[#E58A1F] hover:bg-[#d47b13] text-white font-heading font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#E58A1F]/20"
                  >
                    <span>Request Official BOQ for {builtUpArea} SQ.FT</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="text-[10px] text-center text-slate-400">
                    *Based on horizontal built-up slab area. Staircases billed at 150%, Double slab at 50%.
                  </div>
                </div>
              )}

              {/* TAB 2: CIVIL SPECS COMPARISON */}
              {activeTab === 'specs' && (
                <div className="space-y-3 text-xs">
                  <div className="bg-[#070F1E] border border-slate-800 p-3 space-y-2">
                    <div className="font-mono font-bold text-white text-xs border-b border-slate-800 pb-1 flex items-center gap-1.5 text-[#E58A1F]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Authentic Civil Engineering Mortar Ratios</span>
                    </div>
                    <div className="space-y-1.5 text-slate-300 text-[11px] font-mono">
                      <div className="flex justify-between">
                        <span>Foundation PCC Bed:</span>
                        <strong className="text-white">Ratio 8:5:1 (Aggregates 8, Sand 5, Cement 1)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>RCC Slabs & Columns:</span>
                        <strong className="text-[#E58A1F]">Ratio 3:2:1 (Blue Metal 3, Sand 2, Cement 1)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>9" Exterior Brickwork:</span>
                        <strong className="text-white">Ratio 6:1 (Sand 6, Cement 1)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>4.5" Partition Brickwork:</span>
                        <strong className="text-white">Ratio 5:1 (Sand 5, Cement 1)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>External Wall Plaster:</span>
                        <strong className="text-white">15mm Double Coat (6:1)</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Internal Wall Plaster:</span>
                        <strong className="text-white">10mm Sponge Finish (6:1)</strong>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#070F1E] border border-slate-800 p-3 space-y-1 text-[11px] text-slate-300">
                    <div className="font-bold text-white font-mono flex items-center gap-1 text-[#E58A1F]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approved Material Standards</span>
                    </div>
                    <p className="text-slate-400">
                      UltraTech Weather Plus / ACC Gold ('Not for Sale' industrial packaging), Fe 550D TMT rebar (Tata, Jindal, Kamdhenu), 1st class Awwal kiln bricks, Astral/Supreme CPVC plumbing lines, and Godrej locksets.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate('/packages')}
                    className="w-full py-2 bg-[#0E264D] hover:bg-[#153468] border border-[#23456F] text-white text-xs font-mono font-bold transition-colors cursor-pointer text-center"
                  >
                    View Full Material Specification Schedule →
                  </button>
                </div>
              )}

              {/* TAB 3: 7-STAGE MILESTONE SCHEDULE */}
              {activeTab === 'milestones' && (
                <div className="space-y-3 text-xs">
                  <div className="bg-[#070F1E] border border-slate-800 p-3 space-y-2">
                    <div className="font-mono font-bold text-white text-xs border-b border-slate-800 pb-1 flex items-center justify-between text-[#E58A1F]">
                      <span>7 Verified Payment Milestones</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 border border-emerald-500/30">
                        Total: 100%
                      </span>
                    </div>

                    <div className="space-y-2 text-[11px] font-mono">
                      {[
                        { stage: 'Stage 1', pct: '20%', label: 'Booking & Contract Signing' },
                        { stage: 'Stage 2', pct: '10%', label: 'Plinth Level (Footings & Tie-beams)' },
                        { stage: 'Stage 3', pct: '15%', label: 'Column Casting till Beam Bottom' },
                        { stage: 'Stage 4', pct: '10%', label: 'Brick Masonry (Jodai) of respective floor' },
                        { stage: 'Stage 5', pct: '20%', label: 'RCC Roof Slab Casting (Dhalai)' },
                        { stage: 'Stage 6', pct: '5%', label: 'Plaster Work (Internal & External)' },
                        { stage: 'Stage 7', pct: '20%', label: 'Finishing (Flooring, Bath, Paint & Handover)' }
                      ].map((s, idx) => (
                        <div key={idx} className="flex items-center justify-between py-0.5 border-b border-slate-800/60 last:border-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[#E58A1F] font-bold w-14">{s.stage}:</span>
                            <span className="text-slate-300 text-[10px] sm:text-[11px]">{s.label}</span>
                          </div>
                          <span className="font-bold text-white bg-slate-800 px-1.5 py-0.5 text-[10px]">
                            {s.pct}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={onOpenConsultationModal}
                    className="w-full py-2 bg-[#E58A1F] hover:bg-[#d47b13] text-white text-xs font-mono font-bold transition-colors cursor-pointer text-center"
                  >
                    Discuss Milestones with Site Engineer →
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
