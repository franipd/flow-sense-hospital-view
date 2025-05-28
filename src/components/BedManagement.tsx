
import React from 'react';

export const BedManagement = () => {
  const bedData = [
    {
      department: 'Emergency Department',
      total: 15,
      occupied: 14,
      available: 1,
      cleaning: 0,
      maintenance: 0,
      beds: Array.from({ length: 15 }, (_, i) => ({
        id: `ED-${i + 1}`,
        status: i < 14 ? 'occupied' : 'available',
        patient: i < 14 ? `Patient ${i + 1}` : null,
      })),
    },
    {
      department: 'ICU',
      total: 20,
      occupied: 18,
      available: 2,
      cleaning: 0,
      maintenance: 0,
      beds: Array.from({ length: 20 }, (_, i) => ({
        id: `ICU-${i + 1}`,
        status: i < 18 ? 'occupied' : 'available',
        patient: i < 18 ? `Patient ${i + 101}` : null,
      })),
    },
    {
      department: 'General Ward',
      total: 60,
      occupied: 45,
      available: 12,
      cleaning: 2,
      maintenance: 1,
      beds: Array.from({ length: 60 }, (_, i) => ({
        id: `GW-${i + 1}`,
        status: i < 45 ? 'occupied' : i < 57 ? 'available' : i < 59 ? 'cleaning' : 'maintenance',
        patient: i < 45 ? `Patient ${i + 201}` : null,
      })),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-500';
      case 'available':
        return 'bg-green-500';
      case 'cleaning':
        return 'bg-yellow-500';
      case 'maintenance':
        return 'bg-gray-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {bedData.map((dept, index) => (
        <div
          key={index}
          className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{dept.department}</h3>
            <div className="flex gap-4 text-sm">
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                Occupied: {dept.occupied}
              </span>
              <span className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                Available: {dept.available}
              </span>
              {dept.cleaning > 0 && (
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  Cleaning: {dept.cleaning}
                </span>
              )}
              {dept.maintenance > 0 && (
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  Maintenance: {dept.maintenance}
                </span>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-10 gap-2">
            {dept.beds.slice(0, 20).map((bed) => (
              <div
                key={bed.id}
                className={`w-8 h-8 rounded ${getStatusColor(bed.status)} flex items-center justify-center text-white text-xs font-bold cursor-pointer hover:opacity-80 transition-opacity`}
                title={`${bed.id} - ${bed.status}${bed.patient ? ` (${bed.patient})` : ''}`}
              >
                {bed.id.split('-')[1]}
              </div>
            ))}
            {dept.beds.length > 20 && (
              <div className="col-span-10 text-center text-sm text-gray-500 mt-2">
                ... and {dept.beds.length - 20} more beds
              </div>
            )}
          </div>
          
          <div className="mt-4 grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-gray-900">{dept.total}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Total Beds</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{dept.occupied}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Occupied</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{dept.available}</p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Available</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((dept.occupied / dept.total) * 100)}%
              </p>
              <p className="text-xs text-gray-500 uppercase tracking-wide">Utilization</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
