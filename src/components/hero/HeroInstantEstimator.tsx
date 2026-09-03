import React, { useState } from 'react';
import {
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Layers,
  Sparkles,
  Download,
  Calendar,
  FileSpreadsheet
} from 'lucide-react';
import { PACKAGES_DATA } from '../../data/companyData';
import { Button } from '../common/Button';

interface HeroInstantEstimatorProps {
  onOpenQuoteModal: () => void;
}

export const HeroInstantEstimator: React.FC<HeroInstantEstimatorProps> = ({
  onOpenQuoteModal
}) => {
  const [builtUpArea, setBuiltUpArea] = useState<number>(1800);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('standard');
  const [floorCount, setFloorCount] = useState<number>(2); // 1 = G, 2 = G+1, 3 = G+2

  const getPackageRate = (id: string) => {
    switch (id) {
      case 'essential': return 1450;
      case 'standard': return 1750;
      case 'premium': return 2150;
      case 'custom': return 2650;
      default: return 1750;
    }
  };

  const selectedPkg = PACKAGES_DATA.find((p) => p.id === selectedPackageId) || PACKAGES_DATA[1];
  const ratePerSqFt = getPackageRate(selectedPackageId);
  const estimatedCost = builtUpArea * ratePerSqFt;

  // Material engineering approximations based on Indian civil standards
  const estimatedCementBags = Math.round(builtUpArea * 0.42); // ~0.4 to 0.45 bags per sq.ft
  const estimatedSteelTons = Number((builtUpArea * 0.0038).toFixed(1)); // ~3.5 to 4 kg per sq.ft
  const estimatedDurationMonths = builtUpArea <= 1500 ? '6 - 8' : builtUpArea <= 3000 ? '8 - 11' : '11 - 14';

  const formatLakhs = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹${(val / 100000).toFixed(2)} Lakhs`;
  };

  return (
    <div className="w-full bg-[#0E1015] border border-[#262B35] shadow-2xl p-4 sm:p-6 text-white relative">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#262B35] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-[#E58A1F]/20 border border-[#E58A1F] flex items-center justify-center text-[#E58A1F]">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-heading font-black text-sm sm:text-base text-white tracking-wide">
              Live BOQ Construction Estimator
            </h4>
            <p className="text-[11px] font-mono text-gray-400">
              Instant cost & raw material projections for Bhadohi & UP
            </p>
          </div>
        </div>

        <span className="hidden sm:inline-block px-2.5 py-1 bg-[#1A1F2B] border border-white/10 text-[10px] font-mono text-[#E58A1F] font-bold uppercase">
          Zero Hidden Cost Guarantee
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive Sliders & Configuration */}
        <div className="lg:col-span-7 space-y-5">
          {/* Built-up Area Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono text-gray-300 font-bold uppercase">
                Total Built-up Area (Sq.Ft)
              </label>
              <div className="flex items-center gap-1.5 bg-[#171A22] border border-[#2B313F] px-3 py-1 text-sm font-mono font-bold text-[#E58A1F]">
                <span>{builtUpArea.toLocaleString('en-IN')}</span>
                <span className="text-gray-400 text-xs">SQ.FT</span>
              </div>
            </div>
            <input
              type="range"
              min="800"
              max="5000"
              step="50"
              value={builtUpArea}
              onChange={(e) => setBuiltUpArea(Number(e.target.value))}
              className="w-full h-2 bg-[#1C212B] rounded-lg appearance-none cursor-pointer accent-[#E58A1F]"
            />
            <div className="flex justify-between text-[10px] font-mono text-gray-500">
              <span>800 sq.ft (Compact Home)</span>
              <span>2,500 sq.ft (Duplex)</span>
              <span>5,000 sq.ft (Luxury Villa)</span>
            </div>
          </div>

          {/* Package Selection Tabs */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-300 font-bold uppercase">
              Specification Package Tier
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PACKAGES_DATA.map((pkg) => {
                const isSelected = selectedPackageId === pkg.id;
                const rate = getPackageRate(pkg.id);
                return (
                  <button
                    key={pkg.id}
                    type="button"
                    onClick={() => setSelectedPackageId(pkg.id)}
                    className={`p-2.5 text-left border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#181C26] border-[#E58A1F] text-white shadow-lg'
                        : 'bg-[#12141A] border-[#242934] text-gray-400 hover:border-gray-600 hover:text-white'
                    }`}
                  >
                    <div className="text-[11px] font-bold text-gray-200 truncate">{pkg.name.replace(' Package', '')}</div>
                    <div className="text-xs font-mono font-black text-[#E58A1F] mt-0.5">
                      ₹{rate}<span className="text-[9px] font-normal text-gray-400">/sq.ft</span>
                    </div>
                    {isSelected && (
                      <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#E58A1F]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Floor Elevation Setup */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-gray-300 font-bold uppercase">
              Elevation / Floors
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 1, label: 'Ground Floor (G)' },
                { count: 2, label: 'G + 1 Duplex' },
                { count: 3, label: 'G + 2 Villa' }
              ].map((fl) => (
                <button
                  key={fl.count}
                  type="button"
                  onClick={() => setFloorCount(fl.count)}
                  className={`py-2 px-3 text-xs font-mono transition-all border cursor-pointer ${
                    floorCount === fl.count
                      ? 'bg-[#E58A1F] border-[#E58A1F] text-white font-bold'
                      : 'bg-[#12141A] border-[#242934] text-gray-400 hover:text-white'
                  }`}
                >
                  {fl.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Output HUD Card */}
        <div className="lg:col-span-5 bg-[#13161F] border border-[#2B313F] p-4 sm:p-5 space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block">
              Estimated Total Construction Investment
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-heading font-black text-2xl sm:text-3xl text-white">
                {formatLakhs(estimatedCost)}
              </span>
              <span className="text-xs font-mono text-gray-400">
                (₹{ratePerSqFt}/sq.ft)
              </span>
            </div>
            <p className="text-[11px] text-gray-400 mt-1">
              Turnkey complete structure, materials, labor, and finishing.
            </p>
          </div>

          {/* Key Material Projections Grid */}
          <div className="grid grid-cols-2 gap-2.5 py-1">
            <div className="bg-[#181C26] p-2.5 border border-white/5">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Estimated Cement</span>
              <span className="text-sm font-mono font-bold text-[#E58A1F]">~{estimatedCementBags} Bags</span>
              <span className="block text-[9px] text-gray-500">UltraTech / ACC Grade</span>
            </div>

            <div className="bg-[#181C26] p-2.5 border border-white/5">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Fe-550D TMT Steel</span>
              <span className="text-sm font-mono font-bold text-[#E58A1F]">~{estimatedSteelTons} Metric Tons</span>
              <span className="block text-[9px] text-gray-500">Certified High Ductility</span>
            </div>

            <div className="bg-[#181C26] p-2.5 border border-white/5">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Est. Handover Time</span>
              <span className="text-sm font-mono font-bold text-white">{estimatedDurationMonths} Months</span>
              <span className="block text-[9px] text-gray-500">Milestone Stage Schedule</span>
            </div>

            <div className="bg-[#181C26] p-2.5 border border-white/5">
              <span className="block text-[10px] font-mono text-gray-400 uppercase">Warranty Covered</span>
              <span className="text-sm font-mono font-bold text-emerald-400">30 Years RCC</span>
              <span className="block text-[9px] text-gray-500">Soil to Roof Guarantee</span>
            </div>
          </div>

          {/* Action Button */}
          <Button
            variant="primary"
            size="lg"
            showArrow
            onClick={onOpenQuoteModal}
            className="w-full justify-center font-black shadow-lg shadow-[#E58A1F]/20"
          >
            REQUEST OFFICIAL ITEMISED BOQ
          </Button>

          <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 pt-1">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#E58A1F]" />
              Strict BOQ transparency
            </span>
            <span>Free Plot Soil Consultation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
