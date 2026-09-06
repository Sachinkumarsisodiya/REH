import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Clock, ArrowRight, ShieldAlert, Sparkles, UserCheck, 
  Stethoscope, ChevronRight, CheckCircle2, AlertTriangle, Play, 
  Pause, RotateCcw, Check, HelpCircle, Eye, Zap, Flame, 
  Crosshair, ShieldCheck, HeartPulse, Info, FileText, Download
} from 'lucide-react';

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState('articles'); // 'articles' | 'tools' | 'emergency' | 'faqs'
  
  // 20-20-20 Timer State
  const [secondsLeft, setSecondsLeft] = useState(20 * 60); // 20 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isRestPhase, setIsRestPhase] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (!isRestPhase) {
        setIsRestPhase(true);
        setSecondsLeft(20); // 20 seconds rest
      } else {
        setIsRestPhase(false);
        setSecondsLeft(20 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsLeft, isRestPhase]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // LASIK Candidacy Checker State
  const [lasikAge, setLasikAge] = useState('');
  const [lasikPowerStable, setLasikPowerStable] = useState('');
  const [lasikPregnant, setLasikPregnant] = useState('');
  const [lasikResult, setLasikResult] = useState(null);

  const calculateLasikEligibility = () => {
    if (!lasikAge || !lasikPowerStable || !lasikPregnant) return;
    const ageNum = parseInt(lasikAge, 10);
    if (ageNum >= 18 && ageNum <= 45 && lasikPowerStable === 'yes' && lasikPregnant === 'no') {
      setLasikResult({
        status: 'High Potential Candidate',
        type: 'success',
        text: 'You meet the preliminary primary clinical criteria for Blade-Free Femto LASIK or Contoura Vision! A detailed corneal topography (Pentacam) test at REH will verify corneal thickness and suitability.'
      });
    } else if (ageNum > 45) {
      setLasikResult({
        status: 'Presbyopia / Custom Refractive Consultation Recommended',
        type: 'warning',
        text: 'At age 45+, Presbyond laser or Premium Multifocal Lens Replacement (RLE) is generally recommended rather than standard LASIK.'
      });
    } else if (lasikPowerStable === 'no') {
      setLasikResult({
        status: 'Wait for Power Stabilization',
        type: 'info',
        text: 'Your spectacle number should remain unchanged for at least 1 year before undergoing laser vision correction.'
      });
    } else if (ageNum < 18) {
      setLasikResult({
        status: 'Under Age 18',
        type: 'info',
        text: 'Laser refractive procedures are performed after age 18 once eyeball physical growth has fully stabilized.'
      });
    } else {
      setLasikResult({
        status: 'Specialist Evaluation Required',
        type: 'info',
        text: 'We recommend booking an advanced corneal screening with Dr. Rekha Sisodiya or Dr. Kush.'
      });
    }
  };

  // Cataract Risk Screener State
  const [cataractSymptoms, setCataractSymptoms] = useState([]);
  const toggleSymptom = (item) => {
    setCataractSymptoms(prev => 
      prev.includes(item) ? prev.filter(s => s !== item) : [...prev, item]
    );
  };

  const articles = [
    {
      id: 1,
      title: 'The 20-20-20 Rule for Digital Eye Strain & Computer Vision Syndrome',
      author: 'Dr. Rekha Sisodiya',
      role: 'Founder & Chief Surgeon (AIIMS)',
      category: 'Preventative Eye Care',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600',
      summary: 'Staring continuously at digital screens reduces your natural blink rate from 15 times/min to just 5 times/min, causing rapid tear film evaporation and meibomian gland blockage.',
      takeaways: [
        'Every 20 minutes, look at an object 20 feet away for 20 seconds',
        'Use preservative-free lubricating drops if working > 6 hours on screens',
        'Position your computer screen 20-28 inches away, slightly below eye level'
      ]
    },
    {
      id: 2,
      title: 'Blade-Free Femto LASIK vs Contoura Vision vs ICL: Which Is Right For You?',
      author: 'Dr. Kush',
      role: 'Consultant Refractive Surgeon',
      category: 'Refractive Surgery',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600',
      summary: 'Modern refractive technology offers tailored solutions for every eye profile. Learn how topography-guided Contoura compares with high-myopia ICL phakic lenses.',
      takeaways: [
        'Contoura maps 22,000 corneal points for ultra-crisp 6/6 HD vision',
        'Femto LASIK is 100% blade-free with 24-hour rapid visual recovery',
        'ICL is ideal for high power up to -20D or corneas too thin for LASIK'
      ]
    },
    {
      id: 3,
      title: 'Modern Cataract Surgery: Choosing Between Monofocal, Toric & Trifocal IOLs',
      author: 'Dr. Rekha Sisodiya',
      role: 'Founder & Chief Surgeon',
      category: 'Cataract Care',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600',
      summary: 'Cataract surgery today is a 10-minute stitchless refractive procedure. Selecting the right intraocular lens (IOL) determines whether you will need reading glasses post-surgery.',
      takeaways: [
        'Monofocal IOLs give sharp distance vision; glasses needed for reading',
        'Toric IOLs simultaneously correct pre-existing corneal astigmatism',
        'Trifocal/Multifocal IOLs deliver complete spectacle freedom across all ranges'
      ]
    },
    {
      id: 4,
      title: 'Diabetic Retinopathy: Preventing Silent Retinal Damage in Diabetic Patients',
      author: 'Dr. Sachin Kumar Sisodiya',
      role: 'Senior Vitreo-Retina Surgeon',
      category: 'Retina & Diabetes',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=600',
      summary: 'Elevated blood sugar weakens the delicate micro-capillaries of your retina, leading to swelling (macular edema) or bleeding before any vision symptoms appear.',
      takeaways: [
        'All diabetic individuals need a dilated fundus checkup every 6 months',
        'Early Anti-VEGF injections prevent permanent macular vision loss',
        'Strict HbA1c control (< 7.0) slows retinopathy progression dramatically'
      ]
    },
    {
      id: 5,
      title: 'Glaucoma - The Silent Thief of Sight: Why IOP Screening Saves Optic Nerves',
      author: 'Dr. Bhavana',
      role: 'Consultant Glaucoma Specialist',
      category: 'Glaucoma Care',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&q=80&w=600',
      summary: 'Glaucoma causes gradual, irreversible peripheral visual field loss without causing pain or warning signs. Routine tonometry and RNFL OCT scans are vital after age 40.',
      takeaways: [
        'Normal eye pressure ranges between 10 to 21 mmHg',
        'Selective Laser Trabeculoplasty (SLT) provides safe non-invasive pressure reduction',
        'Glaucoma damage is irreversible, making early detection critical'
      ]
    },
    {
      id: 6,
      title: 'Halting Progressive Minus Power in School Children: The Myopia Control Protocol',
      author: 'Dr. Bhavana',
      role: 'Pediatric Ophthalmologist',
      category: 'Pediatric Care',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600',
      summary: 'With increasing screen exposure, childhood myopia is accelerating at alarming rates. Scientific therapies now exist to slow power progression by up to 60%.',
      takeaways: [
        'Encourage at least 2 hours of outdoor sunlight play daily',
        'Overnight Ortho-K lenses reshape cornea for daytime glasses-free vision',
        'Low-dose Atropine eye drops (0.01%) safely halt axial eye elongation'
      ]
    }
  ];

  const emergencyGuides = [
    {
      title: 'Chemical Acid / Alkali Splash in the Eye',
      urgency: 'Immediate Emergency (0-15 Mins)',
      color: 'red',
      dos: [
        'Flush the affected eye continuously with clean tap water or saline for 15-20 minutes without pausing.',
        'Keep eye wide open with clean fingers while rinsing.',
        'Rush immediately to REH 24x7 Emergency Trauma Unit.'
      ],
      donts: [
        'DO NOT rub or press the eyeball.',
        'DO NOT attempt to neutralize chemical with vinegar or milk.',
        'DO NOT delay rinsing to search for eye drops.'
      ]
    },
    {
      title: 'Metallic or Dust Foreign Body Particle in Eye',
      urgency: 'Urgent Care Required',
      color: 'amber',
      dos: [
        'Blink gently in a bowl of clean water to dislodge loose particles.',
        'Pull upper eyelid gently down over lower eyelid to allow tears to wash it out.',
        'Wear protective sunglasses and consult an eye surgeon immediately.'
      ],
      donts: [
        'DO NOT rub the eye with fingers or rough cloth (scratches cornea).',
        'DO NOT use tweezers, pins, or cotton buds on the cornea.',
        'DO NOT apply steroid drops without doctor prescription.'
      ]
    },
    {
      title: 'Sudden Curtain / Blackout or Bright Flashing Lights',
      urgency: 'Vitreo-Retinal Emergency',
      color: 'purple',
      dos: [
        'Rest with head elevated and limit sudden jerky movements.',
        'Undergo an urgent dilated indirect ophthalmoscopy within 12-24 hours.',
        'Bring prior medical records, spectacles, and diabetic history.'
      ],
      donts: [
        'DO NOT ignore sudden shower of floaters or lightning flashes.',
        'DO NOT engage in heavy weight-lifting or vigorous exercise.'
      ]
    }
  ];

  const faqs = [
    {
      q: 'How often should adults and children get their eyes examined?',
      a: 'Healthy adults aged 18-40 should get a comprehensive checkup every 2 years. Individuals above 40, diabetics, hypertensives, and children should undergo an annual dilated eye examination.'
    },
    {
      q: 'Can spectacle power come back after LASIK surgery?',
      a: 'LASIK permanently reshapes the corneal curvature. In over 98% of cases with stable pre-op prescriptions, the results last for a lifetime. Natural age-related reading glass power (presbyopia) after age 45 is a lens change unrelated to LASIK.'
    },
    {
      q: 'Is cataract surgery covered by health insurance and CGHS / ECHS?',
      a: 'Yes, cataract surgery and premium IOLs are covered under cashless health insurance policies by all private TPAs as well as government panels (CGHS, ECHS, State Govt schemes).'
    },
    {
      q: 'What are the early warning symptoms of Glaucoma?',
      a: 'Glaucoma is often symptomless in early stages. Later symptoms include gradual loss of side (peripheral) vision, halo rings around lights, severe eye pain with nausea, and blurred vision.'
    },
    {
      q: 'How does LipiFlow help chronic dry eyes?',
      a: 'LipiFlow delivers gentle therapeutic heat (42.5°C) and pulsating pressure to the inner eyelid surfaces, safely liquefying and evacuating clogged oil in the Meibomian glands.'
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Professional Medical Header Banner */}
      <section className="bg-gradient-to-r from-teal-50/80 via-white to-slate-50 border-b border-slate-200/90 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-2.5">
                <span className="w-8 h-1 bg-teal-600 rounded-full"></span>
                <span className="text-teal-800 font-extrabold uppercase tracking-wider text-xs sm:text-sm">
                  Interactive Clinical Eye Health Hub
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Doctor-Approved <span className="text-teal-700">Eye Health &amp; Diagnostics</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Clinical guides, self-screening interactive tools, and emergency first-aid protocols curated by Chief Surgeon <strong className="text-slate-900">Dr. Rekha Sisodiya</strong> and the REH medical faculty.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('tools')}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Interactive Eye Test Tools</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTab('articles')}
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all"
                >
                  <span>Read Articles</span>
                </button>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 max-w-lg">
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-slate-900">100%</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Doctor Reviewed</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-teal-700">Free</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Self-Screening Tools</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-slate-900">24x7</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Trauma Protocols</div>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="/images/banners/banner_blog.jpg"
                  alt="Doctor-Approved Eye Health & Diagnostics"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 flex items-center justify-between text-xs shadow-md">
                  <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Evidence-Based Guidance</span>
                  </span>
                  <span className="text-teal-700 font-black text-[11px]">REH Health Desk</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xl flex items-center justify-center space-x-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('articles')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'articles'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Clinical Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'tools'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Interactive Vision Tools &amp; Screener
          </button>
          <button
            onClick={() => setActiveTab('emergency')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'emergency'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Emergency First-Aid Guide
          </button>
          <button
            onClick={() => setActiveTab('faqs')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
              activeTab === 'faqs'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            Ophthalmic FAQs
          </button>
        </div>
      </div>

      {/* TAB 1: CLINICAL ARTICLES */}
      {activeTab === 'articles' && (
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Founder Advisory Header Box */}
          <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-teal-800 shadow-xl flex flex-col md:flex-row items-center gap-6 sm:gap-10">
            <div className="relative shrink-0">
              <img
                src="/dr-rekha-sisodiya.jpg"
                alt="Dr. Rekha Sisodiya"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover object-top border-4 border-teal-500 shadow-2xl"
              />
              <span className="absolute -bottom-2.5 -right-2 px-3 py-0.5 rounded-full bg-teal-500 text-slate-950 text-[10px] font-black uppercase">
                Founder
              </span>
            </div>
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-300">
                Medical Director's Clinical Note
              </div>
              <h2 className="text-xl sm:text-3xl font-black font-heading leading-tight">
                "Up to 80% of visual impairment is preventable with timely ophthalmic diagnosis."
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                — <strong>Dr. Rekha Sisodiya</strong> (MBBS, MS Ophthalmology AIIMS New Delhi, Fellow London &bull; Founder, Rekha Eye Hospital)
              </p>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 overflow-hidden bg-slate-900">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {art.category}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-[11px] font-bold">
                      <span className="text-teal-300">{art.author}</span>
                      <span className="flex items-center space-x-1 text-slate-300">
                        <Clock className="w-3 h-3" />
                        <span>{art.readTime}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-base font-black text-slate-900 font-heading leading-snug group-hover:text-teal-700 transition-colors">
                      {art.title}
                    </h3>
                    
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {art.summary}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-black uppercase text-slate-400">Key Clinical Takeaways</div>
                      {art.takeaways.map((t, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-[11px] text-slate-700">
                          <Check className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5 stroke-[3]" />
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to="/book-appointment"
                    className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-teal-600 hover:text-white text-teal-800 font-black text-xs flex items-center justify-center space-x-1.5 transition-colors border border-slate-200"
                  >
                    <span>Consult Dr. Rekha for This Condition</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </section>
      )}

      {/* TAB 2: INTERACTIVE CLINICAL TOOLS & SCREENERS */}
      {activeTab === 'tools' && (
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
          
          {/* Tool 1: 20-20-20 Interactive Screen Strain Timer */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Interactive Clinical Timer</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                20-20-20 Digital Screen Fatigue &amp; Blink Timer
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Keep this live timer running while working on your computer or laptop. Every 20 minutes, take a 20-second break to gaze at something 20 feet away to relax your ciliary ocular muscles.
              </p>

              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-xs space-y-1 text-teal-900 font-semibold">
                <div>&bull; <strong>Phase 1:</strong> 20 Minutes Focus Work Mode</div>
                <div>&bull; <strong>Phase 2:</strong> 20 Seconds Far Distance Gaze Relaxation Mode</div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 space-y-6">
              <div className="text-xs font-black uppercase tracking-widest text-teal-400">
                {isRestPhase ? '🌿 Rest Phase: Gaze 20 Feet Away!' : '💻 Work Phase: Screen Mode'}
              </div>

              <div className={`text-6xl sm:text-7xl font-black font-heading tracking-tight ${isRestPhase ? 'text-emerald-400 animate-pulse' : 'text-white'}`}>
                {formatTime(secondsLeft)}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`px-8 py-3 rounded-full font-black text-xs sm:text-sm flex items-center space-x-2 shadow-lg transition-all ${
                    isTimerRunning
                      ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                  }`}
                >
                  {isTimerRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Timer</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Start 20-Min Timer</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setIsRestPhase(false);
                    setSecondsLeft(20 * 60);
                  }}
                  className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Tool 2: LASIK Candidacy Instant Self-Checker */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                <Zap className="w-3.5 h-3.5 text-teal-600" />
                <span>Refractive Suitability Checker</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                Instant LASIK &amp; Contoura Candidacy Quiz
              </h3>
              <p className="text-slate-600 text-sm">
                Answer 3 quick clinical questions to check if you qualify for blade-free laser spectacle removal.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-700">1. What is your age?</label>
                <input
                  type="number"
                  placeholder="e.g. 24"
                  value={lasikAge}
                  onChange={(e) => setLasikAge(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm font-bold text-slate-900"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-700">2. Is your spectacle power stable for 1 year?</label>
                <select
                  value={lasikPowerStable}
                  onChange={(e) => setLasikPowerStable(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm font-bold text-slate-900 bg-white"
                >
                  <option value="">Select Option</option>
                  <option value="yes">Yes (Power is Stable)</option>
                  <option value="no">No (Power has changed)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-700">3. Currently pregnant or nursing?</label>
                <select
                  value={lasikPregnant}
                  onChange={(e) => setLasikPregnant(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:outline-none text-sm font-bold text-slate-900 bg-white"
                >
                  <option value="">Select Option</option>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>

            <div>
              <button
                onClick={calculateLasikEligibility}
                className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-teal-600 text-white font-black text-xs sm:text-sm shadow-md transition-colors"
              >
                Check My LASIK Candidacy Now
              </button>
            </div>

            {lasikResult && (
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 animate-fadeIn">
                <div className="flex items-center space-x-2 text-sm font-black text-teal-800">
                  <CheckCircle2 className="w-5 h-5 text-teal-600" />
                  <span>{lasikResult.status}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {lasikResult.text}
                </p>
                <div className="pt-2">
                  <Link
                    to="/book-appointment"
                    className="inline-flex items-center space-x-1.5 text-xs font-black text-teal-700 hover:text-teal-800"
                  >
                    <span>Book Pentacam Corneal Topography Scan at REH</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Tool 3: Cataract Symptom Risk Checklist */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-6">
            <div className="max-w-2xl space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                <Eye className="w-3.5 h-3.5 text-teal-600" />
                <span>Symptom Risk Assessment</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
                Cataract &amp; Vision Health Self-Screener
              </h3>
              <p className="text-slate-600 text-sm">
                Check any symptoms you or your family members are currently experiencing:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'Cloudy, foggy, or blurred vision',
                'Glare or starbursts around night headlights',
                'Colors looking faded or yellowish',
                'Frequent spectacle power prescription changes',
                'Double vision in one single eye',
                'Difficulty reading in normal light'
              ].map((sym, idx) => {
                const isSelected = cataractSymptoms.includes(sym);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleSymptom(sym)}
                    className={`p-4 rounded-2xl text-left text-xs font-bold transition-all border flex items-start space-x-2.5 ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-600 shadow-md'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                    <span>{sym}</span>
                  </button>
                );
              })}
            </div>

            {cataractSymptoms.length > 0 && (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 animate-fadeIn">
                <div className="font-black text-sm flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Clinical Assessment: {cataractSymptoms.length} Key Symptoms Identified</span>
                </div>
                <p className="text-xs text-amber-800">
                  These symptoms strongly indicate natural crystalline lens changes (early to moderate cataract). A painless 10-minute slit-lamp examination and Zeiss IOLMaster biometry at REH will determine the ideal treatment.
                </p>
              </div>
            )}
          </div>

        </section>
      )}

      {/* TAB 3: EMERGENCY FIRST-AID GUIDE */}
      {activeTab === 'emergency' && (
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-red-100 text-red-800 text-xs font-black uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-red-600" />
              <span>24x7 Ophthalmic Emergency Protocol</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
              Immediate First-Aid for Acute Eye Emergencies
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Follow these immediate doctor-verified clinical protocols before rushing to REH Trauma Suite.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {emergencyGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                      {guide.urgency}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 font-heading pt-2">
                      {guide.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase text-teal-700 flex items-center space-x-1.5">
                      <Check className="w-4 h-4 text-teal-600 stroke-[3]" />
                      <span>DO IMMEDIATELY:</span>
                    </div>
                    {guide.dos.map((item, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start space-x-2 bg-teal-50/50 p-2.5 rounded-xl border border-teal-100">
                        <span className="text-teal-600 font-bold">&bull;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs font-black uppercase text-red-700 flex items-center space-x-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-600" />
                      <span>NEVER DO:</span>
                    </div>
                    {guide.donts.map((item, i) => (
                      <div key={i} className="text-xs text-slate-700 flex items-start space-x-2 bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                        <span className="text-red-600 font-bold">&bull;</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href="tel:+917733866682"
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-lg shadow-red-600/20"
                  >
                    <HeartPulse className="w-4 h-4" />
                    <span>Call 24x7 REH Emergency Desk</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* TAB 4: CLINICAL FAQS */}
      {activeTab === 'faqs' && (
        <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
          
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 font-heading">
              Frequently Asked Ophthalmic Questions
            </h2>
            <p className="text-slate-600 text-sm">
              Answers verified by Hospital Founder Dr. Rekha Sisodiya and the clinical team.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2 hover:border-teal-500 transition-colors"
              >
                <div className="font-black text-base text-slate-900 flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 pl-8 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </section>
      )}

      {/* Persistent Bottom Consultation CTA */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-black font-heading">
              Have Specific Questions About Your Eye Health?
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
              Book a comprehensive 12-step eye evaluation with Dr. Rekha Sisodiya or her senior surgical team at Rekha Eye Hospital.
            </p>
          </div>

          <Link
            to="/book-appointment"
            className="px-8 py-4 rounded-full bg-slate-950 hover:bg-white hover:text-slate-950 text-white font-black text-xs sm:text-sm shadow-xl transition-all transform hover:scale-105 shrink-0"
          >
            Book Consultation Today
          </Link>
        </div>
      </section>

    </div>
  );
}
