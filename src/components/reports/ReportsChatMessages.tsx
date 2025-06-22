
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReportMessage } from './hooks/useLyzrReports';
import { Mail, FileText, TrendingUp, AlertCircle, Calendar } from 'lucide-react';

interface ReportsChatMessagesProps {
  messages: ReportMessage[];
  isLoading: boolean;
}

const cleanAIResponse = (content: string): string => {
  // Remove unwanted system messages and email formatting
  let cleaned = content
    .replace(/AFFIRMATIVE\s*\n*/gi, '')
    .replace(/EMAIL_TO:\s*[^\n]+\n*/gi, '')
    .replace(/SUBJECT:\s*[^\n]+\n*/gi, '')
    .replace(/--\s*\n*/gi, '')
    .replace(/SESSION_ID:\s*[^\n]+\n*/gi, '')
    .replace(/\[SYSTEM\].*?\[\/SYSTEM\]/gi, '')
    .trim();
  
  return cleaned;
};

const formatReportContent = (content: string) => {
  const cleanedContent = cleanAIResponse(content);
  const lines = cleanedContent.split('\n').filter(line => line.trim());
  const formattedSections: React.ReactNode[] = [];
  
  let currentSection: string[] = [];
  let sectionTitle = '';
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    // Check if it's a header (ends with : and is in caps or title case)
    if (trimmedLine.endsWith(':') && trimmedLine.length > 3) {
      // Save previous section if exists
      if (currentSection.length > 0) {
        formattedSections.push(
          <div key={`section-${formattedSections.length}`} className="mb-6">
            {sectionTitle && (
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <FileText className="w-4 h-4 text-blue-400" />
                <h4 className="text-blue-300 font-semibold text-base">
                  {sectionTitle.replace(':', '')}
                </h4>
              </div>
            )}
            <div className="space-y-3 text-white/90 text-sm leading-relaxed pl-6">
              {currentSection.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="flex-1">{item}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      // Start new section
      sectionTitle = trimmedLine;
      currentSection = [];
    } else if (trimmedLine.startsWith('-') || trimmedLine.startsWith('•')) {
      // Bullet point
      currentSection.push(trimmedLine.substring(1).trim());
    } else if (trimmedLine.match(/^\d+\./)) {
      // Numbered list
      currentSection.push(trimmedLine);
    } else if (trimmedLine.length > 0) {
      // Regular content
      currentSection.push(trimmedLine);
    }
  });
  
  // Add the last section
  if (currentSection.length > 0) {
    formattedSections.push(
      <div key={`section-${formattedSections.length}`} className="mb-6">
        {sectionTitle && (
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
            <FileText className="w-4 h-4 text-blue-400" />
            <h4 className="text-blue-300 font-semibold text-base">
              {sectionTitle.replace(':', '')}
            </h4>
          </div>
        )}
        <div className="space-y-3 text-white/90 text-sm leading-relaxed pl-6">
          {currentSection.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
              <p className="flex-1">{item}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return formattedSections.length > 0 ? formattedSections : (
    <div className="text-white/90 text-sm leading-relaxed space-y-3">
      {cleanedContent.split('\n\n').map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
    </div>
  );
};

const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const isToday = timestamp.toDateString() === now.toDateString();
  
  if (isToday) {
    return `Today at ${timestamp.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  }
  
  return timestamp.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const ReportsChatMessages = ({ messages, isLoading }: ReportsChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 pr-4 mb-6">
      <div className="space-y-8">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[90%] ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-lg'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-lg'
              } p-6 shadow-xl`}
            >
              {message.sender === 'user' ? (
                <div className="space-y-3">
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className="flex justify-end">
                    <span className="text-xs text-white/70 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              ) : (
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
                        {formatReportContent(message.text)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed text-white/90 space-y-3">
                      {cleanAIResponse(message.text).split('\n\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}

                  {message.emailSent && (
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                      <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                        <Mail className="w-3 h-3 text-emerald-400" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-emerald-400">Report sent successfully</span>
                        <p className="text-xs text-white/60">Delivered to franipd2025@gmail.com</p>
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
              )}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[90%] bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-lg p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <div>
                  <span className="text-sm text-white/80 font-medium">Generating comprehensive healthcare report...</span>
                  <div className="mt-1 text-xs text-white/60">
                    Analyzing data • Processing insights • Preparing recommendations
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
