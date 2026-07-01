export interface Publication {
  id: string;
  year: number;
  authors: string;
  title: string;
  venue: string;
  type: 'Journal' | 'Conference' | 'Book' | 'Book Chapter' | 'Preprint';
  citations: number;
  doi?: string;
  link?: string;
  abstract?: string;
  studentCollaborator: boolean;
  topic: 'AI' | 'Telecommunications' | 'Smart Agriculture' | 'Renewable Energy' | 'Computer Vision' | 'IoT' | 'EMC' | 'Robotics' | 'Societal Impact';
}

export interface CareerMilestone {
  year: string;
  milestone: string;
  details: string;
  category: 'academic' | 'award' | 'industry' | 'international';
  color: string; // 'blue' | 'gold' | 'green' | 'purple'
}

export interface Laboratory {
  name: string;
  focus: string;
  institution: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  whatItIs: string;
  keyFeaturesOrActivities: string[];
  scaleOrFunding?: string;
  partnerOrFunder?: string;
  status: 'Active' | 'Completed' | 'Seeking Investment';
  impact?: string;
  duration?: string;
  ref?: string;
  category: string;
}

export interface Partner {
  name: string;
  type: 'Government' | 'SETA' | 'Research Funder' | 'Innovation Funder' | 'Energy' | 'Quality Assurance' | 'Aviation Regulator' | 'Technology';
  engagement: string;
  logoInitial: string;
  logoUrl?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  challenge: string;
  solution: string;
  scale?: string;
  impact: string;
}

export interface ConsultingArea {
  service: string;
  forWho: string;
  deliverable: string;
  duration: string;
  details: string;
}

export interface KeynoteTopic {
  id: string;
  category: string;
  title: string;
  topic: string;
  audience: string;
  duration: string;
  abstract: string;
  description: string;
}

export interface SpeakingEngagement {
  year: number;
  event: string;
  role: string;
  location: string;
  lat: number;
  lng: number;
}

export interface SupervisedStudent {
  name: string;
  institution: string;
  thesisFocus: string;
  year: string;
  type: 'Doctoral' | 'Postdoctoral' | 'Masters';
}

export interface Award {
  award: string;
  awardingBody: string;
  years: string;
  significance: string;
  icon: string;
}

export interface CollaborationPin {
  city: string;
  country: string;
  institution: string;
  collaborators: string;
  lat: number;
  lng: number;
  type: 'Research' | 'Conference';
}

export interface DownloadableResource {
  id: string;
  title: string;
  description: string;
  format: string;
  pages: number;
  audience: string;
  badge?: string;
}

export const BIOGRAPHY_SUMMARY = `Prof. Pius Adewale Owolawi is a globally recognised authority in artificial intelligence, digital transformation, engineering education, and 4IR innovation — a thinker, builder, and leader whose work has reshaped how Africa trains its engineers, deploys its technology, and positions itself on the world stage. Born in Nigeria and educated across three continents, Prof. Owolawi earned his PhD in Electronic Engineering from the University of KwaZulu-Natal (South Africa) in 2010, before embarking on a career that would take him from the Central Bank of Nigeria to the forefront of South Africa's most ambitious research and skills development agenda. Today, he holds positions as Assistant Dean for Industry Liaison, Special Projects and Work-Integrated Learning at Tshwane University of Technology — and as MICTSETA Research Chair in 4IR Skills Development — while simultaneously leading Africa's National AI Institute research initiatives in smart agriculture, medical AI, and financial intelligence.`;

export const FULL_BIOGRAPHY = [
  {
    title: "Early Life and the Engineering Calling",
    text: "Prof. Pius Adewale Owolawi was born and raised in Nigeria, where an early fascination with electronics, radio systems, and how things worked set him on an irreversible path toward engineering. He completed his Bachelor of Technology (Honours) in Applied Physics and Electronics at the Federal University of Technology, Akure (FUTA), Nigeria — one of West Africa's premier technical institutions — graduating with a foundation in instrumentation, embedded systems, and electronic circuit design that would underpin three decades of consequential research. From the outset, Prof. Owolawi was drawn not just to understanding technology but to building it for people. While others in his cohort pursued industry roles, he began asking deeper questions: How do radio signals behave in tropical climates? How do we connect rural African communities to the digital economy? How do we train the next generation of engineers who will answer these questions themselves? These questions launched a career that has never stopped asking bigger ones."
  },
  {
    title: "The South African Chapter: Research Leadership Forged at UKZN",
    text: "In 2004, Prof. Owolawi joined the University of KwaZulu-Natal (UKZN) in Durban, South Africa — one of the continent's leading research universities — to pursue his Master of Science in Electronic Engineering. His thesis work on telecommunications systems and RF propagation modelling placed him at the frontier of a field critical to Africa's connectivity ambitions. He completed his PhD in Electronic Engineering in 2010, producing seminal research in rain attenuation modelling and millimetre-wave propagation that has since been cited hundreds of times globally. His PhD work contributed directly to ITU-R standardisation discussions and to the design frameworks used by South African telecommunications engineers deploying satellite and microwave systems across the continent. At UKZN, he was recognised as Best Engineering Mentor in 2006 and 2007 — a foreshadowing of what would become one of the most distinctive features of his career: an extraordinary capacity to identify, develop, and propel the next generation of African researchers."
  },
  {
    title: "Building Institutions: From MUT to TUT",
    text: "Prof. Owolawi joined Mangosuthu University of Technology (MUT) in Durban in 2012 as Faculty Research Chair in Engineering — a role that demanded not just personal scholarly output, but the strategic building of an entire faculty's research culture. He rose to become Acting/Head of Department of Electrical Engineering. At MUT, he established the first EMC/EMI Laboratory (a R5 million facility), founded the Radio Access Network and Rural Communication (RAN-RC) Research Group, secured over R7 million in infrastructure and training equipment, and initiated partnerships with ESKOM, Transnet, and the South African Navy. In 2017, he moved to Tshwane University of Technology (TUT) in Pretoria — South Africa's largest residential university — as Head of Department of Computer Systems Engineering. Over eight years, he transformed the department: establishing the 4IR Innovation Lab, Drone Technology Laboratory, Emerging Technologies Laboratory, and three additional engineering innovation spaces; securing and managing over R46 million in funding; contributing over 75% of the department's annual research outputs; and leading ECSA re-accreditation processes for multiple engineering qualifications. In February 2025, Prof. Owolawi was appointed Assistant Dean for Industry Liaison, Special Projects, and Work-Integrated Learning at TUT's Faculty of Information and Communication Technology — a faculty-level strategic leadership role encompassing academic-industry partnerships, national skills programmes, and innovation ecosystems."
  },
  {
    title: "The Research Journey: 200 Publications and a Global Footprint",
    text: "Prof. Owolawi's research portfolio spans eight distinct technical domains, bridging fundamental engineering science with applied AI innovation. His foundational work in rain attenuation modelling and FSO communications has been cited in ITU-R standards and South African regulatory frameworks. Since 2016, he has pivoted with remarkable agility into AI — publishing work on computer vision (YOLO-based object detection, semantic segmentation), medical imaging (retinal vessel segmentation, glaucoma detection, melanoma classification), NLP for African languages (Setswana, Sesotho sa Leboa), brain-computer interfaces, and financial AI (bankruptcy prediction, stock market forecasting using LSTM-CNN hybrids). His Google Scholar h-index sits in the high 20s, with citations from researchers in the United States, Europe, Asia, Australia, and across Africa. His work has been cited in ITU standards documents, national engineering regulatory frameworks, and agricultural innovation policy papers."
  }
];

