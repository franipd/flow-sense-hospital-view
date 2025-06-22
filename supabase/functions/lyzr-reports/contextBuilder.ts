
import { DataService } from './dataService.ts';
import { HealthcareContext, PatientData, EventData } from './types.ts';

export class ContextBuilder {
  private dataService: DataService;

  constructor() {
    this.dataService = new DataService();
  }

  async buildHealthcareContext(message: string): Promise<HealthcareContext> {
    // Fetch all data
    const patients = await this.dataService.fetchPatients();
    const patientEvents = await this.dataService.fetchPatientEvents();
    const staff = await this.dataService.fetchStaff();
    const resources = await this.dataService.fetchResources();

    console.log('Fetched real data:', {
      patients_count: patients.length,
      events_count: patientEvents.length,
      staff_count: staff.length,
      resources_count: resources.length
    });

    // Filter patients by department if mentioned in message
    const relevantPatients = this.dataService.filterPatientsByDepartment(patients, message);

    // Transform patient data
    const transformedPatients: PatientData[] = relevantPatients.map(p => ({
      mrn: p.mrn,
      name: `${p.first_name} ${p.last_name}`,
      location: p.current_location,
      status: p.current_status,
      admission_date: p.admission_datetime,
      triage_priority: p.triage_priority,
      assigned_bed: p.assigned_bed,
      age: p.date_of_birth ? Math.floor((new Date().getTime() - new Date(p.date_of_birth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : null
    }));

    // Transform event data
    const transformedEvents: EventData[] = patientEvents.slice(0, 20).map(e => ({
      patient_mrn: e.patients?.mrn || '',
      patient_name: e.patients ? `${e.patients.first_name} ${e.patients.last_name}` : 'Unknown',
      event_type: e.event_type,
      timestamp: e.event_timestamp,
      department: e.department,
      duration: e.duration_minutes
    }));

    return {
      current_datetime: new Date().toISOString(),
      total_patients: patients.length,
      relevant_patients: transformedPatients,
      recent_events: transformedEvents,
      staff_summary: {
        total_active_staff: staff.length,
        by_department: staff.reduce((acc: any, s) => {
          const dept = s.department || 'Unknown';
          acc[dept] = (acc[dept] || 0) + 1;
          return acc;
        }, {})
      },
      resources_summary: {
        total_resources: resources.length,
        by_type: resources.reduce((acc: any, r) => {
          acc[r.resource_type] = (acc[r.resource_type] || 0) + 1;
          return acc;
        }, {}),
        utilization: resources.map(r => ({
          name: r.resource_name,
          type: r.resource_type,
          capacity: r.capacity,
          current_utilization: r.current_utilization,
          status: r.status
        }))
      }
    };
  }
}
