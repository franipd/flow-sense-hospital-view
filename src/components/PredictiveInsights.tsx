
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
      color: 'pink',
    },
    {
      type: 'opportunity',
      title: 'Optimal Discharge Window',
      description: 'Analysis suggests discharging 8 stable patients in General Ward could improve flow by 15%.',
      confidence: 78,
      action: 'Review discharge readiness for identified patients',
      icon: CheckCircle,
      color: 'cyan',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'border-blue-400/30 bg-blue-500/10 text-blue-300';
      case 'pink':
        return 'border-pink-400/30 bg-pink-500/10 text-pink-300';
      case 'cyan':
        return 'border-cyan-400/30 bg-cyan-500/10 text-cyan-300';
      default:
        return 'border-gray-400/30 bg-gray-500/10 text-gray-300';
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
      <h3 className="text-2xl font-light text-white mb-6 tracking-wide">AI-Powered Insights</h3>
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
                    <h4 className="font-light text-white text-lg tracking-wide">{insight.title}</h4>
                    <span className="text-xs px-2 py-1 bg-black/30 text-white/80 rounded-full font-light">
                      {insight.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-sm mb-2 text-white/80 font-light leading-relaxed">{insight.description}</p>
                  <p className="text-xs font-light text-white/90 tracking-wide">
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
