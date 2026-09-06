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
      
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-teal-950 via-slate-900 to-cyan-950 text-white py-16 sm:py-24 relative overflow-hidden border-b border-teal-500/20 shadow-xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:20px_20px] opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black uppercase tracking-wider border border-teal-400/30 backdrop-blur-md shadow-inner">
            <HeartHandshake className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>TPA &amp; Mediclaim Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white">
            Patient Guide &amp; <span className="bg-gradient-to-r from-teal-300 via-cyan-200 to-white bg-clip-text text-transparent">Cashless Insurance</span>
          </h1>
          <p className="text-slate-200 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Hassle-free 100% cashless hospitalization and pre-admission guidance for Cataract, LASIK, and Retinal surgeries.
          </p>
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
