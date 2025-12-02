'use client';

import { useState, useEffect } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.gradientOverlay}></div>
      
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h1 className={styles.title}>
            <span className={styles.titleLine}>מולטיבראון</span>
            <span className={styles.titleLineGradient}>
              למציאת חופשה מצויינת
            </span>
          </h1>
          
          <p className={styles.description}>
            "כל אדם מגיע שווה לדוד ונתניה זה 100% אמיתי"
          </p>
          
          <div className={styles.ctaButtons}>
            <a
              href="#contact"
              className={styles.primaryButton}
            >
              <span>בואו נמצא לכם מקום מושלם</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            
            <a
              href="/gallery"
              className={styles.secondaryButton}
            >
              <span>צפו בגלריה</span>
            </a>
          </div>
          
          <div className={styles.trustBadges}>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>🏆</span>
              <span className={styles.badgeText}>9+ שנות ניסיון</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>⭐</span>
              <span className={styles.badgeText}>מאות לקוחות מרוצים</span>
            </div>
            <div className={styles.badge}>
              <span className={styles.badgeIcon}>💎</span>
              <span className={styles.badgeText}>שירות אישי מהיר</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className={styles.floatingElements}>
        <div className={styles.floatingCircle}></div>
        <div className={styles.floatingCircle}></div>
        <div className={styles.floatingCircle}></div>
      </div>
    </section>
  );
}
