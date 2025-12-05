'use client';

import Image from 'next/image';
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
          "לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות"
        </p>
      </section>

      {/* Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyGrid}>
          <div className={styles.storyImage}>
            <Image
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
              alt="ערדית בראון"
              width={600}
              height={700}
              className={styles.arditImage}
            />
          </div>
          <div className={styles.storyText}>
            <h2 className={styles.storyHeading}>שלום, שמי ערדית בראון</h2>
            <p className={styles.storyParagraph}>
              יזמית עם מעל <strong>10 שנות ניסיון</strong> בחיבור בין אנשים לחלומות שלהם.
            </p>
            <p className={styles.storyParagraph}>
              הכל התחיל מתסכול אישי: ראיתי איך אנשים מבזבזים שעות בחיפושים אינסופיים, רק כדי להתאכזב ממקום שלא תאם את התמונות והשאיפות שלהם.
            </p>
            <div className={styles.quoteBox}>
              הקמתי את Multibrawn על עיקרון פשוט: לכל אדם מגיע שירות אישי שחוסך לו זמן ומבטיח לו 100% אמינות.
            </div>
            <p className={styles.storyParagraph}>
              היום אני גאה להוביל צוות מומחים שמכיר כל נכס באופן אישי. אנחנו לא "עוד פלטפורמה", אנחנו הסוכנים האישיים שלכם.
            </p>
            <p className={styles.storyParagraph}>
              ההבטחה שלנו פשוטה: אנחנו מבצעים את כל הבדיקות, התיאומים והסינונים, כדי שלכם יישאר רק החלק המהנה - החוויה.
            </p>
            
            {/* Social Links */}
            <div className={styles.socialSection}>
              <h3 className={styles.socialHeading}>עקבו אחרינו</h3>
              <SocialLinks />
            </div>
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

      {/* Video Section */}
      <section className={styles.videoSection}>
        <h2 className={styles.videoHeading}>הכירו את ערדית</h2>
        <div className={styles.videoContainer}>
          <video
            className={styles.videoPlayer}
            controls
            poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
          >
            <source
              src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className={styles.differenceSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.mainHeading}>מה מייחד את Multibrawn?</h2>
          <h3 className={styles.subHeading}>למה לעבוד עם סוכן ולא לחפש לבד?</h3>
          
          <p className={styles.problemParagraph}>
            <strong>הבעיה שכולם מכירים:</strong> אתם מחפשים צימר לסופ&quot;ש רומנטי. פותחים 20 אתרים, קוראים 100 ביקורות, מתקשרים ל-15 מקומות, ובסוף - מגלים שהמקום &quot;המושלם&quot; בתמונות הוא בעצם דירה ישנה עם בריכה מוזנחת.
          </p>
          <p className={styles.problemHighlight}>נשמע מוכר?</p>

          <h3 className={styles.solutionHeading}>הפתרון של Multibrawn:</h3>

          <div className={styles.solutionGrid}>
            <div className={styles.solutionBox}>
              <h4>1. אנחנו מכירים כל נכס אישית</h4>
              <ul>
                <li>לא סתם רשימה מהאינטרנט</li>
                <li>ביקרנו, בדקנו, צילמנו בעצמנו</li>
                <li>אנחנו יודעים מה רואים בתמונות ומה לא</li>
              </ul>
            </div>

            <div className={styles.solutionBox}>
              <h4>2. חוסכים לכם זמן וכסף</h4>
              <ul>
                <li>במקום 5 שעות חיפוש → כמה דקות שיחה</li>
                <li>במקום לשלם על מקום שלא ראיתם → תמורה מלאה</li>
                <li>במקום להתאכזב → 100% התאמה</li>
              </ul>
            </div>

            <div className={styles.solutionBox}>
              <h4>3. שירות אישי עד הסוף</h4>
              <ul>
                <li>אין עמלות, אין עלויות נסתרות</li>
                <li>משלמים למקום הלינה בלבד</li>
                <li>השירות שלנו? מתנה!</li>
              </ul>
            </div>

            <div className={styles.solutionBox}>
              <h4>4. התאמה מדויקת</h4>
              <ul>
                <li>משפחה עם ילדים? משחקייה ובטיחות</li>
                <li>זוג רומנטי? ג&apos;קוזי פרטי ונוף</li>
                <li>קבוצת חברים? וילה עם ברביקיו</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className={styles.comparisonSection}>
        <div className={styles.contentContainer}>
          <h2 className={styles.mainHeading}>למה אנשים בוחרים בנו?</h2>
          
          <div className={styles.compareGrid}>
            <div className={styles.compareBoxNegative}>
              <h3>תסריט א&apos; - ללא סוכן:</h3>
              <ul>
                <li>5 שעות חיפוש באינטרנט</li>
                <li>15 שיחות טלפון</li>
                <li>חוסר ודאות: &quot;האם זה באמת טוב?&quot;</li>
                <li>מחיר מלא + סיכון להתאכזבות</li>
                <li>לחץ והתלבטויות</li>
              </ul>
            </div>

            <div className={styles.compareBoxPositive}>
              <h3>תסריט ב&apos; - עם Multibrawn:</h3>
              <ul>
                <li>10 דקות שיחה אחת</li>
                <li>3 אפשרויות מושלמות</li>
                <li>ביטחון מלא: &quot;ערדית בדקה בעצמה&quot;</li>
                <li>מחיר אטרקטיבי</li>
                <li>רגועים ושמחים!</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
