import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, Navigation, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface CityHub {
  name: string;
  lat: number;
  lon: number;
  isHQ?: boolean;
}

const CITY_HUBS: CityHub[] = [
  { name: 'Pune (HQ)', lat: 18.52, lon: 73.85, isHQ: true },
  { name: 'Mumbai', lat: 19.07, lon: 72.87 },
  { name: 'Delhi', lat: 28.7, lon: 77.1 },
  { name: 'Bengaluru', lat: 12.97, lon: 77.59 },
  { name: 'Hyderabad', lat: 17.38, lon: 78.48 },
  { name: 'Chennai', lat: 13.08, lon: 80.27 },
  { name: 'Ahmedabad', lat: 23.02, lon: 72.57 },
  { name: 'Kolkata', lat: 22.57, lon: 88.36 },
];

// Key logistics connecting corridors (Hub to Hub)
const CITY_ROUTES: [number, number][] = [
  [0, 1], // Pune - Mumbai
  [0, 2], // Pune - Delhi
  [0, 3], // Pune - Bengaluru
  [0, 4], // Pune - Hyderabad
  [0, 5], // Pune - Chennai
  [0, 6], // Pune - Ahmedabad
  [0, 7], // Pune - Kolkata
  [1, 6], // Mumbai - Ahmedabad
  [2, 6], // Delhi - Ahmedabad
  [2, 7], // Delhi - Kolkata
  [3, 5], // Bengaluru - Chennai
  [3, 4], // Bengaluru - Hyderabad
];

// Curated geographic coordinates for visible continents and country outlines
// Dense sampling around India & South Asia ensures immediate geographic recognition
const CONTINENT_POINTS: [number, number][] = [
  // India & South Asia Coastline & Northern Frontiers
  [8.0, 77.5], [8.8, 76.5], [10.0, 75.8], [11.5, 75.3], [13.0, 74.8],
  [15.5, 73.8], [17.0, 73.3], [18.9, 72.8], [20.0, 72.7], [21.5, 72.4],
  [22.8, 69.8], [24.0, 68.8], [24.8, 71.0], [26.0, 70.3], [28.0, 70.0],
  [30.5, 72.5], [32.5, 74.0], [34.5, 74.5], [35.5, 77.0], [33.5, 78.5],
  [31.0, 79.5], [29.5, 81.0], [28.0, 84.0], [27.0, 88.0], [26.0, 89.8],
  [24.5, 92.5], [23.0, 91.5], [21.8, 88.8], [21.0, 86.8], [19.5, 85.0],
  [17.5, 83.2], [15.8, 80.5], [13.5, 80.3], [11.5, 79.8], [9.8, 79.0],
  // Sri Lanka
  [7.2, 80.5], [8.5, 81.2],
  // Indian Mainland Fill Points
  [12.0, 77.0], [14.0, 75.8], [16.0, 76.5], [17.5, 78.5], [19.0, 75.5],
  [21.0, 78.0], [23.5, 77.0], [25.0, 82.0], [26.5, 80.0], [28.5, 77.0],
  // Middle East / Arabian Peninsula
  [25.0, 55.0], [27.0, 51.0], [29.5, 48.0], [30.0, 35.0], [22.0, 39.0],
  [15.0, 45.0], [17.0, 54.0], [23.5, 58.5],
  // Southeast Asia
  [20.0, 96.0], [16.0, 98.0], [12.0, 99.5], [5.0, 102.0], [1.3, 103.8],
  [-2.0, 105.0], [-7.0, 110.0], [4.0, 114.0], [10.0, 106.0], [16.0, 108.0],
  // East Asia
  [22.5, 114.0], [28.0, 121.0], [32.0, 121.5], [37.0, 124.0], [40.0, 128.0],
  [35.0, 136.0], [42.0, 142.0],
  // Central & Northern Eurasia
  [45.0, 75.0], [52.0, 85.0], [55.0, 60.0], [60.0, 90.0], [65.0, 110.0],
  // Europe
  [36.0, -5.0], [43.0, -8.0], [48.0, -3.0], [54.0, 9.0], [60.0, 18.0],
  [68.0, 24.0], [58.0, 35.0], [46.0, 30.0], [40.0, 22.0], [42.0, 12.0],
  // Africa
  [35.0, 0.0], [30.0, 32.0], [12.0, 44.0], [-3.0, 40.0], [-25.0, 33.0],
  [-34.0, 20.0], [-20.0, 13.0], [0.0, 10.0], [6.0, -3.0], [15.0, -17.0],
  [28.0, -12.0],
  // Australia
  [-12.0, 132.0], [-22.0, 114.0], [-34.0, 116.0], [-38.0, 145.0],
  [-28.0, 153.0], [-15.0, 142.0],
  // Americas
  [60.0, -140.0], [45.0, -124.0], [32.0, -117.0], [20.0, -100.0],
  [10.0, -75.0], [-5.0, -80.0], [-25.0, -70.0], [-50.0, -70.0],
  [-25.0, -45.0], [0.0, -50.0], [25.0, -80.0], [40.0, -74.0], [50.0, -60.0],
];

