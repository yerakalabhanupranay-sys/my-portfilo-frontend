import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService, uploadService } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit2, X } from 'lucide-react';

const ProjectManager = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);

    const { data: projects } = useQuery({
        queryKey: ['projects'],
        queryFn: () => projectService.getAll().then(res => res.data),
    });

    const upsertMutation = useMutation({
        mutationFn: (data) => (editingProject && editingProject.id)
            ? projectService.update(editingProject.id, data)
            : projectService.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success(editingProject ? 'Project updated' : 'Project created');
            handleClose();
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => projectService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['projects']);
            toast.success('Project deleted');
        },
    });

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadLoading(true);
        try {
            const { data } = await uploadService.upload(file);
            setEditingProject({ ...editingProject, image_url: data.url });
            toast.success('Image uploaded');
        } catch {
            toast.error('Upload failed');
        } finally {
            setUploadLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            title: formData.get('title'),
            description: formData.get('description'),
            live_url: formData.get('live_url'),
            tech_stack: formData.get('tech_stack').split(',').map(s => s.trim()),
            image_url: editingProject?.image_url || '',
        };
        upsertMutation.mutate(data);
    };

    const handleClose = () => {
        setIsModalOpen(false);
        setEditingProject(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-dark-lighter p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Manage Projects</h2>
                <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="btn-primary flex items-center">
                    <Plus size={18} className="mr-2" /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects?.map((project) => (
                    <div key={project.id} className="glass p-5 rounded-2xl flex items-center justify-between hover:border-primary-500/30 transition-all duration-300">
                        <div className="flex items-center space-x-5">
                            <div className="relative group">
                                <img src={project.image_url} className="w-20 h-20 object-cover rounded-xl shadow-md" alt="" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{project.title}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{project.tech_stack.join(', ')}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => { setEditingProject(project); setIsModalOpen(true); }}
                                className="p-2.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 rounded-xl transition-colors"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(project.id); }}
                                className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white dark:bg-dark-lighter w-full max-w-lg p-8 rounded-3xl relative shadow-2xl border border-white/20 dark:border-slate-800 my-8">
                        <button onClick={handleClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white flex items-center">
                            {editingProject?.id ? <Edit2 className="mr-3 text-primary-500" /> : <Plus className="mr-3 text-primary-500" />}
                            {editingProject?.id ? 'Edit Project' : 'New Project'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Project Title</label>
                                <input name="title" defaultValue={editingProject?.title} className="input-field" placeholder="e.g. Portfolio Website" required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Description</label>
                                <textarea name="description" defaultValue={editingProject?.description} rows="3" className="input-field py-3" placeholder="Describe your project..." required />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Tech Stack (comma separated)</label>
                                <input name="tech_stack" defaultValue={editingProject?.tech_stack?.join(', ')} className="input-field" placeholder="React, Node.js, Tailwind" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">Live URL</label>
                                <input name="live_url" defaultValue={editingProject?.live_url} className="input-field" placeholder="https://..." />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                                    Project Image {uploadLoading && <span className="text-primary-500 text-xs ml-2 animate-pulse">(Uploading...)</span>}
                                </label>
                                <div className="mt-1 flex items-center space-x-4">
                                    <div className="relative group flex-shrink-0">
                                        <img
                                            src={editingProject?.image_url || "https://via.placeholder.com/150"}
                                            className="w-24 h-16 object-cover rounded-xl border-2 border-slate-100 dark:border-slate-800"
                                            alt="Preview"
                                        />
                                        <input
                                            type="file"
                                            onChange={handleFileUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                                            <Plus size={20} className="text-white" />
                                        </div>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Click image to upload new preview. Recommended: 800x600px</p>
                                </div>
                            </div>
                            <button type="submit" className="w-full btn-primary py-3.5 mt-2 flex items-center justify-center" disabled={upsertMutation.isLoading}>
                                {upsertMutation.isLoading ? 'Processing...' : (editingProject?.id ? 'Update Project' : 'Create Project')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;
