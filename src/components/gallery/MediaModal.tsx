'use client';

import { useEffect, useRef } from 'react';
import styles from './MediaModal.module.css';

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  title?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export default function MediaModal({
  isOpen,
  onClose,
  mediaUrl,
  mediaType,
  title,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: MediaModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowLeft' && hasNext && onNext) onNext();
        if (e.key === 'ArrowRight' && hasPrev && onPrev) onPrev();
      };
      
      window.addEventListener('keydown', handleEscape);
      return () => {
        window.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose, onPrev, onNext, hasPrev, hasNext]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()} ref={modalRef}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose} aria-label="סגור">
          ✕
        </button>

        {/* Navigation Arrows */}
        {hasPrev && onPrev && (
          <button className={`${styles.navButton} ${styles.prevButton}`} onClick={onPrev} aria-label="קודם">
            ❮
          </button>
        )}
        {hasNext && onNext && (
          <button className={`${styles.navButton} ${styles.nextButton}`} onClick={onNext} aria-label="הבא">
            ❯
          </button>
        )}

        {/* Media Content */}
        <div className={styles.mediaContainer}>
          {mediaType === 'image' ? (
            <img src={mediaUrl} alt={title || 'תמונה'} className={styles.image} />
          ) : (
            <video
              src={mediaUrl}
              controls
              autoPlay
              className={styles.video}
              playsInline
            >
              הדפדפן שלך לא תומך בסרטונים.
            </video>
          )}
        </div>

        {/* Title */}
        {title && (
          <div className={styles.title}>
            {title}
          </div>
        )}
      </div>
    </div>
  );
}
