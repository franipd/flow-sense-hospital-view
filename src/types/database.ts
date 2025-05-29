
export interface Patient {
  id: string;
  mrn: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender?: string;
  insurance_type?: string;
  contact_info?: {
    phone?: string;
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zip?: string;
    };
    emergency_contact?: {
      name?: string;
      phone?: string;
      relationship?: string;
    };
  } | null;
  admission_datetime?: string;
  current_location?: string;
  current_status?: string;
  assigned_bed?: string;
  triage_priority?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PatientEvent {
  id: string;
  patient_id?: string;
  event_type: string;
  event_timestamp: string;
  department?: string;
  staff_id?: string;
  duration_minutes?: number;
  event_data?: {
    priority?: 'high' | 'medium' | 'low';
    acuity?: 'critical' | 'standard';
    [key: string]: any;
  };
  created_at?: string;
  patients?: Patient;
}

export interface Resource {
  id: string;
  resource_type: string;
  resource_name: string;
  department?: string;
  capacity?: number;
  current_utilization?: number;
  status?: string;
  metadata?: any;
  created_at?: string;
}

export interface Staff {
  id: string;
  employee_id: string;
  first_name: string;
  last_name: string;
  role: string;
  department?: string;
  shift_pattern?: string;
  skills?: any;
  active?: boolean;
  created_at?: string;
}
