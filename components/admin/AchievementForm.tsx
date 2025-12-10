'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AchievementFormData {
  title: string;
  count: string;
  icon: string;
  color: string;
  details: string[];
  category: string;
  order_index: number;
}

interface AchievementFormProps {
  initialData?: Partial<AchievementFormData>;
  achievementId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-trophy-line', label: 'Trophy' },
  { value: 'ri-star-line', label: 'Star' },
  { value: 'ri-medal-line', label: 'Medal' },
  { value: 'ri-award-line', label: 'Award' },
  { value: 'ri-graduation-cap-line', label: 'Graduation Cap' },
  { value: 'ri-user-star-line', label: 'User Star' },
  { value: 'ri-flag-line', label: 'Flag' },
  { value: 'ri-checkbox-circle-line', label: 'Checkmark' },
];

const COLOR_OPTIONS = [
  { value: 'from-blue-500 to-cyan-500', label: 'Blue' },
  { value: 'from-purple-500 to-pink-500', label: 'Purple' },
  { value: 'from-green-500 to-emerald-500', label: 'Green' },
  { value: 'from-orange-500 to-red-500', label: 'Orange' },
  { value: 'from-indigo-500 to-purple-500', label: 'Indigo' },
  { value: 'from-teal-500 to-cyan-500', label: 'Teal' },
  { value: 'from-red-500 to-pink-500', label: 'Red' },
  { value: 'from-yellow-500 to-orange-500', label: 'Yellow' },
];

export default function AchievementForm({ initialData, achievementId }: AchievementFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailInput, setDetailInput] = useState('');

  const [formData, setFormData] = useState<AchievementFormData>({
    title: initialData?.title || '',
    count: initialData?.count || '',
    icon: initialData?.icon || 'ri-trophy-line',
    color: initialData?.color || 'from-blue-500 to-cyan-500',
    details: initialData?.details || [],
    category: initialData?.category || '',
    order_index: initialData?.order_index || 0,
  });

  const handleAddDetail = () => {
    if (detailInput.trim()) {
      setFormData({
        ...formData,
        details: [...formData.details, detailInput.trim()],
      });
      setDetailInput('');
    }
  };

  const handleRemoveDetail = (index: number) => {
    setFormData({
      ...formData,
      details: formData.details.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = achievementId ? `/api/achievements/${achievementId}` : '/api/achievements';
      const method = achievementId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save achievement');
      }

      router.push('/admin/achievements');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save achievement');
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

      {/* Title and Count */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Achievement Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Research Publications"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Count/Number *
          </label>
          <input
            type="text"
            required
            value={formData.count}
            onChange={(e) => setFormData({ ...formData, count: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 150+, 25, 10K+"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <input
          type="text"
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Academic, Professional, Community Impact"
        />
      </div>

      {/* Details List */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Achievement Details
        </label>
        
        {/* Detail Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={detailInput}
            onChange={(e) => setDetailInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddDetail();
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a detail and press Enter or click Add"
          />
          <button
            type="button"
            onClick={handleAddDetail}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>

        {/* Details Display */}
        {formData.details.length > 0 && (
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            {formData.details.map((detail, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-medium">#{index + 1}</span>
                  <span className="text-gray-900">{detail}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(index)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        
        {formData.details.length === 0 && (
          <p className="text-sm text-gray-500 italic">No details added yet. Add details to highlight specific accomplishments.</p>
        )}
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          {isSubmitting ? 'Saving...' : achievementId ? 'Update Achievement' : 'Create Achievement'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/achievements')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
