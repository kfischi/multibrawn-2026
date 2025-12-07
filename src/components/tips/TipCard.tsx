'use client';

import { useState } from 'react';
import styles from './TipCard.module.css';

interface TipCardProps {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: string;
  description: string;
  category: string;
  featured?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function TipCard({
  id,
  title,
  thumbnail,
  videoUrl,
  duration,
  views,
  description,
  category,
  featured = false,
  size = 'medium',
}: TipCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categoryLabels: Record<string, string> = {
    planning: 'תכנון',
    romantic: 'רומנטי',
    family: 'משפחתי',
    budget: 'תקציב',
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div
      className={`${styles.card} ${styles[size]} ${featured ? styles.featured : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {!isPlaying ? (
          <>
            <img
              src={thumbnail}
              alt={title}
              className={styles.image}
            />
            
            <div className={styles.gradientOverlay}></div>
            <div className={styles.duration}>{duration}</div>
            <div className={styles.category}>{categoryLabels[category]}</div>
            
            {/* Play Button */}
            <button
              className={`${styles.playButton} ${isHovered ? styles.visible : ''}`}
              onClick={handlePlay}
              aria-label="נגן סרטון"
            >
              <svg width="60" height="60" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="rgba(0, 0, 0, 0.7)" />
                <polygon points="10,8 16,12 10,16" fill="white" />
              </svg>
            </button>
          </>
        ) : (
          <div className={styles.videoWrapper}>
            <video
              src={videoUrl}
              controls
              autoPlay
              className={styles.video}
              playsInline
            >
              הדפדפן שלך לא תומך בסרטונים.
            </video>
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        
        <div className={styles.meta}>
          <span className={styles.views}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {views} צפיות
          </span>
        </div>
      </div>
    </div>
  );
}
