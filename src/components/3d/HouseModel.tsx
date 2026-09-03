import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural texture generators for photorealistic architectural finishes
function createPlasterBumpTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, 256, 256);

  // Subtle architectural micro-stucco noise
  const imgData = ctx.getImageData(0, 0, 256, 256);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 28;
    const val = Math.min(255, Math.max(0, 128 + noise));
    data[i] = val;
    data[i + 1] = val;
    data[i + 2] = val;
  }
  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}

function createBrickTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Background mortar (grey cement)
  ctx.fillStyle = '#8C8780';
  ctx.fillRect(0, 0, 512, 512);

  const rows = 16;
  const rowHeight = 512 / rows;
  const brickWidth = 64;
  const mortar = 4;

  const brickColors = ['#BA522B', '#C65D34', '#A64622', '#CE673E', '#9E3F1F'];

  for (let r = 0; r < rows; r++) {
    const isStaggered = r % 2 === 1;
    const offsetX = isStaggered ? -brickWidth / 2 : 0;
    const y = r * rowHeight + mortar / 2;
    const h = rowHeight - mortar;

    for (let x = offsetX; x < 512 + brickWidth; x += brickWidth) {
      ctx.fillStyle = brickColors[Math.floor(Math.random() * brickColors.length)];
      ctx.fillRect(x + mortar / 2, y, brickWidth - mortar, h);

      // Subtle texture noise & bevel shadow
      ctx.fillStyle = 'rgba(0,0,0,0.14)';
      ctx.fillRect(x + mortar / 2, y + h * 0.68, brickWidth - mortar, h * 0.32);
      ctx.fillStyle = 'rgba(255,255,255,0.09)';
      ctx.fillRect(x + mortar / 2, y, brickWidth - mortar, 2);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.needsUpdate = true;
  return texture;
}

function createStoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Base stone slate grey
  ctx.fillStyle = '#3E4249';
  ctx.fillRect(0, 0, 512, 512);

  // Stone grain & veins
  ctx.strokeStyle = 'rgba(215, 220, 230, 0.24)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 80);
  ctx.bezierCurveTo(150, 120, 300, 40, 512, 140);
  ctx.moveTo(0, 320);
  ctx.bezierCurveTo(200, 260, 350, 380, 512, 310);
  ctx.stroke();

  ctx.strokeStyle = 'rgba(15, 18, 22, 0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(80, 0);
  ctx.bezierCurveTo(120, 200, 60, 350, 140, 512);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  texture.needsUpdate = true;
  return texture;
}

function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#834925';
  ctx.fillRect(0, 0, 256, 256);

  // Wood slats & grain
  for (let y = 0; y < 256; y += 16) {
    ctx.fillStyle = y % 32 === 0 ? '#6F3C1C' : '#92542B';
    ctx.fillRect(0, y, 256, 14);
    ctx.fillStyle = 'rgba(0,0,0,0.24)';
    ctx.fillRect(0, y + 14, 256, 2);
    ctx.fillStyle = 'rgba(255,255,255,0.08)';
    ctx.fillRect(0, y, 256, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  texture.needsUpdate = true;
  return texture;
}

function createPaverTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.fillStyle = '#2C2E34';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#181A1E';
  ctx.lineWidth = 3;
  for (let i = 0; i < 256; i += 32) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 256);
    ctx.moveTo(0, i);
    ctx.lineTo(256, i);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.needsUpdate = true;
  return texture;
}

