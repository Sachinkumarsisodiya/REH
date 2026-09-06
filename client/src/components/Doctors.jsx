import React, { useState, useEffect } from 'react';
import { User, Award, Calendar, Clock, Star, CheckCircle, ChevronRight, Stethoscope, Sparkles, Check, PhoneCall, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

const DEFAULT_DOCTORS = [
  {
    id: 1,
    name: "Dr. Rekha Sisodiya",
    specialty: "Founder, Medical Director & Chief LASIK Specialist",
    qualification: "MBBS, MS (Ophthalmology) AIIMS, Fellowship in Refractive Surgery (London)",
    photo_url: "/dr-rekha-sisodiya.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "09:00",
    end_time: "17:00",
    slot_duration_mins: 30
  },
  {
    id: 2,
    name: "Dr. Sachin Kumar Sisodiya",
    specialty: "Senior Cataract, Phaco & Glaucoma Specialist",
    qualification: "MBBS, MS (Ophthalmology), FICO (UK), Fellowship in Micro-Incision Cataract",
    photo_url: "/dr-sachin-sisodiya.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "09:30",
    end_time: "17:30",
    slot_duration_mins: 30
  },
  {
    id: 3,
    name: "Dr. Kush",
    specialty: "Vitreo-Retina & Diabetic Eye Care Specialist",
    qualification: "MBBS, MD (Ophthalmology), DNB, Senior Vitreo-Retina Fellow",
    photo_url: "/dr-kush.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "10:00",
    end_time: "18:00",
    slot_duration_mins: 30
  },
  {
    id: 4,
    name: "Dr. Bhavana",
    specialty: "Pediatric Ophthalmology, Squint & Cornea Specialist",
    qualification: "MBBS, MS (Ophthalmology), Fellowship in Pediatric Eye Care & Strabismus",
    photo_url: "/dr-bhavana.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "09:00",
    end_time: "16:30",
    slot_duration_mins: 30
  }
];

export default function Doctors({ doctors: propDoctors, onSelectDoctorForBooking }) {
  const [doctorsList, setDoctorsList] = useState(propDoctors && propDoctors.length > 0 ? propDoctors : DEFAULT_DOCTORS);
  const [loading, setLoading] = useState(false);

  // 4 Dedicated Specialists Portraits
  const doctorFallbacks = [
    "/dr-rekha-sisodiya.jpg",
    "/dr-sachin-sisodiya.jpg",
    "/dr-kush.jpg",
    "/dr-bhavana.jpg"
  ];

  // Clinical specializations and highlights for each doctor
  const doctorHighlights = {
    1: [
      "Blade-Free Femto LASIK & Contoura Vision",
      "Corneal Wavefront Topography Specialist",
      "Fellowship in Refractive Surgery (London)"
    ],
    2: [
      "Micro-Incision Cataract Surgery (MICS)",
      "Premium Multifocal, Trifocal & Toric IOLs",
      "Glaucoma & Selective Laser Trabeculoplasty"
    ],
    3: [
      "Diabetic Vitreo-Retinopathy & Laser",
      "Micro-Vitrectomy & Retinal Detachment",
      "Anti-VEGF Intravitreal Injection Therapy"
    ],
    4: [
      "Pediatric Squint & Strabismus Surgery",
      "Lazy Eye (Amblyopia) Vision Therapy",
      "Pediatric Myopia & Cornea Management"
    ]
  };

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/doctors`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.doctors && data.doctors.length > 0) {
          setDoctorsList(data.doctors);
        } else if (propDoctors && propDoctors.length > 0) {
          setDoctorsList(propDoctors);
        } else {
          setDoctorsList(DEFAULT_DOCTORS);
        }
      })
      .catch(() => {
        if (propDoctors && propDoctors.length > 0) {
          setDoctorsList(propDoctors);
        } else {
          setDoctorsList(DEFAULT_DOCTORS);
        }
      })
      .finally(() => setLoading(false));
  }, [propDoctors]);

  return (
    <section id="doctors" className="py-16 sm:py-20 bg-gradient-to-b from-white via-teal-50/20 to-slate-50 relative border-t border-slate-200/80 overflow-hidden">
      
      {/* Soft Ambient Background Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Trust Badges */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-800 text-xs font-black uppercase tracking-wider border border-teal-500/20">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Senior Board-Certified Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Meet Our Eye Specialists &amp; Surgeons
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto">
            Distinguished ophthalmologists providing personalized care in blade-free Contoura LASIK, advanced micro-incision cataract, vitreoretina, and pediatric eye care.
          </p>

          {/* Quick Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold shadow-sm">
              <Award className="w-3.5 h-3.5 text-teal-600" />
              <span>AIIMS &amp; London Fellows</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-xs font-bold shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>45,000+ Surgeries Performed</span>
            </div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>4.9/5.0 Patient Ratings</span>
            </div>
          </div>
        </div>

        {/* Doctors Grid — 4 Balanced Columns */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white rounded-3xl p-5 space-y-4 border border-slate-200 shadow-sm">
                <div className="h-64 rounded-2xl skeleton" />
                <div className="h-6 w-3/4 skeleton rounded" />
                <div className="h-4 w-1/2 skeleton rounded" />
                <div className="h-11 rounded-full skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorsList.map((doc, idx) => {
              const highlights = doctorHighlights[doc.id] || [
                "Comprehensive Clinical Examination",
                "Advanced Diagnostics & Laser Suite",
                "Personalized Patient Treatment Plan"
              ];

              return (
                <div
                  key={doc.id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200/90 hover:border-teal-500/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
                >
                  <div>
                    {/* Photo Container */}
                    <div className="relative h-80 xs:h-96 sm:h-80 lg:h-64 overflow-hidden bg-slate-100">
                      <img
                        src={doc.photo_url}
                        alt={doc.name}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          e.target.src = doctorFallbacks[idx % doctorFallbacks.length];
                        }}
                        className="w-full h-full object-cover object-[center_10%] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                      
                      {/* Rating Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-black text-slate-800 flex items-center space-x-1 shadow-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>4.9 / 5.0</span>
                      </div>

                      {/* Schedule Badge */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="text-[11px] font-bold text-teal-300 flex items-center space-x-1.5">
                          <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                          <span className="truncate">{doc.start_time} - {doc.end_time} &bull; Mon-Sat</span>
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 space-y-2.5">
                      <div>
                        <h3 className="text-lg font-black text-slate-950 font-heading group-hover:text-teal-700 transition-colors leading-snug">
                          {doc.name}
                        </h3>
                        <div className="inline-block px-2.5 py-0.5 mt-1 rounded-md bg-teal-50 text-teal-800 text-[11px] font-extrabold tracking-tight border border-teal-200/80">
                          {doc.specialty}
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        {doc.qualification}
                      </p>

                      {/* Expertise Highlights */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        {highlights.map((h, hIdx) => (
                          <div key={hIdx} className="flex items-start space-x-1.5 text-[11px] font-medium text-slate-700">
                            <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span className="leading-tight">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Action Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onSelectDoctorForBooking(doc.id)}
                      className="w-full py-3 rounded-full bg-slate-900 hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 group-hover:shadow-teal-600/30 group-hover:from-teal-600 group-hover:to-cyan-600 active:scale-95"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Consultation</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Second Opinion & Hospital Advisory Bar */}
        <div className="mt-12 p-5 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center font-black shrink-0 border border-teal-200/70">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 font-heading">
                Seeking a Specialist Second Opinion on Cataract, LASIK or Retina Advice?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Our senior faculty provides comprehensive cross-consultation with advanced corneal topography and OCT scans.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <a
              href="tel:+917733866682"
              className="px-4 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center space-x-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
              <span>Call Helpline</span>
            </a>
            <button
              onClick={() => onSelectDoctorForBooking(1)}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all"
            >
              Book Second Opinion
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
