import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileService } from '../../services/api';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Save } from 'lucide-react';

const ProfileManager = () => {
    const queryClient = useQueryClient();
    const { register, handleSubmit, setValue } = useForm();

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: () => profileService.get().then(res => res.data),
        onSuccess: (data) => {
            Object.entries(data).forEach(([key, value]) => setValue(key, value));
        }
    });

    const mutation = useMutation({
        mutationFn: (data) => profileService.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['profile']);
            toast.success('Profile updated');
        },
    });

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className="max-w-2xl space-y-6">
            <h2 className="text-2xl font-bold">Profile Settings</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="glass p-8 rounded-3xl space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <input {...register('name')} className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Headline</label>
                        <input {...register('headline')} className="input-field" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Bio</label>
                    <textarea {...register('bio')} rows="4" className="input-field"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Contact Email</label>
                        <input {...register('email')} className="input-field" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">WhatsApp Number</label>
                        <input {...register('whatsapp')} className="input-field" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Resume Link (URL)</label>
                    <input {...register('resume_url')} className="input-field" placeholder="https://..." />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">GitHub URL</label>
                        <input {...register('github_url')} className="input-field" placeholder="https://github.com/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">LinkedIn URL</label>
                        <input {...register('linkedin_url')} className="input-field" placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Twitter URL</label>
                        <input {...register('twitter_url')} className="input-field" placeholder="https://twitter.com/..." />
                    </div>
                </div>
                <button type="submit" className="w-full btn-primary py-3 flex items-center justify-center">
                    <Save size={18} className="mr-2" /> Save Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileManager;
