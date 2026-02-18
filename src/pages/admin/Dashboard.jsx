import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Briefcase, Settings, MessageSquare, User, LogOut, Sun, Moon, Menu } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { projectService, serviceService, contactService, statsService } from '../../services/api';
import ProjectManager from './ProjectManager';
import ServiceManager from './ServiceManager';
import ContactManager from './ContactManager';
import ProfileManager from './ProfileManager';
import DashboardOverview from './DashboardOverview';
import useTheme from '../../hooks/useTheme';

const menuItems = [
    { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
    { name: 'Projects', icon: Briefcase, path: '/admin/projects' },
    { name: 'Services', icon: Settings, path: '/admin/services' },
    { name: 'Messages', icon: MessageSquare, path: '/admin/messages' },
    { name: 'Profile', icon: User, path: '/admin/profile' },
];

const NavContent = ({ location, setIsMobileMenuOpen, theme, toggleTheme, handleLogout }) => (
    <>
        <div className="p-8">
            <Motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-3 mb-8"
            >
                <Motion.div
                    className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <User size={20} />
                </Motion.div>
                <div>
                    <h2 className="text-xl font-bold font-outfit text-slate-800 dark:text-white">Admin Panel</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Manage Portfolio</p>
                </div>
            </Motion.div>
        </div>

        <nav className="flex-grow px-4 space-y-2">
            {menuItems.map((item, index) => (
                <Motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center space-x-3 p-3.5 rounded-xl transition-all duration-200 ${location.pathname === item.path
                            ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20 translate-x-2'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-light hover:pl-5'
                            }`}
                    >
                        <item.icon size={20} />
                        <span className="font-medium">{item.name}</span>
                    </Link>
                </Motion.div>
            ))}
        </nav>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <Motion.button
                onClick={toggleTheme}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 p-3.5 w-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-light rounded-xl transition-colors"
            >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </Motion.button>

            <Motion.button
                onClick={handleLogout}
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-3 p-3.5 w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </Motion.button>
        </div>
    </>
);

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: () => statsService.getDashboardStats().then(res => res.data),
        refetchInterval: 30000
    });

    // Fetch data for stats
    const { data: projects, isLoading: projectsLoading } = useQuery({ queryKey: ['projects'], queryFn: () => projectService.getAll().then(res => res.data) });
    const { data: services, isLoading: servicesLoading } = useQuery({ queryKey: ['services'], queryFn: () => serviceService.getAll().then(res => res.data) });
    const { data: messages, isLoading: messagesLoading } = useQuery({ queryKey: ['messages'], queryFn: () => contactService.getAll().then(res => res.data) });

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-dark overflow-hidden">
            {/* Desktop Sidebar */}
            <Motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="hidden lg:flex lg:flex-col w-72 glass border-r border-slate-200 dark:border-slate-800"
            >
                <NavContent location={location} setIsMobileMenuOpen={setIsMobileMenuOpen} theme={theme} toggleTheme={toggleTheme} handleLogout={handleLogout} />
            </Motion.aside>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <Motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                        />
                        <Motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="lg:hidden fixed left-0 top-0 bottom-0 w-72 glass border-r border-slate-200 dark:border-slate-800 z-50 flex flex-col"
                        >
                            <NavContent location={location} setIsMobileMenuOpen={setIsMobileMenuOpen} theme={theme} toggleTheme={toggleTheme} handleLogout={handleLogout} />
                        </Motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <Motion.header
                    initial={{ y: -100 }}
                    animate={{ y: 0 }}
                    className="lg:hidden glass border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between"
                >
                    <h1 className="text-xl font-black gradient-text">Admin Panel</h1>
                    <Motion.button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-xl bg-slate-100 dark:bg-dark-light"
                    >
                        <Menu size={24} />
                    </Motion.button>
                </Motion.header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 md:p-10">
                    <Routes>
                        <Route path="/dashboard" element={
                            <DashboardOverview
                                projects={projects}
                                services={services}
                                messages={messages}
                                stats={stats}
                                projectsLoading={projectsLoading}
                                servicesLoading={servicesLoading}
                                messagesLoading={messagesLoading}
                                statsLoading={statsLoading}
                            />
                        } />
                        <Route path="/projects" element={<ProjectManager />} />
                        <Route path="/services" element={<ServiceManager />} />
                        <Route path="/messages" element={<ContactManager />} />
                        <Route path="/profile" element={<ProfileManager />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
