'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Tips.module.css';

export default function TipsPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState('');

  const reels = [
    {
      id: 'reel1',
      title: '✡️ שבת חתן בראש שקט',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763722048/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_neqhs1.mp4',
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
        <h1 className={styles.pageTitle}>טיפים חשובים שחוסכים לכם כסף</h1>
        
        <div className={styles.reelsContainer}>
          <div className={styles.reelsGrid}>
            {reels.map((reel) => (
              <div
                key={reel.id}
                className={styles.reelCard}
                onClick={() => openReel(reel.video)}
              >
                <Image
                  src={reel.thumbnail}
                  alt={reel.title}
                  fill
                  className={styles.reelThumbnail}
                />
                <div className={styles.playButton}>
                  <i className="fas fa-play"></i>
                </div>
                <div className={styles.reelOverlay}>
                  <div className={styles.reelTitle}>{reel.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {modalOpen && (
        <div className={styles.videoModal} onClick={closeReel}>
          <div className={styles.modalCloseBtn}>
            <i className="fas fa-times"></i>
          </div>
          <video className={styles.modalVideo} controls autoPlay playsInline>
            <source src={currentVideo} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
}
