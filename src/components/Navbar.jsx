import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion as Motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { profileService } from '../services/api';
import useTheme from '../hooks/useTheme';

const Navbar = () => {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();

    // Scroll progress indicator
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    const mobileMenuVariants = {
        closed: { opacity: 0, scale: 0.95, y: -20 },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0 }
    };

    return (
        <>
            {/* Scroll Progress Bar */}
            <Motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-indigo-500 to-primary-600 origin-left z-[110]"
                style={{ scaleX }}
            />

            <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4' : 'py-6'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Motion.div
                        initial={{ y: -100 }}
                        animate={{ y: 0 }}
                        transition={{ type: "spring", stiffness: 100, damping: 20 }}
                        className={`glass rounded-[2rem] px-6 md:px-10 h-20 flex justify-between items-center transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-dark-lighter/90 shadow-2xl shadow-primary-500/10 backdrop-blur-xl' : 'bg-white/70 dark:bg-dark-lighter/70 border-transparent shadow-lg'
                            }`}
                    >
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-outfit font-black tracking-tighter group">
                                <Motion.span
                                    className="gradient-text"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {profile?.name || 'DevPortfolio'}
                                </Motion.span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-2">
                            {navLinks.map((link, index) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={link.path}
                                            className="relative px-6 py-3 font-bold text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors group"
                                        >
                                            <span className="relative z-10">{link.name}</span>
                                            {isActive && (
                                                <Motion.div
                                                    layoutId="activeNav"
                                                    className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-xl"
                                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                            <Motion.div
                                                className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-primary-500 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-300"
                                            />
                                        </Link>
                                    </Motion.div>
                                );
                            })}
                        </div>

                        {/* Theme Toggle & Mobile Menu */}
                        <div className="flex items-center gap-4">
                            <Motion.button
                                onClick={toggleTheme}
                                whileHover={{ scale: 1.1, rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-3 rounded-xl bg-slate-100 dark:bg-dark-light text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-500 transition-all"
                                aria-label="Toggle theme"
                            >
                                <AnimatePresence mode="wait">
                                    {theme === 'dark' ? (
                                        <Motion.div
                                            key="sun"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Sun size={20} />
                                        </Motion.div>
                                    ) : (
                                        <Motion.div
                                            key="moon"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Moon size={20} />
                                        </Motion.div>
                                    )}
                                </AnimatePresence>
                            </Motion.button>

                            <Motion.button
                                onClick={() => setIsOpen(!isOpen)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="md:hidden p-3 rounded-xl bg-slate-100 dark:bg-dark-light text-slate-600 dark:text-slate-300"
                                aria-label="Toggle menu"
                            >
                                <AnimatePresence mode="wait">
                                    {isOpen ? (
                                        <Motion.div
                                            key="close"
                                            initial={{ rotate: -90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: 90, opacity: 0 }}
                                        >
                                            <X size={24} />
                                        </Motion.div>
                                    ) : (
                                        <Motion.div
                                            key="menu"
                                            initial={{ rotate: 90, opacity: 0 }}
                                            animate={{ rotate: 0, opacity: 1 }}
                                            exit={{ rotate: -90, opacity: 0 }}
                                        >
                                            <Menu size={24} />
                                        </Motion.div>
                                    )}
                                </AnimatePresence>
                            </Motion.button>
                        </div>
                    </Motion.div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <Motion.div
                            variants={mobileMenuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="md:hidden mt-4 mx-4"
                        >
                            <div className="glass rounded-3xl p-6 space-y-2 bg-white/95 dark:bg-dark-lighter/95 backdrop-blur-xl shadow-2xl">
                                {navLinks.map((link) => {
                                    const isActive = location.pathname === link.path;
                                    return (
                                        <Motion.div key={link.name} variants={linkVariants}>
                                            <Link
                                                to={link.path}
                                                onClick={() => setIsOpen(false)}
                                                className={`block px-6 py-4 rounded-2xl font-bold transition-all ${isActive
                                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
                                                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-light'
                                                    }`}
                                            >
                                                {link.name}
                                            </Link>
                                        </Motion.div>
                                    );
                                })}
                            </div>
                        </Motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </>
    );
};

export default Navbar;
