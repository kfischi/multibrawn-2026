'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Tips.module.css';
import tipsData from '@/data/tips.json';

export default function TipsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'planning', label: 'תכנון' },
    { id: 'budget', label: 'תקציב' },
    { id: 'destinations', label: 'יעדים' },
    { id: 'accommodations', label: 'לינה' },
    { id: 'events', label: 'אירועים' },
    { id: 'amenities', label: 'שירותים' },
    { id: 'special-needs', label: 'צרכים מיוחדים' },
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tipsData.tips 
    : tipsData.tips.filter(tip => tip.category === selectedCategory);

  const openReel = (videoSrc: string) => {
    if (videoSrc) {
      setCurrentVideo(videoSrc);
      setModalOpen(true);
    }
  };

  const closeReel = () => {
    setModalOpen(false);
    setCurrentVideo('');
  };

  return (
    <div className={styles.tipsPage}>
      <div className={styles.contentSection}>
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>טיפים וידע</h1>
          <p className={styles.subtitle}>
            כל הטיפים שצריך לדעת לפני שמזמינים נופש, וילה או צימר
          </p>
        </div>

        {/* Categories Filter */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.categoryBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tips Grid */}
        <div className={styles.reelsGrid}>
          {filteredTips.map((tip) => (
            <div key={tip.id} className={styles.reelCard}>
              <div 
                className={styles.reelThumbnail}
                onClick={() => tip.videoUrl && openReel(tip.videoUrl)}
                style={{ cursor: tip.videoUrl ? 'pointer' : 'default' }}
              >
                <Image
                  src={tip.thumbnail}
                  alt={tip.title}
                  width={300}
                  height={400}
                  className={styles.thumbnail}
                />
                {tip.videoUrl && (
                  <div className={styles.playButton}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
                {!tip.videoUrl && (
                  <div className={styles.noVideoLabel}>
                    <span>📝 טיפ כתוב</span>
                  </div>
                )}
              </div>
              <div className={styles.reelInfo}>
                <h3 className={styles.reelTitle}>{tip.title}</h3>
                <p className={styles.reelDescription}>{tip.description}</p>
                <div className={styles.reelMeta}>
                  {tip.duration && <span>⏱️ {tip.duration}</span>}
                  <span>👁️ {tip.views}</span>
                </div>
                <div className={styles.tipContent}>
                  <ul>
                    {tip.content.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {modalOpen && (
        <div className={styles.modal} onClick={closeReel}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeReel}>
              ✕
            </button>
            <video
              src={currentVideo}
              controls
              autoPlay
              className={styles.video}
            />
          </div>
        </div>
      )}
    </div>
  );
}