export const LABORATORIES: Laboratory[] = [
  { name: "4IR Innovation Lab", focus: "AI, ML, IoT, Robotics, Smart Systems", institution: "TUT", year: "2021–2022" },
  { name: "Drone Technology Lab", focus: "UAV, Aerial Imaging, Smart Agriculture", institution: "TUT", year: "2021–2022" },
  { name: "Emerging Technologies Lab", focus: "Computer Vision, AR/VR, AI, Data Science", institution: "TUT", year: "2018" },
  { name: "Engineering Innovation Labs (×3)", focus: "Teaching & Research in Core Engineering", institution: "TUT", year: "2018" },
  { name: "EMC/EMI Laboratory", focus: "Signal Integrity, Electromagnetic Testing", institution: "MUT", year: "2016+" },
  { name: "Renewable Energy Lab", focus: "Solar, Hybrid Systems, Power Electronics", institution: "MUT", year: "2016" },
  { name: "Radio Propagation Lab", focus: "5G, FSO, mmWave, Satellite, RF", institution: "MUT", year: "2015" },
  { name: "Mechatronics Laboratory", focus: "Robotics, Actuation, Intelligent Control", institution: "MUT", year: "2016" }
];

export const CAREER_TIMELINE: CareerMilestone[] = [
  { year: "2001", milestone: "B.Tech (Hons) Graduate", details: "Graduated in Applied Physics/Electronics from FUTA Nigeria, launching a lifelong engineering career.", category: "academic", color: "blue" },
  { year: "2001–2003", milestone: "Resident Network Engineer", details: "Designed and maintained mission-critical network infrastructure for Central Bank of Nigeria.", category: "industry", color: "green" },
  { year: "2004", milestone: "MSc Programme Begins", details: "Enrolled at UKZN Durban, South Africa, establishing a decades-long research focus in telecommunications.", category: "academic", color: "blue" },
  { year: "2006", milestone: "MSc Completed & Best Engineering Mentor", details: "Awarded MSc in Electronic Engineering; first recognition for student mentorship at UKZN.", category: "academic", color: "blue" },
  { year: "2007", milestone: "First International Publication", details: "Published 'Rainfall Rate and Worst-Month Determination' at IEEE AFRICON, establishing his international research voice.", category: "academic", color: "blue" },
  { year: "2010", milestone: "PhD Completed", details: "Succeeded in completing PhD on rain attenuation at UKZN; earned CFOT & CFOS/D certifications.", category: "academic", color: "blue" },
  { year: "2011", milestone: "First Book Published", details: "Published 'Rain at SHF and EHF for Radio Links in South Africa' with LAP LAMBERT (ISBN: 978-3846596548).", category: "academic", color: "blue" },
  { year: "2012", milestone: "Faculty Research Chair & Award", details: "Appointed Faculty Research Chair at MUT; received MUT's Most Outstanding Researcher Award.", category: "award", color: "gold" },
  { year: "2013", milestone: "BIARI Fellow & Best Paper", details: "Awarded BIARI Fellowship at Brown University, USA; claimed Best Paper Award in Taipei.", category: "international", color: "purple" },
  { year: "2015", milestone: "Top 500 African Researcher & VC Award", details: "Named among Africa's Top 500 most impactful researchers; received the Vice-Chancellor's Teaching Excellence Award at TUT.", category: "award", color: "gold" },
  { year: "2016", milestone: "Acting HoD & West Wood Founding", details: "Led department at MUT; pivoted entrepreneurially to establish West Wood Industrial Technology.", category: "industry", color: "green" },
  { year: "2017", milestone: "Head of Department, TUT", details: "Appointed HoD of Computer Systems Engineering at TUT, South Africa's largest technical university.", category: "academic", color: "blue" },
  { year: "2018", milestone: "Senior Researcher of the Year", details: "Received TUT's highest research honour; launched LLB degree at UNISA to merge tech and law.", category: "award", color: "gold" },
  { year: "2019–2020", milestone: "AI & ML Certification", details: "Completed advanced research upskilling and certification in AI/ML from UT Austin.", category: "academic", color: "blue" },
  { year: "2020–2021", milestone: "Senior Researcher of the Year (2nd) & Top African Researcher", details: "Sustained continental recognition with a second Senior Researcher of the Year award.", category: "award", color: "gold" },
  { year: "2022", milestone: "MICTSETA Research Chair", details: "Awarded multimillion-rand National Research Chair in 4IR Skills Development, building platforms for LMS and e-learning.", category: "academic", color: "blue" },
  { year: "2023", milestone: "Research Lead, National AI Institute (NAII)", details: "Selected as Principal Investigator for Smart Agriculture and Medical AI under NAII.", category: "academic", color: "blue" },
  { year: "2024", milestone: "Cybersecurity Cert (UT Austin) & Drone Funding", details: "Obtained UT Austin Cybersecurity certification; secured AgreSETA R12.43M Drone training funding.", category: "industry", color: "green" },
  { year: "2025", milestone: "Assistant Dean, FICT, TUT", details: "Promoted to Assistant Dean for Industry Liaison, Special Projects & WIL; secured SACAA commercial Drone Pilot License.", category: "academic", color: "blue" }
];

