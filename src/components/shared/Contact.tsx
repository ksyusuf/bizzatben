import { Dialog, Transition, Listbox } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'
import { 
  EnvelopeIcon, 
  MapPinIcon, 
  CheckIcon,
  BoltIcon,
  ChevronUpDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const subjects = [
  { id: 'project', name: 'Proje Teklifi' },
  { id: 'collaboration', name: 'İş Birliği' },
  { id: 'consultation', name: 'Danışmanlık' },
  { id: 'other', name: 'Diğer' },
]

export default function Contact() {
  const { currentMode } = useModeStore()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showKachow, setShowKachow] = useState(false)

  // GSAP refs
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Title animasyonu (scroll ile)
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
    // Açıklama animasyonu (scroll ile)
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
    // Info animasyonu (scroll ile)
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
    // Form animasyonu (scroll ile)
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentMode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Form verilerini hazırla
    const formDataToSend = {
      'form-name': 'contact',
      name: formData.name,
      email: formData.email,
      subject: selectedSubject.name,
      message: formData.message,
    }

    console.log('Submitting form with data:', formDataToSend)

    try {
      // Netlify Forms için form gönderimi
      const response = await fetch('/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams(formDataToSend).toString()
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setSelectedSubject(subjects[0])
        setIsFormOpen(true)
      } else {
        setSubmitStatus('error')
        console.error('Form submission failed:', response.status, response.statusText)
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-bold mb-4">
            İletişim
          </h2>
          <p ref={descRef} className="text-xl max-w-3xl mx-auto">
            Projeleriniz için benimle iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
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
            onClick={() => {
              setShowKachow(true)
            }}
            className="w-full mt-8 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all backdrop-blur-xl cursor-pointer"
            >
              Mesaj Gönder
            </button>

            <KachowModal 
              isOpen={showKachow} 
              onClose={() => setShowKachow(false)} 
            />
          </div>

          {/* Contact Form */}
          <div
            className="backdrop-blur-2xl rounded-2xl border p-8"
            ref={formRef}
          >
            <h3 className="text-2xl font-bold mb-6">
              Hızlı İletişim
            </h3>
            <form 
              name="contact" 
              method="POST" 
              action="/"
              data-netlify="true" 
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* Netlify hidden inputs */}
              <input type="hidden" name="form-name" value="contact" />
              <div className="hidden">
                <input name="bot-field" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
                  placeholder="ozel@mail.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Konu
                </label>
                <input
                  type="hidden"
                  name="subject"
                  value={selectedSubject.name}
                />
                <SubjectSelector 
                  selected={selectedSubject}
                  onChange={setSelectedSubject}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Mesaj
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none"
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-4 rounded-xl shadow-2xl font-semibold text-lg transition-all duration-300 backdrop-blur-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>

              {submitStatus === 'error' && (
                <p className="text-sm backdrop-blur-4xl text-red-400 text-center">
                  Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <ContactSuccessModal 
        isOpen={isFormOpen && submitStatus === 'success'}
        onClose={() => {
          setIsFormOpen(false)
          setSubmitStatus('idle')
        }}
      />
    </section>
  )
}


function SubjectSelector({ 
  selected, 
  onChange, 
}: { 
  selected: any
  onChange: (subject: any) => void
}) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative w-full px-4 py-3 backdrop-blur-4xl text-left rounded-lg border transition-all duration-200 cursor-pointer">
          <span className="block truncate">{selected.name}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="w-5 h-5" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-50 w-full mt-1 rounded-lg shadow-xl bg-black/60 backdrop-blur-4xl border">
            {subjects.map((subject) => (
              <Listbox.Option
                key={subject.id}
                value={subject}
                className="relative text-center cursor-pointer select-none py-3 px-4"
              >
                {({ selected }) => (
                  <>
                    {selected && (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        ⚡⚡
                      </span>
                    )}
                    <span className={`block truncate ${selected ? 'font-' : 'font-normal'}`}>
                      {subject.name}
                    </span>
                    {selected && (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                        ⚡⚡
                      </span>
                    )}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}

function KachowModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-75"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"
        >
          <div className="fixed inset-0 flex backdrop-blur-xl items-center justify-center p-4">
            <div className="bg-black/40  rounded-2xl border p-8 text-center">
              <h2 className="text-2xl font-extrabold mb-4">
                ⚡ KACHOW ⚡
              </h2>
              <p className="text-lg">
                Mesajlar yalnızca mail ile ✨
              </p>
              <button
                onClick={onClose}
                className="w-full mt-5 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all backdrop-blur-xl border cursor-pointer"
              >
                Tamam
              </button>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

function ContactSuccessModal({ 
  isOpen, 
  onClose, 
}: { 
  isOpen: boolean
  onClose: () => void
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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-2xl border p-6 text-center align-middle shadow-xl transition-all">
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                    <BoltIcon className="h-6 w-6" />
                  </div>
                </div>
                
                <Dialog.Title className="text-2xl font-bold mb-4">
                  Mesaj Gönderildi!
                </Dialog.Title>
                
                <p className="text-lg">
                  Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer"
                  >
                    Tamam
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 