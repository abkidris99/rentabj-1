import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { locationsData } from '../data/locations';

interface LocationsProps {
  isPage?: boolean;
}

export const Locations: React.FC<LocationsProps> = ({ isPage }) => {
  const TitleTag = isPage ? 'h1' : 'h2';
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  const interactionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const checkScrollState = useCallback(() => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScrollState);
      window.addEventListener('resize', checkScrollState);
      checkScrollState();
      
      return () => {
        el.removeEventListener('scroll', checkScrollState);
        window.removeEventListener('resize', checkScrollState);
      };
    }
  }, [checkScrollState]);

  const handleInteraction = useCallback(() => {
    setIsInteracting(true);
    if (interactionTimeout.current) clearTimeout(interactionTimeout.current);
    interactionTimeout.current = setTimeout(() => {
      setIsInteracting(false);
    }, 2500);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.035; // pixels per ms

    const autoScroll = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      if (!isHovered && !isInteracting && scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          handleInteraction();
        } else {
          scrollRef.current.scrollLeft += speed * deltaTime;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, isInteracting, handleInteraction]);

  const scroll = (direction: 'left' | 'right') => {
    handleInteraction();
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -480 : 480;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

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
        
        <div 
          className="loc-wrapper"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleInteraction}
          onTouchMove={handleInteraction}
          onWheel={handleInteraction}
          onMouseDown={handleInteraction}
          onKeyDown={handleInteraction}
        >
          <button 
            className="loc-nav-btn left"
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll locations left"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="loc-nav-btn right"
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll locations right"
          >
            <ChevronRight size={24} />
          </button>

          <div className="loc-scroll" ref={scrollRef}>
            {locationsData.map((loc) => {
              const cardContent = (
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
              );

              const routeMap: Record<string, string> = {
                'gwarinpa': '/rent-in-gwarinpa',
                'lifecamp': '/rent-in-life-camp',
                'jahi': '/rent-in-jahi',
                'katampe': '/rent-in-katampe',
                'kubwa': '/rent-in-kubwa',
                'dawaki': '/rent-in-dawaki',
                'karsana': '/rent-in-karsana',
              };

              const targetRoute = routeMap[loc.id];

              if (targetRoute) {
                return (
                  <Link to={targetRoute} key={loc.id} style={{ display: 'block', textDecoration: 'none' }}>
                    {cardContent}
                  </Link>
                );
              }

              return cardContent;
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
