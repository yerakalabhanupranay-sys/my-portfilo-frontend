import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { contactService } from '../../services/api';

const ContactManager = () => {
    const { data: messages, isLoading } = useQuery({
        queryKey: ['messages'],
        queryFn: () => contactService.getAll().then(res => res.data),
    });

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Inbound Messages</h2>
            <div className="overflow-hidden glass rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-50 dark:bg-dark-lighter">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Message</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-dark divide-y divide-slate-200 dark:divide-slate-800">
                        {messages?.map((msg) => (
                            <tr key={msg.id} className="hover:bg-slate-50 dark:hover:bg-dark-light transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                    {new Date(msg.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                                    {msg.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-primary-500">
                                    {msg.email}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                                    {msg.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactManager;
