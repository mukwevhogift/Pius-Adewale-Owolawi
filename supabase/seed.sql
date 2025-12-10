-- =====================================================
-- SEED DATA - Prof. Pius Owolawi Portfolio
-- =====================================================
-- 
-- This file contains all the current hardcoded data from the website
-- Run this AFTER running schema.sql
-- 
-- SAFE MODE: This version deletes existing data before inserting
-- to avoid duplicate key errors
-- 
-- =====================================================

-- Clear existing data (in reverse order of dependencies)
DELETE FROM site_settings;
DELETE FROM gallery_images;
DELETE FROM testimonials;
DELETE FROM publications;
DELETE FROM speeches;
DELETE FROM community_initiatives;
DELETE FROM achievements;
DELETE FROM research_areas;
DELETE FROM professional_memberships;
DELETE FROM awards;
DELETE FROM certifications;
DELETE FROM education;
DELETE FROM hero_section;

-- =====================================================
-- HERO SECTION
-- =====================================================

INSERT INTO hero_section (title, name, subtitle, description, image_url, stats) VALUES
(
    'Distinguished Professor & Research Chair',
    'Prof. Pius Adewale Owolawi',
    'Leading Fourth Industrial Revolution (4IR) Education & Research',
    'Award-winning engineer, educator, and innovation leader driving transformational research in AI, wireless communications, and smart systems. SARChI Research Chair for Fourth Industrial Revolution Skills, Education & Training.',
    '/img/prof-owolawi.jpg',
    '{"publications": 200, "funding": "R94M+"}'
);

-- =====================================================
-- EDUCATION
-- =====================================================

INSERT INTO education (degree, institution, country, year_start, year_end, specialization, icon, color, bg_color, order_index, is_ongoing) VALUES
('PhD in Electronic Engineering', 'University of KwaZulu-Natal (UKZN)', 'South Africa', '2006', '2010', 'Advanced wireless communication, signal processing, and energy-aware systems', 'ri-graduation-cap-fill', 'from-blue-600 to-cyan-600', 'from-blue-50 to-cyan-50', 1, false),
('MSc in Electronic Engineering', 'University of KwaZulu-Natal (UKZN)', 'South Africa', '2004', '2006', 'Telecommunications systems, electronic circuit design, and network optimisation', 'ri-medal-fill', 'from-purple-600 to-pink-600', 'from-purple-50 to-pink-50', 2, false),
('B.Tech (Hons) in Applied Physics/Electronics', 'Federal University of Technology, Akure', 'Nigeria', '1996', '2001', 'Electronics, instrumentation, and embedded systems', 'ri-award-fill', 'from-green-600 to-emerald-600', 'from-green-50 to-emerald-50', 3, false),
('Advanced Diploma in Remote Engineering, Mechatronics & Robotics', 'Engineering Institute of Technology (EIT)', 'Australia', '2015', '2016', 'Automation, remote control systems, and intelligent robotics', 'ri-robot-fill', 'from-orange-600 to-red-600', 'from-orange-50 to-red-50', 4, false),
('PG Cert in AI & Machine Learning', 'University of Texas at Austin', 'USA', '2019', '2020', 'Machine learning, deep learning, computer vision, and AI applications', 'ri-brain-fill', 'from-indigo-600 to-purple-600', 'from-indigo-50 to-purple-50', 5, false),
('PG Cert in Data Science & Business Analytics', 'University of Texas at Austin', 'USA', '2020', '2021', 'Data analytics, predictive modelling, and data-driven business strategy', 'ri-bar-chart-fill', 'from-teal-600 to-cyan-600', 'from-teal-50 to-cyan-50', 6, false),
('Bachelor of Laws (LLB)', 'University of South Africa (UNISA)', 'South Africa', '2018', NULL, 'Intellectual property, technology law, AI ethics, and cyber law', 'ri-book-open-fill', 'from-green-500 to-emerald-500', 'from-green-50 to-emerald-50', 7, true);

-- =====================================================
-- CERTIFICATIONS
-- =====================================================

INSERT INTO certifications (name, full_name, icon, order_index) VALUES
('CCNP', 'Cisco Certified Network Professional', 'ri-shield-check-fill', 1),
('CCNA', 'Cisco Certified Network Associate', 'ri-shield-star-fill', 2),
('MCSE', 'Microsoft Certified Systems Engineer', 'ri-windows-fill', 3),
('CWSP', 'Certified Wireless Security Professional', 'ri-wifi-fill', 4),
('CWNA', 'Certified Wireless Network Administrator', 'ri-signal-wifi-fill', 5),
('CFOS/D', 'Certified Fibre Optic Design Specialist', 'ri-flashlight-fill', 6),
('CFOT', 'Certified Fibre Optic Technician', 'ri-tools-fill', 7),
('Drone Pilot', 'Remote Pilot Licence - SACAA', 'ri-flight-takeoff-fill', 8);

