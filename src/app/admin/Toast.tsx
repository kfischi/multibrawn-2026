'use client';

import { useEffect } from 'react';
import styles from './Admin.module.css';

export interface ToastMsg { id: number; text: string; type: 'success' | 'error' | 'info'; }

interface Props { toasts: ToastMsg[]; remove: (id: number) => void; }

export function ToastContainer({ toasts, remove }: Props) {
  return (
    <div className={styles.toastContainer}>
      {toasts.map(t => <Toast key={t.id} msg={t} remove={remove} />)}
    </div>
  );
}

function Toast({ msg, remove }: { msg: ToastMsg; remove: (id: number) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => remove(msg.id), 3500);
    return () => clearTimeout(timer);
  }, [msg.id, remove]);

  const icon = msg.type === 'success' ? '✅' : msg.type === 'error' ? '❌' : 'ℹ️';
  return (
    <div className={`${styles.toast} ${styles[`toast_${msg.type}`]}`}>
      <span>{icon}</span>
      <span>{msg.text}</span>
      <button className={styles.toastClose} onClick={() => remove(msg.id)}>✕</button>
    </div>
  );
}
