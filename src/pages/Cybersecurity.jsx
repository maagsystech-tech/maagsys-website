import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function Cybersecurity() {
  return (
    <ServiceTemplate
      meta={{ title: 'Cybersecurity Services MAAGSYS', description: 'Comprehensive cybersecurity: threat detection, incident response, vulnerability assessments, penetration testing, and security consulting.' }}
      hero={{
        tag: 'Cybersecurity',
        title: 'Protect Your Digital Assets Against Evolving Threats',
        subtitle: 'Comprehensive threat detection, incident response, and vulnerability assessments keeping your organization secure in an ever-changing threat landscape.',
        breadcrumb: 'Cybersecurity',
      }}
      intro={{
        tag: 'Overview',
        title: 'Proactive Security for the Modern Enterprise',
        paragraphs: [
          'Cyber threats are evolving faster than ever. From sophisticated APT groups and ransomware attacks to social engineering and supply chain vulnerabilities, organizations face an unprecedented volume and variety of threats. MAAGSYS provides comprehensive cybersecurity services that protect your digital assets, data, and reputation.',
          'Our security team combines deep technical expertise with threat intelligence and industry best practices to deliver a defense-in-depth strategy tailored to your risk profile. We don\'t just react to incidents we proactively identify vulnerabilities, harden your defenses, and prepare your organization to respond effectively when threats emerge.',
          'Whether you need a full security assessment, managed detection and response, penetration testing, or security architecture review, our team brings the experience and tools to keep your business secure.',
        ],
      }}
      offerings={[
        { title: 'Threat Detection & Monitoring', desc: 'Continuous monitoring of your environment with advanced SIEM, behavioral analytics, and threat intelligence to identify and neutralize threats early.' },
        { title: 'Incident Response', desc: 'Rapid, structured response to security incidents containment, eradication, recovery, and post-incident analysis to minimize impact and prevent recurrence.' },
        { title: 'Vulnerability Assessments', desc: 'Comprehensive scanning and analysis of your infrastructure, applications, and configurations to identify security weaknesses before attackers do.' },
        { title: 'Penetration Testing', desc: 'Simulated attacks by ethical hackers to test your defenses, identify exploitable vulnerabilities, and validate the effectiveness of your security controls.' },
        { title: 'Security Architecture Review', desc: 'Assessment of your overall security posture, architecture, and controls with recommendations for strengthening your defense-in-depth strategy.' },
        { title: 'Security Awareness Training', desc: 'Educate your workforce on recognizing phishing, social engineering, and other common attack vectors through engaging, practical training programs.' },
        { title: 'Dark Web Monitoring', desc: 'Monitor dark web forums and marketplaces for compromised credentials, data leaks, and emerging threats targeting your organization.' },
        { title: 'Digital Forensics', desc: 'Expert forensic analysis for investigating security incidents, gathering evidence, determining root cause, and supporting legal or compliance proceedings.' },
      ]}
      benefits={[
        { title: 'Comprehensive Coverage', desc: 'End-to-end security services covering prevention, detection, response, and recovery a complete security program under one roof.' },
        { title: 'Expert Team', desc: 'Certified security professionals (CISSP, CEH, OSCP) with experience across industries including finance, healthcare, government, and technology.' },
        { title: 'Proactive Approach', desc: 'We don\'t wait for incidents. Continuous monitoring, regular testing, and threat intelligence keep you ahead of evolving threats.' },
        { title: 'Compliance Alignment', desc: 'Services aligned with major frameworks including NIST, ISO 27001, SOC 2, HIPAA, PCI-DSS, and CMMC.' },
        { title: 'Reduced Risk', desc: 'Systematic identification and remediation of vulnerabilities significantly reduces your attack surface and overall risk exposure.' },
      ]}
      faqs={[
        { question: 'How often should we conduct penetration testing?', answer: 'We recommend at least annual penetration testing, with additional tests after significant infrastructure changes, new application deployments, or major updates. High-risk environments may benefit from quarterly testing.' },
        { question: 'Do you provide managed security services?', answer: 'Yes, we offer managed detection and response (MDR) services with 24/7 monitoring, alerting, and incident response. This is ideal for organizations that need enterprise-grade security without building a full in-house SOC.' },
        { question: 'What compliance frameworks do you support?', answer: 'We support NIST CSF, ISO 27001, SOC 2, HIPAA, PCI-DSS, CMMC, GDPR, and industry-specific regulations. Our team helps you understand requirements, implement controls, and prepare for audits.' },
      ]}
      relatedServices={[
        { title: 'GRC', desc: 'Governance, risk, and compliance frameworks for your organization.', path: '/services/grc' },
        { title: 'Cloud Engineering', desc: 'Secure cloud architecture and deployment.', path: '/services/cloud-engineering' },
        { title: 'Staffing', desc: 'Vetted cybersecurity professionals for your team.', path: '/services/staffing' },
      ]}
    />
  );
}
