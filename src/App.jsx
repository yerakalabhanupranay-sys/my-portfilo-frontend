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
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<><Navbar /><main className="flex-grow"><Home /></main><Footer /></>} />
            <Route path="/about" element={<><Navbar /><main className="flex-grow"><About /></main><Footer /></>} />
            <Route path="/projects" element={<><Navbar /><main className="flex-grow"><Projects /></main><Footer /></>} />
            <Route path="/services" element={<><Navbar /><main className="flex-grow"><Services /></main><Footer /></>} />
            <Route path="/contact" element={<><Navbar /><main className="flex-grow"><Contact /></main><Footer /></>} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/*" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
