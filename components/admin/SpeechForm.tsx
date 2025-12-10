'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SpeechFormData {
  title: string;
  event: string;
  date: string;
  location: string;
  type: 'keynote' | 'conference' | 'webinar' | 'workshop';
  description: string;
  video_url: string;
  slides_url: string;
  thumbnail_url: string;
}

interface SpeechFormProps {
  initialData?: Partial<SpeechFormData>;
  speechId?: string;
}

export default function SpeechForm({ initialData, speechId }: SpeechFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SpeechFormData>({
    title: initialData?.title || '',
    event: initialData?.event || '',
    date: initialData?.date || '',
    location: initialData?.location || '',
    type: initialData?.type || 'conference',
    description: initialData?.description || '',
    video_url: initialData?.video_url || '',
    slides_url: initialData?.slides_url || '',
    thumbnail_url: initialData?.thumbnail_url || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = speechId ? `/api/speeches/${speechId}` : '/api/speeches';
      const method = speechId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save speech');
      }

      router.push('/admin/speeches');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save speech');
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
          Title *
        </label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., The Future of AI in African Education"
        />
      </div>

      {/* Event */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Event *
        </label>
        <input
          type="text"
          required
          value={formData.event}
          onChange={(e) => setFormData({ ...formData, event: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., IEEE International Conference on AI"
        />
      </div>

      {/* Date and Location Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Cape Town, South Africa"
          />
        </div>
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type *
        </label>
        <select
          required
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="conference">Conference</option>
          <option value="keynote">Keynote</option>
          <option value="webinar">Webinar</option>
          <option value="workshop">Workshop</option>
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the presentation..."
        />
      </div>

      {/* Video URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Video URL
        </label>
        <input
          type="url"
          value={formData.video_url}
          onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://youtube.com/watch?v=..."
        />
      </div>

      {/* Slides URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slides URL
        </label>
        <input
          type="url"
          value={formData.slides_url}
          onChange={(e) => setFormData({ ...formData, slides_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      {/* Thumbnail URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thumbnail URL
        </label>
        <input
          type="url"
          value={formData.thumbnail_url}
          onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="https://..."
        />
      </div>

      {/* Submit Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {isSubmitting ? 'Saving...' : speechId ? 'Update Speech' : 'Create Speech'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/speeches')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
