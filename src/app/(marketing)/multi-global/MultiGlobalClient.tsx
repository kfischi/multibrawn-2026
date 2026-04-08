'use client';

const destinations = [
  {
    name: 'יוון',
    flag: '🇬🇷',
    desc: 'וילות על קליפות הים האגאי, סנטוריני ומיקונוס',
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/q_auto,f_auto,w_600,h_400,c_fill/v1/multibrawn/greece',
    fallback: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=400&fit=crop',
  },
  {
    name: 'איטליה',
    flag: '🇮🇹',
    desc: 'ווילות טוסקנה, אמאלפי ולייק קומו',
    image: '',
    fallback: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600&h=400&fit=crop',
  },
  {
    name: 'ספרד',
    flag: '🇪🇸',
    desc: 'פינקות עם בריכות בפאייורקה, איביזה וברצלונה',
    image: '',
    fallback: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  },
  {
    name: 'דובאי',
    flag: '🇦🇪',
    desc: 'וילות VIP עם בריכות פרטיות ושירות קונסיירז',
    image: '',
    fallback: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
  },
  {
    name: 'תאילנד',
    flag: '🇹🇭',
    desc: 'וילות בוהינגוויל עם בריכות infinity בקו סמוי ובאלי',
    image: '',
    fallback: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
  },
  {
    name: 'פורטוגל',
    flag: '🇵🇹',
    desc: 'קינטס יוקרתיות ב-Alentejo ובאלגרב',
    image: '',
    fallback: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=400&fit=crop',
  },
];

const features = [
  { icon: '🌍', title: 'נכסים ב-30+ מדינות', desc: 'רשת נכסים בינלאומית מאומתת ומדורגת' },
  { icon: '🤝', title: 'שירות ישיר בעברית', desc: 'ליווי אישי מישראל — בלי מתווכים ובלי שפת זרה' },
  { icon: '✈️', title: 'קואורדינציה מלאה', desc: 'טיסות, טרנספר, פעילויות — הכל בחבילה אחת' },
  { icon: '💎', title: 'נכסי יוקרה בלבד', desc: 'כל נכס עובר בדיקת איכות קפדנית לפני הרישום' },
];

export default function MultiGlobalClient() {
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
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
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
          background: linear-gradient(135deg, rgba(15,23,42,0.85) 0%, rgba(30,27,75,0.7) 100%);
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
          font-size: 1.25rem;
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
          background: #f8fafc;
          padding: 5rem 2rem;
        }
        .sectionTitle {
          text-align: center;
          font-size: 2rem;
          font-weight: 800;
          color: #1e293b;
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
          background: white;
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border: 1px solid #e2e8f0;
        }
        .featureIcon { font-size: 2.5rem; margin-bottom: 1rem; }
        .featureTitle { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0 0 0.5rem; }
        .featureDesc { font-size: 0.9rem; color: #64748b; margin: 0; line-height: 1.5; }

        /* ── DESTINATIONS ── */
        .destSection {
          padding: 5rem 2rem;
          background: #0f172a;
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
          color: rgba(255,255,255,0.6);
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
        }
        .destCard:hover { transform: scale(1.02); }
        .destImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .destOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 50%);
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
          <p className="destSub">בחרו יעד — אנחנו נמצא לכם את הנכס המושלם</p>
          <div className="destGrid">
            {destinations.map((d, i) => (
              <div key={i} className="destCard" onClick={handleChat}>
                <img
                  src={d.fallback}
                  alt={d.name}
                  className="destImg"
                  loading="lazy"
                />
                <div className="destOverlay" />
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
