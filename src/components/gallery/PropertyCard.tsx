'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: {
    id: string;
    name: string;
    description: string;
    type: string;
    location: string;
    region: string;
    price: string;
    capacity: number;
    rating: number;
    images: string[];
    features: string[];
    isAffiliate?: boolean;
    affiliateUrl?: string;
    affiliateProvider?: string;
    affiliateCtaText?: string;
  };
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => 
      (prev - 1 + property.images.length) % property.images.length
    );
  };

  // Handle click - affiliate properties go to external link, regular to internal
  const handleClick = (e: React.MouseEvent) => {
    if (property.isAffiliate && property.affiliateUrl) {
      e.preventDefault();
      window.open(property.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const CardWrapper = property.isAffiliate ? 'div' : Link;
  const wrapperProps = property.isAffiliate 
    ? { onClick: handleClick, style: { cursor: 'pointer' } }
    : { href: `/properties/${property.id}` };

  return (
    <CardWrapper {...wrapperProps} className={styles.card}>
      {/* Affiliate Badge */}
      {property.isAffiliate && (
        <div className={styles.affiliateBadge}>
          <span className={styles.badgeIcon}>🤝</span>
          <span className={styles.badgeText}>שותף</span>
        </div>
      )}

      {/* Image Section with Carousel */}
      <div className={styles.imageSection}>
        <div className={styles.imageWrapper}>
          <Image
            src={property.images[currentImage]}
            alt={property.name}
            fill
            className={styles.mainImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Navigation Arrows - only if multiple images */}
          {property.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevImage();
                }}
                className={`${styles.navButton} ${styles.prev}`}
                aria-label="תמונה קודמת"
              >
                ❮
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
                className={`${styles.navButton} ${styles.next}`}
                aria-label="תמונה הבאה"
              >
                ❯
              </button>

              {/* Image Counter */}
              <div className={styles.imageCounter}>
                {currentImage + 1} / {property.images.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{property.name}</h3>
          <div className={styles.rating}>
            <span className={styles.star}>⭐</span>
            <span>{property.rating}</span>
          </div>
        </div>

        <div className={styles.location}>
          📍 {property.location} • {property.region}
        </div>

        <p className={styles.description}>
          {property.description.substring(0, 120)}...
        </p>

        <div className={styles.details}>
          <span className={styles.type}>{property.type}</span>
          <span className={styles.capacity}>👥 עד {property.capacity} אורחים</span>
        </div>

        {/* Features */}
        {property.features && property.features.length > 0 && (
          <div className={styles.features}>
            {property.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className={styles.feature}>
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className={styles.moreFeatures}>
                +{property.features.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.price}>
            <span className={styles.priceAmount}>{property.price}</span>
            <span className={styles.priceLabel}>ללילה</span>
          </div>

          <button className={styles.viewButton}>
            {property.isAffiliate 
              ? (property.affiliateCtaText || 'צפה בנכס')
              : 'פרטים נוספים'
            }
            {property.isAffiliate && (
              <span className={styles.externalIcon}>↗</span>
            )}
          </button>
        </div>

        {/* Affiliate Provider Logo */}
        {property.isAffiliate && property.affiliateProvider === 'tzimer360' && (
          <div className={styles.affiliateProvider}>
            <span className={styles.poweredBy}>באמצעות</span>
            <span className={styles.providerName}>Tzimer360</span>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
