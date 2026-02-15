import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { contactService, profileService } from '../services/api';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await contactService.send(data);
            toast.success('Message sent successfully!');
            reset();
        } catch (err) {
            toast.error('Failed to send message.');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-bold">Let's <span className="gradient-text">Talk</span></h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Have a project in mind or just want to say hi? I'd love to hear from you. Send me a message and I'll get back to you as soon as possible.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-500">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Email</h3>
                                <p className="text-slate-500">{profile?.email || 'hello@devportfolio.com'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-500">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">WhatsApp</h3>
                                <p className="text-slate-500">{profile?.whatsapp || '+1 (234) 567-890'}</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass p-8 rounded-3xl"
                >
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2">Name</label>
                            <input
                                {...register('name', { required: true })}
                                className="input-field"
                                placeholder="Your Name"
                            />
                            {errors.name && <span className="text-red-500 text-xs">Name is required</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <input
                                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                                className="input-field"
                                placeholder="your@email.com"
                            />
                            {errors.email && <span className="text-red-500 text-xs">Valid email is required</span>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message</label>
                            <textarea
                                {...register('message', { required: true })}
                                rows="5"
                                className="input-field resize-none"
                                placeholder="How can I help you?"
                            ></textarea>
                            {errors.message && <span className="text-red-500 text-xs">Message is required</span>}
                        </div>
                        <button className="w-full btn-primary flex items-center justify-center">
                            Send Message <Send size={18} className="ml-2" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default Contact;
