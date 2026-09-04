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
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-16 sm:py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>TPA &amp; Mediclaim Helpdesk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Patient Guide &amp; Cashless Insurance
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-normal">
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
