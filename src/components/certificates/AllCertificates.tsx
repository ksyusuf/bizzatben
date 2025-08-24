import { certificates } from './CertificateList'
import { CertificateCard } from './CertificateCard'
import { useRef, useEffect } from 'react'
import { useModeStore } from '../../store/modeStore'
import { gsap } from "gsap";


export default function AllCertificates() {
  const { currentMode } = useModeStore()
  const contentRef = useRef<HTMLDivElement>(null)
  
  // Enter animasyonu: başlık + projeler
  useEffect(() => {
    if (!contentRef.current) return
    const cards = contentRef.current.querySelectorAll('.certificate-card')
    const title = contentRef.current.querySelector('.gsap-title-word')
  
    if (title) {
      gsap.fromTo(
        title,
        { y: 80, opacity: 0, scale: 0.9, rotate: 5, skewY: 5 },
        { y: 0, opacity: 1, scale: 1, rotate: 0, skewY: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' }
      )
    }
  
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.3)' }
      )
    }
  }, [currentMode])


  return (
    <section className="section-padding">
      <div className="container-custom" ref={contentRef}>
        <h2 className="gsap-title-word text-4xl font-bold mb-8 text-center">
          Tüm Sertifikalarım
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {certificates
            .slice()
            .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
            .map((certificate, index) => (
              <div
                key={certificate.id}
                className="certificate-card backdrop-blur-xl"
              >
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  index={index}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
