import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { gsap } from 'gsap'

export default function LinkModal({ 
  isOpen, 
  onClose, 
  currentMode 
}: { 
  isOpen: boolean
  onClose: () => void
  currentMode: string 
}) {

  const listRef = useRef<HTMLUListElement>(null)
 
  return (
    <Transition
        appear
        show={isOpen}
        as={Fragment}
        afterEnter={() => {
            if (listRef.current) {
            gsap.fromTo(
                listRef.current.children,
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power3.out" }
            )
            }
        }}
        >
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

                {/* İçerik */}
                <div className="text-center">
                  <p className="mb-4">Aşağıda sosyal medya ve iletişim bağlantılarım yer almaktadır:</p>
                  <ul ref={listRef} className="space-y-3 text-left inline-block">
                    <li className="hidden-initial">
                      <a href="https://github.com/ksyusuf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        <svg width="20" height="20" fill="currentColor" className="inline-block">
                          <path d="M10 .3a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 5.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 10 .3"/>
                        </svg>
                        GitHub
                      </a>
                    </li>
                    <li className="hidden-initial">
                      <a href="https://www.linkedin.com/in/yusuf-akcakaya/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        <svg width="20" height="20" fill="currentColor" className="inline-block">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
                        </svg>
                        LinkedIn
                      </a>
                    </li>
                    <li className="hidden-initial">
                      <a href="mailto:ksyusuf85@gmail.com" className="flex items-center gap-2 hover:underline">
                        <svg width="20" height="20" fill="currentColor" className="inline-block">
                          <path d="M2 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4zm2 0v.01L10 9l6-4.99V4H4zm0 2.236V16h12V6.236l-6 4.99l-6-4.99z"/>
                        </svg>
                        E-posta
                      </a>
                    </li>
                    <li className="hidden-initial">
                      <a href="https://yusufakcakaya.blogspot.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        🌐 Blog
                      </a>
                    </li>
                    <li className="hidden-initial">
                      <a href="https://medium.com/@ksyusuf85" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        ✍️ Medium
                      </a>
                    </li>
                    <li className="hidden-initial">
                      <a href="https://www.researchgate.net/profile/Yusuf-Akcakaya/research" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                        🔬 ResearchGate
                      </a>
                    </li>
                  </ul>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
