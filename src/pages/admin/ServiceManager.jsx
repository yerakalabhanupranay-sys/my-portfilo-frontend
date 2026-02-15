import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { serviceService } from '../../services/api';
import toast from 'react-hot-toast';
import { Plus, Trash2, Save } from 'lucide-react';

const ServiceManager = () => {
    const queryClient = useQueryClient();
    const [services, setServices] = useState([]);

    const { data: initialServices } = useQuery({
        queryKey: ['services'],
        queryFn: () => serviceService.getAll().then(res => res.data),
        onSuccess: (data) => setServices(data),
    });

    useEffect(() => {
        if (initialServices) setServices(initialServices);
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
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manage Services</h2>
                <div className="flex space-x-3">
                    <button onClick={handleAdd} className="btn-outline flex items-center">
                        <Plus size={18} className="mr-2" /> Add Item
                    </button>
                    <button onClick={handleSave} className="btn-primary flex items-center">
                        <Save size={18} className="mr-2" /> Save Changes
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {services.map((service, index) => (
                    <div key={index} className="glass p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                        <button
                            onClick={() => handleRemove(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg"
                        >
                            <Trash2 size={12} />
                        </button>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Service Name</label>
                            <input
                                value={service.name}
                                onChange={(e) => handleChange(index, 'name', e.target.value)}
                                className="input-field"
                                placeholder="e.g. Web Development"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Price Info</label>
                            <input
                                value={service.price}
                                onChange={(e) => handleChange(index, 'price', e.target.value)}
                                className="input-field"
                                placeholder="e.g. Starting at $500"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Description</label>
                            <textarea
                                value={service.description}
                                onChange={(e) => handleChange(index, 'description', e.target.value)}
                                className="input-field resize-none"
                                rows="2"
                            ></textarea>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceManager;
