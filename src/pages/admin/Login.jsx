import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import toast from 'react-hot-toast';
import { Lock } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await authService.login(data);
            localStorage.setItem('adminToken', response.data.token);
            toast.success('Login successful!');
            navigate('/admin/dashboard');
        } catch (err) {
            toast.error('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 glass p-10 rounded-3xl shadow-xl">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-primary-500 rounded-xl flex items-center justify-center text-white mb-6">
                        <Lock size={24} />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">Admin Login</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Secure access to your portfolio management
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Email address</label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="input-field"
                                placeholder="admin@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Password</label>
                            <input
                                {...register('password', { required: true })}
                                type="password"
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="w-full btn-primary py-3">
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
