import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, ShieldCheck, ArrowUp, MapPin, Clock, Calendar, Sparkles } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer({ onBookClick }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-10 pb-6 border-t border-slate-800/80 relative overflow-hidden font-sans">
      
      {/* Ambient Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-gradient-to-r from-transparent via-teal-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid: Mobile Organized Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
          
          {/* Column 1: Brand & Hospital Information (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" className="h-8 w-auto">
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
                <span className="font-black text-lg text-white font-heading tracking-tight leading-tight">
                  REKHA <span className="text-teal-400">EYE</span> HOSPITAL
                </span>
                <span className="text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Super-Specialty LASIK &amp; Retina Center
                </span>
              </div>
            </Link>

            <p className="text-xs leading-relaxed text-slate-400 font-normal">
              NABH-accredited super-specialty eye hospital delivering 6/6 precision laser vision restoration with Carl Zeiss robotics.
            </p>

            {/* Hospital Physical Address Box */}
            <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800/80 space-y-2">
              <div className="flex items-start space-x-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <p className="leading-snug">
                  REH Medical Tower, Oppo. 52 Feet Hanuman ji, Agra Road, Jaipur - 303012
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 text-[11px] font-semibold text-slate-300">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                  <ShieldCheck className="w-3 h-3 text-teal-400" />
                  <span>NABH Accredited</span>
                </span>
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>ISO 9001:2015</span>
                </span>
              </div>
            </div>
          </div>

          {/* Column 2 & 3: Links Grid (2 columns on mobile/tablet for structured appearance, 5 cols on lg) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 sm:gap-8">
            
            {/* Sub-Col A: Hospital Pages */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                <span>Hospital Pages</span>
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><Link to="/about" className="hover:text-teal-400 transition-colors block py-0.5">About REH Heritage</Link></li>
                <li><Link to="/treatments" className="hover:text-teal-400 transition-colors block py-0.5">Treatments &amp; Surgeries</Link></li>
                <li><Link to="/doctors" className="hover:text-teal-400 transition-colors block py-0.5">Specialist Directory</Link></li>
                <li><Link to="/technology" className="hover:text-teal-400 transition-colors block py-0.5">Zeiss Laser Suite</Link></li>
                <li><Link to="/patient-guide" className="hover:text-teal-400 transition-colors block py-0.5">Cashless TPA &amp; Insurance</Link></li>
                <li><Link to="/gallery" className="hover:text-teal-400 transition-colors block py-0.5">Hospital Tour &amp; OT</Link></li>
                <li><Link to="/contact" className="hover:text-teal-400 transition-colors block py-0.5">Contact &amp; Location</Link></li>
              </ul>
            </div>

            {/* Sub-Col B: Laser & Clinical Tools */}
            <div className="space-y-3">
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>Laser &amp; Tools</span>
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li><Link to="/treatments?tab=lasik" className="hover:text-teal-400 transition-colors block py-0.5">Blade-Free Femto LASIK</Link></li>
                <li><Link to="/treatments?tab=cataract" className="hover:text-teal-400 transition-colors block py-0.5">Micro-Incision Cataract</Link></li>
                <li><Link to="/treatments?tab=retina" className="hover:text-teal-400 transition-colors block py-0.5">Diabetic Retina Care</Link></li>
                <li><Link to="/treatments?tab=dryeye" className="hover:text-teal-400 transition-colors block py-0.5">Dry Eye LipiFlow Spa</Link></li>
                <li><Link to="/eye-health?tab=tools" className="hover:text-teal-400 transition-colors block py-0.5">20-20-20 Eye Strain Timer</Link></li>
                <li><Link to="/eye-health?tab=emergency" className="hover:text-rose-400 transition-colors block py-0.5 font-semibold text-rose-300">Ocular First-Aid</Link></li>
                <li><Link to="/book-appointment" className="hover:text-teal-300 font-bold text-teal-400 transition-colors block py-0.5">Live Booking Wizard &rarr;</Link></li>
              </ul>
            </div>

          </div>

          {/* Column 4: 24x7 Help Desk Card (3 cols on lg) */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900/90 rounded-2xl p-4 border border-slate-800 space-y-3.5 shadow-lg">
              <h4 className="text-xs font-black text-white uppercase tracking-wider font-heading flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  <span>24x7 Help Desk</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/60">
                  Emergency Open
                </span>
              </h4>

              <div className="space-y-2.5 text-xs">
                <a href="tel:+917733866682" className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-rose-400 font-bold hover:bg-slate-800 transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-500 font-medium">Casualty Helpline</div>
                    <span>+91 7733866682</span>
                  </div>
                </a>

                <a href="https://wa.me/917733866682" target="_blank" rel="noreferrer" className="flex items-center space-x-2.5 p-2 rounded-xl bg-slate-950 border border-slate-800/80 text-[#25D366] font-semibold hover:bg-slate-800 transition-colors">
                  <WhatsAppIcon className="w-4 h-4 shrink-0 fill-current" />
                  <div className="text-left">
                    <div className="text-[10px] text-slate-500 font-medium">WhatsApp Assistance</div>
                    <span>+91 7733866682</span>
                  </div>
                </a>

                <div className="text-[11px] text-slate-400 pt-1 space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>OPD: Mon - Sat (8:30 AM - 7:30 PM)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Casualty &amp; OT: 24 Hours Open</span>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link
                    to="/book-appointment"
                    className="block text-center w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all transform hover:scale-[1.02] active:scale-95"
                  >
                    Book Doctor Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3 text-center sm:text-left">
          <div>
            &copy; {new Date().getFullYear()} Rekha Eye Hospital (REH). All rights reserved. NABH Certified.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link to="/admin" className="text-slate-400 hover:text-teal-400 transition-colors font-medium">
              Hospital Staff Portal
            </Link>
            <span className="text-slate-700">&bull;</span>
            <Link to="/patient-guide" className="text-slate-400 hover:text-teal-400 transition-colors">
              Patient Rights
            </Link>
            <span className="text-slate-700">&bull;</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-slate-400 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

