import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { About } from '../components/About';
import { WhyChooseUs } from '../components/WhyChooseUs';

export const AboutPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="About RentABJ Homes | Abuja Real Estate"
        description="Learn more about RentABJ Homes, your trusted partner for verified rental properties and apartments in Abuja, Nigeria."
        canonicalUrl="https://rentabj.com/about"
      />
      <About isPage={true} />
      <WhyChooseUs />
    </main>
  );
};
