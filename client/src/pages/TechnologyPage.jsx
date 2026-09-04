import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Zap, ShieldCheck, CheckCircle2, ArrowRight, Eye, Sparkles, Activity } from 'lucide-react';

export default function TechnologyPage() {
  const technologies = [
    {
      title: 'Carl Zeiss VisuMax Femtosecond Laser',
      origin: 'Germany',
      specialty: 'ReLEx SMILE & Femto LASIK',
      description: 'The world standard in high-precision femtosecond corneal surgery. Emits ultrashort laser pulses at 500 kHz to create micro-incisions with sub-micron accuracy without heat damage.',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      specs: ['500 kHz Ultra-Fast Pulse Frequency', 'Curved Contact Glass for Zero Pressure', 'Painless Corneal Lenticule Extraction']
    },
    {
      title: 'Alcon WaveLight EX500 Excimer Laser',
      origin: 'USA / Germany',
      specialty: 'Contoura Vision & Custom Wavefront Ablation',
      description: 'Operating at 500 Hz, the WaveLight EX500 delivers lightning-fast 1.4 seconds per diopter treatment with active 1050 Hz multi-spatial eye tracking to eliminate treatment misalignment.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      specs: ['1050 Hz Multi-Spatial 3D Eye Tracker', '1.4 Seconds Per Diopter Speed', 'Custom Corneal Topography Integration']
    },
    {
      title: 'Carl Zeiss IOLMaster 700 SWEPT Source OCT Biometer',
      origin: 'Germany',
      specialty: 'Precision Cataract Lens Calculation',
      description: 'SWEPT Source OCT biometry providing full-length OCT images from cornea to retina. Guarantees 99.8% precision in toric and multifocal IOL power calculation.',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      specs: ['SWEPT Source Optical Coherence Tomography', 'Fixation Check to Prevent Misaligned Scans', 'Toric IOL Axis Reference Image Storage']
    },
    {
      title: 'Class-100 Modular Laminar Airflow OTs',
      origin: 'HEPA 99.997%',
      specialty: 'Zero-Infection Surgical Protocol',
      description: 'Positive pressure modular operating theaters equipped with absolute HEPA filters and seamless anti-bacterial cladding for completely sterile microsurgical environments.',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      specs: ['Ultra-Clean Laminar Air Circulation', 'Continuous Microclimate Temperature Control', 'Hermetically Sealed Stainless Steel OT Doors']
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Microscope className="w-3.5 h-3.5" />
            <span>German Optical &amp; Laser Robotics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Advanced Clinical Technology Suite
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Equipped with FDA-approved German Carl Zeiss and Alcon diagnostic and surgical robotics for flawless precision.
          </p>
        </div>
      </section>

      {/* Technology Showcase Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {technologies.map((tech, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {tech.origin}
                  </span>
                  
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-xs text-teal-300 font-bold uppercase tracking-wider">{tech.specialty}</div>
                    <h3 className="text-xl font-black font-heading text-white">{tech.title}</h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {tech.description}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Specifications:</div>
                    {tech.specs.map((s, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  to="/book-appointment"
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md"
                >
                  <span>Experience This Technology in Surgery</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
