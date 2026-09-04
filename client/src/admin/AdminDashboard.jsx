import React, { useState, useEffect } from 'react';
import {
  Users, Calendar, Clock, CheckCircle2, XCircle, AlertCircle, RefreshCw,
  Search, Filter, LogOut, ShieldCheck, Stethoscope, ChevronRight, MessageSquare,
  History, Activity, Bell, ExternalLink, BarChart3, Plus, Smartphone, Send,
  UserCheck, AlertTriangle, Sparkles, Check, Phone, Mail, FileText, ArrowUpRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import RescheduleModal from './RescheduleModal';
import HistoryModal from './HistoryModal';
import DoctorManager from './DoctorManager';
import CancelModal from './CancelModal';

export default function AdminDashboard({ token, user, onLogout }) {
  const [activeTab, setActiveTab] = useState('appointments');
  const [stats, setStats] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('all');
  const [doctorsList, setDoctorsList] = useState([]);

  // Modals state
  const [rescheduleTarget, setRescheduleTarget] = useState(null);
  const [historyTarget, setHistoryTarget] = useState(null);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [approvingId, setApprovingId] = useState(null);

  const fetchStats = () => {
    fetch('/api/admin/dashboard-stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error(err));
  };

  const fetchDoctors = () => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.doctors) {
          setDoctorsList(data.doctors);
        }
      })
      .catch(err => console.error(err));
  };

  const fetchAppointments = () => {
    setLoading(true);
    let url = `/api/appointments?status=${statusFilter}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    if (dateFilter) url += `&date=${dateFilter}`;
    if (doctorFilter && doctorFilter !== 'all') url += `&doctor_id=${doctorFilter}`;

    fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAppointments(data.appointments || []);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load appointments.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
    fetchDoctors();
  }, [token]);

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter, dateFilter, doctorFilter, token]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchAppointments();
  };

  const handleApprove = async (app) => {
    setApprovingId(app.id);
    try {
      const res = await fetch(`/api/appointments/${app.id}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        
        // Custom Toast Notification showing Automated SMS & WhatsApp dispatch
        toast.custom((t) => (
          <div className="bg-slate-900 border border-emerald-500 text-white p-4 rounded-3xl shadow-2xl shadow-emerald-950 flex items-start space-x-3 max-w-md animate-bounce-short">
            <div className="p-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="font-bold text-xs text-emerald-400 flex items-center justify-between">
                <span>⚡ Appointment Approved &amp; WhatsApp Sent</span>
                <span className="text-[10px] text-slate-400 font-mono">#{app.id}</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-snug">
                Confirmation dispatched to <strong>{app.patient_name}</strong> (+91 {app.patient_phone}).
              </p>
              {data.whatsapp_link && (
                <div className="pt-1">
                  <a
                    href={data.whatsapp_link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold shadow transition-all"
                    onClick={() => toast.dismiss(t.id)}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Open Patient WhatsApp Chat</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ), { duration: 7000 });

        fetchStats();
        fetchAppointments();
      } else {
        toast.error(data.error || 'Failed to approve appointment.');
      }
    } catch (err) {
      toast.error('Network error during approval.');
    } finally {
      setApprovingId(null);
    }
  };

  const upcoming24hCount = appointments.filter(a => a.is_upcoming_24h).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900/90 backdrop-blur-xl border-b md:border-b-0 md:border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          
          {/* Brand */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 p-1.5 flex items-center justify-center border border-teal-500/40 shadow-lg shadow-teal-500/10">
              <img src="/favicon.svg" alt="REH" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-lg text-white font-heading tracking-tight leading-none">REH Command</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-teal-400 mt-1 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                <span>Super-Admin Desk</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'appointments'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4" />
                <span>Appointments Desk</span>
              </div>
              {stats?.pending_count > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-extrabold">
                  {stats.pending_count}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-2xl font-bold text-xs transition-all ${
                activeTab === 'doctors'
                  ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg shadow-teal-600/30'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
              }`}
            >
              <Stethoscope className="w-4 h-4" />
              <span>Surgeons Roster</span>
            </button>
          </nav>

        </div>

        {/* Footer Sidebar Actions */}
        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-teal-300 hover:bg-slate-800/50 transition-all"
          >
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-4 h-4 text-teal-400" />
              <span>View Public Portal</span>
            </div>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-950/80 hover:bg-red-950/60 hover:text-red-400 text-slate-400 font-bold text-xs border border-slate-800 hover:border-red-800/50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout Administrator</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 sm:p-8 lg:p-10 space-y-8 overflow-x-hidden">
        
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-heading text-white tracking-tight flex items-center space-x-3">
              <span>Hospital Operations &amp; Scheduling Desk</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Administrator: <span className="text-teal-400 font-bold">{user?.username || 'admin'}</span> &bull; Automated WhatsApp &amp; SMS Dispatch Active
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5">
            {/* Live WhatsApp Bot Status Indicator */}
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-bold flex items-center space-x-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span>WhatsApp Bot: Ready</span>
            </div>

            {upcoming24hCount > 0 && (
              <div className="px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-800 text-amber-300 text-xs font-bold flex items-center space-x-2 animate-pulse">
                <Bell className="w-3.5 h-3.5 text-amber-400" />
                <span>{upcoming24hCount} Patient(s) within 24h</span>
              </div>
            )}

            <button
              onClick={() => { fetchStats(); fetchAppointments(); toast.success('Dashboard refreshed!'); }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeTab === 'doctors' ? (
          <DoctorManager token={token} />
        ) : (
          <div className="space-y-8">
            
            {/* Stat Cards Overview */}
            {stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-teal-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Today's Appts</span>
                    <Calendar className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading mt-2">{stats.today_count}</div>
                  <div className="text-[11px] text-teal-400/80 font-semibold mt-1">Scheduled for today</div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-amber-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between text-amber-400 text-xs font-bold uppercase tracking-wider">
                    <span>Pending Action</span>
                    <Clock className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-amber-400 font-heading mt-2">{stats.pending_count}</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Awaiting confirmation</div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <span>Confirmed</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-heading mt-2">{stats.approved_count}</div>
                  <div className="text-[11px] text-slate-400 font-medium mt-1">Confirmed patient slots</div>
                </div>

                <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-5 rounded-3xl border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-cyan-500/40 transition-all">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl pointer-events-none" />
                  <div className="flex items-center justify-between text-slate-400 text-xs font-bold uppercase tracking-wider">
                    <span>Active Surgeons</span>
                    <Stethoscope className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading mt-2">{stats.total_doctors}</div>
                  <div className="text-[11px] text-cyan-400/80 font-semibold mt-1">On active clinical duty</div>
                </div>

              </div>
            )}

            {/* 7-Day Trend Chart */}
            {stats && stats.trend_7_days && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-6 rounded-3xl border border-slate-800/80 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                      <BarChart3 className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold font-heading text-white">7-Day Appointment Volume Trend</h3>
                      <p className="text-[11px] text-slate-400">Patient scheduling traffic over the last week</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold font-mono text-teal-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    Total: {stats.total_appointments} Bookings
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-2 pt-4 items-end h-36">
                  {stats.trend_7_days.map((item, idx) => {
                    const maxVal = Math.max(...stats.trend_7_days.map(t => t.count), 5);
                    const pct = Math.round((item.count / maxVal) * 100);
                    return (
                      <div key={idx} className="flex flex-col items-center h-full justify-end space-y-2 group">
                        <div className="text-[10px] font-bold text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {item.count}
                        </div>
                        <div
                          className="w-full max-w-[40px] bg-gradient-to-t from-teal-600 via-teal-500 to-cyan-400 rounded-t-xl transition-all duration-500 hover:brightness-125 shadow-md shadow-teal-500/20"
                          style={{ height: `${Math.max(pct, 12)}%` }}
                        />
                        <div className="text-[10px] font-semibold text-slate-400 truncate">{item.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Filter & Search Controls */}
            <div className="bg-slate-900/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xl">
              
              {/* Status Filter Tabs */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                {[
                  { id: 'all', label: 'All' },
                  { id: 'pending', label: 'Pending', count: stats?.pending_count },
                  { id: 'approved', label: 'Approved', count: stats?.approved_count },
                  { id: 'rescheduled', label: 'Rescheduled' },
                  { id: 'rejected', label: 'Cancelled / Rejected' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setStatusFilter(tab.id)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                      statusFilter === tab.id
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-md shadow-teal-600/30'
                        : 'bg-slate-950/60 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800/60'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {tab.count !== undefined && tab.count > 0 && (
                      <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                        statusFilter === tab.id ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Doctor, Date & Search Controls */}
              <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-2">
                
                {/* Doctor Filter Dropdown */}
                <select
                  value={doctorFilter}
                  onChange={(e) => setDoctorFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-teal-500"
                >
                  <option value="all">All Specialists</option>
                  {doctorsList.map(doc => (
                    <option key={doc.id} value={doc.id}>{doc.name}</option>
                  ))}
                </select>

                {/* Date Filter */}
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-teal-500"
                />
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search name, phone, token..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-3.5 py-2 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 w-44 sm:w-56"
                  />
                </div>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow transition-all flex items-center space-x-1"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>Filter</span>
                </button>

                {(dateFilter || searchQuery || doctorFilter !== 'all') && (
                  <button
                    type="button"
                    onClick={() => { setDateFilter(''); setSearchQuery(''); setDoctorFilter('all'); }}
                    className="p-2 rounded-2xl bg-slate-800 text-slate-400 hover:text-white transition-all text-xs font-semibold"
                    title="Clear Filters"
                  >
                    Reset
                  </button>
                )}

              </form>

            </div>

            {/* Appointments Table Card */}
            <div className="bg-slate-900/90 backdrop-blur-md rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl">
              <div className="w-full">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/90 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800 text-[10.5px]">
                    <tr>
                      <th className="px-3 py-3 w-16 text-center">ID</th>
                      <th className="px-3 py-3">Patient Information</th>
                      <th className="px-3 py-3">Assigned Specialist</th>
                      <th className="px-3 py-3 w-28">Date &amp; Slot</th>
                      <th className="px-3 py-3 hidden xl:table-cell">Reason / Symptoms</th>
                      <th className="px-3 py-3 w-24 text-center">Status</th>
                      <th className="px-3 py-3 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-16 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <RefreshCw className="w-6 h-6 animate-spin text-teal-400" />
                            <span>Loading live appointments...</span>
                          </div>
                        </td>
                      </tr>
                    ) : appointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-16 text-center text-slate-500">
                          <div className="flex flex-col items-center justify-center space-y-2">
                            <Calendar className="w-8 h-8 text-slate-600" />
                            <span className="font-semibold text-slate-400">No matching appointments found.</span>
                            <span className="text-xs text-slate-600">Try changing status filter or search parameters.</span>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      appointments.map((app) => {
                        const cleanPhone = (app.patient_phone || '').replace(/\D/g, '');
                        const waDirectUrl = `https://wa.me/91${cleanPhone}`;

                        return (
                          <tr key={app.id} className="hover:bg-slate-800/40 transition-colors group">
                            
                            {/* Token ID */}
                            <td className="px-3 py-3 text-center font-mono font-bold">
                              <span className="px-2 py-0.5 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-300 text-[11px] inline-block">
                                #{app.id}
                              </span>
                            </td>

                            {/* Patient Info */}
                            <td className="px-3 py-3">
                              <div className="font-bold text-white text-xs sm:text-sm truncate max-w-[160px]">{app.patient_name}</div>
                              <div className="flex items-center space-x-1.5 mt-0.5">
                                <a
                                  href={`tel:${app.patient_phone}`}
                                  className="text-teal-400 font-mono text-[11px] hover:underline flex items-center space-x-1"
                                >
                                  <Phone className="w-2.5 h-2.5 text-teal-500" />
                                  <span>{app.patient_phone}</span>
                                </a>
                                <a
                                  href={waDirectUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="p-1 rounded-md bg-emerald-950 text-emerald-400 hover:bg-emerald-800 transition-colors border border-emerald-800/60"
                                  title="Open WhatsApp Chat directly"
                                >
                                  <MessageSquare className="w-2.5 h-2.5" />
                                </a>
                              </div>
                            </td>

                            {/* Assigned Doctor */}
                            <td className="px-3 py-3">
                              <div className="font-bold text-white text-xs truncate max-w-[160px]">{app.doctor_name}</div>
                              <div className="text-teal-400 text-[10.5px] font-medium max-w-[160px] truncate">
                                {app.doctor_specialty}
                              </div>
                            </td>

                            {/* Date & Slot */}
                            <td className="px-3 py-3 font-mono">
                              <div className="font-bold text-white text-xs">{app.appointment_date}</div>
                              <div className="text-teal-300 text-[11px] font-bold">{app.appointment_time}</div>
                              {app.is_upcoming_24h && (
                                <span className="inline-block text-[8.5px] font-bold text-amber-400 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-800 mt-0.5">
                                  &lt;24h Alert
                                </span>
                              )}
                            </td>

                            {/* Reason / Symptoms (Hidden on smaller viewports, visible on xl) */}
                            <td className="px-3 py-3 max-w-[140px] text-slate-300 text-xs hidden xl:table-cell">
                              <p className="truncate text-[11px]">{app.reason_for_visit || 'General Consultation'}</p>
                            </td>

                            {/* Status Badge */}
                            <td className="px-3 py-3 text-center">
                              <span className={`px-2.5 py-1 rounded-full text-[9.5px] font-extrabold uppercase tracking-wider border shadow-sm inline-block ${
                                app.status === 'approved'
                                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                  : app.status === 'pending'
                                  ? 'bg-amber-950 text-amber-300 border-amber-700 animate-pulse'
                                  : app.status === 'rescheduled'
                                  ? 'bg-sky-950 text-sky-300 border-sky-700'
                                  : 'bg-red-950 text-red-300 border-red-700'
                              }`}>
                                {app.status}
                              </span>
                            </td>

                            {/* Actions & WhatsApp dispatch */}
                            <td className="px-3 py-3 text-right">
                              <div className="flex items-center justify-end space-x-1.5">
                                
                                {/* Approve Button (if pending) */}
                                {app.status === 'pending' && (
                                  <button
                                    onClick={() => handleApprove(app)}
                                    disabled={approvingId === app.id}
                                    className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] flex items-center space-x-1 shadow transition-all disabled:opacity-50"
                                    title="Approve & Send Automated WhatsApp"
                                  >
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span>{approvingId === app.id ? '...' : 'Approve'}</span>
                                  </button>
                                )}

                                {/* Cancel / Reject Button (Available for all active statuses) */}
                                {app.status !== 'rejected' && (
                                  <button
                                    onClick={() => setCancelTarget(app)}
                                    className="px-2.5 py-1 rounded-xl bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white font-bold text-[11px] border border-red-800/80 transition-all flex items-center space-x-1"
                                    title="Cancel / Reject with custom reason & automated WhatsApp message"
                                  >
                                    <XCircle className="w-3 h-3" />
                                    <span>Cancel</span>
                                  </button>
                                )}

                                {/* Reschedule Button */}
                                <button
                                  onClick={() => setRescheduleTarget(app)}
                                  className="p-1.5 rounded-xl bg-slate-950 hover:bg-amber-600 text-slate-400 hover:text-white border border-slate-800 transition-all"
                                  title="Reschedule Consultation Slot"
                                >
                                  <RefreshCw className="w-3 h-3" />
                                </button>

                                {/* Audit History Trail Button */}
                                {app.history_count > 0 && (
                                  <button
                                    onClick={() => setHistoryTarget(app)}
                                    className="p-1.5 rounded-xl bg-slate-950 hover:bg-teal-600 text-teal-400 hover:text-white border border-slate-800 transition-all"
                                    title={`View ${app.history_count} Audit Trail Log(s)`}
                                  >
                                    <History className="w-3 h-3" />
                                  </button>
                                )}

                              </div>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Cancel / Reject Modal with preset reasons & WhatsApp preview */}
      {cancelTarget && (
        <CancelModal
          appointment={cancelTarget}
          token={token}
          onClose={() => setCancelTarget(null)}
          onSuccess={() => {
            setCancelTarget(null);
            fetchStats();
            fetchAppointments();
          }}
        />
      )}

      {/* Reschedule Modal */}
      {rescheduleTarget && (
        <RescheduleModal
          appointment={rescheduleTarget}
          token={token}
          onClose={() => setRescheduleTarget(null)}
          onSuccess={(data) => {
            setRescheduleTarget(null);
            if (data.sms_text) {
              toast.success(`Rescheduled & Automated SMS sent to ${rescheduleTarget.patient_phone}!`);
            }
            fetchStats();
            fetchAppointments();
          }}
        />
      )}

      {/* History Modal */}
      {historyTarget && (
        <HistoryModal
          appointment={historyTarget}
          token={token}
          onClose={() => setHistoryTarget(null)}
        />
      )}

    </div>
  );
}
