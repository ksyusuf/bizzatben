import { certificates } from './CertificateList'
import { CertificateCard } from './CertificateCard'
import { useRef } from 'react'


export default function AllCertificates() {
  const contentRef = useRef<HTMLDivElement>(null)
  

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
