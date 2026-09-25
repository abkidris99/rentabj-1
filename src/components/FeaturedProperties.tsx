import React, { useEffect, useState } from 'react';
import { featuredProperties } from '../data/properties';
import { getProperties, PropertyDoc } from '../lib/supabaseService';
import { PropertyCard } from './PropertyCard';
import { Property } from '../types';

interface FeaturedPropertiesProps {
  isPage?: boolean;
}

export const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ isPage }) => {
  const TitleTag = isPage ? 'h1' : 'h2';
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
        <TitleTag className="section-title">Browse Rental Properties in Abuja</TitleTag>
        <p className="section-sub" style={{ marginBottom: '1.5rem' }}>
          Finding the perfect home in the capital city can be challenging, but RentABJ Homes simplifies the process. We offer a wide range of rental properties in Abuja to suit every lifestyle and budget.
        </p>
        <p className="section-sub" style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2.5rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          Whether you are a young professional searching for a modern self-contain unit, a growing family needing a spacious duplex, or a business looking for a strategic commercial space, our curated listings have you covered. All our apartments and houses for rent in Abuja are physically verified by our team, ensuring you get exactly what you see.
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
