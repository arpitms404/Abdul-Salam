import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Layers,
  CheckCircle,
  Eye,
  Maximize2,
  Cpu,
  ShieldCheck,
  Compass,
  ArrowRight,
  Info,
  X
} from 'lucide-react';

interface Hotspot {
  id: string;
  x: number; // percentage
  y: number; // percentage
  title: string;
  category: 'Structural' | 'Finishing' | 'Architecture';
  detail: string;
  spec: string;
}

const ARCHITECTURAL_HOTSPOTS: Hotspot[] = [
  {
    id: 'footing',
    x: 22,
    y: 84,
    title: 'M25 Heavy Raft & Plinth',
    category: 'Structural',
    detail: 'Deep isolated RCC footing with damp-proof barrier & anti-termite grid.',
    spec: 'M25 Mix • Fe-550D TMT • 21-Day Curing'
  },
  {
    id: 'cantilever',
    x: 58,
    y: 46,
    title: 'Cantilever Balcony & Glass',
    category: 'Architecture',
    detail: 'Engineered projection with 12mm Saint-Gobain toughened glass balustrade.',
    spec: 'Grade 304 SS Spigots • Seamless View'
  },
  {
    id: 'pergola',
    x: 76,
    y: 20,
    title: 'Architectural Steel Pergola',
    category: 'Finishing',
    detail: 'Custom powder-coated structural steel sunshade pergola on terrace.',
    spec: 'Anti-Rust Zinc Primer • Modern Facade'
  },
  {
    id: 'facade',
    x: 35,
    y: 38,
    title: 'Double-Height Living Glazing',
    category: 'Architecture',
    detail: 'Thermal-break acoustic glass elevation maximizing natural day lighting.',
    spec: 'Acoustic UPVC • Low-E Energy Glass'
  }
];

