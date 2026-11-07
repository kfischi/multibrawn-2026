import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';
import ArticleJsonLd from '@/components/ArticleJsonLd';

export const metadata: Metadata = {
  title: "שף פרטי לאירוע — מתי שווה ומה חייבים לבדוק | MULTIBRAWN",
  description: "שף פרטי לשבת חתן, לנופש בווילה או לאירוע קבוצתי — מתי זה שווה, כמה עולה, ואיך בוחרים נכון. המדריך של ערדית בראון.",
  keywords: ["שף פרטי", "שף לאירוע", "שף לשבת חתן", "שף לווילה", "שף כשר", "שף חרדי", "MULTIBRAWN", "ערדית בראון"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/private-chef-guide' },
  openGraph: {
    title: "שף פרטי לאירוע — מתי שווה ומה חייבים לבדוק",
    description: "מתי כדאי להביא שף פרטי, כמה עולה, ואיך לבדוק כשרות — המדריך המלא של ערדית בראון.",
    url: 'https://multibrawn.co.il/blog/private-chef-guide',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg', width: 1200, height: 630, alt: "שף פרטי לאירוע — MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "שף פרטי לאירוע — מתי שווה ומה חייבים לבדוק",
    description: "המדריך המלא לשף פרטי: עלות, כשרות, ומה לשאול לפני שסוגרים.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg'],
  },
};

export default function Article() {
  return (
    <>
    <ArticleJsonLd
      url="https://multibrawn.co.il/blog/private-chef-guide"
      title="שף פרטי לאירוע — מתי שווה ומה חייבים לבדוק | MULTIBRAWN"
      description="שף פרטי לשבת חתן, לנופש בווילה או לאירוע קבוצתי — מתי זה שווה, כמה עולה, ואיך בוחרים נכון."
      datePublished="2026-11-03"
      keywords={["שף פרטי", "שף לאירוע", "שף לשבת חתן", "שף לווילה", "שף כשר"]}
    />
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>שף פרטי לאירוע</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>שף פרטי לאירוע — מתי שווה ומה חייבים לבדוק</h1>
          <div className={styles.meta}>
            <span>3 בנובמבר 2026</span>
            <span>⏱️ 6 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>שף פרטי לשבת חתן — זה נשמע יוקרתי, אבל יותר ויותר משפחות בוחרות בזה. לא בגלל הפאר, אלא בגלל הפתרון: מטבח מותאם אישית, כשרות שאתם שולטים בה, ואוכל שנעשה בדיוק בשביל הקהל שלכם.</p>

          <p>הנה מה שצריך לדעת לפני שמזמינים.</p>

          <h2>מתי כדאי להביא שף פרטי?</h2>
          <p>שף פרטי שווה את ההשקעה במקרים הבאים:</p>
          <p>• <strong>דרישות כשרות מחמירות</strong> — כשהקהל דורש בד&quot;ץ ספציפי, או כשמתחם האירוח מציע כשרות רבנות בסיסית. שף פרטי מוסמך מגיע עם הכשרה משלו ואחריות מלאה על הכשרות.<br/>
          • <strong>קבוצה גדולה עם צרכים שונים</strong> — ייעוץ תזונתי, אלרגיות, ילדים, קשישים. שף שמכיר מראש את הרשימה יכול לתכנן תפריט שעונה לכולם.<br/>
          • <strong>שבת חתן ממושכת</strong> — שישי בערב, שבת בבוקר, סעודה שלישית, מוצ&quot;ש. מטבח מאורגן שווה שקט נפשי של המארגנים.<br/>
          • <strong>מתחם ללא קייטרינג קבוע</strong> — וילות רבות מגיעות עם מטבח מאובזר אבל ללא שירות. שף פרטי ממלא את החוסר הזה.</p>

          <h2>כמה עולה שף פרטי?</h2>
          <p>אין מחירון אחיד — והמספר שתשמעו בטלפון הוא רק נקודת פתיחה. העלות משתנה בעיקר לפי רמת הכשרות (רבנות, מהדרין או בד&quot;ץ — וההבדל מורגש גם בחומרי הגלם), לפי התפריט (בשר, עוף, דגים), לפי הכלים וההכשרה שהמטבח דורש, ולפי מספר הארוחות וגודל הקבוצה. שירות מלא עם מלצרות וניקוי מטבח מתומחר בנפרד — חשוב לסגור מראש מה כלול.</p>
          <p>ולמה כדאי לחשב את זה ביחס לאלטרנטיבה: קייטרינג חיצוני שמגיע עם משלוח פחות גמיש בכשרות ולא כולל התאמה אישית — השוו הצעות על אותו תפריט בדיוק.</p>

          <h2>מה חייבים לבדוק לפני שסוגרים?</h2>
          <p><strong>1. תעודת הכשרות</strong> — לא מספיק לשמוע &quot;אני כשר&quot;. בקשו לראות את האישור בפועל — של מי, מה הגוף הנותן ומה הרמה.<br/>
          <strong>2. ניסיון עם אירועים קבוצתיים</strong> — שף מסעדה לא תמיד מתאים לשבת חתן של 60 איש. שאלו על אירועים דומים שעשה.<br/>
          <strong>3. התאמה למטבח</strong> — שלחו לשף תמונות ומפרט מהמטבח לפני. מטבח ביתי ומטבח אירועים הם עולמות שונים.<br/>
          <strong>4. מה כלול ומה לא</strong> — האם חומרי גלם כלולים במחיר? כלים ומצעים? ניקיון לאחר? הגדירו הכל בכתב.<br/>
          <strong>5. ביטוח</strong> — שף שמגיע לאירוע פרטי צריך ביטוח אחריות. שאלו.</p>

          <h2>שף פרטי לשבת חתן — שיקולים נוספים</h2>
          <p>בשבת חתן יש שיקול נוסף שאנשים לא חושבים עליו: השף לא יכול לצאת לקנות אם חסר משהו. הכנה מוקדמת ורשימה מלאה הן חובה. וכמובן — שבת מתחילה ומסתיימת בשעות קבועות שמשפיעות על לוח הזמנים של הבישול.</p>
          <p>שפים שמנוסים בשבתות חתן יודעים את כל זה. שפים שרגילים רק לאירועי חול עשויים להיתקל בהפתעות.</p>

          <h2>מה אני ממליצה?</h2>
          <p>שף פרטי הוא פתרון מצוין — כשבוחרים נכון. אם אתם לא יודעים מאיפה להתחיל, זה בדיוק הסוג של שאלה שאני יכולה לעזור איתה: לפי האזור, רמת הכשרות הדרושה וגודל הקבוצה, יש שמות שאני מכירה ויכולה להמליץ עליהם בביטחון.</p>

          <p>ואם אתם בשלבי התכנון של שבת חתן — <a href="https://free-guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המדריך החינמי שלי</a> (30 שלבים מעשיים, מהחזון ועד הפרידה) ו<a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המהדורה המלאה</a> (מערכת תכנון חיה עם כמויות, לוח זמנים ותקציב) יסדרו לכם את כל התמונה.</p>

          <p>קראו גם: <Link href="/blog/shabbat-hatan-cost-guide">כמה עולה שבת חתן</Link> · <Link href="/blog/my-questionnaire-process">איך עובד השאלון שלי</Link> · <Link href="/shabbat-hatan">עמוד שבת חתן</Link></p>
        </div>

        <div className={styles.cta}>
          <h2>צריכים עזרה בבחירת שף?</h2>
          <p>ספרו לי על האירוע — ואמליץ על שפים שמתאימים לקהל ולכשרות שלכם</p>
          <div className={styles.ctaButtons}>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ עם ערדית</a>
            <Link href="/blog/shabbat-hatan-cost-guide" className={styles.ctaButton}>עלויות שבת חתן</Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
