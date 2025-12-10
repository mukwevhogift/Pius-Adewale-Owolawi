'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface GalleryFormData {
  title: string;
  image_url: string;
  alt_text: string;
  category: 'lab' | 'event' | 'award' | 'research' | 'other';
  order_index: number;
  is_active: boolean;
}

interface GalleryFormProps {
  initialData?: Partial<GalleryFormData>;
  imageId?: string;
}

const CATEGORY_OPTIONS = [
  { value: 'lab', label: 'Laboratory & Equipment', icon: 'ri-flask-line' },
  { value: 'event', label: 'Events & Conferences', icon: 'ri-calendar-event-line' },
  { value: 'award', label: 'Awards & Ceremonies', icon: 'ri-trophy-line' },
  { value: 'research', label: 'Research & Projects', icon: 'ri-microscope-line' },
  { value: 'other', label: 'Other', icon: 'ri-image-line' },
];

export default function GalleryForm({ initialData, imageId }: GalleryFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<GalleryFormData>({
    title: initialData?.title || '',
    image_url: initialData?.image_url || '',
    alt_text: initialData?.alt_text || '',
    category: initialData?.category || 'other',
    order_index: initialData?.order_index || 0,
    is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = imageId 
        ? `/api/gallery-images/${imageId}` 
        : '/api/gallery-images';
      const method = imageId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save image');
      }

      router.push('/admin/gallery');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save image');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Laboratory Equipment 2024"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL *
        </label>
        <input
          type="url"
          required
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-sm text-gray-500 mt-1">
          Upload images to Supabase Storage or provide external URL
        </p>
      </div>

      {/* Image Preview */}
      {formData.image_url && (
        <div className="border-2 border-gray-200 rounded-lg p-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preview
          </label>
          <img
            src={formData.image_url}
            alt="Preview"
            className="max-w-full h-auto max-h-64 rounded-lg object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
            }}
          />
        </div>
      )}

      {/* Alt Text */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Alt Text (for accessibility) *
        </label>
        <textarea
          required
          value={formData.alt_text}
          onChange={(e) => setFormData({ ...formData, alt_text: e.target.value })}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Describe the image for screen readers..."
        />
      </div>

      {/* Category Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CATEGORY_OPTIONS.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat.value as any })}
              className={`p-4 border-2 rounded-lg transition text-center ${
                formData.category === cat.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <i className={`${cat.icon} text-2xl text-gray-700 block mb-2`}></i>
              <span className="text-xs font-medium text-gray-700">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Order and Active Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
          />
          <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Active (visible in gallery)</span>
          </label>
        </div>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Saving...' : imageId ? 'Update Image' : 'Upload Image'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/gallery')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
