import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useModeStore } from '../../store/modeStore'
gsap.registerPlugin(ScrollTrigger)

export default function DevAbout() {
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
        <div className="grid place-items-center">
          <div className="glass-darker rounded-xl border border-prog-accent/50 p-6 shadow-xl shadow-prog-accent/20 w-full md:w-1/2">
            <h3 className="text-2xl font-semibold text-prog-primary mb-6">
              Yetkinlikler
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Python', level: 95 },
                { name: 'Makine Öğrenmesi', level: 90 },
                { name: 'React.js', level: 90 },
                { name: 'Görüntü İşleme', level: 85 },
                { name: 'DevOps & CI/CD', level: 85 },
                { name: 'Veri Analizi', level: 85 },
                { name: 'Node.js', level: 80 },
                { name: 'TypeScript', level: 80 },
                { name: 'Tailwind CSS', level: 75 },
                { name: 'Matlab', level: 75 },
              ].map((skill, i) => (
                <div key={skill.name} ref={el => { skillRefs.current[i] = el; }}>
                  <SkillItem name={skill.name} level={skill.level} />
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
