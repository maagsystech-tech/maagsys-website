import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PageLoader from './components/PageLoader';
import { useSettings } from './hooks/useFirestore';
import logo from './assets/maagsys_logo.png';
import textLogo from './assets/maagsys_text_logo.png';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const DataEngineering = lazy(() => import('./pages/DataEngineering'));
const CloudEngineering = lazy(() => import('./pages/CloudEngineering'));
const AIML = lazy(() => import('./pages/AIML'));
const Cybersecurity = lazy(() => import('./pages/Cybersecurity'));
const Staffing = lazy(() => import('./pages/Staffing'));
const GRC = lazy(() => import('./pages/GRC'));
const AppDevelopment = lazy(() => import('./pages/AppDevelopment'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Contact = lazy(() => import('./pages/Contact'));
const Careers = lazy(() => import('./pages/Careers'));
const CustomServicePage = lazy(() => import('./pages/CustomServicePage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/TermsConditions'));
const NotFound = lazy(() => import('./pages/NotFound'));

export default function App() {
  const { settings, loading } = useSettings();

  if (loading) {
    return <PageLoader />;
  }

  if (settings.maintenanceMode) {
    return (
      <HelmetProvider>
        <div className="min-h-screen bg-white text-slate-800 flex flex-col justify-between font-sans relative overflow-hidden select-none">
          {/* Subtle grid background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="maint-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="black" strokeWidth="0.5" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#maint-grid)" />
            </svg>
          </div>

          {/* Main logo / header */}
          <header className="p-8 flex items-center justify-between border-b border-slate-100 relative z-10">
            <div className="flex items-center gap-2">
              <img src={logo} alt="MAAGSYS Logo" className="h-10 w-auto object-contain" />
              <img src={textLogo} alt="MAAGSYS" className="h-7 w-auto object-contain" />
            </div>
          </header>

          {/* Maintenance details */}
          <main className="flex-1 flex flex-col items-center justify-center px-6 text-center max-w-2xl mx-auto relative z-10 py-16">
            <div className="w-16 h-16 bg-brand-50 border border-brand-100 text-brand-600 rounded-sm flex items-center justify-center mb-8 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>

            <h1 className="font-sans text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4 uppercase">
              System Maintenance Underway
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-10">
              {settings.maintenanceMessage || 'We are currently performing scheduled maintenance. Please check back soon.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-mono text-slate-500 bg-slate-50 border border-slate-200/60 px-6 py-4 rounded-sm">
              {settings.contactEmail && (
                <span>Email: <a href={`mailto:${settings.contactEmail}`} className="text-brand-600 hover:underline">{settings.contactEmail}</a></span>
              )}
              {settings.contactPhone && (
                <span className="hidden sm:inline text-slate-300">|</span>
              )}
              {settings.contactPhone && (
                <span>Phone: <span className="text-brand-600">{settings.contactPhone}</span></span>
              )}
            </div>
          </main>

          {/* Footer bar */}
          <footer className="p-8 border-t border-slate-100 text-center text-xs text-slate-400 relative z-10">
            &copy; {new Date().getFullYear()} {settings.siteName || 'MAAGSYS'}. All rights reserved.
          </footer>
        </div>
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <Helmet>
        <title>{settings.metaTitle || 'MAAGSYS — Digital Transformation & Technology Solutions'}</title>
        <meta name="description" content={settings.metaDescription || 'MAAGSYS provides expert solutions in Cybersecurity, Data Engineering, Cloud Engineering, AI/ML, and Technology Staffing.'} />
      </Helmet>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/data-engineering" element={<DataEngineering />} />
                <Route path="/services/cloud-engineering" element={<CloudEngineering />} />
                <Route path="/services/ai-ml" element={<AIML />} />
                <Route path="/services/cybersecurity" element={<Cybersecurity />} />
                <Route path="/services/staffing" element={<Staffing />} />
                <Route path="/services/grc" element={<GRC />} />
                <Route path="/services/app-development" element={<AppDevelopment />} />
                <Route path="/services/:slug" element={<CustomServicePage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: { background: '#1a1a2e', color: '#fff', fontSize: '14px', borderRadius: '10px' },
          }}
        />
      </Router>
    </HelmetProvider>
  );
}
