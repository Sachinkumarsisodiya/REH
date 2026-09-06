import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Power, Check, X, Loader2, Stethoscope, Plus, RotateCcw, CheckCircle2, AlertCircle, Trash2, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';

export default function DoctorManager({ token }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [deleteModalDoctor, setDeleteModalDoctor] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    qualification: '',
    photo_url: '',
    available_days: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
    start_time: '09:00',
    end_time: '17:00'
  });

  const fetchDoctors = () => {
    setLoading(true);
    // Fetch ALL doctors (both active and inactive) using admin authorization
    fetch(`${API_BASE_URL}/api/admin/doctors`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.ok) return res.json();
        return fetch(`${API_BASE_URL}/api/doctors`).then(r => r.json());
      })
      .then(data => {
        if (data.success && data.doctors) {
          setDoctors(data.doctors);
        }
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load doctor roster');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, [token]);

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/doctors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('New doctor added to roster!');
        setShowAddModal(false);
        setFormData({
          name: '',
          specialty: '',
          qualification: '',
          photo_url: '',
          available_days: 'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
          start_time: '09:00',
          end_time: '17:00'
        });
        fetchDoctors();
      } else {
        toast.error(data.error || 'Failed to add doctor.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error.');
    } finally {
      setSubmitting(false);
    }
  };

  const toggleStatus = async (docId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/doctors/${docId}/toggle`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message);
        fetchDoctors();
      } else {
        toast.error(data.error || 'Failed to toggle status.');
      }
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleConfirmPermanentDelete = async () => {
    if (!deleteModalDoctor) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/doctors/${deleteModalDoctor.id}/permanent`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || `Doctor permanently deleted.`);
        setDeleteModalDoctor(null);
        fetchDoctors();
      } else {
        toast.error(data.error || 'Failed to delete doctor.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Network error while deleting doctor.');
    } finally {
      setDeleting(false);
    }
  };

  const handleActivateAll = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/doctors/activate-all`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || 'All doctors activated successfully!');
        fetchDoctors();
      } else {
        toast.error(data.error || 'Failed to activate doctors.');
      }
    } catch (err) {
      toast.error('Network error while activating doctors.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRestoreDefaults = async () => {
    setActionLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/doctors/restore-defaults`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || 'Default doctors restored and activated!');
        fetchDoctors();
      } else {
        toast.error(data.error || 'Failed to restore default doctors.');
      }
    } catch (err) {
      toast.error('Network error while restoring doctors.');
    } finally {
      setActionLoading(false);
    }
  };

  const inactiveCount = doctors.filter(d => !d.is_active).length;

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-400" />
            <span>Ophthalmic Specialist Roster</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage active/inactive doctors, OPD consultation hours, or delete specialist profiles
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {inactiveCount > 0 && (
            <button
              onClick={handleActivateAll}
              disabled={actionLoading}
              className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-semibold text-xs transition-all flex items-center space-x-1.5 shadow-sm"
              title="Activate all inactive doctors in 1 click"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Activate All ({inactiveCount} Inactive)</span>
            </button>
          )}

          <button
            onClick={handleRestoreDefaults}
            disabled={actionLoading}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-semibold text-xs transition-all flex items-center space-x-1.5"
            title="Restore all default specialists (Dr. Rekha, Dr. Sachin, etc.)"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-400" />
            <span>Restore Defaults</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Specialist</span>
          </button>
        </div>
      </div>

      {/* Inactive Notice Banner if any doctors are turned off */}
      {inactiveCount > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3.5 flex items-center justify-between gap-3 text-xs text-amber-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              <strong>{inactiveCount} Doctor(s) currently Inactive / Powered Off.</strong> Click the green power button on any doctor card to turn them back ON instantly without re-entering details.
            </span>
          </div>
          <button
            onClick={handleActivateAll}
            disabled={actionLoading}
            className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold rounded-lg shrink-0 transition-all text-[11px]"
          >
            Turn All ON
          </button>
        </div>
      )}

      {/* Roster Cards */}
      {loading ? (
        <div className="py-16 text-center text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-400 mb-2" />
          <p className="text-xs">Loading doctor roster...</p>
        </div>
      ) : doctors.length === 0 ? (
        <div className="py-16 text-center text-slate-400 bg-slate-900/40 rounded-2xl border border-slate-800 p-8 space-y-3">
          <Stethoscope className="w-10 h-10 mx-auto text-slate-600" />
          <p className="text-sm font-semibold text-slate-300">No doctors found in the database</p>
          <button
            onClick={handleRestoreDefaults}
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold"
          >
            Restore Default Specialists
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.map(doc => {
            const isActive = doc.is_active !== false;
            return (
              <div 
                key={doc.id} 
                className={`rounded-2xl p-4 border transition-all duration-200 flex flex-col justify-between space-y-3 relative overflow-hidden ${
                  isActive 
                    ? 'bg-slate-900/90 border-slate-800 shadow-md hover:border-teal-500/40' 
                    : 'bg-slate-900/40 border-dashed border-red-500/30 opacity-80 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950">
                    <img 
                      src={doc.photo_url} 
                      alt={doc.name} 
                      className={`w-full h-44 object-cover object-top transition-all duration-300 ${
                        isActive ? '' : 'filter grayscale contrast-125'
                      }`}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600';
                      }}
                    />
                    {!isActive && (
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="px-3 py-1 bg-red-950/90 border border-red-700/80 text-red-300 text-[10px] font-bold uppercase tracking-wider rounded-lg shadow-lg">
                          OFFLINE / INACTIVE
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 space-y-1">
                    <div className="font-bold text-sm text-white flex items-center justify-between">
                      <span>{doc.name}</span>
                    </div>
                    <div className="text-xs font-semibold text-teal-400 line-clamp-1">{doc.specialty}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">{doc.qualification}</div>
                    <div className="text-[11px] text-slate-400 pt-1 flex items-center gap-1.5 font-mono">
                      <span className="text-slate-500">Hours:</span>
                      <span className="text-slate-300">{doc.start_time} - {doc.end_time}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-400 animate-pulse' : 'bg-red-500'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      isActive 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-red-950/80 text-red-400 border border-red-800/60'
                    }`}>
                      {isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Power Toggle Button (Active / Inactive) */}
                    <button
                      onClick={() => toggleStatus(doc.id)}
                      className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold ${
                        isActive
                          ? 'bg-slate-800 text-slate-300 hover:bg-amber-950/60 hover:text-amber-400 hover:border hover:border-amber-700'
                          : 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white shadow-md'
                      }`}
                      title={isActive ? 'Click to deactivate (Turn OFF)' : 'Click to re-activate doctor (Turn ON)'}
                    >
                      <Power className="w-3.5 h-3.5" />
                      {!isActive && <span className="text-[11px] pr-0.5">Turn ON</span>}
                    </button>

                    {/* Permanent Delete Button */}
                    <button
                      onClick={() => setDeleteModalDoctor(doc)}
                      className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-red-950/60 hover:border hover:border-red-800/80 transition-all"
                      title="Permanently Delete Doctor from Database"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Permanent Delete Confirmation Modal */}
      {deleteModalDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-red-500/40 text-white space-y-4 shadow-2xl relative">
            <div className="flex items-center gap-3 text-red-400">
              <div className="p-3 bg-red-950/80 border border-red-800/60 rounded-2xl">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Permanently Delete Doctor?</h3>
                <p className="text-xs text-red-300/80">This action cannot be undone</p>
              </div>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-white text-sm">{deleteModalDoctor.name}</div>
              <div className="text-teal-400">{deleteModalDoctor.specialty}</div>
              <div className="text-slate-400 text-[11px]">{deleteModalDoctor.qualification}</div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to permanently remove <strong>{deleteModalDoctor.name}</strong> from the database? If you only want to temporarily hide them from the website, you can use the Power button instead.
            </p>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteModalDoctor(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-all font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmPermanentDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
              >
                {deleting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Yes, Delete Permanently</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-800 text-white space-y-5 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-400" />
              <span>Add New Eye Specialist</span>
            </h3>

            <form onSubmit={handleCreateDoctor} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300">Doctor Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Sharma"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">Specialty *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vitreo-Retinal Surgeon"
                  value={formData.specialty}
                  onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">Qualification &amp; Degrees *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MS (Ophthalmology) AIIMS, FRCS"
                  value={formData.qualification}
                  onChange={e => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300">Photo URL *</label>
                <input
                  type="text"
                  required
                  placeholder="/dr-rekha-sisodiya.jpg or URL"
                  value={formData.photo_url}
                  onChange={e => setFormData({ ...formData, photo_url: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300">Start Time</label>
                  <input
                    type="text"
                    value={formData.start_time}
                    onChange={e => setFormData({ ...formData, start_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300">End Time</label>
                  <input
                    type="text"
                    value={formData.end_time}
                    onChange={e => setFormData({ ...formData, end_time: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300 hover:text-white">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow">
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

