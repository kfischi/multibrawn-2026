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

    // Font Size
    const fontSizeMap = {
      small: '14px',
      normal: '16px',
      large: '18px',
      xlarge: '20px',
    };
    root.style.fontSize = fontSizeMap[newSettings.fontSize as keyof typeof fontSizeMap];

    // Contrast
    if (newSettings.contrast === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Line Height
    const lineHeightMap = {
      normal: '1.5',
      relaxed: '1.8',
      loose: '2.0',
    };
    root.style.setProperty('--line-height-base', lineHeightMap[newSettings.lineHeight as keyof typeof lineHeightMap]);

    // Letter Spacing
    const letterSpacingMap = {
      normal: '0',
      wide: '0.05em',
      wider: '0.1em',
    };
    root.style.letterSpacing = letterSpacingMap[newSettings.letterSpacing as keyof typeof letterSpacingMap];
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
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="8" r="1" fill="currentColor"></circle>
          <path d="M12 12v5"></path>
          <path d="M8 14h8"></path>
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
