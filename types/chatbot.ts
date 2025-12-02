// Chatbot Types
export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  step?: string;
  avatar?: string;
}

export interface ChatContext {
  data: Record<string, any>;
  metadata: Record<string, any>;
}

export interface ChatOption {
  label?: string;
  value: string;
  text?: string; // Display text (for buttons)
  next?: string | ((context: ChatContext) => string);
  metadata?: Record<string, any>;
}

export interface ChatField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'date' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    errorMessage?: string;
  };
}

export interface ChatValidation {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  minDate?: Date;
  maxDate?: Date;
  errorMessage?: string;
}

export type ChatStepType = 
  | 'message'
  | 'options'
  | 'multi-select'
  | 'form'
  | 'date-range'
  | 'loading'
  | 'summary'
  | 'action'
  | 'text'
  | 'phone'
  | 'email';

export interface ChatStep {
  id: string;
  type: ChatStepType;
  message: string | ((context: ChatContext) => string);
  next?: string | ((context: ChatContext) => string);
  avatar?: string;
  delay?: number;
  placeholder?: string;
  
  // For 'options' and 'multi-select'
  options?: ChatOption[] | ((context: ChatContext) => ChatOption[]);
  minSelections?: number;
  maxSelections?: number;
  
  // For 'form'
  fields?: ChatField[];
  
  // For all input types
  field?: string;
  validation?: ChatValidation;
  
  // For 'loading' and 'action'
  action?: (context: ChatContext) => Promise<any> | any;
}

export interface ChatFlowConfig {
  steps: Record<string, ChatStep>;
}

// Chatbot State
export interface ChatbotState {
  isOpen: boolean;
  messages: ChatMessage[];
  currentStep: string;
  context: ChatContext;
  isLoading: boolean;
  error: string | null;
}
