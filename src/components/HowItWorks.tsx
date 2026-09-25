import React from 'react';

interface HowItWorksProps {
  isPage?: boolean;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ isPage }) => {
  const TitleTag = isPage ? 'h1' : 'h2';
  return (
    <section className="bg-light" style={{ padding: '4rem 0' }}>
      <div className="container">
        <span className="eyebrow">User Journey</span>
        <TitleTag className="section-title">How RentABJ Helps You Find a Rental Property</TitleTag>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.8', color: '#4b5563', textAlign: 'center' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            We have designed our platform to make your property search as seamless as possible. First, browse our up-to-date catalog of <strong>houses for rent in Abuja</strong> directly on our website. Once you find a property that catches your eye, you can easily request an inspection by filling out our property request form or clicking the WhatsApp button to chat instantly with one of our agents. 
          </p>
          <p>
            We will promptly schedule a physical viewing at your convenience. If you are satisfied with the apartment, we guide you through the secure payment and documentation process, ensuring a smooth transition into your new home. Our goal is to make renting simple, fast, and stress-free.
          </p>
        </div>
      </div>
    </section>
  );
};
