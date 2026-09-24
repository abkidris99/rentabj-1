import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Locations } from '../components/Locations';
import { PropertyRequestForm } from '../components/PropertyRequestForm';
import { PriceGuide } from '../components/PriceGuide';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { VirtualTours } from '../components/VirtualTours';
import { BlogSection } from '../components/BlogSection';
import { Testimonials } from '../components/Testimonials';
import { ContactSection } from '../components/ContactSection';

interface HomePageProps {
  onReadArticle: (articleId: string) => void;
  onShareArticle: (
    platform: 'whatsapp' | 'twitter' | 'facebook' | 'copy',
    articleId: string
  ) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onReadArticle,
  onShareArticle,
}) => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Locations />
      <PropertyRequestForm />
      <PriceGuide />
      <FeaturedProperties />
      <WhyChooseUs />
      <VirtualTours />
      <BlogSection
        onReadArticle={onReadArticle}
        onShareArticle={onShareArticle}
      />
      <Testimonials />
      <ContactSection />
    </main>
  );
};
