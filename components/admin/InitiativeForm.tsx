'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface InitiativeFormData {
  title: string;
  description: string;
  icon: string;
  color: string;
  order_index: number;
  is_active: boolean;
}

interface InitiativeFormProps {
  initialData?: Partial<InitiativeFormData>;
  initiativeId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-heart-line', label: 'Heart' },
  { value: 'ri-team-line', label: 'Team' },
  { value: 'ri-hand-heart-line', label: 'Hand Heart' },
  { value: 'ri-community-line', label: 'Community' },
  { value: 'ri-seedling-line', label: 'Seedling' },
  { value: 'ri-earth-line', label: 'Earth' },
  { value: 'ri-lightbulb-line', label: 'Lightbulb' },
  { value: 'ri-book-open-line', label: 'Book' },
];

const COLOR_OPTIONS = [
  { value: 'from-blue-500 to-purple-500', label: 'Blue Purple' },
  { value: 'from-green-500 to-teal-500', label: 'Green Teal' },
  { value: 'from-pink-500 to-rose-500', label: 'Pink Rose' },
  { value: 'from-orange-500 to-red-500', label: 'Orange Red' },
  { value: 'from-indigo-500 to-blue-500', label: 'Indigo Blue' },
  { value: 'from-yellow-500 to-orange-500', label: 'Yellow Orange' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple Pink' },
  { value: 'from-cyan-500 to-blue-500', label: 'Cyan Blue' },
];

export default function InitiativeForm({ initialData, initiativeId }: InitiativeFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<InitiativeFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    icon: initialData?.icon || 'ri-heart-line',
    color: initialData?.color || 'from-blue-500 to-purple-500',
    order_index: initialData?.order_index || 0,
    is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = initiativeId 
        ? `/api/community-initiatives/${initiativeId}` 
        : '/api/community-initiatives';
      const method = initiativeId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save initiative');
      }

      router.push('/admin/community-initiatives');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save initiative');
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
          Initiative Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., STEM Education for Rural Communities"
        />
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
          placeholder="Describe the community initiative, its goals, and impact..."
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
          {isSubmitting ? 'Saving...' : initiativeId ? 'Update Initiative' : 'Create Initiative'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/community-initiatives')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
