// src/components/shared/Projects.tsx
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useRef } from 'react'
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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
  if (!project) return null

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
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
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
              <Dialog.Panel className={`w-full max-w-4xl transform overflow-hidden rounded-2xl backdrop-blur-xl border ${
                currentMode === 'programming' 
                  ? 'bg-prog-darker/90 border-prog-neon/30' 
                  : 'bg-civil-darker/90 border-civil-gold/30'
              } p-6 text-left align-middle shadow-xl transition-all`}>
                <div className="flex justify-between items-start mb-6">
                  <Dialog.Title className={`text-3xl font-bold ${
                    currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                  }`}>
                    {project.title}
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className={`p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer ${
                      currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                    }`}
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Project Image or Icon Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    {project.image ? (
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover rounded-lg" // Added rounded-lg to image
                      />
                    ) : (
                      <div className={`text-8xl ${
                        currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                      }`}>
                        {currentMode === 'programming' ? '💻' : '🏗️'}
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div>
                    <p className={`text-lg mb-6 ${
                      currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
                    }`}>
                      {project.description}
                    </p>

                    <div className="mb-6">
                      <h4 className={`text-lg font-semibold mb-3 ${
                        currentMode === 'programming' ? 'text-prog-accent' : 'text-civil-amber'
                      }`}>
                        Kullanılan Teknolojiler
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-sm font-medium ${
                              currentMode === 'programming'
                                ? 'bg-prog-primary/20 text-prog-accent'
                                : 'bg-civil-primary/20 text-civil-amber'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6">
                      <span className={`text-xs font-medium ${
                        currentMode === 'programming' ? 'text-prog-light-rgb-60' : 'text-civil-light-rgb-60'
                      }`}>
                        {project.date}
                      </span>
                    </div>

                    <div className="absolute bottom-6 right-6">
                      <span className={`text-xs font-medium ${
                        currentMode === 'programming' ? 'text-prog-light-rgb-60' : 'text-civil-light-rgb-60'
                      }`}>
                        {project.date}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 flex-wrap"> {/* flex-wrap added for responsiveness */}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                            currentMode === 'programming'
                              ? 'bg-prog-primary/90 text-white hover:bg-prog-secondary/90'
                              : 'bg-civil-primary/90 text-white hover:bg-civil-secondary/90'
                          }`}
                        >
                          <ArrowTopRightOnSquareIcon className="w-5 h-5" />
                          Projeyi Görüntüle
                        </a>
                      )}
                      
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 backdrop-blur-xl cursor-pointer"
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                          GitHub
                        </a>
                      )}
                      
                      {project.pdfUrl && ( // Yeni eklenen PDF görüntüleme butonu
                        <a
                          href={project.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                            currentMode === 'programming'
                              ? 'border-prog-primary text-prog-primary hover:bg-prog-primary/20 bg-black/20' // Renkleri programlama moduna göre ayarlandı
                              : 'border-civil-amber text-civil-amber hover:bg-civil-amber/20 bg-black/20' // Renkleri sivil moduna göre ayarlandı
                          }`}
                        >
                          <EyeIcon className="w-5 h-5" /> {/* PDF için göz ikonu */}
                          PDF Görüntüle
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}