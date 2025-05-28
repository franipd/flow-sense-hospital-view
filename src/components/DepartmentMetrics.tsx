
import React from 'react';

export const DepartmentMetrics = () => {
  const metrics = [
    {
      title: 'Average Wait Time',
      value: '23min',
      target: '< 30min',
      status: 'good',
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Bed Utilization',
      value: '87%',
      target: '85-95%',
      status: 'good',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Staff Utilization',
      value: '92%',
      target: '< 90%',
      status: 'warning',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: 'Patient Satisfaction',
      value: '4.6⭐',
      target: '> 4.5',
      status: 'good',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wide">
              {metric.title}
            </h3>
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${metric.color}`}></div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">{metric.value}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-white/40">Target: {metric.target}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  metric.status === 'good'
                    ? 'bg-green-500/20 text-green-400'
                    : metric.status === 'warning'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {metric.status === 'good' ? '✓ On Target' : '⚠ Above Target'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
