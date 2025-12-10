'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Setting {
  id: string;
  key: string;
  value: any;
  updated_at: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [settings, setSettings] = useState<Record<string, any>>({});

  // Fetch all settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data: Setting[] = await response.json();
        // Convert array to object for easier access
        const settingsObj: Record<string, any> = {};
        data.forEach(setting => {
          settingsObj[setting.key] = setting.value;
        });
        setSettings(settingsObj);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    try {
      setSaving(true);
      setError('');

      // Check if setting exists
      const response = await fetch(`/api/settings/${key}`);
      
      if (response.ok) {
        // Update existing setting
        const updateResponse = await fetch(`/api/settings/${key}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ value }),
        });

        if (!updateResponse.ok) {
          throw new Error('Failed to update setting');
        }
      } else if (response.status === 404) {
        // Create new setting
        const createResponse = await fetch('/api/settings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key, value }),
        });

        if (!createResponse.ok) {
          throw new Error('Failed to create setting');
        }
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
      fetchSettings(); // Refresh settings
    } catch (err: any) {
      setError(err.message || 'Failed to save setting');
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, settingsToUpdate: Record<string, any>) => {
    e.preventDefault();
    
    // Update all settings in the current tab
    for (const [key, value] of Object.entries(settingsToUpdate)) {
      await updateSetting(key, value);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link 
          href="/admin/dashboard"
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 mb-4"
        >
          <i className="ri-arrow-left-line"></i>
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your site settings and preferences</p>
      </div>

      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <i className="ri-check-line text-xl"></i>
          Settings saved successfully!
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
          <i className="ri-error-warning-line text-xl"></i>
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex gap-4 px-6" aria-label="Tabs">
            {[
              { id: 'general', label: 'General', icon: 'ri-settings-line' },
              { id: 'contact', label: 'Contact Info', icon: 'ri-contacts-line' },
              { id: 'social', label: 'Social Media', icon: 'ri-share-line' },
              { id: 'seo', label: 'SEO', icon: 'ri-seo-line' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <i className={tab.icon}></i>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'general' && (
            <form onSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              handleSubmit(e, {
                site_title: formData.get('site_title'),
                site_description: formData.get('site_description'),
              });
            }}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">General Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Title
                      </label>
                      <input
                        type="text"
                        name="site_title"
                        defaultValue={settings.site_title || "Prof. Pius Owolawi - Portfolio"}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Site Description
                      </label>
                      <textarea
                        name="site_description"
                        rows={3}
                        defaultValue={settings.site_description || "Academic portfolio showcasing research, publications, and achievements"}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'contact' && (
            <form onSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              handleSubmit(e, {
                contact_email: formData.get('contact_email'),
                contact_phone: formData.get('contact_phone'),
                office_address: formData.get('office_address'),
              });
            }}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="contact_email"
                          defaultValue={settings.contact_email || ''}
                          placeholder="email@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="contact_phone"
                          defaultValue={settings.contact_phone || ''}
                          placeholder="+27 12 345 6789"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Office Address
                      </label>
                      <textarea
                        name="office_address"
                        rows={2}
                        defaultValue={settings.office_address || ''}
                        placeholder="Building, Room, Street, City, Country"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'social' && (
            <form onSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              handleSubmit(e, {
                social_linkedin: formData.get('social_linkedin'),
                social_twitter: formData.get('social_twitter'),
                social_scholar: formData.get('social_scholar'),
                social_github: formData.get('social_github'),
                social_researchgate: formData.get('social_researchgate'),
              });
            }}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Social Media Links</h2>
                  <div className="space-y-4">
                    {[
                      { icon: 'ri-linkedin-fill', label: 'LinkedIn', key: 'social_linkedin', placeholder: 'https://linkedin.com/in/...' },
                      { icon: 'ri-twitter-x-fill', label: 'Twitter/X', key: 'social_twitter', placeholder: 'https://twitter.com/...' },
                      { icon: 'ri-google-fill', label: 'Google Scholar', key: 'social_scholar', placeholder: 'https://scholar.google.com/...' },
                      { icon: 'ri-github-fill', label: 'GitHub', key: 'social_github', placeholder: 'https://github.com/...' },
                      { icon: 'ri-global-line', label: 'ResearchGate', key: 'social_researchgate', placeholder: 'https://researchgate.net/...' },
                    ].map((social) => (
                      <div key={social.key}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <i className={social.icon}></i>
                          {social.label}
                        </label>
                        <input
                          type="url"
                          name={social.key}
                          defaultValue={settings[social.key] || ''}
                          placeholder={social.placeholder}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    ))}
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'seo' && (
            <form onSubmit={(e) => {
              const formData = new FormData(e.currentTarget);
              handleSubmit(e, {
                seo_meta_title: formData.get('seo_meta_title'),
                seo_meta_description: formData.get('seo_meta_description'),
                seo_keywords: formData.get('seo_keywords'),
              });
            }}>
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="seo_meta_title"
                        defaultValue={settings.seo_meta_title || ''}
                        placeholder="Page title for search engines"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Description
                      </label>
                      <textarea
                        name="seo_meta_description"
                        rows={3}
                        defaultValue={settings.seo_meta_description || ''}
                        placeholder="Brief description for search results (150-160 characters)"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Keywords (comma-separated)
                      </label>
                      <input
                        type="text"
                        name="seo_keywords"
                        defaultValue={settings.seo_keywords || ''}
                        placeholder="engineering, research, telecommunications, AI"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
