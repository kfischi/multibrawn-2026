'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChatBot.module.css';

// ─── Types ─────────────────────────────────────
type Stage =
  | 'greeting'
  | 'guests'
  | 'dates'
  | 'region'
  | 'budget'
  | 'contact_name'
  | 'contact_phone'
  | 'done';

interface CollectedData {
  propertyType?: string;
  guestCount?: string;
  dates?: string;
  region?: string;
  budget?: string;
  name?: string;
  phone?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: QuickReply[];
}

interface QuickReply {
  label: string;
  value: string;
}

// ─── Flow definition ───────────────────────────
const STAGE_QUESTIONS: Record<
  Stage,
  { text: string; replies: QuickReply[]; placeholder?: string }
> = {
  greeting: {
    text: 'שלום! 👋 אני ערדית.\nאשמח לעזור לך למצוא את הנכס המושלם. מה מחפשים?',
    replies: [
      { label: '💕 צימר רומנטי לזוג', value: 'צימר רומנטי לזוג' },
      { label: '🏡 וילה למשפחה', value: 'וילה למשפחה' },
      { label: '🎊 שבת חתן / אירוע', value: 'שבת חתן או אירוע' },
      { label: '🌍 נכס בחו"ל', value: 'נכס בינלאומי בחו"ל' },
    ],
  },
  guests: {
    text: 'כמה אנשים יגיעו?',
    replies: [
      { label: '👫 2 אנשים', value: '2 אנשים' },
      { label: '👨‍👩‍👧 3–4 אנשים', value: '3-4 אנשים' },
      { label: '👨‍👩‍👧‍👦 5–8 אנשים', value: '5-8 אנשים' },
      { label: '🏘️ 9+ אנשים', value: '9 אנשים ומעלה' },
    ],
    placeholder: 'כמה אנשים...',
  },
  dates: {
    text: 'מתי מתכננים?',
    replies: [
      { label: '📅 סוף שבוע הקרוב', value: 'סוף שבוע הקרוב' },
      { label: '📆 תוך חודש', value: 'תוך חודש' },
      { label: '🌞 בקיץ', value: 'קיץ 2025' },
      { label: '✍️ תאריך ספציפי', value: '' }, // empty = let user type
    ],
    placeholder: 'תאריכים...',
  },
  region: {
    text: 'איזה אזור?',
    replies: [
      { label: '🏔️ צפון (גליל/גולן)', value: 'צפון - גליל וגולן' },
      { label: '🕍 ירושלים', value: 'ירושלים' },
      { label: '🌊 מרכז / ים', value: 'מרכז' },
      { label: '🏜️ דרום / אילת', value: 'דרום ואילת' },
      { label: '🌍 חו"ל', value: 'חו"ל' },
    ],
    placeholder: 'אזור...',
  },
  budget: {
    text: 'מה טווח התקציב ללילה?',
    replies: [
      { label: '💚 עד ₪1,000', value: 'עד 1,000 שח ללילה' },
      { label: '💛 ₪1,000–₪2,500', value: '1,000-2,500 שח ללילה' },
      { label: '🔶 ₪2,500–₪5,000', value: '2,500-5,000 שח ללילה' },
      { label: '💎 ₪5,000+', value: 'מעל 5,000 שח ללילה' },
    ],
  },
  contact_name: {
    text: 'מעולה! 🎉 כדי שנוכל לחזור אליך — מה שמך?',
    replies: [],
    placeholder: 'שם פרטי...',
  },
  contact_phone: {
    text: 'ומה מספר הנייד שלך?',
    replies: [],
    placeholder: '05X-XXXXXXX',
  },
  done: {
    text: '',
    replies: [],
  },
};

// ─── Next stage logic ───────────────────────────
function nextStage(current: Stage, data: CollectedData): Stage {
  switch (current) {
    case 'greeting': return 'guests';
    case 'guests':   return 'dates';
    case 'dates':    return 'region';
    case 'region':   return 'budget';
    case 'budget':   return 'contact_name';
    case 'contact_name': return 'contact_phone';
    case 'contact_phone': return 'done';
    default: return 'done';
  }
}

