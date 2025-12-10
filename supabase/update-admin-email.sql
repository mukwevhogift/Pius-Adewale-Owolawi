-- Update admin user email to p.owolawi@gmail.com
-- Run this in Supabase SQL Editor

-- IMPORTANT: After running this SQL script, you must also:
-- 1. Go to Authentication > Users in Supabase Dashboard
-- 2. Find or create a user with email: p.owolawi@gmail.com
-- 3. Set the password to: P@55w0rd
-- 4. Confirm the email address (mark as verified)

-- First, check if the admin user exists
DO $$
BEGIN
  -- Update existing admin user
  UPDATE admin_users 
  SET email = 'p.owolawi@gmail.com',
      full_name = 'Prof. Pius Owolawi',
      updated_at = NOW()
  WHERE role = 'admin';

  -- If no admin exists, create one
  IF NOT FOUND THEN
    INSERT INTO admin_users (email, full_name, role)
    VALUES ('p.owolawi@gmail.com', 'Prof. Pius Owolawi', 'admin');
  END IF;
END $$;

-- Verify the update
SELECT * FROM admin_users WHERE email = 'p.owolawi@gmail.com';

-- =====================================================
-- MANUAL STEPS REQUIRED IN SUPABASE DASHBOARD:
-- =====================================================
-- 1. Navigate to: Authentication > Users
-- 2. If user exists with different email, delete it OR update the email
-- 3. If user doesn't exist, click "Add user" > "Create new user"
--    - Email: p.owolawi@gmail.com
--    - Password: P@55w0rd
--    - Auto Confirm User: YES (check this box)
-- 4. Click "Create user"
-- 
-- Login credentials will be:
-- Email: p.owolawi@gmail.com
-- Password: P@55w0rd
-- =====================================================
