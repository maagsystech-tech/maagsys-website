import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  HiArrowRight,
  HiShieldCheck,
  HiCode,
  HiCloud,
  HiChartBar,
  HiLightningBolt,
  HiUserGroup,
  HiCheckCircle,
  HiPhone,
} from 'react-icons/hi';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeader from '../components/SectionHeader';
import StatsCounter from '../components/StatsCounter';
import FAQAccordion from '../components/FAQAccordion';
import TestimonialsSection from '../components/TestimonialsSection';
import Hero from './Hero';
import { useSettings } from '../hooks/useFirestore';

/* ─── DATA (all original, unchanged) ─── */
const services = [
  { icon: HiShieldCheck, title: 'Cybersecurity', desc: 'Comprehensive threat detection, incident response, and vulnerability assessments to safeguard your digital assets against evolving cyber threats.', path: '/services/cybersecurity', color: 'bg-red-50 text-red-600', border: 'hover:border-red-200', iconBg: 'group-hover:bg-red-600' },
  { icon: HiChartBar, title: 'Data Engineering', desc: 'Transform raw data into actionable intelligence. We build scalable pipelines for collection, storage, processing, and analysis.', path: '/services/data-engineering', color: 'bg-brand-50 text-brand-600', border: 'hover:border-brand-200', iconBg: 'group-hover:bg-brand-600' },
  { icon: HiCloud, title: 'Cloud Engineering', desc: 'Architecture, migration, and management across Azure, AWS, GCP, and Oracle Cloud optimized for performance and cost.', path: '/services/cloud-engineering', color: 'bg-sky-50 text-sky-600', border: 'hover:border-sky-200', iconBg: 'group-hover:bg-sky-600' },
  { icon: HiLightningBolt, title: 'AI / ML', desc: 'Custom AI model development, predictive analytics, NLP, and computer vision solutions that drive innovation and efficiency.', path: '/services/ai-ml', color: 'bg-violet-50 text-violet-600', border: 'hover:border-violet-200', iconBg: 'group-hover:bg-violet-600' },
  { icon: HiUserGroup, title: 'Staffing', desc: 'Vetted, trained technical professionals across cybersecurity, cloud, data, and AI rigorously assessed and background-checked.', path: '/services/staffing', color: 'bg-emerald-50 text-emerald-600', border: 'hover:border-emerald-200', iconBg: 'group-hover:bg-emerald-600' },
  { icon: HiCode, title: 'App Development', desc: 'Custom software from concept to deployment. We build robust, scalable applications tailored to your business needs.', path: '/services/app-development', color: 'bg-amber-50 text-amber-600', border: 'hover:border-amber-200', iconBg: 'group-hover:bg-amber-600' },
];

const process = [
  { step: '01', title: 'Assessment & Strategy', desc: 'We audit your current systems, understand your goals, and align on a strategic roadmap tailored to your business.' },
  { step: '02', title: 'Solution Design', desc: 'Our architects design customized, scalable solutions across our core service areas, built around your specific requirements.' },
  { step: '03', title: 'Implementation', desc: 'We deploy solutions with minimal disruption to your operations, ensuring seamless integration with existing workflows.' },
  { step: '04', title: 'Testing & Optimization', desc: 'Rigorous quality assurance and continuous performance tuning to ensure everything works flawlessly at scale.' },
  { step: '05', title: 'Ongoing Support', desc: 'Dedicated support and maintenance so you can focus on your core business while we keep everything running smoothly.' },
];

const whyUs = [
  { title: 'Deep Expertise', desc: '20+ years of combined experience across cybersecurity, cloud, data, and AI domains.' },
  { title: 'End-to-End Delivery', desc: 'From strategy and design through implementation and ongoing support we handle it all.' },
  { title: 'Tailored Solutions', desc: 'No cookie-cutter approaches. Every solution is designed specifically for your business context.' },
  { title: 'Cutting-Edge Technology', desc: 'We stay ahead of the curve, leveraging the latest tools, frameworks, and best practices.' },
  { title: 'Client-Centric', desc: 'Your success drives everything we do. We measure our performance by your outcomes.' },
  { title: 'Scalable & Flexible', desc: 'Solutions that grow with your business, adapting to changing needs and scale requirements.' },
];

