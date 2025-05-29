
import { supabase } from "@/integrations/supabase/client";

// Patient API functions
export const patientApi = {
  async getAll(limit = 50) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },

  async create(patient: any) {
    const { data, error } = await supabase
      .from('patients')
      .insert(patient)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: any) {
    const { data, error } = await supabase
      .from('patients')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Patient Events API
export const patientEventsApi = {
  async logEvent(event: any) {
    const { data, error } = await supabase
      .from('patient_events')
      .insert(event)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getPatientTimeline(patientId: string) {
    const { data, error } = await supabase
      .from('patient_events')
      .select('*')
      .eq('patient_id', patientId)
      .order('event_timestamp', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getRecentEvents(limit = 100) {
    const { data, error } = await supabase
      .from('patient_events')
      .select(`
        *,
        patients!inner(mrn, first_name, last_name)
      `)
      .order('event_timestamp', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data;
  }
};

// Staff API
export const staffApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('active', true)
      .order('last_name', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async getByDepartment(department: string) {
    const { data, error } = await supabase
      .from('staff')
      .select('*')
      .eq('department', department)
      .eq('active', true);
    
    if (error) throw error;
    return data;
  }
};

// Resources API
export const resourcesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('department', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async updateUtilization(id: string, utilization: number) {
    const { data, error } = await supabase
      .from('resources')
      .update({ current_utilization: utilization })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};

// Analytics API using database functions
export const analyticsApi = {
  async getPatientJourney(patientId: string) {
    const { data, error } = await supabase
      .rpc('get_patient_journey', { patient_uuid: patientId });
    
    if (error) throw error;
    return data;
  },

  async getDepartmentMetrics(department: string) {
    const { data, error } = await supabase
      .rpc('calculate_department_metrics', { dept_name: department });
    
    if (error) throw error;
    return data;
  }
};

// CSV Import API
export const csvImportApi = {
  async importData(tableName: string, csvData: any) {
    const { data, error } = await supabase
      .rpc('import_csv_data', { 
        target_table: tableName, 
        csv_data: csvData 
      });
    
    if (error) throw error;
    return data;
  },

  async getStagingData(batchId: string) {
    const { data, error } = await supabase
      .from('csv_import_staging')
      .select('*')
      .eq('import_batch_id', batchId);
    
    if (error) throw error;
    return data;
  },

  async processStagedData(batchId: string) {
    const { data, error } = await supabase
      .rpc('process_staged_data', { 
        batch_id_param: batchId 
      });
    
    if (error) throw error;
    return data;
  },

  async getStagingSummary(batchId: string) {
    const { data, error } = await supabase
      .rpc('get_staging_summary', { 
        batch_id_param: batchId 
      });
    
    if (error) throw error;
    return data;
  }
};
