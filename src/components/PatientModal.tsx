
import React from 'react';
import type { Patient } from '@/types/database';

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
}

export const PatientModal = ({ patient, onClose }: PatientModalProps) => {
  const journeyEvents = [
    { time: '09:15', event: 'Admission Complete', status: 'done', location: 'Reception' },
    { time: '09:30', event: 'Triage Assessment', status: 'done', location: 'Triage' },
    { time: '10:45', event: 'Doctor Consultation', status: 'done', location: patient.current_location || 'ED Bay 3' },
    { time: '11:20', event: 'Lab Tests Ordered', status: 'done', location: patient.current_location || 'ED Bay 3' },
    { time: '12:15', event: 'CT Scan', status: 'in-progress', location: 'Imaging' },
    { time: '13:00', event: 'Treatment Plan', status: 'pending', location: patient.current_location || 'ED Bay 3' },
    { time: '14:30', event: 'Discharge Planning', status: 'pending', location: patient.current_location || 'ED Bay 3' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
        return '✅';
      case 'in-progress':
        return '🔄';
      case 'pending':
        return '⏳';
      default:
        return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done':
        return 'text-green-600';
      case 'in-progress':
        return 'text-blue-600';
      case 'pending':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
                {patient.first_name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{patient.first_name} {patient.last_name}</h2>
                <p className="text-gray-600">{patient.mrn} • Age: {formatAge(patient.date_of_birth)} • {patient.gender || 'N/A'}</p>
                <p className="text-gray-500 text-sm">Location: {patient.current_location || patient.assigned_bed || 'N/A'}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900">Current Status</h4>
                  <p className="text-lg font-semibold text-blue-600 mt-1">{patient.current_status || 'Unknown'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900">Priority Level</h4>
                  <p className="text-lg font-semibold text-orange-600 mt-1">
                    {patient.triage_priority ? `LEVEL ${patient.triage_priority}` : 'N/A'}
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-gray-900">Insurance</h4>
                <p className="text-sm text-gray-700 mt-1">{patient.insurance_type || 'Not specified'}</p>
              </div>

              {patient.admission_datetime && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-900">Admission Date</h4>
                  <p className="text-sm text-gray-700 mt-1">
                    {new Date(patient.admission_datetime).toLocaleString()}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            {patient.contact_info && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3">
                  {patient.contact_info.phone && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-900">Phone</h4>
                      <p className="text-sm text-gray-700 mt-1">{patient.contact_info.phone}</p>
                    </div>
                  )}

                  {patient.contact_info.address && (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-900">Address</h4>
                      <div className="text-sm text-gray-700 mt-1">
                        {patient.contact_info.address.street && <p>{patient.contact_info.address.street}</p>}
                        {(patient.contact_info.address.city || patient.contact_info.address.state || patient.contact_info.address.zip) && (
                          <p>
                            {patient.contact_info.address.city && `${patient.contact_info.address.city}, `}
                            {patient.contact_info.address.state && `${patient.contact_info.address.state} `}
                            {patient.contact_info.address.zip}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {patient.contact_info.emergency_contact && (
                    <div className="bg-red-50 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-gray-900">Emergency Contact</h4>
                      <div className="text-sm text-gray-700 mt-1">
                        {patient.contact_info.emergency_contact.name && (
                          <p className="font-medium">{patient.contact_info.emergency_contact.name}</p>
                        )}
                        {patient.contact_info.emergency_contact.phone && (
                          <p>Phone: {patient.contact_info.emergency_contact.phone}</p>
                        )}
                        {patient.contact_info.emergency_contact.relationship && (
                          <p>Relationship: {patient.contact_info.emergency_contact.relationship}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Patient Journey Timeline */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Journey Timeline</h3>
            <div className="space-y-4">
              {journeyEvents.map((event, index) => (
                <div key={index} className={`flex items-start gap-4 ${getStatusColor(event.status)}`}>
                  <div className="flex-shrink-0 text-lg">
                    {getStatusIcon(event.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{event.event}</p>
                      <span className="text-xs text-gray-500">{event.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
