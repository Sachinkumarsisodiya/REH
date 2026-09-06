import React, { useState } from 'react';
import { 
  Eye, Zap, Shield, Sparkles, Activity, Baby, Stethoscope, 
  Layers, Check, ArrowRight, X, Clock, ShieldCheck, ChevronRight,
  Flame, Award, AlertCircle, HeartPulse, Sparkle
} from 'lucide-react';

export default function Services({ onBookClick }) {
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 'lasik',
      icon: Zap,
      title: 'Blade-Free Femto LASIK & Contoura',
      subtitle: 'Spectacle Removal in 10 Minutes',
      duration: '15 Mins Procedure',
      recovery: '24-Hour Recovery',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      description: 'Ultra-precise painless laser refractive surgery tailored to your unique corneal topography. Custom wavefront-guided ablation ensures 6/6 HD vision clarity with zero blades.',
      features: ['No Blade, No Pain, No Stitches', 'HD Vision 6/6 Clarity in 24 Hours', 'Carl Zeiss VisuMax Laser Suite', 'Custom Topography-Guided Mapping', 'US-FDA Approved Safe Protocol']
    },
    {
      id: 'cataract',
      icon: Eye,
      title: 'Micro-Incision Cataract (MICS)',
      subtitle: 'Premium Multifocal & Toric IOLs',
      duration: '10 Mins Surgery',
      recovery: 'Same-Day Home',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
      description: 'Stitchless, painless phacoemulsification cataract procedure with micro 1.8mm incision. Restores pristine distance, intermediate, and near vision without spectacles.',
      features: ['Customized Premium IOL Options', '10-Minute Stitchless Surgery', 'Same-Day Home Discharge', 'Night Driving & Glare-Free Clarity', 'Zeiss IOLMaster 700 Biometry']
    },
    {
      id: 'retina',
      icon: Activity,
      title: 'Vitreo-Retina & Diabetic Eye Care',
      subtitle: 'Retinal Laser & Micro-Vitrectomy',
      duration: 'Comprehensive Diagnostics',
      recovery: 'Specialist Monitored',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
      description: 'Specialized medical and surgical management for diabetic retinopathy, retinal detachment, macular degeneration, and floaters using high-definition OCT imaging.',
      features: ['Spectral Domain OCT Diagnostics', 'Anti-VEGF Intravitreal Injections', '23G/25G Sutureless Vitrectomy', 'Retinal Tear Laser Photocoagulation', 'Fluorescein Angiography (FFA)']
    },
    {
      id: 'icl',
      icon: Sparkle,
      title: 'ICL Phakic Lens Implants',
      subtitle: 'For High Minus Power & Thin Corneas',
      duration: '15 Mins Procedure',
      recovery: 'Fast 24-Hour Healing',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600',
      description: 'Permanent EVO+ Visian ICL implantation behind the iris for patients with extreme myopia (up to -20D) or corneas too thin for standard LASIK laser.',
      features: ['Ideal for High Power (-0.5D to -20D)', 'Zero Corneal Tissue Removal', '100% Reversible Implantation', 'Built-in UV Eye Protection', 'Permanent Crisp HD Vision']
    },
    {
      id: 'dryeye',
      icon: Flame,
      title: 'Dry Eye Spa & LipiFlow Thermal',
      subtitle: 'Advanced Tear Film & Gland Therapy',
      duration: '30 Mins Treatment',
      recovery: 'Immediate Comfort',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600',
      description: 'Specialized diagnostic grading for computer vision syndrome and Meibomian Gland Dysfunction (MGD) using LipiFlow thermal pulsation and intense pulsed light.',
      features: ['Non-Invasive Tear Film Osmolarity', 'LipiFlow Meibomian Thermal Pulsation', 'Intense Pulsed Light (IPL) Therapy', 'Long-lasting Burning & Itch Relief', 'Tailored Screen-Work Regimen']
    },
    {
      id: 'glaucoma',
      icon: Shield,
      title: 'Glaucoma & Optic Nerve Care',
      subtitle: 'Prevent Silent Vision Loss with Laser',
      duration: 'Laser & Medical Therapy',
      recovery: 'Outpatient Procedure',
      image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&q=80&w=600',
      description: 'Comprehensive intraocular pressure monitoring, computerized visual field perimetry, and Selective Laser Trabeculoplasty (SLT) to preserve lifelong optic nerve health.',
      features: ['Humphrey Visual Field Analyzer (HFA)', 'Non-Contact Applanation Tonometry', 'Selective Laser Trabeculoplasty (SLT)', 'Minimally Invasive Glaucoma Surgery', 'Pachymetry & RNFL Scans']
    }
  ];

  return (
    <section id="services" className="pt-16 pb-12 bg-slate-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-700 text-xs font-black uppercase tracking-wider border border-teal-500/20">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <span>Advanced Clinical Treatments</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Super-Specialty Eye Care Powered by German Laser Robotics
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            From blade-free Femto LASIK vision restoration to micro-incision sutureless cataract procedures, LipiFlow dry eye spa, and complex vitreo-retinal surgery.
          </p>
        </div>

        {/* Services Grid (6 Core Balanced Cards) */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const IconComponent = srv.icon;
            return (
              <div
                key={srv.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-teal-500/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
              >
                <div>
                  {/* Card Image Header with Clean Medically-Accurate Imagery */}
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={srv.image}
                      alt={srv.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    
                    <div className="absolute top-3 left-3 p-2.5 rounded-xl bg-teal-600 text-white shadow-lg shadow-teal-600/30">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[11px] font-bold text-teal-300 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{srv.duration}</span>
                        <span className="text-slate-400">&bull;</span>
                        <span className="text-slate-200">{srv.recovery}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-slate-900 font-heading leading-snug group-hover:text-teal-700 transition-colors">
                      {srv.title}
                    </h3>
                    <p className="text-xs font-extrabold text-teal-600">
                      {srv.subtitle}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-normal pt-1">
                      {srv.description}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-6 pb-6 pt-3 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedService(srv)}
                    className="text-xs font-black text-teal-700 hover:text-teal-800 flex items-center space-x-1 group/btn"
                  >
                    <span>View Protocol</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={onBookClick}
                    className="px-4 py-2 rounded-full bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs shadow transition-all transform active:scale-95"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Explore All Treatments CTA */}
        <div className="mt-14 text-center">
          <a
            href="/treatments"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full bg-white hover:bg-teal-50 text-teal-800 font-black text-xs sm:text-sm border border-slate-200 hover:border-teal-400 shadow-md transition-all transform hover:scale-105"
          >
            <span>Explore All 12+ Eye Treatments &amp; Surgical Protocols</span>
            <ArrowRight className="w-4 h-4 text-teal-600" />
          </a>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 text-slate-900 space-y-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-2xl bg-teal-600 text-white shrink-0 shadow-lg shadow-teal-600/30">
                <selectedService.icon className="w-7 h-7" />
              </div>
              <div className="space-y-1 pr-8">
                <div className="text-xs font-extrabold uppercase text-teal-600 tracking-wider">
                  {selectedService.subtitle}
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-heading">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedService.description}
            </p>

            {/* Clinical Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Clinical Highlights &amp; Key Features
              </h4>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {selectedService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800">
                    <Check className="w-4 h-4 text-teal-600 shrink-0 stroke-[3]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-500">
                <span>Helpline: <strong>+91 7733866682</strong></span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedService(null)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedService(null);
                    if (onBookClick) onBookClick();
                  }}
                  className="w-full sm:w-auto px-7 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs shadow-lg shadow-teal-600/30 flex items-center justify-center space-x-2"
                >
                  <span>Book Consultation for this Treatment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
