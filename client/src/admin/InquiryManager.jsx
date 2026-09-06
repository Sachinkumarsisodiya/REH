import React, { useState, useEffect } from 'react';
import {
  MessageSquare, Phone, Mail, Clock, CheckCircle2, Check,
  Search, RefreshCw, Trash2, PhoneCall, AlertCircle, Loader2,
  ExternalLink, User
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import WhatsAppIcon from '../components/WhatsAppIcon';

export default function InquiryManager({ token, onStatsChange }) {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const fetchInquiries = () => {
    setLoading(true);
    let url = `${API_BASE_URL}/api/admin/inquiries?status=${statusFilter}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

    fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setInquiries(data.inquiries || []);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load inquiries.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter, token]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchInquiries();
  };

  const handleUpdateStatus = async (inqId, newStatus) => {
    setActionLoadingId(inqId);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${inqId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(`Inquiry marked as ${newStatus}!`);
        fetchInquiries();
        if (onStatsChange) onStatsChange();
      } else {
        toast.error(data.error || 'Failed to update status.');
      }
    } catch (err) {
      toast.error('Network error.');
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDeleteInquiry = async (inqId, patientName) => {
    if (!window.confirm(`Are you sure you want to delete inquiry from ${patientName}?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/inquiries/${inqId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Inquiry deleted successfully.');
        fetchInquiries();
        if (onStatsChange) onStatsChange();
      } else {
        toast.error(data.error || 'Failed to delete inquiry.');
      }
    } catch (err) {
      toast.error('Network error.');
    }
  };

  const newCount = inquiries.filter(i => i.status === 'new').length;

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-400" />
            <span>Patient Inquiries &amp; Callback Desk</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time inquiries received from website Contact &amp; Consultation forms
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => { fetchInquiries(); toast.success('Inquiries refreshed!'); }}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-all flex items-center space-x-1.5 border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5 text-teal-400" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Inquiries' },
              { id: 'new', label: 'New / Pending Call', count: newCount },
              { id: 'contacted', label: 'Contacted' },
              { id: 'resolved', label: 'Resolved' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 shrink-0 ${
                  statusFilter === tab.id
                    ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30'
                    : 'bg-slate-950 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    statusFilter === tab.id ? 'bg-white text-slate-950' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                placeholder="Search patient, phone, msg..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
            <button
              type="submit"
              className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow"
            >
              Search
            </button>
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); fetchInquiries(); }}
                className="px-2.5 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs"
              >
                Clear
              </button>
            )}
          </form>

        </div>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-400 mb-2" />
          <p className="text-xs">Loading patient inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800 p-8 space-y-2">
          <MessageSquare className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-semibold text-slate-300">No inquiries found</p>
          <p className="text-xs text-slate-500">When visitors submit the contact form on your website, their messages will appear here in real time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inquiries.map(inq => {
            const cleanPhone = (inq.phone || '').replace(/\D/g, '');
            const waDirectUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${inq.name}, Greetings from Rekha Eye Hospital. We received your inquiry (#${inq.inquiry_id || inq.id}). How may we assist you with your eye care?`)}`;

            const formattedDate = inq.created_at ? new Date(inq.created_at).toLocaleString('en-IN', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            }) : 'Recently';

            return (
              <div
                key={inq.id}
                className={`bg-slate-900 rounded-2xl p-5 border transition-all space-y-4 flex flex-col justify-between shadow-lg relative ${
                  inq.status === 'new'
                    ? 'border-amber-500/40 shadow-amber-950/20'
                    : inq.status === 'contacted'
                    ? 'border-sky-500/30'
                    : 'border-slate-800/80'
                }`}
              >
                <div className="space-y-3">
                  
                  {/* Card Header: Inquiry ID + Status Badge */}
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-0.5 rounded-lg bg-teal-950 border border-teal-500/40 text-teal-300 font-mono text-xs font-bold">
                        {inq.inquiry_id || `#REH-INQ-${inq.id}`}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{formattedDate}</span>
                      </span>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border shadow-sm ${
                      inq.status === 'new'
                        ? 'bg-amber-950 text-amber-300 border-amber-700 animate-pulse'
                        : inq.status === 'contacted'
                        ? 'bg-sky-950 text-sky-300 border-sky-700'
                        : 'bg-emerald-950 text-emerald-300 border-emerald-700'
                    }`}>
                      {inq.status === 'new' ? 'New Inquiry' : inq.status}
                    </span>
                  </div>

                  {/* Patient Details */}
                  <div className="space-y-1.5">
                    <div className="font-extrabold text-white text-base font-heading flex items-center gap-1.5">
                      <User className="w-4 h-4 text-teal-400 shrink-0" />
                      <span>{inq.name}</span>
                    </div>

                    {inq.email && (
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail className="w-3.5 h-3.5 text-slate-500" />
                        <a href={`mailto:${inq.email}`} className="hover:text-teal-300 transition-colors">
                          {inq.email}
                        </a>
                      </div>
                    )}

                    {/* Quick 1-Tap Phone Call and WhatsApp Buttons */}
                    <div className="flex items-center gap-2 pt-1.5">
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-slate-950 border border-slate-800 text-teal-300 font-mono text-xs font-bold hover:bg-slate-800 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-teal-400" />
                        <span>+91 {inq.phone}</span>
                      </a>

                      <a
                        href={waDirectUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/30 transition-colors shrink-0"
                        title="Open WhatsApp Chat with patient"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 fill-[#25D366]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  {/* Inquiry Message Box */}
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Patient Query / Message:</div>
                    <p className="italic text-slate-200">"{inq.message || 'No specific message provided. Requested immediate callback.'}"</p>
                  </div>

                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {inq.status !== 'contacted' && (
                      <button
                        onClick={() => handleUpdateStatus(inq.id, 'contacted')}
                        disabled={actionLoadingId === inq.id}
                        className="px-2.5 py-1.5 rounded-xl bg-sky-950 hover:bg-sky-600 text-sky-300 hover:text-white font-bold text-[11px] border border-sky-800/80 transition-all flex items-center gap-1"
                        title="Mark that patient has been called"
                      >
                        <PhoneCall className="w-3 h-3" />
                        <span>Mark Contacted</span>
                      </button>
                    )}

                    {inq.status !== 'resolved' && (
                      <button
                        onClick={() => handleUpdateStatus(inq.id, 'resolved')}
                        disabled={actionLoadingId === inq.id}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-600 text-emerald-300 hover:text-white font-bold text-[11px] border border-emerald-800/80 transition-all flex items-center gap-1"
                        title="Mark inquiry as resolved"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Mark Resolved</span>
                      </button>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteInquiry(inq.id, inq.name)}
                    className="p-1.5 rounded-xl bg-slate-950 text-slate-400 hover:text-red-400 hover:bg-red-950/60 border border-slate-800 hover:border-red-800/80 transition-all"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
