// Property Types
export interface Property {
  id: string;
  name: string;
  type: 'zimmer' | 'villa' | 'hotel' | 'event';
  location: string;
  image: string;
  features: string[];
  price: string;
  description: string;
}

export interface PropertyCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

// Lead Types
export interface Lead {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  propertyType: string;
  guestCount: string;
  dates?: {
    start: string;
    end: string;
  };
  budget: string;
  features?: string[];
  source: 'chatbot' | 'form' | 'whatsapp';
  status?: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt?: Date;
  updatedAt?: Date;
}

// Tip Types
export interface Tip {
  id: string;
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  duration: string;
  views: string;
  description: string;
  content: string[];
  videoUrl?: string;
  featured?: boolean;
}

export interface TipCategory {
  id: string;
  name: string;
  slug: string;
}

// About Types
export interface AboutData {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    cta: {
      text: string;
      link: string;
    };
  };
  story: {
    title: string;
    paragraphs: string[];
    signature: string;
    image: string;
  };
  timeline: TimelineItem[];
  values: ValueItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: string;
}

export interface ValueItem {
  title: string;
  description: string;
  icon: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface AvailabilityResponse {
  available: number;
  properties?: Property[];
}
