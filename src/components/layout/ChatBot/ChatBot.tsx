'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ChatBot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  options?: string[];
  isMultiSelect?: boolean;
}

interface UserData {
  name?: string;
  phone?: string;
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
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [inputType, setInputType] = useState<'text' | 'tel'>('text');
  const [showInput, setShowInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when shown
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

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

  const addBotMessage = (content: string, options?: string[], isMultiSelect = false) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content,
        timestamp: new Date(),
        options,
        isMultiSelect
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

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => {
      if (prev.includes(feature)) {
        return prev.filter(f => f !== feature);
      } else {
        return [...prev, feature];
      }
    });
  };

  const handleFeaturesDone = () => {
    if (selectedFeatures.length === 0) {
      addUserMessage('אין תכונות מיוחדות');
      setUserData(prev => ({ ...prev, features: [] }));
    } else {
      const featuresText = selectedFeatures.join(', ');
      addUserMessage(featuresText);
      setUserData(prev => ({ ...prev, features: selectedFeatures }));
    }
    setSelectedFeatures([]);
    setCurrentStep(7);
    // Ask for name
    setTimeout(() => {
      setShowInput(true);
      setInputType('text');
      addBotMessage('נפלא! 😊 איך קוראים לך?');
    }, 500);
  };

  const handleInputSubmit = (value: string) => {
    if (!value.trim()) return;

    addUserMessage(value);
    setInputValue('');
    setShowInput(false);

    if (currentStep === 7) {
      // Name submitted
      setUserData(prev => ({ ...prev, name: value }));
      setCurrentStep(8);
      setTimeout(() => {
        setShowInput(true);
        setInputType('tel');
        addBotMessage('נעים מאוד! 📱 מה מספר הטלפון שלך? (כדי שאוכל לחזור אליך בווטסאפ)');
      }, 500);
    } else if (currentStep === 8) {
      // Phone submitted - validate
      const cleanPhone = value.replace(/\D/g, '');
      if (cleanPhone.length >= 9) {
        const formattedPhone = cleanPhone.startsWith('0') ? '972' + cleanPhone.slice(1) : cleanPhone;
        setUserData(prev => ({ ...prev, phone: formattedPhone }));
        setCurrentStep(9);
        generateSummary();
      } else {
        setTimeout(() => {
          setShowInput(true);
          setInputType('tel');
          addBotMessage('אופס! 😅 המספר לא נראה תקין. אפשר לנסות שוב? (לדוגמה: 050-1234567)');
        }, 500);
      }
    }
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
            'מה חשוב לכם בנכס? (בחרו כמה שרוצים) ✨',
            [
              '🏊 בריכה פרטית',
              '🛁 ג\'קוזי',
              '🌅 נוף מדהים',
              '♿ נגישות',
              '🐕 ידידותי לחיות'
            ],
            true // Multi-select mode
          );
        }, 500);
        break;

      default:
        break;
    }
  };

  const generateSummary = () => {
    const data = { ...userData };
    const features = data.features?.join(', ') || 'אין העדפות מיוחדות';
    
    setTimeout(() => {
      addBotMessage(
        `מעולה ${data.name}! ✨ הנה הסיכום:\n\n` +
        `👤 שם: ${data.name}\n` +
        `📱 טלפון: ${data.phone}\n` +
        `🏡 סוג: ${data.propertyType}\n` +
        `📍 אזור: ${data.location}\n` +
        `👥 אנשים: ${data.guestCount}\n` +
        `📅 תאריכים: ${data.dates}\n` +
        `💰 תקציב: ${data.budget}\n` +
        `✨ תכונות: ${features}\n\n` +
        `אעביר אותך עכשיו לוואטסאפ ואחזור אליך ישירות! 🎉`,
        ['📱 עבור לוואטסאפ']
      );
    }, 1000);
  };

  const sendToWhatsApp = () => {
    const data = userData;
    const features = data.features?.join(', ') || 'אין העדפות מיוחדות';
    
    const message = `היי! אני ${data.name} 👋

אני מחפש/ת נכס להשכרה:

🏡 סוג נכס: ${data.propertyType}
📍 אזור: ${data.location}
👥 מספר אנשים: ${data.guestCount}
📅 תאריכים: ${data.dates}
💰 תקציב: ${data.budget}
✨ תכונות חשובות: ${features}

📱 הטלפון שלי: ${data.phone}

אשמח שתחזרי אליי ונמצא את המקום המושלם! 🏡`;

    const whatsappUrl = `https://wa.me/972523983394?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppClick = () => {
    sendToWhatsApp();
    setTimeout(() => {
      addBotMessage(
        `תודה רבה ${userData.name}! 💚\nפתחתי לך את הוואטסאפ.\nאחזור אליך בהקדם למספר: ${userData.phone}\nנמצא לך את המקום המושלם! 🏡✨`
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
              src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
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
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
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
                      src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
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

                {/* Options Buttons or Multi-Select */}
                {msg.role === 'assistant' && msg.options && idx === messages.length - 1 && (
                  <div className={styles.options}>
                    {msg.isMultiSelect ? (
                      // Multi-select checkboxes
                      <>
                        {msg.options.map((option, optIdx) => (
                          <label key={optIdx} className={styles.checkboxLabel}>
                            <input
                              type="checkbox"
                              checked={selectedFeatures.includes(option)}
                              onChange={() => handleFeatureToggle(option)}
                              className={styles.checkbox}
                            />
                            <span className={styles.checkboxText}>{option}</span>
                          </label>
                        ))}
                        <button
                          className={styles.doneButton}
                          onClick={handleFeaturesDone}
                        >
                          ✅ המשך
                        </button>
                      </>
                    ) : (
                      // Regular buttons
                      msg.options.map((option, optIdx) => (
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
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className={styles.messageGroup}>
                <Image
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
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

          {/* Input Area */}
          {showInput && (
            <div className={styles.inputArea}>
              <input
                ref={inputRef}
                type={inputType}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleInputSubmit(inputValue);
                  }
                }}
                placeholder={inputType === 'tel' ? '050-1234567' : 'הקלד/י כאן...'}
                className={styles.input}
              />
              <button
                className={styles.sendButton}
                onClick={() => handleInputSubmit(inputValue)}
              >
                ➤
              </button>
            </div>
          )}

          {/* Progress Bar */}
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill}
              style={{ width: `${(currentStep / 9) * 100}%` }}
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
