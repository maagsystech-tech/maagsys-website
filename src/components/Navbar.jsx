import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { HiOutlineMenu, HiOutlineX, HiChevronDown } from 'react-icons/hi';
import { useSettings } from '../hooks/useFirestore';
import logo from "../assets/maagsys_logo.png";
import textLogo from "../assets/maagsys_text_logo.png";

const defaultServices = [
  { name: 'All Services', path: '/services' },
  { name: 'Cybersecurity', path: '/services/cybersecurity' },
  { name: 'Data Engineering', path: '/services/data-engineering' },
  { name: 'Cloud Engineering', path: '/services/cloud-engineering' },
  { name: 'AI / ML', path: '/services/ai-ml' },
  { name: 'Staffing', path: '/services/staffing' },
  { name: 'GRC', path: '/services/grc' },
  { name: 'App Development', path: '/services/app-development' },
  { name: 'Data Analytics', path: '/services/data-engineering' },
];

export default function Navbar() {
  const { settings } = useSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [serviceList, setServiceList] = useState(defaultServices);
  const location = useLocation();

  useEffect(() => {
    let unsubscribe = () => { };
    try {
      unsubscribe = onSnapshot(
        collection(db, 'customServices'),
        (snap) => {
          const customItems = settings.customServicesEnabled !== false ? snap.docs
            .map(d => ({ id: d.id, ...d.data() }))
            .filter(p => p.title && p.published !== false)
            .map(p => {
              const slugVal = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
              return { name: p.title, path: `/services/${slugVal}` };
            }) : [];

          setServiceList([...defaultServices, ...customItems]);
        },
        async (e) => {
          console.warn('onSnapshot customServices failed for navbar:', e);
          try {
            const snap = await getDocs(collection(db, 'customServices'));
            const customItems = settings.customServicesEnabled !== false ? snap.docs
              .map(d => ({ id: d.id, ...d.data() }))
              .filter(p => p.title && p.published !== false)
              .map(p => {
                const slugVal = p.slug || p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                return { name: p.title, path: `/services/${slugVal}` };
              }) : [];
            setServiceList([...defaultServices, ...customItems]);
          } catch (err) { console.error(err); }
        }
      );
    } catch (e) {
      console.error(e);
    }
    return () => unsubscribe();
  }, [settings.customServicesEnabled]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', children: serviceList },
    settings.blogEnabled !== false && { name: 'Blog', path: '/blog' },
    settings.careersEnabled !== false && { name: 'Careers', path: '/careers' },
    settings.contactFormEnabled !== false && { name: 'Contact', path: '/contact' },
  ].filter(Boolean);

  const renderLogo = () => {
    return (
      <div className="flex items-center gap-2">
        <img src={logo} alt="MAAGSYS Logo" className="h-10 w-auto object-contain" />
        <img src={textLogo} alt="MAAGSYS" className="h-7 w-auto object-contain brightness-0 invert" />
      </div>
    );
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdownOpen(false);
  }, [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Glassmorphism Navbar Layer */}
      {/* <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? 'bg-white/15 backdrop-blur-xl border-white/20 shadow-lg' 
            : 'bg-white/5 backdrop-blur-md border-white/10'
        }`}
      > */}
      {/* <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
          }`}
      > */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
          ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              {renderLogo()}
            </Link>

            {/* Desktop Nav Links (Pure CSS Hover Mechanism) */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div key={link.name} className="relative group py-6">
                  {link.children ? (
                    <div className="flex items-center gap-1 cursor-pointer text-xs uppercase tracking-widest font-bold text-white group-hover:text-brand-300 transition-colors">
                      {link.name}
                      <HiChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180" />
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`text-xs uppercase tracking-widest font-bold transition-all ${isActive(link.path) ? 'text-brand-300' : 'text-white hover:text-brand-300'
                        }`}
                    >
                      {link.name}
                    </Link>
                  )}

                  {/* Desktop Dropdown Block - Shows perfectly on Hover */}
                  {link.children && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-60 bg-white shadow-2xl py-4 text-left rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`block px-6 py-3 text-xs tracking-wide font-semibold border-b border-gray-50 last:border-0 transition-colors ${isActive(child.path) ? 'text-brand-600 bg-gray-50' : 'text-gray-800 hover:text-brand-600 hover:bg-gray-50'
                            }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Link to="/contact" className="hidden lg:inline-flex px-5 py-2.5 bg-white text-black text-xs uppercase tracking-widest font-bold hover:bg-brand-500 hover:text-white transition-all duration-300 rounded-sm">
                Get Started
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 text-white hover:text-brand-300 transition-colors"
              >
                <HiOutlineMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop Overlay for Mobile Drawer */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 lg:hidden ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Right-Side Slide-Out Drawer Animation */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-[300px] bg-[#212529] z-50 shadow-2xl border-l border-white/10 transition-transform duration-300 transform lg:hidden flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Drawer Header Area */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {renderLogo("font-sans font-black text-xl text-white tracking-wider")}
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white hover:text-brand-300"
          >
            <HiOutlineX className="w-6 h-6" />
          </button>
        </div>

        {/* Drawer Scroll Links */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {navLinks.map((link) => (
            <div key={link.name} className="border-b border-white/5 pb-2">
              {link.children ? (
                <>
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className="w-full flex items-center justify-between py-2 text-xs uppercase tracking-widest font-bold text-white"
                  >
                    {link.name}
                    <HiChevronDown className={`w-4 h-4 transition-transform ${mobileDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div className={`overflow-y-auto transition-all duration-200 ${mobileDropdownOpen ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="pl-4 py-2 space-y-2 bg-white/5 my-1">
                      {link.children.map((child) => (
                        <Link key={child.path} to={child.path} className="block py-2 px-3 text-xs uppercase text-gray-300 hover:text-brand-400">
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link to={link.path} className="block py-2 text-xs uppercase tracking-widest font-bold text-white hover:text-brand-400">
                  {link.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Drawer Bottom Action Block */}
        <div className="p-6 border-t border-white/10">
          <Link to="/contact" className="block w-full py-4 bg-white text-black text-center text-xs uppercase tracking-widest font-bold hover:bg-brand-500 hover:text-white transition-all rounded-sm">
            Get Started
          </Link>
        </div>
      </div>
    </>
  );
}




// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { HiOutlineMenu, HiOutlineX, HiChevronDown, HiPhone, HiMail } from 'react-icons/hi';

// const services = [
//   { name: 'All Services', path: '/services' },
//   { name: 'Cybersecurity', path: '/services/cybersecurity' },
//   { name: 'Data Engineering', path: '/services/data-engineering' },
//   { name: 'Cloud Engineering', path: '/services/cloud-engineering' },
//   { name: 'AI / ML', path: '/services/ai-ml' },
//   { name: 'Staffing', path: '/services/staffing' },
//   { name: 'GRC', path: '/services/grc' },
//   { name: 'App Development', path: '/services/app-development' },
// ];

// const navLinks = [
//   { name: 'Home', path: '/' },
//   { name: 'About', path: '/about' },
//   { name: 'Services', path: '/services', children: services },
//   { name: 'Blog', path: '/blog' },
//   { name: 'Careers', path: '/careers' },
//   { name: 'Contact', path: '/contact' },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(null);
//   const location = useLocation();
//   const dropdownRef = useRef(null);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', onScroll);
//     return () => window.removeEventListener('scroll', onScroll);
//   }, []);

//   useEffect(() => {
//     setMobileOpen(false);
//     setDropdownOpen(null);
//   }, [location]);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setDropdownOpen(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const isActive = (path) => {
//     if (path === '/') return location.pathname === '/';
//     return location.pathname.startsWith(path);
//   };

//   return (
//     <>
//       {/* Top bar */}
//       <div className={`hidden lg:block bg-brand-800 text-white text-xs transition-all duration-300 ${scrolled ? 'h-0 overflow-hidden opacity-0' : 'h-auto opacity-100'}`}>
//         <div className="container-main section-padding flex items-center justify-between py-2">
//           <div className="flex items-center gap-6">
//             <a href="mailto:contact@maagsys.com" className="flex items-center gap-1.5 hover:text-brand-200 transition-colors">
//               <HiMail className="w-3.5 h-3.5" /> contact@maagsys.com
//             </a>
//             <a href="tel:+15186008020" className="flex items-center gap-1.5 hover:text-brand-200 transition-colors">
//               <HiPhone className="w-3.5 h-3.5" /> +1 518-600-8020
//             </a>
//           </div>
//           <div className="flex items-center gap-4">
//             <span className="text-brand-300">12 Metro Park Rd, Suite #207, Albany, NY 12205</span>
//           </div>
//         </div>
//       </div>

//       {/* Main navbar */}
//       <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-gray-100' : 'bg-white border-b border-gray-100'}`}>
//         <div className="container-main section-padding">
//           <div className="flex items-center justify-between h-16 lg:h-[72px]">
//             {/* Logo */}
//             <Link to="/" className="flex items-center gap-2.5 group">
//               <div className="w-9 h-9 bg-brand-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
//                 <span className="text-white font-display font-bold text-sm">M</span>
//               </div>
//               <span className="font-display font-bold text-xl text-gray-900 tracking-tight">
//                 MAAG<span className="text-brand-600">SYS</span>
//               </span>
//             </Link>

//             {/* Desktop nav */}
//             <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
//               {navLinks.map((link) => (
//                 <div key={link.name} className="relative">
//                   {link.children ? (
//                     <button
//                       onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
//                       className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive(link.path) ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`}
//                     >
//                       {link.name}
//                       <HiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === link.name ? 'rotate-180' : ''}`} />
//                     </button>
//                   ) : (
//                     <Link
//                       to={link.path}
//                       className={`px-4 py-2 rounded-lg text-sm font-medium transition-all block ${isActive(link.path) ? 'text-brand-600 bg-brand-50' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`}
//                     >
//                       {link.name}
//                     </Link>
//                   )}

//                   {/* Dropdown */}
//                   {link.children && dropdownOpen === link.name && (
//                     <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-fade-in">
//                       {link.children.map((child) => (
//                         <Link
//                           key={child.path}
//                           to={child.path}
//                           className={`block px-4 py-2.5 text-sm transition-colors ${isActive(child.path) ? 'text-brand-600 bg-brand-50 font-medium' : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'}`}
//                         >
//                           {child.name}
//                         </Link>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* CTA + Mobile toggle */}
//             <div className="flex items-center gap-3">
//               <Link to="/contact" className="hidden lg:inline-flex btn-primary">
//                 Get Started
//               </Link>
//               <button
//                 onClick={() => setMobileOpen(!mobileOpen)}
//                 className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
//               >
//                 {mobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile menu */}
//         <div className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-[600px] border-t border-gray-100' : 'max-h-0'}`}>
//           <div className="section-padding py-4 space-y-1 bg-white">
//             {navLinks.map((link) => (
//               <div key={link.name}>
//                 {link.children ? (
//                   <>
//                     <button
//                       onClick={() => setDropdownOpen(dropdownOpen === link.name ? null : link.name)}
//                       className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium ${isActive(link.path) ? 'text-brand-600 bg-brand-50' : 'text-gray-700'}`}
//                     >
//                       {link.name}
//                       <HiChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen === link.name ? 'rotate-180' : ''}`} />
//                     </button>
//                     <div className={`overflow-hidden transition-all duration-200 ${dropdownOpen === link.name ? 'max-h-96' : 'max-h-0'}`}>
//                       <div className="pl-4 py-1 space-y-1">
//                         {link.children.map((child) => (
//                           <Link key={child.path} to={child.path} className="block px-4 py-2.5 text-sm text-gray-600 hover:text-brand-600 rounded-lg">
//                             {child.name}
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </>
//                 ) : (
//                   <Link to={link.path} className={`block px-4 py-3 rounded-lg text-sm font-medium ${isActive(link.path) ? 'text-brand-600 bg-brand-50' : 'text-gray-700'}`}>
//                     {link.name}
//                   </Link>
//                 )}
//               </div>
//             ))}
//             <div className="pt-3">
//               <Link to="/contact" className="btn-primary w-full text-center">Get Started</Link>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }
