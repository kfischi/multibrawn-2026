import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "עלויות נסתרות בוילה — מה לא סיפרו לכם לפני ההזמנה | MULTIBRAWN",
  description: "דמי ניקיון, פיקדון, חשמל, מיזוג — גלו את כל העלויות הנסתרות שצריך לחשב לפני שמזמינים וילה. שקיפות מלאה כדי שלא תופתעו.",
  keywords: ["עלויות נסתרות וילה", "דמי ניקיון צימר", "פיקדון וילה", "מחיר אמיתי צימר", "עלויות נסתרות נופש"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/hidden-villa-costs' },
  openGraph: {
    title: "עלויות נסתרות בוילה — מה לא סיפרו לכם לפני ההזמנה | MULTIBRAWN",
    description: "דמי ניקיון, פיקדון, חשמל, מיזוג — גלו את כל העלויות הנסתרות שצריך לחשב לפני שמזמינים וילה. שקיפות מלאה כדי שלא תופתעו.",
    url: 'https://multibrawn.co.il/blog/hidden-villa-costs',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png', width: 1200, height: 630, alt: "עלויות נסתרות בוילה — מה לא סיפרו לכם לפני ההזמנה | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "עלויות נסתרות בוילה — מה לא סיפרו לכם לפני ההזמנה | MULTIBRAWN",
    description: "דמי ניקיון, פיקדון, חשמל, מיזוג — גלו את כל העלויות הנסתרות שצריך לחשב לפני שמזמינים וילה. שקיפות מלאה כדי שלא תופתעו.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png'],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>עלויות נסתרות</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>עלויות נסתרות בצימרים</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>כל העלויות הנסתרות שצריך לדעת לפני ההזמנה.</p>
          <p>תוכן מפורט יתווסף בקרוב.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים צימר ללא הפתעות?</h2>
          <p>דברו איתנו!</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
