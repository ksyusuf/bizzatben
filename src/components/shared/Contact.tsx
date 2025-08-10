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

    try {
      const formDataToSend = {
        'form-name': 'contact',
        name: formData.name,
        email: formData.email,
        subject: selectedSubject.name,
        message: formData.message,
      }

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
        console.error('Form submission failed')
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className={`text-4xl font-bold mb-4 ${
            currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
          }`}>
            İletişim
          </h2>
          <p ref={descRef} className={`text-xl max-w-3xl mx-auto ${
            currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
          }`}>
            Projeleriniz için benimle iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div
            className={`backdrop-blur-2xl rounded-2xl border p-8 ${
              currentMode === 'programming' 
                ? 'bg-prog-dark/50 border-prog-neon/30' 
                : 'bg-civil-dark/50 border-civil-gold/30'
            }`}
            ref={infoRef}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
            }`}>
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
              onClick={() => setIsFormOpen(true)}
              className={`w-full mt-8 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                currentMode === 'programming'
                  ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90 shadow-lg shadow-prog-primary/50'
                  : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90 shadow-lg shadow-civil-primary/50'
              }`}
            >
              Mesaj Gönder
            </button>
          </div>

          {/* Contact Form */}
          <div
            className={`backdrop-blur-2xl rounded-2xl border p-8 ${
              currentMode === 'programming' 
                ? 'bg-prog-dark/50 border-prog-neon/30' 
                : 'bg-civil-dark/50 border-civil-gold/30'
            }`}
            ref={formRef}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
            }`}>
              Hızlı İletişim
            </h3>
            <form 
              name="contact" 
              method="POST" 
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
                <label className={`block text-sm font-medium mb-2 ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    currentMode === 'programming'
                      ? 'bg-prog-dark/50 border-prog-light/30 text-prog-light placeholder-prog-light/50 focus:border-prog-neon'
                      : 'bg-civil-dark/50 border-civil-light/30 text-civil-light placeholder-civil-light/50 focus:border-civil-gold'
                  }`}
                  placeholder="Adınız ve soyadınız"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    currentMode === 'programming'
                      ? 'bg-prog-dark/50 border-prog-light/30 text-prog-light placeholder-prog-light/50 focus:border-prog-neon'
                      : 'bg-civil-dark/50 border-civil-light/30 text-civil-light placeholder-civil-light/50 focus:border-civil-gold'
                  }`}
                  placeholder="ornek@email.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
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
                  currentMode={currentMode}
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
                  Mesaj
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-200 resize-none ${
                    currentMode === 'programming'
                      ? 'bg-prog-dark/50 border-prog-light/30 text-prog-light placeholder-prog-light/50 focus:border-prog-neon'
                      : 'bg-civil-dark/50 border-civil-light/30 text-civil-light placeholder-civil-light/50 focus:border-civil-gold'
                  }`}
                  placeholder="Mesajınızı buraya yazın..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                  currentMode === 'programming'
                    ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90 shadow-lg shadow-prog-primary/50'
                    : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90 shadow-lg shadow-civil-primary/50'
                }`}
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>

              {submitStatus === 'error' && (
                <p className={`text-sm text-red-400 text-center`}>
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
        currentMode={currentMode}
        submitStatus={submitStatus}
      />
    </section>
  )
}


function SubjectSelector({ 
  selected, 
  onChange, 
  currentMode 
}: { 
  selected: any
  onChange: (subject: any) => void
  currentMode: string 
}) {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className={`relative w-full px-4 py-3 text-left rounded-lg border transition-all duration-200 cursor-pointer ${
          currentMode === 'programming'
            ? 'bg-prog-dark/50 border-prog-light/30 text-prog-light focus:border-prog-neon'
            : 'bg-civil-dark/50 border-civil-light/30 text-civil-light focus:border-civil-gold'
        }`}>
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
          <Listbox.Options className={`absolute z-10 w-full mt-1 rounded-lg shadow-lg backdrop-blur-2xl border ${
            currentMode === 'programming' 
              ? 'bg-prog-dark/90 border-prog-neon/30' 
              : 'bg-civil-dark/90 border-civil-gold/30'
          }`}>
            {subjects.map((subject) => (
              <Listbox.Option
                key={subject.id}
                value={subject}
                className={({ active }) => `relative cursor-pointer select-none py-3 px-4 ${
                  active 
                    ? (currentMode === 'programming' ? 'bg-prog-primary/20 text-prog-accent' : 'bg-civil-primary/20 text-civil-amber')
                    : (currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light')
                }`}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {subject.name}
                    </span>
                    {selected && (
                      <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        currentMode === 'programming' ? 'text-prog-accent' : 'text-civil-amber'
                      }`}>
                        <CheckIcon className="w-5 h-5" />
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

function ContactSuccessModal({ 
  isOpen, 
  onClose, 
  currentMode,
  submitStatus
}: { 
  isOpen: boolean
  onClose: () => void
  currentMode: string 
  submitStatus: 'idle' | 'success' | 'error'
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
              <Dialog.Panel className={`w-full max-w-md transform overflow-hidden rounded-2xl backdrop-blur-2xl border ${
                currentMode === 'programming' 
                  ? 'bg-prog-darker/90 border-prog-neon/30' 
                  : 'bg-civil-darker/90 border-civil-gold/30'
              } p-6 text-center align-middle shadow-xl transition-all`}>
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                      currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                    }`}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="mb-6">
                  <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${
                    currentMode === 'programming' 
                      ? 'bg-prog-accent/20 text-prog-accent' 
                      : 'bg-civil-amber/20 text-civil-amber'
                  }`}>
                    <BoltIcon className="h-6 w-6" />
                  </div>
                </div>
                
                <Dialog.Title className={`text-2xl font-bold mb-4 ${
                  currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                }`}>
                  {submitStatus === 'success' ? 'Mesaj Gönderildi!' : '️KACHOW'}
                </Dialog.Title>
                
                <p className={`text-lg ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
                  {submitStatus === 'success' 
                    ? 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.' 
                    : 'Mesajlar yalnızca mail ile ✨'
                  }
                </p>
                
                <div className="mt-6">
                  <button
                    onClick={onClose}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                      currentMode === 'programming'
                        ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90'
                        : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90'
                    }`}
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