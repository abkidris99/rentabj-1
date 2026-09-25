import React from 'react';
import { Property } from '../types';
import { siteConfig } from '../data/siteConfig';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    property.whatsappMessage
  )}`;

  return (
    <div className="prop-card">
      <div className="prop-media">
        <img
          src={property.image}
          alt={`${property.title} for rent in ${property.location}, Abuja`}
          loading="lazy"
        />
        <span className="prop-tag">{property.tag}</span>
        <span className="prop-rent">
          {property.price} {property.period}
        </span>
      </div>
      <div className="prop-body">
        <h3>{property.title}</h3>
        <div className="prop-meta">
          <span>🛏 {property.bedrooms}</span>
          <span>📍 {property.location}</span>
        </div>
        <p>{property.description}</p>
        <a
          href={whatsappUrl}
          className="prop-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp Enquiry
        </a>
      </div>
    </div>
  );
};
