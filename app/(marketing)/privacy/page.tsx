import styles from './Privacy.module.css';

export const metadata = {
  title: 'מדיניות פרטיות | MULTIBRAWN',
  description: 'מדיניות הפרטיות של מולטיבראון - כיצד אנו שומרים על הפרטיות שלכם',
};

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>מדיניות פרטיות</h1>
        <p className={styles.updated}>עדכון אחרון: דצמבר 2024</p>

        <section className={styles.section}>
          <h2>1. מבוא</h2>
          <p>
            מולטיבראון ("אנחנו", "שלנו") מחויבת להגן על פרטיות המשתמשים באתר.
            מדיניות פרטיות זו מסבירה כיצד אנו אוספים, משתמשים, ומגנים על המידע האישי שלך.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. מידע שאנו אוספים</h2>
          <ul>
            <li><strong>מידע אישי:</strong> שם, כתובת אימייל, מספר טלפון</li>
            <li><strong>מידע על ההזמנה:</strong> תאריכים, סוג נכס, תקציב, העדפות</li>
            <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה</li>
            <li><strong>קבצי Cookies:</strong> לשיפור חוויית המשתמש</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. שימוש במידע</h2>
          <p>אנו משתמשים במידע שאנו אוספים למטרות הבאות:</p>
          <ul>
            <li>מתן שירות איכותי ומענה לבקשות שלך</li>
            <li>שיפור השירותים והתכנים באתר</li>
            <li>שליחת עדכונים והצעות רלוונטיות (בהסכמתך)</li>
            <li>ניתוח שימוש באתר ושיפור חוויית המשתמש</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. שיתוף מידע</h2>
          <p>
            אנו לא משתפים את המידע האישי שלך עם צדדים שלישיים, למעט במקרים הבאים:
          </p>
          <ul>
            <li>כאשר יש לנו את הסכמתך המפורשת</li>
            <li>כאשר נדרש על פי חוק</li>
            <li>עם ספקי שירות מהימנים (לדוגמה, שירותי אחסון מאובטחים)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. אבטחת מידע</h2>
          <p>
            אנו נוקטים באמצעי אבטחה מתקדמים כדי להגן על המידע שלך:
          </p>
          <ul>
            <li>הצפנת SSL לכל העברות המידע</li>
            <li>שרתים מאובטחים עם הגנות חומה</li>
            <li>גישה מוגבלת למידע רק לעובדים מורשים</li>
            <li>ביקורות אבטחה תקופתיות</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. זכויות המשתמש</h2>
          <p>לפי חוק הגנת הפרטיות, יש לך את הזכויות הבאות:</p>
          <ul>
            <li><strong>זכות העיון:</strong> לצפות במידע האישי ששמור עליך</li>
            <li><strong>זכות התיקון:</strong> לתקן מידע לא מדויק</li>
            <li><strong>זכות המחיקה:</strong> לבקש מחיקת המידע שלך</li>
            <li><strong>זכות ההתנגדות:</strong> להתנגד לשימושים מסוימים במידע</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>7. Cookies</h2>
          <p>
            אנו משתמשים ב-Cookies כדי לשפר את חוויית המשתמש באתר.
            אתה יכול לנהל את העדפות ה-Cookies בהגדרות הדפדפן שלך.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. שירותי צד שלישי</h2>
          <p>אנו עשויים להשתמש בשירותים הבאים:</p>
          <ul>
            <li><strong>Google Analytics:</strong> לניתוח תנועה באתר</li>
            <li><strong>WhatsApp Business:</strong> לתקשורת עם לקוחות</li>
            <li><strong>Cloudinary:</strong> לאחסון תמונות</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>9. שינויים במדיניות</h2>
          <p>
            אנו שומרים לעצמנו את הזכות לעדכן מדיניות זו מעת לעת.
            שינויים מהותיים יפורסמו באתר עם הודעה מתאימה.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. צור קשר</h2>
          <p>לשאלות או בקשות בנוגע למדיניות פרטיות זו, ניתן ליצור קשר:</p>
          <div className={styles.contactInfo}>
            <p><strong>מולטיבראון</strong></p>
            <p>📧 אימייל: <a href="mailto:info@multibrawn.co.il">info@multibrawn.co.il</a></p>
            <p>📱 טלפון: <a href="tel:+972523983394">052-398-3394</a></p>
            <p>💬 WhatsApp: <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer">שלח הודעה</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
