
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const IncidentReport = () => {
  const chartData = [
    { date: '5/23', threatIntel: 45, dlp: 65, sysLog: 35 },
    { date: '5/24', threatIntel: 32, dlp: 58, sysLog: 28 },
    { date: '5/25', threatIntel: 48, dlp: 72, sysLog: 42 },
    { date: '5/26', threatIntel: 55, dlp: 68, sysLog: 38 },
    { date: '5/27', threatIntel: 62, dlp: 75, sysLog: 45 },
    { date: '5/28', threatIntel: 58, dlp: 70, sysLog: 40 },
  ];

  const metrics = [
    {
      icon: '⚠️',
      title: 'Mean Time to Res...',
      value: '6 Hours',
      trend: 'up',
      color: 'text-red-400',
    },
    {
      icon: '🚨',
      title: 'Incident Respons...',
      value: '4 Hours',
      trend: 'up',
      color: 'text-orange-400',
    },
    {
      icon: '📈',
      title: 'Incident Escalat...',
      value: '10%',
      trend: 'down',
      color: 'text-yellow-400',
    },
  ];

  const chartConfig = {
    threatIntel: {
      label: 'Threat Intel',
      color: '#9333ea',
    },
    dlp: {
      label: 'DLP',
      color: '#ec4899',
    },
    sysLog: {
      label: 'SysLog',
      color: '#6b7280',
    },
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-6">Incident Report</h2>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-purple-500"></div>
          <span className="text-white/60 text-sm">Threat Intel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-pink-500"></div>
          <span className="text-white/60 text-sm">DLP</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-gray-500"></div>
          <span className="text-white/60 text-sm">SysLog</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 mb-8">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
              />
              <YAxis hide />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="threatIntel" 
                stroke="#9333ea" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="dlp" 
                stroke="#ec4899" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="sysLog" 
                stroke="#6b7280" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-white/10 last:border-b-0">
            <div className="flex items-center gap-3">
              <span className="text-lg">{metric.icon}</span>
              <span className="text-white/60 text-sm">{metric.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold text-lg">{metric.value}</span>
              <div className={`p-1 rounded-full ${
                metric.trend === 'up' ? 'bg-red-500/20' : 'bg-green-500/20'
              }`}>
                {metric.trend === 'up' ? (
                  <ArrowUp className="w-3 h-3 text-red-400" />
                ) : (
                  <ArrowDown className="w-3 h-3 text-green-400" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
