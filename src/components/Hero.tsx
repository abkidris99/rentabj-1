import React from 'react';
import { siteConfig } from '../data/siteConfig';

export const Hero: React.FC = () => {
  return (
    <section className="hero" id="home">
      <div className="seal" aria-hidden="true">
        <div className="seal-text">
          Verified
          <br />
          Listings
          <br />
          Abuja
        </div>
      </div>
      <div className="container">
        <div className="hero-inner">
          <h1>
            Find <span className="accent">Verified</span> Rental Properties in Abuja
          </h1>
          <p>
            Rent apartments, houses, duplexes and commercial spaces across Abuja
            with confidence. We connect you with verified listings and make your
            property search simple and stress-free.
          </p>
          <div className="hero-btns">
            <a href="#locations" className="btn btn-primary">
              Browse Properties
            </a>
            <a
              href={siteConfig.whatsappUrl}
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
            <a
              href={siteConfig.googleReviewsUrl}
              className="btn btn-ghost"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Google Reviews
            </a>
          </div>
          <div className="trust-row">
            <div className="trust-item">
              <span className="check">✔</span>Verified Listings
            </div>
            <div className="trust-item">
              <span className="check">✔</span>Abuja Property Experts
            </div>
            <div className="trust-item">
              <span className="check">✔</span>Fast Response
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
