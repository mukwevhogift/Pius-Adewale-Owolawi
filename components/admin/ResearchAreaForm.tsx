'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ResearchAreaFormData {
  title: string;
  icon: string;
  color: string;
  description: string;
  projects: string[];
  order_index: number;
  is_active: boolean;
}

interface ResearchAreaFormProps {
  initialData?: Partial<ResearchAreaFormData>;
  researchAreaId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-brain-line', label: 'Brain/AI' },
  { value: 'ri-signal-tower-line', label: 'Signal Tower' },
  { value: 'ri-leaf-line', label: 'Leaf/Green' },
  { value: 'ri-eye-line', label: 'Eye/Vision' },
  { value: 'ri-router-line', label: 'Router/IoT' },
  { value: 'ri-flask-line', label: 'Flask/Science' },
  { value: 'ri-cpu-line', label: 'CPU/Computing' },
  { value: 'ri-database-line', label: 'Database' },
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

export default function ResearchAreaForm({ initialData, researchAreaId }: ResearchAreaFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectInput, setProjectInput] = useState('');

  const [formData, setFormData] = useState<ResearchAreaFormData>({
    title: initialData?.title || '',
    icon: initialData?.icon || 'ri-flask-line',
    color: initialData?.color || 'from-blue-500 to-cyan-500',
    description: initialData?.description || '',
    projects: initialData?.projects || [],
    order_index: initialData?.order_index || 0,
    is_active: initialData?.is_active !== undefined ? initialData.is_active : true,
  });

  const handleAddProject = () => {
    if (projectInput.trim()) {
      setFormData({
        ...formData,
        projects: [...formData.projects, projectInput.trim()],
      });
      setProjectInput('');
    }
  };

  const handleRemoveProject = (index: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = researchAreaId ? `/api/research-areas/${researchAreaId}` : '/api/research-areas';
      const method = researchAreaId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save research area');
      }

      router.push('/admin/research-areas');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save research area');
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
          Research Area Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Artificial Intelligence & Machine Learning"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description (Optional)
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief overview of this research area..."
        />
      </div>

      {/* Projects List */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Research Projects
        </label>
        
        {/* Project Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={projectInput}
            onChange={(e) => setProjectInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddProject();
              }
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter a project name and press Enter or click Add"
          />
          <button
            type="button"
            onClick={handleAddProject}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Add
          </button>
        </div>

        {/* Projects Display */}
        {formData.projects.length > 0 && (
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            {formData.projects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-white px-4 py-3 rounded-lg border border-gray-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-medium">#{index + 1}</span>
                  <span className="text-gray-900">{project}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        
        {formData.projects.length === 0 && (
          <p className="text-sm text-gray-500 italic">No projects added yet. Add at least one project.</p>
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
          {isSubmitting ? 'Saving...' : researchAreaId ? 'Update Research Area' : 'Create Research Area'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/research-areas')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
