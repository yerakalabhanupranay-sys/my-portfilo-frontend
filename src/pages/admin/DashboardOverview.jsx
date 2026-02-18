import React from 'react';
import { Link } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';
import { Briefcase, Settings, MessageSquare, User, Eye, Clock } from 'lucide-react';
import AnimatedCounter from '../../components/AnimatedCounter';
import LoadingSkeleton from '../../components/LoadingSkeleton';

const DashboardOverview = ({ projects, services, messages, stats, projectsLoading, servicesLoading, messagesLoading, statsLoading }) => {
    const dashboardStats = [
        {
            label: 'Total Projects',
            value: stats?.projectsCount || projects?.length || 0,
            icon: Briefcase,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-900/10',
            textColor: 'text-blue-600 dark:text-blue-400',
            change: '+12%',
        },
        {
            label: 'Services Offered',
            value: stats?.servicesCount || services?.length || 0,
            icon: Settings,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-900/10',
            textColor: 'text-purple-600 dark:text-purple-400',
            change: '+5%',
        },
        {
            label: 'New Messages',
            value: stats?.messagesCount || messages?.length || 0,
            icon: MessageSquare,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50 dark:bg-green-900/10',
            textColor: 'text-green-600 dark:text-green-400',
            change: '+23%',
        },
        {
            label: 'Total Views',
            value: stats?.totalViews || 0,
            icon: Eye,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-900/10',
            textColor: 'text-orange-600 dark:text-orange-400',
            change: '+8%',
        },
    ];

    const isLoading = projectsLoading || servicesLoading || messagesLoading || statsLoading;

    // Helper to format time
    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now - date;
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMins / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMins < 1) return 'Just now';
        if (diffInMins < 60) return `${diffInMins} minute${diffInMins > 1 ? 's' : ''} ago`;
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    };

    // Icon map for activities
    const activityIcons = {
        MessageSquare,
        Briefcase,
        Settings,
        User,
        Clock
    };

    return (
        <div className="space-y-8">
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-white mb-2">
                    Welcome Back! 👋
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                    Here's what's happening with your portfolio today.
                </p>
            </Motion.div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <LoadingSkeleton type="stat" count={4} />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {dashboardStats.map((stat, index) => (
                        <Motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                            className="glass p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-primary-500/10 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <Motion.div
                                    className={`${stat.bgColor} p-3 rounded-xl`}
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <stat.icon className={stat.textColor} size={24} />
                                </Motion.div>
                                <Motion.span
                                    className="text-sm font-bold text-green-500 bg-green-50 dark:bg-green-900/10 px-2 py-1 rounded-lg"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                >
                                    {stat.change}
                                </Motion.span>
                            </div>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-1">
                                {stat.label}
                            </p>
                            <div className="text-3xl font-black text-slate-800 dark:text-white">
                                <AnimatedCounter value={stat.value} duration={1.5} />
                            </div>
                        </Motion.div>
                    ))}
                </div>
            )}

            {/* Quick Actions remains unchanged */}
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass p-8 rounded-3xl border border-slate-100 dark:border-slate-800"
            >
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Add New Project', path: '/admin/projects', icon: Briefcase, color: 'primary' },
                        { label: 'Manage Services', path: '/admin/services', icon: Settings, color: 'purple' },
                        { label: 'View Messages', path: '/admin/messages', icon: MessageSquare, color: 'green' },
                    ].map((action, index) => (
                        <Motion.div
                            key={action.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link
                                to={action.path}
                                className={`block p-6 rounded-2xl bg-${action.color}-50 dark:bg-${action.color}-900/10 border-2 border-${action.color}-100 dark:border-${action.color}-900/20 hover:border-${action.color}-500 transition-all group`}
                            >
                                <action.icon className={`text-${action.color}-500 mb-3 group-hover:scale-110 transition-transform`} size={28} />
                                <p className="font-black text-slate-800 dark:text-white">{action.label}</p>
                            </Link>
                        </Motion.div>
                    ))}
                </div>
            </Motion.div>

            {/* Recent Activity */}
            <Motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass p-8 rounded-3xl border border-slate-100 dark:border-slate-800"
            >
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {stats?.recentActivities && stats.recentActivities.length > 0 ? (
                        stats.recentActivities.map((activity, index) => {
                            const Icon = activityIcons[activity.icon] || Clock;
                            return (
                                <Motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1 }}
                                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-dark-light transition-colors"
                                >
                                    <div className="w-10 h-10 bg-primary-50 dark:bg-primary-900/10 rounded-xl flex items-center justify-center">
                                        <Icon className="text-primary-500" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-slate-800 dark:text-white">{activity.action}</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                            <Clock size={14} /> {formatTime(activity.created_at)}
                                        </p>
                                    </div>
                                </Motion.div>
                            );
                        })
                    ) : (
                        <p className="text-slate-500 dark:text-slate-400 font-medium py-4 text-center">
                            No recent activity found.
                        </p>
                    )}
                </div>
            </Motion.div>
        </div>
    );
};

export default DashboardOverview;
