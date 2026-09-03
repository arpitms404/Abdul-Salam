import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { HouseModel, RenderMode, LightingMode, ARCHITECTURAL_HOTSPOTS } from './HouseModel';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { X } from 'lucide-react';

export type CameraViewPreset = 'iso' | 'front' | 'top';

interface SceneContentProps {
  progress: number;
  isAutoRotating: boolean;
  isMobile: boolean;
  renderMode: RenderMode;
  lightingMode: LightingMode;
  cameraView: CameraViewPreset;
  showHotspots: boolean;
  activeHotspot: string | null;
  onSelectHotspot: (id: string | null) => void;
}

// Camera Director component that smoothly interpolates camera position when presets change
const CameraDirector: React.FC<{ cameraView: CameraViewPreset }> = ({ cameraView }) => {
  const { camera } = useThree();
  const targetPos = useMemo(() => {
    switch (cameraView) {
      case 'front': return new THREE.Vector3(0, 1.8, 7.2);
      case 'top': return new THREE.Vector3(0.01, 8.2, 3.2);
      case 'iso':
      default: return new THREE.Vector3(5.6, 3.6, 6.0);
    }
  }, [cameraView]);

  useFrame((_, delta) => {
    camera.position.lerp(targetPos, delta * 3.5);
  });

  return null;
};

