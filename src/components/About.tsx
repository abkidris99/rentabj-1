import React from 'react';
import { siteConfig } from '../data/siteConfig';

interface AboutProps {
  isPage?: boolean;
}

export const About: React.FC<AboutProps> = ({ isPage }) => {
  const TitleTag = isPage ? 'h1' : 'h2';
  return (
    <section id="about">
      <div className="container about-grid">
        <div className="about-media">
          <img
            src="/images/general/about.jpg"
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
          <TitleTag className="section-title">Why Choose RentABJ Homes?</TitleTag>
          <p className="section-sub" style={{ marginBottom: '1rem' }}>
            The Abuja real estate market can be stressful, with hidden fees and unverified agents. RentABJ Homes was built to solve this. We are dedicated to providing only <strong>verified apartments in Abuja</strong>, meaning every property on our platform has been physically inspected by our team to guarantee its authenticity and condition.
          </p>
          <p className="section-sub" style={{ fontSize: '1rem', color: '#6b7280' }}>
            We take the guesswork out of property sourcing, protecting you from scams and substandard housing. Our transparent approach means you know exactly what the agency and legal fees are upfront. From the moment you contact us to the day you collect your keys, we provide hands-on assistance, making us the most trusted name for rental properties in Abuja.
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
