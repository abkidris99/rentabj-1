import React, { useEffect, useState } from 'react';
import { BlogArticle } from '../types';
import { siteConfig } from '../data/siteConfig';

interface BlogModalProps {
  article: BlogArticle | null;
  isOpen: boolean;
  onClose: () => void;
  onShare: (platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy', articleId: string) => void;
  toastMessage: string | null;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  article,
  isOpen,
  onClose,
  onShare,
  toastMessage,
}) => {
  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || !article) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="article-modal-backdrop open"
        onClick={handleBackdropClick}
        aria-modal="true"
        role="dialog"
      >
        <div className="article-modal">
          <button
            type="button"
            className="article-modal-close"
            onClick={onClose}
            aria-label="Close article"
          >
            &times;
          </button>

          <div className="article-modal-header">
            <img src={article.image} alt={article.title} />
          </div>

          <div className="article-modal-body">
            <span className="article-modal-tag">{article.category}</span>
            <h2 className="article-modal-title">{article.title}</h2>
            <div className="article-modal-meta">
              <span>{article.author || 'Published by RentABJ Homes'}</span>
              <span>{article.readTime}</span>
            </div>

            <div
              className="article-modal-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="modal-share-bar">
              <span className="modal-share-label">Share this guide:</span>
              <div className="share-btn-group">
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
                  title="Copy article link"
                  aria-label="Copy article link"
                >
                  🔗
                </button>
              </div>
            </div>

            <div className="article-modal-footer">
              <a
                href={siteConfig.whatsappUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Have Questions? Ask Our Experts
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Back to Articles
              </button>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="copied-toast show" role="alert">
          {toastMessage}
        </div>
      )}
    </>
  );
};
