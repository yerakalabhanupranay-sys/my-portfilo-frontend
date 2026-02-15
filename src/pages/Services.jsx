import React from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { serviceService } from '../services/api';
import { Check } from 'lucide-react';

const Services = () => {
    const { data: services, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const { data } = await serviceService.getAll();
            return data;
        },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">My <span className="gradient-text">Services</span></h2>
                <p className="mt-4 text-slate-500 dark:text-slate-400">Professional web development solutions tailored to your needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(services?.length ? services : [
                    { name: 'Web Design', price: 'Starting $500', description: 'Modern, responsive, and user-friendly interface designs.' },
                    { name: 'Frontend Dev', price: 'Starting $800', description: 'High-performance React applications with stunning UI.' },
                    { name: 'Backend Dev', price: 'Starting $600', description: 'Scalable APIs, database design, and server optimization.' },
                ]).map((service, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -10 }}
                        className="glass p-8 rounded-3xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <Check size={80} className="text-primary-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                        <p className="text-primary-500 font-bold text-sm mb-4">{service.price}</p>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">{service.description}</p>
                        <ul className="space-y-3 mb-8">
                            {['100% Satisfaction', 'Quick Turnaround', 'SEO Optimized'].map((item) => (
                                <li key={item} className="flex items-center text-sm text-slate-500">
                                    <Check size={14} className="text-green-500 mr-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                        <button className="w-full btn-outline">Learn More</button>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Services;
