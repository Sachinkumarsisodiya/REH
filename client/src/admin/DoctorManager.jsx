import React, { useState, useEffect } from 'react';
import { UserPlus, Edit, Power, Check, X, Loader2, Stethoscope, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function DoctorManager({ token }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    qualification: '',
    photo_url: '',
    available_days: 'Mon,Tue,Wed,Thu,Fri,Sat',
    start_time: '09:00',
    end_time: '17:00'
  });

  const fetchDoctors = () => {
    setLoading(true);
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDoctors(data.doctors || []);
        }
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/doctors', {
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
          available_days: 'Mon,Tue,Wed,Thu,Fri,Sat',
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
      const res = await fetch(`/api/admin/doctors/${docId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message);
        fetchDoctors();
      }
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white font-heading">Ophthalmic Specialist Roster</h2>
          <p className="text-xs text-slate-400">Manage doctors, qualifications, working days, and consultation schedules</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs shadow-md flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Surgeon</span>
        </button>
      </div>

      {/* Roster Cards */}
      {loading ? (
        <div className="py-12 text-center text-slate-400">
          <Loader2 className="w-6 h-6 animate-spin mx-auto text-teal-400" />
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {doctors.map(doc => (
            <div key={doc.id} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div>
                <img src={doc.photo_url} alt={doc.name} className="w-full h-40 object-cover rounded-xl border border-slate-800" />
                <div className="pt-3 space-y-1">
                  <div className="font-bold text-sm text-white">{doc.name}</div>
                  <div className="text-xs font-semibold text-teal-400">{doc.specialty}</div>
                  <div className="text-[11px] text-slate-400">{doc.qualification}</div>
                  <div className="text-[11px] text-slate-400 pt-1">Hours: {doc.start_time} - {doc.end_time}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${doc.is_active ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800'}`}>
                  {doc.is_active ? 'Active' : 'Inactive'}
                </span>

                <button
                  onClick={() => toggleStatus(doc.id)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Toggle Doctor Status"
                >
                  <Power className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Doctor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-800 text-white space-y-5 shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold font-heading">Add New Eye Specialist</h3>

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
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
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
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl bg-slate-800 text-xs">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="px-5 py-2 rounded-xl bg-teal-600 text-white font-bold text-xs shadow">
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
