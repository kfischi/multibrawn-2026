'use client';

import { useState, useRef, useCallback } from 'react';
import styles from './Admin.module.css';

interface Props {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  minHeight?: number;
}

type ToolItem =
  | { type: 'wrap';   label: string; syntax: string; title: string }
  | { type: 'line';   label: string; prefix: string; title: string }
  | { type: 'insert'; label: string; text: string;   title: string }
  | { type: 'sep' };

const TOOLBAR: ToolItem[] = [
  { type: 'line',   label: 'H2',    prefix: '## ',    title: 'כותרת 2' },
  { type: 'line',   label: 'H3',    prefix: '### ',   title: 'כותרת 3' },
  { type: 'sep' },
  { type: 'wrap',   label: 'B',     syntax: '**',     title: 'מודגש' },
  { type: 'wrap',   label: 'I',     syntax: '_',      title: 'נטוי' },
  { type: 'sep' },
  { type: 'line',   label: '• רשימה',  prefix: '- ',  title: 'רשימת תבליטים' },
  { type: 'line',   label: '1. מספרים',prefix: '1. ', title: 'רשימה ממוספרת' },
  { type: 'line',   label: '❝ ציטוט', prefix: '> ',   title: 'ציטוט' },
  { type: 'sep' },
  { type: 'insert', label: '🔗 קישור', text: '[טקסט](https://)', title: 'קישור' },
  { type: 'insert', label: '—',         text: '\n---\n',           title: 'קו מפריד' },
];

/* Simple Markdown → HTML for preview */
function mdToHtml(md: string): string {
  return md
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbloiap])/gm, '')
    .replace(/<\/li>\n<li>/g, '</li><li>')
    .replace(/(<li>.+<\/li>)/gs, '<ul>$1</ul>');
}

export function RichEditor({ value, onChange, label = 'תוכן', minHeight = 280 }: Props) {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const ref = useRef<HTMLTextAreaElement>(null);

  const applyTool = useCallback((tool: ToolItem) => {
    const ta = ref.current;
    if (!ta || tool.type === 'sep') return;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    const sel   = value.slice(start, end);
    let next = value;
    let cursor = start;

    if (tool.type === 'wrap') {
      const wrapped = `${tool.syntax}${sel || 'טקסט'}${tool.syntax}`;
      next = value.slice(0, start) + wrapped + value.slice(end);
      cursor = start + wrapped.length;
    } else if (tool.type === 'line') {
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const line = value.slice(lineStart, end);
      const already = line.startsWith(tool.prefix);
      const newLine = already ? line.slice(tool.prefix.length) : tool.prefix + line;
      next = value.slice(0, lineStart) + newLine + value.slice(end);
      cursor = lineStart + newLine.length;
    } else if (tool.type === 'insert') {
      next = value.slice(0, start) + tool.text + value.slice(end);
      cursor = start + tool.text.length;
    }

    onChange(next);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(cursor, cursor);
    }, 0);
  }, [value, onChange]);

  const charCount = value.length;
  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div className={styles.richEditor}>
      {label && <label className={styles.formLabel}>{label}</label>}

      {/* Toolbar */}
      <div className={styles.editorToolbar}>
        <div className={styles.toolbarButtons}>
          {TOOLBAR.map((t, i) =>
            t.type === 'sep'
              ? <span key={i} className={styles.toolbarSep} />
              : (
                <button
                  key={i}
                  type="button"
                  title={t.title}
                  className={styles.toolbarBtn}
                  onClick={() => applyTool(t)}
                >
                  {t.label}
                </button>
              )
          )}
        </div>
        <div className={styles.editorTabs}>
          <button type="button"
            className={`${styles.editorTab} ${tab === 'edit' ? styles.editorTabActive : ''}`}
            onClick={() => setTab('edit')}>✏️ עריכה</button>
          <button type="button"
            className={`${styles.editorTab} ${tab === 'preview' ? styles.editorTabActive : ''}`}
            onClick={() => setTab('preview')}>👁 תצוגה מקדימה</button>
        </div>
      </div>

      {/* Edit area */}
      {tab === 'edit' ? (
        <textarea
          ref={ref}
          className={styles.richTextarea}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ minHeight }}
          placeholder={'כתוב כאן את התוכן...\n\nאפשר להשתמש ב-Markdown:\n## כותרת\n**מודגש**\n- פריט'}
          dir="rtl"
          spellCheck
        />
      ) : (
        <div
          className={styles.richPreview}
          style={{ minHeight }}
          dir="rtl"
          dangerouslySetInnerHTML={{ __html: value ? `<p>${mdToHtml(value)}</p>` : '<p style="color:#4a3a6a">אין תוכן להצגה</p>' }}
        />
      )}

      {/* Footer */}
      <div className={styles.editorFooter}>
        <span>{wordCount} מילים</span>
        <span>{charCount} תווים</span>
      </div>
    </div>
  );
}
