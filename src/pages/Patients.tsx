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
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');

  // Mock patient for the modal - matches the Patient interface
  const mockPatient = {
    id: 'new-patient-id',
    mrn: 'TBD-001',
    first_name: 'New',
    last_name: 'Patient',
    date_of_birth: '1990-01-01',
    gender: 'Prefer not to say',
    current_location: 'Registration',
    current_status: 'Waiting',
    triage_priority: 3,
    contact_info: {
      phone: '',
      address: {
        street: '',
        city: '',
        state: '',
        zip: ''
      },
      emergency_contact: {
        name: '',
        phone: '',
        relationship: ''
      }
    }
  };

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
                <PatientSearch 
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  departmentFilter={departmentFilter}
                  onDepartmentChange={setDepartmentFilter}
                  statusFilter={statusFilter}
                  onStatusChange={setStatusFilter}
                />
              </div>
              <div className="lg:col-span-2">
                <PatientsList 
                  searchQuery={searchQuery}
                  departmentFilter={departmentFilter}
                  statusFilter={statusFilter}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      
      {showPatientModal && (
        <PatientModal 
          patient={mockPatient}
          onClose={() => setShowPatientModal(false)} 
        />
      )}
    </div>
  );
};

export default Patients;
