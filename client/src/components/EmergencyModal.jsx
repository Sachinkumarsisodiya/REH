import React from 'react';
import { Phone, AlertTriangle, X, ShieldAlert, Clock, MapPin, MessageSquare, Zap, Activity } from 'lucide-react';

export default function EmergencyModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border-2 border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-500/20 text-white space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badge */}
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          </div>
          <div>
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-extrabold uppercase tracking-wider border border-red-500/30">
              <Zap className="w-3 h-3" />
              <span>24x7 Critical Eye Casualty</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black font-heading text-white mt-1">
              Emergency Eye Care Hotline
            </h3>
          </div>
        </div>

        {/* Emergency Call to Actions */}
        <div className="space-y-3">
          <a
            href="tel:+917733866682"
            className="w-full flex items-center justify-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-black text-base shadow-xl shadow-red-600/40 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            <Phone className="w-5 h-5 animate-bounce" />
            <span>Call 24x7 Ambulance / Casualty (+91 7733866682)</span>
          </a>

          <a
            href="https://wa.me/917733866682?text=EMERGENCY%20EYE%20CARE%20SOS%3A%20I%20need%20immediate%20ophthalmic%20casualty%20assistance."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center space-x-2 p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Instant WhatsApp Emergency SOS</span>
          </a>
        </div>

        {/* Rapid Eye Triage Guidelines */}
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="font-bold text-amber-400 flex items-center space-x-1.5">
            <AlertTriangle className="w-4 h-4" />
            <span>Immediate First-Aid Instructions</span>
          </div>
          <ul className="text-slate-300 space-y-1.5 list-disc list-inside">
            <li><strong>Chemical Splash:</strong> Flush eye continuously with clean water for 15 minutes. Do NOT rub.</li>
            <li><strong>Sudden Vision Loss / Blackout:</strong> Reach our casualty unit immediately (within golden hour).</li>
            <li><strong>Foreign Body / Penetrating Trauma:</strong> Do NOT pull object out. Shield eye with a clean cup.</li>
          </ul>
        </div>

        {/* Location & Response Time */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
          <div className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-400" />
            <span>Casualty Response: &lt; 5 Minutes</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-teal-400" />
            <span>Medical Enclave, Main Road</span>
          </div>
        </div>

      </div>
    </div>
  );
}
