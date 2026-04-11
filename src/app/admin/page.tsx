'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Admin.module.css';

const ADMIN_SECRET = 'multibrawn-admin-2025';

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
type AdminTab = 'dashboard' | 'leads' | 'events' | 'blog' | 'properties';

interface Lead {
  id: string; created_at: string; name: string | null; phone: string | null;
  property_type: string | null; location: string | null; dates: string | null;
  guest_count: string | null; budget: string | null; flow_type: string | null;
  source: string | null; status: LeadStatus; notes: string | null; whatsapp_sent: boolean;
}
interface BlogPost {
  id: string; created_at: string; title: string; slug: string;
  excerpt: string | null; category: string | null; image_url: string | null;
  body: string | null; published: boolean;
}
interface Property {
  id: string; created_at: string; title: string; type: string | null;
  location: string | null; description: string | null; image_url: string | null;
  price_per_night: number | null; max_guests: number | null;
  whatsapp_text: string | null; active: boolean;
}
interface Stats {
  totalLeads: number; todayLeads: number; weekLeads: number; monthLeads: number;
  newLeads: number; convertedLeads: number; whatsappSent: number;
  todayEvents: number; chatbotOpens: number; whatsappClicks: number;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'חדש', contacted: 'פנו אליו', qualified: 'מתאים', converted: 'הומר', lost: 'אבוד',
};
const STATUS_COLORS: Record<LeadStatus, string> = {
  new: '#00E0FF', contacted: '#A06BFF', qualified: '#FFD700', converted: '#00FF88', lost: '#FF5EA1',
};

