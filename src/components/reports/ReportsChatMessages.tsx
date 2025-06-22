
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReportMessage } from './hooks/useLyzrReports';
import { MessageBubble } from './MessageBubble';
import { LoadingMessage } from './LoadingMessage';

interface ReportsChatMessagesProps {
  messages: ReportMessage[];
  isLoading: boolean;
}

export const ReportsChatMessages = ({ messages, isLoading }: ReportsChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 pr-4 mb-6">
      <div className="space-y-8">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingMessage />}
      </div>
    </ScrollArea>
  );
};
