import React, { useState, useEffect, useRef } from 'react';
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
  ArrowRight,
  Play,
  Pause,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Zap,
  Activity,
  Sliders,
  Volume2,
  VolumeX,
  Clock,
  Check,
  Flame,
  Globe,
  X
} from 'lucide-react';
import { COMPANY_DATA } from '../../data/companyData';
import { Button } from '../common/Button';

interface CinematicProject {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  location: string;
  coordinates: string;
  builtUpArea: string;
  plotSize: string;
  timeline: string;
  budgetTier: string;
  concreteGrade: string;
  steelGrade: string;
  seismicZone: string;
  heroImage: string;
  cadBlueprintImage: string;
  droneImage: string;
  clientName: string;
  status: 'Turnkey Handover' | 'RCC Finishing' | 'Structural Milestone';
  keyHighlights: string[];
}

const CINEMATIC_PROJECTS: CinematicProject[] = [
  {
    id: 'duplex-harirampur',
    tag: 'FLAGSHIP RESIDENCE #ASC-2026',
    title: 'The Obsidian Grand Duplex Villa',
    subtitle: 'Contemporary G+1 Luxury Residence with Double-Height Glazing & Cantilever Balconies',
    location: 'Harirampur, Aurai Road, Bhadohi',
    coordinates: '25.3942° N, 82.5714° E',
    builtUpArea: '3,200 SQ. FT.',
    plotSize: '40 × 60 FT (2,400 Sq.Ft)',
    timeline: '9.5 Months (Completed on Schedule)',
    budgetTier: '₹2,150 / Sq.Ft (Premium Turnkey)',
    concreteGrade: 'M25 Ready-Mix Concrete',
    steelGrade: 'Tata Tiscon Fe-550D TMT',
    seismicZone: 'Zone III Certified (IS 1893:2016)',
    heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    cadBlueprintImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85',
    droneImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=85',
    clientName: 'Dr. R. K. Srivastava & Family',
    status: 'Turnkey Handover',
    keyHighlights: [
      'Italian Statuario Marble Flooring throughout Living & Dining',
      'Saint-Gobain 12mm Toughened Balcony Glass with Grade 304 SS Spigots',
      'Structural Steel Terrace Pergola with Weather-Resistant Coating',
      'Double-Damp Proof Course (DPC) & 10-Yr Waterproofing Shield'
    ]
  },
  {
    id: 'commercial-plaza-station-road',
    tag: 'COMMERCIAL LANDMARK #ASC-PLAZA',
    title: 'The Royal Commerce Arcade & Suites',
    subtitle: 'Heavy Commercial RCC Framing with Pillarless Showroom Spans & Full Glass Curtain Wall',
    location: 'Station Road, Carpet City, Bhadohi',
    coordinates: '25.4012° N, 82.5802° E',
    builtUpArea: '6,400 SQ. FT.',
    plotSize: '50 × 80 FT (4,000 Sq.Ft)',
    timeline: '13 Months (Completed)',
    budgetTier: '₹1,950 / Sq.Ft (Commercial RCC)',
    concreteGrade: 'M30 High-Strength Design Mix',
    steelGrade: 'SAIL Fe-550D Corrosion Resistant',
    seismicZone: 'Zone III High-Ductility Ductile Detailing',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2000&q=85',
    cadBlueprintImage: 'https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?auto=format&fit=crop&w=2000&q=85',
    droneImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=85',
    clientName: 'Al-Hasan Carpet Exports Pvt. Ltd.',
    status: 'Turnkey Handover',
    keyHighlights: [
      'Heavy Column Footings Designed for Future G+4 Expansion',
      'Schindler High-Speed Elevator Shaft with RCC Shear Walls',
      'Full Structural Glazing Elevation with Low-E Acoustic Glass',
      'Industrial Underground 20,000L Fire & Domestic Water Sump'
    ]
  },
  {
    id: 'modern-family-home-maryadpatti',
    tag: 'RESIDENTIAL HAVEN #ASC-MARYAD',
    title: 'The Courtyard Villa & Green Roof',
    subtitle: 'Modern Fusion Architecture with Natural Light Courtyard, Louvered Facade & Private Terrace',
    location: 'Maryadpatti Main Road, Bhadohi',
    coordinates: '25.3910° N, 82.5645° E',
    builtUpArea: '2,850 SQ. FT.',
    plotSize: '35 × 55 FT (1,925 Sq.Ft)',
    timeline: '8 Months (In Final Finishing)',
    budgetTier: '₹2,350 / Sq.Ft (Luxury Bespoke)',
    concreteGrade: 'M25 Machine-Batched RCC',
    steelGrade: 'Jindal Panther Fe-550D Rebars',
    seismicZone: 'Zone III Multi-Tie Reinforcement',
    heroImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85',
    cadBlueprintImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=85',
    droneImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=85',
    clientName: 'Er. Ankit Mishra & Family',
    status: 'RCC Finishing',
    keyHighlights: [
      'Central Skylight Open Courtyard for Natural Cross-Ventilation',
      'Teakwood Flush Doors with Smart Biometric Mortise Locks',
      'Solar-Ready Roof Deck with Heat-Reflective Thermal Ceramic Tiles',
      'Concealed Finolex Fire-Retardant PVC Wiring & Havells Modular Grid'
    ]
  }
];

