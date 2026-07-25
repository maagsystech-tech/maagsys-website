import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiChevronRight } from 'react-icons/hi';

// High-resolution curated background images per navigation route
const ROUTE_HERO_IMAGES = {
  '/about': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000', // Team / Company Workspace
  '/services': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000', // Cloud Tech & Architecture
  '/blog': 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2000', // Tech Insights & Publications
  '/careers': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000', // Careers & Talent Growth
  '/contact': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2000', // Global Connectivity & Support
  '/privacy': 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2000', // Cybersecurity & Privacy
  '/terms': 'https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=2000', // Legal & Documentation
};

const DEFAULT_HERO_BG_IMAGE = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2000';

/* ━━━ PAGE HERO WITH AUTOMATIC PER-ROUTE BACKGROUND IMAGES ━━━ */
export default function PageHero({ 
  tag, 
  title, 
  subtitle, 
  breadcrumbs = [],
  bgImage 
}) {
  const location = useLocation();
  const path = (location.pathname || '').toLowerCase();

  // Dynamically resolve background image based on active route or explicit prop
  let resolvedBg = bgImage;
  if (!resolvedBg) {
    if (path.startsWith('/about')) resolvedBg = ROUTE_HERO_IMAGES['/about'];
    else if (path.startsWith('/services')) resolvedBg = ROUTE_HERO_IMAGES['/services'];
    else if (path.startsWith('/blog')) resolvedBg = ROUTE_HERO_IMAGES['/blog'];
    else if (path.startsWith('/careers')) resolvedBg = ROUTE_HERO_IMAGES['/careers'];
    else if (path.startsWith('/contact')) resolvedBg = ROUTE_HERO_IMAGES['/contact'];
    else if (path.startsWith('/privacy')) resolvedBg = ROUTE_HERO_IMAGES['/privacy'];
    else if (path.startsWith('/terms')) resolvedBg = ROUTE_HERO_IMAGES['/terms'];
    else resolvedBg = DEFAULT_HERO_BG_IMAGE;
  }

  return (
    <section className="relative overflow-hidden bg-black text-white min-h-[300px] sm:min-h-[360px] flex items-center">
      
      {/* Background Image Engine Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none w-full h-full">
        <img
          src={resolvedBg}
          alt={title || "Header Background"}
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-all duration-700"
        />
        {/* Dark Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-black/80 to-brand-950/90 z-10" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="page-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#page-hero-grid)" />
        </svg>
      </div>

      {/* Content Layer */}
      <div className="container-main section-padding pt-24 pb-16 sm:pt-32 sm:pb-20 relative z-20 w-full">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-brand-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <HiChevronRight className="w-4 h-4 text-brand-400" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base sm:text-lg text-brand-200 leading-relaxed max-w-3xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

/* ━━━ OLD STATIC GRADIENT PAGE HERO (COMMENTED OUT AS REQUESTED) ━━━
export default function OldStaticPageHero({ tag, title, subtitle, breadcrumbs = [] }) {
  return (
    <section className="relative bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full border border-white/20 -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full border border-white/20 translate-y-1/2 -translate-x-1/3" />
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      <div className="container-main section-padding pt-20 pb-14 sm:pt-28 sm:pb-20 relative z-10">
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm text-brand-200 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            {breadcrumbs.map((crumb, i) => (
              <React.Fragment key={i}>
                <HiChevronRight className="w-4 h-4 text-brand-400" />
                {crumb.path ? (
                  <Link to={crumb.path} className="hover:text-white transition-colors">{crumb.label}</Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white tracking-tight leading-tight max-w-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 text-base sm:text-lg text-brand-200 leading-relaxed max-w-3xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
*/
