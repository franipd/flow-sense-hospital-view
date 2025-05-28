
import React from 'react';

interface PatientModalProps {
  patient: any;
  onClose: () => void;
}

export const PatientModal = ({ patient, onClose }: PatientModalProps) => {
  const journeyEvents = [
    { time: '09:15', event: 'Admission Complete', status: 'done', location: 'Reception' },
    { time: '09:30', event: 'Triage Assessment', status: 'done', location: 'Triage' },
    { time: '10:45', event: 'Doctor Consultation', status: 'done', location: 'ED Bay 3' },
    { time: '11:20', event: 'Lab Tests Ordered', status: 'done', location: 'ED Bay 3' },
    { time: '12:15', event: 'CT Scan', status: 'in-progress', location: 'Imaging' },
    { time: '13:00', event: 'Treatment Plan', status: 'pending', location: 'ED Bay 3' },
    { time: '14:30', event: 'Discharge Planning', status: 'pending', location: 'ED Bay 3' },
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-semibold">
                {patient.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{patient.name}</h2>
                <p className="text-gray-600">{patient.id} • {patient.room}</p>
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

        <div className="p-6">
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

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Current Status</h4>
                <p className="text-lg font-semibold text-blue-600 mt-1">{patient.status}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-900">Priority Level</h4>
                <p className="text-lg font-semibold text-orange-600 mt-1">{patient.priority.toUpperCase()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
