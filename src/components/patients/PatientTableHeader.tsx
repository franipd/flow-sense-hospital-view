
import React from 'react';

export const PatientTableHeader = () => {
  return (
    <thead className="bg-black/20">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
          Patient
        </th>
        <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
          Location
        </th>
        <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
          Status
        </th>
        <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
          Priority
        </th>
        <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
          Admitted
        </th>
        <th className="px-6 py-3 text-left text-xs font-light text-white/60 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
};
