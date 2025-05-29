
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TopNavigation } from '@/components/TopNavigation';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { Footer } from '@/components/Footer';
import { CSVImporter } from '@/components/CSVImporter';
import { PatientsList } from '@/components/PatientsList';
import { PatientSearch } from '@/components/PatientSearch';
import { PatientModal } from '@/components/PatientModal';

const Patients = () => {
  const [showImporter, setShowImporter] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <TopNavigation />
      
      <div className="relative z-10 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Patient Management
              </h1>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Manage patient records, view medical histories, and track care pathways
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                onClick={() => setShowPatientModal(true)}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                Add New Patient
              </Button>
              <Button
                onClick={() => setShowImporter(!showImporter)}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
              >
                {showImporter ? 'Hide' : 'Import'} CSV Data
              </Button>
            </div>

            {showImporter && (
              <div className="mb-8">
                <CSVImporter />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <PatientSearch />
              </div>
              <div className="lg:col-span-2">
                <PatientsList />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {showPatientModal && (
        <PatientModal onClose={() => setShowPatientModal(false)} />
      )}
    </div>
  );
};

export default Patients;
