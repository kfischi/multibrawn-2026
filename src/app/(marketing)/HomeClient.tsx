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
      {/* Hero — black jewel inside a vivid purple frame */}
      <div className={styles.heroFrame}>
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
              <h1 className={styles.heroTitle}>
                לא מוצאים <span className={styles.heroAccent}>בגלילה.</span>
              </h1>
              <div className={styles.ornament} aria-hidden="true">◆</div>
              <p className={styles.heroSubtitle}>
                מתחמים · וילות · מלונות בוטיק<br/>
                נסגרים בהתאמה אישית.<br/>
                לא בקטלוג.
              </p>

              <div className={styles.heroBtnGroup}>
                <Link href="/contact" className={`${styles.heroBtn} ${styles.btnPrimary}`}>
                  לקבלת התאמה אישית
                </Link>
                <Link href="/gallery" className={`${styles.heroBtn} ${styles.btnGlass}`}>
                  צפו בגלריה
                </Link>
              </div>
              <p className={styles.heroTrust}>התאמה אישית · לא קטלוג · בכל הארץ</p>
            </div>
          </div>
        </section>
      </div>

      {/* Audience paths */}
      <section className={styles.paths}>
        <div className={styles.container}>
          <div className={styles.pathsGrid}>
            <Link href="/gallery" className={styles.pathCard}>
              <span className={styles.pathIcon} aria-hidden="true">🏡</span>
              <span className={styles.pathText}>
                <strong>נופש וקבוצות</strong>
                <span>וילות, צימרים ומתחמים למשפחות ולקבוצות</span>
              </span>
              <span className={styles.pathArrow} aria-hidden="true">‹</span>
            </Link>
            <Link href="/shabbat-hatan" className={styles.pathCard}>
              <span className={styles.pathIcon} aria-hidden="true">🕯️</span>
              <span className={styles.pathText}>
                <strong>שבתות חתן</strong>
                <span>התאמה אישית לפי הקהל, הכשרות והתקציב</span>
              </span>
              <span className={styles.pathArrow} aria-hidden="true">‹</span>
            </Link>
            <Link href="/gallery?category=event" className={styles.pathCard}>
              <span className={styles.pathIcon} aria-hidden="true">🎉</span>
              <span className={styles.pathText}>
                <strong>אירועים</strong>
                <span>מתחמים לאירועים קטנים וגדולים</span>
              </span>
              <span className={styles.pathArrow} aria-hidden="true">‹</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Location Cards Grid */}
      <div className={styles.locationsBand}>
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
      </div>

      {/* Why Choose Us Section */}
      <section className={`${styles.whyUs} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>למה לבחור ב-MULTIBRAWN?</h2>
          <div className={styles.ornamentDark} aria-hidden="true">◆</div>
          <p className={styles.sectionSubtitle}>אנחנו לא רק מוצאים לכם מקום — אנחנו מוצאים את המקום המושלם</p>

          <div className={styles.featuresGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>התאמה אישית אמיתית</h3>
              <p>לא רשימה גנרית — שאלון קצר שממפה בדיוק מה אתם צריכים, והתאמה אחת מדויקת</p>
            </div>

            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3>היכרות אמיתית מהשטח</h3>
              <p>מה שלא כתוב באתר של המתחם ומה שלא מספרים בטלפון — אנחנו כבר יודעים</p>
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
          <div className={styles.ornamentDark} aria-hidden="true">◆</div>
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
              <p>הצ&apos;אטבוט החכם שלנו ישאל אתכם כמה שאלות כדי להבין בדיוק מה אתם מחפשים</p>
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
              <p>רק צריך להגיע ולהתחיל ליהנות — דאגנו לכם לכל הפרטים!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Ardit identity + guides */}
      <section className={`${styles.identity} ${styles.revealOnScroll}`}>
        <div className={styles.container}>
          <div className={styles.identityInner}>
            <h2 className={styles.identityTitle}>מאחורי MULTIBRAWN — ערדית בראון</h2>
            <div className={styles.ornament} aria-hidden="true">◆</div>
            <p className={styles.identityText}>
              חיבורים אישיים בין משפחות, קבוצות ועסקים למתחמים, וילות ומלונות בוטיק בכל הארץ —
              עם היכרות מהשטח, שאלון התאמה מדויק וליווי עד שסוגרים את המקום הנכון.
            </p>
            <div className={styles.guideCards}>
              <a
                href="https://free-guide.multibrawn.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.guideCard}
              >
                <strong>המדריך החינמי לשבת חתן</strong>
                <span>30 שלבים מעשיים, מהחזון ועד הפרידה</span>
              </a>
              <a
                href="https://guide.multibrawn.co.il"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.guideCard} ${styles.guideCardFull}`}
              >
                <strong>המהדורה המלאה</strong>
                <span>מערכת תכנון חיה: כמויות, לוח זמנים ותקציב</span>
              </a>
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
              דברו עם ערדית — הצ&apos;אטבוט שלנו
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
