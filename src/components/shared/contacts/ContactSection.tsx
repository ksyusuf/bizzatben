import { useRef, useEffect } from 'react'
import { useModeStore } from '../../../store/modeStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ContactInfo from './ContactInfo'
import ContactForm from './ContactForm'

gsap.registerPlugin(ScrollTrigger)

export default function ContactSection() {
  const { currentMode } = useModeStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
      })
    }
    if (descRef.current) {
      gsap.fromTo(descRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: descRef.current, start: 'top 85%' }
      })
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [currentMode])

  return (
    <section id="contact" className="section-padding" ref={sectionRef}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-bold mb-4">İletişim</h2>
          <p ref={descRef} className="text-xl max-w-3xl mx-auto">
            Projeleriniz için benimle iletişime geçin
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
