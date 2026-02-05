/**
 * Tzimer360 Scraper - Web scraping for affiliate properties
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import { AffiliateProperty } from '@/types/affiliate-property';

export class Tzimer360Scraper {
  private baseUrl: string;
  private affiliateCode: string;

  constructor(affiliateCode: string = 'multibrawn') {
    this.baseUrl = 'https://tzimer360.com';
    this.affiliateCode = affiliateCode;
  }

  /**
   * Parse location string to location object
   */
  private parseLocation(locationStr: string): {
    city: string;
    area: 'צפון' | 'מרכז' | 'דרום' | 'ירושלים';
    region: string;
    address: string;
    coordinates: { lat: number; lng: number } | undefined;
  } {
    const northCities = ['גליל', 'כנרת', 'צפת', 'טבריה', 'נהריה', 'עכו', 'חיפה', 'קרית שמונה', 'ראש פינה', 'כרמיאל'];
    const centerCities = ['תל אביב', 'רמת גן', 'פתח תקווה', 'הרצליה', 'רעננה', 'כפר סבא', 'נתניה', 'רמלה', 'לוד'];
    const southCities = ['באר שבע', 'אילת', 'ים המלח', 'מצפה רמון', 'ערד', 'דימונה', 'אשדוד', 'אשקלון'];
    const jerusalemCities = ['ירושלים', 'מבשרת ציון', 'מעלה אדומים'];

    let area: 'צפון' | 'מרכז' | 'דרום' | 'ירושלים' = 'מרכז';
    let region = 'מרכז';
    
    const lowerLocation = locationStr.toLowerCase();
    
    if (northCities.some(city => lowerLocation.includes(city.toLowerCase()))) {
      area = 'צפון';
      region = 'צפון';
    } else if (southCities.some(city => lowerLocation.includes(city.toLowerCase()))) {
      area = 'דרום';
      region = 'דרום';
    } else if (jerusalemCities.some(city => lowerLocation.includes(city.toLowerCase()))) {
      area = 'ירושלים';
      region = 'ירושלים והסביבה';
    } else {
      region = 'מרכז הארץ';
    }

    return {
      city: locationStr,
      area,
      region,
      address: locationStr,
      coordinates: undefined,
    };
  }

  async scrapeProperty(url: string): Promise<AffiliateProperty | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);

      const name = $('h1.property-title').text().trim() || 'נכס ללא שם';
      const description = $('.property-description').text().trim() || '';
      const locationStr = $('.property-location').text().trim() || 'מיקום לא מוגדר';
      const location = this.parseLocation(locationStr);
      
      const imageUrls: string[] = [];
      $('.property-gallery img').each((i, el) => {
        const src = $(el).attr('src') || $(el).attr('data-src');
        if (src) {
          imageUrls.push(src.startsWith('http') ? src : `${this.baseUrl}${src}`);
        }
      });

      const priceText = $('.property-price').text().trim();
      const priceRange = priceText || '₪500-2000';

      const features: string[] = [];
      $('.property-features li').each((i, el) => {
        const feature = $(el).text().trim();
        if (feature) features.push(feature);
      });

      const propertyType = $('.property-type').text().trim() || 'צימר';
      const capacityText = $('.property-capacity').text().trim();
      const capacity = parseInt(capacityText.replace(/\D/g, '')) || 2;
      const ratingText = $('.property-rating').text().trim();
      const rating = parseFloat(ratingText) || undefined;
      const affiliateUrl = `${url}?ref=${this.affiliateCode}`;

      return {
        id: this.generatePropertyId(url),
        name,
        description: description || `${name} - ${location.city}`,
        location,
        priceRange,
        images: imageUrls.length > 0 
          ? { main: imageUrls[0], gallery: imageUrls.slice(1) }
          : { main: '/images/placeholder-property.jpg', gallery: [] },
        affiliate: {
          provider: 'tzimer360',
          affiliateUrl,
          commission: 10,
          trackingCode: this.affiliateCode,
        },
        features: features.length > 0 ? features : ['Wi-Fi', 'חניה', 'מטבח מאובזר'],
        propertyType,
        capacity,
        rating,
        amenities: {
          wifi: features.some(f => f.includes('Wi-Fi') || f.includes('אינטרנט')),
          parking: features.some(f => f.includes('חניה')),
          pool: features.some(f => f.includes('בריכה')),
          jacuzzi: features.some(f => f.includes('ג\'קוזי')),
          kitchen: features.some(f => f.includes('מטבח')),
          airConditioning: features.some(f => f.includes('מיזוג')),
          heating: features.some(f => f.includes('חימום')),
          tv: features.some(f => f.includes('טלוויזיה')),
          washer: features.some(f => f.includes('מכונת כביסה')),
          petsAllowed: features.some(f => f.includes('חיות מחמד')),
        },
        bookingInfo: {
          minNights: 1,
          maxNights: 30,
          checkInTime: '15:00',
          checkOutTime: '11:00',
          cancellationPolicy: 'ביטול עד 7 ימים לפני ההגעה',
        },
        pricing: {
          basePrice: parseInt(priceRange.match(/\d+/)?.[0] || '500'),
          weekendPrice: parseInt(priceRange.match(/\d+/g)?.[1] || '800'),
          currency: 'ILS',
          cleaningFee: 0,
          securityDeposit: 0,
        },
        reviews: {
          averageRating: rating || 4.5,
          totalReviews: 0,
          cleanliness: rating || 4.5,
          communication: rating || 4.5,
          checkIn: rating || 4.5,
          accuracy: rating || 4.5,
          location: rating || 4.5,
          value: rating || 4.5,
        },
        hostInfo: {
          name: 'Tzimer360',
          responseTime: 'תוך שעה',
          responseRate: 100,
          isSuperhost: true,
        },
        areaInfo: {
          accessibility: {
            distance: 'מרחק נסיעה משתנה',
            parking: true,
            publicTransport: false,
          },
          activities: [],
          attractions: [],
          restaurants: [],
        },
        seoMetadata: {
          title: `${name} - ${location.city} | MULTIBRAWN`,
          description: description.substring(0, 160) || `${name} ב${location.city}`,
          keywords: [name, location.city, propertyType, 'צימרים', 'נופש בישראל'],
        },
        status: 'active',
        lastUpdated: new Date(),
      };
    } catch (error: any) {
      console.error(`Error scraping property ${url}:`, error.message);
      return null;
    }
  }

  async scrapeSearchResults(searchUrl: string, maxResults: number = 10): Promise<AffiliateProperty[]> {
    try {
      const response = await axios.get(searchUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const propertyUrls: string[] = [];

      $('.property-card a, .listing-item a').each((i, el) => {
        if (propertyUrls.length >= maxResults) return;
        
        const href = $(el).attr('href');
        if (href && href.includes('/property/')) {
          const fullUrl = href.startsWith('http') ? href : `${this.baseUrl}${href}`;
          if (!propertyUrls.includes(fullUrl)) {
            propertyUrls.push(fullUrl);
          }
        }
      });

      const properties: AffiliateProperty[] = [];
      for (const url of propertyUrls) {
        const property = await this.scrapeProperty(url);
        if (property) {
          properties.push(property);
        }
        await this.delay(1000);
      }

      return properties;
    } catch (error: any) {
      console.error(`Error scraping search results ${searchUrl}:`, error.message);
      return [];
    }
  }

  async scrapeByLocation(location: string, maxResults: number = 10): Promise<AffiliateProperty[]> {
    const searchUrl = `${this.baseUrl}/search?location=${encodeURIComponent(location)}`;
    return this.scrapeSearchResults(searchUrl, maxResults);
  }

  async scrapeByType(propertyType: string, maxResults: number = 10): Promise<AffiliateProperty[]> {
    const searchUrl = `${this.baseUrl}/search?type=${encodeURIComponent(propertyType)}`;
    return this.scrapeSearchResults(searchUrl, maxResults);
  }

  private generatePropertyId(url: string): string {
    const match = url.match(/\/property\/(\d+)/);
    return match ? `tzimer360_${match[1]}` : `tzimer360_${Date.now()}`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default Tzimer360Scraper;
