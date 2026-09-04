import React from 'react';
import { Link } from 'react-router-dom';
import { Award, ShieldCheck, HeartHandshake, Zap, Users, CheckCircle2, Building2, Sparkles, Stethoscope, Microscope, ArrowRight, Check } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Founder Dr. Rekha Sisodiya Visual Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white group relative bg-slate-900">
                <img
                  src="/dr-rekha-sisodiya.jpg"
                  alt="Dr. Rekha Sisodiya - Founder & Chief Surgeon at Rekha Eye Hospital"
                  className="w-full h-64 sm:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-md p-3 rounded-2xl text-white border border-slate-700/60 shadow-lg">
                  <div className="text-xs font-black text-white font-heading">Dr. Rekha Sisodiya</div>
                  <div className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Founder &amp; Chief Surgeon (AIIMS)</div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-cyan-700 text-white p-5 rounded-3xl shadow-xl shadow-teal-700/20 space-y-1.5 border border-teal-500/30">
                <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl font-black font-heading">100% Sterile Modular OT</div>
                <p className="text-xs text-teal-100 font-medium leading-relaxed">
                  Laminar Air Flow Class-100 suites with zero-infection clinical protocols.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-8 sm:pt-10">
              <div className="bg-slate-950 text-white p-6 rounded-3xl shadow-xl space-y-2 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Microscope className="w-6 h-6" />
                </div>
                <div className="text-2xl font-black font-heading text-teal-400">German Laser Tech</div>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">
                  Carl Zeiss VisuMax &amp; Alcon Centurion Phaco surgical robotics.
                </p>
              </div>

              <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-100 group bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600"
                  alt="Micro-Surgical Operation Suite at Rekha Eye Hospital"
                  className="w-full h-48 sm:h-60 object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
              <Building2 className="w-4 h-4 text-teal-600" />
              <span>About Rekha Eye Hospital (REH)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading leading-tight tracking-tight">
              Pioneering Clinical Excellence in Eye Surgery Since 1999
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Founded and led by senior ophthalmic surgeon <strong>Dr. Rekha Sisodiya</strong> (MS AIIMS New Delhi, Fellow London), Rekha Eye Hospital has evolved into North India's premier super-specialty eye destination. Under her clinical vision, REH combines AIIMS-trained surgical mastery with German Carl Zeiss &amp; Alcon refractive robotics.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              From customized blade-free <strong>Contoura Vision &amp; Femto LASIK</strong> to micro-incision sutureless cataract procedures with multifocal/toric IOL implants, our patient-first philosophy ensures supreme precision, zero pain, and rapid 24-hour recovery.
            </p>

            {/* Core Pillars List */}
            <div className="space-y-3.5 pt-2">
              
              <div className="flex items-start space-x-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-teal-600/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 font-heading">AIIMS-Trained Super Specialists</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Board-certified surgeons with international fellowships across the UK and Sankara Nethralaya.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-teal-600/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 font-heading">German Carl Zeiss 3D Diagnostic Suite</h4>
                  <p className="text-xs text-slate-600 mt-0.5">High-definition Spectralis OCT, IOLMaster 700 biometry, and LipiFlow thermal dry eye therapy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-teal-600/30">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900 font-heading">Complete Cashless Mediclaim &amp; TPA Desk</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Seamless cashless approvals with Star Health, HDFC ERGO, ICICI Lombard, Care, CGHS &amp; ECHS.</p>
                </div>
              </div>

            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-teal-600 text-white font-black text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Discover Full Hospital History &amp; Standards</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
