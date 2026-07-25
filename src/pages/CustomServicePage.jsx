import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';
import CTASection from '../components/CTASection';
import FAQAccordion from '../components/FAQAccordion';
import { ShimmerParagraph, ShimmerCard } from '../components/Shimmer';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function CustomServicePage() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPage = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, 'customServices'));
        const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        const match = docs.find(d => {
          if (d.published === false) return false;
          const docSlug = d.slug || d.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          return String(docSlug || '').toLowerCase() === String(slug || '').toLowerCase();
        });
        setPage(match || null);
      } catch (err) {
        console.error('Error fetching custom service page:', err);
        setPage(null);
      }
      setLoading(false);
    };
    fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-20 max-w-5xl mx-auto px-4">
        <div className="shimmer-block h-10 w-2/3 rounded mb-4" />
        <div className="shimmer-block h-5 w-1/3 rounded mb-10" />
        <ShimmerParagraph lines={5} />
        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          {[1, 2, 3, 4].map(i => <ShimmerCard key={i} />)}
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Service Not Found</h2>
        <p className="text-gray-500 mb-6">The service page you're looking for doesn't exist.</p>
        <Link to="/services" className="btn-primary">View All Services</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{page.title} MAAGSYS</title>
        <meta name="description" content={page.metaDescription || page.subtitle || `${page.title} services by MAAGSYS.`} />
      </Helmet>

      <PageHero
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: page.title },
        ]}
      />

      {/* Intro Section */}
      <section className="py-16 lg:py-20">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="lg:col-span-1">
              <AnimatedSection>
                {page.heroImage && (
                  <img src={page.heroImage} alt={page.title} className="w-full h-64 object-cover rounded-sm mb-8" />
                )}
                <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-brand-600" dangerouslySetInnerHTML={{ __html: page.content || '' }} />
              </AnimatedSection>
            </div>
            <div className="lg:col-span-1">
              <AnimatedSection direction="right">
                <div className="sticky top-28">
                  <div className="bg-surface-50 rounded-md p-6 border border-gray-100">
                    <h3 className="font-medium text-gray-900 mb-2">Quick Inquiry</h3>
                    <p className="text-sm text-gray-500 mb-4">Interested in {page.title}? Let's talk.</p>
                    <ContactForm compact service={page.title} />
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Offerings */}
      {page.offerings && page.offerings.length > 0 && (
        <section className="py-16 lg:py-20 bg-surface-50">
          <div className="container-main section-padding">
            <AnimatedSection className="text-center mb-14">
              <h2 className="section-title mt-3">Our {page.title} Solutions</h2>
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {page.offerings.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="bg-white rounded-sm p-6 border border-gray-100 hover:border-brand-200 hover:shadow-md transition-all duration-300 h-full">
                    <div className="w-10 h-10 bg-brand-50 rounded-sm flex items-center justify-center mb-4">
                      <FiCheckCircle className="w-5 h-5 text-brand-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits */}
      {page.benefits && page.benefits.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <h2 className="section-title text-center mt-3">Why Choose This Service</h2>
            </AnimatedSection>
            <div className="mt-10 space-y-4">
              {page.benefits.map((b, i) => (
                <AnimatedSection key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-4 bg-surface-50 rounded-sm p-5">
                    <span className="w-8 h-8 bg-brand-600 text-white rounded-sm flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-900">{b.title}</h4>
                      <p className="text-gray-500 text-sm mt-1">{b.description}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {page.faqs && page.faqs.length > 0 && (
        <section className="py-16 lg:py-20 bg-surface-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection className="text-center mb-14">
              <h2 className="section-title text-center mt-3">Frequently Asked Questions</h2>
            </AnimatedSection>
            <div className="mt-10">
              <FAQAccordion items={page.faqs} />
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
