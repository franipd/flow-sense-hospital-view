
import React from 'react';

interface PerformanceMetricsProps {
  timeRange: string;
}

export const PerformanceMetrics = ({ timeRange }: PerformanceMetricsProps) => {
  const metrics = [
    {
      title: 'Average Length of Stay',
      current: '4.2 days',
      previous: '4.8 days',
      improvement: '-12.5%',
      status: 'improved',
    },
    {
      title: 'Patient Throughput',
      current: '156/day',
      previous: '142/day',
      improvement: '+9.9%',
      status: 'improved',
    },
    {
      title: 'Readmission Rate',
      current: '8.3%',
      previous: '9.1%',
      improvement: '-8.8%',
      status: 'improved',
    },
    {
      title: 'Emergency Response Time',
      current: '6.2 min',
      previous: '7.1 min',
      improvement: '-12.7%',
      status: 'improved',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10"
        >
          <h3 className="text-sm font-medium text-white/60 uppercase tracking-wide mb-4">
            {metric.title}
          </h3>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">{metric.current}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/40">vs. previous {timeRange}:</span>
              <span className={`text-sm font-medium ${
                metric.status === 'improved' ? 'text-cyan-400' : 'text-pink-400'
              }`}>
                {metric.improvement}
              </span>
            </div>
            <p className="text-xs text-white/30">{metric.previous}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
