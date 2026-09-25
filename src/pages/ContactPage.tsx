import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';
import { ContactSection } from '../components/ContactSection';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '80px' }}>
      <SEO 
        title="Contact Us | RentABJ Homes"
        description="Get in touch with RentABJ Homes. We are ready to assist you in finding your perfect rental property in Abuja."
        canonicalUrl="https://www.rentabj.com.ng/contact"
      />
      <ContactSection isPage={true} />
    </main>
  );
};
