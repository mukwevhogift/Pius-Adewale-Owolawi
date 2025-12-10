import GalleryForm from '@/components/admin/GalleryForm';
import Link from 'next/link';

export default function NewGalleryImagePage() {
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
        <h1 className="text-3xl font-bold text-gray-900">Upload New Image</h1>
        <p className="text-gray-600 mt-2">Add a new image to the gallery</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <GalleryForm />
      </div>
    </div>
  );
}
