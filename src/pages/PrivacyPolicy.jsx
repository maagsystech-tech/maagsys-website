import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';

const sections = [
  {
    title: 'Information We Collect',
    content: `We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, apply for a position, or communicate with us. This may include your name, email address, phone number, company name, and any other information you choose to provide. We also automatically collect certain information when you visit our website, including your IP address, browser type, operating system, referring URLs, and information about how you interact with our website.`,
  },
  {
    title: 'How We Use Your Information',
    content: `We use the information we collect to respond to your inquiries and provide the services you request, send you newsletters and marketing communications (with your consent), improve our website and services, analyze usage trends and preferences, comply with legal obligations, and protect against fraudulent or unauthorized activity.`,
  },
  {
    title: 'Information Sharing',
    content: `We do not sell, rent, or trade your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential. We may also disclose your information when required by law, to enforce our site policies, or to protect our or others' rights, property, or safety.`,
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors come from. You can control cookie preferences through your browser settings. Essential cookies required for site functionality cannot be disabled. Third-party embedded content (such as videos or social media widgets) may set their own cookies and tracking mechanisms, which are governed by those third parties' respective privacy policies.`,
  },
  {
    title: 'Data Security',
    content: `We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure, so we cannot guarantee absolute security.`,
  },
  {
    title: 'Data Retention',
    content: `We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Contact form submissions and application data are retained for a reasonable period to manage our business relationships and recruitment processes.`,
  },
  {
    title: 'Your Rights',
    content: `Depending on your jurisdiction, you may have rights regarding your personal data, including the right to access, correct, or delete the personal information we hold about you, the right to object to or restrict certain processing, and the right to data portability. To exercise any of these rights, please contact us at contact@maagsys.com.`,
  },
  {
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "Children's Privacy",
    content: `Our website and services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete it promptly.`,
  },
  {
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised "Last Updated" date. Your continued use of our website after changes are posted constitutes your acceptance of the updated policy.`,
  },
  {
    title: 'Contact Us',
    content: `If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:\n\nMAAGSYS\n12 Metro Park Rd, Suite #207\nAlbany, NY 12205\nEmail: contact@maagsys.com\nPhone: +1 518-600-8020`,
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy MAAGSYS</title>
        <meta name="description" content="MAAGSYS Privacy Policy. Learn how we collect, use, and protect your personal information." />
      </Helmet>

      <PageHero
        title="Privacy Policy"
        subtitle="Last updated: July 2026"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Privacy Policy' }]}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-gray-600 leading-relaxed mb-10">
              At MAAGSYS, we take your privacy seriously. This Privacy Policy describes how we collect, use, and safeguard your personal information when you visit our website (maagsys.com) or interact with our services. By using our website, you agree to the practices described in this policy.
            </p>
          </AnimatedSection>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{`${i + 1}. ${section.title}`}</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
