'use client';

import SocialLinks from '@/components/ui/SocialLinks/SocialLinks';
import styles from './About.module.css';

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.heroAbout}>
        <span className={styles.badge}>הסיפור שלנו</span>
        <h1 className={styles.heroTitle}>
          מתסכול אישי<br />לחזון משנה מציאות
        </h1>
        <p className={styles.heroSubtitle}>
          &quot;לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות&quot;
        </p>
      </section>

      {/* Story Section with Video */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyVideoBox}>
            <div className={styles.videoWrapper}>
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dptyfvwyo&public_id=V2_cj6div&profile=cld-default"
                className={styles.storyVideo}
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                title="הכירו את ערדית"
              ></iframe>
            </div>
          </div>
          <div className={styles.storyText}>
            <h2 className={styles.storyHeading}>שלום, שמי ערדית בראון</h2>
            <p className={styles.storyParagraph}>
              יזמית עם מעל <strong>10 שנות ניסיון</strong> בחיבורים בין אנשים לחלומות שלהם.
            </p>
            <p className={styles.storyParagraph}>
              מחברת משפחות, זוגות וקבוצות לוילות, צימרים, דירות נופש ומתחמי שבת חתן שמתאימים באמת לאנשים – לא רק לתמונות.
            </p>
            
            <h3 className={styles.storySubheading}>הכל התחיל בתקופת הקורונה</h3>
            <p className={styles.storyParagraph}>
              לפני כן עבדתי שנים מאחורי הקלעים – בהפקות, בעבודה עם אמני במה ובאירועים. ואז הגיעו הסגרים, ההפגנות, אירועים בוטלו – והעולם נעצר.
            </p>
            <p className={styles.storyParagraph}>
              במקום לשבת בבית ולהגיד &quot;אין עבודה&quot;, שאלתי את עצמי: איך אני יכולה להשתמש בהיכרות שלי עם אנשים, לוקיישנים וקשרים – כדי לעזור למשפחות ולמצוא פרנסה מכובדת?
            </p>
            
            <div className={styles.quoteBox}>
              הקמתי את Multibrawn על עיקרון פשוט: לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות.
            </div>
            
            <p className={styles.storyParagraph}>
              לא כמפיקה, אלא כמי שמכירה את השטח, האנשים והמתחמים, ומחברת ביניהם בצורה חכמה, מדויקת ושקופה.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.statsGrid}>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>10+</div>
            <div className={styles.statLabel}>שנות ניסיון</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>500+</div>
            <div className={styles.statLabel}>אירועים</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>50+</div>
            <div className={styles.statLabel}>לוקיישנים</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNumber}>100%</div>
            <div className={styles.statLabel}>אמינות</div>
          </div>
        </div>
      </section>

      {/* What I Offer Section */}
      <section className={styles.offerSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.mainHeading}>מה אני מציעה?</h2>
          
          <div className={styles.offerGrid}>
            <div className={styles.offerBox}>
              <h3>התאמה אישית לנופש ואירועים</h3>
              <ul>
                <li>וילות, צימרים, דירות נופש ומתחמים בכל הארץ</li>
                <li>דגש על משפחות, זוגות ושבתות חתן</li>
                <li>התאמה מיוחדת לציבור דתי וחרדי</li>
                <li>בדיקה מדויקת: כמות חדרים, בריכה, פרטיות, כשרות, קרבה לבית כנסת</li>
              </ul>
            </div>

            <div className={styles.offerBox}>
              <h3>ליווי אישי – לא עוד &quot;קבוצה של לינקים&quot;</h3>
              <ul>
                <li>אני שואלת שאלות: מי אתם? כמה נפשות? מה האופי? מה התקציב?</li>
                <li>מתאימה רק מקומות שיש בהם היגיון עבורכם</li>
                <li>לא מה שהכי נוצץ בתמונות – מה שבאמת מתאים</li>
              </ul>
            </div>

            <div className={styles.offerBox}>
              <h3>חיסכון בזמן, כסף ועצבים</h3>
              <ul>
                <li>לא עוד להתרוצץ בין מאות מודעות וסוכנים</li>
                <li>אני מסננת, מדברת עם בעלי המתחמים</li>
                <li>מוודאת פרטים ומגישה רק הצעות רלוונטיות</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Me Different Section */}
      <section className={styles.uniqueSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.mainHeading}>מה מייחד אותי?</h2>
          
          <div className={styles.uniqueGrid}>
            <div className={styles.uniqueBox}>
              <h3>עבר של &quot;מאחורי הקלעים&quot;</h3>
              <p>
                מהעולם של ההפקות הבאתי איתי הבנה של לוגיסטיקה, אנשים, תזמון ופרטים קטנים שעושים את ההבדל בין &quot;יהיה בסדר&quot; לבין &quot;היה מושלם&quot;.
              </p>
            </div>

            <div className={styles.uniqueBox}>
              <h3>אני לא מפיקה – אני מחברת</h3>
              <p>
                אני לא מפיקה אירועים, לא מתערבת באוכל, לא מעצבת ולא מוכרת חלומות. התפקיד שלי ממוקד וברור: למצוא לכם את המקום הנכון – ולהגיד בכנות גם כשמשהו לא מתאים.
              </p>
            </div>

            <div className={styles.uniqueBox}>
              <h3>רגישות אמיתית לדתי/חרדי</h3>
              <p>
                אני יודעת כמה חשוב: כשרות, צניעות, טלוויזיות, מוזיקה, שבת, מניין, מרחק מהשכונה. אלה לא &quot;תוספות&quot; – זה חלק מהשירות.
              </p>
            </div>

            <div className={styles.uniqueBox}>
              <h3>קהילה ולא רק עסק</h3>
              <p>
                יש סביבי קהילות בפייסבוק, אינסטגרם וטיקטוק – שם אני משתפת מתחמים מומלצים, טעויות נפוצות, ואומרת ביושר כשמשהו לא נראה לי.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who I Work With Section */}
      <section className={styles.clientsSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.mainHeading}>עם מי אני עובדת?</h2>
          
          <div className={styles.clientsGrid}>
            <div className={styles.clientCard}>
              <div className={styles.clientIcon}>👨‍👩‍👧‍👦</div>
              <h3>משפחות</h3>
              <p>נופש, סופ&quot;שים, חגים וחופשות קיץ</p>
            </div>

            <div className={styles.clientCard}>
              <div className={styles.clientIcon}>💍</div>
              <h3>שבתות חתן ובר־מצווה</h3>
              <p>במיוחד למשפחות דתיות וחרדיות</p>
            </div>

            <div className={styles.clientCard}>
              <div className={styles.clientIcon}>💑</div>
              <h3>זוגות</h3>
              <p>חופשות, ימי נישואין, ימי הולדת</p>
            </div>

            <div className={styles.clientCard}>
              <div className={styles.clientIcon}>👥</div>
              <h3>קבוצות קטנות</h3>
              <p>חברות, קבוצות נשים, חברותות, גיבושי צוות</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.ctaHeading}>איך ממשיכים מכאן?</h2>
          <p className={styles.ctaParagraph}>
            אם אתם מתכננים נופש, שבת חתן או חופשה משפחתית<br />
            ורוצים לחסוך זמן, אכזבות וכאב ראש
          </p>
          <a href="/contact" className={styles.ctaButton}>
            צרו קשר עכשיו
          </a>
        </div>
      </section>

      {/* Social Links */}
      <section className={styles.socialSection}>
        <SocialLinks />
      </section>
    </div>
  );
}
