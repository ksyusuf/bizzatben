import { useRef, useState, type Ref } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useModeStore } from '../../../store/modeStore'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { Link } from 'react-router-dom'
import { Quote } from "lucide-react";

// Alt componentler
import LinkModal from './LinkModal'

gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(ScrollToPlugin)

export function HeroQuote({ mode, ref }: { mode: string, ref: Ref<SVGSVGElement>[] }) {
  const text =
    mode === 'programming'
      ? 'Programlama, bir dünyayı satır satır inşa etmektir.'
      : 'İnşaat mühendisliğinde 2 x 2, üç aşağı↓ beş yukarı↑ dörttür.';

  const lines = text.split('\n');

  return (
    <div className="relative max-w-3xl mx-auto space-y-2">
      <Quote ref={ref[0]} className="absolute -left-4 -top-8 w-16 h-16 rotate-180" />
      <Quote ref={ref[1]} className="absolute -right-0 -bottom-10 w-16 h-16" />
      {lines.map((line, li) => (
        <div
          key={`line-${li}`}
          className="relative inline-block px-4 py-2"
          style={mode === 'programming'
            ? {
              fontFamily: '"Edu NSW ACT Cursive", cursive',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '1.5rem',
              lineHeight: 1.35
              }
            : {
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '1.5rem',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.35
              }
          }
        >
          {/* Maskelenmiş arka plan katmanı */}
          <div
            className="absolute inset-0 rounded-lg backdrop-blur-xs"
            style={{
              WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
              maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)',
            }}
          ></div>
  
          {/* Metin içeriği katmanı */}
          <div className="relative z-10">
            {line
              .split(' ')
              .map((word, wi) => (
                <span key={`word-${li}-${wi}`} style={{ whiteSpace: 'nowrap' }}>
                  {word.split('').map((char, ci) => (
                    <span key={`char-${li}-${wi}-${ci}`} className="inline-block gsap-char">
                      {char}
                    </span>
                  ))}
                </span>
              ))
              .reduce<React.ReactNode[]>((acc, curr, i) => (i === 0 ? [curr] : [...acc, ' ', curr]), [])}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function Hero() {
  const { currentMode } = useModeStore()
  const [isLinkModalOpen, setisLinkModalOpen] = useState(false)
  
  // GSAP refs
  const contentRef = useRef<HTMLDivElement>(null)
  const btn1Ref = useRef<HTMLButtonElement>(null)
  const btn2Ref = useRef<HTMLButtonElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const quoteRef = useRef<SVGSVGElement>(null)
  const quoteRef2 = useRef<SVGSVGElement>(null)

 // GSAP animasyonları
 useGSAP(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
      // Content fade in
      gsap.fromTo(
        contentRef.current,
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )

      // Başlık kelimeleri
      gsap.fromTo(
        '.gsap-title-word',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.3,
          duration: 0.8,
          ease: 'back.out(1.7)',
        }
      )

      // Açıklama karakterleri
      gsap.fromTo(
        '.gsap-char',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.01,
          delay: 0.6,
          duration: 0.8,
          ease: 'power2.out',
        }
      )

      // Butonlar
      gsap.fromTo(
        [btn1Ref.current, btn2Ref.current],
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          delay: 1,
          duration: 1.6,
          stagger: 0.2,
          ease: 'none',
        }
      )

      // quote ikonlar
      gsap.fromTo(
        [quoteRef.current, quoteRef2.current],
        { opacity: 0, scale: 1 },
        {
          opacity: 0.3,
          scale: 1,
          delay: 1,
          duration: 5,
          ease: 'power1.out',
        }
      )
    }, contentRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 transition-all duration-800" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px- text-center">
        <div className="max-w-4xl mx-auto opacity-0" ref={contentRef}>
          {/* Main Title */}
          <h1 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            {(
              currentMode === 'programming'
                ? 'Backend Developer'
                : 'İnşaat Mühendisi'
            ).split(' ').map((word, i, arr) => (
              <span key={i} className="gsap-title-word inline-block mr-2">
                {word}{i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          {/* Description */}
          <div ref={descRef} className="text-lg md:text-xl mb-12 max-w-3xl mx-auto">
            <HeroQuote ref={[quoteRef, quoteRef2]} mode={currentMode} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              ref={btn1Ref}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer opacity-0 scale-95"
            >
              <Link to={'#about'}>
                
                Hakkımda
              </Link>
            </button>
            <button
                ref={btn2Ref}
                onClick={() => setisLinkModalOpen(true)}
                className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 backdrop-blur-2xl hover:scale-105 active:scale-95 cursor-pointer opacity-0 scale-95"
                >
                Bağlantılar
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <LinkModal 
        isOpen={isLinkModalOpen} 
        onClose={() => setisLinkModalOpen(false)} 
        currentMode={currentMode}
      />
    </section>
  )
}
