import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Eye, Zap, Shield, Sparkles, Activity, Baby, Stethoscope, 
  Layers, Check, ArrowRight, Clock, ShieldCheck, HelpCircle,
  Flame, Sparkle, HeartPulse, Brain, Crosshair
} from 'lucide-react';

export default function TreatmentsPage() {
  const [activeTab, setActiveTab] = useState('lasik');

  const treatments = [
    {
      id: 'lasik',
      icon: Zap,
      title: 'Blade-Free Femto LASIK & Contoura Vision',
      subtitle: 'Permanent Spectacle & Contact Lens Removal in 10 Minutes',
      duration: '15 Mins Total Procedure',
      recovery: '24 Hours Recovery',
      tag: 'Most Popular',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800',
      description: 'Contoura Vision is a topography-guided laser refractive surgery that maps 22,000 unique elevation points on your cornea. Utilizing 100% blade-free German femtosecond laser technology, it reshapes the corneal curvature without pain, cuts, or stitches to deliver superior 6/6 HD visual sharpness.',
      benefits: [
        '100% Blade-Free & Painless Laser Technique',
        '6/6 HD Visual Acuity Outcome within 24 Hours',
        'Custom Wavefront Mapping for Night Glare & Halo Prevention',
        'FDA-Approved German Carl Zeiss VisuMax Technology',
        'No Bandages, Injections or Hospital Stay Required'
      ],
      candidacy: 'Ideal for individuals aged 18+ with stable vision power (-0.5D to -10.0D / astigmatism up to -5.0D) and adequate corneal thickness.',
      faqs: [
        { q: 'Is LASIK surgery painful?', a: 'No, numbing anesthetic eye drops are administered before the procedure. You will only feel light pressure for about 20 seconds.' },
        { q: 'When can I resume office work or laptop screens?', a: 'Most patients comfortably resume desk work, smartphone, and laptop use within 24 to 48 hours post-procedure.' }
      ]
    },
    {
      id: 'cataract',
      icon: Eye,
      title: 'Micro-Incision Cataract Surgery (MICS)',
      subtitle: 'Premium Toric, Multifocal & Trifocal IOL Implantation',
      duration: '10 Mins Day-Care Surgery',
      recovery: 'Same-Day Home Discharge',
      tag: 'Zero Stitch',
      image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800',
      description: 'MICS is an advanced phacoemulsification technique where the cloudy natural lens is gently emulsified through a sub-2.0mm micro-incision. A premium foldable Intraocular Lens (IOL) is then inserted to restore youthful distance, intermediate, and near vision without glasses.',
      benefits: [
        'Micro 1.8mm Incision with Zero Stitches or Injections',
        'Complete Glass-Free Living with Trifocal & Toric IOLs',
        'Carl Zeiss IOLMaster 700 High-Precision Biometry',
        'Walk-in Walk-out Procedure (Same-Day Discharge)',
        'Cashless Mediclaim Settlement Approved by All TPAs'
      ],
      candidacy: 'Patients with cloudy vision, blurry glare while driving at night, or frequent spectacle power changes due to age-related or diabetic cataract.',
      faqs: [
        { q: 'What is the difference between Monofocal and Multifocal IOL?', a: 'Monofocal lenses provide crisp distance vision (reading glasses needed for near), whereas Multifocal/Trifocal lenses eliminate spectacles for distance, computer, and reading.' }
      ]
    },
    {
      id: 'icl',
      icon: Sparkle,
      title: 'ICL Phakic Lens Implants (EVO+ Visian)',
      subtitle: 'Spectacle Freedom for Extreme Myopia (-20D) & Thin Corneas',
      duration: '15 Mins Quick Procedure',
      recovery: '24-48 Hours Healing',
      tag: 'High Myopia Solution',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      description: 'The Implantable Collamer Lens (ICL) is a biocompatible intraocular lens surgically placed in front of the natural crystalline lens. It provides permanent spectacle independence for patients with high refractive errors or thin corneas ineligible for LASIK laser.',
      benefits: [
        'Ideal for Extreme Minus Power from -0.5D up to -20.0D',
        'Zero Corneal Tissue Removal or Thinning',
        '100% Reversible Implantation (Lens Can Be Removed Anytime)',
        'Built-in Collamer UV Sun Protection Block',
        'Exceptional Night Vision with Zero Dry Eye Risk'
      ],
      candidacy: 'Individuals aged 18 to 45 with high myopia, high astigmatism, or corneas too thin for laser ablation.',
      faqs: [
        { q: 'Is ICL visible from the outside?', a: 'No, the ICL sits behind the iris and is completely invisible to you and others.' }
      ]
    },
    {
      id: 'dryeye',
      icon: Flame,
      title: 'Dry Eye Spa & LipiFlow Thermal Pulsation',
      subtitle: 'Clinical Relief for Computer Screen Fatigue & MGD',
      duration: '30 Mins Outpatient Therapy',
      recovery: 'Immediate Soothing',
      tag: 'Tech & Lifestyle Care',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800',
      description: 'Over 86% of dry eye cases stem from Meibomian Gland Dysfunction (blocked oil glands in the eyelids). REH Dry Eye Clinic combines automated LipiScan diagnostic gland imaging, LipiFlow thermal pulsation, and Intense Pulsed Light (IPL) to unclog glands and restore natural tear film stability.',
      benefits: [
        'Non-Invasive Diagnostic Tear Osmolarity & Meibomian Scan',
        'LipiFlow Thermal Pulsation Unclogs Blocked Lipid Glands',
        'Intense Pulsed Light (IPL) Reduces Peri-Ocular Inflammation',
        'Long-lasting Relief from Redness, Grittiness & Burning',
        'Customized Screen-Work Lubricant & Eye Rest Protocols'
      ],
      candidacy: 'Software professionals, students, contact lens users, and post-menopausal individuals suffering from chronic eye fatigue or burning.',
      faqs: [
        { q: 'How long do the results of LipiFlow last?', a: 'A single 12-minute session per eye provides sustained comfort and glandular health for 1 to 2 years when paired with good screen hygiene.' }
      ]
    },
    {
      id: 'retina',
      icon: Activity,
      title: 'Vitreo-Retina & Diabetic Eye Care',
      subtitle: 'OCT Diagnostics, Anti-VEGF & 25G Micro-Vitrectomy',
      duration: 'Specialist Monitored',
      recovery: 'Outpatient Care',
      tag: 'Sub-Specialty',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      description: 'The retina is the light-sensitive neural tissue at the back of the eye. REH offers comprehensive diagnosis and laser treatment for diabetic retinopathy, macular degeneration, retinal vein occlusions, and retinal detachment.',
      benefits: [
        'High-Resolution Spectralis Spectral Domain OCT Imaging',
        'Intravitreal Anti-VEGF Injections (Lucentis, Eylea, Accentrix)',
        'Sutureless 23G/25G Micro-Vitrectomy Surgical Suites',
        'Argon Green Laser Photocoagulation for Retinal Tears'
      ],
      candidacy: 'Diabetic patients, individuals experiencing sudden flashes of light, floaters, dark curtains in vision, or central vision distortion.',
      faqs: [
        { q: 'How often should diabetic patients get their retina checked?', a: 'All diabetic individuals must undergo a dilated fundus eye checkup at least once every 6 months.' }
      ]
    },
    {
      id: 'glaucoma',
      icon: Shield,
      title: 'Glaucoma Detection & Selective Laser Therapy',
      subtitle: 'Preserving Optic Nerve Health & Visual Fields',
      duration: 'OPD Screening & Laser',
      recovery: 'Immediate',
      tag: 'Preventative',
      image: 'https://images.unsplash.com/photo-1583912267670-6575ad472688?auto=format&fit=crop&q=80&w=800',
      description: 'Glaucoma (the silent thief of sight) causes irreversible optic nerve damage due to elevated eye pressure. REH utilizes Humphrey Field Analyzers and Selective Laser Trabeculoplasty (SLT) to maintain optimal intraocular pressure.',
      benefits: [
        'Humphrey Visual Field Analyzer (HFA III) Perimetry',
        'Selective Laser Trabeculoplasty (SLT) - Non-Invasive',
        'Non-Contact Goldmann Applanation Tonometry',
        'RNFL & Ganglion Cell Complex OCT Thickness Analysis'
      ],
      candidacy: 'Individuals above 40 years, those with high myopia, diabetes, or a family history of glaucoma.',
      faqs: [
        { q: 'Can vision lost to glaucoma be restored?', a: 'Glaucoma damage is irreversible, which makes early detection and regular monitoring essential to preserve remaining sight.' }
      ]
    },
    {
      id: 'myopia',
      icon: Crosshair,
      title: 'Pediatric Myopia Control & Orthokeratology (Ortho-K)',
      subtitle: 'Halting Progressive Minus Power in Children',
      duration: 'Ongoing Therapy & Clinic Visits',
      recovery: 'Non-Invasive',
      tag: 'Pediatric Innovation',
      image: 'https://images.unsplash.com/photo-1579684453423-f84349ef60b0?auto=format&fit=crop&q=80&w=800',
      description: 'Myopia (short-sightedness) is accelerating rapidly among school-going children due to screen time. REH provides scientific evidence-based myopia control protocols including overnight Ortho-K reshaping lenses, Defocus lenses, and low-dose Atropine therapy to slow power progression by up to 60%.',
      benefits: [
        'Ortho-K Lenses Worn at Night for 100% Clear Daytime Vision Without Glasses',
        'Low-Dose Atropine Eye Drop Therapy (0.01% - 0.05%)',
        'Optical Biometry Axial Length Progression Tracking',
        'Custom D.I.M.S. & MyoSmart Pediatric Spectacle Lenses'
      ],
      candidacy: 'Children aged 6 to 16 experiencing rapid increases in minus spectacle prescription each year.',
      faqs: [
        { q: 'Is Ortho-K safe for children?', a: 'Yes, Ortho-K lenses are FDA-approved, highly oxygen-permeable, and completely safe under pediatric ophthalmologist supervision.' }
      ]
    },
    {
      id: 'pediatric',
      icon: Baby,
      title: 'Pediatric Ophthalmology & Squint Surgery',
      subtitle: 'Gentle Vision Care for Infants & Children',
      duration: 'Child-Friendly Clinic',
      recovery: 'Non-Invasive Focus',
      tag: 'Pediatric Care',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800',
      description: 'Dedicated pediatric eye clinic focused on early detection of refractive errors, amblyopia (lazy eye) patching therapy, congenital squint alignment surgery, and pediatric cataracts.',
      benefits: [
        'Child-Friendly Non-Threatening Diagnostic Lounge',
        'Amblyopia Occlusion & Vision Stimulation Therapy',
        'Precision Extraocular Muscle Alignment Squint Surgery',
        'Congenital Cataract Removal with Pediatric IOLs'
      ],
      candidacy: 'Children with crossed eyes, squinting, frequent head tilting, or poor school visual performance.',
      faqs: [
        { q: 'At what age should a child have their first eye exam?', a: 'Every child should have their first comprehensive eye exam at 6 months, 3 years, and before entering kindergarten.' }
      ]
    },
    {
      id: 'cornea',
      icon: Layers,
      title: 'Cornea Transplant & Keratoconus (C3R)',
      subtitle: 'Full & Lamellar Transplants (DSEK/DALK) & Cross-Linking',
      duration: 'Specialized Suite',
      recovery: 'Specialist Monitored',
      tag: 'Corneal Sub-Specialty',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800',
      description: 'REH Cornea Center provides cutting-edge medical and surgical solutions for conical corneas (keratoconus), corneal dystrophies, and scars through C3R cross-linking, DSEK, DMEK, and optical penetrating keratoplasty.',
      benefits: [
        'Corneal Collagen Cross-Linking (C3R with Riboflavin)',
        'Sutureless Lamellar Transplants (DSEK / DMEK)',
        'Rigid Gas Permeable (RGP) & Custom Scleral Contact Lenses',
        'Corneal Topography Pentacam HR Mapping'
      ],
      candidacy: 'Patients with keratoconus, corneal opacity, bullous keratopathy, or progressive irregular astigmatism.',
      faqs: [
        { q: 'Can keratoconus be stopped from worsening?', a: 'Yes, C3R (corneal cross-linking) strengthens corneal collagen fibers and halts further conical bulging in over 95% of cases.' }
      ]
    },
    {
      id: 'neuro',
      icon: Brain,
      title: 'Neuro-Ophthalmology & Optic Nerve Pathway',
      subtitle: 'Visual Pathway, Diplopia & Optic Neuritis Diagnosis',
      duration: 'Comprehensive Diagnostic Protocol',
      recovery: 'Specialist Monitored',
      tag: 'Neuro-Ocular Care',
      image: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800',
      description: 'Neuro-ophthalmology bridges the eye and brain. Our unit diagnoses and manages visual pathway disorders including optic neuritis, ischemic optic neuropathy, intracranial pressure changes (papilledema), unexplained visual field loss, and cranial nerve palsies causing double vision.',
      benefits: [
        'Automated Visual Field Testing (Perimetry)',
        'Optic Nerve RNFL OCT Thickness Profiling',
        'Color Vision & Contrast Sensitivity Testing',
        'Coordinated Care with Neurologists & MRI Neuroimaging'
      ],
      candidacy: 'Patients suffering from sudden painful vision drop, persistent double vision, unequal pupil size, or optic disc swelling.',
      faqs: [
        { q: 'What is Optic Neuritis?', a: 'Optic neuritis is inflammation of the optic nerve causing vision loss and pain with eye movement, frequently requiring prompt pulse steroid therapy.' }
      ]
    },
    {
      id: 'oculoplasty',
      icon: Sparkles,
      title: 'Oculoplasty & Aesthetic Eye Surgery',
      subtitle: 'Ptosis Repair, Blepharoplasty & Tear Duct Restoration',
      duration: 'Day Care Surgery',
      recovery: 'Fast Healing',
      tag: 'Aesthetic & Reconstructive',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800',
      description: 'Reconstructive and cosmetic surgical procedures for drooping eyelids (ptosis), blocked tear ducts (laser DCR), eyelid lesions, facial spasms, and aesthetic eyelid contour rejuvenation.',
      benefits: [
        'Cosmetic Blepharoplasty for Puffy Under-Eye Bags',
        'Endonasal Laser DCR for Watery Eye Tear Duct Blockage',
        'Ptosis Correction for Drooping Upper Eyelids',
        'Botox Injections for Blepharospasm & Hemifacial Spasms'
      ],
      candidacy: 'Patients with restricted upper visual field due to drooping lids, continuous tearing/watering eyes, or eyelid malpositions.',
      faqs: [
        { q: 'Will there be scars after eyelid surgery?', a: 'Incisions are made in the natural eyelid skin creases, making scars virtually invisible once healed.' }
      ]
    },
    {
      id: 'trauma',
      icon: HeartPulse,
      title: '24x7 Ocular Trauma & Emergency foreign Body Care',
      subtitle: 'Immediate Surgical Triage for Eye Injuries',
      duration: '24x7 Round-The-Clock',
      recovery: 'Emergency Triage',
      tag: '24x7 Emergency',
      image: 'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=800',
      description: 'Our 24x7 emergency ophthalmic trauma unit handles immediate surgical repairs of corneal lacerations, hyphema, chemical acid/alkali eye burns, and intraocular foreign body removals.',
      benefits: [
        'Dedicated 24x7 On-Duty Ophthalmic Surgical Team',
        'Sterile Corneal Micro-Suture Repair Protocol',
        'Emergency Eye Chemical Wash & Neutralization Suite',
        'Fast-Track Admission & Cashless TPA Support'
      ],
      candidacy: 'Any sudden physical injury, metallic particle in eye, corrosive chemical splash, or sudden total blackout of vision.',
      faqs: [
        { q: 'What should I do immediately after a chemical splash in the eye?', a: 'Do not rub. Flush your eye continuously with clean tap water for 15-20 minutes and rush immediately to REH emergency.' }
      ]
    }
  ];

  const current = treatments.find(t => t.id === activeTab) || treatments[0];

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Super-Specialty Clinical Directory</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Clinical Treatments &amp; Laser Surgeries
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
            NABH-accredited ophthalmic procedures backed by AIIMS-trained surgeons, Zeiss laser robotics, and sterile Class-100 Modular OTs.
          </p>
        </div>
      </section>

      {/* Main Tabbed Interactive Treatment Showcase */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2.5 overflow-x-auto pb-4 scrollbar-none mb-8">
          {treatments.map((t) => {
            const Icon = t.icon;
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border shrink-0 ${
                  isActive
                    ? 'bg-teal-600 text-white border-teal-600 shadow-lg shadow-teal-600/30 scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.title.split('&')[0].split('(')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Treatment Detail Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8 animate-fadeIn">
          
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                <span>{current.tag}</span>
                <span>&bull;</span>
                <span>{current.duration}</span>
                <span>&bull;</span>
                <span>{current.recovery}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 font-heading">
                {current.title}
              </h2>
              <div className="text-sm font-bold text-teal-700">{current.subtitle}</div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {current.description}
              </p>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                <span className="font-bold text-slate-900 block">Patient Eligibility:</span>
                <p>{current.candidacy}</p>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950">
                <img
                  src={current.image}
                  alt={current.title}
                  className="w-full h-72 sm:h-80 object-cover object-center"
                />
              </div>
            </div>

          </div>

          {/* Benefits Grid */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Clinical Benefits &amp; Technology Highlights
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {current.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start space-x-2.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm font-semibold text-slate-800">
                  <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5 stroke-[3]" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {current.faqs && current.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Frequently Asked Clinical Questions
              </h3>
              <div className="space-y-2.5">
                {current.faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-1 text-xs sm:text-sm">
                    <div className="font-bold text-slate-900 flex items-center space-x-2">
                      <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>{faq.q}</span>
                    </div>
                    <p className="text-slate-600 pl-6">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              Cashless Mediclaim Approved &bull; 24x7 Post-Op Support &bull; Call: +91 7733866682
            </div>

            <Link
              to="/book-appointment"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-teal-600/30 flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
            >
              <span>Book Consultation for this Treatment</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </section>

    </div>
  );
}
