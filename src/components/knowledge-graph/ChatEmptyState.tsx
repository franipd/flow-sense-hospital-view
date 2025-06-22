
import React from 'react';
import { Bot, AlertCircle } from 'lucide-react';

export const ChatEmptyState = () => {
  return (
    <div className="text-center text-white/60 py-8">
      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>Start a conversation with Lyzr AI</p>
      <p className="text-sm mt-2">Ask questions about your healthcare data and knowledge graph</p>
      <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-yellow-400 mb-2">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-medium">Note</span>
        </div>
        <p className="text-xs text-yellow-300">
          Currently using a demo API key. For production use, store your Lyzr AI key securely in Supabase secrets.
        </p>
      </div>
    </div>
  );
};
