'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import styles from './Admin.module.css';

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [scraperRunning, setScraperRunning] = useState(false);
  const [scraperResult, setScraperResult] = useState<string>('');

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    setLoading(true);
    const { data, error } = await supabase
      .from('affiliate_properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error:', error);
    } else {
      setProperties(data || []);
    }
    setLoading(false);
  }

  async function runScraper() {
    setScraperRunning(true);
    setScraperResult('');

    try {
      const response = await fetch('/api/scraper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ maxResults: 10 }),
      });

      const result = await response.json();
      
      if (response.ok) {
        setScraperResult(`✅ הצלחה! הוספו ${result.inserted || 0} נכסים חדשים, עודכנו ${result.updated || 0}`);
        fetchProperties();
      } else {
        setScraperResult(`❌ שגיאה: ${result.error || 'Unknown error'}`);
      }
    } catch (error: any) {
      setScraperResult(`❌ שגיאה: ${error.message}`);
    } finally {
      setScraperRunning(false);
    }
  }

  async function deleteProperty(id: string) {
    if (!confirm('בטוח שרוצה למחוק?')) return;

    const { error } = await supabase
      .from('affiliate_properties')
      .delete()
      .eq('id', id);

    if (error) {
      alert('שגיאה במחיקה: ' + error.message);
    } else {
      fetchProperties();
    }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    const { error } = await supabase
      .from('affiliate_properties')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('שגיאה: ' + error.message);
    } else {
      fetchProperties();
    }
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>טוען...</p>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>🛠️ ניהול נכסים</h1>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{properties.length}</span>
            <span className={styles.statLabel}>סך הכל נכסים</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>
              {properties.filter(p => p.status === 'active').length}
            </span>
            <span className={styles.statLabel}>פעילים</span>
          </div>
        </div>
      </header>

      <div className={styles.actions}>
        <button
          className={styles.scraperBtn}
          onClick={runScraper}
          disabled={scraperRunning}
        >
          {scraperRunning ? '⏳ רץ...' : '🤖 הפעל סקרייפר (10 נכסים)'}
        </button>
        
        {scraperResult && (
          <div className={scraperResult.includes('✅') ? styles.successMsg : styles.errorMsg}>
            {scraperResult}
          </div>
        )}
      </div>

      {properties.length === 0 ? (
        <div className={styles.empty}>
          <p>📭 אין נכסים עדיין</p>
          <p>לחץ על "הפעל סקרייפר" למילוי אוטומטי</p>
        </div>
      ) : (
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>שם</th>
                <th>סוג</th>
                <th>מיקום</th>
                <th>סטטוס</th>
                <th>פעולות</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr key={property.id}>
                  <td>{property.name}</td>
                  <td>{property.property_type}</td>
                  <td>{property.location?.city || property.location?.area || '-'}</td>
                  <td>
                    <span className={property.status === 'active' ? styles.statusActive : styles.statusInactive}>
                      {property.status === 'active' ? '✅ פעיל' : '⏸️ לא פעיל'}
                    </span>
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={styles.toggleBtn}
                      onClick={() => toggleStatus(property.id, property.status)}
                    >
                      {property.status === 'active' ? '⏸️' : '▶️'}
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deleteProperty(property.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
