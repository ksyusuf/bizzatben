// src/components/shared/ProjectCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

// Project arayüzünü burada tanımlıyoruz, diğer dosyalar da buradan import edecek.
export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  link?: string;
  github?: string;
  pdfUrl?: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  currentMode: string;
  onViewDetails?: () => void; // Opsiyonel hale getirildi
}

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return { truncatedText: text, isTruncated: false };
  }
  const truncated = text.substring(0, maxLength).trim();
  return { truncatedText: truncated + '...', isTruncated: true };
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  currentMode, 
  onViewDetails 
}) => {
  const { truncatedText } = truncateDescription(project.description, 200);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border hover:scale-105 transition-all duration-300"
    >
      {project.image && (
        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${
            currentMode === 'programming' ? 'from-prog-bg/70' : 'from-civil-bg/70'
          } to-transparent`}></div>
        </div>
      )}

      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${
          currentMode === 'programming' ? 'text-prog-light' : 'text-civil-gold'
        }`}>
          {project.title}
        </h3>
        <p className={`mb-4 text-sm ${
          currentMode === 'programming' ? 'text-prog-light-secondary' : 'text-civil-light-secondary'
        }`}>
          {truncatedText}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Link
              key={tech}
              to={`/projects/tech/${tech}`}
              className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 ${
                currentMode === 'programming'
                  ? 'bg-prog-primary/20 text-prog-accent hover:bg-prog-primary/40'
                  : 'bg-civil-primary/20 text-civil-amber hover:bg-civil-primary/40'
              }`}
            >
              {tech}
            </Link>
          ))}
        </div>

        {/* ... (Buttons) */}
        <div className="flex items-center space-x-2">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${
                currentMode === 'programming' ? 'btn-prog' : 'btn-civil'
              }`}
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              <span>Detaylı Bilgi</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn ${
                currentMode === 'programming' ? 'btn-prog' : 'btn-civil'
              }`}
            >
              <CodeBracketIcon className="h-4 w-4" />
              <span>Kod</span>
            </a>
          )}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className={`btn ${
                currentMode === 'programming' ? 'btn-prog' : 'btn-civil'
              }`}
            >
              <EyeIcon className="h-4 w-4" />
              <span>İncele</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};