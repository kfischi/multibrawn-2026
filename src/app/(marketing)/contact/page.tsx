'use client';

import Image from 'next/image';
import styles from './Contact.module.css';

export default function ContactPage() {
  const openChatBot = () => {
    const chatButton = document.querySelector('[data-chatbot]') as HTMLElement;
    if (chatButton) chatButton.click();
  };

  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>MULTIBRAWN — צרו קשר</p>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine1}>בואו</span>
            <span className={styles.heroLine2}>נדבר</span>
          </h1>
          <p className={styles.heroSub}>
            אנחנו כאן 24/7 — לא רק כדי לענות על שאלות,<br />
            אלא כדי למצוא יחד את המקום המושלם עבורכם.
          </p>
        </div>
        <div className={styles.heroImageWrap}>
          <Image
            src="https://res.cloudinary.com/decirk3zb/image/upload/v1772917316/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%A6%D7%95%D7%A8_%D7%A7%D7%A9%D7%A8_gag6r6.png"
            alt="צרו קשר עם Multibrawn"
            fill
            className={styles.heroImg}
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
          <div className={styles.heroImgOverlay} />
        </div>
        <div className={styles.heroDivider} />
      </section>

      {/* ── MAIN GRID ── */}
      <section className={styles.main}>
        <div className={styles.grid}>

          {/* LEFT — AI + Contact methods */}
          <div className={styles.left}>

            {/* AI Bot Card */}
            <div className={styles.aiCard}>
              <div className={styles.aiCardTop}>
                <div className={styles.aiAvatar}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a5 5 0 0 1 5 5v2a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z"/>
                    <path d="M2 20a10 10 0 0 1 20 0"/>
                  </svg>
                </div>
                <div>
                  <h2 className={styles.aiName}>ערדית</h2>
                  <p className={styles.aiRole}>עוזרת דיגיטלית · זמינה עכשיו</p>
                </div>
                <div className={styles.aiBadge}>
                  <span className={styles.aiBadgeDot} />
                  Online
                </div>
              </div>

              <p className={styles.aiDesc}>
                ערדית תשמע אתכם, תבין בדיוק מה אתם מחפשים,
                ותעביר לצוות שלנו סיכום מסודר — כך שנוכל להציע
                לכם רק מה שרלוונטי.
              </p>

              <ul className={styles.aiFeatures}>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  זמינה 24/7, עונה תוך שניות
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  מכירה את כל הנכסים לעומק
                </li>
                <li>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  מסכמת ב-WhatsApp ומחברת לצוות
                </li>
              </ul>

              <button onClick={openChatBot} className={styles.aiBtn}>
                <span>התחילו שיחה עם ערדית</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            </div>

            {/* Divider */}
            <div className={styles.orDivider}>
              <span />
              <p>או פנו ישירות</p>
              <span />
            </div>

            {/* Contact Methods */}
            <div className={styles.methods}>
              <a
                href="https://wa.me/972523983394"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.method}
              >
                <div className={styles.methodIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div className={styles.methodText}>
                  <h4>WhatsApp</h4>
                  <p>052-398-3394</p>
                </div>
                <svg className={styles.methodArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>

              <a href="tel:0523983394" className={styles.method}>
                <div className={styles.methodIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div className={styles.methodText}>
                  <h4>שיחת טלפון</h4>
                  <p>052-398-3394</p>
                </div>
                <svg className={styles.methodArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>

              <a href="mailto:info@multibrawn.co.il" className={styles.method}>
                <div className={styles.methodIcon}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className={styles.methodText}>
                  <h4>אימייל</h4>
                  <p>info@multibrawn.co.il</p>
                </div>
                <svg className={styles.methodArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

          {/* RIGHT — Promise card + hours */}
          <div className={styles.right}>

            <div className={styles.promiseCard}>
              <p className={styles.promiseEyebrow}>ההבטחה שלנו</p>
              <h3 className={styles.promiseTitle}>
                שירות אישי,<br />לא רובוטי
              </h3>
              <p className={styles.promiseText}>
                כשאתם פונים אלינו, אתם מקבלים בן אדם אמיתי שמכיר
                כל נכס ונכס, מבין מה חשוב לכם, ולא יעצור עד שימצא
                את הפתרון הנכון.
              </p>

              <div className={styles.promiseStats}>
                <div className={styles.stat}>
                  <strong>24/7</strong>
                  <span>זמינות</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <strong>100+</strong>
                  <span>נכסים</span>
                </div>
                <div className={styles.statDivider} />
                <div className={styles.stat}>
                  <strong>5★</strong>
                  <span>דירוג</span>
                </div>
              </div>
            </div>

            <div className={styles.hoursCard}>
              <h4 className={styles.hoursTitle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                שעות מענה אנושי
              </h4>
              <ul className={styles.hoursList}>
                <li>
                  <span>ראשון — חמישי</span>
                  <span>09:00 – 22:00</span>
                </li>
                <li>
                  <span>שישי</span>
                  <span>09:00 – 14:00</span>
                </li>
                <li>
                  <span>שבת ומוצ"ש</span>
                  <span>לאחר צאת השבת</span>
                </li>
              </ul>
              <p className={styles.hoursNote}>
                מחוץ לשעות הפעילות — ערדית תקלוט את הפנייה ונחזור אליכם בהקדם
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