-- =====================================================
-- AWARDS
-- =====================================================

INSERT INTO awards (title, year, organization, description, icon, color, order_index) VALUES
('Top 500 African Researchers', '2015-2021', 'Continental Recognition', 'Recognized among Africa''s leading researchers for scholarly output and impact', 'ri-trophy-line', 'from-yellow-500 to-orange-500', 1),
('Senior Researcher of the Year', '2020 & 2018', 'Tshwane University of Technology', 'Acknowledged for sustained research excellence and high-impact outputs', 'ri-medal-line', 'from-blue-500 to-purple-500', 2),
('Most Outstanding Researcher', '2016, 2014, 2012', 'TUT Faculty of Engineering', 'Recognized for outstanding leadership in research development and postgraduate supervision', 'ri-award-line', 'from-green-500 to-emerald-500', 3),
('Senate Research Excellence Award', '2016', 'Tshwane University of Technology', 'Conferred by University Senate for significant scholarly contributions and national visibility', 'ri-star-line', 'from-purple-500 to-pink-500', 4),
('Vice-Chancellor''s Teaching Excellence Award', '2015', 'Tshwane University of Technology', 'Honoured for innovative teaching practices, learner engagement, and curriculum transformation', 'ri-book-mark-line', 'from-indigo-500 to-blue-500', 5),
('BIARI Alumnus', '2013', 'Brown University, USA', 'Selected for global interdisciplinary fellowship on development, policy, and academic leadership', 'ri-global-line', 'from-cyan-500 to-teal-500', 6),
('Best Paper Award', '2012', 'ATISR Conference, Taipei', 'Joint recipient for novel contributions to wireless systems and optimization', 'ri-file-text-line', 'from-red-500 to-orange-500', 7),
('Best Engineering Mentor', '2006 & 2007', 'University of KwaZulu-Natal', 'Recognized for exceptional mentorship and student development in engineering education', 'ri-user-star-line', 'from-pink-500 to-rose-500', 8);

-- =====================================================
-- PROFESSIONAL MEMBERSHIPS
-- =====================================================

INSERT INTO professional_memberships (name, role, registration_no, is_active, order_index) VALUES
('Engineering Council of South Africa (ECSA)', 'Registered Member', 'Reg. No: 2018400031', true, 1),
('Institute of Electrical and Electronics Engineers (IEEE)', 'Member', 'MIEEE', true, 2),
('South African Institute of Electrical Engineers (SAIEE)', 'Professional Member', 'Professional Member', true, 3),
('South African Radio League (SARL)', 'Active Member', 'Active Member', true, 4),
('South African Amateur Radio Satellite Association (SA AMSAT)', 'Active Member', 'Active Member', true, 5);

-- =====================================================
-- RESEARCH AREAS
-- =====================================================

INSERT INTO research_areas (title, icon, color, projects, order_index) VALUES
('Artificial Intelligence & Machine Learning', 'ri-brain-line', 'from-blue-500 to-cyan-500', 
'["Human activity recognition & biomedical imaging", "Transfer learning & ensemble models (GANs, VAE, CycleGAN)", "Transformer-based NLP for African languages", "Hybrid LSTM-CNN for medical diagnosis", "Domain adaptation for EEG classification"]', 1),

('Wireless & Optical Communications', 'ri-signal-tower-line', 'from-purple-500 to-pink-500',
'["Radio frequency propagation modeling", "Advanced FSO/RF hybrid systems", "Reconfigurable Intelligent Surfaces (RIS) for 6G", "UAV-assisted wireless energy harvesting", "mmWave, Ka/V bands channel modeling"]', 2),

('Renewable Energy & Smart Grid', 'ri-leaf-line', 'from-green-500 to-emerald-500',
'["PV, wind, and hybrid system modeling", "Demand-side management (DSM)", "Fault detection in PV modules using vision", "IoT-enabled load management", "AI-driven renewable resource forecasting"]', 3),

('Computer Vision & Intelligent Systems', 'ri-eye-line', 'from-orange-500 to-red-500',
'["2D-to-3D image reconstruction", "Object detection (YOLO v5-v9)", "Plant disease identification", "Livestock monitoring systems", "Cloud-based license plate recognition"]', 4),

