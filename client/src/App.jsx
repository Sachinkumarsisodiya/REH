import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Layout & Global Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound';

// Multi-Page Views
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import TreatmentsPage from './pages/TreatmentsPage';
import DoctorsPage from './pages/DoctorsPage';
import TechnologyPage from './pages/TechnologyPage';
import BookingPage from './pages/BookingPage';
import PatientGuidePage from './pages/PatientGuidePage';
import BlogPage from './pages/BlogPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';

// Admin Components
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

function AdminRoute() {
  const [token, setToken] = useState(() => localStorage.getItem('reh_admin_token'));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('reh_admin_user');
    return u ? JSON.parse(u) : null;
  });

  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
  };

  const handleLogout = () => {
    localStorage.removeItem('reh_admin_token');
    localStorage.removeItem('reh_admin_user');
    setToken(null);
    setUser(null);
  };

  if (!token) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <AdminDashboard
      token={token}
      user={user}
      onLogout={handleLogout}
    />
  );
}

export default function App() {
  useEffect(() => {
    // Ensure clean light theme
    document.documentElement.classList.remove('dark');
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        {/* Public Multi-Page Routes */}
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/treatments" element={<MainLayout><TreatmentsPage /></MainLayout>} />
        <Route path="/doctors" element={<MainLayout><DoctorsPage /></MainLayout>} />
        <Route path="/technology" element={<MainLayout><TechnologyPage /></MainLayout>} />
        <Route path="/book-appointment" element={<MainLayout><BookingPage /></MainLayout>} />
        <Route path="/patient-guide" element={<MainLayout><PatientGuidePage /></MainLayout>} />
        <Route path="/eye-health" element={<MainLayout><BlogPage /></MainLayout>} />
        <Route path="/gallery" element={<MainLayout><GalleryPage /></MainLayout>} />
        <Route path="/contact" element={<MainLayout><ContactPage /></MainLayout>} />

        {/* Hospital Staff Portal */}
        <Route path="/admin" element={<AdminRoute />} />

        {/* 404 Fallback */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
