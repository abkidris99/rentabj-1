import React, { useEffect, useState } from 'react';
import { getSiteSettings, saveSiteSettings, SiteSettings } from '../../lib/supabaseService';

export const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSiteSettings()
      .then(setSettings)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: keyof SiteSettings, value: string | boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveSiteSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
      alert('Failed to save. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="admin-loading-inline">Loading settings…</div>;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Site Settings</h2>
          <p>Changes save to Firestore and apply site-wide instantly.</p>
        </div>
        <button
          className={`admin-btn ${saved ? 'admin-btn-success' : ''}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : saved ? '✓ Saved!' : 'Save Settings'}
        </button>
      </div>

      <div className="admin-settings-grid">

        {/* Analytics & Tracking */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-section">📊 Analytics & Tracking</h3>
          <div className="admin-field">
            <label>Google Analytics ID (GA4)</label>
            <input
              type="text"
              placeholder="G-XXXXXXXXXX"
              value={settings.googleAnalyticsId ?? ''}
              onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
            />
            <span className="admin-field-hint">
              Paste your Measurement ID from Google Analytics → Admin → Data Streams
            </span>
          </div>
          <div className="admin-field">
            <label>Google Tag Manager ID</label>
            <input
              type="text"
              placeholder="GTM-XXXXXXX"
              value={settings.googleTagManagerId ?? ''}
              onChange={(e) => handleChange('googleTagManagerId', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Facebook Pixel ID</label>
            <input
              type="text"
              placeholder="123456789012345"
              value={settings.facebookPixelId ?? ''}
              onChange={(e) => handleChange('facebookPixelId', e.target.value)}
            />
          </div>
          <div className="admin-field" style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '12px', marginTop: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✨ Google Gemini API Key</span>
              <span style={{ fontSize: '0.72rem', color: '#a855f7', background: 'rgba(168,85,247,0.15)', padding: '1px 6px', borderRadius: '4px' }}>AI Blog</span>
            </label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={settings.geminiApiKey ?? ''}
              onChange={(e) => handleChange('geminiApiKey', e.target.value)}
            />
            <span className="admin-field-hint">
              Powers the 1-click AI Blog Draft Assistant. Get a free API key at <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--admin-blue)' }}>aistudio.google.com</a>
            </span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-section">📞 Contact Info</h3>
          <div className="admin-field">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="08022908212"
              value={settings.phone ?? ''}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>WhatsApp Number (with country code, no +)</label>
            <input
              type="text"
              placeholder="2348022908212"
              value={settings.whatsappNumber ?? ''}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-section">📱 Social Links</h3>
          <div className="admin-field">
            <label>Instagram URL</label>
            <input
              type="url"
              placeholder="https://instagram.com/rentabj"
              value={settings.instagramUrl ?? ''}
              onChange={(e) => handleChange('instagramUrl', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>TikTok URL</label>
            <input
              type="url"
              placeholder="https://tiktok.com/@rentabj"
              value={settings.tiktokUrl ?? ''}
              onChange={(e) => handleChange('tiktokUrl', e.target.value)}
            />
          </div>
        </div>

        {/* Business Hours */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-section">🕒 Business Hours</h3>
          <div className="admin-field">
            <label>Weekdays</label>
            <input
              type="text"
              placeholder="Mon – Fri: 8:00 AM – 6:00 PM"
              value={settings.businessHoursWeekdays ?? ''}
              onChange={(e) => handleChange('businessHoursWeekdays', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Saturday</label>
            <input
              type="text"
              placeholder="Saturday: 9:00 AM – 4:00 PM"
              value={settings.businessHoursSaturday ?? ''}
              onChange={(e) => handleChange('businessHoursSaturday', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Sunday</label>
            <input
              type="text"
              placeholder="Sunday: By Appointment"
              value={settings.businessHoursSunday ?? ''}
              onChange={(e) => handleChange('businessHoursSunday', e.target.value)}
            />
          </div>
        </div>

        {/* Hero Content */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-section">🖼️ Hero Section</h3>
          <div className="admin-field">
            <label>Hero Headline</label>
            <input
              type="text"
              placeholder="Find Your Perfect Rental in Abuja"
              value={settings.heroHeadline ?? ''}
              onChange={(e) => handleChange('heroHeadline', e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label>Hero Subtext</label>
            <input
              type="text"
              placeholder="Verified apartments, houses and commercial spaces…"
              value={settings.heroSubtext ?? ''}
              onChange={(e) => handleChange('heroSubtext', e.target.value)}
            />
          </div>
        </div>

        {/* Maintenance Mode */}
        <div className="admin-settings-card">
          <h3 className="admin-settings-section">🔧 Site Control</h3>
          <div className="admin-field admin-field-toggle">
            <label htmlFor="maintenance-toggle">Maintenance Mode</label>
            <div className="admin-toggle-wrap">
              <input
                id="maintenance-toggle"
                type="checkbox"
                className="admin-toggle"
                checked={settings.maintenanceMode ?? false}
                onChange={(e) => handleChange('maintenanceMode', e.target.checked)}
              />
              <span className="admin-toggle-label">
                {settings.maintenanceMode ? '🔴 Site is offline' : '🟢 Site is live'}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="admin-settings-save-bar">
        <button
          className={`admin-btn admin-btn-lg ${saved ? 'admin-btn-success' : ''}`}
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving…' : saved ? '✓ All changes saved!' : 'Save All Settings'}
        </button>
      </div>
    </div>
  );
};
