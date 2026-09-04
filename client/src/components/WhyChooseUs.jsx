import React from 'react';
import { ShieldCheck, Cpu, PhoneCall, CreditCard, Award, HeartHandshake, Sparkles, CheckCircle2, ArrowRight, Zap, Check, X } from 'lucide-react';

export default function WhyChooseUs({ onBookClick }) {
  const pillars = [
    {
      icon: Cpu,
      title: 'German Optical Technology',
      description: 'Carl Zeiss Lumera 700 3D surgical microscopes, VisuMax Femtosecond lasers, and IOLMaster 700 biometry.'
    },
    {
      icon: ShieldCheck,
      title: 'AIIMS Board-Certified Faculty',
      description: 'Lead surgeons with over 25 years of specialized clinical experience and fellowships from Moorfields Eye Hospital (London).'
    },
    {
      icon: PhoneCall,
      title: '24x7 Dedicated Casualty Unit',
      description: 'Emergency ophthalmic triage for chemical splashes, acute glaucoma, sudden vision blackouts, and corneal trauma.'
    },
    {
      icon: CreditCard,
      title: '100% Cashless TPA Network',
      description: 'Empaneled with Star Health, HDFC ERGO, ICICI Lombard, Max Bupa, Care Health, CGHS, ECHS, and major PSUs.'
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content Left */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-wider border border-teal-200">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>The REH Clinical Advantage</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading leading-tight tracking-tight">
              Uncompromising Surgical Precision &amp; Ethical Clinical Care
            </h2>

            <p className="text-slate-600 text-base leading-relaxed font-normal">
              At Rekha Eye Hospital, we combine patient-first medical ethics with advanced laser engineering. Our NABH accreditation guarantees zero-infection protocols and superior visual outcomes.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pil, idx) => {
                const IconComp = pil.icon;
                return (
                  <div key={idx} className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-2 hover:border-teal-500/50 transition-colors shadow-sm">
                    <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/30">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-black text-slate-900 font-heading">{pil.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{pil.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={onBookClick}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-sm shadow-xl shadow-teal-600/30 transition-all transform hover:scale-105 active:scale-95 flex items-center space-x-2"
              >
                <span>Schedule Your Comprehensive Eye Exam</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Feature Showcase Right: Technology Comparison Card */}
          <div className="lg:col-span-6 relative">
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs font-black uppercase tracking-wider text-teal-400">Clinical Benchmark</div>
                  <h3 className="text-xl font-black font-heading text-white mt-0.5">Why Choose REH Blade-Free LASIK?</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase border border-teal-500/30">
                  Gold Standard
                </div>
              </div>

              {/* Comparison Rows */}
              <div className="space-y-3 text-xs">
                
                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Traditional Microkeratome</div>
                    <div className="text-slate-300 font-medium mt-1 flex items-center space-x-1">
                      <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span>Mechanical Blade Used</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-teal-400 uppercase">REH Contoura Femto</div>
                    <div className="text-white font-bold mt-1 flex items-center space-x-1">
                      <Check className="w-3.5 h-3.5 text-teal-400 shrink-0 stroke-[3]" />
                      <span>100% Blade-Free Laser</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Recovery Duration</div>
                    <div className="text-slate-300 font-medium mt-1">3 - 5 Days Downtime</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-teal-400 uppercase">REH Fast Recovery</div>
                    <div className="text-white font-bold mt-1 text-teal-300">Resume Work in 24 Hours</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Flap Precision</div>
                    <div className="text-slate-300 font-medium mt-1">&plusmn; 20 Micron Variance</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-teal-400 uppercase">Zeiss Sub-Micron</div>
                    <div className="text-white font-bold mt-1 text-teal-300">&plusmn; 2 Micron Accuracy</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800">
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">Night Driving Glare</div>
                    <div className="text-slate-300 font-medium mt-1">Occasional Halos Reported</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-teal-400 uppercase">Wavefront Custom</div>
                    <div className="text-white font-bold mt-1 text-teal-300">Crystal Clear Night Vision</div>
                  </div>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-800/80 flex items-center justify-between text-xs text-teal-200">
                <span className="font-bold">Over 25,000+ Blade-Free LASIK Procedures Completed</span>
                <span className="text-emerald-400 font-black">99.4% Success</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
