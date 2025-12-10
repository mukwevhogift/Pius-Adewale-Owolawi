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
  
  // Password update states
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  // Email update states
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [updatingEmail, setUpdatingEmail] = useState(false);

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    try {
      setUpdatingPassword(true);
      const response = await fetch('/api/admin/update-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update password');
      }

      setPasswordSuccess(true);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(false), 5000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to update password');
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess(false);

    if (!newEmail) {
      setEmailError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError('Invalid email format');
      return;
    }

    try {
      setUpdatingEmail(true);
      const response = await fetch('/api/admin/update-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update email');
      }

      setEmailSuccess(true);
      setNewEmail('');
      setTimeout(() => setEmailSuccess(false), 5000);
    } catch (err: any) {
      setEmailError(err.message || 'Failed to update email');
    } finally {
      setUpdatingEmail(false);
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
            <>
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
                            Display Email Address
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
                        {saving ? 'Saving...' : 'Save Contact Info'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              {/* Account Security Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Security</h2>
                
                {/* Update Email */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-mail-line text-blue-600"></i>
                    Update Email Address
                  </h3>
                  
                  {emailSuccess && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                      <i className="ri-check-line text-xl"></i>
                      Email update initiated. Please check your new email for confirmation.
                    </div>
                  )}

                  {emailError && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                      <i className="ri-error-warning-line text-xl"></i>
                      {emailError}
                    </div>
                  )}

                  <form onSubmit={handleEmailUpdate}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Email Address
                        </label>
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          placeholder="newemail@example.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          You will receive a confirmation email at the new address
                        </p>
                      </div>
                      <button 
                        type="submit"
                        disabled={updatingEmail}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                      >
                        {updatingEmail ? 'Updating...' : 'Update Email'}
                      </button>
                    </div>
                  </form>
                </div>

                {/* Update Password */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <i className="ri-lock-password-line text-blue-600"></i>
                    Change Password
                  </h3>

                  {passwordSuccess && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg flex items-center gap-2">
                      <i className="ri-check-line text-xl"></i>
                      Password updated successfully!
                    </div>
                  )}

                  {passwordError && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center gap-2">
                      <i className="ri-error-warning-line text-xl"></i>
                      {passwordError}
                    </div>
                  )}

                  <form onSubmit={handlePasswordUpdate}>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? "text" : "password"}
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            placeholder="Enter current password"
                            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <i className={showCurrentPassword ? "ri-eye-off-line text-xl" : "ri-eye-line text-xl"}></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            placeholder="Enter new password (min. 8 characters)"
                            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <i className={showNewPassword ? "ri-eye-off-line text-xl" : "ri-eye-line text-xl"}></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password *
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            placeholder="Re-enter new password"
                            className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                          >
                            <i className={showConfirmPassword ? "ri-eye-off-line text-xl" : "ri-eye-line text-xl"}></i>
                          </button>
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={updatingPassword}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
                      >
                        {updatingPassword ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
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
