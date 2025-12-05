'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Dashboard.module.css';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    properties: 29,
    tips: 4,
    messages: 12,
    views: 1250,
  });

  const quickActions = [
    { href: '/admin/properties?action=new', icon: '➕', label: 'נכס חדש', color: 'blue' },
    { href: '/admin/tips?action=new', icon: '💡', label: 'טיפ חדש', color: 'purple' },
    { href: '/admin/messages', icon: '💬', label: 'הודעות', color: 'green' },
    { href: '/admin/settings', icon: '⚙️', label: 'הגדרות', color: 'orange' },
  ];

  const recentActivity = [
    { type: 'property', title: 'וילה חדשה נוספה', time: 'לפני 2 שעות', icon: '🏠' },
    { type: 'message', title: 'הודעה חדשה מלקוח', time: 'לפני 3 שעות', icon: '💬' },
    { type: 'tip', title: 'טיפ חדש פורסם', time: 'אתמול', icon: '💡' },
    { type: 'property', title: 'נכס עודכן', time: 'לפני יומיים', icon: '✏️' },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>ברוך הבא למערכת הניהול של MULTIBRAWN</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.blue}`}>
          <div className={styles.statIcon}>🏠</div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.properties}</div>
            <div className={styles.statLabel}>נכסים</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.purple}`}>
          <div className={styles.statIcon}>💡</div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.tips}</div>
            <div className={styles.statLabel}>טיפים</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.green}`}>
          <div className={styles.statIcon}>💬</div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.messages}</div>
            <div className={styles.statLabel}>הודעות חדשות</div>
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.orange}`}>
          <div className={styles.statIcon}>👁️</div>
          <div className={styles.statContent}>
            <div className={styles.statNumber}>{stats.views}</div>
            <div className={styles.statLabel}>צפיות החודש</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>פעולות מהירות</h2>
        <div className={styles.quickActionsGrid}>
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`${styles.quickAction} ${styles[action.color]}`}
            >
              <span className={styles.quickActionIcon}>{action.icon}</span>
              <span className={styles.quickActionLabel}>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>פעילות אחרונה</h2>
        <div className={styles.activityList}>
          {recentActivity.map((item, idx) => (
            <div key={idx} className={styles.activityItem}>
              <span className={styles.activityIcon}>{item.icon}</span>
              <div className={styles.activityContent}>
                <div className={styles.activityTitle}>{item.title}</div>
                <div className={styles.activityTime}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
