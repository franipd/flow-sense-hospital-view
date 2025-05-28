
import React from 'react';

export const StatsOverview = () => {
  const stats = [
    {
      title: 'Current Occupancy',
      value: '87%',
      change: '+3% from yesterday',
      trending: 'up',
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Average Wait Time',
      value: '23min',
      change: '-5min from yesterday',
      trending: 'down',
      color: 'from-purple-500 to-purple-600',
    },
    {
      title: 'Patient Satisfaction',
      value: '4.6⭐',
      change: '+0.3 this month',
      trending: 'up',
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
              {stat.title}
            </h3>
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  stat.trending === 'up' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.trending === 'up' ? '↗' : '↘'} {stat.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
