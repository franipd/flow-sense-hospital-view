
import React from 'react';

export const StaffAllocation = () => {
  const staffData = [
    {
      department: 'Emergency Department',
      nurses: { current: 8, required: 10, utilization: 95 },
      doctors: { current: 3, required: 4, utilization: 88 },
      status: 'understaffed',
    },
    {
      department: 'ICU',
      nurses: { current: 12, required: 12, utilization: 85 },
      doctors: { current: 6, required: 6, utilization: 90 },
      status: 'optimal',
    },
    {
      department: 'General Ward',
      nurses: { current: 15, required: 14, utilization: 75 },
      doctors: { current: 8, required: 7, utilization: 70 },
      status: 'overstaffed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'understaffed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'overstaffed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Staff Allocation</h2>
      <div className="space-y-4">
        {staffData.map((dept, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">{dept.department}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(dept.status)}`}>
                {dept.status.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nurses</p>
                <p className="text-lg font-semibold">
                  {dept.nurses.current}/{dept.nurses.required}
                  <span className="text-sm text-gray-500 ml-2">
                    ({dept.nurses.utilization}% util)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Doctors</p>
                <p className="text-lg font-semibold">
                  {dept.doctors.current}/{dept.doctors.required}
                  <span className="text-sm text-gray-500 ml-2">
                    ({dept.doctors.utilization}% util)
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
