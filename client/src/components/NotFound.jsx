import React from 'react';
import { EyeOff, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/80 p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="w-20 h-20 rounded-full bg-teal-500/10 text-teal-400 mx-auto flex items-center justify-center border border-teal-500/20">
          <EyeOff className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-teal-400 tracking-widest uppercase">404 Page Not Found</span>
          <h1 className="text-3xl font-black font-heading">Vision Out of Focus</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            The page or clinical resource you are looking for has been moved, renamed, or does not exist in the Rekha Eye Hospital directory.
          </p>
        </div>

        <div className="pt-2">
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm shadow-lg shadow-teal-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Hospital Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
