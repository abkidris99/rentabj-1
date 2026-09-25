import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { Locations } from '../components/Locations';

export const LocationsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="Abuja Neighborhoods & Locations | RentABJ Homes"
        description="Explore verified apartments and houses for rent across prime Abuja locations like Gwarinpa, Maitama, Jahi, and Wuse."
        canonicalUrl="https://rentabj.com/locations"
      />
      <Locations isPage={true} />
    </main>
  );
};
