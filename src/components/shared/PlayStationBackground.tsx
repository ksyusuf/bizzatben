import { useModeStore } from '../../store/modeStore';
import React, { useEffect, useRef, useState } from 'react';

// Renk paletleri
const programmingPalettes = [
  ['#10B981', '#8B5CF6', '#6b90cc', '#ec4899'],
  ['#8B5CF6', '#6b90cc', '#ec4899', '#10B981'],
  ['#6b90cc', '#ec4899', '#10B981', '#8B5CF6'],
  ['#ec4899', '#10B981', '#8B5CF6', '#6b90cc'],
];
const civilPalettes = [
  ['#D97706', '#F59E0B', '#FFAA5A', '#4B5563'],
  ['#F59E0B', '#FFAA5A', '#4B5563', '#D97706'],
  ['#FFAA5A', '#4B5563', '#D97706', '#F59E0B'],
  ['#4B5563', '#D97706', '#F59E0B', '#FFAA5A'],
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
  // İlk başta opacity 0, scale 1'den başlasın (eski hali)
  const [opacity, setOpacity] = useState(0);
  const [transitionScale, setTransitionScale] = useState(1);
  const [isFadingIn, setIsFadingIn] = useState(false);
  const fadeOutDuration = 400; // ms - kaybolma daha hızlı
  const fadeInDuration = 5000; // ms - doğma daha yavaş
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initialFadeInDone = useRef(false);

  // İlk yüklemede fade-in animasyonu başlat
  useEffect(() => {
    if (!initialFadeInDone.current) {
      setIsFadingIn(true);
      setOpacity(1);
      setTransitionScale(1.5); // büyükten başla
      setTimeout(() => setTransitionScale(1), 20); // scale animasyonu
      initialFadeInDone.current = true;
    }
  }, []);

  // Mode değişimini animasyonla yönet
  useEffect(() => {
    if (!initialFadeInDone.current) return; // İlk fade-in bitmeden mode değişimi olursa atla
    if (currentMode !== displayedMode) {
      // Önce fade out (küçülerek kaybol)
      setIsFadingIn(false);
      setOpacity(0);
      setTransitionScale(0.1); // tamamen 0 yerine biraz görünür kal
      // Fade out bitince displayedMode'u güncelle, fade in başlat
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
      fadeTimeout.current = setTimeout(() => {
        setDisplayedMode(currentMode);
        setIsFadingIn(true);
        setOpacity(1);
        setTransitionScale(1.5); // daha büyük başla
        setTimeout(() => setTransitionScale(1), 20);
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
  const mainAnim = useOrganicAnimation({ duration: 16000, blur: 80, scaleBase: 1, scaleVar: 0.18, rotateVar: 18, leftBase: 38, leftVar: 10, topBase: 44, topVar: 8, phase: 0 });
  const innerAnim = useOrganicAnimation({ duration: 12000, blur: 60, scaleBase: 1, scaleVar: 0.22, rotateVar: 22, leftBase: 62, leftVar: 10, topBase: 56, topVar: 10, phase: 0.33 });
  const coreAnim = useOrganicAnimation({ duration: 9000, blur: 40, scaleBase: 1, scaleVar: 0.28, rotateVar: 28, leftBase: 54, leftVar: 12, topBase: 32, topVar: 12, phase: 0.66 });

  // Global scale ile organik scale'ı çarp: scaleX, scaleY
  function getTransform(anim: any) {
    const sx = anim.scaleX * transitionScale;
    const sy = anim.scaleY * transitionScale;
    return `translate(-50%, -50%) scale(${sx},${sy}) rotate(${anim.rotate}deg)`;
  }

  // Gradyanlar
  const mainGradient = `
    radial-gradient(circle at 15% 15%, ${mainColors[0]} 0%, ${mainColors[0]} 45%, transparent 75%),
    radial-gradient(circle at 85% 85%, ${mainColors[1]} 0%, ${mainColors[1]} 45%, transparent 75%),
    radial-gradient(circle at 50% 50%, ${mainColors[2]} 0%, ${mainColors[2]} 55%, transparent 85%),
    radial-gradient(circle at 10% 90%, ${mainColors[3]} 0%, ${mainColors[3]} 40%, transparent 70%)
  `;
  const innerGradient = `
    radial-gradient(circle at 25% 25%, ${innerColors[0]} 0%, ${innerColors[0]} 55%, transparent 85%),
    radial-gradient(circle at 75% 75%, ${innerColors[1]} 0%, ${innerColors[1]} 55%, transparent 85%),
    radial-gradient(circle at 50% 50%, ${innerColors[2]} 0%, ${innerColors[2]} 65%, transparent 95%),
    radial-gradient(circle at 15% 85%, ${innerColors[3]} 0%, ${innerColors[3]} 50%, transparent 80%)
  `;
  const coreGradient = `
    radial-gradient(circle at 50% 50%, ${coreColors[0]} 0%, ${coreColors[0]} 75%, transparent 95%),
    radial-gradient(circle at 50% 50%, ${coreColors[1]} 0%, ${coreColors[1]} 75%, transparent 95%)
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
          width: '80vw',
          height: '80vw',
          pointerEvents: 'none',
          zIndex: 1,
          backgroundImage: mainGradient,
          transition: `background-image 4s cubic-bezier(.4,0,.2,1), opacity ${activeDuration}ms cubic-bezier(.4,0,.2,1), transform ${activeDuration}ms cubic-bezier(.4,0,.2,1)`,
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
          width: '60vw',
          height: '60vw',
          pointerEvents: 'none',
          zIndex: 2,
          backgroundImage: innerGradient,
          transition: `background-image 4s cubic-bezier(.4,0,.2,1), opacity ${activeDuration}ms cubic-bezier(.4,0,.2,1), transform ${activeDuration}ms cubic-bezier(.4,0,.2,1)`,
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
          width: '38vw',
          height: '38vw',
          pointerEvents: 'none',
          zIndex: 3,
          backgroundImage: coreGradient,
          transition: `background-image 4s cubic-bezier(.4,0,.2,1), opacity ${activeDuration}ms cubic-bezier(.4,0,.2,1), transform ${activeDuration}ms cubic-bezier(.4,0,.2,1)`,
          opacity,
          transform: getTransform(coreAnim),
        }}
      />
    </div>
  );
}
