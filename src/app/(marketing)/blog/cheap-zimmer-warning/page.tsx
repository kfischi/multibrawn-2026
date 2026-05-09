import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "מחפשים צימר זול? למה לפעמים זול יוצא יקר | MULTIBRAWN",
  description: "צימר זול יכול לעלות לכם ביוקר. גלו את 7 הטעויות הנפוצות ביותר בחיפוש אחר מבצעים, ואיך לחסוך כסף בלי לקלקל את החופשה.",
  keywords: ["צימר זול", "מבצעי צימרים", "הנחות צימרים", "צימר במחיר טוב", "טעויות בהזמנת צימר"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/cheap-zimmer-warning' },
  openGraph: {
    title: "מחפשים צימר זול? למה לפעמים זול יוצא יקר | MULTIBRAWN",
    description: "צימר זול יכול לעלות לכם ביוקר. גלו את 7 הטעויות הנפוצות ביותר בחיפוש אחר מבצעים, ואיך לחסוך כסף בלי לקלקל את החופשה.",
    url: 'https://multibrawn.co.il/blog/cheap-zimmer-warning',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828638/זול_t7cops.png', width: 1200, height: 630, alt: "מחפשים צימר זול? למה לפעמים זול יוצא יקר | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "מחפשים צימר זול? למה לפעמים זול יוצא יקר | MULTIBRAWN",
    description: "צימר זול יכול לעלות לכם ביוקר. גלו את 7 הטעויות הנפוצות ביותר בחיפוש אחר מבצעים, ואיך לחסוך כסף בלי לקלקל את החופשה.",
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828638/זול_t7cops.png'],
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
          <span>מחפשים זול</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>וידאו</div>
          <h1 className={styles.title}>💰 מחפשים זול?</h1>
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
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828638/%D7%96%D7%95%D7%9C_t7cops.png"
            >
              <source src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763718107/%D7%96%D7%95%D7%9C_lcwakc.mp4" type="video/mp4" />
            </video>
          </div>

          <p>למה לפעמים הזול ביותר הופך להיות היקר ביותר - חשוב לדעת!</p>
          
          <h2>איזה מחיר נכון?</h2>
          <p>איך למצוא את האיזון הנכון בין מחיר לאיכות.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים ערך אמיתי?</h2>
          <p>נמצא לכם את היחס הטוב ביותר!</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394?text=היי! רוצה המלצה איכותית" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
