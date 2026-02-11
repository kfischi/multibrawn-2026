'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ulfwxmjerugxayuyliug.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZnd4bWplcnVneGF5dXlsaXVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg3Njg3ODksImV4cCI6MjA4NDM0NDc4OX0._-zdlFQx5c0ToJNiH2HM3DygCn4dHvkCAoeVj0GV42g';

const supabase = createClient(supabaseUrl, supabaseKey);

export default function CheckPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const printLog = (title: string, data: any) => {
    // הופך כל אובייקט לטקסט קריא בכוח
    const text = typeof data === 'object' ? JSON.stringify(data, null, 2) : String(data);
    setLogs(prev => [...prev, `--- ${title} ---\n${text}\n`]);
  };

  useEffect(() => {
    async function runCheck() {
      printLog('מתחיל בדיקה...', 'מנסה להתחבר...');

      try {
        // מנסה לשלוף שורה אחת בלבד
        const { data, error } = await supabase
          .from('affiliate_properties')
          .select('*')
          .limit(1);

        if (error) {
          printLog('🛑 שגיאה מסופבייס (הסיבה לתקלה)', error);
          if (error.message) printLog('הודעת שגיאה', error.message);
          if (error.code) printLog('קוד שגיאה', error.code);
          if (error.details) printLog('פרטים נוספים', error.details);
        } else {
          printLog('✅ הצלחה! החיבור תקין', data);
        }
      } catch (err: any) {
        printLog('💥 שגיאת קוד קריטית', err);
      }
    }

    runCheck();
  }, []);

  return (
    <div style={{ direction: 'ltr', padding: 20, background: '#000', color: '#0f0', minHeight: '100vh', fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
      <h1>Supabase Connection Check</h1>
      <div style={{ border: '1px solid #333', padding: 20 }}>
        {logs.map((log, i) => <div key={i}>{log}</div>)}
      </div>
    </div>
  );
}
