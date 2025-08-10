// src/components/shared/TechProjects.tsx
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useModeStore } from '../../store/modeStore';
import { programmingProjects } from '../programming/DevProjects';
import { civilProjects } from '../civil/CivilProjects';
import { ProjectCard } from './ProjectCard';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ProjectDetailModal } from './ProjectDetailModal';
import { type Project } from '../project/ProjectCard'

gsap.registerPlugin(ScrollTrigger);

export default function TechProjects() {
  const { tech } = useParams<{ tech: string }>();
  const { currentMode } = useModeStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allProjects = [...programmingProjects, ...civilProjects];
  const filteredProjects = allProjects.filter(project =>
    project.technologies.some(techObj => techObj.slug === tech)
  );

  const techByfirstProject = filteredProjects.length > 0
  ? filteredProjects[0].technologies.find(t => t.slug === tech)!.name
  : undefined;
  // biraz ilkel oldu

  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // URL parametresi (techName) değiştiğinde modalı kapat
    setSelectedProject(null);
  }, [tech]);

  // State değiştiğinde ScrollTrigger'ları temizle
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [tech, currentMode])

  useGSAP(() => {
    // Önceki animasyonları temizle
    gsap.killTweensOf(titleRef.current)
    gsap.killTweensOf('.project-card')

    // Başlık animasyonu
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Proje kartları animasyonu
    const projectCards = gsap.utils.toArray('.project-card');
    if (projectCards.length > 0) {
      gsap.from(projectCards, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Production ortamında ScrollTrigger'ı yenile
    if (typeof window !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, { scope: containerRef, dependencies: [tech, currentMode] });

  return (
    <section ref={containerRef} className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="text-4xl font-bold mb-4"
          >
            {techByfirstProject} Projeleri
          </h2>
          <Link
            to="/#projects"
            className={`text-xl underline ${
              currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
            }`}
          >
            Tüm Projelere Geri Dön
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects
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
  );
}
