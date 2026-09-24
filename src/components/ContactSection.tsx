import React from 'react';
import { siteConfig } from '../data/siteConfig';

export const ContactSection: React.FC = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="cta-band">
            <h2>Looking for a House in Abuja?</h2>
            <p>Let RentABJ Homes help you find your ideal rental property today.</p>
            <div className="cta-btns">
              <a
                href={siteConfig.whatsappUrl}
                className="btn btn-secondary"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </a>
              <a
                href={`tel:${siteConfig.phone}`}
                className="btn"
                style={{ background: '#fff', color: 'var(--emerald-dark)' }}
              >
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-light">
        <div className="container">
          <span className="eyebrow">Get In Touch</span>
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-row">
                <span className="ic">💬</span>
                <div>
                  <h4>WhatsApp</h4>
                  <p>
                    <a
                      href={siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {siteConfig.phone}
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-row">
                <span className="ic">📞</span>
                <div>
                  <h4>Phone</h4>
                  <p>
                    <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
                  </p>
                </div>
              </div>

              <div className="contact-row">
                <span className="ic">📍</span>
                <div>
                  <h4>Service Area</h4>
                  <p>{siteConfig.serviceArea}</p>
                </div>
              </div>

              <div className="contact-row">
                <span className="ic">🕒</span>
                <div>
                  <h4>Business Hours</h4>
                  <p>
                    {siteConfig.businessHours.weekdays}
                    <br />
                    {siteConfig.businessHours.saturday}
                    <br />
                    {siteConfig.businessHours.sunday}
                  </p>
                </div>
              </div>

              <div className="hero-btns" style={{ marginTop: '10px' }}>
                <a
                  href={siteConfig.googleReviewsUrl}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="map-wrap">
              <iframe
                src="https://maps.google.com/maps?q=Abuja%2C%20Nigeria&t=&z=12&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                title="RentABJ Homes service area map"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
