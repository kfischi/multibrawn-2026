'use client';

import { useEffect, useRef, useState } from 'react';

interface Slide {
  image: string;
  title: string;
  location: string;
}

const SLIDES: Slide[] = [
  {
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818934/22_tt9jvz.jpg',
    title: 'וילה יוקרתית עם בריכה',
    location: 'מגדל העמק',
  },
  {
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726074/A7_rwzsuo.jpg',
    title: 'צימר רומנטי עם ג׳קוזי',
    location: 'גליל עליון',
  },
  {
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A6_h6irii.jpg',
    title: 'סוויטה עם נוף פנורמי',
    location: 'גליל מערבי',
  },
  {
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1763726071/A5_irr575.jpg',
    title: 'צימר יוקרתי בכרמים',
    location: 'כרמי יוסף',
  },
  {
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment2_u9fsdk.jpg',
    title: 'פנטהאוז יוקרתי עם נוף',
    location: 'תל אביב',
  },
  {
    image: 'https://res.cloudinary.com/dptyfvwyo/image/upload/v1760818995/Apartment1_mrxdad.jpg',
    title: 'דירת נופש מודרנית',
    location: 'תל אביב',
  },
];

const TICKER_LINES = [
  'וילות, צימרים ומתחמים בכל הארץ — מאילת ועד הגולן',
  'זוגות, משפחות וקבוצות — כל אחד מקבל התאמה אחרת',
  'וילות ובתי נופש · מתחמי אירוח · שבתות חתן',
  'התאמה אישית, לא קטלוג',
];

const WHATSAPP_NUMBER = '972523983394';

const FIELD_LABELS: Record<string, string> = {
  type: 'סוג האירוח',
  region: 'אזור',
  date: 'תאריך',
  nights: 'לילות',
  adults: 'מבוגרים',
  children: 'ילדים ותינוקות',
  rooms: 'חדרים',
  budget: 'תקציב בש״ח',
  unit: 'יחידת תקציב',
  flex: 'גמישות',
  needs: 'דרישות',
  name: 'שם',
  phone: 'טלפון',
};

const SLIDE_W = 300;
const N = SLIDES.length;
const STEP = 360 / N;
const RADIUS = Math.round(SLIDE_W / 2 / Math.tan(Math.PI / N));
const DEG_PER_SEC = 10;

function matchMessage(people: number, budget: number): string {
  if (people <= 3 && budget >= 2500) return 'נשמע כמו זוג שמחפש פרטיות אמיתית — יש לנו כיוון מדויק.';
  if (people >= 10) return 'הרכב קבוצתי — כאן ההתאמה שלנו הכי מורגשת.';
  if (budget < 1000) return 'אפשר למצוא התאמה גם במסגרת הזו — נדבר על האזור הנכון.';
  return 'יש לנו בדיוק את הכיוון בשבילכם.';
}

