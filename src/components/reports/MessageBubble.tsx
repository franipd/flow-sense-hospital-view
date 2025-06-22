import React from 'react';
import { Mail, TrendingUp, Calendar, Database } from 'lucide-react';
import { ReportMessage } from './hooks/useLyzrReports';
import { ReportContent } from './ReportContent';
import { cleanAIResponse, formatTimestamp } from './utils/messageUtils';

interface MessageBubbleProps {
  message: ReportMessage;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  if (message.sender === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[90%] bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-lg p-6 shadow-xl">
          <div className="space-y-3">
            <p className="text-sm leading-relaxed">{message.text}</p>
            <div className="flex justify-end">
              <span className="text-xs text-white/70 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start">
      <div className="max-w-[90%] bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-lg p-6 shadow-xl">
        <div className="space-y-4">
          {message.text.length > 200 ? (
            <div className="space-y-5">
              <div className="flex items-center gap-3 text-emerald-400 pb-3 border-b border-white/10">
                <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-semibold uppercase tracking-wide">Healthcare Report Generated</span>
                  <p className="text-xs text-white/60 mt-1">Comprehensive analysis ready</p>
                </div>
              </div>
              <div className="space-y-6">
                <ReportContent content={message.text} />
              </div>
            </div>
          ) : (
            <div className="text-sm leading-relaxed text-white/90 space-y-3">
              {cleanAIResponse(message.text).split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          )}

          {/* Real Data Indicator */}
          {message.dataSource === 'live_database' && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Database className="w-3 h-3 text-blue-400" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-blue-400">Live Database Report</span>
                <p className="text-xs text-white/60">
                  Based on {message.patientsIncluded || 0} real patients from Supabase
                </p>
              </div>
            </div>
          )}

          {message.emailSent && (
            <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
              <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <Mail className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="flex-1">
                <span className="text-sm font-medium text-emerald-400">Report sent successfully</span>
                <p className="text-xs text-white/60">Delivered to admin</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-between items-center mt-4 pt-3 border-t border-white/5">
            <span className="text-xs text-white/50 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {formatTimestamp(message.timestamp)}
            </span>
            <div className="flex items-center gap-2 text-white/40">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium">AI Healthcare Assistant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
