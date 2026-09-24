import React from 'react';
import { priceGuideData, priceDisclaimer } from '../data/priceGuide';

export const PriceGuide: React.FC = () => {
  return (
    <section id="price-guide">
      <div className="container">
        <span className="eyebrow">Rental Price Guide</span>
        <h2 className="section-title">
          Estimated Annual Apartment Rent Across Abuja
        </h2>
        <p className="section-sub">
          These are estimated annual rental prices for standard apartments.
          Actual prices depend on apartment size, finishing, estate, amenities
          and exact location.
        </p>

        <div className="price-grid">
          {priceGuideData.map((item) => (
            <div className="price-card" key={item.id}>
              <div className="loc-name">{item.district}</div>
              <div className="price">{item.price}</div>
              <div className="from">{item.period}</div>
            </div>
          ))}
        </div>

        <p className="price-disclaimer">{priceDisclaimer}</p>
      </div>
    </section>
  );
};
