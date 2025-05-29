
import React from 'react';
import { Search } from 'lucide-react';

interface PatientSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  departmentFilter: string;
  onDepartmentChange: (department: string) => void;
  statusFilter: string;
  onStatusChange: (status: string) => void;
}

export const PatientSearch = ({ 
  searchQuery, 
  onSearchChange,
  departmentFilter,
  onDepartmentChange,
  statusFilter,
  onStatusChange
}: PatientSearchProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 shadow-2xl border border-white/10">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patients by name, ID, or department..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-2">
          <select 
            value={departmentFilter}
            onChange={(e) => onDepartmentChange(e.target.value)}
            className="px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white min-w-[160px]"
          >
            <option className="bg-gray-900 text-white" value="All Departments">All Departments</option>
            <option className="bg-gray-900 text-white" value="Emergency">Emergency</option>
            <option className="bg-gray-900 text-white" value="ICU">ICU</option>
            <option className="bg-gray-900 text-white" value="General Ward">General Ward</option>
            <option className="bg-gray-900 text-white" value="Surgery">Surgery</option>
            <option className="bg-gray-900 text-white" value="Registration">Registration</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white min-w-[140px]"
          >
            <option className="bg-gray-900 text-white" value="All Status">All Status</option>
            <option className="bg-gray-900 text-white" value="Critical">Critical</option>
            <option className="bg-gray-900 text-white" value="Stable">Stable</option>
            <option className="bg-gray-900 text-white" value="Under Treatment">Under Treatment</option>
            <option className="bg-gray-900 text-white" value="Waiting">Waiting</option>
            <option className="bg-gray-900 text-white" value="In Treatment">In Treatment</option>
            <option className="bg-gray-900 text-white" value="Ready for Discharge">Ready for Discharge</option>
            <option className="bg-gray-900 text-white" value="Discharged">Discharged</option>
          </select>
        </div>
      </div>
    </div>
  );
};
