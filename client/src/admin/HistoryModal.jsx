import React, { useState, useEffect } from 'react';
import { X, History, Clock, FileText, Loader2 } from 'lucide-react';
import { API_BASE_URL } from '../config/api';

export default function HistoryModal({ appointment, token, onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/appointments/${appointment.id}/history`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setHistory(data.history || []);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [appointment.id, token]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-800 text-white space-y-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-heading">Reschedule Audit Trail</h3>
            <p className="text-xs text-slate-400">Patient: <span className="text-white font-semibold">{appointment.patient_name}</span> (#REH-{appointment.id})</p>
          </div>
        </div>

        {loading ? (
          <div className="py-8 text-center text-slate-400 space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-teal-400" />
            <p className="text-xs">Fetching audit history logs...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-950 text-center text-slate-400 text-xs border border-slate-800">
            No previous reschedule modifications recorded for this appointment.
          </div>
        ) : (
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {history.map((item) => (
              <div key={item.id} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-400 border-b border-slate-900 pb-1.5">
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Changed at: {item.changed_at ? new Date(item.changed_at).toLocaleString() : 'N/A'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono">
                  <div className="text-red-400">
                    <span className="text-slate-500 font-sans block text-[10px]">Previous Slot:</span>
                    {item.old_date} @ {item.old_time}
                  </div>
                  <div className="text-emerald-400">
                    <span className="text-slate-500 font-sans block text-[10px]">New Slot:</span>
                    {item.new_date} @ {item.new_time}
                  </div>
                </div>

                {item.notes && (
                  <div className="text-slate-300 bg-slate-900 p-2 rounded-lg text-[11px]">
                    <span className="font-bold text-slate-400">Note:</span> {item.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
