import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';
import ArticleJsonLd from '@/components/ArticleJsonLd';

export const metadata: Metadata = {
  title: "איך עובד השאלון שלי — ערדית בראון",
  description: "לפני כל המלצה — שאלון. למה? כי מקום מושלם לאחד הוא אסון לאחר. חמש השאלות שחייבים לענות עליהן לפני שסוגרים מתחם.",
  keywords: ["שאלון התאמה", "ערדית בראון", "MULTIBRAWN", "איך עובד השאלון", "התאמת מקום", "שבת חתן", "השאלון של ערדית"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/my-questionnaire-process' },
  openGraph: {
    title: "איך עובד השאלון שלי — ערדית בראון",
    description: "חמש השאלות שחייבים לענות עליהן לפני שסוגרים מתחם — ולמה בלי שאלון אני לא ממליצה.",
    url: 'https://multibrawn.co.il/blog/my-questionnaire-process',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg', width: 1200, height: 630, alt: "איך עובד השאלון — ערדית בראון MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "איך עובד השאלון שלי — ערדית בראון",
    description: "חמש השאלות שחייבים לענות עליהן לפני שסוגרים מתחם.",
    images: ['https://res.cloudinary.com/decirk3zb/image/upload/v1766783584/Logo_1_sneunp.jpg'],
  },
};

export default function Article() {
  return (
    <>
    <ArticleJsonLd
      url="https://multibrawn.co.il/blog/my-questionnaire-process"
      title="איך עובד השאלון שלי — ערדית בראון | MULTIBRAWN"
      description="לפני כל המלצה — שאלון. חמש השאלות שחייבים לענות עליהן לפני שסוגרים מתחם."
      datePublished="2026-11-03"
      keywords={["שאלון התאמה", "ערדית בראון", "MULTIBRAWN", "התאמת מקום לאירוע"]}
    />
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link>
          <span>/</span>
          <Link href="/blog">בלוג</Link>
          <span>/</span>
          <span>איך עובד השאלון שלי</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>הסיפור שלנו</div>
          <h1 className={styles.title}>איך עובד השאלון שלי</h1>
          <div className={styles.meta}>
            <span>3 בנובמבר 2026</span>
            <span>⏱️ 4 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>כל פעם שמישהו פונה אליי ואומר &quot;אני מחפש מקום לשבת חתן&quot; — התשובה הראשונה שלי היא תמיד אותה תשובה: &quot;בואו נמלא שאלון קצר.&quot;</p>

          <p>לא כי אני אוהבת טפסים. אלא כי בלי חמש השאלות האלה, כל המלצה שלי שווה אפס. מקום שהוא חלום בשביל משפחה אחת יכול להיות אסון בשביל המשפחה שאחריה — ואני לא מוכנה להמליץ בעיוורון.</p>

          <h2>שאלה 1: כמה אורחים?</h2>
          <p>לא &quot;בערך&quot;, לא &quot;תלוי&quot;. מספר אמיתי. וילה שמחזיקה 30 איש תהיה צפופה מאוד ל-40, ומושלמת ל-20. המספר הזה מגדיר את כל שאר ההתאמה — גודל חדרי אוכל, מספר חדרי שינה, גודל בית הכנסת אם יש.</p>

          <h2>שאלה 2: מה הקהל?</h2>
          <p>חרדי, דתי, מסורתי, מעורב. זו לא שאלה של שיפוט — זו שאלה של התאמה. מתחם שמותאם לקהל מסורתי לא בהכרח מתאים לשבת חתן חרדי. יש שאלות של צניעות, של הפרדה, של שעות שבת. ובית הכנסת — גודל, ספרי תורה, מנהג.</p>

          <h2>שאלה 3: איזו כשרות?</h2>
          <p>רבנות, מהדרין, בד&quot;ץ. לא כל מתחם עם כשרות יכול להתאים לכל קהל. יש משפחות שדורשות בד&quot;ץ ספציפי. יש כאלה שמביאות שף עצמאי — ואז צריך לוודא שהמטבח מאובזר ומוכשר לכך.</p>

          <h2>שאלה 4: מהם התאריכים?</h2>
          <p>תאריכים מדויקים, כולל ימי ה&quot;שבע ברכות&quot; אם רלוונטי. מתחמים פופולריים נסגרים חודשים מראש. ובחורף — יש שיקולי כניסת שבת מוקדמת שחייבים לקחת בחשבון. מתחם במרחק 20 דקות מהעיר בקיץ הוא מתחם שמגיעים אליו בחשיכה בינואר.</p>

          <h2>שאלה 5: מהו התקציב?</h2>
          <p>שאלה שאנשים מתביישים לענות עליה, אבל היא הכי חשובה. לא כדי לנצל — כדי לא לבזבז את הזמן שלכם. העלות משתנה מאוד לפי הכשרות, התפריט, העונה ומספר האורחים — והתקציב שתגדירו קובע לאיזה כיוון בכלל הולכים. ואני יודעת מה שווה כל שקל.</p>

          <h2>ואחרי השאלות — מה קורה?</h2>
          <p>אני מתאימה. לא שולחת רשימה. לא מצרפת קישורים. מחפשת את המתחם הספציפי שעונה על הצרכים שלכם — ומציגה אותו עם כל מה שאני יודעת עליו מהשטח: מה שלא כתוב באתר, מה שבעל המקום לא יגיד בטלפון, ומה שמשפחות שהיו שם אמרו לי אחר כך.</p>

          <p>ההתאמה הזו היא מה שעושה את ההבדל בין &quot;הזמנו מקום&quot; לבין &quot;הייתה שבת חתן מושלמת&quot;.</p>

          <h2>ולצד השאלון — שני המדריכים שלי</h2>
          <p>את כל השיטה כתבתי גם כמדריך: <a href="https://free-guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המדריך החינמי לשבת חתן</a> — 30 שלבים מעשיים מהחזון ועד הפרידה, ו<a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המהדורה המלאה</a> — מערכת תכנון חיה עם כמויות, לוח זמנים ותקציב. השאלון וההתאמה — אצלי; התכנון השוטף — אצלכם, עם המדריכים.</p>

          <p>רוצים להתחיל? <Link href="/shabbat-hatan">עמוד שבת חתן</Link> · <Link href="/blog/shabbat-hatan-cost-guide">כמה עולה שבת חתן</Link> · <Link href="/blog/shabbat-hatan-north">שבת חתן בצפון</Link></p>
        </div>

        <div className={styles.cta}>
          <h2>מוכנים למלא שאלון?</h2>
          <p>ספרו לי על האירוע שלכם — ואתאים את המקום הנכון</p>
          <div className={styles.ctaButtons}>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ עם ערדית</a>
            <Link href="/shabbat-hatan" className={styles.ctaButton}>עמוד שבת חתן</Link>
          </div>
        </div>
      </div>
    </article>
    </>
  );
}
