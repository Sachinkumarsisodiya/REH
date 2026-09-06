import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, Award, ChevronLeft, ChevronRight, 
  CheckCircle2, Building2, Zap, HeartPulse 
} from 'lucide-react';

export default function BrandLogoCarousel() {
  const [selectedItem, setSelectedItem] = useState(null);
  const scrollRef = useRef(null);

  const brandItems = [
    {
      id: 'reh-flagship',
      type: 'brand',
      title: 'REH Super Specialty',
      subtitle: 'Hospital & LASIK Center',
      tag: 'Flagship Hospital',
      accent: 'teal',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" className="h-8 w-auto">
          <defs>
            <linearGradient id="blc-eye" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9"/>
              <stop offset="50%" stopColor="#06B6D4"/>
              <stop offset="100%" stopColor="#0D9488"/>
            </linearGradient>
          </defs>
          <path d="M 10 15 V 65 M 10 15 H 32 C 45 15, 48 27, 48 35 C 48 43, 42 48, 32 48 H 10 M 32 48 L 48 65" 
                fill="none" stroke="#0D9488" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
          <g transform="translate(48, 15)">
            <path d="M 6 0 V 50 M 6 0 H 30 M 6 50 H 30" fill="none" stroke="#06B6D4" strokeWidth="7" strokeLinecap="round"/>
            <circle cx="20" cy="25" r="11" fill="none" stroke="url(#blc-eye)" strokeWidth="4.5"/>
            <circle cx="20" cy="25" r="4.5" fill="#38BDF8"/>
          </g>
          <g transform="translate(86, 15)">
            <path d="M 6 0 V 50 M 30 0 V 50 M 6 25 H 30" fill="none" stroke="#0F172A" strokeWidth="7" strokeLinecap="round"/>
          </g>
        </svg>
      ),
      description: 'NABH-accredited tertiary eye care hospital founded by Dr. Rekha Sisodiya, delivering 25+ years of clinical excellence in Rajasthan.'
    },
    {
      id: 'nabh',
      type: 'accreditation',
      title: 'NABH Accredited',
      subtitle: 'National Quality Standards',
      tag: 'National Certification',
      accent: 'emerald',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-black text-emerald-700 text-xs shadow-inner">
          <ShieldCheck className="w-6 h-6 text-emerald-600" />
        </div>
      ),
      description: 'Full National Accreditation Board for Hospitals & Healthcare Providers certification for highest patient safety and surgical sterility.'
    },
    {
      id: 'zeiss',
      type: 'tech',
      title: 'Carl Zeiss Meditec',
      subtitle: 'German Optical Laser Partner',
      tag: 'Technology Suite',
      accent: 'sky',
      icon: (
        <div className="px-2.5 py-1.5 rounded-xl bg-blue-900 text-white font-black text-[13px] tracking-wider shadow-md">
          ZEISS
        </div>
      ),
      description: 'Equipped with VisuMax 500 kHz Femtosecond laser robotics, IOLMaster 700 biometry, and Lumera 700 3D surgical microscopes.'
    },
    {
      id: 'alcon',
      type: 'tech',
      title: 'Alcon WaveLight',
      subtitle: 'Contoura Vision & Centurion',
      tag: 'US-FDA Approved',
      accent: 'cyan',
      icon: (
        <div className="px-2.5 py-1.5 rounded-xl bg-cyan-700 text-white font-extrabold text-[12px] tracking-wide shadow-md">
          Alcon
        </div>
      ),
      description: 'Active fluidics phacoemulsification and 1050 Hz multi-spatial excimer laser tracking for ultra-fast spectacle removal.'
    },
    {
      id: 'aiims',
      type: 'alumni',
      title: 'AIIMS New Delhi',
      subtitle: 'Alumni Clinical Faculty',
      tag: 'Premier Medical Legacy',
      accent: 'teal',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-800 font-black text-xs shadow-inner">
          <Award className="w-6 h-6 text-teal-700" />
        </div>
      ),
      description: 'Surgeons trained at All India Institute of Medical Sciences (AIIMS, New Delhi) with international fellowship credentials.'
    },
    {
      id: 'heidelberg',
      type: 'tech',
      title: 'Heidelberg OCT',
      subtitle: 'High-Res Retinal Imaging',
      tag: '3D Diagnostics',
      accent: 'blue',
      icon: (
        <div className="px-2.5 py-1.5 rounded-xl bg-slate-900 text-cyan-400 font-mono font-bold text-[11px] border border-cyan-500/30">
          HEIDELBERG
        </div>
      ),
      description: 'Spectralis Spectral-Domain OCT providing 3-micron optical sectioning for early glaucoma and diabetic retinopathy detection.'
    },
    {
      id: 'star-health',
      type: 'tpa',
      title: 'Star Health Allied',
      subtitle: '100% Cashless Mediclaim',
      tag: 'Cashless TPA Partner',
      accent: 'teal',
      icon: (
        <div className="px-2.5 py-1 rounded-xl bg-teal-700 text-white font-bold text-xs flex items-center space-x-1">
          <span>★</span>
          <span>STAR HEALTH</span>
        </div>
      ),
      description: 'Direct cashless hospitalization pre-authorizations for cataract, retinal vitrectomy, and glaucoma surgeries.'
    },
    {
      id: 'cghs',
      type: 'govt',
      title: 'CGHS & ECHS Panels',
      subtitle: 'Govt. Empanelled Center',
      tag: 'Govt. Healthcare',
      accent: 'amber',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-black text-[11px] shadow-inner">
          <Building2 className="w-5 h-5 text-amber-700" />
        </div>
      ),
      description: 'Officially recognized hospital panel for Central Government Employees, Defence Veterans, and State Health Schemes.'
    },
    {
      id: 'lipiflow',
      type: 'tech',
      title: 'LipiFlow Thermal Spa',
      subtitle: 'Meibomian Dry Eye System',
      tag: 'Johnson & Johnson',
      accent: 'rose',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
          <HeartPulse className="w-5 h-5 text-rose-600" />
        </div>
      ),
      description: 'Inner-eyelid thermal pulsation therapy delivering immediate and sustained relief from chronic computer screen dry eye syndrome.'
    },
    {
      id: 'iso-cert',
      type: 'accreditation',
      title: 'ISO 9001:2015',
      subtitle: 'Quality Management Certified',
      tag: 'Global Standard',
      accent: 'slate',
      icon: (
        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-300 flex items-center justify-center text-slate-800 font-black text-[10px]">
          ISO 9001
        </div>
      ),
      description: 'Strict adherence to international standards in clinical hygiene, sterile OT airflow, and patient care workflows.'
    }
  ];

  // Double items for seamless scrolling marquee
  const marqueeItems = [...brandItems, ...brandItems];

  const handleManualScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-10 sm:py-14 bg-gradient-to-b from-white via-teal-50/25 to-slate-50 border-y border-slate-200/80 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
        
        {/* Header Ribbon Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-6 h-1 bg-teal-600 rounded-full"></span>
              <span className="text-teal-800 font-extrabold uppercase tracking-widest text-[11px] sm:text-xs">
                Hospital Accreditations &amp; Technology Partners
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Trusted by Leading <span className="text-teal-700">Medical Boards &amp; Global Laser Brands</span>
            </h2>
          </div>

          {/* Left/Right Manual Controls */}
          <div className="flex items-center space-x-2 self-start md:self-auto">
            <button
              onClick={() => handleManualScroll('left')}
              className="p-2 rounded-2xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 shadow-sm hover:shadow transition-all"
              aria-label="Previous brands"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleManualScroll('right')}
              className="p-2 rounded-2xl bg-white hover:bg-teal-50 text-slate-700 hover:text-teal-700 border border-slate-200 shadow-sm hover:shadow transition-all"
              aria-label="Next brands"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div className="relative">
          {/* Side Fading Vignette Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div
            ref={scrollRef}
            className="flex items-center space-x-4 overflow-x-auto scrollbar-none py-2 px-2"
            style={{
              scrollBehavior: 'smooth'
            }}
          >
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => setSelectedItem(item)}
                className="group shrink-0 w-[250px] sm:w-[270px] p-3.5 sm:p-4 rounded-3xl bg-white hover:bg-teal-50/50 border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 relative"
              >
                <div className="flex items-center space-x-3">
                  <div className="shrink-0 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                        {item.tag}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="font-extrabold text-slate-900 text-xs sm:text-sm truncate group-hover:text-teal-800 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate font-medium">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Micro-Trust Bottom Banner */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-1 text-xs font-semibold text-slate-600">
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <strong className="text-slate-900">NABH Accredited</strong> Excellence
          </span>
          <span className="text-slate-300 hidden sm:inline">&bull;</span>
          <span className="flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5 text-sky-600" />
            <span>German Carl Zeiss Laser Robotics</span>
          </span>
          <span className="text-slate-300 hidden sm:inline">&bull;</span>
          <span className="flex items-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>30+ Cashless TPA &amp; CGHS Network</span>
          </span>
        </div>

      </div>

      {/* Interactive Detail Modal when clicked */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {selectedItem.icon}
                <div>
                  <div className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    {selectedItem.tag}
                  </div>
                  <h3 className="text-lg font-black text-slate-950">
                    {selectedItem.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedItem.description}
            </p>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100 flex items-center space-x-3 text-xs text-teal-900 font-semibold">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span>Standard operating benchmark at Rekha Eye Hospital (REH).</span>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
