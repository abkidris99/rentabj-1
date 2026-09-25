import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPropertyBySlug, PropertyDoc } from '../lib/supabaseService';
import { featuredProperties } from '../data/properties';
import { siteConfig } from '../data/siteConfig';
import { SEO } from '../components/SEO';

export const PropertyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [property, setProperty] = useState<PropertyDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadProperty() {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        let data = await getPropertyBySlug(slug);
        
        // Fallback for the 6 hardcoded demo properties which use ID as slug
        if (!data) {
          const fallback = featuredProperties.find((p) => p.id === slug || p.slug === slug);
          if (fallback) {
            data = {
              title: fallback.title,
              location: fallback.location,
              price: fallback.price,
              period: fallback.period,
              bedrooms: fallback.bedrooms,
              description: fallback.description,
              image: fallback.image,
              tag: fallback.tag,
              whatsappMessage: fallback.whatsappMessage,
              available: true,
            };
          }
        }

        if (data) {
          setProperty(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to load property:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    loadProperty();
  }, [slug]);

  if (loading) {
    return (
      <main className="prop-detail-page bg-light" style={{ minHeight: '60vh', padding: '6rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="spinner" style={{ margin: '0 auto 20px', width: '40px', height: '40px', border: '4px solid rgba(0,0,0,0.1)', borderLeftColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p>Loading property details...</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </main>
    );
  }

  if (error || !property) {
    return (
      <main className="prop-detail-page bg-light" style={{ minHeight: '60vh', padding: '6rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <SEO 
          title="Property Not Found | RentABJ Homes" 
          description="We couldn't find the property you're looking for. It may have been removed or the link might be broken."
        />
        <div style={{ textAlign: 'center', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--dark)' }}>Property Not Found</h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            We couldn't find the property you're looking for. It may have been removed or the link might be broken.
          </p>
          <Link to="/properties" className="btn btn-primary">
            View All Properties
          </Link>
        </div>
      </main>
    );
  }

  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    property.whatsappMessage || `Hi, I'm interested in the ${property.title} in ${property.location}`
  )}`;

  const seoTitle = `${property.title} for Rent in ${property.location}, Abuja | RentABJ Homes`;
  const seoDescription = `${property.title} available for rent in ${property.location}, Abuja. View the property details and contact RentABJ Homes on WhatsApp.`;
  const canonicalUrl = `https://www.rentabj.com.ng/property/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description || seoDescription,
    "image": property.image || undefined,
    "url": canonicalUrl
  };

  return (
    <main className="prop-detail-page bg-light">
      <SEO 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        ogTitle={seoTitle}
        ogDescription={seoDescription}
        ogUrl={canonicalUrl}
        ogImage={property.image}
        twitterTitle={seoTitle}
        twitterDescription={seoDescription}
        twitterImage={property.image}
        jsonLd={jsonLd}
      />
      <div className="container" style={{ padding: '6rem 1rem 4rem' }}>
        
        <Link to="/properties" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
          ← Back to Properties
        </Link>
        
        {!property.available && (
          <div style={{ backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 20px', borderRadius: '8px', marginBottom: '2rem', fontWeight: '500' }}>
            ⚠️ This property is currently rented / unavailable.
          </div>
        )}

        <div className="prop-detail-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
          {/* Image Gallery (Single image for now) */}
          <div className="prop-detail-media" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
            <img 
              src={property.image} 
              alt={property.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: '500px' }}
            />
          </div>

          {/* Property Info */}
          <div className="prop-detail-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {property.tag && (
              <span style={{ display: 'inline-block', backgroundColor: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600', marginBottom: '1rem', alignSelf: 'flex-start' }}>
                {property.tag}
              </span>
            )}
            
            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '1rem', color: 'var(--dark)' }}>
              {property.title}
            </h1>
            
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              {property.price} <span style={{ fontSize: '1rem', color: '#6b7280', fontWeight: '500' }}>{property.period}</span>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <span>📍</span> {property.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
                <span>🛏</span> {property.bedrooms}
              </div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Description</h3>
              <p style={{ color: '#4b5563', lineHeight: '1.7' }}>
                {property.description || 'No description available for this property.'}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '1rem 2rem', fontSize: '1.1rem', textAlign: 'center' }}
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};
