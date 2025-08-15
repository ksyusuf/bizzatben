import { useModeStore } from '../../store/modeStore';
import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { interpolateRgb } from 'd3-interpolate';

const programmingPalettes = [
  ['#7B1FA2', '#D81B60', '#C62828'],
  ['#1565C0', '#00838F', '#2E7D32']
];
const civilPalettes = [
  ['#FF8A00', '#FF5722', '#F4511E'],
  ['#303F9F', '#26A69A', '#8BC34A']
];

// Pre-calculate trigonometric values
const TRIG_CACHE_SIZE = 360;
const sinCache = new Float32Array(TRIG_CACHE_SIZE);
const cosCache = new Float32Array(TRIG_CACHE_SIZE);

// Initialize trig cache
for (let i = 0; i < TRIG_CACHE_SIZE; i++) {
  const angle = (i * 2 * Math.PI) / TRIG_CACHE_SIZE;
  sinCache[i] = Math.sin(angle);
  cosCache[i] = Math.cos(angle);
}

function getCachedSin(t: number): number {
  const index = Math.floor(((t % 1) * TRIG_CACHE_SIZE)) % TRIG_CACHE_SIZE;
  return sinCache[index];
}

function getCachedCos(t: number): number {
  const index = Math.floor(((t % 1) * TRIG_CACHE_SIZE)) % TRIG_CACHE_SIZE;
  return cosCache[index];
}

// Optimized organic radius with cached trig functions
function organicRadius(t: number, phase = 0): string {
  const baseT = t + phase;
  const a = 50 + 10 * getCachedSin(2 * baseT);
  const b = 50 + 10 * getCachedSin(2 * baseT + 0.25);
  const c = 50 + 10 * getCachedSin(2 * baseT + 0.5);
  const d = 50 + 10 * getCachedSin(2 * baseT + 0.75);
  return `${a.toFixed(1)}% ${b.toFixed(1)}% ${c.toFixed(1)}% ${d.toFixed(1)}% / ${d.toFixed(1)}% ${a.toFixed(1)}% ${b.toFixed(1)}% ${c.toFixed(1)}%`;
}

