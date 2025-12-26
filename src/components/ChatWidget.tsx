'use client';

import { useState } from 'react';
import styles from './ChatWidget.module.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationState, setConversationState] = useState<'start' | 'accommodation' | 'event'>('start');
  const [userData, setUserData] = useState({
    name: '',
    phone: '',
    type: '',
    details: ''
  });

  const sendToWhatsApp = (data: typeof userData) => {
    const message = `שלום! פנייה חדשה מהאתר:
👤 שם: ${data.name}
📱 טלפון: ${data.phone}
🏠 סוג: ${data.type}
📝 פרטים: ${data.details}`;
    
    const whatsappUrl = `https://wa.me/972523983394?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const addMessage = (text: string, isUser: boolean) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    addMessage(userMessage, true);
    setInput('');
    setIsLoading(true);

    // לוגיקת שיחה בסיסית
    setTimeout(() => {
      if (conversationState === 'start') {
        if (userMessage.includes('נופש') || userMessage.includes('לינה') || userMessage.includes('צימר')) {
          setConversationState('accommodation');
          addMessage('מעולה! אני כאן לעזור לך למצוא את הלינה המושלמת. באיזה אזור אתה מחפש?', false);
        } else if (userMessage.includes('אירוע') || userMessage.includes('חתונה') || userMessage.includes('בר מצווה')) {
          setConversationState('event');
          addMessage('נהדר! אשמח לעזור לך לארגן את האירוע. איזה סוג אירוע אתה מתכנן?', false);
        } else {
          addMessage('שלום! אני ארדית, העוזר הדיגיטלי של MULTIBRAWN. אני יכול לעזור לך למצוא לינה מושלמת או לארגן אירועים. במה אוכל לעזור?', false);
        }
      } else {
        addMessage('תודה על הפרטים! אעביר אותך לנציג שלנו ב-WhatsApp להמשך טיפול.', false);
        
        // שליחה ל-WhatsApp
        setTimeout(() => {
          sendToWhatsApp({
            name: 'לקוח מהצ\'אט',
            phone: 'לא סופק',
            type: conversationState === 'accommodation' ? 'לינה' : 'אירוע',
            details: userMessage
          });
        }, 1000);
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* כפתור צף */}
      <button
        className={`${styles.chatButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="פתח צ'אט"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* חלון צ'אט */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerContent}>
              <div className={styles.avatar}>
                <span>🤖</span>
              </div>
              <div className={styles.headerText}>
                <h3>ארדית</h3>
                <p>העוזר הדיגיטלי שלך</p>
              </div>
            </div>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
              aria-label="סגור צ'אט"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.length === 0 && (
              <div className={styles.welcomeMessage}>
                <div className={styles.avatar}>
                  <span>🤖</span>
                </div>
                <div className={styles.welcomeText}>
                  <h4>שלום! אני ארדית 👋</h4>
                  <p>אני כאן לעזור לך למצוא את הלינה המושלמת או לארגן אירועים מיוחדים.</p>
                  <div className={styles.quickButtons}>
                    <button onClick={() => {
                      addMessage('אני מחפש לינה', true);
                      setConversationState('accommodation');
                      setTimeout(() => {
                        addMessage('מעולה! באיזה אזור אתה מחפש?', false);
                      }, 500);
                    }}>
                      🏠 חיפוש לינה
                    </button>
                    <button onClick={() => {
                      addMessage('אני רוצה לארגן אירוע', true);
                      setConversationState('event');
                      setTimeout(() => {
                        addMessage('נהדר! איזה סוג אירוע?', false);
                      }, 500);
                    }}>
                      🎉 ארגון אירוע
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${styles.message} ${msg.isUser ? styles.userMessage : styles.botMessage}`}
              >
                {!msg.isUser && (
                  <div className={styles.messageAvatar}>🤖</div>
                )}
                <div className={styles.messageBubble}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className={styles.message}>
                <div className={styles.messageAvatar}>🤖</div>
                <div className={styles.messageBubble}>
                  <div className={styles.typing}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="כתוב הודעה..."
              className={styles.input}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={styles.sendButton}
              aria-label="שלח"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
