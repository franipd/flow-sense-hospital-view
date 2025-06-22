
import React from 'react';
import { FileText, Mail, TrendingUp, Clock, Users, Activity } from 'lucide-react';

export const ReportsChatEmptyState = () => {
  const exampleQueries = [
    {
      icon: Activity,
      title: "ICU Status Report",
      query: "Generate a comprehensive ICU department status report including patient census and critical alerts",
      color: "text-red-400"
    },
    {
      icon: Users,
      title: "Department Analytics",
      query: "Provide an analysis of emergency department patient flow and staffing efficiency",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      title: "Operational Summary",
      query: "Create a weekly operational summary with key performance metrics and resource utilization",
      color: "text-green-400"
    },
    {
      icon: Clock,
      title: "Patient Wait Times",
      query: "Analyze current patient wait times across all departments with improvement recommendations",
      color: "text-yellow-400"
    }
  ];

  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-2xl">
        {/* Header Section */}
        <div className="mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            Healthcare Reports & Intelligence
          </h2>
          <p className="text-white/60 text-lg">
            Generate comprehensive healthcare reports with automatic email delivery for critical insights
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-white font-medium text-sm mb-1">Comprehensive Reports</h3>
            <p className="text-white/60 text-xs">
              Detailed analysis with key findings and recommendations
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <Mail className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="text-white font-medium text-sm mb-1">Auto Email Delivery</h3>
            <p className="text-white/60 text-xs">
              Critical reports automatically sent to franipd2025@gmail.com
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto">
              <TrendingUp className="w-4 h-4 text-purple-400" />
            </div>
            <h3 className="text-white font-medium text-sm mb-1">Real-time Insights</h3>
            <p className="text-white/60 text-xs">
              Live data analysis and predictive recommendations
            </p>
          </div>
        </div>

        {/* Example Queries */}
        <div className="space-y-3">
          <h3 className="text-white/80 font-medium text-sm mb-4">Try these example reports:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {exampleQueries.map((example, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-3 text-left hover:bg-white/10 transition-all cursor-pointer group"
              >
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
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-300 text-xs">
            💡 Reports containing keywords like "critical", "urgent", "report", or "summary" are automatically emailed
          </p>
        </div>
      </div>
    </div>
  );
};
