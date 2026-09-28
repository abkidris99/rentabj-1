import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getProperties } from '../lib/supabaseService';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

export const RentInLifeCampPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    getProperties()
      .then((data) => {
        const available = data.filter((p) => p.available !== false && (p.location.toLowerCase().includes('life camp') || p.location.toLowerCase().includes('lifecamp') || p.tag.toLowerCase().includes('life camp') || p.tag.toLowerCase().includes('lifecamp')));
        
        const mapped: Property[] = available.map((p) => ({
          id: p.id || p.title,
          slug: p.slug,
          title: p.title,
          location: p.location,
          price: p.price,
          period: p.period || '/ yr',
          bedrooms: p.bedrooms,
          description: p.description,
          image: p.image,
          tag: p.tag || p.location,
          whatsappMessage: p.whatsappMessage || `Hi, I'm interested in the ${p.title} in ${p.location}`,
        }));
        
        setProperties(mapped);
      })
      .catch((err) => {
        console.error('Failed to load Life Camp properties:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ paddingTop: '80px' }} className="bg-light">
      <SEO 
        title="Apartments & Houses for Rent in Life Camp, Abuja | RentABJ Homes"
        description="Find verified apartments, houses, and self-contains for rent in Life Camp, Abuja. Browse available properties, prices, and schedule an inspection today."
        canonicalUrl="https://www.rentabj.com.ng/rent-in-life-camp"
      />
      
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Location Spotlight</span>
        <h1 className="section-title" style={{ textAlign: 'center' }}>Apartments & Houses for Rent in Life Camp, Abuja</h1>
        <p className="section-sub" style={{ marginBottom: '3rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          Life Camp is a serene and well-secured district in Abuja, popular for its quiet environment and premium housing options. Whether you are looking for a modern apartment or a spacious family home, Life Camp provides an upscale residential experience.
        </p>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>Available Properties in Life Camp</h2>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div className="spinner" style={{ margin: '0 auto 20px', width: '40px', height: '40px', border: '4px solid rgba(0,0,0,0.1)', borderLeftColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            <p>Loading available properties...</p>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : properties.length > 0 ? (
          <div className="prop-grid" style={{ marginBottom: '4rem' }}>
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'white', borderRadius: '12px', marginBottom: '4rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#4b5563' }}>No available properties currently listed</h3>
            <p style={{ marginBottom: '1.5rem', color: '#6b7280' }}>
              We might have off-market properties or new listings coming up soon in Life Camp.
            </p>
            <Link to="/request-property" className="btn btn-primary">
              Submit a Property Request
            </Link>
          </div>
        )}

        <section style={{ backgroundColor: 'white', padding: '3rem 2rem', borderRadius: '16px', marginBottom: '4rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', textAlign: 'center' }}>Frequently Asked Questions</h2>
          
          <div style={{ display: 'grid', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--dark)' }}>Is Life Camp a safe place to live?</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Yes, Life Camp is known as one of the more secure districts in Abuja, hosting various diplomatic and high-profile residences.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--dark)' }}>What is the average rent in Life Camp?</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Rent varies by property size and type, but the area generally offers premium apartments and family homes at competitive high-end rates.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--dark)' }}>Are there good amenities nearby?</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Yes, residents enjoy proximity to major supermarkets, quality clinics, and recreational centers in and around the district.</p>
            </div>
          </div>
        </section>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-outline" style={{ border: '2px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Back to Home</Link>
          <Link to="/properties" className="btn btn-outline" style={{ border: '2px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>All Properties</Link>
          <Link to="/contact" className="btn btn-outline" style={{ border: '2px solid var(--primary)', color: 'var(--primary)', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>Contact Us</Link>
        </div>
      </div>
    </main>
  );
};
