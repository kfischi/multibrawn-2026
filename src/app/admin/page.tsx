// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import propertiesData from '@/data/properties.json';
import styles from './dashboard.module.css';

// CRITICAL: Force dynamic rendering
export const dynamic = 'force-dynamic';

const allProperties = propertiesData.properties;

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProperties: allProperties.length,
    featuredProperties: allProperties.filter((p: any) => p.featured).length,
    totalLeads: 0,
    recentLeads: 0,
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Import Supabase dynamically - only in browser!
      const { supabase } = await import('@/lib/supabase/client');
      
      const { data: leads, error } = await supabase
        .from('chatbot_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayLeads = leads?.filter((lead: any) => 
        new Date(lead.created_at) >= today
      ).length || 0;

      setStats(prev => ({
        ...prev,
        totalLeads: leads?.length || 0,
        recentLeads: todayLeads,
      }));

      setRecentLeads(leads || []);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <div className={styles.spinner}></div>
        <p>טוען נתונים...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>ברוכים הבאים למערכת הניהול של MULTIBRAWN</p>
        </div>
        <div className={styles.dateTime}>
          {new Date().toLocaleDateString('he-IL', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #00E0FF 0%, #0891b2 100%)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>סה"כ נכסים</p>
            <h3 className={styles.statValue}>{stats.totalProperties}</h3>
            <p className={styles.statNote}>{stats.featuredProperties} נכסים מומלצים</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #A06BFF 0%, #7c3aed 100%)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>סה"כ לקוחות</p>
            <h3 className={styles.statValue}>{stats.totalLeads}</h3>
            <p className={styles.statNote}>{stats.recentLeads} חדשים היום</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #FF5EA1 0%, #ec4899 100%)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>שיעור המרה</p>
            <h3 className={styles.statValue}>87%</h3>
            <p className={styles.statNote}>+12% מהחודש שעבר</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>
          <div className={styles.statContent}>
            <p className={styles.statLabel}>זמן תגובה ממוצע</p>
            <h3 className={styles.statValue}>2.5 שעות</h3>
            <p className={styles.statNote}>מצוין! 🎉</p>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>לקוחות אחרונים מ-ChatBot</h2>
          <a href="/admin/leads" className={styles.viewAllLink}>
            הצג הכל →
          </a>
        </div>

        {recentLeads.length === 0 ? (
          <div className={styles.emptyState}>
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <p>אין לקוחות עדיין</p>
            <span>לקוחות מ-ChatBot יופיעו כאן</span>
          </div>
        ) : (
          <div className={styles.leadsTable}>
            <table>
              <thead>
                <tr>
                  <th>שם</th>
                  <th>טלפון</th>
                  <th>סוג נכס</th>
                  <th>אזור</th>
                  <th>תאריך</th>
                  <th>פעולות</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td className={styles.leadName}>{lead.name || 'לא צוין'}</td>
                    <td className={styles.leadPhone}>
                      <a href={`https://wa.me/${lead.phone}`} target="_blank" rel="noopener noreferrer">
                        {lead.phone || 'לא צוין'}
                      </a>
                    </td>
                    <td>{lead.property_type || 'לא צוין'}</td>
                    <td>{lead.location || 'לא צוין'}</td>
                    <td className={styles.leadDate}>
                      {new Date(lead.created_at).toLocaleDateString('he-IL')}
                    </td>
                    <td>
                      <a 
                        href={`https://wa.me/${lead.phone?.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.contactButton}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
