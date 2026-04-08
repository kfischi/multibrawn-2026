'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Tips.module.css';
import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';

export default function TipsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const reels = [
    {
      id: 'reel1',
      title: '✡️ שבת חתן בראש שקט',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684490/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_gamaqi.mp4',
    },
    {
      id: 'reel2',
      title: '🌴 נוסעים לאילת? תיזהרו',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828637/%D7%90%D7%99%D7%9C%D7%AA_rtmczk.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684426/%D7%90%D7%99%D7%9C%D7%AA_ba7jjj.mp4',
    },
    {
      id: 'reel3',
      title: '💰 מחפשים זול?',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828638/%D7%96%D7%95%D7%9C_t7cops.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763718107/%D7%96%D7%95%D7%9C_lcwakc.mp4',
    },
    {
      id: 'reel4',
      title: '⚠️ ממה להיזהר בוילה',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684101/Video3_omgivy.mp4',
    },
  ];

  const openReel = (videoSrc: string) => {
    setCurrentVideo(videoSrc);
    setModalOpen(true);
  };

  const closeReel = () => {
    setModalOpen(false);
    setCurrentVideo('');
  };

  return (
    <div className={styles.tipsPage}>
      <div className={styles.contentSection}>
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.mainTitle}>טיפים מקצועיים</h1>
          <p className={styles.subtitle}>
            פינת הטיפים של מולטיבראון<br />
            שלא תשמעו בשום מקום
          </p>
        </div>

        {/* Reels Grid */}
        <div className={styles.reelsGrid}>
          {reels.map((reel) => (
            <div
              key={reel.id}
              className={styles.reelCard}
              onClick={() => openReel(reel.video)}
            >
              <div className={styles.reelThumbnail}>
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  width={300}
                  height={400}
                  className={styles.thumbnail}
                />
                <div className={styles.playButton}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className={styles.reelOverlay}>
                <h3 className={styles.reelTitle}>{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Social CTA */}
        <div className={styles.socialCTA}>
          <h2 className={styles.ctaTitle}>לטיפים נוספים ועוד מידע</h2>
          <p className={styles.ctaSubtitle}>כנסו לערוצים שלנו</p>
          <div className={styles.socialWrapper}>
            <SocialLinks />
          </div>
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
