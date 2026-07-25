import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function CloudEngineering() {
  return (
    <ServiceTemplate
      meta={{
        title: 'Cloud Engineering Services MAAGSYS',
        description: 'Cloud engineering and security services across Azure, AWS, GCP, and Oracle Cloud: architecture, migration, management, security, and optimization.',
      }}
      hero={{
        tag: 'Cloud Engineering',
        title: 'Powering Your Future in the Cloud',
        subtitle: 'End-to-end cloud engineering and security services across Azure, AWS, GCP, and Oracle Cloud covering architecture, migration, management, and security.',
        breadcrumb: 'Cloud Engineering',
      }}
      intro={{
        tag: 'Overview',
        title: 'Cloud-First Solutions for Modern Enterprises',
        paragraphs: [
          'Cloud technology is the backbone of modern business operations. MAAGSYS delivers comprehensive cloud engineering services that help organizations migrate, optimize, and secure their cloud environments across all major platforms including AWS, Microsoft Azure, Google Cloud Platform, and Oracle Cloud.',
          'Our cloud architects design solutions that balance performance, scalability, security, and cost ensuring your cloud investment delivers maximum business value. Whether you\'re planning your first cloud migration or optimizing a complex multi-cloud environment, we bring the expertise to get it right.',
          'From infrastructure-as-code with Terraform to container orchestration with Kubernetes, we leverage modern DevOps practices and cloud-native tools to build resilient, auto-scaling environments that adapt to your business demands.',
        ],
      }}
      offerings={[
        { title: 'Cloud Migration', desc: 'Seamless migration of your infrastructure, applications, and data to the cloud with minimal disruption to operations and zero data loss.' },
        { title: 'Architecture Design', desc: 'Custom cloud architectures balancing performance, scalability, security, and cost designed for your specific workloads and growth trajectory.' },
        { title: 'Cloud Security', desc: 'Comprehensive security measures to safeguard your cloud environments against cyber threats, data breaches, and compliance violations.' },
        { title: 'Cloud Optimization', desc: 'Improve efficiency, reduce costs, and maximize resource utilization through right-sizing, reserved capacity planning, and architectural optimization.' },
        { title: 'Monitoring & Management', desc: 'Proactive 24/7 monitoring, alerting, and issue resolution to ensure maximum uptime and optimal performance of your cloud infrastructure.' },
        { title: 'Disaster Recovery', desc: 'Business continuity and disaster recovery plans that minimize downtime and data loss with automated failover and regular testing.' },
        { title: 'Governance & Compliance', desc: 'Policies and frameworks for effective, compliant cloud resource management aligned with regulatory requirements and industry standards.' },
        { title: 'Training & Consultation', desc: 'Upskill your internal teams on cloud technologies, best practices, and modern DevOps methodologies through hands-on training programs.' },
      ]}
      benefits={[
        { title: 'Multi-Cloud Expertise', desc: 'Deep expertise across AWS, Azure, GCP, and Oracle Cloud we recommend and implement the right platform for your needs.' },
        { title: 'Cost Reduction', desc: 'Clients typically see 20-40% infrastructure cost savings through our optimization strategies and right-sizing recommendations.' },
        { title: 'Zero-Downtime Migrations', desc: 'Proven migration methodologies that move your workloads without impacting business operations or customer experience.' },
        { title: 'Security-First Approach', desc: 'Every cloud deployment includes security controls, encryption, access management, and compliance monitoring as standard.' },
        { title: 'Scalable Architecture', desc: 'Cloud-native designs that auto-scale with demand, ensuring performance during peaks without over-provisioning during quiet periods.' },
      ]}
      faqs={[
        { question: 'Which cloud platform do you recommend?', answer: 'The right platform depends on your workloads, existing technology stack, compliance requirements, and team expertise. We evaluate all factors and recommend the best fit sometimes a multi-cloud or hybrid approach is optimal. We work with AWS, Azure, GCP, and Oracle Cloud.' },
        { question: 'How long does a typical cloud migration take?', answer: 'Timeline depends on complexity. A straightforward lift-and-shift of a few applications might take 4-6 weeks, while a full enterprise migration with modernization can take 3-6 months. We provide detailed timelines and milestones during the assessment phase.' },
        { question: 'Do you support hybrid cloud environments?', answer: 'Yes, we design and manage hybrid environments that span on-premises infrastructure and one or more cloud platforms. This approach works well for organizations with regulatory constraints, legacy systems, or specific latency requirements.' },
      ]}
      relatedServices={[
        { title: 'Cybersecurity', desc: 'Secure your cloud environments with comprehensive security services.', path: '/services/cybersecurity' },
        { title: 'Data Engineering', desc: 'Build cloud-native data pipelines and analytics infrastructure.', path: '/services/data-engineering' },
        { title: 'GRC', desc: 'Ensure your cloud deployments meet governance and compliance standards.', path: '/services/grc' },
      ]}
    />
  );
}
