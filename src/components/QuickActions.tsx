
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
      <h2 className="text-2xl font-light text-white mb-6 tracking-wide">Quick Actions</h2>
      <div className="space-y-3">
        {actions.map((action, index) => (
          <GradientButton
            key={index}
            variant={action.variant}
            className="w-full flex items-center justify-start gap-3 font-light tracking-wide"
          >
            <span className="text-xl">{action.icon}</span>
            <span className="text-base">{action.title}</span>
          </GradientButton>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-extralight text-white tracking-tight">5</p>
            <p className="text-xs font-light text-white/60 uppercase tracking-wider leading-relaxed">Active Cases</p>
          </div>
          <div>
            <p className="text-3xl font-extralight text-white tracking-tight">18min</p>
            <p className="text-xs font-light text-white/60 uppercase tracking-wider leading-relaxed">Queue Wait</p>
          </div>
          <div>
            <p className="text-3xl font-extralight text-white tracking-tight">7</p>
            <p className="text-xs font-light text-white/60 uppercase tracking-wider leading-relaxed">Available Beds</p>
          </div>
        </div>
      </div>
    </div>
  );
};
