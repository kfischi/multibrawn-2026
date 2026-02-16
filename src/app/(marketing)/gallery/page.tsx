'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Gallery.module.css';

// ============================================
// PROPERTY DATA
// ============================================
interface Property {
  id: string;
  name: string;
  location: string;
  type: string;
  image: string;
  price: string;
  rating: number;
  features: string[];
}

const properties = {
  villa: [
    {
      id: 'v1',
      name: 'וילת יוקרה - נוף גליל',
      location: 'גליל עליון',
      type: 'וילה',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Villa1_wjadot.jpg',
      price: '₪2,500-4,000 ללילה',
      rating: 4.9,
      features: ['בריכה פרטית', 'ג\'קוזי', '8 חדרים', 'נוף פנורמי']
    },
    {
      id: 'v2',
      name: 'וילה עם בריכה מחוממת',
      location: 'כרמיאל',
      type: 'וילה',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Villa2_bhq0zu.jpg',
      price: '₪3,000-5,000 ללילה',
      rating: 5.0,
      features: ['בריכה מחוממת', 'מטבח שף', '10 חדרים', 'גינה 2 דונם']
    },
    {
      id: 'v3',
      name: 'אחוזת פאר - צפון',
      location: 'רמת הגולן',
      type: 'וילה',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Villa3_auwgfv.jpg',
      price: '₪4,000-6,000 ללילה',
      rating: 4.8,
      features: ['וינרי פרטי', 'סאונה', '12 חדרים', 'חדר קולנוע']
    },
    {
      id: 'v4',
      name: 'וילה מעוצבת בגליל',
      location: 'גליל מערבי',
      type: 'וילה',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      price: '₪2,800-4,500 ללילה',
      rating: 4.9,
      features: ['עיצוב מודרני', 'בריכה אינסוף', '6 חדרים', 'נדנדות VIP']
    }
  ],
  zimmer: [
    {
      id: 'z1',
      name: 'צימר רומנטי - ערדית',
      location: 'גליל עליון',
      type: 'צימר',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
      price: '₪800-1,200 ללילה',
      rating: 4.9,
      features: ['ג\'קוזי ענק', 'אח בוערת', 'נוף הרים', 'פרטיות מלאה']
    },
    {
      id: 'z2',
      name: 'צימר בוטיק מעוצב',
      location: 'הגליל המערבי',
      type: 'צימר',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/BB_ksavxw.jpg',
      price: '₪900-1,400 ללילה',
      rating: 5.0,
      features: ['עיצוב יוקרתי', 'ג\'קוזי פרטי', 'מרפסת רומנטית', 'ארוחת בוקר']
    }
  ],
  apartment: [
    {
      id: 'a1',
      name: 'דירת יוקרה - תל אביב',
      location: 'תל אביב',
      type: 'דירת נופש',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg',
      price: '₪1,200-1,800 ללילה',
      rating: 4.7,
      features: ['נוף לים', '4 חדרים', 'מיקום מרכזי', 'חניה פרטית']
    },
    {
      id: 'a2',
      name: 'פנטהאוז מרשים',
      location: 'הרצליה פיתוח',
      type: 'דירת נופש',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment2_rvcrhf.jpg',
      price: '₪2,000-3,000 ללילה',
      rating: 4.9,
      features: ['גג עם בריכה', '5 חדרים', 'נוף 360', 'מעלית פרטית']
    }
  ],
  hotel: [
    {
      id: 'h1',
      name: 'מלון בוטיק פאר',
      location: 'ירושלים',
      type: 'מלון בוטיק',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg',
      price: '₪1,500-2,500 ללילה',
      rating: 5.0,
      features: ['ספא מפנק', 'מסעדה כשרה', 'שירות חדרים 24/7', 'סוויטות יוקרה']
    }
  ],
  event: [
    {
      id: 'e1',
      name: 'מתחם אירועים מפואר',
      location: 'מושב בצפון',
      type: 'מתחם אירועים',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg',
      price: 'לפי הצעת מחיר',
      rating: 4.9,
      features: ['עד 200 איש', 'מטבח כשר', 'לינה 50 איש', 'גינה 5 דונם']
    },
    {
      id: 'e2',
      name: 'אולם יוקרתי',
      location: 'גליל עליון',
      type: 'מתחם אירועים',
      image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/2_gkqxlg.jpg',
      price: 'לפי הצעת מחיר',
      rating: 5.0,
      features: ['עד 150 איש', 'אולם מעוצב', 'דיג\'יי + תאורה', 'לינה במקום']
    }
  ]
};

// ============================================
// CAROUSEL COMPONENT (Netflix Style)
// ============================================
function PropertyCarousel({ title, items, category }: { title: string; items: Property[]; category: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.carouselSection}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
        <Link href={`/gallery/${category}`} className={styles.viewAll}>
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
              className={`${styles.propertyCard} ${hoveredId === property.id ? styles.hovered : ''}`}
              onMouseEnter={() => setHoveredId(property.id)}
              onMouseLeave={() => setHoveredId(null)}
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
                  <span>{property.rating}</span>
                </div>

                {/* Hover Overlay */}
                {hoveredId === property.id && (
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

                      <button className={styles.detailsBtn}>
                        צפה בפרטים
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
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
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>הגלריה שלנו</h1>
            <p className={styles.heroSubtitle}>
              חוויית נופש יוקרתית • נכסים מובחרים • שירות ברמה הגבוהה ביותר
            </p>
          </div>
        </div>
        <Image
          src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762004983/HERO_zb7pwc.jpg"
          alt="Hero Background"
          fill
          className={styles.heroImage}
          priority
          sizes="100vw"
        />
      </section>

      {/* Property Carousels */}
      <div className={styles.carouselsContainer}>
        <PropertyCarousel
          title="🏛️ וילות יוקרה"
          items={properties.villa}
          category="villa"
        />

        <PropertyCarousel
          title="🏡 צימרים רומנטיים"
          items={properties.zimmer}
          category="zimmer"
        />

        <PropertyCarousel
          title="🏙️ דירות נופש"
          items={properties.apartment}
          category="apartment"
        />

        <PropertyCarousel
          title="🏨 מלונות בוטיק"
          items={properties.hotel}
          category="hotel"
        />

        <PropertyCarousel
          title="💍 מתחמי אירועים"
          items={properties.event}
          category="event"
        />
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>לא מצאתם את מה שחיפשתם?</h2>
          <p className={styles.ctaSubtitle}>ערדית, העוזרת הדיגיטלית שלנו, תעזור לכם למצוא בדיוק מה שאתם צריכים</p>
          <button className={styles.ctaButton}>
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
