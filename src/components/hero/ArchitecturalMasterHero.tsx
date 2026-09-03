import React, { useState } from 'react';
import {
  ShieldCheck,
  Building2,
  CheckCircle2,
  MapPin,
  Sparkles,
  Calculator,
  Layers,
  Award,
  PhoneCall,
  Compass,
  FileSpreadsheet,
  CheckCircle,
  Eye,
  Cpu,
  ArrowRight
} from 'lucide-react';
import { COMPANY_DATA } from '../../data/companyData';
import { Button } from '../common/Button';
import { BlueprintToRealityLens } from './BlueprintToRealityLens';
import { HeroInstantEstimator } from './HeroInstantEstimator';
import { HeroProjectDeck } from './HeroProjectDeck';

type HeroTab = 'lens' | 'calculator' | 'projects';

interface ArchitecturalMasterHeroProps {
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}

export const ArchitecturalMasterHero: React.FC<ArchitecturalMasterHeroProps> = ({
  onNavigate,
  onOpenQuoteModal,
  onOpenConsultationModal
}) => {
  const [activeHeroTab, setActiveHeroTab] = useState<HeroTab>('lens');

  return (
    <section className="relative bg-[#090B0E] text-white pt-8 pb-14 sm:py-16 lg:py-20 border-b border-[#202530] overflow-hidden">
      {/* Background Architectural Grid & Subtle Radial Atmosphere */}
      <div className="absolute inset-0 bg-grid-dark opacity-35 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#E58A1F]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-10">
        {/* Top Editorial Headline & Trust Value Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Hero Title */}
          <div className="lg:col-span-8 space-y-4">
            {/* Regional Authority Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#12151D] border border-[#272D3B] text-xs font-mono text-gray-200 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#E58A1F] animate-pulse" />
              <span className="text-[#E58A1F] font-bold">BHADOHI'S PREMIER CIVIL BUILDER</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300">ESTABLISHED 2008</span>
            </div>

            {/* Display Typography */}
            <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white">
              Architectural Grandeur.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E58A1F] via-[#FFA666] to-[#E58A1F]">
                Precision Engineering.
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Bhadohi's master turnkey contractor for luxury residential villas, contemporary duplexes, and commercial complexes — engineered with earthquake-resistant RCC frames, strict BOQ transparency, and zero cost escalation.
            </p>
          </div>

          {/* Right Action Callouts & Direct Phone */}
          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="primary"
                size="lg"
                showArrow
                onClick={onOpenQuoteModal}
                className="font-black flex-1 sm:flex-none shadow-lg shadow-[#E58A1F]/20"
              >
                GET FREE BOQ QUOTE
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={onOpenConsultationModal}
                className="border-[#2F3646] text-white hover:bg-white hover:text-[#090B0E] font-bold"
              >
                Book Site Inspection
              </Button>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-gray-400 bg-[#12151D] border border-[#222734] px-3.5 py-2">
              <span className="text-gray-200 font-bold">OFFICE:</span>
              <span className="truncate">Opp. H.P. Petrol Pump, Aurai Rd, Bhadohi</span>
            </div>
          </div>
        </div>

        {/* Hero Concept Mode Selector Tabs (Pro Agency Grade) */}
        <div className="border-b border-[#222734] pb-1 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 bg-[#12151D] border border-[#222734] p-1 text-xs font-mono">
            <button
              onClick={() => setActiveHeroTab('lens')}
              className={`px-3 sm:px-4 py-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeHeroTab === 'lens'
                  ? 'bg-[#E58A1F] text-white font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. Blueprint ↔ Reality Lens</span>
            </button>

            <button
              onClick={() => setActiveHeroTab('calculator')}
              className={`px-3 sm:px-4 py-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeHeroTab === 'calculator'
                  ? 'bg-[#E58A1F] text-white font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>2. Live BOQ & Material Estimator</span>
            </button>

            <button
              onClick={() => setActiveHeroTab('projects')}
              className={`px-3 sm:px-4 py-2 flex items-center gap-2 transition-all cursor-pointer ${
                activeHeroTab === 'projects'
                  ? 'bg-[#E58A1F] text-white font-bold shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>3. Flagship Projects Deck</span>
            </button>
          </div>

          {/* Live Sites Ticker */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-[#12151D] border border-[#222734] px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-gray-300">14 Ongoing Sites Active in Bhadohi District</span>
          </div>
        </div>

        {/* Active Hero Concept Display Module */}
        <div className="w-full">
          {activeHeroTab === 'lens' && (
            <BlueprintToRealityLens onOpenConsultationModal={onOpenConsultationModal} />
          )}

          {activeHeroTab === 'calculator' && (
            <HeroInstantEstimator onOpenQuoteModal={onOpenQuoteModal} />
          )}

          {activeHeroTab === 'projects' && (
            <HeroProjectDeck
              onNavigate={onNavigate}
              onOpenConsultationModal={onOpenConsultationModal}
            />
          )}
        </div>

        {/* Bottom Trust & Assurance Matrix Bento Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-[#12151D] border border-[#222734] flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#E58A1F] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-200">30-Year Warranty</div>
              <div className="text-[11px] text-gray-400 font-mono">RCC Core & Foundation</div>
            </div>
          </div>

          <div className="p-3.5 bg-[#12151D] border border-[#222734] flex items-center gap-3">
            <FileSpreadsheet className="w-5 h-5 text-[#E58A1F] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-200">100% Itemized BOQ</div>
              <div className="text-[11px] text-gray-400 font-mono">Zero Hidden Escalations</div>
            </div>
          </div>

          <div className="p-3.5 bg-[#12151D] border border-[#222734] flex items-center gap-3">
            <Compass className="w-5 h-5 text-[#E58A1F] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-200">On-Site Supervision</div>
              <div className="text-[11px] text-gray-400 font-mono">Dedicated Civil Engineer</div>
            </div>
          </div>

          <div className="p-3.5 bg-[#12151D] border border-[#222734] flex items-center gap-3">
            <Award className="w-5 h-5 text-[#E58A1F] flex-shrink-0" />
            <div>
              <div className="text-xs font-bold text-gray-200">18+ Years Legacy</div>
              <div className="text-[11px] text-gray-400 font-mono">Trusted Across Bhadohi</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
