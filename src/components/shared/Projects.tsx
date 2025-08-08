// src/components/shared/Projects.tsx
import { useState, useRef } from 'react'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { programmingProjects } from '../programming/DevProjects'
import { civilProjects } from '../civil/CivilProjects'
import { ProjectCard, type Project } from './ProjectCard'
import { ProjectDetailModal } from './ProjectDetailModal'

gsap.registerPlugin(ScrollTrigger)

export default function Projects() {
  const { currentMode } = useModeStore()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = currentMode === 'programming' ? programmingProjects : civilProjects

  const containerRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Proje başlığı ve açıklama animasyonu
    gsap.from([titleRef.current, descRef.current], {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    // Proje kartları animasyonu
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach((card) => {
      gsap.from(card as HTMLElement, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card as HTMLElement,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });

  }, { scope: containerRef, dependencies: [currentMode] });

  return (
    <section id="projects" ref={containerRef} className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 ref={titleRef} className={`text-4xl font-bold mb-4 ${
            currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
          }`}>
            Projeler
          </h2>
          <p ref={descRef} className={`text-xl max-w-3xl mx-auto ${
            currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
          }`}>
            {currentMode === 'programming' 
              ? 'Geliştirdiğim yazılım projeleri ve teknoloji çözümleri'
              : 'Tasarladığım yapı projeleri ve mühendislik çözümleri'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects
          .slice()
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // yeni → eski
          .map((project, index) => (
            <div
              key={project.id}
              className="project-card"
            >
              <ProjectCard 
                project={project}
                index={index}
                currentMode={currentMode}
                onViewDetails={() => setSelectedProject(project)}
              />
            </div>
        ))}
        </div>
      </div>

      <ProjectDetailModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        currentMode={currentMode}
      />
    </section>
  )
}
