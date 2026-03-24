import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "ארוחת הבוקר בצימר — חביתה ב-150 שקל? מתי שווה | MULTIBRAWN",
  description: "ארוחת בוקר בצימר שווה? מדריך מלא: מתי לשלם, מתי לוותר, ואיך לדעת אם ה-150 שקל מוצדקים. השוואת מחירים וטיפים מהשטח.",
  keywords: ["ארוחת בוקר צימר", "ארוחת בוקר כלולה", "נופש עם ארוחות", "צימר כולל הכל", "מחירי צימרים"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/breakfast-value-guide' },
  openGraph: {
    title: "ארוחת הבוקר בצימר — חביתה ב-150 שקל? מתי שווה | MULTIBRAWN",
    description: "ארוחת בוקר בצימר שווה? מדריך מלא: מתי לשלם, מתי לוותר, ואיך לדעת אם ה-150 שקל מוצדקים. השוואת מחירים וטיפים מהשטח.",
    url: 'https://multibrawn.co.il/blog/breakfast-value-guide',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png', width: 1200, height: 630, alt: "ארוחת הבוקר בצימר — חביתה ב-150 שקל? מתי שווה | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "ארוחת הבוקר בצימר — חביתה ב-150 שקל? מתי שווה | MULTIBRAWN",
    description: "ארוחת בוקר בצימר שווה? מדריך מלא: מתי לשלם, מתי לוותר, ואיך לדעת אם ה-150 שקל מוצדקים. השוואת מחירים וטיפים מהשטח.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png'],
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
          <span>ארוחת הבוקר</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>ארוחת הבוקר</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766252778/תמונה_jwj0zg.png" alt="ארוחת הבוקר" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>🍳 חביתה ב-150 ש"ח? מתי שווה להזמין ארוחת בוקר לצימר ומתי זו עקיצה?</p>
          <p>אחד הפינוקים הגדולים בחופשה הוא הקימה המאוחרת והידיעה שמישהו אחר מכין לכם את הקפה והחביתה. באתר הצימר כתוב: "ניתן להזמין ארוחת בוקר כפרית עשירה בתוספת תשלום". המחיר? בדרך כלל סביב 140-160 ש"ח לזוג. אתם מזמינים בציפייה גדולה.</p>
          <p>ואז מגיעה האכזבה. בשעה 9:00 דופק שליח בדלת ומגיש לכם מגש פלסטיק תעשייתי. בפנים? חביתה שכבר התקררה והזיעה בתוך הקופסה, גבינה לבנה 5% מהסופר, כמה זיתים מקופסת שימורים, לחמניות פשוטות וסלט שנקצץ לפני שלוש שעות. אתם מסתכלים על המגש ומבינים: שילמנו 150 שקל על אוכל ששווה 30 שקל. הרגשה של "פראיירים".</p>
          <p>אבל יש גם צד שני. יש צימרים שבהם ארוחת הבוקר היא חוויה קולינרית בלתי נשכחת. אז איך יודעים מראש?</p>
          <p>שני סוגי הארוחות (וההבדל התהומי ביניהן)</p>
          <p>סוג א': ה"חמגשית" (לוותר) מארחים רבים לא אוהבים להתעסק עם אוכל. הם סוגרים דיל עם חברת קייטרינג חיצונית זולה שמכינה מאות מנות בבוקר ומפזרת לצימרים באזור.</p>
          <p>הסימנים: המארח לא שואל אתכם איך אתם רוצים את הביצים, האוכל מגיע בכלים חד פעמיים, ואין שום מגע אישי.</p>
          <p>ההמלצה: ותרו. סעו 5 דקות למאפיה מקומית או לבית קפה מול הנוף. תקבלו אוכל טרי בחצי מחיר.</p>
          <p>סוג ב': ה"בוטיק" (לחטוף) כאן המארח (או אשתו/סבתא שלו) מכינים את האוכל בעצמם במטבח של המתחם.</p>
          <p>החוויה: לחם מחמצת שיצא הרגע מהתנור, ריבות ביתיות שנרקחו פרי-פרי, גבינות ממחלבה מקומית, שקשוקה רותחת במחבת אישית, ומיץ תפוזים סחוט טרי.</p>
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
