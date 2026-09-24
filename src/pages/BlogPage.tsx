import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogArticlesList, blogArticles } from '../data/blogArticles';
import { getArticles } from '../lib/supabaseService';
import { BlogCard } from '../components/BlogCard';
import { BlogArticle } from '../types';

interface BlogPageProps {
  onReadArticle: (articleId: string) => void;
  onShareArticle: (
    platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy',
    articleId: string
  ) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onReadArticle,
  onShareArticle,
}) => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState<string>('all');
  const [articlesList, setArticlesList] = useState<BlogArticle[]>(blogArticlesList);

  useEffect(() => {
    getArticles()
      .then((data) => {
        const published = data.filter((a) => a.published !== false);
        if (published.length > 0) {
          const mapped: BlogArticle[] = published.map((a) => ({
            id: a.id || a.title,
            title: a.title,
            category: a.category as any,
            categorySlug: a.categorySlug as any,
            readTime: a.readTime,
            date: a.date,
            author: a.author,
            excerpt: a.excerpt,
            image: a.image,
            tags: a.tags,
            content: a.content,
          }));
          setArticlesList(mapped);
        }
      })
      .catch((err) => {
        console.warn('Could not load dynamic blog articles from Supabase:', err);
      });
  }, []);

  // Check URL query param e.g. /blog?article=costs
  useEffect(() => {
    const articleParam = searchParams.get('article');
    if (articleParam) {
      onReadArticle(articleParam);
    }
  }, [searchParams, onReadArticle]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return articlesList.filter((article) => {
      const matchesCategory =
        currentCategory === 'all' || article.categorySlug === currentCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        (article.tags && article.tags.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, currentCategory, articlesList]);

  // Featured post is the first article or null
  const featuredPost = articlesList[0] || null;

  return (
    <main>
      {/* BLOG HERO */}
      <section className="blog-hero">
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--gold)' }}>
            The RentABJ Knowledge Hub
          </span>
          <h1>
            Abuja Rental Insights, Guides & <span className="accent">Archive</span>
          </h1>
          <p>
            In-depth advice on tenancy agreements, pricing breakdowns,
            neighborhood reviews, and insider tips for smooth renting across the
            Federal Capital Territory.
          </p>

          <div className="blog-controls">
            <div className="search-box">
              <span className="search-ic">🔍</span>
              <input
                type="text"
                id="searchInput"
                placeholder="Search by title, neighborhood (e.g. Jahi, Gwarinpa) or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <a href="/#property-request" className="btn btn-primary">
              Find a Rental Property
            </a>
            <Link
              to="/"
              className="btn btn-outline"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.3)',
              }}
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      {featuredPost && (
        <section className="featured-section">
          <div className="container">
            <div className="featured-card">
              <div className="featured-img">
                <img src={featuredPost.image} alt={featuredPost.title} />
                <span className="featured-badge">Featured Guide</span>
              </div>
              <div className="featured-body">
                <div className="featured-meta">
                  <span>📅 {featuredPost.date}</span>
                  <span>⏱ {featuredPost.readTime}</span>
                  <span>✍ {featuredPost.author || 'RentABJ Advisory Team'}</span>
                </div>
                <h2 className="featured-title">{featuredPost.title}</h2>
                <p className="featured-desc">{featuredPost.excerpt}</p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => onReadArticle(featuredPost.id)}
                  >
                    Read Full Guide &rarr;
                  </button>
                  <div className="featured-share-row">
                    <span
                      style={{
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: 'var(--navy)',
                      }}
                    >
                      Share:
                    </span>
                    <div className="share-btn-group" aria-label="Share article">
                      <button
                        type="button"
                        className="share-btn share-wa"
                        onClick={() => onShareArticle('whatsapp', featuredPost.id)}
                        title="Share on WhatsApp"
                        aria-label="Share on WhatsApp"
                      >
                        💬
                      </button>
                      <button
                        type="button"
                        className="share-btn share-x"
                        onClick={() => onShareArticle('twitter', featuredPost.id)}
                        title="Share on X (Twitter)"
                        aria-label="Share on X"
                      >
                        𝕏
                      </button>
                      <button
                        type="button"
                        className="share-btn share-fb"
                        onClick={() => onShareArticle('facebook', featuredPost.id)}
                        title="Share on Facebook"
                        aria-label="Share on Facebook"
                      >
                        f
                      </button>
                      <button
                        type="button"
                        className="share-btn share-copy"
                        onClick={() => onShareArticle('copy', featuredPost.id)}
                        title="Copy link"
                        aria-label="Copy link"
                      >
                        🔗
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ARCHIVE & PREVIOUS ARTICLES */}
      <section className="archive-section bg-light">
        <div className="container">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '28px',
            }}
          >
            <div>
              <span className="eyebrow">Previous & Current Articles</span>
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Articles & Neighborhood Guides
              </h2>
            </div>
            <div className="filter-tabs">
              <button
                type="button"
                className={`filter-btn ${currentCategory === 'all' ? 'active' : ''}`}
                onClick={() => setCurrentCategory('all')}
              >
                All Articles
              </button>
              <button
                type="button"
                className={`filter-btn ${currentCategory === 'guides' ? 'active' : ''}`}
                onClick={() => setCurrentCategory('guides')}
              >
                Guides
              </button>
              <button
                type="button"
                className={`filter-btn ${currentCategory === 'neighborhoods' ? 'active' : ''}`}
                onClick={() => setCurrentCategory('neighborhoods')}
              >
                Neighborhoods
              </button>
              <button
                type="button"
                className={`filter-btn ${currentCategory === 'legal' ? 'active' : ''}`}
                onClick={() => setCurrentCategory('legal')}
              >
                Tenant Advisory
              </button>
              <button
                type="button"
                className={`filter-btn ${currentCategory === 'market' ? 'active' : ''}`}
                onClick={() => setCurrentCategory('market')}
              >
                Market Trends
              </button>
            </div>
          </div>

          <div className="posts-grid" id="postsGrid">
            {filteredArticles.map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                onRead={onReadArticle}
                onShare={onShareArticle}
              />
            ))}

            {filteredArticles.length === 0 && (
              <div
                className="empty-state"
                style={{ display: 'block' }}
                id="emptyState"
              >
                No articles found matching your search. Try another keyword like
                "Jahi", "costs", or "checklist".
              </div>
            )}
          </div>

          {/* CTA BANNER */}
          <div className="blog-cta">
            <h2>Need Help Finding an Apartment in Abuja?</h2>
            <p>
              Our experienced team finds verified rental apartments, duplexes and
              commercial spaces tailored to your exact budget and location.
            </p>
            <div className="blog-cta-btns">
              <a href="/#property-request" className="btn btn-secondary">
                Submit Property Request
              </a>
              <a
                href="https://wa.me/2347071987799"
                className="btn"
                style={{ background: '#fff', color: 'var(--emerald-dark)' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat with an Agent
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
