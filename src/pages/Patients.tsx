
import React, { useState } from 'react';
import { HeroGeometric } from '../components/ui/shape-landing-hero';
import { PatientsList } from '../components/PatientsList';
import { PatientSearch } from '../components/PatientSearch';
import { PatientMetrics } from '../components/PatientMetrics';
import { TopNavigation } from '../components/TopNavigation';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { Footer } from '../components/Footer';

const Patients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen relative font-sans">
      <AnimatedBackground />
      <TopNavigation />
      
      <HeroGeometric 
        badge="Patient Management"
        title1="Patient Flow"
        title2="Real-time Tracking"
      />
      
      <div className="relative z-10 -mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 font-light">
            <PatientMetrics />
            <PatientSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <PatientsList />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Patients;
