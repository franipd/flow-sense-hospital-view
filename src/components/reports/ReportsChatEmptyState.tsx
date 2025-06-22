
import React from 'react';
import { FileText, Mail, TrendingUp } from 'lucide-react';

export const ReportsChatEmptyState = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      <FileText className="w-16 h-16 text-white/30 mb-4" />
      <h3 className="text-white text-lg font-semibold mb-2">
        Healthcare Reports & Intelligence
      </h3>
      <p className="text-white/60 mb-6 max-w-md">
        Generate detailed healthcare reports and analytics. Important insights are automatically 
        emailed to franipd2025@gmail.com for immediate action.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <TrendingUp className="w-6 h-6 text-blue-400 mb-2" />
          <h4 className="text-white font-medium text-sm mb-1">Analytics Reports</h4>
          <p className="text-white/60 text-xs">
            "Generate patient flow analysis report"
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <FileText className="w-6 h-6 text-green-400 mb-2" />
          <h4 className="text-white font-medium text-sm mb-1">Department Summary</h4>
          <p className="text-white/60 text-xs">
            "Create ICU department summary report"
          </p>
        </div>
        
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <Mail className="w-6 h-6 text-purple-400 mb-2" />
          <h4 className="text-white font-medium text-sm mb-1">Critical Alerts</h4>
          <p className="text-white/60 text-xs">
            Reports with critical insights are auto-emailed
          </p>
        </div>
      </div>
    </div>
  );
};
