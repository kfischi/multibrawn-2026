'use client';

// MULTIBRAWN CHECK — לשונית הניהול: בקשות של לקוחות, שליחה למקומות, וניהול המקומות הפעילים.

import { useCallback, useEffect, useState } from 'react';
import admin from './Admin.module.css';
import css from './CheckPanel.module.css';
import type { ToastMsg } from './Toast';
import type { CheckRequest, CheckRequestVenue, CheckVenue } from '@/lib/check/types';
import {
  MAX_VENUES_PER_REQUEST, REGIONS, REQUEST_STATUSES, SERVICE_FEE_NIS, VENUE_KASHRUT_OPTIONS,
  kashrutLabel, regionLabel, requestStatusLabel, whatsappLink,
} from '@/lib/check/constants';
import type { RequestStatus } from '@/lib/check/constants';

interface Props {
  adminKey: string;
  addToast: (text: string, type?: ToastMsg['type']) => void;
}

type MatchVenue = Pick<CheckVenue,
  'id' | 'name' | 'venue_type' | 'city' | 'region' | 'capacity_text' | 'kashrut' | 'kashrut_raw' |
  'kashrut_verified' | 'contact_name' | 'contact_phone' | 'agreement_signed' | 'active'
> & { kashrutMatch: 'exact' | 'unknown' | 'other' | 'na' };

const RESPONSE_LABEL: Record<CheckRequestVenue['response'], string> = {
  pending: 'ממתין לתשובה', available: 'פנוי', unavailable: 'לא פנוי',
};

export function CheckPanel({ adminKey, addToast }: Props) {
  const [view, setView] = useState<'requests' | 'venues'>('requests');
  const [setupError, setSetupError] = useState('');

  // כל הקריאות עוברות דרך כאן: המפתח בכותרת, ושגיאות הגדרה מוצגות פעם אחת למעלה.
  const api = useCallback(async (path: string, init?: RequestInit) => {
    const res = await fetch(path, {
      ...init,
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminKey, ...(init?.headers || {}) },
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 503 && data.code) setSetupError(data.error);
    if (!res.ok) throw new Error(data.error || 'שגיאה');
    return data;
  }, [adminKey]);

  return (
    <section className={admin.section}>
      <div className={admin.statusTabs} style={{ marginBottom: '1.25rem' }}>
        <button className={`${admin.statusTab} ${view === 'requests' ? admin.statusTabActive : ''}`} onClick={() => setView('requests')}>בקשות</button>
        <button className={`${admin.statusTab} ${view === 'venues' ? admin.statusTabActive : ''}`} onClick={() => setView('venues')}>מקומות</button>
        <a className={admin.statusTab} href="/check" target="_blank" rel="noreferrer">השאלון ↗</a>
      </div>

      {setupError ? (
        <div className={css.setup}>
          <strong>CHECK עדיין לא מוגדר.</strong>
          <p>{setupError}</p>
          <p>ההוראות המלאות לכפיר נמצאות בקובץ CHECK-README.md.</p>
        </div>
      ) : view === 'requests' ? (
        <Requests api={api} addToast={addToast} />
      ) : (
        <Venues api={api} addToast={addToast} />
      )}
    </section>
  );
}

type Api = (path: string, init?: RequestInit) => Promise<any>;
interface SubProps { api: Api; addToast: Props['addToast']; }

/* ───────────────────────── בקשות ───────────────────────── */