const SceneContent: React.FC<SceneContentProps> = ({
  progress,
  isAutoRotating,
  isMobile,
  renderMode,
  lightingMode,
  cameraView,
  showHotspots,
  activeHotspot,
  onSelectHotspot
}) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Background and Fog colors based on Lighting Mode
  const bgCol = useMemo(() => {
    if (lightingMode === 'night') return '#0A0B0E';
    if (lightingMode === 'day') return '#1A1E24';
    return '#111215'; // Dusk
  }, [lightingMode]);

  const fogCol = useMemo(() => {
    if (lightingMode === 'night') return '#0A0B0E';
    if (lightingMode === 'day') return '#1A1E24';
    return '#111215';
  }, [lightingMode]);

  const envPreset = useMemo(() => {
    if (lightingMode === 'night') return 'city';
    if (lightingMode === 'day') return 'apartment';
    return 'sunset';
  }, [lightingMode]);

  return (
    <>
      {/* Background Studio Tint */}
      <color attach="background" args={[bgCol]} />

      {/* Atmospheric Fog for Depth */}
      <fog attach="fog" args={[fogCol, 10, 26]} />

      {/* Dynamic Perspective Camera */}
      <PerspectiveCamera makeDefault position={[5.6, 3.6, 6.0]} fov={39} />
      <CameraDirector cameraView={cameraView} />

      {/* 1. ENVIRONMENT HDRI PRESET */}
      <Suspense fallback={null}>
        <Environment preset={envPreset} environmentIntensity={lightingMode === 'day' ? 1.1 : lightingMode === 'night' ? 0.35 : 0.8} />
      </Suspense>

      {/* 2. DYNAMIC LIGHTING RIG */}
      {/* Ambient Light */}
      <ambientLight
        intensity={lightingMode === 'day' ? 0.75 : lightingMode === 'night' ? 0.15 : 0.35}
        color={lightingMode === 'night' ? '#7090C0' : '#FFE6CF'}
      />

      {/* Hemisphere Sky/Ground Balance */}
      <hemisphereLight
        args={[
          lightingMode === 'day' ? '#EBF4FF' : lightingMode === 'night' ? '#203A60' : '#7E98BC',
          lightingMode === 'day' ? '#A3B18A' : '#B87B4C',
          lightingMode === 'day' ? 0.9 : 0.5
        ]}
        position={[0, 20, 0]}
      />

      {/* Strong Key Directional Sun */}
      <directionalLight
        position={lightingMode === 'day' ? [5, 14, 8] : [8, 12, 6]}
        intensity={lightingMode === 'day' ? 3.4 : lightingMode === 'night' ? 0.6 : 2.8}
        color={lightingMode === 'day' ? '#FFFFFF' : lightingMode === 'night' ? '#80A8FF' : '#FFF0DB'}
        castShadow
        shadow-mapSize-width={isMobile ? 1024 : 2048}
        shadow-mapSize-height={isMobile ? 1024 : 2048}
        shadow-camera-near={0.5}
        shadow-camera-far={26}
        shadow-camera-left={-5.5}
        shadow-camera-right={5.5}
        shadow-camera-top={5.5}
        shadow-camera-bottom={-5.5}
        shadow-bias={-0.0002}
        shadow-normalBias={0.025}
      />

      {/* Secondary Cool Fill Light */}
      <directionalLight
        position={[-6.5, 5, -5]}
        intensity={lightingMode === 'night' ? 0.3 : 0.65}
        color="#8CA6C5"
      />

      {/* Warm Facade Rim Light */}
      <directionalLight
        position={[-4.5, 3.5, 4.5]}
        intensity={lightingMode === 'night' ? 0.6 : 0.45}
        color="#FFA352"
      />

      {/* Architectural Wall Sconce Glow Points (Intensified at Night/Dusk) */}
      <pointLight
        position={[0.95, 1.8, 1.6]}
        intensity={lightingMode === 'night' ? 5.5 : 2.8}
        distance={5.5}
        decay={2}
        color="#FFA726"
      />
      <pointLight
        position={[-0.6, 0.9, 1.8]}
        intensity={lightingMode === 'night' ? 3.8 : 1.8}
        distance={4.5}
        decay={2}
        color="#FFB366"
      />
      {lightingMode === 'night' && (
        <pointLight
          position={[0, 1.2, 0.2]}
          intensity={4.0}
          distance={6}
          decay={2}
          color="#FFE082"
        />
      )}

      {/* 3. THE 3D DUPLEX MODEL */}
      <HouseModel
        animationProgress={progress}
        isAutoRotating={isAutoRotating}
        renderMode={renderMode}
        lightingMode={lightingMode}
        showHotspots={showHotspots}
        activeHotspot={activeHotspot}
        onSelectHotspot={onSelectHotspot}
      />

      {/* 4. GROUND CONTACT SHADOWS */}
      <ContactShadows
        position={[0, -0.76, 0]}
        opacity={lightingMode === 'night' ? 0.95 : 0.85}
        scale={14}
        blur={1.8}
        far={4.5}
        color="#07080B"
      />

      {/* 5. ARCHITECTURAL BLUEPRINT GRID */}
      <group position={[0, -0.75, 0]}>
        <gridHelper
          args={[14, 18, renderMode === 'wireframe' ? '#00E5FF' : '#E58A1F', renderMode === 'wireframe' ? '#1C3144' : '#22252C']}
        />
      </group>

      {/* 6. POST-PROCESSING BLOOM & VIGNETTE */}
      {!isMobile && (
        <EffectComposer enableNormalPass={false} multisampling={4}>
          <Bloom
            luminanceThreshold={lightingMode === 'night' ? 0.75 : 0.88}
            luminanceSmoothing={0.2}
            intensity={lightingMode === 'night' ? 1.1 : 0.65}
            radius={0.65}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.3} darkness={0.45} />
        </EffectComposer>
      )}

      {/* 7. 360° ORBIT CONTROLS */}
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3.8}
        maxDistance={10.5}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2 - 0.05}
        dampingFactor={0.05}
        rotateSpeed={0.6}
        autoRotate={false}
      />
    </>
  );
};

interface Hero3DHouseSceneProps {
  isVisible?: boolean;
  onPhaseChange?: (phaseName: string) => void;
  renderMode?: RenderMode;
  lightingMode?: LightingMode;
  cameraView?: CameraViewPreset;
  showHotspots?: boolean;
  activeHotspot?: string | null;
  onSelectHotspot?: (id: string | null) => void;
}

