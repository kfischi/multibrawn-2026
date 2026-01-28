/**
 * ChatBotV2 - Advanced AI ChatBot Component
 * צ'אטבוט משודרג עם AI חכם, זיכרון ו-UI מודרני
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
  // State
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userId] = useState(() => `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Managers
  const gemini = getGeminiAdvanced();
  const contextManager = getContextManager();

  /**
   * Initialize chat with greeting
   */
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage({
        message: `שלום! 👋 אני ערדית, העוזרת הדיגיטלית החכמה של MULTIBRAWN.\n\nאני כאן כדי לעזור לך למצוא את המקום המושלם לחופשה או לאירוע שלך!\n\nספר לי, מה אתה מחפש? 🏠✨`,
        suggestions: ['צימר רומנטי', 'וילה משפחתית', 'מתחם אירועים'],
      });
    }
  }, [isOpen]);

  /**
   * Auto-scroll to bottom
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Add bot message
   */
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

  /**
   * Handle send message
   */
  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage = inputValue.trim();
    setInputValue('');

    // Add user message
    const message: Message = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    contextManager.addMessage(userId, 'user', userMessage);

    // Show typing indicator
    setIsTyping(true);

    try {
      // Get AI response
      const context = contextManager.getUserContext(userId);
      const response = await gemini.chat(userMessage, context, properties);

      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Add bot response
      addBotMessage(response);
    } catch (error) {
      console.error('ChatBot Error:', error);
      addBotMessage({
        message: 'אופס! משהו השתבש. אבל אני כאן לעזור! נסה שוב או פנה אלינו ב-WhatsApp 📱',
        nextAction: 'continue',
      });
    } finally {
      setIsTyping(false);
    }
  };

  /**
   * Handle suggestion click
   */
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSend(), 100);
  };

  /**
   * Handle property view
   */
  const handlePropertyClick = (property: Property) => {
    contextManager.addViewedProperty(userId, property.id);
    window.open(`/gallery?property=${property.id}`, '_blank');
  };

  /**
   * Handle WhatsApp send
   */
  const handleWhatsAppSend = () => {
    const context = contextManager.getUserContext(userId);
    const summary = contextManager.getConversationSummary(userId);

    const message = encodeURIComponent(
      `היי! הגעתי מהאתר של MULTIBRAWN.\n\n${summary}\n\nאשמח לקבל עזרה נוספת! 😊`
    );

    window.open(
      `https://wa.me/972523983394?text=${message}`,
      '_blank'
    );
  };

  /**
   * Handle reset
   */
  const handleReset = () => {
    if (confirm('האם אתה בטוח שברצונך להתחיל שיחה חדשה?')) {
      contextManager.resetContext(userId);
      setMessages([]);
      setInputValue('');
    }
  };

  /**
   * Handle key press
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatBotContainer}>
      {/* Chat Button */}
      {!isOpen && (
        <button
          className={styles.chatButton}
          onClick={() => setIsOpen(true)}
          aria-label="פתח צ'אט עם ערדית"
        >
          <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          {messages.length > 0 && (
            <span className={styles.notificationBadge}>{messages.length}</span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.avatarContainer}>
              <div className={styles.avatar}>🤖</div>
              <span className={styles.statusIndicator}></span>
            </div>
            <div className={styles.headerInfo}>
              <h3 className={styles.botName}>ערדית - העוזרת החכמה</h3>
              <p className={styles.botStatus}>מחוברת ופעילה • AI מתקדם</p>
            </div>
            <button
              className={styles.minimizeButton}
              onClick={() => setIsOpen(false)}
              aria-label="סגור צ'אט"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageBubble} ${
                  message.role === 'user' ? styles.user : styles.assistant
                }`}
              >
                <div className={styles.messageContent}>
                  <p className={styles.messageText}>{message.content}</p>
                  <span className={styles.messageTime}>
                    {message.timestamp.toLocaleTimeString('he-IL', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                {/* Property Cards */}
                {message.properties && message.properties.length > 0 && (
                  <div className={styles.propertiesGrid}>
                    {message.properties.map((property) => (
                      <div
                        key={property.id}
                        className={styles.propertyCard}
                        onClick={() => handlePropertyClick(property)}
                      >
                        <div className={styles.propertyImage}>
                          <Image
                            src={property.image}
                            alt={property.name}
                            fill
                            sizes="200px"
                            style={{ objectFit: 'cover' }}
                          />
                        </div>
                        <div className={styles.propertyInfo}>
                          <h4>{property.name}</h4>
                          <p>{property.location}</p>
                          <span className={styles.propertyPrice}>{property.priceRange}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Quick Replies */}
                {message.suggestions && message.suggestions.length > 0 && (
                  <div className={styles.suggestionsContainer}>
                    {message.suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className={styles.suggestionButton}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={`${styles.messageBubble} ${styles.assistant}`}>
                <div className={styles.typingIndicator}>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                  <span className={styles.typingDot}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className={styles.inputArea}>
            <textarea
              ref={inputRef}
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="כתוב הודעה או שאל משהו..."
              rows={1}
              disabled={isTyping}
            />
            <button
              className={styles.sendButton}
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              aria-label="שלח הודעה"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>

          {/* Actions */}
          <div className={styles.actionsBar}>
            <button className={styles.actionButton} onClick={handleWhatsAppSend}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp
            </button>
            <button className={styles.actionButton} onClick={handleReset}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              התחל מחדש
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
