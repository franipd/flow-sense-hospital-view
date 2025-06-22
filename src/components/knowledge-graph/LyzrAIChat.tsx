
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot } from 'lucide-react';
import { useLyzrChat } from './hooks/useLyzrChat';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ChatEmptyState } from './ChatEmptyState';

export const LyzrAIChat = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    isLoading,
    sendMessage
  } = useLyzrChat();

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-white/10 h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Lyzr AI Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {messages.length === 0 ? (
          <ChatEmptyState />
        ) : (
          <ChatMessages messages={messages} isLoading={isLoading} />
        )}
        
        <ChatInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={sendMessage}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
