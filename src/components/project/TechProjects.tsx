// src/components/shared/TechProjects.tsx
import { useState, useRef, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useModeStore } from '../../store/modeStore';
import { programmingProjects } from '../programming/DevProjects';
import { civilProjects } from '../civil/CivilProjects';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { type Project } from '../project/ProjectCard';

export default function TechProjects() {
  const { tech } = useParams<{ tech: string }>();
  const { currentMode } = useModeStore();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const allProjects = [...programmingProjects, ...civilProjects];
  const filteredProjects = allProjects.filter(project =>
    project.technologies.some(techObj => techObj.slug === tech)
  );

  const techByfirstProject =
    filteredProjects.length > 0
      ? filteredProjects[0].technologies.find(t => t.slug === tech)!.name
      : undefined;

  const containerRef = useRef<HTMLElement>(null);

  // Tech değişince modal kapansın
  useEffect(() => {
    setSelectedProject(null);
  }, [tech]);

  // Intersection Observer animasyon
  useEffect(() => {
    const elements = containerRef.current?.querySelectorAll('.animate-on-scroll') || [];

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [tech, currentMode]);

  return (
    <section ref={containerRef} className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="animate-on-scroll fade-up text-4xl font-bold mb-4">
            {techByfirstProject} Projeleri
          </h2>
          <Link
            to="/#projects"
            className={`animate-on-scroll fade-up text-xl underline ${
              currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
            }`}
          >
            Tüm Projelere Geri Dön
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects
            .slice()
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((project, index) => (
              <div
                key={project.id}
                className="project-card animate-on-scroll fade-up"
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
