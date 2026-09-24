import React from 'react';
import { siteConfig } from '../data/siteConfig';

export const About: React.FC = () => {
  return (
    <section id="about">
      <div className="container about-grid">
        <div className="about-media">
          <img
            src="https://images.unsplash.com/photo-1560184897-ae75f418493e?q=80&w=1000&auto=format&fit=crop"
            alt="Modern apartment interior in Abuja"
            loading="lazy"
          />
          <div className="about-badge">
            <div className="num">8+</div>
            <div className="label">Abuja districts covered</div>
          </div>
        </div>
        <div>
          <span className="eyebrow">About RentABJ Homes</span>
          <h2 className="section-title">Why Choose RentABJ Homes?</h2>
          <p className="section-sub">
            RentABJ Homes helps tenants find quality rental properties across
            Abuja through verified listings, professional guidance and a seamless
            rental experience. Whether you're looking for a self-contained
            apartment, family home, duplex or commercial space, we help you find
            the right property quickly and transparently.
          </p>
          <div className="hero-btns" style={{ marginTop: '26px' }}>
            <a
              href={siteConfig.whatsappUrl}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
