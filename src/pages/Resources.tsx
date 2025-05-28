
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { BedManagement } from '../components/BedManagement';
import { EquipmentStatus } from '../components/EquipmentStatus';
import { ResourceAllocation } from '../components/ResourceAllocation';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';
import { GradientButton } from '../components/ui/gradient-button';

const Resources = () => {
  const [activeView, setActiveView] = useState('beds');

  const viewOptions = [
    { id: 'beds', label: 'Bed Management', icon: '🛏️' },
    { id: 'equipment', label: 'Equipment', icon: '🏥' },
    { id: 'allocation', label: 'Resource Allocation', icon: '📊' },
  ];

  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Resource Management"
        title1="Hospital"
        title2="Resource Optimization"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-white/10">
              <div className="flex space-x-1">
                {viewOptions.map((option) => (
                  <GradientButton
                    key={option.id}
                    onClick={() => setActiveView(option.id)}
                    variant={activeView === option.id ? "default" : "variant"}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                      activeView === option.id ? '' : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <span className="text-lg">{option.icon}</span>
                    <span className="hidden sm:inline font-light">{option.label}</span>
                  </GradientButton>
                ))}
              </div>
            </div>

            {activeView === 'beds' && <BedManagement />}
            {activeView === 'equipment' && <EquipmentStatus />}
            {activeView === 'allocation' && <ResourceAllocation />}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Resources;
