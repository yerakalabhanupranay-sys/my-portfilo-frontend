import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/api';

const Footer = () => {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    return (
        <footer className="bg-white dark:bg-dark-lighter border-t border-slate-100 dark:border-slate-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="text-2xl font-outfit font-bold gradient-text">
                            {profile?.name || 'DevPortfolio'}
                        </Link>
                        <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-md">
                            {profile?.bio?.substring(0, 150) || 'A student/freelance web developer dedicated to building high-performance, beautiful, and user-centric web applications.'}
                            {profile?.bio?.length > 150 ? '...' : ''}
                        </p>
                        <div className="flex space-x-6 mt-6">
                            <a href={profile?.github_url || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href={profile?.twitter_url || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href={profile?.linkedin_url || "#"} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Quick Links</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="/about" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">About Me</Link></li>
                            <li><Link to="/projects" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">Projects</Link></li>
                            <li><Link to="/services" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">Services</Link></li>
                            <li><Link to="/contact" className="text-slate-500 dark:text-slate-400 hover:text-primary-500 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Contact</h3>
                        <ul className="mt-4 space-y-4">
                            <li className="flex items-center text-slate-500 dark:text-slate-400">
                                <Mail size={16} className="mr-2" />
                                {profile?.email || 'hello@devportfolio.com'}
                            </li>
                            <li className="text-slate-500 dark:text-slate-400">
                                {profile?.whatsapp || 'Remote / Anywhere'}
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-sm text-slate-400">
                        &copy; {new Date().getFullYear()} {profile?.name || 'DevPortfolio'}. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
