import React, { useState, useEffect } from 'react';
import { User, Award, Calendar, Clock, Star, CheckCircle, ChevronRight, Stethoscope, Sparkles } from 'lucide-react';

export default function Doctors({ doctors: propDoctors, onSelectDoctorForBooking }) {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 4 Dedicated Specialists Portraits
  const doctorFallbacks = [
    "/dr-rekha-sisodiya.jpg",
    "/dr-sachin-sisodiya.jpg",
    "/dr-kush.jpg",
    "/dr-bhavana.jpg"
  ];

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.doctors && data.doctors.length > 0) {
          setDoctorsList(data.doctors);
        } else if (propDoctors && propDoctors.length > 0) {
          setDoctorsList(propDoctors);
        }
      })
      .catch(() => {
        if (propDoctors && propDoctors.length > 0) {
          setDoctorsList(propDoctors);
        }
      })
      .finally(() => setLoading(false));
  }, [propDoctors]);

  return (
    <section id="doctors" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/10 text-teal-700 text-xs font-black uppercase tracking-wider border border-teal-500/20">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Senior Board-Certified Specialists</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 font-heading tracking-tight">
            Meet Our Eye Specialists &amp; Surgeons
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
            Distinguished ophthalmologists providing personalized care in blade-free Contoura LASIK, advanced micro-incision cataract, vitreoretina, and pediatric eye care.
          </p>
        </div>

        {/* Doctors Grid — 4 Columns on Large Screen */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white rounded-3xl p-5 space-y-4 border border-slate-200 shadow-sm">
                <div className="h-72 rounded-2xl skeleton" />
                <div className="h-6 w-3/4 skeleton rounded" />
                <div className="h-4 w-1/2 skeleton rounded" />
                <div className="h-11 rounded-full skeleton" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctorsList.map((doc, idx) => (
              <div
                key={doc.id}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:border-teal-500/60 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1"
              >
                <div>
                  {/* Photo Container */}
                  <div className="relative h-72 overflow-hidden bg-slate-100">
                    <img
                      src={doc.photo_url}
                      alt={doc.name}
                      onError={(e) => {
                        e.target.src = doctorFallbacks[idx % doctorFallbacks.length];
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-slate-800 flex items-center space-x-1 shadow-md">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>4.9 / 5.0</span>
                    </div>

                    {/* Schedule Badge */}
                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <div className="text-xs font-semibold text-teal-300 flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span className="truncate">{doc.start_time} - {doc.end_time} &bull; ({Array.isArray(doc.available_days) ? doc.available_days.slice(0, 4).join(', ') : doc.available_days})</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-2.5">
                    <h3 className="text-xl font-black text-slate-900 font-heading group-hover:text-teal-700 transition-colors">
                      {doc.name}
                    </h3>
                    <div className="inline-block px-3 py-1 rounded-lg bg-teal-50 text-teal-700 text-xs font-extrabold uppercase tracking-wide border border-teal-200">
                      {doc.specialty}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium pt-1">
                      {doc.qualification}
                    </p>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectDoctorForBooking(doc.id)}
                    className="w-full py-3.5 rounded-full bg-slate-900 hover:bg-gradient-to-r hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 group-hover:shadow-teal-600/30 group-hover:from-teal-600 group-hover:to-cyan-600"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation with {doc.name.split(' ')[1] || 'Doctor'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
