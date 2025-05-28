
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { StatsOverview } from '../components/StatsOverview';
import { PatientsList } from '../components/PatientsList';
import { DepartmentStatus } from '../components/DepartmentStatus';
import { QuickActions } from '../components/QuickActions';
import { NavigationTabs } from '../components/NavigationTabs';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <StatsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentStatus />
              <QuickActions />
            </div>
          </div>
        );
      case 'patients':
        return <PatientsList />;
      case 'departments':
        return <DepartmentStatus expanded={true} />;
      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-lg text-gray-500">Feature coming soon...</h3>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <HeroGeometric 
        badge="Hospital Analytics"
        title1="Patient Flow"
        title2="Monitoring System"
      />
      
      <div className="relative z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mt-8">
            <NavigationTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="mt-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
