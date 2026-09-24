import React from 'react';
import { locationsData } from '../data/locations';

export const Locations: React.FC = () => {
  return (
    <section id="locations">
      <div className="container">
        <span className="eyebrow">Featured Locations</span>
        <h2 className="section-title">Where We Cover</h2>
        <p className="section-sub">
          Verified rentals across Abuja's most sought-after neighborhoods.
        </p>
        <div className="loc-scroll">
          {locationsData.map((loc) => (
            <div className="loc-card" key={loc.id}>
              <img src={loc.image} alt={`${loc.name} district`} loading="lazy" />
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