export const BlueprintToRealityLens: React.FC<{
  onOpenConsultationModal?: () => void;
}> = ({ onOpenConsultationModal }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'reality' | 'blueprint'>('slider');
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging || viewMode === 'slider') {
      handlePointerMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handlePointerMove(e.touches[0].clientX);
    }
  };

  const currentSplit = viewMode === 'reality' ? 100 : viewMode === 'blueprint' ? 0 : sliderPosition;

  return (
    <div className="w-full bg-[#0E1015] border border-[#262B35] shadow-2xl overflow-hidden relative">
      {/* Top Telemetry Header Bar */}
      <div className="bg-[#141720] border-b border-[#262B35] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 z-20 relative">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E58A1F] animate-pulse" />
          <span className="text-xs font-mono font-bold text-gray-200 uppercase tracking-wider">
            Interactive Blueprint ↔ Turnkey Reality Lens
          </span>
        </div>

        {/* View Mode Quick Toggles */}
        <div className="flex items-center bg-[#1B202A] border border-[#2F3644] p-0.5 text-[11px] font-mono">
          <button
            onClick={() => setViewMode('slider')}
            className={`px-2.5 py-1 transition-all cursor-pointer ${
              viewMode === 'slider'
                ? 'bg-[#E58A1F] text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Interactive Split
          </button>
          <button
            onClick={() => setViewMode('reality')}
            className={`px-2.5 py-1 transition-all cursor-pointer ${
              viewMode === 'reality'
                ? 'bg-[#E58A1F] text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Finished Villa
          </button>
          <button
            onClick={() => setViewMode('blueprint')}
            className={`px-2.5 py-1 transition-all cursor-pointer ${
              viewMode === 'blueprint'
                ? 'bg-[#00E5FF] text-black font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Structural CAD
          </button>
        </div>
      </div>

      {/* Main Dual-Layer Visual Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[510px] overflow-hidden select-none cursor-ew-resize group"
      >
        {/* Layer 1: The Blueprint & RCC Engineering Layer (Background / Left Side) */}
        <div className="absolute inset-0 bg-[#0B1320] flex items-center justify-center">
          {/* Blueprint Engineering Image / Schematic */}
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1400&q=80"
            alt="Structural Civil Blueprint Execution"
            className="w-full h-full object-cover filter contrast-125 brightness-75 hue-rotate-190"
          />
          {/* CAD Technical Grid Overlay */}
          <div className="absolute inset-0 bg-blueprint-dark opacity-70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1320] via-transparent to-transparent opacity-80" />

          {/* Blueprint Annotation Stamp */}
          <div className="absolute top-4 left-4 bg-[#091528]/90 border border-[#00E5FF]/40 px-3 py-1.5 text-left z-10 backdrop-blur-md">
            <div className="flex items-center gap-1.5 text-[#00E5FF] font-mono text-[10px] font-bold uppercase tracking-wider">
              <Cpu className="w-3.5 h-3.5" />
              <span>STAGE: RCC STRUCTURAL CAD</span>
            </div>
            <p className="text-[11px] font-mono text-gray-300">
              M25 Mix • Fe-550D Rebar • IS-456 Code
            </p>
          </div>
        </div>

        {/* Layer 2: The Finished Luxury Villa Reality (Clipped by Slider Position) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `polygon(${currentSplit}% 0, 100% 0, 100% 100%, ${currentSplit}% 100%)` }}
        >
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80"
            alt="Turnkey Finished Luxury Duplex"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10]/80 via-transparent to-transparent pointer-events-none" />

          {/* Finished Reality Annotation Stamp */}
          <div className="absolute top-4 right-4 bg-[#14161C]/90 border border-[#E58A1F]/50 px-3 py-1.5 text-right z-10 backdrop-blur-md">
            <div className="flex items-center justify-end gap-1.5 text-[#E58A1F] font-mono text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TURNKEY LUXURY HANDOVER</span>
            </div>
            <p className="text-[11px] font-mono text-gray-200">
              G+1 Duplex • Italian Marble • Teak Joinery
            </p>
          </div>
        </div>

        {/* Draggable Divider Handle (Visible in Slider Mode) */}
        {viewMode === 'slider' && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-[#E58A1F] shadow-[0_0_15px_rgba(242,125,38,0.8)] z-30 pointer-events-none"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#161922] border-2 border-[#E58A1F] flex items-center justify-center text-white shadow-2xl">
              <div className="flex items-center gap-0.5 text-xs text-[#E58A1F] font-bold">
                <span>◀</span>
                <span>▶</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Architectural Hotspot Pins */}
        <div className="absolute inset-0 z-20 pointer-events-auto">
          {ARCHITECTURAL_HOTSPOTS.map((hotspot) => {
            const isSelected = activeHotspot?.id === hotspot.id;
            return (
              <div
                key={hotspot.id}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isSelected ? null : hotspot);
                }}
              >
                <div className="relative group/pin">
                  <span className="flex h-6 w-6 relative items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E58A1F] opacity-75" />
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-[#E58A1F] border-2 border-white items-center justify-center text-[9px] font-black text-white shadow-md">
                      +
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Hotspot Inspection Card Overlay */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-sm bg-[#13161D]/95 backdrop-blur-xl border border-[#E58A1F] p-4 shadow-2xl z-40 animate-in fade-in slide-in-from-bottom-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="inline-block px-2 py-0.5 bg-[#E58A1F]/20 text-[#E58A1F] font-mono text-[10px] font-bold uppercase tracking-wider">
                  {activeHotspot.category} Specification
                </span>
                <h5 className="font-heading font-black text-sm sm:text-base text-white mt-1">
                  {activeHotspot.title}
                </h5>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="text-gray-400 hover:text-white p-1 rounded-xs transition-colors"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">
              {activeHotspot.detail}
            </p>
            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#E58A1F]">
              <span>SPEC: {activeHotspot.spec}</span>
            </div>
          </div>
        )}

        {/* Desktop Drag Helper Hint */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-3 py-1 text-[10px] font-mono text-gray-300 border border-white/10 pointer-events-none hidden sm:flex items-center gap-2">
          <span>Drag cursor across to reveal structural vs turnkey delivery</span>
          <span className="text-[#E58A1F]">|</span>
          <span>Click + pins for engineering specs</span>
        </div>
      </div>

      {/* Bottom Technical Spec Bar */}
      <div className="bg-[#111319] border-t border-[#262B35] px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
        <div>
          <span className="block text-[10px] font-mono text-gray-400 uppercase">Structural Code</span>
          <span className="font-bold text-xs sm:text-sm text-white">IS 456:2000 Earthquake Safe</span>
        </div>
        <div>
          <span className="block text-[10px] font-mono text-gray-400 uppercase">Steel Grade</span>
          <span className="font-bold text-xs sm:text-sm text-[#E58A1F]">Fe-550D TMT Rebars</span>
        </div>
        <div>
          <span className="block text-[10px] font-mono text-gray-400 uppercase">Cement Standard</span>
          <span className="font-bold text-xs sm:text-sm text-white">OPC 53 / PPC Certified</span>
        </div>
        <div>
          <span className="block text-[10px] font-mono text-gray-400 uppercase">Execution Guarantee</span>
          <span className="font-bold text-xs sm:text-sm text-emerald-400">30-Year Core Warranty</span>
        </div>
      </div>
    </div>
  );
};
