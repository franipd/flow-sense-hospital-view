
import React from 'react';
import { EnhancedReportContent } from './EnhancedReportContent';

interface ReportContentProps {
  content: string;
}

export const ReportContent = ({ content }: ReportContentProps) => {
  // Use the enhanced report content for better formatting
  return <EnhancedReportContent content={content} />;
};
