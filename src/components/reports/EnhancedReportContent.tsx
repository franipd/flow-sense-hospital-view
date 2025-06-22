
import React from 'react';
import { parseReportContent } from './utils/reportParser';
import { cleanAIResponse } from './utils/messageUtils';
import { TabbedReportLayout } from './TabbedReportLayout';

interface EnhancedReportContentProps {
  content: string;
}

export const EnhancedReportContent = ({ content }: EnhancedReportContentProps) => {
  const cleanedContent = cleanAIResponse(content);
  const parsedReport = parseReportContent(cleanedContent);

  // If no structured data found, show fallback
  if (parsedReport.sections.length === 0 && parsedReport.patients.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <div className="text-white/90 text-sm leading-relaxed space-y-3">
            {cleanedContent.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <TabbedReportLayout parsedReport={parsedReport} />;
};
