-- =====================================================
-- QUICK FIX: Add Admin User & Adjust RLS
-- =====================================================
-- 
-- Run this in Supabase SQL Editor AFTER you've signed up
-- Replace 'your-email@example.com' with the email you used to sign up
-- 
-- =====================================================

-- Step 1: Add your admin user (replace email with yours)
INSERT INTO admin_users (email, full_name, role) 
VALUES ('mgsamukwevho@gmail.com', 'Prof. Pius Owolawi', 'admin')
ON CONFLICT (email) DO NOTHING;

-- Step 2: Drop ALL existing policies first (both old and new)
DROP POLICY IF EXISTS "Allow admin full access" ON publications;
DROP POLICY IF EXISTS "Authenticated users full access" ON publications;

DROP POLICY IF EXISTS "Allow admin full access" ON education;
DROP POLICY IF EXISTS "Authenticated users full access" ON education;

DROP POLICY IF EXISTS "Allow admin full access" ON certifications;
DROP POLICY IF EXISTS "Authenticated users full access" ON certifications;

DROP POLICY IF EXISTS "Allow admin full access" ON awards;
DROP POLICY IF EXISTS "Authenticated users full access" ON awards;

DROP POLICY IF EXISTS "Allow admin full access" ON research_areas;
DROP POLICY IF EXISTS "Authenticated users full access" ON research_areas;

DROP POLICY IF EXISTS "Allow admin full access" ON speeches;
DROP POLICY IF EXISTS "Authenticated users full access" ON speeches;

DROP POLICY IF EXISTS "Allow admin full access" ON achievements;
DROP POLICY IF EXISTS "Authenticated users full access" ON achievements;

DROP POLICY IF EXISTS "Allow admin full access" ON professional_memberships;
DROP POLICY IF EXISTS "Authenticated users full access" ON professional_memberships;

DROP POLICY IF EXISTS "Allow admin full access" ON community_initiatives;
DROP POLICY IF EXISTS "Authenticated users full access" ON community_initiatives;

DROP POLICY IF EXISTS "Allow admin full access" ON testimonials;
DROP POLICY IF EXISTS "Authenticated users full access" ON testimonials;

DROP POLICY IF EXISTS "Allow admin full access" ON gallery_images;
DROP POLICY IF EXISTS "Authenticated users full access" ON gallery_images;

DROP POLICY IF EXISTS "Allow admin full access" ON site_settings;
DROP POLICY IF EXISTS "Authenticated users full access" ON site_settings;

DROP POLICY IF EXISTS "Allow admin full access" ON hero_section;
DROP POLICY IF EXISTS "Authenticated users full access" ON hero_section;

-- Step 3: Create new policies for all tables
CREATE POLICY "Authenticated users full access" ON publications FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON education FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON certifications FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON awards FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON research_areas FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON speeches FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON achievements FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON professional_memberships FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON community_initiatives FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON testimonials FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON gallery_images FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON site_settings FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users full access" ON hero_section FOR ALL USING (auth.uid() IS NOT NULL);

-- =====================================================
-- DONE!
-- =====================================================
-- 
-- Now you can:
-- 1. Sign up at /login with your email
-- 2. Replace 'your-email@example.com' above with your actual email
-- 3. Run this SQL
-- 4. Refresh your admin dashboard
-- 5. Try creating a publication again
-- 
-- =====================================================
