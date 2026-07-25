import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';
import { useSettings } from '../hooks/useFirestore';

// High-resolution Pinterest-style technology background image
const PINTEREST_TECH_BG_IMAGE = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000";

/* ━━━ CTA SECTION WITH BACKGROUND IMAGE ━━━ */
export default function CTASection({ 
  title = "Ready to Transform Your Business?", 
  subtitle = "Let's discuss how MAAGSYS can help you achieve your technology goals.", 
  btnText = "Get in Touch",
  btnLink = "/contact",
  bgImage = PINTEREST_TECH_BG_IMAGE
}) {
  const { settings } = useSettings();
  const phone = settings.contactPhone || '+1 518-600-8020';

  return (
    <section className="relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex items-center justify-center bg-black text-white">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <img
          src={bgImage}
          alt="CTA Background"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-700"
        />
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-black/80 to-brand-950/90 z-10" />
      </div>

      {/* Content - Original Structure */}
      <div className="container-main section-padding py-14 sm:py-20 relative z-20">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight mb-5">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-brand-200 mb-10 leading-relaxed">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={btnLink} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-sm hover:bg-gray-50 transition-all hover:shadow-xl text-sm group">
              {btnText}
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-medium rounded-sm hover:bg-white/10 transition-all text-sm">
              Call {phone}
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

/* ━━━ PREVIOUS STATIC GRADIENT CTA SECTION (COMMENTED OUT AS REQUESTED) ━━━
export default function OldStaticCTASection({ 
  title = "Ready to Transform Your Business?", 
  subtitle = "Let's discuss how MAAGSYS can help you achieve your technology goals.", 
  btnText = "Get in Touch",
  btnLink = "/contact"
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900">
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="cta-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-dots)" />
        </svg>
      </div>
      <div className="container-main section-padding py-14 sm:py-20 relative z-10">
        <AnimatedSection className="text-center max-w-3xl mx-auto">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight mb-5">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-brand-200 mb-10 leading-relaxed">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to={btnLink} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-brand-700 font-semibold rounded-sm hover:bg-gray-50 transition-all hover:shadow-xl text-sm group">
              {btnText}
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="tel:+15186008020" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-medium rounded-sm hover:bg-white/10 transition-all text-sm">
              Call +1 518-600-8020
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
*/
