import React from 'react';
import { BlogArticle } from '../types';

interface BlogCardProps {
  article: BlogArticle;
  onRead: (articleId: string) => void;
  onShare: (platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy', articleId: string) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, onRead, onShare }) => {
  return (
    <article className="blog-card" data-category={article.categorySlug}>
      <div className="blog-card-media">
        <img src={article.image} alt={article.title} loading="lazy" />
        <span className="blog-badge">{article.category}</span>
      </div>
      <div className="blog-card-content">
        <div className="blog-meta-row">
          <span>📅 {article.date}</span>
          <span>⏱ {article.readTime}</span>
        </div>
        <h3 className="blog-card-title">{article.title}</h3>
        <p className="blog-card-excerpt">{article.excerpt}</p>
        <div className="blog-card-bottom">
          <button
            type="button"
            className="blog-read-btn"
            onClick={() => onRead(article.id)}
          >
            Read Article &rarr;
          </button>
          <div className="share-btn-group" aria-label="Share article">
            <button
              type="button"
              className="share-btn share-wa"
              onClick={() => onShare('whatsapp', article.id)}
              title="Share on WhatsApp"
              aria-label="Share on WhatsApp"
            >
              💬
            </button>
            <button
              type="button"
              className="share-btn share-x"
              onClick={() => onShare('twitter', article.id)}
              title="Share on X (Twitter)"
              aria-label="Share on X"
            >
              𝕏
            </button>
            <button
              type="button"
              className="share-btn share-fb"
              onClick={() => onShare('facebook', article.id)}
              title="Share on Facebook"
              aria-label="Share on Facebook"
            >
              f
            </button>
            <button
              type="button"
              className="share-btn share-copy"
              onClick={() => onShare('copy', article.id)}
              title="Copy link"
              aria-label="Copy link"
            >
              🔗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
