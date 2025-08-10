import React from 'react';
import { PencilIcon, EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { type Project } from '../project/ProjectCard'

interface ProjectDetailModalProps {
    project: Project | null
    isOpen: boolean
    onClose: () => void
    currentMode: string 
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ 
    project, 
    isOpen, 
    onClose, 
    currentMode 
}) => {

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
                    <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl backdrop-blur-xl border p-6 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-between items-start mb-6">
                            <Dialog.Title className="text-3xl font-bold">
                                {project.title}
                            </Dialog.Title>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
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
                                    className="w-full h-full object-cover rounded-lg"
                                />
                                ) : (
                                <div className="text-8xl">
                                    {currentMode === 'programming' ? '💻' : '🏗️'}
                                </div>
                                )}
                            </div>

                            {/* Project Details */}
                            <p className="text-lg mb-6">
                            {project.description}
                            </p>

                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-3">
                                    Kullanılan Teknolojiler
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <Link
                                        key={tech.slug}
                                        to={`/projects/tech/${tech.slug}`}
                                        className="px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors duration-200">
                                        {tech.name}
                                    </Link>
                                ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3">
                            {project.link && (
                                <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer"
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
                                className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer"
                                >
                                <CodeBracketIcon className="w-5 h-5" />
                                GitHub
                                </a>
                            )}

                            {project.prod && (
                                <a
                                href={project.prod}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer"
                                >
                                <EyeIcon className="w-5 h-5" />
                                Yayına Git
                                </a>
                            )}

                            {project.medium && (
                                <a
                                href={project.medium}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer"
                                >
                                <PencilIcon className="w-5 h-5" />
                                Medium'da Oku
                                </a>
                            )}

                            {project.pdfUrl && (
                                <a
                                href={project.pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-xl cursor-pointer"
                                >
                                <EyeIcon className="w-5 h-5" />
                                PDF Görüntüle
                                </a>
                            )}
                            </div>

                            {/* Project Date */}
                            <div className="mt-auto text-right text-xs font-medium text-gray-300 bottom-6 right-6">
                                <span className="text-xs font-medium">
                                    {project.date}
                                </span>
                            </div>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
        </Transition>
  );
};