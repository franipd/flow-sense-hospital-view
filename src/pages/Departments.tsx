
import React from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { DepartmentStatus } from '../components/DepartmentStatus';
import { DepartmentMetrics } from '../components/DepartmentMetrics';
import { StaffAllocation } from '../components/StaffAllocation';

const Departments = () => {
  return (
    <div className="min-h-screen bg-[#030303]">
      <HeroGeometric 
        badge="Department Management"
        title1="Department"
        title2="Status & Operations"
      />
      
      <div className="relative z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            <DepartmentMetrics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DepartmentStatus expanded={true} />
              <StaffAllocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
