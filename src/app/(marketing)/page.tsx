'use client';

import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Video */}
      <section className={styles.hero}>
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
          poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
        >
          <source
            src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4"
            type="video/mp4"
          />
        </video>
        
        <div className={styles.heroOverlay}></div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>הלוקיישן המושלם מחכה לכם</h1>
          <p className={styles.heroSubtitle}>
            וילות יוקרה, צימרים ומתחמי אירועים בסטנדרט בינלאומי
          </p>
          <div className={styles.heroCta}>
            <Link href="/contact" className={styles.ctaButtonPrimary}>
              בואו נמצא לכם מקום
            </Link>
            <Link href="/gallery" className={styles.ctaButtonSecondary}>
              צפו בגלריה
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className={styles.categories}>
        <div className={styles.container}>
          <div className={styles.categoriesGrid}>
            {/* Villa */}
            <Link href="/gallery?category=villa" className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
                  alt="וילות מפוארות עם בריכות ונוף מרהיב"
                  fill
                  className={styles.categoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className={styles.categoryTitle}>וילות מפוארות</h3>
            </Link>

            {/* Zimmer */}
            <Link href="/gallery?category=zimmer" className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg"
                  alt="צימרים רומנטיים עם ג'קוזי ואווירה אינטימית"
                  fill
                  className={styles.categoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className={styles.categoryTitle}>צימרים</h3>
            </Link>

            {/* Apartment */}
            <Link href="/gallery?category=apartment" className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg"
                  alt="דירות נופש מעוצבות במיקומים מרכזיים"
                  fill
                  className={styles.categoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className={styles.categoryTitle}>דירות נופש</h3>
            </Link>

            {/* Hotel */}
            <Link href="/gallery?category=hotel" className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg"
                  alt="מלונות בוטיק יוקרתיים עם שירות מלא"
                  fill
                  className={styles.categoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className={styles.categoryTitle}>מלונות בוטיק</h3>
            </Link>

            {/* Event */}
            <Link href="/gallery?category=event" className={styles.categoryCard}>
              <div className={styles.categoryImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg"
                  alt="מתחמי אירועים מרהיבים לחתונות ואירועים"
                  fill
                  className={styles.categoryImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className={styles.categoryTitle}>מתחמי אירועים</h3>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
