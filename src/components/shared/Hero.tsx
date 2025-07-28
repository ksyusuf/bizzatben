import { useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const { currentMode, isTransitioning } = useModeStore()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  
  // GSAP refs
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const codeRainRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Initial animation
    const tl = gsap.timeline()
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, scale: 0.8, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(descriptionRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(buttonsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    )
  }, { scope: heroRef })

  // Mode transition animations
  useEffect(() => {
    if (isTransitioning) {
      const tl = gsap.timeline()
      
      if (currentMode === 'programming') {
        // Programming mode transition - HOLOGRAM EFFECT
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.in"
        })
        .to(titleRef.current, {
          scale: 0.8,
          filter: "blur(10px) hue-rotate(180deg)",
          duration: 0.4,
          ease: "power2.in"
        })
        .to([subtitleRef.current, descriptionRef.current, buttonsRef.current], {
          opacity: 0,
          y: -30,
          scale: 0.9,
          duration: 0.3,
          ease: "power2.in",
          stagger: 0.1
        })
        .to(titleRef.current, {
          scale: 1.3,
          filter: "blur(20px) hue-rotate(360deg) brightness(1.5)",
          rotationY: 180,
          duration: 0.5,
          ease: "power2.in"
        })
        .to(titleRef.current, {
          scale: 1,
          filter: "blur(0px) hue-rotate(0deg) brightness(1)",
          rotationY: 0,
          duration: 0.8,
          ease: "back.out(1.7)"
        })
        .to([subtitleRef.current, descriptionRef.current, buttonsRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power2.out"
        }, "-=0.3")
        
        // Advanced code rain effect with hologram
        gsap.to(codeRainRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.in"
        })
        
        // Create hologram glitch effect
        const hologramElements = codeRainRef.current?.querySelectorAll('.code-rain-item')
        if (hologramElements && hologramElements.length > 0) {
          // Start the code rain animation
          gsap.fromTo(hologramElements, 
            { 
              y: -100, 
              opacity: 0,
              scale: 0.5,
              rotationZ: -180
            },
            { 
              y: window.innerHeight + 100, 
              opacity: 1,
              scale: 1.2,
              rotationZ: 180,
              duration: 4,
              stagger: 0.1,
              ease: "power1.inOut",
              repeat: -1
            }
          )
          
          // After transition ends, fade out the code rain smoothly
          setTimeout(() => {
            gsap.to(hologramElements, {
              opacity: 0,
              scale: 0.8,
              duration: 1,
              ease: "power2.out",
              stagger: 0.02
            })
            
            // Hide the code rain container after fade out
            setTimeout(() => {
              if (codeRainRef.current) {
                gsap.to(codeRainRef.current, {
                  opacity: 0,
                  duration: 0.5,
                  ease: "power2.out"
                })
              }
            }, 1000)
          }, 800) // Wait for transition to complete
        }
      } else {
        // Civil mode transition - CONSTRUCTION BUILDING EFFECT
        tl.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.in"
        })
        .to(titleRef.current, {
          y: -150,
          rotationX: 90,
          scale: 0.5,
          opacity: 0,
          filter: "brightness(0.3) contrast(2)",
          duration: 0.6,
          ease: "power2.inOut"
        })
        .to([subtitleRef.current, descriptionRef.current, buttonsRef.current], {
          opacity: 0,
          y: 80,
          scale: 0.6,
          duration: 0.4,
          ease: "power2.in",
          stagger: 0.1
        })
        .to(titleRef.current, {
          y: 200,
          rotationX: -180,
          scale: 0.3,
          opacity: 0,
          filter: "brightness(0.1) contrast(3)",
          duration: 0.8,
          ease: "power2.inOut"
        })
        .to(titleRef.current, {
          y: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          filter: "brightness(1) contrast(1)",
          duration: 0.8,
          ease: "back.out(1.7)"
        })
        .to([subtitleRef.current, descriptionRef.current, buttonsRef.current], {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        })
        .to(overlayRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        }, "-=0.3")
        
        // Construction particles effect
        createConstructionParticles()
      }
    }
  }, [currentMode, isTransitioning])

  // Construction particles function
  const createConstructionParticles = () => {
    const particlesContainer = document.createElement('div')
    particlesContainer.className = 'construction-particles absolute inset-0 pointer-events-none z-30'
    particlesContainer.style.position = 'absolute'
    particlesContainer.style.inset = '0'
    particlesContainer.style.pointerEvents = 'none'
    particlesContainer.style.zIndex = '30'
    
    document.body.appendChild(particlesContainer)
    
    // Create construction particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'construction-particle'
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 8 + 4}px;
        height: ${Math.random() * 8 + 4}px;
        background: linear-gradient(45deg, #ffaa00, #ff6600, #ff4400);
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: 0;
        pointer-events: none;
      `
      particlesContainer.appendChild(particle)
      
      // Animate particle with fade out during movement
      const duration = 2 + Math.random() * 2
      const delay = Math.random() * 1
      
      gsap.fromTo(particle, 
        { 
          opacity: 0, 
          scale: 0,
          y: 0,
          rotation: 0
        },
        { 
          opacity: 1,
          scale: 1.5,
          y: 200,
          rotation: 360,
          duration: duration,
          ease: "power2.out",
          delay: delay
        }
      )
      
      // Fade out the particle during its movement
      gsap.to(particle, {
        opacity: 0,
        scale: 0.5,
        duration: duration * 0.6, // Start fading after 40% of movement
        ease: "power2.in",
        delay: delay + duration * 0.4 // Start fade after 40% of total duration
      })
    }
    
    // Remove particles after animation
    setTimeout(() => {
      document.body.removeChild(particlesContainer)
    }, 4000)
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 transition-all duration-800 ${
          currentMode === 'programming' 
            ? 'bg-gradient-to-br from-prog-darker via-prog-dark to-prog-darker' 
            : 'bg-gradient-to-br from-civil-darker via-civil-dark to-civil-darker'
        }`} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>

      {/* Programming Mode Transition Overlay */}
      {isTransitioning && currentMode === 'programming' && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 pointer-events-none programming-overlay"
          style={{ opacity: 0 }}
        >
          {/* Matrix Code Rain Effect */}
          <div ref={codeRainRef} className="absolute inset-0 overflow-hidden" style={{ opacity: 0 }}>
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="code-rain-item absolute text-green-400 text-xs font-mono opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              >
                {['01', '10', '11', '00', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'async', 'await', 'class', 'import', 'export'][Math.floor(Math.random() * 16)]}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Civil Mode Transition Overlay */}
      {isTransitioning && currentMode === 'civil' && (
        <div
          ref={overlayRef}
          className="absolute inset-0 z-20 pointer-events-none civil-overlay"
          style={{ opacity: 0 }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px- text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 
            ref={titleRef}
            className={`text-4xl md:text-8xl font-bold mb-6 ${
              currentMode === 'programming' 
                ? 'text-prog-neon' 
                : 'text-civil-gold'
            } ${isTransitioning ? 'animate-glow' : ''}`}
          >
            Yusuf Akçakaya
          </h1>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className={`text-xl md:text-xl mb-8 ${
              currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
            }`}
          >
            {currentMode === 'programming' 
              ? 'Backend Developer'
              : 'İnşaat Mühendisi'
            }
          </p>

          {/* Description */}
          <p 
            ref={descriptionRef}
            className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto ${
              currentMode === 'programming' ? 'text-prog-light/80' : 'text-civil-light/80'
            }`}
          >
            {currentMode === 'programming'
              ? 'Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum. React, TypeScript ve Node.js uzmanıyım.'
              : 'Sürdürülebilir ve güvenli yapılar tasarlayarak topluma değer katıyorum. Yapı analizi ve deprem mühendisliği konularında uzmanım.'
            }
          </p>

          {/* CTA Buttons */}
          <div 
            ref={buttonsRef}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <PrimaryButton 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              currentMode={currentMode}
            >
              Hakkımda
            </PrimaryButton>
            
            <SecondaryButton 
              onClick={() => setIsVideoOpen(true)}
              currentMode={currentMode}
            >
              <PlayIcon className="w-5 h-5 mr-2" />
              Tanıtım Videosu
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)}
        currentMode={currentMode}
      />
    </section>
  )
}

function PrimaryButton({ 
  children, 
  onClick, 
  currentMode 
}: { 
  children: React.ReactNode
  onClick: () => void
  currentMode: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer ${
        currentMode === 'programming'
          ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90 shadow-prog-primary/50'
          : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90 shadow-civil-primary/50'
      }`}
    >
      {children}
    </button>
  )
}

