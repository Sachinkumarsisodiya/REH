import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, HeartHandshake, FileText, CheckCircle2, Phone, CreditCard, ArrowRight, HelpCircle } from 'lucide-react';

export default function PatientGuidePage() {
  const insurancePartners = [
    'Star Health & Allied Insurance',
    'HDFC ERGO General Insurance',
    'ICICI Lombard Health Insurance',
    'Max Bupa / Niva Bupa Health',
    'Care Health Insurance (Religare)',
    'Bajaj Allianz General Insurance',
    'Tata AIG Health Insurance',
    'SBI General Insurance',
    'National Insurance Company',
    'New India Assurance Co.',
    'Oriental Insurance Company',
    'United India Insurance'
  ];

  const govtPanels = [
    'CGHS (Central Government Health Scheme)',
    'ECHS (Ex-Servicemen Contributory Health Scheme)',
    'ESIC (Employees State Insurance Corporation)',
    'Railway Health Scheme Empanelled',
    'State Govt. Health Scheme (Ayushman Bharat / PM-JAY)'
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
                  TPA &amp; Mediclaim Helpdesk
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Patient Guide &amp; <span className="text-teal-700">Cashless Insurance</span>
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                Hassle-free 100% cashless hospitalization and transparent pre-admission guidance for Cataract, LASIK, and Retinal surgeries with 30+ leading insurance partners.
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/book-appointment"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-teal-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
                >
                  <span>Check Insurance Eligibility</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+918000968676"
                  className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all"
                >
                  <span>📞 TPA Desk: +91 80009 68676</span>
                </a>
              </div>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-200 max-w-lg">
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-slate-900">30+ TPAs</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Cashless Empanelled</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-teal-700">0% EMI</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Easy Finance</div>
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-lg sm:text-xl font-black text-slate-900">Same-Day</div>
                  <div className="text-[11px] text-slate-500 font-semibold">Pre-Auth Approvals</div>
                </div>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group">
                <img
                  src="/images/banners/banner_patient_guide.jpg"
                  alt="Patient Guide & Cashless Insurance Desk"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 flex items-center justify-between text-xs shadow-md">
                  <span className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Dedicated TPA Assistance Desk</span>
                  </span>
                  <span className="text-teal-700 font-black text-[11px]">100% Cashless</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* 3 Steps to Cashless Claims */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 font-heading">
              How Cashless Admission Works at REH
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Our dedicated hospital TPA desk handles all paperwork and pre-authorization approvals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-4">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">1</div>
              <h3 className="font-black text-base text-slate-900 font-heading">Pre-Op Consultation</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consult with our eye surgeon. If surgery is advised, submit your health insurance card and Aadhaar ID at our TPA counter.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">2</div>
              <h3 className="font-black text-base text-slate-900 font-heading">Pre-Authorization</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our TPA team sends the cashless pre-auth request directly to your insurance company or TPA for approval within 2 to 4 hours.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black text-sm flex items-center justify-center">3</div>
              <h3 className="font-black text-base text-slate-900 font-heading">Painless Surgery &amp; Discharge</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Undergo your surgery with zero out-of-pocket stress. The insurance company settles the surgical bill directly with the hospital.
              </p>
            </div>
          </div>
        </div>

        {/* Empanelled Private Insurances */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-2 text-teal-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Empanelled Private Health Insurance TPAs</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {insurancePartners.map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Empanelled Government Panels */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center space-x-2 text-teal-800 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <span>Empanelled Government Panels &amp; Corporates</span>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {govtPanels.map((p, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Surgery Checklist */}
        <div className="bg-teal-900 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-4">
          <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
            Pre-Surgery Instructions for Day-Care Patients
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-teal-100">
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>Take your regular prescribed morning medications (Blood Pressure / Diabetes) with sips of water.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>Wash your face and hair before arrival. Do not apply any eye makeup, perfumes, or face creams.</span>
            </li>
            <li className="flex items-start space-x-2">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>Please arrive with one accompanying adult attendant for post-op discharge assistance.</span>
            </li>
          </ul>
        </div>

      </section>

    </div>
  );
}