function Requests({ api, addToast }: SubProps) {
  const [requests, setRequests] = useState<CheckRequest[] | null>(null);
  const [filter, setFilter] = useState<RequestStatus | 'all'>('all');
  const [matchFor, setMatchFor] = useState<string | null>(null);

  const load = useCallback(async () => {
    try { setRequests((await api('/api/admin/check/requests')).requests); }
    catch (e: any) { setRequests([]); addToast(e.message, 'error'); }
  }, [api, addToast]);

  useEffect(() => { load(); }, [load]);

  const patch = async (id: string, body: Record<string, unknown>, ok?: string) => {
    try {
      await api(`/api/admin/check/requests/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
      if (ok) addToast(ok);
      await load();
    } catch (e: any) { addToast(e.message, 'error'); }
  };

  const patchVenueRow = async (id: string, body: Record<string, unknown>, ok?: string) => {
    try {
      await api(`/api/admin/check/request-venues/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
      if (ok) addToast(ok);
      await load();
    } catch (e: any) { addToast(e.message, 'error'); }
  };

  if (!requests) return <div className={admin.loadingText}>טוען...</div>;

  const shown = filter === 'all' ? requests : requests.filter(r => r.status === filter);
  const count = (s: RequestStatus) => requests.filter(r => r.status === s).length;

  return (
    <>
      <div className={admin.statusTabs} style={{ marginBottom: '1rem' }}>
        <button className={`${admin.statusTab} ${filter === 'all' ? admin.statusTabActive : ''}`} onClick={() => setFilter('all')}>הכל ({requests.length})</button>
        {REQUEST_STATUSES.map(s => (
          <button key={s.value} className={`${admin.statusTab} ${filter === s.value ? admin.statusTabActive : ''}`} onClick={() => setFilter(s.value)}>
            {s.label} ({count(s.value)})
          </button>
        ))}
      </div>

      {shown.length === 0 && (
        <div className={admin.emptyText}>
          {requests.length === 0 ? 'עוד אין בקשות. שולחים ללקוח את הקישור multibrawn.co.il/check' : 'אין בקשות בסטטוס הזה'}
        </div>
      )}

      <div className={css.list}>
        {shown.map(r => (
          <RequestCard
            key={r.id} r={r} api={api} addToast={addToast}
            matching={matchFor === r.id}
            onToggleMatch={() => setMatchFor(matchFor === r.id ? null : r.id)}
            onPatch={patch} onPatchVenueRow={patchVenueRow}
            onSent={async () => { setMatchFor(null); await load(); }}
          />
        ))}
      </div>
    </>
  );
}

function RequestCard({ r, api, addToast, matching, onToggleMatch, onPatch, onPatchVenueRow, onSent }: SubProps & {
  r: CheckRequest;
  matching: boolean;
  onToggleMatch: () => void;
  onPatch: (id: string, body: Record<string, unknown>, ok?: string) => Promise<void>;
  onPatchVenueRow: (id: string, body: Record<string, unknown>, ok?: string) => Promise<void>;
  onSent: () => Promise<void>;
}) {
  const sent = r.venues ?? [];
  const canSend = r.status !== 'new' && r.status !== 'rejected' && sent.length < MAX_VENUES_PER_REQUEST;
  const firstName = r.name.split(' ')[0];
  const approvedMsg =
    `היי ${firstName}, כאן ערדית מ-MULTIBRAWN.\nהבקשה שלך אושרה:\n${r.summary}\n\n` +
    `אני שולחת לך עכשיו קישור לתשלום דמי השירות (${SERVICE_FEE_NIS} ₪). אחרי התשלום הבקשה יוצאת למקומות המתאימים.`;
  const customerWa = whatsappLink(r.phone, r.status === 'approved' && !r.fee_paid ? approvedMsg : undefined);

  return (
    <article className={css.card}>
      <header className={css.cardHead}>
        <span className={`${css.status} ${css[`status_${r.status}`] || ''}`}>{requestStatusLabel(r.status)}</span>
        <span className={css.muted}>{new Date(r.created_at).toLocaleString('he-IL', { dateStyle: 'short', timeStyle: 'short' })}</span>
        {r.requester_type === 'producer' && <span className={admin.flowBadge}>מפיק/ה{r.business_name ? `: ${r.business_name}` : ''}</span>}
      </header>

      <p className={css.summary}>{r.summary}</p>
      {r.notes && <p className={css.note}>הערת הלקוח: {r.notes}</p>}

      <div className={css.rowWrap}>
        <strong>{r.name}</strong>
        <a className={admin.phoneLink} href={`tel:${r.phone}`} dir="ltr">{r.phone}</a>
        {customerWa && <a className={admin.actionButton} href={customerWa} target="_blank" rel="noreferrer">וואטסאפ ללקוח</a>}
        <label className={css.check}>
          <input type="checkbox" checked={r.fee_paid} onChange={e => onPatch(r.id, { fee_paid: e.target.checked }, e.target.checked ? 'סומן: שולם' : 'סומן: לא שולם')} />
          שולמו דמי שירות ({SERVICE_FEE_NIS} ₪)
        </label>
      </div>

      <div className={css.rowWrap}>
        {r.status === 'new' && (
          <>
            <button className={admin.saveBtn} onClick={() => onPatch(r.id, { status: 'approved' }, 'הבקשה אושרה')}>אישור הבקשה</button>
            <button className={admin.cancelBtn} onClick={() => onPatch(r.id, { status: 'rejected' }, 'הבקשה נדחתה')}>לא מתאים</button>
          </>
        )}
        {canSend && (
          <button className={admin.saveBtn} onClick={() => {
            if (!matching && !r.fee_paid && !window.confirm('דמי השירות עוד לא סומנו כשולמו. להמשיך בכל זאת?')) return;
            onToggleMatch();
          }}>
            {matching ? 'סגירת הרשימה' : `בחירת מקומות (${sent.length}/${MAX_VENUES_PER_REQUEST})`}
          </button>
        )}
        {r.status !== 'new' && (
          <select className={admin.statusSelect} value={r.status} aria-label="סטטוס הבקשה"
            onChange={e => onPatch(r.id, { status: e.target.value }, 'הסטטוס עודכן')}>
            {REQUEST_STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        )}
      </div>

      {matching && <MatchPicker request={r} api={api} addToast={addToast} onSent={onSent} />}

      {sent.length > 0 && (
        <div className={css.sent}>
          {sent.map(rv => <SentRow key={rv.id} rv={rv} request={r} addToast={addToast} onPatch={onPatchVenueRow} />)}
        </div>
      )}
    </article>
  );
}

function MatchPicker({ request, api, addToast, onSent }: SubProps & { request: CheckRequest; onSent: () => Promise<void> }) {
  const [venues, setVenues] = useState<MatchVenue[] | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const already = new Set((request.venues ?? []).map(v => v.venue_id));
  const room = MAX_VENUES_PER_REQUEST - already.size;

  useEffect(() => {
    api(`/api/admin/check/requests/${request.id}/matches`)
      .then(d => setVenues(d.venues))
      .catch((e: any) => { setVenues([]); addToast(e.message, 'error'); });
  }, [api, addToast, request.id]);

  const toggle = (id: string) =>
    setPicked(p => p.includes(id) ? p.filter(x => x !== id) : p.length < room ? [...p, id] : p);

  const send = async () => {
    setBusy(true);
    try {
      await api(`/api/admin/check/requests/${request.id}/send`, { method: 'POST', body: JSON.stringify({ venueIds: picked }) });
      addToast('הקישורים מוכנים. עכשיו שולחים לכל מקום בוואטסאפ.');
      await onSent();
    } catch (e: any) { addToast(e.message, 'error'); }
    finally { setBusy(false); }
  };

  if (!venues) return <div className={admin.loadingText}>מחפש מקומות מתאימים...</div>;
  const options = venues.filter(v => !already.has(v.id));

  return (
    <div className={css.picker}>
      <p className={css.muted}>
        מקומות פעילים שמתאימים לפי אזור וקיבולת. אפשר לבחור עוד {room}.
      </p>
      {options.length === 0 && (
        <p className={css.note}>אין מקומות פעילים שמתאימים לבקשה הזו. מפעילים מקומות בלשונית "מקומות".</p>
      )}
      {options.map(v => (
        <label key={v.id} className={css.pickRow}>
          <input type="checkbox" checked={picked.includes(v.id)} onChange={() => toggle(v.id)}
            disabled={!picked.includes(v.id) && picked.length >= room} />
          <span className={css.pickName}>{v.name}</span>
          <span className={css.muted}>{[v.city, v.capacity_text].filter(Boolean).join(' · ')}</span>
          {v.kashrutMatch === 'exact' && <span className={css.tagOk}>הכשר תואם{v.kashrut_verified ? ', מאומת' : ''}</span>}
          {v.kashrutMatch === 'unknown' && <span className={css.tagWarn}>הכשר לא ידוע</span>}
          {v.kashrutMatch === 'other' && <span className={css.tagBad}>הכשר אחר: {kashrutLabel(v.kashrut)}</span>}
        </label>
      ))}
      {options.length > 0 && (
        <button className={admin.saveBtn} disabled={busy || picked.length === 0} onClick={send}>
          {busy ? 'יוצר...' : `יצירת קישורים ל-${picked.length} מקומות`}
        </button>
      )}
    </div>
  );
}

function SentRow({ rv, request, addToast, onPatch }: {
  rv: CheckRequestVenue;
  request: CheckRequest;
  addToast: Props['addToast'];
  onPatch: (id: string, body: Record<string, unknown>, ok?: string) => Promise<void>;
}) {
  const link = typeof window !== 'undefined' ? `${window.location.origin}/check/reply/${rv.token}` : '';
  const hello = rv.venue?.contact_name ? `שלום ${rv.venue.contact_name}` : 'שלום';
  const message =
    `${hello}, כאן ערדית מ-MULTIBRAWN.\nיש לי לקוח שמתאים לכם:\n${request.summary}\n\n` +
    `פנוי אצלכם? עונים כאן בחצי דקה:\n${link}`;
  const wa = whatsappLink(rv.venue?.contact_phone, message);

  const copy = async () => {
    try { await navigator.clipboard.writeText(message); addToast('ההודעה הועתקה'); }
    catch { addToast('לא הצלחתי להעתיק. אפשר לסמן ולהעתיק ידנית.', 'error'); }
  };

  const manual = (response: 'available' | 'unavailable') => {
    if (response === 'unavailable') return onPatch(rv.id, { response, price_text: null }, 'נשמר: לא פנוי');
    const price = window.prompt('איזה מחיר המקום נתן?', rv.price_text || '');
    if (price === null) return;
    if (!price.trim()) { addToast('כשפנוי, צריך מחיר', 'error'); return; }
    return onPatch(rv.id, { response, price_text: price }, 'נשמר: פנוי');
  };

  return (
    <div className={css.sentRow}>
      <div className={css.rowWrap}>
        <strong>{rv.venue?.name ?? 'מקום'}</strong>
        <span className={`${css.status} ${css[`resp_${rv.response}`]}`}>{RESPONSE_LABEL[rv.response]}</span>
        {rv.price_text && <span className={css.price}>{rv.price_text}</span>}
      </div>
      {rv.venue_note && <p className={css.note}>{rv.venue_note}</p>}
      <div className={css.rowWrap}>
        {wa
          ? <a className={admin.actionButton} href={wa} target="_blank" rel="noreferrer">שליחה בוואטסאפ</a>
          : <span className={css.muted}>אין טלפון למקום</span>}
        <button className={css.linkBtn} onClick={copy}>העתקת ההודעה</button>
        <button className={css.linkBtn} onClick={() => manual('available')}>ענה לי: פנוי</button>
        <button className={css.linkBtn} onClick={() => manual('unavailable')}>ענה לי: לא פנוי</button>
        <label className={css.check} title={rv.venue?.agreement_signed ? '' : 'פרטי לקוח עוברים רק למקום עם הסכם חתום'}>
          <input type="checkbox" checked={rv.customer_details_shared} disabled={!rv.venue?.agreement_signed}
            onChange={e => onPatch(rv.id, { customer_details_shared: e.target.checked })} />
          העברתי את פרטי הלקוח{rv.venue?.agreement_signed ? '' : ' (אין הסכם חתום)'}
        </label>
      </div>
    </div>
  );
}

/* ───────────────────────── מקומות ───────────────────────── */

function Venues({ api, addToast }: SubProps) {
  const [venues, setVenues] = useState<CheckVenue[] | null>(null);
  const [activeByRegion, setActiveByRegion] = useState<Record<string, number>>({});
  const [max, setMax] = useState(10);
  const [region, setRegion] = useState('');
  const [activeOnly, setActiveOnly] = useState(false);
  const [q, setQ] = useState('');
  const [editing, setEditing] = useState<string | null>(null);

  const load = useCallback(async () => {
    const sp = new URLSearchParams();
    if (region) sp.set('region', region);
    if (activeOnly) sp.set('active', '1');
    if (q.trim()) sp.set('q', q.trim());
    try {
      const d = await api(`/api/admin/check/venues?${sp}`);
      setVenues(d.venues); setActiveByRegion(d.activeByRegion); setMax(d.maxPerRegion);
    } catch (e: any) { setVenues([]); addToast(e.message, 'error'); }
  }, [api, addToast, region, activeOnly, q]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const save = async (id: string, body: Record<string, unknown>, ok: string) => {
    try {
      await api(`/api/admin/check/venues/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
      addToast(ok);
      await load();
      return true;
    } catch (e: any) { addToast(e.message, 'error'); return false; }
  };

  return (
    <>
      <div className={css.counters}>
        {REGIONS.map(r => {
          const n = activeByRegion[r.value] ?? 0;
          return (
            <span key={r.value} className={`${css.counter} ${n >= max ? css.counterFull : ''}`}>
              {r.label} <strong>{n}/{max}</strong>
            </span>
          );
        })}
      </div>

      <div className={admin.filters}>
        <input className={admin.searchInput} type="text" placeholder="חיפוש לפי שם המקום" value={q} onChange={e => setQ(e.target.value)} />
        <select className={admin.formSelect} value={region} onChange={e => setRegion(e.target.value)} aria-label="אזור">
          <option value="">כל האזורים</option>
          {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          <option value="none">ללא אזור</option>
        </select>
        <label className={css.check}>
          <input type="checkbox" checked={activeOnly} onChange={e => setActiveOnly(e.target.checked)} />
          רק פעילים
        </label>
      </div>

      {!venues ? <div className={admin.loadingText}>טוען...</div>
        : venues.length === 0 ? <div className={admin.emptyText}>לא נמצאו מקומות. אם הרשימה ריקה לגמרי, צריך להריץ את הייבוא (CHECK-README.md).</div>
        : (
          <div className={css.list}>
            {venues.map(v => (
              <article key={v.id} className={`${css.card} ${v.active ? css.cardActive : ''}`}>
                <div className={css.rowWrap}>
                  <button
                    className={`${admin.toggle} ${v.active ? admin.toggleOn : ''}`}
                    role="switch" aria-checked={v.active} aria-label={`${v.name}: פעיל`}
                    onClick={() => save(v.id, { active: !v.active }, v.active ? 'המקום כובה' : 'המקום הופעל')}
                  />
                  <strong>{v.name}</strong>
                  <span className={css.muted}>
                    {[v.venue_type, v.city, regionLabel(v.region) || 'ללא אזור', v.capacity_text].filter(Boolean).join(' · ')}
                  </span>
                  {v.kashrut
                    ? <span className={v.kashrut_verified ? css.tagOk : css.tagWarn}>{kashrutLabel(v.kashrut)}{v.kashrut_verified ? ', מאומת' : ', לא מאומת'}</span>
                    : <span className={css.tagWarn}>הכשר לא ידוע{v.kashrut_raw ? ` (באתר: ${v.kashrut_raw})` : ''}</span>}
                  {v.agreement_signed && <span className={css.tagOk}>הסכם חתום</span>}
                  <button className={css.linkBtn} onClick={() => setEditing(editing === v.id ? null : v.id)}>
                    {editing === v.id ? 'סגירה' : 'עריכה'}
                  </button>
                  {v.source_url && <a className={css.linkBtn} href={v.source_url} target="_blank" rel="noreferrer">העמוד באתר ↗</a>}
                </div>
                {editing === v.id && (
                  <VenueForm v={v} onSave={async body => { if (await save(v.id, body, 'המקום עודכן')) setEditing(null); }} />
                )}
              </article>
            ))}
          </div>
        )}
      {venues && venues.length === 100 && <p className={css.muted}>מוצגים 100 הראשונים. חיפוש או סינון לפי אזור יצמצמו את הרשימה.</p>}
    </>
  );
}

function VenueForm({ v, onSave }: { v: CheckVenue; onSave: (body: Record<string, unknown>) => Promise<void> }) {
  const [f, setF] = useState({
    region: v.region ?? '',
    kashrut: v.kashrut ?? '',
    kashrut_verified: v.kashrut_verified,
    contact_name: v.contact_name ?? '',
    contact_phone: v.contact_phone ?? '',
    agreement_signed: v.agreement_signed,
    virtual_tour_url: v.virtual_tour_url ?? '',
    notes: v.notes ?? '',
  });
  const [busy, setBusy] = useState(false);
  const set = (k: keyof typeof f, val: string | boolean) => setF(p => ({ ...p, [k]: val }));

  return (
    <form className={css.form} onSubmit={async e => {
      e.preventDefault(); setBusy(true);
      await onSave({ ...f, region: f.region || null, kashrut: f.kashrut || null });
      setBusy(false);
    }}>
      <label className={admin.formGroup}>
        <span className={admin.formLabel}>אזור</span>
        <select className={admin.formSelect} value={f.region} onChange={e => set('region', e.target.value)}>
          <option value="">ללא אזור</option>
          {REGIONS.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
        </select>
      </label>
      <label className={admin.formGroup}>
        <span className={admin.formLabel}>הכשר</span>
        <select className={admin.formSelect} value={f.kashrut} onChange={e => set('kashrut', e.target.value)}>
          <option value="">לא ידוע</option>
          {VENUE_KASHRUT_OPTIONS.map(k => <option key={k.value} value={k.value}>{k.label}</option>)}
        </select>
      </label>
      <label className={admin.formGroup}>
        <span className={admin.formLabel}>איש קשר</span>
        <input className={admin.formInput} value={f.contact_name} onChange={e => set('contact_name', e.target.value)} />
      </label>
      <label className={admin.formGroup}>
        <span className={admin.formLabel}>נייד לוואטסאפ</span>
        <input className={admin.formInput} dir="ltr" inputMode="tel" value={f.contact_phone} onChange={e => set('contact_phone', e.target.value)} />
      </label>
      <label className={admin.formGroup}>
        <span className={admin.formLabel}>סיור וירטואלי (קישור)</span>
        <input className={admin.formInput} dir="ltr" value={f.virtual_tour_url} onChange={e => set('virtual_tour_url', e.target.value)} />
      </label>
      <label className={admin.formGroup}>
        <span className={admin.formLabel}>הערות פנימיות</span>
        <input className={admin.formInput} value={f.notes} onChange={e => set('notes', e.target.value)} />
      </label>
      <label className={css.check}>
        <input type="checkbox" checked={f.kashrut_verified} disabled={!f.kashrut} onChange={e => set('kashrut_verified', e.target.checked)} />
        ההכשר אומת מול המקום
      </label>
      <label className={css.check}>
        <input type="checkbox" checked={f.agreement_signed} onChange={e => set('agreement_signed', e.target.checked)} />
        יש הסכם חתום
      </label>
      <button className={admin.saveBtn} type="submit" disabled={busy}>{busy ? 'שומר...' : 'שמירה'}</button>
    </form>
  );
}
