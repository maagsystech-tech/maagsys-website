import React from 'react';
import AnimatedSection from './AnimatedSection';

export default function SectionHeader({ tag, title, subtitle, align = 'center', light = false }) {
  return (
    <AnimatedSection className={`mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className={`section-title ${light ? 'text-white' : ''} ${align === 'center' ? 'mx-auto' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle mt-4 ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-white/60' : ''}`}>
          {subtitle}
        </p>
      )}
    </AnimatedSection>
  );
}
