/**
 * Enhanced Property Schema for Tzimer360 Affiliate
 */
export interface AffiliateProperty {
  id: string;
  name: string;  // Added for scraper compatibility
  originalName?: string;
  displayName?: string;
  slug?: string;
  location: {
    city: string;
    area: 'צפון' | 'מרכז' | 'דרום' | 'ירושלים';
    region: string;
    address: string;
    coordinates?: { lat: number; lng: number; };
  };
  propertyType: string;
  type?: 'צימר' | 'וילה' | 'דירת נופש' | 'מלון בוטיק' | 'מתחם אירועים';
  capacity: number | { min?: number; max?: number; bedrooms?: number; bathrooms?: number; };
  images: { main: string; gallery: string[]; hero?: string; };
  description?: string;
  shortDescription?: string;
  fullDescription?: string;
  highlights?: string[];
  features?: string[];
  priceRange?: string;
  rating?: number;
  amenities?: {
    wifi?: boolean;
    parking?: boolean;
    pool?: boolean;
    jacuzzi?: boolean;
    kitchen?: boolean;
    airConditioning?: boolean;
    heating?: boolean;
    tv?: boolean;
    washer?: boolean;
    petsAllowed?: boolean;
    featured?: string[];
    all?: string[];
  };
  pricing?: {
    basePrice?: number;
    weekendPrice?: number;
    currency: string;
    cleaningFee?: number;
    securityDeposit?: number;
    range?: string;
    fromPrice?: number;
    season?: { low?: string; mid?: string; high?: string; };
  };
  bookingInfo?: {
    minNights: number;
    maxNights: number;
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;
  };
  reviews?: {
    averageRating: number;
    totalReviews: number;
    cleanliness: number;
    communication: number;
    checkIn: number;
    accuracy: number;
    location: number;
    value: number;
  };
  hostInfo?: {
    name: string;
    responseTime: string;
    responseRate: number;
    isSuperhost: boolean;
  };
  affiliate: {
    provider: 'tzimer360';
    originalUrl?: string;
    affiliateUrl: string;
    trackingCode?: string;
    ctaText?: string;
  };
  areaInfo?: {
    romantic?: { attractions: string[]; restaurants: string[]; cafes: string[]; };
    family?: { attractions: string[]; activities: string[]; };
    activities?: string[] | { hiking?: string[]; sites?: string[]; nature?: string[]; };
    attractions?: string[];
    restaurants?: string[];
    accessibility: { distance: string; parking: boolean; publicTransport: boolean; };
  };
  seoMetadata?: {
    title: string;
    description: string;
    keywords: string[];
    ogImage?: string;
  };
  seo?: { title: string; description: string; keywords: string[]; ogImage: string; };
  featured?: boolean;
  premium?: boolean;
  reviewsCount?: number;
  status: 'active' | 'inactive';
  createdAt?: Date;
  updatedAt?: Date;
  lastUpdated?: Date;
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