export default function VillasClient() {
  const [frontIdx, setFrontIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [people, setPeople] = useState(6);
  const [budget, setBudget] = useState(1500);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const ringRef = useRef<HTMLDivElement>(null);
  const angleRef = useRef(0);
  const frontIdxRef = useRef(0);
  const pausedRef = useRef(false);
  const revealRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  // rotating 3D carousel — continuous, film-like rotation (not discrete steps)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    let raf = 0;
    let lastTs: number | null = null;

    const tick = (ts: number) => {
      if (lastTs === null) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      if (!pausedRef.current) {
        angleRef.current -= DEG_PER_SEC * dt;
        if (ringRef.current) {
          ringRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
        }
        const norm = ((-angleRef.current % 360) + 360) % 360;
        const near = Math.round(norm / STEP) % N;
        if (near !== frontIdxRef.current) {
          frontIdxRef.current = near;
          setFrontIdx(near);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function goTo(i: number) {
    const idx = ((i % N) + N) % N;
    angleRef.current = -idx * STEP;
    frontIdxRef.current = idx;
    setFrontIdx(idx);
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${angleRef.current}deg)`;
    }
  }

  // scroll-reveal
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('mbVisible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const addReveal = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;

    const get = (id: string) =>
      (form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value || '';

    const values = {
      type: get('type'),
      region: get('region'),
      date: get('date'),
      nights: get('nights'),
      adults: get('adults'),
      children: get('children'),
      rooms: get('rooms'),
      budget: get('budget'),
      unit: get('unit'),
      flex: get('flex'),
      needs: get('needs'),
      name: get('name'),
      phone: get('phone'),
    };

    setStatus('sending');

    const leadData = {
      name: values.name,
      phone: values.phone,
      propertyType: values.type,
      location: values.region,
      dates: `${values.date}${values.nights ? ' · ' + values.nights + ' לילות' : ''}`,
      guestCount: `${values.adults} מבוגרים${values.children ? ' + ' + values.children + ' ילדים' : ''} · ${values.rooms} חדרים`,
      budget: `${values.budget} ₪ (${values.unit}${values.flex === 'קיימת גמישות מסוימת' ? ', גמישות' : ''})`,
      notes: values.needs || null,
    };

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadData, source: 'villas_landing' }),
      });
      setStatus('sent');
    } catch {
      setStatus('error');
    }

    sendWhatsapp(buildSummaryLines(values));
  }

  function buildSummaryLines(values: Record<string, string>) {
    const lines = ['פנייה חדשה — וילות וצימרים MULTIBRAWN'];
    for (const [id, label] of Object.entries(FIELD_LABELS)) {
      const v = values[id];
      if (v) lines.push(`${label}: ${v}`);
    }
    return lines;
  }

  function sendWhatsapp(lines: string[]) {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`,
      '_blank',
      'noopener'
    );
  }

  function handleVoiceClick() {
    sendWhatsapp(['היי, רוצה לספר לך בקצרה על מה שאנחנו מחפשים באירוח...']);
  }

  return (
    <div className="villasPage">
      <style jsx>{`
        .villasPage {
          --bg: #09020e;
          --purple: #9300ff;
          --pink: #ff00b8;
          --pearl: #f7f3fa;
          background: var(--bg);
          color: #fff;
          overflow-x: hidden;
        }
        .wrap {
          max-width: 1180px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .hero {
          padding: 56px 0 64px;
          position: relative;
          overflow: hidden;
          background: radial-gradient(ellipse at 18% 10%, #5d087b66, transparent 50%),
            radial-gradient(ellipse at 90% 85%, #a1008640, transparent 50%);
        }
        .eyebrow {
          color: #f2b9f2;
          letter-spacing: 0.15em;
          font-size: 12px;
          font-weight: 700;
        }
        h1 {
          font-size: clamp(32px, 7vw, 68px);
          line-height: 1.15;
          max-width: 820px;
          margin: 16px 0 20px;
        }
        h1 span {
          background: linear-gradient(100deg, #fff, #f4a5f2);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .lead {
          font-size: clamp(16px, 2vw, 20px);
          color: #e7dcec;
          max-width: 680px;
          margin: 0 0 28px;
        }
        .cta {
          display: inline-block;
          background: linear-gradient(115deg, var(--purple), var(--pink));
          color: #fff;
          border: 0;
          border-radius: 999px;
          padding: 14px 24px;
          font-weight: 800;
          text-decoration: none;
          cursor: pointer;
          font-size: 15px;
        }
        /* video showcase — same framed look, sits above the carousel */
        .videoFrame {
          background: linear-gradient(165deg, var(--purple) 0%, #c400e0 55%, var(--pink) 100%);
          border-radius: 30px;
          padding: 14px;
          box-shadow: 0 25px 70px #5e00ff40;
          margin-top: 34px;
        }
        .videoBox {
          position: relative;
          height: clamp(220px, 46vw, 400px);
          border-radius: 22px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          overflow: hidden;
          background: #0d0a14;
        }
        .videoBox video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        /* rotating 3D carousel — framed like a premium device, MULTIBRAWN purple→fuchsia */
        .carousel {
          position: relative;
          margin-top: 20px;
        }
        .stageFrame {
          background: linear-gradient(165deg, var(--purple) 0%, #c400e0 55%, var(--pink) 100%);
          border-radius: 30px;
          padding: 14px;
          box-shadow: 0 25px 70px #5e00ff40;
        }
        .stage {
          position: relative;
          height: clamp(240px, 48vw, 420px);
          perspective: 1200px;
          perspective-origin: 50% 50%;
          overflow: hidden;
          border-radius: 22px;
          border: 2px solid rgba(255, 255, 255, 0.35);
          background: #0d0a14;
        }
        .ring {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
        }
        .slide {
          position: absolute;
          top: 0;
          left: 50%;
          width: ${SLIDE_W}px;
          height: 100%;
          margin-left: -${SLIDE_W / 2}px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #a850db55;
          box-shadow: 0 20px 50px #5e00ff40;
          transition: filter 0.4s, box-shadow 0.4s;
          backface-visibility: hidden;
        }
        .slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .slideOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(transparent 45%, #08020fe0);
        }
        .slideCopy {
          position: absolute;
          z-index: 2;
          bottom: 16px;
          right: 18px;
          left: 18px;
          text-align: right;
          opacity: 0;
          transition: opacity 0.4s;
        }
        .slide.front .slideCopy {
          opacity: 1;
        }
        .slide.front {
          box-shadow: 0 25px 70px #a300ff66;
        }
        .slide:not(.front) {
          filter: brightness(0.55) saturate(0.7);
        }
        .slideCopy h3 {
          margin: 0 0 4px;
          font-size: clamp(16px, 2.8vw, 22px);
        }
        .slideCopy span {
          color: #e7c9f0;
          font-size: 13px;
        }
        .dots {
          display: flex;
          gap: 8px;
          justify-content: center;
          padding: 16px 0 2px;
        }
        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #5a3b6b;
          border: 0;
          cursor: pointer;
          padding: 0;
        }
        .dot.active {
          background: var(--pink);
          width: 22px;
          border-radius: 5px;
        }
        .disclaimer {
          font-size: 12px;
          color: #bca9c5;
          margin-top: 16px;
        }
        /* ticker */
        .ticker {
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid #a850db40;
          border-bottom: 1px solid #a850db40;
          padding: 10px 0;
          margin: 32px 0;
        }
        .tickerTrack {
          display: inline-block;
          animation: scrollTicker 22s linear infinite;
        }
        .tickerTrack span {
          margin: 0 28px;
          color: #f0c6ec;
          font-size: 13px;
        }
        @keyframes scrollTicker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        /* match calculator */
        .matchBox {
          border: 1px solid #9c44d9;
          border-radius: 16px;
          padding: 20px;
          background: #160a21;
          margin: 32px 0;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .matchBox.mbVisible {
          opacity: 1;
          transform: translateY(0);
        }
        .matchRow {
          margin: 14px 0;
        }
        .matchRow label {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 6px;
        }
        .matchRow input[type='range'] {
          width: 100%;
          accent-color: var(--pink);
        }
        .matchResult {
          margin-top: 12px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(100deg, #9300ff44, #ff00b844);
          border-radius: 10px;
          padding: 12px;
          text-align: center;
          font-size: 14px;
        }
        /* why card */
        .whyCard {
          border-right: 3px solid var(--pink);
          padding: 16px 18px;
          background: #190b24;
          border-radius: 4px 14px 14px 4px;
          margin: 32px 0;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .whyCard.mbVisible {
          opacity: 1;
          transform: translateY(0);
        }
        .whyCard h3 {
          margin: 0 0 8px;
          font-size: 19px;
        }
        .whyCard p {
          margin: 0;
          font-size: 15px;
          color: #ddd0e5;
        }
        /* gallery */
        .gallery {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin: 16px 0;
        }
        .gallery img {
          width: 100%;
          height: 140px;
          object-fit: cover;
          border-radius: 10px;
          border: 1px solid #a850db40;
        }
        /* sections */
        .section {
          padding-top: 56px;
          padding-bottom: 56px;
        }
        .section h2 {
          font-size: clamp(26px, 4vw, 42px);
          line-height: 1.2;
          margin: 0 0 18px;
        }
        .highlight {
          color: #fca0ec;
        }
        .sub {
          color: #d7c9df;
          max-width: 760px;
          font-size: 17px;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-top: 28px;
        }
        .card {
          border: 1px solid #a850db40;
          background: linear-gradient(145deg, #271135, #13071f);
          border-radius: 20px;
          padding: 22px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .card.mbVisible {
          opacity: 1;
          transform: translateY(0);
        }
        .card h3 {
          margin: 0 0 6px;
          font-size: 20px;
        }
        .card p {
          color: #ddd0e5;
          margin: 0;
          font-size: 15px;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 26px;
        }
        .step {
          border-top: 2px solid var(--pink);
          padding: 18px;
          background: #1a0b27;
          border-radius: 10px;
        }
        .step b {
          color: #f79be8;
          display: block;
          margin-bottom: 6px;
        }
        .step p {
          margin: 0;
          font-size: 14px;
          color: #ddd0e5;
        }
        /* form */
        .formbox {
          border: 1px solid #9c44d9;
          background: linear-gradient(145deg, #251137, #12081c);
          border-radius: 24px;
          padding: clamp(20px, 4vw, 40px);
          margin: 24px 0 40px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .formbox.mbVisible {
          opacity: 1;
          transform: translateY(0);
        }
        .fields {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .field.full {
          grid-column: 1 / -1;
        }
        label {
          font-weight: 700;
          font-size: 14px;
        }
        input,
        select,
        textarea {
          width: 100%;
          padding: 13px;
          border: 1px solid #79578b;
          background: #12091b;
          color: #fff;
          border-radius: 10px;
          font: inherit;
          font-size: 15px;
        }
        textarea {
          min-height: 90px;
          resize: vertical;
        }
        .voiceBtn {
          margin-top: 8px;
          background: transparent;
          border: 1px solid #9c44d9;
          color: #f0c6ec;
          border-radius: 999px;
          padding: 9px 14px;
          font-size: 13px;
          cursor: pointer;
          width: fit-content;
        }
        .note {
          font-size: 13px;
          color: #c9bcd0;
          margin: 18px 0;
        }
        .submitBtn {
          width: 100%;
          background: linear-gradient(115deg, var(--purple), var(--pink));
          color: #fff;
          border: 0;
          border-radius: 12px;
          padding: 16px;
          font-weight: 800;
          font-size: 16px;
          cursor: pointer;
        }
        .submitBtn:disabled {
          opacity: 0.7;
          cursor: wait;
        }
        .statusMsg {
          font-size: 13px;
          margin-top: 10px;
          color: #f79be8;
        }
        @media (max-width: 750px) {
          .cards,
          .steps,
          .fields {
            grid-template-columns: 1fr;
          }
          .gallery {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">PRIVATE HOSPITALITY · PERSONAL MATCHING</div>
          <h1>
            מתחמי נופש ואירוח.
            <br />
            <span>בחירה אישית, בקנה מידה אחר.</span>
          </h1>
          <p className="lead">
            וילות, בתי נופש, מלונות ומתחמי אירוח בכל הארץ — מאילת ועד הגולן.
            אתם מגדירים את הצורך, אנחנו מאתרים את האפשרויות המתאימות להרכב,
            לאופי האירוח, לאזור ולמסגרת התקציב שלכם.
          </p>
          <a className="cta" href="#request">
            ספרו לנו מה אתם מחפשים ←
          </a>

          <div className="videoFrame">
            <div className="videoBox">
              <video autoPlay loop muted playsInline>
                <source
                  src="https://res.cloudinary.com/dptyfvwyo/video/upload/v1763834667/Video-Multi_b11ehy.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div
            className="carousel"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setTimeout(() => setPaused(false), 1500)}
          >
            <div className="stageFrame">
            <div className="stage">
              <div className="ring" ref={ringRef}>
                {SLIDES.map((s, i) => (
                  <div
                    className={`slide${i === frontIdx ? ' front' : ''}`}
                    key={i}
                    style={{ transform: `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)` }}
                  >
                    <img src={s.image} alt={`${s.title} — ${s.location}`} loading={i === 0 ? 'eager' : 'lazy'} />
                    <div className="slideOverlay" />
                    <div className="slideCopy">
                      <h3>{s.title}</h3>
                      <span>{s.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="dots">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`dot${i === frontIdx ? ' active' : ''}`}
                  aria-label={`תמונה ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
          <p className="disclaimer">
            התמונות מוצגות ממאגר הנכסים הקיים של MULTIBRAWN.
          </p>
        </div>
      </section>

      <div className="wrap">
        <div className="ticker">
          <div className="tickerTrack">
            {[...TICKER_LINES, ...TICKER_LINES].map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </div>
        </div>
      </div>

      <section className="wrap">
        <div className="matchBox" ref={addReveal}>
          <div className="matchRow">
            <label>
              <span>כמה אתם?</span>
              <span>{people}</span>
            </label>
            <input
              type="range"
              min={2}
              max={30}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value))}
            />
          </div>
          <div className="matchRow">
            <label>
              <span>תקציב ללילה (₪)</span>
              <span>{budget.toLocaleString('he-IL')}</span>
            </label>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
          </div>
          <div className="matchResult">{matchMessage(people, budget)}</div>
        </div>
      </section>

      <section className="wrap">
        <div className="whyCard" ref={addReveal}>
          <h3>למה דרך MULTIBRAWN ולא ישירות</h3>
          <p>
            אני מכירה את הנכסים מהשטח — לא רק מתמונות. אני יודעת איפה הכשרות
            אמיתית, איפה המחיר הוגן ואיפה פשוט לא מתאים לקבוצה שלכם. אתם
            חוסכים את החיפוש, אני עושה את ההתאמה.
          </p>
        </div>
      </section>

      <section className="section wrap">
        <h2>
          מגוון מקומות. <span className="highlight">התאמה אחת נכונה.</span>
        </h2>
        <p className="sub">
          אין נכס שמתאים לכולם. יש נכס שמתאים להרכב מסוים, לצרכים מסוימים
          ולמסגרת תקציב מסוימת. לכן אנחנו מתחילים בהבנת הבקשה, לא בהצגת רשימה
          אקראית של מקומות.
        </p>
        <div className="cards">
          <article className="card" ref={addReveal}>
            <h3>וילות ובתי נופש</h3>
            <p>מרחב פרטי, חדרי שינה, מתקנים ואופי אירוח שמתאים להרכב שלכם.</p>
          </article>
          <article className="card" ref={addReveal}>
            <h3>מתחמי אירוח לקבוצות</h3>
            <p>התאמה לפי מספר המשתתפים, חלוקת החדרים והמרחבים המשותפים.</p>
          </article>
          <article className="card" ref={addReveal}>
            <h3>מלונות ושבתות חתן</h3>
            <p>בדיקת אפשרויות בהתאם לאזור, להרכב האורחים ולצרכים המיוחדים.</p>
          </article>
        </div>
      </section>

      <section className="section wrap">
        <h2>כל הנכסים במבט אחד</h2>
        <p className="sub">גלריה של הנכסים הקיימים — לפני שממלאים את הטופס.</p>
        <div className="gallery">
          {SLIDES.map((s, i) => (
            <img key={i} src={s.image} alt={`${s.title} — ${s.location}`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="section wrap">
        <h2>מה קובע את מחיר האירוח?</h2>
        <p className="sub">
          מחירו של מתחם אירוח מושפע, בין היתר, מהאזור, ממספר חדרי השינה, מכמות
          האורחים, מגודל הנכס והשטח, מהמתקנים, ממועד האירוח וממשך השהייה. גם
          נכסים שנראים דומים בתמונות עשויים להציע חוויית אירוח שונה לחלוטין.
        </p>
        <div className="steps">
          <div className="step">
            <b>01 · מי מגיע?</b>
            <p>מספר מבוגרים, ילדים ותינוקות, מספר חדרים נדרש ואופן חלוקת הלינה.</p>
          </div>
          <div className="step">
            <b>02 · מה חשוב לכם?</b>
            <p>אזור, פרטיות, מרחבים משותפים, בריכה, נגישות, כשרות ודרישות נוספות.</p>
          </div>
          <div className="step">
            <b>03 · מה התקציב?</b>
            <p>מסגרת כספית מוגדרת ללילה או לכל השהייה. כך אפשר לבחון התאמות רלוונטיות.</p>
          </div>
        </div>
      </section>

      <section id="request" className="wrap">
        <div className="formbox" ref={addReveal}>
          <h2>האירוח שאתם מחפשים מתחיל כאן.</h2>
          <p className="sub">
            שתפו אותנו בפרטים. ככל שהבקשה מדויקת יותר, כך אפשר למקד את הבדיקה
            בנכסים המתאימים.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <label htmlFor="type">סוג האירוח *</label>
                <select id="type" name="type" required defaultValue="">
                  <option value="" disabled>
                    בחרו
                  </option>
                  <option>וילה / בית נופש</option>
                  <option>מלון / אירוח קבוצתי</option>
                  <option>שבת חתן</option>
                  <option>אחר</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="region">אזור מבוקש *</label>
                <input id="region" name="region" required />
              </div>
              <div className="field">
                <label htmlFor="date">תאריך אירוח *</label>
                <input id="date" name="date" type="date" required />
              </div>
              <div className="field">
                <label htmlFor="nights">מספר לילות *</label>
                <input id="nights" name="nights" type="number" min={1} required />
              </div>
              <div className="field">
                <label htmlFor="adults">מספר מבוגרים *</label>
                <input id="adults" name="adults" type="number" min={1} required />
              </div>
              <div className="field">
                <label htmlFor="children">מספר ילדים ותינוקות</label>
                <input id="children" name="children" type="number" min={0} />
              </div>
              <div className="field">
                <label htmlFor="rooms">מספר חדרי שינה *</label>
                <input id="rooms" name="rooms" type="number" min={1} required />
              </div>
              <div className="field">
                <label htmlFor="budget">מסגרת תקציב בש״ח *</label>
                <input id="budget" name="budget" type="number" min={1} required />
              </div>
              <div className="field">
                <label htmlFor="unit">התקציב מתייחס ל- *</label>
                <select id="unit" name="unit" required defaultValue="">
                  <option value="" disabled>
                    בחרו
                  </option>
                  <option>ללילה</option>
                  <option>לכל השהייה</option>
                  <option>לאדם</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="flex">גמישות בתקציב</label>
                <select id="flex" name="flex" defaultValue="ללא גמישות">
                  <option>ללא גמישות</option>
                  <option>קיימת גמישות מסוימת</option>
                </select>
              </div>
              <div className="field full">
                <label htmlFor="needs">מה חשוב לכם במיוחד?</label>
                <textarea id="needs" name="needs" />
                <button type="button" className="voiceBtn" onClick={handleVoiceClick}>
                  או ספרו לנו בקצרה בוואטסאפ ←
                </button>
              </div>
              <div className="field">
                <label htmlFor="name">שם מלא *</label>
                <input id="name" name="name" required />
              </div>
              <div className="field">
                <label htmlFor="phone">טלפון לחזרה *</label>
                <input id="phone" name="phone" type="tel" required />
              </div>
            </div>
            <p className="note">
              התקציב הוא חלק הכרחי מההתאמה. מסירת פרטים אינה מבטיחה זמינות או
              הצעת מחיר. בחיפוש מורחב לשבת חתן עשוי לחול תשלום נפרד, בכפוף
              לאישור מראש.
            </p>
            <button className="submitBtn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'שולח...' : 'העברת הבקשה בוואטסאפ ←'}
            </button>
            {status === 'error' && (
              <p className="statusMsg">הפנייה נשלחת בוואטסאפ — שמירה במערכת נכשלה, ניצור קשר ידנית.</p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
