import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HiPhone, HiMail, HiLocationMarker, HiClock } from 'react-icons/hi';
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';
import ContactForm from '../components/ContactForm';
import { useSettings } from '../hooks/useFirestore';

export default function Contact() {
  const { settings } = useSettings();

  const phone = settings.contactPhone || '+1 518-600-8020';
  const email = settings.contactEmail || 'contact@maagsys.com';
  const address = settings.address || '12 Metro Park Rd, Suite #207, Albany, NY 12205';

  const contactInfo = [
    { icon: HiPhone, label: 'Phone', value: phone, href: `tel:${phone.replace(/[^0-9+]/g, '')}` },
    { icon: HiMail, label: 'Email', value: email, href: `mailto:${email}` },
    { icon: HiLocationMarker, label: 'Address', value: address, href: null },
    { icon: HiClock, label: 'Business Hours', value: 'Mon - Fri: 9:00 AM - 6:00 PM EST', href: null },
  ];

  const socials = [
    { icon: FaFacebookF, url: settings.facebookUrl || 'https://facebook.com/maagsys', label: 'Facebook' },
    { icon: FaXTwitter, url: settings.twitterUrl || 'https://x.com/maagsys', label: 'X' },
    { icon: FaInstagram, url: settings.instagramUrl || 'https://instagram.com/maagsys', label: 'Instagram' },
    { icon: FaLinkedinIn, url: settings.linkedinUrl || 'https://linkedin.com/company/maagsys', label: 'LinkedIn' },
  ];

  return (
    <>
      <Helmet>
        <title>Contact {settings.siteName || 'MAAGSYS'} Let's Discuss Your Project</title>
        <meta name="description" content={`Get in touch with ${settings.siteName || 'MAAGSYS'}. Call ${phone} or send us a message. We're here to help with your cybersecurity, cloud, data, and AI needs.`} />
      </Helmet>

      <PageHero
        tag="Contact Us"
        title="Let's Have a Chat"
        subtitle="Have a project in mind? Need expert technology guidance? We'd love to hear from you. Reach out and let's start a conversation."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="py-14 sm:py-20 bg-white">
        <div className="container-main section-padding">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Whether you're looking to enhance your cybersecurity posture, migrate to the cloud, build data pipelines, or explore AI opportunities our team is ready to help.
                </p>
                <div className="space-y-6 mb-10">
                  {contactInfo.map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-sm bg-brand-50 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-brand-600" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm text-gray-800 font-medium hover:text-brand-600 transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm text-gray-800 font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Follow Us</p>
                  <div className="flex items-center gap-3">
                    {socials.map(({ icon: Icon, url, label }) => (
                      <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                        className="w-10 h-10 rounded-sm bg-surface-100 border border-surface-200 flex items-center justify-center text-gray-500 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all">
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimatedSection delay={150} direction="left">
                <div className="bg-surface-50 rounded-md p-8 sm:p-10 border border-surface-200">
                  <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Send Us a Message</h3>
                  {settings.contactFormEnabled !== false ? (
                    <>
                      <p className="text-sm text-gray-500 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
                      <ContactForm source="contact-page" />
                    </>
                  ) : (
                    <div className="py-10 text-center">
                      <p className="text-gray-500 leading-relaxed">
                        Our online contact form is temporarily offline. Please reach out to us directly via the email or phone number listed here.
                      </p>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="bg-surface-100">
        <div className="container-main section-padding py-16">
          <AnimatedSection className="text-center">
            <div className="bg-white rounded-md border border-surface-200 p-12">
              <HiLocationMarker className="w-10 h-10 text-brand-600 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Visit Our Office</h3>
              <p className="text-gray-500 text-sm">{address}</p>
              <a
                href="https://maps.google.com/?q=12+Metro+Park+Rd+Suite+207+Albany+NY+12205"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-flex"
              >
                Get Directions
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
