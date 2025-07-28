import { useModeStore } from '../../store/modeStore';
import React, { useEffect, useRef, useState } from 'react';

// Renk paletleri
const programmingPalettes = [
  ['#4F378B', '#7C3AED', '#38BDF8', '#FBBF24'],
  ['#833AB4', '#C13584', '#E1306C', '#F56040'], // Instagram mor-pembe-turuncu
  ['#405DE6', '#5851DB', '#FFDC80', '#FD1D1D'], // Instagram mavi-mor-sarı-kırmızı
  ['#FBBF24', '#4F378B', '#34D399', '#38BDF8'],
];
const civilPalettes = [
  ['#B45309', '#F59E42', '#B91C1C', '#1E3A8A'], // koyu sarı, parlak sarı-turuncu, koyu kırmızı, koyu mavi
  ['#F59E42', '#B91C1C', '#1E3A8A', '#D1FAE5'], // az açık yeşil
  ['#B91C1C', '#1E3A8A', '#D1FAE5', '#B45309'],
  ['#1E3A8A', '#D1FAE5', '#B45309', '#F59E42'],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function lerpColor(a: string, b: string, t: number) {
  const ah = a.startsWith('#') ? a.substring(1) : a;
  const bh = b.startsWith('#') ? b.substring(1) : b;
  const av = [parseInt(ah.substring(0,2),16),parseInt(ah.substring(2,4),16),parseInt(ah.substring(4,6),16)];
  const bv = [parseInt(bh.substring(0,2),16),parseInt(bh.substring(2,4),16),parseInt(bh.substring(4,6),16)];
  const rv = av.map((v,i) => Math.round(v + (bv[i]-v)*t));
  return `rgb(${rv[0]},${rv[1]},${rv[2]})`;
}

function useAnimatedPalette(palettes: string[][], duration = 10_000, ease = 0.08) {
  // Paletlerin sonuna ilk paleti ekleyerek döngüyü kapat
  const cyclicPalettes = React.useMemo(() => [...palettes, palettes[0]], [palettes]);
  const [current, setCurrent] = useState(cyclicPalettes[0]);
  const target = useRef(cyclicPalettes[1]);
  const idx = useRef(0);

  // Palet değişirse current'ı sıfırla
  useEffect(() => {
    setCurrent(cyclicPalettes[0]);
    target.current = cyclicPalettes[1] || cyclicPalettes[0];
    idx.current = 0;
  }, [cyclicPalettes]);

  useEffect(() => {
    let frame: number;
    let lastSwitch = Date.now();
    function animate() {
      setCurrent(prev => prev.map((c, i) => lerpColor(c, target.current[i], ease)));
      frame = requestAnimationFrame(animate);
      if (Date.now() - lastSwitch > duration) {
        idx.current = (idx.current + 1) % (cyclicPalettes.length - 1); // son palet tekrar ilk palet
        target.current = cyclicPalettes[idx.current + 1];
        lastSwitch = Date.now();
      }
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [cyclicPalettes, duration, ease]);
  return current;
}

// Organik şekil için border-radius stringi üret
function organicRadius(t: number, phase = 0) {
  // t: 0-1
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
  const startTimeRef = React.useRef<number>(Date.now());
  useEffect(() => {
    startTimeRef.current = Date.now(); // animasyon parametreleri değişirse baştan başlat
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

// Fade-in + scale-in animasyonu hook'u (gelişmiş: dışarıdan tetiklenebilir)
function useAppearControl(show: boolean, duration = 1200, delay = 0, onFadeOutEnd?: () => void, onFadeInEnd?: () => void) {
  const [progress, setProgress] = useState(show ? 1 : 0);
  const animating = useRef(false);
  useEffect(() => {
    let frame: number;
    const start = Date.now() + delay;
    animating.current = true;
    function animate() {
      const now = Date.now();
      let t = (now - start) / duration;
      t = Math.max(0, Math.min(1, t));
      // ease-in-out eğrisi uygula
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setProgress(show ? ease : 1 - ease);
      if ((show && t < 1) || (!show && t > 0)) {
        frame = requestAnimationFrame(animate);
      } else {
        animating.current = false;
        if (!show && onFadeOutEnd) onFadeOutEnd();
        if (show && onFadeInEnd) onFadeInEnd();
      }
    }
    animate();
    return () => cancelAnimationFrame(frame);
  }, [show, duration, delay, onFadeOutEnd, onFadeInEnd]);
  return progress;
}

export default function PlayStationBackground() {
  const { currentMode } = useModeStore();
  // --- Animasyonlu geçiş için local state ---
  const [displayedMode, setDisplayedMode] = useState(currentMode);
  // İlk başta opacity 0, scale 1.5'ten başlasın
  const [opacity, setOpacity] = useState(0);
  const [isScaled, setIsScaled] = useState(true); // true: 1.5, false: 1
  const [isFadingIn, setIsFadingIn] = useState(false);
  const fadeOutDuration = 400; // ms - kaybolma daha hızlı
  const fadeInDuration = 5000; // ms - doğma daha yavaş
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialFadeInDone = useRef(false);

  // İlk yüklemede fade-in animasyonu başlat
  useEffect(() => {
    if (!initialFadeInDone.current) {
      setIsFadingIn(true);
      setOpacity(0); // Başlangıçta görünmez
      setIsScaled(true); // büyükten başla
      requestAnimationFrame(() => setIsScaled(false)); // bir sonraki frame'de 1'e in
      setTimeout(() => {
        setOpacity(1); // scale animasyonu bittikten sonra görünür yap
      }, 900); // transform transition süresiyle aynı olmalı
      initialFadeInDone.current = true;
    }
  }, []);

  // Mode değişimini animasyonla yönet
  useEffect(() => {
    if (!initialFadeInDone.current) return; // İlk fade-in bitmeden mode değişimi olursa atla
    if (currentMode !== displayedMode) {
      // Önce fade out (sadece opacity ile kaybol)
      setIsFadingIn(false);
      setOpacity(0);
      // Fade out bitince displayedMode'u güncelle, fade in başlat
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => {
        setDisplayedMode(currentMode);
        setIsFadingIn(true);
        setOpacity(1);
        setIsScaled(true); // tekrar büyük başla
        requestAnimationFrame(() => setIsScaled(false)); // bir sonraki frame'de 1'e in
      }, fadeOutDuration);
    }
    return () => {
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [currentMode, displayedMode]);

  // Aktif animasyon süresini belirle
  const activeDuration = isFadingIn ? fadeInDuration : fadeOutDuration;

  // Sadece mode'a göre palet ve animasyonlar
  const palettes = displayedMode === 'programming' ? programmingPalettes : civilPalettes;
  // Renk animasyonları
  const mainColors = useAnimatedPalette(palettes, 12000, 0.07);
  const innerColors = useAnimatedPalette([...palettes.slice(1), palettes[0]], 9000, 0.09);
  const coreColors = useAnimatedPalette([...palettes.slice(2), palettes[0], palettes[1]], 7000, 0.12);
  // Organik animasyonlar
  const mainAnim = useOrganicAnimation({ duration: 16000, blur: 80, scaleBase: 1, scaleVar: 0.18, rotateVar: 18, leftBase: 38, leftVar: 5, topBase: 44, topVar: 4, phase: 0 });
  const innerAnim = useOrganicAnimation({ duration: 12000, blur: 60, scaleBase: 1, scaleVar: 0.22, rotateVar: 22, leftBase: 62, leftVar: 5, topBase: 56, topVar: 5, phase: 0.33 });
  const coreAnim = useOrganicAnimation({ duration: 9000, blur: 40, scaleBase: 1, scaleVar: 0.28, rotateVar: 28, leftBase: 54, leftVar: 6, topBase: 32, topVar: 6, phase: 0.66 });

  // Global scale ile organik scale'ı çarp: scaleX, scaleY
  function getTransform(anim: any) {
    const sx = anim.scaleX * (isScaled ? 1.5 : 1);
    const sy = anim.scaleY * (isScaled ? 1.5 : 1);
    return `translate(-50%, -50%) scale(${sx},${sy}) rotate(${anim.rotate}deg)`;
  }

  // Gradyanlar
  const mainGradient = `
    radial-gradient(circle at 15% 15%, ${mainColors[0]} 0%, ${mainColors[0]} 30%, transparent 60%),
    radial-gradient(circle at 85% 85%, ${mainColors[1]} 0%, ${mainColors[1]} 30%, transparent 60%),
    radial-gradient(circle at 50% 50%, ${mainColors[2]} 0%, ${mainColors[2]} 35%, transparent 70%),
    radial-gradient(circle at 10% 90%, ${mainColors[3]} 0%, ${mainColors[3]} 25%, transparent 55%)
  `;
  const innerGradient = `
    radial-gradient(circle at 25% 25%, ${innerColors[0]} 0%, ${innerColors[0]} 35%, transparent 70%),
    radial-gradient(circle at 75% 75%, ${innerColors[1]} 0%, ${innerColors[1]} 35%, transparent 70%),
    radial-gradient(circle at 50% 50%, ${innerColors[2]} 0%, ${innerColors[2]} 40%, transparent 80%),
    radial-gradient(circle at 15% 85%, ${innerColors[3]} 0%, ${innerColors[3]} 30%, transparent 65%)
  `;
  const coreGradient = `
    radial-gradient(circle at 50% 50%, ${coreColors[0]} 0%, ${coreColors[0]} 50%, transparent 80%),
    radial-gradient(circle at 50% 50%, ${coreColors[1]} 0%, ${coreColors[1]} 50%, transparent 80%)
  `;

  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-black" style={{ backgroundColor: '#0A0A0A' }}></div>
      <div
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
          transition: `background-image 4s cubic-bezier(.4,0,.2,1), opacity ${activeDuration}ms cubic-bezier(.4,0,.2,1), transform 900ms cubic-bezier(.4,0,.2,1)`,
          opacity,
          transform: getTransform(mainAnim),
        }}
      />
      <div
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
          transition: `background-image 4s cubic-bezier(.4,0,.2,1), opacity ${activeDuration}ms cubic-bezier(.4,0,.2,1), transform 900ms cubic-bezier(.4,0,.2,1)`,
          opacity,
          transform: getTransform(innerAnim),
        }}
      />
      <div
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
          transition: `background-image 4s cubic-bezier(.4,0,.2,1), opacity ${activeDuration}ms cubic-bezier(.4,0,.2,1), transform 900ms cubic-bezier(.4,0,.2,1)`,
          opacity,
          transform: getTransform(coreAnim),
        }}
      />
    </div>
  );
}
