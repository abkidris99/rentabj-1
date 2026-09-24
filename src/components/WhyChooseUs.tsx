import React from 'react';
import { whyChooseUsData } from '../data/whyChooseUs';

export const WhyChooseUs: React.FC = () => {
  return (
    <section className="bg-light">
      <div className="container">
        <span className="eyebrow">Why Clients Choose Us</span>
        <h2 className="section-title">Why Choose RentABJ Homes</h2>
        <div className="why-grid">
          {whyChooseUsData.map((item) => (
            <div className="why-item" key={item.id}>
              <div className="check-circle">✔</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