// Construction easing curves
function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function easeOutBounce(x: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) {
    return n1 * x * x;
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export type RenderMode = 'pbr' | 'wireframe' | 'exploded';
export type LightingMode = 'dusk' | 'day' | 'night';

export interface HotspotItem {
  id: string;
  title: string;
  tag: string;
  spec: string;
  position: [number, number, number];
}

export const ARCHITECTURAL_HOTSPOTS: HotspotItem[] = [
  {
    id: 'cantilever',
    title: 'Cantilever Box Facade',
    tag: 'M25 Grade RCC',
    spec: 'Post-tensioned cantilever frame with 1.8m projection & drip-groove thermal insulation.',
    position: [0.35, 1.9, 1.45]
  },
  {
    id: 'louvers',
    title: 'Teak Privacy Louvers',
    tag: 'Treated Hardwood',
    spec: 'Acoustic & solar radiation buffer fins with natural teak poly-oil finish.',
    position: [-0.95, 1.85, 1.3]
  },
  {
    id: 'stone',
    title: 'Italian Slate Pillar',
    tag: 'Natural Stone Clad',
    spec: 'Full-height 6m structural column clad in anti-efflorescence charcoal slate.',
    position: [0.85, 0.95, 1.35]
  },
  {
    id: 'glazing',
    title: 'Double Low-E Glazing',
    tag: 'Acoustic Glass',
    spec: 'Toughened 12mm thermal glass with powder-coated extruded aluminium sections.',
    position: [-0.4, 0.7, 1.25]
  },
  {
    id: 'plinth',
    title: 'Reinforced Plinth',
    tag: 'Fe-550 TMT Rebar',
    spec: 'Engineered Anti-Termite treated RCC plinth beam with 4.5ft foundation depth.',
    position: [0, -0.05, 1.6]
  }
];

interface HouseModelProps {
  animationProgress: number; // 0 to 1
  isAutoRotating?: boolean;
  renderMode?: RenderMode;
  lightingMode?: LightingMode;
  showHotspots?: boolean;
  activeHotspot?: string | null;
  onSelectHotspot?: (id: string | null) => void;
}

export const HouseModel: React.FC<HouseModelProps> = ({
  animationProgress,
  isAutoRotating = true,
  renderMode = 'pbr',
  lightingMode = 'dusk',
  showHotspots = true,
  activeHotspot = null,
  onSelectHotspot
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Construction Group Refs
  const plinthRef = useRef<THREE.Group>(null);
  const columnsRef = useRef<THREE.Group>(null);
  const groundFloorRef = useRef<THREE.Group>(null);
  const midSlabRef = useRef<THREE.Group>(null);
  const firstFloorRef = useRef<THREE.Group>(null);
  const roofRef = useRef<THREE.Group>(null);
  const glassFixturesRef = useRef<THREE.Group>(null);
  const landscapeRef = useRef<THREE.Group>(null);

  // Dynamic explosion offset tracker for smooth interpolation
  const explodeOffsetRef = useRef<number>(0);

  const isWireframe = renderMode === 'wireframe';
  const isNight = lightingMode === 'night';

  // High-Quality PBR Architectural Materials with clear visual separation
  const materials = useMemo(() => {
    const plasterBump = typeof document !== 'undefined' ? createPlasterBumpTexture() : null;
    const brickTex = typeof document !== 'undefined' ? createBrickTexture() : null;
    const stoneTex = typeof document !== 'undefined' ? createStoneTexture() : null;
    const woodTex = typeof document !== 'undefined' ? createWoodTexture() : null;
    const paverTex = typeof document !== 'undefined' ? createPaverTexture() : null;

    if (isWireframe) {
      return {
        plasterWhite: new THREE.MeshBasicMaterial({ color: '#5487B8', wireframe: true }),
        fasciaWhite: new THREE.MeshBasicMaterial({ color: '#E58A1F', wireframe: true }),
        stoneFeature: new THREE.MeshBasicMaterial({ color: '#FF9E42', wireframe: true }),
        brickTerracotta: new THREE.MeshBasicMaterial({ color: '#00D9FF', wireframe: true }),
        teakWood: new THREE.MeshBasicMaterial({ color: '#FFA834', wireframe: true }),
        concreteGrey: new THREE.MeshBasicMaterial({ color: '#3A506B', wireframe: true }),
        drivewayPaver: new THREE.MeshBasicMaterial({ color: '#2B3A4A', wireframe: true }),
        darkMetal: new THREE.MeshBasicMaterial({ color: '#00F0FF', wireframe: true }),
        steelBlack: new THREE.MeshBasicMaterial({ color: '#E58A1F', wireframe: true }),
        glass: new THREE.MeshBasicMaterial({ color: '#00FFFF', wireframe: true }),
        balconyGlass: new THREE.MeshBasicMaterial({ color: '#6EE7B7', wireframe: true }),
        roofDark: new THREE.MeshBasicMaterial({ color: '#223843', wireframe: true }),
        orangeAccent: new THREE.MeshBasicMaterial({ color: '#E58A1F', wireframe: true }),
        warmEmitter: new THREE.MeshBasicMaterial({ color: '#FFB800' }),
        foliageLawn: new THREE.MeshBasicMaterial({ color: '#1B4D3E', wireframe: true }),
        foliageTree: new THREE.MeshBasicMaterial({ color: '#2A9D8F', wireframe: true }),
        treeBark: new THREE.MeshBasicMaterial({ color: '#4A3B32', wireframe: true })
      };
    }

    return {
      // 1. Plaster Walls: Off-white weathercoat plaster, high roughness + subtle micro-stucco bump
      plasterWhite: new THREE.MeshStandardMaterial({
        color: '#F4F2EC',
        roughness: 0.92,
        metalness: 0.0,
        bumpMap: plasterBump,
        bumpScale: 0.006
      }),
      // 2. Crisp Architectural Fascia (Protruding Picture Frame Box)
      fasciaWhite: new THREE.MeshStandardMaterial({
        color: '#FFFFFF',
        roughness: 0.42,
        metalness: 0.04
      }),
      // 3. Italian Stone / Slate Clad Vertical Feature Pillar
      stoneFeature: new THREE.MeshStandardMaterial({
        color: '#464A52',
        map: stoneTex,
        bumpMap: stoneTex,
        bumpScale: 0.015,
        roughness: 0.46,
        metalness: 0.15
      }),
      // 4. Exposed Wire-Cut Terracotta Brick Feature Cladding
      brickTerracotta: new THREE.MeshStandardMaterial({
        color: '#BE542A',
        map: brickTex,
        bumpMap: brickTex,
        bumpScale: 0.02,
        roughness: 0.88,
        metalness: 0.01
      }),
      // 5. Warm Teak Wood for Louvers, Door & Accents (Medium roughness ~0.5)
      teakWood: new THREE.MeshStandardMaterial({
        color: '#8E4E24',
        map: woodTex,
        bumpMap: woodTex,
        bumpScale: 0.018,
        roughness: 0.48,
        metalness: 0.05
      }),
      // 6. Concrete Plinth & Foundation Slab
      concreteGrey: new THREE.MeshStandardMaterial({
        color: '#363940',
        roughness: 0.86,
        metalness: 0.1
      }),
      // 7. Dark Interlocking Driveway Pavers
      drivewayPaver: new THREE.MeshStandardMaterial({
        color: '#26282E',
        map: paverTex,
        roughness: 0.9,
        metalness: 0.05
      }),
      // 8. Dark Powder-Coated Architectural Aluminium Window Frames & Mullions
      darkMetal: new THREE.MeshStandardMaterial({
        color: '#15171A',
        roughness: 0.22,
        metalness: 0.85
      }),
      // 9. Steel Pergola & Gate Charcoal Structure
      steelBlack: new THREE.MeshStandardMaterial({
        color: '#101114',
        roughness: 0.32,
        metalness: 0.82
      }),
      // 10. REAL PHYSICAL ARCHITECTURAL GLASS (Transmission, IOR & Subtle Specularity)
      glass: new THREE.MeshPhysicalMaterial({
        color: isNight ? '#FFE8C2' : '#D8EEF8',
        transmission: 0.88,
        opacity: 0.9,
        transparent: true,
        roughness: 0.04,
        ior: 1.52,
        thickness: 0.18,
        reflectivity: 0.65,
        emissive: isNight ? '#FF9A26' : '#000000',
        emissiveIntensity: isNight ? 0.35 : 0
      }),
      // 11. Balcony Tempered Glass Railing
      balconyGlass: new THREE.MeshPhysicalMaterial({
        color: '#E0F4FC',
        transmission: 0.92,
        opacity: 0.9,
        transparent: true,
        roughness: 0.03,
        ior: 1.5,
        thickness: 0.1,
        reflectivity: 0.6
      }),
      // 12. Matte Roof Surface & Parapet Underside (Darker Matte Concrete)
      roofDark: new THREE.MeshStandardMaterial({
        color: '#222428',
        roughness: 0.9,
        metalness: 0.06
      }),
      // 13. Brand Construction Orange Accent (Subtle, only on tiny trims)
      orangeAccent: new THREE.MeshStandardMaterial({
        color: '#E58A1F',
        roughness: 0.35,
        metalness: 0.45,
        emissive: '#993D00',
        emissiveIntensity: 0.4
      }),
      // 14. Architectural Up-Down Sconce Warm Glow Source (Warm Bloom Emissive)
      warmEmitter: new THREE.MeshStandardMaterial({
        color: '#FFE094',
        emissive: '#FF9E1B',
        emissiveIntensity: isNight ? 8.5 : 4.5,
        roughness: 0.15
      }),
      // 15. Garden Foliage & Landscape
      foliageLawn: new THREE.MeshStandardMaterial({
        color: '#2F542A',
        roughness: 0.92,
        metalness: 0.0
      }),
      foliageTree: new THREE.MeshStandardMaterial({
        color: '#284C24',
        roughness: 0.88,
        metalness: 0.0
      }),
      treeBark: new THREE.MeshStandardMaterial({
        color: '#3E291B',
        roughness: 0.95,
        metalness: 0.0
      })
    };
  }, [isWireframe, isNight]);

  // Frame animation loop with staggered assembly logic and idle breathing drift
  useFrame(({ clock }, delta) => {
    if (groupRef.current) {
      if (isAutoRotating) {
        groupRef.current.rotation.y += delta * 0.18;
      }
      // Subtle idle vertical breathing drift for organic dynamic feel
      const tIdle = clock.getElapsedTime();
      groupRef.current.position.y = -0.65 + Math.sin(tIdle * 1.2) * 0.015;
    }

    const t = animationProgress;

    // Smooth exploded view interpolation
    const targetExplode = renderMode === 'exploded' ? 1 : 0;
    explodeOffsetRef.current = THREE.MathUtils.damp(
      explodeOffsetRef.current,
      targetExplode,
      4,
      delta
    );
    const exp = explodeOffsetRef.current;

    // 1. Plinth & Driveway: (0.0 -> 0.22)
    if (plinthRef.current) {
      const p1 = clamp(t / 0.22, 0, 1);
      const e1 = easeOutBack(p1);
      plinthRef.current.scale.set(e1, e1, e1);
      plinthRef.current.position.y = (1 - e1) * -1.5 - exp * 0.15;
    }

    // 2. Structural RCC Columns: (0.16 -> 0.40)
    if (columnsRef.current) {
      const p2 = clamp((t - 0.16) / 0.24, 0, 1);
      const e2 = easeOutCubic(p2);
      columnsRef.current.scale.set(1, e2, 1);
      columnsRef.current.position.y = (1 - e2) * -0.5;
      columnsRef.current.visible = p2 > 0.01;
    }

    // 3. Ground Floor Walls & Porch: (0.30 -> 0.54)
    if (groundFloorRef.current) {
      const p3 = clamp((t - 0.3) / 0.24, 0, 1);
      const e3 = easeOutBack(p3);
      groundFloorRef.current.scale.set(e3, e3, e3);
      groundFloorRef.current.position.y = (1 - e3) * -1.2;
      groundFloorRef.current.visible = p3 > 0.01;
    }

    // 4. Mid Slab & Cantilever Balcony: (0.46 -> 0.68)
    if (midSlabRef.current) {
      const p4 = clamp((t - 0.46) / 0.22, 0, 1);
      const e4 = easeOutCubic(p4);
      midSlabRef.current.scale.set(e4, 1, e4);
      midSlabRef.current.position.y = 1.3 + (1 - e4) * 0.8 + exp * 0.45;
      midSlabRef.current.visible = p4 > 0.01;
    }

    // 5. First Floor & Duplex Box Frame: (0.58 -> 0.80)
    if (firstFloorRef.current) {
      const p5 = clamp((t - 0.58) / 0.22, 0, 1);
      const e5 = easeOutBack(p5);
      firstFloorRef.current.scale.set(e5, e5, e5);
      firstFloorRef.current.position.y = 1.45 + (1 - e5) * -1.0 + exp * 0.9;
      firstFloorRef.current.visible = p5 > 0.01;
    }

    // 6. Roof Slab, Pergola & Mumty: (0.72 -> 0.90)
    if (roofRef.current) {
      const p6 = clamp((t - 0.72) / 0.18, 0, 1);
      const e6 = easeOutBounce(p6);
      roofRef.current.position.y = 2.9 + (1 - e6) * 3.2 + exp * 1.5;
      roofRef.current.scale.set(p6 > 0 ? 1 : 0.01, p6 > 0 ? 1 : 0.01, p6 > 0 ? 1 : 0.01);
      roofRef.current.visible = p6 > 0.01;
    }

    // 7. Glass Balustrades, Windows & Dusk Sconces: (0.82 -> 1.0)
    if (glassFixturesRef.current) {
      const p7 = clamp((t - 0.82) / 0.18, 0, 1);
      const e7 = easeOutCubic(p7);
      glassFixturesRef.current.scale.set(e7, e7, e7);
      glassFixturesRef.current.position.y = exp * 0.9;
      glassFixturesRef.current.visible = p7 > 0.01;
    }

    // 8. Site Landscaping, Boundary Wall & Gate: (0.88 -> 1.0)
    if (landscapeRef.current) {
      const p8 = clamp((t - 0.88) / 0.12, 0, 1);
      const e8 = easeOutCubic(p8);
      landscapeRef.current.scale.set(e8, e8, e8);
      landscapeRef.current.position.y = -exp * 0.25;
      landscapeRef.current.visible = p8 > 0.01;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.65, 0]}>
      {/* ========================================================= */}
      {/* 1. PLINTH BEAM, DRIVEWAY & STEPS                          */}
      {/* ========================================================= */}
      <group ref={plinthRef}>
        {/* Main Site Ground Base with receiveShadow */}
        <mesh position={[0, -0.15, 0.2]} material={materials.concreteGrey} receiveShadow>
          <boxGeometry args={[4.6, 0.2, 4.8]} />
        </mesh>

        {/* Paved Front Driveway with Border Trim */}
        <mesh position={[0, -0.04, 1.4]} material={materials.drivewayPaver} receiveShadow>
          <boxGeometry args={[4.2, 0.04, 2.2]} />
        </mesh>
        <mesh position={[0, -0.02, 2.52]} material={materials.concreteGrey} receiveShadow>
          <boxGeometry args={[4.24, 0.04, 0.06]} />
        </mesh>

        {/* Elevated Residential Plinth (DPC level) with Chamfer Reveal */}
        <mesh position={[-0.1, 0.1, -0.2]} material={materials.concreteGrey} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.25, 3.4]} />
        </mesh>

        {/* Granite Entrance Risers & Steps with Shadow Inset */}
        <mesh position={[-0.6, 0.02, 1.45]} material={materials.concreteGrey} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.08, 0.5]} />
        </mesh>
        <mesh position={[-0.6, 0.09, 1.3]} material={materials.concreteGrey} castShadow receiveShadow>
          <boxGeometry args={[1.0, 0.08, 0.4]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. STRUCTURAL RCC COLUMNS (9"x12" Frame)                  */}
      {/* ========================================================= */}
      <group ref={columnsRef}>
        {/* Corner & Core RCC Columns */}
        <mesh position={[-1.75, 0.75, -1.6]} material={materials.darkMetal} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1.25, 0.2]} />
        </mesh>
        <mesh position={[1.65, 0.75, -1.6]} material={materials.darkMetal} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1.25, 0.2]} />
        </mesh>
        <mesh position={[-1.75, 0.75, 1.2]} material={materials.darkMetal} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1.25, 0.2]} />
        </mesh>
        <mesh position={[1.65, 0.75, 1.2]} material={materials.darkMetal} castShadow receiveShadow>
          <boxGeometry args={[0.2, 1.25, 0.2]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 3. GROUND FLOOR: PORCH, LIVING WING & CLADDING            */}
      {/* ========================================================= */}
      <group ref={groundFloorRef}>
        {/* Main Ground Floor Living & Dining Block (Off-White Plaster) */}
        <mesh position={[-0.7, 0.75, -0.1]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.2, 2.8]} />
        </mesh>

        {/* Feature Exposed Terracotta Brick Wall (Ground Floor Facade) */}
        <mesh position={[-0.65, 0.75, 1.32]} material={materials.brickTerracotta} castShadow receiveShadow>
          <boxGeometry args={[1.8, 1.15, 0.08]} />
        </mesh>

        {/* Right Stilt Parking / Car Porch Recess */}
        <mesh position={[0.95, 0.75, -0.4]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[1.3, 1.2, 2.2]} />
        </mesh>

        {/* Vertical Stone Feature Pillar (Ground to 2nd Floor Anchor) with Bevels */}
        <mesh position={[0.95, 0.75, 0.9]} material={materials.stoneFeature} castShadow receiveShadow>
          <boxGeometry args={[0.85, 1.25, 0.65]} />
        </mesh>

        {/* --- MAIN ENTRANCE DOORWAY WITH DEPTH REVEALS --- */}
        {/* Door Outer Jamb Architrave */}
        <mesh position={[-0.55, 0.7, 1.37]} material={materials.darkMetal} castShadow receiveShadow>
          <boxGeometry args={[0.72, 1.12, 0.06]} />
        </mesh>
        {/* Recessed Teak Wood Door Panel */}
        <mesh position={[-0.55, 0.7, 1.39]} material={materials.teakWood} castShadow receiveShadow>
          <boxGeometry args={[0.64, 1.04, 0.04]} />
        </mesh>
        {/* Vertical Stainless Steel Long Designer Handle */}
        <mesh position={[-0.32, 0.7, 1.43]} material={materials.darkMetal} castShadow>
          <cylinderGeometry args={[0.014, 0.014, 0.28, 8]} />
        </mesh>
        <mesh position={[-0.32, 0.82, 1.42]} material={materials.darkMetal}>
          <boxGeometry args={[0.02, 0.02, 0.04]} />
        </mesh>
        <mesh position={[-0.32, 0.58, 1.42]} material={materials.darkMetal}>
          <boxGeometry args={[0.02, 0.02, 0.04]} />
        </mesh>

        {/* --- GROUND FLOOR WINDOW WITH PROTRUDING FRAME & RECESSED GLASS --- */}
        <group position={[-1.25, 0.78, 1.36]}>
          {/* Protruding Window Sill */}
          <mesh position={[0, -0.41, 0.04]} material={materials.darkMetal} castShadow>
            <boxGeometry args={[0.58, 0.04, 0.08]} />
          </mesh>
          {/* Outer Window Frame */}
          <mesh position={[0, 0, 0.02]} material={materials.darkMetal} castShadow receiveShadow>
            <boxGeometry args={[0.54, 0.78, 0.05]} />
          </mesh>
          {/* Recessed Real Physical Glass Pane */}
          <mesh position={[0, 0, 0.04]} material={materials.glass} castShadow>
            <boxGeometry args={[0.46, 0.7, 0.02]} />
          </mesh>
          {/* Window Center Mullion */}
          <mesh position={[0, 0, 0.05]} material={materials.darkMetal} castShadow>
            <boxGeometry args={[0.025, 0.7, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 4. MID SLAB & 1ST FLOOR CANTILEVER BALCONY                */}
      {/* ========================================================= */}
      <group ref={midSlabRef} position={[0, 1.35, 0]}>
        {/* Intermediate RCC Slab */}
        <mesh position={[-0.05, 0.06, 0]} material={materials.concreteGrey} castShadow receiveShadow>
          <boxGeometry args={[3.8, 0.14, 3.5]} />
        </mesh>

        {/* Cantilever Balcony Projection Soffit & Slab */}
        <mesh position={[-0.75, 0.06, 1.55]} material={materials.fasciaWhite} castShadow receiveShadow>
          <boxGeometry args={[2.0, 0.12, 0.75]} />
        </mesh>

        {/* Underside Drip Mould / Shadow Groove */}
        <mesh position={[-0.75, 0.0, 1.55]} material={materials.darkMetal}>
          <boxGeometry args={[1.96, 0.02, 0.72]} />
        </mesh>

        {/* Subtle Orange Accent Fascia Trim Line */}
        <mesh position={[-0.75, 0.02, 1.93]} material={materials.orangeAccent}>
          <boxGeometry args={[2.02, 0.03, 0.02]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 5. FIRST FLOOR: MODERN FRAME BOX & TEAK LOUVERS           */}
      {/* ========================================================= */}
      <group ref={firstFloorRef} position={[0, 1.45, 0]}>
        {/* Upper Master Suite Box Frame (Crisp White Architectural Box) */}
        <mesh position={[-0.75, 0.68, 0.2]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.15, 2.4]} />
        </mesh>

        {/* PROTRUDING CANTILEVER PICTURE FRAME WHITE BOX (ELEVATION ACCENT) */}
        <group position={[-0.75, 0.68, 1.42]}>
          {/* Top Frame Bar */}
          <mesh position={[0, 0.54, 0]} material={materials.fasciaWhite} castShadow receiveShadow>
            <boxGeometry args={[1.9, 0.08, 0.38]} />
          </mesh>
          {/* Bottom Frame Bar */}
          <mesh position={[0, -0.54, 0]} material={materials.fasciaWhite} castShadow receiveShadow>
            <boxGeometry args={[1.9, 0.08, 0.38]} />
          </mesh>
          {/* Left Frame Bar */}
          <mesh position={[-0.91, 0, 0]} material={materials.fasciaWhite} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.0, 0.38]} />
          </mesh>
          {/* Right Frame Bar */}
          <mesh position={[0.91, 0, 0]} material={materials.fasciaWhite} castShadow receiveShadow>
            <boxGeometry args={[0.08, 1.0, 0.38]} />
          </mesh>
        </group>

        {/* Terracotta Brick Feature Wall in Balcony Recess */}
        <mesh position={[-0.75, 0.68, 1.15]} material={materials.brickTerracotta} castShadow receiveShadow>
          <boxGeometry args={[1.7, 1.05, 0.06]} />
        </mesh>

        {/* 3D Vertical Teak Wood Louver Sunshade Fins with Cast Shadows */}
        <group position={[-1.4, 0.68, 1.45]}>
          {[-0.18, -0.06, 0.06, 0.18].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, 0, 0]} material={materials.teakWood} castShadow receiveShadow>
              <boxGeometry args={[0.04, 0.96, 0.22]} />
            </mesh>
          ))}
        </group>

        {/* Right Stone Column Continuation (Double Height Shaft) */}
        <mesh position={[0.95, 0.68, 0.9]} material={materials.stoneFeature} castShadow receiveShadow>
          <boxGeometry args={[0.85, 1.25, 0.65]} />
        </mesh>

        {/* Right Tall Fenestration Window Frame with Inset Panes */}
        <group position={[1.0, 0.68, 1.24]}>
          <mesh material={materials.darkMetal} castShadow receiveShadow>
            <boxGeometry args={[0.48, 1.18, 0.06]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={materials.glass} castShadow>
            <boxGeometry args={[0.40, 1.10, 0.02]} />
          </mesh>
          {/* Horizontal Transom Divider Bar */}
          <mesh position={[0, 0.25, 0.03]} material={materials.darkMetal} castShadow>
            <boxGeometry args={[0.40, 0.03, 0.02]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 6. ROOF SLAB, PARAPET, PERGOLA & MUMTY                    */}
      {/* ========================================================= */}
      <group ref={roofRef} position={[0, 2.75, 0]}>
        {/* Main Flat Roof RCC Slab */}
        <mesh position={[-0.05, 0.06, 0]} material={materials.concreteGrey} castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.14, 3.6]} />
        </mesh>
        {/* Roof Underside Soffit Trim */}
        <mesh position={[-0.05, -0.01, 0]} material={materials.roofDark}>
          <boxGeometry args={[3.86, 0.02, 3.56]} />
        </mesh>

        {/* Parapet Walls (0.4m Indian standard terrace height) */}
        {/* Front Parapet */}
        <mesh position={[-0.05, 0.28, 1.75]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[3.9, 0.32, 0.1]} />
        </mesh>
        {/* Left Parapet */}
        <mesh position={[-1.95, 0.28, 0]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.32, 3.6]} />
        </mesh>
        {/* Right Parapet */}
        <mesh position={[1.85, 0.28, 0]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.32, 3.6]} />
        </mesh>

        {/* 3D Parapet Coping Overhang Edge with subtle Orange Trim */}
        <mesh position={[-0.05, 0.45, 1.75]} material={materials.orangeAccent} castShadow>
          <boxGeometry args={[3.94, 0.04, 0.14]} />
        </mesh>

        {/* Modern Black Steel Pergola (Left Terrace) */}
        <group position={[-0.8, 0.35, 0.7]}>
          {/* Main Pergola Cross Beams */}
          {[-0.6, -0.2, 0.2, 0.6].map((zOffset, i) => (
            <mesh key={i} position={[0, 0.3, zOffset]} material={materials.steelBlack} castShadow>
              <boxGeometry args={[1.8, 0.05, 0.05]} />
            </mesh>
          ))}
          {/* Pergola Support Posts */}
          <mesh position={[-0.85, 0.12, 0.6]} material={materials.steelBlack} castShadow>
            <boxGeometry args={[0.06, 0.35, 0.06]} />
          </mesh>
          <mesh position={[0.85, 0.12, 0.6]} material={materials.steelBlack} castShadow>
            <boxGeometry args={[0.06, 0.35, 0.06]} />
          </mesh>
        </group>

        {/* Staircase Mumty (Headroom for rooftop access) */}
        <mesh position={[0.95, 0.45, -0.6]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.7, 1.3]} />
        </mesh>
        <mesh position={[0.95, 0.82, -0.6]} material={materials.concreteGrey} castShadow>
          <boxGeometry args={[1.3, 0.06, 1.4]} />
        </mesh>

        {/* Overhead Water Storage Tank (Sintex Style) */}
        <mesh position={[0.95, 1.05, -0.6]} material={materials.darkMetal} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.45, 16]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 7. BALUSTRADES, WINDOW PANES & DUSK SCONCES               */}
      {/* ========================================================= */}
      <group ref={glassFixturesRef}>
        {/* First Floor Balcony Bottom Aluminum Mounting Shoe */}
        <mesh position={[-0.75, 1.45, 1.92]} material={materials.darkMetal} castShadow>
          <boxGeometry args={[1.94, 0.04, 0.04]} />
        </mesh>
        {/* First Floor Balcony Tempered Glass Railing */}
        <mesh position={[-0.75, 1.68, 1.92]} material={materials.balconyGlass} castShadow>
          <boxGeometry args={[1.92, 0.44, 0.02]} />
        </mesh>
        {/* Top Baluster Handrail (Stainless Steel / Dark Aluminium) */}
        <mesh position={[-0.75, 1.92, 1.92]} material={materials.darkMetal} castShadow>
          <boxGeometry args={[1.94, 0.03, 0.04]} />
        </mesh>

        {/* First Floor Balcony Sliding Glass Door Frame & Glass */}
        <group position={[-0.75, 2.05, 1.25]}>
          <mesh material={materials.darkMetal} castShadow receiveShadow>
            <boxGeometry args={[1.34, 0.98, 0.05]} />
          </mesh>
          <mesh position={[0, 0, 0.02]} material={materials.glass} castShadow>
            <boxGeometry args={[1.26, 0.90, 0.02]} />
          </mesh>
          <mesh position={[0, 0, 0.03]} material={materials.darkMetal} castShadow>
            <boxGeometry args={[0.03, 0.90, 0.02]} />
          </mesh>
        </group>

        {/* Balcony Planter Box & Greenery */}
        <group position={[-1.4, 1.48, 1.8]}>
          <mesh position={[0, -0.04, 0]} material={materials.darkMetal} castShadow>
            <boxGeometry args={[0.42, 0.08, 0.16]} />
          </mesh>
          <mesh position={[-0.08, 0.02, 0]} material={materials.foliageTree}>
            <sphereGeometry args={[0.11, 8, 8]} />
          </mesh>
          <mesh position={[0.1, 0.04, 0]} material={materials.foliageTree}>
            <sphereGeometry args={[0.09, 8, 8]} />
          </mesh>
        </group>

        {/* ARCHITECTURAL UP-DOWN WALL SCONCES ON STONE PILLAR */}
        {/* Sconce 1 (Upper level) */}
        <mesh position={[0.95, 2.45, 1.25]} material={materials.darkMetal} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.06]} />
        </mesh>
        <mesh position={[0.95, 2.50, 1.26]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        <mesh position={[0.95, 2.40, 1.26]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>

        {/* Sconce 2 (Mid level) */}
        <mesh position={[0.95, 1.75, 1.25]} material={materials.darkMetal} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.06]} />
        </mesh>
        <mesh position={[0.95, 1.80, 1.26]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        <mesh position={[0.95, 1.70, 1.26]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>

        {/* Sconce 3 (Ground level) */}
        <mesh position={[0.95, 0.95, 1.25]} material={materials.darkMetal} castShadow>
          <boxGeometry args={[0.08, 0.12, 0.06]} />
        </mesh>
        <mesh position={[0.95, 1.00, 1.26]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
        <mesh position={[0.95, 0.90, 1.26]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>

        {/* Front Porch Ceiling Recessed Spotlights */}
        <mesh position={[0.8, 1.3, 0.4]} material={materials.warmEmitter}>
          <sphereGeometry args={[0.03, 8, 8]} />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 8. BOUNDARY WALL, DESIGNER SLIDING GATE & LANDSCAPE       */}
      {/* ========================================================= */}
      <group ref={landscapeRef}>
        {/* Front Compound Boundary Wall with Stepped Coping */}
        <mesh position={[-1.4, 0.3, 2.3]} material={materials.plasterWhite} castShadow receiveShadow>
          <boxGeometry args={[1.5, 0.6, 0.12]} />
        </mesh>
        <mesh position={[-1.4, 0.61, 2.3]} material={materials.darkMetal} castShadow>
          <boxGeometry args={[1.54, 0.03, 0.14]} />
        </mesh>
        {/* Compound Wall Teak Louver Band */}
        <mesh position={[-1.4, 0.35, 2.37]} material={materials.teakWood} castShadow>
          <boxGeometry args={[1.3, 0.35, 0.03]} />
        </mesh>

        {/* Boundary Stone Columns */}
        <mesh position={[-0.6, 0.4, 2.3]} material={materials.stoneFeature} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.8, 0.25]} />
        </mesh>
        <mesh position={[1.8, 0.4, 2.3]} material={materials.stoneFeature} castShadow receiveShadow>
          <boxGeometry args={[0.25, 0.8, 0.25]} />
        </mesh>

        {/* Boundary Column Lanterns */}
        <mesh position={[-0.6, 0.84, 2.3]} material={materials.warmEmitter}>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
        </mesh>
        <mesh position={[1.8, 0.84, 2.3]} material={materials.warmEmitter}>
          <boxGeometry args={[0.1, 0.08, 0.1]} />
        </mesh>

        {/* Designer Laser-Cut Sliding Main Gate (Wood + Black Metal) */}
        <group position={[0.6, 0.35, 2.3]}>
          {/* Main Outer Metal Frame */}
          <mesh material={materials.steelBlack} castShadow receiveShadow>
            <boxGeometry args={[2.1, 0.65, 0.05]} />
          </mesh>
          {/* Wood Panel Inserts */}
          <mesh position={[0, 0, 0.03]} material={materials.teakWood} castShadow>
            <boxGeometry args={[1.98, 0.55, 0.02]} />
          </mesh>
          {/* Subtle Orange Slat Accent on Gate */}
          <mesh position={[0, 0.2, 0.04]} material={materials.orangeAccent}>
            <boxGeometry args={[1.98, 0.03, 0.01]} />
          </mesh>
        </group>

        {/* Front Lawn Planter Box with Shrubs */}
        <mesh position={[-1.4, 0.12, 2.5]} material={materials.concreteGrey} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.2, 0.25]} />
        </mesh>
        <mesh position={[-1.4, 0.26, 2.5]} material={materials.foliageLawn} receiveShadow>
          <boxGeometry args={[1.3, 0.1, 0.18]} />
        </mesh>

        {/* Two Architectural Landscape Trees */}
        {/* Tree 1: Left Palm / Slender Garden Tree */}
        <group position={[-2.1, 0, 1.2]}>
          <mesh position={[0, 0.8, 0]} material={materials.treeBark} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.08, 1.6, 8]} />
          </mesh>
          <mesh position={[0, 1.8, 0]} material={materials.foliageTree} castShadow receiveShadow>
            <coneGeometry args={[0.45, 1.1, 8]} />
          </mesh>
          <mesh position={[0, 2.3, 0]} material={materials.foliageTree} castShadow receiveShadow>
            <coneGeometry args={[0.35, 0.9, 8]} />
          </mesh>
        </group>

        {/* Tree 2: Right Corner Ornamental Ashoka Tree */}
        <group position={[2.1, 0, -0.8]}>
          <mesh position={[0, 0.9, 0]} material={materials.treeBark} castShadow receiveShadow>
            <cylinderGeometry args={[0.06, 0.09, 1.8, 8]} />
          </mesh>
          <mesh position={[0, 2.0, 0]} material={materials.foliageTree} castShadow receiveShadow>
            <cylinderGeometry args={[0.25, 0.4, 1.4, 8]} />
          </mesh>
          <mesh position={[0, 2.8, 0]} material={materials.foliageTree} castShadow receiveShadow>
            <coneGeometry args={[0.3, 0.8, 8]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================= */}
      {/* 9. 3D INTERACTIVE ARCHITECTURAL HOTSPOTS                  */}
      {/* ========================================================= */}
      {showHotspots && animationProgress > 0.85 && (
        <group>
          {ARCHITECTURAL_HOTSPOTS.map((hotspot) => {
            const isSelected = activeHotspot === hotspot.id;
            return (
              <group
                key={hotspot.id}
                position={hotspot.position}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onSelectHotspot) onSelectHotspot(isSelected ? null : hotspot.id);
                }}
                onPointerOver={(e) => {
                  e.stopPropagation();
                  document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                  document.body.style.cursor = 'auto';
                }}
              >
                {/* Center Core Glowing Sphere */}
                <mesh>
                  <sphereGeometry args={[0.06, 16, 16]} />
                  <meshBasicMaterial color={isSelected ? '#FFFFFF' : '#E58A1F'} />
                </mesh>
                {/* Outer Pulsing Beacon Halo */}
                <mesh>
                  <ringGeometry args={[0.08, 0.12, 24]} />
                  <meshBasicMaterial
                    color={isSelected ? '#00E5FF' : '#E58A1F'}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.8}
                  />
                </mesh>
              </group>
            );
          })}
        </group>
      )}
    </group>
  );
};
