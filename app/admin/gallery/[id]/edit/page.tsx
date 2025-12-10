import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import GalleryForm from '@/components/admin/GalleryForm';
import Link from 'next/link';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditGalleryImagePage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: image, error } = await supabase
    .from('gallery_images')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !image) {
    console.error('Error fetching gallery image:', error);
    notFound();
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/gallery"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Gallery
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Edit Gallery Image</h1>
        <p className="text-gray-600 mt-2">Update image details</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <GalleryForm initialData={image} imageId={id} />
      </div>
    </div>
  );
}
