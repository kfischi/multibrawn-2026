'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Gallery.module.css';

// ============================================
// ALL PROPERTIES — Tzimer360 (10) + MULTIBRAWN originals (11)
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
  affiliateUrl?: string;
  isOwn?: boolean;
}

const allProperties: Property[] = [
  // ── Tzimer360 Affiliate Properties ──
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
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771098905/4_yyckc8.webp',
    ],
    price: '₪1,810 - ₪8,910',
    rating: 4.8,
    features: ['בריכה מקורה', 'נוף לים המלח', 'מתאים לאירועים'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4642?t=affiliate26',
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
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771089106/4_ghmhbk.webp',
    ],
    price: '₪1,200 - ₪2,500',
    rating: 4.9,
    features: ['ג\'קוזי פרטי', 'בקתות עץ', 'נוף הרים'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4655?t=affiliate26',
  },
  {
    id: 'tzimer-003',
    name: 'וילת אבן יוקרתית בגליל המערבי',
    description: 'וילת אבן בכפר הדרוזי. בריכה פרטית, אירוח אותנטי, נוף פנורמי.',
    location: 'בית ג\'ן, הגליל המערבי',
    type: 'villa',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771092098/1_x8csz9.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092099/2_wpcf6r.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092101/3_cmtzvf.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092102/4_e0welx.webp',
    ],
    price: '₪2,800 - ₪5,500',
    rating: 4.7,
    features: ['בריכה פרטית', 'אירוח דרוזי', 'וילת אבן'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4658?t=affiliate26',
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
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092562/4_gwi0s9.webp',
    ],
    price: '₪2,200 - ₪6,800',
    rating: 4.6,
    features: ['בריכה מחוממת', 'נוף מדברי', 'קרוב לים המלח'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4671?t=affiliate26',
  },
  {
    id: 'tzimer-005',
    name: 'אחוזת נופש מרווחת מול הכנרת',
    description: '12 סוויטות מול הכנרת. בריכה, ג׳קוזי בחדר, עיצוב מודרני.',
    location: 'טבריה, הכנרת',
    type: 'hotel',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771092885/1_gmw173.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092886/2_xmk5n8.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092889/3_ptfjog.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771092891/4_syf3il.webp',
    ],
    price: '₪400 - ₪1,200',
    rating: 4.8,
    features: ['נוף לכנרת', 'בריכה משותפת', 'ג\'קוזי בחדר'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4675?t=affiliate26',
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
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093206/4_slwn4l.webp',
    ],
    price: '₪800 - ₪1,500',
    rating: 4.9,
    features: ['ג\'קוזי ספא', 'לזוגות בלבד', 'פרטיות מלאה'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4676?t=affiliate26',
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
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093478/4_tttlsm.webp',
    ],
    price: '₪700 - ₪1,300',
    rating: 4.7,
    features: ['ג\'קוזי זוגי', 'עיצוב רומנטי', 'לזוגות בלבד'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4677?t=affiliate26',
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
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093749/4_zz1amp.webp',
    ],
    price: '₪1,800 - ₪4,500',
    rating: 4.8,
    features: ['מיקום מרכזי', 'קרוב לים', 'מרפסת גדולה'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C4678?t=affiliate26',
  },
  {
    id: 'tzimer-009',
    name: 'סוויטה מעוצבת בגליל',
    description: 'סוויטה יוקרתית מעוצבת. ג׳קוזי ספא פרטי, מיטת קינג, מרפסת עם נוף.',
    location: 'הגליל, גליל עליון',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771093971/1_g8twuh.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093974/2_ptkprq.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093977/3_gbsjai.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771093980/4_wjxmcb.webp',
    ],
    price: '₪700 - ₪1,100',
    rating: 4.8,
    features: ['עיצוב מודרני', 'ג\'קוזי ספא', 'מיטת קינג'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C2303?t=affiliate26',
  },
  {
    id: 'tzimer-010',
    name: 'צימר יוקרתי ברמת הגולן',
    description: 'נוף פנורמי להר חרמון והכנרת. ג׳קוזי ספא, סאונה פרטית, אח.',
    location: 'רמת הגולן, גולן',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/decirk3zb/image/upload/v1771094272/1_gq2ici.webp',
    gallery: [
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771094276/2_odtudx.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771094279/3_qzwwmr.webp',
      'https://res.cloudinary.com/decirk3zb/image/upload/v1771094283/4_fj6vhc.webp',
    ],
    price: '₪900 - ₪1,400',
    rating: 4.9,
    features: ['נוף לחרמון', 'ג\'קוזי ספא', 'סאונה פרטית'],
    affiliateUrl: 'https://www.tzimer360.co.il/Location/C2302?t=affiliate26',
  },

  // ── MULTIBRAWN Original Properties ──
  {
    id: 'mb-villa-001',
    name: 'וילה יוקרתית עם נוף מדהים',
    description: 'וילה מרווחת ומפנקת עם בריכה פרטית ונוף פנורמי.',
    location: 'ישראל',
    type: 'villa',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/21_f14cql.jpg',
    gallery: [
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818933/18_uwsdum.jpg',
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/20_t6yw8m.jpg',
    ],
    price: 'לפי פנייה',
    rating: 4.9,
    features: ['בריכה פרטית', 'נוף פנורמי', 'גינה מטופחת'],
    isOwn: true,
  },
  {
    id: 'mb-villa-002',
    name: 'וילה מפוארת למשפחות',
    description: 'וילה גדולה ומאובזרת לאירוח משפחתי יוקרתי.',
    location: 'ישראל',
    type: 'villa',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel2_ag6ani.jpg',
    gallery: [],
    price: 'לפי פנייה',
    rating: 4.8,
    features: ['מרווחת', 'מאובזרת', 'שירות VIP'],
    isOwn: true,
  },
  {
    id: 'mb-zimmer-001',
    name: 'צימר רומנטי עם ג\'קוזי',
    description: 'צימר אינטימי ומפנק לזוגות עם ג\'קוזי פרטי ונוף מרהיב.',
    location: 'גליל עליון',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg',
    gallery: [
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726074/A7_rwzsuo.jpg',
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A6_h6irii.jpg',
    ],
    price: 'לפי פנייה',
    rating: 4.9,
    features: ['ג\'קוזי פרטי', 'נוף להרים', 'פרטיות מלאה'],
    isOwn: true,
  },
  {
    id: 'mb-zimmer-002',
    name: 'סוויטה עם נוף פנורמי',
    description: 'סוויטה מעוצבת בטוב טעם עם נוף פנורמי לים ולהרים.',
    location: 'גליל מערבי',
    type: 'zimmer',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A5_irr575.jpg',
    gallery: [
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726070/A4_mtzg9u.jpg',
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818996/Zimmer2_ge7g6h.jpg',
    ],
    price: 'לפי פנייה',
    rating: 4.8,
    features: ['נוף פנורמי', 'מרפסת פרטית', 'ג\'קוזי'],
    isOwn: true,
  },
  {
    id: 'mb-apt-001',
    name: 'דירת נופש מודרנית',
    description: 'דירת נופש מרווחת ומעוצבת במרכז הארץ.',
    location: 'מרכז',
    type: 'apartment',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg',
    gallery: [
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment2_u9fsdk.jpg',
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763724320/2_tlbzz1.jpg',
    ],
    price: 'לפי פנייה',
    rating: 4.7,
    features: ['מטבח מאובזר', '2 חדרי שינה', 'WiFi'],
    isOwn: true,
  },
  {
    id: 'mb-hotel-001',
    name: 'מלון בוטיק יוקרתי',
    description: 'מלון בוטיק עם שירות אישי ברמה הגבוהה ביותר.',
    location: 'ישראל',
    type: 'hotel',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg',
    gallery: [
      'https://res.cloudinary.com/dptyfvwyo/image/upload/v1764666932/1_dywsb8.jpg',
    ],
    price: 'לפי פנייה',
    rating: 4.8,
    features: ['שירות אישי', 'ארוחת בוקר', 'ספא'],
    isOwn: true,
  },
  {
    id: 'mb-event-001',
    name: 'מתחם אירועים מפואר',
    description: 'מתחם מושלם לחתונות, שבתות חתן ואירועים משפחתיים.',
    location: 'מרכז הארץ',
    type: 'event',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg',
    gallery: [],
    price: 'לפי פנייה',
    rating: 4.9,
    features: ['אולם מפואר', 'חצר גדולה', 'חניה רחבה'],
    isOwn: true,
  },
];

