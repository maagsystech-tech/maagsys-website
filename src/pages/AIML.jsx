import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function AIML() {
  return (
    <ServiceTemplate
      meta={{ title: 'AI / ML Services MAAGSYS', description: 'Custom AI model development, machine learning, predictive analytics, NLP, computer vision, and AI consulting services.' }}
      hero={{
        tag: 'AI / ML',
        title: 'Intelligent Solutions That Transform Your Business',
        subtitle: 'Custom AI/ML solutions to automate processes, improve decision-making, and surface patterns from model development through deployment and optimization.',
        breadcrumb: 'AI / ML',
      }}
      intro={{
        tag: 'Overview',
        title: 'Harness the Power of Artificial Intelligence',
        paragraphs: [
          'Artificial intelligence and machine learning are no longer futuristic concepts they are practical tools that drive competitive advantage today. MAAGSYS helps organizations harness AI/ML to automate repetitive processes, uncover hidden patterns in data, predict outcomes, and make better decisions faster.',
          'Our AI engineers build custom models tailored to your specific business challenges. From natural language processing and computer vision to predictive analytics and recommendation systems, we deliver solutions that integrate seamlessly into your existing workflows and deliver measurable ROI.',
          'We handle the full lifecycle: data preparation, model development, training, validation, deployment, and ongoing optimization ensuring your AI investments continue to deliver value as your business evolves.',
        ],
      }}
      offerings={[
        { title: 'AI Model Development', desc: 'Custom-built AI models designed for your specific business challenges, from classification and regression to generative AI applications.' },
        { title: 'Machine Learning Training', desc: 'Train models on your proprietary data to generate accurate predictions, identify patterns, and surface insights unique to your business.' },
        { title: 'Predictive Analytics', desc: 'Forecast trends, customer behavior, demand patterns, and business outcomes using advanced statistical and machine learning techniques.' },
        { title: 'Natural Language Processing', desc: 'Sentiment analysis, text classification, document summarization, translation, and conversational AI powered by state-of-the-art NLP models.' },
        { title: 'Computer Vision', desc: 'Object detection, image recognition, video analysis, and visual inspection solutions for security, quality control, medical imaging, and more.' },
        { title: 'AI/ML Consulting', desc: 'Strategic assessment of AI opportunities in your business with actionable implementation roadmaps and technology recommendations.' },
        { title: 'Model Deployment & Optimization', desc: 'Production deployment with CI/CD pipelines, monitoring, A/B testing, and continuous tuning for sustained performance and accuracy.' },
        { title: 'Training & Education', desc: 'Upskill your team with hands-on AI/ML training programs covering fundamentals, tools, best practices, and responsible AI principles.' },
      ]}
      benefits={[
        { title: 'Business-Specific Models', desc: 'Custom AI solutions built on your data and designed for your use cases not off-the-shelf tools that require heavy customization.' },
        { title: 'Measurable ROI', desc: 'Every AI initiative includes clear success metrics and KPIs, ensuring your investment delivers quantifiable business value.' },
        { title: 'Production-Ready', desc: 'Models built with deployment in mind from day one, including monitoring, versioning, and automated retraining pipelines.' },
        { title: 'Responsible AI', desc: 'We build with fairness, transparency, and interpretability as core principles, ensuring your AI systems are trustworthy and compliant.' },
      ]}
      faqs={[
        { question: 'Do we need a lot of data to get started with AI/ML?', answer: 'It depends on the use case. Some applications require large datasets, while others can achieve meaningful results with smaller, well-curated data. During our consulting phase, we assess your data readiness and recommend the most viable approach given your current data assets.' },
        { question: 'How long does it take to develop and deploy an AI model?', answer: 'A proof-of-concept typically takes 4-8 weeks. Full production deployment including data preparation, model development, testing, and integration usually takes 3-6 months depending on complexity. We follow an iterative approach so you see value early and often.' },
        { question: 'Can you integrate AI into our existing applications?', answer: 'Absolutely. We deploy models as APIs, microservices, or embedded components that integrate with your existing software, databases, and workflows with minimal disruption to current operations.' },
      ]}
      relatedServices={[
        { title: 'Data Engineering', desc: 'Build the data infrastructure that powers your AI/ML models.', path: '/services/data-engineering' },
        { title: 'Cloud Engineering', desc: 'Deploy and scale AI workloads on cloud infrastructure.', path: '/services/cloud-engineering' },
        { title: 'App Development', desc: 'Integrate AI into custom applications and products.', path: '/services/app-development' },
      ]}
    />
  );
}
