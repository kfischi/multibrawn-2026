'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', icon: '📊', label: 'Dashboard' },
    { href: '/admin/properties', icon: '🏠', label: 'נכסים' },
    { href: '/admin/tips', icon: '💡', label: 'טיפים' },
    { href: '/admin/messages', icon: '💬', label: 'הודעות' },
    { href: '/admin/settings', icon: '⚙️', label: 'הגדרות' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : styles.closed}`}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>MULTIBRAWN</h2>
          <p className={styles.sidebarSubtitle}>ממשק ניהול</p>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.backToSite}>
            🌐 חזרה לאתר
          </Link>
          <button className={styles.logoutBtn}>
            🚪 התנתק
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Top Bar */}
        <header className={styles.topBar}>
          <button
            className={styles.menuToggle}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="fas fa-bars"></i>
          </button>
          <div className={styles.topBarRight}>
            <span className={styles.userName}>שלום, ערדית 👋</span>
          </div>
        </header>

        {/* Page Content */}
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
