import React, { useEffect, useState } from 'react';
import {
  getProperties,
  saveProperty,
  updateProperty,
  deleteProperty,
  PropertyDoc,
  generateUniquePropertySlug,
} from '../../lib/supabaseService';
import { featuredProperties } from '../../data/properties';

const PRESET_IMAGES = [
  { label: 'Modern Flat', url: '/images/properties/karsana.jpg' },
  { label: 'Spacious Apt', url: '/images/properties/jahi.jpg' },
  { label: 'Duplex', url: '/images/properties/dawaki.jpg' },
  { label: 'Studio', url: '/images/properties/gwarinpa.jpg' },
  { label: 'Cozy 1-Bed', url: '/images/properties/lifecamp.jpg' },
  { label: 'Office Space', url: '/images/properties/wuse.jpg' },
];

const INITIAL_FORM: Omit<PropertyDoc, 'id' | 'created_at'> = {
  slug: undefined,
  title: '',
  location: '',
  price: '₦2,500,000',
  period: '/ yr',
  bedrooms: '2 Bedrooms',
  description: '',
  image: '/images/properties/karsana.jpg',
  tag: 'Featured',
  whatsappMessage: '',
  available: true,
};

export const AdminProperties: React.FC = () => {
  const [properties, setProperties] = useState<PropertyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'rented'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<PropertyDoc, 'id' | 'created_at'>>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);
  const [seeding, setSeeding] = useState(false);

  const fetchProps = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getProperties();
      setProperties(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProps();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (prop: PropertyDoc) => {
    setEditingId(prop.id || null);
    setForm({
      slug: prop.slug,
      title: prop.title,
      location: prop.location,
      price: prop.price,
      period: prop.period || '/ yr',
      bedrooms: prop.bedrooms,
      description: prop.description,
      image: prop.image,
      tag: prop.tag,
      whatsappMessage: prop.whatsappMessage,
      available: prop.available,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.location.trim() || !form.price.trim()) {
      alert('Please fill in title, location, and price');
      return;
    }

    try {
      setSaving(true);
      
      let finalSlug = form.slug;
      if (editingId) {
        const original = properties.find(p => p.id === editingId);
        // If identity changed or no slug exists, generate new one
        if (!finalSlug || (original && (original.title !== form.title || original.location !== form.location))) {
          finalSlug = await generateUniquePropertySlug(form.title, form.location, editingId);
        }
      } else {
        // New property
        finalSlug = await generateUniquePropertySlug(form.title, form.location);
      }

      const payload = {
        ...form,
        slug: finalSlug,
        whatsappMessage:
          form.whatsappMessage.trim() ||
          `Hi, I'm interested in the ${form.title} in ${form.location}`,
      };

      if (editingId) {
        await updateProperty(editingId, payload);
        setFeedback('Property updated successfully!');
      } else {
        await saveProperty(payload);
        setFeedback('Property listing created successfully!');
      }

      setIsModalOpen(false);
      await fetchProps();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Error saving property');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleAvailable = async (prop: PropertyDoc) => {
    if (!prop.id) return;
    try {
      const nextStatus = !prop.available;
      await updateProperty(prop.id, { available: nextStatus });
      setProperties((prev) =>
        prev.map((p) => (p.id === prop.id ? { ...p, available: nextStatus } : p))
      );
      setFeedback(
        `Listing marked as ${nextStatus ? 'Available' : 'Rented'}`
      );
      setTimeout(() => setFeedback(null), 2500);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (prop: PropertyDoc) => {
    if (!prop.id) return;
    if (!window.confirm(`Are you sure you want to delete "${prop.title}"?`)) return;

    try {
      await deleteProperty(prop.id);
      setProperties((prev) => prev.filter((p) => p.id !== prop.id));
      setFeedback('Property removed');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err: any) {
      alert(err.message || 'Failed to delete property');
    }
  };

  // Seed standard Abuja demo properties from site data
  const handleSeedDefaults = async () => {
    if (!window.confirm('Import 6 default Abuja properties into your database?')) return;
    try {
      setSeeding(true);
      for (const item of featuredProperties) {
        await saveProperty({
          title: item.title,
          location: item.location,
          price: item.price,
          period: item.period,
          bedrooms: item.bedrooms,
          description: item.description,
          image: item.image,
          tag: item.tag,
          whatsappMessage: item.whatsappMessage,
          available: true,
        });
      }
      setFeedback('Successfully imported 6 Abuja listings!');
      await fetchProps();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Failed to import default properties');
    } finally {
      setSeeding(false);
    }
  };

  const filteredProperties = properties.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.bedrooms.toLowerCase().includes(q) ||
      p.tag.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'available' && p.available) ||
      (statusFilter === 'rented' && !p.available);

    return matchesSearch && matchesStatus;
  });

  const availableCount = properties.filter((p) => p.available).length;
  const rentedCount = properties.filter((p) => !p.available).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Properties Manager</h2>
          <p>Create, update, and manage property listings displayed across your website.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {properties.length === 0 && !loading && (
            <button
              onClick={handleSeedDefaults}
              disabled={seeding}
              className="admin-btn admin-btn-outline"
            >
              {seeding ? 'Importing…' : '📥 Import 6 Demo Listings'}
            </button>
          )}
          <button onClick={openAddModal} className="admin-btn admin-btn-success">
            + Add Property
          </button>
        </div>
      </div>

      {feedback && (
        <div style={{
          background: 'rgba(34,197,94,0.15)',
          border: '1px solid rgba(34,197,94,0.3)',
          color: '#86efac',
          padding: '12px 18px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>✅</span>
          <span>{feedback}</span>
        </div>
      )}

      {error && <div className="admin-error" style={{ marginBottom: '20px' }}>{error}</div>}

      {/* Filter and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div className="admin-filter-tabs" style={{ marginBottom: 0 }}>
          <button
            className={`admin-filter-tab ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All <span className="admin-tab-count">{properties.length}</span>
          </button>
          <button
            className={`admin-filter-tab ${statusFilter === 'available' ? 'active' : ''}`}
            onClick={() => setStatusFilter('available')}
          >
            Available <span className="admin-tab-count">{availableCount}</span>
          </button>
          <button
            className={`admin-filter-tab ${statusFilter === 'rented' ? 'active' : ''}`}
            onClick={() => setStatusFilter('rented')}
          >
            Rented <span className="admin-tab-count">{rentedCount}</span>
          </button>
        </div>

        <div style={{ width: '100%', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Search listings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid var(--admin-border)',
              borderRadius: '7px',
              padding: '8px 12px',
              color: 'var(--admin-text)',
              fontSize: '0.86rem',
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loading-inline">
          <div className="admin-spinner" style={{ margin: '0 auto 12px' }} />
          Loading property listings…
        </div>
      ) : filteredProperties.length === 0 ? (
        <div className="admin-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🏘️</div>
          <h3>No properties found</h3>
          <p style={{ margin: '6px 0 18px', color: 'var(--admin-text-soft)' }}>
            {searchQuery
              ? 'No listings match your search.'
              : properties.length === 0
              ? 'Your properties database is currently empty.'
              : 'No listings in this filter category.'}
          </p>
          {properties.length === 0 && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={handleSeedDefaults} disabled={seeding} className="admin-btn admin-btn-outline">
                {seeding ? 'Importing…' : '📥 Import 6 Demo Listings'}
              </button>
              <button onClick={openAddModal} className="admin-btn admin-btn-success">
                + Add Your First Property
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="admin-props-grid">
          {filteredProperties.map((prop) => (
            <div key={prop.id} className="admin-prop-card">
              <div className="admin-prop-media">
                <img
                  src={prop.image || '/images/properties/karsana.jpg'}
                  alt={prop.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      '/images/properties/karsana.jpg';
                  }}
                />
                <span className="admin-prop-tag">{prop.tag || prop.location}</span>
                <span className={`admin-prop-status-tag ${prop.available ? 'admin-prop-status-avail' : 'admin-prop-status-rented'}`}>
                  {prop.available ? '● Available' : '● Rented'}
                </span>
                <span className="admin-prop-price-badge">
                  {prop.price} <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-soft)' }}>{prop.period}</span>
                </span>
              </div>

              <div className="admin-prop-body">
                <div className="admin-prop-title">{prop.title}</div>
                <div className="admin-prop-meta">
                  <span>📍 {prop.location}</span>
                  <span>🛏 {prop.bedrooms}</span>
                </div>
                <div className="admin-prop-desc">{prop.description || 'No description provided.'}</div>

                <div className="admin-prop-actions">
                  <button
                    onClick={() => handleToggleAvailable(prop)}
                    className="admin-btn admin-btn-outline"
                    style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                    title="Toggle Available / Rented"
                  >
                    {prop.available ? 'Mark as Rented' : 'Mark Available'}
                  </button>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => openEditModal(prop)}
                      className="admin-btn"
                      style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prop)}
                      className="admin-btn admin-btn-danger"
                      style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Property Listing' : 'Add New Property Listing'}</h3>
              <button className="admin-modal-close" onClick={closeModal}>✕</button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'contents' }}>
              <div className="admin-modal-body">
                <div className="admin-field">
                  <label>Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern 2 Bedroom Flat with BQ"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Location / District *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karsana, Jahi, Guzape, Maitama"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Bedrooms / Unit Type *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2 Bedrooms, 4-Bed Duplex, Studio"
                      value={form.bedrooms}
                      onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Price *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ₦2.5M or ₦3,000,000"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Billing Period</label>
                    <select
                      value={form.period}
                      onChange={(e) => setForm({ ...form, period: e.target.value })}
                    >
                      <option value="/ yr">/ yr (Annual)</option>
                      <option value="/ month">/ month (Monthly)</option>
                      <option value="/ day">/ day (Shortlet)</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Tag / Badge</label>
                    <input
                      type="text"
                      placeholder="e.g. Featured, Newly Built, Serviced"
                      value={form.tag}
                      onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    />
                  </div>
                  <div className="admin-field">
                    <label>Status</label>
                    <div style={{ display: 'flex', alignItems: 'center', height: '42px', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                        <input
                          type="checkbox"
                          checked={form.available}
                          onChange={(e) => setForm({ ...form, available: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span>Available for rent</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="admin-field">
                  <label>Image URL</label>
                  <input
                    type="url"
                    placeholder="/images/properties/..."
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--admin-text-soft)', alignSelf: 'center' }}>
                      Quick sample photos:
                    </span>
                    {PRESET_IMAGES.map((preset) => (
                      <button
                        type="button"
                        key={preset.label}
                        className="admin-img-preset-btn"
                        onClick={() => setForm({ ...form, image: preset.url })}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="admin-img-preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="admin-field">
                  <label>Property Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe amenities, fittings, estate security, water, power, etc."
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>Custom WhatsApp Enquiry Message</label>
                  <input
                    type="text"
                    placeholder={`Hi, I'm interested in the ${form.title || 'property'}`}
                    value={form.whatsappMessage}
                    onChange={(e) => setForm({ ...form, whatsappMessage: e.target.value })}
                  />
                  <span className="admin-field-hint">
                    When a lead clicks "WhatsApp Enquiry", this message is pre-filled in their chat.
                  </span>
                </div>
              </div>

              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn admin-btn-outline"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn admin-btn-success"
                  disabled={saving}
                >
                  {saving ? 'Saving…' : editingId ? 'Update Property' : 'Save Property'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
