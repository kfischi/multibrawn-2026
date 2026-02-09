import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

// הגדרת נתיב לכרום מקומי (למקרה שמריצים במחשב ולא בשרת)
const LOCAL_CHROME_EXECUTABLE = process.platform === 'win32'
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : process.platform === 'linux'
  ? '/usr/bin/google-chrome'
  : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

export class Tzimer360Scraper {
  private browser: any = null;

  /**
   * אתחול הדפדפן - כאן היה התיקון הקריטי ל-Netlify
   */
  async init() {
    if (this.browser) return;

    try {
      // בדיקה האם אנחנו רצים בשרת (Production/Netlify) או מקומית
      const isProduction = process.env.NODE_ENV === 'production' || process.env.AWS_LAMBDA_FUNCTION_VERSION;

      if (isProduction) {
        // --- הגדרות לשרת (Netlify) ---
        // הגדרת הפונטים נדרשת לפעמים לעברית
        await chromium.font('https://raw.githack.com/googlefonts/noto-emoji/main/fonts/NotoColorEmoji.ttf');

        this.browser = await puppeteer.launch({
          args: chromium.args,
          defaultViewport: { width: 1920, height: 1080 }, // התיקון: הגדרה ידנית במקום chromium.defaultViewport
          executablePath: await chromium.executablePath(),
          headless: chromium.headless,
          ignoreHTTPSErrors: true,
        });
      } else {
        // --- הגדרות למחשב מקומי (Development) ---
        this.browser = await puppeteer.launch({
          args: [],
          defaultViewport: { width: 1920, height: 1080 },
          headless: true, // שנה ל-false אם אתה רוצה לראות את הדפדפן נפתח
          executablePath: process.env.LOCAL_CHROME_PATH || LOCAL_CHROME_EXECUTABLE,
          channel: 'chrome' // עוזר למצוא את הדפדפן המותקן
        });
      }
    } catch (error) {
      console.error('Failed to launch browser:', error);
      throw error;
    }
  }

  /**
   * סגירת הדפדפן בסיום
   */
  async close() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  /**
   * הפונקציה שמבצעת את הסריקה בפועל
   * (העתק לכאן את הלוגיקה הקודמת שלך אם היא הייתה שונה)
   */
  async scrape(url: string) {
    if (!this.browser) {
      await this.init();
    }

    let page = null;
    try {
      page = await this.browser.newPage();
      
      // הגדרת User Agent כדי להיראות כמו דפדפן אמיתי
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

      // דוגמה ללוגיקת סריקה (התאם את זה למבנה האתר של צימר360)
      const data = await page.evaluate(() => {
        // כאן נכנסת הלוגיקה של שליפת המידע מה-DOM
        // למשל:
        const title = document.querySelector('h1')?.innerText || '';
        const price = document.querySelector('.price')?.innerText || '';
        const description = document.querySelector('.description')?.innerText || '';
        
        // איסוף תמונות
        const images = Array.from(document.querySelectorAll('img')).map(img => (img as HTMLImageElement).src).filter(src => src);

        return {
          title,
          price,
          description,
          images
        };
      });

      return data;

    } catch (error) {
      console.error(`Error scraping ${url}:`, error);
      return null;
    } finally {
      if (page) await page.close();
    }
  }
}
