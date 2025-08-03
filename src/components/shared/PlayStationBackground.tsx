import { useModeStore } from '../../store/modeStore';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { interpolateRgb } from 'd3-interpolate';

// Renk paletleri
const programmingPalettes = [
    ['#7B1FA2', '#D81B60', '#C62828'],
    ['#1565C0', '#00838F', '#2E7D32']
];
const civilPalettes = [
    ['#FF8A00', '#FF5722', '#F4511E'],
    ['#303F9F', '#26A69A', '#8BC34A']
];

function useAnimatedPalette(palettes: string[][], duration = 10_000) {
  // cyclicPalettes'i oluştururken son eleman olarak ilk paleti ekleyerek döngüsel hale getiriyoruz.
  const cyclicPalettes = React.useMemo(() => [...palettes, palettes[0]], [palettes]);
  
  // İlk renk setini state olarak ayarla.
  const [colors, setColors] = useState(cyclicPalettes[0]);
  const idx = useRef(0);
  const progress = useRef(0);
  const lastUpdate = useRef(Date.now());

  useEffect(() => {
    let frame: number;
    function animate() {
      const now = Date.now();
      const delta = now - lastUpdate.current;
      lastUpdate.current = now;

      progress.current += delta / duration;
      let t = progress.current;
      if (t >= 1) {
        t = 1;
      }

      const from = cyclicPalettes[idx.current];
      // to paletini her zaman geçerli bir değer olacak şekilde ayarla
      const to = cyclicPalettes[(idx.current + 1) % cyclicPalettes.length];

      const newColors = from.map((color, i) => {
        // to[i] undefined olmaması için kontrol ekle
        const targetColor = (to && to.length > i) ? to[i] : color; // Eğer to[i] yoksa mevcut rengi kullan
        const interp = interpolateRgb(color, targetColor);
        return interp(t);
      });

      setColors(newColors);

      if (progress.current >= 1) {
        progress.current = 0;
        // Bir sonraki palete geç, cyclicPalettes'in uzunluğuna göre mod alarak döngüyü tamamla
        // Eğer cyclicPalettes sadece tek bir palet içeriyorsa (safePalettes boş geldiğinde),
        // idx.current = 0 olarak kalacaktır.
        idx.current = (idx.current + 1) % (cyclicPalettes.length > 1 ? cyclicPalettes.length - 1 : 1); 
        setColors(to); // Ensure colors snap to target palette at the end
      }
      frame = requestAnimationFrame(animate); // Keep animating
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cyclicPalettes, duration]);

  return colors;
}

// Organik şekil için border-radius stringi üret
function organicRadius(t: number, phase = 0) {
  const a = 50 + 10 * Math.sin(2 * Math.PI * t + phase);
  const b = 50 + 10 * Math.sin(2 * Math.PI * t + 1 + phase);
  const c = 50 + 10 * Math.sin(2 * Math.PI * t + 2 + phase);
  const d = 50 + 10 * Math.sin(2 * Math.PI * t + 3 + phase);
  return `${a}% ${b}% ${c}% ${d}% / ${d}% ${a}% ${b}% ${c}%`;
}

function useOrganicAnimation({
  duration = 12000,
  blur = 80,
  scaleBase = 1,
  scaleVar = 0.15,
  rotateVar = 20,
  leftBase = 50,
  leftVar = 12,
  topBase = 50,
  topVar = 12,
  phase = 0,
}) {
  const [state, setState] = useState({
    filter: `blur(${blur}px)`,
    borderRadius: '50%',
    left: `${leftBase}%`,
    top: `${topBase}%`,
    scaleX: scaleBase,
    scaleY: scaleBase,
    rotate: 0,
  });
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
  }, [duration, blur, scaleBase, scaleVar, rotateVar, leftBase, leftVar, topBase, topVar, phase]);

  useEffect(() => {
    let frame: number;
    function animate() {
      const now = Date.now();
      const t = (((now - startTimeRef.current) / duration) + phase) % 1;
      const scaleX = scaleBase + scaleVar * Math.sin(2 * Math.PI * t);
      const scaleY = scaleBase + scaleVar * Math.cos(2 * Math.PI * t);
      const rotate = rotateVar * Math.sin(2 * Math.PI * t + phase);
      const left = leftBase + leftVar * Math.sin(2 * Math.PI * t + phase);
      const top = topBase + topVar * Math.cos(2 * Math.PI * t + phase);

      setState({
        filter: `blur(${blur}px)`,
        borderRadius: organicRadius(t, phase),
        left: `${left}%`,
        top: `${top}%`,
        scaleX,
        scaleY,
        rotate,
      });
      frame = requestAnimationFrame(animate);
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [duration, blur, scaleBase, scaleVar, rotateVar, leftBase, leftVar, topBase, topVar, phase]);
  return state;
}

export default function PlayStationBackground() {
  const { currentMode } = useModeStore();
  const [displayedMode, setDisplayedMode] = useState(currentMode); // İlk yüklemede mevcut modu ayarla

  const mainShapeRef = useRef<HTMLDivElement>(null);
  const innerShapeRef = useRef<HTMLDivElement>(null);
  const coreShapeRef = useRef<HTMLDivElement>(null);

  const getTransform = useCallback((anim: any, globalScale: number) => {
    // Organik animasyondan gelen scale değerleri ile GSAP'ten gelen globalScale'ı çarpıyoruz.
    const sx = anim.scaleX * globalScale;
    const sy = anim.scaleY * globalScale;
    return `translate(-50%, -50%) scale(${sx},${sy}) rotate(${anim.rotate}deg)`;
  }, []);

  // Sayfa yüklendiğinde veya displayedMode güncellendiğinde renk paletini ve organik animasyonları yenile
  const palettes = displayedMode === 'programming' ? programmingPalettes : civilPalettes;

  const mainColors = useAnimatedPalette(palettes, 12000);
  const innerColors = useAnimatedPalette(palettes, 9000);
  const coreColors = useAnimatedPalette(palettes, 7000);


  const mainAnim = useOrganicAnimation({ duration: 16000, blur: 80, scaleBase: 1, scaleVar: 0.18, rotateVar: 18, leftBase: 38, leftVar: 5, topBase: 44, topVar: 4, phase: 0 });
  const innerAnim = useOrganicAnimation({ duration: 12000, blur: 60, scaleBase: 1, scaleVar: 0.22, rotateVar: 22, leftBase: 62, leftVar: 5, topBase: 56, topVar: 5, phase: 0.33 });
  const coreAnim = useOrganicAnimation({ duration: 9000, blur: 40, scaleBase: 1, scaleVar: 0.28, rotateVar: 28, leftBase: 54, leftVar: 6, topBase: 32, topVar: 6, phase: 0.66 });

  // GSAP timeline for mode transitions (opacity and global scale)
  useEffect(() => {
    const shapes = [mainShapeRef.current, innerShapeRef.current, coreShapeRef.current];

    // İlk yüklenme animasyonu
    if (currentMode === displayedMode) {
      gsap.fromTo(
        shapes,
        { opacity: 0, scale: 0.5 }, // Yoktan, sıfır scale ile başla
        {
          opacity: 1,
          scale: 1, // Normal boyutuna büyüt
          duration: 5, // Daha hızlı bir büyüme süresi
          ease: 'back.out',
          delay: 1,
          onComplete: () => {
            // İlk animasyon bittiğinde
          }
        }
      );
    }

    // Mode değişim animasyonu
    if (currentMode !== displayedMode) {
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayedMode(currentMode); // Fade-out bittikten sonra modu güncelle
          // Yeni modun fade-in animasyonu
          gsap.fromTo(
            shapes,
            { opacity: 0, scale: 0.7 }, // Yoktan, sıfır scale ile başla
            {
              opacity: 1,
              scale: 1, // Normal boyutuna büyüt
              duration: 2.4, // Daha hızlı bir büyüme süresi
              ease: 'back.out',
            }
          );
        }
      });

      // Mevcut modun fade out ve küçülme animasyonu
      tl.to(shapes, {
        opacity: 0,
        scale: 2.5, // Sıfır scale'e büyüt
        duration: 1, // Hızlı küçülme
        ease: 'power4.out',
      });
    }

    return () => {
      // Bileşen unmount edildiğinde veya effect yeniden çalıştığında aktif GSAP animasyonlarını öldür
      gsap.killTweensOf(shapes);
    };
  }, [currentMode, displayedMode]); // currentMode veya displayedMode değiştiğinde bu effect çalışır

  // Gradyanlar
  const mainGradient = `
    radial-gradient(circle at 15% 15%, ${mainColors[0]} 0%, ${mainColors[0]} 30%, transparent 60%),
    radial-gradient(circle at 85% 85%, ${mainColors[1]} 0%, ${mainColors[1]} 30%, transparent 60%),
    radial-gradient(circle at 50% 50%, ${mainColors[2]} 0%, ${mainColors[2]} 35%, transparent 70%)
  `;
  const innerGradient = `
    radial-gradient(circle at 25% 25%, ${innerColors[0]} 0%, ${innerColors[0]} 35%, transparent 70%),
    radial-gradient(circle at 75% 75%, ${innerColors[1]} 0%, ${innerColors[1]} 35%, transparent 70%),
    radial-gradient(circle at 50% 50%, ${innerColors[2]} 0%, ${innerColors[2]} 40%, transparent 80%)
  `;
  const coreGradient = `
    radial-gradient(circle at 50% 50%, ${coreColors[0]} 0%, ${coreColors[0]} 50%, transparent 80%),
    radial-gradient(circle at 50% 50%, ${coreColors[1]} 0%, ${coreColors[1]} 50%, transparent 80%),
    radial-gradient(circle at 50% 50%, ${coreColors[2]} 0%, ${coreColors[2]} 50%, transparent 80%)
  `;

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" style={{ backgroundColor: '#0A0A0A' }}></div>
      <div
        ref={mainShapeRef}
        className="absolute"
        style={{
          filter: mainAnim.filter,
          borderRadius: mainAnim.borderRadius,
          left: mainAnim.left,
          top: mainAnim.top,
          width: '72vw',
          height: '72vw',
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: mainGradient,
          transition: `background-image 4s cubic-bezier(.4,0,.2,1)`,
          transform: getTransform(mainAnim, 1),
        }}
      />
      <div
        ref={innerShapeRef}
        className="absolute"
        style={{
          filter: innerAnim.filter,
          borderRadius: innerAnim.borderRadius,
          left: innerAnim.left,
          top: innerAnim.top,
          width: '54vw',
          height: '54vw',
          pointerEvents: 'none',
          zIndex: 2,
          backgroundImage: innerGradient,
          transition: `background-image 4s cubic-bezier(.4,0,.2,1)`,
          transform: getTransform(innerAnim, 1),
        }}
      />
      <div
        ref={coreShapeRef}
        className="absolute"
        style={{
          filter: coreAnim.filter,
          borderRadius: coreAnim.borderRadius,
          left: coreAnim.left,
          top: coreAnim.top,
          width: '34vw',
          height: '34vw',
          pointerEvents: 'none',
          zIndex: 3,
          backgroundImage: coreGradient,
          transition: `background-image 4s cubic-bezier(.4,0,.2,1)`,
          transform: getTransform(coreAnim, 1),
        }}
      />
    </div>
  );
}