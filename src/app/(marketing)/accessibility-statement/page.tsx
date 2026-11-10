import styles from './AccessibilityStatement.module.css';

export const metadata = {
  title: 'הצהרת נגישות',
  description: 'הצהרת הנגישות של מולטיבראון - מחויבות לנגישות דיגיטלית לכולם',
};

export default function AccessibilityStatementPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>הצהרת נגישות</h1>
        <p className={styles.updated}>עדכון אחרון: דצמבר 2024</p>

        <section className={styles.section}>
          <h2>1. מחויבות לנגישות</h2>
          <p>
            מולטיבראון מחויבת להנגיש את האתר שלה לאנשים עם מוגבלויות.
            אנו פועלים ללא הרף כדי לשפר את חווית המשתמש לכל המבקרים ולהבטיח
            שהאתר שלנו עומד בתקנים הבינלאומיים לנגישות.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. תקנים בהם אנו עומדים</h2>
          <p>האתר שלנו תואם את הסטנדרטים הבאים:</p>
          <ul>
            <li><strong>WCAG 2.1:</strong> תקן נגישות תוכן אינטרנט ברמה AA</li>
            <li><strong>תקנות שוויון זכויות:</strong> תקנות נגישות שירות (2013)</li>
            <li><strong>תקן ישראלי 5568:</strong> נגישות אתרי אינטרנט</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. תכונות נגישות באתר</h2>
          <p>האתר כולל תכונות נגישות רבות:</p>
          <ul>
            <li><strong>ניווט מקלדת:</strong> ניתן לנווט באתר באמצעות מקלדת בלבד</li>
            <li><strong>תמיכה בקוראי מסך:</strong> האתר תואם לקוראי מסך מובילים (NVDA, JAWS)</li>
            <li><strong>גודל טקסט מתכוונן:</strong> אפשרות להגדיל/להקטין את גודל הטקסט</li>
            <li><strong>ניגודיות גבוהה:</strong> מצב ניגודיות גבוהה לקריאה טובה יותר</li>
            <li><strong>ריווח שורות ואותיות:</strong> התאמה אישית של ריווחים</li>
            <li><strong>תיאורי תמונות:</strong> כל התמונות כוללות תיאור טקסטואלי</li>
            <li><strong>כותרות מובנות:</strong> מבנה היררכי ברור של כותרות</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. שימוש בתפריט הנגישות</h2>
          <p>
            תפריט הנגישות נמצא בצד שמאל של המסך (סמל נגישות כחול).
            לחיצה על הכפתור תפתח תפריט עם אפשרויות התאמה אישית:
          </p>
          <ul>
            <li>שינוי גודל טקסט (4 רמות)</li>
            <li>החלפה למצב ניגודיות גבוהה</li>
            <li>התאמת ריווח שורות (3 רמות)</li>
            <li>התאמת ריווח אותיות (3 רמות)</li>
            <li>כפתור איפוס לחזרה להגדרות ברירת מחדל</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. קיצורי מקלדת</h2>
          <p>קיצורי דרך נפוצים לניווט באתר:</p>
          <ul>
            <li><strong>Tab:</strong> מעבר בין אלמנטים אינטראקטיביים</li>
            <li><strong>Enter/Space:</strong> הפעלת כפתורים וקישורים</li>
            <li><strong>Esc:</strong> סגירת חלונות קופצים ותפריטים</li>
            <li><strong>Arrow Keys:</strong> ניווט בתוך תפריטים נפתחים</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. דפדפנים וטכנולוגיות נתמכות</h2>
          <p>האתר נבדק ופועל בצורה מיטבית עם:</p>
          <ul>
            <li><strong>דפדפנים:</strong> Chrome, Firefox, Safari, Edge (גרסאות אחרונות)</li>
            <li><strong>קוראי מסך:</strong> NVDA, JAWS, VoiceOver, TalkBack</li>
            <li><strong>מכשירים:</strong> מחשב נייח, נייד, טאבלט, סמארטפון</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. שיפור מתמיד</h2>
          <p>
            אנו עובדים באופן שוטף על שיפור הנגישות באתר:
          </p>
          <ul>
            <li>ביקורות נגישות תקופתיות</li>
            <li>בדיקות עם משתמשים בעלי מוגבלויות</li>
            <li>עדכונים טכנולוגיים שוטפים</li>
            <li>הכשרת צוות בנושא נגישות</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. מגבלות ידועות</h2>
          <p>
            למרות מאמצינו, ייתכן ויש עדיין אזורים באתר שאינם נגישים במלואם.
            אנו עובדים על תיקון כל בעיה שמתגלה.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. משוב ויצירת קשר</h2>
          <p>
            נשמח לשמוע על בעיות נגישות או הצעות לשיפור.
            אם נתקלתם בבעיה או יש לכם הצעה, אנא צרו קשר:
          </p>
          <div className={styles.contactInfo}>
            <p><strong>רכזת נגישות: ערדית</strong></p>
            <p>📧 אימייל: <a href="mailto:accessibility@multibrawn.co.il">accessibility@multibrawn.co.il</a></p>
            <p>📱 טלפון: <a href="tel:+972523983394">052-398-3394</a></p>
            <p>💬 WhatsApp: <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer">שלח הודעה</a></p>
            <p className={styles.responseTime}>⏱️ זמן תגובה: עד 3 ימי עסקים</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2>10. הליך טיפול בפניות</h2>
          <p>כאשר אתם פונים אלינו בנושא נגישות:</p>
          <ul>
            <li>נקבל את הפנייה ונאשר קבלה תוך 24 שעות</li>
            <li>נבדוק את הבעיה ונחזור אליכם תוך 3 ימי עסקים</li>
            <li>נתקן את הבעיה בהקדם האפשרי</li>
            <li>נעדכן אתכם על ההתקדמות</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
