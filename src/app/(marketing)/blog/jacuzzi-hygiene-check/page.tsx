import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "הג׳קוזי המלוכלך — בדיקות היגיינה לפני שנכנסים | MULTIBRAWN",
  description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד. מדריך לבדיקת ג׳קוזי בצימר: מה לחפש, מה מסוכן, ואיך לדרוש ג׳קוזי נקי.",
  keywords: ["ג׳קוזי נקי", "היגיינה צימר", "בדיקת ג׳קוזי", "ג׳קוזי בצימר", "ג׳קוזי פרטי", "בטיחות ג׳קוזי"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/jacuzzi-hygiene-check' },
  openGraph: {
    title: "הג׳קוזי המלוכלך — בדיקות היגיינה לפני שנכנסים | MULTIBRAWN",
    description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד. מדריך לבדיקת ג׳קוזי בצימר: מה לחפש, מה מסוכן, ואיך לדרוש ג׳קוזי נקי.",
    url: 'https://multibrawn.co.il/blog/jacuzzi-hygiene-check',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png', width: 1200, height: 630, alt: "הג׳קוזי המלוכלך — בדיקות היגיינה לפני שנכנסים | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "הג׳קוזי המלוכלך — בדיקות היגיינה לפני שנכנסים | MULTIBRAWN",
    description: "נכנסתם לג׳קוזי ויש קצף צהוב? צאו מיד. מדריך לבדיקת ג׳קוזי בצימר: מה לחפש, מה מסוכן, ואיך לדרוש ג׳קוזי נקי.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png'],
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
          <span>הג׳קוזי המלוכלך</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>הג׳קוזי המלוכלך</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766252967/תמונה_lgez2k.png" alt="הג׳קוזי המלוכלך" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>מאמר 4: הג'קוזי המלוכלך (היגיינה)</p>
          <p>🛁 נכנסתם לג'קוזי ויש קצף צהוב? צאו מיד. המדריך להיגיינה.</p>
          <p>זה הרגע שחיכיתם לו. הגעתם לצימר, הדלקתם נרות, מזגתם יין. הג'קוזי הענק בפינת החדר כבר מלא במים חמים ומזמינים. אתם נכנסים פנימה, לוחצים על כפתור הבועות (ג'טים), ופתאום... על פני המים מתחיל לצוף קצף עכור, צהבהב-אפור, עם ריח לא נעים. זה לא "קצף אמבטיה" מפנק. זו שכבת לכלוך שמורכבת משומן גוף, שאריות סבון, ותאי עור של האורחים שהיו כאן לפניכם.</p>
          <p>ברוכים הבאים לצד האפל של תעשיית הצימרים: מיחזור המים.</p>
          <p>למה זה קורה? (הכל כסף)</p>
          <p>לרוקן ג'קוזי של 400 ליטר, לקרצף אותו, למלא מחדש ולחמם את המים מאפס – זה תהליך שלוקח 3-4 שעות ועולה הרבה כסף (מים + חשמל). ישנם מארחים שמעדיפים "לעגל פינות". הם משאירים את המים מהזוג הקודם, ופשוט זורקים פנימה טבלית ברום או כלור מרוכזת. הכימיקלים הורגים את החיידקים, אבל הם לא מעלימים את הלכלוך הפיזי שנשאר בצנרת.</p>
          <p>איך בודקים את הניקיון כמו מקצוענים?</p>
          <p>לפני שאתם נכנסים למים, עשו את הבדיקות הבאות:</p>
          <p>1. מבחן הריח התקרבו למים. האם יש ריח חריף של אקונומיקה/כלור (כמו בבריכה ציבורית)? אם כן – זה סימן חשוד. מים נקיים שהוחלפו הרגע מהברז לא צריכים טיפול כימי אגרסיבי. ריח חזק מעיד על ניסיון "לחטא" מים משומשים.</p>
          <p>2. מבחן הקצף הפעילו את הג'קוזי בעוצמה מקסימלית בלי שאתם בפנים. חכו 2 דקות. אם נוצר קצף יציב וסמיך שלא מתפוגג – זה לכלוך אורגני. מים נקיים עושים בועות שמתפוצצות מיד.</p>
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