// Group by type
const properties = {
  villa:     allProperties.filter(p => p.type === 'villa'),
  zimmer:    allProperties.filter(p => p.type === 'zimmer'),
  apartment: allProperties.filter(p => p.type === 'apartment'),
  hotel:     allProperties.filter(p => p.type === 'hotel'),
  event:     allProperties.filter(p => p.type === 'event'),
};

// ============================================
// CAROUSEL COMPONENT (Netflix Style)
// ============================================
function PropertyCarousel({ title, items, category }: { title: string; items: Property[]; category: string }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [tappedId, setTappedId] = useState<string | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCardClick = (id: string) => {
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

                {/* Source Credit */}
                <div className={styles.alwaysCredit}>
                  {property.isOwn ? 'MULTIBRAWN' : 'צימר360'}
                </div>

                {/* Tap Indicator - Mobile */}
                {tappedId !== property.id && (
                  <div className={styles.tapIndicator}>לחץ לפרטים</div>
                )}

                {/* Basic Info - Desktop */}
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

                {/* Hover / Tap Overlay */}
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

                      {property.affiliateUrl ? (
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
                      ) : (
                        <a
                          href="https://wa.me/972523983394"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.detailsBtn}
                          onClick={(e) => e.stopPropagation()}
                        >
                          צור קשר WhatsApp
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                      )}

                      <div className={styles.partnerCredit}>
                        {property.isOwn ? 'נכס MULTIBRAWN' : 'בשיתוף עם צימר360'}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Text Below */}
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
      {/* Hero Video */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://res.cloudinary.com/decirk3zb/video/upload/c_scale,w_1920,q_80/v1771101549/Gallery_zlvjwx.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
          <source
            src="https://res.cloudinary.com/decirk3zb/video/upload/ar_9:16,c_fill,g_center,w_720,q_80/v1771101549/Gallery_zlvjwx.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
        </video>
        <div className={styles.heroOverlay} />
      </section>

      {/* Titles Below Video */}
      <div className={styles.heroTitlesBelow}>
        <h1 className={styles.heroTitleBelow}>הגלריה שלנו</h1>
        <p className={styles.heroSubtitleBelow}>
          נכסים מובחרים • חוויית נופש יוקרתית • שירות ברמה הגבוהה ביותר
        </p>
      </div>

      {/* Property Carousels */}
      <div className={styles.carouselsContainer}>
        {properties.villa.length > 0 && (
          <PropertyCarousel title="🏛️ וילות יוקרה" items={properties.villa} category="villa" />
        )}
        {properties.zimmer.length > 0 && (
          <PropertyCarousel title="🏡 צימרים רומנטיים" items={properties.zimmer} category="zimmer" />
        )}
        {properties.apartment.length > 0 && (
          <PropertyCarousel title="🏙️ דירות נופש" items={properties.apartment} category="apartment" />
        )}
        {properties.hotel.length > 0 && (
          <PropertyCarousel title="🏨 מלונות בוטיק" items={properties.hotel} category="hotel" />
        )}
        {properties.event.length > 0 && (
          <PropertyCarousel title="💍 מתחמי אירועים" items={properties.event} category="event" />
        )}
      </div>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>לא מצאתם את מה שחיפשתם?</h2>
          <p className={styles.ctaSubtitle}>ערדית, העוזרת הדיגיטלית שלנו, תעזור לכם למצוא בדיוק מה שאתם צריכים</p>
          <button
            className={styles.ctaButton}
            onClick={() => {
              const chatBtn = document.querySelector('[data-chatbot]') as HTMLButtonElement;
              if (chatBtn) chatBtn.click();
            }}
          >
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