const faqs = [
  { question: 'What industries does MAAGSYS serve?', answer: 'We work with organizations across healthcare, finance, government, retail, manufacturing, telecommunications, and more. Our solutions are adaptable to any industry that needs robust technology infrastructure, security, or digital transformation.' },
  { question: 'How does MAAGSYS ensure data security?', answer: 'Security is built into everything we do. We follow industry best practices, maintain compliance with major frameworks (SOC 2, HIPAA, PCI-DSS, NIST), and employ defense-in-depth strategies across all our engagements.' },
  { question: 'Can MAAGSYS handle both small and enterprise-level projects?', answer: 'Absolutely. Our solutions are designed to scale. Whether you are a startup needing foundational infrastructure or an enterprise requiring complex cloud migrations, we tailor our approach to fit your scope and budget.' },
  { question: 'What is your typical project timeline?', answer: 'Timelines vary by project scope. A security assessment might take 2-4 weeks, while a full cloud migration could span 3-6 months. We provide detailed timelines during the assessment and strategy phase before any engagement begins.' },
  { question: 'Do you provide ongoing support after project completion?', answer: 'Yes. We offer flexible support and maintenance packages that include monitoring, incident response, optimization, and regular reviews to ensure your systems continue to perform at their best.' },
];

const techLogos = [
  'AWS', 'Azure', 'GCP', 'Oracle Cloud', 'Kubernetes', 'Docker',
  'Terraform', 'Python', 'Spark', 'Kafka', 'Hadoop', 'React',
];


/* ─── INLINE STYLES FOR ANIMATIONS ─── */
const marqueeStyles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 40s linear infinite;
  }
  .animate-marquee-reverse {
    animation: marquee 35s linear infinite reverse;
  }
