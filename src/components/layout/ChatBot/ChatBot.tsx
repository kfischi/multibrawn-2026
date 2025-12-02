"use client";

import { useState, useRef, useEffect } from "react";
import styles from './ChatBot.module.css';
import { chatFlow, translations } from '@/lib/chatbot/chatFlow';
import { ChatMessage as ChatMessageType } from '@/types/chatbot';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentStep, setCurrentStep] = useState('start');
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

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
      const welcomeStep = chatFlow.start;
      addBotMessage(welcomeStep, 'start');
    }
  }, [isOpen, messages.length]);

  const addBotMessage = (step: any, stepId: string) => {
    const message = typeof step.message === 'function' 
      ? step.message({ data: userData, metadata: {} })
      : step.message;

    const botMsg: ChatMessageType = {
      id: Date.now().toString(),
      type: 'bot',
      content: message,
      timestamp: new Date(),
      step: stepId,
    };

    setMessages(prev => [...prev, botMsg]);
  };

  const handleButtonClick = (button: any) => {
    const currentStepData = chatFlow[currentStep];
    
    // Handle multi-select
    if (currentStepData.type === 'multi-select') {
      const index = selectedFeatures.indexOf(button.value);
      if (index > -1) {
        setSelectedFeatures(selectedFeatures.filter(v => v !== button.value));
      } else {
        setSelectedFeatures([...selectedFeatures, button.value]);
      }
      return;
    }

    // Save data
    const stepData: Record<string, any> = {};
    const fieldName = currentStepData.field || currentStepData.id;
    stepData[fieldName] = button.value;
    
    const newUserData = { ...userData, ...stepData };
    setUserData(newUserData);

    // Add user message
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: button.text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Move to next step
    setTimeout(() => {
      const nextStepId = button.next;
      const nextStep = chatFlow[nextStepId];
      
      if (nextStep) {
        addBotMessage(nextStep, nextStepId);
        setCurrentStep(nextStepId);
      }
    }, 500);
  };

  const handleMultiSelectSubmit = () => {
    if (selectedFeatures.length === 0) return;

    const currentStepData = chatFlow[currentStep];
    const stepData: Record<string, any> = {};
    const fieldName = currentStepData.field || currentStepData.id;
    stepData[fieldName] = selectedFeatures;
    
    const newUserData = { ...userData, ...stepData };
    setUserData(newUserData);

    // Create readable text
    const featuresText = selectedFeatures.map(f => {
      const options = typeof currentStepData.options === 'function' 
        ? currentStepData.options({ data: userData, metadata: {} })
        : currentStepData.options;
      const btn = options?.find((b: any) => b.value === f) as any;
      return btn ? btn.text : f;
    }).join(', ');

    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: featuresText,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    setSelectedFeatures([]);

    // Move to next step
    setTimeout(() => {
      const nextStepId = currentStepData.next as string;
      const nextStep = chatFlow[nextStepId];
      
      if (nextStep) {
        addBotMessage(nextStep, nextStepId);
        setCurrentStep(nextStepId);
      }
    }, 500);
  };

  const handleTextSubmit = async () => {
    if (!input.trim()) return;

    const currentStepData = chatFlow[currentStep];
    
    // Add user message
    const userMsg: ChatMessageType = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Save data
    const stepData: Record<string, any> = {};
    const fieldName = currentStepData.field || currentStepData.id;
    stepData[fieldName] = input.trim();

    const newUserData = { ...userData, ...stepData };
    setUserData(newUserData);
    setInput("");

    // Move to next step
    setIsLoading(true);
    
    setTimeout(() => {
      const nextStepId = currentStepData.next as string;
      const nextStep = chatFlow[nextStepId];
      
      if (nextStep) {
        addBotMessage(nextStep, nextStepId);
        setCurrentStep(nextStepId);
      }
      setIsLoading(false);
    }, 500);
  };

  const renderCurrentInput = () => {
    const step = chatFlow[currentStep];
    
    if (!step) return null;
    
    switch (step.type) {
      case 'options':
        const options = typeof step.options === 'function' 
          ? step.options({ data: userData, metadata: {} })
          : step.options;
          
        return (
          <div className={styles.buttonsContainer}>
            {options?.map((btn: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleButtonClick(btn)}
                className={styles.choiceButton}
              >
                {btn.text}
              </button>
            ))}
          </div>
        );
        
      case 'multi-select':
        const multiOptions = typeof step.options === 'function' 
          ? step.options({ data: userData, metadata: {} })
          : step.options;
          
        return (
          <div className={styles.buttonsContainer}>
            {multiOptions?.map((btn: any, idx: number) => (
              <button
                key={idx}
                onClick={() => handleButtonClick(btn)}
                className={`${styles.choiceButton} ${
                  selectedFeatures.includes(btn.value)
                    ? styles.choiceButtonSelected
                    : ''
                }`}
              >
                {selectedFeatures.includes(btn.value) && '✓ '}
                {btn.text}
              </button>
            ))}
            {selectedFeatures.length > 0 && (
              <button
                onClick={handleMultiSelectSubmit}
                className={styles.submitMultiButton}
              >
                שלח ({selectedFeatures.length}) ✓
              </button>
            )}
          </div>
        );
        
      case 'text':
      case 'phone':
      case 'email':
        return (
          <div className={styles.textInputContainer}>
            <input
              type={step.type === 'email' ? 'email' : step.type === 'phone' ? 'tel' : 'text'}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder={step.placeholder}
              className={styles.textInput}
            />
            <button 
              onClick={handleTextSubmit}
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? '...' : 'שלח 📤'}
            </button>
          </div>
        );
        
      case 'action':
        const actionData = step.action?.({ data: userData, metadata: {} });
        return (
          <div className={styles.actionButtonContainer}>
            <a
              href={actionData?.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappButton}
            >
              {actionData?.buttonText || 'פתח וואטסאפ 💬'}
            </a>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <>
      {/* Floating Button */}
      {isVisible && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={styles.chatButton}
          aria-label="פתח צ'אט עם ערדית"
        >
          <div className={styles.chatButtonCircle}>
            {isOpen ? (
              <div className={styles.closeIcon}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </div>
            ) : (
              <img 
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
                alt="ערדית"
                className={styles.avatarImage}
              />
            )}
          </div>
          {!isOpen && (
            <>
              <span className={styles.chatButtonText}>
                צ'אט עם ערדית
              </span>
              <span className={styles.notification}></span>
            </>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerIcon}>
              <img 
                src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1764669572/%D7%AA%D7%9E%D7%95%D7%A0%D7%94_%D7%9C%D7%91%D7%95%D7%98_dl5w3z.png"
                alt="ערדית"
                className={styles.avatarImage}
              />
            </div>
            <div>
              <h3 className={styles.headerTitle}>ערדית - MULTIBRAWN</h3>
              <p className={styles.headerStatus}>
                <span className={styles.statusDot}></span> זמינה כעת
              </p>
            </div>
          </div>

          <div className={styles.messagesArea}>
            {messages.map((msg) => (
              <div key={msg.id}>
                <div className={msg.type === 'user' ? styles.userMessage : styles.botMessage}>
                  <div className={styles.messageAvatar}>
                    {msg.type === 'user' ? (
                      '👤'
                    ) : (
                      <img 
                        src="https://res.cloudinary.com/dptyfvwyo/image/upload/v1762012646/Ardit_znq9aj.jpg"
                        alt="ערדית"
                        className={styles.avatarImage}
                      />
                    )}
                  </div>
                  <div className={styles.messageBubble}>
                    {msg.content}
                  </div>
                </div>

                {msg.type === 'bot' && msg.step === currentStep && renderCurrentInput()}
              </div>
            ))}
            
            {isLoading && (
              <div className={styles.typing}>
                <span>מעבדת</span>
                <span className={styles.dots}>
                  <span>.</span><span>.</span><span>.</span>
                </span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
    </>
  );
}
