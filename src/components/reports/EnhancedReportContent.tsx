
import React from 'react';
import { FileText, BarChart3, Table as TableIcon } from 'lucide-react';
import { parseReportContent } from './utils/reportParser';
import { PatientTable } from './PatientTable';
import { ReportCharts } from './ReportCharts';
import { cleanAIResponse } from './utils/messageUtils';

interface EnhancedReportContentProps {
  content: string;
}

export const EnhancedReportContent = ({ content }: EnhancedReportContentProps) => {
  const cleanedContent = cleanAIResponse(content);
  const parsedReport = parseReportContent(cleanedContent);

  const SectionContent = ({ section }: { section: typeof parsedReport.sections[0] }) => {
    if (section.type === 'list') {
      const items = section.content.split('\n').filter(line => line.trim());
      return (
        <div className="space-y-3">
          {items.map((item, i) => {
            const cleanItem = item.replace(/^[-•*]\s*/, '').trim();
            return (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-white/90 text-sm leading-relaxed flex-1">{cleanItem}</p>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="text-white/90 text-sm leading-relaxed space-y-3">
        {section.content.split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph.trim()}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Report Header */}
      <div className="flex items-center gap-3 text-emerald-400 pb-4 border-b border-white/10">
        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{parsedReport.title}</h2>
          <p className="text-sm text-white/60 mt-1">
            {parsedReport.type === 'patient_roster' ? 'Patient Roster Report' :
             parsedReport.type === 'analytics' ? 'Analytics Report' :
             parsedReport.type === 'mixed' ? 'Comprehensive Report' : 'Summary Report'}
          </p>
        </div>
      </div>

      {/* Statistics and Charts */}
      {parsedReport.stats.totalPatients > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-blue-300">
            <BarChart3 className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Key Metrics</h3>
          </div>
          <ReportCharts stats={parsedReport.stats} />
        </div>
      )}

      {/* Patient Table */}
      {parsedReport.patients.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-blue-300">
            <TableIcon className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Detailed Patient Information</h3>
          </div>
          <PatientTable patients={parsedReport.patients} />
        </div>
      )}

      {/* Text Sections */}
      {parsedReport.sections.map((section, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <FileText className="w-4 h-4 text-blue-400" />
            <h4 className="text-blue-300 font-semibold text-base">{section.title}</h4>
          </div>
          <div className="pl-6">
            <SectionContent section={section} />
          </div>
        </div>
      ))}

      {/* Fallback for unstructured content */}
      {parsedReport.sections.length === 0 && parsedReport.patients.length === 0 && (
        <div className="text-white/90 text-sm leading-relaxed space-y-3">
          {cleanedContent.split('\n\n').map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      )}
    </div>
  );
};