export const Hero3DHouseScene: React.FC<Hero3DHouseSceneProps> = ({
  isVisible = true,
  onPhaseChange,
  renderMode = 'pbr',
  lightingMode = 'dusk',
  cameraView = 'iso',
  showHotspots = true,
  activeHotspot = null,
  onSelectHotspot = () => {}
}) => {
  const [progress, setProgress] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [activeStage, setActiveStage] = useState<string>('Foundation');
  const animStartTimeRef = useRef<number | null>(null);

  // Check mobile device for performance tiering
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Construction Stages Info
  const getStageName = (p: number) => {
    if (p < 0.22) return '1/5: Excavation & RCC Plinth';
    if (p < 0.48) return '2/5: Columns & Brick Masonry';
    if (p < 0.70) return '3/5: Mid-Slab & Balcony Framing';
    if (p < 0.88) return '4/5: Roof Slab & Steel Pergola';
    return '5/5: Turnkey Glass & Finishing';
  };

  // Run the smooth staggered construction build sequence on mount
  useEffect(() => {
    let animationFrameId: number;
    const duration = 3400; // 3.4 seconds total build sequence
    animStartTimeRef.current = performance.now();

    const animate = (time: number) => {
      if (!animStartTimeRef.current) animStartTimeRef.current = time;
      const elapsed = time - animStartTimeRef.current;
      const rawP = Math.min(elapsed / duration, 1);
      
      setProgress(rawP);
      const stage = getStageName(rawP);
      setActiveStage(stage);
      if (onPhaseChange) onPhaseChange(stage);

      if (rawP < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleReplay = () => {
    setProgress(0);
    animStartTimeRef.current = performance.now();

    const duration = 3200;
    const animate = (time: number) => {
      if (!animStartTimeRef.current) animStartTimeRef.current = time;
      const elapsed = time - animStartTimeRef.current;
      const rawP = Math.min(elapsed / duration, 1);
      
      setProgress(rawP);
      const stage = getStageName(rawP);
      setActiveStage(stage);
      if (onPhaseChange) onPhaseChange(stage);

      if (rawP < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  };

  const jumpToStage = (stageP: number) => {
    setProgress(stageP);
    const stage = getStageName(stageP);
    setActiveStage(stage);
    if (onPhaseChange) onPhaseChange(stage);
  };

  const selectedHotspotData = useMemo(() => {
    if (!activeHotspot) return null;
    return ARCHITECTURAL_HOTSPOTS.find((h) => h.id === activeHotspot) || null;
  }, [activeHotspot]);

  return (
    <div className="w-full h-full relative select-none">
      {/* 3D WebGL Canvas with ACES Filmic ToneMapping */}
      <Canvas
        shadows="soft"
        dpr={[1, isMobile ? 1.2 : 1.8]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: lightingMode === 'night' ? 1.25 : 1.15
        }}
        frameloop={isVisible ? 'always' : 'never'}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <SceneContent
          progress={progress}
          isAutoRotating={isVisible && isAutoRotating}
          isMobile={isMobile}
          renderMode={renderMode}
          lightingMode={lightingMode}
          cameraView={cameraView}
          showHotspots={showHotspots}
          activeHotspot={activeHotspot}
          onSelectHotspot={onSelectHotspot}
        />
      </Canvas>

      {/* Top HUD: Current Construction Milestone & Model Reference */}
      <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-[#121316]/90 backdrop-blur-md border border-[#2A2E35] px-3 py-1.5 text-xs text-white shadow-xl">
          <span className="w-2 h-2 rounded-full bg-[#E58A1F] animate-pulse" />
          <span className="font-mono text-[11px] font-bold text-gray-200 uppercase tracking-wider">
            {activeStage}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-[#121316]/90 backdrop-blur-md border border-[#2A2E35] px-3 py-1.5 text-[11px] font-mono text-gray-300 shadow-xl">
          <span className="text-[#E58A1F] font-black">2,450 SQ.FT</span>
          <span className="text-gray-500">|</span>
          <span>G+1 DUPLEX VILLA</span>
        </div>
      </div>

      {/* Selected Hotspot Detail Inspection Card */}
      {selectedHotspotData && (
        <div className="absolute top-12 right-3 max-w-xs bg-[#14161A]/95 backdrop-blur-lg border border-[#E58A1F]/60 p-3.5 shadow-2xl z-20 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-0.5">
              <span className="inline-block px-1.5 py-0.5 bg-[#E58A1F]/20 text-[#E58A1F] font-mono text-[10px] font-bold uppercase tracking-wider">
                {selectedHotspotData.tag}
              </span>
              <h5 className="font-heading font-black text-sm text-white">
                {selectedHotspotData.title}
              </h5>
            </div>
            <button
              onClick={() => onSelectHotspot(null)}
              className="text-gray-400 hover:text-white p-0.5 rounded-xs transition-colors cursor-pointer"
              aria-label="Close hotspot detail"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-xs text-gray-300 mt-2 leading-relaxed">
            {selectedHotspotData.spec}
          </p>
        </div>
      )}

      {/* Bottom HUD: Stage Scrubbers & Interactive Controls */}
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-auto z-10">
        {/* Stage Selector Stepper */}
        <div className="flex items-center gap-1 bg-[#121316]/95 backdrop-blur-md border border-[#2A2E35] p-1 text-[10px] font-bold uppercase tracking-wider shadow-xl">
          <button
            onClick={() => jumpToStage(0.18)}
            className={`px-2 py-1 transition-all cursor-pointer ${
              progress <= 0.25
                ? 'bg-[#E58A1F] text-white font-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Plinth
          </button>
          <button
            onClick={() => jumpToStage(0.45)}
            className={`px-2 py-1 transition-all cursor-pointer ${
              progress > 0.25 && progress <= 0.55
                ? 'bg-[#E58A1F] text-white font-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Masonry
          </button>
          <button
            onClick={() => jumpToStage(0.68)}
            className={`px-2 py-1 transition-all cursor-pointer ${
              progress > 0.55 && progress <= 0.85
                ? 'bg-[#E58A1F] text-white font-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mid-Slab
          </button>
          <button
            onClick={() => jumpToStage(0.88)}
            className={`px-2 py-1 transition-all cursor-pointer ${
              progress > 0.85 && progress < 0.98
                ? 'bg-[#E58A1F] text-white font-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Roof
          </button>
          <button
            onClick={() => jumpToStage(1.0)}
            className={`px-2 py-1 transition-all cursor-pointer ${
              progress >= 0.98
                ? 'bg-[#E58A1F] text-white font-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Turnkey
          </button>
        </div>

        {/* Quick Actions (Replay & Rotate toggle) */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsAutoRotating(!isAutoRotating)}
            title={isAutoRotating ? 'Pause Orbit' : 'Resume Orbit'}
            className="bg-[#121316]/95 backdrop-blur-md border border-[#2A2E35] hover:border-[#E58A1F] px-2.5 py-1.5 text-[10px] font-bold text-gray-300 hover:text-white uppercase tracking-wider transition-all cursor-pointer"
          >
            {isAutoRotating ? 'Pause 360°' : 'Resume 360°'}
          </button>

          <button
            onClick={handleReplay}
            title="Replay Construction Assembly"
            className="bg-[#E58A1F] hover:bg-[#d96614] text-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-all shadow-lg cursor-pointer flex items-center gap-1"
          >
            <span>Replay Assembly</span>
          </button>
        </div>
      </div>

      {/* Gentle interaction hint */}
      <div className="absolute bottom-12 right-3 pointer-events-none hidden md:block">
        <span className="text-[9px] font-mono text-gray-400 bg-black/60 px-2 py-0.5 border border-white/10">
          Drag to Orbit • Scroll to Zoom • Tap Hotspots
        </span>
      </div>
    </div>
  );
};
