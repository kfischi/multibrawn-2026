'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// הגדרות החיבור שלך
const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function DebugPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string, data?: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const text = data ? `${msg} \n ${JSON.stringify(data, null, 2)}` : msg;
    setLogs(prev => [...prev, `[${timestamp}] ${text}`]);
  };

  useEffect(() => {
    async function runTest() {
      addLog('מתחיל בדיקת חיבור...');
      
      try {
        // 1. בדיקה פשוטה לשליפת שורה אחת
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .limit(1);

        if (error) {
          addLog('❌ שגיאה התקבלה מסופבייס (זה מה שחיפשנו!):', error);
        } else {
          addLog('✅ הצלחה! נתונים התקבלו:', data);
        }
      } catch (err) {
        addLog('❌ שגיאה קריטית בקוד:', err);
      }
    }

    runTest();
  }, []);

  return (
    <div style={{ padding: 40, direction: 'rtl', fontFamily: 'monospace', backgroundColor: '#111', color: '#0f0', minHeight: '100vh' }}>
      <h1>כלי דיאגנוסטיקה</h1>
      <div style={{ whiteSpace: 'pre-wrap', backgroundColor: '#000', padding: 20, borderRadius: 8 }}>
        {logs.map((log, i) => (
          <div key={i} style={{ marginBottom: 20, borderBottom: '1px solid #333', paddingBottom: 10 }}>
            {log}
          </div>
        ))}
      </div>
    </div>
  );
}
