import React from 'react';
import { useInView } from 'react-intersection-observer';

export default function AnimatedSection({ children, className = '', delay = 0, direction = 'up' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const directions = {
    up: 'translate-y-8',
    down: '-translate-y-8',
    left: 'translate-x-8',
    right: '-translate-x-8',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directions[direction]}`
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
