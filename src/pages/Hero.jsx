// import React from 'react';
// import AnimatedSection from '../components/AnimatedSection';
// import { Link } from 'react-router-dom';
// import { HiArrowRight } from 'react-icons/hi';

// import heroBgVideo from "../assets/hero_bg.mp4"; 
// import heroBgMobileVideo from "../assets/hero_mobile_bg.mp4";
// import heroBgPosterImage from "../assets/hero_poster_bg.avif";

// // Curated high-resolution Technology & Digital Transformation background video URLs
// const TECH_DESKTOP_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-connection-dots-and-lines-41544-large.mp4";
// const TECH_MOBILE_VIDEO_URL = "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-31776-large.mp4";

// const Hero = () => {
//   return (
//     <section className="relative min-h-[750px] flex items-center bg-zinc-950 overflow-hidden w-full text-white">

//       {/* Background Media Engine Layer */}
//       <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
//         {/* Mobile Video Background */}
//         <video
//           className="block sm:hidden h-full w-full object-cover opacity-60"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster={heroBgPosterImage}
//         >
//           <source src={TECH_MOBILE_VIDEO_URL} type="video/mp4" />
//           <source src={heroBgMobileVideo} type="video/mp4" />
//         </video>

//         {/* Desktop Video Background */}
//         <video
//           className="hidden sm:block h-full w-full object-cover opacity-60"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster={heroBgPosterImage}
//         >
//           <source src={TECH_DESKTOP_VIDEO_URL} type="video/mp4" />
//           <source src={heroBgVideo} type="video/mp4" />
//         </video>

//         {/* Dark Brand Overlay for High Contrast Navbar & Text Legibility */}
//         <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/40 to-zinc-950/50" />
//         <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 blur-[150px] rounded-full pointer-events-none" />
//       </div>

//       {/* Hero Content Container */}
//       <div className="max-w-5xl mx-auto px-6 sm:px-8 pt-36 pb-24 relative z-10 w-full flex flex-col items-center text-center">
//         <AnimatedSection className="w-full flex flex-col items-center">

//           {/* Console Prompt Badge */}
//           <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-sm bg-white/5 border border-white/10 backdrop-blur-md mb-8">
//             <span className="flex h-2 w-2 relative">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
//               <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500" />
//             </span>
//             <span className="font-mono text-xs sm:text-sm text-brand-300 font-medium">initiate --transformation</span>
//           </div>

//           {/* Main Headline */}
//           <h1 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] uppercase max-w-3xl">
//             Unleash the power of{' '}
//             <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-300">
//               digital transformation
//             </span>
//           </h1>

//           {/* Subtitle */}
//           <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl">
//             We bridge the gap between your vision and reality through modern technology
//             solutions from cybersecurity and cloud engineering to AI/ML and expert staffing.
//           </p>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto">
//             <Link
//               to="/contact"
//               className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-[11px] sm:text-[13px] uppercase tracking-widest font-medium inline-flex items-center justify-center transition-all duration-300 shadow-lg shadow-brand-600/30 rounded-sm group"
//             >
//               Schedule a Consultation
//               <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
//             </Link>
//             <Link
//               to="/services"
//               className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 text-[11px] sm:text-[13px] uppercase tracking-widest font-medium inline-flex items-center justify-center transition-all duration-300 border border-white/20 backdrop-blur-md rounded-sm"
//             >
//               Explore Services
//             </Link>
//           </div>

//         </AnimatedSection>
//       </div>
//     </section>
//   );
// };

// export default Hero;




import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiShieldCheck, HiCloud, HiLightningBolt, HiUserGroup } from 'react-icons/hi';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* =========================================================
   THREE.JS 3D WAVE CANVAS COMPONENT
   ========================================================= */
const ThreeWaveCanvas = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.set(0, 380, 850);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // 3D Wave Grid Parameters
    const SEPARATION = 45;
    const AMOUNTX = 75;
    const AMOUNTY = 75;
    const numParticles = AMOUNTX * AMOUNTY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let i = 0, j = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[i] = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        scales[j] = 1;
        i += 3;
        j++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Circular Glowing Particle Texture
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.9)');
    gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const texture = new THREE.CanvasTexture(canvas);

    // Get brand color from CSS variables
    const getBrandColorHex = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue('--brand')
        .trim();
      return color || '#2548EB';
    };

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(getBrandColorHex()),
      size: 28,
      map: texture,
      transparent: true,
      opacity: 1.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Listen for data-theme attribute updates on HTML root element
    const observer = new MutationObserver(() => {
      const activeHex = getBrandColorHex();
      material.color.set(activeHex);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style'],
    });

    // Pointer Interaction
    let mouseX = 0;
    let mouseY = 0;

    const onPointerMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.4;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.4;
    };

    window.addEventListener('pointermove', onPointerMove);

    // Resize Event
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize);

    // Animation Loop
    let count = 0;
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Continuously ensure color matches active CSS variable
      const activeHex = getBrandColorHex();
      if (activeHex && material.color.getHexString() !== new THREE.Color(activeHex).getHexString()) {
        material.color.set(activeHex);
      }

      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY + 380 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      const positionAttribute = geometry.attributes.position;
      const posArray = positionAttribute.array;

      let p = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          posArray[p + 1] =
            Math.sin((ix + count) * 0.25) * 65 +
            Math.sin((iy + count) * 0.4) * 65;
          p += 3;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
      count += 0.04;
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onWindowResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-100" />;
};

