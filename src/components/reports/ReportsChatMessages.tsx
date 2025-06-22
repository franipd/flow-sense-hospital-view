
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
    <div className="flex-1 flex flex-col min-h-0 mb-6">
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-8 pb-4">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          
          {isLoading && <LoadingMessage />}
        </div>
      </ScrollArea>
    </div>
  );
};