function fmt(d: string) {
  return new Date(d).toLocaleString('he-IL', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}

/* ─── Blog Form Modal ─────────────────────────────── */
function BlogForm({ post, adminKey, onSave, onClose }: {
  post: BlogPost | null; adminKey: string;
  onSave: (p: BlogPost) => void; onClose: () => void;
}) {
  const blank = { title: '', slug: '', excerpt: '', category: 'מדריכים', image_url: '', body: '', published: false };
  const [form, setForm] = useState(post ? {
    title: post.title, slug: post.slug, excerpt: post.excerpt || '',
    category: post.category || 'מדריכים', image_url: post.image_url || '',
    body: post.body || '', published: post.published,
  } : blank);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const slug = (t: string) => t.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '').slice(0, 80);

  const save = async () => {
    if (!form.title.trim()) { setErr('כותרת חובה'); return; }
    setSaving(true); setErr('');
    const payload = { ...form, slug: form.slug || slug(form.title) };
    const res = await fetch(post ? `/api/admin/blog/${post.id}` : '/api/admin/blog', {
      method: post ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminKey },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error || 'שגיאה'); setSaving(false); return; }
    onSave(data.post); setSaving(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalBox}>
        <h2 className={styles.modalTitle}>{post ? '✏️ עריכת כתבה' : '📝 כתבה חדשה'}</h2>
        {err && <div className={styles.errorBanner}>{err}</div>}
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>כותרת *</label>
            <input className={styles.formInput} value={form.title} placeholder="כותרת הכתבה"
              onChange={e => { set('title', e.target.value); if (!post) set('slug', slug(e.target.value)); }} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Slug (URL)</label>
            <input className={styles.formInput} value={form.slug} placeholder="my-post-slug" onChange={e => set('slug', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>קטגוריה</label>
            <select className={styles.formSelect} value={form.category} onChange={e => set('category', e.target.value)}>
              {['מדריכים', 'טיפים', 'יעדים', 'אירועים', 'חו"ל', 'וידאו'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>תקציר קצר</label>
            <input className={styles.formInput} value={form.excerpt} placeholder="משפט קצר על הכתבה" onChange={e => set('excerpt', e.target.value)} />
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>כתובת תמונה (URL)</label>
            <input className={styles.formInput} value={form.image_url} placeholder="https://..." onChange={e => set('image_url', e.target.value)} />
            {form.image_url && <img src={form.image_url} alt="" className={styles.imagePreview} onError={e => { (e.currentTarget as any).style.display = 'none'; }} />}
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>תוכן הכתבה</label>
            <textarea className={styles.formTextarea} value={form.body} rows={10}
              placeholder="כתוב את תוכן הכתבה כאן..." onChange={e => set('body', e.target.value)} style={{ minHeight: 200 }} />
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>פרסם באתר</span>
              <button type="button" className={`${styles.toggle} ${form.published ? styles.toggleOn : ''}`} onClick={() => set('published', !form.published)} />
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.saveBtn} onClick={save} disabled={saving}>{saving ? 'שומר...' : '💾 שמור'}</button>
          <button className={styles.cancelBtn} onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Property Form Modal ─────────────────────────── */
function PropertyForm({ property, adminKey, onSave, onClose }: {
  property: Property | null; adminKey: string;
  onSave: (p: Property) => void; onClose: () => void;
}) {
  const [form, setForm] = useState({
    title: property?.title || '', type: property?.type || 'zimmer',
    location: property?.location || '', description: property?.description || '',
    image_url: property?.image_url || '',
    price_per_night: property?.price_per_night?.toString() || '',
    max_guests: property?.max_guests?.toString() || '',
    whatsapp_text: property?.whatsapp_text || '', active: property?.active ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState('');
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title.trim()) { setErr('שם הנכס חובה'); return; }
    setSaving(true); setErr('');
    const payload = { ...form, price_per_night: form.price_per_night ? +form.price_per_night : null, max_guests: form.max_guests ? +form.max_guests : null };
    const res = await fetch(property ? `/api/admin/properties/${property.id}` : '/api/admin/properties', {
      method: property ? 'PATCH' : 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminKey },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) { setErr(data.error || 'שגיאה'); setSaving(false); return; }
    onSave(data.property); setSaving(false);
  };

  return (
    <div className={styles.modalOverlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modalBox}>
        <h2 className={styles.modalTitle}>{property ? '✏️ עריכת נכס' : '🏠 נכס חדש'}</h2>
        {err && <div className={styles.errorBanner}>{err}</div>}
        <div className={styles.formGrid}>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>שם הנכס *</label>
            <input className={styles.formInput} value={form.title} placeholder="שם הנכס" onChange={e => set('title', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>סוג נכס</label>
            <select className={styles.formSelect} value={form.type} onChange={e => set('type', e.target.value)}>
              {[['zimmer','צימר'],['villa','וילה'],['events','מתחם אירועים'],['shabbat_hatan','שבת חתן'],['international','בינלאומי']].map(([v,l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>אזור / מיקום</label>
            <input className={styles.formInput} value={form.location} placeholder="גליל, ירושלים..." onChange={e => set('location', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>מחיר ללילה (₪)</label>
            <input className={styles.formInput} type="number" value={form.price_per_night} placeholder="1500" onChange={e => set('price_per_night', e.target.value)} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>מקסימום אורחים</label>
            <input className={styles.formInput} type="number" value={form.max_guests} placeholder="10" onChange={e => set('max_guests', e.target.value)} />
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>תיאור הנכס</label>
            <textarea className={styles.formTextarea} value={form.description} rows={4} placeholder="תיאור הנכס..." onChange={e => set('description', e.target.value)} />
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>כתובת תמונה (URL)</label>
            <input className={styles.formInput} value={form.image_url} placeholder="https://..." onChange={e => set('image_url', e.target.value)} />
            {form.image_url && <img src={form.image_url} alt="" className={styles.imagePreview} onError={e => { (e.currentTarget as any).style.display = 'none'; }} />}
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <label className={styles.formLabel}>טקסט WhatsApp (לפנייה ראשונה)</label>
            <input className={styles.formInput} value={form.whatsapp_text} placeholder="שלום, מתעניין ב..." onChange={e => set('whatsapp_text', e.target.value)} />
          </div>
          <div className={`${styles.formGroup} ${styles.formFull}`}>
            <div className={styles.toggleRow}>
              <span className={styles.toggleLabel}>פעיל באתר</span>
              <button type="button" className={`${styles.toggle} ${form.active ? styles.toggleOn : ''}`} onClick={() => set('active', !form.active)} />
            </div>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button className={styles.saveBtn} onClick={save} disabled={saving}>{saving ? 'שומר...' : '💾 שמור'}</button>
          <button className={styles.cancelBtn} onClick={onClose}>ביטול</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Admin Dashboard ────────────────────────── */
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editPost, setEditPost] = useState<BlogPost | null | undefined>(undefined);

  const [properties, setProperties] = useState<Property[]>([]);
  const [editProperty, setEditProperty] = useState<Property | null | undefined>(undefined);

  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) { setAdminKey(saved); setIsAuthenticated(true); }
  }, []);

  const fetchCRM = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true); setError('');
    try {
      const res = await fetch(`/api/admin/stats?key=${adminKey}`);
      if (res.status === 401) { setIsAuthenticated(false); sessionStorage.removeItem('admin_key'); return; }
      if (!res.ok) throw new Error('שגיאה');
      const data = await res.json();
      setStats(data.stats); setLeads(data.recentLeads ?? []); setEvents(data.recentEvents ?? []);
    } catch (e: any) { setError(e.message); }
    finally { setLoading(false); }
  }, [adminKey]);

  const fetchBlog = useCallback(async () => {
    if (!adminKey) return;
    const res = await fetch(`/api/admin/blog?key=${adminKey}`);
    if (res.ok) { const d = await res.json(); setPosts(d.posts ?? []); }
  }, [adminKey]);

  const fetchProperties = useCallback(async () => {
    if (!adminKey) return;
    const res = await fetch(`/api/admin/properties?key=${adminKey}`);
    if (res.ok) { const d = await res.json(); setProperties(d.properties ?? []); }
  }, [adminKey]);

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchCRM(); fetchBlog(); fetchProperties();
  }, [isAuthenticated, fetchCRM, fetchBlog, fetchProperties]);

  const handleLogin = () => {
    if (keyInput === ADMIN_SECRET) {
      sessionStorage.setItem('admin_key', keyInput);
      setAdminKey(keyInput); setIsAuthenticated(true); setAuthError('');
    } else setAuthError('מפתח שגוי');
  };

  const updateLeadStatus = async (id: string, status: LeadStatus) => {
    await fetch(`/api/admin/leads/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminKey },
      body: JSON.stringify({ status }),
    });
    setLeads(p => p.map(l => l.id === id ? { ...l, status } : l));
  };

  const deletePost = async (id: string) => {
    if (!confirm('למחוק את הכתבה?')) return;
    await fetch(`/api/admin/blog/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': adminKey } });
    setPosts(p => p.filter(x => x.id !== id));
  };

  const deleteProperty = async (id: string) => {
    if (!confirm('למחוק את הנכס?')) return;
    await fetch(`/api/admin/properties/${id}`, { method: 'DELETE', headers: { 'x-admin-secret': adminKey } });
    setProperties(p => p.filter(x => x.id !== id));
  };

  const filteredLeads = leads.filter(l => {
    const s = search.toLowerCase();
    return (!search || l.name?.toLowerCase().includes(s) || l.phone?.includes(search) || l.location?.toLowerCase().includes(s))
      && (statusFilter === 'all' || l.status === statusFilter);
  });

  /* ── Login Screen ── */
  if (!isAuthenticated) return (
    <div className={styles.loginWrapper} dir="rtl">
      <div className={styles.loginBox}>
        <div className={styles.loginLogo}>MULTIBRAWN</div>
        <h1 className={styles.loginTitle}>ניהול האתר</h1>
        <p className={styles.loginSubtitle}>הזן מפתח גישה להמשך</p>
        <input type="password" className={styles.loginInput} placeholder="מפתח ניהול..."
          value={keyInput} onChange={e => { setKeyInput(e.target.value); setAuthError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus />
        {authError && <p className={styles.loginError}>{authError}</p>}
        <button className={styles.loginButton} onClick={handleLogin}>כניסה</button>
      </div>
    </div>
  );

  /* ── Dashboard ── */
  return (
    <div className={styles.dashboard} dir="rtl">

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerLogo}>MULTIBRAWN</span>
          <span className={styles.headerTitle}>ניהול האתר</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.refreshButton} disabled={loading}
            onClick={() => { fetchCRM(); fetchBlog(); fetchProperties(); }}>
            {loading ? '...' : '↻ רענן'}
          </button>
          <button className={styles.logoutButton} onClick={() => {
            sessionStorage.removeItem('admin_key'); setIsAuthenticated(false); setAdminKey('');
          }}>יציאה</button>
        </div>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {/* Stats Bar */}
      {stats && (
        <section className={styles.statsGrid}>
          {[
            { v: stats.totalLeads,     l: 'סה"כ לידים',        c: '' },
            { v: stats.todayLeads,     l: 'לידים היום',         c: '#00E0FF' },
            { v: stats.newLeads,       l: 'חדשים',              c: '#FFD700' },
            { v: stats.convertedLeads, l: 'הומרו',              c: '#00FF88' },
            { v: posts.length,         l: 'כתבות',              c: '#A06BFF' },
            { v: posts.filter(p=>p.published).length, l: 'פורסמו', c: '#00FF88' },
            { v: properties.length,    l: 'נכסים',              c: '#A06BFF' },
            { v: properties.filter(p=>p.active).length, l: 'נכסים פעילים', c: '#00E0FF' },
            { v: stats.whatsappClicks, l: 'קליקי WhatsApp',     c: '#25D366' },
            { v: stats.chatbotOpens,   l: 'פתיחות צ\'אט',       c: '#FF5EA1' },
          ].map(({ v, l, c }) => (
            <div key={l} className={styles.statCard}>
              <div className={styles.statValue} style={c ? { color: c } : {}}>{v}</div>
              <div className={styles.statLabel}>{l}</div>
            </div>
          ))}
        </section>
      )}

      {/* Tabs */}
      <div className={styles.tabs}>
        {([
          ['dashboard',   '📊 לוח בקרה'],
          ['leads',       `📋 לידים (${leads.length})`],
          ['blog',        `📝 בלוג (${posts.length})`],
          ['properties',  `🏠 נכסים (${properties.length})`],
          ['events',      '📡 אירועים'],
        ] as [AdminTab, string][]).map(([t, l]) => (
          <button key={t}
            className={`${styles.tab} ${activeTab === t ? styles.tabActive : ''}`}
            onClick={() => setActiveTab(t)}>{l}
          </button>
        ))}
      </div>

      {/* ── Dashboard Tab ── */}
      {activeTab === 'dashboard' && (
        <section className={styles.section}>
          <p style={{ color: '#7a6a9a', fontSize: '0.95rem', margin: '0 0 1.5rem' }}>
            ברוך הבא לממשק הניהול של MULTIBRAWN. השתמש בלשוניות לניהול לידים, כתבות ונכסים.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/" target="_blank" style={linkStyle('#A06BFF')}>← עמוד הבית</a>
            <a href="/blog" target="_blank" style={linkStyle('#00E0FF')}>← בלוג</a>
            <a href="/gallery" target="_blank" style={linkStyle('#FF5EA1')}>← גלריה</a>
            <a href="/multi-global" target="_blank" style={linkStyle('#FFD700')}>← Multi-Global</a>
          </div>
        </section>
      )}

      {/* ── Leads Tab ── */}
      {activeTab === 'leads' && (
        <section className={styles.section}>
          <div className={styles.filters}>
            <input type="text" className={styles.searchInput} placeholder="חפש שם, טלפון, מיקום..."
              value={search} onChange={e => setSearch(e.target.value)} />
            <div className={styles.statusTabs}>
              {(['all','new','contacted','qualified','converted','lost'] as const).map(s => (
                <button key={s}
                  className={`${styles.statusTab} ${statusFilter === s ? styles.statusTabActive : ''}`}
                  onClick={() => setStatusFilter(s)}>
                  {s === 'all' ? 'הכל' : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          {loading ? <div className={styles.loadingText}>טוען...</div>
            : filteredLeads.length === 0 ? <div className={styles.emptyText}>אין לידים</div>
            : (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead><tr>
                    <th>תאריך</th><th>שם</th><th>טלפון</th><th>סוג</th>
                    <th>מיקום</th><th>תקציב</th><th>סטטוס</th><th>פעולות</th>
                  </tr></thead>
                  <tbody>
                    {filteredLeads.map(lead => (
                      <tr key={lead.id} className={styles.tableRow}>
                        <td className={styles.dateCell}>{fmt(lead.created_at)}</td>
                        <td className={styles.nameCell}>{lead.name || '-'}</td>
                        <td>{lead.phone
                          ? <a href={`https://wa.me/972${lead.phone.replace(/^0/,'')}`} target="_blank" rel="noopener noreferrer" className={styles.phoneLink}>{lead.phone}</a>
                          : '-'}
                        </td>
                        <td><span className={styles.flowBadge}>{lead.property_type || lead.flow_type || '-'}</span></td>
                        <td>{lead.location || '-'}</td>
                        <td>{lead.budget || '-'}</td>
                        <td>
                          <select className={styles.statusSelect} value={lead.status}
                            style={{ color: STATUS_COLORS[lead.status] }}
                            onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}>
                            {(Object.keys(STATUS_LABELS) as LeadStatus[]).map(s => (
                              <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                            ))}
                          </select>
                        </td>
                        <td>{lead.phone && (
                          <a href={`https://wa.me/972${lead.phone.replace(/^0/,'')}?text=${encodeURIComponent(`שלום ${lead.name||''} מ-MULTIBRAWN`)}`}
                            target="_blank" rel="noopener noreferrer" className={styles.actionButton}>פנה</a>
                        )}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
        </section>
      )}

      {/* ── Blog Tab ── */}
      {activeTab === 'blog' && (
        <section className={styles.section}>
          <div className={styles.contentHeader}>
            <h2 className={styles.sectionTitle}>כתבות בלוג</h2>
            <button className={styles.addButton} onClick={() => setEditPost(null)}>+ כתבה חדשה</button>
          </div>
          {posts.length === 0
            ? <div className={styles.emptyText}>אין כתבות עדיין — לחץ "+ כתבה חדשה" כדי להתחיל</div>
            : (
              <div className={styles.contentGrid}>
                {posts.map(post => (
                  <div key={post.id} className={styles.contentCard}>
                    {post.image_url
                      ? <img src={post.image_url} alt={post.title} className={styles.contentCardImage}
                          onError={e => { (e.currentTarget as any).style.display='none'; }} />
                      : <div className={styles.contentCardImagePlaceholder}>📝</div>}
                    <div className={styles.contentCardBody}>
                      <h3 className={styles.contentCardTitle}>{post.title}</h3>
                      <div className={styles.contentCardMeta}>
                        {post.category && <span>{post.category}</span>}
                        <span className={`${styles.publishedBadge} ${post.published ? styles.publishedBadgeOn : styles.publishedBadgeOff}`}>
                          {post.published ? 'פורסם' : 'טיוטה'}
                        </span>
                        <span>{fmt(post.created_at)}</span>
                      </div>
                      {post.excerpt && <p style={{ fontSize:'0.8rem', color:'#7a6a9a', margin:'0 0 0.75rem', lineHeight:1.4 }}>{post.excerpt}</p>}
                      <div className={styles.contentCardActions}>
                        <button className={styles.editBtn} onClick={() => setEditPost(post)}>✏️ עריכה</button>
                        <button className={styles.deleteBtn} onClick={() => deletePost(post.id)}>🗑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </section>
      )}

      {/* ── Properties Tab ── */}
      {activeTab === 'properties' && (
        <section className={styles.section}>
          <div className={styles.contentHeader}>
            <h2 className={styles.sectionTitle}>נכסים</h2>
            <button className={styles.addButton} onClick={() => setEditProperty(null)}>+ נכס חדש</button>
          </div>
          {properties.length === 0
            ? <div className={styles.emptyText}>אין נכסים עדיין — לחץ "+ נכס חדש" כדי להתחיל</div>
            : (
              <div className={styles.contentGrid}>
                {properties.map(prop => (
                  <div key={prop.id} className={styles.contentCard}>
                    {prop.image_url
                      ? <img src={prop.image_url} alt={prop.title} className={styles.contentCardImage}
                          onError={e => { (e.currentTarget as any).style.display='none'; }} />
                      : <div className={styles.contentCardImagePlaceholder}>🏠</div>}
                    <div className={styles.contentCardBody}>
                      <h3 className={styles.contentCardTitle}>{prop.title}</h3>
                      <div className={styles.contentCardMeta}>
                        {prop.type && <span>{prop.type}</span>}
                        {prop.location && <span>{prop.location}</span>}
                        {prop.price_per_night && <span>₪{prop.price_per_night.toLocaleString()}/לילה</span>}
                        <span className={`${styles.publishedBadge} ${prop.active ? styles.publishedBadgeOn : styles.publishedBadgeOff}`}>
                          {prop.active ? 'פעיל' : 'לא פעיל'}
                        </span>
                      </div>
                      {prop.description && <p style={{ fontSize:'0.8rem', color:'#7a6a9a', margin:'0 0 0.75rem', lineHeight:1.4 }}>{prop.description.slice(0,100)}{prop.description.length>100?'...':''}</p>}
                      <div className={styles.contentCardActions}>
                        <button className={styles.editBtn} onClick={() => setEditProperty(prop)}>✏️ עריכה</button>
                        <button className={styles.deleteBtn} onClick={() => deleteProperty(prop.id)}>🗑</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
        </section>
      )}

      {/* ── Events Tab ── */}
      {activeTab === 'events' && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>אירועים אחרונים</h2>
          {events.length === 0 ? <div className={styles.emptyText}>אין אירועים</div> : (
            <div className={styles.eventsList}>
              {events.map((ev: any) => (
                <div key={ev.id} className={styles.eventItem}>
                  <div className={styles.eventType}>{ev.event_type}</div>
                  <div className={styles.eventMeta}>
                    <span>{fmt(ev.created_at)}</span>
                    {ev.page && <span className={styles.eventPage}>{ev.page}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ── Modals ── */}
      {editPost !== undefined && (
        <BlogForm post={editPost} adminKey={adminKey}
          onSave={saved => { setPosts(p => { const i = p.findIndex(x=>x.id===saved.id); return i>=0?p.map(x=>x.id===saved.id?saved:x):[saved,...p]; }); setEditPost(undefined); }}
          onClose={() => setEditPost(undefined)} />
      )}
      {editProperty !== undefined && (
        <PropertyForm property={editProperty} adminKey={adminKey}
          onSave={saved => { setProperties(p => { const i = p.findIndex(x=>x.id===saved.id); return i>=0?p.map(x=>x.id===saved.id?saved:x):[saved,...p]; }); setEditProperty(undefined); }}
          onClose={() => setEditProperty(undefined)} />
      )}
    </div>
  );
}

function linkStyle(color: string): React.CSSProperties {
  return { color, textDecoration: 'none', fontSize: '0.875rem', border: `1px solid ${color}40`, padding: '0.5rem 1rem', borderRadius: '8px', transition: 'opacity 0.2s' };
}
