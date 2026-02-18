import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceService } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Trash2, Save, Settings } from 'lucide-react';

const ServiceManager = () => {
    const queryClient = useQueryClient();
    const [services, setServices] = useState([]);

    const { data: initialServices } = useQuery({
        queryKey: ['services'],
        queryFn: () => serviceService.getAll().then(res => res.data)
    });

    useEffect(() => {
        if (initialServices) {
            // eslint-disable-next-line
            setServices(initialServices);
        }
    }, [initialServices]);

    const updateMutation = useMutation({
        mutationFn: (data) => serviceService.update(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['services']);
            toast.success('Services updated');
        },
    });

    const handleAdd = () => {
        setServices([...services, { name: '', price: '', description: '' }]);
    };

    const handleRemove = (index) => {
        const newServices = services.filter((_, i) => i !== index);
        setServices(newServices);
    };

    const handleChange = (index, field, value) => {
        const newServices = [...services];
        newServices[index][field] = value;
        setServices(newServices);
    };

    const handleSave = () => {
        updateMutation.mutate(services);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white dark:bg-dark-lighter p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Skills & Services</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage what you offer to clients</p>
                </div>
                <div className="flex space-x-3 w-full md:w-auto">
                    <button onClick={handleAdd} className="btn-outline flex-1 md:flex-none flex items-center justify-center py-2.5">
                        <Plus size={18} className="mr-2" /> Add Item
                    </button>
                    <button onClick={handleSave} className="btn-primary flex-1 md:flex-none flex items-center justify-center py-2.5">
                        <Save size={18} className="mr-2" /> Sync All
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {services.map((service, index) => (
                    <div key={index} className="glass p-8 rounded-3xl relative group border border-transparent hover:border-primary-500/20 transition-all duration-300">
                        <button
                            onClick={() => handleRemove(index)}
                            className="absolute top-4 right-4 p-2 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                            title="Remove item"
                        >
                            <Trash2 size={16} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 ml-1">Service / Skill Name</label>
                                    <input
                                        value={service.name}
                                        onChange={(e) => handleChange(index, 'name', e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. Web Development"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 ml-1">Pricing Info</label>
                                    <input
                                        value={service.price}
                                        onChange={(e) => handleChange(index, 'price', e.target.value)}
                                        className="input-field"
                                        placeholder="e.g. Starting at $500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1.5 ml-1">Detailed Description</label>
                                <textarea
                                    value={service.description}
                                    onChange={(e) => handleChange(index, 'description', e.target.value)}
                                    className="input-field resize-none py-3"
                                    rows="4"
                                    placeholder="Tell clients more about this service..."
                                ></textarea>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {services.length === 0 && (
                <div className="text-center py-20 glass rounded-3xl border-dashed border-2 border-slate-200 dark:border-slate-800">
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-dark-light rounded-full flex items-center justify-center text-slate-400 dark:text-slate-600 mb-4">
                        <Settings size={32} />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">No services added yet. Click "Add Item" to start.</p>
                </div>
            )}
        </div>
    );
};

export default ServiceManager;
