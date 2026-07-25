import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const stats = [
  { value: 20, suffix: '+', label: 'Years Combined Experience' },
  { value: 15, suffix: '+', label: 'Successful Client Cases' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
  { value: 50, suffix: '+', label: 'Technology Experts' },
];

export default function StatsCounter({ items = stats, light = false }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
      {items.map((stat, i) => (
        <div key={i} className="text-center">
          <div className={`font-display text-2xl lg:text-3xl font-bold mb-2 ${light ? 'text-white' : 'text-brand-600'}`}>
            {inView ? <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} /> : `0${stat.suffix}`}
          </div>
          <p className={`text-sm font-medium ${light ? 'text-white/60' : 'text-gray-500'}`}>{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
