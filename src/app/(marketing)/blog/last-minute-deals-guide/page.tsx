import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "דקה ה-90 בצימרים — מתי כדאי לחכות ומתי לא | MULTIBRAWN",
  description: "האם כדאי לחכות לדקה ה-90 ולקבל מחיר טוב יותר? מדריך מלא: מתי מבצעי ברגע האחרון שווים, מתי זה הימור מסוכן, ואיך לחסוך נכון.",
  keywords: ["מבצעי דקה 90", "צימר ברגע האחרון", "הנחה ברגע האחרון", "חיסכון בנופש", "טיפים להזמנת צימר"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/last-minute-deals-guide' },
  openGraph: {
    title: "דקה ה-90 בצימרים — מתי כדאי לחכות ומתי לא | MULTIBRAWN",
    description: "האם כדאי לחכות לדקה ה-90 ולקבל מחיר טוב יותר? מדריך מלא: מתי מבצעי ברגע האחרון שווים, מתי זה הימור מסוכן, ואיך לחסוך נכון.",
    url: 'https://multibrawn.co.il/blog/last-minute-deals-guide',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png', width: 1200, height: 630, alt: "דקה ה-90 בצימרים — מתי כדאי לחכות ומתי לא | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "דקה ה-90 בצימרים — מתי כדאי לחכות ומתי לא | MULTIBRAWN",
    description: "האם כדאי לחכות לדקה ה-90 ולקבל מחיר טוב יותר? מדריך מלא: מתי מבצעי ברגע האחרון שווים, מתי זה הימור מסוכן, ואיך לחסוך נכון.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png'],
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
          <span>הדקה ה-90</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>הדקה ה-90</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 4 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766253024/תמונה_pl6aee.png" alt="הדקה ה-90" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>📉 מתי באמת כדאי לחכות ל"דקה ה-90"? המדריך למהמרים חכמים.</p>
          <p>ישנו מיתוס עתיק בעולם הנופש הישראלי: "אל תזמינו מראש. חכו ליום חמישי בערב, המחירים יתרסקו". ואז אתם מנסים את זה. מגיע יום חמישי ב-18:00. אתם פותחים את האפליקציות. התוצאה? או שנשאררו רק ה"שאריות" (צימרים מוזנחים שאף אחד לא רצה), או שהמחירים נשארו גבוהים כי הביקוש בשמיים. במקום לחסוך, נשארתם בלי חופשה, או ששילמתם ביוקר על מקום בינוני מתוך לחץ.</p>
          <p>אז האם הדקה ה-90 היא שקר? לא. היא פשוט דורשת אסטרטגיה.</p>
          <p>"חלון הזהב": יום חמישי בין 12:00 ל-16:00</p>
          <p>זה הזמן הקריטי. בעל צימר יודע שאם עד יום חמישי בצהריים החדרים לא נמכרו, הסיכוי למכור אותם לסופ"ש צונח. חדר ריק בסופ"ש הוא הפסד של 100% (המוצר "מתקלקל" ברגע שהשבת נכנסת). בשעות האלו, ורק בשעות האלו, בעלי הצימרים נכנסים ללחץ ומוכנים לחתוך מחירים ב-30%, 40% ואפילו 50% כדי לכסות לפחות את הוצאות החשמל והניקיון.</p>
          <p>מתי אסור להמר?</p>
          <p>בחגים (סוכות, פסח, ראש השנה) ובחודש אוגוסט. בתקופות שיא הביקוש, אין "דקה 90". הכל נתפס חודשיים מראש. מי שמחכה לרגע האחרון בחגים – יישאר בבית. נקודה.</p>
          <p>הטיפ של המקצוענים: אל תסתמכו על האתרים הגדולים</p>
          <p>אתרי ההזמנות הגדולים (כמו בוקינג) גובים עמלה גבוהה (15-20%) מבעל הצימר. כשיש לבעל הצימר "חור" של הרגע האחרון, הוא מעדיף למכור אותו ישירות בווטסאפ או לקבוצות סגורות כדי לחסוך את העמלה ולתת את ההנחה ללקוח. באתרים הרגילים אתם תראו את המחיר המלא.</p>
          <p>אנחנו ה"מקורבים" שלכם בצפון</p>
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

