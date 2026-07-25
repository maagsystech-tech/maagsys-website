import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useCollection, useSettings } from '../hooks/useFirestore';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import { ShimmerCard } from '../components/Shimmer';
import toast from 'react-hot-toast';
import {
  FiBriefcase, FiMapPin, FiClock, FiDollarSign,
  FiChevronDown, FiChevronUp, FiSend, FiUsers,
  FiTrendingUp, FiHeart, FiAward, FiUpload
} from 'react-icons/fi';

const perks = [
  { icon: FiTrendingUp, title: 'Career Growth', desc: 'Clear paths for advancement with mentorship and training programs.' },
  { icon: FiHeart, title: 'Work-Life Balance', desc: 'Flexible schedules and remote-first culture to support your lifestyle.' },
  { icon: FiAward, title: 'Competitive Benefits', desc: 'Health insurance, retirement plans, paid time off, and performance bonuses.' },
  { icon: FiUsers, title: 'Great Team Culture', desc: 'Collaborative, inclusive environment where every voice matters.' },
];

function JobCard({ job }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedSection>
      <div className="bg-white rounded-sm border border-gray-100 hover:border-brand-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-brand-50 text-brand-700 px-3 py-0.5 rounded-sm text-xs font-semibold">
                  {job.type || 'Full-Time'}
                </span>
                {job.remote && (
                  <span className="bg-green-50 text-green-700 px-3 py-0.5 rounded-sm text-xs font-semibold">Remote</span>
                )}
              </div>
              <h3 className="text-xl font-medium text-gray-900">{job.title}</h3>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-500">
                {job.department && (
                  <span className="flex items-center gap-1"><FiBriefcase className="w-3.5 h-3.5" /> {job.department}</span>
                )}
                <span className="flex items-center gap-1"><FiMapPin className="w-3.5 h-3.5" /> {job.location || 'Albany, NY'}</span>
                {job.experience && (
                  <span className="flex items-center gap-1"><FiClock className="w-3.5 h-3.5" /> {job.experience}</span>
                )}
                {job.salary && (
                  <span className="flex items-center gap-1"><FiDollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                )}
              </div>
            </div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-brand-600 hover:text-brand-700 font-medium text-sm transition-colors self-start"
            >
              {expanded ? 'Hide Details' : 'View Details'}
              {expanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {job.excerpt && !expanded && (
            <p className="text-gray-600 text-sm mt-3 line-clamp-2">{job.excerpt}</p>
          )}
        </div>

        {expanded && (
          <div className="border-t border-gray-100 p-6 bg-surface-50 animate-fadeUp">
            {job.description && (
              <div className="prose prose-sm max-w-none text-gray-600 mb-6" dangerouslySetInnerHTML={{ __html: job.description }} />
            )}
            {job.requirements && job.requirements.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                <ul className="space-y-1.5">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-brand-500 rounded-full mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Responsibilities</h4>
                <ul className="space-y-1.5">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 bg-accent-500 rounded-full mt-2 flex-shrink-0" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <a
              href={job.applyUrl || '#apply'}
              className="btn-primary inline-flex items-center gap-2"
              onClick={(e) => {
                if (!job.applyUrl) {
                  e.preventDefault();
                  document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <FiSend className="w-4 h-4" /> Apply Now
            </a>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

export default function Careers() {
  const { data: rawJobs, loading } = useCollection('careers', [['published', '==', true]]);
  const jobs = (rawJobs || []).filter(job => job.published !== false);
  const { settings } = useSettings();
  const [form, setForm] = useState({ name: '', email: '', phone: '', position: '', message: '' });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.position) {
      toast.error('Please fill in required fields.');
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        name: form.name,
        email: form.email,
        phone: form.phone || '',
        position: form.position,
        message: form.message || '',
        resumeFileName: file?.name || null,
        service: `Career Application: ${form.position}`,
        submittedAt: serverTimestamp(),
        status: 'new',
      };

      await Promise.all([
        addDoc(collection(db, 'contactSubmissions'), payload),
        addDoc(collection(db, 'careerApplications'), payload),
      ]);

      toast.success('Application submitted successfully!');
      setForm({ name: '', email: '', phone: '', position: '', message: '' });
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
    setSubmitting(false);
  };

  if (settings && !settings.careersEnabled) {
    return (
      <>
        <Helmet><title>Careers MAAGSYS</title></Helmet>
        <PageHero title="Careers" breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]} />
        <div className="py-20 text-center max-w-2xl mx-auto px-4">
          <FiBriefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Open Positions Right Now</h2>
          <p className="text-gray-500 mb-6">We're not actively hiring at the moment, but we're always looking for talented people. Send us your resume and we'll keep it on file.</p>
          <Link to="/contact" className="btn-primary">Get in Touch</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Careers Join Our Team | MAAGSYS</title>
        <meta name="description" content="Explore career opportunities at MAAGSYS. Join our team of cybersecurity, cloud, data, and AI/ML experts." />
      </Helmet>

      <PageHero
        title="Join Our Team"
        subtitle="Be part of a team that's shaping the future of IT consulting. Explore open positions and find your next opportunity."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Careers' }]}
      />

      {/* Why Work With Us */}
      <section className="py-16 lg:py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Why MAAGSYS" title="Why You'll Love Working Here" subtitle="We invest in our people and create an environment where great work happens." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {perks.map((p, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="bg-white rounded-sm p-6 text-center border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 h-full">
                  <div className="w-12 h-12 bg-brand-50 rounded-sm flex items-center justify-center mx-auto mb-4">
                    <p.icon className="w-6 h-6 text-brand-600" />
                  </div>
                  <h3 className="font-medium text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm">{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Open Positions" title="Current Opportunities" subtitle="Find a role that matches your skills and ambitions." />

          <div className="mt-12 space-y-4">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => <ShimmerCard key={i} />)
            ) : jobs && jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="text-center py-12 bg-surface-50 rounded-md">
                <FiBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No open positions currently</h3>
                <p className="text-gray-500 text-sm">Check back soon or submit your resume below.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply" className="py-16 lg:py-20 bg-surface-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader tag="Apply Now" title="Send Us Your Application" subtitle="Interested in working with us? Fill out the form below and our team will get back to you." />

          <AnimatedSection>
            <form onSubmit={handleSubmit} className="mt-10 bg-white rounded-md border border-gray-100 p-6 sm:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="w-full px-4 py-2.5 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="w-full px-4 py-2.5 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" placeholder="john@example.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" placeholder="+1 (518) 000-0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Position Applying For *</label>
                  <input type="text" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required className="w-full px-4 py-2.5 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm" placeholder="e.g. Cloud Engineer" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Resume / CV</label>
                <div className="border-2 border-dashed border-gray-200 rounded-sm p-4 text-center cursor-pointer hover:border-brand-300 transition-colors" onClick={() => document.getElementById('resumeInput')?.click()}>
                  <FiUpload className="w-6 h-6 text-gray-400 mx-auto mb-1.5" />
                  <p className="text-sm text-gray-500">
                    {file ? file.name : 'Click to upload (PDF, DOC, DOCX)'}
                  </p>
                  <input id="resumeInput" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Cover Letter / Message</label>
                <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-2.5 rounded-sm border border-gray-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all text-sm resize-none" placeholder="Tell us about yourself and why you'd like to join MAAGSYS..." />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <><FiSend className="w-4 h-4" /> Submit Application</>
                )}
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>

      <CTASection />
    </>
  );
}
