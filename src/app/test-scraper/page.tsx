'use client';

import { useState } from 'react';

export default function TestScraperPage() {
  const [maxResults, setMaxResults] = useState(3);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const runScraper = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const response = await fetch('/api/scraper/run', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer mb_secret_ulfwxmjerugxayuyliug_2026',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'scrape',
          provider: 'tzimer360',
          maxResults: maxResults,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setResult(data);
      } else {
        setError(data.error || data.message || 'משהו השתבש');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        padding: '40px',
        maxWidth: '600px',
        width: '100%',
      }}>
        <h1 style={{
          color: '#667eea',
          textAlign: 'center',
          marginBottom: '10px',
          fontSize: '32px',
        }}>
          🤖 סקרייפר Tzimer360
        </h1>
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '14px',
        }}>
          MULTIBRAWN - מערכת איסוף נכסים אוטומטית
        </p>

        <div style={{
          background: '#e7f3ff',
          border: '2px solid #2196F3',
          borderRadius: '10px',
          padding: '15px',
          marginBottom: '20px',
          fontSize: '14px',
          lineHeight: '1.6',
        }}>
          <strong style={{ color: '#1976D2' }}>💡 מה זה עושה?</strong><br />
          הסקרייפר גולש לאתר צימר360, אוסף נכסים ושומר אותם במסד הנתונים שלך.<br />
          כל נכס כולל תמונות, מחיר, מיקום ולינק affiliate עם הקוד שלך!
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            marginBottom: '8px',
            color: '#333',
            fontWeight: '600',
          }}>
            🔢 כמה נכסים לסרוק?
          </label>
          <input
            type="number"
            value={maxResults}
            onChange={(e) => setMaxResults(parseInt(e.target.value))}
            min="1"
            max="20"
            style={{
              width: '100%',
              padding: '12px',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '16px',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button
            onClick={runScraper}
            disabled={loading}
            style={{
              flex: 1,
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              color: 'white',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              transition: 'all 0.3s',
            }}
          >
            {loading ? '⏳ מריץ...' : '🚀 הרץ סקרייפר'}
          </button>

          <button
            onClick={() => window.open('https://supabase.com/dashboard/project/ulfwxmjerugxayuyliug/editor', '_blank')}
            style={{
              flex: 1,
              padding: '15px 30px',
              fontSize: '18px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              color: 'white',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              transition: 'all 0.3s',
            }}
          >
            📊 צפה בנכסים
          </button>
        </div>

        {loading && (
          <div style={{
            padding: '20px',
            borderRadius: '10px',
            background: '#fff3cd',
            border: '2px solid #ffc107',
            color: '#856404',
          }}>
            <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '10px' }}>
              ⏳ סורק נכסים...
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              הסקרייפר גולש לצימר360 ואוסף {maxResults} נכסים.<br />
              זה יכול לקחת כ-{maxResults * 2} שניות. אנא המתן...
            </div>
          </div>
        )}

        {result && (
          <div style={{
            padding: '20px',
            borderRadius: '10px',
            background: '#d4edda',
            border: '2px solid #28a745',
            color: '#155724',
          }}>
            <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '10px' }}>
              ✅ הסקרייפר רץ בהצלחה!
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              הסקרייפר סיים לעבוד והנכסים נשמרו במסד הנתונים.
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginTop: '15px',
              }}>
                <div style={{
                  background: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                    {result.results.inserted}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    נוספו
                  </div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                    {result.results.updated}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    עודכנו
                  </div>
                </div>
                <div style={{
                  background: 'white',
                  padding: '10px',
                  borderRadius: '8px',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: '24px', fontWeight: '700', color: '#667eea' }}>
                    {result.results.errors}
                  </div>
                  <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    שגיאות
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: '15px', fontWeight: '600' }}>
                💡 עכשיו לחץ על "צפה בנכסים" כדי לראות את התוצאות ב-Supabase!
              </div>
            </div>
          </div>
        )}

        {error && (
          <div style={{
            padding: '20px',
            borderRadius: '10px',
            background: '#f8d7da',
            border: '2px solid #dc3545',
            color: '#721c24',
          }}>
            <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '10px' }}>
              ❌ שגיאה
            </div>
            <div style={{ fontSize: '14px', lineHeight: '1.6' }}>
              {error}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
