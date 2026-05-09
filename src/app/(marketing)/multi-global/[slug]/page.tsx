import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const destinations: Record<string, {
  name: string; flag: string; headline: string; subHeadline: string;
  heroImage: string; description: string[];
  highlights: string[]; bestFor: string[]; priceRange: string;
  waText: string;
}> = {
  greece: {
    name: 'יוון',
    flag: '🇬🇷',
    headline: 'וילות יוקרה ביוון',
    subHeadline: 'סנטוריני, מיקונוס, כרתים ורודוס — הים הכחול הכי יפה בעולם',
    heroImage: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1400&h=600&fit=crop',
    description: [
      'יוון היא יעד חלומי המשלב ים כחול מדהים, ארכיטקטורה לבנה עוצרת נשימה ואוכל ים-תיכוני מעולה.',
      'אנחנו מציעים וילות פרטיות עם בריכות Infinity מול הים האגאי, כולל שירות קונסיירז בעברית.',
      'מסנטוריני הרומנטית, דרך מיקונוס הקוסמופוליטית ועד כרתים הגדולה — יש לנו את הנכס המושלם עבורכם.',
    ],
    highlights: [
      'וילות עם נוף לוולקנו של סנטוריני',
      'בריכות Infinity מול שקיעת השמש',
      'שירות ליווי בעברית מישראל',
      'קרבה לאתרי מורשת UNESCO',
      'מסעדות מישלן ב-5 דקות',
    ],
    bestFor: ['זוגות', 'חופשת כבוד', 'הצעת נישואין', 'חופשת מותרות'],
    priceRange: '₪3,500–₪18,000 ללילה',
    waText: 'שלום! אני מעוניין בוילה ביוון דרך Multi-Global',
  },
  italy: {
    name: 'איטליה',
    flag: '🇮🇹',
    headline: 'וילות יוקרה באיטליה',
    subHeadline: 'טוסקנה, חוף אמאלפי ולייק קומו — La Dolce Vita בגרסת הפרמיום',
    heroImage: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1400&h=600&fit=crop',
    description: [
      'איטליה מציעה חוויית נופש ייחודית — גבעות טוסקנה ירוקות, כרמי ענבים, אדריכלות רנסאנס ואוכל שלא ישכח.',
      'הוילות שלנו בטוסקנה, בחוף אמאלפי המפורסם ובלייק קומו הקסום כוללות שירותי שף פרטי ורכבים עם נהג.',
      'כל נכס עבר בדיקת איכות מחמירה ומוגש עם חבילת ״La Dolce Vita״ — כולל טעימות יין, סיורים פרטיים וספא.',
    ],
    highlights: [
      'וילות רנסאנס מקוריות מהמאה ה-16',
      'כרמי ענבים פרטיים בטוסקנה',
      'נוף לחוף אמאלפי מהמרפסת',
      'שף פרטי ותוכנית אוכל יומית',
      'ספא ו-wellness suite',
    ],
    bestFor: ['גסטרו-טורים', 'חתונות בחו"ל', 'חופשת מותרות', 'משפחות מורחבות'],
    priceRange: '₪4,000–₪22,000 ללילה',
    waText: 'שלום! אני מעוניין בוילה באיטליה דרך Multi-Global',
  },
  spain: {
    name: 'ספרד',
    flag: '🇪🇸',
    headline: 'וילות יוקרה בספרד',
    subHeadline: 'מאיורקה, איביזה וקוסטה ברבה — שמש, ים וחיי לילה',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1400&h=600&fit=crop',
    description: [
      'ספרד היא מגוון בתוך מגוון — האיים הבלאריים מציעים ים קריסטל, מאיורקה עם מצוקים דרמטיים ואיביזה עם אנרגיה ייחודית.',
      'פינקות (Finca) ספרדיות מסורתיות עם עיצוב מודרני, בריכות ים, גנים מטופחים ונוף לים התיכון.',
      'כל הנכסים שלנו בספרד כוללים שירות קנסיירז, רכב, ותוכניות פעילויות מותאמות אישית.',
    ],
    highlights: [
      'פינקות עם בריכות Infinity לים',
      'מאיורקה — מצוקים ופיורדים עוצרי נשימה',
      'ספרד הצפונית — וויינרי סיורים בסן סבסטיאן',
      'קרבה לחופים הפרטיים הכי יפים',
      'שירות Concierge 24/7 בעברית',
    ],
    bestFor: ['קבוצות חברים', 'מסיבות רווקות/רווקים', 'חופשות קיץ', 'חובבי יין ואוכל'],
    priceRange: '₪2,800–₪15,000 ללילה',
    waText: 'שלום! אני מעוניין בנכס בספרד דרך Multi-Global',
  },
  dubai: {
    name: 'דובאי',
    flag: '🇦🇪',
    headline: 'וילות VIP בדובאי',
    subHeadline: 'מגורים על האי הדקל, מרינה ודאון טאון — הרמה הגבוהה ביותר',
    heroImage: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&h=600&fit=crop',
    description: [
      'דובאי היא עיר מהעתיד — ניאוביליה מודרנית, קניות יוקרה, ספאים עולמיים ואוכל מכל העולם.',
      'הוילות שלנו ב-Palm Jumeirah ובאזורי היוקרה של דובאי כוללות בריכות פרטיות, חוף פרטי ושירות בטלר 24/7.',
      'מותאם במיוחד לישראלים — שירות בעברית, ידע מלא על כשרות וקרבה למסעדות ישראליות.',
    ],
    highlights: [
      'וילות על Palm Jumeirah עם חוף פרטי',
      'שירות Butlerand Chauffeur 24/7',
      'בריכות מחוממות מול ה-Skyline',
      'קרבה ל-Mall of the Emirates',
      'היכרות עם כשרות ומסעדות ישראליות',
    ],
    bestFor: ['נסיעות עסקים', 'חופשת מותרות', 'שנת ה-50/60', 'מי שרוצה ״וואו״'],
    priceRange: '₪5,000–₪30,000 ללילה',
    waText: 'שלום! אני מעוניין בוילה VIP בדובאי דרך Multi-Global',
  },
  thailand: {
    name: 'תאילנד',
    flag: '🇹🇭',
    headline: 'וילות יוקרה בתאילנד',
    subHeadline: 'קו סמוי, פוקט וקו לאנטה — infinity pool באמצע הג\'ונגל הטרופי',
    heroImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=600&fit=crop',
    description: [
      'תאילנד מציעה את הפרדוקס המרתק ביותר — שלווה מוחלטת בלב טבע טרופי, לצד תרבות עשירה ואוכל מדהים.',
      'הוילות שלנו בקו סמוי ופוקט ממוקמות בין הג\'ונגל לים, עם בריכות Infinity, ג\'קוזי ופצ\'ורות פרטיים.',
      'כל נכס כולל שירות ספא תאילנדי מסורתי, שף פרטי ותוכנית טיולים יומית.',
    ],
    highlights: [
      'בריכות Infinity עם נוף לים אנדמן',
      'ספא תאילנדי מסורתי בוילה הפרטית',
      'שירות ״חף״ — ללא מפריעים ובלי שכנים',
      'קאוורינג וצלילה בחופים הפרטיים',
      'שף תאילנדי + קוקוס ומשקאות',
    ],
    bestFor: ['הנמלטים מהמולה', 'חובבי ספא', 'טיול ירח דבש', 'Digital Nomads'],
    priceRange: '₪1,800–₪12,000 ללילה',
    waText: 'שלום! אני מעוניין בוילה בתאילנד דרך Multi-Global',
  },
  portugal: {
    name: 'פורטוגל',
    flag: '🇵🇹',
    headline: 'קינטות יוקרה בפורטוגל',
    subHeadline: 'אלגרב, אלנטז\'ו וקאסקאיש — אירופה הכי חמה ולא יקרה',
    heroImage: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=1400&h=600&fit=crop',
    description: [
      'פורטוגל היא אחת ממדינות אירופה שצמחה הכי מהר בשנים האחרונות — וסיבה טובה יש לזה.',
      'קינטות (Quinta) פורטוגזיות הן נכסים חקלאיים מסורתיים שהפכו לוילות יוקרה מדהימות — אחוזות ענבים, זיתים ותפוזים.',
      'האלגרב מציע חופים מהיפים באירופה, בעוד שליסבון וקאסקאיש מציעים חוויה עירונית-כפרית ייחודית.',
    ],
    highlights: [
      'קינטות עם כרמי ענבים ובריכות',
      'אלגרב — חופים סלעיים מרהיבים',
      'ליסבון — שכונות פיאדו ופסטל',
      'טמפרטורות נעימות 11 חודשים בשנה',
      'חסכוני יותר מיוון ואיטליה בתמחור',
    ],
    bestFor: ['משפחות', 'גולפרים', 'חובבי יין', 'הנמלטים ממחירי אירופה'],
    priceRange: '₪2,200–₪11,000 ללילה',
    waText: 'שלום! אני מעוניין בקינטה בפורטוגל דרך Multi-Global',
  },
};

