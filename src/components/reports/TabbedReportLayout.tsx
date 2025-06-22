
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { FileText, Users, BarChart3, Table, ClipboardList } from 'lucide-react';
import { ParsedReport } from './utils/reportParser';
import { PatientTable } from './PatientTable';
import { ReportCharts } from './ReportCharts';

interface TabbedReportLayoutProps {
  parsedReport: ParsedReport;
}

export const TabbedReportLayout = ({ parsedReport }: TabbedReportLayoutProps) => {
  const [activeTab, setActiveTab] = useState('overview');

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

  const hasPatients = parsedReport.patients.length > 0;
  const hasStats = parsedReport.stats.totalPatients > 0;
  const hasTextSections = parsedReport.sections.length > 0;

  return (
    <div className="space-y-6">
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
          <TabsTrigger value="overview" className="flex items-center gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
            <ClipboardList className="w-4 h-4" />
            Overview
          </TabsTrigger>
          {hasPatients && (
            <TabsTrigger value="patients" className="flex items-center gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <Users className="w-4 h-4" />
              Patients ({parsedReport.patients.length})
            </TabsTrigger>
          )}
          {hasStats && (
            <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          )}
          {hasTextSections && (
            <TabsTrigger value="details" className="flex items-center gap-2 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-300">
              <FileText className="w-4 h-4" />
              Details
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-blue-300 mb-2">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">Total Patients</span>
              </div>
              <p className="text-2xl font-bold text-white">{parsedReport.stats.totalPatients}</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-green-300 mb-2">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Departments</span>
              </div>
              <p className="text-2xl font-bold text-white">{Object.keys(parsedReport.stats.byDepartment).length}</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4">
              <div className="flex items-center gap-2 text-yellow-300 mb-2">
                <Table className="w-4 h-4" />
                <span className="text-sm font-medium">Report Sections</span>
              </div>
              <p className="text-2xl font-bold text-white">{parsedReport.sections.length}</p>
            </div>
          </div>

          {/* Key Summary */}
          {parsedReport.sections.length > 0 && (
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-300 mb-4">Executive Summary</h3>
              <SectionContent section={parsedReport.sections[0]} />
            </div>
          )}
        </TabsContent>

        {hasPatients && (
          <TabsContent value="patients" className="mt-6">
            <PatientTable patients={parsedReport.patients} />
          </TabsContent>
        )}

        {hasStats && (
          <TabsContent value="analytics" className="mt-6">
            <ReportCharts stats={parsedReport.stats} />
          </TabsContent>
        )}

        {hasTextSections && (
          <TabsContent value="details" className="mt-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {parsedReport.sections.map((section, index) => (
                <AccordionItem 
                  key={index} 
                  value={`section-${index}`}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 text-blue-300 hover:text-blue-200 font-semibold">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4" />
                      {section.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <SectionContent section={section} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
