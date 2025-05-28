
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
        return 'bg-pink-500/20 text-pink-400 border-pink-400/30';
      case 'optimal':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-400/30';
      case 'overstaffed':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
      <h2 className="text-xl font-semibold text-white mb-6">Staff Allocation</h2>
      <div className="space-y-4">
        {staffData.map((dept, index) => (
          <div key={index} className="border border-white/10 rounded-lg p-4 bg-white/5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-white">{dept.department}</h3>
              <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(dept.status)}`}>
                {dept.status.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-white/60">Nurses</p>
                <p className="text-lg font-semibold text-white">
                  {dept.nurses.current}/{dept.nurses.required}
                  <span className="text-sm text-white/60 ml-2">
                    ({dept.nurses.utilization}% util)
                  </span>
                </p>
              </div>
              <div>
                <p className="text-sm text-white/60">Doctors</p>
                <p className="text-lg font-semibold text-white">
                  {dept.doctors.current}/{dept.doctors.required}
                  <span className="text-sm text-white/60 ml-2">
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
