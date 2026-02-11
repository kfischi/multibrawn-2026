'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: {
    id: string | number;
    name?: string;
    title?: string;
    description?: string;
    type?: string;
    location?: string;
    city?: string;
    price?: string | number;
    capacity?: number | string;
    rating?: number | string;
    images?: string[];
    image?: string;
    features?: string[];
    isAffiliate?: boolean;
    affiliateUrl?: string;
    affiliateCtaText?: string;
  };
}

const FALLBACK_IMAGE = 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg';

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  if (!property) return null;

  // נרמול נתונים
  const name = property.name || property.title || 'נכס אירוח';
  const location = property.location || property.city || 'מיקום לא צוין';
  const price = property.price ? `₪${property.price}` : 'צור קשר';
  const rating = Number(property.rating) || 5;
  const capacity = property.capacity || 4;

  // בניה בטוחה של הלינק לדף הפנימי
  // אם ה-ID חסר, אנחנו מייצרים לינק שלא עושה כלום כדי לא לשבור את האתר
  const internalLink = property.id ? `/property/${property.id}` : '#';

  // טיפול בתמונות
  const getSafeImages = () => {
    let images: string[] = [];
    if (Array.isArray(property.images) && property.images.length > 0) {
      images = property.images;
    } else if (typeof property.image === 'string' && property.image) {
      images = [property.image];
    }
    if (images.length === 0) {
      images = [FALLBACK_IMAGE];
    }
    return images;
  };

  const safeImages = getSafeImages();

  // ניווט בתמונות (מונע מעבר לדף כשלוחצים על החיצים)
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % safeImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImage((prev) => 
      (prev - 1 + safeImages.length) % safeImages.length
    );
  };

  return (
    <Link href={internalLink} className={styles.card}>
      
      {/* תג שותף */}
      {property.isAffiliate && (
        <div className={styles.affiliateBadge}>
          <span className={styles.badgeIcon}>💎</span>
          <span className={styles.badgeText}>מומלץ</span>
        </div>
      )}

      {/* תמונה */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <img
            src={safeImages[currentImage] || FALLBACK_IMAGE}
            alt={name}
            className={styles.mainImage}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
          />

          {safeImages.length > 1 && (
            <>
              <button onClick={prevImage} className={`${styles.navButton} ${styles.prev}`}>❮</button>
              <button onClick={nextImage} className={`${styles.navButton} ${styles.next}`}>❯</button>
            </>
          )}
        </div>
      </div>

      {/* תוכן */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.rating}>⭐ {rating}</div>
        </div>

        <div className={styles.location}>📍 {location}</div>

        <div className={styles.details}>
          <span className={styles.capacity}>👥 עד {capacity} אורחים</span>
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceAmount}>{price}</span>
            <span className={styles.priceLabel}> ללילה</span>
          </div>
          
          {/* כפתור דמה - הלינק האמיתי הוא על כל הכרטיס */}
          <button className={styles.viewButton}>
            פרטים והזמנה 👈
          </button>
        </div>
      </div>
    </Link>
  );
}
