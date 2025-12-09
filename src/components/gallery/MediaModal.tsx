'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './MediaModal.module.css';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: {
    url: string;
    type: 'image' | 'video';
    alt?: string;
  }[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function MediaModal({
  isOpen,
  onClose,
  media,
  currentIndex,
  onNavigate,
}: MediaModalProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Navigate with arrow keys
  useEffect(() => {
    const handleArrow = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleArrow);
    return () => window.removeEventListener('keydown', handleArrow);
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
      setIsVideoPlaying(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < media.length - 1) {
      onNavigate(currentIndex + 1);
      setIsVideoPlaying(false);
    }
  };

  if (!isOpen) return null;

  const currentMedia = media[currentIndex];

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="סגור">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6L18 18" />
          </svg>
        </button>

        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button className={`${styles.navButton} ${styles.prev}`} onClick={handlePrev} aria-label="קודם">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {currentIndex < media.length - 1 && (
          <button className={`${styles.navButton} ${styles.next}`} onClick={handleNext} aria-label="הבא">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Media Content */}
        <div className={styles.content}>
          {currentMedia.type === 'image' ? (
            <Image
              src={currentMedia.url}
              alt={currentMedia.alt || 'תמונה'}
              width={1200}
              height={800}
              className={styles.image}
              priority
            />
          ) : (
            <div className={styles.videoWrapper}>
              <video
                src={currentMedia.url}
                controls
                autoPlay={isVideoPlaying}
                className={styles.video}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                הדפדפן שלך לא תומך בהצגת וידאו.
              </video>
            </div>
          )}
        </div>

        {/* Counter */}
        <div className={styles.counter}>
          {currentIndex + 1} / {media.length}
        </div>

        {/* Thumbnails */}
        {media.length > 1 && (
          <div className={styles.thumbnails}>
            {media.map((item, index) => (
              <button
                key={index}
                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => {
                  onNavigate(index);
                  setIsVideoPlaying(false);
                }}
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.url}
                    alt={`תמונה ${index + 1}`}
                    width={80}
                    height={60}
                    className={styles.thumbnailImage}
                  />
                ) : (
                  <div className={styles.videoThumbnail}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
