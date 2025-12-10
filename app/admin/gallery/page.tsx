import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function GalleryPage() {
  const supabase = await createClient();

  const { data: images, error } = await supabase
    .from('gallery_images')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error fetching gallery images:', error);
  }

  // Group images by category
  const groupedImages = images?.reduce((acc: any, image: any) => {
    const category = image.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(image);
    return acc;
  }, {}) || {};

  const categoryLabels: Record<string, string> = {
    lab: 'Laboratory & Equipment',
    event: 'Events & Conferences',
    award: 'Awards & Ceremonies',
    research: 'Research & Projects',
    other: 'Other',
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
          <p className="text-gray-600 mt-2">Manage gallery images and photos</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <i className="ri-upload-line text-xl"></i>
          Upload Image
        </Link>
      </div>

      {images && images.length > 0 ? (
        <div className="space-y-8">
          {Object.entries(groupedImages).map(([category, categoryImages]: [string, any]) => (
            <div key={category}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <i className="ri-folder-image-line text-blue-600"></i>
                {categoryLabels[category] || category}
                <span className="text-sm font-normal text-gray-500">
                  ({categoryImages.length} {categoryImages.length === 1 ? 'image' : 'images'})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryImages.map((image: any) => (
                  <div
                    key={image.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden group"
                  >
                    <div className="relative aspect-video overflow-hidden bg-gray-100">
                      <img
                        src={image.image_url}
                        alt={image.alt_text}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-2 right-2 flex gap-2">
                        {image.is_active ? (
                          <span className="px-2 py-1 text-xs font-semibold bg-green-500 text-white rounded-full">
                            Active
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold bg-gray-500 text-white rounded-full">
                            Inactive
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 truncate">{image.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{image.alt_text}</p>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                        <span className="text-xs text-gray-500">Order: {image.order_index}</span>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/gallery/${image.id}/edit`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <i className="ri-edit-line text-lg"></i>
                          </Link>
                          <DeleteButton
                            id={image.id}
                            type="gallery-image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <i className="ri-image-line text-6xl text-gray-400 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
          <p className="text-gray-600 mb-6">Get started by uploading your first image.</p>
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            <i className="ri-upload-line text-xl"></i>
            Upload Image
          </Link>
        </div>
      )}
    </div>
  );
}
