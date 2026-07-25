import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HiLightBulb, HiUserGroup, HiSparkles, HiShieldCheck, HiEye, HiHeart } from 'react-icons/hi';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import StatsCounter from '../components/StatsCounter';
import CTASection from '../components/CTASection';

import { useSettings } from '../hooks/useFirestore';

const values = [
  { icon: HiShieldCheck, title: 'Integrity', desc: 'We conduct every engagement with honesty, transparency, and ethical standards. Our clients trust us because we never compromise on doing what is right.' },
  { icon: HiUserGroup, title: 'Collaboration', desc: 'We believe the best outcomes come from teamwork, mutual respect, and open communication both within our team and with our clients.' },
  { icon: HiLightBulb, title: 'Innovation', desc: 'Creativity, curiosity, and continuous learning drive everything we do. We stay ahead of the technology curve to deliver forward-looking solutions.' },
];

const mission = [
  'Empower businesses to thrive in the digital age through innovation and operational excellence.',
  'Drive transformative change with tailored technology solutions designed for measurable impact.',
  'Deliver outsized value so our clients can consistently exceed their goals and expectations.',
];

const vision = [
  'To be a catalyst for transformative change across industries worldwide.',
  'To lead in sustainable growth and set new standards for technology innovation.',
  'To help businesses harness the full potential of technology for progress and positive impact.',
];

export default function About() {
  const { settings } = useSettings();

  return (
    <>
      <Helmet>
        <title>About {settings.siteName || 'MAAGSYS'} Our Mission, Values & Vision</title>
        <meta name="description" content={`${settings.siteName || 'MAAGSYS'} is a catalyst for innovation, driving transformative solutions through technology and expertise. Learn about our mission, values, and the team behind our success.`} />
      </Helmet>

      <PageHero
        tag="Who We Are"
        title="A Catalyst for Innovation Driving Transformative Solutions"
        subtitle="Professional, creative, innovative, and experienced we empower businesses to navigate the digital landscape with confidence."
        breadcrumbs={[{ label: 'About Us' }]}
      />

      {/* About intro */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <h2 className="section-title mb-6">Technology Expertise That Delivers Results</h2>
              <p className="text-gray-500 leading-relaxed mb-5">
                {settings.siteName || 'MAAGSYS'} was founded with a clear purpose: to bridge the gap between a client's vision and the technology needed to make it reality. We bring together seasoned professionals across cybersecurity, cloud engineering, data science, and artificial intelligence to deliver solutions that are not only technically excellent but also strategically aligned with your business objectives.
              </p>
              <p className="text-gray-500 leading-relaxed mb-5">
                Our approach is rooted in understanding your unique challenges first. We don't believe in one-size-fits-all solutions. Instead, we invest time in understanding your industry, your workflows, and your goals then design and implement technology that drives measurable outcomes.
              </p>
              <p className="text-gray-500 leading-relaxed">
                From optimizing cloud infrastructure for agility to deploying proactive cybersecurity detection and incident response, from automating processes with AI/ML to driving innovation through digital transformation we are your end-to-end technology partner.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={200} direction="left">
              <div className="relative">
                <div className="bg-gradient-to-br from-surface-50 to-brand-50 rounded-md p-10 border border-surface-200">
                  <div className="space-y-8">
                    {[
                      { label: 'Cloud Engineering', desc: 'Optimizes infrastructure for agility and performance' },
                      { label: 'Cybersecurity', desc: 'Proactive detection and rapid incident response' },
                      { label: 'AI / ML', desc: 'Automates processes and surfaces critical insights' },
                      { label: 'Digital Transformation', desc: 'Drives innovation and elevates customer experience' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full bg-brand-500 mt-2 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{item.label}</h4>
                          <p className="text-sm text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats */}
      {settings.statsCounterEnabled !== false && (
        <section className="py-10 bg-brand-800">
          <div className="container-main section-padding">
            <StatsCounter light />
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-14 sm:py-20 bg-surface-50">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-2 gap-12">
            <AnimatedSection>
              <div className="bg-white rounded-md p-8 sm:p-10 border border-surface-200 h-full">
                <div className="w-12 h-12 rounded-sm bg-brand-50 flex items-center justify-center mb-5">
                  <HiHeart className="w-6 h-6 text-brand-600" />
                </div>
                <h3 className="font-display text-2xl font-medium text-gray-900 mb-5">Our Mission</h3>
                <div className="space-y-4">
                  {mission.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={150}>
              <div className="bg-white rounded-md p-8 sm:p-10 border border-surface-200 h-full">
                <div className="w-12 h-12 rounded-sm bg-accent-50 flex items-center justify-center mb-5">
                  <HiEye className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="font-display text-2xl font-medium text-gray-900 mb-5">Our Vision</h3>
                <div className="space-y-4">
                  {vision.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {i + 1}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          <AnimatedSection className="text-center mb-14">
            <h2 className="section-title">What Guides Us Every Day</h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, i) => (
              <AnimatedSection key={i} delay={i * 120}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-sm bg-brand-50 flex items-center justify-center mx-auto mb-6">
                    <value.icon className="w-7 h-7 text-brand-600" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{value.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Let's Build Something Great Together" subtitle="Ready to take your technology strategy to the next level? We're here to help." />
    </>
  );
}
