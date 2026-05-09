'use client';

import { useState, useEffect } from 'react';
import styles from './AccessibilityMenu.module.css';

export default function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: 'normal',
    contrast: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'normal',
    highlightLinks: false,
  });

  useEffect(() => {
    // Load saved settings from localStorage
    const savedSettings = localStorage.getItem('accessibilitySettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
      applySettings(parsed);
    }
  }, []);

  const applySettings = (newSettings: typeof settings) => {
    const root = document.documentElement;
    const body = document.body;

    // Font Size — zoom the whole page so ALL elements scale
    const zoomMap: Record<string, string> = {
      small: '90%',
      normal: '100%',
      large: '115%',
      xlarge: '130%',
    };
    body.style.zoom = zoomMap[newSettings.fontSize] || '100%';
    // Also set root font-size for rem-based elements
    const fontSizeMap: Record<string, string> = { small: '14px', normal: '16px', large: '18px', xlarge: '20px' };
    root.style.fontSize = fontSizeMap[newSettings.fontSize] || '16px';

    // Contrast
    if (newSettings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Line Height via CSS variable
    const lineHeightMap: Record<string, string> = { normal: '1.5', relaxed: '1.8', loose: '2.2' };
    root.style.setProperty('--line-height-base', lineHeightMap[newSettings.lineHeight] || '1.5');
    body.style.lineHeight = lineHeightMap[newSettings.lineHeight] || '';

    // Letter Spacing
    const letterSpacingMap: Record<string, string> = { normal: '0', wide: '0.05em', wider: '0.12em' };
    root.style.setProperty('--letter-spacing-base', letterSpacingMap[newSettings.letterSpacing] || '0');
    body.style.letterSpacing = newSettings.letterSpacing !== 'normal' ? letterSpacingMap[newSettings.letterSpacing] : '';

    // Highlight Links
    if (newSettings.highlightLinks) {
      root.classList.add('highlight-links');
    } else {
      root.classList.remove('highlight-links');
    }
  };

  const updateSetting = (key: keyof typeof settings, value: string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    applySettings(newSettings);
    localStorage.setItem('accessibilitySettings', JSON.stringify(newSettings));
  };

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 'normal',
      contrast: 'normal',
      lineHeight: 'normal',
      letterSpacing: 'normal',
      highlightLinks: false,
    };
    setSettings(defaultSettings);
    applySettings(defaultSettings);
    localStorage.removeItem('accessibilitySettings');
  };

  return (
    <>
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.button}
        aria-label="תפריט נגישות"
        aria-expanded={isOpen}
        title="הגדרות נגישות"
      >
        {/* ISA International Symbol of Access - wheelchair user */}
        <svg width="30" height="30" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <circle cx="66" cy="12" r="10"/>
          <path d="M52 26 L38 62 L52 62 L60 82 C62 88 70 90 74 86 C78 82 77 74 72 71 L65 54 L72 54 L82 38 C85 32 80 24 74 24 L58 24 C55 24 53 25 52 26Z"/>
          <path d="M36 40 C22 40 12 50 12 64 C12 78 22 88 36 88 C46 88 55 82 59 73 L50 67 C47 72 42 76 36 76 C29 76 22 70 22 64 C22 57 28 52 35 51Z"/>
        </svg>
      </button>

      {/* Accessibility Menu */}
      {isOpen && (
        <div className={styles.menu}>
          <div className={styles.header}>
            <h3 className={styles.title}>נגישות</h3>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.closeButton}
              aria-label="סגור תפריט נגישות"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className={styles.content}>
            {/* Font Size */}
            <div className={styles.section}>
              <label className={styles.label}>גודל טקסט</label>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => updateSetting('fontSize', 'small')}
                  className={`${styles.optionButton} ${settings.fontSize === 'small' ? styles.active : ''}`}
                >
                  A-
                </button>
                <button
                  onClick={() => updateSetting('fontSize', 'normal')}
                  className={`${styles.optionButton} ${settings.fontSize === 'normal' ? styles.active : ''}`}
                >
                  A
                </button>
                <button
                  onClick={() => updateSetting('fontSize', 'large')}
                  className={`${styles.optionButton} ${settings.fontSize === 'large' ? styles.active : ''}`}
                >
                  A+
                </button>
                <button
                  onClick={() => updateSetting('fontSize', 'xlarge')}
                  className={`${styles.optionButton} ${settings.fontSize === 'xlarge' ? styles.active : ''}`}
                >
                  A++
                </button>
              </div>
            </div>

            {/* Contrast */}
            <div className={styles.section}>
              <label className={styles.label}>ניגודיות</label>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => updateSetting('contrast', 'normal')}
                  className={`${styles.optionButton} ${settings.contrast === 'normal' ? styles.active : ''}`}
                >
                  רגיל
                </button>
                <button
                  onClick={() => updateSetting('contrast', 'high')}
                  className={`${styles.optionButton} ${settings.contrast === 'high' ? styles.active : ''}`}
                >
                  גבוהה
                </button>
              </div>
            </div>

            {/* Line Height */}
            <div className={styles.section}>
              <label className={styles.label}>ריווח שורות</label>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => updateSetting('lineHeight', 'normal')}
                  className={`${styles.optionButton} ${settings.lineHeight === 'normal' ? styles.active : ''}`}
                >
                  רגיל
                </button>
                <button
                  onClick={() => updateSetting('lineHeight', 'relaxed')}
                  className={`${styles.optionButton} ${settings.lineHeight === 'relaxed' ? styles.active : ''}`}
                >
                  רחב
                </button>
                <button
                  onClick={() => updateSetting('lineHeight', 'loose')}
                  className={`${styles.optionButton} ${settings.lineHeight === 'loose' ? styles.active : ''}`}
                >
                  רחב מאוד
                </button>
              </div>
            </div>

            {/* Letter Spacing */}
            <div className={styles.section}>
              <label className={styles.label}>ריווח אותיות</label>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => updateSetting('letterSpacing', 'normal')}
                  className={`${styles.optionButton} ${settings.letterSpacing === 'normal' ? styles.active : ''}`}
                >
                  רגיל
                </button>
                <button
                  onClick={() => updateSetting('letterSpacing', 'wide')}
                  className={`${styles.optionButton} ${settings.letterSpacing === 'wide' ? styles.active : ''}`}
                >
                  רחב
                </button>
                <button
                  onClick={() => updateSetting('letterSpacing', 'wider')}
                  className={`${styles.optionButton} ${settings.letterSpacing === 'wider' ? styles.active : ''}`}
                >
                  רחב מאוד
                </button>
              </div>
            </div>

            {/* Highlight Links */}
            <div className={styles.section}>
              <label className={styles.label}>הדגש קישורים</label>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => updateSetting('highlightLinks', false as unknown as string)}
                  className={`${styles.optionButton} ${!settings.highlightLinks ? styles.active : ''}`}
                >
                  כבוי
                </button>
                <button
                  onClick={() => updateSetting('highlightLinks', true as unknown as string)}
                  className={`${styles.optionButton} ${settings.highlightLinks ? styles.active : ''}`}
                >
                  הדגש
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetSettings}
              className={styles.resetButton}
            >
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
