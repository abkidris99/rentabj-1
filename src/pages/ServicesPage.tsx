import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Services } from '../components/Services';

export const ServicesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="Our Services | RentABJ Homes"
        description="Discover the services offered by RentABJ Homes, including property search, inspection, and lease processing in Abuja."
        canonicalUrl="https://www.rentabj.com.ng/services"
      />
      <Services isPage={true} />
    </main>
  );
};
