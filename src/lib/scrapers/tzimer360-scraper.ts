/**
 * Tzimer360 Scraper
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { AffiliateProperty } from '@/types/affiliate-property';

interface Tzimer360Property {
  id: string;
  url: string;
  affiliateUrl: string;
  name: string;
  location: string;
  area: string;
  type: string;
  images: string[];
  description: string;
  amenities: string[];
  price?: string;
}

export class Tzimer360Scraper {
  private baseUrl = 'https://www.tzimer360.co.il';
  private affiliateCode = 'affiliate26';

  async scrapeProperty(propertyId: string): Promise<Tzimer360Property | null> {
    try {
      const url = `${this.baseUrl}/Location/${propertyId}`;
      const affiliateUrl = `${url}?t=${this.affiliateCode}`;

      const response = await axios.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const name = $('.property-title, h1').first().text().trim() || 'צימר יוקרתי';
      const location = $('.location, .address').first().text().trim() || 'ישראל';
      const description = $('.description').first().text().trim() || 'נכס נופש מדהים';
      
      const images: string[] = [];
      $('img.property-image, .gallery img').each((_, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src && !src.includes('placeholder')) {
          images.push(src.startsWith('http') ? src : `${this.baseUrl}${src}`);
        }
      });

      const amenities: string[] = [];
      $('.amenity, .feature').each((_, el) => {
        const amenity = $(el).text().trim();
        if (amenity) amenities.push(amenity);
      });

      const area = this.determineArea(location);
      const type = this.determineType(name, description);

      return {
        id: propertyId,
        url,
        affiliateUrl,
        name,
        location,
        area,
        type,
        images: images.slice(0, 10),
        description,
        amenities,
      };
    } catch (error) {
      console.error(`Failed to scrape ${propertyId}:`, error);
      return null;
    }
  }

  private determineArea(location: string): string {
    const loc = location.toLowerCase();
    if (/גליל|גולן|כנרת|צפת/.test(loc)) return 'צפון';
    if (/אילת|נגב|ים המלח/.test(loc)) return 'דרום';
    if (/ירושלים/.test(loc)) return 'ירושלים';
    return 'מרכז';
  }

  private determineType(name: string, description: string): string {
    const text = `${name} ${description}`.toLowerCase();
    if (/מתחם|אירוע/.test(text)) return 'מתחם אירועים';
    if (/וילה/.test(text)) return 'וילה';
    if (/דירה/.test(text)) return 'דירת נופש';
    if (/מלון/.test(text)) return 'מלון בוטיק';
    return 'צימר';
  }

  convertToAffiliateProperty(tzProp: Tzimer360Property): AffiliateProperty {
    const slug = this.generateSlug(tzProp.name, tzProp.id);

    return {
      id: `aff-${tzProp.id}`,
      originalName: tzProp.name,
      displayName: tzProp.name,
      slug,
      location: {
        city: tzProp.location,
        area: tzProp.area as any,
        region: tzProp.location,
      },
      type: tzProp.type as any,
      capacity: { min: 2, max: 6, bedrooms: 2, bathrooms: 1 },
      images: {
        main: tzProp.images[0] || '',
        gallery: tzProp.images,
        hero: tzProp.images[0],
      },
      shortDescription: tzProp.description.slice(0, 150) + '...',
      fullDescription: tzProp.description,
      highlights: ['נוף מרהיב', 'שקט ופרטיות'],
      amenities: {
        featured: tzProp.amenities.slice(0, 6),
        all: tzProp.amenities,
      },
      pricing: {
        range: tzProp.price || '₪800-1,500',
        fromPrice: 1000,
        currency: 'ILS',
      },
      affiliate: {
        provider: 'tzimer360',
        originalUrl: tzProp.url,
        affiliateUrl: tzProp.affiliateUrl,
        trackingCode: this.affiliateCode,
      },
      areaInfo: {
        accessibility: {
          distance: 'מרחק נסיעה משתנה',
          parking: true,
          publicTransport: false,
        },
      },
      seo: {
        title: `${tzProp.name} | MULTIBRAWN`,
        description: tzProp.description.slice(0, 160),
        keywords: [tzProp.type, tzProp.area, 'צימר'],
        ogImage: tzProp.images[0] || '',
      },
      featured: false,
      premium: false,
      rating: 4.8,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  private generateSlug(name: string, id: string): string {
    return name.toLowerCase().replace(/\s+/g, '-') + '-' + id;
  }

  async scrapeBulk(propertyIds: string[]): Promise<AffiliateProperty[]> {
    const properties: AffiliateProperty[] = [];
    for (const id of propertyIds) {
      try {
        const tzProp = await this.scrapeProperty(id);
        if (tzProp) {
          properties.push(this.convertToAffiliateProperty(tzProp));
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Failed ${id}:`, error);
      }
    }
    return properties;
  }
}

export const TZIMER360_PROPERTIES = ['C4645', 'C4617', 'C4642'];

let scraperInstance: Tzimer360Scraper | null = null;
export function getTzimer360Scraper(): Tzimer360Scraper {
  if (!scraperInstance) {
    scraperInstance = new Tzimer360Scraper();
  }
  return scraperInstance;
}
