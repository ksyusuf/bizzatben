import { useModeStore } from '../../store/modeStore';
import { useEffect, useRef, useState } from 'react';
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

function organicRadius(t: number, phase = 0) {
    const a = 50 + 10 * Math.sin(2 * Math.PI * t + phase);
    const b = 50 + 10 * Math.sin(2 * Math.PI * t + 1 + phase);
    const c = 50 + 10 * Math.sin(2 * Math.PI * t + 2 + phase);
    const d = 50 + 10 * Math.sin(2 * Math.PI * t + 3 + phase);
    return `${a}% ${b}% ${c}% ${d}% / ${d}% ${a}% ${b}% ${c}%`;
}

export default function PlayStationBackgroundOptimized() {
    const { currentMode } = useModeStore();
    const [displayedMode, setDisplayedMode] = useState(currentMode);

    const mainRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);

    // Animasyon parametreleri
    const createLayers = () => [
        {
            el: mainRef.current,
            paletteDuration: 12000,
            animDuration: 16000,
            blur: 50,
            size: '72vw',
            scaleBase: 1,
            scaleVar: 0.18,
            rotateVar: 18,
            leftBase: 38,
            leftVar: 5,
            topBase: 44,
            topVar: 4,
            phase: 0
        },
        {
            el: innerRef.current,
            paletteDuration: 9000,
            animDuration: 12000,
            blur: 35,
            size: '54vw',
            scaleBase: 1,
            scaleVar: 0.22,
            rotateVar: 22,
            leftBase: 62,
            leftVar: 5,
            topBase: 56,
            topVar: 5,
            phase: 0.33
        }
    ];

    useEffect(() => {
        let frameId: number;
        const startTime = performance.now();

        const palettes =
            displayedMode === 'programming' ? programmingPalettes : civilPalettes;
        const cyclicPalettes = [...palettes, palettes[0]];

        const layers = createLayers();
        const paletteIdx = Array(layers.length).fill(0);
        const paletteProgress = Array(layers.length).fill(0);

        function animate(now: number) {
            const elapsed = now - startTime;

            layers.forEach((layer, i) => {
                if (!layer.el) return;

                // Renk geçişi
                paletteProgress[i] += (16.67 / layer.paletteDuration);
                let t = paletteProgress[i];
                if (t >= 1) {
                    t = 0;
                    paletteProgress[i] = 0;
                    paletteIdx[i] =
                        (paletteIdx[i] + 1) % (cyclicPalettes.length - 1);
                }

                const from = cyclicPalettes[paletteIdx[i]];
                const to = cyclicPalettes[(paletteIdx[i] + 1) % cyclicPalettes.length];
                const colors = from.map((c, j) =>
                    interpolateRgb(c, to[j] || c)(t)
                );

                // Organik hareket
                const tAnim =
                    ((elapsed % layer.animDuration) / layer.animDuration + layer.phase) % 1;
                const scaleX = layer.scaleBase + layer.scaleVar * Math.sin(2 * Math.PI * tAnim);
                const scaleY = layer.scaleBase + layer.scaleVar * Math.cos(2 * Math.PI * tAnim);
                const rotate = layer.rotateVar * Math.sin(2 * Math.PI * tAnim + layer.phase);
                const left = layer.leftBase + layer.leftVar * Math.sin(2 * Math.PI * tAnim + layer.phase);
                const top = layer.topBase + layer.topVar * Math.cos(2 * Math.PI * tAnim + layer.phase);

                layer.el.style.left = `${left}%`;
                layer.el.style.top = `${top}%`;
                layer.el.style.borderRadius = organicRadius(tAnim, layer.phase);
                layer.el.style.filter = `blur(${layer.blur}px)`;
                layer.el.style.transform = `translate(-50%, -50%) scale(${scaleX},${scaleY}) rotate(${rotate}deg)`;
                layer.el.style.backgroundImage = `
                  radial-gradient(circle at 15% 15%, ${colors[0]} 0%, ${colors[0]} 30%, transparent 60%),
                  radial-gradient(circle at 85% 85%, ${colors[1]} 0%, ${colors[1]} 30%, transparent 60%),
                  radial-gradient(circle at 50% 50%, ${colors[2]} 0%, ${colors[2]} 35%, transparent 70%)
                `;
            });

            frameId = requestAnimationFrame(animate);
        }

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [displayedMode]);

    // Mode değişim animasyonu
    useEffect(() => {
        const shapes = [mainRef.current, innerRef.current];

        if (currentMode !== displayedMode) {
            const tl = gsap.timeline({
                onComplete: () => {
                  // biten animasyon sonrası
                    setDisplayedMode(currentMode);
                    gsap.fromTo(
                        shapes,
                        { opacity: 0, scale: 0.7 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 2.4,
                            ease: 'back.out'
                        }
                    );
                }
            });
            // ölüm
            tl.to(shapes, {
                opacity: 0,
                scale: 2.5,
                duration: 1,
                ease: 'power4.out'
            });
        } else {
          // doğum
            gsap.fromTo(
                shapes,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 5,
                    ease: 'none',
                    delay: 0.8
                }
            );
        }

        return () => {
            gsap.killTweensOf(shapes);
        };
    }, [currentMode, displayedMode]);

    return (
        <div className="fixed inset-0 -z-10">
            <div className="absolute inset-0 bg-black" style={{ backgroundColor: '#0A0A0A' }}></div>
            <div ref={mainRef} className="absolute" style={{ width: '72vw', height: '72vw', pointerEvents: 'none', zIndex: 1 }} />
            <div ref={innerRef} className="absolute" style={{ width: '54vw', height: '54vw', pointerEvents: 'none', zIndex: 2 }} />
        </div>
    );
}
