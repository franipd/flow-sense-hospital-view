
import React from 'react';
import { TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

export const PredictiveInsights = () => {
  const insights = [
    {
      type: 'prediction',
      title: 'Expected Surge in Emergency Department',
      description: 'Based on historical patterns, expect 30% increase in ED visits between 2-6 PM today.',
      confidence: 87,
      action: 'Consider calling in additional nursing staff',
      icon: TrendingUp,
      color: 'blue',
    },
    {
      type: 'alert',
      title: 'ICU Capacity Warning',
      description: 'ICU projected to reach 95% capacity within next 4 hours based on current admission rate.',
      confidence: 92,
      action: 'Prepare discharge planning for stable patients',
      icon: AlertTriangle,
      color: 'red',
    },
    {
      type: 'opportunity',
      title: 'Optimal Discharge Window',
      description: 'Analysis suggests discharging 8 stable patients in General Ward could improve flow by 15%.',
      confidence: 78,
      action: 'Review discharge readiness for identified patients',
      icon: CheckCircle,
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-200 bg-blue-50 text-blue-800';
      case 'red':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'green':
        return 'border-green-200 bg-green-50 text-green-800';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-800';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Insights</h3>
      <div className="space-y-4">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getColorClasses(insight.color)}`}
            >
              <div className="flex items-start gap-3">
                <IconComponent className="w-5 h-5 mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <span className="text-xs px-2 py-1 bg-white rounded-full">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-sm mb-2">{insight.description}</p>
                  <p className="text-xs font-medium">
                    Recommended Action: {insight.action}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
