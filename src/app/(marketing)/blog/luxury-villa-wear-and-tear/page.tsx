import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: 'בלאי בוילות יוקרה — בתמונות הכל חדש, במציאות הספה קרועה | MULTIBRAWN',
  description: 'איך מזהים בלאי בוילת יוקרה לפני שמשלמים? המדריך לבדיקת ריהוט, מיזוג, בריכה ורמת אחזקה — כדי שלא תגיעו לאכזבה.',
  keywords: ['בלאי וילה', 'אחזקת וילה', 'מצב וילה', 'בדיקת וילה', 'וילה יוקרה', 'השכרת וילה ישראל'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/luxury-villa-wear-and-tear' },
  openGraph: {
    title: 'בלאי בוילות יוקרה | MULTIBRAWN',
    description: 'איך מזהים בלאי בוילת יוקרה לפני שמשלמים? המדריך לבדיקת ריהוט ואחזקה.',
    url: 'https://multibrawn.co.il/blog/luxury-villa-wear-and-tear',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png', width: 1200, height: 630, alt: 'בלאי בוילות יוקרה' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'בלאי בוילות יוקרה | MULTIBRAWN',
    description: 'איך מזהים בלאי בוילת יוקרה לפני שמשלמים?',
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png'],
  },
};

export default function WearAndTearPage() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">בית</Link> / <Link href="/blog">בלוג</Link> / בלאי בוילות
        </div>

        <header className={styles.header}>
          <span className={styles.category}>טיפים</span>
          <h1 className={styles.title}>בתמונות הכל נראה חדש, במציאות הספה קרועה. האמת בפרצוף</h1>
          <div className={styles.meta}>
            <span>📅 01.01.2025</span>
            <span>⏱️ 5 דקות קריאה</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image 
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/f_auto,q_auto/v1765034116/Logo_1_dgyryu_e_background_removal_f_png_xpwl2w.png"
            alt="סלון בוילה" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>

        <div className={styles.content}>
          <p>
            זה הסוד הגדול: התמונות באתר צולמו ביום הפתיחה, לפני 5 שנים. מאז עברו בוילה מאות קבוצות. אתם מגיעים ומגלים ספה שקועה, פרגולה מתקלפת וברזים מטפטפים. שילמתם על יוקרה וקיבלתם אכסניה.
          </p>

          <h2>למה אי אפשר לסמוך על ביקורות?</h2>
          <p>
            ביקורות טובות מלפני שנתיים לא רלוונטיות למצב הנכס היום. האינטרס של בעל הוילה הוא להשאיר את התמונות היפות והישנות.
          </p>

          <h2>סימני אזהרה</h2>
          <ul>
            <li>תמונות חוץ עם צמחייה צעירה מידי (סימן לתמונה ישנה).</li>
            <li>היעדר תמונות תקריב (קלוז-אפ) על רהיטים ומקלחות.</li>
          </ul>

          <h3>הפתרון: בקרת איכות בשטח</h3>
          <p>
            אנחנו לא מסתמכים על תמונות ארכיון. הצוותים שלנו מבקרים בנכסים באופן שוטף. נכס שלא עומד בסטנדרט יורד מהמאגר.
          </p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים את מה שראיתם בתמונות?</h2>
          <p>תנו לנו לוודא שהוילה מתוחזקת ברמה גבוהה גם היום.</p>
          <div className={styles.ctaButtons}>
            <a href="https://wa.me/972XXXXXXXXX" className={styles.ctaButtonWhatsapp}>מצאו לי וילה שמורה ונקייה 💬</a>
          </div>
        </div>
      </div>
    </article>
  );
}
