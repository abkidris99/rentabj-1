import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Property } from '../types';
import { siteConfig } from '../data/siteConfig';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const navigate = useNavigate();
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    property.whatsappMessage
  )}`;
  const detailUrl = `/property/${property.slug || property.id}`;

  const handleCardClick = () => {
    navigate(detailUrl);
  };

  return (
    <div className="prop-card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
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
        <h3>
          <Link to={detailUrl} onClick={(e) => e.stopPropagation()} style={{ color: 'inherit', textDecoration: 'none' }}>
            {property.title}
          </Link>
        </h3>
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
          onClick={(e) => e.stopPropagation()}
        >
          WhatsApp Enquiry
        </a>
      </div>
    </div>
  );
};
