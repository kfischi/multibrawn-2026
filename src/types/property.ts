/**
 * Property Type Definition
 * הגדרת סוג נכס לפרויקט
 */

export interface Property {
  id: string;
  name: string;
  type: 'צימר' | 'וילה' | 'דירת נופש' | 'מלון בוטיק' | 'מתחם אירועים';
  location: string;
  area: 'צפון' | 'מרכז' | 'דרום' | 'ירושלים';
  capacity: number;
  image: string;
  amenities: string[];
  description: string;
  priceRange: string;
  featured: boolean;
}
