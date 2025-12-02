import propertiesData from '@/data/properties.json';
import aboutData from '@/data/about.json';
import tipsData from '@/data/tips.json';
import { Property, PropertyCategory, AboutData, Tip, TipCategory } from '@/types';

// Properties
export function getProperties(): Property[] {
  return propertiesData.properties as Property[];
}

export function getPropertyById(id: string): Property | undefined {
  return propertiesData.properties.find((p: any) => p.id === id) as Property | undefined;
}

export function getPropertyCategories(): PropertyCategory[] {
  // Return hardcoded categories since JSON was simplified
  return [
    { id: 'all', name: 'הכל', slug: 'all', description: 'כל הנכסים', icon: '🏠' },
    { id: 'zimmer', name: 'צימרים', slug: 'zimmer', description: 'צימרים רומנטיים', icon: '🏡' },
    { id: 'villa', name: 'וילות', slug: 'villa', description: 'וילות משפחתיות', icon: '🏛️' },
    { id: 'hotel', name: 'מלונות בוטיק', slug: 'hotel', description: 'מלונות בוטיק', icon: '🏨' },
    { id: 'event', name: 'אירועים', slug: 'event', description: 'מתחמי אירועים', icon: '💍' },
  ] as PropertyCategory[];
}

export function getPropertiesByCategory(category: string): Property[] {
  if (category === 'all') {
    return getProperties();
  }
  return propertiesData.properties.filter((p: any) => p.type === category) as Property[];
}

export function getPropertyStats() {
  return {
    properties: '200+',
    years: '9+',
    satisfaction: '100%',
    customers: '500+'
  };
}

// About
export function getAboutData(): AboutData {
  return aboutData as AboutData;
}

// Tips
export function getTips(): Tip[] {
  return tipsData.tips as Tip[];
}

export function getTipBySlug(slug: string): Tip | undefined {
  return tipsData.tips.find((t: any) => t.slug === slug) as Tip | undefined;
}

export function getTipCategories(): TipCategory[] {
  return [
    { id: 'all', name: 'הכל', slug: 'all' },
    { id: 'planning', name: 'תכנון', slug: 'planning' },
    { id: 'romantic', name: 'רומנטי', slug: 'romantic' },
    { id: 'family', name: 'משפחתי', slug: 'family' },
    { id: 'budget', name: 'תקציב', slug: 'budget' },
  ] as TipCategory[];
}

export function getTipsByCategory(category: string): Tip[] {
  if (category === 'all') {
    return getTips();
  }
  return tipsData.tips.filter((t: any) => t.category === category) as Tip[];
}

// Search
export function searchProperties(query: string): Property[] {
  const lowercaseQuery = query.toLowerCase();
  return propertiesData.properties.filter((p: any) => 
    p.name.toLowerCase().includes(lowercaseQuery) ||
    p.location.toLowerCase().includes(lowercaseQuery) ||
    p.description.toLowerCase().includes(lowercaseQuery)
  ) as Property[];
}

export function searchTips(query: string): Tip[] {
  const lowercaseQuery = query.toLowerCase();
  return tipsData.tips.filter((t: any) => 
    t.title.toLowerCase().includes(lowercaseQuery) ||
    t.description.toLowerCase().includes(lowercaseQuery)
  ) as Tip[];
}
