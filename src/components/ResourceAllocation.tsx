
import React from 'react';

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
    if (efficiency >= 90) return 'text-green-600';
    if (efficiency >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getUtilizationColor = (current: number, optimal: number) => {
    const ratio = current / optimal;
    if (ratio > 1.1) return 'from-red-400 to-red-600';
    if (ratio > 0.9) return 'from-green-400 to-green-600';
    return 'from-yellow-400 to-yellow-600';
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Resource Allocation Analysis</h3>
        <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200">
          Optimize Resources
        </button>
      </div>
      
      <div className="space-y-6">
        {allocationData.map((resource, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{resource.resource}</h4>
              <span className={`text-sm font-semibold ${getEfficiencyColor(resource.efficiency)}`}>
                {resource.efficiency}% Efficiency
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Current</p>
                <p className="text-xl font-bold text-gray-900">{resource.current}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Optimal</p>
                <p className="text-xl font-bold text-gray-900">{resource.optimal}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Peak Capacity</p>
                <p className="text-xl font-bold text-gray-900">{resource.peak}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span>Utilization vs Optimal</span>
                <span>{Math.round((resource.current / resource.optimal) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getUtilizationColor(resource.current, resource.optimal)} transition-all duration-300`}
                  style={{ width: `${Math.min((resource.current / resource.optimal) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded p-3">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Recommendation:</span> {resource.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
