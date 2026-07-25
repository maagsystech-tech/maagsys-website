import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

export default function ContactForm({ source = 'contact', compact = false }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
  //     toast.error('Please fill in all required fields.');
  //     return;
  //   }
  //   setSubmitting(true);
  //   try {
  //     await addDoc(collection(db, 'contactSubmissions'), {
  //       ...form,
  //       source,
  //       status: 'new',
  //       createdAt: serverTimestamp(),
  //     });
  //     toast.success('Message sent successfully! We\'ll get back to you shortly.');
  //     setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  //   } catch {
  //     toast.error('Failed to send message. Please try again.');
  //   }
  //   setSubmitting(false);
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'contactSubmissions'), {
        ...form,
        source,
        status: 'new',
        submittedAt: serverTimestamp(), // Changed from 'createdAt' to 'submittedAt'
      });
      toast.success('Message sent successfully! We\'ll get back to you shortly.');
      setForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.');
    }
    setSubmitting(false);
  };

  const inputClass = "w-full px-4 py-3.5 bg-surface-50 border border-surface-200 rounded-sm text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-all";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-5`}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Smith" required className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Email <span className="text-red-400">*</span></label>
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@company.com" required className={inputClass} />
        </div>
      </div>
      {!compact && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
            <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
            <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="Company name" className={inputClass} />
          </div>
        </div>
      )}
      {!compact && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Service of Interest</label>
          <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
            <option value="">Select a service</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="data-engineering">Data Engineering</option>
            <option value="cloud-engineering">Cloud Engineering</option>
            <option value="ai-ml">AI / ML</option>
            <option value="staffing">Staffing</option>
            <option value="grc">GRC</option>
            <option value="app-development">App Development</option>
            <option value="other">Other</option>
          </select>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Message <span className="text-red-400">*</span></label>
        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project or inquiry..."
          required rows={compact ? 4 : 5} className={`${inputClass} resize-none`} />
      </div>
      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto disabled:opacity-60">
        {submitting ? (
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
            Sending...
          </span>
        ) : 'Send Message'}
      </button>
    </form>
  );
}
