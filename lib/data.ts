
export const sections = ["Home", "About Us", "Services", "Clients Brands", "Internships", "Projects", "Contact Us"] as const;

export const itDomains = [
  { name: "Web Development" },
  { name: "Mobile App Development" },
  { name: "Data Science & Analytics" },
  { name: "Machine Learning & AI" },
  { name: "Generative AI" },
  { name: "Prompt Engineering" },
  { name: "Cloud Computing" },
  { name: "Cybersecurity" },
  { name: "DevOps" },
  { name: "UI/UX Design" },
  { name: "Database Management" },
  { name: "Blockchain" },
];

export const nonItDomains = [
  { name: "Digital Marketing" },
  { name: "Content Writing & Copywriting" },
  { name: "Graphic Design" },
  { name: "Human Resources (HR)" },
  { name: "Business Development & Sales" },
  { name: "Finance & Accounting" },
  { name: "Operations Management" },
  { name: "Market Research & Analytics" },
  { name: "Public Relations (PR)" },
  { name: "Video Editing & Production" },
];

export const services = [
  {
    icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Web Design & Development",
    desc: "Fast, functional, and visually dynamic websites built for scalability and performance.",
  },
  {
    icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    title: "Branding & Visual Identity",
    desc: "Build recognition through storytelling and visual systems.",
  },
  {
    icon: "M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z",
    title: "UI/UX Design",
    desc: "Smooth, intuitive user experiences that feel effortless.",
  },
  {
    icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z",
    title: "E-Commerce Solutions",
    desc: "Secure platforms with smart integrations.",
  },
  {
    icon: "M11 3.055A9.001 9.001 0 110 0v13a9.001 9.001 0 0111-9.945z",
    title: "Digital Marketing",
    desc: "SEO, social media, and performance tracking.",
  },
  {
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Digital Strategy & SEO",
    desc: "Data-driven optimization for reach and ranking.",
  },
  {
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37.996.608 2.296.07 2.572-1.065z",
    title: "Maintenance & Support",
    desc: "Keep your website fast, secure, and updated.",
  },
];

export const clientBrands = [
  "TechCorp",
  "Design Co",
  "Start Up",
  "Digital Pro",
  "Cloud Nine",
  "Code Labs",
  "Web Studio",
  "Brand X",
];

export const conferencePillars = [
  {
    title: "Cutting-Edge AI & ML",
    desc: "Master AI algorithms, neural networks, and machine learning models.",
  },
  {
    title: "Data Intelligence & Security",
    desc: "Leverage predictive analytics and implement robust cybersecurity measures.",
  },
  {
    title: "Cloud & IoT Solutions",
    desc: "Explore scalable cloud architectures and secure IoT applications.",
  },
];

export const conferenceStats = [
  { label: "Expert Speakers", val: "5+" },
  { label: "Days of Learning", val: "2" },
  { label: "Expected Attendees", val: "120+" },
  { label: "Deep-Dive Workshops", val: "7+" },
];

export const internshipHighlights = [
  {
    text: "Official Offer Letter and Completion Certificate",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  },
  {
    text: "Work-from-home based internship",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  },
  {
    text: "Real-time industry projects",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  },
  {
    text: "Flexible work schedule and task submission",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  },
  {
    text: "Placement guidance and interview preparation",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  },
  {
    text: "Resume building support",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  },
  {
    text: "Certificate and LOR hard copies couriered (post-completion)",
    icon: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
  }
];

export const internshipDurations = ["4 Weeks", "6 Weeks", "8 Weeks", "12 Weeks", "6 Months"];

export const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/projxty",
    icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/projxty",
    icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.275-.045-1.65-.06-4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/projxty",
    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

// Project domains for filtering
export const projectDomains = [
  "All Projects",
  "AI/ML & Data Science",
  "Web Development",
  "Mobile Apps",
  "Healthcare & Biotech",
  "Blockchain & Web3",
  "Business Intelligence"
] as const;

export type ProjectDomain = typeof projectDomains[number];

