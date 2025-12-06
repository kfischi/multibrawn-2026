'use client';

import styles from './Tips.module.css';

export default function TipsPage() {
  const reels = [
    {
      id: 'reel1',
      title: 'שבת חתן בראש שקט',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763722048/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_neqhs1.mp4',
    },
    {
      id: 'reel2',
      title: 'נוסעים לאילת? תיזהרו',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828637/%D7%90%D7%99%D7%9C%D7%AA_rtmczk.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684426/%D7%90%D7%99%D7%9C%D7%AA_ba7jjj.mp4',
    },
    {
      id: 'reel3',
      title: 'מחפשים זול?',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828638/%D7%96%D7%95%D7%9C_t7cops.png',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763718107/%D7%96%D7%95%D7%9C_lcwakc.mp4',
    },
    {
      id: 'reel4',
      title: 'ממה להיזהר בוילה',
      thumbnail: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
      video: 'https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684101/Video3_omgivy.mp4',
    },
  ];

  return (
    <div className={styles.tipsPage}>
      <div className={styles.contentSection}>
        <h1 className={styles.mainTitle}>טיפים חשובים שיחסכו לכם כסף</h1>

        {/* Intro Content */}
        <div className={styles.introSection}>
          <h2 className={styles.introTitle}>למה כדאי לצפות?</h2>
          <p className={styles.introParagraph}>
            בחיפוש אחר המקום המושלם לחופשה, יש המון טריקים שיכולים לחסוך לכם אלפי שקלים
            ולמנוע אכזבות כואבות.
          </p>
          <p className={styles.introParagraph}>
            אספנו עבורכם את <strong>הטיפים החשובים ביותר</strong> מתוך{' '}
            <strong>10 שנות ניסיון</strong> בתחום - הטעויות הכי נפוצות, הפיתרונות הכי טובים,
            והסודות שסוכנים לא מספרים לכם.
          </p>

          <div className={styles.whatYouLearn}>
            <h3>מה תלמדו:</h3>
            <ul>
              <li>איך לזהות &quot;פינוקים&quot; שהם בעצם מלכודות כסף</li>
              <li>מה באמת צריך לבדוק לפני הזמנה</li>
              <li>איך לחסוך עד 40% מהתקציב</li>
              <li>אילו שאלות חובה לשאול בטלפון</li>
              <li>מה לעשות אם התאכזבתם במקום</li>
            </ul>
          </div>

          <div className={styles.forWho}>
            <h3>למי זה מתאים:</h3>
            <div className={styles.forWhoGrid}>
              <div className={styles.forWhoItem}>זוגות שמתכננים סופ&quot;ש רומנטי</div>
              <div className={styles.forWhoItem}>משפחות לפני חופשה גדולה</div>
              <div className={styles.forWhoItem}>מי שמארגן אירוע משפחתי</div>
              <div className={styles.forWhoItem}>
                כל מי שרוצה לחסוך כסף ולמנוע אכזבות
              </div>
            </div>
          </div>

          <p className={styles.timeCallout}>
            <strong>2-3 דקות של צפייה = חיסכון של אלפי שקלים ושעות של כאב ראש!</strong>
          </p>
        </div>

        {/* Reels Grid - Embedded Videos */}
        <div className={styles.reelsContainer}>
          <div className={styles.reelsGrid}>
            {reels.map((reel) => (
              <div key={reel.id} className={styles.reelCard}>
                <div className={styles.videoWrapper}>
                  <video
                    className={styles.reelVideo}
                    controls
                    poster={reel.thumbnail}
                  >
                    <source src={reel.video} type="video/mp4" />
                    הדפדפן שלך לא תומך בוידאו.
                  </video>
                </div>
                <div className={styles.reelTitle}>{reel.title}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links Section */}
        <div className={styles.socialSection}>
          <h2 className={styles.socialTitle}>רוצים עוד טיפים?</h2>
          <p className={styles.socialSubtitle}>
            אנחנו מפרסמים טיפים חדשים כל שבוע! עקבו אחרינו ב:
          </p>

          <div className={styles.socialLinksGrid}>
            <a
              href="https://youtube.com/@multibrawn?si=jFqSU6lh6ooIkU1D"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkCard}
            >
              <div className={styles.socialIcon}>
                <i className="fab fa-youtube"></i>
              </div>
              <h3>YouTube</h3>
              <p>
                כל הסרטונים המלאים, מדריכים מפורטים, וסיורים וירטואליים במקומות מומלצים.
              </p>
              <span className={styles.socialCta}>צפו בערוץ שלנו →</span>
            </a>

            <a
              href="https://www.instagram.com/multibrawn.israel"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkCard}
            >
              <div className={styles.socialIcon}>
                <i className="fab fa-instagram"></i>
              </div>
              <h3>Instagram</h3>
              <p>טיפים יומיומיים, סטוריז מאחורי הקלעים, והמלצות לסופ&quot;ש הקרוב.</p>
              <span className={styles.socialCta}>עקבו אחרינו →</span>
            </a>

            <a
              href="http://www.tiktok.com/@multibrawn"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLinkCard}
            >
              <div className={styles.socialIcon}>
                <i className="fab fa-tiktok"></i>
              </div>
              <h3>TikTok</h3>
              <p>טיפים קצרים ומהירים, טרנדים, והפתעות שווות!</p>
              <span className={styles.socialCta}>הצטרפו אלינו →</span>
            </a>
          </div>
        </div>

        {/* Questions Section */}
        <div className={styles.questionsSection}>
          <h2 className={styles.questionsTitle}>יש לכם שאלה?</h2>
          <p className={styles.questionsText}>
            אם משהו לא ברור או שאתם רוצים טיפ ספציפי למצב שלכם - <strong>פשוט שאלו!</strong>
          </p>

          <div className={styles.contactMethods}>
            <div className={styles.contactMethod}>
              <strong>1. WhatsApp</strong> - 052-398-3394 (זמינים 24/7)
            </div>
            <div className={styles.contactMethod}>
              <strong>2. הצ&apos;אטבוט החכם</strong> - לחצו על האייקון בפינה ונענה מיד
            </div>
            <div className={styles.contactMethod}>
              <strong>3. טלפון</strong> - 052-398-3394 (ראשון-חמישי 8:00-22:00)
            </div>
          </div>
        </div>

        {/* Bonus Section */}
        <div className={styles.bonusSection}>
          <h2 className={styles.bonusTitle}>בונוס מיוחד</h2>
          <p className={styles.bonusText}>
            <strong>צפיתם בכל הסרטונים?</strong>
          </p>
          <p className={styles.bonusText}>
            שלחו לנו הודעה ב-WhatsApp עם המילה <strong>&quot;טיפים&quot;</strong> ותקבלו{' '}
            <strong>מדריך PDF חינמי</strong>:
          </p>

          <div className={styles.bonusBox}>
            <h3>&quot;10 הטעויות הכי יקרות בהזמנת נופש וכיצד למנוע אותן&quot;</h3>
            <p>כולל:</p>
            <ul>
              <li>Checklist להדפסה לפני הזמנה</li>
              <li>השאלות החובה לשאול בטלפון</li>
              <li>מה לבדוק בתמונות (רמאויות נפוצות)</li>
              <li>איך לנהל משא ומתן על המחיר</li>
            </ul>
            <p className={styles.bonusValue}>
              <strong>שווה זהב!</strong>
            </p>
          </div>

          <a
            href="https://wa.me/972523983394?text=טיפים"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bonusButton}
          >
            <i className="fab fa-whatsapp"></i> שלחו &quot;טיפים&quot; עכשיו
          </a>
        </div>
      </div>
    </div>
  );
}
