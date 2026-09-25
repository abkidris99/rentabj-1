import React from 'react';
import { locationsData } from '../data/locations';

export const Locations: React.FC = () => {
  return (
    <section id="locations">
      <div className="container">
        <span className="eyebrow">Featured Locations</span>
        <h2 className="section-title">Verified Rentals Across Abuja Districts</h2>
        <p className="section-sub">
          Explore apartments, duplexes, and commercial spaces across Abuja's most sought-after residential neighborhoods.
        </p>
        <div className="loc-scroll">
          {locationsData.map((loc) => (
            <div className="loc-card" key={loc.id}>
              <img
                src={loc.image}
                alt={`Rental apartments and houses in ${loc.name}, Abuja`}
                loading="lazy"
              />
              <div className="loc-overlay">
                <span>{loc.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
