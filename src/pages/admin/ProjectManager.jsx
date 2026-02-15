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

    const { data: projects, isLoading } = useQuery({
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
        } catch (err) {
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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Projects</h2>
                <button onClick={() => { setEditingProject(null); setIsModalOpen(true); }} className="btn-primary flex items-center">
                    <Plus size={18} className="mr-2" /> Add Project
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {projects?.map((project) => (
                    <div key={project.id} className="glass p-4 rounded-xl flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <img src={project.image_url} className="w-16 h-16 object-cover rounded-lg" alt="" />
                            <div>
                                <h3 className="font-bold">{project.title}</h3>
                                <p className="text-sm text-slate-500">{project.tech_stack.join(', ')}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => { setEditingProject(project); setIsModalOpen(true); }}
                                className="p-2 text-blue-500 hover:bg-blue-50 rounded"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(project.id); }}
                                className="p-2 text-red-500 hover:bg-red-50 rounded"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 overflow-y-auto">
                    <div className="glass w-full max-w-lg p-8 rounded-3xl relative my-8">
                        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                        <h3 className="text-2xl font-bold mb-6">{editingProject?.id ? 'Edit Project' : 'New Project'}</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input name="title" defaultValue={editingProject?.title} className="input-field" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea name="description" defaultValue={editingProject?.description} rows="3" className="input-field" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                                <input name="tech_stack" defaultValue={editingProject?.tech_stack?.join(', ')} className="input-field" placeholder="React, Node, etc." />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Live URL</label>
                                <input name="live_url" defaultValue={editingProject?.live_url} className="input-field" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Image {uploadLoading && '(Uploading...)'}</label>
                                <input type="file" onChange={handleFileUpload} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                                {editingProject?.image_url && <img src={editingProject.image_url} className="mt-2 w-32 h-20 object-cover rounded-lg" />}
                            </div>
                            <button type="submit" className="w-full btn-primary py-3" disabled={upsertMutation.isLoading}>
                                {editingProject?.id ? 'Update Project' : 'Create Project'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManager;
