import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowRight } from 'react-icons/fi';

export default function NotFound() {
  return (
    <>
      <Helmet><title>Page Not Found MAAGSYS</title></Helmet>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-lg">
          {/* Large 404 */}
          <div className="relative mb-8">
            <span className="text-[10rem] sm:text-[12rem] font-extrabold text-surface-100 leading-none select-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/25">
                <span className="text-white text-3xl font-bold">?</span>
              </div>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-primary inline-flex items-center gap-2">
              <FiHome className="w-4 h-4" /> Back to Home
            </Link>
            <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
              Contact Us <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
