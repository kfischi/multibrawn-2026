'use client';

import { useMemo, useRef, useState } from 'react';
import {
  EVENT_TYPES, KASHRUT_OPTIONS, MUST_HAVES, REGIONS, REGION_ANY, SERVICE_FEE_NIS, buildSummary,
} from '@/lib/check/constants';
import styles from './Check.module.css';

interface FormState {
  requesterType: 'private' | 'producer';
  businessName: string;
  eventType: string;
  eventTypeOther: string;
  eventDate: string;
  dateText: string;
  dateFlexible: boolean;
  guestCount: string;
  region: string;
  budgetAmount: string;
  budgetUnit: 'per_guest' | 'total';
  kashrut: string;
  mustHaves: string[];
  notes: string;
  name: string;
  phone: string;
  website: string; // שדה מלכודת לבוטים, מוסתר מבני אדם
}

const EMPTY: FormState = {
  requesterType: 'private', businessName: '', eventType: '', eventTypeOther: '',
  eventDate: '', dateText: '', dateFlexible: false, guestCount: '',
  region: '', budgetAmount: '', budgetUnit: 'per_guest',
  kashrut: 'any', mustHaves: [], notes: '', name: '', phone: '', website: '',
};

const STEPS = ['האירוע', 'מתי וכמה', 'איפה ותקציב', 'הכשר ודרישות', 'פרטים'] as const;
const OTHER = 'אחר';

