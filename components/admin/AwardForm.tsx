'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AwardFormData {
  title: string;
  year: string;
  organization: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
}

interface AwardFormProps {
  initialData?: Partial<AwardFormData>;
  awardId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-trophy-line', label: 'Trophy' },
  { value: 'ri-medal-line', label: 'Medal' },
  { value: 'ri-award-line', label: 'Award' },
  { value: 'ri-star-line', label: 'Star' },
  { value: 'ri-book-mark-line', label: 'Bookmark' },
  { value: 'ri-global-line', label: 'Global' },
  { value: 'ri-file-text-line', label: 'Document' },
  { value: 'ri-user-star-line', label: 'Star User' },
];

const COLOR_OPTIONS = [
  { value: 'from-yellow-500 to-orange-500', label: 'Gold' },
  { value: 'from-blue-500 to-purple-500', label: 'Blue' },
  { value: 'from-green-500 to-emerald-500', label: 'Green' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple' },
  { value: 'from-indigo-500 to-blue-500', label: 'Indigo' },
  { value: 'from-cyan-500 to-teal-500', label: 'Cyan' },
  { value: 'from-red-500 to-orange-500', label: 'Red' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink' },
];

export default function AwardForm({ initialData, awardId }: AwardFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<AwardFormData>({
    title: initialData?.title || '',
    year: initialData?.year || '',
    organization: initialData?.organization || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'ri-trophy-line',
    color: initialData?.color || 'from-yellow-500 to-orange-500',
    order_index: initialData?.order_index || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = awardId ? `/api/awards/${awardId}` : '/api/awards';
      const method = awardId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save award');
      }

      router.push('/admin/awards');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save award');
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
          Award Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Top 500 African Researchers"
        />
      </div>

      {/* Year and Organization */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <input
            type="text"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 2020 or 2020 & 2018"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Organization *
          </label>
          <input
            type="text"
            required
            value={formData.organization}
            onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Tshwane University of Technology"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the award and its significance..."
        />
      </div>

      {/* Icon Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Icon
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

      {/* Color Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Color Theme
        </label>
        <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
          {COLOR_OPTIONS.map((colorOption) => (
            <button
              key={colorOption.value}
              type="button"
              onClick={() => setFormData({ ...formData, color: colorOption.value })}
              className={`p-4 border-2 rounded-lg transition ${
                formData.color === colorOption.value
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`w-full h-8 rounded bg-gradient-to-br ${colorOption.value}`}></div>
            </button>
          ))}
        </div>
      </div>

      {/* Order Index */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Display Order
        </label>
        <input
          type="number"
          value={formData.order_index}
          onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          min="0"
        />
        <p className="text-sm text-gray-500 mt-1">Lower numbers appear first</p>
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Saving...' : awardId ? 'Update Award' : 'Create Award'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/awards')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