export async function generateStaticParams() {
  return Object.keys(destinations).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const dest = destinations[slug];
  if (!dest) return { title: 'Multi-Global' };
  return {
    title: `${dest.headline} | Multi-Global MULTIBRAWN`,
    description: dest.description[0],
    alternates: { canonical: `https://multibrawn.co.il/multi-global/${slug}` },
    openGraph: {
      title: `${dest.headline} | MULTIBRAWN`,
      description: dest.description[0],
      images: [{ url: dest.heroImage, width: 1400, height: 600 }],
    },
  };
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dest = destinations[slug];
  if (!dest) notFound();

  const waUrl = `https://wa.me/972523983394?text=${encodeURIComponent(dest.waText)}`;

  return (
    <>
      <style>{`
        .destPage { min-height: 100vh; direction: rtl; }
        .hero {
          position: relative; height: 500px;
          display: flex; align-items: flex-end;
        }
        .heroBg {
          position: absolute; inset: 0;
          background-image: url('${dest.heroImage}');
          background-size: cover; background-position: center;
        }
        .heroOverlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(10,6,24,0.95) 0%, rgba(10,6,24,0.3) 60%);
        }
        .heroContent {
          position: relative; padding: 3rem 2rem;
          max-width: 900px; margin: 0 auto; width: 100%;
        }
        .breadcrumb { display: flex; gap: 0.5rem; font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 1.5rem; }
        .breadcrumb a { color: rgba(255,255,255,0.6); text-decoration: none; }
        .breadcrumb a:hover { color: white; }
        .heroFlag { font-size: 2.5rem; margin-bottom: 0.5rem; display: block; }
        .heroTitle { font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 900; color: white; margin: 0 0 0.75rem; }
        .heroSub { font-size: 1.1rem; color: rgba(255,255,255,0.8); margin: 0; }

        .content { max-width: 1100px; margin: 0 auto; padding: 4rem 2rem; }
        .grid { display: grid; grid-template-columns: 2fr 1fr; gap: 3rem; align-items: start; }

        .desc p { font-size: 1.05rem; line-height: 1.8; color: #b8a8d8; margin-bottom: 1.25rem; }

        .highlights { margin-top: 2.5rem; }
        .highlights h2 { font-size: 1.4rem; font-weight: 700; color: #f0eaff; margin-bottom: 1.25rem; }
        .highlightList { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; }
        .highlightList li { display: flex; align-items: center; gap: 0.75rem; color: #b8a8d8; font-size: 1rem; }
        .highlightList li::before { content: ''; width: 8px; height: 8px; background: linear-gradient(135deg,#818cf8,#c084fc); border-radius: 50%; flex-shrink: 0; }

        .sidebar { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 2rem; position: sticky; top: 100px; }
        .sidebarTitle { font-size: 1.2rem; font-weight: 700; color: #f0eaff; margin: 0 0 1.5rem; }
        .priceRange { background: linear-gradient(135deg,rgba(99,102,241,0.15),rgba(139,92,246,0.15)); border: 1px solid rgba(99,102,241,0.3); border-radius: 12px; padding: 1.25rem; margin-bottom: 1.5rem; }
        .priceLabel { font-size: 0.85rem; color: #818cf8; font-weight: 600; margin-bottom: 0.25rem; }
        .priceValue { font-size: 1.1rem; font-weight: 700; color: #f0eaff; }
        .bestFor { margin-bottom: 1.5rem; }
        .bestForLabel { font-size: 0.9rem; color: #b8a8d8; margin-bottom: 0.75rem; }
        .tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tag { background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 20px; padding: 4px 12px; font-size: 0.85rem; color: #b8a8d8; }

        .btnWa {
          display: block; width: 100%;
          padding: 14px; text-align: center;
          background: linear-gradient(135deg,#25D366,#128C7E);
          color: white; border: none; border-radius: 12px;
          font-size: 1rem; font-weight: 700; cursor: pointer;
          text-decoration: none; margin-bottom: 0.75rem;
          transition: all 0.3s;
        }
        .btnWa:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(37,211,102,0.4); }
        .btnBack {
          display: block; width: 100%; padding: 12px; text-align: center;
          background: transparent; border: 1px solid rgba(255,255,255,0.2);
          color: #b8a8d8; border-radius: 12px; font-size: 0.95rem;
          cursor: pointer; text-decoration: none; transition: all 0.3s;
        }
        .btnBack:hover { background: rgba(255,255,255,0.05); color: white; }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
          .hero { height: 400px; }
          .sidebar { position: static; }
        }
      `}</style>

      <div className="destPage">
        <section className="hero">
          <div className="heroBg" />
          <div className="heroOverlay" />
          <div className="heroContent">
            <nav className="breadcrumb">
              <Link href="/">בית</Link>
              <span>/</span>
              <Link href="/multi-global">Multi-Global</Link>
              <span>/</span>
              <span>{dest.name}</span>
            </nav>
            <span className="heroFlag">{dest.flag}</span>
            <h1 className="heroTitle">{dest.headline}</h1>
            <p className="heroSub">{dest.subHeadline}</p>
          </div>
        </section>

        <div className="content">
          <div className="grid">
            <div>
              <div className="desc">
                {dest.description.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              <div className="highlights">
                <h2>מה כלול?</h2>
                <ul className="highlightList">
                  {dest.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
            </div>

            <aside className="sidebar">
              <div className="priceRange">
                <div className="priceLabel">טווח מחירים ממוצע</div>
                <div className="priceValue">{dest.priceRange}</div>
              </div>
              <div className="bestFor">
                <div className="bestForLabel">מתאים במיוחד ל:</div>
                <div className="tags">
                  {dest.bestFor.map((t, i) => <span key={i} className="tag">{t}</span>)}
                </div>
              </div>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btnWa">
                שלח לוואטסאפ 📱
              </a>
              <Link href="/multi-global" className="btnBack">
                ← חזרה לכל היעדים
              </Link>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