function todayIso(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function CheckClient() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [doneSummary, setDoneSummary] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(f => ({ ...f, [key]: value }));
    setError('');
  };

  const eventType = form.eventType === OTHER ? form.eventTypeOther.trim() || OTHER : form.eventType;
  const guestCount = Number(form.guestCount);

  const summary = useMemo(() => {
    if (!form.eventType || !guestCount || !form.region) return '';
    return buildSummary({
      eventType,
      guestCount,
      eventDate: form.eventDate || null,
      dateText: form.eventDate ? null : form.dateText,
      dateFlexible: form.dateFlexible,
      region: form.region,
      budgetAmount: form.budgetAmount ? Number(form.budgetAmount) : null,
      budgetUnit: form.budgetUnit,
      kashrut: form.kashrut,
      mustHaves: form.mustHaves,
    });
  }, [form, eventType, guestCount]);

  function stepError(s: number): string {
    if (s === 0) {
      if (!form.eventType) return 'בחרו סוג אירוע';
      if (form.eventType === OTHER && !form.eventTypeOther.trim()) return 'כתבו איזה אירוע';
    }
    if (s === 1) {
      if (!form.eventDate && !form.dateText.trim()) return 'בחרו תאריך, או כתבו מתי בערך';
      if (form.eventDate && form.eventDate < todayIso()) return 'התאריך כבר עבר';
      if (!Number.isInteger(guestCount) || guestCount < 1 || guestCount > 5000) return 'כמה אורחים?';
    }
    if (s === 2) {
      if (!form.region) return 'בחרו אזור';
      if (form.budgetAmount && (!Number.isInteger(Number(form.budgetAmount)) || Number(form.budgetAmount) < 0))
        return 'התקציב צריך להיות מספר';
    }
    if (s === 4) {
      if (form.name.trim().length < 2) return 'מה השם?';
      const digits = form.phone.replace(/\D/g, '').replace(/^972/, '0');
      if (!/^0\d{8,9}$/.test(digits)) return 'מספר הטלפון לא תקין';
    }
    return '';
  }

  function scrollTop() {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function next() {
    const e = stepError(step);
    if (e) { setError(e); return; }
    setError('');
    setStep(s => s + 1);
    scrollTop();
  }

  function back() {
    setError('');
    setStep(s => Math.max(0, s - 1));
    scrollTop();
  }

  async function submit() {
    const e = stepError(4);
    if (e) { setError(e); return; }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/check/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requesterType: form.requesterType,
          businessName: form.businessName,
          eventType,
          eventDate: form.eventDate,
          dateText: form.dateText,
          dateFlexible: form.dateFlexible,
          guestCount,
          region: form.region,
          budgetAmount: form.budgetAmount ? Number(form.budgetAmount) : null,
          budgetUnit: form.budgetUnit,
          kashrut: form.kashrut,
          mustHaves: form.mustHaves,
          notes: form.notes,
          name: form.name,
          phone: form.phone,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'משהו השתבש. נסו שוב בעוד רגע.');
        return;
      }
      setDoneSummary(data.summary || summary);
      scrollTop();
    } catch {
      setError('אין חיבור. בדקו את האינטרנט ונסו שוב.');
    } finally {
      setSending(false);
    }
  }

  const toggleMust = (m: string) =>
    set('mustHaves', form.mustHaves.includes(m) ? form.mustHaves.filter(x => x !== m) : [...form.mustHaves, m]);

  // ── מסך סיום ──
  if (doneSummary !== null) {
    return (
      <div className={styles.page} ref={topRef}>
        <div className={styles.card}>
          <span className={styles.badge}>הבקשה התקבלה</span>
          <h1 className={styles.title}>תודה, {form.name.trim().split(/\s+/)[0]}.</h1>
          <p className={styles.lead}>זו הבקשה שלכם, כמו שהיא תוצג למקומות:</p>
          <div className={styles.summary}>{doneSummary}</div>
          <ol className={styles.nextList}>
            <li>ערדית עוברת על הבקשה אישית.</li>
            <li>אם היא מתאימה לשירות, תקבלו בוואטסאפ קישור לתשלום דמי השירות ({SERVICE_FEE_NIS} ₪).</li>
            <li>הבקשה יוצאת למקומות המתאימים, ואתם מקבלים תשובות: מי פנוי ובאיזה מחיר.</li>
          </ol>
          <p className={styles.fine}>השם והטלפון שלכם לא מוצגים למקומות בשלב הזה.</p>
        </div>
      </div>
    );
  }

  // ── מסך פתיחה ──
  if (!started) {
    return (
      <div className={styles.page} ref={topRef}>
        <div className={styles.card}>
          <span className={styles.badge}>MULTIBRAWN CHECK</span>
          <h1 className={styles.title}>בקשה אחת. תשובות מהמקומות.</h1>
          <p className={styles.lead}>
            במקום להתקשר למקום אחרי מקום: ממלאים פעם אחת מה אתם מחפשים,
            ואנחנו בודקים מול המקומות המתאימים מי פנוי ובאיזה מחיר.
          </p>
          <ul className={styles.points}>
            <li><strong>2 דקות</strong> למלא</li>
            <li><strong>הכשר מדויק</strong>, לא רק "כשר"</li>
            <li><strong>כל בקשה נבדקת אישית</strong> לפני שהיא יוצאת</li>
          </ul>
          <div className={styles.feeBox}>
            דמי שירות: <strong>{SERVICE_FEE_NIS} ₪</strong>, רק אחרי שהבקשה אושרה. כולל מדריך במתנה.
          </div>
          <button type="button" className={styles.primary} onClick={() => { setStarted(true); scrollTop(); }}>
            מתחילים
          </button>
        </div>
      </div>
    );
  }

  // ── השאלון ──
  return (
    <div className={styles.page} ref={topRef}>
      <form
        className={styles.card}
        noValidate
        onSubmit={e => { e.preventDefault(); step < 4 ? next() : submit(); }}
      >
        <div className={styles.progress} aria-hidden="true">
          {STEPS.map((label, i) => (
            <span key={label} className={`${styles.dot} ${i <= step ? styles.dotOn : ''}`} />
          ))}
        </div>
        <p className={styles.stepLabel}>שלב {step + 1} מתוך {STEPS.length} · {STEPS[step]}</p>

        {step === 0 && (
          <>
            <fieldset className={styles.group}>
              <legend className={styles.question}>מי מבקש?</legend>
              <div className={styles.chips}>
                <Chip on={form.requesterType === 'private'} onClick={() => set('requesterType', 'private')}>אירוע פרטי</Chip>
                <Chip on={form.requesterType === 'producer'} onClick={() => set('requesterType', 'producer')}>מפיק/ה, בשביל לקוח</Chip>
              </div>
              {form.requesterType === 'producer' && (
                <input
                  className={styles.input} type="text" maxLength={80} placeholder="שם העסק (לא חובה)"
                  aria-label="שם העסק" value={form.businessName} onChange={e => set('businessName', e.target.value)}
                />
              )}
            </fieldset>

            <fieldset className={styles.group}>
              <legend className={styles.question}>איזה אירוע?</legend>
              <div className={styles.chips}>
                {EVENT_TYPES.map(t => (
                  <Chip key={t} on={form.eventType === t} onClick={() => set('eventType', t)}>{t}</Chip>
                ))}
              </div>
              {form.eventType === OTHER && (
                <input
                  className={styles.input} type="text" maxLength={60} placeholder="איזה אירוע?"
                  aria-label="סוג האירוע" value={form.eventTypeOther} onChange={e => set('eventTypeOther', e.target.value)}
                />
              )}
            </fieldset>
          </>
        )}

        {step === 1 && (
          <>
            <div className={styles.group}>
              <label className={styles.question} htmlFor="check-date">מתי האירוע?</label>
              <input
                id="check-date" className={styles.input} type="date" min={todayIso()}
                value={form.eventDate} onChange={e => set('eventDate', e.target.value)}
              />
              {!form.eventDate && (
                <input
                  className={styles.input} type="text" maxLength={80}
                  placeholder="אין תאריך מדויק? כתבו מתי בערך. למשל: יום חמישי בנובמבר"
                  aria-label="תאריך בערך" value={form.dateText} onChange={e => set('dateText', e.target.value)}
                />
              )}
              <label className={styles.checkRow}>
                <input type="checkbox" checked={form.dateFlexible} onChange={e => set('dateFlexible', e.target.checked)} />
                <span>התאריך גמיש</span>
              </label>
            </div>

            <div className={styles.group}>
              <label className={styles.question} htmlFor="check-guests">כמה אורחים?</label>
              <input
                id="check-guests" className={styles.input} type="number" inputMode="numeric" min={1} max={5000}
                placeholder="למשל 250" value={form.guestCount} onChange={e => set('guestCount', e.target.value)}
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <fieldset className={styles.group}>
              <legend className={styles.question}>באיזה אזור?</legend>
              <div className={styles.chips}>
                {REGIONS.map(r => (
                  <Chip key={r.value} on={form.region === r.value} onClick={() => set('region', r.value)}>{r.label}</Chip>
                ))}
                <Chip on={form.region === REGION_ANY} onClick={() => set('region', REGION_ANY)}>כל הארץ</Chip>
              </div>
            </fieldset>

            <div className={styles.group}>
              <label className={styles.question} htmlFor="check-budget">
                תקציב <span className={styles.optional}>לא חובה, אבל מקצר את הדרך</span>
              </label>
              <div className={styles.row}>
                <input
                  id="check-budget" className={styles.input} type="number" inputMode="numeric" min={0}
                  placeholder="סכום ב-₪" value={form.budgetAmount} onChange={e => set('budgetAmount', e.target.value)}
                />
                <div className={styles.chips}>
                  <Chip on={form.budgetUnit === 'per_guest'} onClick={() => set('budgetUnit', 'per_guest')}>למנה</Chip>
                  <Chip on={form.budgetUnit === 'total'} onClick={() => set('budgetUnit', 'total')}>לכל האירוע</Chip>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <fieldset className={styles.group}>
              <legend className={styles.question}>איזה הכשר צריך?</legend>
              <div className={styles.chips}>
                {KASHRUT_OPTIONS.map(k => (
                  <Chip key={k.value} on={form.kashrut === k.value} onClick={() => set('kashrut', k.value)}>{k.label}</Chip>
                ))}
              </div>
            </fieldset>

            <fieldset className={styles.group}>
              <legend className={styles.question}>
                מה חובה? <span className={styles.optional}>רק מה שבלעדיו אין אירוע</span>
              </legend>
              <div className={styles.chips}>
                {MUST_HAVES.map(m => (
                  <Chip key={m} on={form.mustHaves.includes(m)} onClick={() => toggleMust(m)}>{m}</Chip>
                ))}
              </div>
            </fieldset>

            <div className={styles.group}>
              <label className={styles.question} htmlFor="check-notes">
                עוד משהו שחשוב שהמקום ידע? <span className={styles.optional}>לא חובה</span>
              </label>
              <textarea
                id="check-notes" className={styles.textarea} rows={3} maxLength={500}
                value={form.notes} onChange={e => set('notes', e.target.value)}
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            {summary && (
              <div className={styles.group}>
                <p className={styles.question}>זו הבקשה שלכם</p>
                <div className={styles.summary}>{summary}</div>
              </div>
            )}
            <div className={styles.group}>
              <label className={styles.question} htmlFor="check-name">שם</label>
              <input
                id="check-name" className={styles.input} type="text" autoComplete="name" maxLength={80}
                value={form.name} onChange={e => set('name', e.target.value)}
              />
            </div>
            <div className={styles.group}>
              <label className={styles.question} htmlFor="check-phone">טלפון נייד</label>
              <input
                id="check-phone" className={styles.input} type="tel" inputMode="tel" autoComplete="tel" dir="ltr"
                placeholder="050-0000000" value={form.phone} onChange={e => set('phone', e.target.value)}
              />
              <p className={styles.fine}>השם והטלפון לא מוצגים למקומות בשלב הבדיקה.</p>
            </div>
            {/* מלכודת בוטים: מחוץ למסך, לא נגיש במקלדת, לא מוקרא */}
            <div className={styles.trap} aria-hidden="true">
              <label>
                אתר
                <input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={e => set('website', e.target.value)} />
              </label>
            </div>
          </>
        )}

        {error && <p className={styles.error} role="alert">{error}</p>}

        <div className={styles.actions}>
          {step > 0 ? (
            <button type="button" className={styles.secondary} onClick={back} disabled={sending}>חזרה</button>
          ) : <span />}
          <button type="submit" className={styles.primary} disabled={sending}>
            {step < 4 ? 'המשך' : sending ? 'שולחים...' : 'שליחת הבקשה'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" className={`${styles.chip} ${on ? styles.chipOn : ''}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}
