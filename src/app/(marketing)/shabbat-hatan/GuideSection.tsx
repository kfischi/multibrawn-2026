'use client';

import { useState, useEffect } from 'react';
import styles from './ShabbatHatan.module.css';

const STORAGE_KEY = 'multibrawn_guide_v1';

interface Step {
  num: number;
  title: string;
  desc: string;
}

interface Category {
  label: string;
  steps: Step[];
}

const CATEGORIES: Category[] = [
  {
    label: 'תכנון ואסטרטגיה',
    steps: [
      { num: 1, title: 'חזון האירוח', desc: 'לפני הכל – מגדירים את התחושה הרצויה. חגיגי? אינטימי? מסורתי? כתבו בשתי משפטים איך אתם רוצים שהאורחים יצאו מהאירוע שלכם.' },
      { num: 2, title: 'נוסחת צמצום החדרים', desc: 'איך לחשב נכון את מספר החדרים, חלוקת המשפחות וסדרי העדיפויות – כדי שלא יישאר אף אחד בחוץ ולא תשלמו על אוויר.' },
      { num: 3, title: 'הנדסת אנוש וזרימה', desc: 'מיפוי תנועת האורחים בחלל – איפה ייווצרו עומסים, איפה צריך שלטים, ומה גורם לאנשים לדרוס זה את זה ליד הבופה.' },
    ],
  },
  {
    label: 'תפעול ולוגיסטיקה',
    steps: [
      { num: 4, title: 'תפעול ותשתיות – בדיקת עומס פלטות', desc: 'בדיקה מוקדמת של תנורים, פלטות חימום ונקודות חשמל. תקלת חשמל בשישי בערב היא לא אופציה – נמנעים ממנה מראש.' },
      { num: 5, title: 'קולינריה חסינת פלטה', desc: 'בחירת תפריט שמתאים לכבוד השבת ולמגוון הדיאטות – טבעוני, ללא גלוטן, חלק. ואיך לשרת כמות גדולה בלי לאבד איכות.' },
      { num: 6, title: 'מיתוג חושי', desc: 'ריח, מוזיקה, עיצוב – שלושה חושים שיוצרים זיכרון. איך לבחור נרות ריחניים, פלייליסט מתאים וצבעי שולחן שמספרים סיפור אחד.' },
      { num: 7, title: 'הנדסת שולחן', desc: 'סידור מקומות ישיבה שמקדם שיחות חיות. מי ליד מי, כמה מקום לכל אחד, ואיך לשבור קרח בין משפחות שפוגשות אחת את השנייה לראשונה.' },
      { num: 8, title: 'עמדת קפה 24/6', desc: 'הסוד הקטן שהכי אוהבים: עמדת קפה נגישה מהבוקר עד הלילה. קפסולות, חלב, עוגיות – עמדה פשוטה שיוצרת תחושת בית וטוב.' },
    ],
  },
  {
    label: 'חלל ובטיחות',
    steps: [
      { num: 9,  title: 'בדיקת מסלול הליכה', desc: 'לכו פיזית את כל הנתיבים שהאורחים ייקחו – מחניה לכניסה, מחדרים לאולם. מה מפריע? מה לא ברור? תקנו עכשיו.' },
      { num: 10, title: 'מרחב נשימה', desc: 'פינות ישיבה שקטות שמאפשרות לאורחים מנוחה מהעומס. שדה, מרפסת, ספה מרוחקת – כל מי שצריך "לברוח" לדקה ימצא מקום.' },
      { num: 11, title: 'בטיחות ילדים', desc: 'גדרות בריכות, תאורת מסלולים, מי אחראי על כל ילד. ילדים בטוחים = הורים רגועים = אירוע מוצלח.' },
    ],
  },
  {
    label: 'אווירה ומשפחה',
    steps: [
      { num: 12, title: 'תאורת "מצב שבת"', desc: 'תאורה חמה, נרות ודימרים שיוצרים את התחושה הקסומה של שבת. קבעו את הניואנס הנכון מבעוד מועד.' },
      { num: 13, title: 'אקוסטיקה', desc: 'שטיחים, וילונות ופינות שיחה מפחיתים רעש ויוצרים אינטימיות גם בקבוצה גדולה.' },
      { num: 14, title: 'ניהול זמני ספקים', desc: 'גיליון אחד עם שמות ספקים, שעות הגעה ומספרי טלפון. כל ספק יודע לאן להגיע ומי הקשר שלו.' },
      { num: 15, title: 'גיבוי קירור וקרח', desc: 'מה קורה אם מקרר הבופה מתקלקל בשישי בצהריים? תמיד יש גיבוי – פתרון B מוכן מראש.' },
    ],
  },
  {
    label: 'חוויה ובידור',
    steps: [
      { num: 16, title: 'מזכרות עם ערך', desc: 'לא עוד מגנט שיילך לאשפה – ריבה ביתית, נרות, ספר קטן עם מסר. משהו שהאורחים ישמרו ויזכרו.' },
      { num: 17, title: 'פינת תוכן לילדים', desc: 'ילדים שמשחקים = הורים שנהנים. פינת יצירה, קלפים, משחקי קופסה – שעה של הנאה לילדים היא שעה של שלווה למבוגרים.' },
      { num: 18, title: 'סטנדרט ניקיון', desc: 'מי אחראי על ניקוי שולחנות בין הארוחות? רשימת משימות שמחזיקה את המקום במצב מכובד לאורך כל השבת.' },
      { num: 19, title: 'צילום טרום-שבת', desc: 'צלמו את הסביבה לפני שמגיעים האורחים. שולחנות ערוכים, עיצוב שלם, אור טבעי. הצילומים האלה הם נכס שיווקי לשנים הבאות.' },
    ],
  },
  {
    label: 'ניהול עסקי וקשרים',
    steps: [
      { num: 20, title: 'תקציב חכם', desc: 'הפרדה ברורה בין "חייבים", "רוצים" ו"אם נשאר". חוויה מקסימלית בלי לצאת עם חובות.' },
      { num: 21, title: 'ניהול משברים', desc: 'לכל תרחיש – תוכנית B. מה עושים כשספק מבטל? כשיורד גשם? שלווה מקצועית מתחילה בהכנה, לא בניסים.' },
      { num: 22, title: 'יחס אישי', desc: 'כרטיסי ברכה עם שם האורח, פינוק קטן על הכרית, משפט אחד אישי. פרטים קטנים שאורחים מספרים עליהם שבועות אחרי.' },
      { num: 23, title: 'שימור קשר במוצ"ש', desc: 'הודעת תודה אישית, גלריית תמונות בוואטסאפ, שאלון שביעות רצון קצר. אורחים שמרגישים חשובים הופכים לשגרירים.' },
      { num: 24, title: 'מפתחות ומגבות', desc: 'נוהל ברור לצ\'ק-אין וצ\'ק-אאוט. מי מקבל מפתח? מי אחראי על מגבות? לוגיסטיקה שחוסכת עצבים לכולם.' },
      { num: 25, title: 'הפעלת משחקי החיבור', desc: 'פעילות שמחברת בין שתי המשפחות. שאלות, סיפורים, כרטיסי "הכירי אותי". אירוע שבו אנשים חדשים הפכו לחברים הוא אירוע שהצליח.' },
    ],
  },
];

