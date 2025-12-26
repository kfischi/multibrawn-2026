// src/lib/cloudinaryLoader.js

/**
 * Custom Cloudinary Loader for Next.js
 * 
 * אופטימיזציה אוטומטית של תמונות מ-Cloudinary:
 * - גודל נכון לפי המכשיר
 * - פורמט מודרני (AVIF/WebP)
 * - דחיסה אופטימלית
 * - Lazy loading
 */

export default function cloudinaryLoader({ src, width, quality }) {
  // אם זה לא URL של Cloudinary, החזר כמו שזה
  if (!src.startsWith('https://res.cloudinary.com/')) {
    return src;
  }

  // חלץ את ה-cloud name וה-path
  const cloudinaryRegex = /https:\/\/res\.cloudinary\.com\/([^\/]+)\/(.+)/;
  const match = src.match(cloudinaryRegex);
  
  if (!match) {
    return src;
  }

  const [, cloudName, assetPath] = match;
  
  // בנה URL עם טרנספורמציות
  const params = [
    `f_auto`,              // פורמט אוטומטי (AVIF/WebP/JPG)
    `q_${quality || 75}`,  // איכות (ברירת מחדל 75)
    `w_${width}`,          // רוחב
    `c_limit`,             // שמור על aspect ratio
    `dpr_auto`,            // Device Pixel Ratio אוטומטי
  ];

  return `https://res.cloudinary.com/${cloudName}/image/upload/${params.join(',')}/${assetPath}`;
}

/**
 * דוגמאות לשימוש:
 * 
 * 1. תמונה רגילה:
 * <Image
 *   src="https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg"
 *   width={180}
 *   height={60}
 *   alt="לוגו"
 * />
 * 
 * יהפוך ל:
 * https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_75,w_180,c_limit,dpr_auto/v1766783584/Logo_1_sneunp.jpg
 * 
 * 2. תמונה באיכות גבוהה:
 * <Image
 *   src="..."
 *   width={1200}
 *   height={800}
 *   quality={95}
 *   alt="גלריה"
 * />
 * 
 * 3. Responsive:
 * <Image
 *   src="..."
 *   fill
 *   sizes="(max-width: 768px) 100vw, 50vw"
 *   alt="..."
 * />
 */
