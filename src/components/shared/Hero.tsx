import { useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useGSAP } from '@gsap/react'

export default function Hero() {
  const { currentMode } = useModeStore()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [displayMode, setDisplayMode] = useState<'programming' | 'civil'>('programming')

  // GSAP refs
  const contentRef = useRef<HTMLDivElement>(null)
  const btn1Ref = useRef<HTMLButtonElement>(null)
  const btn2Ref = useRef<HTMLButtonElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  // Animasyonlu mod geçişi
  const isFirstRender = useRef(true)
  const lastMode = useRef<'programming' | 'civil'>(displayMode)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      lastMode.current = currentMode
      return
    }
    let isCancelled = false
    const animateTransition = async () => {
      const from = lastMode.current
      const to = currentMode
      // Başlık exit animasyonu
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll('span.gsap-title-word')
        if (from === 'programming' && to === 'civil') {
          // Sağdan kaybol
          await gsap.to(words, {
            opacity: 0,
            x: 60,
            scale: 0.7,
            stagger: 0.08,
            duration: 0.2,
            ease: 'power2.in',
          })
        } else if (from === 'civil' && to === 'programming') {
          // Yukarıdan kaybol
          await gsap.to(words, {
            opacity: 0,
            y: -40,
            scale: 0.7,
            stagger: 0.08,
            duration: 0.2,
            ease: 'power2.in',
          })
        }
      }
      // Açıklama exit animasyonu
      if (descRef.current) {
        const chars = descRef.current.querySelectorAll('span.gsap-char')
        if (from === 'programming' && to === 'civil') {
          // Aşağıdan kaybol
          await gsap.to(chars, {
            opacity: 0,
            y: 40,
            stagger: 0.01,
            duration: 0.125,
            ease: 'power1.in',
          })
        } else if (from === 'civil' && to === 'programming') {
          // Sola kaybol
          await gsap.to(chars, {
            opacity: 0,
            x: -30,
            stagger: 0.01,
            duration: 0.125,
            ease: 'power1.in',
          })
        }
      }
      // Çıkış animasyonlarından sonra x ve y transformlarını sıfırla
      if (titleRef.current) {
        gsap.set(titleRef.current.querySelectorAll('span.gsap-title-word'), { x: 0, y: 0 });
      }
      if (descRef.current) {
        gsap.set(descRef.current.querySelectorAll('span.gsap-char'), { x: 0, y: 0 });
      }
      if (!isCancelled) setDisplayMode(currentMode)
      lastMode.current = currentMode
    }
    animateTransition()
    return () => { isCancelled = true }
  }, [currentMode])

  // GSAP scroll animasyonları
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (btn1Ref.current) {
      gsap.fromTo(
        btn1Ref.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: btn1Ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (btn2Ref.current) {
      gsap.fromTo(
        btn2Ref.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: btn2Ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentMode])

  useGSAP(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      )
    }
    if (btn1Ref.current) {
      gsap.fromTo(
        btn1Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.25, ease: 'power3.out' }
      )
    }
    if (btn2Ref.current) {
      gsap.fromTo(
        btn2Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.4, delay: 0.35, ease: 'power3.out' }
      )
    }
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('span.gsap-title-word')
      // Giriş animasyonu yönlü
      if (lastMode.current === 'programming' && displayMode === 'civil') {
        // Soldan gel
        gsap.fromTo(words,
          { opacity: 0, scale: 0.7, x: -60 },
          { opacity: 1, scale: 1, x: 0, stagger: 0.18, duration: 0.35, delay: 0.35, ease: 'back.out(1.7)' }
        )
      } else if (lastMode.current === 'civil' && displayMode === 'programming') {
        // Aşağıdan gel
        gsap.fromTo(words,
          { opacity: 0, scale: 0.7, y: 40 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.18, duration: 0.35, delay: 0.35, ease: 'back.out(1.7)' }
        )
      } else {
        // İlk yükleme veya fallback
        gsap.fromTo(words,
          { opacity: 0, scale: 0.7, y: 40 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.18, duration: 0.35, delay: 0.35, ease: 'back.out(1.7)' }
        )
      }
    }
    if (descRef.current) {
      const chars = descRef.current.querySelectorAll('span.gsap-char')
      // Giriş animasyonu yönlü
      if (lastMode.current === 'programming' && displayMode === 'civil') {
        // Yukarıdan gel
        gsap.fromTo(chars,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, stagger: 0.025, duration: 0.25, delay: 0.5, ease: 'power2.out' }
        )
      } else if (lastMode.current === 'civil' && displayMode === 'programming') {
        // Sağdan gel
        gsap.fromTo(chars,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, stagger: 0.025, duration: 0.25, delay: 0.5, ease: 'power2.out' }
        )
      } else {
        // İlk yükleme veya fallback
        gsap.fromTo(chars,
          { opacity: 0, y: 20, x: 30 },
          { opacity: 1, y: 0, x: 0, stagger: 0.025, duration: 0.25, delay: 0.5, ease: 'power2.out' }
        )
      }
    }
  }, [displayMode])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 transition-all duration-800 ${
          displayMode === 'programming' 
            ? 'bg-gradient-to-br from-prog-darker via-prog-dark to-prog-darker' 
            : 'bg-gradient-to-br from-civil-darker via-civil-dark to-civil-darker'
        }`} />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom px-4 sm:px-6 lg:px- text-center">
        <div className="max-w-4xl mx-auto opacity-0" ref={contentRef}>
          {/* Main Title */}
          <h1
            ref={titleRef}
            className={`text-4xl md:text-5xl font-bold mb-6 ${
              displayMode === 'programming'
                ? 'text-prog-neon'
                : 'text-civil-gold'
            }`}
          >
            {(
              displayMode === 'programming'
                ? 'Backend Developer'
                : 'İnşaat Mühendisi'
            ).split(' ').map((word, i, arr) => (
              <span key={i} className="gsap-title-word inline-block mr-2">
                {word}{i < arr.length - 1 ? ' ' : ''}
              </span>
            ))}
          </h1>

          {/* Description */}
          <p
            ref={descRef}
            className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto whitespace-pre-line ${
              displayMode === 'programming' ? 'text-prog-light/80' : 'text-civil-light/80'
            }`}
          >
            {(
              displayMode === 'programming'
                ? 'Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum. React, TypeScript ve Node.js uzmanıyım.'
                : 'Sürdürülebilir ve güvenli yapılar tasarlayarak topluma değer katıyorum. Yapı analizi ve deprem mühendisliği konularında uzmanım.'
            ).split('').map((char, i) =>
              char === ' '
                ? <span key={i}>&nbsp;</span>
                : <span key={i} className="gsap-char inline-block">{char}</span>
            )}
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <PrimaryButton 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              currentMode={displayMode}
              btnRef={btn1Ref}
            >
              Hakkımda
            </PrimaryButton>
            
            <SecondaryButton 
              onClick={() => setIsVideoOpen(true)}
              currentMode={displayMode}
              btnRef={btn2Ref}
            >
              {/* <PlayIcon className="w-5 h-5 mr-2" /> */}
              Bağlantılar
            </SecondaryButton>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <LinkModal 
        isOpen={isVideoOpen} 
        onClose={() => setIsVideoOpen(false)}
        currentMode={displayMode}
      />
    </section>
  )
}

