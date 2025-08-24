import { useRef, useEffect } from 'react';
import { certificates } from './CertificateList';
import { CertificateCard } from './CertificateCard';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';


export default function CertificateShowcase() {
  // En son 3 sertifikayı al
  const latestCertificates = certificates
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, 3);

    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => {
      const elements = containerRef.current?.querySelectorAll('.animate-on-scroll') || []
  
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.2 }
      )
  
      elements.forEach(el => observer.observe(el))
      return () => observer.disconnect()
    }, [])

  return (
    <section ref={containerRef} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
        <h2 className="animate-on-scroll fade-up text-4xl font-bold mb-4">
            Son Sertifikalar
          </h2>
          <p className="animate-on-scroll fade-up text-xl max-w-3xl mx-auto">
            Sürekli öğrenme ve gelişim için aldığım en son sertifikalar. 
            Eğitim, konferans ve çeşitli alanlarda kendimi geliştirmeye devam ediyorum.
          </p>
        </div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {latestCertificates.map((certificate, index) => (
            <div
              key={certificate.id}
              className="project-card animate-on-scroll backdrop-blur-xl"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="relative text-center mt-8 animate-on-scroll">
          <Link
            to="/certificates"
            className="relative px-6 py-3 rounded-lg font-semibold border-2 backdrop-blur-xl cursor-pointer inline-flex items-center gap-2"
          >
            Tüm Sertifikalarımı Görüntüle
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
