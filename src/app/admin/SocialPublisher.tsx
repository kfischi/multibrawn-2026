'use client';

import { useState, useEffect, useCallback } from 'react';
import styles from './Admin.module.css';
import { ImageUploader } from './ImageUploader';
import type { ToastMsg } from './Toast';

type Platform = 'facebook' | 'instagram' | 'youtube' | 'tiktok';

interface QueueRow {
  id: string;
  created_at: string;
  media_url: string;
  caption: string | null;
  target_platforms: Platform[];
  status: 'pending' | 'processing' | 'published' | 'partial' | 'failed';
  published_urls: Record<string, string>;
  error_log: Record<string, string>;
}

interface Props {
  adminKey: string;
  addToast: (text: string, type?: ToastMsg['type']) => void;
}

const PLATFORMS: { key: Platform; label: string; icon: string }[] = [
  { key: 'facebook',  label: 'Facebook',  icon: '📘' },
  { key: 'instagram', label: 'Instagram', icon: '📸' },
  { key: 'youtube',   label: 'YouTube',   icon: '▶️' },
  { key: 'tiktok',    label: 'TikTok',    icon: '🎵' },
];

const STATUS_LABEL: Record<QueueRow['status'], string> = {
  pending:    'ממתין',
  processing: 'מעבד',
  published:  'פורסם',
  partial:    'חלקי',
  failed:     'נכשל',
};

function statusClass(s: QueueRow['status']): string {
  if (s === 'pending')    return `${styles.statusBadge} ${styles.statusPending}`;
  if (s === 'processing') return `${styles.statusBadge} ${styles.statusProcessing}`;
  if (s === 'published')  return `${styles.statusBadge} ${styles.publishedBadgeOn}`;
  if (s === 'partial')    return `${styles.statusBadge} ${styles.statusPartial}`;
  return `${styles.statusBadge} ${styles.publishedBadgeOff}`;
}

function fmt(d: string) {
  return new Date(d).toLocaleString('he-IL', {
    day: '2-digit', month: '2-digit', year: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
}

export function SocialPublisher({ adminKey, addToast }: Props) {
  const [mediaUrl, setMediaUrl]     = useState('');
  const [caption, setCaption]       = useState('');
  const [platforms, setPlatforms]   = useState<Record<Platform, boolean>>({
    facebook: false, instagram: false, youtube: false, tiktok: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [queue, setQueue]           = useState<QueueRow[]>([]);
  const [queueLoading, setQueueLoading] = useState(false);

  const fetchQueue = useCallback(async () => {
    setQueueLoading(true);
    try {
      const res = await fetch('/api/social/queue', {
        headers: { 'x-admin-secret': adminKey },
      });
      if (res.ok) {
        const d = await res.json();
        setQueue(d.queue ?? []);
      }
    } finally {
      setQueueLoading(false);
    }
  }, [adminKey]);

  useEffect(() => { fetchQueue(); }, [fetchQueue]);

  const togglePlatform = (p: Platform) =>
    setPlatforms(prev => ({ ...prev, [p]: !prev[p] }));

  const handleSubmit = async () => {
    const selected = (Object.keys(platforms) as Platform[]).filter(p => platforms[p]);
    if (!mediaUrl) { addToast('יש להעלות מדיה תחילה', 'error'); return; }
    if (selected.length === 0) { addToast('יש לבחור לפחות פלטפורמה אחת', 'error'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('/api/social/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': adminKey },
        body: JSON.stringify({ media_url: mediaUrl, caption, target_platforms: selected }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        addToast('הפוסט נוסף לתור הפרסום ✓');
        setMediaUrl('');
        setCaption('');
        setPlatforms({ facebook: false, instagram: false, youtube: false, tiktok: false });
        fetchQueue();
      } else {
        addToast(data.error || 'שגיאה בשליחה', 'error');
      }
    } catch {
      addToast('שגיאת רשת, נסה שוב', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.contentHeader}>
        <h2 className={styles.sectionTitle}>פרסום ברשתות חברתיות</h2>
        <button className={styles.refreshButton} onClick={fetchQueue} disabled={queueLoading}>
          {queueLoading ? '...' : '↻ רענן תור'}
        </button>
      </div>

      {/* ── Upload Form ── */}
      <div className={styles.publisherForm}>
        <ImageUploader value={mediaUrl} onChange={setMediaUrl} label="מדיה לפרסום (תמונה / URL)" />

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>כיתוב (Caption)</label>
          <textarea
            className={styles.richTextarea}
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="כתוב את הכיתוב כאן..."
            rows={4}
            style={{ minHeight: 100 }}
            dir="rtl"
          />
        </div>

        <div>
          <label className={styles.formLabel}>פלטפורמות יעד</label>
          <div className={styles.platformRow}>
            {PLATFORMS.map(({ key, label, icon }) => (
              <button
                key={key}
                type="button"
                className={`${styles.platformBtn} ${platforms[key] ? styles.platformBtnActive : ''}`}
                onClick={() => togglePlatform(key)}
              >
                {icon} {label}
              </button>
            ))}
          </div>
        </div>

        <button
          className={styles.saveBtn}
          onClick={handleSubmit}
          disabled={submitting}
          style={{ alignSelf: 'flex-start' }}
        >
          {submitting ? 'שולח לתור...' : '📢 פרסם ברשתות'}
        </button>
      </div>

      {/* ── Queue Table ── */}
      <p className={styles.queueSectionTitle}>תור פרסום ({queue.length})</p>
      {queue.length === 0 ? (
        <div className={styles.emptyText}>אין פוסטים בתור</div>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>תאריך</th>
                <th>תמונה</th>
                <th>כיתוב</th>
                <th>פלטפורמות</th>
                <th>סטטוס</th>
                <th>פורסם ב</th>
              </tr>
            </thead>
            <tbody>
              {queue.map(row => (
                <tr key={row.id} className={styles.tableRow}>
                  <td className={styles.dateCell}>{fmt(row.created_at)}</td>
                  <td>
                    {row.media_url
                      ? <img src={row.media_url} alt="" className={styles.mediaThumb}
                          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
                      : '—'}
                  </td>
                  <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {row.caption || '—'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                      {row.target_platforms.map(p => (
                        <span key={p} className={styles.flowBadge}>{p}</span>
                      ))}
                    </div>
                  </td>
                  <td><span className={statusClass(row.status)}>{STATUS_LABEL[row.status]}</span></td>
                  <td style={{ fontSize: '0.75rem', color: '#7a6a9a' }}>
                    {Object.entries(row.published_urls || {}).map(([plat, url]) => (
                      <div key={plat}>
                        <a href={url as string} target="_blank" rel="noopener noreferrer"
                          style={{ color: '#00E0FF' }}>{plat}</a>
                      </div>
                    ))}
                    {row.status === 'failed' && row.error_log && (
                      <span style={{ color: '#FF5EA1', fontSize: '0.7rem' }}>
                        {JSON.stringify(row.error_log).slice(0, 60)}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
