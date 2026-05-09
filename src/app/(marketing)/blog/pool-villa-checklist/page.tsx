import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: 'צ׳קליסט: 15 שאלות לפני הזמנת וילה עם בריכה | MULTIBRAWN',
  description: 'בריכה מחוממת? מגודרת? נקייה? ישנה? 15 שאלות חיוניות שחייבים לשאול לפני שמשלמים על וילה עם בריכה.',
  keywords: ['וילה עם בריכה', 'בריכה מחוממת', 'וילה לפסח', 'צ׳קליסט וילה', 'שאלות לפני הזמנה'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/pool-villa-checklist' },
  openGraph: {
    title: 'צ׳קליסט: 15 שאלות לפני וילה עם בריכה | MULTIBRAWN',
    description: '15 שאלות חיוניות שחייבים לשאול לפני שמשלמים.',
    url: 'https://multibrawn.co.il/blog/pool-villa-checklist',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link><span>/</span>
          <Link href="/blog">בלוג</Link><span>/</span>
          <span>צ׳קליסט וילה עם בריכה</span>
        </nav>
        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>🏊 צ׳קליסט: 15 שאלות לפני הזמנת וילה עם בריכה</h1>
          <div className={styles.meta}><span>18 בדצמבר 2024</span><span>⏱️ 5 דקות</span></div>
        </header>
        <div className={styles.content}>
          <p>הזמנתם וילה עם בריכה, הגעתם — והבריכה קרה, עכורה וקטנה מלצלול. זה קורה יותר ממה שחושבים. הנה הצ׳קליסט שיחסוך לכם את האכזבה.</p>

          <h2>🌡️ על הטמפרטורה</h2>
          <ol>
            <li><strong>האם הבריכה מחוממת?</strong> — ואם כן, לאיזה טמפרטורה? 26 מעלות ו-30 מעלות זה עולם אחר.</li>
            <li><strong>מי אחראי על החימום?</strong> — האם זה אוטומטי או שצריך להודיע מראש?</li>
            <li><strong>כמה שעות ביום הבריכה מחוממת?</strong> — חלק מהנכסים מחממים רק 4-6 שעות ביום.</li>
          </ol>

          <h2>🧹 על הניקיון</h2>
          <ol start={4}>
            <li><strong>מתי בוצע ניקיון הבריכה האחרון?</strong></li>
            <li><strong>האם יש מסנן פעיל?</strong></li>
            <li><strong>האם בודקים כלור/PH באופן קבוע?</strong></li>
          </ol>

          <h2>📏 על הגודל והבטיחות</h2>
          <ol start={7}>
            <li><strong>מה מידות הבריכה?</strong> — 3x5 מטר מתאים לשניים, לא ל-8 ילדים.</li>
            <li><strong>מה עומק הבריכה?</strong> — חשוב לילדים קטנים ולמי שלא שוחה טוב.</li>
            <li><strong>האם יש גדר בטיחות סביב הבריכה?</strong> — חובה לפי חוק אם יש ילדים.</li>
            <li><strong>האם יש תאורה בבריכה לשחייה לילית?</strong></li>
          </ol>

          <h2>🛡️ על הגישה</h2>
          <ol start={11}>
            <li><strong>האם הבריכה פרטית לחלוטין?</strong> — או משותפת עם צימרים אחרים?</li>
            <li><strong>האם יש צל/פרגולה ליד הבריכה?</strong></li>
            <li><strong>האם יש מקלחת ליד הבריכה?</strong></li>
            <li><strong>האם יש כסאות נוח ומגבות?</strong></li>
          </ol>

          <h2>🛠️ מה לעשות אם הבריכה לא תקינה?</h2>
          <ol start={15}>
            <li><strong>מה המדיניות אם הבריכה לא עובדת?</strong> — זיכוי? החזר? ואם לא — אל תזמינו.</li>
          </ol>

          <p>אם בעל הנכס לא עונה על שאלות אלה ברצון — זה אות אזהרה. נכס שמח בשאלות מפורטות כי זה מעיד על אורח שיודע מה הוא רוצה ויהיה לקוח מרוצה.</p>
        </div>
        <div className={styles.cta}>
          <h2>נמצא לכם וילה עם בריכה אמיתית</h2>
          <p>אנחנו בודקים את כל השאלות האלה בשביל לקוחותינו — לפני ההזמנה</p>
          <div className={styles.ctaButtons}>
            <Link href="/gallery" className={styles.ctaButton}>ראו גלריה</Link>
            <a href="https://wa.me/972523983394?text=שלום! אני מחפש וילה עם בריכה מחוממת" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
