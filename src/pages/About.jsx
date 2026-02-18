import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/api';

const About = () => {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await profileService.get();
            return data;
        },
    });

    const skills = ['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'TypeScript', 'Express', 'Cloudinary','python','Gen ai','AI Integration'];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const skillVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 },
        },
    };

    return (
        <div className="section-padding py-12 md:py-32 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                <Motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-5 relative order-2 lg:order-1"
                >
                    <div className="relative z-10">
                        <div className="aspect-[4/5] bg-slate-200 dark:bg-dark-light rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative group">
                            <img
                                src={profile?.image_url?.startsWith('http') ? profile.image_url : `${import.meta.env.VITE_API_URL?.replace('/api', '')}${profile?.image_url}` || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"}
                                alt="Profile"
                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000";
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-8 md:p-12">
                                <p className="text-white font-bold text-xl md:text-2xl leading-tight">
                                    "Code is poetry in motion, building the digital world piece by piece."
                                </p>
                            </div>
                        </div>

                        {/* Floating Experience Card */}
                        <Motion.div
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 glass p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] shadow-2xl z-20"
                        >
                            <p className="font-outfit font-black text-5xl md:text-7xl gradient-text mb-1 italic">6+</p>
                            <p className="text-xs md:text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] leading-tight">
                                months of freelancing<br />Craftsmanship
                            </p>
                        </Motion.div>
                    </div>

                    {/* Decorative Blobs */}
                    <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -z-10 animate-pulse delay-700"></div>
                </Motion.div>

                <Motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="lg:col-span-7 space-y-12 order-1 lg:order-2"
                >
                    <div className="space-y-6">
                        <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
                            I'm <span className="gradient-text">{profile?.name?.split(' ')[0] || 'A Developer'}</span>, crafting digital <span className="underline decoration-primary-500/30 decoration-8 underline-offset-[12px]">perfection</span>.
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xl md:text-2xl leading-relaxed font-medium">
                            {profile?.bio || "I'm a passionate web developer with a focus on creating modern and efficient web solutions. My journey started with a curiosity for how things work on the internet, which quickly turned into a career in full-stack development."}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-1 bg-primary-500 rounded-full"></span>
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-widest text-slate-400">Weaponry</h3>
                        </div>
                        <Motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="flex flex-wrap gap-3 md:gap-4"
                        >
                            {skills.map((skill) => (
                                <Motion.span
                                    key={skill}
                                    variants={skillVariants}
                                    whileHover={{ y: -5, scale: 1.05 }}
                                    className="px-6 py-3 md:px-8 md:py-4 bg-white dark:bg-dark-lighter border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-600 dark:text-slate-300 font-bold shadow-sm hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-500/30 transition-all cursor-default text-sm md:text-base"
                                >
                                    {skill}
                                </Motion.span>
                            ))}
                        </Motion.div>
                    </div>

                    <div className="pt-8 flex flex-col sm:flex-row gap-6">
                        <a
                            href={profile?.resume_url || "#"}
                            className="btn-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Get Resume
                        </a>
                        <Link to="/contact" className="btn-outline group">
                            Start a Conversations <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </Motion.div>
            </div>
        </div>
    );
};

export default About;
