-- =====================================================
-- STORAGE BUCKETS
-- =====================================================

-- Create publications bucket (for publication PDFs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('publications', 'publications', true)
ON CONFLICT (id) DO NOTHING;

-- Create hero-images bucket (for hero section profile images)
INSERT INTO storage.buckets (id, name, public)
VALUES ('hero-images', 'hero-images', true)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- STORAGE POLICIES
-- =====================================================

-- Publications bucket policies
CREATE POLICY "Allow authenticated users to upload publications"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'publications' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Allow public to view publications"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'publications');

CREATE POLICY "Allow authenticated users to delete publications"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'publications' AND
  auth.uid() IS NOT NULL
);

-- Hero images bucket policies
CREATE POLICY "Allow authenticated users to upload hero images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'hero-images' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Allow public to view hero images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'hero-images');

CREATE POLICY "Allow authenticated users to delete hero images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'hero-images' AND
  auth.uid() IS NOT NULL
);

CREATE POLICY "Allow authenticated users to update hero images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'hero-images' AND
  auth.uid() IS NOT NULL
);
