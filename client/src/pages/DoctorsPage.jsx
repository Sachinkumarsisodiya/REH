import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Award, Calendar, Clock, Star, CheckCircle, ChevronRight, Stethoscope, Sparkles, Search, Check, ShieldCheck, ArrowRight } from 'lucide-react';

export default function DoctorsPage() {
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

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
        if (data.success && data.doctors) {
          setDoctorsList(data.doctors);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const specialtyCategories = [
    { id: 'All', label: 'All Specialists' },
    { id: 'LASIK', label: 'Cataract & LASIK' },
    { id: 'Retina', label: 'Retina & Vitreous' },
    { id: 'Pediatric', label: 'Pediatric & Squint' },
    { id: 'Glaucoma', label: 'Glaucoma & Phaco' }
  ];

  const filteredDoctors = doctorsList.filter(doc => {
    const spec = (doc.specialty || '').toLowerCase();
    const name = (doc.name || '').toLowerCase();
    const qual = (doc.qualification || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesCategory =
      selectedSpecialty === 'All' ||
      (selectedSpecialty === 'LASIK' && (spec.includes('lasik') || spec.includes('cataract') || spec.includes('refractive') || spec.includes('phaco'))) ||
      (selectedSpecialty === 'Retina' && (spec.includes('retina') || spec.includes('diabetic'))) ||
      (selectedSpecialty === 'Pediatric' && (spec.includes('pediatric') || spec.includes('squint') || spec.includes('strabismus') || spec.includes('cornea'))) ||
      (selectedSpecialty === 'Glaucoma' && (spec.includes('glaucoma') || spec.includes('phaco') || spec.includes('cataract')));

    const matchesSearch =
      q === '' ||
      name.includes(q) ||
      spec.includes(q) ||
      qual.includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>AIIMS-Trained Super Specialists</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Our Medical Faculty &amp; Eye Surgeons
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Led by Founder &amp; Chief Surgeon <strong>Dr. Rekha Sisodiya</strong>, our full-time clinical team brings together over 100+ years of combined surgical expertise.
          </p>
        </div>
      </section>

      {/* Filter and Doctors Roster */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Search & Filters */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search specialist by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-teal-500 transition-colors shadow-sm"
              />
            </div>

            <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {specialtyCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedSpecialty(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    selectedSpecialty === cat.id
                      ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/30'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Doctors Grid — 4 Columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((doc, idx) => {
            const fallbackImg = doctorFallbacks[idx % doctorFallbacks.length];
            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-64 overflow-hidden bg-slate-100">
                    <img
                      src={doc.photo_url || fallbackImg}
                      alt={doc.name}
                      onError={(e) => {
                        e.target.src = fallbackImg;
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-teal-800 border border-slate-200 shadow">
                      Verified Specialist
                    </span>

                    <div className="absolute bottom-3 left-4 right-4 text-white">
                      <h3 className="text-xl font-black font-heading">{doc.name}</h3>
                      <div className="text-xs text-teal-300 font-bold">{doc.specialty}</div>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {doc.qualification}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-500 font-mono">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Timings: {doc.start_time} - {doc.end_time}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Calendar className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>Days: {doc.available_days?.join(', ') || 'Mon-Sat'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/book-appointment?doctor_id=${doc.id}`}
                    className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md shadow-teal-600/20 transition-all"
                  >
                    <span>Book Consultation</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
}
