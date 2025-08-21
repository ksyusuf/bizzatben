import { useState } from 'react'
import { Dialog, Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Fragment, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BoltIcon } from '@heroicons/react/24/outline'

gsap.registerPlugin(ScrollTrigger)

const subjects = [
  { id: 'project', name: 'Proje Teklifi' },
  { id: 'collaboration', name: 'İş Birliği' },
  { id: 'consultation', name: 'Danışmanlık' },
  { id: 'other', name: 'Diğer' },
]

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [selectedSubject, setSelectedSubject] = useState(subjects[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isFormOpen, setIsFormOpen] = useState(false)

  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formDataToSend = {
      'form-name': 'contact',
      name: formData.name,
      email: formData.email,
      subject: selectedSubject.name,
      message: formData.message,
    }

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend).toString(),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setSelectedSubject(subjects[0])
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="backdrop-blur-2xl rounded-2xl border p-8"
      ref={formRef}
    >
      <h3 className="text-2xl font-bold mb-6">Hızlı İletişim</h3>
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
          <label className="block text-sm font-medium mb-2">Ad Soyad</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
            placeholder="Adınız ve soyadınız"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">E-posta</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={e => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
            placeholder="ozel@mail.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Konu</label>
          <input type="hidden" name="subject" value={selectedSubject.name} />
          <SubjectSelector selected={selectedSubject} onChange={setSelectedSubject} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mesaj</label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={e => setFormData({ ...formData, message: e.target.value })}
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

      {/* Success Modal */}
      <ContactSuccessModal 
        isOpen={isFormOpen && submitStatus === 'success'}
        onClose={() => {
          setIsFormOpen(false)
          setSubmitStatus('idle')
        }}
      />
    </div>
    
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
            {subjects.map(subject => (
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


function ContactSuccessModal({ 
    isOpen, 
    onClose, 
  }: { 
    isOpen: boolean
    onClose: () => void
  }) {
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
          <div className="bg-black/40  rounded-2xl border p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full">
                <BoltIcon className="h-10 w-10" />
              </div>
            </div>
                
            <h2 className="text-2xl font-extrabold mb-4">
              Mesaj Gönderildi!
            </h2>

            <p className="text-lg">
              Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağım.
            </p>

            <div className="mt-6">
              <button
                onClick={onClose}
                className="w-full mt-5 px-6 py-4 rounded-xl font-semibold text-lg shadow-lg transition-all backdrop-blur-xl border cursor-pointer"
              >
                Tamam
              </button>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  } 