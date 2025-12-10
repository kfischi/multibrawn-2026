'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/supabase/auth';
import Image from 'next/image';
import styles from './login.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError('אימייל או סיסמה שגויים');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Gradient */}
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.gradientOrb3}></div>
      </div>

      {/* Login Card */}
      <div className={styles.card}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img 
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733340414/Multibrawn_logo_no_backround_npoc6t.png"
            alt="MULTIBRAWN"
            className={styles.logo}
          />
          <h1 className={styles.title}>Admin Panel</h1>
          <p className={styles.subtitle}>ממשק ניהול מתקדם</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>
              אימייל
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="info@multibrawn.co.il"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>
              סיסמה
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={styles.input}
              required
              disabled={loading}
            />
          </div>

          {error && (
            <div className={styles.error}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <div className={styles.spinner}></div>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                  <polyline points="10 17 15 12 10 7"/>
                  <line x1="15" y1="12" x2="3" y2="12"/>
                </svg>
                כניסה למערכת
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className={styles.footer}>
          <p>© 2024 MULTIBRAWN. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
