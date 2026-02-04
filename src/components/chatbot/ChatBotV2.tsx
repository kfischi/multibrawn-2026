/**
 * ChatBotV2 - Advanced AI ChatBot
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ChatBotV2.module.css';
import { getGeminiAdvanced, AIResponse } from '@/lib/ai/gemini-advanced';
import { getContextManager } from '@/lib/ai/context-manager';
import { Property } from '@/types/property';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  properties?: Property[];
  suggestions?: string[];
}

export default function ChatBotV2({ properties }: { properties: Property[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}`);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const gemini = getGeminiAdvanced();
  const contextManager = getContextManager();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage({
        message: 'שלום! 👋 אני ערדית, העוזרת הדיגיטלית של MULTIBRAWN.\n\nאני כאן כדי לעזור לך למצוא את המקום המושלם!\n\nמה אתה מחפש? 🏠',
        suggestions: ['צימר רומנטי', 'וילה משפחתית', 'מתחם אירועים'],
      });
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (response: AIResponse) => {
    const message: Message = {
      id: `bot_${Date.now()}`,
      role: 'assistant',
      content: response.message,
      timestamp: new Date(),
      properties: response.recommendedProperties,
      suggestions: response.suggestions,
    };
    setMessages(prev => [...prev, message]);
    contextManager.addMessage(userId, 'assistant', response.message);
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
      const context = contextManager.getUserContext(userId);
      const response = await gemini.chat(userMessage, context, properties);

      await new Promise(resolve => setTimeout(resolve, 1000));

      addBotMessage(response);
    } catch (error) {
      console.error('ChatBot error:', error);
      addBotMessage({
        message: 'אופס! משהו השתבש. נסה שוב או פנה אלינו ב-WhatsApp 📱',
        nextAction: 'continue',
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  const handleWhatsAppSend = () => {
    const summary = contextManager.getConversationSummary(userId);
    const message = encodeURIComponent(
      `היי! הגעתי מהאתר של MULTIBRAWN.\n\n${summary}\n\nאשמח לעזרה! 😊`
    );
    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const handleReset = () => {
    if (confirm('האם להתחיל שיחה חדשה?')) {
      contextManager.resetContext(userId);
      setMessages([]);
    }
  };

  if (!isOpen) {
    return (
      <button
        className={styles.chatButton}
        onClick={() => setIsOpen(true)}
        aria-label="פתח צ'אט"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
        {messages.length > 0 && (
          <span className={styles.badge}>{messages.length}</span>
        )}
      </button>
    );
  }

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <div className={styles.avatar}>🤖</div>
        <div className={styles.headerInfo}>
          <h3>ערדית - AI חכם</h3>
          <p>מחוברת ופעילה</p>
        </div>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          ✕
        </button>
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

            {msg.properties && msg.properties.length > 0 && (
              <div className={styles.properties}>
                {msg.properties.map(prop => (
                  <div key={prop.id} className={styles.propertyCard}>
                    <Image src={prop.image} alt={prop.name} width={200} height={150} style={{ objectFit: 'cover' }} />
                    <div>
                      <h4>{prop.name}</h4>
                      <p>{prop.location}</p>
                      <span>{prop.priceRange}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {msg.suggestions && (
              <div className={styles.quickReplies}>
                {msg.suggestions.map((suggestion, idx) => (
                  <button key={idx} onClick={() => handleSuggestionClick(suggestion)} className={styles.quickReply}>
                    {suggestion}
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
        <button onClick={handleWhatsAppSend} className={styles.actionBtn}>
          📱 WhatsApp
        </button>
        <button onClick={handleReset} className={styles.actionBtn}>
          🔄 התחל מחדש
        </button>
      </div>
    </div>
  );
}
