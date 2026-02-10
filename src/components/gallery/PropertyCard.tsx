'use client';

import { useState } from 'react';
import Link from 'next/link';
// ויתרנו זמנית על next/image כדי למנוע בעיות דומיין
import { FaStar, FaMapMarkerAlt, FaUserFriends } from 'react-icons/fa'; // הוספתי אייקונים אם צריך
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: {
    id: string | number;
    name?: string;
    title?: string; // תמיכה בשמות ישנים
    description?: string;
    type?: string;
    location?: string;
    city?: string; // תמיכה במיקום ישן
    region?: string;
    price?: string | number;
    capacity?: number | string;
    rating?: number | string;
    images?: string[];
    image?: string; // תמיכה בתמונה בודדת
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

  // --- הגנה 1: אם אין נכס, לא מציגים כלום (במקום לקרוס) ---
  if (!property) return null;

  // --- הגנה 2: סידור נתונים (נרמול) ---
  // אנחנו מכינים את המשתנים מראש כדי שלא יהיו הפתעות ב-HTML
  const name = property.name || property.title || 'נכס אירוח';
  const description = property.description || '';
  const location = property.location || property.city || 'מיקום לא צוין';
  const price = property.price ? `₪${property.price}` : 'צור קשר';
  const rating = Number(property.rating) || 5;
  const capacity = property.capacity || 4;
  const features = property.features || [];

  // --- הגנה 3: טיפול בתמונות (הכי חשוב!) ---
  const getSafeImages = () => {
    let images: string[] = [];
    
    // ניסיון לקחת מערך תמונות
    if (Array.isArray(property.images) && property.images.length > 0) {
      images = property.images;
    } 
    // אם אין מערך, אולי יש תמונה בודדת?
    else if (typeof property.image === 'string' && property.image) {
      images = [property.image];
    }

    // אם עדיין אין כלום - תמונת ברירת מחדל
    if (images.length === 0) {
      images = [FALLBACK_IMAGE];
    }
    return images;
  };

  const safeImages = getSafeImages();

  // פונקציות קרוסלה (עובדות על המערך הבטוח)
  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // מונע כניסה לדף הנכס כשלוחצים על חץ
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
  
  // אם זה שותף - פותחים טאב חדש. אם זה רגיל - עוברים עמוד.
  const handleClick = (e: React.MouseEvent) => {
    if (isAffiliate && affiliateUrl) {
      // אין צורך ב-window.open כאן כי ה-Link מטפל בזה, אבל אפשר להשאיר ליתר ביטחון
    }
  };

  // קובעים את ה-Wrapper: או לינק חיצוני או לינק פנימי
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
          {/* שימוש ב-img רגיל כדי למנוע קריסות של דומיינים */}
          <img
            src={safeImages[currentImage] || FALLBACK_IMAGE}
            alt={name}
            className={styles.mainImage}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            onError={(e) => {
              // אם התמונה שבורה - החלף אותה מיד
              (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
            }}
          />

          {/* חיצים - רק אם יש יותר מתמונה אחת */}
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
