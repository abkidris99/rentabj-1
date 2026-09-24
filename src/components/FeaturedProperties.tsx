import React, { useEffect, useState } from 'react';
import { featuredProperties } from '../data/properties';
import { getProperties, PropertyDoc } from '../lib/supabaseService';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types';

export const FeaturedProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>(featuredProperties);

  useEffect(() => {
    getProperties()
      .then((data) => {
        // If Supabase has properties, use only available ones (or all if specified)
        const available = data.filter((p) => p.available !== false);
        if (available.length > 0) {
          const mapped: Property[] = available.map((p) => ({
            id: p.id || p.title,
            title: p.title,
            location: p.location,
            price: p.price,
            period: p.period || '/ yr',
            bedrooms: p.bedrooms,
            description: p.description,
            image: p.image,
            tag: p.tag || p.location,
            whatsappMessage: p.whatsappMessage || `Hi, I'm interested in the ${p.title} in ${p.location}`,
          }));
          setProperties(mapped);
        }
      })
      .catch((err) => {
        console.warn('Could not load properties from Supabase, using local defaults:', err);
      });
  }, []);

  return (
    <section id="featured-properties" className="bg-light">
      <div className="container">
        <span className="eyebrow">Featured Properties</span>
        <h2 className="section-title">Available Right Now</h2>
        <p className="section-sub">
          A sample of verified properties currently available across Abuja.
        </p>

        <div className="prop-grid">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};
