import React from 'react';
import { siteConfig } from '../data/siteConfig';

export const WhatsAppButton: React.FC = () => {
  return (
    <a
      href={siteConfig.whatsappUrl}
      className="float-wa"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
};
