import React from 'react';
import { testimonialsData } from '../data/testimonials';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="bg-light">
      <div className="container">
        <span className="eyebrow">Testimonials</span>
        <h2 className="section-title">What Our Clients Say</h2>
        <div className="test-grid">
          {testimonialsData.map((item) => (
            <div className="test-card" key={item.id}>
              <div className="stars">{'★'.repeat(item.stars)}</div>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
