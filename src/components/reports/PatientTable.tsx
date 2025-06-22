
import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Users, MapPin, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PatientData } from './utils/reportParser';

interface PatientTableProps {
  patients: PatientData[];
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  const [sortField, setSortField] = useState<keyof PatientData>('mrn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof PatientData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedPatients = [...patients].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'stable': return 'bg-green-500/20 text-green-400 border-green-400/50';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-400/50';
      case 'admitted': return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
      case 'discharged': return 'bg-gray-500/20 text-gray-400 border-gray-400/50';
      default: return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case 'high': case 'urgent': return 'bg-red-500/20 text-red-400 border-red-400/50';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/50';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-400/50';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-400/50';
    }
  };

  const SortableHeader = ({ field, children }: { field: keyof PatientData; children: React.ReactNode }) => (
    <TableHead 
      className="cursor-pointer hover:bg-white/5 text-blue-300 font-semibold"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </div>
    </TableHead>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 text-blue-300">
        <Users className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Patient Roster ({patients.length} patients)</h3>
      </div>
      
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-white/5">
              <SortableHeader field="mrn">MRN</SortableHeader>
              <SortableHeader field="name">Patient Name</SortableHeader>
              <SortableHeader field="age">Age</SortableHeader>
              <SortableHeader field="location">Location</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <SortableHeader field="bed">Bed</SortableHeader>
              <SortableHeader field="priority">Priority</SortableHeader>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient, index) => (
              <TableRow key={patient.mrn || index} className="border-white/10 hover:bg-white/5">
                <TableCell className="font-mono text-blue-300">{patient.mrn || 'N/A'}</TableCell>
                <TableCell className="font-medium text-white">{patient.name || 'Unknown'}</TableCell>
                <TableCell className="text-white/80">{patient.age || 'N/A'}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-white/80">
                    <MapPin className="w-3 h-3" />
                    {patient.location || 'N/A'}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={`${getStatusColor(patient.status || '')} border`}>
                    {patient.status || 'Unknown'}
                  </Badge>
                </TableCell>
                <TableCell className="text-white/80">{patient.bed || 'N/A'}</TableCell>
                <TableCell>
                  <Badge className={`${getPriorityColor(patient.priority || '')} border flex items-center gap-1`}>
                    {(patient.priority?.toLowerCase() === 'high' || patient.priority?.toLowerCase() === 'urgent') && 
                      <AlertCircle className="w-3 h-3" />
                    }
                    {patient.priority || 'Normal'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
