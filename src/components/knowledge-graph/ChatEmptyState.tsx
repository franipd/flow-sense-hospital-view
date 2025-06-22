
import React from 'react';
import { Bot, Shield, Database } from 'lucide-react';

export const ChatEmptyState = () => {
  return (
    <div className="text-center text-white/60 py-8">
      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
      <p>Start a conversation with Lyzr AI</p>
      <p className="text-sm mt-2">Ask questions about your healthcare data and patient status</p>
      
      <div className="mt-4 space-y-3">
        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Database className="w-4 h-4" />
            <span className="text-xs font-medium">Live Healthcare Data</span>
          </div>
          <p className="text-xs text-blue-300">
            Connected to your Supabase patient database with real-time insights on triage priorities, department status, and resource allocation.
          </p>
        </div>
        
        <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 text-green-400 mb-2">
            <Shield className="w-4 h-4" />
            <span className="text-xs font-medium">Enhanced Reliability</span>
          </div>
          <p className="text-xs text-green-300">
            Secure server-side processing with automatic retry, fallback responses, and contextual healthcare insights.
          </p>
        </div>
      </div>
      
      <div className="mt-4 p-2 bg-white/5 rounded-lg">
        <p className="text-xs text-white/70 mb-2">Try asking:</p>
        <div className="text-xs text-white/60 space-y-1">
          <div>• "What's the current patient status?"</div>
          <div>• "Show me high-priority cases"</div>
          <div>• "Department capacity overview"</div>
          <div>• "Resource allocation recommendations"</div>
        </div>
      </div>
    </div>
  );
};
