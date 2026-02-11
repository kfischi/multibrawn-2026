'use client';

import Link from 'next/link';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: {
    id: string | number;
    name?: string;
    location?: string;
    price?: string | number;
    images?: any; // גמישות בפורמט התמונה (מחרוזת, מערך או אובייקט)
    rating?: number | string;
  };
}

// 1. הלינק החדש והתקין לתמונת ברירת מחדל
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1600596542815-22b4899975d6?q=80&w=800&auto=format&fit=crop';

export default function PropertyCard({ property }: PropertyCardProps) {
  if (!property || !property.id) return null;

  // 2. לוגיקה חכמה לחילוץ תמונה מכל פורמט אפשרי ב-Supabase
  let imageUrl = FALLBACK_IMAGE;
  
  if (property.images) {
      // אם זה אובייקט JSON עם שדה main (כמו שעשינו ב-SQL האחרון)
      if (typeof property.images === 'object' && !Array.isArray(property.images) && property.images.main) {
          imageUrl = property.images.main;
      }
      // אם זה מערך רגיל
      else if (Array.isArray(property.images) && property.images.length > 0) {
          imageUrl = property.images[0];
      } 
      // אם זו סתם מחרוזת טקסט (כמו 'http...')
      else if (typeof property.images === 'string' && property.images.length > 10) { 
          // בדיקה שהמחרוזת לא מכילה JSON שבור
          if (!property.images.includes('{')) {
              imageUrl = property.images;
          }
      }
  }

  // ניקוי המחיר להצגה
  const displayPrice = (property.price === '0' || property.price === 0) ? '' : `₪${property.price}`;
  const location = property.location || 'מיקום כללי';

  return (
    <Link href={`/property/${property.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={imageUrl}
          alt={property.name || 'נכס'}
          className={styles.mainImage}
          loading="lazy"
          onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
        />
        
        {/* שכבת טקסט על התמונה - סגנון נטפליקס */}
        <div className={styles.contentOverlay}>
          <h3 className={styles.title}>{property.name}</h3>
          <div className={styles.details}>
            <span>📍 {location}</span>
            {displayPrice && <span className={styles.price}>{displayPrice}</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
