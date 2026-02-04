/**
 * Context Manager - ניהול הקשר שיחה
 */

import { UserContext, ConversationMessage } from './gemini-advanced';

interface StoredContext {
  userId: string;
  context: UserContext;
  lastUpdated: Date;
}

export class ContextManager {
  private contexts: Map<string, StoredContext> = new Map();
  private readonly MAX_HISTORY = 50;
  private readonly CONTEXT_TIMEOUT = 30 * 60 * 1000;

  getUserContext(userId: string): UserContext {
    const stored = this.contexts.get(userId);
    if (stored && this.isContextValid(stored)) {
      return stored.context;
    }

    const newContext: UserContext = {
      preferences: {},
      conversationHistory: [],
      viewedProperties: [],
      stage: 'greeting',
    };

    this.contexts.set(userId, {
      userId,
      context: newContext,
      lastUpdated: new Date(),
    });

    return newContext;
  }

  updateContext(userId: string, updates: Partial<UserContext>): void {
    const stored = this.contexts.get(userId);
    if (!stored) return;
    stored.context = { ...stored.context, ...updates };
    stored.lastUpdated = new Date();
    this.contexts.set(userId, stored);
  }

  addMessage(userId: string, role: 'user' | 'assistant', content: string): void {
    const context = this.getUserContext(userId);
    const message: ConversationMessage = {
      role,
      content,
      timestamp: new Date(),
    };
    context.conversationHistory.push(message);
    if (context.conversationHistory.length > this.MAX_HISTORY) {
      context.conversationHistory = context.conversationHistory.slice(-this.MAX_HISTORY);
    }
    this.updateContext(userId, { conversationHistory: context.conversationHistory });
  }

  addViewedProperty(userId: string, propertyId: string): void {
    const context = this.getUserContext(userId);
    if (!context.viewedProperties.includes(propertyId)) {
      context.viewedProperties.push(propertyId);
      this.updateContext(userId, { viewedProperties: context.viewedProperties });
    }
  }

  getConversationSummary(userId: string): string {
    const context = this.getUserContext(userId);
    const { preferences, viewedProperties, conversationHistory } = context;
    let summary = '📋 סיכום השיחה:\n\n';
    if (Object.keys(preferences).length > 0) {
      summary += 'מה שחיפשת:\n';
      if (preferences.propertyType) summary += `• סוג: ${preferences.propertyType}\n`;
      if (preferences.area) summary += `• אזור: ${preferences.area}\n`;
      if (preferences.guests) summary += `• אורחים: ${preferences.guests}\n`;
      if (preferences.budget) summary += `• תקציב: ${preferences.budget}\n`;
    }
    if (viewedProperties.length > 0) {
      summary += `\nנכסים שצפית: ${viewedProperties.length}\n`;
    }
    return summary;
  }

  resetContext(userId: string): void {
    this.contexts.delete(userId);
  }

  private isContextValid(stored: StoredContext): boolean {
    const now = new Date().getTime();
    const lastUpdate = stored.lastUpdated.getTime();
    return (now - lastUpdate) < this.CONTEXT_TIMEOUT;
  }

  cleanExpiredContexts(): void {
    const now = new Date().getTime();
    for (const [userId, stored] of this.contexts.entries()) {
      const lastUpdate = stored.lastUpdated.getTime();
      if ((now - lastUpdate) >= this.CONTEXT_TIMEOUT) {
        this.contexts.delete(userId);
      }
    }
  }
}

let contextManagerInstance: ContextManager | null = null;

export function getContextManager(): ContextManager {
  if (!contextManagerInstance) {
    contextManagerInstance = new ContextManager();
    setInterval(() => {
      contextManagerInstance?.cleanExpiredContexts();
    }, 15 * 60 * 1000);
  }
  return contextManagerInstance;
}
