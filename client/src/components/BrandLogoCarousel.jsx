import React, { useState } from 'react';
import { 
  ShieldCheck, Award, Zap, HeartPulse, Building2, 
  CheckCircle2, ArrowRight, ExternalLink, Sparkles, Star 
} from 'lucide-react';

export default function BrandLogoCarousel() {
  const [selectedItem, setSelectedItem] = useState(null);

  const brandItems = [
    {
      id: 'reh-flagship',
      category: 'Hospital Flagship',
      title: 'Rekha Eye Hospital (REH)',
      subtitle: 'Super-Specialty LASIK & Retina Center',
      tag: 'Apex Clinical Center',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      logo: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 80" className="h-9 w-auto">
          <defs>
            <linearGradient id="blc-new-eye" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0EA5E9"/>
              <stop offset="50%" stopColor="#06B6D4"/>
              <stop offset="100%" stopColor="#0D9488"/>
            </linearGradient>
          </defs>
          <path d="M 10 15 V 65 M 10 15 H 32 C 45 15, 48 27, 48 35 C 48 43, 42 48, 32 48 H 10 M 32 48 L 48 65" 
                fill="none" stroke="#0D9488" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round"/>
          <g transform="translate(48, 15)">
            <path d="M 6 0 V 50 M 6 0 H 30 M 6 50 H 30" fill="none" stroke="#06B6D4" strokeWidth="7.5" strokeLinecap="round"/>
            <circle cx="20" cy="25" r="11" fill="none" stroke="url(#blc-new-eye)" strokeWidth="5"/>
            <circle cx="20" cy="25" r="4.5" fill="#38BDF8"/>
          </g>
          <g transform="translate(86, 15)">
            <path d="M 6 0 V 50 M 30 0 V 50 M 6 25 H 30" fill="none" stroke="#0F172A" strokeWidth="7.5" strokeLinecap="round"/>
          </g>
        </svg>
      ),
      highlight: '25+ Years Legacy • 50,000+ Successful Surgeries',
      details: 'Founded by Dr. Rekha Sisodiya (AIIMS Alumnus, London Fellow). State-of-the-art super-specialty eye care equipped with sterile Class-100 Modular OTs and German Carl Zeiss laser suites.'
    },
    {
      id: 'nabh',
      category: 'National Accreditation',
      title: 'NABH Accredited Hospital',
      subtitle: 'National Quality & Patient Safety Benchmark',
      tag: 'Highest National Honor',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      logo: (
        <div className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-emerald-600 text-white font-black text-xs shadow-md shadow-emerald-600/30">
          <ShieldCheck className="w-5 h-5 text-emerald-100" />
          <span className="tracking-wide text-[13px]">NABH CERTIFIED</span>
        </div>
      ),
      highlight: 'Zero Infection Record • 100% Surgical Sterility',
      details: 'National Accreditation Board for Hospitals & Healthcare Providers certification certifying top-tier clinical hygiene, medication safety, and patient-first medical protocols.'
    },
    {
      id: 'zeiss',
      category: 'German Laser Partner',
      title: 'Carl Zeiss Meditec (Germany)',
      subtitle: 'VisuMax Femtosecond & OPMI Lumera 700',
      tag: '500 kHz Laser Speed',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      logo: (
        <div className="px-3.5 py-1.5 rounded-2xl bg-[#002f6c] text-white font-black text-xs tracking-wider shadow-md shadow-blue-900/30 flex items-center space-x-1.5">
          <span className="text-sm font-black">ZEISS</span>
          <span className="text-[10px] text-blue-200 font-semibold uppercase">Optics</span>
        </div>
      ),
      highlight: 'Sub-Micron Laser Flaps • Curved Contact Glass',
      details: 'World standard in blade-free femtosecond corneal lenticule extraction and precision 3D surgical visualization microscopes for cataract and retinal operations.'
    },
    {
      id: 'alcon',
      category: 'Refractive Robotics',
      title: 'Alcon WaveLight & Centurion',
      subtitle: 'Contoura Vision & Active Fluidics Phaco',
      tag: 'US-FDA Approved',
      badgeColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      logo: (
        <div className="px-3.5 py-1.5 rounded-2xl bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-black text-xs tracking-wide shadow-md shadow-cyan-600/30">
          Alcon
        </div>
      ),
      highlight: '1050 Hz Multi-Spatial Eye Tracker • 1.4s/Diopter',
      details: 'Topography-guided Contoura Vision mapping 22,000 corneal elevation points for crystal clear 6/6 HD vision restoration.'
    },
    {
      id: 'aiims',
      category: 'Medical Faculty',
      title: 'AIIMS New Delhi Alumni',
      subtitle: 'Apex Medical Institute Surgical Leadership',
      tag: 'Premier Medical Legacy',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      logo: (
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-teal-900 text-teal-200 font-bold text-xs shadow-md">
          <Award className="w-4 h-4 text-teal-400" />
          <span>AIIMS ALUMNI</span>
        </div>
      ),
      highlight: 'Trained at India’s #1 Medical Institute',
      details: 'Lead surgeons and clinical directors trained at All India Institute of Medical Sciences (AIIMS, New Delhi) with prestigious international surgical fellowships.'
    },
    {
      id: 'heidelberg',
      category: '3D Diagnostics',
      title: 'Heidelberg Spectralis OCT',
      subtitle: '3-Micron Cross-Sectional Retinal Scanner',
      tag: 'German Precision',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      logo: (
        <div className="px-3.5 py-1.5 rounded-2xl bg-slate-900 text-cyan-400 font-mono font-bold text-xs border border-cyan-500/40 shadow-md">
          HEIDELBERG
        </div>
      ),
      highlight: 'Spectral-Domain OCT • 40,000 A-Scans/sec',
      details: 'Ultra-high resolution 3D cross-sectional scanning of macular layers and optic nerve fibers for early glaucoma and diabetic retinopathy detection.'
    },
    {
      id: 'star-health',
      category: 'Cashless TPA Network',
      title: 'Star Health & Allied Insurance',
      subtitle: '100% Cashless Hospitalization Pre-Auth',
      tag: 'Direct Settlement',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      logo: (
        <div className="flex items-center space-x-1 px-3 py-1.5 rounded-2xl bg-teal-700 text-white font-black text-xs shadow-md shadow-teal-700/30">
          <span className="text-amber-300 text-sm">★</span>
          <span>STAR HEALTH</span>
        </div>
      ),
      highlight: 'Zero Out-Of-Pocket Expense for Covered Surgeries',
      details: 'Fast-track pre-authorization approvals and paperless claims for cataract, LASIK, and vitreo-retina operations.'
    },
    {
      id: 'cghs',
      category: 'Govt. Healthcare Panel',
      title: 'CGHS & ECHS Empanelled',
      subtitle: 'Central Govt. & Defence Veterans Super-Specialty',
      tag: 'Govt. Panel',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      logo: (
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-amber-700 text-white font-black text-xs shadow-md shadow-amber-700/30">
          <Building2 className="w-4 h-4 text-amber-200" />
          <span>CGHS / ECHS</span>
        </div>
      ),
      highlight: 'Empanelled for All Super-Specialty Eye Surgeries',
      details: 'Officially recognized healthcare destination for Central Government Employees, Pensioners, Ex-Servicemen (ECHS), and Railway beneficiaries.'
    },
    {
      id: 'lipiflow',
      category: 'Dry Eye Therapy',
      title: 'LipiFlow Thermal Pulsation',
      subtitle: 'Johnson & Johnson Vision Dry Eye Clinic',
      tag: 'Meibomian Gland Spa',
      badgeColor: 'bg-rose-50 text-rose-800 border-rose-200',
      logo: (
        <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-2xl bg-rose-600 text-white font-black text-xs shadow-md shadow-rose-600/30">
          <HeartPulse className="w-4 h-4 text-rose-200" />
          <span>LipiFlow Spa</span>
        </div>
      ),
      highlight: 'Patented Thermal Inner-Eyelid Unclogging',
      details: 'Clinical therapeutic relief from screen fatigue, redness, and chronic dry eyes with automated thermal pulsation and LipiScan meibography.'
    },
    {
      id: 'iso',
      category: 'Quality Standard',
      title: 'ISO 9001:2015 Certified',
      subtitle: 'International Clinical Quality Protocols',
      tag: 'Global Standard',
      badgeColor: 'bg-slate-50 text-slate-800 border-slate-200',
      logo: (
        <div className="px-3 py-1.5 rounded-2xl bg-slate-800 text-white font-black text-xs tracking-wider shadow-md">
          ISO 9001:2015
        </div>
      ),
      highlight: 'Global Clinical & Operational Audits',
      details: 'Certified quality management workflows ensuring error-free surgical scheduling, patient care transparency, and clinical excellence.'
    }
  ];

  // Repeat for seamless infinite marquee loop
  const infiniteCards = [...brandItems, ...brandItems];

  return (
    <section className="py-14 sm:py-20 bg-gradient-to-b from-slate-50 via-teal-50/20 to-white border-y border-slate-200 relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200/90 text-teal-800 text-xs font-black uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse" />
            <span>Hospital Accreditations &amp; Global Technology Suite</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Certified by <span className="bg-gradient-to-r from-teal-700 via-cyan-700 to-sky-700 bg-clip-text text-transparent">National Boards</span> &amp; Powered by World Laser Leaders
          </h2>

          <p className="text-slate-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Rekha Eye Hospital unites apex national healthcare credentials with US-FDA approved German Carl Zeiss &amp; Alcon laser robotics for micrometer-level surgical perfection.
          </p>
        </div>

        {/* Self-Running Infinite Smooth Marquee Carousel */}
        <div className="relative overflow-hidden py-4 -mx-4 sm:-mx-6 lg:-mx-8">
          
          {/* Side Fading Vignette Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent z-20 pointer-events-none" />

          {/* Smooth Continuous Marquee Track */}
          <div className="animate-marquee-smooth space-x-5 px-4">
            {infiniteCards.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                onClick={() => setSelectedItem(item)}
                className="w-[300px] sm:w-[340px] p-5 rounded-3xl bg-white border border-slate-200/90 hover:border-teal-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between space-y-4 group shrink-0 relative overflow-hidden"
              >
                {/* Top Glowing Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Card Header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="shrink-0">{item.logo}</div>
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${item.badgeColor}`}>
                    {item.tag}
                  </span>
                </div>

                {/* Card Body */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                    {item.category}
                  </div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-teal-800 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>

                {/* Highlight Strip */}
                <div className="p-2.5 rounded-2xl bg-slate-50 group-hover:bg-teal-50/60 border border-slate-200/80 group-hover:border-teal-200 transition-colors text-[11px] font-semibold text-slate-700 flex items-center justify-between">
                  <span className="truncate pr-2">{item.highlight}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal-600 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>

              </div>
            ))}
          </div>

        </div>

        {/* Bottom 4 Key Trust Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-4 max-w-5xl mx-auto pt-2">
          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 font-bold">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">NABH Standards</div>
              <div className="text-[11px] text-slate-500 font-medium">100% Sterile OTs</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 font-bold">
              <Zap className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">Carl Zeiss Laser</div>
              <div className="text-[11px] text-slate-500 font-medium">500 kHz Femto Speed</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
              <Award className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">AIIMS Leadership</div>
              <div className="text-[11px] text-slate-500 font-medium">100+ Yrs Exp Faculty</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center space-x-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 font-bold">
              <Building2 className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-sm font-black text-slate-900">30+ Cashless TPAs</div>
              <div className="text-[11px] text-slate-500 font-medium">CGHS &amp; ECHS Panels</div>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Detail Modal when clicked */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${selectedItem.badgeColor}`}>
                  {selectedItem.tag}
                </span>
                <h3 className="text-xl font-black text-slate-950 font-heading pt-1">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-teal-700 font-bold">
                  {selectedItem.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedItem(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-sm shrink-0"
              >
                &times;
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedItem.details}
            </p>

            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-xs text-teal-900 font-semibold flex items-center space-x-2.5">
              <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
              <span>Standard operating clinical protocol at Rekha Eye Hospital (REH).</span>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Close Details
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
