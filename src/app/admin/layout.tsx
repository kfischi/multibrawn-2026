// src/app/admin/layout.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import styles from './admin.module.css';

// FORCE DYNAMIC FOR ENTIRE ADMIN SECTION
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else {
        setUser(user);
      }
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  // Don't render anything while checking auth
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        background: '#0a0e27'
      }}>
        <div style={{ color: 'white' }}>טוען...</div>
      </div>
    );
  }

  // Login page - no layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Admin pages - with layout
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <img 
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733583123/multibrawn-logo_wvmkbd.png"
            alt="MULTIBRAWN"
            className={styles.logo}
          />
        </div>

        <nav className={styles.nav}>
          <a 
            href="/admin" 
            className={`${styles.navItem} ${pathname === '/admin' ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Dashboard
          </a>

          <a 
            href="/admin/properties" 
            className={`${styles.navItem} ${pathname === '/admin/properties' ? styles.active : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            נכסים
          </a>

          <a 
            href="/admin/media" 
            className={styles.navItem}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            מדיה
          </a>

          <a 
            href="/admin/leads" 
            className={styles.navItem}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            לקוחות ChatBot
          </a>

          <a 
            href="/admin/settings" 
            className={styles.navItem}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6"/>
              <path d="M17 12h6M1 12h6"/>
            </svg>
            הגדרות
          </a>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <div className={styles.userAvatar}>
              {user?.email?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className={styles.userDetails}>
              <div className={styles.userName}>{user?.email}</div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                התנתק
              </button>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <a href="/" target="_blank" className={styles.viewSiteButton}>
            צפה באתר →
          </a>
        </div>
        
        {children}
      </main>
    </div>
  );
}
