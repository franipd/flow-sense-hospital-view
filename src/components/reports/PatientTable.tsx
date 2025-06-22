
import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Users, MapPin, AlertCircle, Search, Filter } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PatientData } from './utils/reportParser';

interface PatientTableProps {
  patients: PatientData[];
}

export const PatientTable = ({ patients }: PatientTableProps) => {
  const [sortField, setSortField] = useState<keyof PatientData>('mrn');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSort = (field: keyof PatientData) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    setCurrentPage(1);
  };

  const filteredAndSortedPatients = useMemo(() => {
    let filtered = patients.filter(patient => {
      const matchesSearch = !searchTerm || 
        patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.mrn?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.location?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || patient.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });

    filtered.sort((a, b) => {
      const aValue = a[sortField] || '';
      const bValue = b[sortField] || '';
      
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [patients, searchTerm, statusFilter, priorityFilter, sortField, sortDirection]);

  const paginatedPatients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPatients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPatients, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedPatients.length / itemsPerPage);

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

  const uniqueStatuses = [...new Set(patients.map(p => p.status).filter(Boolean))];
  const uniquePriorities = [...new Set(patients.map(p => p.priority).filter(Boolean))];

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
      <div className="flex items-center gap-3 text-blue-300 mb-4">
        <Users className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Patient Roster ({filteredAndSortedPatients.length} patients)</h3>
      </div>

      {/* Filters and Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-white/50" />
          <Input
            placeholder="Search patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/50"
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue placeholder="Filter by status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {uniqueStatuses.map(status => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <SelectValue placeholder="Filter by priority" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            {uniquePriorities.map(priority => (
              <SelectItem key={priority} value={priority}>{priority}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 text-white/60 text-sm">
          Showing {paginatedPatients.length} of {filteredAndSortedPatients.length}
        </div>
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
            {paginatedPatients.map((patient, index) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Previous
            </Button>
            <span className="text-white/60 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
