'use client';

import { useState } from 'react';
import MediaModal from './MediaModal';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  id: string;
  name: string;
  type: string;
  location: string;
  image: string;
  images?: string[];
  videoUrl?: string;
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
  images = [],
  videoUrl,
  features,
  price,
  description,
}: PropertyCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Combine all media (images + video)
  const allMedia = [
    image,
    ...images,
    ...(videoUrl ? [videoUrl] : [])
  ];

  const typeLabels: Record<string, string> = {
    zimmer: 'צימר',
    villa: 'וילה',
    hotel: 'מלון בוטיק',
    event: 'מתחם אירועים',
  };

  const handleContact = () => {
    const message = encodeURIComponent(
      `━━━━━━━━━━━━━━━━━━━━━
🏡 *פנייה מאתר MULTIBRAWN* 🏡
━━━━━━━━━━━━━━━━━━━━━

👤 *אני מעוניין/ת במידע על:*

📍 ${name}
🏠 ${typeLabels[type]}
📌 ${location}

━━━━━━━━━━━━━━━━━━━━━
📱 *מקור:* עמוד גלריה
🌐 *אתר:* multibrawn.co.il
━━━━━━━━━━━━━━━━━━━━━

תודה! 🙏`
    );
    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const openModal = (index: number) => {
    setCurrentMediaIndex(index);
    setModalOpen(true);
  };

  const handlePrev = () => {
    setCurrentMediaIndex((prev) => (prev > 0 ? prev - 1 : allMedia.length - 1));
  };

  const handleNext = () => {
    setCurrentMediaIndex((prev) => (prev < allMedia.length - 1 ? prev + 1 : 0));
  };

  const isVideo = (url: string) => url.includes('.mp4') || url.includes('video');
  const currentMedia = allMedia[currentMediaIndex];

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer} onClick={() => openModal(0)}>
          <img src={image} alt={name} className={styles.image} />
          
          <div className={styles.overlay}></div>
          <div className={styles.typeBadge}>{typeLabels[type]}</div>
          
          <div className={styles.locationBadge}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            {location}
          </div>

          {/* Media Count Badge */}
          {allMedia.length > 1 && (
            <div className={styles.mediaCount}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <path d="M2 12h20M7 6V4M17 6V4M7 20v2M17 20v2"/>
              </svg>
              {allMedia.length}
            </div>
          )}
        </div>

        <div className={styles.content}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.description}>{description}</p>

          <div className={styles.features}>
            {features.slice(0, 3).map((feature, index) => (
              <span key={index} className={styles.feature}>{feature}</span>
            ))}
            {features.length > 3 && (
              <span className={styles.moreFeatures}>+{features.length - 3}</span>
            )}
          </div>

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

      {/* Media Modal */}
      <MediaModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mediaUrl={currentMedia}
        mediaType={isVideo(currentMedia) ? 'video' : 'image'}
        title={name}
        onPrev={handlePrev}
        onNext={handleNext}
        hasPrev={currentMediaIndex > 0}
        hasNext={currentMediaIndex < allMedia.length - 1}
      />
    </>
  );
}
