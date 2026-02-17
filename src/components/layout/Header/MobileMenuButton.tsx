'use client';

import { useState, useEffect } from 'react';
import styles from './MobileMenuIndicators.module.css';

export default function MobileMenuButton({ 
  isOpen, 
  onClick 
}: { 
  isOpen: boolean; 
  onClick: () => void;
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has seen the menu before
    const hasSeenMenu = localStorage.getItem('hasSeenMenu');
    
    if (!hasSeenMenu) {
      // Show tooltip after 3 seconds
      const tooltipTimer = setTimeout(() => {
        setShowTooltip(true);
      }, 3000);

      // Hide tooltip after 8 seconds
      const hideTimer = setTimeout(() => {
        setShowTooltip(false);
      }, 8000);

      return () => {
        clearTimeout(tooltipTimer);
        clearTimeout(hideTimer);
      };
    }
  }, []);

  const handleClick = () => {
    // Mark as interacted
    setHasInteracted(true);
    localStorage.setItem('hasSeenMenu', 'true');
    setShowTooltip(false);
    onClick();
  };

  return (
    <div className={styles.menuButton}>
      <button
        className={`${styles.hamburger} ${hasInteracted ? styles.interacted : ''} ${styles.menuHighlight}`}
        onClick={handleClick}
        aria-label="תפריט"
        aria-expanded={isOpen}
      >
        {/* Pulsing Badge */}
        {!hasInteracted && !isOpen && (
          <span className={styles.menuBadge}>חדש</span>
        )}

        {/* Hamburger Lines */}
        <span className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.lineOpen : ''}`}></span>

        {/* Tooltip */}
        <div className={`${styles.menuTooltip} ${showTooltip ? styles.show : ''}`}>
          👆 לחץ כאן לתפריט מלא
        </div>
      </button>

      {/* Menu Label */}
      <span className={styles.menuLabel}>תפריט</span>
    </div>
  );
}
