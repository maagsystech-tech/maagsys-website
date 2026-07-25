import React, { useState } from 'react';
import { HiPlus, HiMinus } from 'react-icons/hi';
import AnimatedSection from './AnimatedSection';

export default function FAQAccordion({ items = [] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <AnimatedSection key={i} delay={i * 80}>
          <div className={`border-y rounded-sm transition-all duration-300 ${openIndex === i ? 'border-brand-200 bg-brand-50/30 shadow-sm' : 'border-surface-200 hover:border-surface-300'}`}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className={`font-medium text-[15px] pr-4 transition-colors ${openIndex === i ? 'text-brand-700' : 'text-gray-800'}`}>
                {item.question}
              </span>
              <span className={`shrink-0 w-8 h-8 rounded-sm flex items-center justify-center transition-all ${openIndex === i ? 'bg-brand-600 text-white rotate-0' : 'bg-surface-100 text-gray-500'}`}>
                {openIndex === i ? <HiMinus className="w-4 h-4" /> : <HiPlus className="w-4 h-4" />}
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-96 pb-5' : 'max-h-0'}`}>
              <p className="px-5 text-sm text-gray-600 leading-relaxed">{item.answer}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </div>
  );
}
