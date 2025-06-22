
import React from 'react';
import { Bot, Shield } from 'lucide-react';

export const ChatEmptyState = () => {
  return (
    <div className="text-center text-white/60 py-8">
      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>Start a conversation with Lyzr AI</p>
      <p className="text-sm mt-2">Ask questions about your healthcare data and knowledge graph</p>
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-center gap-2 text-blue-400 mb-2">
          <Shield className="w-4 h-4" />
          <span className="text-xs font-medium">Enhanced Reliability</span>
        </div>
        <p className="text-xs text-blue-300">
          Now using secure server-side processing with automatic retry and fallback mechanisms for improved reliability.
        </p>
      </div>
    </div>
  );
};
