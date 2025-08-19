// src/components/shared/Projects.tsx
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useModeStore } from '../../store/modeStore'
import { programmingProjects } from '../programming/DevProjects'
import { civilProjects } from '../civil/CivilProjects'
import { ProjectCard, type Project } from '../project/ProjectCard'
import { ProjectDetailModal } from '../project/ProjectDetailModal'

export default function Projects() {
  const { currentMode } = useModeStore()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const projects = currentMode === 'programming' ? programmingProjects : civilProjects

  // sadece vitrin için 2 proje
  const featuredProjects = projects
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2)

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
  }, [currentMode])

  return (
    <section id="projects" ref={containerRef} className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="animate-on-scroll fade-up text-4xl font-bold mb-4">
            Projeler
          </h2>
          <p className="animate-on-scroll fade-up text-xl max-w-3xl mx-auto">
            {currentMode === 'programming'
              ? 'Geliştirdiğim yazılım projeleri ve teknoloji çözümleri'
              : 'Tasarladığım yapı projeleri ve mühendislik çözümleri'}
          </p>
        </div>

        {/* Vitrinsss */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card animate-on-scroll"
              style={{ transitionDelay: `${index * 0.1}s` }}
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

        <div className="text-center mt-8 animate-on-scroll fade-up">
          <Link
            to="/Alll-projects"
            className="px-6 py-3 rounded-lg font-semibold shadow-2xl transition backdrop-blur-lg border-2 cursor-pointer bg-black/10"
          >
            Tüm Projeleri Gör
          </Link>
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
