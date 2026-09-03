import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import {
  HardHat,
  Compass,
  Layers,
  Sun,
  Sunset,
  Moon,
  Box,
  Grid,
  Eye,
  Camera,
  Tag,
  Info
} from 'lucide-react';
import type { RenderMode, LightingMode } from './HouseModel';
import type { CameraViewPreset } from './Hero3DHouseScene';

// Lazy load the 3D scene to keep initial bundle light and performant
const Hero3DHouseScene = lazy(() =>
  import('./Hero3DHouseScene').then((module) => ({
    default: module.Hero3DHouseScene
  }))
);

// Fallback Blueprint Skeleton shown while Three.js WebGL context initializes
const Hero3DFallback: React.FC = () => {
  return (
    <div className="w-full h-full min-h-[360px] flex flex-col items-center justify-center bg-[#111317] border border-[#262A32] relative overflow-hidden p-6 text-center">
      {/* Background blueprint grid */}
      <div className="absolute inset-0 bg-blueprint-dark opacity-30" />
      
      {/* Animated center construction icon */}
      <div className="relative z-10 space-y-4">
        <div className="w-16 h-16 mx-auto bg-[#E58A1F]/10 border border-[#E58A1F]/40 flex items-center justify-center text-[#E58A1F] animate-pulse shadow-lg">
          <HardHat className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-[#E58A1F]">
            <Compass className="w-3.5 h-3.5 animate-spin text-[#E58A1F]" />
            <span>Initializing 3D BIM Engine</span>
          </div>
          <h4 className="font-heading font-black text-base text-white tracking-wide">
            Loading Duplex Architectural Asset...
          </h4>
        </div>

        {/* Loading bar */}
        <div className="w-52 h-1.5 bg-[#1E222A] mx-auto overflow-hidden rounded-full border border-white/5">
          <div className="w-full h-full bg-[#E58A1F] animate-progress origin-left" />
        </div>

        <p className="text-[11px] text-gray-400 font-mono">
          M25 RCC Footing • Fe-550 TMT Rebar • PBR Shaders
        </p>
      </div>

      {/* Decorative corner crosshairs */}
      <div className="absolute top-2.5 left-2.5 text-[10px] font-mono text-gray-600">+</div>
      <div className="absolute top-2.5 right-2.5 text-[10px] font-mono text-gray-600">+</div>
      <div className="absolute bottom-2.5 left-2.5 text-[10px] font-mono text-gray-600">+</div>
      <div className="absolute bottom-2.5 right-2.5 text-[10px] font-mono text-gray-600">+</div>
    </div>
  );
};

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Interactive Viewport Controls State
  const [lightingMode, setLightingMode] = useState<LightingMode>('dusk');
  const [renderMode, setRenderMode] = useState<RenderMode>('pbr');
  const [cameraView, setCameraView] = useState<CameraViewPreset>('iso');
  const [showHotspots, setShowHotspots] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Performance optimization: Pause rendering & rotation when scrolled off-screen
  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[380px] sm:h-[440px] md:h-[500px] lg:h-[560px] bg-[#0E1014] border border-[#262B34] shadow-2xl overflow-hidden group"
    >
      {/* Top Architectural Studio Telemetry & Mode Selector Bar */}
      <div className="absolute top-0 left-0 right-0 bg-[#13161C]/95 backdrop-blur-md border-b border-[#262B34] px-3 py-2 flex flex-wrap items-center justify-between gap-2 z-20">
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E58A1F] animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <span className="text-[11px] font-mono text-gray-200 font-bold uppercase tracking-wider">
            ASC BIM Studio 3D
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-gray-500 bg-[#1B2028] px-2 py-0.5 border border-white/5">
            v2.6 LIVE
          </span>
        </div>

        {/* Center/Right: Viewport Quick Switches */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Lighting Mode Selector */}
          <div className="flex items-center bg-[#1A1E26] border border-[#2D333F] p-0.5 text-[10px] font-mono">
            <button
              onClick={() => setLightingMode('dusk')}
              title="Golden Hour Dusk Lighting"
              className={`px-2 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                lightingMode === 'dusk' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sunset className="w-3 h-3" />
              <span className="hidden md:inline">Dusk</span>
            </button>
            <button
              onClick={() => setLightingMode('day')}
              title="Bright Studio Daylight"
              className={`px-2 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                lightingMode === 'day' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span className="hidden md:inline">Day</span>
            </button>
            <button
              onClick={() => setLightingMode('night')}
              title="Midnight Architectural Glow"
              className={`px-2 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                lightingMode === 'night' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span className="hidden md:inline">Night</span>
            </button>
          </div>

          {/* Render Mode Switcher */}
          <div className="flex items-center bg-[#1A1E26] border border-[#2D333F] p-0.5 text-[10px] font-mono">
            <button
              onClick={() => setRenderMode('pbr')}
              title="Photorealistic PBR Textures"
              className={`px-2 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                renderMode === 'pbr' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Box className="w-3 h-3" />
              <span className="hidden md:inline">PBR</span>
            </button>
            <button
              onClick={() => setRenderMode('wireframe')}
              title="Blueprint Wireframe X-Ray"
              className={`px-2 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                renderMode === 'wireframe' ? 'bg-[#00E5FF] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span className="hidden md:inline">Blueprint</span>
            </button>
            <button
              onClick={() => setRenderMode('exploded')}
              title="Exploded BIM Levels View"
              className={`px-2 py-1 flex items-center gap-1 transition-all cursor-pointer ${
                renderMode === 'exploded' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span className="hidden md:inline">Exploded</span>
            </button>
          </div>

          {/* Camera Angles */}
          <div className="hidden lg:flex items-center bg-[#1A1E26] border border-[#2D333F] p-0.5 text-[10px] font-mono">
            <button
              onClick={() => setCameraView('iso')}
              title="3/4 Isometric Perspective"
              className={`px-2 py-1 transition-all cursor-pointer ${
                cameraView === 'iso' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              3/4 Iso
            </button>
            <button
              onClick={() => setCameraView('front')}
              title="Front Elevation View"
              className={`px-2 py-1 transition-all cursor-pointer ${
                cameraView === 'front' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Elevation
            </button>
            <button
              onClick={() => setCameraView('top')}
              title="Rooftop Masterplan"
              className={`px-2 py-1 transition-all cursor-pointer ${
                cameraView === 'top' ? 'bg-[#E58A1F] text-white font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              Terrace
            </button>
          </div>

          {/* Hotspots Toggle */}
          <button
            onClick={() => {
              setShowHotspots(!showHotspots);
              if (showHotspots) setActiveHotspot(null);
            }}
            title={showHotspots ? 'Hide Material Hotspots' : 'Show Material Hotspots'}
            className={`px-2 py-1 text-[10px] font-mono border border-[#2D333F] flex items-center gap-1 transition-all cursor-pointer ${
              showHotspots
                ? 'bg-[#E58A1F]/20 border-[#E58A1F] text-[#E58A1F] font-bold'
                : 'bg-[#1A1E26] text-gray-400 hover:text-white'
            }`}
          >
            <Tag className="w-3 h-3" />
            <span className="hidden sm:inline">Pins</span>
          </button>
        </div>
      </div>

      {/* Suspense Lazy WebGL Scene */}
      <div className="w-full h-full pt-10">
        <Suspense fallback={<Hero3DFallback />}>
          <Hero3DHouseScene
            isVisible={isVisible}
            renderMode={renderMode}
            lightingMode={lightingMode}
            cameraView={cameraView}
            showHotspots={showHotspots}
            activeHotspot={activeHotspot}
            onSelectHotspot={setActiveHotspot}
          />
        </Suspense>
      </div>

      {/* Architectural Corner Machined Accents */}
      <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[#E58A1F] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[#E58A1F] pointer-events-none" />
    </div>
  );
};
