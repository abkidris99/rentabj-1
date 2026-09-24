import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer-top">
          <div>
            <div className="footer-logo">{siteConfig.name}</div>
            <p className="footer-tagline">Helping You Find Your Perfect Rental in Abuja.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h5>Company</h5>
              <a href="/#about">About</a>
              <a href="/#services">Services</a>
              <a href="/#locations">Locations</a>
              <a href="/#blog">Blog</a>
              <Link to="/blog">Full Archive</Link>
            </div>
            <div className="footer-col">
              <h5>Legal</h5>
              <a href="/#">Privacy Policy</a>
              <a href="/#">Terms & Conditions</a>
            </div>
            <div className="footer-col">
              <h5>Follow Us</h5>
              <div className="social-row">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  ◎
                </a>
                <a
                  href={siteConfig.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  ♪
                </a>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                >
                  💬
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} RentABJ Homes. All rights reserved.</span>
          <span>Abuja, Nigeria</span>
        </div>
      </div>
    </footer>
  );
};
