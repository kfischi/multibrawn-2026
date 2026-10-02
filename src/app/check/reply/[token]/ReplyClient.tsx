'use client';

import { useEffect, useState } from 'react';
import type { VenueReplyView } from '@/lib/check/types';
import styles from '@/app/(marketing)/check/Check.module.css';

type Choice = 'available' | 'unavailable';

export default function ReplyClient({ token }: { token: string }) {
  const [view, setView] = useState<VenueReplyView | null>(null);
  const [loadError, setLoadError] = useState('');
  const [choice, setChoice] = useState<Choice | null>(null);
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/check/reply/${encodeURIComponent(token)}`, { cache: 'no-store' })
      .then(async res => {
        const data = await res.json().catch(() => ({}));
        if (!alive) return;
        if (!res.ok || !data.view) { setLoadError(data.error || 'הקישור לא תקין'); return; }
        const v: VenueReplyView = data.view;
        setView(v);
        if (v.response !== 'pending') {
          setChoice(v.response);
          setPrice(v.priceText || '');
          setNote(v.venueNote || '');
        }
      })
      .catch(() => alive && setLoadError('אין חיבור. נסו לרענן את העמוד.'));
    return () => { alive = false; };
  }, [token]);

  async function submit() {
    if (!choice) { setError('בחרו: פנוי או לא פנוי'); return; }
    if (choice === 'available' && !price.trim()) { setError('כשפנוי, כתבו מחיר'); return; }
    setSending(true); setError('');
    try {
      const res = await fetch(`/api/check/reply/${encodeURIComponent(token)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: choice, priceText: price, note }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) { setError(data.error || 'משהו השתבש. נסו שוב.'); return; }
      setSaved(true);
    } catch {
      setError('אין חיבור. נסו שוב.');
    } finally {
      setSending(false);
    }
  }

  if (loadError) {
    return (
      <main className={styles.page}>
        <div className={styles.card}>
          <span className={styles.badge}>MULTIBRAWN</span>
          <h1 className={styles.title}>הקישור לא נפתח</h1>
          <p className={styles.lead}>{loadError}</p>
          <p className={styles.fine}>אפשר לענות לערדית ישירות בוואטסאפ.</p>
        </div>
      </main>
    );
  }

  if (!view) {
    return (
      <main className={styles.page}>
        <div className={styles.card}><p className={styles.lead}>טוען את הבקשה...</p></div>
      </main>
    );
  }

  const facts: [string, string][] = [
    ['אירוע', view.eventType],
    ['אורחים', String(view.guestCount)],
    ['תאריך', view.dateLabel],
    ['אזור', view.regionLabel],
    ['תקציב', view.budgetLabel],
    ['הכשר', view.kashrutLabel],
    ['חובה', view.mustHaves.join(', ')],
    ['הערות', view.notes || ''],
    ['מי מבקש', view.requesterType === 'producer' ? 'מפיק/ה, בשביל לקוח' : 'לקוח פרטי'],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <span className={styles.badge}>בקשה מ-MULTIBRAWN</span>
        <h1 className={styles.title}>יש לקוח שמתאים לכם</h1>
        <p className={styles.lead}>
          {view.venueName}: ערדית בדקה את הבקשה לפני ששלחה אותה. נשאר רק לענות, פנוי או לא.
        </p>

        <dl className={styles.facts}>
          {facts.map(([k, v]) => (
            <div key={k} className={styles.fact}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>

        {view.closed ? (
          <p className={styles.ok}>הבקשה הזו כבר נסגרה. תודה!</p>
        ) : saved ? (
          <>
            <p className={styles.ok} role="status">
              {choice === 'available'
                ? 'התשובה נשמרה. ערדית תחזור אליכם לתיאום פגישה עם הלקוח.'
                : 'התשובה נשמרה. תודה שעניתם, נתראה בבקשה הבאה.'}
            </p>
            <button type="button" className={styles.secondary} onClick={() => setSaved(false)}>עדכון התשובה</button>
          </>
        ) : (
          <form noValidate onSubmit={e => { e.preventDefault(); submit(); }}>
            <fieldset className={styles.group}>
              <legend className={styles.question}>התאריך פנוי אצלכם?</legend>
              <div className={styles.chips}>
                <button type="button" aria-pressed={choice === 'available'}
                  className={`${styles.chip} ${choice === 'available' ? styles.chipOn : ''}`}
                  onClick={() => { setChoice('available'); setError(''); }}>פנוי</button>
                <button type="button" aria-pressed={choice === 'unavailable'}
                  className={`${styles.chip} ${choice === 'unavailable' ? styles.chipOn : ''}`}
                  onClick={() => { setChoice('unavailable'); setError(''); }}>לא פנוי</button>
              </div>
            </fieldset>

            {choice === 'available' && (
              <div className={styles.group}>
                <label className={styles.question} htmlFor="reply-price">מחיר</label>
                <input id="reply-price" className={styles.input} type="text" maxLength={200}
                  placeholder="למשל: 320 ₪ למנה, מינימום 200 מנות"
                  value={price} onChange={e => { setPrice(e.target.value); setError(''); }} />
              </div>
            )}

            {choice && (
              <div className={styles.group}>
                <label className={styles.question} htmlFor="reply-note">
                  הערה <span className={styles.optional}>לא חובה</span>
                </label>
                <textarea id="reply-note" className={styles.textarea} rows={3} maxLength={500}
                  placeholder={choice === 'available' ? 'מה כלול, תנאים, תאריך חלופי' : 'יש תאריך קרוב אחר שפנוי?'}
                  value={note} onChange={e => setNote(e.target.value)} />
              </div>
            )}

            {error && <p className={styles.error} role="alert">{error}</p>}

            <div className={styles.actions}>
              <span />
              <button type="submit" className={styles.primary} disabled={sending}>
                {sending ? 'שולחים...' : 'שליחת התשובה'}
              </button>
            </div>
          </form>
        )}

        <p className={styles.fine}>
          אם פנוי, ערדית מתאמת מולכם פגישה עם הלקוח. הקישור הזה אישי למקום שלכם.
        </p>
      </div>
    </main>
  );
}