type ViewPerspective = 'turnkey' | 'cad-xray' | 'drone-telemetry';

export const CinematicIndustryHero: React.FC<{
  onNavigate: (href: string) => void;
  onOpenQuoteModal: () => void;
  onOpenConsultationModal: () => void;
}> = ({ onNavigate, onOpenQuoteModal, onOpenConsultationModal }) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState<number>(0);
  const [perspective, setPerspective] = useState<ViewPerspective>('turnkey');
  const [isPlayingAutoReel, setIsPlayingAutoReel] = useState<boolean>(true);
  const [showTechSpecDrawer, setShowTechSpecDrawer] = useState<boolean>(false);
  const [reelProgress, setReelProgress] = useState<number>(0);

  const activeProject = CINEMATIC_PROJECTS[activeProjectIdx];

  // Auto-advancing Cinematic Reel with smooth progress timer
  useEffect(() => {
    if (!isPlayingAutoReel) return;

    const interval = 60; // tick every 60ms
    const totalDuration = 7000; // 7 seconds per project
    const step = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setReelProgress((prev) => {
        if (prev >= 100) {
          setActiveProjectIdx((curr) => (curr + 1) % CINEMATIC_PROJECTS.length);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlayingAutoReel, activeProjectIdx]);

  const handleSelectProject = (idx: number) => {
    setActiveProjectIdx(idx);
    setReelProgress(0);
  };

  const getActiveImage = () => {
    if (perspective === 'cad-xray') return activeProject.cadBlueprintImage;
    if (perspective === 'drone-telemetry') return activeProject.droneImage;
    return activeProject.heroImage;
  };

  return (
    <section className="relative bg-[#070F1E] text-white border-b border-[#132742] overflow-hidden select-none">
      {/* 1. ULTRA HIGH-DEFINITION CINEMATIC HERO VIEWPORT */}
      <div className="relative w-full min-h-[600px] lg:min-h-[720px] xl:min-h-[780px] flex flex-col justify-between">
        {/* Dynamic Background Image with Smooth Cross-Fade & Architectural Grading */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            key={`${activeProject.id}-${perspective}`}
            src={getActiveImage()}
            alt={activeProject.title}
            className={`w-full h-full object-cover transition-all duration-1000 transform scale-105 ${
              perspective === 'cad-xray'
                ? 'filter contrast-150 brightness-75 hue-rotate-190 saturate-200'
                : perspective === 'drone-telemetry'
                ? 'filter contrast-110 brightness-70 grayscale-[30%]'
                : 'filter brightness-[0.75] contrast-[1.08]'
            }`}
          />

          {/* Blueprint Engineering Grid Overlay in CAD Mode */}
          {perspective === 'cad-xray' && (
            <div className="absolute inset-0 bg-blueprint-dark opacity-80 pointer-events-none" />
          )}

          {/* Drone Telemetry HUD Overlay in Drone Mode */}
          {perspective === 'drone-telemetry' && (
            <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" />
          )}

          {/* Cinematic Vignette, Dark Scrim & Top/Bottom Atmosphere */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070F1E] via-[#070F1E]/50 to-[#070F1E]/70 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070F1E]/90 via-[#070F1E]/40 to-transparent pointer-events-none" />
        </div>

        {/* ========================================================= */}
        {/* TOP TELEMETRY BAR: GPS, STRUCTURAL CODES & LIVE SITE FEED */}
        {/* ========================================================= */}
        <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-5 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
            {/* Regional GPS & Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0A1628]/90 border border-white/15 backdrop-blur-md text-[11px] font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E58A1F] animate-pulse" />
                <span className="font-bold text-white tracking-wider">ABDUL SALAM CONSTRUCTION</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-300">EST. 2008</span>
              </div>

              <div className="hidden md:flex items-center gap-1.5 text-[11px] font-mono text-gray-300 bg-[#070F1E]/60 px-2.5 py-1 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#E58A1F]" />
                <span>{activeProject.coordinates} • Bhadohi, UP</span>
              </div>
            </div>

            {/* View Perspective Switchers (4K Turnkey / CAD Blueprint / Drone Telemetry) */}
            <div className="flex items-center gap-1 bg-[#070F1E]/90 border border-[#1E3A5F] p-1 backdrop-blur-md">
              <button
                onClick={() => setPerspective('turnkey')}
                className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  perspective === 'turnkey'
                    ? 'bg-[#E58A1F] text-white font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>4K Turnkey Villa</span>
              </button>

              <button
                onClick={() => setPerspective('cad-xray')}
                className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  perspective === 'cad-xray'
                    ? 'bg-[#00E5FF] text-black font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Structural CAD X-Ray</span>
              </button>

              <button
                onClick={() => setPerspective('drone-telemetry')}
                className={`px-3 py-1.5 text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  perspective === 'drone-telemetry'
                    ? 'bg-emerald-500 text-black font-bold shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>Drone Site Survey</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN CINEMATIC HERO DISPLAY & EDITORIAL CONTENT          */}
        {/* ========================================================= */}
        <div className="relative z-20 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 lg:py-14 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
            {/* Left Col: Master Architectural Headline & Value Proposition */}
            <div className="lg:col-span-8 space-y-6">
              {/* Project Tag & Status Pill */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 bg-[#E58A1F] text-white text-[11px] font-mono font-black uppercase tracking-wider shadow-lg">
                  {activeProject.tag}
                </span>

                <span className="px-3 py-1 bg-[#0A1628]/90 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-semibold backdrop-blur-md">
                  ● {activeProject.status}
                </span>

                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-black/60 border border-white/10 text-[11px] font-mono text-gray-300 backdrop-blur-md">
                  <Clock className="w-3 h-3 text-[#E58A1F]" />
                  <span>{activeProject.timeline}</span>
                </span>
              </div>

              {/* Master Headline Display */}
              <div className="space-y-2">
                <h1 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] text-white text-balance drop-shadow-2xl">
                  {activeProject.title}
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-2xl leading-relaxed font-sans drop-shadow-md">
                  {activeProject.subtitle}
                </p>
              </div>

              {/* Live Project Specs Matrix Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-3xl">
                <div className="bg-[#0A1628]/90 border border-white/10 p-3 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">Built-up Footprint</span>
                  <span className="font-mono font-bold text-sm sm:text-base text-white">{activeProject.builtUpArea}</span>
                  <span className="block text-[10px] text-[#E58A1F]">{activeProject.plotSize}</span>
                </div>

                <div className="bg-[#0A1628]/90 border border-white/10 p-3 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">RCC Mix Standard</span>
                  <span className="font-mono font-bold text-sm sm:text-base text-white">{activeProject.concreteGrade}</span>
                  <span className="block text-[10px] text-gray-400">IS 456 Compliant</span>
                </div>

                <div className="bg-[#0A1628]/90 border border-white/10 p-3 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">Rebar Specification</span>
                  <span className="font-mono font-bold text-sm sm:text-base text-[#E58A1F]">{activeProject.steelGrade}</span>
                  <span className="block text-[10px] text-gray-400">High Ductility</span>
                </div>

                <div className="bg-[#0A1628]/90 border border-white/10 p-3 backdrop-blur-md">
                  <span className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider">Seismic Safety</span>
                  <span className="font-mono font-bold text-sm sm:text-base text-emerald-400">Zone III Earth Safe</span>
                  <span className="block text-[10px] text-gray-400">30-Yr Warranty</span>
                </div>
              </div>

              {/* Call-to-Action Suite */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={onOpenQuoteModal}
                  className="font-black text-sm shadow-xl shadow-[#E58A1F]/25 px-6 py-3.5"
                >
                  GET ITEMIZED BOQ QUOTE
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={onOpenConsultationModal}
                  className="border-white/20 text-white hover:bg-white hover:text-[#070F1E] font-bold backdrop-blur-md"
                >
                  Book Free Site Soil Survey
                </Button>

                <button
                  type="button"
                  onClick={() => setShowTechSpecDrawer(!showTechSpecDrawer)}
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-[#0D1E38]/90 border border-[#1E3A5F] text-xs font-mono text-gray-200 hover:text-white hover:border-[#E58A1F] transition-all cursor-pointer backdrop-blur-md"
                >
                  <Sliders className="w-3.5 h-3.5 text-[#E58A1F]" />
                  <span>{showTechSpecDrawer ? 'Hide Engineering Specs' : 'View Engineering Specs'}</span>
                </button>
              </div>
            </div>

            {/* Right Col: Client Verification & Live Telemetry Card */}
            <div className="lg:col-span-4 space-y-4">
              {/* Engineering Verification Badge */}
              <div className="bg-[#0A1628]/95 border border-[#1E3A5F] p-4 sm:p-5 backdrop-blur-xl shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#E58A1F]" />
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                      Turnkey Contract Guarantee
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 border border-emerald-500/30">
                    100% VERIFIED
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span><strong>Zero Cost Escalation:</strong> Final BOQ rate locked upon agreement signing.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span><strong>Daily Digital Log:</strong> Daily photo & cube test updates shared with homeowner.</span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-[#E58A1F] flex-shrink-0 mt-0.5" />
                    <span><strong>Stage-Wise Escrow:</strong> Pay only after milestone structural inspection pass.</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-gray-400">
                  <span>Client: <strong>{activeProject.clientName}</strong></span>
                  <span className="text-[#E58A1F]">{activeProject.budgetTier}</span>
                </div>
              </div>

              {/* Interactive Audio/Reel Auto-Play HUD */}
              <div className="flex items-center justify-between bg-[#0A1628]/80 border border-white/10 px-3.5 py-2 backdrop-blur-md text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingAutoReel(!isPlayingAutoReel)}
                    className="p-1 hover:text-[#E58A1F] transition-colors cursor-pointer text-gray-300"
                    title={isPlayingAutoReel ? 'Pause Auto Reel' : 'Play Auto Reel'}
                  >
                    {isPlayingAutoReel ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span className="text-gray-400">
                    {isPlayingAutoReel ? 'Cinematic Auto-Play Active' : 'Auto-Play Paused'}
                  </span>
                </div>

                <span className="text-gray-400">
                  <strong className="text-[#E58A1F]">{activeProjectIdx + 1}</strong> / {CINEMATIC_PROJECTS.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* EXPANDABLE ENGINEERING TECHNICAL SPECS DRAWER            */}
        {/* ========================================================= */}
        {showTechSpecDrawer && (
          <div className="relative z-30 bg-[#070F1E]/98 border-t border-b border-[#E58A1F]/40 p-5 sm:p-6 md:p-8 backdrop-blur-2xl animate-in slide-in-from-bottom-4 duration-300">
            <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#E58A1F]" />
                  <h4 className="font-heading font-black text-base text-white uppercase tracking-wider">
                    Full Civil & Architectural Deliverable Matrix — {activeProject.title}
                  </h4>
                </div>
                <button
                  onClick={() => setShowTechSpecDrawer(false)}
                  className="text-gray-400 hover:text-white font-mono text-xs px-2.5 py-1 border border-white/10 cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5 text-[#E58A1F]" />
                  <span>Close Spec Sheet</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                {activeProject.keyHighlights.map((hl, i) => (
                  <div key={i} className="bg-[#0B1B3D] border border-white/10 p-4 space-y-1.5 shadow-sm">
                    <div className="flex items-center gap-2 text-[#E58A1F] font-mono font-bold text-[11px]">
                      <span>0{i + 1}. SPECIFICATION</span>
                    </div>
                    <p className="text-gray-200 leading-relaxed font-sans">{hl}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* BOTTOM CINEMATIC PROJECT SELECTOR & REEL PROGRESS BAR     */}
        {/* ========================================================= */}
        <div className="relative z-20 bg-[#070F1E]/95 border-t border-[#132742] backdrop-blur-xl">
          {/* Active Reel Linear Progress Bar */}
          <div className="w-full h-1.5 bg-[#10223B] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#E58A1F] to-[#FFA666] transition-all duration-75"
              style={{ width: `${reelProgress}%` }}
            />
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-3.5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Left Project Switcher Tabs */}
              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
                {CINEMATIC_PROJECTS.map((proj, idx) => {
                  const isSelected = activeProjectIdx === idx;
                  return (
                    <button
                      key={proj.id}
                      onClick={() => handleSelectProject(idx)}
                      className={`flex items-center gap-2.5 px-3 py-2 text-left border transition-all cursor-pointer flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#0E2242] border-[#E58A1F] text-white shadow-lg'
                          : 'bg-[#091424] border-[#193254] text-gray-400 hover:text-white hover:border-gray-600'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 ${
                        isSelected ? 'bg-[#E58A1F] text-white' : 'bg-black/50 text-gray-400'
                      }`}>
                        0{idx + 1}
                      </span>
                      <div className="text-xs font-mono leading-tight">
                        <div className="font-bold text-gray-200 truncate max-w-[160px] sm:max-w-[200px]">
                          {proj.title}
                        </div>
                        <div className="text-[10px] text-gray-500">{proj.location.split(',')[0]}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right: Office & Direct Line Quick Access */}
              <div className="flex items-center gap-3 text-xs font-mono text-gray-400 flex-shrink-0">
                <button
                  type="button"
                  onClick={onOpenConsultationModal}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0B1B3D] border border-[#1E3A5F] hover:border-[#E58A1F] text-gray-200 hover:text-white transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 text-[#E58A1F]" />
                  <span>Request Site Inspection</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
