import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            localStorage.setItem('adminToken', response.data.token);
            toast.success('Login successful!');
            navigate('/admin/dashboard');
        } catch {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-lighter py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-2xl dark:shadow-none dark:border dark:border-slate-800">
                <div className="text-center">
                    <div className="mx-auto h-16 w-16 bg-gradient-to-tr from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-primary-500/30">
                        <Lock size={28} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-outfit tracking-tight">
                        Admin Portal
                    </h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Please sign in to access your dashboard
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300 group-focus-within:text-primary-500 transition-colors">
                                Email Address
                            </label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="input-field w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-900 dark:text-white"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="group">
                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300 group-focus-within:text-primary-500 transition-colors">
                                Password
                            </label>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                className="input-field w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-dark focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-slate-900 dark:text-white"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full btn-primary py-3.5 text-base font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300 rounded-xl"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
