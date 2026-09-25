import React, { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType,
  twitterCard,
  twitterTitle,
  twitterDescription,
  twitterImage,
  jsonLd
}) => {
  useEffect(() => {
    document.title = title;
    
    const setMetaTag = (selector: string, attribute: string, value?: string, contentAttr: string = 'content') => {
      let el = document.querySelector(`meta[${selector}="${attribute}"]`);
      if (value) {
        if (!el) {
          el = document.createElement('meta');
          el.setAttribute(selector, attribute);
          document.head.appendChild(el);
        }
        el.setAttribute(contentAttr, value);
      }
    };

    setMetaTag('name', 'description', description);
    
    if (canonicalUrl) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonicalUrl);
      } else {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = canonicalUrl;
        document.head.appendChild(link);
      }
    }

    setMetaTag('property', 'og:title', ogTitle || title);
    setMetaTag('property', 'og:description', ogDescription || description);
    setMetaTag('property', 'og:url', ogUrl || canonicalUrl);
    if (ogImage) setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType || 'website');

    setMetaTag('name', 'twitter:card', twitterCard || 'summary_large_image');
    setMetaTag('name', 'twitter:title', twitterTitle || title);
    setMetaTag('name', 'twitter:description', twitterDescription || description);
    if (twitterImage || ogImage) setMetaTag('name', 'twitter:image', twitterImage || ogImage);

    if (jsonLd) {
      let script = document.querySelector('script[type="application/ld+json"][id="dynamic-jsonld"]');
      if (!script) {
        script = document.createElement('script');
        script.setAttribute('type', 'application/ld+json');
        script.setAttribute('id', 'dynamic-jsonld');
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else {
      const script = document.querySelector('script[type="application/ld+json"][id="dynamic-jsonld"]');
      if (script) script.remove();
    }

    return () => {
      // Clean up dynamic JSON-LD on unmount
      const script = document.querySelector('script[type="application/ld+json"][id="dynamic-jsonld"]');
      if (script) script.remove();
    };
  }, [
    title, 
    description, 
    canonicalUrl, 
    ogTitle, 
    ogDescription, 
    ogUrl, 
    ogImage, 
    ogType, 
    twitterCard, 
    twitterTitle, 
    twitterDescription, 
    twitterImage, 
    jsonLd
  ]);

  return null;
};
