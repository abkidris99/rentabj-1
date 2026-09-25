import React from 'react';
import { locationsData } from '../data/locations';

interface LocationsProps {
  isPage?: boolean;
}

export const Locations: React.FC<LocationsProps> = ({ isPage }) => {
  const TitleTag = isPage ? 'h1' : 'h2';
  return (
    <section id="locations">
      <div className="container">
        <span className="eyebrow">Featured Locations</span>
        <TitleTag className="section-title">Popular Areas in Abuja</TitleTag>
        <p className="section-sub" style={{ marginBottom: '1.5rem' }}>
          Abuja is a fast-growing city with diverse neighborhoods, and we focus on the most secure and accessible districts. Our verified properties for rent in Abuja span across major residential hubs.
        </p>
        <p className="section-sub" style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '2.5rem', maxWidth: '800px', marginLeft: 'auto', marginRight: 'auto' }}>
          We currently serve highly sought-after areas including Gwarinpa, Life Camp, Jahi, and Katampe. We also have excellent housing options in Kubwa, Dawaki, Karsana, and Lugbe, providing affordable yet premium living environments. Whether you want to live close to the central business district or prefer a quiet suburban retreat, we have the right neighborhood for you.
        </p>
        <div className="loc-scroll">
          {locationsData.map((loc) => (
            <div className="loc-card" key={loc.id}>
              <img
                src={loc.image}
                alt={`Rental apartments and houses in ${loc.name}, Abuja`}
                loading="lazy"
              />
              <div className="loc-overlay">
                <span>{loc.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
