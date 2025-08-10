// src/components/shared/TechProjects.tsx
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useModeStore } from '../../store/modeStore';
import { programmingProjects, type Project } from '../programming/DevProjects';
import { civilProjects } from '../civil/CivilProjects';
import { ProjectCard } from './ProjectCard';
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ProjectDetailModal } from './ProjectDetailModal'

gsap.registerPlugin(ScrollTrigger)

export default function TechProjects() {
  const { tech } = useParams<{ tech: string }>();
  const { currentMode } = useModeStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const allProjects = [...programmingProjects, ...civilProjects];

  const filteredProjects = allProjects.filter(project =>
    project.technologies.includes(tech as string)
  );

  // 'containerRef' tipi 'HTMLDivElement' olarak düzeltildi.
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // URL parametresi (tech) değiştiğinde modalı kapat
    setSelectedProject(null);
  }, [tech]);
  
  useGSAP(() => {
    if (!containerRef.current) return;
  
    // Yalnızca containerRef altında ara
    const projectCards = Array.from(
      containerRef.current.querySelectorAll('.project-card')
    );
  
    projectCards.forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });
  }, { scope: containerRef, dependencies: [tech] });

  
  return (
    <div ref={containerRef} className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className={`text-4xl font-bold mb-4 ${
            currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
          }`}>
            {tech} Projeleri
          </h2>
          <Link to="/#projects" className={`text-xl underline ${
            currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
          }`}>
            Tüm Projelere Geri Dön
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.slice()
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
    </div>
  );
}