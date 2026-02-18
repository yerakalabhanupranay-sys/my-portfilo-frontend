import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contactService } from '../../services/api';
import { Trash2, MessageSquare, Phone } from 'lucide-react';
import toast from 'react-hot-toast';

const ContactManager = () => {
    const queryClient = useQueryClient();

    const { data: messages } = useQuery({
        queryKey: ['messages'],
        queryFn: () => contactService.getAll().then(res => res.data),
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => contactService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['messages'] });
            toast.success('Message deleted from inbox');
        },
        onError: () => {
            toast.error('Failed to delete message');
        }
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this message?')) {
            deleteMutation.mutate(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Inbound Messages</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">View what users are saying to you</p>
            </div>

            <div className="overflow-hidden glass rounded-3xl border border-slate-200 dark:border-slate-800 shadow-inner">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-100 dark:divide-slate-800/50">
                        <thead className="bg-slate-50/50 dark:bg-dark-light/30">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sender Info</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Phone</th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Message Content</th>
                                <th className="px-6 py-4 text-right text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {messages?.map((msg) => (
                                <tr key={msg.id} className="hover:bg-slate-50/80 dark:hover:bg-dark-light/20 transition-colors group">
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 font-medium">
                                        {new Date(msg.created_at).toLocaleDateString(undefined, {
                                            month: 'short',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{msg.name}</span>
                                            <span className="text-xs text-primary-500 dark:text-primary-400 mt-0.5">{msg.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        {msg.phone ? (
                                            <span className="text-xs font-bold text-emerald-500 dark:text-emerald-400 flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1.5 rounded-lg w-fit whitespace-nowrap">
                                                <Phone size={14} /> {msg.phone}
                                            </span>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">Not provided</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-5">
                                        <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md line-clamp-2 leading-relaxed">
                                            {msg.message}
                                        </p>
                                    </td>
                                    <td className="px-6 py-5 text-right">
                                        <button
                                            onClick={() => handleDelete(msg.id)}
                                            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all"
                                            title="Delete Message"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {(!messages || messages.length === 0) && (
                    <div className="text-center py-20">
                        <MessageSquare size={48} className="mx-auto text-slate-200 dark:text-slate-800 mb-4" />
                        <p className="text-slate-400 dark:text-slate-600 font-medium">No messages in your inbox yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactManager;