/* =========================================================
   PREVIOUS HERO IMPLEMENTATIONS (COMMENTED OUT)
   ========================================================= */
// const PreviousHeroV2 = () => {
//   return (
//     <section className="relative min-h-screen flex items-center justify-center bg-slate-950 text-white">
//       {/* Previous gradient light fields hero implementation */}
//     </section>
//   );
// };

/* =========================================================
   NEW THREE.JS 3D WAVE HERO COMPONENT (Clean, Modern & Fully Responsive)
   ========================================================= */
const servicesList = [
  { 
    icon: HiShieldCheck, 
    title: 'Cybersecurity', 
    desc: 'Proactive threat detection & 24/7 monitoring',
    path: '/services/cybersecurity'
  },
  { 
    icon: HiCloud, 
    title: 'Cloud Engineering', 
    desc: 'Scalable architecture & multi-cloud migration',
    path: '/services/cloud-engineering'
  },
  { 
    icon: HiLightningBolt, 
    title: 'AI / ML Solutions', 
    desc: 'Custom intelligence models & automation',
    path: '/services/ai-ml'
  },
  { 
    icon: HiUserGroup, 
    title: 'Expert Staffing', 
    desc: 'Vetted, top-tier technical professionals',
    path: '/services/staffing'
  },
];

const Hero = () => {
  return (
    <section className="relative min-h-[750px] flex items-center justify-center bg-gradient-to-b from-brand-900 via-slate-900 to-slate-950 overflow-hidden w-full text-white pt-32 pb-20">

      {/* Real Three.js WebGL 3D Wave Background Canvas */}
      <ThreeWaveCanvas />

      {/* Dark Brand Overlay for Navbar Contrast */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-brand-900/90 via-slate-950/70 to-slate-950" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 w-full flex flex-col items-center">
        
        {/* Tag Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-sm bg-brand-500/10 border border-brand-500/30 backdrop-blur-md mb-8 shadow-inner"
        >
          <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
          <span className="text-xs sm:text-sm font-medium text-brand-300 uppercase tracking-widest">
            initiate --transformation
          </span>
        </motion.div>

        {/* Hero Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          className="font-sans text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-center max-w-3xl uppercase text-white"
        >
          Unleash the Power of{' '}
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-300">
            Digital Transformation
          </span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed text-center max-w-2xl"
        >
          We bridge the gap between your vision and reality through modern technology
          solutions from cybersecurity and cloud engineering to AI/ML and expert staffing.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-xs sm:text-sm uppercase tracking-widest font-medium inline-flex items-center justify-center transition-all duration-300 shadow-xl shadow-brand-600/30 rounded-sm group"
            >
              Schedule a Consultation
              <HiArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Link
              to="/services"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-slate-900 text-xs sm:text-sm uppercase tracking-widest font-medium inline-flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white backdrop-blur-md rounded-sm"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;





// import React from 'react';
// import AnimatedSection from '../components/AnimatedSection';
// import { Link } from 'react-router-dom';
// import { HiArrowRight } from 'react-icons/hi';

// import heroBgVideo from "../assets/hero_bg.mp4"; 
// import heroBgMobileVideo from "../assets/hero_mobile_bg.mp4";
// import heroBgPosterImage from "../assets/hero_poster_bg.avif";

// const Hero = () => {
//   return (
//     <section className="relative min-h-[700px] flex items-center bg-zinc-950 overflow-hidden w-full">
      
//       {/* Background Media Engine Layer */}
//       <div className="absolute inset-0 z-0 pointer-events-none w-full h-full">
//         <video
//           className="block sm:hidden h-full w-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster={heroBgPosterImage}
//         >
//           <source src={heroBgMobileVideo} type="video/mp4" />
//         </video>

//         <video
//           className="hidden sm:block h-full w-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster={heroBgPosterImage}
//         >
//           <source src={heroBgVideo} type="video/mp4" />
//         </video>
//       </div>

//       {/* Hero Content Container - 2-Column Responsive Layout Grid */}
//       <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-36 pb-20 relative z-10 w-full">
//         <AnimatedSection className="w-full">
          
//           {/* Top Tag Header */}
//           <div className="flex items-center gap-3 mb-8">
//             <span className="text-white text-xs sm:text-sm tracking-widest uppercase font-bold text-brand-400">
//               Digital Transformation Partner
//             </span>
//           </div>

//           {/* Balanced Split Grid Content Structure */}
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
            
//             {/* LEFT COLUMN */}
//             <div className="lg:col-span-12 flex flex-col justify-start items-start text-left">
//               <h1 className="font-sans text-4xl sm:text-6xl xl:text-7xl font-bold text-white tracking-tighter leading-[1.0] uppercase">
//                 Unleash the Power of
//               </h1>
//             </div>

//           <div className='lg:col-span-12 flex items-center justify-between gap-4'>

//              <p className="text-base sm:text-lg text-gray-200 font-medium leading-relaxed max-w-sm">
//                 We bridge the gap between your vision and reality through modern technology solutions from cybersecurity and cloud engineering to AI/ML and expert staffing.
//               </p>

//             <div className="lg:col-span-6 flex items-center justify-start lg:justify-end">
//               <h2 className="font-sans text-4xl sm:text-6xl xl:text-7xl font-bold text-white tracking-tighter leading-[1.0] uppercase lg:text-right text-transparent bg-clip-text bg-gradient-to-br from-white via-white/80 to-white/20">
//                 Digital <br />Transformation
//               </h2>
//             </div>
//               </div>


//                      {/* Action Call Buttons */}
//               <div className="lg:col-span-6 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                 <Link to="/contact" className="px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white text-sm uppercase tracking-widest font-bold inline-flex items-center justify-center transition-all duration-300 shadow-xl rounded-sm">
//                   Schedule a Consultation
//                   <HiArrowRight className="ml-2 w-4 h-4" />
//                 </Link>
//                 <Link to="/services" className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-black text-sm uppercase tracking-widest font-bold inline-flex items-center justify-center transition-all duration-300 border border-white/20 hover:border-white backdrop-blur-sm rounded-sm">
//                   Explore Services
//                 </Link>
//               </div>

//           </div>

//         </AnimatedSection>
//       </div>
//     </section>
//   );
// };

// export default Hero;





// import React from 'react'
// import AnimatedSection from '../components/AnimatedSection';
// import { Link } from 'react-router-dom';
// import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';

// // Update these paths to target your actual video assets
// import heroBgVideo from "../assets/hero_bg.mov"; 
// import heroBgMobileVideo from "../assets/hero_mobile_bg.mp4";
// import heroBgPosterImage from "../assets/hero_poster_bg.avif";

// const Hero = () => {
//   return (
//     <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
      
//       {/* Full-bleed responsive video element */}
//       <div className="absolute inset-0 z-0 pointer-events-none">
        
//         {/* MOBILE VIDEO - Shown only on small screens (< 640px) */}
//         <video
//           className="block sm:hidden h-full w-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster={heroBgPosterImage}
//         >
//           <source src={heroBgMobileVideo} type="video/mp4" />
//         </video>

//         {/* DESKTOP VIDEO - Shown on larger screens (>= 640px) */}
//         <video
//           className="hidden sm:block h-full w-full object-cover"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster={heroBgPosterImage}
//         >
//           <source src='https://covenantindia.net/wp-content/uploads/2024/09/recruitment-office-covenant.mp4' type="video/mp4" />
//         </video>

//         {/* 
//           Overlay Gradients: Adjust these classes to balance readability.
//           Since the layout text is dark text (text-gray-900), a bright, 
//           semi-transparent white overlay is applied to mask dark elements in your video.
//         */}
//         {/* <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]" /> */}
        
//         {/* Keeping your original subtle color accent blobs on top of the video mask */}
//         {/* <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-brand-50 rounded-full blur-3xl opacity-40 -translate-y-1/4 translate-x-1/4" />
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-50 rounded-full blur-3xl opacity-30 translate-y-1/4 -translate-x-1/4" /> */}
//       </div>

//       {/* Hero Content Container */}
//       <div className="container-main section-padding py-20 lg:py-0 relative z-10 w-full">
//         <div className="flex flex-col items-center justify-center text-center">
//           <AnimatedSection className="max-w-4xl flex flex-col items-center">
            
//             {/* Main Heading */}
//             <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-6 text-balance">
//               Unleash the Power of{' '}
//               <span className="gradient-text">Digital Transformation</span>
//             </h1>
            
//             {/* Description Text */}
//             <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl mx-auto">
//               We bridge the gap between your vision and reality through modern technology solutions from cybersecurity and cloud engineering to AI/ML and expert staffing.
//             </p>
            
//             {/* Call To Actions */}
//             <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
//               <Link to="/contact" className="btn-primary text-base px-8 py-4 inline-flex items-center justify-center">
//                 Schedule a Consultation
//                 <HiArrowRight className="ml-2 w-4 h-4" />
//               </Link>
//               <Link to="/services" className="btn-secondary text-base px-8 py-4 inline-flex items-center justify-center">
//                 Explore Services
//               </Link>
//             </div>
            
//             {/* Trust Badges / Core Pillars */}
//             <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
//               <div className="flex items-center gap-2">
//                 <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                 <span className="text-sm text-gray-600 font-medium">Quality</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                 <span className="text-sm text-gray-600 font-medium">Integrity</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                 <span className="text-sm text-gray-600 font-medium">Innovation</span>
//               </div>
//             </div>

//           </AnimatedSection>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default Hero
















// import React from 'react'
// import AnimatedSection from '../components/AnimatedSection';
// import { Link } from 'react-router-dom';
// import { HiArrowRight, HiChartBar, HiCheckCircle, HiCloud, HiLightningBolt, HiShieldCheck } from 'react-icons/hi';

// const Hero = () => {
//   return (
//      <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
//            <div className="absolute inset-0">
//              <div className="absolute top-20 right-0 w-[700px] h-[700px] bg-brand-50 rounded-full blur-3xl opacity-40 -translate-y-1/4 translate-x-1/4" />
//              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-50 rounded-full blur-3xl opacity-30 translate-y-1/4 -translate-x-1/4" />
//            </div>
//            <div className="container-main section-padding py-20 lg:py-0 relative z-10">
//              <div className="grid lg:grid-cols-2 gap-16 items-center">
//                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
//                    Unleash the Power of{' '}
//                    <span className="gradient-text">Digital Transformation</span>
//                  </h1>
//                  <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-xl">
//                    We bridge the gap between your vision and reality through modern technology solutions from cybersecurity and cloud engineering to AI/ML and expert staffing.
//                  </p>
//                  <div className="flex flex-col sm:flex-row gap-4">
//                    <Link to="/contact" className="btn-primary text-base px-8 py-4">
//                      Schedule a Consultation
//                      <HiArrowRight className="ml-2 w-4 h-4" />
//                    </Link>
//                    <Link to="/services" className="btn-secondary text-base px-8 py-4">
//                      Explore Services
//                    </Link>
//                  </div>
//                  <div className="mt-12 flex items-center gap-8">
//                    <div className="flex items-center gap-2">
//                      <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                      <span className="text-sm text-gray-600 font-medium">Quality</span>
//                    </div>
//                    <div className="flex items-center gap-2">
//                      <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                      <span className="text-sm text-gray-600 font-medium">Integrity</span>
//                    </div>
//                    <div className="flex items-center gap-2">
//                      <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                      <span className="text-sm text-gray-600 font-medium">Innovation</span>
//                    </div>
//                  </div>
//                </AnimatedSection>
//                <AnimatedSection delay={200} direction="left">
//                  <div className="relative">
//                    <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-3xl p-8 sm:p-12 text-white">
//                      <div className="grid grid-cols-2 gap-6">
//                        {[
//                          { icon: HiShieldCheck, label: 'Cybersecurity' },
//                          { icon: HiCloud, label: 'Cloud' },
//                          { icon: HiChartBar, label: 'Data' },
//                          { icon: HiLightningBolt, label: 'AI / ML' },
//                        ].map((item, i) => (
//                          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 text-center hover:bg-white/15 transition-colors">
//                            <item.icon className="w-8 h-8 mx-auto mb-2 text-brand-200" />
//                            <span className="text-sm font-medium text-white/90">{item.label}</span>
//                          </div>
//                        ))}
//                      </div>
//                      <div className="mt-8 pt-8 border-t border-white/10">
//                        <div className="flex items-center justify-between">
//                          <div>
//                            <p className="text-3xl font-display font-bold">20+</p>
//                            <p className="text-sm text-white/60">Years Experience</p>
//                          </div>
//                          <div>
//                            <p className="text-3xl font-display font-bold">15+</p>
//                            <p className="text-sm text-white/60">Client Cases</p>
//                          </div>
//                          <div>
//                            <p className="text-3xl font-display font-bold">100%</p>
//                            <p className="text-sm text-white/60">Satisfaction</p>
//                          </div>
//                        </div>
//                      </div>
//                    </div>
//                    {/* Floating badge */}
//                    <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 border border-gray-100 animate-float">
//                      <div className="flex items-center gap-3">
//                        <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center">
//                          <HiCheckCircle className="w-5 h-5 text-emerald-500" />
//                        </div>
//                        <div>
//                          <p className="text-sm font-semibold text-gray-900">Trusted Partner</p>
//                          <p className="text-xs text-gray-500">Enterprise Solutions</p>
//                        </div>
//                      </div>
//                    </div>
//                  </div>
//                </AnimatedSection>
//              </div>
//            </div>
//          </section>
//   )
// }

// export default Hero
