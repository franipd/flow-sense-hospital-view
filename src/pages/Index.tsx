
import React from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { StatsOverview } from '../components/StatsOverview';
import { DepartmentStatus } from '../components/DepartmentStatus';
import { QuickActions } from '../components/QuickActions';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Hospital Analytics"
        title1="Patient Flow"
        title2="Monitoring System"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <StatsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentStatus />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
