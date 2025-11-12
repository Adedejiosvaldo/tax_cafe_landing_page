"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import { TaxInput } from "@/app/types/tax";
import { Send, Loader2 } from "lucide-react";
import useTaxAIStreamHandler from "@/app/hooks/useTaxAIStreamHandler";

interface TaxAIProps {
  taxData?: TaxInput;
  backendUrl?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  created_at: number;
}

export function TaxAI({ taxData, backendUrl }: TaxAIProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { handleStreamResponse } = useTaxAIStreamHandler({
    messages,
    setMessages,
    setIsStreaming,
    setError,
    taxData,
    backendUrl,
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || isStreaming) return;

    const currentMessage = message.trim();
    setMessage("");

    try {
      await handleStreamResponse(currentMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Tax AI Assistant</CardTitle>
        <p className="text-sm text-text-light-body">
          Ask questions about Nigerian tax laws, deductions, and compliance
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages */}
        <div className="h-[500px] overflow-y-auto border rounded-lg p-4 space-y-4 bg-background-light">
          {messages.length === 0 && !isStreaming && (
            <div className="text-center text-text-light-body py-8">
              <p className="mb-2">👋 Hi! I&apos;m your Tax AI assistant.</p>
              <p>Ask me anything about Nigerian taxes, deductions, or compliance.</p>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={`${msg.role}-${msg.created_at}-${idx}`}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === "user"
                    ? "bg-primary text-white"
                    : "bg-white border border-border-light"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none">
                    <MarkdownRenderer>{msg.content}</MarkdownRenderer>
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {isStreaming && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-white border border-border-light">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-red-50 border border-red-200">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask about tax deductions, compliance, or calculations..."
            disabled={isStreaming}
            className="flex-1 min-h-[60px]"
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || isStreaming}
            className="bg-primary hover:bg-primary/90"
            size="icon"
          >
            {isStreaming ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
