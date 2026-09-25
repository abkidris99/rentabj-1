import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { PropertyRequestForm } from '../components/PropertyRequestForm';

export const PropertiesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="Available Properties for Rent in Abuja | RentABJ Homes"
        description="Browse our curated list of available apartments, houses, duplexes, and commercial spaces for rent across Abuja."
        canonicalUrl="https://www.rentabj.com.ng/properties"
      />
      <FeaturedProperties isPage={true} />
      <PropertyRequestForm />
    </main>
  );
};
