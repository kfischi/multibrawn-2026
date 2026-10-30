import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: "שבע ברכות בלי להתיש אף אחד — המדריך שחסר לכל משפחה | MULTIBRAWN",
  description: "איך מארגנים שבע ברכות נכון: למה לא כל ערב צריך להיות מיני-חתונה, הפורמטים מהקל לכבד, שבת שבע ברכות כפרויקט — וחמשת הדברים ששוכחים תמיד.",
  keywords: ["שבע ברכות", "ארגון שבע ברכות", "שבת שבע ברכות", "מקום לשבע ברכות", "סעודת שבע ברכות", "רעיונות לשבע ברכות"],
  alternates: { canonical: 'https://multibrawn.co.il/blog/sheva-brachot-guide' },
  openGraph: {
    title: "שבע ברכות בלי להתיש אף אחד — המדריך שחסר לכל משפחה | MULTIBRAWN",
    description: "למה לא כל ערב צריך להיות מיני-חתונה, הפורמטים מהקל לכבד, שבת שבע ברכות — וחמשת הדברים ששוכחים תמיד.",
    url: 'https://multibrawn.co.il/blog/sheva-brachot-guide',
    siteName: 'MULTIBRAWN',
    locale: 'he_IL',
    type: 'article',
    images: [{ url: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png', width: 1200, height: 630, alt: "שבע ברכות בלי להתיש אף אחד — המדריך שחסר לכל משפחה | MULTIBRAWN" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "שבע ברכות בלי להתיש אף אחד — המדריך שחסר לכל משפחה | MULTIBRAWN",
    description: "למה לא כל ערב צריך להיות מיני-חתונה, הפורמטים מהקל לכבד, ושבת שבע ברכות כפרויקט.",
    images: ['https://res.cloudinary.com/dptyfvwyo/image/upload/v1763828299/%D7%A9%D7%91%D7%AA_%D7%97%D7%AA%D7%9F_zo14ig.png'],
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
          <span>שבע ברכות</span>
        </nav>

        <header className={styles.header}>
          <div className={styles.category}>שבע ברכות</div>
          <h1 className={styles.title}>שבע ברכות בלי להתיש אף אחד — המדריך שחסר לכל משפחה</h1>
          <div className={styles.meta}>
            <span>30 באוקטובר 2026</span>
            <span>⏱️ 5 דקות</span>
          </div>
        </header>

        <div className={styles.content}>
          <p>שבוע אחרי החתונה כולם כבר עייפים — והשבע ברכות מגיעות דווקא אז. אחרי ליווי של עשרות משפחות אני יכולה להגיד את זה ברור: הטעות הגדולה היא לתכנן כל ערב כמו מיני-חתונה. הסוד הוא הפוך — להוריד הילוך, ולמנות אחראי אחד לכל ערב.</p>

          <h2>רגע, למי שפחות מכיר</h2>
          <p>שבעת ימי המשתה: בכל ערב סעודה עם מניין ו&quot;פנים חדשות&quot; — אורח שעוד לא השתתף בשמחה. נשמע פשוט, אבל שבעה ערבים ברצף זה מבצע לוגיסטי לשתי משפחות שרק סיימו לארגן חתונה.</p>

          <h2>שתי נקודות המבט שמתנגשות</h2>
          <p>המשפחה המארחת רוצה להרשים — שהערב שלה לא ייפול מהערב של הצד השני. והחתן והכלה? רוצים בעיקר לנוח ולהתרגל אחד לשני. כשמבינים את שני הצדדים, מתכננים אחרת: לא כל ערב צריך להיות גדול. ערב אחד גדול והשאר אינטימיים — זה המתכון שעובד, וגם זה שמשאיר כוחות לזוג.</p>

          <h2>הפורמטים, מהקל לכבד</h2>
          <p>• ארוחה בבית או בגינה — הכי פשוט, הכי חם.<br/>
          • מסעדה כשרה עם חדר פרטי — לבדוק רמת כשרות לפי הקהל: רבנות, מהדרין או בד&quot;ץ.<br/>
          • וילה או צימר לערב אחד — מרחב אמיתי, בלי לנקות את הבית אחרי.<br/>
          • <strong>שבת שבע ברכות</strong> — הגדולה מכולן, ועליה בהרחבה עכשיו.</p>

          <h2>שבת שבע ברכות היא בעצם שבת חתן שנייה</h2>
          <p>לינה לשתי המשפחות, שלוש סעודות, מניין, פנים חדשות — כל מה שכתבתי במאמרי שבת החתן תקף כאן במלואו: מיטות בפועל ולא &quot;מקומות לינה&quot;, חדר אוכל באותו מתחם בלי הליכה ארוכה בשבת, וחשמל במחיר סגור מראש. וגם כאן — רוב המלונות פחות בנויים לקבוצה כזאת (הם מעדיפים 15 עד 25 חדרים, ולרוב יש אולם אחד או שניים), והמתחמים הפרטיים נותנים חופש אמיתי: לשיר, להאריך בסעודה, להיות משפחה.</p>

          <h2>חמשת הדברים ששוכחים תמיד</h2>
          <p>1. <strong>מי דואג לפנים חדשות בכל ערב</strong> — לסגור מראש, לא לגלות בערב עצמו.<br/>
          2. <strong>מי מכובד בברכות</strong> — מחליטים לפני, לא מול השולחן.<br/>
          3. <strong>הגברה קטנה</strong> לדברי תורה — בחדר עם ארבעים איש, בלעדיה לא שומעים.<br/>
          4. <strong>הסעות לאורחים מבוגרים</strong> — במיוחד כשהערב רחוק מהבית.<br/>
          5. <strong>תיאום בין הערבים</strong> — שלא ייצאו שלושה ערבי בשרים זהים ברצף.</p>

          <h2>מתכננים שבת שבע ברכות?</h2>
          <p>זה בדיוק התחום שלי. אני מתחילה כל התאמה בשאלון קצר — כמה אורחים, איזה קהל, איזו כשרות, תאריך ותקציב — כי בלי התשובות האלה אי אפשר להתאים מקום באמת, רק לנחש. ואם אתם בשלב התכנון, <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המדריך החינמי לשבת חתן</a> רלוונטי גם לשבת שבע ברכות, ולצידו <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer">המהדורה המלאה בתשלום</a> עם הרשימות וכלי החישוב.</p>
          <p>מוזמנים לקרוא עוד על <Link href="/blog/shabbat-hatan-cost-guide">כמה עולה שבת חתן</Link>, על <Link href="/blog/shabbat-hatan-north">שבת חתן בצפון</Link> או על <Link href="/shabbat-hatan">שבת חתן עם MULTIBRAWN</Link>.</p>
        </div>

        <div className={styles.cta}>
          <h2>מארגנים שבע ברכות?</h2>
          <p>נמצא לכם מקום שמתאים בדיוק לערב שלכם</p>
          <div className={styles.ctaButtons}>
            <a href="https://guide.multibrawn.co.il" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>למדריך המלא</a>
            <a href="https://wa.me/972523983394" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ עם ערדית</a>
          </div>
        </div>
      </div>
    </article>
  );
}
