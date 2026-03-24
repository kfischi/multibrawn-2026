'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Admin.module.css';

const ADMIN_SECRET = 'multibrawn-admin-2025';

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';

interface Lead {
  id: string;
  created_at: string;
  session_id: string | null;
  name: string | null;
  phone: string | null;
  property_type: string | null;
  location: string | null;
  dates: string | null;
  guest_count: string | null;
  budget: string | null;
  kashrut: string | null;
  supervisor: string | null;
  flow_type: string | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  whatsapp_sent: boolean;
  whatsapp_sent_at: string | null;
}

interface Event {
  id: string;
  created_at: string;
  event_type: string;
  session_id: string | null;
  page: string | null;
  metadata: Record<string, unknown>;
}

interface Stats {
  totalLeads: number;
  todayLeads: number;
  weekLeads: number;
  monthLeads: number;
  newLeads: number;
  convertedLeads: number;
  whatsappSent: number;
  todayEvents: number;
  chatbotOpens: number;
  whatsappClicks: number;
}

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'חדש',
  contacted: 'פנו אליו',
  qualified: 'מתאים',
  converted: 'הומר',
  lost: 'אבוד',
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: '#00E0FF',
  contacted: '#A06BFF',
  qualified: '#FFD700',
  converted: '#00FF88',
  lost: '#FF5EA1',
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString('he-IL', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [keyInput, setKeyInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [stats, setStats] = useState<Stats | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'leads' | 'events'>('leads');

  // Check sessionStorage for saved key
  useEffect(() => {
    const saved = sessionStorage.getItem('admin_key');
    if (saved) {
      setAdminKey(saved);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    if (keyInput === ADMIN_SECRET) {
      sessionStorage.setItem('admin_key', keyInput);
      setAdminKey(keyInput);
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('מפתח שגוי. נסה שנית.');
    }
  };

  const fetchData = useCallback(async () => {
    if (!adminKey) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/stats?key=${adminKey}`);
      if (!res.ok) {
        if (res.status === 401) {
          setIsAuthenticated(false);
          sessionStorage.removeItem('admin_key');
          setAuthError('הפעלה פגה. התחבר שנית.');
          return;
        }
        throw new Error('שגיאה בטעינת הנתונים');
      }
      const data = await res.json();
      setStats(data.stats);
      setLeads(data.recentLeads ?? []);
      setEvents(data.recentEvents ?? []);
    } catch (e: any) {
      setError(e.message || 'שגיאה לא ידועה');
    } finally {
      setLoading(false);
    }
  }, [adminKey]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const updateLeadStatus = async (id: string, status: LeadStatus, notes?: string) => {
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-secret': adminKey,
        },
        body: JSON.stringify({ status, notes }),
      });
      if (!res.ok) throw new Error('Failed to update');
      setLeads(prev =>
        prev.map(l => (l.id === id ? { ...l, status, ...(notes !== undefined ? { notes } : {}) } : l))
      );
    } catch {
      alert('שגיאה בעדכון הסטטוס');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchSearch =
      !search ||
      (lead.name?.toLowerCase().includes(search.toLowerCase())) ||
      (lead.phone?.includes(search)) ||
      (lead.location?.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchSearch && matchStatus;
  });

  // ============================
  // LOGIN SCREEN
  // ============================
  if (!isAuthenticated) {
    return (
      <div className={styles.loginWrapper} dir="rtl">
        <div className={styles.loginBox}>
          <div className={styles.loginLogo}>MULTIBRAWN</div>
          <h1 className={styles.loginTitle}>CRM ניהול לידים</h1>
          <p className={styles.loginSubtitle}>הזן מפתח גישה להמשך</p>
          <input
            type="password"
            className={styles.loginInput}
            placeholder="מפתח ניהול..."
            value={keyInput}
            onChange={e => { setKeyInput(e.target.value); setAuthError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            autoFocus
          />
          {authError && <p className={styles.loginError}>{authError}</p>}
          <button className={styles.loginButton} onClick={handleLogin}>
            כניסה
          </button>
        </div>
      </div>
    );
  }

  // ============================
  // MAIN DASHBOARD
  // ============================
  return (
    <div className={styles.dashboard} dir="rtl">
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.headerLogo}>MULTIBRAWN</span>
          <span className={styles.headerTitle}>לוח בקרה CRM</span>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.refreshButton} onClick={fetchData} disabled={loading}>
            {loading ? '...' : '↻ רענן'}
          </button>
          <button
            className={styles.logoutButton}
            onClick={() => {
              sessionStorage.removeItem('admin_key');
              setIsAuthenticated(false);
              setAdminKey('');
            }}
          >
            יציאה
          </button>
        </div>
      </header>

      {error && <div className={styles.errorBanner}>{error}</div>}

      {/* Stats Cards */}
      {stats && (
        <section className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.totalLeads}</div>
            <div className={styles.statLabel}>סה"כ לידים</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#00E0FF' }}>{stats.todayLeads}</div>
            <div className={styles.statLabel}>היום</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#A06BFF' }}>{stats.weekLeads}</div>
            <div className={styles.statLabel}>השבוע</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.monthLeads}</div>
            <div className={styles.statLabel}>החודש</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#00E0FF' }}>{stats.newLeads}</div>
            <div className={styles.statLabel}>חדשים</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#00FF88' }}>{stats.convertedLeads}</div>
            <div className={styles.statLabel}>הומרו</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#25D366' }}>{stats.whatsappSent}</div>
            <div className={styles.statLabel}>נשלח WhatsApp</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#FFD700' }}>{stats.todayEvents}</div>
            <div className={styles.statLabel}>אירועים היום</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{stats.chatbotOpens}</div>
            <div className={styles.statLabel}>פתיחות צ'אט (חודש)</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue} style={{ color: '#25D366' }}>{stats.whatsappClicks}</div>
            <div className={styles.statLabel}>קליקי WhatsApp (חודש)</div>
          </div>
        </section>
      )}

      {/* Tab Switcher */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'leads' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          לידים ({leads.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'events' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('events')}
        >
          אירועים ({events.length})
        </button>
      </div>

      {/* LEADS TAB */}
      {activeTab === 'leads' && (
        <section className={styles.section}>
          {/* Filters */}
          <div className={styles.filters}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="חפש לפי שם, טלפון, מיקום..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className={styles.statusTabs}>
              {(['all', 'new', 'contacted', 'qualified', 'converted', 'lost'] as const).map(s => (
                <button
                  key={s}
                  className={`${styles.statusTab} ${statusFilter === s ? styles.statusTabActive : ''}`}
                  onClick={() => setStatusFilter(s)}
                >
                  {s === 'all' ? 'הכל' : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Leads Table */}
          {loading ? (
            <div className={styles.loadingText}>טוען נתונים...</div>
          ) : filteredLeads.length === 0 ? (
            <div className={styles.emptyText}>אין לידים להצגה</div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>תאריך/שעה</th>
                    <th>שם</th>
                    <th>טלפון</th>
                    <th>סוג</th>
                    <th>מיקום</th>
                    <th>תקציב</th>
                    <th>סטטוס</th>
                    <th>WhatsApp</th>
                    <th>פעולות</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className={styles.tableRow}>
                      <td className={styles.dateCell}>{formatDate(lead.created_at)}</td>
                      <td className={styles.nameCell}>{lead.name || '-'}</td>
                      <td>
                        {lead.phone ? (
                          <a
                            href={`https://wa.me/972${lead.phone.replace(/^0/, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.phoneLink}
                          >
                            {lead.phone}
                          </a>
                        ) : '-'}
                      </td>
                      <td>
                        <span className={styles.flowBadge} data-flow={lead.flow_type}>
                          {lead.property_type || lead.flow_type || '-'}
                        </span>
                      </td>
                      <td>{lead.location || '-'}</td>
                      <td>{lead.budget || '-'}</td>
                      <td>
                        <select
                          className={styles.statusSelect}
                          value={lead.status}
                          style={{ color: STATUS_COLORS[lead.status] }}
                          onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        >
                          {(Object.keys(STATUS_LABELS) as LeadStatus[]).map(s => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                      </td>
                      <td>
                        {lead.whatsapp_sent ? (
                          <span className={styles.waBadgeYes}>✓ נשלח</span>
                        ) : (
                          <span className={styles.waBadgeNo}>✗</span>
                        )}
                      </td>
                      <td>
                        {lead.phone && (
                          <a
                            href={`https://wa.me/972${lead.phone.replace(/^0/, '')}?text=שלום%20${encodeURIComponent(lead.name || '')}%20מ-MULTIBRAWN`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionButton}
                          >
                            פנה
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}

      {/* EVENTS TAB */}
      {activeTab === 'events' && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>אירועים אחרונים</h2>
          {loading ? (
            <div className={styles.loadingText}>טוען...</div>
          ) : events.length === 0 ? (
            <div className={styles.emptyText}>אין אירועים להצגה</div>
          ) : (
            <div className={styles.eventsList}>
              {events.map(ev => (
                <div key={ev.id} className={styles.eventItem}>
                  <div className={styles.eventType}>{ev.event_type}</div>
                  <div className={styles.eventMeta}>
                    <span>{formatDate(ev.created_at)}</span>
                    {ev.page && <span className={styles.eventPage}>{ev.page}</span>}
                    {ev.session_id && (
                      <span className={styles.eventSession}>
                        {ev.session_id.slice(0, 8)}...
                      </span>
                    )}
                  </div>
                  {ev.metadata && Object.keys(ev.metadata).length > 0 && (
                    <div className={styles.eventMetadata}>
                      {JSON.stringify(ev.metadata)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
