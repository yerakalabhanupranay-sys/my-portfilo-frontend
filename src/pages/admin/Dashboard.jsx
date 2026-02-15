import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Settings, MessageSquare, User, LogOut } from 'lucide-react';
import ProjectManager from './ProjectManager';
import ServiceManager from './ServiceManager';
import ContactManager from './ContactManager';
import ProfileManager from './ProfileManager';

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Projects', icon: Briefcase, path: '/admin/projects' },
        { name: 'Services', icon: Settings, path: '/admin/services' },
        { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
        { name: 'Profile', icon: User, path: '/admin/profile' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-dark overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 glass border-r border-slate-200 dark:border-slate-800 hidden md:flex flex-col">
                <div className="p-6">
                    <h2 className="text-xl font-bold font-outfit gradient-text">Admin Panel</h2>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${location.pathname === item.path
                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-light'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 p-3 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow overflow-y-auto p-4 md:p-8">
                <Routes>
                    <Route path="dashboard" element={<div className="text-2xl font-bold">Welcome Back, Admin!</div>} />
                    <Route path="projects" element={<ProjectManager />} />
                    <Route path="services" element={<ServiceManager />} />
                    <Route path="messages" element={<ContactManager />} />
                    <Route path="profile" element={<ProfileManager />} />
                </Routes>
            </main>
        </div>
    );
};

export default Dashboard;
