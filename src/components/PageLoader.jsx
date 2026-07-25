import React from 'react';

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="container-main section-padding py-16">
        {/* Hero shimmer */}
        <div className="mb-12">
          <div className="shimmer-block h-5 w-32 mb-6 rounded-full" />
          <div className="shimmer-block h-12 w-3/4 mb-4" />
          <div className="shimmer-block h-12 w-1/2 mb-8" />
          <div className="shimmer-block h-5 w-2/3 mb-3" />
          <div className="shimmer-block h-5 w-1/2 mb-8" />
          <div className="flex gap-4">
            <div className="shimmer-block h-12 w-36 rounded-lg" />
            <div className="shimmer-block h-12 w-36 rounded-lg" />
          </div>
        </div>
        {/* Cards shimmer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-2xl border border-surface-200 p-8">
              <div className="shimmer-block h-14 w-14 rounded-xl mb-6" />
              <div className="shimmer-block h-6 w-3/4 mb-4" />
              <div className="shimmer-block h-4 w-full mb-2" />
              <div className="shimmer-block h-4 w-5/6 mb-2" />
              <div className="shimmer-block h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