('IoT & Edge Computing', 'ri-router-line', 'from-indigo-500 to-purple-500',
'["Spectrum optimization & energy-efficient routing", "Internet of Remote Things (IoRT)", "Smart aquaponics & remote weather monitoring", "Fog computing for latency-critical apps", "LoRaWAN & NB-IoT deployments"]', 5);

-- =====================================================
-- ACHIEVEMENTS
-- =====================================================

INSERT INTO achievements (title, count, icon, color, details, category, order_index) VALUES
('Postgraduate Supervision', '37+', 'ri-graduation-cap-line', 'from-blue-500 to-cyan-500',
'["29 Master''s graduates", "8 PhD graduates", "13 active postdoctoral fellows", "14 ongoing PhD candidates"]', 'supervision', 1),

('Research Funding Secured', 'R94M+', 'ri-funds-box-line', 'from-green-500 to-emerald-500',
'["MICTSETA: R10.6M+", "WIL Funding: R55.4M+", "Innovation & Seed: R8.2M+", "AgriSETA: R12.4M+"]', 'funding', 2),

('Publications & Citations', '200+', 'ri-article-line', 'from-purple-500 to-pink-500',
'["200+ peer-reviewed papers", "2000+ citations", "Top 500 African Researchers", "Multiple best paper awards"]', 'publications', 3),

('Laboratories Established', '10+', 'ri-flask-line', 'from-orange-500 to-red-500',
'["4IR Innovation Lab", "Drone Technology Lab", "AI & ML Lab", "EMC/EMI Testing Facility"]', 'infrastructure', 4),

('International Collaborations', '25+', 'ri-global-line', 'from-indigo-500 to-purple-500',
'["USA: UT Austin, Brown University", "Canada: Memorial University", "UK: University of Leeds", "Australia: Curtin University"]', 'collaborations', 5);

-- =====================================================
-- COMMUNITY INITIATIVES
-- =====================================================

INSERT INTO community_initiatives (title, description, icon, color, order_index) VALUES
('KwaZulu-Natal Society for the Blind', 'Spearheaded a collaborative project to design and prototype an electronic walking aid (smart stick) to enhance mobility for visually impaired persons using low-cost embedded systems.', 'ri-eye-line', 'from-blue-500 to-purple-500', 1),

('Let''s Fix It Initiative', 'Founded this volunteer-based initiative to build technical capacity among underprivileged youth through repair services, solar installation, and skills training in electronics and electrical systems.', 'ri-tools-line', 'from-green-500 to-emerald-500', 2),

('Prince Mshiyeni Memorial Hospital', 'Formal MoU-based technical support to diagnose, repair, and maintain essential medical and electrical equipment, improving healthcare infrastructure access.', 'ri-hospital-line', 'from-purple-500 to-pink-500', 3),

('Smart Farming Support', 'Provides technical support to rural farmers and agri-SMMEs, including training in agricultural drones, IoT sensors, and precision farming tools for sustainable agriculture.', 'ri-plant-line', 'from-orange-500 to-red-500', 4);

-- =====================================================
-- SPEECHES (Testing Data)
-- =====================================================

INSERT INTO speeches (title, event, date, location, type, description, video_url, slides_url, thumbnail_url) VALUES
(
    'AI and the Future of African Education',
    'UNESCO Digital Learning Week',
    '2024-09-15',
    'Paris, France',
    'keynote',
    'Keynote address on leveraging artificial intelligence to transform education systems across Africa, addressing infrastructure challenges and digital literacy.',
    'https://youtube.com/watch?v=example1',
    NULL,
    NULL
),
(
    '6G Networks and Reconfigurable Intelligent Surfaces',
    'IEEE International Conference on Communications',
    '2024-06-20',
    'Rome, Italy',
    'conference',
    'Technical presentation on the role of RIS technology in next-generation wireless networks and spectrum efficiency.',
    NULL,
    'https://example.com/slides/ris-6g.pdf',
    NULL
),
(
    'Smart Agriculture Solutions for Smallholder Farmers',
    'AgriTech Innovation Summit',
    '2024-03-10',
    'Johannesburg, South Africa',
    'keynote',
    'Demonstrating practical IoT and drone technologies that enable precision farming for small-scale agricultural operations.',
    'https://youtube.com/watch?v=example2',
    'https://example.com/slides/smart-agriculture.pdf',
    NULL
),
(
    'Industry 4.0 Skills Development in South Africa',
    'MICTSETA Annual Conference',
    '2023-11-05',
    'Pretoria, South Africa',
    'conference',
    'Overview of the MICTSETA Research Chair programme and its impact on building 4IR capacity across South African institutions.',
    NULL,
    NULL,
    NULL
),
(
    'Building Resilient Renewable Energy Systems',
    'African Renewable Energy Webinar Series',
    '2023-08-22',
    'Online',
    'webinar',
    'Exploring AI-driven fault detection and optimization strategies for solar and wind energy systems in African contexts.',
    'https://youtube.com/watch?v=example3',
    NULL,
    NULL
);