`;


/* ─── ARROW CONNECTOR SVG ─── */
const ArrowConnector = ({ className = '' }) => (
  <div className={`hidden lg:flex items-center justify-center ${className}`}>
    <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-600/30">
      <path d="M0 12H36M36 12L28 4M36 12L28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

const ArrowDown = () => (
  <div className="flex lg:hidden items-center justify-center py-2">
    <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brand-600/30">
      <path d="M12 0V28M12 28L4 20M12 28L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);


/* ─────────────────────────────── PAGE ─────────────────────────────── */
export default function Home() {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>MAAGSYS Digital Transformation & Technology Solutions</title>
        <meta name="description" content="MAAGSYS delivers expert solutions in Cybersecurity, Data Engineering, Cloud Engineering, AI/ML, and Technology Staffing. Transform your business with proven expertise." />
      </Helmet>

      <style>{marqueeStyles}</style>

      {/* ━━━ Hero ━━━ */}
      <Hero />


      {/* ━━━ About / Intro ━━━ */}
      {/* <section className="py-20 sm:py-28 bg-white">
        <div className="container-main section-padding">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 items-start">
              <div className="lg:col-span-5">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-gray-900 tracking-tight leading-[1.15]">
                  Comprehensive Technology Solutions by MAAGSYS
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-12">
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6">
                  From securing your digital assets to building intelligent systems, we provide end-to-end technology services that drive real business outcomes. MAAGSYS bridges the gap between your vision and reality through modern technology solutions from cybersecurity and cloud engineering to AI/ML and expert staffing.
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  We work with organizations across healthcare, finance, government, retail, manufacturing, telecommunications, and more. Our solutions are adaptable to any industry that needs robust technology infrastructure, security, or digital transformation.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section> */}


      {/* ━━━ Services Modern Cards Grid ━━━ */}
      <section className="py-14 sm:pt-14 sm:pb-20 bg-surface-50">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 tracking-tight leading-tight mb-4">
              The Technology Services Our Firm Offers
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              MAAGSYS delivers customized technology solutions across six core disciplines to address the digital transformation needs of businesses across industries.
            </p>
          </AnimatedSection>

          {/* Exact structural 3-column tight border grid system */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <Link
                  to={service.path}
                  className="group block h-full bg-white border border-brand-200 p-4 sm:p-6 transition-all duration-300 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/5 relative text-center rounded-sm"
                >
                  <div className="flex flex-col items-center justify-center h-full">

                    {/* Top Centered Icon with clean typography line spacing */}
                    <div className="w-12 h-12 flex items-center justify-center mb-4 text-brand-600 transition-transform duration-300 group-hover:scale-110">
                      <service.icon className="w-8 h-8 sm:w-9 sm:h-9 text-brand-600" />
                    </div>

                    {/* Centered Large Bold Header */}
                    <h3 className="font-sans text-base sm:text-xl font-medium text-gray-900 mb-2 group-hover:text-brand-600 transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Centered Balanced Body Copy */}
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-6">
                      {service.desc}
                    </p>

                    {/* Minimal inline link element */}
                    <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-600 group-hover:text-brand-700 transition-colors duration-300 mt-auto">
                      Learn more <HiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━ Marquee Strip ━━━ */}
      <div className="bg-zinc-950 py-5 overflow-hidden select-none">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(4)].flatMap(() =>
            ['Cybersecurity', 'Data Engineering', 'Cloud Engineering', 'AI / ML', 'Staffing', 'App Development', 'Digital Transformation', 'Technology Solutions']
          ).map((item, i) => (
            <span key={i} className="mx-3 sm:mx-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/50 flex items-center gap-3 sm:gap-6 shrink-0">
              <span className="w-2 h-2 rounded-full bg-brand-500 shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>


      {/* ━━━ Why Choose Us ━━━ */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* LEFT BRANDED VISUAL BLOCK (COMMENTED OUT AS REQUESTED) */}
            <AnimatedSection className="lg:col-span-5">
              <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 rounded-md p-10 sm:p-12 text-white relative overflow-hidden h-full min-h-[400px] flex flex-col justify-between">
                <div className="absolute inset-0 opacity-10">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs><pattern id="why-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M 24 0 L 0 0 0 24" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
                    <rect width="100%" height="100%" fill="url(#why-grid)" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <span className="text-white/60 text-xs font-medium uppercase tracking-[0.2em] mb-6 inline-block">Why MAAGSYS</span>
                  <h3 className="font-display text-3xl sm:text-4xl font-medium leading-tight tracking-tight mb-4">
                    Built on Quality, Integrity, and Innovation
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    These three guiding principles define how we approach every engagement, ensuring consistent excellence and lasting value for our clients.
                  </p>
                </div>
                <div className="relative z-10 mt-10">
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 text-sm uppercase tracking-widest font-medium transition-all duration-300 hover:bg-gray-100 rounded-sm">
                    Let's Sync Up <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>


            {/* Right Benefits list */}
            <div className="lg:col-span-7">
              <AnimatedSection>
                <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight leading-tight mb-10">
                  Benefits of Choosing MAAGSYS
                </h2>
              </AnimatedSection>
              <div className="space-y-6">
                {whyUs.map((item, i) => (
                  <AnimatedSection key={i} delay={i * 80}>
                    <div className="flex items-start gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brand-600 transition-colors duration-300">
                        <HiCheckCircle className="w-3.5 h-3.5 text-brand-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <p className="text-gray-900 text-sm sm:text-base leading-relaxed">
                        <span className="font-semibold">{item.title}:</span>{' '}
                        <span className="text-gray-600">{item.desc}</span>
                      </p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ━━━ Stats ━━━ */}
      {settings.statsCounterEnabled !== false && (
        <section className="py-10 bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs><pattern id="stat-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#stat-grid)" />
            </svg>
          </div>
          <div className="container-main section-padding relative z-10">
            <StatsCounter light />
          </div>
        </section>
      )}



      {/* ━━━ Our Working Process Connected Floating Node Grid ━━━ */}
      <section className="py-14 sm:py-20 bg-surface-50 overflow-hidden border-t border-gray-100">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-16">
            <h2 className="font-sans text-2xl sm:text-3xl font-medium text-gray-900 mb-3">
              How We Deliver Results
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
              MAAGSYS uses a structured process to deliver efficient and accurate technology solutions customized to client requirements.
            </p>
          </AnimatedSection>

          {/* Unified Responsive Container */}
          <div className="relative max-w-6xl mx-auto px-4 sm:px-0">

            {/* ─── DESKTOP VIEWPORT ─── */}
            <div className="hidden lg:block relative">

              {/* Horizontal Connecting Line Track running behind all circles */}
              <div className="absolute top-10 left-[10%] right-[10%] h-[1px] bg-brand-300/20 z-0" />

              {/* 5-Column Progress Grid Layer */}
              <div className="grid grid-cols-5 gap-4 relative z-10">
                {process.map((item, i) => {
                  const AssociatedIcon = services[i]?.icon || HiCheckCircle;

                  return (
                    <AnimatedSection key={i} delay={i * 80} className="flex flex-col items-center relative">

                      {/* Visual Timeline Circle Wrapper */}
                      <div className="relative mb-8 group">
                        {/* Outer Ring Circle Container */}
                        <div className="w-16 h-16 rounded-full bg-white border border-brand-300/20 flex items-center justify-center transition-all duration-300 group-hover:border-brand-500 shadow-sm relative z-10">
                          <AssociatedIcon className="w-6 h-6 text-brand-600 transition-transform duration-300 group-hover:scale-110" />
                        </div>

                        {/* Floating Step Number Pin */}
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white font-sans font-medium text-[10px] flex items-center justify-center shadow border border-white z-20">
                          {parseInt(item.step, 10)}
                        </div>
                      </div>

                      {/* Vertical Line Connector (Connects bottom of circle directly into top of grid card) */}
                      <div className="absolute top-16 bottom-[calc(100%-80px)] w-[1px] bg-brand-300/20 z-0 h-12" />

                      {/* Content Text Grid Card */}
                      <div className="bg-white rounded-sm border border-gray-200/80 p-5 w-full h-full transition-all duration-300 hover:border-brand-500 hover:shadow-lg hover:shadow-brand-500/5 group text-center relative z-10 mt-auto">
                        <h3 className="font-sans text-xs sm:text-sm font-medium text-gray-900 mb-2 group-hover:text-brand-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-[13px] text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                    </AnimatedSection>
                  );
                })}
              </div>
            </div>

            {/* ─── MOBILE / TABLET VIEWPORT ─── */}
            <div className="lg:hidden relative space-y-6 before:absolute before:left-[36px] before:top-4 before:bottom-4 before:w-[1px] before:bg-brand-200/60 before:z-0">
              {process.map((item, i) => {
                const AssociatedIcon = services[i]?.icon || HiCheckCircle;

                return (
                  <AnimatedSection key={i} delay={i * 60} className="relative z-10">
                    <div className="bg-white rounded-sm border border-gray-200/80 p-5 pl-24 transition-all duration-300 hover:border-brand-500 group relative min-h-[100px] flex items-center">

                      {/* Left Side Floating Node Stack */}
                      <div className="absolute left-[8px] top-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white border border-brand-300/20 flex items-center justify-center shadow-sm relative">
                          <AssociatedIcon className="w-5 h-5 text-brand-600" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-600 text-white font-sans font-black text-[10px] flex items-center justify-center shadow border border-white">
                          {parseInt(item.step, 10)}
                        </div>

                        {/* Left horizontal indicator connector stem for side content block alignment */}
                        <div className="absolute left-14 right-[-32px] h-[1px] bg-brand-200/60 -z-10 pointer-events-none hidden" />
                      </div>

                      <div>
                        <h3 className="font-sans text-sm font-medium text-gray-900  mb-1 group-hover:text-brand-600 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                    </div>
                  </AnimatedSection>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* ━━━ Technologies Marquee Scrolling Strip ━━━ */}
      <section className="py-16 sm:py-20 bg-white border-t border-gray-100 overflow-hidden">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-10 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-medium text-gray-900 tracking-tight">
              Technologies We Work With
            </h2>
          </AnimatedSection>
        </div>

        {/* Row 1 Forward scroll */}
        <div className="overflow-hidden mb-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(6)].flatMap(() => techLogos).map((tech, i) => (
              <span
                key={`a-${i}`}
                className="mx-2.5 sm:mx-3 px-6 sm:px-8 py-3 rounded-xs bg-surface-50 border border-gray-100 text-sm font-medium text-gray-600 shrink-0 select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 Reverse scroll */}
        <div className="overflow-hidden">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...Array(6)].flatMap(() => [...techLogos].reverse()).map((tech, i) => (
              <span
                key={`b-${i}`}
                className="mx-2.5 sm:mx-3 px-6 sm:px-8 py-3 rounded-xs bg-surface-50 border border-gray-100 text-sm font-medium text-gray-600 shrink-0 select-none"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ Testimonials Section ━━━ */}
      {settings.testimonialEnabled !== false && <TestimonialsSection />}

      {/* ━━━ FAQ + CTA (integrated) ━━━ */}
      {(settings.faqEnabled !== false || settings.contactFormEnabled !== false) && (
        <section className="py-14 sm:py-20 bg-surface-50">
          {settings.faqEnabled !== false && (
            <AnimatedSection className="text-center mb-16">
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-900 tracking-tight leading-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
                Answers to common questions about our services, process, and approach.
              </p>
            </AnimatedSection>
          )}

          <div className="container-main section-padding">
            <div className={`grid grid-cols-1 ${settings.faqEnabled !== false ? 'lg:grid-cols-12' : 'max-w-xl mx-auto'} gap-12 lg:gap-16 items-start`}>

              {/* Left CTA Block */}
              {settings.contactFormEnabled !== false && (
                <div className={settings.faqEnabled !== false ? 'lg:col-span-4 lg:sticky lg:top-28' : 'w-full'}>
                  {/* Inline CTA card */}
                  <AnimatedSection delay={100}>
                    <div className="bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 rounded-md p-8 text-white relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <defs><pattern id="cta-dots" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="white" /></pattern></defs>
                          <rect width="100%" height="100%" fill="url(#cta-dots)" />
                        </svg>
                      </div>
                      <div className="relative z-10">
                        <h3 className="font-display text-xl sm:text-2xl font-medium mb-3 leading-tight">
                          Ready to Transform Your Business?
                        </h3>
                        <p className="text-white/70 text-sm leading-relaxed mb-6">
                          Let's discuss how {settings.siteName || 'MAAGSYS'} can help you achieve your technology goals.
                        </p>
                        <div className="flex flex-col gap-3">
                          <Link
                            to="/contact"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-700 font-semibold text-sm hover:bg-gray-50 transition-all duration-300 group rounded-sm"
                          >
                            Get in Touch
                            <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                          <a
                            href={`tel:${(settings.contactPhone || '+1 518-600-8020').replace(/[^0-9+]/g, '')}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 rounded-sm"
                          >
                            <HiPhone className="w-4 h-4" />
                            Call {settings.contactPhone || '+1 518-600-8020'}
                          </a>
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>
              )}

              {/* Right FAQ Accordion */}
              {settings.faqEnabled !== false && (
                <div className="lg:col-span-8">
                  <FAQAccordion items={faqs} />
                </div>
              )}

            </div>
          </div>
        </section>
      )}
    </>
  );
}








