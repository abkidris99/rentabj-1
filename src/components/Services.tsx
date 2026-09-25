import React from 'react';
import { servicesData } from '../data/services';

interface ServicesProps {
  isPage?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ isPage }) => {
  const TitleTag = isPage ? 'h1' : 'h2';
  return (
    <section id="services" className="bg-light">
      <div className="container">
        <span className="eyebrow">What We Do</span>
        <TitleTag className="section-title">Our Services</TitleTag>
        <p className="section-sub">
          Everything you need to rent in Abuja, handled end to end.
        </p>
        <div className="grid-3">
          {servicesData.map((service) => (
            <div className="card" key={service.id}>
              <div className="icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
