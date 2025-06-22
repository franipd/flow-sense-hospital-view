
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PatientTable } from './PatientTable';
import { ReportCharts } from './ReportCharts';
import { ParsedReport } from './utils/reportParser';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Calendar,
  AlertTriangle,
  Activity
} from 'lucide-react';

interface TabbedReportLayoutProps {
  parsedReport: ParsedReport;
}

export const TabbedReportLayout = ({ parsedReport }: TabbedReportLayoutProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  console.log('📋 TabbedReportLayout - Received data:', {
    patients: parsedReport.patients.length,
    totalPatients: parsedReport.stats.totalPatients,
    departments: Object.keys(parsedReport.stats.byDepartment).length,
    sections: parsedReport.sections.length
  });

  // Use fallback data if parsing failed
  const totalPatients = parsedReport.stats.totalPatients || parsedReport.patients.length;
  const departmentCount = Object.keys(parsedReport.stats.byDepartment).length || 
    (parsedReport.patients.length > 0 ? new Set(parsedReport.patients.map(p => p.location).filter(Boolean)).size : 0);

  const stats = [
    {
      title: 'Total Patients',
      value: totalPatients.toString(),
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      description: `${parsedReport.patients.length} patients extracted from report`
    },
    {
      title: 'Departments',
      value: departmentCount.toString(),
      icon: Building2,
      color: 'from-green-500 to-green-600',
      description: departmentCount > 0 ? 'Active departments with patients' : 'Departments in system'
    },
    {
      title: 'Critical Priority',
      value: (parsedReport.stats.byPriority['High'] || parsedReport.stats.byPriority['Critical'] || 0).toString(),
      icon: AlertTriangle,
      color: 'from-red-500 to-red-600',
      description: 'High priority patients requiring attention'
    },
    {
      title: 'Average Age',
      value: parsedReport.stats.avgAge ? `${parsedReport.stats.avgAge}y` : 'N/A',
      icon: Activity,
      color: 'from-purple-500 to-purple-600',
      description: parsedReport.stats.avgAge ? 'Average patient age' : 'Age data not available'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-white/70">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color}`}></div>
              </div>
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-white/60 uppercase tracking-wide">
                  {stat.title}
                </h3>
                <p className="text-2xl font-light text-white">{stat.value}</p>
                <p className="text-xs text-white/50">{stat.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabbed Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="patients" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
          >
            <Users className="w-4 h-4 mr-2" />
            Patients ({parsedReport.patients.length})
          </TabsTrigger>
          <TabsTrigger 
            value="analytics" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Analytics
          </TabsTrigger>
          <TabsTrigger 
            value="report" 
            className="data-[state=active]:bg-white/10 data-[state=active]:text-white text-white/70"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Full Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {/* Department Breakdown */}
            {Object.keys(parsedReport.stats.byDepartment).length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Building2 className="w-5 h-5 mr-2" />
                  Department Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(parsedReport.stats.byDepartment).map(([dept, count]) => (
                    <div key={dept} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 font-medium">{dept}</span>
                        <span className="text-white text-lg font-light">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Breakdown */}
            {Object.keys(parsedReport.stats.byStatus).length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Patient Status
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(parsedReport.stats.byStatus).map(([status, count]) => (
                    <div key={status} className="bg-white/5 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 font-medium">{status}</span>
                        <span className="text-white text-lg font-light">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Sections */}
            <div className="space-y-4">
              {parsedReport.sections.slice(0, 3).map((section, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-white mb-3">{section.title}</h3>
                  <div className="text-white/80 text-sm leading-relaxed">
                    {section.type === 'list' ? (
                      <ul className="space-y-1">
                        {section.content.split('\n').map((item, i) => (
                          <li key={i} className="flex items-start">
                            <span className="text-cyan-400 mr-2">•</span>
                            {item.replace(/^[-•*]\s*/, '')}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-2">
                        {section.content.split('\n').map((paragraph, i) => (
                          <p key={i}>{paragraph}</p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="mt-6">
          <PatientTable patients={parsedReport.patients} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <ReportCharts stats={parsedReport.stats} />
        </TabsContent>

        <TabsContent value="report" className="mt-6">
          <div className="space-y-6">
            {parsedReport.sections.map((section, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
                <h3 className="text-lg font-medium text-white mb-4">{section.title}</h3>
                <div className="text-white/80 text-sm leading-relaxed">
                  {section.type === 'list' ? (
                    <ul className="space-y-2">
                      {section.content.split('\n').map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-cyan-400 mr-2">•</span>
                          {item.replace(/^[-•*]\s*/, '')}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="space-y-3">
                      {section.content.split('\n').map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
