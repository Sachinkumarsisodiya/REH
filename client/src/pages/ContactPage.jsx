import React from 'react';
import Contact from '../components/Contact';
import { MapPin, Phone, Mail, Clock, ShieldAlert, HeartPulse } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Attractive Header Banner */}
      <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-teal-500/20 shadow-xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider border border-teal-400/30 backdrop-blur-md shadow-inner">
            <MapPin className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Hospital Contact &amp; 24x7 Casualty</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
            Connect with <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">Rekha Eye Hospital</span>
          </h1>
          <p className="text-slate-200 text-sm sm:text-base max-w-xl mx-auto font-normal leading-relaxed">
            Conveniently located in Medical Enclave. 24x7 Emergency eye casualty response and daily outpatient consultation clinics.
          </p>
        </div>
      </section>

      {/* Main Contact Component */}
      <div className="py-6">
        <Contact />
      </div>

    </div>
  );
}
