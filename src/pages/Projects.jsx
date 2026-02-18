import React, { useState, useRef } from 'react';
import { motion as Motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { projectService } from '../services/api';
import { ExternalLink, Github } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useReducedMotion from '../hooks/useReducedMotion';

const Projects = () => {
    const prefersReducedMotion = useReducedMotion();
    const { data: projects, isLoading } = useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data } = await projectService.getAll();
            return data;
        },
    });

    // 3D Tilt Card Component
    const TiltCard = ({ project, index }) => {
        const [rotateX, setRotateX] = useState(0);
        const [rotateY, setRotateY] = useState(0);
        const cardRef = useRef(null);
        const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

        const handleMouseMove = (e) => {
            if (!cardRef.current || prefersReducedMotion) return;
            const card = cardRef.current;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateXValue = ((y - centerY) / centerY) * -10;
            const rotateYValue = ((x - centerX) / centerX) * 10;

            setRotateX(rotateXValue);
            setRotateY(rotateYValue);
        };

        const handleMouseLeave = () => {
            setRotateX(0);
            setRotateY(0);
        };

        return (
            <Motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group perspective-1000"
            >
                <Motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    animate={{
                        rotateX: prefersReducedMotion ? 0 : rotateX,
                        rotateY: prefersReducedMotion ? 0 : rotateY,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="glass rounded-[3rem] overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500 border border-slate-100 dark:border-slate-800"
                >
                    <div className="aspect-video overflow-hidden relative">
                        <Motion.img
                            src={project.image_url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                        <Motion.div
                            className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                        >
                            <Motion.a
                                href={project.live_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-5 bg-white text-primary-600 rounded-2xl font-black flex items-center gap-2 shadow-xl"
                                whileHover={{ scale: 1.1, y: -5 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Live Preview <ExternalLink size={20} />
                            </Motion.a>
                        </Motion.div>
                    </div>
                    <div className="p-10" style={{ transform: "translateZ(20px)" }}>
                        <Motion.h3
                            className="text-2xl font-black mb-4 group-hover:text-primary-500 transition-colors leading-tight"
                            whileHover={{ x: 5 }}
                        >
                            {project.title}
                        </Motion.h3>
                        <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 line-clamp-2 font-medium">{project.description}</p>
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                            {project.tech_stack?.map((tech, i) => (
                                <Motion.span
                                    key={tech}
                                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-slate-50 dark:bg-dark-light/50 rounded-lg text-slate-500 dark:text-slate-400 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/10 group-hover:text-primary-500 transition-all"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.3 + i * 0.05 }}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                >
                                    {tech}
                                </Motion.span>
                            ))}
                        </div>
                    </div>
                </Motion.div>
            </Motion.div>
        );
    };

    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
                <div className="text-center mb-20">
                    <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded-xl w-64 mx-auto mb-6 animate-pulse"></div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-lg w-96 mx-auto animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <LoadingSkeleton type="project" count={6} />
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div ref={headerRef} className="text-center mb-20">
                <Motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    className="text-4xl md:text-6xl font-black mb-6"
                >
                    Latest <span className="gradient-text">Work</span>
                </Motion.h2>
                <Motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto font-medium"
                >
                    A curated collection of digital experiences I've built.
                </Motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(projects?.length ? projects : []).map((project, idx) => (
                    <TiltCard key={project.id || idx} project={project} index={idx} />
                ))}
            </div>

            {/* Empty State */}
            {projects?.length === 0 && (
                <Motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                >
                    <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-dark-light rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-300 mb-2">No projects yet</h3>
                    <p className="text-slate-500 dark:text-slate-400">Check back soon for amazing work!</p>
                </Motion.div>
            )}
        </div>
    );
};

export default Projects;
