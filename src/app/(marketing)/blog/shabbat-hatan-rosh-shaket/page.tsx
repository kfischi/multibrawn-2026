import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "שבת חתן בראש שקט — המדריך המלא לארגון מושלם | MULTIBRAWN",
  description: "איך מארגנים שבת חתן בראש שקט, שמח ומסודר? וידאו + מדריך מלא: איפה לשמור, כמה אורחים, כשרות, צניעות ומה חשוב לבדוק.",
  keywords: ["שבת חתן", "ראש שקט", "ארגון שבת חתן", "שבת חתן ירושלים", "מקום לשבת חתן", "שבת חתן דתי"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/shabbat-hatan-rosh-shaket' },
  openGraph: {
    title: "שבת חתן בראש שקט — המדריך המלא לארגון מושלם | MULTIBRAWN",
    description: "איך מארגנים שבת חתן בראש שקט, שמח ומסודר? וידאו + מדריך מלא: איפה לשמור, כמה אורחים, כשרות, צניעות ומה חשוב לבדוק.",
    url: 'https://multibrawn.co.il/blog/shabbat-hatan-rosh-shaket',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/שבת_חתן_zo14ig.png', width: 1200, height: 630, alt: "שבת חתן בראש שקט — המדריך המלא לארגון מושלם | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "שבת חתן בראש שקט — המדריך המלא לארגון מושלם | MULTIBRAWN",
    description: "איך מארגנים שבת חתן בראש שקט, שמח ומסודר? וידאו + מדריך מלא: איפה לשמור, כמה אורחים, כשרות, צניעות ומה חשוב לבדוק.",
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/שבת_חתן_zo14ig.png'],
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
          <span>שבת חתן בראש שקט</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>וידאו</div>
          <h1 className={styles.title}>✡️ שבת חתן בראש שקט</h1>
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
              poster="https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png"
            >
              <source src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763684490/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_gamaqi.mp4" type="video/mp4" />
            </video>
          </div>

          <p>כל מה שצריך לדעת על ארגון שבת חתן מושלם במתחמים בראש שקט.</p>
          
          <h2>למה ראש שקט?</h2>
          <p>המיקום המושלם לשבת חתן - שקט, מבודד, ומלא מתחמים מדהימים לקבוצות.</p>
        </div>

        <div className={styles.cta}>
          <h2>מחפשים מתחם לשבת חתן?</h2>
          <p>נמצא לכם את המקום המושלם!</p>
          <div className={styles.ctaButtons}>
            <Link href="/shabbat-hatan" className={styles.ctaButton}>מתחמים לשבת חתן</Link>
            <a href="https://wa.me/972523983394?text=היי! רוצה לשמוע על שבת חתן" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