type PerformanceTier = 'high' | 'medium' | 'low';

export const NetworkEarthGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [tier, setTier] = useState<PerformanceTier>('high');
  const [canvasSupported, setCanvasSupported] = useState(true);

  // Detect Hardware & Device Performance Tier
  useEffect(() => {
    const updateTier = () => {
      const w = window.innerWidth;
      const cores = navigator.hardwareConcurrency || 4;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      if (w < 768 || isMobileDevice || cores <= 2) {
        setTier('low');
      } else if (w < 1024 || cores <= 4) {
        setTier('medium');
      } else {
        setTier('high');
      }
    };

    updateTier();
    window.addEventListener('resize', updateTier);
    return () => window.removeEventListener('resize', updateTier);
  }, []);

  // Battery & Visibility Optimization: Pause when scrolled out of view or tab is hidden
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Load slightly before entering view (rootMargin 150px)
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: '150px 0px 150px 0px', threshold: 0.05 }
    );
    observer.observe(el);

    // Listen for tab switching / window minimization to stop RAF immediately
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else if (el) {
        // Re-check bounding client rect
        const rect = el.getBoundingClientRect();
        const inView = rect.top < window.innerHeight + 150 && rect.bottom > -150;
        setIsVisible(inView);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // High Performance 60FPS Animation Loop with Pre-Rendered Offscreen Truck Sprites
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      setCanvasSupported(false);
      return;
    }

    let animationFrameId: number;
    let rotation = -74 * (Math.PI / 180); // Start centered near India longitude (~74°E)

    // Accessibility check: reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const earthRotationSpeed = prefersReducedMotion ? 0 : 0.0016;

    // Load actual Prisha Xpress company logo
    const logoImg = new Image();
    logoImg.src = '/assets/images/prisha-logo.png';
    let logoLoaded = false;

    // --------------------------------------------------------------------------
    // PERFORMANCE OPTIMIZATION: PRE-RENDER COMMERCIAL TRUCK SPRITE TO OFFSCREEN CANVAS
    // Eliminates dozens of vector path operations per truck per frame!
    // --------------------------------------------------------------------------
    const createTruckSprite = (cabColor: string, containerColor: string, width = 90, height = 34) => {
      const offscreen = document.createElement('canvas');
      offscreen.width = width * 2;
      offscreen.height = height * 2;
      const sCtx = offscreen.getContext('2d');
      if (!sCtx) return null;

      sCtx.scale(2, 2);

      const contW = 54;
      const contH = 26;
      const contX = 4;
      const contY = 4;

      // 1. Cargo Trailer / Container (Crisp White with Prisha Purple Accents)
      sCtx.fillStyle = containerColor;
      sCtx.strokeStyle = '#94a3b8';
      sCtx.lineWidth = 1.2;
      sCtx.beginPath();
      sCtx.roundRect(contX, contY, contW, contH, 3);
      sCtx.fill();
      sCtx.stroke();

      // Top & Bottom Prisha Xpress purple accent stripes
      sCtx.fillStyle = '#7200B8';
      sCtx.fillRect(contX + 1, contY + contH - 4.5, contW - 2, 3.5);
      sCtx.fillRect(contX + 1, contY + 1, contW - 2, 2.5);

      // Logo or text on container side
      if (logoLoaded) {
        try {
          sCtx.drawImage(logoImg, contX + 8, contY + 4, 38, 15);
        } catch {
          sCtx.fillStyle = '#7200B8';
          sCtx.font = 'bold 9px Inter, sans-serif';
          sCtx.fillText('PRISHA XPRESS', contX + 7, contY + 16);
        }
      } else {
        sCtx.fillStyle = '#7200B8';
        sCtx.font = 'bold 9px Inter, sans-serif';
        sCtx.fillText('PRISHA XPRESS', contX + 7, contY + 16);
      }

      // 2. Commercial Driver Cab (Front Tractor)
      const cabW = 24;
      const cabH = 24;
      const cabX = contX + contW + 2;
      const cabY = contY + 1;

      sCtx.fillStyle = cabColor;
      sCtx.beginPath();
      sCtx.roundRect(cabX, cabY, cabW, cabH, 3);
      sCtx.fill();

      // Aerodynamic Roof Spoiler
      sCtx.fillStyle = '#58008e';
      sCtx.beginPath();
      sCtx.moveTo(cabX, cabY);
      sCtx.lineTo(cabX + cabW - 4, cabY - 3);
      sCtx.lineTo(cabX + cabW, cabY + 2);
      sCtx.lineTo(cabX, cabY + 2);
      sCtx.closePath();
      sCtx.fill();

      // Tinted Windshield
      sCtx.fillStyle = '#38bdf8';
      sCtx.beginPath();
      sCtx.roundRect(cabX + 12, cabY + 3, 9, 10, 1.5);
      sCtx.fill();

      // Prisha Logo on Driver Cabin Door
      if (logoLoaded) {
        try {
          sCtx.drawImage(logoImg, cabX + 3, cabY + 13, 11, 7);
        } catch {}
      }

      // Front Chrome Grille
      sCtx.fillStyle = '#cbd5e1';
      sCtx.fillRect(cabX + cabW - 3, cabY + 12, 3, 9);

      // 3. Heavy Commercial Double-Axle Wheels
      const wheelPositions = [contX + 8, contX + 18, contX + 38, cabX + 14];
      wheelPositions.forEach((wx) => {
        // Upper wheels
        sCtx.fillStyle = '#0f172a';
        sCtx.fillRect(wx, contY - 2.5, 7, 3.2);
        sCtx.fillStyle = '#94a3b8';
        sCtx.fillRect(wx + 2, contY - 1.5, 3, 1.5);

        // Lower wheels
        sCtx.fillStyle = '#0f172a';
        sCtx.fillRect(wx, contY + contH - 0.7, 7, 3.2);
        sCtx.fillStyle = '#94a3b8';
        sCtx.fillRect(wx + 2, contY + contH + 0.3, 3, 1.5);
      });

      return offscreen;
    };

    let purpleTruckSprite = createTruckSprite('#7200B8', '#ffffff');
    let cyanTruckSprite = createTruckSprite('#0284c7', '#ffffff');

    logoImg.onload = () => {
      logoLoaded = true;
      purpleTruckSprite = createTruckSprite('#7200B8', '#ffffff');
      cyanTruckSprite = createTruckSprite('#0284c7', '#ffffff');
    };

    // Orbital Moving Trucks: Slow speeds (18-22 seconds per circular orbit)
    const orbitalTrucks = [
      {
        id: 'truck-1',
        orbitRadiusFactor: 1.32,
        inclination: 0.36, // ~20 degrees orbit tilt
        durationSeconds: 19, // 19s per full loop
        initialOffsetAngle: 0,
        spriteType: 'purple',
      },
      {
        id: 'truck-2',
        orbitRadiusFactor: 1.32,
        inclination: 0.36,
        durationSeconds: 19,
        initialOffsetAngle: Math.PI, // 180° opposite
        spriteType: 'purple',
      },
      {
        id: 'truck-3',
        orbitRadiusFactor: 1.46,
        inclination: -0.42, // ~-24 degrees orbit tilt
        durationSeconds: 23,
        initialOffsetAngle: Math.PI * 0.5,
        spriteType: 'cyan',
      },
    ];

    const startTime = performance.now();

    const render = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      rotation += earthRotationSpeed;

      // Adaptive DPR cap based on device tier (prevents mobile GPU overheating)
      const maxDpr = tier === 'low' ? 1.0 : tier === 'medium' ? 1.5 : 2.0;
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      if (canvas.width !== Math.floor(width * dpr) || canvas.height !== Math.floor(height * dpr)) {
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const r = Math.min(width, height) * (tier === 'low' ? 0.32 : 0.36);

      // 3D Spherical Projection Helper
      const project = (latDeg: number, lonDeg: number) => {
        const lat = (latDeg * Math.PI) / 180;
        const lon = (lonDeg * Math.PI) / 180 + rotation;
        const x3d = Math.cos(lat) * Math.sin(lon);
        const y3d = -Math.sin(lat);
        const z3d = Math.cos(lat) * Math.cos(lon);
        return {
          x: cx + r * x3d,
          y: cy + r * y3d,
          z: z3d,
          visible: z3d > -0.05,
        };
      };

      // -------------------------------------------------------------
      // 1. ATMOSPHERE OUTER GLOW
      // -------------------------------------------------------------
      const outerAtmosphere = ctx.createRadialGradient(cx, cy, r * 0.95, cx, cy, r * 1.45);
      outerAtmosphere.addColorStop(0, 'rgba(114, 0, 184, 0.48)');
      outerAtmosphere.addColorStop(0.35, 'rgba(147, 51, 234, 0.25)');
      outerAtmosphere.addColorStop(0.7, 'rgba(56, 189, 248, 0.14)');
      outerAtmosphere.addColorStop(1, 'rgba(15, 23, 42, 0)');

      ctx.fillStyle = outerAtmosphere;
      ctx.beginPath();
      ctx.arc(cx, cy, r * 1.45, 0, Math.PI * 2);
      ctx.fill();

      // -------------------------------------------------------------
      // 2. ORBIT TRACKS (Back Half)
      // -------------------------------------------------------------
      [0.36, -0.42].forEach((inc, idx) => {
        const orbitR = r * (idx === 0 ? 1.32 : 1.46);
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const theta = (i / 40) * Math.PI * 2;
          const ox = Math.cos(theta) * orbitR;
          const oy = Math.sin(theta) * orbitR * Math.cos(inc);
          const oz = Math.sin(theta) * orbitR * Math.sin(inc);
          if (oz < 0) {
            ctx.lineTo(cx + ox, cy + oy);
          }
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // -------------------------------------------------------------
      // 3. REALISTIC BRIGHT 3D EARTH SPHERE
      // -------------------------------------------------------------
      const sphereGrad = ctx.createRadialGradient(
        cx - r * 0.35,
        cy - r * 0.35,
        r * 0.08,
        cx,
        cy,
        r
      );
      sphereGrad.addColorStop(0, '#3b136f'); // Vibrant illuminated royal ocean
      sphereGrad.addColorStop(0.35, '#220946');
      sphereGrad.addColorStop(0.75, '#120224');
      sphereGrad.addColorStop(1, '#07000e'); // Outer limb

      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = sphereGrad;
      ctx.fill();

      // Clip inside globe
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, r - 0.5, 0, Math.PI * 2);
      ctx.clip();

      // -------------------------------------------------------------
      // 4. COORDINATE GRATICULE (Skipped on low-end mobile for max performance)
      // -------------------------------------------------------------
      if (tier !== 'low') {
        ctx.lineWidth = 0.8;
        [-40, -20, 0, 20, 40].forEach((lat) => {
          ctx.beginPath();
          for (let lon = -180; lon <= 180; lon += 10) {
            const p = project(lat, lon);
            if (p.z > 0) ctx.lineTo(p.x, p.y);
            else ctx.moveTo(p.x, p.y);
          }
          ctx.strokeStyle = 'rgba(168, 85, 247, 0.14)';
          ctx.stroke();
        });

        for (let lon = -180; lon < 180; lon += 45) {
          ctx.beginPath();
          for (let lat = -80; lat <= 80; lat += 10) {
            const p = project(lat, lon);
            if (p.z > 0) ctx.lineTo(p.x, p.y);
            else ctx.moveTo(p.x, p.y);
          }
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.08)';
          ctx.stroke();
        }
      }

      // -------------------------------------------------------------
      // 5. WORLD CONTINENTS & PURPLE HIGHLIGHTED INDIA REGION
      // -------------------------------------------------------------
      CONTINENT_POINTS.forEach(([lat, lon]) => {
        const p = project(lat, lon);
        if (p.z > 0) {
          const alpha = Math.max(0.12, p.z);
          const isIndia = lat >= 8 && lat <= 35 && lon >= 68 && lon <= 92;

          ctx.beginPath();
          if (isIndia) {
            ctx.arc(p.x, p.y, Math.max(2.2, p.z * 4.2), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(192, 132, 252, ${alpha * 0.95})`; // Vibrant purple India
            if (tier === 'high') {
              ctx.shadowColor = '#c084fc';
              ctx.shadowBlur = 6;
            }
            ctx.fill();
            if (tier === 'high') ctx.shadowBlur = 0;
          } else {
            ctx.arc(p.x, p.y, Math.max(1.4, p.z * 2.8), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(226, 232, 240, ${alpha * 0.45})`;
            ctx.fill();
          }
        }
      });

      // -------------------------------------------------------------
      // 6. CONNECTING FREIGHT LINES (Purple & Light-Blue Arcs)
      // -------------------------------------------------------------
      CITY_ROUTES.forEach(([fromIdx, toIdx], routeIdx) => {
        const fromCity = CITY_HUBS[fromIdx];
        const toCity = CITY_HUBS[toIdx];
        const p1 = project(fromCity.lat, fromCity.lon);
        const p2 = project(toCity.lat, toCity.lon);

        if (p1.z > -0.1 && p2.z > -0.1) {
          const avgZ = (p1.z + p2.z) / 2;
          const alpha = Math.max(0.2, avgZ) * 0.88;

          // Great-Arc 3D Midpoint
          const midLat = (fromCity.lat + toCity.lat) / 2;
          const midLon = (fromCity.lon + toCity.lon) / 2;
          const pMid = project(midLat, midLon);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.quadraticCurveTo(pMid.x, pMid.y, p2.x, p2.y);

          const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          lineGrad.addColorStop(0, `rgba(168, 85, 247, ${alpha})`); // Purple
          lineGrad.addColorStop(0.5, `rgba(56, 189, 248, ${alpha})`); // Light blue
          lineGrad.addColorStop(1, `rgba(114, 0, 184, ${alpha})`);

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 1.6;
          ctx.stroke();

          // Smooth Moving Goods Light Pulse
          const pulseProgress = (elapsedSec * 0.42 + routeIdx * 0.12) % 1;
          const px =
            (1 - pulseProgress) * (1 - pulseProgress) * p1.x +
            2 * (1 - pulseProgress) * pulseProgress * pMid.x +
            pulseProgress * pulseProgress * p2.x;
          const py =
            (1 - pulseProgress) * (1 - pulseProgress) * p1.y +
            2 * (1 - pulseProgress) * pulseProgress * pMid.y +
            pulseProgress * pulseProgress * p2.y;

          if (avgZ > 0.05) {
            ctx.beginPath();
            ctx.arc(px, py, tier === 'low' ? 2.2 : 2.8, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            if (tier === 'high') {
              ctx.shadowColor = '#38bdf8';
              ctx.shadowBlur = 8;
            }
            ctx.fill();
            if (tier === 'high') ctx.shadowBlur = 0;
          }
        }
      });

      // -------------------------------------------------------------
      // 7. GLOWING CITY LOCATION POINTS & PUNE HQ BEACON
      // -------------------------------------------------------------
      CITY_HUBS.forEach((city) => {
        const p = project(city.lat, city.lon);
        if (p.z > 0.05) {
          const depthAlpha = Math.max(0.25, p.z);

          if (city.isHQ) {
            // Pune Central Operations Hub - Pulsing Amber/Gold Beacon
            const pulse = (now % 1600) / 1600;
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4 + pulse * 10, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(250, 204, 21, ${1 - pulse})`;
            ctx.lineWidth = 1.6;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(p.x, p.y, 4.2, 0, Math.PI * 2);
            ctx.fillStyle = '#facc15';
            if (tier === 'high') {
              ctx.shadowColor = '#facc15';
              ctx.shadowBlur = 10;
            }
            ctx.fill();
            if (tier === 'high') ctx.shadowBlur = 0;

            ctx.font = 'bold 11px Inter, system-ui, sans-serif';
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.95})`;
            ctx.fillText('PUNE (HQ)', p.x + 8, p.y + 4);
          } else {
            // Other Hub Cities
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3.0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(56, 189, 248, ${depthAlpha * 0.95})`;
            ctx.fill();

            if (p.z > 0.5 && tier !== 'low') {
              ctx.font = '600 9.5px Inter, system-ui, sans-serif';
              ctx.fillStyle = `rgba(224, 242, 254, ${depthAlpha * 0.8})`;
              ctx.fillText(city.name, p.x + 6, p.y + 3);
            }
          }
        }
      });

      // -------------------------------------------------------------
      // 8. INNER ATMOSPHERIC LIGHTING & RIM SPECULAR
      // -------------------------------------------------------------
      const rimLight = ctx.createRadialGradient(cx, cy, r * 0.75, cx, cy, r);
      rimLight.addColorStop(0, 'rgba(0, 0, 0, 0)');
      rimLight.addColorStop(0.85, 'rgba(168, 85, 247, 0.2)');
      rimLight.addColorStop(1, 'rgba(56, 189, 248, 0.45)');
      ctx.fillStyle = rimLight;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore(); // Restore Earth clip

      // -------------------------------------------------------------
      // 9. ORBIT TRACKS (Front Half)
      // -------------------------------------------------------------
      [0.36, -0.42].forEach((inc, idx) => {
        const orbitR = r * (idx === 0 ? 1.32 : 1.46);
        ctx.beginPath();
        for (let i = 0; i <= 40; i++) {
          const theta = (i / 40) * Math.PI * 2;
          const ox = Math.cos(theta) * orbitR;
          const oy = Math.sin(theta) * orbitR * Math.cos(inc);
          const oz = Math.sin(theta) * orbitR * Math.sin(inc);
          if (oz >= 0) {
            ctx.lineTo(cx + ox, cy + oy);
          }
        }
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.42)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // -------------------------------------------------------------
      // 10. LARGE, CLEARLY VISIBLE TRUCKS (DRAWN VIA PRE-RENDERED SPRITES)
      // -------------------------------------------------------------
      // Mobile: 2 trucks; Desktop: 3 trucks
      const activeTrucks = tier === 'low' ? [orbitalTrucks[0], orbitalTrucks[2]] : orbitalTrucks;

      activeTrucks.forEach((truck) => {
        // Continuous, smooth rotation: 19–23 seconds per circular orbit
        const currentAngle =
          (truck.initialOffsetAngle + (elapsedSec * (Math.PI * 2)) / truck.durationSeconds) %
          (Math.PI * 2);

        const orbitR = r * truck.orbitRadiusFactor;
        const tx = Math.cos(currentAngle) * orbitR;
        const ty = Math.sin(currentAngle) * orbitR * Math.cos(truck.inclination);
        const tz = Math.sin(currentAngle) * orbitR * Math.sin(truck.inclination);

        const screenX = cx + tx;
        const screenY = cy + ty;

        // Tangent heading angle so truck faces precisely forward along its circular route
        const dtx = -Math.sin(currentAngle) * orbitR;
        const dty = Math.cos(currentAngle) * orbitR * Math.cos(truck.inclination);
        const heading = Math.atan2(dty, dtx);

        const isFront = tz >= -0.2;
        const alpha = isFront ? 1.0 : 0.65; // Kept visible throughout animation
        const scale = (tier === 'low' ? 0.8 : 1.05) * (isFront ? 1.0 : 0.88);

        ctx.save();
        ctx.translate(screenX, screenY);
        ctx.rotate(heading);
        ctx.scale(scale, scale);
        ctx.globalAlpha = alpha;

        // Motion taillight streak
        const trailGrad = ctx.createLinearGradient(-48, 0, -18, 0);
        trailGrad.addColorStop(0, 'rgba(239, 68, 68, 0)');
        trailGrad.addColorStop(1, 'rgba(239, 68, 68, 0.8)');
        ctx.fillStyle = trailGrad;
        ctx.fillRect(-45, -3, 30, 6);

        // Blit pre-rendered high-res truck sprite in a single drawImage call!
        const sprite = truck.spriteType === 'cyan' ? cyanTruckSprite : purpleTruckSprite;
        if (sprite) {
          ctx.drawImage(sprite, -38, -17, 90, 34);
        }

        // Twin LED forward headlights with soft light cone
        if (isFront && tier !== 'low') {
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(48, -4, 2, 0, Math.PI * 2);
          ctx.arc(48, 4, 2, 0, Math.PI * 2);
          ctx.fill();

          const beamGrad = ctx.createRadialGradient(48, 0, 2, 84, 0, 24);
          beamGrad.addColorStop(0, 'rgba(254, 240, 138, 0.5)');
          beamGrad.addColorStop(1, 'rgba(254, 240, 138, 0)');
          ctx.fillStyle = beamGrad;
          ctx.beginPath();
          ctx.moveTo(48, -5);
          ctx.lineTo(90, -14);
          ctx.lineTo(90, 14);
          ctx.lineTo(48, 5);
          ctx.closePath();
          ctx.fill();
        }

        ctx.restore();
      });

      // Continue 60fps RAF loop
      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (prefersReducedMotion) {
      // Render single static snapshot for accessibility
      render(startTime);
    } else {
      animationFrameId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible, tier]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="my-10 sm:my-14 rounded-3xl bg-gradient-to-b from-slate-950 via-[#140329] to-slate-950 border border-purple-500/30 shadow-2xl relative overflow-hidden"
    >
      {/* Background Soft Purple Radial Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(114,0,184,0.28)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* TOP HEADER: Main Label & Supporting Text */}
      <div className="relative z-10 pt-6 px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-b border-white/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-black tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>TRANSPORT ACROSS INDIA</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 mt-1.5 font-semibold">
            Connecting Cities. Moving Goods. Serving Businesses.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-purple-200 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-xl">
          <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="font-medium">Commercial Cargo Trucks in Active Transit</span>
        </div>
      </div>

      {/* 3D CANVAS ANIMATION AREA WITH DESKTOP SIDE CARDS */}
      <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] flex items-center justify-center">
        {canvasSupported ? (
          <canvas
            ref={canvasRef}
            className="w-full h-full block cursor-grab active:cursor-grabbing select-none"
            aria-label="Interactive 3D Earth showing Prisha Xpress transport network across India"
          />
        ) : (
          /* Graceful Fallback for browsers with disabled/unsupported canvas */
          <div className="text-center p-8 text-white space-y-3">
            <Navigation className="w-12 h-12 text-px-primary mx-auto animate-pulse" />
            <h4 className="text-lg font-bold">Pan-India Transport Network</h4>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Connecting Pune headquarters with major industrial corridors across India.
            </p>
          </div>
        )}

        {/* LEFT SIDE INFORMATION (Desktop Floating Card) */}
        <div className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 space-y-3 pointer-events-none z-20">
          <div className="p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-purple-400/25 text-left text-white shadow-xl max-w-[240px]">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold mb-1.5">
              <Navigation className="w-4 h-4" />
              <span className="text-sm font-black text-white">Our Transport Network</span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-normal">
              We connect different cities and business areas to help move goods across India.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE INFORMATION (Desktop Floating Card) */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 space-y-3 pointer-events-none z-20">
          <div className="p-4 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-purple-400/25 text-left text-white shadow-xl max-w-[240px]">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold mb-1.5">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-black text-white">Pune Operations Centre</span>
            </div>
            <p className="text-xs text-gray-200 leading-relaxed font-normal">
              Our team supports transport planning, drivers and daily delivery operations.
            </p>
          </div>
        </div>
      </div>

      {/* MOBILE SIDE CARDS (Rendered below canvas on mobile/tablet so canvas is never obscured) */}
      <div className="lg:hidden px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white">
          <p className="text-xs font-black text-cyan-400 flex items-center gap-1.5 mb-1">
            <Navigation className="w-3.5 h-3.5" />
            Our Transport Network
          </p>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            We connect different cities and business areas to help move goods across India.
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-white">
          <p className="text-xs font-black text-amber-400 flex items-center gap-1.5 mb-1">
            <MapPin className="w-3.5 h-3.5" />
            Pune Operations Centre
          </p>
          <p className="text-[11px] text-gray-300 leading-relaxed">
            Our team supports transport planning, drivers and daily delivery operations.
          </p>
        </div>
      </div>

      {/* BOTTOM CONNECTED CITIES LIST */}
      <div className="relative z-10 pb-5 px-4 sm:px-8 pt-3 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-300">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
          <span className="font-bold text-white text-[11px] uppercase tracking-wider flex items-center gap-1.5 mr-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            Connected Cities:
          </span>
          {['Pune (HQ)', 'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Ahmedabad', 'Kolkata'].map(
            (city, idx) => (
              <span
                key={city}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium border ${
                  idx === 0
                    ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 font-bold'
                    : 'bg-white/5 text-gray-200 border-white/10'
                }`}
              >
                {city}
              </span>
            )
          )}
        </div>

        <span className="text-[11px] text-purple-300/80 font-medium shrink-0">
          Smooth-Rotating 3D Transport Network
        </span>
      </div>
    </motion.div>
  );
};
