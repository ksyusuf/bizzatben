import { useEffect, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { PlayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'

export default function Hero() {
  const { currentMode } = useModeStore()
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [displayMode, setDisplayMode] = useState<'programming' | 'civil'>('programming')
  
  useEffect(() => {
    if (displayMode !== currentMode) {
      setDisplayMode(currentMode)
    }
  }, [currentMode, displayMode])

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
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-6 ${
              displayMode === 'programming' 
                ? 'text-prog-neon' 
                : 'text-civil-gold'
            }`}
          >
            {displayMode === 'programming' 
              ? 'Backend Developer'
              : 'İnşaat Mühendisi'
            }
          </h1>

          {/* Subtitle */}
          <p 
            className={`text-xl md:text-xl mb-8 ${
              displayMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
            }`}
          >
            {displayMode === 'programming' 
              ? 'Backend Developer'
              : 'İnşaat Mühendisi'
            }
          </p>

          {/* Description */}
          <p 
            className={`text-lg md:text-xl mb-12 max-w-3xl mx-auto ${
              displayMode === 'programming' ? 'text-prog-light/80' : 'text-civil-light/80'
            }`}
          >
            {displayMode === 'programming'
              ? 'Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum. React, TypeScript ve Node.js uzmanıyım.'
              : 'Sürdürülebilir ve güvenli yapılar tasarlayarak topluma değer katıyorum. Yapı analizi ve deprem mühendisliği konularında uzmanım.'
            }
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <PrimaryButton 
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              currentMode={displayMode}
            >
              Hakkımda
            </PrimaryButton>
            
            <SecondaryButton 
              onClick={() => setIsVideoOpen(true)}
              currentMode={displayMode}
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
        currentMode={displayMode}
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