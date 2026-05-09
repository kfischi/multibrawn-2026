import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: '10 טעויות שישראלים עושים בהזמנת צימר | MULTIBRAWN',
  description: 'לא בודקים כשרות, לא שואלים על שכנים, לא קוראים ביקורות — רשימת 10 הטעויות הכי נפוצות בהזמנת צימר ואיך להימנע מהן.',
  keywords: ['טעויות הזמנת צימר', 'איך לבחור צימר', 'טיפים לצימר', 'צימר כשר', 'צימר עם בריכה'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/10-zimmer-mistakes' },
  openGraph: {
    title: '10 טעויות שישראלים עושים בהזמנת צימר | MULTIBRAWN',
    description: 'הרשימה שחייבים לקרוא לפני כל הזמנה.',
    url: 'https://multibrawn.co.il/blog/10-zimmer-mistakes',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link><span>/</span>
          <Link href="/blog">בלוג</Link><span>/</span>
          <span>10 טעויות</span>
        </nav>
        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>😬 10 טעויות שישראלים עושים בהזמנת צימר</h1>
          <div className={styles.meta}><span>10 בינואר 2025</span><span>⏱️ 7 דקות</span></div>
        </header>
        <div className={styles.content}>
          <p>אחרי אלפי הזמנות שסידרנו, ראינו כמעט הכל. הנה הטעויות שחוזרות שוב ושוב — ואיך להימנע מהן.</p>

          <h2>1. 🔍 לא קוראים את כל הביקורות</h2>
          <p>הביקורת הכי חשובה היא לא ה-5 כוכבים אלא ה-3 כוכבים. שם תמצאו את האמת. חפשו ביקורות שמזכירות רעש, ניקיון או בעל נכס לא נגיש.</p>

          <h2>2. 🏊 לא שואלים על הבריכה</h2>
          <p>״בריכה מחוממת״ יכולה להיות בריכה שמחממים אותה פעם בשבוע לחצי שעה. תשאלו: מה הטמפרטורה? מי מחליף את המים? מה גודלה?</p>

          <h2>3. 🕍 לא מבררים כשרות לפרטים</h2>
          <p>לציבור הדתי: ״כשר״ כתובת לא אומרת כלום. שאלו: איזה כשרות? האם יש בד״ץ? מה עם הבשר? האם המטבח כולו כשר?</p>

          <h2>4. 🏘️ לא שואלים על שכנים</h2>
          <p>״פרטיות מלאה״ בפרסום, אבל יש עוד 3 צימרים באותה חצר. בדקו: האם הצימר עצמאי לחלוטין? האם יש גדר?</p>

          <h2>5. 📍 לא בודקים את המרחק האמיתי</h2>
          <p>״קרוב לים״ — 2 ק"מ הליכה? 10 דקות נסיעה? בדקו ב-Google Maps את המרחק האמיתי לנקודות שחשובות לכם.</p>

          <h2>6. 💰 לא שואלים על עלויות נסתרות</h2>
          <p>דמי ניקיון, דמי שירות, אבטחת תשלום — יכולים להוסיף 20-30% למחיר. תמיד שאלו: מה המחיר הסופי הכולל?</p>

          <h2>7. 📱 לא שומרים את פרטי בעל הנכס</h2>
          <p>הגעתם ב-11 בלילה, המנעול לא עובד — ואין לכם מספר טלפון. תמיד שמרו את הפרטים מראש.</p>

          <h2>8. 📸 לא מצלמים בכניסה</h2>
          <p>צלמו הכל בכניסה — כל שריטה, כל כלי שבור. בטוחים בתביעות מיותרות על נזקים שהיו לפניכם.</p>

          <h2>9. 🗓️ לא בודקים מדיניות ביטול</h2>
          <p>״ביטול חינם עד 48 שעות לפני״ — אבל מה קורה אם חולים? תמיד קראו את כל מדיניות הביטול.</p>

          <h2>10. 🤷 לא עובדים עם מומחה</h2>
          <p>במקום לשבשש לבד בין מאות אתרים, תנו למישהו שיודע לסנן — חוסכים זמן, כסף ועצבים.</p>
        </div>
        <div className={styles.cta}>
          <h2>רוצים שנסנן בשבילכם?</h2>
          <p>ערדית תמצא לכם בדיוק מה שמתאים — בלי הטעויות האלה</p>
          <div className={styles.ctaButtons}>
            <Link href="/contact" className={styles.ctaButton}>דברו עם ערדית</Link>
            <a href="https://wa.me/972523983394?text=שלום! אני צריך עזרה בבחירת צימר" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
