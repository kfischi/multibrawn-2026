'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  image: string;
  features: string[];
  price?: string;
  description: string;
}

export default function PropertyCard({
  id,
  name,
  type,
  location,
  image,
  features,
  price,
  description,
}: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const typeLabels: Record<string, string> = {
    zimmer: 'צימר',
    villa: 'וילה',
    hotel: 'מלון בוטיק',
    event: 'מתחם אירועים',
  };

  const handleContact = () => {
    const message = encodeURIComponent(
      `היי! 👋\n\nאני מעוניין/ת במידע נוסף על:\n📍 ${name}\n🏠 ${typeLabels[type]}\n📌 ${location}\n\nתודה!`
    );
    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img
          src={image}
          alt={name}
          className={styles.image}
        />
        
        {/* Overlay */}
        <div className={styles.overlay}></div>
        
        {/* Type Badge */}
        <div className={styles.typeBadge}>{typeLabels[type]}</div>
        
        {/* Location Badge */}
        <div className={styles.locationBadge}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {location}
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.description}>{description}</p>

        {/* Features */}
        <div className={styles.features}>
          {features.slice(0, 3).map((feature, index) => (
            <span key={index} className={styles.feature}>
              {feature}
            </span>
          ))}
          {features.length > 3 && (
            <span className={styles.moreFeatures}>+{features.length - 3}</span>
          )}
        </div>

        {/* Price & CTA */}
        <div className={styles.footer}>
          {price && (
            <div className={styles.price}>
              החל מ-<strong>{price}</strong>
            </div>
          )}
          <button onClick={handleContact} className={styles.ctaButton}>
            פרטים נוספים
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
