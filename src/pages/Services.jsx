import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useCollection } from '../hooks/useFirestore';
import { HiArrowRight, HiShieldCheck, HiCode, HiCloud, HiChartBar, HiLightningBolt, HiUserGroup, HiClipboardCheck, HiDesktopComputer } from 'react-icons/hi';
import { FiLayers } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import CTASection from '../components/CTASection';

const builtInServices = [
  { icon: HiShieldCheck, title: 'Cybersecurity', desc: 'Comprehensive threat detection, incident response, and vulnerability assessments. We protect your digital assets against evolving cyber threats with proactive security measures and 24/7 monitoring.', path: '/services/cybersecurity', color: 'bg-red-50 text-red-600' },
  { icon: HiChartBar, title: 'Data Engineering', desc: 'Build scalable data pipelines for collection, storage, processing, and analysis. From ETL processes to data lake architecture, we turn raw data into actionable business intelligence.', path: '/services/data-engineering', color: 'bg-brand-50 text-brand-600' },
  { icon: HiCloud, title: 'Cloud Engineering', desc: 'End-to-end cloud services across Azure, AWS, GCP, and Oracle Cloud. Architecture design, migration, security, optimization, and ongoing management for maximum performance and cost efficiency.', path: '/services/cloud-engineering', color: 'bg-sky-50 text-sky-600' },
  { icon: HiLightningBolt, title: 'AI / ML', desc: 'Custom AI model development, machine learning training, predictive analytics, NLP, and computer vision. We help you leverage artificial intelligence to drive innovation and operational efficiency.', path: '/services/ai-ml', color: 'bg-violet-50 text-violet-600' },
  { icon: HiUserGroup, title: 'Staffing', desc: 'Connect with vetted, trained technology professionals across cybersecurity, cloud, data engineering, and AI. Rigorous training programs, experience assessments, and comprehensive background checks.', path: '/services/staffing', color: 'bg-emerald-50 text-emerald-600' },
  { icon: HiClipboardCheck, title: 'GRC', desc: 'Governance, Risk, and Compliance services to help you navigate regulatory requirements. We build frameworks that ensure compliance while minimizing operational risk.', path: '/services/grc', color: 'bg-orange-50 text-orange-600' },
  { icon: HiDesktopComputer, title: 'App Development', desc: 'Custom software from concept to deployment. We build robust, scalable applications using modern frameworks and best practices, tailored to your specific business requirements.', path: '/services/app-development', color: 'bg-amber-50 text-amber-600' },
  { icon: HiCode, title: 'Data Analytics', desc: 'Extract meaningful insights from your business data. Our analytics experts help you make informed, data-driven decisions through advanced visualization, reporting, and statistical analysis.', path: '/services/data-engineering', color: 'bg-teal-50 text-teal-600' },
];

const process = [
  { step: '01', title: 'Assessment & Strategy', desc: 'Audit current systems and processes, understand your business goals, and align on a strategic technology roadmap.' },
  { step: '02', title: 'Solution Design', desc: 'Design customized, scalable architectures around our core service areas, built specifically for your requirements.' },
  { step: '03', title: 'Implementation & Integration', desc: 'Deploy solutions with minimal disruption, ensuring seamless integration with your existing infrastructure and workflows.' },
  { step: '04', title: 'Testing & Optimization', desc: 'Rigorous quality assurance, performance testing, and continuous optimization to ensure everything runs flawlessly.' },
  { step: '05', title: 'Support & Maintenance', desc: 'Ongoing monitoring, support, and maintenance so you can focus on your core business with total confidence.' },
];

export default function Services() {
  const { data: customDocs } = useCollection('customServices');

  const customServicesFormatted = (customDocs || [])
    .filter(p => p && (p.title || p.name) && p.published !== false)
    .map(p => {
      const title = p.title || p.name || 'Custom Service';
      const slugVal = p.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return {
        id: p.id,
        icon: FiLayers,
        title,
        desc: p.subtitle || p.description || (p.metaDescription ? p.metaDescription : `Custom ${title} technology solution.`),
        path: `/services/${slugVal}`,
        color: 'bg-brand-50 text-brand-600',
        isCustom: true,
      };
    });

  const displayServices = [...builtInServices, ...customServicesFormatted];

  return (
    <>
      <Helmet>
        <title>Our Services MAAGSYS Technology Solutions</title>
        <meta name="description" content="Explore MAAGSYS services: Cybersecurity, Data Engineering, Cloud Engineering, AI/ML, Staffing, GRC, Application Development, and Custom Solutions." />
      </Helmet>

      <PageHero
        tag="What We Do"
        title="Unleash Innovation and Revolutionize Your Business"
        subtitle="Comprehensive technology services spanning AI/ML, Data Analytics, Cybersecurity, Staffing, and Cloud Engineering delivered by seasoned professionals."
        breadcrumbs={[{ label: 'Services' }]}
      />

      {/* ━━━ All Services Grid Section ━━━ */}
      <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
        <div className="container-main section-padding">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <Link
                  to={service.path}
                  className="group block h-full bg-white border border-brand-200 p-4 sm:p-6 transition-all duration-300 hover:border-brand-500 hover:shadow-xl hover:shadow-brand-500/5 relative text-center rounded-sm"
                >
                  {service.isCustom && (
                    <span className="absolute top-3 right-3 bg-brand-50 text-brand-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Custom Service
                    </span>
                  )}
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

      {/* Why work with us */}
      <section className="py-14 sm:py-20 bg-surface-50">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title">Expertise, Innovation & Client Focus</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Expertise & Excellence', desc: 'Seasoned professionals with deep domain knowledge across every service area. We bring decades of combined experience to each engagement.' },
              { title: 'Innovative Solutions', desc: 'Forward-looking approaches that leverage cutting-edge tools, frameworks, and methodologies to keep you ahead of the competition.' },
              { title: 'Client-Centric Approach', desc: 'Personalized support and customized solutions designed around your specific business context, challenges, and growth trajectory.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="bg-white rounded-sm p-8 border border-surface-200 h-full">
                  <h3 className="font-display text-lg font-medium text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title">How We Work</h2>
            <p className="section-subtitle mt-4 mx-auto">A structured, proven approach that ensures consistent delivery and measurable outcomes for every engagement.</p>
          </AnimatedSection>
          <div className="max-w-3xl mx-auto">
            {process.map((item, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className={`flex items-start gap-6 ${i < process.length - 1 ? 'pb-10 border-l-2 border-surface-200 ml-5 pl-10 relative' : 'ml-5 pl-10 relative'}`}>
                  <div className="absolute left-0 -translate-x-1/2 w-10 h-10 rounded-sm bg-brand-600 text-white font-display font-bold text-xs flex items-center justify-center">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-medium text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
