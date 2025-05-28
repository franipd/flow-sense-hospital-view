
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { BedManagement } from '../components/BedManagement';
import { EquipmentStatus } from '../components/EquipmentStatus';
import { ResourceAllocation } from '../components/ResourceAllocation';

const Resources = () => {
  const [activeView, setActiveView] = useState('beds');

  const viewOptions = [
    { id: 'beds', label: 'Bed Management', icon: '🛏️' },
    { id: 'equipment', label: 'Equipment', icon: '🏥' },
    { id: 'allocation', label: 'Resource Allocation', icon: '📊' },
  ];

  return (
    <div className="min-h-screen bg-[#030303]">
      <HeroGeometric 
        badge="Resource Management"
        title1="Hospital"
        title2="Resource Optimization"
      />
      
      <div className="relative z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/20">
              <div className="flex space-x-1">
                {viewOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setActiveView(option.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      activeView === option.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="hidden sm:inline">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {activeView === 'beds' && <BedManagement />}
            {activeView === 'equipment' && <EquipmentStatus />}
            {activeView === 'allocation' && <ResourceAllocation />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;
