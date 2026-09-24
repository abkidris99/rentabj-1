import React from 'react';
import { featuredProperties } from '../data/properties';
import { PropertyCard } from './PropertyCard';

export const FeaturedProperties: React.FC = () => {
  return (
    <section id="featured-properties" className="bg-light">
      <div className="container">
        <span className="eyebrow">Featured Properties</span>
        <h2 className="section-title">Available Right Now</h2>
        <p className="section-sub">
          A sample of verified properties currently available across Abuja.
        </p>

        <div className="prop-grid">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};
