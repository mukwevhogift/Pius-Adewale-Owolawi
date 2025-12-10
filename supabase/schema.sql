-- =====================================================
-- SUPABASE DATABASE SCHEMA
-- Prof. Pius Owolawi Portfolio CMS
-- =====================================================
-- 
-- INSTRUCTIONS:
-- 1. Go to your Supabase project dashboard
-- 2. Navigate to SQL Editor
-- 3. Create a new query
-- 4. Copy and paste this entire file
-- 5. Run the query
-- 6. All tables, indexes, and RLS policies will be created
--
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

-- Hero Section (Single row - site header)
CREATE TABLE hero_section (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    name TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    stats JSONB DEFAULT '{"publications": 200, "funding": "R94M+"}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education & Qualifications
CREATE TABLE education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    country TEXT NOT NULL,
    year_start TEXT NOT NULL,
    year_end TEXT,
    specialization TEXT NOT NULL,
    icon TEXT DEFAULT 'ri-graduation-cap-fill',
    color TEXT DEFAULT 'from-blue-600 to-cyan-600',
    bg_color TEXT DEFAULT 'from-blue-50 to-cyan-50',
    order_index INTEGER DEFAULT 0,
    is_ongoing BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professional Certifications
CREATE TABLE certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    icon TEXT DEFAULT 'ri-shield-check-fill',
    issued_by TEXT,
    year TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Awards & Recognition
CREATE TABLE awards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    year TEXT NOT NULL,
    organization TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'ri-trophy-line',
    color TEXT DEFAULT 'from-yellow-500 to-orange-500',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Research Areas
CREATE TABLE research_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    icon TEXT DEFAULT 'ri-flask-line',
    color TEXT DEFAULT 'from-blue-500 to-cyan-500',
    description TEXT,
    projects JSONB DEFAULT '[]',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Publications (Papers, Journals, Conference Papers)
CREATE TABLE publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    journal TEXT NOT NULL,
    year TEXT NOT NULL,
    doi TEXT,
    pdf_url TEXT,
    citation_count INTEGER DEFAULT 0,
    type TEXT CHECK (type IN ('journal', 'conference', 'book')) DEFAULT 'journal',
    abstract TEXT,
    keywords TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Speeches & Presentations
CREATE TABLE speeches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    event TEXT NOT NULL,
    date TIMESTAMPTZ NOT NULL,
    location TEXT NOT NULL,
    description TEXT,
    video_url TEXT,
    slides_url TEXT,
    thumbnail_url TEXT,
    type TEXT CHECK (type IN ('keynote', 'conference', 'webinar', 'workshop')) DEFAULT 'conference',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Achievements & Statistics
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    count TEXT NOT NULL,
    icon TEXT DEFAULT 'ri-star-line',
    color TEXT DEFAULT 'from-blue-500 to-cyan-500',
    details JSONB DEFAULT '[]',
    category TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Professional Memberships
CREATE TABLE professional_memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    registration_no TEXT NOT NULL,
    year TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Community Initiatives
CREATE TABLE community_initiatives (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'ri-heart-line',
    color TEXT DEFAULT 'from-blue-500 to-purple-500',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quote TEXT NOT NULL,
    author TEXT NOT NULL,
    role TEXT NOT NULL,
    organization TEXT,
    icon TEXT DEFAULT 'ri-user-star-line',
    image_url TEXT,
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    image_url TEXT NOT NULL,
    alt_text TEXT NOT NULL,
    category TEXT CHECK (category IN ('lab', 'event', 'award', 'research', 'other')) DEFAULT 'other',
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings (Key-Value store)
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Users (for role-based access)
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('admin', 'editor', 'viewer')) DEFAULT 'admin',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES (for better query performance)
-- =====================================================

CREATE INDEX idx_education_order ON education(order_index);
CREATE INDEX idx_certifications_order ON certifications(order_index);
CREATE INDEX idx_awards_year ON awards(year DESC);
CREATE INDEX idx_awards_order ON awards(order_index);
CREATE INDEX idx_publications_year ON publications(year DESC);
CREATE INDEX idx_publications_type ON publications(type);
CREATE INDEX idx_speeches_date ON speeches(date DESC);
CREATE INDEX idx_research_areas_active ON research_areas(is_active, order_index);
CREATE INDEX idx_achievements_category ON achievements(category);
CREATE INDEX idx_gallery_category ON gallery_images(category, is_active);
CREATE INDEX idx_testimonials_active ON testimonials(is_active, order_index);

-- =====================================================
-- FUNCTIONS (Auto-update timestamps)
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_hero_section_updated_at BEFORE UPDATE ON hero_section FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON awards FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_research_areas_updated_at BEFORE UPDATE ON research_areas FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_speeches_updated_at BEFORE UPDATE ON speeches FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_achievements_updated_at BEFORE UPDATE ON achievements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_professional_memberships_updated_at BEFORE UPDATE ON professional_memberships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_initiatives_updated_at BEFORE UPDATE ON community_initiatives FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE speeches ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_initiatives ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access (for website visitors)
CREATE POLICY "Allow public read access" ON hero_section FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON education FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON certifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON awards FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON research_areas FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON publications FOR SELECT USING (is_published = true);
CREATE POLICY "Allow public read access" ON speeches FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON achievements FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON professional_memberships FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON community_initiatives FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);

-- Admin full access (authenticated users in admin_users table)
CREATE POLICY "Allow admin full access" ON hero_section FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON education FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON certifications FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON awards FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON research_areas FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON publications FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON speeches FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON achievements FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON professional_memberships FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON community_initiatives FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON testimonials FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON gallery_images FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin full access" ON site_settings FOR ALL USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE email = auth.jwt()->>'email')
);
CREATE POLICY "Allow admin read access" ON admin_users FOR SELECT USING (
    auth.jwt()->>'email' = email
);

-- =====================================================
-- INITIAL DATA (Optional - uncomment to insert)
-- =====================================================

-- Insert default hero section
INSERT INTO hero_section (title, name, subtitle, description, image_url, stats) VALUES (
    'Distinguished Professor',
    'Prof. Pius Owolawi',
    'PhD, ECSA, MIEEE, SAIEE',
    'Prof. Pius Adewale Owolawi is a distinguished academic, engineer, and thought leader in Fourth Industrial Revolution (4IR) education and innovation.',
    '/img/prof-owolawi.jpg',
    '{"publications": 200, "funding": "R94M+"}'
);

-- =====================================================
-- STORAGE BUCKETS (Run separately in Storage section)
-- =====================================================
-- 
-- Go to Storage section in Supabase Dashboard and create:
-- 1. Bucket: 'publications' (for PDFs)
-- 2. Bucket: 'speeches' (for videos/slides)
-- 3. Bucket: 'gallery' (for images)
-- 4. Bucket: 'profile' (for profile images)
-- 
-- Set all buckets to PUBLIC access for read
-- =====================================================

-- =====================================================
-- COMPLETION NOTES
-- =====================================================
-- 
-- ✅ All tables created
-- ✅ Indexes for performance
-- ✅ Auto-updating timestamps
-- ✅ Row Level Security enabled
-- ✅ Public read access configured
-- ✅ Admin access policies set
-- 
-- NEXT STEPS:
-- 1. Create storage buckets (see above)
-- 2. Add your admin user to admin_users table
-- 3. Get your SUPABASE_URL and SUPABASE_ANON_KEY
-- 4. Add them to .env.local
-- 
-- =====================================================
