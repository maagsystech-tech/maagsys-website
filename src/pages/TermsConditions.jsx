import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import AnimatedSection from '../components/AnimatedSection';

const sections = [
  {
    title: 'Acceptance of Terms',
    content: `By accessing and using the MAAGSYS website (maagsys.com) and any related services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services. You must be at least 18 years of age to use this website.`,
  },
  {
    title: 'Services Description',
    content: `MAAGSYS provides information technology consulting services, including but not limited to cybersecurity, data engineering, cloud engineering, AI/ML solutions, staffing, governance risk and compliance, application development, and data analytics. The information on this website is provided for general informational purposes and does not constitute a binding offer or contract for services.`,
  },
  {
    title: 'Intellectual Property',
    content: `All content, features, and functionality on this website including text, graphics, logos, icons, images, audio clips, software, and compilation thereof are the exclusive property of MAAGSYS or its content suppliers and are protected by United States and international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, or exploit any of our content without prior written consent.`,
  },
  {
    title: 'User Conduct',
    content: `You agree to use our website only for lawful purposes and in a way that does not infringe upon the rights of, restrict, or inhibit anyone else's use of the website. You may not use the website to transmit any material that is defamatory, offensive, or otherwise objectionable, attempt to gain unauthorized access to our systems or networks, use any automated means to access or scrape the website without our written consent, or introduce viruses, trojans, or other malicious material.`,
  },
  {
    title: 'Contact Forms and Submissions',
    content: `When you submit information through our contact forms, career applications, or newsletter subscriptions, you consent to MAAGSYS collecting and using that information in accordance with our Privacy Policy. You are responsible for ensuring that any information you submit is accurate and complete.`,
  },
  {
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party websites or services that are not owned or controlled by MAAGSYS. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that MAAGSYS shall not be responsible for any damage or loss caused by use of such websites.`,
  },
  {
    title: 'Disclaimer of Warranties',
    content: `This website and its content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. MAAGSYS disclaims all warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components.`,
  },
  {
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, MAAGSYS and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website, regardless of whether such damages are based on warranty, contract, tort, or any other legal theory. Our total liability for any claim arising out of your use of the website shall not exceed $100 USD.`,
  },
  {
    title: 'Indemnification',
    content: `You agree to indemnify, defend, and hold harmless MAAGSYS, its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, or expenses (including reasonable attorneys' fees) arising out of your violation of these Terms or your use of the website.`,
  },
  {
    title: 'Governing Law',
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, United States, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved in the state or federal courts located in Albany County, New York.`,
  },
  {
    title: 'Dispute Resolution',
    content: `Before filing any formal legal claim, you agree to first contact MAAGSYS at contact@maagsys.com to attempt to resolve the dispute informally. We will make good-faith efforts to resolve any issues within 30 days.`,
  },
  {
    title: 'Changes to These Terms',
    content: `MAAGSYS reserves the right to modify these Terms and Conditions at any time. Material changes will be posted on this page with an updated "Last Updated" date. Your continued use of the website following the posting of changes constitutes your acceptance of those changes.`,
  },
  {
    title: 'Severability',
    content: `If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions shall remain in full force and effect.`,
  },
  {
    title: 'Contact Information',
    content: `If you have any questions about these Terms and Conditions, please contact us at:\n\nMAAGSYS\n12 Metro Park Rd, Suite #207\nAlbany, NY 12205\nEmail: contact@maagsys.com\nPhone: +1 518-600-8020`,
  },
];

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions MAAGSYS</title>
        <meta name="description" content="MAAGSYS Terms and Conditions governing the use of our website and services." />
      </Helmet>

      <PageHero
        title="Terms & Conditions"
        subtitle="Last updated: July 2026"
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Terms & Conditions' }]}
      />

      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-gray-600 leading-relaxed mb-10">
              Please read these Terms and Conditions carefully before using the MAAGSYS website. These terms govern your access to and use of our website and services.
            </p>
          </AnimatedSection>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <AnimatedSection key={i} delay={i * 0.04}>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{`${i + 1}. ${section.title}`}</h2>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection>
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-500 text-sm">
                By using maagsys.com, you acknowledge that you have read and understood these Terms and Conditions and agree to be bound by them. For privacy-related information, please review our{' '}
                <Link to="/privacy-policy" className="text-brand-600 hover:underline">Privacy Policy</Link>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
