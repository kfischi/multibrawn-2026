import type { Metadata } from 'next';
import styles from '../privacy/Privacy.module.css';

export const metadata: Metadata = {
  title: 'תנאי שימוש | MULTIBRAWN',
  description: 'תנאי השימוש באתר MULTIBRAWN — פלטפורמת השכרת נכסים יוקרתיים.',
  alternates: { canonical: 'https://multibrawn.co.il/terms' },
};

export default function TermsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>תנאי שימוש</h1>
      <p className={styles.updated}>עודכן לאחרונה: אפריל 2026</p>

      <section className={styles.section}>
        <h2>1. כללי</h2>
        <p>ברוכים הבאים ל-MULTIBRAWN. השימוש באתר זה מהווה הסכמה לתנאי השימוש המפורטים להלן. אנא קראו בעיון לפני השימוש.</p>
      </section>

      <section className={styles.section}>
        <h2>2. השירות</h2>
        <p>MULTIBRAWN היא פלטפורמה לאיתור ותיווך נכסי נופש ואירועים בישראל — צימרים, וילות, דירות נופש ומתחמי אירועים. אנו משמשים כמתווכים בין לקוחות לבין בעלי נכסים.</p>
      </section>

      <section className={styles.section}>
        <h2>3. זכאות לשימוש</h2>
        <p>השירות מיועד לאנשים מעל גיל 18. השימוש בשירות אסור לצרכים בלתי חוקיים או מזיקים.</p>
      </section>

      <section className={styles.section}>
        <h2>4. מדיניות ביטולים</h2>
        <p>מדיניות הביטולים נקבעת עבור כל נכס בנפרד. יש לוודא את תנאי הביטול של הנכס הספציפי לפני ביצוע הזמנה. MULTIBRAWN אינה אחראית לתנאי ביטול שנקבעו על ידי בעלי הנכסים.</p>
      </section>

      <section className={styles.section}>
        <h2>5. אחריות</h2>
        <p>MULTIBRAWN אינה אחראית לנזקים שנגרמו כתוצאה משימוש בנכסים המפורסמים באתר. האחריות על הנכס ותכולתו חלה על בעל הנכס בלבד.</p>
      </section>

      <section className={styles.section}>
        <h2>6. קניין רוחני</h2>
        <p>כל התוכן באתר — לרבות תמונות, טקסטים ועיצובים — הוא רכושה של MULTIBRAWN ומוגן בזכויות יוצרים. אין לעשות בו שימוש ללא אישור בכתב.</p>
      </section>

      <section className={styles.section}>
        <h2>7. שינויים בתנאים</h2>
        <p>MULTIBRAWN שומרת לעצמה את הזכות לשנות את תנאי השימוש בכל עת. המשך השימוש באתר לאחר פרסום שינויים מהווה הסכמה לתנאים המעודכנים.</p>
      </section>

      <section className={styles.section}>
        <h2>8. יצירת קשר</h2>
        <p>לכל שאלה בנוגע לתנאי השימוש: <a href="mailto:info@multibrawn.co.il">info@multibrawn.co.il</a></p>
      </section>
    </div>
  );
}
