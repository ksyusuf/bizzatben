import { useEffect, useRef, useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ContactInfo() {
  const infoRef = useRef<HTMLDivElement>(null)
  const [showKachow, setShowKachow] = useState(false)

  useEffect(() => {
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      className="backdrop-blur-2xl rounded-2xl border p-8"
      ref={infoRef}
    >
      <h3 className="text-2xl font-bold mb-6">
        İletişim Bilgileri
      </h3>
      <div className="space-y-6">

        <a href="mailto:ksyusuf85@gmail.com" className="flex items-center space-x-4">
          <div className="p-3 rounded-lg">
            <EnvelopeIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold">
              E-posta
            </h4>
            <p>
              ksyusuf85@gmail.com
            </p>
          </div>
        </a>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg">
            <MapPinIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold">
              Konum
            </h4>
            <p>
              İstanbul, Türkiye
            </p>
          </div>
        </div>
        
      </div>
      <button
        onClick={() => setShowKachow(true)}
        className="w-full mt-8 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all backdrop-blur-xl cursor-pointer"
      >
        Mesaj Gönder
      </button>

      <KachowModal 
        isOpen={showKachow} 
        onClose={() => setShowKachow(false)} 
      />
    </div>
  )
}

function KachowModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 scale-75"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-75"
    >
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex  bg-black/20 backdrop-blur-xl items-center justify-center p-4"
        onClose={onClose}
      >
        {/* overlay */}
        <div className="fixed inset-0" />

        {/* modal content */}
        <div className="bg-black/40 rounded-2xl border p-8 text-center relative z-10">
          <h2 className="text-2xl font-extrabold mb-4">⚡ KACHOW ⚡</h2>
          <p className="text-lg">İletişim için mail, hızlı iletişim ya da LinkedIn'i tercih edin ✨</p>
          <button
            onClick={onClose}
            className="w-full mt-5 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all backdrop-blur-xl border cursor-pointer"
          >
            Tamam
          </button>
        </div>
      </Dialog>
    </Transition>
  )
}
