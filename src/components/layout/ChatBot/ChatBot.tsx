'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ChatBot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  options?: string[];
}

interface UserData {
  propertyType?: string;
  location?: string;
  guestCount?: string;
  dates?: string;
  budget?: string;
  features?: string[];
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Start conversation when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          'היי! 👋 אני ערדית מ-MULTIBRAWN\nאני כאן לעזור לך למצוא את הנכס המושלם!',
          ['בואי נתחיל 🚀']
        );
      }, 500);
    }
  }, [isOpen]);

  const addBotMessage = (content: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content,
        timestamp: new Date(),
        options
      }]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    setMessages(prev => [...prev, {
      role: 'user',
      content,
      timestamp: new Date()
    }]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    processFlow(option);
  };

  const processFlow = (userInput: string) => {
    switch (currentStep) {
      case 0: // Start
        setCurrentStep(1);
        setTimeout(() => {
          addBotMessage(
            'איזה סוג נכס מחפשים? 🏡',
            [
              '💕 צימר רומנטי',
              '🏠 וילה משפחתית',
              '🏙️ דירת נופש',
              '🏨 מלון בוטיק',
              '🎉 מתחם לאירוע'
            ]
          );
        }, 500);
        break;

      case 1: // Property type
        setUserData(prev => ({ ...prev, propertyType: userInput }));
        setCurrentStep(2);
        setTimeout(() => {
          addBotMessage(
            'באיזה אזור מחפשים? 📍',
            [
              '🌲 צפון (גליל, כנרת, גולן)',
              '🌆 מרכז (תל אביב, הרצליה)',
              '🏜️ דרום (אילת, מדבר יהודה)',
              '🕌 ירושלים והסביבה',
              '🤷 עדיין לא החלטתי'
            ]
          );
        }, 500);
        break;

      case 2: // Location
        setUserData(prev => ({ ...prev, location: userInput }));
        setCurrentStep(3);
        setTimeout(() => {
          addBotMessage(
            'כמה אנשים בערך? 👥',
            [
              '💑 זוג (2)',
              '👨‍👩‍👧 משפחה קטנה (3-5)',
              '👨‍👩‍👧‍👦 משפחה בינונית (6-8)',
              '👥 קבוצה גדולה (9+)'
            ]
          );
        }, 500);
        break;

      case 3: // Guest count
        setUserData(prev => ({ ...prev, guestCount: userInput }));
        setCurrentStep(4);
        setTimeout(() => {
          addBotMessage(
            'יש תאריכים ספציפיים? 📅',
            [
              '📅 סוף שבוע הקרוב',
              '📅 בעוד שבועיים',
              '📅 בעוד חודש',
              '🤷 עדיין לא יודע/ת'
            ]
          );
        }, 500);
        break;

      case 4: // Dates
        setUserData(prev => ({ ...prev, dates: userInput }));
        setCurrentStep(5);
        setTimeout(() => {
          addBotMessage(
            'מה התקציב המשוער ללילה? 💰',
            [
              '💵 עד 800 ש"ח',
              '💵 800-1,500 ש"ח',
              '💵 1,500-2,500 ש"ח',
              '💵 2,500+ ש"ח',
              '🤷 גמיש'
            ]
          );
        }, 500);
        break;

      case 5: // Budget
        setUserData(prev => ({ ...prev, budget: userInput }));
        setCurrentStep(6);
        setTimeout(() => {
          addBotMessage(
            'תכונות שחשובות לכם? (אפשר לבחור כמה) ✨',
            [
              '🏊 בריכה פרטית',
              '🛁 ג\'קוזי',
              '🌅 נוף מדהים',
              '♿ נגישות',
              '🐕 ידידותי לחיות',
              '✅ סיימתי לבחור'
            ]
          );
        }, 500);
        break;

      case 6: // Features
        if (userInput === '✅ סיימתי לבחור') {
          setCurrentStep(7);
          generateSummary();
        } else {
          // Add feature to list
          setUserData(prev => ({
            ...prev,
            features: [...(prev.features || []), userInput]
          }));
          // Show options again for multiple selection
          setTimeout(() => {
            addBotMessage(
              'מעולה! רוצים לבחור עוד תכונות? ✨',
              [
                '🏊 בריכה פרטית',
                '🛁 ג\'קוזי',
                '🌅 נוף מדהים',
                '♿ נגישות',
                '🐕 ידידותי לחיות',
                '✅ סיימתי לבחור'
              ]
            );
          }, 300);
        }
        break;

      default:
        break;
    }
  };

  const generateSummary = () => {
    const data = userData;
    const features = data.features?.join(', ') || 'לא צוין';
    
    setTimeout(() => {
      addBotMessage(
        `מעולה! ✨ הנה הסיכום:\n\n` +
        `🏡 סוג: ${data.propertyType}\n` +
        `📍 אזור: ${data.location}\n` +
        `👥 אנשים: ${data.guestCount}\n` +
        `📅 תאריכים: ${data.dates}\n` +
        `💰 תקציב: ${data.budget}\n` +
        `✨ תכונות: ${features}\n\n` +
        `אעביר אותך עכשיו לוואטסאפ ושם נמצא לך את המקום המושלם! 🎉`,
        ['📱 עבור לוואטסאפ']
      );
    }, 1000);
  };

  const sendToWhatsApp = () => {
    const data = userData;
    const features = data.features?.join(', ') || 'לא צוין';
    
    const message = `היי מולטיבראון! 🏡

אני מחפש/ת נכס להשכרה:

🏡 סוג נכס: ${data.propertyType}
📍 אזור: ${data.location}
👥 מספר אנשים: ${data.guestCount}
📅 תאריכים: ${data.dates}
💰 תקציב: ${data.budget}
✨ תכונות חשובות: ${features}

אשמח לעזרה למצוא את המקום המושלם!`;

    const whatsappUrl = `https://wa.me/972523983394?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppClick = () => {
    sendToWhatsApp();
    setTimeout(() => {
      addBotMessage(
        'תודה רבה! 💚\nפתחתי לך את וואטסאפ.\nנדבר שם ונמצא לך את המקום המושלם! 🏡✨'
      );
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          className={styles.floatingButton}
          onClick={() => setIsOpen(true)}
          aria-label="פתח צ'אט"
        >
          <div className={styles.avatarWrapper}>
            <Image
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733058671/ardit-avatar_zso1ac.jpg"
              alt="ערדית"
              width={70}
              height={70}
              className={styles.avatar}
            />
            <span className={styles.badge}>1</span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <Image
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733058671/ardit-avatar_zso1ac.jpg"
                alt="ערדית"
                width={45}
                height={45}
                className={styles.headerAvatar}
              />
              <div className={styles.headerText}>
                <h3>ערדית - AI Assistant</h3>
                <p className={styles.status}>
                  <span className={styles.statusDot}></span>
                  מחוברת עכשיו
                </p>
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
            {messages.map((msg, idx) => (
              <div key={idx} className={styles.messageWrapper}>
                {msg.role === 'assistant' && (
                  <div className={styles.messageGroup}>
                    <Image
                      src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733058671/ardit-avatar_zso1ac.jpg"
                      alt="ערדית"
                      width={32}
                      height={32}
                      className={styles.messageAvatar}
                    />
                    <div className={`${styles.message} ${styles.assistantMessage}`}>
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
                  </div>
                )}

                {msg.role === 'user' && (
                  <div className={`${styles.message} ${styles.userMessage}`}>
                    <div className={styles.messageContent}>{msg.content}</div>
                    <span className={styles.timestamp}>
                      {msg.timestamp.toLocaleTimeString('he-IL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                )}

                {/* Options Buttons */}
                {msg.role === 'assistant' && msg.options && idx === messages.length - 1 && (
                  <div className={styles.options}>
                    {msg.options.map((option, optIdx) => (
                      <button
                        key={optIdx}
                        className={styles.optionButton}
                        onClick={() => {
                          if (option === '📱 עבור לוואטסאפ') {
                            handleWhatsAppClick();
                          } else {
                            handleOptionClick(option);
                          }
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={styles.messageGroup}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1733058671/ardit-avatar_zso1ac.jpg"
                  alt="ערדית"
                  width={32}
                  height={32}
                  className={styles.messageAvatar}
                />
                <div className={`${styles.message} ${styles.assistantMessage}`}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / 7) * 100}%` }}
            ></div>
          </div>

          {/* Footer */}
          <div className={styles.footer}>
            <p className={styles.footerText}>
              מופעל על ידי MULTIBRAWN AI ✨
            </p>
          </div>
        </div>
      )}
    </>
  );
}
