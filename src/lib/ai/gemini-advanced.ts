import { Property } from '@/types/property';

interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface UserContext {
  preferences: {
    propertyType?: string;
    area?: string;
    guests?: number;
    budget?: string;
    amenities?: string[];
  };
  conversationHistory: ConversationMessage[];
  viewedProperties: string[];
  stage: string;
}

interface AIResponse {
  message: string;
  suggestions?: string[];
  recommendedProperties?: Property[];
  nextAction?: 'ask_details' | 'show_properties' | 'send_whatsapp' | 'continue';
}

export class GeminiAdvanced {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async chat(userMessage: string, context: UserContext, availableProperties: Property[]): Promise<AIResponse> {
    const intent = this.analyzeIntent(userMessage);
    const message = this.generateResponse(intent, context);
    const properties = this.getPropertyRecommendations(availableProperties, context);
    const suggestions = this.generateQuickReplies(context);

    return { message, suggestions, recommendedProperties: properties.slice(0, 3), nextAction: 'continue' };
  }

  private analyzeIntent(message: string): any {
    return { intent: 'search', entities: {} };
  }

  private generateResponse(intent: any, context: UserContext): string {
    return 'היי! איך אוכל לעזור?';
  }

  private getPropertyRecommendations(properties: Property[], context: UserContext): Property[] {
    return properties.slice(0, 3);
  }

  private generateQuickReplies(context: UserContext): string[] {
    return ['צימר רומנטי', 'וילה משפחתית', 'מתחם אירועים'];
  }
}

let geminiInstance: GeminiAdvanced | null = null;
export function getGeminiAdvanced(): GeminiAdvanced {
  if (!geminiInstance) geminiInstance = new GeminiAdvanced(process.env.GEMINI_API_KEY || '');
  return geminiInstance;
}

export type { ConversationMessage, UserContext, AIResponse };
