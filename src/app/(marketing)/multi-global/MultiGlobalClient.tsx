'use client';

import { useRouter } from 'next/navigation';

const destinations = [
  {
    slug: 'greece',
    name: 'יוון',
    flag: '🇬🇷',
    desc: 'וילות על קליפות הים האגאי, סנטוריני ומיקונוס',
    fallback: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop',
  },
  {
    slug: 'italy',
    name: 'איטליה',
    flag: '🇮🇹',
    desc: 'ווילות טוסקנה, אמאלפי ולייק קומו',
    fallback: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop',
  },
  {
    slug: 'spain',
    name: 'ספרד',
    flag: '🇪🇸',
    desc: 'פינקות עם בריכות במאיורקה, איביזה וברצלונה',
    fallback: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&h=400&fit=crop',
  },
  {
    slug: 'dubai',
    name: 'דובאי',
    flag: '🇦🇪',
    desc: 'וילות VIP עם בריכות פרטיות ושירות קונסיירז',
    fallback: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
  },
  {
    slug: 'thailand',
    name: 'תאילנד',
    flag: '🇹🇭',
    desc: 'וילות infinity בקו סמוי, פוקט וקו פנגן',
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  },
  {
    slug: 'portugal',
    name: 'פורטוגל',
    flag: '🇵🇹',
    desc: 'קינטס יוקרתיות באלנטז\'ו ובאלגרב',
    fallback: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
  },
];

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'נכסים ב-30+ מדינות',
    desc: 'רשת נכסים בינלאומית מאומתת ומדורגת',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'שירות ישיר בעברית',
    desc: 'ליווי אישי מישראל — בלי מתווכים ובלי שפה זרה',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'קואורדינציה מלאה',
    desc: 'טיסות, טרנספר, פעילויות — הכל בחבילה אחת',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'נכסי יוקרה בלבד',
    desc: 'כל נכס עובר בדיקת איכות קפדנית לפני הרישום',
  },
];

