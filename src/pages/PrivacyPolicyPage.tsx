import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <SEO 
        title="Privacy Policy | RentABJ Homes"
        description="Read the Privacy Policy of RentABJ Homes to understand how we handle your personal data and property requests."
        canonicalUrl="https://rentabj.com/privacy-policy"
      />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section-title">Privacy Policy</h1>
        <div style={{ color: 'var(--text-soft)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            At RentABJ Homes, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.
          </p>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>1. Information We Collect</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            We collect information you provide directly to us, such as your name, phone number, and rental preferences when you fill out our property request form or contact us via WhatsApp.
          </p>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>2. How We Use Your Information</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            We use your information exclusively to match you with suitable rental properties in Abuja, communicate with you regarding inspections, and improve our services.
          </p>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>3. Data Security</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            We implement appropriate security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction.
          </p>
          <p style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
};
