/**
 * Enhanced Property Schema for Tzimer360 Affiliate
 */

export interface AffiliateProperty {
  id: string;
  originalName: string;
  displayName: string;
  slug: string;
  location: {
    city: string;
    area: 'צפון' | 'מרכז' | 'דרום' | 'ירושלים';
    region: string;
    coordinates?: { lat: number; lng: number; };
  };
  type: 'צימר' | 'וילה' | 'דירת נופש' | 'מלון בוטיק' | 'מתחם אירועים';
  capacity: { min: number; max: number; bedrooms: number; bathrooms: number; };
  images: { main: string; gallery: string[]; hero?: string; };
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  amenities: { featured: string[]; all: string[]; };
  pricing: {
    range: string;
    fromPrice: number;
    currency: string;
    season?: { low?: string; mid?: string; high?: string; };
  };
  affiliate: {
    provider: 'tzimer360';
    originalUrl: string;
    affiliateUrl: string;
    trackingCode: string;
  };
  areaInfo: {
    romantic?: { attractions: string[]; restaurants: string[]; cafes: string[]; };
    family?: { attractions: string[]; activities: string[]; };
    activities: { hiking: string[]; sites: string[]; nature: string[]; };
    accessibility: { distance: string; parking: boolean; publicTransport: boolean; };
  };
  seo: { title: string; description: string; keywords: string[]; ogImage: string; };
  featured: boolean;
  premium: boolean;
  rating?: number;
  reviewsCount?: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface AreaGuide {
  id: string;
  name: string;
  area: 'צפון' | 'מרכז' | 'דרום' | 'ירושלים';
  description: string;
  romantic: any;
  family: any;
  hiking: any;
  sites: any;
  dining: any;
  accessibility: any;
}

export interface PropertyWithArea extends AffiliateProperty {
  areaGuide: AreaGuide;
}
