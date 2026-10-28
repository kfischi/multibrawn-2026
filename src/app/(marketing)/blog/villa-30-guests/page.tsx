import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "וילה ל-30 איש ומעלה — מה שבעל הווילה יודע ואתם לא | MULTIBRAWN",
  description: "מחפשים וילה לקבוצה גדולה? הנה מה שקורה בצד השני של הטלפון: למה בעלי וילות מסננים קבוצות, מה באמת סופרים במקום מיטות, ואיך קבוצה טובה מקבלת מחיר טוב.",
  keywords: ["וילה ל-30 איש", "וילה לקבוצה גדולה", "וילה למשפחה גדולה", "השכרת וילה לקבוצות", "וילה לשבת", "מתחם אירוח לקבוצות", "וילה גדולה להשכרה"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/villa-30-guests' },
  openGraph: {
    title: "וילה ל-30 איש ומעלה — מה שבעל הווילה יודע ואתם לא | MULTIBRAWN",
    description: "מה קורה בצד השני של הטלפון: למה בעלי וילות מסננים קבוצות, ואיך קבוצה טובה מקבלת מחיר טוב.",
    url: 'https://multibrawn.co.il/blog/villa-30-guests',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg', width: 1200, height: 630, alt: "וילה ל-30 איש ומעלה | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "וילה ל-30 איש ומעלה — מה שבעל הווילה יודע ואתם לא",
    description: "מה קורה בצד השני של הטלפון כשאתם מחפשים וילה לקבוצה גדולה.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg'],
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
          <span>וילה ל-30 איש ומעלה</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>קבוצות גדולות</div>
          <h1 className={styles.title}>וילה ל-30 איש ומעלה — מה שבעל הווילה יודע ואתם לא</h1>
          <div className={styles.meta}>
            <span>28 באוקטובר 2026</span>
            <span>⏱️ 6 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>אני רוצה לקחת אתכם לצד השני של הטלפון. אתם מתקשרים לווילה, שואלים &quot;יש מקום ל-32 איש לסופ&quot;ש?&quot; — ובצד השני בעל הווילה כבר עושה בראש חשבון שאתם לא מכירים. אחרי שנים שאני עומדת באמצע, בין מאות משפחות לבין בעלי המתחמים שאני עובדת איתם, אני יכולה לספר לכם בדיוק מה הוא חושב. ומי שמבין את זה — מקבל וילה טובה יותר במחיר טוב יותר.</p>
          <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer" className={styles.guideBox}>
            📘 יש לי שני מדריכים לשבת חתן: <em>מדריך חינמי</em> לכל משפחה, ולצידו <em>המהדורה המלאה בתשלום</em> — רשימות, חלוקת אחריות וכלי חישוב. לחצו לקבלת המדריך ←
          </a>


          <h2>מה אתם רואים, ומה הוא רואה</h2>
          <p><strong>אתם רואים:</strong> סופ&quot;ש משפחתי, ילדים בבריכה, מנגל, שמחה.<br/>
          <strong>הוא רואה:</strong> 32 אנשים זרים בבית שעלה לו מיליונים. שכנים שעלולים להתלונן על רעש. בלאי. ושאלה אחת גדולה: מי הקבוצה הזאת?</p>
          <p>זו הסיבה שבעלי וילות טובות <strong>מסננים</strong> קבוצות — ולפעמים אומרים &quot;תפוס&quot; גם כשפנוי. הם לא נגדכם; הם נכוו. קבוצה אחת רועשת, שהשאירה את המקום הפוך, מספיקה כדי שהבעלים יעדיף להשכיר רק דרך מי שהוא סומך עליו. וכאן בדיוק נכנסת הקהילה שבניתי: בעלי מתחמים שעובדים איתי יודעים שקבוצה שמגיעה ממני עברה את השאלון שלי — כמה אנשים באמת, איזה אופי, איזה קהל. בשבילם זו ערבות. בשבילכם זו דלת שנפתחת.</p>

          <h2>&quot;30 מקומות לינה&quot; זה לא 30 מיטות</h2>
          <p>הנה החידוש שהכי חוסך אכזבות: בפרסומים סופרים &quot;מקומות לינה&quot; — וזה כולל ספות נפתחות, מזרנים וגלריות לילדים. בפועל, בווילה שמפורסמת ל-30 יש לרוב 16 עד 22 מיטות אמיתיות. לקבוצה של מבוגרים, סבים וזוגות — זה ההבדל בין שבת מוצלחת לליל נדודים. לכן השאלה הנכונה היא לא &quot;לכמה אנשים הווילה?&quot; אלא: <strong>&quot;כמה מיטות זוגיות, כמה יחידות, ובאיזו חלוקת חדרים?&quot;</strong> — ואז לשרטט מי ישן איפה, לפני הסגירה.</p>

          <h2>למה דווקא וילה, ולא מלון?</h2>
          <p>כתבתי על זה <Link href="/blog/shabbat-hatan-cost-guide">במאמר התקציב</Link>: מלונות בנויים לקבוצות של 15–25 חדרים, ומתחת לזה אתם פשוט לא מעניינים אותם. קבוצה של 30–50 איש היא בדיוק &quot;באמצע&quot; — גדולה מדי לצימרים, קטנה מדי למלון. וילות ומתחמים פרטיים הם הפתרון הטבעי: המקום כולו שלכם, המטבח שלכם (קריטי לכשרות — רבנות, מהדרין או בד&quot;ץ, אתם קובעים), והקצב שלכם.</p>

          <h2>חמש שאלות שבעלי וילות מכבדים</h2>
          <p>כששואלים אותן, בעל הווילה מבין שמולו קבוצה רצינית — וזה משנה את הטון ולפעמים גם את המחיר:</p>
          <p>1. כמה מיטות אמיתיות, ובאיזו חלוקה?<br/>
          2. מה מדיניות הרעש והשעות מול השכנים?<br/>
          3. מה כלול: חשמל, חימום בריכה, ניקיון סופי, פיקדון?<br/>
          4. מי זמין בשבת עצמה אם משהו מתקלקל?<br/>
          5. יש ציוד לקבוצה דתית — פלטות, מיחם, שעוני שבת?</p>

          <h2>ואיך זה עובד איתי?</h2>
          <p>אתם ממלאים את השאלון הקצר — כמה אנשים באמת, איזה קהל (חרדי, דתי, מעורב), תאריך ותקציב — ואני מתאימה מתוך מתחמים שאני מכירה אישית, כולל מה שלא כתוב במודעה. לתכנון של שבת חתן או אירוע יש לי גם <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">מדריך חינמי</a> ומהדורה מלאה בתשלום באותו עמוד — עם הרשימות וכלי החישוב שחוסכים את ההפתעות.</p>
          <p>עוד בנושא: <Link href="/blog/shabbat-hatan-jerusalem">שבת חתן בירושלים והסביבה</Link> · <Link href="/blog/villa-vs-hotel">וילה מול מלון</Link> · <Link href="/blog/hidden-villa-costs">העלויות הנסתרות בווילות</Link>.</p>
        </div>

        <div className={styles.cta}>
          <h2>מחפשים וילה לקבוצה גדולה?</h2>
          <p>ספרו לי על הקבוצה — ואפתח לכם את הדלתות הנכונות</p>
          <div className={styles.ctaButtons}>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ עם ערדית</a>
            <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>למדריכים</a>
          </div>
        </div>
      </div>
    </article>
  );
}
