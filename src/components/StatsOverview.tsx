
import React from 'react';
import { Users, Clock, Star } from "lucide-react";

export const StatsOverview = () => {
  const stats = [
    {
      title: 'CURRENT OCCUPANCY',
      value: '87%',
      change: '+3% from yesterday',
      trending: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'AVERAGE WAIT TIME',
      value: '23min',
      change: '-5min from yesterday',
      trending: 'down',
      icon: <Clock className="w-6 h-6" />,
      color: 'from-cyan-400 to-cyan-500',
    },
    {
      title: 'PATIENT SATISFACTION',
      value: '4.6',
      change: '+0.3 this month',
      trending: 'up',
      icon: <Star className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-light text-white tracking-wide">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-300">
                {stat.icon}
              </div>
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${stat.color}`}></div>
            </div>
            <div className="space-y-3">
              <h3 className="text-xs font-light text-white/70 uppercase tracking-wider leading-relaxed">
                {stat.title}
              </h3>
              <p className="text-4xl font-extralight text-white tracking-tight">{stat.value}</p>
              <div className="flex items-center gap-1">
                <span
                  className={`text-sm font-light tracking-wide ${
                    stat.trending === 'up' ? 'text-cyan-300' : 'text-pink-300'
                  }`}
                >
                  {stat.trending === 'up' ? '↗' : '↘'} {stat.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
