'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './Admin.module.css';

interface Props {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUploader({ value, onChange, label = 'תמונה' }: Props) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dptyfvwyo';
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '';

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) { setError('רק קבצי תמונה (PNG, JPG, WebP)'); return; }
    if (file.size > 15 * 1024 * 1024) { setError('הקובץ גדול מ-15MB'); return; }
    if (!uploadPreset) {
      setError('הגדר NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ב-Netlify');
      return;
    }

    setUploading(true); setError(''); setProgress(10);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'multibrawn');

    try {
      setProgress(40);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );
      setProgress(90);
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
        setProgress(100);
      } else {
        setError(data.error?.message || 'שגיאה בהעלאה');
      }
    } catch {
      setError('שגיאת רשת — נסה שוב');
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 600);
    }
  }, [cloudName, uploadPreset, onChange]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  const onPaste = useCallback((e: React.ClipboardEvent) => {
    const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'));
    if (file) { e.preventDefault(); upload(file); }
  }, [upload]);

  return (
    <div onPaste={onPaste}>
      {label && <label className={styles.formLabel}>{label}</label>}

      {/* Drop / Preview Zone */}
      <div
        className={`${styles.dropZone} ${dragging ? styles.dropZoneDragging : ''}`}
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={e => { const f = e.target.files?.[0]; if (f) upload(f); }}
        />

        {uploading ? (
          <div className={styles.uploadingState}>
            <div className={styles.uploadSpinner} />
            <span>מעלה תמונה...</span>
            <div className={styles.uploadProgressBar}>
              <div className={styles.uploadProgressFill} style={{ width: `${progress}%` }} />
            </div>
          </div>
        ) : value ? (
          <div className={styles.imagePreviewBox}>
            <img src={value} alt="" className={styles.uploadedPreview} />
            <div className={styles.imageOverlay}>
              <span className={styles.imageOverlayText}>🔄 לחץ להחלפה</span>
            </div>
          </div>
        ) : (
          <div className={styles.dropZonePlaceholder}>
            <div className={styles.dropZoneIcon}>🖼️</div>
            <div className={styles.dropZoneMain}>גרור תמונה לכאן, הדבק מהלוח (Ctrl+V) או לחץ לבחירה</div>
            <div className={styles.dropZoneSub}>PNG · JPG · WebP · עד 15MB</div>
          </div>
        )}
      </div>

      {/* Progress bar */}
      {uploading && (
        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* URL fallback */}
      <div className={styles.urlInputRow}>
        <span className={styles.urlInputLabel}>או URL:</span>
        <input
          className={styles.formInput}
          style={{ flex: 1 }}
          value={value}
          placeholder="https://..."
          onChange={e => onChange(e.target.value)}
        />
      </div>

      {error && <div className={styles.uploaderError}>{error}</div>}
    </div>
  );
}
