import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { useModeStore } from '../../store/modeStore'

export default function About() {
  const { currentMode } = useModeStore()
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const skillRefs = useRef<(HTMLDivElement | null)[]>([])
  const expRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
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
    if (skillRefs.current.length > 0) {
      gsap.fromTo(
        skillRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    if (expRefs.current.length > 0) {
      gsap.fromTo(
        expRefs.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentMode])

  if (currentMode !== 'civil') return null

  return (
    <section
      id="about"
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
      style={{
        background: 'linear-gradient(to bottom, rgba(24,24,27,0) 0%, rgba(24,24,27,0.5) 10%, rgba(255,24,255,0.1) 50%,  rgba(24,24,27,0.5) 90%, rgba(24,24,27,0) 100%)'
      }}
    >
      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className="text-4xl font-bold text-civil-primary mb-4">
            İnşaat Mühendisi
          </h2>
          <p ref={descRef} className="text-xl text-civil-light max-w-3xl mx-auto">
            Sürdürülebilir ve güvenli yapılar tasarlayarak topluma değer katıyorum.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-darker rounded-xl border border-civil-primary/50 p-6 shadow-xl shadow-civil-primary/20">
            <h3 className="text-2xl font-semibold text-civil-primary mb-6">
              Uzmanlık Alanları
            </h3>
            <div className="space-y-4">
              {['Yapı Analizi', 'Beton Teknolojisi', 'Çelik Yapılar', 'Deprem Mühendisliği', 'Proje Yönetimi'].map((name, i) => (
                <div key={name} ref={el => { skillRefs.current[i] = el; }}>
                  <SkillItem name={name} level={95 - i * 5} />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-darker rounded-xl border border-civil-primary/50 p-6 shadow-xl shadow-civil-primary/20">
            <h3 className="text-2xl font-semibold text-civil-primary mb-6">
              Deneyim
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Kıdemli İnşaat Mühendisi', company: 'MegaYapı Ltd.', period: '2021 - Günümüz', description: 'Büyük ölçekli konut ve ticari projelerde yapısal tasarım ve analiz yapıyorum.' },
                { title: 'Proje Mühendisi', company: 'İnşaatPro', period: '2019 - 2021', description: 'Çok katlı binalar ve köprü projelerinde görev aldım.' }
              ].map((exp, i) => (
                <div key={exp.title} ref={el => { expRefs.current[i] = el; }}>
                  <ExperienceItem {...exp} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillItem({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium text-civil-light">{name}</span>
        <span className="text-sm text-civil-accent">{level}%</span>
      </div>
      <div className="w-full bg-black/50 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-civil-primary to-civil-accent h-2 rounded-full shadow-lg shadow-civil-primary/50"
        />
      </div>
    </div>
  )
}

function ExperienceItem({ 
  title, 
  company, 
  period, 
  description 
}: { 
  title: string; 
  company: string; 
  period: string; 
  description: string 
}) {
  return (
    <div className="border-l-4 border-civil-primary pl-4">
      <h4 className="font-semibold text-civil-light">{title}</h4>
      <p className="text-civil-accent font-medium">{company}</p>
      <p className="text-sm text-civil-light/60 mb-2">{period}</p>
      <p className="text-civil-light/80">{description}</p>
    </div>
  )
} 