import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';

export default function FloatingWhatsApp() {
  const waNumber = "917733866682";
  const waMessage = encodeURIComponent("Hello Rekha Eye Hospital (REH), I would like to inquire about an eye checkup / LASIK consultation.");
  const waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-center group">
      
      {/* Outer WhatsApp Green Pulse Ripple Rings */}
      <span className="absolute inline-flex h-16 w-16 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />
      <span className="absolute inline-flex h-20 w-20 rounded-full bg-[#25D366]/30 animate-pulse pointer-events-none" />

      {/* Official WhatsApp Tooltip Badge */}
      <div className="absolute right-16 bottom-2 bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-2xl border border-slate-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 whitespace-nowrap pointer-events-none flex items-center space-x-2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
        <span className="text-slate-100">Chat on WhatsApp <span className="text-[#25D366] font-mono font-bold">(+91 7733866682)</span></span>
      </div>

      {/* Official WhatsApp Brand Icon Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center shadow-[0_10px_25px_rgba(37,211,102,0.5)] hover:shadow-[0_15px_30px_rgba(37,211,102,0.7)] transform hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white"
        title="Direct WhatsApp Inquiry (+91 7733866682)"
        aria-label="Contact via WhatsApp"
      >
        <WhatsAppIcon className="w-7 h-7 fill-white drop-shadow-md" />
      </a>
    </div>
  );
}
