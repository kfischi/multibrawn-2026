'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Home.module.css';

export default function HomePage() {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Scroll Reveal Animation
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealed);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(`.${styles.revealOnScroll}`);
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className={styles.homePage}>
      {/* Hero Video Section */}
      <section className={styles.heroVideo}>
        <video
          className={styles.videoBg}
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4"
            type="video/mp4"
          />
        </video>
        
        <div className={styles.videoOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>הלוקיישן המושלם מחכה לכם</h1>
            <p className={styles.heroSubtitle}>
              וילות יוקרה, צימרים ומתחמי אירועים בסטנדרט בינלאומי
            </p>
            
            <div className={styles.heroBtnGroup}>
              <Link href="/contact" className={`${styles.heroBtn} ${styles.btnPrimary}`}>
                בואו נמצא לכם מקום
              </Link>
              <Link href="/gallery" className={`${styles.heroBtn} ${styles.btnGlass}`}>
                צפו בגלריה
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Location Cards Grid */}
      <section className={styles.locationsGrid}>
        {/* Villa Card */}
        <Link href="/gallery?category=villa" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
            alt="וילות מפוארות"
            fill
            className={styles.locationImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={styles.locationOverlay}>
            <h3>וילות מפוארות</h3>
          </div>
        </Link>

        {/* Zimmer Card */}
        <Link href="/gallery?category=zimmer" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726367/AA_s4nej0.jpg"
            alt="צימרים"
            fill
            className={styles.locationImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={styles.locationOverlay}>
            <h3>צימרים</h3>
          </div>
        </Link>

        {/* Apartment Card */}
        <Link href="/gallery?category=apartment" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg"
            alt="דירות נופש"
            fill
            className={styles.locationImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={styles.locationOverlay}>
            <h3>דירות נופש</h3>
          </div>
        </Link>

        {/* Hotel Card */}
        <Link href="/gallery?category=hotel" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Hotel1_ihkey7.jpg"
            alt="מלונות בוטיק"
            fill
            className={styles.locationImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={styles.locationOverlay}>
            <h3>מלונות בוטיק</h3>
          </div>
        </Link>

        {/* Event Card */}
        <Link href="/gallery?category=event" className={styles.locationCard}>
          <Image
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg"
            alt="מתחמי אירועים"
            fill
            className={styles.locationImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className={styles.locationOverlay}>
            <h3>מתחמי אירועים</h3>
          </div>
        </Link>
      </section>

      {/* Why Choose Us Section */}
      <section className={`${styles.whyUs} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>למה לבחור ב-MULTIBRAWN?</h2>
          <p className={styles.sectionSubtitle}>אנחנו לא רק מוצאים לכם מקום - אנחנו מוצאים את המקום המושלם</p>
          
          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>ניסיון של 10+ שנים</h3>
              <p>מומחיות מוכחת במציאת הלוקיישנים הטובים ביותר בישראל</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>500+ לקוחות מרוצים</h3>
              <p>לקוחות שמצאו את החופשה המושלמת דרכנו</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>נכסים מאומתים בלבד</h3>
              <p>כל נכס עובר בדיקה קפדנית לפני שאנחנו ממליצים עליו</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>שירות אישי ומקצועי</h3>
              <p>זמינים עבורכם בוואטסאפ לכל שאלה</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className={`${styles.howItWorks} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>איך זה עובד?</h2>
          <p className={styles.sectionSubtitle}>4 שלבים פשוטים למציאת הלוקיישן המושלם עם ערדית</p>
          
          <div className={styles.stepsGrid}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>פתחו שיחה עם ערדית</h3>
              <p>הצ'אטבוט החכם שלנו ישאל אתכם כמה שאלות כדי להבין בדיוק מה אתם מחפשים</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>ערדית תמצא לכם אופציות</h3>
              <p>על בסיס מה שסיפרתם, ערדית תחפש במאגר הנכסים שלנו ותמצא את המקומות המתאימים ביותר</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>שלחו את הפרטים לוואטסאפ</h3>
              <p>בסוף השיחה תוכלו לשלוח את כל הפרטים ישירות לוואטסאפ של MULTIBRAWN ונחזור אליכם מהר</p>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>תהנו מהחופשה המושלמת</h3>
              <p>רק צריך להגיע ולהתחיל ליהנות - דאגנו לכם לכל הפרטים!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className={`${styles.featured} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>הצלחות אחרונות שלנו</h2>
          <p className={styles.sectionSubtitle}>לקוחות שמצאו את המקום המושלם דרך ערדית והצ'אטבוט החכם שלנו</p>
          
          <div className={styles.featuredGrid}>
            {/* Success Story 1 */}
            <article className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg"
                  alt="וילה יוקרתית שמצאנו למשפחת כהן בגליל"
                  fill
                  className={styles.featuredImage}
                  loading="lazy"
                />
                <span className={styles.featuredBadge}>סיפור הצלחה</span>
              </div>
              <div className={styles.featuredContent}>
                <h3>משפחת כהן - וילה בגליל</h3>
                <p className={styles.featuredLocation}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  גליל עליון
                </p>
                <p className={styles.featuredDesc}>
                  "חיפשנו וילה ל-20 איש עם בריכה מחוממת. דיברנו עם ערדית בצ'אט והיא מצאה לנו תוך יום את המקום המושלם!"
                </p>
                <div className={styles.featuredFeatures}>
                  <span>20 אורחים</span>
                  <span>בריכה מחוממת</span>
                  <span>תוך יום!</span>
                </div>
              </div>
            </article>

            {/* Success Story 2 */}
            <article className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726074/A7_rwzsuo.jpg"
                  alt="צימר רומנטי שמצאנו לדני ורונית"
                  fill
                  className={styles.featuredImage}
                  loading="lazy"
                />
                <span className={styles.featuredBadge}>סיפור הצלחה</span>
              </div>
              <div className={styles.featuredContent}>
                <h3>דני ורונית - צימר רומנטי</h3>
                <p className={styles.featuredLocation}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  גליל מערבי
                </p>
                <p className={styles.featuredDesc}>
                  "הצ'אטבוט הבין בדיוק מה אנחנו רוצים - צימר שקט עם ג'קוזי ונוף. התוצאה הייתה מדויקת ומושלמת!"
                </p>
                <div className={styles.featuredFeatures}>
                  <span>זוג</span>
                  <span>ג'קוזי פרטי</span>
                  <span>התאמה מושלמת</span>
                </div>
              </div>
            </article>

            {/* Success Story 3 */}
            <article className={styles.featuredCard}>
              <div className={styles.featuredImageWrapper}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762003191/1_tsc6xx.jpg"
                  alt="מתחם אירועים שמצאנו לחברת Hi-Tech"
                  fill
                  className={styles.featuredImage}
                  loading="lazy"
                />
                <span className={styles.featuredBadge}>סיפור הצלחה</span>
              </div>
              <div className={styles.featuredContent}>
                <h3>חברת Hi-Tech - אירוע חברה</h3>
                <p className={styles.featuredLocation}>
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  מרכז הארץ
                </p>
                <p className={styles.featuredDesc}>
                  "ארגנו לנו אירוע ל-100 עובדים. ערדית הבינה את הצרכים המדויקים והמקום היה בדיוק מה שחיפשנו!"
                </p>
                <div className={styles.featuredFeatures}>
                  <span>100 אורחים</span>
                  <span>אירוע חברה</span>
                  <span>מקצועיות מלאה</span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={`${styles.testimonials} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>מה הלקוחות שלנו אומרים</h2>
          <p className={styles.sectionSubtitle}>ביקורות אמיתיות מלקוחות מרוצים</p>
          
          <div className={styles.testimonialsGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                "מצאו לנו וילה מדהימה בצפון תוך יומיים. השירות היה מקצועי ואדיב. ממליצה בחום!"
              </p>
              <div className={styles.testimonialAuthor}>
                <strong>שירה כהן</strong>
                <span>תל אביב</span>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                "אחרי ניסיונות רבים בחיפושים סוף סוף מצאנו את הצימר המושלם לחופשה משפחתית. תודה ערדית!"
              </p>
              <div className={styles.testimonialAuthor}>
                <strong>דני לוי</strong>
                <span>ירושלים</span>
              </div>
            </div>

            <div className={styles.testimonialCard}>
              <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
              <p className={styles.testimonialText}>
                "ארגנו אירוע חברה מושלם במתחם שמצאו לנו. הכל היה מקצועי ומדויק. חוויה נהדרת!"
              </p>
              <div className={styles.testimonialAuthor}>
                <strong>מיכל רוזן</strong>
                <span>חיפה</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={`${styles.finalCta} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <h2 className={styles.ctaTitle}>מוכנים למצוא את המקום המושלם?</h2>
          <p className={styles.ctaSubtitle}>
            ערדית, העוזרת הדיגיטלית שלנו, מחכה לעזור לכם למצוא את הלוקיישן שתמיד חלמתם עליו
          </p>
          <div className={styles.ctaBtnGroup}>
            <button 
              onClick={() => {
                // Find chat button and click it
                const chatButton = document.querySelector('[data-chatbot]') as HTMLButtonElement;
                if (chatButton) {
                  chatButton.click();
                } else {
                  console.error('Chat button not found!');
                }
              }}
              className={`${styles.ctaBtn} ${styles.ctaBtnPrimary}`}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              דברו עם ערדית - הצ'אטבוט שלנו
            </button>
            <Link href="https://wa.me/972523983394" className={`${styles.ctaBtn} ${styles.ctaBtnSecondary}`} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              או דברו איתנו בוואטסאפ
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
