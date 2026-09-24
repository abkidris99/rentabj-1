import React, { useEffect, useState } from 'react';
import {
  getArticles,
  saveArticle,
  updateArticle,
  deleteArticle,
  ArticleDoc,
} from '../../lib/supabaseService';

const CATEGORIES = [
  { name: 'Renting Guide', slug: 'guides' },
  { name: 'Neighborhoods', slug: 'neighborhoods' },
  { name: 'Tenant Advisory', slug: 'legal' },
  { name: 'Market Trends', slug: 'market' },
];

const PRESET_IMAGES = [
  { label: 'Rental Agreement', url: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Abuja Skyline', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Apartment Keys', url: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1200&auto=format&fit=crop' },
  { label: 'Interior Living', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop' },
];

const INITIAL_FORM: Omit<ArticleDoc, 'id' | 'created_at' | 'updated_at'> = {
  title: '',
  category: 'Renting Guide',
  categorySlug: 'guides',
  readTime: '4 min read',
  date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  author: 'RentABJ Advisory Team',
  excerpt: '',
  image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop',
  tags: 'abuja rentals real estate guide',
  content: '<p>Write your article content here. You can use standard HTML like &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, and &lt;li&gt;.</p>',
  published: true,
};

export const AdminBlog: React.FC = () => {
  const [articles, setArticles] = useState<ArticleDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<ArticleDoc, 'id' | 'created_at' | 'updated_at'>>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);

  const fetchArticlesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticles();
      setArticles(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesData();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setIsModalOpen(true);
  };

  const openEditModal = (article: ArticleDoc) => {
    setEditingId(article.id || null);
    setForm({
      title: article.title,
      category: article.category,
      categorySlug: article.categorySlug,
      readTime: article.readTime,
      date: article.date,
      author: article.author,
      excerpt: article.excerpt,
      image: article.image,
      tags: article.tags,
      content: article.content,
      published: article.published,
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
    if (!form.title.trim()) {
      alert('Please provide an article title');
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await updateArticle(editingId, form);
        setFeedback('Article updated successfully!');
      } else {
        await saveArticle(form);
        setFeedback('New article published successfully!');
      }

      setIsModalOpen(false);
      await fetchArticlesData();
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      alert(err.message || 'Error saving article');
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (article: ArticleDoc) => {
    if (!article.id) return;
    try {
      const nextStatus = !article.published;
      await updateArticle(article.id, { published: nextStatus });
      setArticles((prev) =>
        prev.map((a) => (a.id === article.id ? { ...a, published: nextStatus } : a))
      );
      setFeedback(
        `Article status updated: ${nextStatus ? 'Published' : 'Moved to Drafts'}`
      );
      setTimeout(() => setFeedback(null), 2500);
    } catch (err: any) {
      alert(err.message || 'Failed to update article status');
    }
  };

  const handleDelete = async (article: ArticleDoc) => {
    if (!article.id) return;
    if (!window.confirm(`Delete article "${article.title}"?`)) return;

    try {
      await deleteArticle(article.id);
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
      setFeedback('Article deleted');
      setTimeout(() => setFeedback(null), 2500);
    } catch (err: any) {
      alert(err.message || 'Failed to delete article');
    }
  };



  const filteredArticles = articles.filter((a) => {
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.title.toLowerCase().includes(q) ||
      a.excerpt.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === 'all' || a.categorySlug === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const publishedCount = articles.filter((a) => a.published).length;
  const draftCount = articles.filter((a) => !a.published).length;

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <div>
          <h2>Blog & Knowledge Hub</h2>
          <p>Publish neighborhood guides, rental advice, and market insights for your visitors.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={openAddModal} className="admin-btn admin-btn-success">
            + New Article
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
            className={`admin-filter-tab ${categoryFilter === 'all' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('all')}
          >
            All <span className="admin-tab-count">{articles.length}</span>
          </button>
          <button
            className={`admin-filter-tab ${categoryFilter === 'guides' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('guides')}
          >
            Guides
          </button>
          <button
            className={`admin-filter-tab ${categoryFilter === 'neighborhoods' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('neighborhoods')}
          >
            Neighborhoods
          </button>
          <button
            className={`admin-filter-tab ${categoryFilter === 'legal' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('legal')}
          >
            Tenant Advisory
          </button>
          <button
            className={`admin-filter-tab ${categoryFilter === 'market' ? 'active' : ''}`}
            onClick={() => setCategoryFilter('market')}
          >
            Market Trends
          </button>
        </div>

        <div style={{ width: '100%', maxWidth: '300px' }}>
          <input
            type="text"
            placeholder="Search articles..."
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
          Loading articles…
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="admin-empty">
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✍️</div>
          <h3>No articles found</h3>
          <p style={{ margin: '6px 0 18px', color: 'var(--admin-text-soft)' }}>
            {searchQuery
              ? 'No articles match your search.'
              : articles.length === 0
              ? 'Your blog database is currently empty.'
              : 'No articles under this category.'}
          </p>
          {articles.length === 0 && (
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button onClick={openAddModal} className="admin-btn admin-btn-success">
                + Write First Article
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="admin-articles-grid">
          {filteredArticles.map((article) => (
            <div key={article.id} className="admin-article-card">
              <img
                src={article.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=300'}
                alt={article.title}
                className="admin-article-thumb"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=300';
                }}
              />

              <div className="admin-article-info">
                <div className="admin-article-header">
                  <span className="admin-article-cat">{article.category}</span>
                  <span className="admin-article-meta-txt">📅 {article.date}</span>
                  <span className="admin-article-meta-txt">⏱ {article.readTime}</span>
                  <span className="admin-article-meta-txt">✍ {article.author}</span>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '999px',
                      background: article.published ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.08)',
                      color: article.published ? 'var(--admin-green)' : 'var(--admin-text-soft)',
                    }}
                  >
                    {article.published ? '● Live' : '○ Draft'}
                  </span>
                </div>

                <div className="admin-article-title">{article.title}</div>
                <div className="admin-article-excerpt">{article.excerpt}</div>
              </div>

              <div className="admin-article-actions">
                <button
                  onClick={() => handleTogglePublish(article)}
                  className="admin-btn admin-btn-outline"
                  style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                  title="Toggle Published / Draft"
                >
                  {article.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => openEditModal(article)}
                  className="admin-btn"
                  style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(article)}
                  className="admin-btn admin-btn-danger"
                  style={{ fontSize: '0.76rem', padding: '6px 10px' }}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Article Modal */}
      {isModalOpen && (
        <div className="admin-modal-backdrop" onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div className="admin-modal" style={{ maxWidth: '780px' }}>
            <div className="admin-modal-header">
              <h3>{editingId ? 'Edit Article' : 'Write New Article'}</h3>
              <button className="admin-modal-close" onClick={closeModal}>✕</button>
            </div>

            <form onSubmit={handleSave} style={{ display: 'contents' }}>
              <div className="admin-modal-body">
                <div className="admin-field">
                  <label>Article Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5 Things to Inspect Before Paying Rent in Abuja"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Category</label>
                    <select
                      value={form.categorySlug}
                      onChange={(e) => {
                        const sel = CATEGORIES.find((c) => c.slug === e.target.value);
                        setForm({
                          ...form,
                          categorySlug: e.target.value,
                          category: sel ? sel.name : 'Renting Guide',
                        });
                      }}
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-field">
                    <label>Read Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 4 min read"
                      value={form.readTime}
                      onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Author</label>
                    <input
                      type="text"
                      placeholder="e.g. RentABJ Editorial Team"
                      value={form.author}
                      onChange={(e) => setForm({ ...form, author: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>Publication Date</label>
                    <input
                      type="text"
                      placeholder="e.g. October 2026"
                      value={form.date}
                      onChange={(e) => setForm({ ...form, date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="admin-field">
                  <label>Excerpt / Summary</label>
                  <textarea
                    rows={2}
                    placeholder="Short 1-2 sentence preview shown on card and search engines..."
                    value={form.excerpt}
                    onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>Cover Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                  />
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--admin-text-soft)', alignSelf: 'center' }}>
                      Presets:
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
                      alt="Cover Preview"
                      className="admin-img-preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  )}
                </div>

                <div className="admin-field">
                  <label>Article Content (HTML / Text)</label>
                  <textarea
                    rows={8}
                    required
                    style={{ fontFamily: 'monospace', fontSize: '0.84rem' }}
                    placeholder="<p>Paragraph 1...</p><h3>Section Title</h3><p>Paragraph 2...</p>"
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                  />
                  <span className="admin-field-hint">
                    Supports HTML tags: &lt;p&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;blockquote&gt;.
                  </span>
                </div>

                <div className="admin-form-row">
                  <div className="admin-field">
                    <label>Keywords / Tags (space or comma-separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. jahi maitama inspection caution deposit"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    />
                  </div>

                  <div className="admin-field">
                    <label>Publish Status</label>
                    <div style={{ display: 'flex', alignItems: 'center', height: '42px', gap: '10px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem' }}>
                        <input
                          type="checkbox"
                          checked={form.published}
                          onChange={(e) => setForm({ ...form, published: e.target.checked })}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <span>Publish immediately to live site</span>
                      </label>
                    </div>
                  </div>
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
                  {saving ? 'Saving…' : editingId ? 'Update Article' : 'Publish Article'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
