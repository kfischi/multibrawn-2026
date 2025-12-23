import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "קמין אמיתי | MULTIBRAWN",
  description: "מאמר על קמין אמיתי",
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
          <span>קמין אמיתי</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>קמין אמיתי</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 4 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766253408/תמונה_fwjqkl.png" alt="קמין אמיתי" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>מאמר 8: קמין אמיתי (האווירה)</p>
          <p>🔥 קמין עצים או "תנור עם ציור של אש"? אל תתנו להם להרוס את הרומנטיקה.</p>
          <p>חופשת חורף בצפון. גשם בחוץ, קר. הפנטזיה שלכם ברורה: אתם יושבים על השטיח, כוס יין אדום ביד, מולכם אח בוערת. אתם שומעים את העץ מתפצפץ, מריחים את הריח המשכר של המדורה, ומרגישים את החום הטבעי שחודר לעצמות. זו הרומנטיקה במיטבה.</p>
          <p>אבל במציאות, הרבה זוגות מגיעים לצימר ומגלים "קמין חשמלי". מה זה אומר? זה בעצם מפזר חום פשוט, שהלבישו עליו פלסטיק בצורת בולי עץ עם נורות לד אדומות שמהבהבות. זה מחמם? כן. זה רומנטי? כמו לשבת מול תנור ספירלה באמבטיה. האכזבה ענקית.</p>
          <p>המדריך לסוגי הקמינים (דעו על מה אתם משלמים)</p>
          <p>1. קמין עצים (The Real Deal) הדבר האמיתי. עשוי יציקת ברזל, עם ארובה שעולה לגג.</p>
          <p>היתרונות: ריח, רעש, חום עוצמתי, אווירה שאי אפשר לחקות.</p>
          <p>החסרונות: צריך "לעבוד" (להביא עצים, להדליק, לנקות).</p>
          <p>האותיות הקטנות: וודאו שהעצים כלולים במחיר! יש מקומות שנותנים שק אחד וגובים 50 ש"ח על כל שק נוסף.</p>
          <p>2. קמין נפט/סולר (הנוסטלגי) נפוץ בצימרים ותיקים. נראה כמו קמין עצים אבל עובד על דלק.</p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים צימר מושלם?</h2>
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

