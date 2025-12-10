'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CertificationFormData {
  name: string;
  full_name: string;
  icon: string;
  issued_by: string;
  year: string;
  order_index: number;
}

interface CertificationFormProps {
  initialData?: Partial<CertificationFormData>;
  certificationId?: string;
}

const ICON_OPTIONS = [
  { value: 'ri-shield-check-fill', label: 'Shield Check' },
  { value: 'ri-shield-star-fill', label: 'Shield Star' },
  { value: 'ri-windows-fill', label: 'Windows' },
  { value: 'ri-wifi-fill', label: 'WiFi' },
  { value: 'ri-signal-wifi-fill', label: 'Signal WiFi' },
  { value: 'ri-flashlight-fill', label: 'Flashlight' },
  { value: 'ri-tools-fill', label: 'Tools' },
  { value: 'ri-flight-takeoff-fill', label: 'Flight' },
];

export default function CertificationForm({ initialData, certificationId }: CertificationFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<CertificationFormData>({
    name: initialData?.name || '',
    full_name: initialData?.full_name || '',
    icon: initialData?.icon || 'ri-shield-check-fill',
    issued_by: initialData?.issued_by || '',
    year: initialData?.year || '',
    order_index: initialData?.order_index || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = certificationId ? `/api/certifications/${certificationId}` : '/api/certifications';
      const method = certificationId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save certification');
      }

      router.push('/admin/certifications');
      router.refresh();
    } catch (err: any) {
      console.error('Form submission error:', err);
      setError(err.message || 'Failed to save certification');
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

      {/* Short Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Name / Acronym *
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., CCNP"
        />
      </div>

      {/* Full Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name *
        </label>
        <input
          type="text"
          required
          value={formData.full_name}
          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Cisco Certified Network Professional"
        />
      </div>

      {/* Issued By and Year */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Issued By
          </label>
          <input
            type="text"
            value={formData.issued_by}
            onChange={(e) => setFormData({ ...formData, issued_by: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Cisco Systems"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year
          </label>
          <input
            type="text"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 2020"
          />
        </div>
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
          {isSubmitting ? 'Saving...' : certificationId ? 'Update Certification' : 'Create Certification'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/certifications')}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
