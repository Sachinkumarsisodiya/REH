import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar as CalendarIcon, Clock, User, Phone, Mail, FileText, CheckCircle2, 
  AlertCircle, Loader2, ArrowRight, ArrowLeft, MessageSquare, Sparkles, 
  Smartphone, Send, Search, Stethoscope, Check, ShieldCheck, ChevronLeft, 
  ChevronRight, Sun, Sunset, Moon, HeartPulse, Award, MapPin, Zap
} from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import WhatsAppIcon from './WhatsAppIcon';

const DEFAULT_DOCTORS = [
  {
    id: 1,
    name: "Dr. Rekha Sisodiya",
    specialty: "Founder, Medical Director & Chief LASIK Specialist",
    qualification: "MBBS, MS (Ophthalmology) AIIMS, Fellowship in Refractive Surgery (London)",
    photo_url: "/dr-rekha-sisodiya.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "09:00",
    end_time: "17:00",
    slot_duration_mins: 30,
    is_active: true
  },
  {
    id: 2,
    name: "Dr. Sachin Kumar Sisodiya",
    specialty: "Senior Cataract, Phaco & Glaucoma Specialist",
    qualification: "MBBS, MS (Ophthalmology), FICO (UK), Fellowship in Micro-Incision Cataract",
    photo_url: "/dr-sachin-sisodiya.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "09:30",
    end_time: "17:30",
    slot_duration_mins: 30,
    is_active: true
  },
  {
    id: 3,
    name: "Dr. Kush",
    specialty: "Vitreo-Retina & Diabetic Eye Care Specialist",
    qualification: "MBBS, MD (Ophthalmology), DNB, Senior Vitreo-Retina Fellow",
    photo_url: "/dr-kush.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "10:00",
    end_time: "18:00",
    slot_duration_mins: 30,
    is_active: true
  },
  {
    id: 4,
    name: "Dr. Bhavana",
    specialty: "Pediatric Ophthalmology, Squint & Cornea Specialist",
    qualification: "MBBS, MS (Ophthalmology), Fellowship in Pediatric Eye Care & Strabismus",
    photo_url: "/dr-bhavana.jpg",
    available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    start_time: "09:00",
    end_time: "16:30",
    slot_duration_mins: 30,
    is_active: true
  }
];

// Local Date Formatter in YYYY-MM-DD (immune to UTC timezone offsets)
const getLocalDateString = (d = new Date()) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Real-time client-side slot cutoff helper (Strict 15 mins advance cutoff)
const isSlotCutoff = (slotTime, selectedDate) => {
  try {
    const now = new Date();
    const todayFormatted = getLocalDateString(now);

    if (selectedDate < todayFormatted) return true;
    if (selectedDate > todayFormatted) return false;

    // For today: check if current time is within 15 minutes of slot or past slot
    const [h, m] = slotTime.split(':').map(Number);
    const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, m, 0, 0);
    const cutoffTime = new Date(slotDate.getTime() - 15 * 60 * 1000);
    return now.getTime() >= cutoffTime.getTime();
  } catch {
    return false;
  }
};

const STANDARD_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00'
];

const buildDefaultSlotObjects = (dateStr) => {
  return STANDARD_SLOTS.map(time => {
    const expired = isSlotCutoff(time, dateStr);
    return {
      time,
      is_available: !expired,
      is_booked: false,
      is_expired: expired
    };
  });
};