export default function PlayStationBackgroundOptimized() {
  const { currentMode } = useModeStore();
  const [displayedMode, setDisplayedMode] = useState(currentMode);
  const [isAnimating, setIsAnimating] = useState(false);

  const mainRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  // Memoize layer configuration
  const layerConfig = useMemo(() => [
    {
      paletteDuration: 24000,
      animDuration: 32000,
      scaleBase: 1,
      scaleVar: 0.12,
      rotateVar: 12,
      leftBase: 38,
      leftVar: 3,
      topBase: 44,
      topVar: 3,
      phase: 0
    },
    {
      paletteDuration: 18000,
      animDuration: 24000,
      scaleBase: 1,
      scaleVar: 0.15,
      rotateVar: 15,
      leftBase: 62,
      leftVar: 3,
      topBase: 56,
      topVar: 3,
      phase: 0.33
    }
  ], []);

  useEffect(() => {
    const layers = [
      { el: mainRef.current, config: layerConfig[0] },
      { el: innerRef.current, config: layerConfig[1] }
    ];

    if (!layers.every(layer => layer.el)) return;

    let frameId: number;
    const startTime = performance.now();
    
    // Mobil cihazlar için animasyonu zorla başlat
    const forceStartAnimation = () => {
      if (layers.every(layer => layer.el)) {
        layers.forEach((layer) => {
          if (layer.el) {
            layer.el.style.opacity = '1';
            layer.el.style.transform = 'translate(-50%, -50%) scale(1,1) rotate(0deg)';
          }
        });
      }
    };
    
    // Sayfa yüklendiğinde ve görünür olduğunda animasyonu başlat
    if (document.visibilityState === 'visible') {
      forceStartAnimation();
    }
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        forceStartAnimation();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const palettes = displayedMode === 'programming' ? programmingPalettes : civilPalettes;
    const cyclicPalettes = [...palettes, palettes[0]];

    // Pre-interpolate colors for smooth transitions
    const interpolatedPalettes = cyclicPalettes.map((palette, i) => {
      const nextPalette = cyclicPalettes[(i + 1) % cyclicPalettes.length];
      return palette.map((color, j) => interpolateRgb(color, nextPalette[j] || color));
    });

    const paletteIdx = Array(layers.length).fill(0);
    const paletteProgress = Array(layers.length).fill(0);
    
         // Cache for expensive calculations
     let lastUpdateTime = 0;
     const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
     const UPDATE_INTERVAL = isMobile ? 16.67 : 33.33; // Mobilde 60fps, desktop'ta 30fps

    // Pre-calculate some constants
    const TWO_PI = Math.PI * 2;

    
    function animate(now: number) {
      // Throttle updates to 60fps max
      if (now - lastUpdateTime < UPDATE_INTERVAL) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      lastUpdateTime = now;

      const elapsed = now - startTime;

      layers.forEach((layer, i) => {
        if (!layer.el || isAnimating) return;

        const config = layer.config;

        // Color transition logic - simplified
        paletteProgress[i] += (UPDATE_INTERVAL / config.paletteDuration);
        let t = paletteProgress[i];
        if (t >= 1) {
          paletteProgress[i] = 0;
          paletteIdx[i] = (paletteIdx[i] + 1) % (cyclicPalettes.length - 1);
          t = 0;
        }

        // Use pre-interpolated colors
        const interpolators = interpolatedPalettes[paletteIdx[i]];
        const colors = interpolators.map(interp => interp(t));

        // Animation calculations with cached trig
        const tAnim = ((elapsed % config.animDuration) / config.animDuration + config.phase) % 1;
        
        const scaleX = config.scaleBase + config.scaleVar * getCachedSin(TWO_PI * tAnim);
        const scaleY = config.scaleBase + config.scaleVar * getCachedCos(TWO_PI * tAnim);
        const rotate = config.rotateVar * getCachedSin(TWO_PI * tAnim + config.phase);
        const left = config.leftBase + config.leftVar * getCachedSin(TWO_PI * tAnim + config.phase);
        const top = config.topBase + config.topVar * getCachedCos(TWO_PI * tAnim + config.phase);

        // Batch style updates
        const elStyle = layer.el.style;
        const transforms = `translate(-50%, -50%) scale(${scaleX.toFixed(3)},${scaleY.toFixed(3)}) rotate(${rotate.toFixed(1)}deg)`;
        
        // Only update if values changed significantly
        elStyle.left = `${left.toFixed(1)}%`;
        elStyle.top = `${top.toFixed(1)}%`;
        elStyle.borderRadius = organicRadius(tAnim, config.phase);
        elStyle.transform = transforms;
        elStyle.backgroundImage = `
          radial-gradient(circle at 15% 15%, ${colors[0]} 0%, ${colors[0]} 30%, transparent 60%),
          radial-gradient(circle at 85% 85%, ${colors[1]} 0%, ${colors[1]} 30%, transparent 60%),
          radial-gradient(circle at 50% 50%, ${colors[2]} 0%, ${colors[2]} 35%, transparent 70%)
        `;
      });

      frameId = requestAnimationFrame(animate);
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [displayedMode, layerConfig]);

  useEffect(() => {
    const shapes = [mainRef.current, innerRef.current];
    if (!shapes.every(Boolean)) return;

    if (currentMode !== displayedMode) {
      // Completely kill all existing animations first
      gsap.killTweensOf(shapes);
      setIsAnimating(true);
      
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayedMode(currentMode);
          setIsAnimating(false);
          
          // Set initial state explicitly to prevent flash
          gsap.set(shapes, { 
            opacity: 0,
            scale: 1,
            clearProps: 'transform'
          });
        }
      });
      
      // Fade out current mode - faster
      tl.to(shapes, {
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out'
      });
      
         } else {
       // Initial load - set initial state first
       setIsAnimating(true);
       gsap.set(shapes, { 
         opacity: 0,
         scale: 0.4
       });
       
       // Mobil cihazlar için daha hızlı ve agresif animasyon
       const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
       
       gsap.to(shapes, {
         opacity: 1,
         duration: isMobile ? 2 : 5,
         ease: 'none',
         delay: isMobile ? 0.1 : 1,
         onComplete: () => setIsAnimating(false)
       });
     }

    return () => {
      gsap.killTweensOf(shapes);
    };
  }, [currentMode, displayedMode]);

  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="absolute inset-0 bg-black"
        style={{ backgroundColor: '#0A0A0A' }}
      />
      <div
        ref={mainRef}
        className="absolute"
        style={{ width: '72vw', height: '72vw', pointerEvents: 'none', zIndex: 1 }}
      />
      <div
        ref={innerRef}
        className="absolute"
        style={{ width: '54vw', height: '54vw', pointerEvents: 'none', zIndex: 2 }}
      />
      <div
        className="absolute inset-0"
        style={{ 
          backdropFilter: 'blur(50px)',
          WebkitBackdropFilter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 3
        }}
      />
    </div>
  );
}
