export interface Property {
  id: string;
  slug?: string;
  title: string;
  location: string;
  price: string;
  period: string;
  bedrooms: string;
  description: string;
  image: string;
  tag: string;
  whatsappMessage: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  category: 'Renting Guide' | 'Neighborhoods' | 'Tenant Advisory' | 'Market Trends';
  categorySlug: 'guides' | 'neighborhoods' | 'legal' | 'market';
  readTime: string;
  date: string;
  author?: string;
  excerpt: string;
  image: string;
  tags?: string;
  content: string;
}

export interface LocationItem {
  id: string;
  name: string;
  image: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface PriceGuideItem {
  id: string;
  district: string;
  price: string;
  period: string;
}

export interface TestimonialItem {
  id: string;
  stars: number;
  text: string;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
}

export interface PropertyRequestData {
  fullName: string;
  phoneNumber: string;
  preferredLocation: string;
  propertyType: string;
  annualBudget: string;
  moveInDate: string;
  requirements: string;
}
