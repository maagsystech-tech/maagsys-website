import React from 'react';

export function ShimmerCard() {
  return (
    <div className="rounded-md border border-surface-200 p-8">
      <div className="shimmer-block h-12 w-12 rounded-sm mb-5" />
      <div className="shimmer-block h-5 w-3/4 mb-3" />
      <div className="shimmer-block h-4 w-full mb-2" />
      <div className="shimmer-block h-4 w-5/6" />
    </div>
  );
}

export function ShimmerBlogCard() {
  return (
    <div className="rounded-md border border-surface-200 overflow-hidden">
      <div className="shimmer-block h-48 w-full rounded-none" />
      <div className="p-6">
        <div className="shimmer-block h-3 w-24 mb-3 rounded-full" />
        <div className="shimmer-block h-5 w-full mb-2" />
        <div className="shimmer-block h-5 w-3/4 mb-4" />
        <div className="shimmer-block h-4 w-full mb-2" />
        <div className="shimmer-block h-4 w-2/3" />
      </div>
    </div>
  );
}

export function ShimmerLine({ width = 'w-full', height = 'h-4', className = '' }) {
  return <div className={`shimmer-block ${width} ${height} ${className}`} />;
}

export function ShimmerParagraph({ lines = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div key={i} className={`shimmer-block h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
      ))}
    </div>
  );
}
