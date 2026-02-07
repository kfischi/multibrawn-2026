/**
 * Tzimer360 Scraper with Puppeteer - Real Browser
 */

import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';
import { AffiliateProperty } from '@/types/affiliate-property';

export class Tzimer360PuppeteerScraper {
  private affiliateCode: string;
  private browser: any = null;

  constructor(affiliateCode: string = 'affiliate26') {
    this.affiliateCode = affiliateCode;
  }

  private async getBrowser() {
    if (this.browser) return this.browser;

    // Production (Netlify)
    if (process.env.NODE_ENV === 'production') {
      this.browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
      });
    } 
    // Development (Local)
    else {
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }

    return this.browser;
  }

  async scrapeProperty(locationId: string): Promise<AffiliateProperty | null> {
    const browser = await this.getBrowser();
    const page = await browser.newPage();

    try {
      const url = `https://www.tzimer360.co.il/Location/${locationId}`;
      console.log(`🔍 Scraping: ${url}`);

      // Navigate to page
      await page.goto(url, { 
        waitUntil: 'networkidle0',
        timeout: 30000 
      });

      // Wait for content to load
      await page.waitForSelector('body', { timeout: 10000 });

      // Extract data
      const data = await page.evaluate(() => {
        // Try to find property name
        const nameSelectors = [
          'h1',
          '[class*="title"]',
          '[class*="name"]',
          '[class*="heading"]'
        ];

        let name = '';
        for (const selector of nameSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent && element.textContent.trim().length > 0) {
            name = element.textContent.trim();
            break;
          }
        }

        // Try to find description
        const descSelectors = [
          '[class*="description"]',
          '[class*="about"]',
          'p',
        ];

        let description = '';
        for (const selector of descSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent && element.textContent.trim().length > 20) {
            description = element.textContent.trim();
            break;
          }
        }

        // Try to find images
        const images: string[] = [];
        const imgElements = document.querySelectorAll('img[src]');
        imgElements.forEach((img: any) => {
          const src = img.getAttribute('src');
          if (src && !src.includes('logo') && !src.includes('icon')) {
            const fullSrc = src.startsWith('http') ? src : `https://www.tzimer360.co.il${src}`;
            images.push(fullSrc);
          }
        });

        // Try to find price
        let priceText = '';
        const priceSelectors = ['[class*="price"]', '[class*="cost"]'];
        for (const selector of priceSelectors) {
          const element = document.querySelector(selector);
          if (element && element.textContent) {
            priceText = element.textContent.trim();
            break;
          }
        }

        return {
          name: name || 'נכס ללא שם',
          description: description || '',
          images: images,
          priceText: priceText || '',
        };
      });

      // Build property object
      const affiliateUrl = `https://www.tzimer360.co.il/Location/${locationId}?t=${this.affiliateCode}`;

      const property: AffiliateProperty = {
        id: `tzimer360_${locationId}`,
        name: data.name,
        description: data.description || `${data.name} - נכס מעולה בצפון`,
        propertyType: 'צימר',
        capacity: 4,
        priceRange: data.priceText || '₪800-1500',
        rating: 4.5,
        location: {
          city: 'צפון',
          area: 'צפון',
          region: 'גליל עליון',
          address: 'גליל עליון',
        },
        images: {
          main: data.images[0] || 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg',
          gallery: data.images.slice(1, 6) || [],
        },
        affiliate: {
          provider: 'tzimer360',
          affiliateUrl: affiliateUrl,
          ctaText: 'צפה בנכס',
        },
        features: ['Wi-Fi', 'חניה', 'מטבח מאובזר'],
        amenities: {
          wifi: true,
          parking: true,
          pool: false,
          jacuzzi: true,
          kitchen: true,
          airConditioning: true,
          heating: true,
          tv: true,
          washer: false,
          petsAllowed: false,
        },
        bookingInfo: {
          minNights: 1,
          maxNights: 30,
          checkInTime: '15:00',
          checkOutTime: '11:00',
          cancellationPolicy: 'ביטול עד 7 ימים לפני ההגעה',
        },
        pricing: {
          basePrice: 800,
          weekendPrice: 1200,
          currency: 'ILS',
          cleaningFee: 0,
          securityDeposit: 0,
        },
        reviews: {
          averageRating: 4.5,
          totalReviews: 0,
          cleanliness: 4.5,
          communication: 4.5,
          checkIn: 4.5,
          accuracy: 4.5,
          location: 4.5,
          value: 4.5,
        },
        hostInfo: {
          name: 'Tzimer360',
          responseTime: 'תוך שעה',
          responseRate: 100,
          isSuperhost: true,
        },
        areaInfo: {
          accessibility: {
            distance: 'משתנה',
            parking: true,
            publicTransport: false,
          },
          activities: [],
          attractions: [],
          restaurants: [],
        },
        seoMetadata: {
          title: `${data.name} | MULTIBRAWN`,
          description: data.description.substring(0, 160) || `${data.name} - צימר מעולה`,
          keywords: [data.name, 'צימר', 'צפון', 'נופש'],
        },
        status: 'active',
        lastUpdated: new Date(),
      };

      console.log(`✅ Scraped: ${property.name}`);
      return property;

    } catch (error: any) {
      console.error(`❌ Error scraping ${locationId}:`, error.message);
      return null;
    } finally {
      await page.close();
    }
  }

  async scrapeMultiple(locationIds: string[]): Promise<AffiliateProperty[]> {
    const properties: AffiliateProperty[] = [];

    for (const locationId of locationIds) {
      const property = await this.scrapeProperty(locationId);
      if (property) {
        properties.push(property);
      }
      // Delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    return properties;
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}

export default Tzimer360PuppeteerScraper;