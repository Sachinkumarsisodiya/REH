import React from 'react';
import { Eye, Award, CheckCircle2, ArrowRight, Star, Clock, Activity, ShieldCheck, Sparkles, UserCheck, Stethoscope, ChevronRight, HeartPulse } from 'lucide-react';

export default function Hero({ onBookClick }) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      
      {/* High-Tech Medical Ambient Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-teal-500/10 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Accreditation Badge with Founder Leadership Note */}
            <div className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs sm:text-sm font-bold shadow-sm">
              <Award className="w-4 h-4 text-teal-600 shrink-0" />
              <span>NABH Accredited &bull; Led by Dr. Rekha Sisodiya (Founder &amp; Chief Surgeon)</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.12] font-heading">
              Precision Laser Eye Surgery &amp;{' '}
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent">
                Super-Specialty Vision Care
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience 6/6 HD visual clarity under the clinical leadership of <strong>Dr. Rekha Sisodiya</strong> (AIIMS Alumnus, Refractive Fellow London). Equipped with German Carl Zeiss &amp; Alcon blade-free Femtosecond laser suites.
            </p>

            {/* Key Clinical Features Grid */}
            <div className="grid sm:grid-cols-2 gap-3.5 text-xs sm:text-sm font-semibold text-slate-700 pt-1">
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Blade-Free 100% Contoura LASIK</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Micro-Incision Cataract (MICS)</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Painless Same-Day 24-Hr Recovery</span>
              </div>
              <div className="flex items-center space-x-2.5 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>100% Cashless TPA &amp; Govt. Panels</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <button
                type="button"
                onClick={onBookClick}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-base shadow-xl shadow-teal-600/35 hover:shadow-teal-600/50 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-3 group border border-teal-400/30"
              >
                <Eye className="w-5 h-5" />
                <span>Book Consultation with Dr. Rekha</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-slate-800 font-bold text-base border border-slate-300/80 hover:border-teal-500/80 hover:bg-slate-50 shadow-sm hover:shadow-md transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Explore Treatments</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Social Trust Metrics */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-center lg:text-left">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">50,000+</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Successful Surgeries</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-teal-600 font-heading">99.4%</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Vision Restoration Rate</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">25+ Yrs</div>
                <div className="text-xs text-slate-500 font-semibold mt-0.5">Clinical Heritage</div>
              </div>
            </div>

          </div>

          {/* Right Column: Founder & Chief Surgeon Dr. Rekha Sisodiya Hero Portrait */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Visual Image Card with Dr. Rekha Sisodiya */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group">
              <img
                src="/dr-rekha-sisodiya.jpg"
                alt="Dr. Rekha Sisodiya - Founder, Medical Director & Chief Ophthalmic Surgeon at Rekha Eye Hospital"
                className="w-full h-[490px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Bottom Founder Prestige Badge */}
              <div className="absolute bottom-5 left-5 right-5 text-white bg-slate-950/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white font-heading">
                      Dr. Rekha Sisodiya
                    </h3>
                    <div className="text-xs font-bold text-teal-400">
                      Founder, Medical Director &amp; Chief Eye Surgeon
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase border border-teal-500/30">
                    AIIMS Fellow
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1.5 leading-snug">
                  MS (Ophthalmology) AIIMS &bull; Fellowship Refractive Surgery (London) &bull; 25+ Years of Surgical Excellence
                </p>
              </div>
            </div>

            {/* Floating Live Doctor On Duty Card */}
            <div className="absolute -top-5 -left-5 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200 shadow-xl hidden sm:flex items-center space-x-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center border border-teal-200">
                <Stethoscope className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[10px] font-extrabold uppercase text-emerald-700 tracking-wider">Hospital Desk Live</span>
                </div>
                <div className="text-xs font-bold text-slate-900">Dr. Rekha &amp; Faculty On Duty</div>
              </div>
            </div>

            {/* Floating Patient Review Card */}
            <div className="absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-xl p-3.5 rounded-2xl border border-slate-200 shadow-xl hidden sm:flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-extrabold text-slate-900 ml-1">4.9/5</span>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">10,000+ Verified Surgeries</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