function SecondaryButton({ 
  children, 
  onClick, 
  currentMode 
}: { 
  children: React.ReactNode
  onClick: () => void
  currentMode: string 
}) {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 backdrop-blur-2xl hover:scale-105 active:scale-95 cursor-pointer ${
        currentMode === 'programming'
          ? 'border-prog-neon text-prog-neon hover:bg-prog-neon/20 bg-black/20'
          : 'border-civil-gold text-civil-gold hover:bg-civil-gold/20 bg-black/20'
      }`}
    >
      {children}
    </button>
  )
}

function VideoModal({ 
  isOpen, 
  onClose, 
  currentMode 
}: { 
  isOpen: boolean
  onClose: () => void
  currentMode: string 
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-4xl transform overflow-hidden rounded-2xl backdrop-blur-xl border ${
                currentMode === 'programming' 
                  ? 'bg-prog-darker/90 border-prog-neon/30' 
                  : 'bg-civil-darker/90 border-civil-gold/30'
              } p-6 text-left align-middle shadow-xl transition-all`}>
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className={`text-2xl font-bold ${
                    currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                  }`}>
                    Tanıtım Videosu
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                      currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                    }`}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                  <div className={`text-center ${
                    currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                  }`}>
                    <PlayIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Video içeriği burada gösterilecek</p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 