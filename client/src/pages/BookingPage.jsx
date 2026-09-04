import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BookingWizard from '../components/BookingWizard';
import { HeartPulse, Calendar, ShieldCheck, PhoneCall, MessageSquare } from 'lucide-react';

export default function BookingPage() {
  const [searchParams] = useSearchParams();
  const doctorIdParam = searchParams.get('doctor_id');

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-3 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-500/30">
            <HeartPulse className="w-3.5 h-3.5" />
            <span>Online Outpatient Scheduling</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
            Book Eye Specialist Consultation
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto font-normal">
            Choose your AIIMS eye specialist, select an available date &amp; time slot, and receive instant WhatsApp &amp; SMS confirmation.
          </p>
        </div>
      </section>

      {/* Booking Wizard Integration */}
      <div className="py-6">
        <BookingWizard selectedDoctorId={doctorIdParam ? parseInt(doctorIdParam) : undefined} />
      </div>

    </div>
  );
}
