
import React from 'react';
import { Search } from 'lucide-react';

interface PatientSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PatientSearch = ({ searchQuery, onSearchChange }: PatientSearchProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search patients by name, ID, or department..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white">
            <option>All Departments</option>
            <option>Emergency</option>
            <option>ICU</option>
            <option>General Ward</option>
            <option>Surgery</option>
          </select>
          <select className="px-4 py-3 border border-gray-300 rounded-lg bg-white">
            <option>All Status</option>
            <option>Critical</option>
            <option>Stable</option>
            <option>Under Treatment</option>
            <option>Waiting</option>
          </select>
        </div>
      </div>
    </div>
  );
};
