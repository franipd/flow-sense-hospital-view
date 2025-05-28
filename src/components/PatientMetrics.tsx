
import React from 'react';

export const PatientMetrics = () => {
  const metrics = [
    {
      title: 'Total Active Patients',
      value: '147',
      change: '+12 from yesterday',
      color: 'from-blue-500 to-blue-600',
      trending: 'up',
    },
    {
      title: 'Critical Patients',
      value: '8',
      change: '-2 from yesterday',
      color: 'from-pink-400 to-pink-500',
      trending: 'down',
    },
    {
      title: 'Admissions Today',
      value: '23',
      change: '+5 from yesterday',
      color: 'from-cyan-400 to-cyan-500',
      trending: 'up',
    },
    {
      title: 'Discharges Today',
      value: '19',
      change: '+3 from yesterday',
      color: 'from-purple-500 to-purple-600',
      trending: 'up',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-white/60 uppercase tracking-wide">
              {metric.title}
            </h3>
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${metric.color}`}></div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-white">{metric.value}</p>
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  metric.trending === 'up' ? 'text-cyan-400' : 'text-pink-400'
                }`}
              >
                {metric.trending === 'up' ? '↗' : '↘'} {metric.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
