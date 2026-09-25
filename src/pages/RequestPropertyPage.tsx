import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { PropertyRequestForm } from '../components/PropertyRequestForm';

export const RequestPropertyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="Request a Property in Abuja | RentABJ Homes"
        description="Fill out our property request form to find your ideal rental apartment or house in Abuja quickly."
        canonicalUrl="https://www.rentabj.com.ng/request-property"
      />
      <PropertyRequestForm isPage={true} />
    </main>
  );
};
