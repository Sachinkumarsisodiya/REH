import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUp, Clock, MessageSquare, ShieldAlert } from 'lucide-react';

export default function Footer({ onBookClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Subtle Background Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" className="h-9 w-auto">
                <defs>
                  <linearGradient id="footer-eye-teal" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38BDF8"/>
                    <stop offset="50%" stopColor="#06B6D4"/>
                    <stop offset="100%" stopColor="#0D9488"/>
                  </linearGradient>
                </defs>
                <g transform="translate(5, 5)">
                  <path d="M 0 0 V 70 M 0 0 H 28 C 45 0, 48 16, 48 26 C 48 36, 40 42, 28 42 H 0 M 28 42 L 48 70" 
                        fill="none" stroke="#0D9488" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/>
                  <g transform="translate(52, 0)">
                    <path d="M 8 0 V 70 M 8 0 H 42 M 8 70 H 42" fill="none" stroke="#06B6D4" strokeWidth="9" strokeLinecap="round"/>
                    <circle cx="28" cy="35" r="15" fill="none" stroke="url(#footer-eye-teal)" strokeWidth="6"/>
                    <circle cx="28" cy="35" r="6" fill="#38BDF8"/>
                    <circle cx="30" cy="33" r="1.5" fill="#FFFFFF"/>
                  </g>
                  <g transform="translate(104, 0)">
                    <path d="M 8 0 V 70 M 42 0 V 70 M 8 35 H 42" 
                          fill="none" stroke="#FFFFFF" strokeWidth="9" strokeLinecap="round"/>
                  </g>
                </g>
              </svg>

              <div className="flex flex-col">
                <span className="font-black text-xl text-white font-heading tracking-tight">
                  REKHA <span className="text-teal-400">EYE</span> HOSPITAL
                </span>
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-widest">
                  Super-Specialty LASIK &amp; Retina Institute
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm font-normal">
              NABH-Accredited Eye Hospital &amp; Laser Center led by Founder Dr. Rekha Sisodiya. Delivering 6/6 precision vision restoration with German Carl Zeiss &amp; Alcon WaveLight refractive robotics since 1999.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-300">
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>NABH Accredited</span>
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>ISO 9001:2015</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">Hospital Pages</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/about" className="hover:text-teal-400 transition-colors">About REH Heritage</Link></li>
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Clinical Treatments</Link></li>
              <li><Link to="/doctors" className="hover:text-teal-400 transition-colors">Surgeon Directory</Link></li>
              <li><Link to="/technology" className="hover:text-teal-400 transition-colors">Carl Zeiss Laser Tech</Link></li>
              <li><Link to="/patient-guide" className="hover:text-teal-400 transition-colors">Cashless TPA &amp; Insurance</Link></li>
              <li><Link to="/eye-health" className="hover:text-teal-400 transition-colors">Eye Health Knowledge Hub</Link></li>
            </ul>
          </div>

          {/* Eye Treatments */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">Laser &amp; Surgery</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Blade-Free Femto LASIK</Link></li>
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Custom Contoura Vision</Link></li>
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Micro-Incision Cataract (MICS)</Link></li>
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Diabetic Vitreo-Retinopathy</Link></li>
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Selective Laser Trabeculoplasty</Link></li>
              <li><Link to="/treatments" className="hover:text-teal-400 transition-colors">Pediatric Squint &amp; Lazy Eye</Link></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading">24x7 Help Desk</h4>
            <div className="space-y-2.5 text-xs">
              <a href="tel:+917733866682" className="flex items-center space-x-2 text-rose-400 font-bold hover:text-rose-300 transition-colors">
                <Phone className="w-4 h-4 animate-pulse shrink-0" />
                <span>24/7 Helpline: +91 7733866682</span>
              </a>

              <a href="https://wa.me/917733866682" target="_blank" rel="noreferrer" className="flex items-center space-x-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span>WhatsApp: +91 7733866682</span>
              </a>

              <p className="text-slate-400 text-[11px]">OPD Hours: Mon - Sat (8:30 AM - 7:30 PM)</p>
              <p className="text-slate-400 text-[11px]">Sunday: Emergency OPD (9:00 AM - 1:00 PM)</p>
              
              <div className="pt-2">
                <Link
                  to="/book-appointment"
                  className="block text-center w-full py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all"
                >
                  Book Doctor Consultation
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Discrete Staff Portal Link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div>
            &copy; {new Date().getFullYear()} Rekha Eye Hospital (REH). All rights reserved. Medical Class Standards.
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-slate-600 hover:text-teal-400 transition-colors font-medium">
              Hospital Staff Portal
            </Link>
            <span>&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
