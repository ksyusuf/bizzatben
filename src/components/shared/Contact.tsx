import { motion } from 'framer-motion'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon, 
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'

const contactMethods = [
  { id: 'email', name: 'E-posta', icon: EnvelopeIcon, value: 'contact@bizzatben.com' },
  { id: 'phone', name: 'Telefon', icon: PhoneIcon, value: '+90 555 123 4567' },
  { id: 'location', name: 'Konum', icon: MapPinIcon, value: 'İstanbul, Türkiye' },
]

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', { ...formData, subject: selectedSubject.name })
    setIsFormOpen(false)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
          }`}>
            İletişim
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
          }`}>
            Projeleriniz için benimle iletişime geçin
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`backdrop-blur-2xl rounded-2xl border p-8 ${
              currentMode === 'programming' 
                ? 'bg-prog-dark/50 border-prog-neon/30' 
                : 'bg-civil-dark/50 border-civil-gold/30'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
            }`}>
              İletişim Bilgileri
            </h3>
            
            <div className="space-y-6">
              {contactMethods.map((method) => (
                <ContactMethod 
                  key={method.id}
                  method={method}
                  currentMode={currentMode}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFormOpen(true)}
              className={`w-full mt-8 px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                currentMode === 'programming'
                  ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90 shadow-lg shadow-prog-primary/50'
                  : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90 shadow-lg shadow-civil-primary/50'
              }`}
            >
              Mesaj Gönder
            </motion.button>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`backdrop-blur-2xl rounded-2xl border p-8 ${
              currentMode === 'programming' 
                ? 'bg-prog-dark/50 border-prog-neon/30' 
                : 'bg-civil-dark/50 border-civil-gold/30'
            }`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${
              currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
            }`}>
              Hızlı İletişim
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
                  Ad Soyad
                </label>
                <input
                  type="text"
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

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                                  className={`w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                    currentMode === 'programming'
                      ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90 shadow-lg shadow-prog-primary/50'
                      : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90 shadow-lg shadow-civil-primary/50'
                  }`}
              >
                Gönder
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      <ContactSuccessModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        currentMode={currentMode}
      />
    </section>
  )
}

function ContactMethod({ 
  method, 
  currentMode 
}: { 
  method: any
  currentMode: string 
}) {
  const Icon = method.icon
  
  return (
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-lg ${
        currentMode === 'programming' 
          ? 'bg-prog-primary/20 text-prog-accent' 
          : 'bg-civil-primary/20 text-civil-amber'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h4 className={`font-semibold ${
          currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
        }`}>
          {method.name}
        </h4>
        <p className={`${
          currentMode === 'programming' ? 'text-prog-light/80' : 'text-civil-light/80'
        }`}>
          {method.value}
        </p>
      </div>
    </div>
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
                    <CheckIcon className="h-6 w-6" />
                  </div>
                </div>
                
                <Dialog.Title className={`text-2xl font-bold mb-4 ${
                  currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                }`}>
                  Mesaj Gönderildi!
                </Dialog.Title>
                
                <p className={`text-lg ${
                  currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                }`}>
                  Mesajınız başarıyla gönderildi. En kısa sürede size geri dönüş yapacağım.
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