
import React from 'react';

export const StatsOverview = () => {
  const stats = [
    {
      title: 'CURRENT OCCUPANCY',
      value: '87%',
      change: '+3% from yesterday',
      trending: 'up',
      color: 'bg-blue-500',
    },
    {
      title: 'AVERAGE WAIT TIME',
      value: '23min',
      change: '-5min from yesterday',
      trending: 'down',
      color: 'bg-purple-500',
    },
    {
      title: 'PATIENT SATISFACTION',
      value: '4.6⭐',
      change: '+0.3 this month',
      trending: 'up',
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-[#1a1a1a] rounded-2xl p-6 border border-gray-800"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              {stat.title}
            </h3>
            <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
          </div>
          <div className="space-y-2">
            <p className="text-4xl font-bold text-white">{stat.value}</p>
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-medium ${
                  stat.trending === 'up' ? 'text-green-400' : 'text-red-400'
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
