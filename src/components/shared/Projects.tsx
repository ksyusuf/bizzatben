import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useEffect, useRef } from 'react'
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useModeStore } from '../../store/modeStore'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  link?: string
  github?: string
}

const programmingProjects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'React ve Node.js ile geliştirilmiş modern e-ticaret platformu. Redux state management ve Stripe ödeme entegrasyonu.',
    image: '/api/placeholder/400/300',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'TypeScript ve Firebase ile geliştirilmiş gerçek zamanlı görev yönetim uygulaması.',
    image: '/api/placeholder/400/300',
    technologies: ['TypeScript', 'Firebase', 'Tailwind CSS'],
    link: 'https://example.com',
    github: 'https://github.com'
  },
  {
    id: '3',
    title: 'AI Chat Assistant',
    description: 'OpenAI API kullanarak geliştirilmiş yapay zeka destekli sohbet asistanı.',
    image: '/api/placeholder/400/300',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'React'],
    link: 'https://example.com',
    github: 'https://github.com'
  }
]

const civilProjects: Project[] = [
  {
    id: '1',
    title: 'Çok Katlı Rezidans',
    description: 'İstanbul\'da 25 katlı lüks rezidans projesi. Deprem dayanımı ve enerji verimliliği odaklı tasarım.',
    image: '/api/placeholder/400/300',
    technologies: ['SAP2000', 'ETABS', 'AutoCAD'],
    link: 'https://example.com'
  },
  {
    id: '2',
    title: 'Köprü Projesi',
    description: 'Karadeniz bölgesinde 500m uzunluğunda çelik köprü tasarımı ve analizi.',
    image: '/api/placeholder/400/300',
    technologies: ['STAAD.Pro', 'Tekla', 'AutoCAD'],
    link: 'https://example.com'
  },
  {
    id: '3',
    title: 'Hastane Yapısı',
    description: 'Ankara\'da 200 yataklı hastane kompleksi. Sismik izolasyon ve akıllı bina sistemleri.',
    image: '/api/placeholder/400/300',
    technologies: ['ETABS', 'SAP2000', 'Revit'],
    link: 'https://example.com'
  }
]

export default function Projects() {
  const { currentMode } = useModeStore()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = currentMode === 'programming' ? programmingProjects : civilProjects

  // GSAP refs
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Başlık animasyonu (scrollTrigger ile)
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    // Açıklama animasyonu (scrollTrigger ile)
    if (descRef.current) {
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }
    // Kartlar: sadece her biri için scrollTrigger ile animasyon (stagger efekti için delay kullan)
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: 0.4 + i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 98%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [currentMode, projects])

  return (
    <section id="projects" className="section-padding">
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
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { cardsRef.current[index] = el; }}
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

      {/* Project Details Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        currentMode={currentMode}
      />
    </section>
  )
}

function ProjectCard({ 
  project, 
  index, 
  currentMode, 
  onViewDetails 
}: { 
  project: Project
  index: number
  currentMode: string
  onViewDetails: () => void
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl border ${
        currentMode === 'programming' 
          ? 'bg-prog-dark/50 border-prog-neon/30' 
          : 'bg-civil-dark/50 border-civil-gold/30'
      } hover:scale-105 transition-all duration-300`}
    >
      {/* Project Image */}
      <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-t ${
          currentMode === 'programming' 
            ? 'from-prog-darker/80 to-transparent' 
            : 'from-civil-darker/80 to-transparent'
        }`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`text-6xl ${
            currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
          }`}>
            {currentMode === 'programming' ? '💻' : '🏗️'}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-3 ${
          currentMode === 'programming' ? 'text-prog-light' : 'text-civil-light'
        }`}>
          {project.title}
        </h3>
        <p className={`text-sm mb-4 ${
          currentMode === 'programming' ? 'text-prog-light/80' : 'text-civil-light/80'
        }`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentMode === 'programming'
                  ? 'bg-prog-primary/20 text-prog-accent'
                  : 'bg-civil-primary/20 text-civil-amber'
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onViewDetails}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer backdrop-blur-xl ${
              currentMode === 'programming'
                ? 'bg-prog-primary/20 text-prog-accent hover:bg-prog-primary/30 hover:border hover:border-prog-accent/20'
                : 'bg-civil-primary/20 text-civil-amber hover:bg-civil-primary/30 hover:border hover:border-civil-amber/20'
            }`}
          >
            <EyeIcon className="w-4 h-4" />
            Detaylar
          </button>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer backdrop-blur-xl ${
                currentMode === 'programming'
                  ? 'bg-prog-dark/50 text-prog-light hover:bg-prog-dark/70 hover:border hover:border-prog-primary/20'
                  : 'bg-civil-dark/50 text-civil-light hover:bg-civil-dark/70 hover:border hover:border-civil-primary/20'
              }`}
            >
              <CodeBracketIcon className="w-4 h-4" />
              Kod
            </a>
          )}
        </div>
      </div>
    </div>
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
                  {/* Project Image */}
                  <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                    <div className={`text-8xl ${
                      currentMode === 'programming' ? 'text-prog-neon' : 'text-civil-gold'
                    }`}>
                      {currentMode === 'programming' ? '💻' : '🏗️'}
                    </div>
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

                    {/* Action Buttons */}
                    <div className="flex gap-3">
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
                          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium border-2 transition-all duration-200 backdrop-blur-xl cursor-pointer ${
                            currentMode === 'programming'
                              ? 'border-prog-neon text-prog-neon hover:bg-prog-neon/20 bg-black/20'
                              : 'border-civil-gold text-civil-gold hover:bg-civil-gold/20 bg-black/20'
                          }`}
                        >
                          <CodeBracketIcon className="w-5 h-5" />
                          GitHub
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
