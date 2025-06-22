
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

interface ReportsChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
}

export const ReportsChatInput = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  isLoading
}: ReportsChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Request a healthcare report or analysis..."
        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60"
        disabled={isLoading}
      />
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !inputMessage.trim()}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};
