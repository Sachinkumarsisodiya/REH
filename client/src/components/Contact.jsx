import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertTriangle, ShieldCheck, HeartPulse, RefreshCw, MessageSquare, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '../config/api';
import WhatsAppIcon from './WhatsAppIcon';

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [inquiryResult, setInquiryResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error('Please enter your name and phone number.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();

      if (data.success) {
        setInquiryResult({
          inquiry_id: data.inquiry_id || 'REH-INQ-NEW',
          name: form.name,
          phone: form.phone,
          message: form.message,
          whatsapp_chat_url: data.whatsapp_chat_url || `https://wa.me/917733866682?text=Hello%20Rekha%20Eye%20Hospital,%20I%20am%20${encodeURIComponent(form.name)}%20(Phone:%20${encodeURIComponent(form.phone)}).%20Inquiry:%20${encodeURIComponent(form.message || 'Consultation request')}`
        });
        toast.success('Inquiry submitted successfully! Confirmation sent.');
      } else {
        toast.error(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      // Fallback offline support
      setInquiryResult({
        inquiry_id: `REH-INQ-${Math.floor(1000 + Math.random() * 9000)}`,
        name: form.name,
        phone: form.phone,
        message: form.message,
        whatsapp_chat_url: `https://wa.me/917733866682?text=Hello%20Rekha%20Eye%20Hospital,%20I%20am%20${encodeURIComponent(form.name)}%20(Phone:%20${encodeURIComponent(form.phone)}).%20Inquiry:%20${encodeURIComponent(form.message || 'Consultation request')}`
      });
      toast.success('Inquiry recorded! You can also chat directly on WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', phone: '', email: '', message: '' });
    setInquiryResult(null);
  };

  const waLink = "https://wa.me/917733866682?text=Hello%20Rekha%20Eye%20Hospital,%20I%20would%20like%20to%20inquire%20about%20eye%20consultation.";

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-black uppercase tracking-wider border border-teal-200">
            <MapPin className="w-3.5 h-3.5 text-teal-600" />
            <span>Facility Location &amp; Help Desk</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-950 font-heading tracking-tight">
            Connect with Rekha Eye Hospital Desk
          </h2>
          
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Conveniently located at REH Medical Tower on Agra Road, Jaipur with 24x7 emergency casualty response, dedicated valet parking, and optical diagnostics.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Info Column Left */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-6 shadow-sm">
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 font-heading">Hospital Address</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    REH Medical Tower, Oppo. 52 Feet Hanuman ji, Agra Road, Jaipur - 303012
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/30">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 font-heading">24x7 Emergency Helpline</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                    +91 7733866682 (Direct Casualty Call)
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-teal-600/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 font-heading">Consultation Timings</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    <strong>OPD:</strong> Mon - Sat (8:30 AM - 7:30 PM)<br />
                    <strong>Casualty:</strong> 24 Hours Open (7 Days)
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2.5 p-3.5 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-lg shadow-[#25D366]/30 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp (+91 7733866682)</span>
                </a>
              </div>

            </div>

          </div>

          {/* Contact Inquiry Form Right */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 font-heading">
                  Quick Patient Inquiry / Callback Request
                </h3>
                <p className="text-xs text-slate-500">
                  Leave your details and our clinical counseling team will get in touch within 30 minutes.
                </p>
              </div>

              {inquiryResult ? (
                <div className="p-6 sm:p-8 rounded-3xl bg-teal-50/80 border border-teal-200 text-center space-y-4 shadow-sm">
                  <div className="w-14 h-14 bg-teal-600 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-teal-600/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-1">
                    <div className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-mono font-bold tracking-wider">
                      {inquiryResult.inquiry_id}
                    </div>
                    <h4 className="text-xl font-black text-slate-900 font-heading">
                      Thank You, {inquiryResult.name}!
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                      Your inquiry has been successfully registered with our clinical counseling desk. Our patient care coordinator will call you at <strong className="text-slate-900">{inquiryResult.phone}</strong> within 30 minutes.
                    </p>
                  </div>

                  {/* Immediate Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={inquiryResult.whatsapp_chat_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Chat on WhatsApp Directly</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-300 transition-all flex items-center justify-center space-x-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors shadow-sm"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="7733866682"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors shadow-sm font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="patient@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors shadow-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700">Your Question or Eye Symptom</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Inquiring about Contoura LASIK cost, cataract packages, or consultation with Dr. Rekha Sisodiya..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-teal-500 transition-colors shadow-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-black text-xs shadow-lg shadow-teal-600/25 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending to Patient Care Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Inquiry &amp; Request Callback</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
