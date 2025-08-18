import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { useModeStore } from '../../store/modeStore';
import '../../assets/playstation-background.css';

// Renk paletleri
const programmingPalettes: string[][] = [
  ['#7B1FA2', '#D81B60', '#C62828'], // Dış hüzme için mor, pembe, kırmızı tonları
  ['#1565C0', '#00838F', '#2E7D32']  // İç hüzme için mavi, turkuaz, yeşil tonları
];

const civilPalettes: string[][] = [
  ['#FF8A00', '#FF5722', '#F4511E'], // Dış hüzme için turuncu, kırmızı tonları
  ['#303F9F', '#26A69A', '#8BC34A']  // İç hüzme için lacivert, turkuaz, açık yeşil tonları
];

// Ana uygulama bileşeni
const App: FC = () => {
  const { currentMode } = useModeStore();
  const [displayedMode, setDisplayedMode] = useState<'programming' | 'civil'>(currentMode);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  
  // Işık hüzmeleri için ref'ler
  const innerBeamRef = useRef<HTMLDivElement>(null);
  const outerBeamRef = useRef<HTMLDivElement>(null);

  // Paletleri moda göre seçen fonksiyon
  const getPalettes = (mode: 'programming' | 'civil'): string[][] => {
    return mode === 'programming' ? programmingPalettes : civilPalettes;
  };

  useEffect(() => {
    const shapes = [outerBeamRef.current, innerBeamRef.current].filter(Boolean) as HTMLDivElement[];
    if (!shapes.length) return;
  
    setIsAnimating(true);
  
    shapes.forEach(el => {
      el.style.transition = 'opacity 5s ease-in-out';
      // requestAnimationFrame ile bir frame gecikmeli fade-in
      requestAnimationFrame(() => {
        el.style.opacity = '1';
      });
    });
  
    const fadeInTimeout = setTimeout(() => setIsAnimating(false), 5000);
    return () => clearTimeout(fadeInTimeout);
  }, []);

useEffect(() => {
  if (currentMode !== displayedMode) {
    const shapes = [outerBeamRef.current, innerBeamRef.current].filter(Boolean) as HTMLDivElement[];
    if (!shapes.length) return;

    if (isAnimating) {
      // Mevcut animasyonu durdur
      shapes.forEach(el => {
        const computedOpacity = getComputedStyle(el).opacity;
        el.style.transition = '';
        el.style.opacity = computedOpacity; // mevcut durumda bırak
      });
    }

    setIsAnimating(true);

    // Kaybolma animasyonu
    shapes.forEach(el => {
      el.style.transition = 'opacity 0.4s ease-in-out';
      el.style.opacity = '0';
    });

    setTimeout(() => {
      setTimeout(() => {
        setDisplayedMode(currentMode);
        // Belirme animasyonu
        shapes.forEach(el => {
          el.style.opacity = '0';
          el.style.transition = 'opacity 5s ease-in-out';
          requestAnimationFrame(() => {
            el.style.opacity = '1';
          });
        });
      setTimeout(() => setIsAnimating(false), 5000);
      }, 900); // belirme öncesi delay
    }, 400); // kaybolma animasyonu süresi
  }
}, [currentMode, displayedMode]);

  // Seçilen paletleri al
  const selectedPalettes = getPalettes(displayedMode);
  
  return (
    <div className=" ">
      {/* Işık Hüzmelerini içeren ana div */}
      <div className="fixed inset-0 -z-10 flex items-center justify-center">
        {/* Sizin siyah arka planınız */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: '#0A0A0A' }}
        />
        
        {/* Dış Işık Hüzmesi - Sizin mainRef diviniz üzerine oturtuldu */}
        <div
          ref={outerBeamRef}
          className={`beam animate-outer-beam-move mix-blend-screen`}
          style={{ width: '72vw', height: '72vw', zIndex: 1, background: `radial-gradient(circle, ${selectedPalettes[0][0]} 0%, ${selectedPalettes[0][1]} 50%, ${selectedPalettes[0][2]} 100%)` }}
        ></div>
        
        {/* İç Işık Hüzmesi - Sizin innerRef diviniz üzerine oturtuldu */}
        <div
          ref={innerBeamRef}
          className={`beam animate-inner-beam-move mix-blend-screen`}
          style={{ width: '54vw', height: '54vw', zIndex: 2, background: `radial-gradient(circle, ${selectedPalettes[1][0]} 0%, ${selectedPalettes[1][1]} 50%, ${selectedPalettes[1][2]} 100%)` }}
        ></div>
      </div>
    </div>
  );
}

export default App;
