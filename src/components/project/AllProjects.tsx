// src/components/project/AllProjects.tsx
import { useModeStore } from '../../store/modeStore'
import { programmingProjects } from '../programming/DevProjects'
import { civilProjects } from '../civil/CivilProjects'
import { ProjectCard } from './ProjectCard'
import { useRef } from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'

export default function AllProjects() {
  const { currentMode } = useModeStore()
  const projects = currentMode === 'programming' ? programmingProjects : civilProjects
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!contentRef.current) return

    const ctx = gsap.context(() => {
        gsap.fromTo(
            contentRef.current,
            { autoAlpha: 0, y: 50 },
            { autoAlpha: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        )

        gsap.fromTo(
            '.gsap-title-word',
            { 
            y: 80,
            opacity: 0,
            scale: 0.9,
            rotate: 5,
            skewY: 5,
            },
            {
            y: 0,
            opacity: 1,
            scale: 1,
            rotate: 0,
            skewY: 0,
            stagger: 0.08,
            delay: 0.3,
            duration: 1.2,
            ease: 'elastic.out(1, 0.5)',
            }
        )
    }, contentRef)
    return () => ctx.revert()
  }, [])

  return (
    <section className="section-padding">
      <div className="container-custom" ref={contentRef}>
        <h2 className="gsap-title-word text-4xl font-bold mb-8 text-center">
          Tüm Projeler
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                currentMode={currentMode}
              />
          ))}
        </div>
      </div>
    </section>
  )
}
