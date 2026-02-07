/**
 * EnhancedChatBot - Hybrid AI ChatBot
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ChatBotV2.module.css';
import { getHybridAI, AIMessage } from '@/lib/ai/hybrid-ai';
import { getContextManager } from '@/lib/ai/context-manager';
import { Property } from '@/types/property';

interface Message extends AIMessage {
  id: string;
  timestamp: Date;
  properties?: Property[];
  quickReplies?: string[];
}

const SYSTEM_PROMPT = `אתה ערדית, העוזרת החכמה של MULTIBRAWN.

עזור ללקוחות למצוא נכסי נופש - צימרים, וילות, דירות, מתחמי אירועים.

סגנון: קצר (2-3 משפטים), חם, אישי, עם אימוג'י.

מה לאסוף: סוג נכס, אזור, תאריכים, מספר אנשים, תקציב, דרישות מיוחדות.

אחרי 4-5 הודעות: "מעולה! יש לי את כל הפרטים 🎉 אעביר אותך ל-WhatsApp!"`;

export default function EnhancedChatBot({ properties }: { properties: Property[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hybridAI = getHybridAI();
  const contextManager = getContextManager();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('שלום! 👋 אני ערדית, העוזרת החכמה של MULTIBRAWN.\n\nאני כאן לעזור לך למצוא את המקום המושלם!\n\nמה אתה מחפש? 🏠✨', ['צימר רומנטי', 'וילה משפחתית', 'מתחם אירועים']);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (content: string, quickReplies?: string[]) => {
    const message: Message = {
      id: `bot_${Date.now()}`,
      role: 'assistant',
      content,
      timestamp: new Date(),
      quickReplies,
    };
    setMessages(prev => [...prev, message]);
    contextManager.addMessage(userId, 'assistant', content);
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    const message: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    contextManager.addMessage(userId, 'user', userMessage);

    setIsTyping(true);

    try {
      const aiMessages: AIMessage[] = messages
        .concat(message)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await hybridAI.chat(aiMessages, {
        provider: 'auto',
        systemPrompt: SYSTEM_PROMPT,
        temperature: 0.9,
      });

      console.log(`AI Provider: ${response.provider}`);

      await new Promise(resolve => setTimeout(resolve, 1000));

      const intent = await hybridAI.analyzeIntent(userMessage);
      const quickReplies = generateQuickReplies(intent);

      addBotMessage(response.message, quickReplies);
    } catch (error) {
      console.error('ChatBot error:', error);
      addBotMessage('אופס! משהו השתבש. נסה שוב או פנה אלינו ב-WhatsApp 📱');
    } finally {
      setIsTyping(false);
    }
  };

  const generateQuickReplies = (intent: any): string[] => {
    if (!intent.entities?.propertyType) {
      return ['צימר רומנטי', 'וילה משפחתית', 'מתחם אירועים'];
    } else if (!intent.entities?.area) {
      return ['צפון', 'מרכז', 'דרום'];
    } else if (!intent.entities?.guests) {
      return ['זוג', '2-4 אורחים', '5-8 אורחים'];
    } else {
      return ['תראה לי נכסים', 'שלח ל-WhatsApp'];
    }
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSend(), 100);
  };

  const handleWhatsApp = () => {
    const summary = contextManager.getConversationSummary(userId);
    const message = encodeURIComponent(
      `היי! הגעתי מהאתר של MULTIBRAWN.\n\n${summary}\n\nאשמח לעזרה! 😊`
    );
    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const handleReset = () => {
    if (confirm('להתחיל שיחה חדשה?')) {
      contextManager.resetContext(userId);
      setMessages([]);
    }
  };

  if (!isOpen) {
    return (
      <button className={styles.chatButton} onClick={() => setIsOpen(true)} aria-label="פתח צ'אט">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {messages.length > 0 && <span className={styles.badge}>{messages.length}</span>}
      </button>
    );
  }

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <div className={styles.avatar}>🤖</div>
        <div className={styles.headerInfo}>
          <h3>ערדית - AI חכם</h3>
          <p>Claude + Gemini Hybrid</p>
        </div>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>✕</button>
      </div>

      <div className={styles.messages}>
        {messages.map(msg => (
          <div key={msg.id} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.bot}`}>
            <div className={styles.messageContent}>
              <p>{msg.content}</p>
              <span className={styles.time}>
                {msg.timestamp.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {msg.quickReplies && (
              <div className={styles.quickReplies}>
                {msg.quickReplies.map((reply, idx) => (
                  <button key={idx} onClick={() => handleQuickReply(reply)} className={styles.quickReply}>
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className={`${styles.message} ${styles.bot}`}>
            <div className={styles.typing}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className={styles.inputArea}>
        <textarea
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="כתוב הודעה..."
          rows={1}
          disabled={isTyping}
          className={styles.input}
        />
        <button onClick={handleSend} disabled={!inputValue.trim() || isTyping} className={styles.sendButton}>
          ↑
        </button>
      </div>

      <div className={styles.actions}>
        <button onClick={handleWhatsApp} className={styles.actionBtn}>
          📱 WhatsApp
        </button>
        <button onClick={handleReset} className={styles.actionBtn}>
          🔄 התחל מחדש
        </button>
      </div>
    </div>
  );
}
