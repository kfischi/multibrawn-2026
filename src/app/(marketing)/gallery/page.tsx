'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './Gallery.module.css';

// ============================================
// TYPES
// ============================================
interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

// ============================================
// GALLERY CONTENT COMPONENT
// ============================================
function GalleryContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams?.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<GalleryItem>({ type: 'image', src: '', alt: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [filteredGalleryItems, setFilteredGalleryItems] = useState<GalleryItem[]>([]);

  // ============================================
  // CATEGORIES DATA
  // ============================================
  const categories: Category[] = [
    { id: 'all', name: 'הכל', icon: '🏠', description: '' },
    { id: 'villa', name: 'וילות', icon: '🏛️', description: 'וילות מרווחות ומפנקות עם בריכות פרטיות, גינות מטופחות ומתקנים לכל המשפחה. מושלם למשפחות גדולות, שבתות חתן ואירועים משפחתיים.' },
    { id: 'zimmer', name: 'צימרים', icon: '🏡', description: 'צימרים אינטימיים וחלומיים לזוגות ומשפחות. ג\'קוזי פרטי, נוף מרהיב ופרטיות מלאה. האפשרות המושלמת לסופ"ש רומנטי, חופשה משפחתית או חגיגה זוגית.' },
    { id: 'apartment', name: 'דירות', icon: '🏙️', description: 'דירות נופש מאובזרות במלואן במיקומים מרכזיים. מושלם למשפחות קטנות, זוגות או קבוצות חברים. קרוב לאטרקציות, חופים ומסעדות.' },
    { id: 'hotel', name: 'מלונות', icon: '🏨', description: 'מלונות בוטיק ויוקרתיים עם שירות אישי ברמה הגבוהה ביותר. ארוחות בוקר עשירות, ספא, בריכות מחוממות וחוויה בלתי נשכחת.' },
    { id: 'event', name: 'אירועים', icon: '💍', description: 'מתחמים ייחודיים לשבתות חתן, בר/בת מצווה ואירועים משפחתיים. כולל אולמות, חצרות מרווחות, מטבחים כשרים ואפשרות לינה לעשרות אורחים.' }
  ];

  // ============================================
  // GALLERY ITEMS DATA
  // ============================================
  const galleryItems: Record<string, GalleryItem[]> = {
    villa: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Villa1_wjadot.jpg', alt: 'וילה מפוארת עם בריכה פרטית' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Villa2_bhq0zu.jpg', alt: 'וילה יוקרתית עם נוף מרהיב' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Villa3_auwgfv.jpg', alt: 'וילה עם גינה מטופחת' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg', alt: 'וילה פאר עם מתקנים' }
    ],
    zimmer: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg', alt: 'צימר רומנטי עם ג\'קוזי' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/BB_ksavxw.jpg', alt: 'צימר מעוצב בסגנון מודרני' }
    ],
    apartment: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg', alt: 'דירת נופש מאובזרת במלואה' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment2_rvcrhf.jpg', alt: 'דירה מודרנית במיקום מרכזי' }
    ],
    hotel: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg', alt: 'מלון בוטיק יוקרתי עם שירות 5 כוכבים' }
    ],
    event: [
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg', alt: 'מתחם אירועים מרהיב' },
      { type: 'image', src: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/2_gkqxlg.jpg', alt: 'אולם אירועים מפואר' }
    ]
  };

  // ============================================
  // MODAL FUNCTIONS
  // ============================================
  const openModal = (item: GalleryItem, index: number, items: GalleryItem[]) => {
    setModalContent(item);
    setCurrentImageIndex(index);
    setFilteredGalleryItems(items);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent({ type: 'image', src: '', alt: '' });
  };

  const nextImage = () => {
    if (filteredGalleryItems.length === 0) return;
    const nextIndex = (currentImageIndex + 1) % filteredGalleryItems.length;
    setCurrentImageIndex(nextIndex);
    setModalContent(filteredGalleryItems[nextIndex]);
  };

  const prevImage = () => {
    if (filteredGalleryItems.length === 0) return;
    const prevIndex = (currentImageIndex - 1 + filteredGalleryItems.length) % filteredGalleryItems.length;
    setCurrentImageIndex(prevIndex);
    setModalContent(filteredGalleryItems[prevIndex]);
  };

  // ============================================
  // FILTER FUNCTION
  // ============================================
  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return Object.entries(galleryItems).map(([category, items]) => ({
        category,
        items,
      }));
    }
    return [{ 
      category: selectedCategory, 
      items: galleryItems[selectedCategory] || [] 
    }];
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className={styles.galleryPage}>
      {/* Hero Section */}
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
            {cat.icon === '🏠' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            )}
            {cat.icon === '🏛️' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            )}
            {cat.icon === '🏡' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            )}
            {cat.icon === '🏙️' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <path d="M9 22V12h6v10"/>
              </svg>
            )}
            {cat.icon === '🏨' && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            )}
            {cat.icon === '💍' && (
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
          if (!items || items.length === 0) return null;

          return (
            <div key={category} className={styles.categorySection}>
              <div className={styles.categoryHeader}>
                <div className={styles.categoryIconWrapper}>
                  {categoryData?.icon === '🏛️' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  )}
                  {categoryData?.icon === '🏡' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  )}
                  {categoryData?.icon === '🏙️' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                      <path d="M9 22V12h6v10"/>
                    </svg>
                  )}
                  {categoryData?.icon === '🏨' && (
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                  )}
                  {categoryData?.icon === '💍' && (
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
              className={`${styles.modalNavBtn} ${styles.modalPrevBtn}`}
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
              className={`${styles.modalNavBtn} ${styles.modalNextBtn}`}
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

// ============================================
// MAIN EXPORT WITH SUSPENSE
// ============================================
export default function GalleryPage() {
  return (
    <Suspense fallback={
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        fontSize: '1.5rem',
        color: '#667eea'
      }}>
        טוען גלריה...
      </div>
    }>
      <GalleryContent />
    </Suspense>
  );
}
