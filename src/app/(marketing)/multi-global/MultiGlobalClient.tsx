'use client';

import { useRouter } from 'next/navigation';

const destinations = [
  {
    slug: 'greece',
    name: 'יוון',
    flag: '🇬🇷',
    desc: 'וילות על קו הים האגאי, סנטוריני ומיקונוס',
    img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=700&h=500&fit=crop',
    tag: 'פופולרי',
  },
  {
    slug: 'italy',
    name: 'איטליה',
    flag: '🇮🇹',
    desc: 'וילות טוסקנה, אמאלפי ולייק קומו',
    img: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=700&h=500&fit=crop',
  },
  {
    slug: 'spain',
    name: 'ספרד',
    flag: '🇪🇸',
    desc: 'פינקות עם בריכות במאיורקה, איביזה וברצלונה',
    img: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=700&h=500&fit=crop',
  },
  {
    slug: 'dubai',
    name: 'דובאי',
    flag: '🇦🇪',
    desc: 'וילות VIP עם בריכות פרטיות ושירות קונסיירז',
    img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=700&h=500&fit=crop',
    tag: 'חדש',
  },
  {
    slug: 'thailand',
    name: 'תאילנד',
    flag: '🇹🇭',
    desc: 'וילות Infinity בקו סמוי, פוקט וקו פנגן',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&h=500&fit=crop',
  },
  {
    slug: 'portugal',
    name: 'פורטוגל',
    flag: '🇵🇹',
    desc: 'קינטס יוקרתיות באלנטז\'ו ובאלגרב',
    img: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=700&h=500&fit=crop',
  },
];

