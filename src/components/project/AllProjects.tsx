import { useModeStore } from '../../store/modeStore'
import { programmingProjects } from '../programming/DevProjects'
import { civilProjects } from '../civil/CivilProjects'
import { ProjectCard } from './ProjectCard'
import { useRef, useEffect, useState } from 'react'
import { gsap } from "gsap";

export default function AllProjects() {
  const { currentMode } = useModeStore()
  const contentRef = useRef<HTMLDivElement>(null)
  
  const [projects, setProjects] = useState(
    currentMode === 'programming' ? programmingProjects : civilProjects
  )

  useEffect(() => {
    if (!contentRef.current) return
    const cards = contentRef.current.querySelectorAll('.project-card')
    const title = contentRef.current.querySelector('.gsap-title-word')
  
    // Exit animasyonu: başlık + projeler
    gsap.to([title, ...cards], {
      y: 50,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power1.in',
      onComplete: () => {
        // State değişimi
        const newProjects =
          currentMode === 'programming' ? programmingProjects : civilProjects
        setProjects(newProjects)
      },
    })
  }, [currentMode])
  
  // Enter animasyonu: başlık + projeler
  useEffect(() => {
    if (!contentRef.current) return
    const cards = contentRef.current.querySelectorAll('.project-card')
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
  }, [projects])
  

  return (
    <section className="section-padding">
      <div className="container-custom" ref={contentRef}>
        <h2 className="gsap-title-word text-4xl font-bold mb-8 text-center">
          Tüm Projeler
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {projects
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((project, index) => (
              <div
                key={project.id}
                className="project-card backdrop-blur-xl"
              >
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  currentMode={currentMode}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
