
import React from 'react';
import { GradientButton } from './ui/gradient-button';

export const QuickActions = () => {
  const actions = [
    {
      title: 'Order STAT Labs',
      icon: '🧪',
      variant: 'default' as const,
    },
    {
      title: 'Request Imaging',
      icon: '📸',
      variant: 'variant' as const,
    },
    {
      title: 'Consult Specialist',
      icon: '👨‍⚕️',
      variant: 'default' as const,
    },
    {
      title: 'Discharge Patient',
      icon: '✅',
      variant: 'variant' as const,
    },
  ];

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <GradientButton
            key={index}
            variant={action.variant}
            className="w-full flex items-center justify-start gap-3"
          >
            <span className="text-xl">{action.icon}</span>
            <span>{action.title}</span>
          </GradientButton>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-xs text-white/60 uppercase tracking-wide">Active Cases</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">18min</p>
            <p className="text-xs text-white/60 uppercase tracking-wide">Queue Wait</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">7</p>
            <p className="text-xs text-white/60 uppercase tracking-wide">Available Beds</p>
          </div>
        </div>
      </div>
    </div>
  );
};
