-- =====================================================
-- SAFE SEED DATA - Only inserts if data doesn't exist
-- =====================================================

-- Insert Awards (only if table is empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM awards LIMIT 1) THEN
        INSERT INTO awards (title, year, issuer, description, order_index) VALUES
        ('Top 500 African Researchers', '2015-2021', 'Continental Recognition', 'Recognized among Africa''s leading researchers for scholarly output and impact', 1),
        ('Senior Researcher of the Year', '2020 & 2018', 'Tshwane University of Technology', 'Acknowledged for sustained research excellence and high-impact outputs', 2),
        ('Most Outstanding Researcher', '2016, 2014, 2012', 'TUT Faculty of Engineering', 'Recognized for outstanding leadership in research development and postgraduate supervision', 3),
        ('Senate Research Excellence Award', '2016', 'Tshwane University of Technology', 'Conferred by University Senate for significant scholarly contributions and national visibility', 4),
        ('Vice-Chancellor''s Teaching Excellence Award', '2015', 'Tshwane University of Technology', 'Honoured for innovative teaching practices, learner engagement, and curriculum transformation', 5),
        ('BIARI Alumnus', '2013', 'Brown University, USA', 'Selected for global interdisciplinary fellowship on development, policy, and academic leadership', 6),
        ('Best Paper Award', '2012', 'ATISR Conference, Taipei', 'Joint recipient for novel contributions to wireless systems and optimization', 7),
        ('Best Engineering Mentor', '2006 & 2007', 'University of KwaZulu-Natal', 'Recognized for exceptional mentorship and student development in engineering education', 8);
        RAISE NOTICE 'Awards inserted successfully';
    ELSE
        RAISE NOTICE 'Awards already exist, skipping';
    END IF;
END $$;

-- Insert Professional Memberships (only if table is empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM professional_memberships LIMIT 1) THEN
        INSERT INTO professional_memberships (organization, role, year_joined, description, order_index) VALUES
        ('South African Institute of Electrical Engineers (SAIEE)', 'Senior Member', '2008', 'Advancing electrical and electronic engineering excellence in South Africa', 1),
        ('Institute of Electrical and Electronics Engineers (IEEE)', 'Senior Member', '2010', 'World''s largest technical professional organization for advancing technology', 2),
        ('Engineering Council of South Africa (ECSA)', 'Registered Professional Engineer', '2012', 'Statutory body regulating the engineering profession in South Africa', 3),
        ('International Association of Engineers (IAENG)', 'Member', '2014', 'Non-profit international association promoting engineering and technology', 4),
        ('Computer Society of South Africa (CSSA)', 'Member', '2015', 'Advancing computing and IT professions in South Africa', 5),
        ('South African Council for the Project Management Profession', 'Associate', '2017', 'Professional body for project and programme management in South Africa', 6);
        RAISE NOTICE 'Professional memberships inserted successfully';
    ELSE
        RAISE NOTICE 'Professional memberships already exist, skipping';
    END IF;
END $$;

-- Insert Achievements (only if table is empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM achievements LIMIT 1) THEN
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
        RAISE NOTICE 'Achievements inserted successfully';
    ELSE
        RAISE NOTICE 'Achievements already exist, skipping';
    END IF;
END $$;

-- Insert Research Areas (only if table is empty)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM research_areas LIMIT 1) THEN
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
        RAISE NOTICE 'Research areas inserted successfully';
    ELSE
        RAISE NOTICE 'Research areas already exist, skipping';
    END IF;
END $$;

-- Verify data insertion
DO $$
BEGIN
    RAISE NOTICE 'Data verification:';
    RAISE NOTICE 'Awards count: %', (SELECT COUNT(*) FROM awards);
    RAISE NOTICE 'Professional memberships count: %', (SELECT COUNT(*) FROM professional_memberships);
    RAISE NOTICE 'Achievements count: %', (SELECT COUNT(*) FROM achievements);
    RAISE NOTICE 'Research areas count: %', (SELECT COUNT(*) FROM research_areas);
END $$;