const TOTAL = 25;

export function GuideSection() {
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [open, setOpen] = useState<Record<number, boolean>>({});

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      setCompleted(saved);
    } catch {}
  }, []);

  const toggle = (num: number) => {
    setCompleted(prev => {
      const next = { ...prev, [num]: !prev[num] };
      if (!next[num]) delete next[num];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  const toggleOpen = (num: number) => {
    setOpen(prev => ({ ...prev, [num]: !prev[num] }));
  };

  const doneCount = Object.keys(completed).length;
  const pct = Math.round((doneCount / TOTAL) * 100);

  return (
    <section className={styles.guideSection}>
      <div className={styles.container}>

        {/* Header */}
        <div className={styles.guideHeader}>
          <span className={styles.guideBadge}>✦ מדריך מקצועי</span>
          <h2 className={styles.sectionTitle}>
            25 שלבים לשבת חתן מושלמת
          </h2>
          <p className={styles.guideLead}>
            הצ'קליסט המקצועי של ערדית – כל מה שצריך לסמן לפני שבת החתן. לחצו על כל שלב לפרטים.
          </p>
        </div>

        {/* Progress bar */}
        {doneCount > 0 && (
          <div className={styles.guideProgress}>
            <div className={styles.guideProgressBar}>
              <div className={styles.guideProgressFill} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.guideProgressLabel}>{doneCount} / {TOTAL} שלבים הושלמו ({pct}%)</span>
            {doneCount === TOTAL && (
              <div className={styles.guideAllDone}>🎉 כל הכבוד! סיימתם את כל 25 השלבים. שבת חתן מושלמת מחכה לכם!</div>
            )}
          </div>
        )}

        {/* Categories + Steps */}
        {CATEGORIES.map((cat) => (
          <div key={cat.label} className={styles.guideCat}>
            <div className={styles.guideCatHeader}>
              <div className={styles.guideCatLine} />
              <span className={styles.guideCatLabel}>✦ {cat.label} ✦</span>
              <div className={styles.guideCatLine} />
            </div>

            {cat.steps.map((step) => {
              const done = !!completed[step.num];
              const isOpen = !!open[step.num];
              return (
                <div
                  key={step.num}
                  className={`${styles.guideStep} ${done ? styles.guideStepDone : ''}`}
                >
                  <div className={styles.guideStepRow} onClick={() => toggleOpen(step.num)}>
                    {/* Checkbox */}
                    <button
                      className={`${styles.guideCheck} ${done ? styles.guideCheckDone : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggle(step.num); }}
                      aria-label={done ? 'בטל השלמה' : 'סמן כהושלם'}
                    >
                      {done && (
                        <svg width="12" height="10" viewBox="0 0 14 11" fill="none">
                          <path d="M1.5 5.5L5.5 9.5L12.5 1.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                    <span className={styles.guideStepNum}>{step.num}</span>
                    <span className={styles.guideStepTitle}>{step.title}</span>
                    <span className={`${styles.guideToggleIcon} ${isOpen ? styles.guideToggleOpen : ''}`}>▼</span>
                  </div>
                  {isOpen && (
                    <div className={styles.guideStepDesc}>
                      <p>{step.desc}</p>
                      {step.num === 25 && (
                        <a
                          href="https://guide.multibrawn.co.il/games.html"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.guideGamesBtn}
                        >
                          🎲 למשחקי החיבור
                        </a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}

        {/* Bottom CTA */}
        <div className={styles.guideCta}>
          <p className={styles.guideCtaText}>רוצים שנעשה את הכל בשבילכם?</p>
          <a
            href="/contact"
            className={styles.btnPrimary}
          >
            דברו עם ערדית עכשיו 🎯
          </a>
        </div>
      </div>
    </section>
  );
}
