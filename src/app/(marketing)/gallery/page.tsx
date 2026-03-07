'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Gallery.module.css';

// ============================================
// 10 REAL PROPERTIES - EXACT FROM CSV
// ============================================
interface Property {
  id: string;
  name: string;
  description: string;
  location: string;
  type: string;
  image: string;
  gallery: string[];
  price: string;
  rating: number;
  features: string[];
  affiliateUrl: string;
}

const allProperties: Property[] = [
  {
    id: 'tzimer-001',
    name: 'מתחם נופש יוקרתי בנווה זוהר',
    description: 'מתחם אירוח יוקרתי על חוף ים המלח. בריכה מקורה, נוף פנורמי, מושלם לאירועים.',
    location: 'נווה זוהר, ים המלח',
    type: 'event',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771098896/1_tdqjak.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771098898/2_bo2h0b.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771098901/3_mdkgrd.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771098905/4_yyckc8.webp'
    ],
    price: '₪1,810 - ₪8,910',
    rating: 4.8,
    features: ['בריכה מקורה', 'נוף לים המלח', 'מתאים לאירועים'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4642?t=affiliate26'
  },
  {
    id: 'tzimer-002',
    name: 'בקתות יער רומנטיות בגליל העליון',
    description: 'בקתות עץ יוקרתיות בלב הגליל. ג׳קוזי פרטי, נוף הרים, שקט מוחלט.',
    location: 'אליפלט, גליל עליון',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771089103/1_p7eoq1.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771089104/2_earbgy.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771089104/3_vtwulx.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771089106/4_ghmhbk.webp'
    ],
    price: '₪1,200 - ₪2,500',
    rating: 4.9,
    features: ['ג\'קוזי פרטי', 'בקתות עץ', 'נוף הרים'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4655?t=affiliate26'
  },
  {
    id: 'tzimer-003',
    name: 'וילת אבן יוקרתית בחורשות הכרמל',
    description: 'וילת אבן בכפר הדרוזי. בריכה פרטית, אירוח אותנטי, נוף פנורמי.',
    location: 'בית ג\'ן, הגליל המערבי',
    type: 'villa',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771092098/1_x8csz9.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092099/2_wpcf6r.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092101/3_cmtzvf.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092102/4_e0welx.webp'
    ],
    price: '₪2,800 - ₪5,500',
    rating: 4.7,
    features: ['בריכה פרטית', 'אירוח דרוזי', 'וילת אבן'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4658?t=affiliate26'
  },
  {
    id: 'tzimer-004',
    name: 'וילה משפחתית עם בריכה פרטית',
    description: 'וילה עם בריכה מחוממת. נוף מדברי, קרוב לים המלח, פרטיות מלאה.',
    location: 'נווה זוהר, ים המלח',
    type: 'villa',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771092557/1_iynoio.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092558/2_shaom2.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092560/3_eozreh.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092562/4_gwi0s9.webp'
    ],
    price: '₪2,200 - ₪6,800',
    rating: 4.6,
    features: ['בריכה מחוממת', 'נוף מדברי', 'קרוב לים המלח'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4671?t=affiliate26'
  },
  {
    id: 'tzimer-005',
    name: 'אחוזת נופש מרווחת בבקעה',
    description: '12 סוויטות מול הכנרת. בריכה, ג׳קוזי בחדר, עיצוב מודרני.',
    location: 'טבריה, טבריה והכנרת',
    type: 'hotel',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771092885/1_gmw173.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092886/2_xmk5n8.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092889/3_ptfjog.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092891/4_syf3il.webp'
    ],
    price: '₪400 - ₪1,200',
    rating: 4.8,
    features: ['נוף לכנרת', 'בריכה משותפת', 'ג\'קוזי בחדר'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4675?t=affiliate26'
  },
  {
    id: 'tzimer-006',
    name: 'סוויטה רומנטית בשומרון',
    description: 'סוויטה רומנטית לזוגות. ג׳קוזי ספא, פרטיות מוחלטת, נוף כפרי.',
    location: 'מעלה עמוס, השומרון',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771093199/1_bk0rev.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093201/2_yzzx0u.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093203/3_zfijdd.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093206/4_slwn4l.webp'
    ],
    price: '₪800 - ₪1,500',
    rating: 4.9,
    features: ['ג\'קוזי ספא', 'לזוגות בלבד', 'פרטיות מלאה'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4676?t=affiliate26'
  },
  {
    id: 'tzimer-007',
    name: 'צימר רומנטי בשומרון',
    description: 'צימר רומנטי עם עיצוב חלומי. ג׳קוזי זוגי, תאורה מיוחדת, שקט.',
    location: 'מעלה עמוס, השומרון',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771093472/1_yfow2s.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093473/2_zdfqfq.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093476/3_spdloh.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093478/4_tttlsm.webp'
    ],
    price: '₪700 - ₪1,300',
    rating: 4.7,
    features: ['ג\'קוזי זוגי', 'עיצוב רומנטי', 'לזוגות בלבד'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4677?t=affiliate26'
  },
  {
    id: 'tzimer-008',
    name: 'פנטהאוז מודרני בתל אביב',
    description: 'פנטהאוז מודרני בלב תל אביב. הליכה לים, מרפסת גדולה, מיקום מעולה.',
    location: 'תל אביב, מרכז',
    type: 'apartment',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771093741/1_enya03.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093744/2_zf6z40.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093746/3_xvxvqy.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093749/4_zz1amp.webp'
    ],
    price: '₪1,800 - ₪4,500',
    rating: 4.8,
    features: ['מיקום מרכזי', 'קרוב לים', 'מרפסת גדולה'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4678?t=affiliate26'
  },
  {
    id: 'tzimer-009',
    name: 'סוויטה מעוצבת בגליל',
    description: 'סוויטה יוקרתית מעוצבת בסגנון מודרני מינימליסטי עם קווים נקיים וחומרים איכותיים. כוללת ג׳קוזי ספא פרטי, מיטת קינג סייז, מטבח מאובזר, מרפסת עם נוף ופינת ישיבה מעוצבת.',
    location: 'הגליל, גליל עליון',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771093971/1_g8twuh.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093974/2_ptkprq.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093977/3_gbsjai.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093980/4_wjxmcb.webp'
    ],
    price: '₪700 - ₪1,100',
    rating: 4.8,
    features: ['עיצוב מודרני', 'ג\'קוזי ספא', 'מיטת קינג'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C2303?t=affiliate26'
  },
  {
    id: 'tzimer-010',
    name: 'צימר יוקרתי ברמת הגולן',
    description: 'צימר יוקרתי ברמת הגולן עם נוף פנורמי עוצר נשימה להר חרמון והכנרת. הצימר כולל ג׳קוזי ספא, סאונה פרטית, אח, מרפסת גדולה עם פינת ישיבה ונוף מרהיב.',
    location: 'רמת הגולן, גולן',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771094272/1_gq2ici.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771094276/2_odtudx.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771094279/3_qzwwmr.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771094283/4_fj6vhc.webp'
    ],
    price: '₪900 - ₪1,400',
    rating: 4.9,
    features: ['נוף לחרמון', 'ג\'קוזי ספא', 'סאונה פרטית'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C2302?t=affiliate26'
  }
];

