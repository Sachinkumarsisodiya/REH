import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, ShieldCheck, HeartHandshake, Zap, Users, CheckCircle2, 
  Building2, Sparkles, Stethoscope, Microscope, ArrowRight, 
  Clock, Star, Phone, Check, Shield, Activity, Sparkle, HeartPulse,
  Eye, Calendar, CheckCircle, GraduationCap
} from 'lucide-react';

export default function AboutPage() {
  const doctors = [
    {
      name: 'Dr. Rekha Sisodiya',
      role: 'Founder & Chief Medical Director',
      degrees: 'MBBS, MS (Ophthalmology) AIIMS New Delhi',
      fellowship: 'Fellow Refractive & Cornea Surgery (London, UK)',
      experience: '25+ Years Experience',
      surgeries: '25,000+ Surgeries',
      specialty: 'Blade-Free Femto LASIK, Micro-Incision Cataract (MICS), Cornea',
      image: '/dr-rekha-sisodiya.jpg',
      badge: 'Hospital Founder'
    },
    {
      name: 'Dr. Sachin Kumar Sisodiya',
      role: 'Senior Consultant & Vitreo-Retina Surgeon',
      degrees: 'MBBS, MS (Ophthalmology), FVR (Retina)',
      fellowship: 'Fellow Vitreo-Retinal Surgery (Sankara Nethralaya)',
      experience: '18+ Years Experience',
      surgeries: '12,000+ Retinal Lasers & Vitrectomies',
      specialty: 'Diabetic Retinopathy, Retinal Detachment, Micro-Vitrectomy',
      image: '/dr-sachin-sisodiya.jpg',
      badge: 'Retina Lead'
    },
    {
      name: 'Dr. Kush',
      role: 'Consultant Cataract, Refractive & Cornea Surgeon',
      degrees: 'MBBS, MS (Ophthalmology), DNB',
      fellowship: 'Fellow Anterior Segment & Refractive Surgery',
      experience: '12+ Years Experience',
      surgeries: '8,500+ Phaco & LASIK Surgeries',
      specialty: 'Contoura Vision, Premium Multifocal/Toric IOLs, ICL Implants',
      image: '/dr-kush.jpg',
      badge: 'LASIK Specialist'
    },
    {
      name: 'Dr. Bhavana',
      role: 'Consultant Pediatric Ophthalmology & Glaucoma',
      degrees: 'MBBS, MS (Ophthalmology), FAICO',
      fellowship: 'Fellow Pediatric Ophthalmology, Strabismus & Glaucoma',
      experience: '10+ Years Experience',
      surgeries: '6,000+ Squint & Glaucoma Procedures',
      specialty: 'Pediatric Squint Alignment, Amblyopia Therapy, SLT Laser',
      image: '/dr-bhavana.jpg',
      badge: 'Pediatric & Glaucoma'
    }
  ];

  const milestones = [
    {
      year: '1999',
      title: 'Foundation of Rekha Eye Hospital',
      desc: 'Founded by Dr. Rekha Sisodiya with a mission to bring world-class ophthalmic care to every individual.'
    },
    {
      year: '2006',
      title: 'Modular Class-100 Operation Theatres',
      desc: 'Commissioned the region’s first sterile modular laminar air flow surgical suites with zero-infection protocols.'
    },
    {
      year: '2012',
      title: 'Pioneered Blade-Free Femto LASIK',
      desc: 'Introduced customized German laser wavefront and topography-guided spectacle removal suites.'
    },
    {
      year: '2018',
      title: 'Full NABH & QAI National Accreditation',
      desc: 'Awarded national NABH certification for highest benchmarks in surgical hygiene and patient safety.'
    },
    {
      year: '2022',
      title: 'Next-Gen Alcon Centurion & LipiFlow Suite',
      desc: 'Expanded with micro-incision 1.8mm phacoemulsification systems and advanced dry eye thermal spa.'
    },
    {
      year: '2024+',
      title: '50,000+ Lives Restored & 24x7 Trauma Wing',
      desc: 'Proudly celebrating over 50,000 successful surgeries with complete cashless insurance network coverage.'
    }
  ];

  const techSuite = [
    {
      name: 'Carl Zeiss VisuMax Femtosecond Laser',
      category: 'Refractive & LASIK',
      desc: 'German ultra-fast laser creating micro-thin corneal flaps in under 15 seconds with sub-micron precision.'
    },
    {
      name: 'Carl Zeiss OPMI Lumera 700 3D Microscope',
      category: 'Microsurgical Precision',
      desc: 'World-leading surgical visualization for ultra-delicate anterior and posterior segment ocular operations.'
    },
    {
      name: 'Alcon Centurion Vision System',
      category: 'Cataract Phacoemulsification',
      desc: 'Active fluidics technology for stitchless, micro 1.8mm cataract extraction with instant lens placement.'
    },
    {
      name: 'Heidelberg Spectralis Spectral Domain OCT',
      category: 'Retinal Diagnostics',
      desc: 'High-speed 3D cross-sectional imaging of retinal layers and optic nerve fibers down to 3 microns.'
    },
    {
      name: 'Humphrey Field Analyzer 3 (HFA3)',
      category: 'Glaucoma & Optic Nerve',
      desc: 'Gold standard automated perimetry for computerized early detection of visual field constriction.'
    },
    {
      name: 'LipiFlow Thermal Pulsation & LipiScan',
      category: 'Dry Eye Therapy',
      desc: 'Patented inner-eyelid thermal energy that unclogs blocked lipid meibomian glands within minutes.'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Page Header Banner */}
      <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-teal-500/20 shadow-xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider border border-teal-400/30 backdrop-blur-md shadow-inner">
            <Building2 className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>Center of Ophthalmic Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
            About <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">Rekha Eye Hospital</span> (REH)
          </h1>
          <p className="text-slate-200 text-base sm:text-xl max-w-3xl mx-auto font-normal leading-relaxed">
            25+ Years of Surgical Mastery, Compassionate Patient Care &amp; World-Class German Optical Laser Robotics.
          </p>
        </div>
      </section>

      {/* Hospital Stats Bar */}
      <section className="relative -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl">
          <div className="text-center space-y-1 border-r border-slate-100 last:border-0">
            <div className="text-3xl sm:text-4xl font-black text-teal-600 font-heading">25+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Years of Excellence</div>
            <div className="text-[11px] text-slate-500">Established 1999</div>
          </div>
          <div className="text-center space-y-1 border-r border-slate-100 last:border-0">
            <div className="text-3xl sm:text-4xl font-black text-teal-600 font-heading">50,000+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Successful Surgeries</div>
            <div className="text-[11px] text-slate-500">LASIK &amp; Cataract MICS</div>
          </div>
          <div className="text-center space-y-1 border-r border-slate-100 last:border-0">
            <div className="text-3xl sm:text-4xl font-black text-teal-600 font-heading">99.8%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Surgical Success Rate</div>
            <div className="text-[11px] text-slate-500">Zero-Infection Modular OTs</div>
          </div>
          <div className="text-center space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-teal-600 font-heading">100%</div>
            <div className="text-xs sm:text-sm font-bold text-slate-800">Cashless TPA Approved</div>
            <div className="text-[11px] text-slate-500">All Major Insurers &amp; CGHS</div>
          </div>
        </div>
      </section>

      {/* Founder Spotlight Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-14 border border-slate-200 shadow-xl grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-4 text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="relative inline-block rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
              <img
                src="/dr-rekha-sisodiya.jpg"
                alt="Dr. Rekha Sisodiya - Founder & Medical Director"
                className="w-72 h-96 sm:w-88 sm:h-[440px] object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl text-white border border-slate-700/80 text-left shadow-lg">
                <div className="font-black text-base text-white font-heading">Dr. Rekha Sisodiya</div>
                <div className="text-xs font-bold text-teal-400">Hospital Founder, Owner &amp; Chief Surgeon</div>
                <div className="text-[11px] text-slate-300 mt-0.5">MS (Ophthalmology) AIIMS &bull; Fellow London, UK</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
              <Award className="w-4 h-4 text-teal-600" />
              <span>Founder's Clinical Vision &amp; Philosophy</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-heading leading-tight">
              "Restoring crisp, vibrant sight is not just medicine — it is returning freedom, confidence, and quality of life."
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Dr. Rekha Sisodiya founded Rekha Eye Hospital in 1999 following her post-graduate master's degree from the apex medical institute of the country, <strong>All India Institute of Medical Sciences (AIIMS, New Delhi)</strong>, and her advanced surgical training at the prestigious <strong>Moorfields Eye Hospital, London</strong>.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
              Over the past two and a half decades, Dr. Sisodiya has personally performed over <strong>25,000+ blade-free Contoura LASIK and micro-incision sutureless cataract procedures</strong>, establishing REH as a premier center of clinical trust, surgical safety, and ethical medical care.
            </p>

            {/* Credentials Badges */}
            <div className="grid sm:grid-cols-2 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">Education</div>
                  <div className="font-black text-sm text-slate-900">MBBS, MS Ophthalmology (AIIMS New Delhi)</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase">International Fellowship</div>
                  <div className="font-black text-sm text-slate-900">Cornea &amp; Refractive Surgery (London, UK)</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                to="/book-appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-teal-600/25 transition-all transform hover:scale-105"
              >
                <span>Book Consultation with Dr. Rekha Sisodiya</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Leadership & Doctors Board Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
            <Users className="w-3.5 h-3.5 text-teal-600" />
            <span>Senior Medical Faculty</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
            Our Senior Board of Eye Surgeons
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            Every surgery at REH is led by board-certified super-specialists with thousands of successful clinical outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-72 overflow-hidden bg-slate-900">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                    {doc.badge}
                  </span>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-base font-black font-heading leading-tight">{doc.name}</div>
                    <div className="text-[11px] font-bold text-teal-300">{doc.role}</div>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="space-y-1 text-xs">
                    <div className="font-bold text-slate-900">{doc.degrees}</div>
                    <div className="text-slate-500 text-[11px]">{doc.fellowship}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-semibold text-teal-800">
                    {doc.specialty}
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 border-t border-slate-100 pt-2.5">
                    <span>{doc.experience}</span>
                    <span className="text-teal-700">{doc.surgeries}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  to="/book-appointment"
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-teal-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition-colors shadow"
                >
                  <span>Book with {doc.name.split(' ')[1]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Advanced Technology Suite */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
              <Microscope className="w-3.5 h-3.5 text-teal-600" />
              <span>World-Class Technology Suite</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
              German &amp; Swiss Laser Precision Robotics
            </h3>
            <p className="text-slate-600 text-sm sm:text-base">
              We invest in the highest echelon of ophthalmic diagnostic and surgical hardware to ensure 100% predictable, safe outcomes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techSuite.map((tech, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-lg transition-shadow space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="inline-block px-3 py-1 rounded-lg bg-teal-100 text-teal-800 text-[10px] font-black uppercase tracking-wider">
                    {tech.category}
                  </div>
                  <h4 className="text-base font-black text-slate-900 font-heading">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {tech.desc}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-xs font-bold text-teal-700 pt-2 border-t border-slate-200">
                  <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                  <span>Clinical Standard Verified</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Hospital Milestone Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold uppercase tracking-wider border border-teal-200">
            <Calendar className="w-3.5 h-3.5 text-teal-600" />
            <span>25-Year Journey</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
            Key Milestones in Our Clinical History
          </h3>
          <p className="text-slate-600 text-sm sm:text-base">
            How Rekha Eye Hospital evolved from a compassionate vision into a premier super-specialty eye destination.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-3 relative overflow-hidden group hover:border-teal-500 transition-colors"
            >
              <div className="text-3xl font-black text-teal-600 font-heading">{m.year}</div>
              <h4 className="text-lg font-black text-slate-900 font-heading">{m.title}</h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hospital Pillars & Accreditations */}
      <section className="py-16 bg-slate-900 text-white rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 my-8 shadow-2xl">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h3 className="text-2xl sm:text-4xl font-black text-white font-heading">
            Our Patient-First Quality Standards
          </h3>
          <p className="text-slate-300 text-sm sm:text-base">
            Ethical clinical guidelines, sterile German modular suites, and transparent pricing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-white font-heading">NABH Accredited</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Certified for supreme patient safety, infection control, and sterile air handling systems.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Microscope className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-white font-heading">German Laser Tech</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Carl Zeiss Lumera 700 microscopes and VisuMax femtosecond laser refractive suites.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Users className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-white font-heading">50,000+ Happy Eyes</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Over 25 years of trust from families across Rajasthan, Haryana, Delhi NCR and international visitors.
            </p>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="font-black text-base text-white font-heading">100% Cashless TPA</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Direct cashless settlement with all private TPAs, Star Health, HDFC Ergo, ICICI, CGHS &amp; ECHS.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
