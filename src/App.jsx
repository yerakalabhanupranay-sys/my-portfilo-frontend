import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PublicLayout from './components/PublicLayout';
import ProtectedRoute from './components/ProtectedRoute';

import { statsService } from './services/api';

const queryClient = new QueryClient();

function App() {
  React.useEffect(() => {
    const incrementViews = async () => {
      try {
        const hasIncremented = sessionStorage.getItem('hasIncrementedViews');
        if (!hasIncremented) {
          await statsService.incrementViews();
          sessionStorage.setItem('hasIncrementedViews', 'true');
        }
      } catch (err) {
        console.error('Failed to increment views:', err);
      }
    };
    incrementViews();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes - Wrapped in PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/*" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />

          {/* 404 Catch All */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="bottom-right" />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