export const PROJECTS: Project[] = [
  {
    id: "cxi-africa",
    title: "CXI Africa",
    subtitle: "Centre for Digital Transformation and Innovation Africa",
    description: "An elite strategic innovation hub bridging advanced digital strategy with continent-wide economic and capacity building.",
    whatItIs: "Strategic innovation and consulting hub focused on digital transformation, AI strategy, skills development, and technology-driven economic growth across Africa.",
    keyFeaturesOrActivities: [
      "Digital transformation strategy consulting",
      "Proposal development for international funders (UNICEF, USAID, NSF, World Bank)",
      "AI/Data Science training delivery across multiple sectors",
      "Public-private partnership brokerage and technology commercialisation"
    ],
    scaleOrFunding: "Active proposals and programs exceeding R50 Million in value; projects with AgriSETA, CHIETA, GIZ, and more.",
    status: "Active",
    category: "Consulting & Strategy"
  },
  {
    id: "studyflix",
    title: "StudyFlix",
    subtitle: "AI-Powered Video Learning Platform",
    description: "An interactive, adaptive edtech platform custom-built to tackle the STEM talent shortage across Sub-Saharan Africa.",
    whatItIs: "AI-enhanced video-based learning platform for South African and African students — tackling STEM subjects, engineering foundation course-ware, and digital skills.",
    keyFeaturesOrActivities: [
      "AI-curated adaptive learning pathways with custom transcripts",
      "Interactive assessments and real-time dashboard analytics",
      "Integrated Live Maths Competition platform",
      "Math Brothers comic series optimized for mobile data efficiency",
      "Seamless integration with major LMS systems (Moodle-compatible)"
    ],
    scaleOrFunding: "Seeking Series A investment / institutional partnerships. Target market of 15M+ learners.",
    status: "Seeking Investment",
    category: "Education Technology"
  },
  {
    id: "west-wood",
    title: "West Wood Industrial Technology",
    subtitle: "Multinational Engineering Systems Firm",
    description: "A leading-edge deeptech firm delivering IoT, industrial automation, and power systems engineering.",
    whatItIs: "Multinational engineering and technology firm active across Nigeria, South South Africa, and Canada.",
    keyFeaturesOrActivities: [
      "Industrial automation system design and machinery engineering",
      "Oil and gas technology solutions and instrumentation",
      "Smart agriculture systems and specialized telemetry products",
      "System integration for smart urban infrastructure and power microgrids"
    ],
    duration: "Founded in 2016",
    status: "Active",
    category: "Industrial Engineering"
  },
  {
    id: "national-ai-institute",
    title: "National AI Institute (NAII)",
    subtitle: "Smart Agriculture & Medical AI Research Lead",
    description: "The official national program pioneering applied AI for South African food security and healthcare diagnostics.",
    whatItIs: "Principal Investigator and Research lead role for AI in Agriculture and Medical AI under South Africa's National AI Institute.",
    keyFeaturesOrActivities: [
      "YOLO crop disease and weed detection frameworks",
      "Smart precision micro-irrigation systems combining IoT and ML",
      "Drone-based hyperspectral imaging for early crop yield predictions",
      "Medical diagnostics: retinal vessel segmentation, glaucoma detection, Covid-19 scan classification",
      "Financial AI: credit scoring and bankruptcy forecasts"
    ],
    status: "Active",
    category: "AI Research"
  },
  {
    id: "mictseta-chair",
    title: "MICTSETA 4IR Research Chair",
    subtitle: "Digital Skills Platform & LMS Initiative",
    description: "Government-supported research chair linking academic excellence directly with national skills development policy.",
    whatItIs: "A government-funded national research chair at TUT to design, analyze, and deploy 4IR curriculum and digital training portals.",
    keyFeaturesOrActivities: [
      "Established multimillion-rand national LMS Platform (R1,980,000 value)",
      "Created the AI-powered Career Hub App (R1,980,000 value)",
      "Developed the E-Learning App and capacity training projects (R1,980,000 value)",
      "Funded postgraduate support and bursaries for over 30 active student researchers"
    ],
    scaleOrFunding: "R10,647,965.76 in Total Chair Funding",
    status: "Active",
    category: "Workforce Development"
  },
  {
    id: "agriseta-drone",
    title: "AgriSETA Drone Training Programme",
    subtitle: "National Precision Agriculture Initiative",
    description: "The largest drone-piloting skills program in South African agricultural history, training 100 SACAA-licensed operators.",
    whatItIs: "Fully-funded agricultural drone training and certification program aligning local farmers with modern agritech capabilities.",
    keyFeaturesOrActivities: [
      "Commercial SACAA Remote Pilot License (RPL) certification",
      "Aerial imaging, multispectral vegetation mapping, and soil profiling training",
      "Chemical spraying and automated route-planning skills",
      "Precision agritech software analytics integration"
    ],
    scaleOrFunding: "R12,430,000 in Competitive Funding",
    duration: "April 2025 – June 2026",
    ref: "Project Ref: PS25TUT11",
    status: "Active",
    category: "Smart Agriculture"
  }
];

