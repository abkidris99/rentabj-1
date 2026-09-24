import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogArticlesList } from '../data/blogArticles';
import { getArticles } from '../lib/supabaseService';
import { BlogCard } from './BlogCard';
import { BlogArticle } from '../types';

interface BlogSectionProps {
  onReadArticle: (articleId: string) => void;
  onShareArticle: (
    platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy',
    articleId: string
  ) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  onReadArticle,
  onShareArticle,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [articles, setArticles] = useState<BlogArticle[]>(blogArticlesList);

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
          setArticles(mapped);
        }
      })
      .catch((err) => {
        console.warn('Could not load dynamic blog articles from Supabase:', err);
      });
  }, []);

  // Display top 3 on home section
  const homeArticles = articles.slice(0, 3);

  const filteredArticles =
    activeCategory === 'all'
      ? homeArticles
      : homeArticles.filter((article) => article.categorySlug === activeCategory);

  return (
    <section id="blog">
      <div className="container">
        <span className="eyebrow">RentABJ Insights & Guides</span>
        <h2 className="section-title">
          Abuja Rental Blog & Neighborhood Guides
        </h2>
        <p className="section-sub">
          Expert advice, rental price trends, and neighborhood guides to help
          you navigate renting in Abuja with peace of mind.
        </p>

        <div
          className="blog-filter-bar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className={`blog-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Posts
            </button>
            <button
              type="button"
              className={`blog-filter-btn ${activeCategory === 'guides' ? 'active' : ''}`}
              onClick={() => setActiveCategory('guides')}
            >
              Renting Guides
            </button>
            <button
              type="button"
              className={`blog-filter-btn ${activeCategory === 'neighborhoods' ? 'active' : ''}`}
              onClick={() => setActiveCategory('neighborhoods')}
            >
              Neighborhoods
            </button>
            <button
              type="button"
              className={`blog-filter-btn ${activeCategory === 'legal' ? 'active' : ''}`}
              onClick={() => setActiveCategory('legal')}
            >
              Tenant Advisory
            </button>
          </div>

          <Link
            to="/blog"
            className="btn btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.86rem' }}
          >
            View All Previous Articles &rarr;
          </Link>
        </div>

        {filteredArticles.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--text-soft)', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>✍️</div>
            <p style={{ margin: 0, fontSize: '0.95rem' }}>
              Articles coming soon! Our team is preparing verified Abuja rental guides.
            </p>
          </div>
        ) : (
          <div className="blog-grid" id="blogPostsGrid">
            {filteredArticles.map((article) => (
              <BlogCard
                key={article.id}
                article={article}
                onRead={onReadArticle}
                onShare={onShareArticle}
              />
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '36px' }}>
          <Link
            to="/blog"
            className="btn btn-primary"
            style={{ padding: '15px 32px' }}
          >
            <span>Browse All Previous Articles & Guides</span> &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
};
