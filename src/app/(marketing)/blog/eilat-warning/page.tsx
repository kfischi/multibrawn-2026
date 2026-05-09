import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "נוסעים לאילת? 5 דברים שחייבים לדעת לפני | MULTIBRAWN",
  description: "אילת בעיניים פתוחות — מה לא יספרו לכם ביקורות. מחירי עונה, חום קיצוני, שמורות טבע ומה עדיף להזמין מראש. הטיפים האמיתיים.",
  keywords: ["נסיעה לאילת", "אילת מלון", "חופשה באילת", "אילת טיפים", "אילת עם ילדים", "אילת קיץ"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/eilat-warning' },
  openGraph: {
    title: "נוסעים לאילת? 5 דברים שחייבים לדעת לפני | MULTIBRAWN",
    description: "אילת בעיניים פתוחות — מה לא יספרו לכם ביקורות. מחירי עונה, חום קיצוני, שמורות טבע ומה עדיף להזמין מראש. הטיפים האמיתיים.",
    url: 'https://multibrawn.co.il/blog/eilat-warning',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828637/אילת_rtmczk.png', width: 1200, height: 630, alt: "נוסעים לאילת? 5 דברים שחייבים לדעת לפני | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "נוסעים לאילת? 5 דברים שחייבים לדעת לפני | MULTIBRAWN",
    description: "אילת בעיניים פתוחות — מה לא יספרו לכם ביקורות. מחירי עונה, חום קיצוני, שמורות טבע ומה עדיף להזמין מראש. הטיפים האמיתיים.",
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828637/אילת_rtmczk.png'],
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
          <span>נוסעים לאילת</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>וידאו</div>
          <h1 className={styles.title}>🌴 נוסעים לאילת? תיזהרו</h1>
          <div className={styles.meta}>
            <span>23 בדצמבר 2024</span>
            <span>⏱️ 2 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <div style={{ 
            position: 'relative', 
            paddingBottom: '177.78%',
            height: 0,
            overflow: 'hidden',
            maxWidth: '400px',
            margin: '0 auto 2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <video
              controls
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828637/%D7%90%D7%99%D7%9C%D7%AA_rtmczk.png"
            >
              <source src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684426/%D7%90%D7%99%D7%9C%D7%AA_ba7jjj.mp4" type="video/mp4" />
            </video>
          </div>

          <p>מה חשוב לדעת לפני שנוסעים לנופש באילת - טיפים חשובים מהשטח.</p>
          
          <h2>למה כדאי להיזהר?</h2>
          <p>אילת זה נהדר, אבל יש כמה דברים שחשוב לדעת מראש.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים המלצה נכונה?</h2>
          <p>נעזור לכם למצוא את המקום המושלם!</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394?text=היי! רוצה המלצות לנופש" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
