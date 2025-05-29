
import React from 'react';

interface PatientTableEmptyProps {
  hasPatients: boolean;
  hasFilters: boolean;
}

export const PatientTableEmpty = ({ hasPatients, hasFilters }: PatientTableEmptyProps) => {
  if (!hasPatients) {
    return (
      <tr>
        <td colSpan={6} className="p-8 text-center">
          <div className="text-white/60 mb-4">
            <p className="text-lg">No patients found</p>
            <p className="text-sm mt-2">This could be due to:</p>
            <ul className="text-sm mt-2 space-y-1">
              <li>• No patient data in the system</li>
              <li>• Insufficient permissions to view patient data</li>
              <li>• Department access restrictions</li>
            </ul>
          </div>
        </td>
      </tr>
    );
  }

  if (hasFilters) {
    return (
      <tr>
        <td colSpan={6} className="p-8 text-center">
          <div className="text-white/60 mb-4">
            <p className="text-lg">No patients match your current filters</p>
            <p className="text-sm mt-2">Try adjusting your search criteria or contact an administrator if you believe you should have access to more patients.</p>
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td colSpan={6} className="px-6 py-8 text-center text-white/60">
        No patients found. Import some patient data to get started.
      </td>
    </tr>
  );
};
