
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { HealthcareContext, PatientData, EventData } from './types.ts';

export class DataService {
  private supabase;

  constructor() {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async fetchPatients() {
    console.log('Fetching real patient data from Supabase...');
    
    const { data: patients, error } = await this.supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching patients:', error);
      return [];
    }

    return patients || [];
  }

  async fetchPatientEvents() {
    const { data: patientEvents, error } = await this.supabase
      .from('patient_events')
      .select(`
        *,
        patients!inner(mrn, first_name, last_name, current_location, current_status)
      `)
      .order('event_timestamp', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Error fetching patient events:', error);
      return [];
    }

    return patientEvents || [];
  }

  async fetchStaff() {
    const { data: staff, error } = await this.supabase
      .from('staff')
      .select('*')
      .eq('active', true);

    if (error) {
      console.error('Error fetching staff:', error);
      return [];
    }

    return staff || [];
  }

  async fetchResources() {
    const { data: resources, error } = await this.supabase
      .from('resources')
      .select('*');

    if (error) {
      console.error('Error fetching resources:', error);
      return [];
    }

    return resources || [];
  }

  filterPatientsByDepartment(patients: any[], message: string) {
    const messageLower = message.toLowerCase();
    
    if (messageLower.includes('icu')) {
      return patients.filter(p => 
        p.current_location?.toLowerCase().includes('icu') ||
        p.current_location?.toLowerCase().includes('intensive')
      );
    } else if (messageLower.includes('emergency') || messageLower.includes('ed')) {
      return patients.filter(p => 
        p.current_location?.toLowerCase().includes('emergency') ||
        p.current_location?.toLowerCase().includes('ed')
      );
    } else if (messageLower.includes('surgery') || messageLower.includes('surgical')) {
      return patients.filter(p => 
        p.current_location?.toLowerCase().includes('surgery') ||
        p.current_location?.toLowerCase().includes('surgical') ||
        p.current_location?.toLowerCase().includes('or')
      );
    }

    return patients;
  }
}
