
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

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
    <div className="flex gap-2">
      <Textarea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask Lyzr AI about your healthcare data..."
        className="flex-1 min-h-[40px] max-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-white/60 resize-none"
        disabled={isLoading}
      />
      <Button
        onClick={onSendMessage}
        disabled={!inputMessage.trim() || isLoading}
        className="px-3"
      >
        <Send className="w-4 h-4" />
      </Button>
    </div>
  );
};