// Group by type
const properties = {
  villa: allProperties.filter(p => p.type === 'villa'),
  zimmer: allProperties.filter(p => p.type === 'zimmer'),
  apartment: allProperties.filter(p => p.type === 'apartment'),
  hotel: allProperties.filter(p => p.type === 'hotel'),
  event: allProperties.filter(p => p.type === 'event')
};

// ============================================
// CAROUSEL COMPONENT (Netflix Style)
// ============================================
function PropertyCarousel({ title, items, category }: { title: string; items: Property[]; category: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null); // For mobile tap

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (id: string) => {
    // Toggle tapped state on mobile
    setTappedId(tappedId === id ? null : id);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className={styles.carouselSection}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <Link href={`/gallery?category=${category}`} className={styles.viewAll}>
          צפה בהכל →
        </Link>
      </div>

      <div className={styles.carouselWrapper}>
        <button 
          className={`${styles.scrollBtn} ${styles.scrollLeft}`}
          onClick={() => scroll('left')}
          aria-label="גלול שמאלה"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className={styles.carousel} ref={carouselRef}>
          {items.map((property) => (
            <div
              key={property.id}
              className={`${styles.propertyCard} ${(hoveredId === property.id || tappedId === property.id) ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => handleCardClick(property.id)}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={property.image}
                  alt={property.name}
                  fill
                  className={styles.propertyImage}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 30vw"
                />
                
                {/* Rating Badge */}
                <div className={styles.ratingBadge}>
                  <span className={styles.star}>★</span>
                  <span>{property.rating.toFixed(1)}</span>
                </div>

                {/* Tzimer360 Credit - Always Visible */}
                <div className={styles.alwaysCredit}>
                  צימר360
                </div>

                {/* Tap Indicator - Mobile Only */}
                {tappedId !== property.id && (
                  <div className={styles.tapIndicator}>לחץ לפרטים</div>
                )}

                {/* Basic Info - Desktop Only (overlay) */}
                <div className={styles.basicInfo}>
                  <h3 className={styles.basicName}>{property.name}</h3>
                  <div className={styles.basicLocation}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{property.location}</span>
                  </div>
                  <p className={styles.basicPrice}>{property.price}</p>
                </div>

                {/* Desktop Hover Overlay + Mobile Tap Overlay */}
                {(hoveredId === property.id || tappedId === property.id) && (
                  <div className={styles.hoverOverlay}>
                    <div className={styles.overlayContent}>
                      <h3 className={styles.propertyName}>{property.name}</h3>
                      <div className={styles.propertyLocation}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        <span>{property.location}</span>
                      </div>
                      <p className={styles.propertyPrice}>{property.price}</p>
                      
                      <div className={styles.features}>
                        {property.features.slice(0, 3).map((feature, idx) => (
                          <span key={idx} className={styles.feature}>{feature}</span>
                        ))}
                      </div>

                      <a 
                        href={property.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.detailsBtn}
                        onClick={(e) => e.stopPropagation()}
                      >
                        צפה בנכס
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </a>

                      {/* Tzimer360 Credit */}
                      <div className={styles.partnerCredit}>
                        בשיתוף עם צימר360
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Text - BELOW Image */}
              <div className={styles.mobileTextBelow}>
                <h3 className={styles.basicName}>{property.name}</h3>
                <div className={styles.basicLocation}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>{property.location}</span>
                </div>
                <p className={styles.basicPrice}>{property.price}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className={`${styles.scrollBtn} ${styles.scrollRight}`}
          onClick={() => scroll('right')}
          aria-label="גלול ימינה"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

// ============================================
// MAIN GALLERY PAGE
// ============================================
export default function GalleryPage() {
  return (
    <div className={styles.galleryPage}>
      {/* Hero Section with VIDEO */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          {/* Desktop - Landscape 16:9 */}
          <source
            src="https://res.cloudinary.com/decirk3zb/video/upload/c_scale,w_1920,q_80/v1771101549/Gallery_zlvjwx.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
          {/* Mobile - Square/Vertical optimized */}
          <source
            src="https://res.cloudinary.com/decirk3zb/video/upload/ar_9:16,c_fill,g_center,w_720,q_80/v1771101549/Gallery_zlvjwx.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
        </video>
        <div className={styles.heroOverlay} />
      </section>

      {/* Titles BELOW Video */}
      <div className={styles.heroTitlesBelow}>
        <h1 className={styles.heroTitleBelow}>הגלריה שלנו</h1>
        <p className={styles.heroSubtitleBelow}>
          נכסים מובחרים • חוויית נופש יוקרתית • שירות ברמה הגבוהה ביותר
        </p>
      </div>

      {/* Property Carousels */}
      <div className={styles.carouselsContainer}>
        {properties.villa.length > 0 && (
          <PropertyCarousel
            title="🏛️ וילות יוקרה"
            items={properties.villa}
            category="villa"
          />
        )}

        {properties.zimmer.length > 0 && (
          <PropertyCarousel
            title="🏡 צימרים רומנטיים"
            items={properties.zimmer}
            category="zimmer"
          />
        )}

        {properties.apartment.length > 0 && (
          <PropertyCarousel
            title="🏙️ דירות נופש"
            items={properties.apartment}
            category="apartment"
          />
        )}

        {properties.hotel.length > 0 && (
          <PropertyCarousel
            title="🏨 מלונות בוטיק"
            items={properties.hotel}
            category="hotel"
          />
        )}

        {properties.event.length > 0 && (
          <PropertyCarousel
            title="💍 מתחמי אירועים"
            items={properties.event}
            category="event"
          />
        )}
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>לא מצאתם את מה שחיפשתם?</h2>
          <p className={styles.ctaSubtitle}>ערדית, העוזרת הדיגיטלית שלנו, תעזור לכם למצוא בדיוק מה שאתם צריכים</p>
          <button className={styles.ctaButton} onClick={() => {
            const chatBtn = document.querySelector('[data-chatbot]') as HTMLButtonElement;
            if (chatBtn) chatBtn.click();
          }}>
            דברו עם ערדית
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.68-.35-3.83-.96l-.27-.16-2.83.48.48-2.83-.16-.27C4.35 14.68 4 13.38 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
