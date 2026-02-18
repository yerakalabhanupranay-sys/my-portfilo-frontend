import React, { useState } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { contactService, profileService } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const Contact = () => {
    const [focusedField, setFocusedField] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, watch } = useForm();

    const watchedFields = watch();

    const onSubmit = async (data) => {
        try {
            await contactService.send(data);
            setSubmitSuccess(true);
            toast.success('Message sent! I will get back to you soon.', {
                icon: '🎉',
                duration: 4000,
            });
            reset();
            setTimeout(() => setSubmitSuccess(false), 3000);
        } catch {
            toast.error('Something went wrong. Please try again.', {
                icon: '❌',
            });
        }
    };

    const contactInfo = [
        { icon: Mail, label: 'Email', value: profile?.email || 'hello@devportfolio.com', color: 'bg-primary-500', href: `mailto:${profile?.email}` },
        { icon: Phone, label: 'WhatsApp', value: profile?.whatsapp || '+1 (234) 567-890', color: 'bg-green-500', href: `https://wa.me/${profile?.whatsapp?.replace(/\D/g, '')}` },
        { icon: MapPin, label: 'Location', value: profile?.location || 'Remote / Worldwide', color: 'bg-purple-500' },
    ];

    const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [formRef, formInView] = useInView({ triggerOnce: true, threshold: 0.1 });

    // Floating label input component
    const FloatingInput = ({ name, label, type = 'text', error, ...props }) => {
        const value = watchedFields[name];
        const isFocused = focusedField === name;
        const hasValue = value && value.length > 0;

        return (
            <div className="relative">
                <Motion.input
                    {...register(name, props.validation)}
                    type={type}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-6 py-5 rounded-2xl border-2 bg-white dark:bg-dark-lighter outline-none transition-all font-medium text-lg
                        ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-primary-500'}
                        ${isFocused ? 'ring-8 ring-primary-500/5' : ''}
                    `}
                    placeholder=" "
                />
                <Motion.label
                    animate={{
                        y: isFocused || hasValue ? -32 : 0,
                        scale: isFocused || hasValue ? 0.85 : 1,
                        color: error ? '#ef4444' : isFocused ? '#2d5cf3' : '#94a3b8',
                    }}
                    className="absolute left-6 top-5 font-bold pointer-events-none origin-left"
                >
                    {label}
                </Motion.label>
                <AnimatePresence>
                    {error && (
                        <Motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-2 ml-2 font-medium"
                        >
                            {error.message}
                        </Motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    const FloatingTextarea = ({ name, label, error, ...props }) => {
        const value = watchedFields[name];
        const isFocused = focusedField === name;
        const hasValue = value && value.length > 0;

        return (
            <div className="relative">
                <Motion.textarea
                    {...register(name, props.validation)}
                    onFocus={() => setFocusedField(name)}
                    onBlur={() => setFocusedField(null)}
                    rows={6}
                    className={`w-full px-6 py-5 rounded-2xl border-2 bg-white dark:bg-dark-lighter outline-none transition-all font-medium text-lg resize-none
                        ${error ? 'border-red-500 focus:border-red-500' : 'border-slate-200 dark:border-slate-800 focus:border-primary-500'}
                        ${isFocused ? 'ring-8 ring-primary-500/5' : ''}
                    `}
                    placeholder=" "
                />
                <Motion.label
                    animate={{
                        y: isFocused || hasValue ? -32 : 0,
                        scale: isFocused || hasValue ? 0.85 : 1,
                        color: error ? '#ef4444' : isFocused ? '#2d5cf3' : '#94a3b8',
                    }}
                    className="absolute left-6 top-5 font-bold pointer-events-none origin-left"
                >
                    {label}
                </Motion.label>
                <AnimatePresence>
                    {error && (
                        <Motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-red-500 text-sm mt-2 ml-2 font-medium"
                        >
                            {error.message}
                        </Motion.p>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                <Motion.div
                    ref={headerRef}
                    initial={{ opacity: 0, x: -30 }}
                    animate={headerInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="space-y-12"
                >
                    <div className="max-w-lg">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">Let's build <span className="gradient-text">something</span> incredible.</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-xl leading-relaxed font-medium">
                            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {contactInfo.map((info, idx) => (
                            <Motion.div
                                key={info.label}
                                initial={{ opacity: 0, x: -20 }}
                                animate={headerInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ delay: 0.2 + idx * 0.1, duration: 0.6 }}
                                whileHover={{ x: 10, transition: { duration: 0.2 } }}
                                className="group"
                            >
                                {info.href ? (
                                    <a
                                        href={info.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glass p-6 rounded-2xl flex items-center gap-6 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 border border-slate-100 dark:border-slate-800"
                                    >
                                        <Motion.div
                                            className={`${info.color} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <info.icon size={24} />
                                        </Motion.div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-1">{info.label}</p>
                                            <p className="text-lg font-black text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">{info.value}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div className="glass p-6 rounded-2xl flex items-center gap-6 border border-slate-100 dark:border-slate-800">
                                        <Motion.div
                                            className={`${info.color} w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            transition={{ type: "spring", stiffness: 300 }}
                                        >
                                            <info.icon size={24} />
                                        </Motion.div>
                                        <div>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-1">{info.label}</p>
                                            <p className="text-lg font-black text-slate-900 dark:text-white">{info.value}</p>
                                        </div>
                                    </div>
                                )}
                            </Motion.div>
                        ))}
                    </div>
                </Motion.div>

                <Motion.div
                    ref={formRef}
                    initial={{ opacity: 0, x: 30 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 md:p-12 rounded-[3rem] space-y-8 border border-slate-100 dark:border-slate-800">
                        <FloatingInput
                            name="name"
                            label="Your Name"
                            error={errors.name}
                            validation={{ required: 'Name is required' }}
                        />

                        <FloatingInput
                            name="email"
                            label="Email Address"
                            type="email"
                            error={errors.email}
                            validation={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            }}
                        />

                        <FloatingInput
                            name="phone"
                            label="Phone Number (Optional)"
                            type="tel"
                            error={errors.phone}
                        />

                        <FloatingTextarea
                            name="message"
                            label="Your Message"
                            error={errors.message}
                            validation={{ required: 'Message is required' }}
                        />

                        <Motion.button
                            type="submit"
                            disabled={isSubmitting || submitSuccess}
                            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                            className={`btn-primary w-full py-6 text-lg relative overflow-hidden ${isSubmitting || submitSuccess ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                        >
                            <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                    <Motion.span
                                        key="loading"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Sending...
                                    </Motion.span>
                                ) : submitSuccess ? (
                                    <Motion.span
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Sent Successfully!
                                    </Motion.span>
                                ) : (
                                    <Motion.span
                                        key="send"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="flex items-center justify-center gap-3"
                                    >
                                        Send Message <Send className="w-5 h-5" />
                                    </Motion.span>
                                )}
                            </AnimatePresence>
                        </Motion.button>
                    </form>
                </Motion.div>
            </div>
        </div>
    );
};

export default Contact;
