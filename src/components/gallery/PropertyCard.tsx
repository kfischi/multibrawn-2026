'use client';

import { useState } from 'react';
import Link from 'next/link';
// מחקנו את השורה של react-icons שעשתה בעיות
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
    region?: string;
    price?: string | number;
    capacity?: number | string;
    rating?: number | string;
    images?: string[];
    image?: string;
    features?: string[];
    isAffiliate?: boolean;
    affiliateUrl?: string;
    affiliateProvider?: string;
    affiliateCtaText?: string;
  };
}

const FALLBACK_IMAGE = 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1/placeholder.jpg';

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  // הגנה 1: אם אין נכס
  if (!property) return null;

  // הגנה 2: נרמול נתונים
  const name = property.name || property.title || 'נכס אירוח';
  const description = property.description || '';
  const location = property.location || property.city || 'מיקום לא צוין';
  const price = property.price ? `₪${property.price}` : 'צור קשר';
  const rating = Number(property.rating) || 5;
  const capacity = property.capacity || 4;
  const features = property.features || [];

  // הגנה 3: טיפול בתמונות
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

  // פונקציות קרוסלה
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

  // לוגיקה לקישורים
  const isAffiliate = property.isAffiliate;
  const affiliateUrl = property.affiliateUrl || '#';
  
  const handleClick = (e: React.MouseEvent) => {
    if (isAffiliate && affiliateUrl) {
      // אופציונלי: לוגיקה נוספת בלחיצה
    }
  };

  const CardWrapper = Link;
  const href = isAffiliate ? affiliateUrl : `/property/${property.id}`;
  const target = isAffiliate ? '_blank' : undefined;

  return (
    <CardWrapper 
      href={href} 
      className={styles.card} 
      target={target}
      onClick={handleClick}
    >
      {/* תג שותף */}
      {isAffiliate && (
        <div className={styles.affiliateBadge}>
          <span className={styles.badgeIcon}>🤝</span>
          <span className={styles.badgeText}>שותף</span>
        </div>
      )}

      {/* איזור התמונות */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <img
            src={safeImages[currentImage] || FALLBACK_IMAGE}
            alt={name}
            className={styles.mainImage}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={(e) => {
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />

          {/* חיצים */}
          {safeImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className={`${styles.navButton} ${styles.prev}`}
                aria-label="הקודם"
              >
                ❮
              </button>
              <button
                onClick={nextImage}
                className={`${styles.navButton} ${styles.next}`}
                aria-label="הבא"
              >
                ❯
              </button>

              <div className={styles.imageCounter}>
                {currentImage + 1} / {safeImages.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* תוכן */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{name}</h3>
          <div className={styles.rating}>
            <span className={styles.star}>⭐</span>
            <span>{rating}</span>
          </div>
        </div>

        <div className={styles.location}>
          📍 {location}
        </div>

        <p className={styles.description}>
          {description.substring(0, 100)}...
        </p>

        <div className={styles.details}>
          <span className={styles.type}>{property.type || 'אירוח'}</span>
          <span className={styles.capacity}>👥 עד {capacity} אורחים</span>
        </div>

        {/* פיצ'רים */}
        {features.length > 0 && (
          <div className={styles.features}>
            {features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className={styles.feature}>
                {feature}
              </span>
            ))}
            {features.length > 3 && (
              <span className={styles.moreFeatures}>
                +{features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* פוטר */}
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceAmount}>{price}</span>
            <span className={styles.priceLabel}> ללילה</span>
          </div>

          <button className={styles.viewButton}>
            {isAffiliate 
              ? (property.affiliateCtaText || 'צפה בנכס')
              : 'פרטים נוספים'
            }
            {isAffiliate && (
              <span className={styles.externalIcon}>↗</span>
            )}
          </button>
        </div>
      </div>
    </CardWrapper>
  );
}
