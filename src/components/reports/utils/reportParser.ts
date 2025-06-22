
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

  // Enhanced patterns for better patient data extraction
  const patientBlockPattern = /(?:patient|mrn|name)[\s:]+/i;
  const tableRowPattern = /\|.*\|/; // Table format detection
  const listItemPattern = /^[-•*]\s+/;
  
  let currentPatient: Partial<PatientData> = {};
  let inPatientBlock = false;
  let tableHeaders: string[] = [];
  let isTableData = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect table headers
    if (tableRowPattern.test(line) && line.includes('MRN')) {
      tableHeaders = line.split('|').map(h => h.trim()).filter(h => h);
      isTableData = true;
      continue;
    }
    
    // Parse table rows
    if (isTableData && tableRowPattern.test(line) && !line.includes('---')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 4) {
        const patient: Partial<PatientData> = {};
        
        // Map table columns to patient properties
        cells.forEach((cell, index) => {
          const header = tableHeaders[index]?.toLowerCase() || '';
          if (header.includes('mrn')) patient.mrn = cell;
          else if (header.includes('name') || header.includes('patient')) patient.name = cell;
          else if (header.includes('age')) patient.age = parseInt(cell) || null;
          else if (header.includes('location') || header.includes('room')) patient.location = cell;
          else if (header.includes('status')) patient.status = cell;
          else if (header.includes('bed')) patient.bed = cell;
          else if (header.includes('priority')) patient.priority = cell;
        });
        
        if (patient.mrn && patient.name) {
          patients.push(patient as PatientData);
        }
      }
      continue;
    }
    
    // Enhanced section detection
    if (line.endsWith(':') && line.length > 3 && line.length < 50) {
      // Save previous section
      if (currentSection && currentContent.length > 0) {
        sections.push({
          title: currentSection.replace(':', ''),
          content: currentContent.join('\n'),
          type: currentContent.some(c => listItemPattern.test(c)) ? 'list' : 'text'
        });
      }
      
      currentSection = line;
      currentContent = [];
      inPatientBlock = line.toLowerCase().includes('patient');
      isTableData = false;
    } else if (line.length > 0) {
      currentContent.push(line);
      
      // Enhanced patient data extraction
      if (inPatientBlock || patientBlockPattern.test(line)) {
        const mrnMatch = line.match(/(?:MRN|Patient\s+ID)[\s:]+(\w+)/i);
        const nameMatch = line.match(/(?:Name|Patient)[\s:]+([^,\n(]+?)(?:\s*\(|$|,|\n)/i);
        const ageMatch = line.match(/Age[\s:]+(\d+)/i);
        const locationMatch = line.match(/(?:Location|Room|Department)[\s:]+([^,\n]+?)(?:,|$|\n)/i);
        const statusMatch = line.match(/Status[\s:]+([^,\n]+?)(?:,|$|\n)/i);
        const bedMatch = line.match(/Bed[\s:]+([^,\n]+?)(?:,|$|\n)/i);
        const priorityMatch = line.match(/Priority[\s:]+([^,\n]+?)(?:,|$|\n)/i);
        
        if (mrnMatch) {
          if (currentPatient.mrn && currentPatient.name) {
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
      }
      
      // Extract statistics with better patterns
      const totalMatch = line.match(/(?:Total|Count)[\s:]*(\d+)\s*patients?/i);
      const statusCount = line.match(/(\d+)\s+([^,\n]+?)\s+(?:patients?|status)/i);
      
      if (totalMatch) {
        stats.totalPatients = Math.max(stats.totalPatients, parseInt(totalMatch[1]));
      }
      
      if (statusCount) {
        const count = parseInt(statusCount[1]);
        const status = statusCount[2].trim();
        stats.byStatus[status] = count;
      }
    }
  }
  
  // Save the last patient and section
  if (currentPatient.mrn && currentPatient.name) {
    patients.push(currentPatient as PatientData);
  }
  
  if (currentSection && currentContent.length > 0) {
    sections.push({
      title: currentSection.replace(':', ''),
      content: currentContent.join('\n'),
      type: currentContent.some(c => listItemPattern.test(c)) ? 'list' : 'text'
    });
  }

  // Calculate enhanced statistics
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

  // Enhanced type detection
  let type: ParsedReport['type'] = 'summary';
  if (patients.length > 3) type = 'patient_roster';
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
