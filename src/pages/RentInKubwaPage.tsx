import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { getProperties } from '../lib/supabaseService';
import { PropertyCard } from '../components/PropertyCard';
import { Property } from '../types';

export const RentInKubwaPage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    getProperties()
      .then((data) => {
        const available = data.filter((p) => p.available !== false && (p.location.toLowerCase().includes('kubwa') || p.tag.toLowerCase().includes('kubwa')));
        
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
        console.error('Failed to load Kubwa properties:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main style={{ paddingTop: '80px' }} className="bg-light">
      <SEO 
        title="Apartments & Houses for Rent in Kubwa, Abuja | RentABJ Homes"
        description="Find verified apartments, houses, and self-contains for rent in Kubwa, Abuja. Browse available properties, prices, and schedule an inspection today."
        canonicalUrl="https://www.rentabj.com.ng/rent-in-kubwa"
      />
      
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <span className="eyebrow" style={{ display: 'block', textAlign: 'center' }}>Location Spotlight</span>
        <h1 className="section-title" style={{ textAlign: 'center' }}>Apartments & Houses for Rent in Kubwa, Abuja</h1>
        <p className="section-sub" style={{ marginBottom: '3rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
          Kubwa is one of Abuja's largest and most established suburban neighborhoods, offering affordable housing and a vibrant community. It provides excellent infrastructure and a self-sustaining environment for its residents.
        </p>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', textAlign: 'center' }}>Available Properties in Kubwa</h2>
        
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
              We might have off-market properties or new listings coming up soon in Kubwa.
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
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--dark)' }}>Is Kubwa a good place to live?</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Yes, Kubwa is a bustling residential area with a strong community feel, good road networks, and excellent affordability.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--dark)' }}>What is the average rent in Kubwa?</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Kubwa is widely known for offering more budget-friendly rental options compared to the city center, making it great for individuals and families alike.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--dark)' }}>Are there good amenities nearby?</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.6' }}>Kubwa is highly self-sufficient with its own major markets, hospitals, schools, banks, and shopping centers, meaning you rarely need to travel far for essentials.</p>
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
