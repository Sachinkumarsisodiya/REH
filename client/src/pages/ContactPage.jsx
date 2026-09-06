import React from 'react';
import Contact from '../components/Contact';
import { MapPin, Phone, Mail, Clock, ShieldAlert, HeartPulse } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Professional Medical Header Banner */}
      <section className="bg-gradient-to-r from-teal-50/80 via-white to-slate-50 border-b border-slate-200/90 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-2.5">
                <span className="w-8 h-1 bg-teal-600 rounded-full"></span>
                <span className="text-teal-800 font-extrabold uppercase tracking-wider text-xs sm:text-sm">
                  Hospital Contact &amp; 24x7 Casualty
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Connect with <span className="text-teal-700">Rekha Eye Hospital</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Conveniently located with dedicated 24x7 emergency eye casualty, round-the-clock ambulance response, and daily super-specialty outpatient clinics.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="tel:+918000968676"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all animate-pulse"
                >
                  <HeartPulse className="w-4 h-4" />
                  <span>24x7 Emergency: +91 80009 68676</span>
                </a>
                <a
                  href="#contact-form"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all"
                >
                  <MapPin className="w-4 h-4 text-teal-600" />
                  <span>Get Driving Directions</span>
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 max-w-lg">
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-slate-900">24x7</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Trauma Casualty</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-teal-700">&lt;15 Mins</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Triage Response</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-slate-900">Valet</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Free Patient Parking</div>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="/images/banners/banner_contact.jpg"
                  alt="24x7 Emergency Desk & Hospital Reception"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 flex items-center justify-between text-xs shadow-md">
                  <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                    <span>24x7 Rapid Ocular Trauma Wing</span>
                  </span>
                  <span className="text-teal-700 font-black text-[11px]">Always Open</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Contact Component */}
      <div className="py-6">
        <Contact />
      </div>

    </div>
  );
}