// ─── Build summary text ─────────────────────────
function buildSummary(data: CollectedData): string {
  const lines = ['📩 *ליד חדש מהצ\'אטבוט!*', ''];
  if (data.name)         lines.push(`👤 *שם:* ${data.name}`);
  if (data.phone)        lines.push(`📱 *טלפון:* ${data.phone}`);
  if (data.propertyType) lines.push(`🏠 *סוג נכס:* ${data.propertyType}`);
  if (data.guestCount)   lines.push(`👥 *אורחים:* ${data.guestCount}`);
  if (data.dates)        lines.push(`📅 *תאריכים:* ${data.dates}`);
  if (data.region)       lines.push(`📍 *אזור:* ${data.region}`);
  if (data.budget)       lines.push(`💰 *תקציב:* ${data.budget}`);
  return lines.join('\n');
}

const AVATAR =
  'https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png';

// ─── Component ─────────────────────────────────
export default function ChatBot() {
  const router = useRouter();
  const [isOpen, setIsOpen]     = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [stage, setStage]       = useState<Stage>('greeting');
  const [collected, setCollected] = useState<CollectedData>({});
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading]   = useState(false);
  const [notified, setNotified]     = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef       = useRef<HTMLInputElement>(null);

  // Fade-in button after 2 s
  useEffect(() => {
    const t = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show greeting on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const q = STAGE_QUESTIONS.greeting;
      setMessages([
        {
          id: '0',
          role: 'assistant',
          content: q.text,
          timestamp: new Date(),
          actions: q.replies,
        },
      ]);
    }
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen, messages.length]);

  // ── Add a bot message ──────────────────────────
  const addBotMsg = useCallback(
    (text: string, replies: QuickReply[] = []) => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: text,
          timestamp: new Date(),
          actions: replies,
        },
      ]);
    },
    []
  );

  // ── Handle an answer (quick-reply or typed) ────
  const handleAnswer = useCallback(
    async (answer: string, currentStage: Stage, currentData: CollectedData) => {
      if (!answer.trim()) return;

      // Add user message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'user',
          content: answer.trim(),
          timestamp: new Date(),
        },
      ]);
      setInputValue('');
      setIsLoading(true);

      // Store answer in collected data
      const updated: CollectedData = { ...currentData };
      switch (currentStage) {
        case 'greeting':      updated.propertyType = answer; break;
        case 'guests':        updated.guestCount   = answer; break;
        case 'dates':         updated.dates        = answer; break;
        case 'region':        updated.region       = answer; break;
        case 'budget':        updated.budget       = answer; break;
        case 'contact_name':  updated.name         = answer; break;
        case 'contact_phone': updated.phone        = answer; break;
      }
      setCollected(updated);

      const ns = nextStage(currentStage, updated);
      setStage(ns);

      // Small typing delay
      await new Promise((r) => setTimeout(r, 600));
      setIsLoading(false);

      if (ns === 'done') {
        // Build summary
        const summary = buildSummary(updated);
        const name = updated.name || 'לקוח';

        addBotMsg(
          `תודה ${name}! 🙏\nקיבלתי את כל הפרטים — ערדית תחזור אליך בהקדם האפשרי.\nבינתיים אפשר גם לפנות ישירות:`,
          [
            {
              label: '📱 שלח לוואטסאפ',
              value: `__wa__${encodeURIComponent(summary)}`,
            },
            { label: '📞 התקשר עכשיו', value: '__phone__' },
          ]
        );

        // Auto-send to Ardit
        try {
          await fetch('/api/notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ collected: updated, summary }),
          });
          setNotified(true);
        } catch {
          // Non-blocking
        }
      } else {
        const q = STAGE_QUESTIONS[ns];
        addBotMsg(q.text, q.replies);
      }
    },
    [addBotMsg]
  );

  // ── Quick-reply click ──────────────────────────
  const handleQuickReply = useCallback(
    (action: QuickReply) => {
      // Special actions encoded in value
      if (action.value.startsWith('__wa__')) {
        const text = decodeURIComponent(action.value.replace('__wa__', ''));
        const num = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972523983394';
        window.open(`https://wa.me/${num}?text=${encodeURIComponent(text)}`, '_blank');
        return;
      }
      if (action.value === '__phone__') {
        window.open('tel:+972523983394', '_self');
        return;
      }
      // "תאריך ספציפי" — let user type
      if (action.value === '') {
        inputRef.current?.focus();
        return;
      }
      handleAnswer(action.value, stage, collected);
    },
    [stage, collected, handleAnswer]
  );

  // ── Typed submit ───────────────────────────────
  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) handleAnswer(inputValue.trim(), stage, collected);
  }, [inputValue, stage, collected, handleAnswer]);

  // ── Render ─────────────────────────────────────
  const currentPlaceholder =
    stage === 'done' ? '' : (STAGE_QUESTIONS[stage]?.placeholder ?? 'כתוב הודעה...');

  return (
    <>
      {/* Floating Button */}
      <div className={styles.chatButtonWrapper}>
        <button
          onClick={() => setIsOpen((o) => !o)}
          className={`${styles.chatButton} ${isVisible ? styles.visible : ''}`}
          aria-label="פתח צ'אט עם ערדית"
          data-chatbot
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" className={styles.closeIcon}>
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <img src={AVATAR} alt="ערדית" className={styles.avatarImage} />
          )}
        </button>
        {!isOpen && <div className={styles.chatLabel}>ערדית AI</div>}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.avatarContainer}>
              <img src={AVATAR} alt="ערדית" className={styles.avatar} />
              <div className={styles.statusIndicator} />
            </div>
            <div className={styles.headerInfo}>
              <p className={styles.botName}>ערדית — סוכנת AI</p>
              <p className={styles.botStatus}>🟢 מגיבה מיידית</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className={styles.minimizeButton}
              aria-label="סגור"
            >
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className={styles.progressBar}>
            {(['greeting','guests','dates','region','budget','contact_name','contact_phone','done'] as Stage[]).map((s, i, arr) => (
              <div
                key={s}
                className={`${styles.progressDot} ${
                  i <= arr.indexOf(stage) ? styles.progressDotDone : ''
                }`}
              />
            ))}
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.messageBubble} ${styles[msg.role]}`}>
                {msg.role === 'assistant' && (
                  <img src={AVATAR} alt="ערדית" className={styles.messageAvatar} />
                )}
                <div>
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>{msg.content}</p>
                    <span className={styles.messageTime}>
                      {msg.timestamp.toLocaleTimeString('he-IL', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  {msg.actions && msg.actions.length > 0 && (
                    <div className={styles.actionsGrid}>
                      {msg.actions.map((action, i) => {
                        const isWa    = action.value.startsWith('__wa__');
                        const isPhone = action.value === '__phone__';
                        return (
                          <button
                            key={i}
                            onClick={() => handleQuickReply(action)}
                            className={`${styles.actionBtn} ${
                              isWa    ? styles.actionBtnWhatsapp :
                              isPhone ? styles.actionBtnPhone    :
                                        styles.actionBtnQuick
                            }`}
                          >
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.assistant}`}>
                <img src={AVATAR} alt="ערדית" className={styles.messageAvatar} />
                <div className={styles.typingIndicator}>
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                  <div className={styles.typingDot} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          {stage !== 'done' && (
            <div className={styles.inputArea}>
              <input
                ref={inputRef}
                type={stage === 'contact_phone' ? 'tel' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder={currentPlaceholder}
                className={styles.input}
                disabled={isLoading}
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim() || isLoading}
                className={styles.sendButton}
                aria-label="שלח"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          )}

          {/* Sent indicator */}
          {notified && stage === 'done' && (
            <div className={styles.notifiedBadge}>✅ הפרטים נשלחו לערדית</div>
          )}
        </div>
      )}
    </>
  );
}
