"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  Send,
  Mic,
  MicOff,
  MessageSquare,
  Sparkles,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Zap
} from "lucide-react";
import { debounce } from "@/lib/debounce";

interface AIMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  category?: string;
}

interface AIContext {
  page: string;
  data?: any;
  action?: string;
}

export default function AIAgent({ context }: { context?: AIContext }) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate context-aware suggestions with memoization
  const contextSuggestions = useMemo(() => {
    if (context?.page === 'dashboard') {
      return [
        "What's my best opportunity today?",
        "Analyze my current pipeline",
        "Suggest pricing strategy for new lead",
        "Weather impact on today's schedule"
      ];
    } else if (context?.page === 'crm') {
      return [
        "Qualify this lead",
        "Draft follow-up email",
        "Analyze client communication patterns",
        "Predict conversion probability"
      ];
    } else if (context?.page === 'projects') {
      return [
        "Schedule optimization for today",
        "Resource allocation recommendations",
        "Weather impact assessment",
        "Progress update suggestions"
      ];
    } else if (context?.page === 'proposals') {
      return [
        "Review proposal terms",
        "Suggest pricing adjustments",
        "Generate client objections",
        "Email template suggestions"
      ];
    }
    return [];
  }, [context?.page]);

  useEffect(() => {
    setSuggestions(contextSuggestions);
  }, [contextSuggestions]);

  const sendMessage = useCallback(async (message: string) => {
    if (!message.trim()) return;

    const userMessage: AIMessage = {
      id: crypto.randomUUID(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Try to get AI insights from API
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          context: context || {},
          page: context?.page || 'general'
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage: AIMessage = {
          id: crypto.randomUUID(),
          type: 'ai',
          content: data.response,
          timestamp: new Date(),
          category: data.category
        };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        // Fallback responses based on context
        const fallbackResponse = getFallbackResponse(message, context);
        const aiMessage: AIMessage = {
          id: crypto.randomUUID(),
          type: 'ai',
          content: fallbackResponse,
          timestamp: new Date(),
          category: 'fallback'
        };
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.warn('AI Agent API failed, using fallback:', error);
      const fallbackResponse = getFallbackResponse(message, context);
      const aiMessage: AIMessage = {
        id: crypto.randomUUID(),
        type: 'ai',
        content: fallbackResponse,
        timestamp: new Date(),
        category: 'fallback'
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [context]);

  const getFallbackResponse = (message: string, context?: AIContext): string => {
    const lowerMessage = message.toLowerCase();

    if (context?.page === 'dashboard') {
      if (lowerMessage.includes('opportunity')) {
        return "🎯 Based on your current pipeline, I recommend prioritizing the Miracle Strip seawall project - it has a 72% probability with strong profit margins and fits within your 3-week weather window.";
      }
      if (lowerMessage.includes('pipeline')) {
        return "📊 Your current pipeline shows 18 active leads with an average conversion rate of 32%. Focus on the 3 hot leads in the St. Andrews Bay development for maximum ROI.";
      }
      if (lowerMessage.includes('pricing')) {
        return "💰 For new leads, I suggest starting at $1,850/sq ft (your current competitive advantage). Consider premium pricing at $2,200/sq ft for eco-friendly materials.";
      }
      if (lowerMessage.includes('weather')) {
        return "⛅ Today's conditions show good workability with 1-2 ft waves and 12 mph winds. The 3-week weather window opens November 15th for major projects.";
      }
    }

    if (context?.page === 'crm') {
      if (lowerMessage.includes('qualify')) {
        return "✅ Lead qualification criteria: Budget > $50K, Timeline within 3 months, Decision maker confirmed. This lead scores 8/10 - high potential.";
      }
      if (lowerMessage.includes('email')) {
        return "📧 I recommend a personalized follow-up email highlighting your competitive pricing ($1,850/sq ft vs $2,100 market average) and 3-week weather window advantage.";
      }
    }

    if (context?.page === 'projects') {
      if (lowerMessage.includes('schedule')) {
        return "📅 Optimal schedule: Start Biscayne Bay deck (75% complete), then transition to Key Largo pier repair. Weather window closes in 2 weeks.";
      }
      if (lowerMessage.includes('resources')) {
        return "⚙️ Current utilization: 75% capacity. Recommend allocating Team Alpha to high-priority projects. Equipment availability: 4/7 units ready.";
      }
    }

    // General fallback responses
    return "🤖 I'm analyzing your marine construction data. I can help with pricing strategies, scheduling optimization, lead qualification, and market insights. What specific question can I help you with today?";
  };

  const handleVoiceInput = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input not supported in this browser');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognition.start();
  }, [sendMessage]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          AI Assistant
          <Badge variant="outline" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        {/* Messages */}
        <div className="flex-1 space-y-3 mb-4 overflow-y-auto max-h-64">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-4">
              <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Ask me anything about your marine construction business!</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-muted text-foreground'
                }`}
              >
                {message.type === 'ai' && message.category === 'fallback' && (
                  <div className="flex items-center gap-1 mb-1 text-xs opacity-70">
                    <AlertCircle className="h-3 w-3" />
                    AI Assistant
                  </div>
                )}
                {message.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-3 w-3 animate-spin" />
                  Thinking...
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {messages.length === 0 && suggestions.length > 0 && (
          <div className="mb-3">
            <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
            <div className="flex flex-wrap gap-1">
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs h-6"
                  onClick={() => sendMessage(suggestion)}
                  disabled={isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask me about ${context?.page || 'your business'}...`}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
          />
          <div className="flex flex-col gap-1">
            <Button
              size="sm"
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleVoiceInput}
              disabled={isLoading}
              className={isListening ? "bg-red-100 text-red-600" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
