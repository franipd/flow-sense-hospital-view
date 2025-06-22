import React from 'react';
import { Activity, Users, TrendingUp, Clock } from 'lucide-react';
interface ReportsChatEmptyStateProps {
  onExampleClick?: (query: string) => void;
}
export const ReportsChatEmptyState = ({
  onExampleClick
}: ReportsChatEmptyStateProps) => {
  const exampleQueries = [{
    icon: Activity,
    title: "ICU Status Report",
    query: "Generate a comprehensive ICU department status report including current patient census, critical alerts, and patient details with MRNs",
    color: "text-red-400"
  }, {
    icon: Users,
    title: "Department Analytics",
    query: "Provide an analysis of emergency department patient flow with current patient details, wait times, and staffing efficiency",
    color: "text-blue-400"
  }, {
    icon: TrendingUp,
    title: "Operational Summary",
    query: "Create a weekly operational summary with current patient data, key performance metrics and resource utilization",
    color: "text-green-400"
  }, {
    icon: Clock,
    title: "Patient Wait Times",
    query: "Analyze current patient wait times across all departments with specific patient details and improvement recommendations",
    color: "text-yellow-400"
  }];
  const handleExampleClick = (query: string) => {
    if (onExampleClick) {
      onExampleClick(query);
    }
  };
  return <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        {/* Simplified Header */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-2">
            Generate Healthcare Reports
          </h2>
          <p className="text-white/60">
            Ask for detailed reports with patient data and analytics
          </p>
        </div>

        {/* Example Queries - Focused on getting started */}
        <div className="space-y-4">
          <h3 className="text-white/80 font-medium text-sm mb-4">Try these example reports:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exampleQueries.map((example, index) => <button key={index} onClick={() => handleExampleClick(example.query)} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 text-left hover:bg-white/10 transition-all cursor-pointer group w-full">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-md flex items-center justify-center ${example.color.replace('text-', 'bg-').replace('-400', '-400/20')}`}>
                    <example.icon className={`w-3 h-3 ${example.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium text-xs mb-1 group-hover:text-blue-300 transition-colors">
                      {example.title}
                    </h4>
                    <p className="text-white/60 text-xs leading-relaxed">
                      {example.query}
                    </p>
                  </div>
                </div>
              </button>)}
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-300 text-xs">💡 Above reports are automatically emailed</p>
        </div>
      </div>
    </div>;
};