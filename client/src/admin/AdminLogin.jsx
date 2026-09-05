import React, { useState } from 'react';
import { ShieldCheck, Lock, User, KeyRound, Loader2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

export default function AdminLogin({ onLoginSuccess }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('reh12345');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please enter username and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('reh_admin_token', data.token);
        localStorage.setItem('reh_admin_user', JSON.stringify(data.user));
        toast.success(`Welcome back, ${data.user.username}!`);
        onLoginSuccess(data.token, data.user);
      } else {
        toast.error(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Login request failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl space-y-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-teal-500/30 p-2 mx-auto flex items-center justify-center shadow-lg">
            <img src="/favicon.svg" alt="REH Logo" className="w-full h-full" />
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded border border-teal-800">
              Staff &amp; Doctor Portal
            </span>
            <h1 className="text-2xl font-extrabold font-heading text-white mt-2">
              REH Hospital Management
            </h1>
            <p className="text-xs text-slate-400 mt-1">Sign in with authorized administrator credentials</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">Username</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin username"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* Quick Demo Credentials Info */}
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 space-y-0.5">
            <div className="font-bold text-teal-400">Default Seed Demo Credentials:</div>
            <div>Username: <code className="text-amber-300">admin</code> &bull; Password: <code className="text-amber-300">reh12345</code></div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold text-sm shadow-xl shadow-teal-500/25 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Verifying JWT...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Access Admin Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        <div className="text-center pt-2">
          <a href="/" className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
            &larr; Back to Public Hospital Website
          </a>
        </div>

      </div>
    </div>
  );
}
