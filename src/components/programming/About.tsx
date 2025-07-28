import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeStore } from '../../store/modeStore'
gsap.registerPlugin(ScrollTrigger)

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

  if (currentMode !== 'programming') return null

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
          <h2 ref={titleRef} className="text-4xl font-bold text-prog-primary mb-4">
            Yazılım Geliştirici
          </h2>
          <p ref={descRef} className="text-xl text-prog-light max-w-3xl mx-auto">
            Modern web teknolojileri ile kullanıcı dostu ve performanslı uygulamalar geliştiriyorum.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20">
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Teknolojiler
            </h3>
            <div className="space-y-4">
              {['React', 'TypeScript', 'Node.js', 'Python', 'Docker'].map((name, i) => (
                <div key={name} ref={el => { skillRefs.current[i] = el; }}>
                  <SkillItem name={name} level={90 - i * 5} />
                </div>
              ))}
            </div>
          </div>
          <div className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20">
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Deneyim
            </h3>
            <div className="space-y-4">
              {[
                { title: 'Senior Frontend Developer', company: 'TechCorp', period: '2022 - Günümüz', description: 'React ve TypeScript ile büyük ölçekli web uygulamaları geliştiriyorum.' },
                { title: 'Full Stack Developer', company: 'StartupXYZ', period: '2020 - 2022', description: 'Node.js ve React ile end-to-end çözümler geliştirdim.' }
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
        <span className="font-medium text-prog-light">{name}</span>
        <span className="text-sm text-prog-accent">{level}%</span>
      </div>
      <div className="w-full bg-black/50 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-prog-primary to-prog-accent h-2 rounded-full shadow-lg shadow-prog-primary/50"
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
    <div className="border-l-4 border-prog-primary pl-4">
      <h4 className="font-semibold text-prog-light">{title}</h4>
      <p className="text-prog-accent font-medium">{company}</p>
      <p className="text-sm text-prog-light/60 mb-2">{period}</p>
      <p className="text-prog-light/80">{description}</p>
    </div>
  )
} 