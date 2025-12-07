"use client";

import { useState, useRef, useEffect } from "react";
import styles from './ChatBot.module.css';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  quickReplies?: QuickReply[];
  showWhatsAppButton?: boolean;
}

interface QuickReply {
  text: string;
  value: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [userInfo, setUserInfo] = useState<Record<string, any>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Show button after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
  }, [isOpen]);

  const startConversation = () => {
    const welcomeMsg: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: 'היי! 👋 אני ערדית, העוזרת הדיגיטלית של MULTIBRAWN.\n\n🎯 המשימה שלי: למצוא לכם את המקום המושלם לחופשה!\n\nבואו נתחיל - איזה סוג מקום אתם מחפשים?',
      timestamp: new Date(),
      quickReplies: [
        { text: '💑 צימר רומנטי', value: 'צימר רומנטי' },
        { text: '🏛️ וילה משפחתית', value: 'וילה משפחתית' },
        { text: '🏨 מלון בוטיק', value: 'מלון בוטיק' },
        { text: '🏢 דירת נופש', value: 'דירת נופש' },
        { text: '💍 מתחם לאירוע', value: 'מתחם לאירוע' },
      ],
    };
    setMessages([welcomeMsg]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Call Gemini API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Update conversation history
      setConversationHistory(data.conversationHistory || []);

      // Add AI response
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        showWhatsAppButton: data.isSummary,
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error('Chat error:', error);
      
      // Fallback message
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'אופס! משהו השתבש 😅\nאפשר לנסות שוב, או לכתוב לנו ישירות בוואטסאפ!',
        timestamp: new Date(),
        showWhatsAppButton: true,
      };
      
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickReply = (value: string) => {
    sendMessage(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleWhatsApp = () => {
    // Extract conversation for WhatsApp
    const conversation = messages
      .filter(m => m.role === 'user' || m.role === 'assistant')
      .map(m => `${m.role === 'user' ? '👤' : '🤖'} ${m.content}`)
      .join('\n\n');

    const message = encodeURIComponent(
      `היי MULTIBRAWN! 👋\n\nזה סיכום השיחה שלי עם ערדית:\n\n${conversation}\n\nאשמח לקבל הצעות מתאימות!`
    );

    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={`${styles.chatButton} ${isVisible ? styles.visible : ''}`}
        data-chatbot
        aria-label="פתח צ'אט עם ערדית"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        ) : (
          <img 
            src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png" 
            alt="ערדית"
            className={styles.avatarImage}
          />
        )}
        {!isOpen && <span className={styles.badge}>ערדית</span>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <img 
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png" 
                  alt="ערדית"
                  className={styles.avatarImg}
                />
              </div>
              <div>
                <h3>ערדית</h3>
                <p>העוזרת הדיגיטלית של MULTIBRAWN</p>
              </div>
            </div>
            <button onClick={toggleChat} className={styles.closeButton} aria-label="סגור">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messages}>
            {messages.map((msg) => (
              <div key={msg.id} className={styles.messageWrapper}>
                <div className={`${styles.message} ${styles[msg.role]}`}>
                  <div className={styles.messageContent}>
                    {msg.content.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                  <span className={styles.timestamp}>
                    {msg.timestamp.toLocaleTimeString('he-IL', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>

                {/* Quick Replies */}
                {msg.quickReplies && msg.quickReplies.length > 0 && (
                  <div className={styles.quickReplies}>
                    {msg.quickReplies.map((reply, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleQuickReply(reply.value)}
                        className={styles.quickReply}
                        disabled={isLoading}
                      >
                        {reply.text}
                      </button>
                    ))}
                  </div>
                )}

                {/* WhatsApp Button */}
                {msg.showWhatsAppButton && (
                  <div className={styles.actionButtonContainer}>
                    <button
                      onClick={handleWhatsApp}
                      className={styles.whatsappButton}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      💬 שלח לערדית בוואטסאפ
                    </button>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.message} ${styles.assistant}`}>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="כתבו כאן... 💬"
              className={styles.input}
              disabled={isLoading}
            />
            <button
              type="submit"
              className={styles.sendButton}
              disabled={!input.trim() || isLoading}
              aria-label="שלח"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 8L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </form>

          {/* Powered by */}
          <div className={styles.poweredBy}>
            מופעל על ידי Google Gemini AI ✨
          </div>
        </div>
      )}
    </>
  );
}