// import React from 'react';
// import { Link } from 'react-router-dom';
// import { Helmet } from 'react-helmet-async';
// import { HiArrowRight, HiShieldCheck, HiCode, HiCloud, HiChartBar, HiLightningBolt, HiUserGroup, HiCheckCircle, HiPhone } from 'react-icons/hi';
// import AnimatedSection from '../components/AnimatedSection';
// import SectionHeader from '../components/SectionHeader';
// import StatsCounter from '../components/StatsCounter';
// import CTASection from '../components/CTASection';
// import FAQAccordion from '../components/FAQAccordion';
// import Hero from './Hero';

// const services = [
//   { icon: HiShieldCheck, title: 'Cybersecurity', desc: 'Comprehensive threat detection, incident response, and vulnerability assessments to safeguard your digital assets against evolving cyber threats.', path: '/services/cybersecurity', color: 'bg-red-50 text-red-600' },
//   { icon: HiChartBar, title: 'Data Engineering', desc: 'Transform raw data into actionable intelligence. We build scalable pipelines for collection, storage, processing, and analysis.', path: '/services/data-engineering', color: 'bg-blue-50 text-blue-600' },
//   { icon: HiCloud, title: 'Cloud Engineering', desc: 'Architecture, migration, and management across Azure, AWS, GCP, and Oracle Cloud optimized for performance and cost.', path: '/services/cloud-engineering', color: 'bg-sky-50 text-sky-600' },
//   { icon: HiLightningBolt, title: 'AI / ML', desc: 'Custom AI model development, predictive analytics, NLP, and computer vision solutions that drive innovation and efficiency.', path: '/services/ai-ml', color: 'bg-violet-50 text-violet-600' },
//   { icon: HiUserGroup, title: 'Staffing', desc: 'Vetted, trained technical professionals across cybersecurity, cloud, data, and AI rigorously assessed and background-checked.', path: '/services/staffing', color: 'bg-emerald-50 text-emerald-600' },
//   { icon: HiCode, title: 'App Development', desc: 'Custom software from concept to deployment. We build robust, scalable applications tailored to your business needs.', path: '/services/app-development', color: 'bg-amber-50 text-amber-600' },
// ];

