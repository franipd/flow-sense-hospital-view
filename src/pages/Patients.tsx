
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { PatientsList } from '../components/PatientsList';
import { PatientSearch } from '../components/PatientSearch';
import { PatientMetrics } from '../components/PatientMetrics';

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#030303]">
      <HeroGeometric 
        badge="Patient Management"
        title1="Patient Flow"
        title2="Real-time Tracking"
      />
      
      <div className="relative z-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-6">
            <PatientMetrics />
            <PatientSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <PatientsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
