
import React from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { DepartmentStatus } from '../components/DepartmentStatus';
import { DepartmentMetrics } from '../components/DepartmentMetrics';
import { StaffAllocation } from '../components/StaffAllocation';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';

const Departments = () => {
  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Department Management"
        title1="Department"
        title2="Status & Operations"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <DepartmentMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentStatus expanded={true} />
              <StaffAllocation />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Departments;