-- =====================================================
-- PUBLICATIONS (Testing Data)
-- =====================================================

INSERT INTO publications (title, authors, journal, year, doi, pdf_url, citation_count, type, abstract, keywords, is_published) VALUES
(
    'Deep Learning Approaches for Human Activity Recognition Using Wearable Sensors',
    'P.A. Owolawi, J. Smith, A. Johnson',
    'IEEE Transactions on Neural Networks and Learning Systems',
    '2024',
    '10.1109/TNNLS.2024.12345',
    NULL,
    45,
    'journal',
    'This paper presents a novel deep learning framework for human activity recognition using wearable sensor data. The proposed method achieves state-of-the-art performance on benchmark datasets.',
    ARRAY['deep learning', 'human activity recognition', 'wearable sensors', 'machine learning'],
    true
),
(
    'Reconfigurable Intelligent Surfaces for 6G Wireless Communications: A Survey',
    'P.A. Owolawi, M. Chen, R. Kumar, T. Ndlovu',
    'IEEE Communications Surveys & Tutorials',
    '2023',
    '10.1109/COMST.2023.67890',
    NULL,
    128,
    'journal',
    'A comprehensive survey on reconfigurable intelligent surfaces (RIS) technology for next-generation wireless networks. We discuss key challenges, opportunities, and future research directions.',
    ARRAY['6G', 'RIS', 'wireless communications', 'smart surfaces'],
    true
),
(
    'AI-Driven Fault Detection in Photovoltaic Systems Using Computer Vision',
    'P.A. Owolawi, S. Naidoo, K. Mokoena',
    'Renewable Energy',
    '2024',
    '10.1016/j.renene.2024.12345',
    NULL,
    32,
    'journal',
    'We propose an AI-based approach for automatic fault detection in solar PV modules using aerial imagery and deep convolutional neural networks.',
    ARRAY['solar energy', 'fault detection', 'computer vision', 'renewable energy'],
    true
),
(
    'Transfer Learning for Medical Image Classification in Resource-Constrained Environments',
    'P.A. Owolawi, L. Zulu, M. Hassan',
    'Proceedings of the International Conference on Artificial Intelligence in Medicine (AIME 2024)',
    '2024',
    NULL,
    NULL,
    12,
    'conference',
    'This work explores transfer learning techniques for medical image classification in African healthcare settings with limited computational resources.',
    ARRAY['transfer learning', 'medical imaging', 'AI', 'healthcare'],
    true
),
(
    'UAV-Assisted Energy Harvesting in IoT Networks: Optimization and Performance Analysis',
    'P.A. Owolawi, T. Banda, J. Okonkwo',
    'IEEE Internet of Things Journal',
    '2023',
    '10.1109/JIOT.2023.34567',
    NULL,
    67,
    'journal',
    'We investigate UAV-assisted wireless power transfer for IoT devices and propose an optimization framework to maximize energy efficiency.',
    ARRAY['UAV', 'energy harvesting', 'IoT', 'wireless power transfer'],
    true
),
(
    'Smart Agriculture: IoT-Based Precision Farming for Smallholder Farmers in South Africa',
    'P.A. Owolawi, N. Molefe, P. Dlamini',
    'Computers and Electronics in Agriculture',
    '2024',
    '10.1016/j.compag.2024.56789',
    NULL,
    28,
    'journal',
    'A practical IoT-based precision farming system designed for smallholder farmers, incorporating drone monitoring, soil sensors, and AI-driven crop recommendations.',
    ARRAY['smart agriculture', 'IoT', 'precision farming', 'drones'],
    true
),
(
    'Hybrid LSTM-CNN Architecture for EEG-Based Brain-Computer Interfaces',
    'P.A. Owolawi, R. Govender, A. Khumalo',
    'Proceedings of the 2023 IEEE International Conference on Systems, Man, and Cybernetics',
    '2023',
    NULL,
    NULL,
    19,
    'conference',
    'A novel hybrid deep learning architecture combining LSTM and CNN for improved EEG signal classification in brain-computer interface applications.',
    ARRAY['BCI', 'EEG', 'LSTM', 'CNN', 'deep learning'],
    true
),
(
    'Channel Modeling for mmWave Communications in Smart City Environments',
    'P.A. Owolawi, Z. Sithole, F. Ahmed',
    'IEEE Transactions on Vehicular Technology',
    '2023',
    '10.1109/TVT.2023.45678',
    NULL,
    54,
    'journal',
    'Comprehensive channel modeling study for millimeter-wave communications in urban smart city deployments.',
    ARRAY['mmWave', '5G', 'channel modeling', 'smart cities'],
    true
),
(
    'Edge Computing for Real-Time Object Detection in Autonomous Agricultural Robots',
    'P.A. Owolawi, T. Mthembu, K. Pillay',
    'Journal of Field Robotics',
    '2024',
    '10.1002/rob.22345',
    NULL,
    21,
    'journal',
    'Implementation of edge computing solutions for real-time object detection in resource-constrained agricultural robots.',
    ARRAY['edge computing', 'object detection', 'robotics', 'agriculture'],
    true
),
(
    'Transformer-Based Natural Language Processing for African Languages',
    'P.A. Owolawi, M. Ndaba, L. Selemela',
    'Proceedings of AfricaNLP 2024',
    '2024',
    NULL,
    NULL,
    8,
    'conference',
    'Adapting transformer models for low-resource African languages, with case studies in Zulu, Xhosa, and Sesotho.',
    ARRAY['NLP', 'transformers', 'African languages', 'low-resource'],
    true
);

