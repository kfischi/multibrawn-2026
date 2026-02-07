/**
 * Hybrid AI System - Claude + Gemini
 */

import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY || '' });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export type AIProvider = 'claude' | 'gemini' | 'auto';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  message: string;
  provider: AIProvider;
  tokensUsed?: number;
  cost?: number;
}

export class HybridAI {
  async chat(messages: AIMessage[], options: {
    provider?: AIProvider;
    temperature?: number;
    maxTokens?: number;
    systemPrompt?: string;
  } = {}): Promise<AIResponse> {
    const { provider = 'auto', temperature = 0.7, maxTokens = 1024, systemPrompt } = options;
    const selectedProvider = provider === 'auto' ? this.selectProvider(messages) : provider;

    if (selectedProvider === 'claude') {
      return this.chatWithClaude(messages, { temperature, maxTokens, systemPrompt });
    } else {
      return this.chatWithGemini(messages, { temperature, maxTokens, systemPrompt });
    }
  }

  private selectProvider(messages: AIMessage[]): 'claude' | 'gemini' {
    const lastMessage = messages[messages.length - 1];
    const content = lastMessage.content.toLowerCase();
    
    const complexPatterns = [
      messages.length > 10,
      /למה|מדוע|הסבר|פרט|תיאר/.test(content),
      /כתוב|צור|הכן/.test(content),
      content.length > 50,
    ];

    return complexPatterns.some(p => p) ? 'claude' : 'gemini';
  }

  private async chatWithClaude(messages: AIMessage[], options: any): Promise<AIResponse> {
    try {
      const claudeMessages = messages
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, content: m.content }));

      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: options.maxTokens,
        temperature: options.temperature,
        system: options.systemPrompt,
        messages: claudeMessages,
      });

      const messageText = response.content[0].type === 'text' ? response.content[0].text : '';
      return { message: messageText, provider: 'claude', tokensUsed: response.usage.input_tokens + response.usage.output_tokens };
    } catch (error) {
      console.error('Claude error:', error);
      return this.chatWithGemini(messages, options);
    }
  }

  private async chatWithGemini(messages: AIMessage[], options: any): Promise<AIResponse> {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash',
        generationConfig: { temperature: options.temperature, maxOutputTokens: options.maxTokens },
      });

      const history = messages.filter(m => m.role !== 'system').map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }],
      }));

      if (options.systemPrompt) {
        history.unshift({ role: 'user', parts: [{ text: options.systemPrompt }] });
        history.splice(1, 0, { role: 'model', parts: [{ text: 'הבנתי!' }] });
      }

      const chat = model.startChat({ history });
      const lastMessage = messages[messages.length - 1];
      const result = await chat.sendMessage(lastMessage.content);

      return { message: result.response.text(), provider: 'gemini' };
    } catch (error) {
      console.error('Gemini error:', error);
      throw error;
    }
  }

  async generateContent(prompt: string, options: {
    type: 'blog' | 'seo' | 'email' | 'description';
    length?: 'short' | 'medium' | 'long';
  }): Promise<string> {
    const systemPrompts = {
      blog: 'כתוב תוכן מקצועי לבלוג',
      seo: 'כתוב תוכן SEO עשיר',
      email: 'כתוב מייל שיווקי',
      description: 'כתוב תיאור מפתה',
    };
    const response = await this.chatWithClaude([{ role: 'user', content: prompt }], {
      temperature: 0.8,
      maxTokens: 1500,
      systemPrompt: systemPrompts[options.type],
    });
    return response.message;
  }

  async analyzeIntent(userMessage: string): Promise<{
    intent: string;
    confidence: number;
    entities: Record<string, any>;
  }> {
    const prompt = `נתח כוונה: "${userMessage}". החזר JSON: {"intent":"search|booking|question","confidence":0-1,"entities":{}}`;
    const response = await this.chatWithGemini([{ role: 'user', content: prompt }], { temperature: 0.3, maxTokens: 200 });
    try {
      return JSON.parse(response.message.replace(/```json|```/g, '').trim());
    } catch {
      return { intent: 'general', confidence: 0.5, entities: {} };
    }
  }
}

let hybridAIInstance: HybridAI | null = null;
export function getHybridAI(): HybridAI {
  if (!hybridAIInstance) hybridAIInstance = new HybridAI();
  return hybridAIInstance;
}
