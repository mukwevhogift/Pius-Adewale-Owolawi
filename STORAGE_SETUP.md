# Supabase Storage Setup

## Quick Fix for Upload Error

The upload is failing because storage buckets don't exist yet. Follow these steps:

### 1. Create Storage Buckets

Go to your Supabase Dashboard → Storage → Create a new bucket

Create these buckets:

**Bucket 1: `publications`**
- Name: `publications`
- Public bucket: ✅ Yes (checked)
- Allowed MIME types: Leave empty (allow all)
- Max file size: 50MB

**Bucket 2: `images`**
- Name: `images`
- Public bucket: ✅ Yes (checked)
- Allowed MIME types: Leave empty (allow all)
- Max file size: 10MB

### 2. Set Storage Policies (SQL Editor)

After creating the buckets, run this in SQL Editor:

```sql
-- Allow public read access to files
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id IN ('publications', 'images') );

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK ( 
  bucket_id IN ('publications', 'images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING ( 
  bucket_id IN ('publications', 'images') 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING ( 
  bucket_id IN ('publications', 'images') 
  AND auth.role() = 'authenticated'
);
```

### 3. Alternative: Allow Anonymous Upload (For Testing)

If you want to allow uploads without authentication (easier for testing):

```sql
-- Allow anyone to upload
CREATE POLICY "Anyone can upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id IN ('publications', 'images') );
```

### 4. Verify Setup

After creating buckets and policies:

1. Restart your dev server: `Ctrl+C` then `npm run dev`
2. Try uploading a PDF again
3. Check the terminal for any error messages

### Troubleshooting

**If you still see "Upload failed":**

1. Check browser console (F12) for detailed error
2. Check your terminal running `npm run dev` for server-side errors
3. Verify in Supabase Dashboard → Storage that buckets exist
4. Check Supabase Dashboard → Storage → Policies tab

**Common Issues:**

- **Bucket doesn't exist**: Create it in Dashboard → Storage
- **Permission denied**: Add the storage policies above
- **File too large**: Check bucket max file size settings
- **Wrong MIME type**: Remove MIME type restrictions in bucket settings

### Quick Test

Try this in your browser console on the admin page:

```javascript
// Test file upload
const formData = new FormData();
formData.append('file', new File(['test'], 'test.txt', { type: 'text/plain' }));
formData.append('bucket', 'publications');

fetch('/api/upload', {
  method: 'POST',
  body: formData
}).then(r => r.json()).then(console.log);
```

If this works, the problem is with PDF file handling. If it fails, the problem is with storage setup.
