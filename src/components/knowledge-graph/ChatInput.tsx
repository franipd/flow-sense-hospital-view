
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Plus } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export const ChatInput = ({ 
  inputMessage, 
  setInputMessage, 
  onSendMessage, 
  isLoading 
}: ChatInputProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask your assistant..."
          className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
          disabled={isLoading}
        />
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-1.5 top-1.5 h-7 w-7 rounded-sm hover:bg-white/10"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 text-white/60" />
          <span className="sr-only">New Chat</span>
        </Button>

        <Button
          onClick={onSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          variant="ghost"
          size="icon"
          className="absolute right-1.5 top-1.5 h-7 w-7 rounded-sm hover:bg-white/10 disabled:opacity-30"
        >
          <Send className="h-4 w-4 text-white/60" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  );
};
