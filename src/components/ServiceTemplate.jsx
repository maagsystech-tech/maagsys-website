import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiCheckCircle } from 'react-icons/hi';
import PageHero from './PageHero';
import AnimatedSection from './AnimatedSection';
import FAQAccordion from './FAQAccordion';
import CTASection from './CTASection';
import ContactForm from './ContactForm';

export default function ServiceTemplate({ meta, hero, intro, offerings, benefits = [], faqs = [], relatedServices = [] }) {
  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Helmet>

      <PageHero
        tag={hero.tag}
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumbs={[{ label: 'Services', path: '/services' }, { label: hero.breadcrumb }]}
      />

      {/* Intro */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <h2 className="section-title mb-6">{intro.title}</h2>
              {intro.paragraphs.map((p, i) => (
                <p key={i} className="text-gray-500 leading-relaxed mb-4">{p}</p>
              ))}
            </AnimatedSection>
            <AnimatedSection delay={200} direction="left">
              <div className="bg-surface-50 rounded-md p-8 border border-surface-200">
                <h3 className="font-display text-lg font-medium text-gray-900 mb-6">Quick Inquiry</h3>
                <ContactForm source={hero.breadcrumb.toLowerCase()} compact />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Offerings */}
      <section className="py-14 sm:py-20 bg-surface-50">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title">Our {hero.breadcrumb} Services</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offerings.map((item, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="card-elevated h-full">
                  <div className="w-10 h-10 rounded-sm bg-brand-50 flex items-center justify-center mb-4 text-brand-600 font-display font-bold text-sm">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="py-14 sm:py-20 bg-white">
          <div className="container-main section-padding">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection>
                <h2 className="section-title mb-8">Why Choose Our {hero.breadcrumb} Services</h2>
                <div className="space-y-5">
                  {benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <HiCheckCircle className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">{b.title}</h4>
                        <p className="text-sm text-gray-500">{b.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
              <AnimatedSection delay={200} direction="left">
                <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-md p-10 text-white">
                  <h3 className="font-display text-2xl font-bold mb-4">Ready to get started?</h3>
                  <p className="text-brand-200 mb-8 leading-relaxed">
                    Schedule a free consultation with our {hero.breadcrumb.toLowerCase()} experts to discuss your specific needs and challenges.
                  </p>
                  <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-brand-700 font-semibold rounded-sm hover:bg-gray-50 transition-all text-sm">
                    Book a Consultation <HiArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="py-14 sm:py-20 bg-surface-50">
          <div className="container-main section-padding">
            <div className="grid lg:grid-cols-2 gap-16">
              <AnimatedSection>
                <h2 className="section-title mb-4">{hero.breadcrumb} Questions</h2>
                <p className="section-subtitle">Common questions about our {hero.breadcrumb.toLowerCase()} services and approach.</p>
              </AnimatedSection>
              <FAQAccordion items={faqs} />
            </div>
          </div>
        </section>
      )}

      {/* Related services */}
      {relatedServices.length > 0 && (
        <section className="py-14 sm:py-20 bg-white">
          <div className="container-main section-padding">
            <AnimatedSection className="text-center mb-14">
              <h2 className="section-title">Related Services</h2>
            </AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedServices.map((s, i) => (
                <AnimatedSection key={i} delay={i * 100}>
                  <Link to={s.path} className="card-elevated block group text-center">
                    <h3 className="font-display text-lg font-semibold text-gray-900 group-hover:text-brand-600 transition-colors mb-2">{s.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                    <span className="btn-ghost text-sm justify-center">Learn more <HiArrowRight className="w-4 h-4" /></span>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
