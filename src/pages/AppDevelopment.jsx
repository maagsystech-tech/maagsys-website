import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function AppDevelopment() {
  return (
    <ServiceTemplate
      meta={{ title: 'Application Development MAAGSYS', description: 'Custom software development from concept to deployment: web, mobile, enterprise applications built with modern frameworks.' }}
      hero={{
        tag: 'App Development',
        title: 'Custom Software Built for Your Business',
        subtitle: 'From concept to deployment we build robust, scalable applications using modern frameworks and agile methodologies, tailored to your requirements.',
        breadcrumb: 'App Development',
      }}
      intro={{
        tag: 'Overview',
        title: 'Software That Solves Real Problems',
        paragraphs: [
          'Off-the-shelf software rarely fits perfectly. MAAGSYS builds custom applications designed around your specific business processes, user needs, and growth trajectory. Whether you need a web application, mobile app, enterprise platform, or API-driven service, we deliver production-grade software that works.',
          'Our development team follows agile methodologies with continuous integration and delivery, ensuring rapid iteration, transparent progress, and early value delivery. We write clean, maintainable code backed by automated testing and thorough documentation.',
          'From initial requirements gathering through architecture, development, testing, deployment, and ongoing maintenance we handle the complete software development lifecycle with the quality and reliability your business demands.',
        ],
      }}
      offerings={[
        { title: 'Web Application Development', desc: 'Responsive, performant web applications built with modern frameworks like React, Angular, and Node.js from single-page apps to complex enterprise platforms.' },
        { title: 'Mobile App Development', desc: 'Native and cross-platform mobile applications for iOS and Android that deliver excellent user experience and performance.' },
        { title: 'Enterprise Software', desc: 'Large-scale enterprise applications including ERP integrations, workflow automation, and business process management systems.' },
        { title: 'API Development', desc: 'RESTful and GraphQL APIs that connect your systems, enable integrations, and power your digital ecosystem reliably and securely.' },
        { title: 'UI/UX Design', desc: 'User-centered interface design that combines visual appeal with intuitive usability, backed by research and iterative user testing.' },
        { title: 'QA & Testing', desc: 'Comprehensive testing strategies including unit tests, integration tests, end-to-end testing, and performance testing to ensure quality at every stage.' },
      ]}
      benefits={[
        { title: 'Agile Delivery', desc: 'Iterative development with regular demos and feedback loops ensures the final product matches your vision exactly.' },
        { title: 'Modern Tech Stack', desc: 'We use proven, modern technologies that are scalable, maintainable, and supported by strong developer communities.' },
        { title: 'Quality First', desc: 'Automated testing, code reviews, and CI/CD pipelines ensure every release meets high quality standards.' },
        { title: 'Full Lifecycle Support', desc: 'From requirements to deployment and beyond ongoing maintenance, updates, and enhancements as your needs evolve.' },
      ]}
      faqs={[
        { question: 'What technologies do you use for development?', answer: 'We work with modern frameworks including React, Angular, Vue.js, Node.js, Python, .NET, and mobile platforms (React Native, Swift, Kotlin). The choice depends on your requirements, existing stack, and team capabilities.' },
        { question: 'How do you handle project management?', answer: 'We follow Agile/Scrum with 2-week sprints, daily standups, sprint reviews, and retrospectives. You get full visibility into progress through project management tools and regular status updates.' },
        { question: 'Can you work with our existing development team?', answer: 'Absolutely. We frequently augment existing teams, providing additional capacity or specialized expertise. We adapt to your workflows, tools, and development practices seamlessly.' },
      ]}
      relatedServices={[
        { title: 'AI / ML', desc: 'Integrate AI capabilities into your custom applications.', path: '/services/ai-ml' },
        { title: 'Cloud Engineering', desc: 'Deploy and scale your applications on cloud infrastructure.', path: '/services/cloud-engineering' },
        { title: 'Cybersecurity', desc: 'Secure your applications against modern threats.', path: '/services/cybersecurity' },
      ]}
    />
  );
}
