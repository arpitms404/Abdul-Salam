import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Maximize2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PROJECTS_DATA } from '../../data/companyData';
import { Button } from '../common/Button';

interface HeroProjectDeckProps {
  onNavigate: (href: string) => void;
  onOpenConsultationModal: () => void;
}

export const HeroProjectDeck: React.FC<HeroProjectDeckProps> = ({
  onNavigate,
  onOpenConsultationModal
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const currentProject = PROJECTS_DATA[selectedIndex] || PROJECTS_DATA[0];

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  return (
    <div className="w-full bg-[#0E1015] border border-[#262B35] shadow-2xl overflow-hidden text-white relative">
      {/* Top Deck Navigation Bar */}
      <div className="bg-[#141720] border-b border-[#262B35] px-4 py-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E58A1F] animate-pulse" />
          <span className="text-xs font-mono font-bold text-gray-200 uppercase tracking-wider">
            Flagship Architectural Landmarks in Bhadohi
          </span>
        </div>

        {/* Project Selector Pagination */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-400">
            <strong className="text-[#E58A1F]">{selectedIndex + 1}</strong> / {PROJECTS_DATA.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              className="p-1.5 bg-[#1B202A] hover:bg-[#E58A1F] text-gray-300 hover:text-white border border-[#2F3644] transition-all cursor-pointer"
              title="Previous Landmark"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 bg-[#1B202A] hover:bg-[#E58A1F] text-gray-300 hover:text-white border border-[#2F3644] transition-all cursor-pointer"
              title="Next Landmark"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Left/Top: High-Res Project Visual Presentation */}
        <div className="lg:col-span-7 relative h-[280px] sm:h-[360px] lg:h-[440px] overflow-hidden group">
          <img
            src={currentProject.image}
            alt={currentProject.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-black/20 to-transparent pointer-events-none" />

          {/* Status Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border backdrop-blur-md ${
              currentProject.stage === 'Completed'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
                : 'bg-amber-950/80 border-[#E58A1F]/50 text-[#E58A1F]'
            }`}>
              ● {currentProject.stage}
            </span>

            <span className="px-2.5 py-1 text-xs font-mono font-semibold bg-black/60 backdrop-blur-md border border-white/10 text-gray-300">
              {currentProject.category}
            </span>
          </div>

          {/* Bottom Telemetry Overlay on Image */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-gray-300 bg-black/70 backdrop-blur-md p-2.5 border border-white/10">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E58A1F]" />
              <span className="truncate">{currentProject.location}</span>
            </div>
            <div className="font-bold text-white">
              {currentProject.builtUpArea}
            </div>
          </div>
        </div>

        {/* Right/Bottom: Technical Details & Architectural Highlights */}
        <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-[#111319] space-y-4">
          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono text-[#E58A1F] uppercase tracking-wider font-bold">
                {currentProject.projectType} • {currentProject.floors}
              </span>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white mt-1 leading-snug">
                {currentProject.title}
              </h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed line-clamp-3">
              {currentProject.overview}
            </p>

            {/* Quick Specs Matrix */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 text-xs font-mono">
              <div className="bg-[#181C26] p-2 border border-white/5">
                <span className="block text-[9px] text-gray-400 uppercase">Plot Footprint</span>
                <span className="font-bold text-gray-200">{currentProject.plotSize}</span>
              </div>
              <div className="bg-[#181C26] p-2 border border-white/5">
                <span className="block text-[9px] text-gray-400 uppercase">Contract Mode</span>
                <span className="font-bold text-[#E58A1F]">{currentProject.contractType}</span>
              </div>
            </div>

            {/* Architectural Highlights */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block font-bold">
                Key Engineered Deliverables
              </span>
              {currentProject.highlights.slice(0, 2).map((hl, i) => (
                <div key={i} className="flex items-start gap-2 text-[11px] text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-2">
            <Button
              variant="primary"
              size="sm"
              showArrow
              onClick={() => onNavigate(`/projects/${currentProject.slug}`)}
              className="font-black text-xs"
            >
              VIEW CASE STUDY
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenConsultationModal}
              className="text-xs border-[#2F3644] text-gray-300 hover:text-white"
            >
              Request Similar Build
            </Button>
          </div>
        </div>
      </div>

      {/* Project Switcher Thumbnails Row */}
      <div className="bg-[#0A0C10] border-t border-[#262B35] p-2 flex items-center gap-2 overflow-x-auto">
        {PROJECTS_DATA.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => setSelectedIndex(idx)}
            className={`flex items-center gap-2.5 p-1.5 pr-3 text-left border transition-all cursor-pointer flex-shrink-0 ${
              selectedIndex === idx
                ? 'bg-[#181C26] border-[#E58A1F] text-white shadow-md'
                : 'bg-[#111319] border-[#222732] text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-8 h-8 object-cover rounded-none"
            />
            <div className="text-[11px] font-mono leading-tight">
              <div className="font-bold text-gray-200 truncate max-w-[140px]">{proj.title}</div>
              <div className="text-[10px] text-gray-500">{proj.builtUpArea}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
