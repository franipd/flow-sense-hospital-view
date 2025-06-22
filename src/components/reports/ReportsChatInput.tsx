
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, FileText, Sparkles } from 'lucide-react';

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
    <div className="pt-2 mt-2">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <div className="flex-1 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40">
            <FileText className="w-4 h-4" />
          </div>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Request a detailed healthcare report or analysis..."
            className="pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border-white/20 text-white placeholder:text-white/50 rounded-xl focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 transition-all text-sm"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg border-0"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
      
      <div className="mt-4 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-white/50">
          <span>Press Enter to send • Auto-email for critical reports</span>
        </div>
        <div className="flex items-center gap-2 text-white/40">
          <Sparkles className="w-3 h-3" />
          <span>AI Healthcare Intelligence</span>
          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse ml-1"></div>
        </div>
      </div>
    </div>
  );
};
