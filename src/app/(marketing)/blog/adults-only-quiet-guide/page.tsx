import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "שקט בבקשה | MULTIBRAWN",
  description: "מאמר על שקט בבקשה",
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
          <span>שקט בבקשה</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>שקט בבקשה</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766253191/תמונה_mujulg.png" alt="שקט בבקשה" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>🔇 שילמתם על שקט רומנטי, קיבלתם את הקייטנה של השכנים. למה Adults Only זה מאסט?</p>
          <p>זה התסריט הכי מתסכל שיש להורים צעירים (וגם לזוגות ותיקים): חסכתם כסף. מצאתם בייביסיטר לילדים או שמתם אותם אצל סבתא. שרפתם יום חופש מהעבודה. כל המטרה הייתה אחת: שקט. לברוח מהצעקות, מה"אבא תביא לי", ומהרעש התמידי. אתם מגיעים לצימר, נשכבים על המיטה בבריכה, עוצמים עיניים, נושמים עמוק... ואז: "יוני!!! תעשה פצצה למים!!!".</p>
          <p>מתברר שבבקתה הצמודה (זו שחולקת איתכם את החצר או נמצאת מעבר לגדר הדקה) נופשת משפחה עם 4 ילדים אנרגטיים. הם חמודים, באמת. אבל הם רועשים. הם משחקים תופסת, הם בוכים, הם צוחקים בקולי קולות. באותו רגע, החופשה הרומנטית שלכם נגמרה. אי אפשר לקרוא ספר, אי אפשר לישון צהריים, ואי אפשר לנהל שיחה אינטימית. הרגשתם שברחתם מהילדים שלכם, רק כדי ליפול על הילדים של השכנים.</p>
          <p>ההבדל הקריטי בין "רומנטי" ל-"למבוגרים בלבד"</p>
          <p>באתרי האינטרנט, רוב הצימרים מוגדרים כ"רומנטיים". אבל יש כאן הטעיה צרכנית קטנה:</p>
          <p>"צימר רומנטי": אומר שיש בחדר ג'קוזי, נרות ויין. זה לא אומר שאסור להביא לשם ילדים. בעל הצימר רוצה למקסם רווחים, ולכן בחגים ובחופש הגדול הוא יקבל משפחות בשמחה.</p>
          <p>"Adults Only" (מבוגרים בלבד): זו הצהרת כוונות. כאן בעל הצימר אומר "לא" לכסף של משפחות כדי לשמור לכם על השקט. זהו מתחם סטרילי מרעש של ילדים.</p>
          <p>למה שווה לשלם את האקסטרה?</p>
          <p>בדרך כלל, מתחמי Adults Only יקרים יותר ב-10-15%. למה? כי המארח מוותר על קהל יעד ענק (משפחות). אבל התמורה שאתם מקבלים שווה כל שקל:</p>
          <p>שקט אמיתי: הדממה היא הנכס הכי יקר בחופשה. לשמוע רק ציוץ ציפורים ורוח בעצים.</p>
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