// Comprehensive project database organized by domain - 50 Real Student Projects with Corrected Video Links
export const projects: Array<{
  title: string;
  description: string;
  videoLink: string;
  domain: Exclude<ProjectDomain, "All Projects">;
  highlights?: string[];
}> = [
  // Web Development (9 projects)
  {
    domain: "Web Development",
    title: "Bank Management System",
    description: "Complete banking system with account creation, transactions, and admin monitoring.",
    videoLink: "https://youtu.be/dVh6_vj6jAU",
    highlights: ["Full-Stack", "Banking", "Admin Panel"]
  },
  {
    domain: "Web Development",
    title: "Hybrid AI Product Recommendation",
    description: "Detects fake reviews and ranks products using DeBERTa semantic analysis.",
    videoLink: "https://youtu.be/YTaXpoQ2aQE",
    highlights: ["NLP", "DeBERTa", "Recommendation"]
  },
  {
    domain: "Web Development",
    title: "Django E-Learning LMS",
    description: "Full-stack learning platform with Razorpay integration for course monetization.",
    videoLink: "https://youtu.be/JCLaC_NkQ1I",
    highlights: ["Django", "Razorpay", "E-Learning"]
  },
  {
    domain: "Web Development",
    title: "Secure Online Voting System",
    description: "Django-based platform with email authentication and real-time results.",
    videoLink: "https://youtu.be/4MPItu9p9ag",
    highlights: ["Django", "Authentication", "Real-time"]
  },
  {
    domain: "Web Development",
    title: "College AI Assistant (Gemini AI)",
    description: "NLP chatbot answering student queries about admissions and timetables.",
    videoLink: "https://youtu.be/WXMJHRpdb78",
    highlights: ["Gemini AI", "Chatbot", "NLP"]
  },
  {
    domain: "Web Development",
    title: "AI Plagiarism Detection System",
    description: "Uses Cosine Similarity to detect similarity in academic research papers.",
    videoLink: "https://youtu.be/FFJ-U-sb9Uo",
    highlights: ["Cosine Similarity", "Academic Tools"]
  },
  {
    domain: "Web Development",
    title: "College Placement Prediction",
    description: "Flask app using Decision Trees to predict student placement outcomes.",
    videoLink: "https://youtu.be/r_Lg2dNKbwc",
    highlights: ["Flask", "Decision Trees"]
  },
  {
    domain: "Web Development",
    title: "MERN Stack E-commerce Website",
    description: "Full-stack D2C solution for a shoe brand using React and Node.js.",
    videoLink: "https://youtu.be/1PT-lDEBBxY",
    highlights: ["MERN", "E-commerce", "Full-Stack"]
  },
  {
    domain: "Web Development",
    title: "Projxty Intro & Solutions",
    description: "Overview of the ultimate platform for engineering and CS capstone projects.",
    videoLink: "https://youtu.be/mF_C-qE_H9A",
    highlights: ["Platform", "Overview", "Solutions"]
  },

  // AI/ML & Data Science (15 projects)
  {
    domain: "AI/ML & Data Science",
    title: "AI Interior Design Generator",
    description: "Transforms room photos into photorealistic interior renders using Stable Diffusion.",
    videoLink: "https://youtu.be/TtD6qReAA_g",
    highlights: ["Stable Diffusion", "Computer Vision", "Deep Learning"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "SMB AI Command Center",
    description: "Integrates demand forecasting, churn prediction, and inventory management.",
    videoLink: "https://youtu.be/jALHepMTjDg",
    highlights: ["Predictive Analytics", "Business Intelligence"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "ReviewGuard AI - Fake Review Detection",
    description: "ML-powered fraud detection (99.6% accuracy) using Random Forest and XGBoost.",
    videoLink: "https://youtu.be/oMij9E01xkI",
    highlights: ["XGBoost", "99.6% Accuracy", "Random Forest"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "CommentSense AI - Sentiment Analyzer",
    description: "NLP app using LSTM to classify YouTube comments (Positive/Negative/Neutral).",
    videoLink: "https://youtu.be/3kpMhg4Ps-c",
    highlights: ["LSTM", "Text Classification", "NLP"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "GoldVision AI - Gold Price Prediction",
    description: "Uses 11 ML models to forecast gold prices with a 99.99% accuracy rate.",
    videoLink: "https://youtu.be/HYNy5k5C6yI",
    highlights: ["Time Series", "11 ML Models", "99.99% Accuracy"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "TsunamiGuard AI - Warning System",
    description: "Analyzes magnitude and location for tsunami risk using Gradient Boosting.",
    videoLink: "https://youtu.be/XOGU6aEsQ5Y",
    highlights: ["Gradient Boosting", "Risk Prediction"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "HireSmart AI - Resume Screening",
    description: "NLP system that extracts skills and ranks candidates using TF-IDF and spaCy.",
    videoLink: "https://youtu.be/biVJ_ALA65Q",
    highlights: ["TF-IDF", "spaCy", "Recruitment AI"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "Smart Recruitment Automation",
    description: "Uses 8 ML models to predict best-fit job roles with up to 99%+ accuracy.",
    videoLink: "https://youtu.be/55_u6w-jL8o",
    highlights: ["8 ML Models", "Job Prediction", "99%+ Accuracy"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "Fake News Detection System",
    description: "ML system utilizing TF-IDF and Random Forest on 44,000+ articles.",
    videoLink: "https://youtu.be/LK0kU30k2G0",
    highlights: ["TF-IDF", "Content Verification"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "India Air Quality Prediction",
    description: "Forecasts PM2.5 levels for Indian cities using Random Forest.",
    videoLink: "https://youtu.be/64UYYVvu9DM",
    highlights: ["Environmental ML", "Random Forest"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "Advanced AI Salary Prediction",
    description: "Predicts industry salaries with 97.47% accuracy using data science.",
    videoLink: "https://youtu.be/QZXECbG9210",
    highlights: ["Regression", "97.47% Accuracy"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "Tata Motors Stock Price Forecasting",
    description: "Uses 5 ML algorithms to analyze trends and predict future stock prices.",
    videoLink: "https://youtu.be/_HLoCNJi5gg",
    highlights: ["Stock Prediction", "Time Series Analysis"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "House Price Prediction AI",
    description: "Regression-based app for predicting real estate prices with Flask.",
    videoLink: "https://youtu.be/f1uAMl-VgrQ",
    highlights: ["Regression", "Flask", "Real Estate"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "AI-Based News Aggregator",
    description: "NLP-powered system for real-time news categorization and filtering.",
    videoLink: "https://youtu.be/LK0kU30k2G0",
    highlights: ["NLP", "Content Curation"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "Crime Data Visualization",
    description: "Analytics tool for Indian cities using heatmaps and predictive ML.",
    videoLink: "https://youtu.be/9fCQQzH-ozM",
    highlights: ["Data Visualization", "Heatmaps"]
  },
  {
    domain: "AI/ML & Data Science",
    title: "Flight Fare Prediction System",
    description: "Predicts ticket prices based on routes and airlines using Random Forest.",
    videoLink: "https://youtu.be/bFIDIhSZ080",
    highlights: ["Random Forest", "Price Prediction"]
  },

  // Healthcare & Biotech (13 projects)
  {
    domain: "Healthcare & Biotech",
    title: "Early Rheumatoid Arthritis Detection",
    description: "Healthcare AI using 45,000 records to predict risk with 99.5%+ accuracy.",
    videoLink: "https://youtu.be/8KEYclyr5cY",
    highlights: ["Medical AI", "99.5%+ Accuracy", "45K Records"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "DermaGuard AI - Skin Cancer Detection",
    description: "CNN-based diagnostic system detecting 24 skin diseases from images.",
    videoLink: "https://youtu.be/RLyWzumBp_U",
    highlights: ["CNN", "Medical Imaging", "24 Diseases"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "NetGuardX AI - Intrusion Detection",
    description: "Cybersecurity project classifying network attacks with 99.89% accuracy.",
    videoLink: "https://youtu.be/uCq3B19kGLI",
    highlights: ["Cybersecurity", "99.89% Accuracy"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "AirSafe Navigator - Route Optimizer",
    description: "Calculates travel routes based on real-time pollution levels and air quality.",
    videoLink: "https://youtu.be/PkGjydu2anY",
    highlights: ["Environmental", "Route Optimization"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "NutriMedSafe: Drug-Food Checker",
    description: "Analyzes interactions for 1000+ medicines using the DrugBank 6.0 database.",
    videoLink: "https://youtu.be/IN7AFemZ6as",
    highlights: ["Healthcare", "Drug Database", "1000+ Medicines"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "Emergency Response Management",
    description: "Integrates YOLOv8 and GPS tracking for real-time emergency coordination.",
    videoLink: "https://youtu.be/5pDz5F1JRZ0",
    highlights: ["YOLOv8", "GPS Tracking", "Real-time"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "Brain Tumor Detection System",
    description: "Deep learning project using VGG16/ResNet50 for MRI scan analysis.",
    videoLink: "https://youtu.be/s2Li7WiEfbk",
    highlights: ["VGG16", "ResNet50", "Medical Imaging"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "CardioPredict AI - Heart Disease",
    description: "Analyzes 16 medical parameters for cardiovascular risk assessment.",
    videoLink: "https://youtu.be/vXYr0I61WsM",
    highlights: ["Medical AI", "Cardiology", "Risk Assessment"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "AI Diabetes Risk Prediction",
    description: "Flask app trained on 100K+ records for real-time risk analysis.",
    videoLink: "https://youtu.be/TNdOGKYqaLY",
    highlights: ["Flask", "100K+ Records", "Medical"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "AI Lung Cancer Prediction",
    description: "Compares 7 ML algorithms (XGBoost, SVM, etc.) for clinical diagnosis.",
    videoLink: "https://youtu.be/Ewk8ZM84m4k",
    highlights: ["7 ML Models", "Cancer Detection", "XGBoost"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "Health Risk Detection System",
    description: "Predicts patient risk by analyzing vital parameters like heart rate and BP.",
    videoLink: "https://youtu.be/2jLmxyl1zJg",
    highlights: ["Healthcare", "Vital Monitoring"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "Smart Agriculture AI Prediction",
    description: "Optimizes irrigation and detects crop diseases using sensor data.",
    videoLink: "https://youtu.be/YyRg56ZHJK4",
    highlights: ["Agriculture", "Crop Disease Detection"]
  },
  {
    domain: "Healthcare & Biotech",
    title: "Advanced EEG Epilepsy Detection",
    description: "Hybrid Quantum-Classical AI for medical signal analysis.",
    videoLink: "https://youtu.be/6lba_t6Hx-E",
    highlights: ["Quantum AI", "Medical Signal Processing"]
  },

  // Mobile Apps (7 projects)
  {
    domain: "Mobile Apps",
    title: "Internship & Job Tracker App",
    description: "Flutter mobile app for organizing applications with SQLite and PDF export.",
    videoLink: "https://youtu.be/bGAH2evlXdE",
    highlights: ["Flutter", "SQLite", "PDF Generation"]
  },
  {
    domain: "Mobile Apps",
    title: "Campus Food Ordering System",
    description: "Flutter app with Razorpay integration and real-time order tracking.",
    videoLink: "https://youtu.be/zQN_Lr8fqik",
    highlights: ["Flutter", "Razorpay", "Real-time"]
  },
  {
    domain: "Mobile Apps",
    title: "Smart Recipe Keeper",
    description: "Local database recipe management app built with Flutter and Hive.",
    videoLink: "https://youtu.be/VisWwu0mdQs",
    highlights: ["Flutter", "Hive", "Local Database"]
  },
  {
    domain: "Mobile Apps",
    title: "Flutter Pocket Money Tracker",
    description: "Finance app with animated summaries and savings goals.",
    videoLink: "https://youtu.be/DOm5mSVYmqU",
    highlights: ["Flutter", "Finance", "Analytics"]
  },
  {
    domain: "Mobile Apps",
    title: "Home Services Project",
    description: "Platform for booking home maintenance and professional repair services.",
    videoLink: "https://youtu.be/6w3F473ZBXU",
    highlights: ["Booking System", "Service Marketplace"]
  },
  {
    domain: "Mobile Apps",
    title: "AI Vehicle Speed Detection",
    description: "Real-time traffic monitoring and license plate recognition system.",
    videoLink: "https://youtu.be/WR1XwiUVjxc",
    highlights: ["Computer Vision", "Real-time", "Traffic"]
  },
  {
    domain: "Mobile Apps",
    title: "E-commerce Churn Prediction",
    description: "XGBoost-based web app predicting real-time customer retention risks.",
    videoLink: "https://youtu.be/jALHepMTjDg",
    highlights: ["XGBoost", "Customer Analytics"]
  },

  // Blockchain & Web3 (5 projects)
  {
    domain: "Blockchain & Web3",
    title: "Blockchain Analytics Framework",
    description: "Flask-based middleware for verifying Ethereum transactions and recipient identity.",
    videoLink: "https://youtu.be/UNUlxghvuuE",
    highlights: ["Ethereum", "Smart Contracts", "Transaction Verification"]
  },
  {
    domain: "Blockchain & Web3",
    title: "AI-Powered UPI Fraud Shield",
    description: "Real-time fraud detection for UPI transactions with 99%+ accuracy.",
    videoLink: "https://youtu.be/pEVuOjBPcHg",
    highlights: ["Payment Security", "99%+ Accuracy", "Real-time"]
  },
  {
    domain: "Blockchain & Web3",
    title: "Fake Document & Image Detection",
    description: "CNN-based system to identify forged documents and AI-generated images.",
    videoLink: "https://youtu.be/xfyNj9TA64g",
    highlights: ["CNN", "Authenticity", "Forgery Detection"]
  },
  {
    domain: "Blockchain & Web3",
    title: "KeyDefender AI - Keylogger Detection",
    description: "Detects spyware in real-time through behavioral analysis and system monitoring.",
    videoLink: "https://youtu.be/5anYQs5bASg",
    highlights: ["Security", "Threat Detection", "Real-time"]
  },
  {
    domain: "Blockchain & Web3",
    title: "AI Signature Verification",
    description: "CNN-based model for live webcam signature authentication.",
    videoLink: "https://youtu.be/biVJ_ALA65Q",
    highlights: ["CNN", "Biometric", "Authentication"]
  },
];
