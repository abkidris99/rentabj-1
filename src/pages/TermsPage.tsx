import React, { useEffect } from 'react';
import { SEO } from '../components/SEO';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main style={{ paddingTop: '120px', paddingBottom: '80px' }}>
      <SEO 
        title="Terms & Conditions | RentABJ Homes"
        description="Read the Terms and Conditions for using RentABJ Homes to find your rental property in Abuja."
        canonicalUrl="https://rentabj.com/terms"
      />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="section-title">Terms & Conditions</h1>
        <div style={{ color: 'var(--text-soft)', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Welcome to RentABJ Homes. By accessing or using our website and services, you agree to be bound by these Terms and Conditions.
          </p>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>1. Service Overview</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            RentABJ Homes provides a platform to connect prospective tenants with verified rental properties in Abuja. We are a property listing and agency service, not the final owner of the properties listed.
          </p>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>2. Fees and Payments</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Standard agency (10%) and legal (5-10%) fees apply to successful rental transactions unless otherwise stated. All payments should be verified with our official representatives before making any transfer.
          </p>
          <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--navy)' }}>3. Liability</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            While we rigorously verify every listing, RentABJ Homes is not liable for disputes arising after a tenancy agreement is signed between a landlord and tenant. We act as an intermediary to facilitate a smooth transaction.
          </p>
          <p style={{ marginTop: '3rem', fontSize: '0.9rem' }}>
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </main>
  );
};
