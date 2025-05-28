
import React from 'react';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Order STAT Labs',
      icon: '🧪',
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      title: 'Request Imaging',
      icon: '📸',
      color: 'bg-orange-500 hover:bg-orange-600',
    },
    {
      title: 'Consult Specialist',
      icon: '👨‍⚕️',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      title: 'Discharge Patient',
      icon: '✅',
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  return (
    <div className="bg-[#e5e5e5] rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <button
            key={index}
            className={`w-full p-4 rounded-xl ${action.color} text-white font-medium transform hover:scale-105 transition-all duration-200 flex items-center gap-3`}
          >
            <span className="text-xl">{action.icon}</span>
            <span>{action.title}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Active Cases</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">18min</p>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Queue Wait</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900">7</p>
            <p className="text-xs text-gray-600 uppercase tracking-wide">Available Beds</p>
          </div>
        </div>
      </div>
    </div>
  );
};
