'use client';

import { useState } from 'react';
import styles from './NewsletterForm.module.css';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setMsg(data.alreadySubscribed ? 'כבר רשום/ה — תודה!' : 'נרשמת בהצלחה!');
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error || 'משהו השתבש, נסה שוב');
      }
    } catch {
      setStatus('error');
      setMsg('שגיאת רשת, נסה שוב');
    }
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>קבלו טיפים, מבצעים ויעדים חדשים ישירות למייל</p>
      {status === 'success' ? (
        <div className={styles.successMsg}>✅ {msg}</div>
      ) : (
        <form className={styles.form} onSubmit={submit} noValidate>
          <input
            type="email"
            className={styles.input}
            placeholder="האימייל שלך"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
            disabled={status === 'loading'}
            required
            dir="ltr"
          />
          <button type="submit" className={styles.btn} disabled={status === 'loading'}>
            {status === 'loading' ? '...' : 'הרשמה'}
          </button>
        </form>
      )}
      {status === 'error' && <p className={styles.errorMsg}>{msg}</p>}
    </div>
  );
}
