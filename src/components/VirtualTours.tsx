import React from 'react';
import { siteConfig } from '../data/siteConfig';

export const VirtualTours: React.FC = () => {
  return (
    <section>
      <div className="container">
        <div className="tours">
          <h2>Take a Virtual Tour Before You Visit</h2>
          <p>
            Watch our latest apartment walkthroughs, rental listings and Abuja
            property updates on TikTok.
          </p>
          <a
            href={siteConfig.tiktokUrl}
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch on TikTok
          </a>
        </div>
      </div>
    </section>
  );
};
