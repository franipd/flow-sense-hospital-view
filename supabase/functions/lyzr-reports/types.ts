
export interface HealthcareContext {
  current_datetime: string;
  total_patients: number;
  relevant_patients: PatientData[];
  recent_events: EventData[];
  staff_summary: StaffSummary;
  resources_summary: ResourcesSummary;
}

export interface PatientData {
  mrn: string;
  name: string;
  location: string;
  status: string;
  admission_date: string | null;
  triage_priority: string | null;
  assigned_bed: string | null;
  age: number | null;
}

export interface EventData {
  patient_mrn: string;
  patient_name: string;
  event_type: string;
  timestamp: string;
  department: string | null;
  duration: number | null;
}

export interface StaffSummary {
  total_active_staff: number;
  by_department: Record<string, number>;
}

export interface ResourcesSummary {
  total_resources: number;
  by_type: Record<string, number>;
  utilization: ResourceUtilization[];
}

export interface ResourceUtilization {
  name: string;
  type: string;
  capacity: number | null;
  current_utilization: number | null;
  status: string | null;
}
