
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, FileText } from 'lucide-react';

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSendMessage();
    }
  };

  return (
    <div className="border-t border-white/10 pt-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40">
            <FileText className="w-4 h-4" />
          </div>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Request a detailed healthcare report or analysis..."
            className="pl-10 pr-4 py-3 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
      
      <div className="mt-3 flex items-center justify-between text-xs text-white/50">
        <span>Press Enter to send • Auto-email for critical reports</span>
        <div className="flex items-center gap-1">
          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
          <span>AI Ready</span>
        </div>
      </div>
    </div>
  );
};
