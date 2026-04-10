import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: 'וילה ביוון — המדריך המלא לישראלים | MULTIBRAWN',
  description: 'סנטוריני, מיקונוס או כרתים? כל מה שצריך לדעת לפני שמזמינים וילה ביוון — מחירים, עונות, שאלות שחייבים לשאול.',
  keywords: ['וילה ביוון', 'נופש ביוון', 'סנטוריני', 'מיקונוס', 'כרתים', 'וילה ים תיכוני', 'חופשה ביוון'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/villa-greece-guide' },
  openGraph: {
    title: 'וילה ביוון — המדריך המלא לישראלים | MULTIBRAWN',
    description: 'סנטוריני, מיקונוס או כרתים? כל מה שצריך לדעת לפני שמזמינים וילה ביוון.',
    url: 'https://multibrawn.co.il/blog/villa-greece-guide',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link><span>/</span>
          <Link href="/blog">בלוג</Link><span>/</span>
          <span>וילה ביוון</span>
        </nav>
        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>🇬🇷 וילה ביוון — המדריך המלא לישראלים</h1>
          <div className={styles.meta}><span>15 בינואר 2025</span><span>⏱️ 8 דקות</span></div>
        </header>
        <div className={styles.content}>
          <p>יוון היא היעד הכי פופולרי לישראלים שרוצים וילה בחו"ל — וסיבה טובה יש לזה. ים כחול מרהיב, אדריכלות ייחודית, אוכל טוב וטיסות של 2-3 שעות מישראל. אבל לפני שלוחצים על "הזמן", כדאי לדעת כמה דברים.</p>

          <h2>🏖️ סנטוריני vs מיקונוס vs כרתים — מה מתאים לכם?</h2>
          <p><strong>סנטוריני</strong> — הבחירה הרומנטית. עיירות לבנות על קו המצוק, שקיעות שלא ישכחו, ויינות מקומיים מצוינים. פחות מתאים לילדים — רוב הנכסים בנויים על מדרגות. מחירים גבוהים יותר.</p>
          <p><strong>מיקונוס</strong> — קוסמופוליטי ותוסס. חיי לילה, מסעדות, חופים מפורסמים. גם מתאים לקבוצות ולחבר'ה. הבונוס: הנגישות לנמל מאפשרת יומיים קלים בסביבה.</p>
          <p><strong>כרתים</strong> — הענקית. האי הכי גדול ביוון, הכי מגוון. מתאים למשפחות עם ילדים — חופים עם מים רדודים, פרקי הרפתקאות, כפרים שמורים. גם הכי זול מהשלושה.</p>

          <h2>📅 מתי לנסוע?</h2>
          <p>מאי-יוני ואוקטובר הם ״החלונות המושלמים״. פחות תיירים, מחירים נמוכים ב-30-40%, מזג אוויר מצוין (28-32 מעלות). יולי-אוגוסט — עמוסים ויקרים, אבל הים הכי טוב.</p>

          <h2>💰 כמה עולה וילה ביוון?</h2>
          <p>טווח רחב: מ-₪1,500 ללילה עבור וילה קטנה בכרתים ועד ₪25,000+ לוילה פרמיום בסנטוריני עם בריכה infinity. הממוצע הסביר לוילה עם בריכה לזוג: ₪3,500-6,000 ללילה.</p>

          <h2>❓ שאלות שחייבים לשאול לפני ההזמנה</h2>
          <ul>
            <li>האם יש מיזוג אוויר בכל חדר? (לא ברור מאליו)</li>
            <li>האם הבריכה מחוממת? מה גודלה?</li>
            <li>האם יש Wi-Fi מהיר? (חשוב ל-digital nomads)</li>
            <li>מה מרחק ההליכה לחוף הקרוב?</li>
            <li>האם יש מזגן גם בסלון?</li>
            <li>מה מדיניות הביטול?</li>
          </ul>

          <h2>🚨 מלכודות נפוצות</h2>
          <p><strong>תמונות מוטות</strong>: עדשות רחבות זווית גורמות לחדרים להיראות גדולים פי שניים. תמיד בקשו סרטון walkthrough.</p>
          <p><strong>מדרגות</strong>: יוון = מדרגות. 40 מדרגות לביתן שלכם בסנטוריני זה לא בדיחה. אם יש בכם מבוגרים או ילדים קטנים — בדקו.</p>
          <p><strong>דמי ניקיון</strong>: לפעמים מוסיפים ₪800-1500 דמי ניקיון שלא מופיעים במחיר הראשוני.</p>
        </div>
        <div className={styles.cta}>
          <h2>רוצים וילה ביוון?</h2>
          <p>אנחנו מתמחים בנכסים בינלאומיים — נמצא לכם את הוילה המושלמת ביוון</p>
          <div className={styles.ctaButtons}>
            <Link href="/multi-global/greece" className={styles.ctaButton}>ראו וילות ביוון</Link>
            <a href="https://wa.me/972523983394?text=שלום! קראתי את המדריך ואני מעוניין בוילה ביוון" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
