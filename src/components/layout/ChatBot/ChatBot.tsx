'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './ChatBot.module.css';

// ============================================
// 🎯 TYPE DEFINITIONS
// ============================================

type FlowType = 'regular' | 'event' | 'shabbat-hatan';

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
  specificDate?: string;
  budget?: string;
  shabbat?: string;
  mangal?: string;
  eventGuests?: string;
  eventVenue?: string;
  eventProduction?: string;
  shabbatHatanGuests?: string;
  shabbatHatanDate?: string;
  kashrut?: string;
  supervisor?: string;
}

// ============================================
// 🎨 STATE MACHINE - FLOW DEFINITIONS
// ============================================

const FLOWS = {
  regular: [
    { step: 'name', question: 'בואי נתחיל! 🎯\nמה השם שלך?', inputType: 'text' as const },
    { step: 'phone', question: 'נעים מאוד! 😊\nמה מספר הטלפון/WhatsApp שלך?', inputType: 'tel' as const },
    { 
      step: 'propertyType', 
      question: 'מעולה! 👌\nאיזה סוג שירות מעניין אותך?',
      options: [
        'צימר רומנטי 💕',
        'וילה משפחתית 🏡',
        'דירת נופש 🏖️',
        'מלון בוטיק 🏨',
        'שבת חתן 🕍',
        'מתחם אירועים 🎉'
      ]
    },
    {
      step: 'location',
      question: 'מעולה! 👌\nבאיזה אזור אתה מחפש?',
      options: ['צפון 🏔️', 'מרכז 🌆', 'דרום 🏜️', 'ירושלים והסביבה 🕍', 'לא משנה לי 🌍']
    },
    {
      step: 'guestCount',
      question: 'נהדר! 🎊\nלכמה אורחים אתה צריך?',
      options: ['2 אורחים 👫', '2-4 אורחים 👨‍👩‍👧', '4-8 אורחים 👨‍👩‍👧‍👦', '8+ אורחים 👨‍👩‍👧‍👦👨‍👩‍👧‍👦']
    },
    {
      step: 'dates',
      question: 'מצוין! 📅\nמתי אתה מתכנן להגיע?',
      options: ['סופ״ש הקרוב 🎯', 'תוך חודש 📆', 'תאריך מסוים 📅', 'עדיין לא החלטתי 🤔']
    },
    {
      step: 'budget',
      question: 'נהדר! 💰\nמה התקציב שלך ללילה?',
      options: ['עד 500 ₪', '500-1000 ₪', '1000-2000 ₪', '2000+ ₪', 'גמיש 💪']
    },
    {
      step: 'shabbat',
      question: 'שומרים שבת? ⛪',
      options: ['כן, שומרים שבת 🕯️', 'לא שומרים ✨']
    },
    {
      step: 'mangal',
      question: 'צריכים מנגל/גריל? 🔥',
      options: ['כן, חייבים מנגל! 🍖', 'לא צריך 😊']
    }
  ],
  
  event: [
    { step: 'name', question: 'בואי נתחיל! 🎯\nמה השם שלך?', inputType: 'text' as const },
    { step: 'phone', question: 'נעים מאוד! 😊\nמה מספר הטלפון/WhatsApp שלך?', inputType: 'tel' as const },
    {
      step: 'eventGuests',
      question: 'אירוע! איזה כיף! 🎊\nכמה אנשים צפויים?',
      options: ['עד 50 אורחים', '50-100 אורחים', '100-200 אורחים', '200+ אורחים']
    },
    {
      step: 'eventVenue',
      question: 'יש לכם מקום לאירוע או צריכים מתחם? 🎪',
      options: ['יש לנו מקום ✅', 'צריכים מתחם 🏛️']
    },
    {
      step: 'eventProduction',
      question: 'צריכים שירות הפקת אירועים מלא? 🎬',
      options: ['כן, הפקה מלאה! 🎉', 'לא, רק המקום 📍']
    },
    {
      step: 'budget',
      question: 'מעולה! 💰\nמה התקציב שלכם לאירוע?',
      options: ['עד 50,000 ₪', '50,000-100,000 ₪', '100,000-200,000 ₪', '200,000+ ₪', 'גמיש 💪']
    }
  ],
  
  'shabbat-hatan': [
    { step: 'name', question: 'בואי נתחיל! 🎯\nמה השם שלך?', inputType: 'text' as const },
    { step: 'phone', question: 'נעים מאוד! 😊\nמה מספר הטלפון/WhatsApp שלך?', inputType: 'tel' as const },
    {
      step: 'location',
      question: 'שבת חתן! מזל טוב! 🎉💍\nבאיזה אזור אתם מחפשים?',
      options: ['צפון 🏔️', 'מרכז 🌆', 'דרום 🏜️', 'ירושלים והסביבה 🕍']
    },
    {
      step: 'shabbatHatanDate',
      question: 'באיזה תאריך תתקיים שבת החתן? (לדוגמה: 15/01/2025)',
      inputType: 'text' as const
    },
    {
      step: 'budget',
      question: 'מעולה! 💰\nמה התקציב שלכם לשבת חתן?',
      options: ['עד 10,000 ₪', '10,000-20,000 ₪', '20,000-40,000 ₪', '40,000+ ₪', 'גמיש 💪']
    },
    {
      step: 'shabbatHatanGuests',
      question: 'כמה אורחים צפויים לשבת החתן? 👥',
      options: ['עד 30 אורחים', '30-50 אורחים', '50-100 אורחים', '100+ אורחים']
    },
    {
      step: 'kashrut',
      question: 'איזו רמת כשרות אתם צריכים? 🍽️',
      options: ['רבנות רגילה ✅', 'רבנות מהדרין ⭐', 'בד"ץ ⭐⭐', 'לא משנה 🤷‍♂️']
    },
    {
      step: 'supervisor',
      question: 'צריכים משגיח צמוד לשבת? 👨‍🍳',
      options: ['כן, חובה! ✅', 'לא צריך 🙅']
    }
  ]
};

