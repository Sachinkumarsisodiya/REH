import React, { useState } from 'react';
import { X, AlertTriangle, Send, Check, MessageSquare, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

const PRESET_REASONS = [
  "Doctor is on urgent emergency surgery duty during this time slot.",
  "Doctor is unavailable / on medical leave on this date.",
  "Selected time slot is overbooked due to emergency OT schedule.",
  "Patient requested appointment cancellation via phone call.",
  "Clinical department closed for routine equipment calibration."
];

export default function CancelModal({ appointment, token, onClose, onSuccess }) {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_REASONS[0]);
  const [customReason, setCustomReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!appointment) return null;

  const finalReason = customReason.trim() || selectedPreset;
  const docName = appointment.doctor_name || 'Eye Specialist';

  const previewMessage = `REKHA EYE HOSPITAL (REH)
Dear ${appointment.patient_name},

Your consultation appointment (#REH-${appointment.id}) with ${docName} scheduled for ${appointment.appointment_date} at ${appointment.appointment_time} has been CANCELLED.

📌 Cancellation Reason:
${finalReason}

🔄 What to do next:
• Please choose an alternate date/slot online at our booking portal
• Or call our 24x7 clinical desk helpline: +91 7733866682 for priority rescheduling

Rekha Eye Hospital & Lasik Center`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!finalReason) {
      toast.error('Please specify a cancellation reason.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments/${appointment.id}/reject`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ reason: finalReason })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Appointment #REH-${appointment.id} cancelled. WhatsApp advisory sent to ${appointment.patient_phone}.`);
        onSuccess();
        onClose();
      } else {
        toast.error(data.error || 'Failed to cancel appointment.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while cancelling appointment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Card with Strict Max Height and Fixed Footer */}
      <div className="bg-slate-900 border border-red-500/40 rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col shadow-2xl shadow-red-950/50 overflow-hidden">
        
        {/* Header (Fixed at top) */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black font-heading text-white">Cancel Consultation</h3>
              <p className="text-[11px] text-slate-400">
                #REH-{appointment.id} &bull; <span className="text-white font-semibold">{appointment.patient_name}</span> (+91 {appointment.patient_phone})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form id="cancel-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-xs">
          
          {/* Quick Doctor & Schedule Badge */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-2">
            <div>
              <span className="text-slate-400">Doctor: </span>
              <span className="font-bold text-teal-300">{docName}</span>
            </div>
            <div>
              <span className="text-slate-400">Time: </span>
              <span className="font-mono font-bold text-white">{appointment.appointment_date} @ {appointment.appointment_time}</span>
            </div>
          </div>

          {/* Quick Preset Reasons Dropdown/Pills */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Select Preset Cancellation Reason:</span>
            </label>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {PRESET_REASONS.map((reason, idx) => {
                const isSelected = selectedPreset === reason && !customReason;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedPreset(reason);
                      setCustomReason('');
                    }}
                    className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-red-950/60 border-red-500 text-red-200 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <span className="leading-snug">{reason}</span>
                    {isSelected && <Check className="w-4 h-4 text-red-400 shrink-0 ml-2" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Reason Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Or Type Custom Reason:
            </label>
            <textarea
              rows={2}
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="e.g. Doctor is out of station / emergency OT case..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-red-500 transition-colors"
            />
          </div>

          {/* Live WhatsApp Message Preview */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center space-x-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Message Preview (Dispatched Automatically)</span>
            </label>
            <pre className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-[10px] font-sans text-slate-300 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto">
              {previewMessage}
            </pre>
          </div>

        </form>

        {/* Sticky Action Footer (Always Visible at Bottom) */}
        <div className="p-4 bg-slate-950/95 border-t border-slate-800 flex items-center justify-end space-x-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-colors"
          >
            Close
          </button>
          
          <button
            type="submit"
            form="cancel-form"
            disabled={submitting}
            className="px-6 py-2.5 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-red-950 transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{submitting ? 'Cancelling & Sending...' : 'Confirm Cancellation & Send WhatsApp'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