// const process = [
//   { step: '01', title: 'Assessment & Strategy', desc: 'We audit your current systems, understand your goals, and align on a strategic roadmap tailored to your business.' },
//   { step: '02', title: 'Solution Design', desc: 'Our architects design customized, scalable solutions across our core service areas, built around your specific requirements.' },
//   { step: '03', title: 'Implementation', desc: 'We deploy solutions with minimal disruption to your operations, ensuring seamless integration with existing workflows.' },
//   { step: '04', title: 'Testing & Optimization', desc: 'Rigorous quality assurance and continuous performance tuning to ensure everything works flawlessly at scale.' },
//   { step: '05', title: 'Ongoing Support', desc: 'Dedicated support and maintenance so you can focus on your core business while we keep everything running smoothly.' },
// ];

// const whyUs = [
//   { title: 'Deep Expertise', desc: '20+ years of combined experience across cybersecurity, cloud, data, and AI domains.' },
//   { title: 'End-to-End Delivery', desc: 'From strategy and design through implementation and ongoing support we handle it all.' },
//   { title: 'Tailored Solutions', desc: 'No cookie-cutter approaches. Every solution is designed specifically for your business context.' },
//   { title: 'Cutting-Edge Technology', desc: 'We stay ahead of the curve, leveraging the latest tools, frameworks, and best practices.' },
//   { title: 'Client-Centric', desc: 'Your success drives everything we do. We measure our performance by your outcomes.' },
//   { title: 'Scalable & Flexible', desc: 'Solutions that grow with your business, adapting to changing needs and scale requirements.' },
// ];

