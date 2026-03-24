'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ChatBot.module.css';

// ============================================
// TYPES
// ============================================

interface Action {
  type: 'quick_reply' | 'whatsapp' | 'page' | 'phone';
  label: string;
  value?: string;
  summary?: string;
  url?: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Action[];
}

interface ConvMessage {
  role: 'user' | 'assistant';
  content: string;
}

// ============================================
// INITIAL GREETING
// ============================================

const INITIAL_MESSAGE: Omit<Message, 'id' | 'timestamp'> = {
  role: 'assistant',
  content: 'שלום! 👋 אני ערדית, הסוכנת החכמה של MULTIBRAWN.\nאשמח לעזור לך למצוא את הנכס המושלם! מה מעניין אותך?',
  actions: [
    { type: 'quick_reply', label: 'צימר רומנטי 💕', value: 'אני מחפש צימר רומנטי לזוג' },
    { type: 'quick_reply', label: 'וילה משפחתית 🏡', value: 'אני מחפש וילה למשפחה' },
    { type: 'quick_reply', label: 'אירוע / שבת חתן 🎊', value: 'אני מתכנן אירוע או שבת חתן' },
    { type: 'quick_reply', label: 'ראה גלריה 📸', value: 'אשמח לראות תמונות של הנכסים' },
  ],
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function ChatBot() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationHistory, setConversationHistory] = useState<ConvMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef<string>(Math.random().toString(36).slice(2));

  // Fade-in button after 2s
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
      setMessages([
        {
          ...INITIAL_MESSAGE,
          id: Date.now().toString(),
          timestamp: new Date(),
        },
      ]);
    }
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages.length]);

  // ============================================
  // SEND MESSAGE TO AI
  // ============================================

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputValue('');
      setIsLoading(true);

      // Track event
      try {
        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'chatbot_message',
            sessionId: sessionId.current,
            page: window.location.pathname,
            metadata: { messageLength: text.length },
          }),
        });
      } catch {}

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            conversationHistory,
          }),
        });

        const data = await res.json();

        const botMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || 'אופס, משהו השתבש. נסה שוב.',
          timestamp: new Date(),
          actions: data.actions || [],
        };

        setMessages((prev) => [...prev, botMsg]);
        setConversationHistory(data.history || []);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: 'אופס! 😅 משהו השתבש. אפשר לפנות ישירות בוואטסאפ ונעזור מיד!',
            timestamp: new Date(),
            actions: [
              { type: 'whatsapp', label: 'שלח לוואטסאפ 📱', summary: 'שלום! פניתי דרך הצ\u05D0ט ואשמח לעזרה' },
              { type: 'phone', label: 'התקשר עכשיו 📞' },
            ],
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, conversationHistory]
  );

  // ============================================
  // HANDLE ACTIONS
  // ============================================

  const handleAction = useCallback(
    (action: Action) => {
      switch (action.type) {
        case 'quick_reply':
          sendMessage(action.value || action.label);
          break;

        case 'whatsapp': {
          const summary = action.summary || 'שלום! פניתי דרך הצ\u05D0ט של האתר ואשמח לעזרה 😊';
          const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '972523983394';
          const encoded = encodeURIComponent(summary);

          // Track WhatsApp click
          try {
            fetch('/api/events', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                eventType: 'whatsapp_click',
                sessionId: sessionId.current,
                page: 'chatbot',
                metadata: { source: 'ai_agent' },
              }),
            });
          } catch {}

          // Save lead
          const lastExtracted = conversationHistory.reduce(
            (acc, msg) => {
              const phoneMatch = msg.content.match(/0[5-9]\d[-\s]?\d{3}[-\s]?\d{4}/);
              const nameMatch = msg.content.match(/(?:שמי|אני|קוראים לי)\s+([א-ת\s]{2,20})/);
              if (phoneMatch) acc.phone = phoneMatch[0];
              if (nameMatch) acc.name = nameMatch[1]?.trim();
              return acc;
            },
            {} as { phone?: string; name?: string }
          );

          try {
            fetch('/api/leads', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                leadData: { ...lastExtracted, sessionId: sessionId.current, source: 'ai_agent' },
                source: 'chatbot',
              }),
            });
          } catch {}

          window.open(`https://wa.me/${waNumber}?text=${encoded}`, '_blank');
          break;
        }

        case 'page':
          if (action.url) {
            if (action.url.startsWith('http')) {
              window.open(action.url, '_blank');
            } else {
              router.push(action.url);
              setIsOpen(false);
            }
          }
          break;

        case 'phone':
          window.open('tel:+972523983394', '_self');
          break;
      }
    },
    [sendMessage, conversationHistory, router]
  );

  // ============================================
  // TOGGLE OPEN
  // ============================================

  const handleToggle = () => {
    const opening = !isOpen;
    setIsOpen(opening);
    if (opening) {
      try {
        fetch('/api/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            eventType: 'chatbot_open',
            sessionId: sessionId.current,
            page: window.location.pathname,
          }),
        });
      } catch {}
    }
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <>
      {/* Floating Button */}
      <div className={styles.chatButtonWrapper}>
        <button
          onClick={handleToggle}
          className={`${styles.chatButton} ${isVisible ? styles.visible : ''}`}
          aria-label="פתח צ'אט עם ערדית"
          data-chatbot
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" className={styles.closeIcon}>
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          ) : (
            <img
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
              alt="ערדית"
              className={styles.avatarImage}
            />
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
              <img
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
                alt="ערדית"
                className={styles.avatar}
              />
              <div className={styles.statusIndicator} />
            </div>
            <div className={styles.headerInfo}>
              <p className={styles.botName}>ערדית — סוכנת AI</p>
              <p className={styles.botStatus}>🟢 מגיבה מיידית</p>
            </div>
            <button onClick={handleToggle} className={styles.minimizeButton} aria-label="סגור">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div key={msg.id} className={`${styles.messageBubble} ${styles[msg.role]}`}>
                {msg.role === 'assistant' && (
                  <img
                    src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
                    alt="ערדית"
                    className={styles.messageAvatar}
                  />
                )}
                <div>
                  <div className={styles.messageContent}>
                    <p className={styles.messageText}>{msg.content}</p>
                    <span className={styles.messageTime}>
                      {msg.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className={styles.actionsGrid}>
                      {msg.actions.map((action, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(action)}
                          className={`${styles.actionBtn} ${
                            action.type === 'whatsapp'
                              ? styles.actionBtnWhatsapp
                              : action.type === 'phone'
                              ? styles.actionBtnPhone
                              : action.type === 'page'
                              ? styles.actionBtnPage
                              : styles.actionBtnQuick
                          }`}
                        >
                          {action.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className={`${styles.messageBubble} ${styles.assistant}`}>
                <img
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
                  alt="ערדית"
                  className={styles.messageAvatar}
                />
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
          <div className={styles.inputArea}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(inputValue);
                }
              }}
              placeholder="כתוב הודעה..."
              className={styles.input}
              disabled={isLoading}
            />
            <button
              onClick={() => sendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className={styles.sendButton}
              aria-label="שלח"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
