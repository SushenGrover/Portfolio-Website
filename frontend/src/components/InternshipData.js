// src/components/InternshipData.js

export const internships = [
  {
    id: 1,
    role: "Software Development Intern",
    company: "BluMotiv",
    // Place your logo image in: frontend/public/internship_images/blumotiv_logo.png
    companyLogo: "/internship_images/blumotiv_logo.jpg",
    location: "Remote",
    startDate: "Jan 2026",
    endDate: "Present",
    description:
      "Currently working on the development of fleet management software for electrified industrial vehicles. My core responsibilities include benchmarking AI-based methodologies and integrating AI/ML models with Virtual Twin data. I am actively involved in creating pipelines for data ingestion to enable predictive controls, ensuring seamless synchronization between the software logic and vehicle simulation models.",
    skills: [
      "Software Development",
      "AI/ML",
      "Fleet Management",
      "Python",
      "FastAPI",
      "Kafka",
      "SQL",
      "React",
    ],
    // Internship is ongoing, so certificate is null
    certificate: null,
  },
  {
    id: 2,
    role: "Data Analytics Intern",
    company: "Vodafone Idea Foundation",
    // Place your logo image in: frontend/public/internship_images/vi_logo.png
    companyLogo: "/internship_images/vois_logo.png",
    location: "Remote",
    startDate: "Sep 2025",
    endDate: "Oct 2025",
    description:
      "Completed a specialized virtual internship focused on 'Conversational Data Analysis with LLMs' led by the Edunet Foundation. I utilized Python libraries like Pandas, NumPy, and Seaborn to perform end-to-end data analytics. Key achievements included analyzing genre trends in Netflix content and identifying pricing drivers for Airbnb bookings, transforming raw data into actionable insights.",
    skills: ["Python", "Pandas", "LLMs", "Data Visualization", "Seaborn"],
    // Place your certificate image in: frontend/public/internship_images/vi_certificate.png
    certificate: "/internship_images/vois_certificate.jpg",
  },
];
