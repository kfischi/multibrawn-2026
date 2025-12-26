'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './Gallery.module.css';

export default function GalleryPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const categories = [
    { 
      id: 'all', 
      name: 'הכל', 
      icon: '🏠',
      description: '' 
    },
    { 
      id: 'villa', 
      name: 'וילות', 
      icon: '🏛️',
      description: 'וילות מרווחות ומפנקות עם בריכות פרטיות, גינות מטופחות ומתקנים לכל המשפחה. מושלם למשפחות גדולות, שבתות חתן ואירועים משפחתיים.' 
    },
    { 
      id: 'zimmer', 
      name: 'צימרים', 
      icon: '🏡',
      description: 'צימרים אינטימיים וחלומיים לזוגות ומשפחות. ג\'קוזי פרטי, נוף מרהיב ופרטיות מלאה. האפשרות המושלמת לסופ"ש רומנטי, חופשה משפחתית או חגיגה זוגית.' 
    },
    { 
      id: 'apartment', 
      name: 'דירות', 
      icon: '🏙️',
      description: 'דירות נופש מאובזרות במלואן במיקומים מרכזיים. מושלם למשפחות קטנות, זוגות או קבוצות חברים. קרוב לאטרקציות, חופים ומסעדות.' 
    },
    { 
      id: 'hotel', 
      name: 'מלונות', 
      icon: '🏨',
      description: 'מלונות בוטיק ויוקרתיים עם שירות אישי ברמה הגבוהה ביותר. ארוחות בוקר עשירות, ספא, בריכות מחוממות וחוויה בלתי נשכחת.' 
    },
    { 
      id: 'event', 
      name: 'אירועים', 
      icon: '💍',
      description: 'מתחמים ייחודיים לשבתות חתן, בר/בת מצווה ואירועים משפחתיים. כולל אולמות, חצרות מרווחות, מטבחים כשרים ואפשרות לינה לעשרות אורחים.' 
    },
  ];

  const galleryItems = {
    villa: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/21_f14cql.jpg', alt: 'וילה MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel2_ag6ani.jpg', alt: 'וילה MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818933/18_uwsdum.jpg', alt: 'וילה MULTIBRAWN' },
      { type: 'video', src: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1760818935/villa4.1_dhev1f.mp4', alt: 'וילה MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg', alt: 'וילה MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/20_t6yw8m.jpg', alt: 'וילה MULTIBRAWN' },
    ],
    zimmer: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg', alt: 'צימר MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726074/A7_rwzsuo.jpg', alt: 'צימר MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A6_h6irii.jpg', alt: 'צימר MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A5_irr575.jpg', alt: 'צימר MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726070/A4_mtzg9u.jpg', alt: 'צימר MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818996/Zimmer2_ge7g6h.jpg', alt: 'צימר MULTIBRAWN' },
    ],
    apartment: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg', alt: 'דירת נופש MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment2_u9fsdk.jpg', alt: 'דירת נופש MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/20_t6yw8m.jpg', alt: 'דירת נופש MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763724320/2_tlbzz1.jpg', alt: 'דירת נופש MULTIBRAWN' },
    ],
    hotel: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg', alt: 'מלון MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel2_ag6ani.jpg', alt: 'מלון MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1764666932/1_dywsb8.jpg', alt: 'מלון MULTIBRAWN' },
    ],
    event: [
      { type: 'video', src: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1762002985/1_s3cpd8.mp4', alt: 'מתחם אירועים MULTIBRAWN' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg', alt: 'מתחם אירועים MULTIBRAWN' },
    ],
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ type: '', src: '', alt: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredGalleryItems, setFilteredGalleryItems] = useState<any[]>([]);

  const openModal = (item: any, index: number, items: any[]) => {
    setModalContent(item);
    setCurrentImageIndex(index);
    setFilteredGalleryItems(items);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({ type: '', src: '', alt: '' });
  };

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % filteredGalleryItems.length;
    const nextItem = filteredGalleryItems[nextIndex];
    setCurrentImageIndex(nextIndex);
    setModalContent(nextItem);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length;
    const prevItem = filteredGalleryItems[prevIndex];
    setCurrentImageIndex(prevIndex);
    setModalContent(prevItem);
  };

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.entries(galleryItems).map(([category, items]) => ({
        category,
        items,
      }));
    }
    return [{ category: selectedCategory, items: galleryItems[selectedCategory as keyof typeof galleryItems] || [] }];
  };

  return (
    <div className={styles.galleryPage}>
      {/* Hero */}
      <div className={styles.galleryHero}>
        <div className={styles.heroContentInner}>
          <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
          <p className={styles.heroSubtitle}>הצצה למקומות הכי שווים בארץ</p>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filterContainer}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`${styles.filterBtn} ${selectedCategory === cat.id ? styles.active : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.id === 'all' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            )}
            {cat.id === 'villa' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            {cat.id === 'zimmer' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
            {cat.id === 'apartment' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
            )}
            {cat.id === 'hotel' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}
            {cat.id === 'event' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="7"/>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
              </svg>
            )}
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className={styles.gallerySection}>
        {getFilteredItems().map(({ category, items }) => {
          const categoryData = categories.find(c => c.id === category);
          return (
            <div key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>
                  {categoryData?.id === 'villa' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  )}
                  {categoryData?.id === 'zimmer' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  )}
                  {categoryData?.id === 'apartment' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <path d="M9 22V12h6v10"/>
                    </svg>
                  )}
                  {categoryData?.id === 'hotel' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                  {categoryData?.id === 'event' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="8" r="7"/>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                    </svg>
                  )}
                </div>
                <h2 className={styles.categoryTitle}>
                  {categoryData?.name}
                </h2>
              </div>
              {categoryData?.description && (
                <p className={styles.categoryDescription}>
                  {categoryData.description}
                </p>
              )}
              <div className={styles.galleryRow}>
              {items.map((item, idx) => (
                <div
                  key={idx}
                  className={styles.galleryCard}
                  onClick={() => openModal(item, idx, items)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.galleryImage}
                      loading="lazy"
                    />
                  ) : (
                    <>
                      <video className={styles.galleryImage} muted playsInline>
                        <source src={`${item.src}#t=0.1`} type="video/mp4" />
                      </video>
                      <div className={styles.videoPlayOverlay}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.videoModal} onClick={closeModal}>
          <div className={styles.modalCloseBtn} onClick={closeModal}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </div>
          
          {/* Previous Button */}
          {filteredGalleryItems.length > 1 && (
            <button 
              className={styles.modalNavBtn + ' ' + styles.modalPrevBtn}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              aria-label="תמונה קודמת"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          )}

          {/* Next Button */}
          {filteredGalleryItems.length > 1 && (
            <button 
              className={styles.modalNavBtn + ' ' + styles.modalNextBtn}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              aria-label="תמונה הבאה"
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()}>
          {modalContent.type === 'image' ? (
            <Image
              src={modalContent.src}
              alt={modalContent.alt}
              width={1200}
              height={800}
              className={styles.modalImage}
            />
          ) : (
            <video className={styles.modalVideo} controls autoPlay>
              <source src={modalContent.src} type="video/mp4" />
            </video>
          )}
          </div>
        </div>
      )}
    </div>
  );
}
