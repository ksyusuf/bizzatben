// src/components/shared/Projects.tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import { CodeBracketIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { programmingProjects } from '../programming/DevProjects'
import { civilProjects } from '../civil/CivilProjects'
import { ProjectCard, type Project } from './ProjectCard'

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
          {projects.slice().reverse().map((project, index) => (
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

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        currentMode={currentMode}
      />
    </section>
  )
}

function ProjectModal({ 
  project, 
  isOpen, 
  onClose, 
  currentMode 
}: { 
  project: Project | null
  isOpen: boolean
  onClose: () => void
  currentMode: string 
}) {
  const isProgramming = currentMode === 'programming';

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={`w-full max-w-4xl transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all ${
                isProgramming 
                  ? 'bg-prog-bg text-prog-light border border-prog-primary/20'
                  : 'bg-civil-bg text-civil-light border border-civil-primary/20'
              }`}>
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold leading-6 mb-4 flex justify-between items-center"
                >
                  {project?.title}
                  <button onClick={onClose} className={`p-1 rounded-full ${
                    isProgramming ? 'hover:bg-prog-primary/20' : 'hover:bg-civil-primary/20'
                  }`}>
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </Dialog.Title>

                <div className="mt-2 text-sm">
                  {project?.image && (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full max-h-96 object-contain rounded-lg mb-4 border border-zinc-700" 
                    />
                  )}
                  <p className="whitespace-pre-line text-lg mb-4">
                    {project?.description}
                  </p>
                  
                  {project?.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map(tech => (
                        <Link
                          key={tech}
                          to={`/projects/tech/${tech}`}
                          onClick={onClose}
                          className={`px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200 ${
                            isProgramming
                              ? 'bg-prog-primary/20 text-prog-accent hover:bg-prog-primary/40'
                              : 'bg-civil-primary/20 text-civil-amber hover:bg-civil-primary/40'
                          }`}
                        >
                          {tech}
                        </Link>
                      ))}
                    </div>
                  )}

                  <p className={`text-sm ${
                    isProgramming ? 'text-prog-light-secondary' : 'text-civil-light-secondary'
                  }`}>
                    <span className="font-semibold">Proje Tarihi:</span> {project?.date}
                  </p>
                </div>

                <div className="mt-4 flex space-x-2">
                  {project?.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${isProgramming ? 'btn-prog' : 'btn-civil'}`}
                    >
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      <span>Detaylı Bilgi</span>
                    </a>
                  )}
                  {project?.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn ${isProgramming ? 'btn-prog' : 'btn-civil'}`}
                    >
                      <CodeBracketIcon className="h-4 w-4" />
                      <span>GitHub</span>
                    </a>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}