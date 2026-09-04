import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Loader2, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RescheduleModal({ appointment, token, onClose, onSuccess }) {
  const [newDate, setNewDate] = useState(appointment.appointment_date);
  const [newTime, setNewTime] = useState(appointment.appointment_time);
  const [notes, setNotes] = useState('Rescheduled by admin upon patient request');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isWorkingDay, setIsWorkingDay] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch slots for selected date
  useEffect(() => {
    if (appointment.doctor_id && newDate) {
      setLoadingSlots(true);
      fetch(`/api/appointments/available-slots?doctor_id=${appointment.doctor_id}&date=${newDate}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setIsWorkingDay(data.is_working_day);
            setAvailableSlots(data.all_slots || []);
          }
        })
        .catch(err => console.error(err))
        .finally(() => setLoadingSlots(false));
    }
  }, [appointment.doctor_id, newDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDate || !newTime) {
      toast.error('Please select date and time.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/appointments/${appointment.id}/reschedule`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          new_date: newDate,
          new_time: newTime,
          notes
        })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        toast.success('Appointment rescheduled & logged in audit history!');
        onSuccess(data);
      } else {
        toast.error(data.error || 'Reschedule failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to reschedule.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col border border-slate-800 text-white shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-900 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold font-heading">Reschedule Appointment</h3>
              <p className="text-xs text-slate-400">
                Patient: <span className="text-white font-semibold">{appointment.patient_name}</span> (#REH-{appointment.id})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form id="reschedule-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          
          {/* Current Info */}
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs flex justify-between text-slate-300">
            <div>Doctor: <span className="font-semibold text-white">{appointment.doctor_name}</span></div>
            <div>Current: <span className="font-mono text-amber-400">{appointment.appointment_date} @ {appointment.appointment_time}</span></div>
          </div>

          {/* New Date */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">Target New Date</label>
            <input
              type="date"
              required
              value={newDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

          {/* Slots */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span>Select Available Time Slot</span>
              {loadingSlots && <Loader2 className="w-3.5 h-3.5 text-teal-400 animate-spin" />}
            </div>

            {!isWorkingDay ? (
              <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-amber-300 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Doctor unavailable on selected day. Pick another date.</span>
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 max-h-36 overflow-y-auto pr-1">
                {availableSlots.map((slotObj, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={!slotObj.is_available}
                    onClick={() => setNewTime(slotObj.time)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border ${
                      !slotObj.is_available
                        ? 'bg-slate-950/40 border-slate-900 text-slate-600 line-through'
                        : newTime === slotObj.time
                        ? 'bg-amber-500 text-slate-950 font-black border-amber-400 ring-2 ring-amber-400/40'
                        : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-400'
                    }`}
                  >
                    {slotObj.time}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">Audit Trail Reason / Notes</label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reason for changing appointment time..."
              className="w-full px-4 py-2.5 rounded-2xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
            />
          </div>

        </form>

        {/* Sticky Action Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-end space-x-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-2xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="reschedule-form"
            disabled={submitting || !newTime || !isWorkingDay}
            className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg flex items-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>Confirm Reschedule</span>
          </button>
        </div>

      </div>
    </div>
  );
}