// const faqs = [
//   { question: 'What industries does MAAGSYS serve?', answer: 'We work with organizations across healthcare, finance, government, retail, manufacturing, telecommunications, and more. Our solutions are adaptable to any industry that needs robust technology infrastructure, security, or digital transformation.' },
//   { question: 'How does MAAGSYS ensure data security?', answer: 'Security is built into everything we do. We follow industry best practices, maintain compliance with major frameworks (SOC 2, HIPAA, PCI-DSS, NIST), and employ defense-in-depth strategies across all our engagements.' },
//   { question: 'Can MAAGSYS handle both small and enterprise-level projects?', answer: 'Absolutely. Our solutions are designed to scale. Whether you are a startup needing foundational infrastructure or an enterprise requiring complex cloud migrations, we tailor our approach to fit your scope and budget.' },
//   { question: 'What is your typical project timeline?', answer: 'Timelines vary by project scope. A security assessment might take 2-4 weeks, while a full cloud migration could span 3-6 months. We provide detailed timelines during the assessment and strategy phase before any engagement begins.' },
//   { question: 'Do you provide ongoing support after project completion?', answer: 'Yes. We offer flexible support and maintenance packages that include monitoring, incident response, optimization, and regular reviews to ensure your systems continue to perform at their best.' },
// ];

// const techLogos = [
//   'AWS', 'Azure', 'GCP', 'Oracle Cloud', 'Kubernetes', 'Docker',
//   'Terraform', 'Python', 'Spark', 'Kafka', 'Hadoop', 'React',
// ];

// export default function Home() {
//   return (
//     <>
//       <Helmet>
//         <title>MAAGSYS Digital Transformation & Technology Solutions</title>
//         <meta name="description" content="MAAGSYS delivers expert solutions in Cybersecurity, Data Engineering, Cloud Engineering, AI/ML, and Technology Staffing. Transform your business with proven expertise." />
//       </Helmet>

//       {/* Hero */}
//       <Hero/>