// ============================================
// 🔧 VALIDATION HELPERS
// ============================================

const validatePhone = (phone: string): boolean => {
  const cleaned = phone.replace(/[-\s]/g, '');
  return /^05\d{8}$/.test(cleaned);
};

const validateDate = (date: string): boolean => {
  return /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date);
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

// ============================================
// 🎨 MAIN COMPONENT
// ============================================

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userData, setUserData] = useState<UserData>({});
  const [currentFlow, setCurrentFlow] = useState<FlowType>('regular');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ============================================
  // 🎯 EFFECTS
  // ============================================

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          'שלום! 👋 אני ערדית, העוזרת הדיגיטלית של MULTIBRAWN!\nאעזור לך למצוא את המקום המושלם לחופשה. 🏖️',
          ['בואי נתחיל! 🚀']
        );
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  // ============================================
  // 🔧 HELPER FUNCTIONS
  // ============================================

  const addBotMessage = useCallback((content: string, options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content,
          timestamp: new Date(),
          options,
        },
      ]);
      setIsTyping(false);
    }, 800);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const getCurrentStep = useCallback(() => {
    return FLOWS[currentFlow][currentStepIndex];
  }, [currentFlow, currentStepIndex]);

  // ============================================
  // 📝 INPUT VALIDATION & SUBMISSION
  // ============================================

  const handleInputSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const currentStep = getCurrentStep();
    setError(null);

    // Validation
    if (currentStep.step === 'name' && !validateName(inputValue)) {
      setError('השם חייב להכיל לפחות 2 תווים');
      return;
    }

    if (currentStep.step === 'phone' && !validatePhone(inputValue)) {
      setError('נא להזין מספר טלפון תקין (05XXXXXXXX)');
      return;
    }

    if ((currentStep.step === 'specificDate' || currentStep.step === 'shabbatHatanDate') && !validateDate(inputValue)) {
      setError('נא להזין תאריך בפורמט DD/MM/YYYY');
      return;
    }

    // Success
    addUserMessage(inputValue);
    setUserData((prev) => ({ ...prev, [currentStep.step]: inputValue }));
    setInputValue('');
    setShowInput(false);
    
    moveToNextStep();
  };

  // ============================================
  // 🎯 FLOW MANAGEMENT
  // ============================================

  const moveToNextStep = useCallback(() => {
    const nextIndex = currentStepIndex + 1;
    
    if (nextIndex >= FLOWS[currentFlow].length) {
      finishConversation();
      return;
    }

    setCurrentStepIndex(nextIndex);
    const nextStep = FLOWS[currentFlow][nextIndex];

    setTimeout(() => {
      if (nextStep.options) {
        addBotMessage(nextStep.question, nextStep.options);
      } else if (nextStep.inputType) {
        addBotMessage(nextStep.question);
        setShowInput(true);
      }
    }, 1000);
  }, [currentFlow, currentStepIndex, addBotMessage]);

  const handleOptionClick = useCallback((option: string) => {
    addUserMessage(option);
    const currentStep = getCurrentStep();
    
    setUserData((prev) => ({ ...prev, [currentStep.step]: option }));

    // Special handling for flow switching
    if (currentStep.step === 'propertyType') {
      if (option === 'מתחם אירועים 🎉') {
        setCurrentFlow('event');
        setCurrentStepIndex(1); // Skip name/phone
        setTimeout(() => {
          const firstEventStep = FLOWS.event[2];
          addBotMessage(firstEventStep.question, firstEventStep.options);
        }, 1000);
        return;
      } else if (option === 'שבת חתן 🕍') {
        setCurrentFlow('shabbat-hatan');
        setCurrentStepIndex(1); // Skip name/phone
        setTimeout(() => {
          const firstShabbatStep = FLOWS['shabbat-hatan'][2];
          addBotMessage(firstShabbatStep.question, firstShabbatStep.options);
        }, 1000);
        return;
      }
    }

    // Special handling for specific date
    if (currentStep.step === 'dates' && option === 'תאריך מסוים 📅') {
      setTimeout(() => {
        addBotMessage('איזה תאריך? (לדוגמה: 15/01/2025)');
        setShowInput(true);
      }, 1000);
      return;
    }

    moveToNextStep();
  }, [getCurrentStep, addUserMessage, addBotMessage, moveToNextStep]);

  // ============================================
  // 🏁 FINISH CONVERSATION
  // ============================================

  const finishConversation = () => {
    if (currentFlow === 'shabbat-hatan') {
      addBotMessage(
        'מושלם! 🎉💍\n\nקיבלתי את כל הפרטים לשבת החתן.\nעכשיו אשלח את הכל ל-WhatsApp ונחזור אליך במהרה עם הצעות מתאימות!\n\n📖 בינתיים, מוזמנים לקרוא עוד על שבת חתן בדף המיוחד שלנו:',
        ['שלח ל-WhatsApp ✅', 'קרא עוד על שבת חתן 📖']
      );
    } else {
      addBotMessage(
        'מושלם! 🎉\n\nקיבלתי את כל הפרטים.\nעכשיו אשלח את הכל ל-WhatsApp ונחזור אליך במהרה עם הצעות מדויקות! 📱',
        ['שלח ל-WhatsApp ✅']
      );
    }
  };

  const sendToWhatsApp = () => {
    const responses = [];
    
    if (userData.name) responses.push(`👤 שם: ${userData.name}`);
    if (userData.phone) responses.push(`📱 טלפון: ${userData.phone}`);
    if (userData.propertyType) responses.push(`🏠 סוג שירות: ${userData.propertyType}`);
    
    if (currentFlow === 'event') {
      if (userData.eventGuests) responses.push(`👥 מספר אורחים: ${userData.eventGuests}`);
      if (userData.eventVenue) responses.push(`📍 מקום: ${userData.eventVenue}`);
      if (userData.eventProduction) responses.push(`🎬 הפקה: ${userData.eventProduction}`);
      if (userData.budget) responses.push(`💰 תקציב: ${userData.budget}`);
    } else if (currentFlow === 'shabbat-hatan') {
      if (userData.location) responses.push(`📍 אזור: ${userData.location}`);
      if (userData.shabbatHatanDate) responses.push(`📅 תאריך: ${userData.shabbatHatanDate}`);
      if (userData.budget) responses.push(`💰 תקציב: ${userData.budget}`);
      if (userData.shabbatHatanGuests) responses.push(`👥 אורחים: ${userData.shabbatHatanGuests}`);
      if (userData.kashrut) responses.push(`🍽️ כשרות: ${userData.kashrut}`);
      if (userData.supervisor) responses.push(`👨‍🍳 משגיח: ${userData.supervisor}`);
    } else {
      if (userData.location) responses.push(`📍 אזור: ${userData.location}`);
      if (userData.guestCount) responses.push(`👥 אורחים: ${userData.guestCount}`);
      if (userData.dates) responses.push(`📅 תאריכים: ${userData.dates}`);
      if (userData.specificDate) responses.push(`📆 תאריך מדויק: ${userData.specificDate}`);
      if (userData.budget) responses.push(`💰 תקציב: ${userData.budget}`);
      if (userData.shabbat) responses.push(`⛪ שבת: ${userData.shabbat}`);
      if (userData.mangal) responses.push(`🔥 מנגל: ${userData.mangal}`);
    }

    const message = encodeURIComponent(
      `היי MULTIBRAWN! 👋\n\nזה סיכום התשובות שלי מהצ'אט:\n\n${responses.join('\n')}\n\nאשמח לקבל הצעות מתאימות!`
    );

    window.open(`https://wa.me/972523983394?text=${message}`, '_blank');
  };

  const handleSpecialAction = (option: string) => {
    if (option === 'שלח ל-WhatsApp ✅') {
      sendToWhatsApp();
    } else if (option === 'קרא עוד על שבת חתן 📖') {
      window.open('/shabbat-hatan', '_blank');
    }
  };

  // ============================================
  // 🎨 RENDER
  // ============================================

  return (
    <>
      {/* Chat Button */}
      <div className={styles.chatButtonWrapper}>
        <button
          onClick={() => setIsOpen(!isOpen)}
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

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <h3>ערדית - העוזרת שלכם</h3>
              <p>🟢 אונליין עכשיו</p>
            </div>
          </div>

          <div className={styles.messages}>
            {messages.map((message) => (
              <div key={message.id} className={styles.messageWrapper}>
                <div className={`${styles.message} ${styles[message.role]}`}>
                  <div className={styles.messageContent}>{message.content}</div>
                  
                  {message.options && (
                    <div className={styles.options}>
                      {message.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (option.includes('WhatsApp') || option.includes('שבת חתן')) {
                              handleSpecialAction(option);
                            } else if (currentStepIndex === 0 && option === 'בואי נתחיל! 🚀') {
                              setCurrentStepIndex(1);
                              setTimeout(() => {
                                const firstStep = FLOWS[currentFlow][0];
                                addBotMessage(firstStep.question);
                                setShowInput(true);
                              }, 1000);
                            } else {
                              handleOptionClick(option);
                            }
                          }}
                          className={styles.optionButton}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={styles.messageWrapper}>
                <div className={`${styles.message} ${styles.assistant}`}>
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

          {showInput && (
            <form onSubmit={handleInputSubmit} className={styles.inputArea}>
              <div style={{ flex: 1 }}>
                <input
                  ref={inputRef}
                  type={getCurrentStep()?.inputType || 'text'}
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError(null);
                  }}
                  placeholder={
                    getCurrentStep()?.inputType === 'tel' 
                      ? '05XXXXXXXX' 
                      : 'הקלד כאן...'
                  }
                  className={styles.input}
                  style={error ? { borderColor: '#FF5EA1' } : {}}
                />
                {error && (
                  <div style={{ 
                    color: '#FF5EA1', 
                    fontSize: '12px', 
                    marginTop: '4px',
                    textAlign: 'right'
                  }}>
                    {error}
                  </div>
                )}
              </div>
              <button type="submit" className={styles.sendButton}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
