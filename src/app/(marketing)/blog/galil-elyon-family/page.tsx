import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../Article.module.css';

export const metadata: Metadata = {
  title: 'חופשה משפחתית בגליל העליון — איפה כדאי? | MULTIBRAWN',
  description: 'ראש פינה, קצרין, כנרת ועמק החולה — המדריך המלא לחופשה משפחתית בצפון ישראל.',
  keywords: ['גליל עליון', 'חופשה משפחתית', 'צפון ישראל', 'ראש פינה', 'כנרת', 'צימר גליל', 'וילה גליל'],
  alternates: { canonical: 'https://multibrawn.co.il/blog/galil-elyon-family' },
  openGraph: {
    title: 'חופשה משפחתית בגליל העליון | MULTIBRAWN',
    description: 'המדריך המלא לנופש משפחתי בצפון ישראל.',
    url: 'https://multibrawn.co.il/blog/galil-elyon-family',
    type: 'article',
    images: [{ url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&h=630&fit=crop', width: 1200, height: 630 }],
  },
};

export default function Article() {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <nav className={styles.breadcrumb}>
          <Link href="/">בית</Link><span>/</span>
          <Link href="/blog">בלוג</Link><span>/</span>
          <span>גליל עליון</span>
        </nav>
        <header className={styles.header}>
          <div className={styles.category}>מדריכים</div>
          <h1 className={styles.title}>🏔️ חופשה משפחתית בגליל העליון — איפה כדאי?</h1>
          <div className={styles.meta}><span>28 בדצמבר 2024</span><span>⏱️ 7 דקות</span></div>
        </header>
        <div className={styles.content}>
          <p>הגליל העליון הוא אחת מהפנינות של ישראל — נוף מרהיב, אוויר צח, מסלולי הליכה מדהימים ואוכל מקומי אמיתי. אבל לא כל אזור מתאים לכל משפחה. הנה המדריך שלנו.</p>

          <h2>🌿 ראש פינה ואזור הגולן</h2>
          <p>ראש פינה היא אחת העיירות הציוריות בישראל. מסעדות מצוינות, גלריות אמנות, ואווירה רגועה. מתאימה לזוגות ולמשפחות שאוהבות שקט. הגולן — מתאים יותר לאוהבי טבע ומסלולי הליכה.</p>

          <h2>💧 הכנרת — המגנט של הצפון</h2>
          <p>חופי הכנרת הם אחד הדברים הכי ישראליים שיש. מתאים במיוחד לחופשות קיץ עם ילדים. יש לנו צימרים ווילות עם גישה ישירה לחוף — חוויה שלא תשכחו.</p>

          <h2>🌾 עמק החולה</h2>
          <p>פחות מוכר, אבל מדהים. שמורת עופות, שבילי אופניים, ושקט מוחלט. מתאים לאוהבי טבע שרוצים להתרחק מהמולה. המחירים נמוכים יותר מאזורים אחרים.</p>

          <h2>📋 רשימת הכלי ל-Check בהזמנת וילה בצפון</h2>
          <ul>
            <li>האם יש בריכה מחוממת? (חשוב מאי-ספטמבר)</li>
            <li>האם יש מרחק בטוח מכביש ראשי? (לנוחות הילדים)</li>
            <li>האם יש Wi-Fi מהיר?</li>
            <li>האם יש מנגל ושולחן אוכל חיצוני?</li>
            <li>מה מדיניות הכלבים? (לכאלה שנוסעים עם בע"ח)</li>
            <li>האם יש חדרי שינה מספיקים?</li>
          </ul>

          <h2>📅 מתי לנסוע לגליל?</h2>
          <p><strong>אביב (מרס-מאי)</strong>: פריחה, ירוק, מזג אוויר מושלם. העונה הטובה ביותר.<br/>
          <strong>קיץ (יוני-ספטמבר)</strong>: חם אבל נסבל. הכנרת בשיא. מלא תיירים — הזמינו מוקדם!<br/>
          <strong>חורף (נובמבר-פברואר)</strong>: קר, גשום לעיתים, אבל גם רומנטי. מחירים נמוכים. קמין חובה.</p>
        </div>
        <div className={styles.cta}>
          <h2>רוצים וילה בגליל?</h2>
          <p>יש לנו וילות מדהימות בגליל העליון — עם בריכה, נוף ופרטיות מלאה</p>
          <div className={styles.ctaButtons}>
            <Link href="/zimmerim-galil-elyon" className={styles.ctaButton}>וילות בגליל</Link>
            <a href="https://wa.me/972523983394?text=שלום! אני מחפש וילה/צימר בגליל העליון" target="_blank" rel="noopener noreferrer" className={styles.ctaButtonWhatsapp}>וואטסאפ</a>
          </div>
        </div>
      </div>
    </article>
  );
}
