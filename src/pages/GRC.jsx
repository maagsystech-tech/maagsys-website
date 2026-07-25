import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function GRC() {
  return (
    <ServiceTemplate
      meta={{ title: 'GRC Services MAAGSYS', description: 'Governance, Risk, and Compliance services: regulatory compliance, risk management frameworks, policy development, and audit preparation.' }}
      hero={{
        tag: 'GRC',
        title: 'Governance, Risk & Compliance That Protects Your Business',
        subtitle: 'Navigate regulatory requirements with confidence. We build governance, risk management, and compliance frameworks that protect your organization and enable growth.',
        breadcrumb: 'GRC',
      }}
      intro={{
        tag: 'Overview',
        title: 'Structured Compliance Without the Complexity',
        paragraphs: [
          'Regulatory requirements are becoming more complex and enforcement more stringent. MAAGSYS\'s GRC services help organizations build structured governance frameworks, manage risk systematically, and achieve and maintain compliance with industry standards and regulations.',
          'We take a practical approach to GRC not just checking boxes, but building frameworks that genuinely strengthen your security posture, protect your data, and support your business objectives. Our team helps you understand what\'s required, implement the right controls, and prepare for audits with confidence.',
          'From SOC 2 and ISO 27001 to HIPAA, PCI-DSS, GDPR, and NIST, we bring deep expertise across major compliance frameworks and regulations.',
        ],
      }}
      offerings={[
        { title: 'Compliance Assessment', desc: 'Comprehensive gap analysis against applicable regulations and frameworks, with prioritized remediation roadmaps and timelines.' },
        { title: 'Risk Management', desc: 'Systematic identification, assessment, and treatment of organizational risks with frameworks that evolve with your threat landscape.' },
        { title: 'Policy Development', desc: 'Custom security policies, standards, and procedures aligned to regulatory requirements and tailored to your organizational context.' },
        { title: 'Audit Preparation', desc: 'End-to-end support for compliance audits including evidence gathering, documentation review, mock audits, and examiner coordination.' },
        { title: 'Vendor Risk Management', desc: 'Assess and monitor the security posture of third-party vendors and partners to manage supply chain risk effectively.' },
        { title: 'Continuous Compliance', desc: 'Ongoing monitoring and management of compliance status with automated controls testing and real-time reporting dashboards.' },
      ]}
      benefits={[
        { title: 'Framework Expertise', desc: 'Deep knowledge across SOC 2, ISO 27001, HIPAA, PCI-DSS, NIST CSF, CMMC, GDPR, and industry-specific regulations.' },
        { title: 'Practical Approach', desc: 'We build compliance programs that strengthen security and support operations not just paperwork exercises.' },
        { title: 'Audit Confidence', desc: 'Thorough preparation and documentation ensure you enter audits well-prepared and achieve successful outcomes.' },
        { title: 'Reduced Risk Exposure', desc: 'Systematic risk management reduces the likelihood and impact of security incidents, regulatory fines, and reputational damage.' },
      ]}
      faqs={[
        { question: 'Which compliance frameworks do you support?', answer: 'We support SOC 2, ISO 27001, HIPAA, PCI-DSS, NIST CSF, CMMC, GDPR, CCPA, and various industry-specific regulations. We also help organizations navigate overlapping requirements efficiently.' },
        { question: 'How long does a compliance assessment take?', answer: 'A typical gap assessment takes 2-4 weeks depending on scope. Full compliance program implementation can take 3-6 months. We provide detailed timelines during the initial scoping phase.' },
        { question: 'Can you help us maintain compliance after the initial certification?', answer: 'Yes, we offer continuous compliance services including ongoing monitoring, periodic assessments, policy updates, and audit cycle management to ensure you stay compliant year over year.' },
      ]}
      relatedServices={[
        { title: 'Cybersecurity', desc: 'Technical security measures that support compliance requirements.', path: '/services/cybersecurity' },
        { title: 'Cloud Engineering', desc: 'Compliant cloud architecture and deployment.', path: '/services/cloud-engineering' },
        { title: 'Data Engineering', desc: 'Data governance and quality management frameworks.', path: '/services/data-engineering' },
      ]}
    />
  );
}
