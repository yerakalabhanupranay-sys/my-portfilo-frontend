import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Layout, Smartphone, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/api';

const Home = () => {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    return (
        <div className="space-y-24 pb-20">
            {/* Hero Section */}
            <section className="relative pt-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-outfit font-extrabold tracking-tight text-slate-900 dark:text-white">
                                {profile?.headline?.includes('Building') ? profile.headline : 'Building Digital Experiences that '}
                                {!profile?.headline?.includes('Building') && <span className="gradient-text">Matter</span>}
                                {profile?.headline && !profile.headline.includes('Building') && profile.headline}
                            </h1>
                            <p className="mt-6 text-xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
                                {profile?.bio || "Hi, I'm a Full Stack Web Developer. I specialize in building human-centric digital products that are fast, visually stunning, and highly functional."}
                            </p>
                            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                <Link to="/projects" className="btn-primary flex items-center">
                                    View My Work <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                                <Link to="/contact" className="btn-outline">
                                    Get In Touch
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Background Elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none opacity-20">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
                </div>
            </section>

            {/* Skills/Quick Services Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: Layout, title: 'Frontend Development', desc: 'React, Next.js, Tailwind CSS' },
                        { icon: Code, title: 'Backend Engineering', desc: 'Node.js, Express, PostgreSQL' },
                        { icon: Smartphone, title: 'Mobile First', desc: 'Responsive & Adaptive Design' },
                        { icon: Database, title: 'Full Stack Solutions', desc: 'End-to-end web applications' },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            className="glass p-8 rounded-2xl text-center"
                        >
                            <div className="inline-flex items-center justify-center p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl text-primary-500 mb-6">
                                <item.icon size={24} />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-primary-600 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to start your next project?</h2>
                        <p className="text-primary-100 text-lg mb-10 max-w-2xl mx-auto">
                            Let's collaborate to build something amazing. I'm currently available for freelance opportunities and full-time positions.
                        </p>
                        <Link to="/contact" className="bg-white text-primary-600 font-bold py-3 px-8 rounded-full hover:bg-slate-100 transition-all text-lg">
                            Contact Me Now
                        </Link>
                    </div>
                    {/* Subtle pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-20 -mb-20"></div>
                </div>
            </section>
        </div>
    );
};

export default Home;