const stats = [
  { value: '30+', label: 'יעדים עולמיים' },
  { value: '500+', label: 'נכסי יוקרה' },
  { value: '12+', label: 'שנות ניסיון' },
  { value: '98%', label: 'שביעות רצון' },
];

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    title: 'נכסים ב-30+ מדינות',
    desc: 'רשת נכסים בינלאומית מאומתת ומדורגת, מאירופה ועד דרום-מזרח אסיה',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: 'שירות אישי בעברית',
    desc: 'ליווי מישראל — בלי מתווכים, בלי שפה זרה, בלי הפתעות',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: 'חבילה מלאה',
    desc: 'טיסות, טרנספר, שף פרטי, פעילויות — הכל מתואם מראש',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: 'יוקרה בלבד',
    desc: 'כל נכס עובר בדיקת איכות קפדנית — רק הטוב ביותר מגיע אליכם',
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
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Josefin+Sans:wght@300;400;600;700&display=swap');
      `}</style>
      <style jsx>{`
        *, *::before, *::after { box-sizing: border-box; }

        .page {
          min-height: 100vh;
          direction: rtl;
          background: #0C0A09;
          font-family: 'Josefin Sans', sans-serif;
          color: #F5F0E8;
        }

        /* ── HERO ── */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .heroBg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1800&h=1000&fit=crop');
          background-size: cover;
          background-position: center;
          transform: scale(1.05);
          transition: transform 8s ease;
        }
        .hero:hover .heroBg { transform: scale(1.0); }
        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            170deg,
            rgba(12,10,9,0.88) 0%,
            rgba(12,10,9,0.65) 50%,
            rgba(12,10,9,0.92) 100%
          );
        }
        .heroContent {
          position: relative;
          text-align: center;
          max-width: 900px;
          padding: 0 2rem;
          animation: fadeUp 0.9s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .heroBadge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(202,138,4,0.15);
          border: 1px solid rgba(202,138,4,0.4);
          color: #CA8A04;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 3px;
          text-transform: uppercase;
          padding: 8px 22px;
          border-radius: 30px;
          margin-bottom: 2rem;
          backdrop-filter: blur(8px);
        }
        .heroBadgeDot {
          width: 6px;
          height: 6px;
          background: #CA8A04;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
        .heroTitle {
          font-family: 'Cinzel', serif;
          font-size: clamp(2.8rem, 6vw, 5.5rem);
          font-weight: 900;
          color: #F5F0E8;
          margin: 0 0 0.5rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .heroTitle .gold {
          color: #CA8A04;
          display: block;
        }
        .heroSub {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: rgba(245,240,232,0.7);
          margin: 1.5rem 0 3rem;
          line-height: 1.7;
          font-weight: 300;
          letter-spacing: 0.02em;
        }
        .heroBtns {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btnGold {
          padding: 16px 44px;
          background: linear-gradient(135deg, #CA8A04, #D97706);
          color: #0C0A09;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          font-family: 'Josefin Sans', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(202,138,4,0.3);
        }
        .btnGold:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(202,138,4,0.45);
        }
        .btnOutline {
          padding: 15px 44px;
          background: transparent;
          color: #F5F0E8;
          border: 1px solid rgba(245,240,232,0.35);
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          font-family: 'Josefin Sans', sans-serif;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          backdrop-filter: blur(6px);
        }
        .btnOutline:hover {
          border-color: rgba(202,138,4,0.6);
          color: #CA8A04;
          transform: translateY(-2px);
        }
        .heroScroll {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: rgba(245,240,232,0.4);
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          animation: float 2.5s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }

        /* ── STATS ── */
        .statsBar {
          background: rgba(202,138,4,0.06);
          border-top: 1px solid rgba(202,138,4,0.15);
          border-bottom: 1px solid rgba(202,138,4,0.15);
          padding: 3rem 2rem;
        }
        .statsGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }
        .statValue {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #CA8A04;
          margin: 0 0 4px;
          line-height: 1;
        }
        .statLabel {
          font-size: 0.8rem;
          color: rgba(245,240,232,0.5);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          font-weight: 300;
        }

        /* ── FEATURES ── */
        .featuresSection {
          padding: 7rem 2rem;
        }
        .sectionLabel {
          text-align: center;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #CA8A04;
          margin: 0 0 1rem;
        }
        .sectionTitle {
          text-align: center;
          font-family: 'Cinzel', serif;
          font-size: clamp(1.8rem, 3.5vw, 2.8rem);
          font-weight: 700;
          color: #F5F0E8;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
        }
        .sectionSub {
          text-align: center;
          color: rgba(245,240,232,0.45);
          margin: 0 0 4rem;
          font-size: 1rem;
          font-weight: 300;
        }
        .featuresGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1.5rem;
          max-width: 1100px;
          margin: 0 auto;
        }
        .featureCard {
          background: rgba(245,240,232,0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(202,138,4,0.12);
          border-radius: 2px;
          padding: 2.5rem 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .featureCard::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(202,138,4,0.05) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }
        .featureCard:hover::before { opacity: 1; }
        .featureCard:hover {
          border-color: rgba(202,138,4,0.3);
          transform: translateY(-4px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.4);
        }
        .featureIconWrap {
          width: 56px;
          height: 56px;
          border: 1px solid rgba(202,138,4,0.25);
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #CA8A04;
          margin-bottom: 1.5rem;
          transition: all 0.3s;
        }
        .featureCard:hover .featureIconWrap {
          background: rgba(202,138,4,0.1);
          border-color: rgba(202,138,4,0.5);
        }
        .featureTitle {
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          color: #F5F0E8;
          margin: 0 0 0.75rem;
          letter-spacing: 0.02em;
        }
        .featureDesc {
          font-size: 0.88rem;
          color: rgba(245,240,232,0.55);
          margin: 0;
          line-height: 1.65;
          font-weight: 300;
        }

        /* ── DESTINATIONS ── */
        .destSection {
          padding: 2rem 2rem 7rem;
        }
        .destGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: repeat(2, 280px);
          gap: 12px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .destCard {
          border-radius: 2px;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          border: 1px solid rgba(245,240,232,0.06);
        }
        .destCard:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          border-color: rgba(202,138,4,0.25);
          z-index: 1;
        }
        .destImg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .destCard:hover .destImg { transform: scale(1.06); }
        .destOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(12,10,9,0.92) 0%, rgba(12,10,9,0.1) 55%);
          transition: background 0.3s;
        }
        .destCard:hover .destOverlay {
          background: linear-gradient(to top, rgba(12,10,9,0.95) 0%, rgba(12,10,9,0.2) 55%);
        }
        .destTag {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(202,138,4,0.9);
          color: #0C0A09;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 2px;
        }
        .destInfo {
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          padding: 1.5rem;
          color: white;
        }
        .destFlag { font-size: 1.4rem; margin-bottom: 6px; }
        .destName {
          font-family: 'Cinzel', serif;
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0 0 6px;
          letter-spacing: 0.02em;
        }
        .destDesc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.65);
          margin: 0;
          font-weight: 300;
          transform: translateY(6px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .destCard:hover .destDesc {
          opacity: 1;
          transform: translateY(0);
        }
        .destArrowBtn {
          position: absolute;
          top: 14px;
          left: 14px;
          width: 36px;
          height: 36px;
          background: rgba(245,240,232,0.1);
          backdrop-filter: blur(8px);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          opacity: 0;
          transition: all 0.3s ease;
          border: 1px solid rgba(245,240,232,0.15);
        }
        .destCard:hover .destArrowBtn {
          opacity: 1;
          background: rgba(202,138,4,0.8);
          border-color: transparent;
        }

        /* ── DIVIDER ── */
        .divider {
          width: 60px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #CA8A04, transparent);
          margin: 0 auto 3rem;
        }

        /* ── CTA ── */
        .ctaSection {
          position: relative;
          padding: 8rem 2rem;
          text-align: center;
          overflow: hidden;
        }
        .ctaBg {
          position: absolute;
          inset: 0;
          background-image: url('https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&h=700&fit=crop');
          background-size: cover;
          background-position: center;
          opacity: 0.12;
        }
        .ctaContent {
          position: relative;
          max-width: 700px;
          margin: 0 auto;
        }
        .ctaTitle {
          font-family: 'Cinzel', serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: #F5F0E8;
          margin: 0 0 1.25rem;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .ctaTitle .gold { color: #CA8A04; }
        .ctaDesc {
          font-size: 1.05rem;
          color: rgba(245,240,232,0.6);
          margin: 0 0 3rem;
          line-height: 1.7;
          font-weight: 300;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .destGrid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: auto;
          }
          .statsGrid { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        @media (max-width: 600px) {
          .destGrid { grid-template-columns: 1fr; grid-template-rows: auto; }
          .destCard { height: 240px; }
          .statsGrid { grid-template-columns: repeat(2, 1fr); }
          .featuresGrid { grid-template-columns: 1fr; }
          .heroBtns { flex-direction: column; align-items: center; }
          .btnGold, .btnOutline { width: 100%; max-width: 320px; justify-content: center; }
        }

        @media (prefers-reduced-motion: reduce) {
          .heroBg, .destImg, .destCard, .featureCard, .heroContent { transition: none; animation: none; }
        }
      `}</style>

      <div className="page">

        {/* HERO */}
        <section className="hero">
          <div className="heroBg" />
          <div className="heroOverlay" />
          <div className="heroContent">
            <div className="heroBadge">
              <span className="heroBadgeDot" />
              MULTI-GLOBAL
            </div>
            <h1 className="heroTitle">
              נכסי יוקרה
              <span className="gold">בכל העולם</span>
            </h1>
            <p className="heroSub">
              וילות פרטיות, פנטהאוזים ומתחמים בלעדיים ב-30+ יעדים עולמיים<br />
              שירות אישי בעברית — ישירות מישראל
            </p>
            <div className="heroBtns">
              <button className="btnGold" onClick={handleChat}>
                שוחח איתנו עכשיו
              </button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btnOutline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                וואטסאפ ישיר
              </a>
            </div>
          </div>
          <div className="heroScroll">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
        </section>

        {/* STATS */}
        <div className="statsBar">
          <div className="statsGrid">
            {stats.map((s, i) => (
              <div key={i}>
                <div className="statValue">{s.value}</div>
                <div className="statLabel">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES */}
        <section className="featuresSection">
          <p className="sectionLabel">למה לבחור בנו</p>
          <h2 className="sectionTitle">הבדל שאפשר להרגיש</h2>
          <div className="divider" />
          <div className="featuresGrid">
            {features.map((f, i) => (
              <div key={i} className="featureCard">
                <div className="featureIconWrap">{f.icon}</div>
                <h3 className="featureTitle">{f.title}</h3>
                <p className="featureDesc">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DESTINATIONS */}
        <section className="destSection">
          <p className="sectionLabel">היעדים שלנו</p>
          <h2 className="sectionTitle">בחרו את היעד המושלם</h2>
          <p className="sectionSub">לחצו על יעד לגילוי נכסים</p>
          <div className="destGrid">
            {destinations.map((d, i) => (
              <div
                key={i}
                className="destCard"
                onClick={() => router.push(`/multi-global/${d.slug}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && router.push(`/multi-global/${d.slug}`)}
                aria-label={`נכסים ב${d.name}`}
              >
                <img src={d.img} alt={d.name} className="destImg" loading="lazy" />
                <div className="destOverlay" />
                {d.tag && <div className="destTag">{d.tag}</div>}
                <div className="destArrowBtn" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
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
          <div className="ctaBg" />
          <div className="ctaContent">
            <p className="sectionLabel">התחילו את המסע</p>
            <h2 className="ctaTitle">
              מוכנים לחופשה<br />
              <span className="gold">שלא תשכחו?</span>
            </h2>
            <div className="divider" />
            <p className="ctaDesc">
              ספרו לנו לאן אתם חולמים — נמצא עבורכם את הנכס המושלם
              ונדאג לכל הפרטים מרגע ההזמנה ועד החזרה הביתה
            </p>
            <div className="heroBtns">
              <button className="btnGold" onClick={handleChat}>
                שוחח עם ערדית
              </button>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btnOutline">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                וואטסאפ עכשיו
              </a>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
