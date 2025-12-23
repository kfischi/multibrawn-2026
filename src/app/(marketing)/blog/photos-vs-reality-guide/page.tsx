import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "תמונות מול מציאות | MULTIBRAWN",
  description: "מאמר על תמונות מול מציאות",
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
          <span>תמונות מול מציאות</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>טיפים</div>
          <h1 className={styles.title}>תמונות מול מציאות</h1>
          <div className={styles.meta}>
            <span>20 בדצמבר 2024</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image src="https://res.cloudinary.com/decirk3zb/image/upload/v1766253283/תמונה_ga3cj2.png" alt="תמונות מול מציאות" fill priority style={{ objectFit: "cover" }} />
        </div>

        <div className={styles.content}>
          <p>מאמר 7: תמונות מול מציאות (החדר הקטן)</p>
          <p>📸 בתמונה זה נראה אולם נשפים, במציאות הספה חוסמת את הדלת. איך לא ליפול בפח?</p>
          <p>אנחנו חיים בעידן האינסטגרם, ובעלי הצימרים (והצלמים שלהם) למדו את השיטה. אתם גולשים באתר, רואים תמונה של סלון ענק, רחב ידיים, עם תקרה גבוהה ומרחבים. "וואו", אתם אומרים לעצמכם, "יש פה מקום לילדים לרוץ". אתם מזמינים. מגיעים למקום, פותחים את הדלת... וחוטפים שוק. החדר צפוף. המיטה צמודה לקיר (צריך לקפוץ מעליה כדי להיכנס). הספה חוסמת את המעבר למטבחון. המזוודה? אין איפה לפתוח אותה על הרצפה.</p>
          <p>איך זה קרה? התשובה היא שתי מילים: עדשה רחבה (Wide Lens). זו עדשה שצלמי נדל"ן משתמשים בה כדי "לפתוח" את החלל. היא לוקחת חדר של 3X3 מטר וגורמת לו להיראות כמו אולם של 10 מטר. זה חוקי, אבל זה מטעה.</p>
          <p>איך הופכים לבלשים ומזהים את הטריק?</p>
          <p>אתם לא צריכים להיות צלמים מקצועיים כדי לחשוף את האמת. הנה 3 סימנים מחשידים שכל אחד יכול לבדוק בתמונות:</p>
          <p>1. שיטת המרצפות (הכי אמין) חפשו תמונה שרואים בה את הרצפה. גודל סטנדרטי של מרצפת הוא 60 ס"מ (או 80 בחדשים). תתחילו לספור: כמה מרצפות יש בין קצה המיטה לבין הקיר שממול? אם יש רק מרצפת וחצי – המרחק הוא בקושי מטר. בתמונה זה אולי נראה רחוק, אבל במציאות אתם תיתקלו במיטה עם הברך בכל פעם שתעברו.</p>
          <p>2. עיוות בפינות הסתכלו על החפצים בקצוות של התמונה. האם הטלוויזיה נראית רחבה בצורה מוזרה? האם העציץ נראה "מרוח"? האם הקירות נראים מעוגלים מעט? זה הסימן המובהק לעדשה רחבה אגרסיבית. ככל שהעיוות גדול יותר, כך החדר קטן יותר במציאות.</p>
          <p>3. הווילונות הסגורים למה הווילונות סגורים בצהרי היום בתמונה? בדרך כלל, זה כדי להסתיר את העובדה שהחלון פונה לקיר בטון, לחניה, או למחסן של השכן. אם אין תמונה ברורה של הנוף מהחלון – כנראה שאין נוף.</p>
          <p>הסכנה האמיתית: משפחות עם לול</p>
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
