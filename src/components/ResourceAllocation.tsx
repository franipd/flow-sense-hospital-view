
import React from 'react';
import { GradientButton } from '@/components/ui/gradient-button';

export const ResourceAllocation = () => {
  const allocationData = [
    {
      resource: 'ICU Beds',
      current: 18,
      optimal: 16,
      peak: 20,
      recommendation: 'Consider transferring 2 stable patients to step-down unit',
      efficiency: 90,
    },
    {
      resource: 'Nursing Staff',
      current: 45,
      optimal: 48,
      peak: 52,
      recommendation: 'Call in 3 additional nurses for evening shift',
      efficiency: 85,
    },
    {
      resource: 'Operating Rooms',
      current: 8,
      optimal: 10,
      peak: 12,
      recommendation: 'Schedule 2 additional elective surgeries',
      efficiency: 75,
    },
    {
      resource: 'Emergency Bays',
      current: 14,
      optimal: 12,
      peak: 15,
      recommendation: 'Current utilization optimal, monitor for surge',
      efficiency: 93,
    },
  ];

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'bg-gradient-to-r from-cyan-400 to-cyan-300 bg-clip-text text-transparent';
    if (efficiency >= 80) return 'bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent';
    return 'bg-gradient-to-r from-red-400 to-red-300 bg-clip-text text-transparent';
  };

  const getUtilizationGradient = (current: number, optimal: number) => {
    const ratio = current / optimal;
    if (ratio > 1.1) return 'bg-gradient-to-r from-pink-500 via-pink-400 to-red-400';
    if (ratio > 0.9) return 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-400';
    return 'bg-gradient-to-r from-blue-500 via-purple-400 to-blue-400';
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10',
      'bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-cyan-500/10',
      'bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-pink-500/10',
      'bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10',
    ];
    return gradients[index % gradients.length];
  };

  const getBorderGradient = (index: number) => {
    const borders = [
      'before:bg-gradient-to-r before:from-cyan-400/30 before:to-blue-400/30',
      'before:bg-gradient-to-r before:from-pink-400/30 before:to-purple-400/30',
      'before:bg-gradient-to-r before:from-blue-400/30 before:to-cyan-400/30',
      'before:bg-gradient-to-r before:from-purple-400/30 before:to-pink-400/30',
    ];
    return borders[index % borders.length];
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-light text-white tracking-wide">Resource Allocation Analysis</h3>
        <GradientButton variant="variant" className="px-4 py-2">
          Optimize Resources
        </GradientButton>
      </div>
      
      <div className="space-y-6">
        {allocationData.map((resource, index) => (
          <div 
            key={index} 
            className={`relative rounded-lg p-4 backdrop-blur-sm ${getCardGradient(index)} before:absolute before:inset-0 before:rounded-lg before:p-[1px] ${getBorderGradient(index)} before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:mask-composite-[exclude] before:pointer-events-none`}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-light text-white text-lg tracking-wide">{resource.resource}</h4>
              <span className={`text-sm font-light tracking-wide ${getEfficiencyColor(resource.efficiency)}`}>
                {resource.efficiency}% Efficiency
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm font-light text-white/60 tracking-wide">Current</p>
                <p className="text-2xl font-extralight text-white tracking-tight">{resource.current}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-light text-white/60 tracking-wide">Optimal</p>
                <p className="text-2xl font-extralight text-white tracking-tight">{resource.optimal}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-light text-white/60 tracking-wide">Peak Capacity</p>
                <p className="text-2xl font-extralight text-white tracking-tight">{resource.peak}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-light text-white/60 tracking-wide">Utilization vs Optimal</span>
                <span className="font-light text-white tracking-wide">{Math.round((resource.current / resource.optimal) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-3 backdrop-blur-sm">
                <div
                  className={`h-3 rounded-full ${getUtilizationGradient(resource.current, resource.optimal)} transition-all duration-300`}
                  style={{ width: `${Math.min((resource.current / resource.optimal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-sm rounded p-3 before:absolute before:inset-0 before:rounded before:p-[1px] before:bg-gradient-to-r before:from-cyan-400/30 before:to-purple-400/30 before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:mask-composite-[exclude] before:pointer-events-none">
              <p className="text-sm font-light text-cyan-300 leading-relaxed tracking-wide">
                <span className="font-light bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">Recommendation:</span> {resource.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
