
import React from 'react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Order STAT Labs',
      icon: '🧪',
      color: 'from-red-400 to-red-600',
      urgency: 'high',
    },
    {
      title: 'Request Imaging',
      icon: '📸',
      color: 'from-orange-400 to-orange-600',
      urgency: 'medium',
    },
    {
      title: 'Consult Specialist',
      icon: '👨‍⚕️',
      color: 'from-blue-400 to-blue-600',
      urgency: 'medium',
    },
    {
      title: 'Discharge Patient',
      icon: '✅',
      color: 'from-green-400 to-green-600',
      urgency: 'low',
    },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full p-4 rounded-lg bg-gradient-to-r ${action.color} text-white font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}
          >
            <span className="text-xl">{action.icon}</span>
            <span>{action.title}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Active Cases</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">18min</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Queue Wait</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">7</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Available Beds</p>
          </div>
        </div>
      </div>
    </div>
  );
};