export default function MultiGlobalClient() {
  const router = useRouter();

  const handleChat = () => {
    const btn = document.querySelector('[data-chatbot]') as HTMLButtonElement;
    if (btn) btn.click();
  };

  const waUrl = `https://wa.me/972523983394?text=${encodeURIComponent('שלום! אני מעוניין בנכס בינלאומי דרך Multi-Global. אפשר לקבל פרטים?')}`;

  return (
    <>
      <style jsx>{`
        * { box-sizing: border-box; }

        .page { min-height: 100vh; direction: rtl; }

        /* ── HERO ── */
        .hero {
          position: relative;
          height: 680px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .heroBg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&h=700&fit=crop');
          background-size: cover;
          background-position: center;
          opacity: 0.35;
        }
        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,27,75,0.75) 100%);
        }
        .heroContent {
          position: relative;
          text-align: center;
          max-width: 860px;
          padding: 0 2rem;
        }
        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 6px 20px;
          border-radius: 30px;
          margin-bottom: 1.5rem;
        }
        .heroTitle {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 900;
          color: white;
          margin: 0 0 1rem;
          line-height: 1.15;
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .heroTitle span {
          background: linear-gradient(135deg, #818cf8, #c084fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .heroSub {
          font-size: 1.2rem;
          color: rgba(255,255,255,0.85);
          margin: 0 0 2.5rem;
          line-height: 1.6;
        }
        .heroBtns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btnPrimary {
          padding: 16px 40px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
          transition: all 0.3s;
        }
        .btnPrimary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99,102,241,0.5); }
        .btnWa {
          padding: 16px 40px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: white;
          border: none;
          border-radius: 30px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 8px 24px rgba(37,211,102,0.35);
          transition: all 0.3s;
          text-decoration: none;
          display: inline-block;
        }
        .btnWa:hover { transform: translateY(-2px); }

        /* ── FEATURES ── */
        .featuresSection {
          background: rgba(255,255,255,0.03);
          border-top: 1px solid rgba(255,255,255,0.07);
          padding: 5rem 2rem;
        }
        .sectionTitle {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          background: linear-gradient(135deg, #818cf8, #c084fc, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 3rem;
        }
        .featuresGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .featureCard {
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(129,140,248,0.2);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s;
        }
        .featureCard:hover {
          transform: translateY(-4px);
          border-color: rgba(129,140,248,0.4);
          box-shadow: 0 8px 30px rgba(99,102,241,0.2);
        }
        .featureIcon {
          color: #818cf8;
          margin-bottom: 1rem;
          display: flex;
          justify-content: center;
        }
        .featureTitle { font-size: 1.05rem; font-weight: 700; color: #f0eaff; margin: 0 0 0.5rem; }
        .featureDesc { font-size: 0.9rem; color: #b8a8d8; margin: 0; line-height: 1.5; }

        /* ── DESTINATIONS ── */
        .destSection {
          padding: 5rem 2rem;
        }
        .destTitle {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          color: white;
          margin: 0 0 0.75rem;
        }
        .destSub {
          text-align: center;
          color: rgba(255,255,255,0.55);
          margin: 0 0 3rem;
          font-size: 1rem;
        }
        .destGrid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .destCard {
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          height: 240px;
          cursor: pointer;
          transition: transform 0.3s;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .destCard:hover { transform: scale(1.02); box-shadow: 0 12px 40px rgba(0,0,0,0.5); }
        .destImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .destOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%);
        }
        .destInfo {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 1.25rem;
          color: white;
        }
        .destFlag { font-size: 1.5rem; margin-bottom: 4px; }
        .destName { font-size: 1.3rem; font-weight: 800; margin: 0 0 4px; }
        .destDesc { font-size: 0.85rem; color: rgba(255,255,255,0.8); margin: 0; }
        .destArrow {
          position: absolute;
          top: 1rem;
          left: 1rem;
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.15);
          backdrop-filter: blur(6px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .destCard:hover .destArrow { opacity: 1; }

        /* ── CTA ── */
        .ctaSection {
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          padding: 5rem 2rem;
          text-align: center;
        }
        .ctaTitle {
          font-size: 2.2rem;
          font-weight: 900;
          color: white;
          margin: 0 0 1rem;
        }
        .ctaDesc {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.85);
          margin: 0 0 2.5rem;
        }

        @media (max-width: 640px) {
          .hero { height: 560px; }
          .destGrid { grid-template-columns: 1fr; }
          .featuresGrid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      <div className="page">
        {/* HERO */}
        <section className="hero">
          <div className="heroBg" />
          <div className="heroOverlay" />
          <div className="heroContent">
            <span className="badge">🌍 MULTI-GLOBAL</span>
            <h1 className="heroTitle">
              נכסי יוקרה<br />
              <span>בכל העולם</span>
            </h1>
            <p className="heroSub">
              וילות פרטיות, פנטהאוזים ומתחמים בלעדיים ב-30+ יעדים עולמיים —<br />
              עם שירות אישי בעברית מישראל
            </p>
            <div className="heroBtns">
              <button className="btnPrimary" onClick={handleChat}>
                דברו איתנו עכשיו 💬
              </button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btnWa">
                וואטסאפ ישיר 📱
              </a>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="featuresSection">
          <h2 className="sectionTitle">למה MULTI-GLOBAL?</h2>
          <div className="featuresGrid">
            {features.map((f, i) => (
              <div key={i} className="featureCard">
                <div className="featureIcon">{f.icon}</div>
                <h3 className="featureTitle">{f.title}</h3>
                <p className="featureDesc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="destSection">
          <h2 className="destTitle">היעדים שלנו</h2>
          <p className="destSub">לחצו על יעד לפרטים נוספים</p>
          <div className="destGrid">
            {destinations.map((d, i) => (
              <div
                key={i}
                className="destCard"
                onClick={() => router.push(`/multi-global/${d.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && router.push(`/multi-global/${d.slug}`)}
                aria-label={`פרטים על נכסים ב${d.name}`}
              >
                <img src={d.fallback} alt={d.name} className="destImg" loading="lazy" />
                <div className="destOverlay" />
                <div className="destArrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </div>
                <div className="destInfo">
                  <div className="destFlag">{d.flag}</div>
                  <h3 className="destName">{d.name}</h3>
                  <p className="destDesc">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="ctaSection">
          <h2 className="ctaTitle">מוכנים לחופשת החלומות שלכם?</h2>
          <p className="ctaDesc">ספרו לנו לאן אתם חולמים — אנחנו נדאג לשאר</p>
          <div className="heroBtns">
            <button className="btnPrimary" style={{background: 'white', color: '#4f46e5'}} onClick={handleChat}>
              שוחח עם ערדית 🤖
            </button>
            <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btnWa">
              וואטסאפ עכשיו 📱
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