function PrimaryButton({ 
  children, 
  onClick, 
  currentMode, 
  btnRef
}: { 
  children: React.ReactNode
  onClick: () => void
  currentMode: string,
  btnRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 backdrop-blur-xl cursor-pointer opacity-0 scale-95 ${
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
  currentMode, 
  btnRef
}: { 
  children: React.ReactNode
  onClick: () => void
  currentMode: string,
  btnRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={btnRef}
      onClick={onClick}
      className={`px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-300 backdrop-blur-2xl hover:scale-105 active:scale-95 cursor-pointer opacity-0 scale-95 ${
        currentMode === 'programming'
          ? 'border-prog-neon text-prog-neon hover:bg-prog-neon/20 bg-black/20'
          : 'border-civil-gold text-civil-gold hover:bg-civil-gold/20 bg-black/20'
      }`}
    >
      {children}
    </button>
  )
}

function LinkModal({ 
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
              <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-xl border ${
                currentMode === 'programming' 
                  ? 'bg-prog-darker/90 border-prog-neon/30' 
                  : 'bg-civil-darker/90 border-civil-gold/30'
              } p-6 text-left align-middle shadow-xl transition-all`}>
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className={`text-2xl font-bold ${
                    currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                  }`}>
                    Bağlantılar
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
                <div className="py-6 flex flex-col gap-4 items-center">
                  {/* Buraya sosyal medya ve diğer bağlantılar eklenecek */}
                  <div className={`text-center ${
                    currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                  }`}>
                    <p className="mb-4">Aşağıda örnek sosyal medya ve iletişim bağlantıları yer almaktadır:</p>
                    <ul className="space-y-3">
                      <li>
                        <a href="https://github.com/kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M10 .3a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 5.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 10 .3"/></svg>
                          GitHub
                        </a>
                      </li>
                      <li>
                        <a href="https://linkedin.com/in/kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
                          LinkedIn
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com/kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M7 2C4.243 2 2 4.243 2 7v6c0 2.757 2.243 5 5 5h6c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm0 2h6c1.654 0 3 1.346 3 3v6c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3zm8 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM10 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/></svg>
                          Instagram
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M20 3.924a8.19 8.19 0 0 1-2.357.646A4.118 4.118 0 0 0 19.448 2.3a8.224 8.224 0 0 1-2.605.996A4.107 4.107 0 0 0 9.85 6.03a11.65 11.65 0 0 1-8.457-4.287a4.106 4.106 0 0 0 1.27 5.482A4.073 4.073 0 0 1 .8 6.575v.052a4.108 4.108 0 0 0 3.292 4.025a4.095 4.095 0 0 1-1.852.07a4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 17.542a11.616 11.616 0 0 0 6.29 1.844c7.547 0 11.675-6.155 11.675-11.495c0-.175-.004-.349-.012-.522A8.18 8.18 0 0 0 20 3.924z"/></svg>
                          Twitter
                        </a>
                      </li>
                      <li>
                        <a href="mailto:ornek@mail.com" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v.01L10 9l6-4.99V4H4zm0 2.236V16h12V6.236l-6 4.99l-6-4.99z"/></svg>
                          E-posta
                        </a>
                      </li>
                      <li>
                        <a href="https://facebook.com/kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"/></svg>
                          Facebook
                        </a>
                      </li>
                      <li>
                        <a href="https://youtube.com/@kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M19.615 3.184A2.994 2.994 0 0 0 17.67 2.13C16.09 2 10 2 10 2s-6.09 0-7.67.13A2.994 2.994 0 0 0 .385 3.184C0 4.634 0 7.5 0 7.5s0 2.866.385 4.316a2.994 2.994 0 0 0 1.945 1.054C3.91 13 10 13 10 13s6.09 0 7.67-.13a2.994 2.994 0 0 0 1.945-1.054C20 10.366 20 7.5 20 7.5s0-2.866-.385-4.316zM8 10.5V4.5l6 3-6 3z"/></svg>
                          YouTube
                        </a>
                      </li>
                      <li>
                        <a href="https://t.me/kullaniciadi" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.93 7.36l-1.6 7.56c-.12.54-.44.67-.89.42l-2.47-1.82-1.19 1.15c-.13.13-.24.24-.5.24l.18-2.53 4.61-4.16c.2-.18-.04-.28-.31-.1l-5.7 3.6-2.45-.77c-.53-.16-.54-.53.11-.78l9.56-3.69c.44-.16.82.1.68.77z"/></svg>
                          Telegram
                        </a>
                      </li>
                      <li>
                        <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.1 3.205 5.077 4.372.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.007-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
                          WhatsApp
                        </a>
                      </li>
                    </ul>
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