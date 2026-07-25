import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

import { useSettings } from '../hooks/useFirestore';
import logo from "../assets/maagsys_logo.png";
import textLogo from "../assets/maagsys_text_logo.png";

const footerServices = [
  { name: 'Cybersecurity', path: '/services/cybersecurity' },
  { name: 'Data Engineering', path: '/services/data-engineering' },
  { name: 'Cloud Engineering', path: '/services/cloud-engineering' },
  { name: 'AI / ML', path: '/services/ai-ml' },
  { name: 'Staffing', path: '/services/staffing' },
  { name: 'GRC', path: '/services/grc' },
  { name: 'App Development', path: '/services/app-development' },
];

export default function Footer() {
  const { settings } = useSettings();
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);

  const siteName = settings.siteName || 'MAAGSYS';
  const siteTagline = settings.siteTagline || 'Bridging vision and reality through modern technology solutions. We empower businesses to thrive in the digital age.';
  const contactEmail = settings.contactEmail || 'contact@maagsys.com';
  const contactPhone = settings.contactPhone || '+1 518-600-8020';
  const address = settings.address || '12 Metro Park Rd, Suite #207, Albany, NY 12205';

  const socials = [
    { icon: FaFacebookF, url: settings.facebookUrl || 'https://facebook.com/maagsys', label: 'Facebook' },
    { icon: FaXTwitter, url: settings.twitterUrl || 'https://x.com/maagsys', label: 'X' },
    { icon: FaInstagram, url: settings.instagramUrl || 'https://instagram.com/maagsys', label: 'Instagram' },
    { icon: FaLinkedinIn, url: settings.linkedinUrl || 'https://linkedin.com/company/maagsys', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    settings.blogEnabled !== false && { name: 'Blog', path: '/blog' },
    settings.careersEnabled !== false && { name: 'Careers', path: '/careers' },
    settings.contactFormEnabled !== false && { name: 'Contact', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-conditions' },
  ].filter(Boolean);

  const handleNewsletter = async (e) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail) return;
    setSubscribing(true);
    try {
      const payload = {
        email: cleanEmail,
        subscribedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        active: true,
      };

      await addDoc(collection(db, 'newsletterSubscribers'), payload);
      addDoc(collection(db, 'newsletter'), payload).catch(() => {});

      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (err) {
      console.error('Newsletter subscribe error:', err);
      toast.error('Something went wrong. Please try again.');
    }
    setSubscribing(false);
  };

  const renderLogo = () => {
    return (
      <div className="flex items-center gap-2">
        <img src={logo} alt="MAAGSYS Logo" className="h-10 w-auto object-contain" />
        <img src={textLogo} alt="MAAGSYS" className="h-7 w-auto object-contain" />
      </div>
    );
  };

  return (
    <footer className="bg-[#212529] text-gray-400">
      {/* Newsletter bar */}
      {settings.newsletterEnabled !== false && (
        <div className="border-b border-white/10">
          <div className="container-main section-padding py-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-display font-semibold text-xl mb-1">Stay informed</h3>
              <p className="text-sm text-gray-500">Get the latest insights on cybersecurity, cloud, and digital transformation.</p>
            </div>
            <form onSubmit={handleNewsletter} className="flex w-full lg:w-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 lg:w-72 px-4 py-3 bg-white/5 border border-white/10 rounded-l-sm text-white placeholder:text-gray-600 text-sm focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button
                type="submit"
                disabled={subscribing}
                className="px-6 py-3 bg-brand-600 text-white text-sm font-medium rounded-r-sm hover:bg-brand-500 transition-colors disabled:opacity-60"
              >
                {subscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main footer */}
      <div className="container-main section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-5">
              {renderLogo()}
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-500">
              {siteTagline}
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, url, label }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((s) => (
                <li key={s.path}>
                  <Link to={s.path} className="text-sm hover:text-white transition-colors">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Company</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.path}>
                  <Link to={l.path} className="text-sm hover:text-white transition-colors">{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 tracking-wide uppercase">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                <span className="text-sm">{address}</span>
              </li>
              <li>
                <a href={`tel:${contactPhone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <HiPhone className="w-5 h-5 text-brand-400 shrink-0" />
                  <span className="text-sm">{contactPhone}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <HiMail className="w-5 h-5 text-brand-400 shrink-0" />
                  <span className="text-sm">{contactEmail}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-main section-padding py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-conditions" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
