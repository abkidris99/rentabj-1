import React from 'react';
import { servicesData } from '../data/services';

export const Services: React.FC = () => {
  return (
    <section id="services" className="bg-light">
      <div className="container">
        <span className="eyebrow">What We Do</span>
        <h2 className="section-title">Our Services</h2>
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
