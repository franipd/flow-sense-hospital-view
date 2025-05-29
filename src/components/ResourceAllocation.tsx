
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
    if (efficiency >= 90) return 'bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent';
    if (efficiency >= 80) return 'bg-gradient-to-r from-pink-400 via-pink-300 to-purple-300 bg-clip-text text-transparent';
    return 'bg-gradient-to-r from-red-400 via-red-300 to-pink-300 bg-clip-text text-transparent';
  };

  const getUtilizationGradient = (current: number, optimal: number) => {
    const ratio = current / optimal;
    if (ratio > 1.1) return 'bg-gradient-to-r from-red-500 via-pink-500 to-pink-400';
    if (ratio > 0.9) return 'bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-400';
    return 'bg-gradient-to-r from-pink-500 via-pink-400 to-purple-400';
  };

  const getCardGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-pink-500/8 via-purple-500/4 to-cyan-500/6',
      'bg-gradient-to-br from-cyan-500/8 via-blue-500/4 to-pink-500/6',
      'bg-gradient-to-br from-purple-500/8 via-pink-500/4 to-blue-500/6',
      'bg-gradient-to-br from-blue-500/8 via-cyan-500/4 to-purple-500/6',
    ];
    return gradients[index % gradients.length];
  };

  const getBorderGradient = (index: number) => {
    const borders = [
      'before:bg-gradient-to-r before:from-pink-400/40 before:via-purple-400/20 before:to-cyan-400/40',
      'before:bg-gradient-to-r before:from-cyan-400/40 before:via-blue-400/20 before:to-pink-400/40',
      'before:bg-gradient-to-r before:from-purple-400/40 before:via-pink-400/20 before:to-blue-400/40',
      'before:bg-gradient-to-r before:from-blue-400/40 before:via-cyan-400/20 before:to-purple-400/40',
    ];
    return borders[index % borders.length];
  };

  return (
    <div className="bg-black/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-3xl font-light text-white tracking-wide bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
          Resource Allocation Analysis
        </h3>
        <GradientButton variant="variant" className="px-6 py-3 text-base">
          Optimize Resources
        </GradientButton>
      </div>
      
      <div className="space-y-8">
        {allocationData.map((resource, index) => (
          <div 
            key={index} 
            className={`group relative rounded-xl p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${getCardGradient(index)} before:absolute before:inset-0 before:rounded-xl before:p-[1px] ${getBorderGradient(index)} before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:mask-composite-[exclude] before:pointer-events-none`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-light text-white text-xl tracking-wide">{resource.resource}</h4>
              <span className={`text-base font-medium tracking-wide ${getEfficiencyColor(resource.efficiency)}`}>
                {resource.efficiency}% Efficiency
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <p className="text-sm font-light text-white/70 uppercase tracking-wider mb-2">Current</p>
                <p className="text-3xl font-extralight text-white tracking-tight">{resource.current}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-light text-white/70 uppercase tracking-wider mb-2">Optimal</p>
                <p className="text-3xl font-extralight text-white tracking-tight">{resource.optimal}</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-light text-white/70 uppercase tracking-wider mb-2">Peak Capacity</p>
                <p className="text-3xl font-extralight text-white tracking-tight">{resource.peak}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="font-light text-white/70 tracking-wide">Utilization vs Optimal</span>
                <span className="font-medium text-white tracking-wide text-lg">{Math.round((resource.current / resource.optimal) * 100)}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-4 backdrop-blur-sm overflow-hidden">
                <div
                  className={`h-4 rounded-full ${getUtilizationGradient(resource.current, resource.optimal)} transition-all duration-500 ease-out shadow-lg`}
                  style={{ width: `${Math.min((resource.current / resource.optimal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="relative bg-gradient-to-r from-pink-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-sm rounded-lg p-4 before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-pink-400/40 before:via-purple-400/20 before:to-cyan-400/40 before:mask-[linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:mask-composite-[exclude] before:pointer-events-none">
              <p className="text-sm font-light leading-relaxed tracking-wide">
                <span className="font-medium bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                  Recommendation:
                </span> 
                <span className="text-white/90 ml-2">{resource.recommendation}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
