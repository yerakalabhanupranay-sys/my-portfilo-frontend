import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService, uploadService } from '../../services/api';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save, Upload } from 'lucide-react';

const ProfileManager = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue, watch } = useForm();
    const [uploading, setUploading] = React.useState(false);
    const imageUrl = watch('image_url');

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
    });

    React.useEffect(() => {
        if (profile) {
            Object.entries(profile).forEach(([key, value]) => setValue(key, value));
        }
    }, [profile, setValue]);

    const mutation = useMutation({
        mutationFn: (data) => profileService.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Profile updated');
        },
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            const { data } = await uploadService.upload(file);
            setValue('image_url', data.url);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Image upload failed');
            console.error(error);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = (data) => {
        console.log('Submitting Data:', data);
        mutation.mutate(data);
    };

    return (
        <div className="max-w-4xl space-y-8 pb-10">
            <div className="flex items-center justify-between bg-white dark:bg-dark-lighter p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Profile Settings</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Update your personal information and social links</p>
                </div>
                <button
                    onClick={handleSubmit(onSubmit)}
                    className="btn-primary flex items-center py-2.5"
                    disabled={mutation.isLoading}
                >
                    <Save size={18} className="mr-2" />
                    {mutation.isLoading ? 'Saving...' : 'Save Profile'}
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Avatar & Core Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="glass p-8 rounded-3xl flex flex-col items-center">
                        <input type="hidden" {...register('image_url')} />
                        <div className="relative w-40 h-40 group">
                            <img
                                src={imageUrl?.startsWith('http') ? imageUrl : `${import.meta.env.VITE_API_URL?.replace('/api', '')}${imageUrl}` || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-full h-full object-cover rounded-3xl border-4 border-white dark:border-slate-800 shadow-xl transition-transform duration-300 group-hover:scale-[1.02]"
                            />
                            <label
                                htmlFor="profile-upload"
                                className={`absolute -bottom-2 -right-2 p-3 bg-primary-500 text-white rounded-2xl shadow-lg cursor-pointer hover:bg-primary-600 transition-all hover:scale-110 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <Upload size={20} />
                            </label>
                            <input
                                id="profile-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                            {uploading && (
                                <div className="absolute inset-0 bg-white/60 dark:bg-dark/60 backdrop-blur-sm rounded-3xl flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
                                </div>
                            )}
                        </div>
                        <h3 className="mt-6 font-bold text-xl text-slate-800 dark:text-white">{watch('name') || 'Your Name'}</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1">{watch('headline') || 'Your Headline'}</p>
                    </div>

                    <div className="glass p-6 rounded-3xl space-y-4">
                        <h4 className="font-bold text-sm uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Contact Info</h4>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email Address</label>
                            <input {...register('email')} className="input-field" placeholder="hello@example.com" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 ml-1">WhatsApp Number</label>
                            <input {...register('whatsapp')} className="input-field" placeholder="+1234567890" />
                        </div>
                    </div>
                </div>

                {/* Right Column - Bio & Socials */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Professional Overview</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                                <input {...register('name')} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Personal Headline</label>
                                <input {...register('headline')} className="input-field" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Profile Biography</label>
                            <textarea {...register('bio')} rows="5" className="input-field py-3" placeholder="Tell the world about yourself..."></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Resume Link (Cloud Storage URL)</label>
                            <input {...register('resume_url')} className="input-field" placeholder="https://drive.google.com/..." />
                        </div>
                    </div>

                    <div className="glass p-8 rounded-3xl space-y-6">
                        <h4 className="font-bold text-lg text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Social Presence</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">GitHub Profile</label>
                                <input {...register('github_url')} className="input-field" placeholder="github.com/username" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">LinkedIn Profile</label>
                                <input {...register('linkedin_url')} className="input-field" placeholder="linkedin.com/in/username" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Twitter / X</label>
                                <input {...register('twitter_url')} className="input-field" placeholder="twitter.com/username" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileManager;
