import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface Technology {
  name: string; // Orijinal teknoloji adı (Türkçe karakterler dahil)
  slug: string; // URL dostu hali
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  technologies: Technology[];
  link?: string;
  github?: string;
  prod?: string;
  medium?: string;
  pdfUrl?: string;
  date: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  currentMode: string;
  onViewDetails?: () => void;
}

const truncateDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
    return { truncatedDescriptionText: text, isTruncated: false };
  }
  const truncated = text.substring(0, maxLength).trim();
  return { truncatedDescriptionText: truncated + '...', isTruncated: true };
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  onViewDetails 
}) => {
  const { truncatedDescriptionText } = truncateDescription(project.description, 200);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border hover:scale-105 transition-all duration-300"
    >
      {project.image && (
        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t to-transparent">
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">
          {project.title}
        </h3>

        <p className="mb-4 text-sm">
          {truncatedDescriptionText}
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="ml-1 text-blue-100 underline decoration-2 underline-offset-2 hover:text-blue-300 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
            >
              Devamını oku
            </button>
          )}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <Link
              key={tech.slug}
              to={`/projects/tech/${tech.slug}`}
              className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200">
              {tech.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {project.link != '' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn p-2 relative group"
            >
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
              <span className="absolute bottom-full mb-2 -translate-x-1/6 
                 opacity-0 group-hover:opacity-100 
                 pointer-events-none group-hover:pointer-events-auto
                 transition-opacity duration-300 
                 text-xs text-white bg-black/70 px-2 py-1 rounded overflow-hidden whitespace-nowrap">
                Detaylı bilgi için tıkla
              </span>
            </a>
          )}
          {project.github != '' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn p-2 relative group"
            >
              <CodeBracketIcon className="h-4 w-4" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/6 
                 opacity-0 group-hover:opacity-100 
                 pointer-events-none group-hover:pointer-events-auto
                 transition-opacity duration-300 
                 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                  Github'da İncele
              </span>
            </a>
          )}
          {project.prod != '' && (
            <a
              href={project.prod}
              target="_blank"
              rel="noopener noreferrer"
              className="btn p-2 relative group"
            >
              <EyeIcon className="h-4 w-4" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/6 
                 opacity-0 group-hover:opacity-100 
                 pointer-events-none group-hover:pointer-events-auto
                 transition-opacity duration-300 
                 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                  Yayına Git
              </span>
            </a>
          )}
          {project.medium != '' && (
            <a
              href={project.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="btn p-2 relative group"
            >
              <PencilIcon className="h-4 w-4" />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/6 
                 opacity-0 group-hover:opacity-100 
                 pointer-events-none group-hover:pointer-events-auto
                 transition-opacity duration-300 
                 text-xs text-white bg-black/70 px-2 py-1 rounded whitespace-nowrap">
                  Medium'da Oku
              </span>
            </a>
          )}
        </div>

        <div className="absolute text-right text-gray-300 bottom-6 right-6">
          <span className="text-xs font-medium">
            {project.date}
          </span>
        </div>
      </div>
    </div>
  );
};