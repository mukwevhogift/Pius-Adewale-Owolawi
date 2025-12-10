# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **"New Project"**
4. Fill in:
   - **Project Name**: `prof-owolawi-portfolio`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to you (e.g., `us-east-1` or `eu-west-1`)
5. Click **"Create new project"**
6. Wait 2-3 minutes for provisioning

## Step 2: Run Database Schema

1. In your Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Open the file `supabase/schema.sql` in this project
4. Copy ALL contents
5. Paste into SQL Editor
6. Click **"Run"** (or press `Ctrl+Enter`)
7. Wait for success message: ✅ "Success. No rows returned"

## Step 3: Seed Initial Data

1. In SQL Editor, create another **"New query"**
2. Open the file `supabase/seed.sql`
3. Copy ALL contents
4. Paste into SQL Editor
5. Click **"Run"**
6. You should see: ✅ Success messages for all inserts

## Step 4: Create Storage Buckets

1. Go to **Storage** in left sidebar
2. Click **"Create a new bucket"**
3. Create these buckets (one at a time):

### Bucket 1: `publications`
- **Name**: `publications`
- **Public**: ✅ Yes (check this box)
- Click **"Create bucket"**

### Bucket 2: `speeches`
- **Name**: `speeches`
- **Public**: ✅ Yes
- Click **"Create bucket"**

### Bucket 3: `gallery`
- **Name**: `gallery`
- **Public**: ✅ Yes
- Click **"Create bucket"**

### Bucket 4: `profile`
- **Name**: `profile`
- **Public**: ✅ Yes
- Click **"Create bucket"**

## Step 5: Add Your Admin User

1. Go back to **SQL Editor**
2. Create a **"New query"**
3. Run this (replace with your boss's email):

```sql
INSERT INTO admin_users (email, full_name, role) 
VALUES ('your-boss-email@example.com', 'Prof. Pius Owolawi', 'admin');
```

4. Click **"Run"**

## Step 6: Get API Keys

1. Go to **Settings** → **API** (left sidebar)
2. Copy these values:

### Project URL
```
https://xxxxxxxxxxxxx.supabase.co
```
**Copy this!** You'll need it for `NEXT_PUBLIC_SUPABASE_URL`

### Anon/Public Key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....(long string)
```
**Copy this!** You'll need it for `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Service Role Key (Secret!)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....(different long string)
```
**Copy this!** You'll need it for `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **IMPORTANT**: Never commit the Service Role Key to GitHub!

## Step 7: Configure Next.js Environment

1. In your project root, create or edit `.env.local`
2. Add these lines (replace with your actual keys):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

# Site URL (for redirects)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. Save the file

## Step 8: Verify Setup

1. Go to **Table Editor** in Supabase dashboard
2. You should see all these tables:
   - ✅ hero_section
   - ✅ education
   - ✅ certifications
   - ✅ awards
   - ✅ research_areas
   - ✅ publications
   - ✅ speeches
   - ✅ achievements
   - ✅ professional_memberships
   - ✅ community_initiatives
   - ✅ testimonials
   - ✅ gallery_images
   - ✅ site_settings
   - ✅ admin_users

3. Click on `education` table
4. You should see 7 rows (PhD, MSc, B.Tech, etc.)
5. Click on `awards` table
6. You should see 8 rows

If you see data, you're ready! ✅

## Step 9: Enable Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider:
   - Toggle: ✅ Enable Email provider
   - **Confirm email**: ❌ Disable this (for easier testing)
   - Click **"Save"**

## Step 10: Create Your First Admin Login

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: (same as Step 5)
   - **Password**: Create a strong password
   - **Auto Confirm User**: ✅ Yes
4. Click **"Create user"**

## ✅ Setup Complete!

You now have:
- ✅ Database with all tables
- ✅ Initial data seeded
- ✅ Storage buckets created
- ✅ Admin user configured
- ✅ Authentication enabled
- ✅ API keys ready

## Next Steps

Continue with the implementation plan:
- **Phase 2**: Configure Supabase client in Next.js
- **Phase 3**: Build admin UI
- **Phase 4**: Implement CRUD operations

## Troubleshooting

### Issue: "relation does not exist"
- **Solution**: Make sure you ran `schema.sql` first, then `seed.sql`

### Issue: "permission denied"
- **Solution**: Check RLS policies are enabled. Re-run the schema.sql file.

### Issue: Can't insert data
- **Solution**: Make sure your admin user exists in `admin_users` table with the correct email

### Issue: Storage upload fails
- **Solution**: Verify buckets are set to PUBLIC in Storage settings

## Support

If you encounter issues:
1. Check Supabase Logs (Dashboard → Logs)
2. Verify your API keys are correct
3. Ensure `.env.local` is properly formatted
4. Restart your Next.js dev server: `npm run dev`

---

**Created**: December 9, 2025  
**Last Updated**: December 9, 2025