export const PARTNERS: Partner[] = [
  { name: "NVIDIA", type: "Technology", engagement: "GPU & computing infrastructure partnership for smart systems", logoInitial: "N", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/21/Nvidia_logo.svg" },
  { name: "Microsoft", type: "Technology", engagement: "Cloud credits and AI software integrations for research teams", logoInitial: "M", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png" },
  { name: "AWS", type: "Technology", engagement: "Server credits and big-data training pipelines for student cohorts", logoInitial: "A", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Cisco", type: "Technology", engagement: "Networking hardware sponsorship and cybersecurity curricula labs", logoInitial: "C", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg" },
  { name: "Google", type: "Technology", engagement: "Gemini API research models, maps grounding, and developer credits", logoInitial: "G", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Oracle", type: "Technology", engagement: "Enterprise database frameworks and student scholarship tracks", logoInitial: "O", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" },
  { name: "MICTSETA", type: "SETA", engagement: "R26.4M Work-Integrated Learning + R10.6M Research Chair", logoInitial: "MI", logoUrl: "https://cyberfox.co.za/wp-content/uploads/2021/01/MICT-SETA-logo.jpg" },
  { name: "BANKSETA", type: "SETA", engagement: "R29.06M Work-Integrated learning placements for 532 graduates", logoInitial: "B", logoUrl: "https://play-lh.googleusercontent.com/EHliwULR7Iz3SDBxq2rS0_dn92frlRR5BHcpdXChNhRsmxAQMCqB33jYk1e9Bep2qsSccguO7IC5faFBolKeNA" },
  { name: "AgriSETA", type: "SETA", engagement: "R12.43M agricultural drone precision spraying training (PS25TUT11)", logoInitial: "Ag", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4L-pnNTYyk-jH8yXkP5omSj1oj56XRUf3xQ&s" },
  { name: "GIZ", type: "Research Funder", engagement: "~R2M energy efficient lighting and solar micro-grid training", logoInitial: "GI", logoUrl: "https://vc4a.com/wp-content/uploads/2017/10/GIZ-logo.jpeg" },
  { name: "TIA", type: "Innovation Funder", engagement: "R300,000 seed funding for smart AI vehicle theft detection", logoInitial: "T", logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtpiWbzK1WCVABSF8YXLV2sv31A9czIlNhA&s" },
  { name: "NRF", type: "Research Funder", engagement: "R5.2M mmWave satellite and telecommunications equipment funding", logoInitial: "NR", logoUrl: "https://astronomy2024.org/wp-content/uploads/2023/06/logo-nrg.jpg" },
  { name: "UNICEF", type: "Government", engagement: "Consultancy and proposal development for youth skills initiatives", logoInitial: "U", logoUrl: "https://images.seeklogo.com/logo-png/14/2/unicef-logo-png_seeklogo-144974.png" },
  { name: "Transnet", type: "Government", engagement: "Industrial automation systems and systems integration advisory", logoInitial: "TR", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Transnet_logo.svg/1280px-Transnet_logo.svg.png" },
  { name: "Eskom", type: "Energy", engagement: "Energy management optimizations and demand-side automation research", logoInitial: "E", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Eskom_2002_logo.svg/250px-Eskom_2002_logo.svg.png" },
  { name: "SACAA", type: "Aviation Regulator", engagement: "Commercial Drone licensing compliance and curriculum approvals", logoInitial: "S", logoUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/South_African_Civil_Aviation_Authority_logo.svg/1280px-South_African_Civil_Aviation_Authority_logo.svg.png" }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    title: "MICTSETA National LMS & Career Hub",
    challenge: "South Africa's digital skills pipeline lacked a unified, AI-enhanced platform for work-integrated learning tracking and career placement.",
    solution: "Prof. Owolawi's team engineered a three-tier suite (National LMS, Career Hub tracker, and E-Learning portal) serving thousands of youth nationally.",
    scale: "R5.94M total across three interconnected systems.",
    impact: "Provides live learning analytics, direct industry placement channels, and credentials verification for SETAs."
  },
  {
    id: "cs-2",
    title: "BANKSETA Work-Integrated Learning (30+ Cohorts)",
    challenge: "Banking and financial graduates lacked practical systems ready-to-deploy digital transformation skillsets required by major institutions.",
    solution: "Designed and implemented a multi-year structured industry internship model placing graduates into core engineering, systems and banking roles.",
    scale: "R28.26M in funding secured across 6 program years.",
    impact: "Placing 532 learners (2017-2023) with over 80% direct full-time retention post-programme."
  },
  {
    id: "cs-3",
    title: "AgriSETA Precision Agriculture Drone Initiative",
    challenge: "Sub-Saharan agriculture faces low yields due to late crop disease detection and lacks SACAA-certified drone operations for massive-scale precision spraying.",
    solution: "Prof. Owolawi designed a 100-learner national drone-spraying pilot training syllabus, utilizing UAVs and YOLO computer vision algorithms.",
    scale: "R12.43M program value equipped with high-end multispectral sprayers.",
    impact: "Creates Africa's first fully licensed precision agritech operator pool, unlocking millions in agricultural savings."
  }
];

export const CONSULTING_SERVICES: ConsultingArea[] = [
  {
    service: "AI Strategy & Implementation",
    forWho: "CEOs, CTOs, University Research VPs, Government CIOs",
    deliverable: "AI Implementation Blueprint, including readiness assessment, use-case prioritisation, vendor evaluation, and data governance frameworks.",
    duration: "3–6 months",
    details: "Helps leaders separate AI noise from strategic value, ensuring model selections match enterprise security and data privacy mandates."
  },
  {
    service: "Digital Transformation Consulting",
    forWho: "Universities, SETAs, Government Departments, Corporate CXOs",
    deliverable: "Digital Maturity Report & Transformation Roadmap; systems migration schemas targeting scalable cloud-native architectures.",
    duration: "6–12 months",
    details: "Decades of system integration expertise applied to modernize legacy structures smoothly with minimal downtime."
  },
  {
    service: "Workforce Development & Skills Programme Design",
    forWho: "SETAs, NSF, USAID, DoE, Large Employers",
    deliverable: "Full program blueprints, budgets, and compliance documentation for SETA and global development funding applications.",
    duration: "Project-based",
    details: "Leverages a track record of securing R94M+ to design vocational/postgraduate skills initiatives that successfully win governmental grants."
  },
  {
    service: "LMS & EdTech Platform Development",
    forWho: "Universities, SETAs, Corporates, EdTech Investors",
    deliverable: "Enterprise LMS/Career Hub platform specification, architecture design, and development oversight from concept to live deployment.",
    duration: "6–18 months",
    details: "Applies the architecture from the successful MICTSETA Career Hub to launch bandwidth-efficient learning portals."
  },
  {
    service: "Smart Agriculture Technology Consulting",
    forWho: "Agricultural Businesses, AgriSETA, Commercial Farmers, Investors",
    deliverable: "UAV hardware selection, pilot certification mapping, and agritech analytics databases integrations.",
    duration: "Variable",
    details: "Assists large-scale agricultural enterprises in executing automated crop disease scanning and yield analytics."
  },
  {
    service: "Telecommunications & Network Engineering",
    forWho: "Telecom Operators, ISPs, Satellite Link Providers, Government Bodies",
    deliverable: "mmWave propagation assessments, satellite link budgets, rain attenuation contour models, and FSO system engineering.",
    duration: "Variable",
    details: "Direct research insights referenced in ITU standards translated into resilient outdoor optical and 5G network plans."
  }
];

export const KEYNOTE_TOPICS: KeynoteTopic[] = [
  {
    id: "kp-ai-agriculture",
    category: "Smart Agriculture",
    title: "AI Across Africa — From Research Lab to Harvest Field",
    topic: "AI Across Africa — From Research Lab to Harvest Field",
    audience: "Technology summits, agricultural congresses, government innovation forums",
    duration: "45–60 min",
    abstract: "How applied AI is transforming food security, clinical diagnostics, and financial inclusion across Africa — from UAV multispectral imagery to regional language translation models.",
    description: "How applied AI is transforming food security, clinical diagnostics, and financial inclusion across Africa — from UAV multispectral imagery to regional language translation models."
  },
  {
    id: "kp-agentic-ai",
    category: "Agentic AI",
    title: "Agentic AI — The Next Frontier of Intelligent Systems",
    topic: "Agentic AI — The Next Frontier of Intelligent Systems",
    audience: "Enterprise tech leaders, research conferences, executive networking events",
    duration: "45–75 min",
    abstract: "An deep dive into autonomous multi-agent networks that plan, reason, execute, and collaborate. What this means for cybersecurity, financial automation, and future operations.",
    description: "An deep dive into autonomous multi-agent networks that plan, reason, execute, and collaborate. What this means for cybersecurity, financial automation, and future operations."
  },
  {
    id: "kp-future-work",
    category: "Workforce",
    title: "The Future of Work — 4IR Skills for an Uncertain World",
    topic: "The Future of Work — 4IR Skills for an Uncertain World",
    audience: "C-level leaders, SETA administrators, educational planners",
    duration: "45–60 min",
    abstract: "How institutions and corporations must reorganize curricula to train prompt engineers, data analysts, and robotic technicians before the automation wave arrives.",
    description: "How institutions and corporations must reorganize curricula to train prompt engineers, data analysts, and robotic technicians before the automation wave arrives."
  },
  {
    id: "kp-smart-agri",
    category: "Drone Tech",
    title: "Smart Agriculture — Drone Technology for Food Security",
    topic: "Smart Agriculture — Drone Technology for Food Security",
    audience: "Agronomists, aviation groups, venture capitalists",
    duration: "30–60 min",
    abstract: "Visual, evidence-based demonstration of drone multispectral sensors, YOLO weed segmentation, and automated spray flight routing saving up to 40% in agrochemical waste.",
    description: "Visual, evidence-based demonstration of drone multispectral sensors, YOLO weed segmentation, and automated spray flight routing saving up to 40% in agrochemical waste."
  }
];

export const SPEAKING_ENGAGEMENTS: SpeakingEngagement[] = [
  { year: 2025, event: "IEEE CCWC — IEEE 15th Annual Computing and Communication Workshop", role: "Presenter & Co-Author", location: "Las Vegas, Nevada, USA", lat: 36.1716, lng: -115.1398 },
  { year: 2025, event: "IEEE ICCE — IEEE International Conference on Consumer Electronics", role: "Paper Presenter", location: "Las Vegas, Nevada, USA", lat: 36.1699, lng: -115.1398 },
  { year: 2024, event: "CCCE 2024 — International Conference on Computing and Communication Engineering", role: "Co-author Presenter", location: "Oslo, Norway", lat: 59.9139, lng: 10.7522 },
  { year: 2021, event: "National Skills Conference, South Africa", role: "Keynote Speaker", location: "Pretoria, South Africa", lat: -25.7479, lng: 28.2293 },
  { year: 2021, event: "ICARTI — International Conference on AI & Applications", role: "Conference Co-Chair", location: "Durban, South Africa", lat: -29.8587, lng: 31.0218 },
  { year: 2020, event: "icABCD 2020 — International Conference on AI, Big Data, Computing", role: "Technical Committee Member", location: "Durban, South Africa", lat: -29.8587, lng: 31.0218 },
  { year: 2020, event: "ICICT 2020 — International Congress on ICT", role: "Presenter", location: "London, UK", lat: 51.5074, lng: -0.1278 },
  { year: 2017, event: "SATNAC — Southern Africa Telecommunication Networks & Applications Conference", role: "Presenter & Panelist", location: "Barcelona, Spain", lat: 41.3851, lng: 2.1734 },
  { year: 2016, event: "PIERS — Progress in Electromagnetics Research Symposium", role: "Paper Presenter", location: "Shanghai, China", lat: 31.2304, lng: 121.4737 },
  { year: 2013, event: "Brown University BIARI Institute", role: "Fellow & Presenter", location: "Providence, Rhode Island, USA", lat: 41.8240, lng: -71.4128 }
];

export const SUPERVISION_RECORD: SupervisedStudent[] = [
  { name: "Dr. J.S. Ojo", institution: "MUT", thesisFocus: "Radio Access Networks and Rural Communications", year: "Completed (2 Year Mentor)", type: "Postdoctoral" },
  { name: "Dr. T. Mapayi", institution: "TUT", thesisFocus: "Intelligent Systems and Pattern Recognition", year: "Completed (3 Year Mentor)", type: "Postdoctoral" },
  { name: "Dr. K. Odeyemi", institution: "TUT", thesisFocus: "Optical Wireless Communications under Turbulence", year: "Completed (2 Year Mentor)", type: "Postdoctoral" },
  { name: "Dr. G. Aiyetoro", institution: "TUT", thesisFocus: "5G Networks and Satellite Communications Links", year: "Completed (3 Year Mentor)", type: "Postdoctoral" },
  { name: "Dr. C.B. Asaju", institution: "TUT", thesisFocus: "AI and Computer Vision in Precision Agriculture", year: "Completed (1 Year)", type: "Postdoctoral" },
  { name: "Dr. Y. Matanga", institution: "TUT", thesisFocus: "Artificial Intelligence and Multimodal Optimizations", year: "Completed (1 Year)", type: "Postdoctoral" },
  { name: "Dr. Y.T. Lawa", institution: "TUT", thesisFocus: "Deep Learning for FSO Atmospheric Fog Attenuation", year: "Completed + Active Support", type: "Postdoctoral" },
  { name: "Dr. R.W. Bello", institution: "TUT", thesisFocus: "Artificial Intelligence, ML, and Agricultural Computer Vision", year: "Completed + Active Support", type: "Postdoctoral" },
  { name: "Dr. Kehinde Odeyemi", institution: "UKZN", thesisFocus: "Spatial Diversity & Relay-Assisted Techniques in Misaligned Turbulent FSO Channels", year: "2018", type: "Doctoral" },
  { name: "Dr. Emmanuel", institution: "DUT", thesisFocus: "Tropospheric Attenuation Modelling along SHF/EHF Satellite Links", year: "2019", type: "Doctoral" },
  { name: "Dr. O.A. Layioye", institution: "UKZN", thesisFocus: "Fibre-over-Wireless Design and Implementation for Future Network Access", year: "2022", type: "Doctoral" },
  { name: "Dr. S.O. Ojo", institution: "TUT", thesisFocus: "Ensemble Forecasting of Stock Markets using LSTM and CNN", year: "2024", type: "Doctoral" },
  { name: "Dr. P.S. Maswikaneng", institution: "TUT", thesisFocus: "Enhancing QoS in Free Space Optical Channels through Atmospheric Turbulence Mitigation", year: "2024", type: "Doctoral" },
  { name: "Dr. R.C. Maswanganyi", institution: "TUT", thesisFocus: "Multi-class Domain-adaptation Algorithms for EEG Brain Wave Classification", year: "2024", type: "Doctoral" },
  { name: "Dr. A. Adisa", institution: "TUT", thesisFocus: "Deep Learning for Financial Crisis Prediction: Bankruptcy and Credit Scoring", year: "2025", type: "Doctoral" },
  { name: "Dr. Dorcas Oladayo Esan", institution: "TUT", thesisFocus: "Artificial Intelligence, ML, Generative AI and Computer Vision in Medicine", year: "2025", type: "Doctoral" }
];

export const AWARDS: Award[] = [
  { award: "Top 500 African Researchers", awardingBody: "African Research & Innovation Development Network", years: "2015, 2016, 2017, 2018, 2019, 2020, 2021", significance: "Named among Africa's 500 most impactful researchers continuously across seven consecutive years.", icon: "Trophy" },
  { award: "Senior Researcher of the Year", awardingBody: "Tshwane University of Technology", years: "2018 & 2020 / 2021", significance: "TUT's highest research honour for sustained excellence and high-impact publications. Awarded twice.", icon: "Award" },
  { award: "Senate Research Excellence Award", awardingBody: "Tshwane University of Technology", years: "2016", significance: "Conferred by the University Senate for significant scholarly contributions and high national visibility.", icon: "CheckCircle" },
  { award: "Most Outstanding Researcher — Engineering", awardingBody: "Tshwane University of Technology", years: "2012, 2014, 2016", significance: "Faculty-level recognition for outstanding research leadership, grant attraction, and postgraduate supervision. Awarded three times.", icon: "Star" },
  { award: "Vice-Chancellor's Teaching Excellence Award", awardingBody: "Tshwane University of Technology", years: "2015", significance: "TUT's highest teaching honour, recognising innovative digital pedagogy and curriculum transformation.", icon: "BookOpen" },
  { award: "BIARI Fellowship", awardingBody: "Brown University, Providence, USA", years: "2013", significance: "Selected from a globally competitive pool for Ivy League interdisciplinary fellowship on academic leadership.", icon: "Globe" },
  { award: "Best Paper Award", awardingBody: "International Conference on Applied Information Systems (ATIS)", years: "2012", significance: "Joint recipient for novel contributions to wireless networks and satellite channel optimization in Taipei.", icon: "FileText" },
  { award: "Best Engineering Mentor Award", awardingBody: "University of KwaZulu-Natal (UKZN)", years: "2006 & 2007", significance: "Exceptional mentorship and development in engineering education, awarded during doctoral studies.", icon: "Users" }
];

export const DOWNLOADABLE_RESOURCES: DownloadableResource[] = [
  { id: "ai-engineers", title: "Introduction to AI for Engineers", description: "Practical AI guide for engineering professionals covering supervised learning, neural networks, computer vision, and NLP — without a statistics PhD requirement.", format: "PDF", pages: 30, audience: "Engineers transitioning to AI roles", badge: "Most Popular" },
  { id: "drone-agri", title: "Agricultural Drone Operations Guide", description: "Everything needed to deploy drone technology in agriculture — cover SACAA legal requirements, flight guidelines, wave spectrums, and cost-benefit analysis.", format: "PDF", pages: 20, audience: "Farmers, agripreneurs, agtech operators", badge: "New" },
  { id: "win-proposal", title: "How to Write a Winning Research Proposal", description: "Distills key principles from securing R94M+ in research funding — priorities of government/international funders, budgeting, and logic frameworks.", format: "PDF", pages: 25, audience: "Academic researchers, PIs, start-ups" },
  { id: "postgrad-success", title: "Guide to Postgraduate Studies in Engineering", description: "Choosing a supervisor, structuring a comprehensive research proposal, navigating peer review, and successfully publishing your first journal paper.", format: "PDF", pages: 15, audience: "MSc & PhD Candidates" },
  { id: "skills-4ir", title: "4IR Skills Framework: Employer Demand 2025", description: "Analysis of the skills most in demand by South African and global tech giants. Includes curriculum suggestions for digital system engineers.", format: "PDF / Report", pages: 20, audience: "HR professionals, deans, curriculum planners" },
  { id: "fso-satellites", title: "Getting Started with FSO Communications Research", description: "Technical introduction to Free Space Optical (FSO) link budgets, tropospheric mapping, laser propagation, and channel simulation tools.", format: "Technical PDF", pages: 20, audience: "Postgraduate scholars, satellite engineers" }
];

export const COLLABORATIONS: CollaborationPin[] = [
  { city: "Durban", country: "South Africa", institution: "UKZN", collaborators: "Prof. T.J. Afullo (Telecom/FSO/EMC), Prof. T. Walingo, Prof. V.M. Srivastava (FSO)", lat: -29.8587, lng: 31.0218, type: "Research" },
  { city: "Durban", country: "South Africa", institution: "DUT", collaborators: "Prof. I.E. Davidson (Smart Grids), Prof. O. Olugbara (AI), Prof. Nleya (Radio-over-Fibre), Mr. T. Akindeji", lat: -29.8585, lng: 31.0215, type: "Research" },
  { city: "Pretoria", country: "South Africa", institution: "UP", collaborators: "Prof. T. Stander (mmWave Microelectronics, Cryogenic Devices)", lat: -25.7545, lng: 28.2314, type: "Research" },
  { city: "Johannesburg", country: "South Africa", institution: "UJ", collaborators: "Prof. S. Sinha (Engineering Education, RF Systems)", lat: -26.1852, lng: 27.9948, type: "Research" },
  { city: "Akure", country: "Nigeria", institution: "FUTA", collaborators: "Prof. S.J. Ojo (Radio Propagation, Satellite Communications)", lat: 7.2526, lng: 5.1931, type: "Research" },
  { city: "Cookeville", country: "USA", institution: "Tennessee Tech", collaborators: "Prof. Joseph Olunfemi Ojo (Power Systems, Renewable Grid Integration)", lat: 36.1628, lng: -85.5016, type: "Research" },
  { city: "San Diego", country: "USA", institution: "UC San Diego", collaborators: "Prof. Boubacar Kanté (Qualcomm Faculty Fellow — Metamaterials, Nano-Photonics)", lat: 32.8801, lng: -117.2340, type: "Research" },
  { city: "Norfolk", country: "USA", institution: "Norfolk State", collaborators: "Prof. Isaac Osunmakinde (AI for Development, Predictive Analytics)", lat: 36.8485, lng: -76.2625, type: "Research" },
  { city: "St. John's", country: "Canada", institution: "Memorial University (MUN)", collaborators: "Prof. Telex Ngatched (Wireless Systems, 5G/6G co-tutelle)", lat: 47.5738, lng: -52.7331, type: "Research" },
  { city: "Gaborone", country: "Botswana", institution: "BIUST", collaborators: "Thesis examiner — Setswana Grammar Checker (LSTM-RNNs), 2021", lat: -22.5029, lng: 27.1245, type: "Research" },
  { city: "Kampala", country: "Uganda", institution: "Makerere University", collaborators: "Thesis examiner — Energy Optimization in LTE/LTE-A Networks", lat: 0.3302, lng: 32.5711, type: "Research" },
  { city: "Chennai", country: "India", institution: "Anna University", collaborators: "PhD thesis examination — Obstacle Detection for Visually Impaired", lat: 13.0125, lng: 80.2351, type: "Research" }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-2025-1",
    year: 2025,
    authors: "Masethe M.A., Owolawi P.A.",
    title: "Hybrid Transformer-Based LLMs for Word Sense Disambiguation in Low-Resource Sesotho sa Leboa",
    venue: "Applied Sciences (MDPI)",
    type: "Journal",
    citations: 2,
    doi: "10.3390/app15041234",
    studentCollaborator: true,
    topic: "AI",
    abstract: "This paper integrates state-of-the-art transformer pathways and fine-tuning mechanics for regional dialects. We evaluate custom low-rank adaptations (LoRA) on Sesotho sa Leboa corpora, boosting disambiguation accuracy by 14% compared to legacy architectures."
  },
  {
    id: "pub-2025-2",
    year: 2025,
    authors: "Matondo J., Owolawi P.A.",
    title: "Rain Attenuation Modelling via Symbolic Regression & Differential Evolution for 5G mmWave",
    venue: "Progress In Electromagnetics Research B (PIER B)",
    type: "Journal",
    citations: 4,
    doi: "10.2528/PIERB25010203",
    studentCollaborator: true,
    topic: "Telecommunications",
    abstract: "Investigates millimeter-wave propagation in subtropical climates. We propose a symbolic regression model optimized via differential evolution to predict outdoor path losses during severe downpours."
  },
  {
    id: "pub-2025-3",
    year: 2025,
    authors: "Biheng G.L., Owolawi P.A.",
    title: "Network Architecture of a Fog-Cloud-Based Smart Farming System with Edge Computer Vision",
    venue: "IoT (MDPI)",
    type: "Journal",
    citations: 3,
    doi: "10.3390/iot06010078",
    studentCollaborator: true,
    topic: "Smart Agriculture",
    abstract: "Presents a novel hybrid fog-cloud topology for smart smallholder irrigation tracking. Embedded edge YOLOv8 classifiers detect weed formations and stream micro-spraying coordinates locally to decrease water waste."
  },
  {
    id: "pub-2025-4",
    year: 2025,
    authors: "Asaju C.B., Owolawi P.A.",
    title: "Cloud-Based License Plate Recognition: YOLO v5, v7, v8, v9 Comparative Evaluation",
    venue: "Information (MDPI)",
    type: "Journal",
    citations: 5,
    doi: "10.3390/info16020567",
    studentCollaborator: true,
    topic: "Computer Vision",
    abstract: "Analyses latency structures and detection bounds across YOLO generations (v5 to v9) compiled on edge gateways. The cloud-proxy framework achieves high accuracy for dark and motion-blurred South African plate designs."
  },
  {
    id: "pub-2025-5",
    year: 2025,
    authors: "Olujimi T.O., Owolawi P.A.",
    title: "Agentic AI Frameworks in SMMEs: A Systematic Literature Review on Productivity Hubs",
    venue: "Preprints.org",
    type: "Preprint",
    citations: 1,
    doi: "10.20944/preprints2025.01.0987",
    studentCollaborator: true,
    topic: "AI",
    abstract: "Catalogs recent agentic frameworks utilizing planning algorithms like ReAct and AutoGPT. We construct a secure B2B blueprint enabling small firms in Southern Africa to automate proposal writing."
  },
  {
    id: "pub-2025-6",
    year: 2025,
    authors: "Maswanganyi R.C., Owolawi P.A.",
    title: "Cross-Subject EEG Transfer Learning via Domain Adaptation Algorithms for Motor Imagery",
    venue: "Mathematics (MDPI)",
    type: "Journal",
    citations: 3,
    doi: "10.3390/math13054321",
    studentCollaborator: true,
    topic: "Computer Vision",
    abstract: "Describes domain adversarial neural network modifications that bridge electroencephalogram (EEG) signals across separate patient trials, maintaining high accuracy for BCI mobility gear."
  },
  {
    id: "pub-2025-7",
    year: 2025,
    authors: "Lawal Y.T., Owolawi P.A.",
    title: "Analysis of Cross-Polarization Discrimination Due to Rain for Earth-Space Links at mmWave",
    venue: "Atmosphere (MDPI)",
    type: "Journal",
    citations: 2,
    doi: "10.3390/atmos16010012",
    studentCollaborator: true,
    topic: "Telecommunications",
    abstract: "Assesses copolar and cross-polar attenuation limits for Ka and V-band satellite links. We define localized rain droplet shapes in Gauteng to build exact attenuation contour maps."
  },
  {
    id: "pub-2025-8",
    year: 2025,
    authors: "Bello R.W., Owolawi P.A.",
    title: "SAM-IE: Segment-Anything-Enabled Image Enhancement for Infected Cucumber Leaf Segmentation",
    venue: "ResearchGate / In Review",
    type: "Preprint",
    citations: 0,
    studentCollaborator: true,
    topic: "Smart Agriculture",
    abstract: "Embeds Meta's Segment Anything Model (SAM) inside a low-cost mobile pipeline to segment downy mildew on leaf structures under inconsistent daylight outdoors."
  },
  {
    id: "pub-2025-9",
    year: 2025,
    authors: "Bello R.W., Owolawi P.A.",
    title: "Cattle Instance Segmentation by Transfer Learning for Sustainable Livestock Farming",
    venue: "IntechOpen",
    type: "Book Chapter",
    citations: 2,
    doi: "10.5772/intechopen.100987",
    studentCollaborator: true,
    topic: "Smart Agriculture",
    abstract: "Presents transfer learning frameworks using Mask R-CNN to track cattle configurations and count livestock in open paddocks using low-resolution cameras."
  },
  {
    id: "pub-2025-10",
    year: 2025,
    authors: "Ogundokun R.O., Owolawi P.A.",
    title: "MGWO-CNN: Bio-Inspired Modified Grey Wolf Optimization for Covid-19 Detection in X-Rays",
    venue: "Edelweiss Applied Science and Technology (Edelweiss AST)",
    type: "Journal",
    citations: 4,
    doi: "10.3389/east2025-098",
    studentCollaborator: false,
    topic: "AI",
    abstract: "Applies bio-inspired heuristics to optimize CNN hyper-parameters (learning rates, filter cuts). Demonstrates outstanding clinical classification rates on public thoracic databases."
  },
  {
    id: "pub-2011-1",
    year: 2011,
    authors: "Owolawi P.A., Afullo T.J.",
    title: "Rainfall Rate Probability Density Evaluation and Mapping for Rain Attenuation in South Africa",
    venue: "Progress In Electromagnetics Research (PIER)",
    type: "Journal",
    citations: 142,
    doi: "10.2528/PIER11082504",
    studentCollaborator: false,
    topic: "Telecommunications",
    abstract: "A landmark paper defining localized South African rain models based on five years of climate logs, cited as a foundational reference in telecommunications link engineering."
  },
  {
    id: "pub-2014-1",
    year: 2014,
    authors: "Owolawi P.A.",
    title: "Development of One-Minute Rain-Rate and Rain-Attenuation Contour Maps for Satellite Propagation Planning in South Africa",
    venue: "Advances in Space Research (Elsevier)",
    type: "Journal",
    citations: 86,
    doi: "10.1016/j.asr.2014.04.008",
    studentCollaborator: false,
    topic: "Telecommunications",
    abstract: "Compiled one-minute integrated rainfall metrics from South African Weather Service terminals. We map rain contours across rural regions to guide satellite installation bounds."
  }
];
