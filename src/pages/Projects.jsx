import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/api';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await projectService.getAll();
            return data;
        },
    });

    if (isLoading) return <div className="text-center py-20">Loading projects...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">Latest <span className="gradient-text">Projects</span></h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400">A collection of my recent work and experiments.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {(projects?.length ? projects : []).map((project, idx) => (
                    <motion.div
                        key={project.id || idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group glass rounded-3xl overflow-hidden hover:shadow-2xl transition-all"
                    >
                        <div className="aspect-video overflow-hidden relative">
                            <img
                                src={project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'}
                                alt={project.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-4">
                                <a href={project.live_url} className="p-3 bg-white rounded-full text-slate-900 hover:bg-primary-500 hover:text-white transition-colors">
                                    <ExternalLink size={20} />
                                </a>
                            </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors">{project.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                                {project.tech_stack?.map((tech) => (
                                    <span key={tech} className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-dark-light rounded text-slate-500 dark:text-slate-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
