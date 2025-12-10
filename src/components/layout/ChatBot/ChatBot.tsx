'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './ChatBot.module.css';

interface Message {
  id: string;
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
  const [isVisible, setIsVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Show button after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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

  const addBotMessage = (content: string, options?: string[], isMultiSelect?: boolean) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const newMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content,
        timestamp: new Date(),
        options,
        isMultiSelect,
      };
      setMessages((prev) => [...prev, newMessage]);
    }, 1000);
  };

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    handleNextStep(option);
  };

  const handleMultiSelectConfirm = () => {
    if (selectedFeatures.length > 0) {
      addUserMessage(selectedFeatures.join(', '));
      setUserData((prev) => ({ ...prev, features: selectedFeatures }));
      setSelectedFeatures([]);
      setTimeout(() => {
        addBotMessage(
          `מעולה! סיכמנו:\n📍 ${userData.propertyType}\n📍 ${userData.location}\n👥 ${userData.guestCount}\n✨ ${selectedFeatures.join(', ')}\n\nעכשיו, בואי נתאים את ההצעות שלנו במדויק.\nמה השם שלך?`
        );
        setShowInput(true);
        setInputType('text');
        setCurrentStep(5);
      }, 1500);
    }
  };

  const handleInputSubmit = () => {
    if (!inputValue.trim()) return;

    if (currentStep === 5) {
      // Name
      addUserMessage(inputValue);
      setUserData((prev) => ({ ...prev, name: inputValue }));
      setInputValue('');
      setShowInput(false);
      setTimeout(() => {
        addBotMessage(`נעים מאוד ${inputValue}! 😊\nומה מספר הטלפון שלך?`);
        setShowInput(true);
        setInputType('tel');
        setCurrentStep(6);
      }, 1000);
    } else if (currentStep === 6) {
      // Phone validation
      const phoneRegex = /^05\d{8}$/;
      if (!phoneRegex.test(inputValue)) {
        addBotMessage('אופס! 😅 נראה שמספר הטלפון לא תקין.\nאנא הכניסי מספר בפורמט: 05XXXXXXXX');
        setInputValue('');
        return;
      }
      addUserMessage(inputValue);
      setUserData((prev) => ({ ...prev, phone: inputValue }));
      setInputValue('');
      setShowInput(false);
      setCurrentStep(7);
      setTimeout(() => {
        finishConversation();
      }, 1000);
    }
  };

  const handleNextStep = (option: string) => {
    switch (currentStep) {
      case 0:
        setCurrentStep(1);
        setTimeout(() => {
          addBotMessage(
            'אז בואי נתחיל! 🎯\nאיזה סוג נכס מעניין אותך?',
            ['צימר רומנטי 💕', 'וילה משפחתית 🏡', 'מלון בוטיק 🏨', 'מתחם אירועים 🎉']
          );
        }, 1000);
        break;
      case 1:
        setUserData((prev) => ({ ...prev, propertyType: option }));
        setCurrentStep(2);
        setTimeout(() => {
          addBotMessage(
            'מעולה! 👌\nבאיזה אזור את מחפשת?',
            ['צפון 🏔️', 'מרכז 🌆', 'דרום 🏜️', 'לא משנה לי 🌍']
          );
        }, 1000);
        break;
      case 2:
        setUserData((prev) => ({ ...prev, location: option }));
        setCurrentStep(3);
        setTimeout(() => {
          addBotMessage(
            'נהדר! 🎊\nלכמה אורחים את צריכה?',
            ['זוג (2) 👫', 'משפחה קטנה (4-6) 👨‍👩‍👧‍👦', 'משפחה גדולה (8-12) 👪', 'קבוצה (12+) 👥']
          );
        }, 1000);
        break;
      case 3:
        setUserData((prev) => ({ ...prev, guestCount: option }));
        setCurrentStep(4);
        setTimeout(() => {
          addBotMessage(
            'מושלם! ✨\nאילו תכונות חשובות לך?\n(אפשר לבחור כמה שרוצים)',
            ['בריכה פרטית 🏊', 'ג\'קוזי ספא 🛁', 'מטבח מאובזר 🍳', 'נוף מדהים 🌄', 'קרוב לאטרקציות 🎢', 'חניה פרטית 🚗'],
            true
          );
        }, 1000);
        break;
    }
  };

  const finishConversation = () => {
    addBotMessage(
      `תודה רבה ${userData.name}! 🙏\n\nקיבלתי את כל הפרטים:\n✅ ${userData.propertyType}\n✅ ${userData.location}\n✅ ${userData.guestCount}\n✅ ${userData.features?.join(', ')}\n\nאני שולחת לך עכשיו הודעת WhatsApp עם כל הפרטים,\nואנחנו ניצור איתך קשר תוך זמן קצר עם הצעות מדויקות!\n\nמקווה שמצאת את השיחה שלנו מועילה! 💖`
    );
    setTimeout(() => {
      sendToWhatsApp();
    }, 2000);
  };

  const sendToWhatsApp = () => {
    // Get only user responses (answers), not bot questions
    const userResponses = messages
      .filter((m) => m.role === 'user')
      .map((m) => m.content)
      .join('\n');

    const message = encodeURIComponent(
      `היי MULTIBRAWN! 👋\n\nזה סיכום התשובות שלי מהצ'אט:\n\n${userResponses}\n\nאשמח לקבל הצעות מתאימות!`
    );

    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button - FIXED POSITION! */}
      <div className={styles.chatButtonWrapper}>
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
        </button>
        {!isOpen && <div className={styles.chatLabel}>צ'אט עם ערדית</div>}
      </div>

      {/* Chat Window - FIXED POSITION! */}
      {isOpen && (
        <div className={styles.chatWindow}>
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>
                <img 
                  src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
                  alt="ערדית"
                  className={styles.avatarImage}
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
                  <div className={styles.messageContent}>{msg.content}</div>
                  {msg.options && !msg.isMultiSelect && (
                    <div className={styles.options}>
                      {msg.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className={styles.optionButton}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  {msg.isMultiSelect && msg.options && (
                    <div className={styles.multiSelect}>
                      <div className={styles.multiOptions}>
                        {msg.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSelectedFeatures((prev) =>
                                prev.includes(option)
                                  ? prev.filter((f) => f !== option)
                                  : [...prev, option]
                              );
                            }}
                            className={`${styles.multiOption} ${
                              selectedFeatures.includes(option) ? styles.selected : ''
                            }`}
                          >
                            {selectedFeatures.includes(option) && '✓ '}
                            {option}
                          </button>
                        ))}
                      </div>
                      {selectedFeatures.length > 0 && (
                        <button onClick={handleMultiSelectConfirm} className={styles.confirmButton}>
                          ✓ אישור ({selectedFeatures.length} נבחרו)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
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
                onKeyPress={(e) => e.key === 'Enter' && handleInputSubmit()}
                placeholder={inputType === 'tel' ? '05XXXXXXXX' : 'הקלידי כאן...'}
                className={styles.input}
              />
              <button onClick={handleInputSubmit} className={styles.sendButton} aria-label="שלח">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          )}

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
