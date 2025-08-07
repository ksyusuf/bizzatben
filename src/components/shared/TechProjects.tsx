// src/components/shared/TechProjects.tsx
import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useModeStore } from '../../store/modeStore';
import { programmingProjects } from '../programming/DevProjects';
import { civilProjects } from '../civil/CivilProjects';
import { ProjectCard } from '../shared/ProjectCard';
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TechProjects() {
  const { tech } = useParams<{ tech: string }>();
  const { currentMode } = useModeStore();

  const allProjects = [...programmingProjects, ...civilProjects];

  const filteredProjects = allProjects.filter(project =>
    project.technologies.includes(tech as string)
  );

  // 'containerRef' tipi 'HTMLDivElement' olarak düzeltildi.
  const containerRef = useRef<HTMLDivElement>(null)
  
  useGSAP(() => {
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
          {filteredProjects.slice().reverse().map((project, index) => (
            <div
              key={project.id}
              className="project-card"
            >
              <ProjectCard
                project={project}
                index={index}
                currentMode={currentMode}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}