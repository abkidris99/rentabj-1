import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');

  // Close when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when mobile menu is open
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

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <>
      <div
        className={`backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />
      <div
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        aria-hidden={!isOpen}
      >
        <button
          className="mobile-close"
          onClick={onClose}
          aria-label="Close menu"
          type="button"
        >
          &times;
        </button>
        <Link to="/" onClick={handleLinkClick}>
          Home
        </Link>
        <a href={isBlog ? '/#about' : '#about'} onClick={handleLinkClick}>
          About
        </a>
        <a href={isBlog ? '/#services' : '#services'} onClick={handleLinkClick}>
          Services
        </a>
        <a href={isBlog ? '/#locations' : '#locations'} onClick={handleLinkClick}>
          Locations
        </a>
        <a
          href={isBlog ? '/#property-request' : '#property-request'}
          onClick={handleLinkClick}
        >
          Find a Property
        </a>
        <Link
          to="/blog"
          style={{ color: 'var(--gold)' }}
          onClick={handleLinkClick}
        >
          Blog & Archive
        </Link>
        {!isBlog && (
          <a href="#testimonials" onClick={handleLinkClick}>
            Testimonials
          </a>
        )}
        <a href={isBlog ? '/#contact' : '#contact'} onClick={handleLinkClick}>
          Contact
        </a>
        <a
          href={siteConfig.whatsappUrl}
          className="nav-wa"
          style={{ width: 'fit-content' }}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleLinkClick}
        >
          WhatsApp Us
        </a>
      </div>
    </>
  );
};
