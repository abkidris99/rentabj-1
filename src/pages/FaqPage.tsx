import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { FaqSection } from '../components/FaqSection';

export const FaqPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="Frequently Asked Questions (FAQ) | RentABJ Homes"
        description="Find answers to common questions about renting apartments, agent fees, and lease agreements in Abuja."
        canonicalUrl="https://www.rentabj.com.ng/faq"
      />
      <FaqSection isPage={true} />
    </main>
  );
};
