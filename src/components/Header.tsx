import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav>
          <Link to="/" className="logo">
            <span className="dot"></span>
            {siteConfig.name}
          </Link>

          <ul className="nav-links">
            <li>
              <Link to={isBlog ? '/#home' : '#home'}>Home</Link>
            </li>
            <li>
              <a href={isBlog ? '/#about' : '#about'}>About</a>
            </li>
            <li>
              <a href={isBlog ? '/#services' : '#services'}>Services</a>
            </li>
            <li>
              <a href={isBlog ? '/#locations' : '#locations'}>Locations</a>
            </li>
            <li>
              <a href={isBlog ? '/#property-request' : '#property-request'}>Find a Property</a>
            </li>
            <li>
              <Link to="/blog" className={isBlog ? 'active' : ''}>
                Blog & Archive
              </Link>
            </li>
            {!isBlog && (
              <li>
                <a href="#testimonials">Testimonials</a>
              </li>
            )}
            <li>
              <a href={isBlog ? '/#contact' : '#contact'}>Contact</a>
            </li>
          </ul>

          <div className="nav-actions">
            <a
              href={siteConfig.instagramUrl}
              className="icon-link"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              ◎
            </a>
            <a
              href={siteConfig.tiktokUrl}
              className="icon-link"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              ♪
            </a>
            <a
              href={siteConfig.whatsappUrl}
              className="nav-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <button
              className="burger"
              id="burgerBtn"
              onClick={onOpenMobileMenu}
              aria-label="Toggle navigation menu"
              type="button"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};
