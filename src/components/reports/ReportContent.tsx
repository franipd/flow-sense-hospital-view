
import React from 'react';
import { FileText } from 'lucide-react';
import { cleanAIResponse } from './utils/messageUtils';

interface ReportContentProps {
  content: string;
}

export const ReportContent = ({ content }: ReportContentProps) => {
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
  
  return (
    <>
      {formattedSections.length > 0 ? formattedSections : (
        <div className="text-white/90 text-sm leading-relaxed space-y-3">
          {cleanedContent.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </>
  );
};
