import React, { useRef, useState, useEffect } from 'react';
import { motion as Motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Code, Layout, Smartphone, Database, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { profileService, serviceService } from '../services/api';
import { useInView } from 'react-intersection-observer';
import useReducedMotion from '../hooks/useReducedMotion';
import LoadingSkeleton from '../components/LoadingSkeleton';

const Home = () => {
    const containerRef = useRef(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    // Magnetic cursor effect
    const cursorX = useMotionValue(0);
    const cursorY = useMotionValue(0);
    const springConfig = { damping: 25, stiffness: 150 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    const { data: services, isLoading: servicesLoading } = useQuery({
        queryKey: ['services'],
        queryFn: () => serviceService.getAll().then(res => res.data),
    });

    // Particle background effect
    useEffect(() => {
        if (prefersReducedMotion) return;

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [prefersReducedMotion]);

    const getIcon = (title) => {
        const lowerTitle = title.toLowerCase();
        if (lowerTitle.includes('front')) return Layout;
        if (lowerTitle.includes('back')) return Code;
        if (lowerTitle.includes('mobile') || lowerTitle.includes('app')) return Smartphone;
        if (lowerTitle.includes('database') || lowerTitle.includes('stack')) return Database;
        return Code;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    // Text reveal animation variants
    const textRevealVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: (i) => ({
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                delay: i * 0.1,
                ease: [0.33, 1, 0.68, 1]
            }
        })
    };

    // Magnetic button effect
    const MagneticButton = ({ children, to, className }) => {
        const buttonRef = useRef(null);

        const handleMouseMove = (e) => {
            if (!buttonRef.current || prefersReducedMotion) return;
            const rect = buttonRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            cursorX.set(x * 0.3);
            cursorY.set(y * 0.3);
        };

        const handleMouseLeave = () => {
            cursorX.set(0);
            cursorY.set(0);
        };

        return (
            <Motion.div
                ref={buttonRef}
                style={{ x: cursorXSpring, y: cursorYSpring }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to={to} className={className}>
                    {children}
                </Link>
            </Motion.div>
        );
    };

    const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <div ref={containerRef} className="space-y-24 md:space-y-48 pb-32 overflow-hidden relative">
            {/* Particle Background */}
            {!prefersReducedMotion && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <Motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary-500/20 rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                x: [0, (mousePosition.x - window.innerWidth / 2) * 0.02],
                                y: [0, (mousePosition.y - window.innerHeight / 2) * 0.02],
                                scale: [1, 1.5, 1],
                                opacity: [0.2, 0.5, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Hero Section */}
            <section ref={heroRef} className="relative pt-12 md:pt-32 min-h-[90vh] flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-12 text-center lg:text-left">
                            <Motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <Motion.span
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/10 text-primary-500 font-bold text-sm mb-8 border border-primary-500/10"
                                    initial={{ scale: 0 }}
                                    animate={heroInView ? { scale: 1 } : {}}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                    </span>
                                    Available for New Projects
                                </Motion.span>

                                <h1 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight text-slate-900 dark:text-white mb-8 leading-[0.95]">
                                    {profile?.headline?.split(' ').map((word, i) => (
                                        <Motion.span
                                            key={i}
                                            custom={i}
                                            variants={textRevealVariants}
                                            initial="hidden"
                                            animate={heroInView ? "visible" : "hidden"}
                                            className="inline-block overflow-hidden"
                                        >
                                            <span className={word.toLowerCase() === 'experiences' || word.toLowerCase() === 'matter' ? 'gradient-text' : ''}>
                                                {word}{' '}
                                            </span>
                                        </Motion.span>
                                    )) || (
                                            <>
                                                Building Digital <span className="gradient-text">Experiences</span> that <span className="gradient-text">Matter</span>
                                            </>
                                        )}
                                </h1>
                                <Motion.p
                                    className="mt-8 text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl lg:mx-0 mx-auto leading-relaxed font-medium"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                >
                                    {profile?.bio || "Hi, I'm a Full Stack Web Developer. I specialize in building human-centric digital products that are fast, visually stunning, and highly functional."}
                                </Motion.p>
                                <Motion.div
                                    className="mt-12 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.8, duration: 0.8 }}
                                >
                                    <MagneticButton to="/projects" className="btn-primary w-full sm:w-auto group">
                                        Explore Work <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </MagneticButton>
                                    <MagneticButton to="/contact" className="btn-outline w-full sm:w-auto group">
                                        Contact Me <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                                    </MagneticButton>
                                </Motion.div>
                            </Motion.div>
                        </div>
                    </div>
                </div>

                {/* Background Parallax Elements */}
                <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
                    <Motion.div
                        style={{ y: y1, rotate }}
                        className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-primary-200/40 dark:bg-primary-900/20 rounded-full blur-[120px]"
                    />
                    <Motion.div
                        style={{ y: y2, rotate: -rotate }}
                        className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-[120px]"
                    />
                </div>
            </section>

            {/* Services/Skills Section */}
            <section ref={servicesRef} className="section-padding">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    <div className="lg:col-span-4 sticky top-32">
                        <Motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-6xl font-black mb-6">Expertise & <span className="gradient-text">Skills</span></h2>
                            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
                                I provide specialized services in modern web development, focusing on performance, scalability, and exceptional user experience.
                            </p>
                            <div className="space-y-4">
                                {['UI/UX Design Implementation', 'Scalable Architecture', 'Performance Optimization'].map((text, i) => (
                                    <Motion.div
                                        key={i}
                                        className="flex items-center gap-3 text-slate-700 dark:text-slate-300 font-bold"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                    >
                                        <CheckCircle2 className="text-primary-500 w-5 h-5" />
                                        <span>{text}</span>
                                    </Motion.div>
                                ))}
                            </div>
                        </Motion.div>
                    </div>

                    <div className="lg:col-span-8">
                        {servicesLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <LoadingSkeleton type="card" count={4} />
                            </div>
                        ) : (
                            <Motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={servicesInView ? "visible" : "hidden"}
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {services?.map((service, idx) => {
                                    const Icon = getIcon(service.name);
                                    return (
                                        <Motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                            className="glass p-8 md:p-12 rounded-[2.5rem] card-hover group cursor-pointer"
                                        >
                                            <Motion.div
                                                className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-500/10 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center text-primary-500 mb-8"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 300 }}
                                            >
                                                <Icon size={36} />
                                            </Motion.div>
                                            <h3 className="text-2xl md:text-3xl font-black mb-4">{service.name}</h3>
                                            <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">{service.description}</p>
                                        </Motion.div>
                                    );
                                })}
                            </Motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding">
                <Motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-slate-900 dark:bg-dark-lighter rounded-[3rem] md:rounded-[4.5rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl"
                >
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-7xl font-black mb-8 leading-[1]">Let's Build Something <span className="gradient-text">Exceptional</span> Together.</h2>
                        <p className="text-slate-400 text-xl md:text-2xl mb-12 leading-relaxed">
                            I'm currently looking for new opportunities to create impactful digital experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                            <MagneticButton to="/contact" className="btn-primary py-5 px-12 text-xl w-full sm:w-auto">
                                Start a Project
                            </MagneticButton>
                            <Link to="/about" className="text-white font-bold hover:text-primary-400 transition-colors py-4 px-8 text-lg">
                                Learn More About Me →
                            </Link>
                        </div>
                    </div>
                </Motion.div>
            </section>
        </div>
    );
};

export default Home;
