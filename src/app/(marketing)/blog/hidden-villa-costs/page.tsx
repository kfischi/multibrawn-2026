import Image from 'next/image';
import Link from 'next/link';
import styles from '../../Article.module.css';

export default function HiddenCostsPage() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">בית</Link> / <Link href="/blog">בלוג</Link> / עלויות נסתרות
        </div>

        <header className={styles.header}>
          <span className={styles.category}>טיפים</span>
          <h1 className={styles.title}>סגרתם ב-4,000 ש"ח, שילמתם 5,500 ש"ח. המדריך לעלויות הנסתרות</h1>
          <div className={styles.meta}>
            <span>📅 01.01.2025</span>
            <span>⏱️ 4 דקות קריאה</span>
          </div>
        </header>

        <div className={styles.featuredImage}>
          <Image 
            src="https://res.cloudinary.com/decirk3zb/image/upload/f_auto,q_auto/v1/villa-money" 
            alt="כסף ותקציב נופש" 
            fill 
            style={{ objectFit: 'cover' }} 
          />
        </div>

        <div className={styles.content}>
          <p>
            מצאתם וילה במחיר טוב. הייתה חופשה נהדרת. ואז מגיע הצ'ק-אאוט: "חימום בריכה? תוספת 600 ש"ח. ג'קוזי? 250 ש"ח. ניקיון? 400 ש"ח." פתאום המחיר קופץ ב-30%.
          </p>

          <h2>שיטת ה"מצליח" של ענף היוקרה</h2>
          <p>
            וילות רבות מפרסמות מחיר בסיס נמוך ו"משלימות הכנסה" דרך תוספות שמוחבאות באותיות הקטנות.
          </p>

          <h2>ממה להיזהר?</h2>
          <ul>
            <li><strong>חשמל/אנרגיה:</strong> חיוב נפרד על צריכת חשמל (במיוחד בחימום בריכה).</li>
            <li><strong>דמי ניקיון:</strong> תשלום נוסף שלא כלול במחיר הלילה.</li>
            <li><strong>אדם נוסף:</strong> קנסות על חריגה מכמות האנשים הבסיסית.</li>
          </ul>

          <h3>הפתרון: מחיר סופי (Fix Price)</h3>
          <p>
            המודל שלנו ב-Multibrawn מבוסס על שקיפות מלאה. ההצעות שלנו כוללות הכל. כשאתם סוגרים דרכנו, המחיר הוא סופי ואין הפתעות ביציאה.
          </p>
        </div>

        <div className={styles.cta}>
          <h2>רוצים הצעת מחיר אמיתית?</h2>
          <p>בלי טריקים ובלי הפתעות בצ'ק-אאוט.</p>
          <div className={styles.ctaButtons}>
            <a href="https://wa.me/972XXXXXXXXX" className={styles.ctaButtonWhatsapp}>קבלו הצעת מחיר שקופה 💬</a>
          </div>
        </div>
      </div>
    </article>
  );
}
