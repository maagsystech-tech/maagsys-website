import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function Staffing() {
  return (
    <ServiceTemplate
      meta={{ title: 'Technology Staffing MAAGSYS', description: 'Vetted technology professionals: cybersecurity, cloud engineering, data engineering, AI/ML rigorously trained and background-checked.' }}
      hero={{
        tag: 'Staffing',
        title: 'Unleashing Excellence Through Top Technical Talent',
        subtitle: 'Connect with vetted, trained technology professionals across cybersecurity, cloud, data, and AI rigorously assessed and background-checked.',
        breadcrumb: 'Staffing',
      }}
      intro={{
        tag: 'Overview',
        title: 'The Right Talent for Critical Roles',
        paragraphs: [
          'Finding qualified technology professionals is one of the biggest challenges organizations face today. MAAGSYS\'s staffing services connect you with professionals who have been rigorously trained, technically assessed, and thoroughly background-checked so you can build your team with confidence.',
          'We don\'t just match resumes to job descriptions. Our staffing approach includes comprehensive training programs that keep candidates current with industry standards, detailed workforce experience assessments that verify expertise and cultural fit, and thorough background checks covering employment history, education, and credentials.',
          'Whether you need cybersecurity analysts, cloud architects, data engineers, or AI/ML specialists, we have a pipeline of qualified professionals ready to contribute to your organization from day one.',
        ],
      }}
      offerings={[
        { title: 'Cybersecurity Roles', desc: 'Threat detection specialists, incident responders, security analysts, penetration testers, and compliance professionals all rigorously vetted.' },
        { title: 'Cloud Engineering', desc: 'Cloud architects, DevOps engineers, site reliability engineers, and cloud security specialists skilled in AWS, Azure, and GCP.' },
        { title: 'Data Engineering', desc: 'Data engineers, pipeline developers, database administrators, and data architects experienced in modern data stack technologies.' },
        { title: 'Data Analytics', desc: 'Business analysts, data visualization experts, and analytics professionals who transform complex data into actionable business insights.' },
        { title: 'AI / ML Specialists', desc: 'Machine learning engineers, data scientists, NLP specialists, and computer vision experts vetted for both technical depth and practical experience.' },
        { title: 'Application Development', desc: 'Full-stack developers, mobile engineers, QA specialists, and DevOps professionals proficient in modern development frameworks.' },
      ]}
      benefits={[
        { title: 'Rigorous Training Programs', desc: 'Our candidates undergo structured training to stay current with the latest technologies, tools, and industry best practices.' },
        { title: 'Comprehensive Assessments', desc: 'Detailed evaluation of technical skills, problem-solving ability, communication, and cultural fit ensures you get the right person for the role.' },
        { title: 'Background Verified', desc: 'Thorough verification of employment history, education credentials, certifications, and criminal background for complete peace of mind.' },
        { title: 'Fast Time-to-Hire', desc: 'Pre-vetted talent pipeline means shorter hiring cycles. Get qualified candidates in front of your team within days, not weeks.' },
        { title: 'Flexible Engagement', desc: 'Contract, contract-to-hire, and permanent placement options to match your hiring needs and budget constraints.' },
      ]}
      faqs={[
        { question: 'What does your vetting process include?', answer: 'Our process includes technical skills assessment, coding challenges, behavioral interviews, reference checks, employment verification, education verification, and comprehensive background screening. Only candidates who pass every stage are presented to clients.' },
        { question: 'How quickly can you fill a position?', answer: 'For roles matching our existing talent pipeline, we can typically present qualified candidates within 3-5 business days. Specialized or senior roles may take 1-3 weeks depending on specific requirements.' },
        { question: 'Do you offer contract and permanent staffing?', answer: 'Yes, we offer flexible engagement models including contract, contract-to-hire, and direct permanent placement. We work with you to determine the best approach for each role.' },
      ]}
      relatedServices={[
        { title: 'Cybersecurity', desc: 'Security services to complement your in-house team.', path: '/services/cybersecurity' },
        { title: 'Cloud Engineering', desc: 'Cloud solutions to support your technology initiatives.', path: '/services/cloud-engineering' },
        { title: 'AI / ML', desc: 'AI solutions delivered by our expert team.', path: '/services/ai-ml' },
      ]}
    />
  );
}
