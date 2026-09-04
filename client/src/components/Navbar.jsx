import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, Calendar, ChevronRight, Sparkles, HeartPulse, Clock } from 'lucide-react';
import EmergencyModal from './EmergencyModal';

export default function Navbar({ onBookClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About REH', path: '/about' },
    { name: 'Treatments', path: '/treatments' },
    { name: 'Specialists', path: '/doctors' },
    { name: 'Technology', path: '/technology' },
    { name: 'Patient Guide', path: '/patient-guide' },
    { name: 'Eye Health', path: '/eye-health' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleBookAppointmentClick = () => {
    if (onBookClick && location.pathname === '/') {
      onBookClick();
    } else {
      navigate('/book-appointment');
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl py-2.5 border-b border-slate-200/90 shadow-lg shadow-slate-900/5'
            : 'bg-white/90 backdrop-blur-md py-3.5 border-b border-slate-100/80 shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Standalone Borderless REH Eye Monogram Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center space-x-1 group-hover:scale-105 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" className="h-10 w-auto">
                  <defs>
                    <linearGradient id="nav-eye-teal-clean" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#0EA5E9"/>
                      <stop offset="50%" stopColor="#06B6D4"/>
                      <stop offset="100%" stopColor="#0D9488"/>
                    </linearGradient>
                  </defs>
                  <g transform="translate(5, 5)">
                    {/* Letter R */}
                    <path d="M 0 0 V 70 M 0 0 H 28 C 45 0, 48 16, 48 26 C 48 36, 40 42, 28 42 H 0 M 28 42 L 48 70" 
                          fill="none" stroke="#0D9488" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>

                    {/* Letter E with Integrated Eye Motif */}
                    <g transform="translate(52, 0)">
                      <path d="M 8 0 V 70 M 8 0 H 42 M 8 70 H 42" fill="none" stroke="#06B6D4" strokeWidth="9" strokeLinecap="round"/>
                      <circle cx="28" cy="35" r="15" fill="none" stroke="url(#nav-eye-teal-clean)" strokeWidth="6"/>
                      <circle cx="28" cy="35" r="6" fill="#0EA5E9"/>
                      <circle cx="30" cy="33" r="1.5" fill="#FFFFFF"/>
                    </g>

                    {/* Letter H */}
                    <g transform="translate(104, 0)">
                      <path d="M 8 0 V 70 M 42 0 V 70 M 8 35 H 42" 
                            fill="none" stroke="#0F172A" strokeWidth="9" strokeLinecap="round"/>
                    </g>
                  </g>
                </svg>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-950 font-heading">
                    REKHA <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">EYE</span>
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    NABH
                  </span>
                </div>
                <span className="text-[9px] font-extrabold text-slate-500 tracking-wider uppercase">
                  Super-Specialty Hospital &amp; LASIK Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/80 shadow-inner">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-3.5 py-1.5 text-xs font-bold transition-all rounded-full ${
                      isActive
                        ? 'bg-white text-teal-700 shadow-sm'
                        : 'text-slate-700 hover:text-teal-700 hover:bg-white/60'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Header Controls (Clean Patient Focused) */}
            <div className="hidden md:flex items-center space-x-3">
              
              {/* Emergency Hotline Action Button (Active Modal Trigger) */}
              <button
                type="button"
                onClick={() => setEmergencyOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/90 transition-all shadow-sm hover:shadow-rose-500/20 transform hover:scale-105 active:scale-95"
                title="Open 24x7 Emergency Eye Care Assistance"
              >
                <Phone className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
                <span>24x7 Emergency</span>
              </button>

              {/* Book Appointment CTA */}
              <button
                type="button"
                onClick={handleBookAppointmentClick}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs shadow-lg shadow-teal-600/30 transition-all transform hover:scale-105 active:scale-95 border border-teal-400/30"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>

            </div>

            {/* Mobile Controls */}
            <div className="flex items-center space-x-2 lg:hidden">
              <button
                type="button"
                onClick={() => setEmergencyOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 text-xs font-black flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                <span>SOS</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2 animate-fadeIn">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-bold ${
                    isActive ? 'bg-teal-50 text-teal-700' : 'text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleBookAppointmentClick();
                }}
                className="w-full py-3 rounded-2xl bg-teal-600 text-white font-black text-sm flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}

      </header>

      {/* Emergency Eye Casualty Modal */}
      <EmergencyModal isOpen={emergencyOpen} onClose={() => setEmergencyOpen(false)} />
    </>
  );
}
