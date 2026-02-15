import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/api';

const About = () => {
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data } = await profileService.get();
            return data;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="relative">
                        <div className="aspect-[4/5] bg-slate-200 dark:bg-dark-light rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1000"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-6 -right-6 glass p-6 rounded-2xl hidden md:block">
                            <p className="font-outfit font-bold text-3xl gradient-text">2+</p>
                            <p className="text-sm text-slate-500">Years Experience</p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl font-bold">About <span className="gradient-text">Me</span></h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                        {profile?.bio || "I'm a passionate web developer with a focus on creating modern and efficient web solutions. My journey started with a curiosity for how things work on the internet, which quickly turned into a career in full-stack development."}
                    </p>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold">What I specialize in:</h3>
                        <ul className="grid grid-cols-2 gap-4">
                            {['React.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Vite', 'Cloudinary'].map((skill) => (
                                <li key={skill} className="flex items-center text-slate-600 dark:text-slate-400">
                                    <span className="w-2 h-2 bg-primary-500 rounded-full mr-3"></span>
                                    {skill}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="pt-6">
                        <a href={profile?.resume_url || "#"} className="btn-primary" target="_blank" rel="noopener noreferrer">
                            Download Resume
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
