import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { serviceService } from '../services/api';
import { Check } from 'lucide-react';

const Services = () => {
    const { data: services } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const { data } = await serviceService.getAll();
            return data;
        },
    });

    const defaultServices = [
        { name: 'Web Design', price: 'From $500', description: 'Modern, responsive, and user-friendly interface designs using Figma and Adobe XD.' },
        { name: 'Frontend Dev', price: 'From $800', description: 'High-performance React applications with stunning UI and seamless user experience.' },
        { name: 'Backend Dev', price: 'From $600', description: 'Scalable APIs, secure database design, and high-availability server optimization.' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="text-center mb-20">
                <Motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black mb-6"
                >
                    My <span className="gradient-text">Services</span>
                </Motion.h2>
                <Motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-slate-500 dark:text-slate-400 text-xl max-w-2xl mx-auto font-medium"
                >
                    I provide ends-to-end digital solutions to help your business grow in the modern web era.
                </Motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {(services?.length ? services : defaultServices).map((service, idx) => (
                    <Motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -12 }}
                        className="glass p-12 rounded-[3rem] border border-slate-100 dark:border-slate-800 relative overflow-hidden group hover:bg-white dark:hover:bg-dark-light/40 transition-all duration-500"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />

                        <div className="mb-8">
                            <div className="w-16 h-16 bg-primary-50 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                                <Check size={32} />
                            </div>
                            <h3 className="text-3xl font-bold mb-3">{service.name}</h3>
                            <div className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
                                {service.price}
                            </div>
                        </div>

                        <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed font-medium">
                            {service.description}
                        </p>

                        <ul className="space-y-4 mb-10">
                            {['100% Satisfaction', 'Real-time Updates', 'Premium Design'].map((item) => (
                                <li key={item} className="flex items-center text-slate-500 dark:text-slate-400 font-bold text-sm">
                                    <div className="w-5 h-5 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mr-3">
                                        <Check size={12} />
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <Link to="/contact" className="btn-outline w-full py-4 text-lg group-hover:bg-primary-500 group-hover:text-white transition-all">
                            Hire Me Now
                        </Link>
                    </Motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
