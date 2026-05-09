import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: 'חופשת פסח — איך לתכנן בלי להוציא הון | MULTIBRAWN',
  description: 'פסח מגיע כל שנה ותמיד ברגע האחרון. כך תתכננו נכון, תוזילו משמעותית ותיהנו יותר.',
  keywords: ['חופשת פסח', 'נופש פסח', 'צימר פסח', 'וילה פסח', 'פסח משפחתי', 'הזמנת פסח מוקדמת'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/passover-vacation-tips' },
  openGraph: {
    title: 'חופשת פסח — איך לתכנן נכון | MULTIBRAWN',
    description: 'פסח מגיע כל שנה ותמיד ברגע האחרון. כך תתכננו נכון.',
    url: 'https://multibrawn.co.il/blog/passover-vacation-tips',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link><span>/</span>
          <Link href="/blog">בלוג</Link><span>/</span>
          <span>חופשת פסח</span>
        </nav>
        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>🍷 חופשת פסח — איך לתכנן בלי להוציא הון</h1>
          <div className={styles.meta}><span>22 בדצמבר 2024</span><span>⏱️ 5 דקות</span></div>
        </header>
        <div className={styles.content}>
          <p>פסח הוא השיא של עונת הנופש בישראל. כולם רוצים לנסוע, כולם מזמינים באותו זמן — וכולם מתלוננים שהמחירים אסטרונומיים. אבל זה לא חייב להיות ככה.</p>

          <h2>⏰ הסוד הגדול: הזמינו מוקדם (הרבה מוקדם)</h2>
          <p>הזמנה 3-4 חודשים לפני פסח יכולה לחסוך 35-50% מהמחיר. בינואר-פברואר הוא הזמן האידיאלי לפסח שחל בסוף מרס/תחילת אפריל. הנכסים הכי טובים נגמרים תוך שבועות.</p>

          <h2>🗓️ תבחרו ימים חכם</h2>
          <p>חג שני ראשון וחג שני אחרון — הכי יקרים. הימים באמצע חול המועד לרוב זולים יותר ב-20-30%. אם אפשר, שילוב חג + שני ימי חול המועד יחסוך לכם כסף משמעותי.</p>

          <h2>🏡 וילה קבוצתית — הפתרון הכי חכם</h2>
          <p>שתי משפחות ביחד = וילה גדולה + חלוקת עלויות. פסח עם משפחות חברים הוא חוויה שונה לגמרי — הילדים שמחים, ההורים מרגישים פחות לחוצים, והכסף מתחלק.</p>

          <h2>🔍 מה לבדוק בהזמנת פסח?</h2>
          <ul>
            <li>האם הנכס כשר לפסח? (לדתיים — חשוב מאוד)</li>
            <li>האם יש מטבח מאובזר לבישול?</li>
            <li>מה מדיניות הביטול? (חשוב מאוד בחגים)</li>
            <li>האם יש מגרש משחקים לילדים?</li>
            <li>מה כלול בחבילה?</li>
          </ul>

          <h2>💡 טיפ אחרון — אל תחכו ל"הנחות"</h2>
          <p>בניגוד לנסיעות לחו"ל, בצימרים ופנסיונים בישראל לא תמיד יש הנחות ברגע האחרון. לעיתים הנכסים שנותרים ריקים בדקה ה-90 הם הפחות מבוקשים — ולא בלי סיבה.</p>
        </div>
        <div className={styles.cta}>
          <h2>פסח בפתח!</h2>
          <p>אל תחכו — הנכסים הטובים ביותר כבר מוזמנים. דברו איתנו עכשיו</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>הזמנת פסח</Link>
            <a href="https://wa.me/972523983394?text=שלום! אני מחפש נכס לפסח, אפשר לקבל עזרה?" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
