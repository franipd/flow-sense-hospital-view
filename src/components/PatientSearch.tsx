
import React from 'react';
import { Search } from 'lucide-react';

interface PatientSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const PatientSearch = ({ searchQuery, onSearchChange }: PatientSearchProps) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/10">
      <div className="flex items-center gap-4">
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
        <div className="flex gap-2">
          <select className="px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white">
            <option className="bg-gray-900 text-white">All Departments</option>
            <option className="bg-gray-900 text-white">Emergency</option>
            <option className="bg-gray-900 text-white">ICU</option>
            <option className="bg-gray-900 text-white">General Ward</option>
            <option className="bg-gray-900 text-white">Surgery</option>
          </select>
          <select className="px-4 py-3 border border-white/20 rounded-lg bg-white/10 backdrop-blur-sm text-white">
            <option className="bg-gray-900 text-white">All Status</option>
            <option className="bg-gray-900 text-white">Critical</option>
            <option className="bg-gray-900 text-white">Stable</option>
            <option className="bg-gray-900 text-white">Under Treatment</option>
            <option className="bg-gray-900 text-white">Waiting</option>
          </select>
        </div>
      </div>
    </div>
  );
};