-- =====================================================
-- TESTIMONIALS
-- =====================================================

INSERT INTO testimonials (quote, author, role, organization, icon, order_index) VALUES
('Prof. Owolawi''s leadership in 4IR education has been transformative. His ability to bridge academia and industry has created unprecedented opportunities for skills development and innovation in South Africa.', 'MICTSETA Leadership', 'Research Chair Programme', 'MICTSETA', 'ri-building-line', 1),

('An exceptional researcher and mentor who has supervised numerous successful postgraduate students. His dedication to advancing AI and wireless communications research is truly inspiring.', 'Academic Colleague', 'Faculty Member', 'Tshwane University of Technology', 'ri-user-star-line', 2),

('Prof. Owolawi''s work in smart agriculture and drone technology has had a significant impact on rural communities. His commitment to using technology for social good is commendable.', 'AgriSETA Partner', 'Programme Director', 'Drone Training Programme', 'ri-plant-line', 3);

-- =====================================================
-- GALLERY IMAGES
-- =====================================================

INSERT INTO gallery_images (title, image_url, alt_text, category, order_index) VALUES
('4IR Innovation Laboratory', '/img/lab-4ir.jpg', '4IR Innovation Laboratory', 'lab', 1),
('Drone Technology Laboratory', '/img/lab-drone.jpg', 'Drone Technology Laboratory', 'lab', 2),
('AI & Machine Learning Lab', '/img/lab-ai.jpg', 'AI & Machine Learning Lab', 'lab', 3),
('International Conference', '/img/conference-1.jpg', 'International Conference', 'event', 4),
('Research Team', '/img/research-team.jpg', 'Research Team', 'research', 5),
('Award Ceremony', '/img/award-ceremony.jpg', 'Award Ceremony', 'award', 6);

-- =====================================================
-- SITE SETTINGS
-- =====================================================

INSERT INTO site_settings (key, value) VALUES
('site_title', '"Prof. Pius Owolawi - Distinguished Professor & 4IR Research Leader"'),
('contact_email', '"p.owolawi@gmail.com"'),
('social_links', '{"linkedin": "https://linkedin.com/in/piusowolawi", "twitter": "https://twitter.com/piusowolawi", "googlescholar": "https://scholar.google.com/citations?user=xxx"}'),
('site_meta', '{"description": "Official portfolio of Prof. Pius Adewale Owolawi - Distinguished Professor, Engineer, and 4IR Research Leader", "keywords": ["Professor", "Engineering", "AI", "Machine Learning", "4IR", "South Africa"]}');

-- =====================================================
-- COMPLETION
-- =====================================================
-- 
-- ✅ All seed data inserted
-- 
-- NEXT: Add your admin user
-- Run this command (replace with your email):
-- 
-- INSERT INTO admin_users (email, full_name, role) 
-- VALUES ('your-email@example.com', 'Your Name', 'admin');
-- 
-- =====================================================
