'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './TipCard.module.css';

interface TipCardProps {
  id: string;
  title: string;
  thumbnail: string;
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
  duration,
  views,
  description,
  category,
  featured = false,
  size = 'medium',
}: TipCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const categoryLabels: Record<string, string> = {
    planning: 'תכנון',
    romantic: 'רומנטי',
    family: 'משפחתי',
    budget: 'תקציב',
  };

  return (
    <div
      className={`${styles.card} ${styles[size]} ${featured ? styles.featured : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        <img
          src={thumbnail}
          alt={title}
          className={styles.image}
        />
        
        {/* Gradient Overlay */}
        <div className={styles.gradientOverlay}></div>
        
        {/* Duration Badge */}
        <div className={styles.duration}>{duration}</div>
        
        {/* Category Badge */}
        <div className={styles.category}>{categoryLabels[category]}</div>
        
        {/* Play Button */}
        <div className={`${styles.playButton} ${isHovered ? styles.visible : ''}`}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="white">
            <circle cx="12" cy="12" r="10" fill="rgba(0, 0, 0, 0.7)" />
            <polygon points="10,8 16,12 10,16" fill="white" />
          </svg>
        </div>
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