export default function BookingWizard({ doctors: propDoctors = [], selectedDoctorId, onClose }) {
  const [step, setStep] = useState(1);
  const [doctorsList, setDoctorsList] = useState(propDoctors && propDoctors.length > 0 ? propDoctors : DEFAULT_DOCTORS);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [currentTimeTick, setCurrentTimeTick] = useState(Date.now());

  // Specialty Filter & Search in Step 1
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const todayStr = getLocalDateString(new Date());
  const [formData, setFormData] = useState({
    doctor_id: selectedDoctorId || (propDoctors?.[0]?.id || 1),
    appointment_date: todayStr,
    appointment_time: '',
    patient_name: '',
    patient_phone: '',
    patient_email: '',
    reason_for_visit: 'Comprehensive Eye Examination & Vision Consultation'
  });

  const [availableSlots, setAvailableSlots] = useState(() => buildDefaultSlotObjects(todayStr));
  const [isWorkingDay, setIsWorkingDay] = useState(true);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const dateInputRef = useRef(null);

  // Real-time dynamic heartbeat ticker (evaluates slot cutoffs every 10 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTimeTick(Date.now());
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  // Bulletproof Doctor Portrait Avatars
  const doctorFallbacks = [
    "/dr-rekha-sisodiya.jpg",
    "/dr-sachin-sisodiya.jpg",
    "/dr-kush.jpg",
    "/dr-bhavana.jpg"
  ];

  // Sync propDoctors if provided
  useEffect(() => {
    if (propDoctors && propDoctors.length > 0) {
      setDoctorsList(propDoctors);
    }
  }, [propDoctors]);

  // Fetch doctors list from backend
  const fetchDoctors = () => {
    setLoadingDoctors(true);
    fetch(`${API_BASE_URL}/api/doctors`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.doctors && data.doctors.length > 0) {
          setDoctorsList(data.doctors);
          if (!selectedDoctorId) {
            setFormData(prev => ({ ...prev, doctor_id: data.doctors[0].id }));
          }
        }
      })
      .catch(err => {
        console.error("Error fetching doctors:", err);
      })
      .finally(() => setLoadingDoctors(false));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (selectedDoctorId) {
      setFormData(prev => ({ ...prev, doctor_id: selectedDoctorId }));
    }
  }, [selectedDoctorId]);

  // Fetch Available Slots for Selected Doctor and Date with Live Real-Time Cutoff
  useEffect(() => {
    if (!formData.doctor_id || !formData.appointment_date) return;

    let isMounted = true;
    setLoadingSlots(true);

    fetch(`${API_BASE_URL}/api/appointments/available-slots?doctor_id=${formData.doctor_id}&date=${formData.appointment_date}`)
      .then(res => res.json())
      .then(data => {
        if (!isMounted) return;
        if (data.success) {
          setIsWorkingDay(data.is_working_day);
          const rawSlots = (data.all_slots && data.all_slots.length > 0)
            ? data.all_slots
            : buildDefaultSlotObjects(formData.appointment_date);

          const computedSlots = rawSlots.map(s => {
            const expired = isSlotCutoff(s.time, formData.appointment_date);
            return {
              ...s,
              is_available: (!s.is_booked && !expired && s.is_available !== false) || (!s.is_booked && !expired),
              is_expired: expired || Boolean(s.is_expired)
            };
          });

          setAvailableSlots(computedSlots);
        } else {
          setAvailableSlots(buildDefaultSlotObjects(formData.appointment_date));
        }
      })
      .catch(err => {
        if (!isMounted) return;
        console.warn("Backend slots API unavailable, applying client-side live engine:", err);
        setIsWorkingDay(true);
        setAvailableSlots(buildDefaultSlotObjects(formData.appointment_date));
      })
      .finally(() => {
        if (isMounted) setLoadingSlots(false);
      });

    return () => {
      isMounted = false;
    };
  }, [formData.doctor_id, formData.appointment_date, currentTimeTick]);

  // Auto-Select Valid Active Future Slot
  useEffect(() => {
    const freeSlots = availableSlots.filter(s => s.is_available);
    const isCurrentSlotValid = freeSlots.some(s => s.time === formData.appointment_time);

    if (!isCurrentSlotValid) {
      if (freeSlots.length > 0) {
        setFormData(prev => ({ ...prev, appointment_time: freeSlots[0].time }));
      } else {
        setFormData(prev => ({ ...prev, appointment_time: '' }));
      }
    }
  }, [availableSlots, formData.appointment_time]);

  const handleNext = () => {
    if (step === 1 && !formData.doctor_id) {
      toast.error("Please select an eye specialist to proceed.");
      return;
    }
    if (step === 2) {
      if (!isWorkingDay) {
        toast.error("The selected specialist is not on duty on this date. Please select another date.");
        return;
      }
      if (!formData.appointment_time) {
        toast.error("Please select an available consultation time slot.");
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.patient_name || !formData.patient_phone || !formData.patient_email) {
      toast.error("Please provide all required patient details.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setConfirmedBooking(data);
        setStep(4);

        const docName = data.doctor_name || selectedDoctor?.name || 'our senior specialist';

        // Instant Toast Notification
        toast.custom((t) => (
          <div className="bg-slate-900 border border-teal-500 text-white p-4 rounded-2xl shadow-2xl flex items-start space-x-3 max-w-sm">
            <Smartphone className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-xs text-teal-400">📱 Automated Notification Dispatched</div>
              <p className="text-xs text-slate-300 leading-snug">
                "Dear {formData.patient_name}, your consultation request (#REH-{data.appointment?.id}) with {docName} on {formData.appointment_date} at {formData.appointment_time} has been registered!"
              </p>
            </div>
          </div>
        ), { duration: 6000 });

      } else {
        toast.error(data.error || "Failed to book appointment.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedDoctor = doctorsList.find(d => d.id === parseInt(formData.doctor_id)) || doctorsList[0];
  const doctorDisplayName = confirmedBooking?.doctor_name || selectedDoctor?.name || 'Dr. Rekha Sisodiya';
  const doctorDisplaySpecialty = selectedDoctor?.specialty || 'Eye Specialist';

  // Specialty categories for filtering
  const specialtyCategories = [
    { id: 'All', label: 'All Specialists' },
    { id: 'LASIK', label: 'Cataract & LASIK' },
    { id: 'Retina', label: 'Retina & Vitreous' },
    { id: 'Glaucoma', label: 'Glaucoma & Pediatric' },
    { id: 'Cornea', label: 'Cornea & Dry Eye' },
    { id: 'General', label: 'General Eye Care' }
  ];

  // Filter doctors based on category and search query
  const filteredDoctors = doctorsList.filter(doc => {
    const spec = (doc.specialty || '').toLowerCase();
    const name = (doc.name || '').toLowerCase();
    const qual = (doc.qualification || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesCategory =
      selectedSpecialty === 'All' ||
      (selectedSpecialty === 'LASIK' && (spec.includes('lasik') || spec.includes('cataract') || spec.includes('refractive') || spec.includes('smile'))) ||
      (selectedSpecialty === 'Retina' && (spec.includes('retina') || spec.includes('diabetic') || spec.includes('vitreo'))) ||
      (selectedSpecialty === 'Glaucoma' && (spec.includes('glaucoma') || spec.includes('pediatric') || spec.includes('squint'))) ||
      (selectedSpecialty === 'Cornea' && (spec.includes('cornea') || spec.includes('dry eye') || spec.includes('ocular') || spec.includes('surface'))) ||
      (selectedSpecialty === 'General' && (spec.includes('general') || spec.includes('comprehensive') || spec.includes('ophthalmology')));

    const matchesSearch =
      q === '' ||
      name.includes(q) ||
      spec.includes(q) ||
      qual.includes(q);

    return matchesCategory && matchesSearch;
  });

  // Generate the next 14 quick select calendar days
  const quickDates = [];
  const curr = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + i);
    const dateStr = getLocalDateString(d);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = d.toLocaleDateString('en-US', { month: 'short' });
    const dayNum = d.getDate();
    quickDates.push({
      dateStr,
      dayName,
      monthName,
      dayNum,
      isToday: i === 0,
      isTomorrow: i === 1
    });
  }

  // Format chosen date in friendly long English format
  const getFormattedDateLabel = (dateString) => {
    try {
      const parts = dateString.split('-');
      const d = new Date(parts[0], parts[1] - 1, parts[2]);
      return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Group Available Slots by Session (Morning, Afternoon, Evening)
  const morningSlots = availableSlots.filter(s => {
    const hour = parseInt(s.time.split(':')[0]);
    return hour < 12;
  });
  const afternoonSlots = availableSlots.filter(s => {
    const hour = parseInt(s.time.split(':')[0]);
    return hour >= 12 && hour < 16;
  });
  const eveningSlots = availableSlots.filter(s => {
    const hour = parseInt(s.time.split(':')[0]);
    return hour >= 16;
  });

  // Build Professional English SMS & WhatsApp Direct Links
  const smsMessage = encodeURIComponent(
    `REKHA EYE HOSPITAL (REH)\n` +
    `Dear ${formData.patient_name},\n` +
    `Your appointment (#REH-${confirmedBooking?.appointment?.id}) with ${doctorDisplayName} on ${formData.appointment_date} at ${formData.appointment_time} is registered successfully.\n` +
    `Helpline: +91 7733866682`
  );
  const smsUrl = `sms:${formData.patient_phone}?body=${smsMessage}`;

  const waMessage = encodeURIComponent(
    `REKHA EYE HOSPITAL (REH)\n` +
    `Dear Reception Desk,\n` +
    `I have registered an appointment (Token: #REH-${confirmedBooking?.appointment?.id}) for ${formData.patient_name} with ${doctorDisplayName} (${doctorDisplaySpecialty}) on ${formData.appointment_date} at ${formData.appointment_time}.\n` +
    `Please assist with consultation confirmation.`
  );
  const waUrl = `https://wa.me/917733866682?text=${waMessage}`;

  return (
    <section id="booking-wizard" className="py-24 bg-gradient-to-b from-slate-100 via-teal-50/40 to-slate-50 relative overflow-hidden">
      
      {/* Soft Ambient Medical Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Frosted Glass Light Card */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200 shadow-2xl shadow-teal-950/10 space-y-8">
          
          {/* Header & Step Counter */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs sm:text-sm font-bold uppercase tracking-wider w-fit">
                <HeartPulse className="w-4 h-4 text-teal-600 animate-pulse" />
                <span>Live Doctor Scheduling Desk &bull; Instant Confirmation</span>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-bold bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 w-fit">
                Step <span className="text-teal-700 font-extrabold text-sm sm:text-base">{step}</span> of 4
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-slate-950 tracking-tight">
              {step === 1 && "Step 1: Select Your Specialist & Department"}
              {step === 2 && "Step 2: Choose Consultation Date & Slot"}
              {step === 3 && "Step 3: Patient Contact Information"}
              {step === 4 && "Appointment Confirmed & Notification Dispatched!"}
            </h2>
            
            {/* Smooth Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full mt-4 overflow-hidden border border-slate-200">
              <div
                className="bg-gradient-to-r from-teal-600 via-teal-500 to-cyan-500 h-full transition-all duration-500 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: Select Doctor with Specialty Filter & Search */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Filter Chips & Search Bar */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-700">
                    Filter by specialty or search ophthalmologist by name:
                  </p>
                  
                  {/* Search input */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search doctor or specialty..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-600 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                {/* Specialty Category Chips */}
                <div className="flex items-center space-x-2.5 overflow-x-auto pb-1 scrollbar-none">
                  {specialtyCategories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedSpecialty(cat.id)}
                      className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all border ${
                        selectedSpecialty === cat.id
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/30'
                          : 'bg-white text-slate-700 border-slate-200 hover:text-slate-950 hover:bg-slate-50 shadow-sm'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctors Grid */}
              {loadingDoctors ? (
                <div className="p-12 text-center text-slate-500 text-sm flex items-center justify-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin text-teal-600" />
                  <span>Loading available specialists...</span>
                </div>
              ) : filteredDoctors.length === 0 ? (
                <div className="p-10 rounded-3xl bg-slate-50 border border-slate-200 text-center text-slate-600 text-sm space-y-2">
                  <p className="font-semibold">No specialists found matching your search criteria.</p>
                  <button
                    onClick={() => { setSelectedSpecialty('All'); setSearchQuery(''); }}
                    className="text-teal-700 font-bold underline text-sm"
                  >
                    Reset filters &amp; view all doctors
                  </button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {filteredDoctors.map((doc, idx) => {
                    const isSelected = parseInt(formData.doctor_id) === doc.id;
                    const fallbackImg = doctorFallbacks[idx % doctorFallbacks.length];
                    return (
                      <div
                        key={doc.id}
                        onClick={() => setFormData({ ...formData, doctor_id: doc.id })}
                        className={`p-4 sm:p-5 rounded-3xl border cursor-pointer transition-all flex items-start space-x-4 relative ${
                          isSelected
                            ? 'bg-teal-50/90 border-teal-500 ring-2 ring-teal-500/30 shadow-lg'
                            : 'bg-white border-slate-200/90 hover:border-teal-500/40 hover:bg-slate-50/80 shadow-sm'
                        }`}
                      >
                        <div className="relative shrink-0">
                          <img
                            src={doc.photo_url || fallbackImg}
                            alt={doc.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = fallbackImg;
                            }}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white shadow-md bg-slate-100"
                          />
                          {isSelected && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-teal-600 rounded-full flex items-center justify-center text-white shadow-md border-2 border-white">
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        <div className="space-y-1.5 overflow-hidden flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-black text-base sm:text-lg text-slate-900 font-heading">
                              {doc.name}
                            </h3>
                          </div>
                          
                          <div className="inline-block px-2.5 py-1 rounded-lg bg-teal-100/70 text-teal-800 text-xs font-bold tracking-tight border border-teal-200/80">
                            {doc.specialty}
                          </div>
                          
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {doc.qualification}
                          </p>

                          <div className="text-xs text-slate-500 font-medium flex items-center space-x-1.5 pt-1">
                            <Clock className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                            <span>{doc.start_time} - {doc.end_time} &bull; {doc.available_days?.join(', ') || 'Mon-Sat'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Bottom Next Step Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-5 border-t border-slate-200">
                <div className="text-sm text-slate-600">
                  {selectedDoctor && (
                    <span>
                      Selected Doctor: <strong className="text-teal-800 font-bold">{selectedDoctor.name}</strong> ({selectedDoctor.specialty})
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.doctor_id}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-xl shadow-teal-600/30 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <span>Proceed to Select Date &amp; Slot</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Pick Date & Live Slots with Visual Calendar */}
          {step === 2 && (
            <div className="space-y-7 animate-fadeIn">
              
              {/* Selected Specialist Summary Pill */}
              {selectedDoctor && (
                <div className="p-4 rounded-3xl bg-teal-50/80 border border-teal-200 flex items-center justify-between shadow-sm">
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedDoctor.photo_url || doctorFallbacks[0]}
                      alt={selectedDoctor.name}
                      onError={(e) => {
                        e.target.src = doctorFallbacks[0];
                      }}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md bg-slate-100"
                    />
                    <div>
                      <div className="text-base font-black text-slate-900 font-heading">{selectedDoctor.name}</div>
                      <div className="text-xs font-bold text-teal-800">{selectedDoctor.specialty}</div>
                      <div className="text-xs text-slate-600">{selectedDoctor.qualification}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-2xl bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 border border-slate-200 shadow-sm transition-colors"
                  >
                    Change Specialist
                  </button>
                </div>
              )}

              {/* Visual Interactive Date Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <CalendarIcon className="w-4 h-4 text-teal-600" />
                    <span>Select Consultation Date</span>
                  </label>
                  
                  <button
                    type="button"
                    onClick={() => {
                      if (dateInputRef.current) {
                        try {
                          dateInputRef.current.showPicker();
                        } catch {
                          dateInputRef.current.focus();
                        }
                      }
                    }}
                    className="text-xs font-bold text-teal-700 hover:text-teal-800 underline"
                  >
                    Choose custom calendar date &rarr;
                  </button>
                </div>

                {/* Quick 14-Day Visual Carousel Grid */}
                <div className="flex items-center space-x-2.5 overflow-x-auto pb-2 pt-1 scrollbar-none">
                  {quickDates.map((item) => {
                    const isSelected = formData.appointment_date === item.dateStr;
                    return (
                      <button
                        key={item.dateStr}
                        type="button"
                        onClick={() => setFormData({ ...formData, appointment_date: item.dateStr })}
                        className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[76px] transition-all border shrink-0 ${
                          isSelected
                            ? 'bg-gradient-to-b from-teal-600 to-cyan-600 text-white border-teal-600 shadow-lg shadow-teal-600/30 scale-105'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
                        }`}
                      >
                        <span className="text-[11px] font-extrabold uppercase tracking-wider opacity-85">
                          {item.isToday ? 'Today' : item.isTomorrow ? 'Tmrw' : item.dayName}
                        </span>
                        <span className="text-lg font-black my-0.5">{item.dayNum}</span>
                        <span className="text-[11px] font-bold opacity-80">{item.monthName}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Native Date Picker Box */}
                <div 
                  onClick={() => {
                    if (dateInputRef.current) {
                      try {
                        dateInputRef.current.showPicker();
                      } catch {
                        dateInputRef.current.focus();
                      }
                    }
                  }}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-500 cursor-pointer transition-colors shadow-sm"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                      <CalendarIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-semibold">Scheduled Appointment Date</div>
                      <div className="text-sm font-black text-slate-900 font-heading">
                        {getFormattedDateLabel(formData.appointment_date)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      ref={dateInputRef}
                      type="date"
                      min={todayStr}
                      value={formData.appointment_date}
                      onChange={(e) => setFormData({ ...formData, appointment_date: e.target.value })}
                      className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-800 text-xs font-mono focus:outline-none cursor-pointer shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Live Booking Notice Banner */}
              <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs shadow-sm">
                <div className="flex items-center space-x-2 text-teal-900 font-bold">
                  <span className="relative flex h-2.5 w-2.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span>Live Dynamic Slot Engine Active</span>
                </div>
                <div className="text-teal-700 text-[11px] font-medium">
                  Slots automatically close 15 minutes before the start time.
                </div>
              </div>

              {/* Time Slots Selection Categorized */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-black text-slate-900 uppercase tracking-wider flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-teal-600" />
                    <span>Available Consultation Slots</span>
                  </label>
                  {loadingSlots && <Loader2 className="w-4 h-4 text-teal-600 animate-spin" />}
                </div>

                {!isWorkingDay ? (
                  <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-center space-x-3 shadow-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                    <span className="font-medium">{selectedDoctor?.name} is not on clinical duty on this date. Please select another date from the calendar.</span>
                  </div>
                ) : availableSlots.length === 0 ? (
                  <p className="text-sm text-slate-500">Loading consultation slots...</p>
                ) : (
                  <div className="space-y-5">

                    {/* Notice if no slots available for today */}
                    {availableSlots.filter(s => s.is_available).length === 0 && (
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start space-x-3 shadow-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                        <div>
                          <p className="font-black text-slate-900">All consultation slots for today are closed.</p>
                          <p className="text-amber-900 mt-1 leading-relaxed">
                            Hospital booking policy requires slots to be booked at least 15 minutes before the start time. Please select <strong>Tomorrow</strong> or another date from the calendar, or call our 24x7 emergency helpline at <strong className="text-teal-900">+91 7733866682</strong>.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* Morning Session */}
                    {morningSlots.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                          <Sun className="w-4 h-4 text-amber-500" />
                          <span>Morning Session (09:00 - 12:00)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                          {morningSlots.map((slotObj, idx) => {
                            const isSelected = formData.appointment_time === slotObj.time;
                            const isClosed = !slotObj.is_available;
                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={isClosed}
                                onClick={() => setFormData({ ...formData, appointment_time: slotObj.time })}
                                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all border flex flex-col items-center justify-center relative ${
                                  isClosed
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-55'
                                    : isSelected
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/25 scale-105 font-black'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-500 hover:bg-teal-50/50 shadow-sm cursor-pointer'
                                }`}
                              >
                                <span className={isClosed ? 'line-through text-slate-400 font-semibold' : ''}>{slotObj.time}</span>
                                {isClosed && (
                                  <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md mt-0.5 no-underline">
                                    {slotObj.is_expired ? 'Closed' : 'Booked'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Afternoon Session */}
                    {afternoonSlots.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                          <Sunset className="w-4 h-4 text-orange-500" />
                          <span>Afternoon Session (12:00 - 16:00)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                          {afternoonSlots.map((slotObj, idx) => {
                            const isSelected = formData.appointment_time === slotObj.time;
                            const isClosed = !slotObj.is_available;
                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={isClosed}
                                onClick={() => setFormData({ ...formData, appointment_time: slotObj.time })}
                                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all border flex flex-col items-center justify-center relative ${
                                  isClosed
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-55'
                                    : isSelected
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/25 scale-105 font-black'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-500 hover:bg-teal-50/50 shadow-sm cursor-pointer'
                                }`}
                              >
                                <span className={isClosed ? 'line-through text-slate-400 font-semibold' : ''}>{slotObj.time}</span>
                                {isClosed && (
                                  <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md mt-0.5 no-underline">
                                    {slotObj.is_expired ? 'Closed' : 'Booked'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Evening Session */}
                    {eveningSlots.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 uppercase tracking-wider">
                          <Moon className="w-4 h-4 text-indigo-500" />
                          <span>Evening Session (16:00 - 18:00)</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
                          {eveningSlots.map((slotObj, idx) => {
                            const isSelected = formData.appointment_time === slotObj.time;
                            const isClosed = !slotObj.is_available;
                            return (
                              <button
                                key={idx}
                                type="button"
                                disabled={isClosed}
                                onClick={() => setFormData({ ...formData, appointment_time: slotObj.time })}
                                className={`py-2.5 px-2 rounded-2xl text-xs sm:text-sm font-bold transition-all border flex flex-col items-center justify-center relative ${
                                  isClosed
                                    ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-55'
                                    : isSelected
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-md ring-2 ring-teal-500/25 scale-105 font-black'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-teal-500 hover:bg-teal-50/50 shadow-sm cursor-pointer'
                                }`}
                              >
                                <span className={isClosed ? 'line-through text-slate-400 font-semibold' : ''}>{slotObj.time}</span>
                                {isClosed && (
                                  <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded-md mt-0.5 no-underline">
                                    {slotObj.is_expired ? 'Closed' : 'Booked'}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                  </div>
                )}
              </div>

              {/* Navigation Actions */}
              <div className="flex items-center justify-between pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Doctors</span>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!formData.appointment_time || !isWorkingDay}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 text-white font-black text-xs sm:text-sm flex items-center space-x-2 shadow-xl shadow-teal-600/30 transition-all transform hover:scale-105 active:scale-95"
                >
                  <span>Enter Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: Patient Information Form */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
              
              <div className="p-4 rounded-3xl bg-teal-50/90 border border-teal-200 text-sm text-teal-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                <div>
                  <div className="font-black text-base text-slate-900 font-heading">Consultation with {selectedDoctor?.name}</div>
                  <div className="text-xs text-teal-800 font-bold">{selectedDoctor?.specialty}</div>
                </div>
                <div className="font-mono bg-white px-4 py-2 rounded-2xl text-teal-800 font-black text-xs sm:text-sm border border-teal-200 shadow-sm w-fit">
                  {formData.appointment_date} at {formData.appointment_time}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">Full Patient Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sachin Sisodiya"
                      value={formData.patient_name}
                      onChange={(e) => setFormData({ ...formData, patient_name: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 transition-colors shadow-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-slate-800">Mobile Phone Number (WhatsApp / SMS) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="7733866682"
                      value={formData.patient_phone}
                      onChange={(e) => setFormData({ ...formData, patient_phone: e.target.value })}
                      className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 transition-colors shadow-sm font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">Email Address (For Digital Receipts) *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="patient@example.com"
                    value={formData.patient_email}
                    onChange={(e) => setFormData({ ...formData, patient_email: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-bold text-slate-800">Reason for Consultation / Symptoms</label>
                <div className="relative">
                  <FileText className="w-4 h-4 absolute left-4 top-4 text-slate-400" />
                  <textarea
                    rows={2}
                    placeholder="e.g. Blade-free Femto LASIK assessment, cataract evaluation, routine eye checkup..."
                    value={formData.reason_for_visit}
                    onChange={(e) => setFormData({ ...formData, reason_for_visit: e.target.value })}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-teal-600 transition-colors shadow-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm flex items-center space-x-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-9 py-3.5 rounded-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs sm:text-sm shadow-xl shadow-teal-600/30 flex items-center space-x-2 transform hover:scale-105 active:scale-95 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming &amp; Dispatching Notification...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Confirm Consultation &amp; Dispatch Notification</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

          {/* STEP 4: Success Screen with Professional English Format */}
          {step === 4 && confirmedBooking && (
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              
              <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center border-2 border-emerald-200 shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-2xl sm:text-3xl font-black font-heading text-slate-900">
                  Appointment Confirmed &amp; Notification Dispatched!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  An official confirmation has been dispatched to <strong>+91 {formData.patient_phone}</strong> via WhatsApp and SMS.
                </p>
              </div>

              {/* Official Hospital Confirmation Card */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-slate-50 border border-teal-500/30 text-left space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-black text-teal-800 uppercase tracking-wider">OFFICIAL CONFIRMATION ADVISORY</span>
                  </div>
                  <span className="font-mono font-bold text-xs text-teal-800 bg-white px-3 py-1 rounded-xl border border-teal-200 shadow-sm">
                    #REH-{confirmedBooking.appointment?.id}
                  </span>
                </div>
                
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 font-sans leading-relaxed space-y-2.5">
                  <div className="text-teal-800 font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-teal-600" />
                    <span>REKHA EYE HOSPITAL &amp; LASIK CENTER</span>
                  </div>
                  
                  <p className="text-slate-700 text-xs sm:text-sm">
                    Dear <strong>{confirmedBooking.appointment?.patient_name}</strong>, your consultation appointment has been registered successfully with <strong>{doctorDisplayName}</strong> (<em>{doctorDisplaySpecialty}</em>).
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 block">Date:</span>
                      <span className="font-black text-slate-900 font-mono">{confirmedBooking.appointment?.appointment_date}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Time:</span>
                      <span className="font-black text-slate-900 font-mono">{confirmedBooking.appointment?.appointment_time}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 pt-1 border-t border-slate-100">
                    Status: <strong className="text-emerald-700 font-bold">Confirmed / Scheduled for Consultation</strong>
                  </div>

                  <div className="text-xs text-slate-500 pt-0.5">
                    24x7 Hospital Helpline: <strong>+91 7733866682</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-slate-500">
                  <span>Facility: REH Medical Tower, Agra Road, Jaipur</span>
                  <span className="text-teal-700 font-bold">NABH Accredited</span>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm shadow-lg shadow-[#25D366]/30 flex items-center justify-center space-x-2.5 transition-all transform hover:scale-105 active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Open WhatsApp Hospital Desk</span>
                </a>

                <a
                  href={smsUrl}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-teal-600/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-105"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Open SMS App (+91 {formData.patient_phone})</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setConfirmedBooking(null);
                    if (onClose) onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-colors"
                >
                  Book Another Appointment
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
}
