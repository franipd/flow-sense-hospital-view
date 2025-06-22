
export interface PatientData {
  mrn: string;
  name: string;
  age: number | null;
  location: string;
  status: string;
  bed: string;
  priority: string;
  admissionDate?: string;
}

export interface ReportStats {
  totalPatients: number;
  byStatus: Record<string, number>;
  byDepartment: Record<string, number>;
  byPriority: Record<string, number>;
  avgAge?: number;
}

export interface ParsedReport {
  type: 'patient_roster' | 'summary' | 'analytics' | 'mixed';
  title: string;
  patients: PatientData[];
  stats: ReportStats;
  sections: Array<{
    title: string;
    content: string;
    type: 'text' | 'list' | 'stats';
  }>;
}

export const parseReportContent = (content: string): ParsedReport => {
  const lines = content.split('\n').filter(line => line.trim());
  const patients: PatientData[] = [];
  const sections: ParsedReport['sections'] = [];
  
  let currentSection = '';
  let currentContent: string[] = [];
  let stats: ReportStats = {
    totalPatients: 0,
    byStatus: {},
    byDepartment: {},
    byPriority: {}
  };

  // Extract patient data patterns
  const patientPatterns = [
    /MRN[:\s]+(\w+)/i,
    /Patient[:\s]+([^,\n]+)/i,
    /Name[:\s]+([^,\n]+)/i,
    /Age[:\s]+(\d+)/i,
    /Location[:\s]+([^,\n]+)/i,
    /Status[:\s]+([^,\n]+)/i,
    /Bed[:\s]+([^,\n]+)/i,
    /Priority[:\s]+([^,\n]+)/i
  ];

  // Parse statistics
  const statsPatterns = [
    /Total[:\s]+(\d+)/i,
    /Count[:\s]+(\d+)/i,
    /(\d+)\s+patients?/i
  ];

  let currentPatient: Partial<PatientData> = {};
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Check if it's a section header
    if (trimmedLine.endsWith(':') && trimmedLine.length > 3) {
      // Save previous section
      if (currentSection && currentContent.length > 0) {
        sections.push({
          title: currentSection.replace(':', ''),
          content: currentContent.join('\n'),
          type: currentContent.some(c => c.includes('•') || c.includes('-')) ? 'list' : 'text'
        });
      }
      
      currentSection = trimmedLine;
      currentContent = [];
    } else if (trimmedLine.length > 0) {
      currentContent.push(trimmedLine);
      
      // Try to extract patient data
      const mrnMatch = trimmedLine.match(/MRN[:\s]+(\w+)/i);
      const nameMatch = trimmedLine.match(/(?:Patient|Name)[:\s]+([^,\n]+)/i);
      const ageMatch = trimmedLine.match(/Age[:\s]+(\d+)/i);
      const locationMatch = trimmedLine.match(/Location[:\s]+([^,\n]+)/i);
      const statusMatch = trimmedLine.match(/Status[:\s]+([^,\n]+)/i);
      const bedMatch = trimmedLine.match(/Bed[:\s]+([^,\n]+)/i);
      const priorityMatch = trimmedLine.match(/Priority[:\s]+([^,\n]+)/i);
      
      if (mrnMatch) {
        // If we have a complete patient, save it
        if (currentPatient.mrn) {
          patients.push(currentPatient as PatientData);
        }
        currentPatient = { mrn: mrnMatch[1].trim() };
      }
      
      if (nameMatch) currentPatient.name = nameMatch[1].trim();
      if (ageMatch) currentPatient.age = parseInt(ageMatch[1]);
      if (locationMatch) currentPatient.location = locationMatch[1].trim();
      if (statusMatch) currentPatient.status = statusMatch[1].trim();
      if (bedMatch) currentPatient.bed = bedMatch[1].trim();
      if (priorityMatch) currentPatient.priority = priorityMatch[1].trim();
      
      // Extract statistics
      const totalMatch = trimmedLine.match(/(\d+)\s+(?:total\s+)?patients?/i);
      if (totalMatch) {
        stats.totalPatients = Math.max(stats.totalPatients, parseInt(totalMatch[1]));
      }
    }
  }
  
  // Save the last patient and section
  if (currentPatient.mrn) {
    patients.push(currentPatient as PatientData);
  }
  
  if (currentSection && currentContent.length > 0) {
    sections.push({
      title: currentSection.replace(':', ''),
      content: currentContent.join('\n'),
      type: currentContent.some(c => c.includes('•') || c.includes('-')) ? 'list' : 'text'
    });
  }

  // Calculate statistics from parsed patients
  if (patients.length > 0) {
    stats.totalPatients = Math.max(stats.totalPatients, patients.length);
    
    patients.forEach(patient => {
      if (patient.status) {
        stats.byStatus[patient.status] = (stats.byStatus[patient.status] || 0) + 1;
      }
      if (patient.location) {
        stats.byDepartment[patient.location] = (stats.byDepartment[patient.location] || 0) + 1;
      }
      if (patient.priority) {
        stats.byPriority[patient.priority] = (stats.byPriority[patient.priority] || 0) + 1;
      }
    });
    
    const ages = patients.filter(p => p.age).map(p => p.age!);
    if (ages.length > 0) {
      stats.avgAge = Math.round(ages.reduce((sum, age) => sum + age, 0) / ages.length);
    }
  }

  // Determine report type
  let type: ParsedReport['type'] = 'summary';
  if (patients.length > 5) type = 'patient_roster';
  else if (sections.some(s => s.title.toLowerCase().includes('analytic'))) type = 'analytics';
  else if (patients.length > 0 && sections.length > 0) type = 'mixed';

  return {
    type,
    title: sections[0]?.title || 'Healthcare Report',
    patients,
    stats,
    sections
  };
};
