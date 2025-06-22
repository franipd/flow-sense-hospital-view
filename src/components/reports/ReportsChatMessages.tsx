
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ReportMessage } from './hooks/useLyzrReports';
import { Mail, FileText, TrendingUp, AlertCircle } from 'lucide-react';

interface ReportsChatMessagesProps {
  messages: ReportMessage[];
  isLoading: boolean;
}

const formatReportContent = (content: string) => {
  // Split content into sections and format properly
  const lines = content.split('\n').filter(line => line.trim());
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
          <div key={`section-${formattedSections.length}`} className="mb-4">
            {sectionTitle && (
              <h4 className="text-blue-300 font-semibold text-sm mb-2 flex items-center gap-2">
                <FileText className="w-3 h-3" />
                {sectionTitle}
              </h4>
            )}
            <div className="space-y-1 text-white/90 text-sm leading-relaxed">
              {currentSection.map((item, i) => (
                <p key={i} className="pl-2">{item}</p>
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
      <div key={`section-${formattedSections.length}`} className="mb-4">
        {sectionTitle && (
          <h4 className="text-blue-300 font-semibold text-sm mb-2 flex items-center gap-2">
            <FileText className="w-3 h-3" />
            {sectionTitle}
          </h4>
        )}
        <div className="space-y-1 text-white/90 text-sm leading-relaxed">
          {currentSection.map((item, i) => (
            <p key={i} className="pl-2">{item}</p>
          ))}
        </div>
      </div>
    );
  }
  
  return formattedSections.length > 0 ? formattedSections : (
    <p className="text-white/90 text-sm leading-relaxed">{content}</p>
  );
};

export const ReportsChatMessages = ({ messages, isLoading }: ReportsChatMessagesProps) => {
  return (
    <ScrollArea className="flex-1 pr-4 mb-6">
      <div className="space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl rounded-br-md'
                  : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-md'
              } p-4 shadow-lg`}
            >
              {message.sender === 'user' ? (
                <p className="text-sm leading-relaxed">{message.text}</p>
              ) : (
                <div className="space-y-3">
                  {message.text.length > 200 ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-green-400 mb-3">
                        <TrendingUp className="w-4 h-4" />
                        <span className="text-xs font-medium uppercase tracking-wide">Healthcare Report Generated</span>
                      </div>
                      {formatReportContent(message.text)}
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-white/90">{message.text}</p>
                  )}
                </div>
              )}
              
              {message.emailSent && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-1 text-green-400">
                    <Mail className="w-3 h-3" />
                    <span className="text-xs font-medium">Report emailed successfully</span>
                  </div>
                  <span className="text-xs text-white/60">to franipd2025@gmail.com</span>
                </div>
              )}
              
              <div className="flex justify-between items-center mt-3 pt-2">
                <span className="text-xs text-white/50">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === 'ai' && (
                  <div className="flex items-center gap-1 text-white/40">
                    <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs">AI Assistant</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl rounded-bl-md p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-white/80">Generating comprehensive healthcare report...</span>
              </div>
              <div className="mt-2 text-xs text-white/60">
                Analyzing data • Processing insights • Preparing recommendations
              </div>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
};
