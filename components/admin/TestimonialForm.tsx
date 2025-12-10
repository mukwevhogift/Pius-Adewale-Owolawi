'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface TestimonialFormData {
  quote: string;
  author: string;
  role: string;
  organization: string;
  icon: string;
  image_url: string;
  order_index: number;
  is_active: boolean;
}

interface TestimonialFormProps {
  initialData?: Partial<TestimonialFormData>;
  testimonialId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-user-star-line', label: 'User Star' },
  { value: 'ri-user-smile-line', label: 'User Smile' },
  { value: 'ri-account-circle-line', label: 'Account Circle' },
  { value: 'ri-user-heart-line', label: 'User Heart' },
  { value: 'ri-user-voice-line', label: 'User Voice' },
  { value: 'ri-shield-user-line', label: 'Shield User' },
  { value: 'ri-chat-smile-line', label: 'Chat Smile' },
  { value: 'ri-quote-line', label: 'Quote' },
];

export default function TestimonialForm({ initialData, testimonialId }: TestimonialFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TestimonialFormData>({
    quote: initialData?.quote || '',
    author: initialData?.author || '',
    role: initialData?.role || '',
    organization: initialData?.organization || '',
    icon: initialData?.icon || 'ri-user-star-line',
    image_url: initialData?.image_url || '',
    order_index: initialData?.order_index || 0,
    is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = testimonialId 
        ? `/api/testimonials/${testimonialId}` 
        : '/api/testimonials';
      const method = testimonialId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save testimonial');
      }

      router.push('/admin/testimonials');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save testimonial');
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

      {/* Quote */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Testimonial Quote *
        </label>
        <textarea
          required
          value={formData.quote}
          onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter the testimonial text..."
        />
      </div>

      {/* Author and Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author Name *
          </label>
          <input
            type="text"
            required
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Dr. Jane Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role/Position *
          </label>
          <input
            type="text"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Professor, Dean"
          />
        </div>
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Organization (Optional)
        </label>
        <input
          type="text"
          value={formData.organization}
          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., University of Technology"
        />
      </div>

      {/* Image URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image URL (Optional)
        </label>
        <input
          type="url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://example.com/image.jpg"
        />
        <p className="text-sm text-gray-500 mt-1">Leave empty to use icon instead</p>
      </div>

      {/* Icon Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Icon (used if no image URL provided)
        </label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {ICON_OPTIONS.map((icon) => (
            <button
              key={icon.value}
              type="button"
              onClick={() => setFormData({ ...formData, icon: icon.value })}
              className={`p-4 border-2 rounded-lg transition ${
                formData.icon === icon.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <i className={`${icon.value} text-2xl text-gray-700`}></i>
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
            <span className="text-gray-700">Active (visible on public site)</span>
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
          {isSubmitting ? 'Saving...' : testimonialId ? 'Update Testimonial' : 'Create Testimonial'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/testimonials')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
