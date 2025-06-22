
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReportMessage } from './hooks/useLyzrReports';
import { Mail } from 'lucide-react';

interface ReportsChatMessagesProps {
  messages: ReportMessage[];
  isLoading: boolean;
}

export const ReportsChatMessages = ({ messages, isLoading }: ReportsChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 pr-4 mb-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white/10 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              {message.emailSent && (
                <div className="flex items-center gap-1 mt-2 text-xs text-green-300">
                  <Mail className="w-3 h-3" />
                  Report emailed to franipd2025@gmail.com
                </div>
              )}
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] p-3 rounded-lg bg-white/10 text-white">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span className="text-sm">Generating healthcare report...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
