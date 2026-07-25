import React from 'react';
import ServiceTemplate from '../components/ServiceTemplate';

export default function DataEngineering() {
  return (
    <ServiceTemplate
      meta={{
        title: 'Data Engineering Services MAAGSYS',
        description: 'Premier data engineering solutions: pipeline development, data warehousing, ETL, data lake architecture, big data technologies, and consulting.',
      }}
      hero={{
        tag: 'Data Engineering',
        title: 'Empowering Your Data Journey',
        subtitle: 'Premier data engineering solutions to optimize collection, storage, processing, and analysis of both structured and unstructured data batch or real-time.',
        breadcrumb: 'Data Engineering',
      }}
      intro={{
        tag: 'Overview',
        title: 'Transform Raw Data Into Business Intelligence',
        paragraphs: [
          'In today\'s data-driven world, the ability to efficiently collect, process, and analyze data is a competitive advantage. MAAGSYS provides premier data engineering solutions that help organizations build robust data infrastructure capable of handling massive volumes of structured and unstructured data.',
          'Whether you need real-time analytics pipelines, enterprise data warehouses, or comprehensive data governance frameworks, our engineers design and implement solutions that turn raw data into actionable insights enabling faster, smarter business decisions at every level of your organization.',
          'Our team brings deep expertise in modern data stack technologies including Apache Spark, Kafka, Hadoop, dbt, Airflow, and cloud-native data services across AWS, Azure, and GCP.',
        ],
      }}
      offerings={[
        { title: 'Data Pipeline Development', desc: 'Scalable pipelines automating the collection, transformation, and loading of data into warehouses and data lakes with reliability and efficiency.' },
        { title: 'Data Warehousing', desc: 'Build and manage enterprise data warehouses optimized for fast querying and business intelligence, ensuring quick access to critical business data.' },
        { title: 'ETL Processes', desc: 'Design and implement Extract, Transform, and Load workflows that ensure data consistency, accuracy, and availability across your organization.' },
        { title: 'Data Lake Architecture', desc: 'Architect scalable data lake solutions for storing and analyzing massive volumes of structured and unstructured data cost-effectively.' },
        { title: 'Big Data Technologies', desc: 'Leverage Hadoop, Spark, and Kafka for large-scale data processing and real-time analytics that handle the velocity and volume of modern data.' },
        { title: 'Data Governance & Quality', desc: 'Establish policies and frameworks ensuring data accuracy, consistency, security, and regulatory compliance across your entire data ecosystem.' },
        { title: 'Data Integration & APIs', desc: 'Connect disparate systems and data sources through robust APIs and integration layers, creating a unified view of your business data.' },
        { title: 'Visualization & Reporting', desc: 'Build interactive dashboards and reports that make complex data accessible to stakeholders, enabling data-driven decision-making at all levels.' },
        { title: 'Consulting & Strategy', desc: 'Expert assessment of your data landscape with actionable optimization roadmaps aligned to your business objectives and growth trajectory.' },
      ]}
      benefits={[
        { title: 'Scalable Infrastructure', desc: 'Data architectures that grow with your business, handling increasing data volumes without performance degradation.' },
        { title: 'Real-Time Insights', desc: 'Stream processing capabilities that deliver insights in real-time, enabling immediate business responses to emerging trends.' },
        { title: 'Cost Optimization', desc: 'Efficient data storage and processing strategies that minimize infrastructure costs while maximizing analytical capability.' },
        { title: 'Data Quality Assurance', desc: 'Automated validation and monitoring ensuring your data is accurate, complete, and reliable for critical business decisions.' },
        { title: 'Compliance Ready', desc: 'Built-in governance frameworks that keep your data practices aligned with regulatory requirements like GDPR, HIPAA, and SOX.' },
      ]}
      faqs={[
        { question: 'What technologies do you use for data pipelines?', answer: 'We work with Apache Spark, Kafka, Airflow, dbt, and cloud-native services like AWS Glue, Azure Data Factory, and Google Dataflow. The choice depends on your specific requirements, existing infrastructure, and scale needs.' },
        { question: 'Can you work with our existing data infrastructure?', answer: 'Absolutely. We specialize in integrating with and optimizing existing data systems. Whether you need to modernize a legacy data warehouse or add streaming capabilities to batch-oriented pipelines, we design solutions that work with what you have.' },
        { question: 'How do you handle data security and compliance?', answer: 'Security is embedded in every aspect of our data engineering work. We implement encryption at rest and in transit, role-based access controls, audit logging, and compliance frameworks appropriate to your industry (HIPAA, PCI-DSS, SOX, GDPR).' },
      ]}
      relatedServices={[
        { title: 'AI / ML', desc: 'Leverage your data with custom AI models and predictive analytics.', path: '/services/ai-ml' },
        { title: 'Cloud Engineering', desc: 'Optimize your cloud infrastructure for data workloads.', path: '/services/cloud-engineering' },
        { title: 'Cybersecurity', desc: 'Protect your data assets against evolving threats.', path: '/services/cybersecurity' },
      ]}
    />
  );
}