//       {/* Services */}
//       <section className="py-24 bg-surface-50">
//         <div className="container-main section-padding">
//           <SectionHeader
//             tag="Our Services"
//             title="Comprehensive Technology Solutions"
//             subtitle="From securing your digital assets to building intelligent systems, we provide end-to-end technology services that drive real business outcomes."
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service, i) => (
//               <AnimatedSection key={i} delay={i * 100}>
//                 <Link to={service.path} className="card-elevated block h-full group">
//                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${service.color}`}>
//                     <service.icon className="w-6 h-6" />
//                   </div>
//                   <h3 className="text-lg font-display font-semibold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
//                     {service.title}
//                   </h3>
//                   <p className="text-sm text-gray-500 leading-relaxed mb-5">{service.desc}</p>
//                   <span className="btn-ghost text-sm">
//                     Learn more <HiArrowRight className="w-4 h-4" />
//                   </span>
//                 </Link>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="py-20 bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 relative overflow-hidden">
//         <div className="absolute inset-0 opacity-5">
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs><pattern id="stat-grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" /></pattern></defs>
//             <rect width="100%" height="100%" fill="url(#stat-grid)" />
//           </svg>
//         </div>
//         <div className="container-main section-padding relative z-10">
//           <StatsCounter light />
//         </div>
//       </section>

//       {/* Why Choose Us */}
//       <section className="py-24 bg-white">
//         <div className="container-main section-padding">
//           <div className="grid lg:grid-cols-2 gap-16 items-start">
//             <div>
//               <SectionHeader
//                 tag="Why MAAGSYS"
//                 title="Built on Quality, Integrity, and Innovation"
//                 subtitle="These three guiding principles define how we approach every engagement, ensuring consistent excellence and lasting value for our clients."
//                 align="left"
//               />
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 {whyUs.map((item, i) => (
//                   <AnimatedSection key={i} delay={i * 80}>
//                     <div className="flex items-start gap-3">
//                       <div className="w-6 h-6 rounded-full bg-brand-50 flex items-center justify-center shrink-0 mt-0.5">
//                         <HiCheckCircle className="w-4 h-4 text-brand-600" />
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
//                         <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
//                       </div>
//                     </div>
//                   </AnimatedSection>
//                 ))}
//               </div>
//             </div>
//             <AnimatedSection delay={200} direction="left">
//               <div className="bg-surface-50 rounded-3xl p-8 sm:p-10 border border-surface-200">
//                 <h3 className="font-display font-semibold text-xl text-gray-900 mb-6">Our Working Process</h3>
//                 <div className="space-y-6">
//                   {process.map((item, i) => (
//                     <div key={i} className="flex items-start gap-4">
//                       <div className="w-10 h-10 rounded-xl bg-brand-600 text-white font-display font-bold text-xs flex items-center justify-center shrink-0">
//                         {item.step}
//                       </div>
//                       <div>
//                         <h4 className="font-semibold text-gray-900 text-sm mb-1">{item.title}</h4>
//                         <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </AnimatedSection>
//           </div>
//         </div>
//       </section>

//       {/* Technologies */}
//       <section className="py-20 bg-surface-50 border-y border-surface-200">
//         <div className="container-main section-padding">
//           <AnimatedSection className="text-center mb-12">
//             <h2 className="font-display text-2xl font-bold text-gray-900">Technologies We Work With</h2>
//           </AnimatedSection>
//           <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
//             {techLogos.map((tech, i) => (
//               <AnimatedSection key={i} delay={i * 50}>
//                 <div className="px-6 py-3 bg-white rounded-xl border border-surface-200 text-sm font-medium text-gray-600 hover:text-brand-600 hover:border-brand-200 transition-all">
//                   {tech}
//                 </div>
//               </AnimatedSection>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FAQs */}
//       <section className="py-24 bg-white">
//         <div className="container-main section-padding">
//           <div className="grid lg:grid-cols-2 gap-16">
//             <SectionHeader
//               tag="FAQ"
//               title="Frequently Asked Questions"
//               subtitle="Answers to common questions about our services, process, and approach."
//               align="left"
//             />
//             <FAQAccordion items={faqs} />
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <CTASection />
//     </>
//   );
// }
