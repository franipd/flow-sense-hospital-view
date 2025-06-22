
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
  console.log('🔍 Report Parser - Raw content length:', content.length);
  console.log('🔍 Report Parser - Content preview:', content.substring(0, 500));
  
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

  // Enhanced patterns for better statistics extraction
  const totalPatientsPatterns = [
    /(?:total|current)[\s\w]*patients?[\s:]*(\d+)/i,
    /(\d+)[\s\w]*total[\s\w]*patients?/i,
    /hospital[\s\w]*census[\s:]*(\d+)/i,
    /(\d+)[\s\w]*active[\s\w]*patients?/i,
    /patients?[\s\w]*count[\s:]*(\d+)/i,
    /census[\s:]*(\d+)/i
  ];

  const departmentPatterns = [
    /(\w+)[\s:]+(\d+)\s+patients?/i,
    /(\d+)\s+patients?\s+in\s+(\w+)/i,
    /department[\s:]+(\w+)[\s:]+(\d+)/i,
    /(\w+)\s+department[\s:]+(\d+)/i
  ];

  // Enhanced patterns for better patient data extraction
  const patientBlockPattern = /(?:patient|mrn|name)[\s:]+/i;
  const tableRowPattern = /\|.*\|/; // Table format detection
  const listItemPattern = /^[-•*]\s+/;
  
  let currentPatient: Partial<PatientData> = {};
  let inPatientBlock = false;
  let tableHeaders: string[] = [];
  let isTableData = false;
  
  console.log('🔍 Report Parser - Processing', lines.length, 'lines');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Extract total patients with enhanced patterns
    for (const pattern of totalPatientsPatterns) {
      const match = line.match(pattern);
      if (match) {
        const count = parseInt(match[1]);
        stats.totalPatients = Math.max(stats.totalPatients, count);
        console.log('📊 Found total patients:', count, 'from line:', line);
        break;
      }
    }

    // Extract department information
    for (const pattern of departmentPatterns) {
      const match = line.match(pattern);
      if (match) {
        const [, first, second] = match;
        if (isNaN(parseInt(first))) {
          // Department name first, count second
          stats.byDepartment[first] = parseInt(second);
          console.log('🏥 Found department:', first, 'with', second, 'patients');
        } else {
          // Count first, department second  
          stats.byDepartment[second] = parseInt(first);
          console.log('🏥 Found department:', second, 'with', first, 'patients');
        }
      }
    }
    
    // Detect table headers with better parsing
    if (tableRowPattern.test(line) && (line.toLowerCase().includes('mrn') || line.toLowerCase().includes('patient'))) {
      tableHeaders = line.split('|').map(h => h.trim()).filter(h => h);
      isTableData = true;
      console.log('📋 Found table headers:', tableHeaders);
      continue;
    }
    
    // Parse table rows with enhanced extraction
    if (isTableData && tableRowPattern.test(line) && !line.includes('---') && !line.toLowerCase().includes('mrn')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      if (cells.length >= 4) {
        const patient: Partial<PatientData> = {};
        
        // Map table columns to patient properties with better matching
        cells.forEach((cell, index) => {
          const header = tableHeaders[index]?.toLowerCase() || '';
          if (header.includes('mrn') || (index === 0 && !patient.mrn)) {
            patient.mrn = cell;
          } else if (header.includes('name') || header.includes('patient') || (index === 1 && !patient.name)) {
            patient.name = cell;
          } else if (header.includes('age') || (index === 2 && /^\d+$/.test(cell))) {
            patient.age = parseInt(cell) || null;
          } else if (header.includes('location') || header.includes('room') || header.includes('department')) {
            patient.location = cell;
          } else if (header.includes('status')) {
            patient.status = cell;
          } else if (header.includes('bed')) {
            patient.bed = cell;
          } else if (header.includes('priority')) {
            patient.priority = cell;
          }
        });
        
        // Fill in missing data with defaults
        if (!patient.location && cells.length > 3) patient.location = cells[3];
        if (!patient.status && cells.length > 4) patient.status = cells[4];
        if (!patient.bed && cells.length > 5) patient.bed = cells[5];
        if (!patient.priority && cells.length > 6) patient.priority = cells[6];
        
        if (patient.mrn && patient.name) {
          patients.push(patient as PatientData);
          console.log('👤 Extracted patient:', patient.name, 'from table row');
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
      
      // Enhanced patient data extraction from text blocks
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
            console.log('👤 Extracted patient from text:', currentPatient.name);
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
    }
  }
  
  // Save the last patient and section
  if (currentPatient.mrn && currentPatient.name) {
    patients.push(currentPatient as PatientData);
    console.log('👤 Extracted final patient:', currentPatient.name);
  }
  
  if (currentSection && currentContent.length > 0) {
    sections.push({
      title: currentSection.replace(':', ''),
      content: currentContent.join('\n'),
      type: currentContent.some(c => listItemPattern.test(c)) ? 'list' : 'text'
    });
  }

  // Calculate enhanced statistics from extracted patients
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

  console.log('📊 Final statistics:', {
    totalPatients: stats.totalPatients,
    departmentCount: Object.keys(stats.byDepartment).length,
    extractedPatients: patients.length,
    sections: sections.length
  });

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
