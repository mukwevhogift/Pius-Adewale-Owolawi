'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface EducationFormData {
  degree: string;
  institution: string;
  country: string;
  year_start: string;
  year_end: string;
  specialization: string;
  icon: string;
  color: string;
  bg_color: string;
  order_index: number;
  is_ongoing: boolean;
}

interface EducationFormProps {
  initialData?: Partial<EducationFormData>;
  educationId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-graduation-cap-fill', label: 'Graduation Cap' },
  { value: 'ri-medal-fill', label: 'Medal' },
  { value: 'ri-award-fill', label: 'Award' },
  { value: 'ri-robot-fill', label: 'Robot' },
  { value: 'ri-brain-fill', label: 'Brain' },
  { value: 'ri-bar-chart-fill', label: 'Chart' },
  { value: 'ri-book-open-fill', label: 'Book' },
  { value: 'ri-flask-fill', label: 'Flask' },
];

const COLOR_OPTIONS = [
  { value: 'from-blue-600 to-cyan-600', bg: 'from-blue-50 to-cyan-50', label: 'Blue' },
  { value: 'from-purple-600 to-pink-600', bg: 'from-purple-50 to-pink-50', label: 'Purple' },
  { value: 'from-green-600 to-emerald-600', bg: 'from-green-50 to-emerald-50', label: 'Green' },
  { value: 'from-orange-600 to-red-600', bg: 'from-orange-50 to-red-50', label: 'Orange' },
  { value: 'from-indigo-600 to-purple-600', bg: 'from-indigo-50 to-purple-50', label: 'Indigo' },
  { value: 'from-teal-600 to-cyan-600', bg: 'from-teal-50 to-cyan-50', label: 'Teal' },
  { value: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50', label: 'Emerald' },
];

export default function EducationForm({ initialData, educationId }: EducationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EducationFormData>({
    degree: initialData?.degree || '',
    institution: initialData?.institution || '',
    country: initialData?.country || '',
    year_start: initialData?.year_start || '',
    year_end: initialData?.year_end || '',
    specialization: initialData?.specialization || '',
    icon: initialData?.icon || 'ri-graduation-cap-fill',
    color: initialData?.color || 'from-blue-600 to-cyan-600',
    bg_color: initialData?.bg_color || 'from-blue-50 to-cyan-50',
    order_index: initialData?.order_index || 0,
    is_ongoing: initialData?.is_ongoing || false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = educationId ? `/api/education/${educationId}` : '/api/education';
      const method = educationId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save education record');
      }

      router.push('/admin/education');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save education record');
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

      {/* Degree */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Degree / Qualification *
        </label>
        <input
          type="text"
          required
          value={formData.degree}
          onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., PhD in Electronic Engineering"
        />
      </div>

      {/* Institution and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Institution *
          </label>
          <input
            type="text"
            required
            value={formData.institution}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., University of KwaZulu-Natal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <input
            type="text"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., South Africa"
          />
        </div>
      </div>

      {/* Years */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Start Year *
          </label>
          <input
            type="text"
            required
            value={formData.year_start}
            onChange={(e) => setFormData({ ...formData, year_start: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2020"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            End Year
          </label>
          <input
            type="text"
            value={formData.year_end}
            onChange={(e) => setFormData({ ...formData, year_end: e.target.value })}
            disabled={formData.is_ongoing}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="2024"
          />
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.is_ongoing}
              onChange={(e) => setFormData({ 
                ...formData, 
                is_ongoing: e.target.checked,
                year_end: e.target.checked ? '' : formData.year_end
              })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Currently Pursuing</span>
          </label>
        </div>
      </div>

      {/* Specialization */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Specialization / Focus *
        </label>
        <textarea
          required
          value={formData.specialization}
          onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the specialization area..."
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
        <div className="grid grid-cols-3 md:grid-cols-7 gap-3">
          {COLOR_OPTIONS.map((colorOption) => (
            <button
              key={colorOption.value}
              type="button"
              onClick={() => setFormData({ 
                ...formData, 
                color: colorOption.value,
                bg_color: colorOption.bg
              })}
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
          {isSubmitting ? 'Saving...' : educationId ? 'Update Education' : 'Create Education'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/education')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
