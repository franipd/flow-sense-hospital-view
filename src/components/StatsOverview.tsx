
import React from 'react';
import { cn } from "@/lib/utils";
import {
  IconCloud,
  IconHeart,
  IconCurrencyDollar,
} from "@tabler/icons-react";

export const StatsOverview = () => {
  const stats = [
    {
      title: 'CURRENT OCCUPANCY',
      value: '87%',
      change: '+3% from yesterday',
      trending: 'up',
      icon: <IconCloud className="w-6 h-6" />,
    },
    {
      title: 'AVERAGE WAIT TIME',
      value: '23min',
      change: '-5min from yesterday',
      trending: 'down',
      icon: <IconCurrencyDollar className="w-6 h-6" />,
    },
    {
      title: 'PATIENT SATISFACTION',
      value: '4.6⭐',
      change: '+0.3 this month',
      trending: 'up',
      icon: <IconHeart className="w-6 h-6" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 max-w-7xl mx-auto">
      {stats.map((stat, index) => (
        <StatFeature key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
};

const StatFeature = ({
  title,
  value,
  change,
  trending,
  icon,
  index,
}: {
  title: string;
  value: string;
  change: string;
  trending: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col border-r py-10 relative group/feature border-gray-800",
        index === 0 && "border-l border-gray-800",
        "border-b border-gray-800"
      )}
    >
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
      
      <div className="mb-4 relative z-10 px-10 text-gray-400">
        {icon}
      </div>
      
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gray-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-gray-400 uppercase tracking-wide text-sm">
          {title}
        </span>
      </div>
      
      <div className="relative z-10 px-10 space-y-2">
        <p className="text-4xl font-bold text-white">{value}</p>
        <div className="flex items-center gap-1">
          <span
            className={`text-sm font-medium ${
              trending === 'up' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {trending === 'up' ? '↗' : '↘'} {change}
          </span>
        </div>
      </div>
    </div>
  );
};
