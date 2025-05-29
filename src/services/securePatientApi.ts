
import { supabase } from '@/integrations/supabase/client';
import type { Patient } from '@/types/database';
import type { Json } from '@/integrations/supabase/types';

interface CreatePatientData {
  first_name: string;
  last_name: string;
  mrn: string;
  date_of_birth: string; // Make this required
  gender?: string;
  current_location?: string;
  current_status?: string;
  assigned_bed?: string;
  triage_priority?: number;
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
  };
}

// Helper function to safely cast Json to Patient contact_info structure
const castContactInfo = (contactInfo: Json): Patient['contact_info'] => {
  if (!contactInfo || typeof contactInfo !== 'object' || Array.isArray(contactInfo)) {
    return null;
  }
  return contactInfo as Patient['contact_info'];
};

export const securePatientApi = {
  async getAll(): Promise<Patient[]> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching patients:', error);
      throw new Error('Failed to fetch patients');
    }

    // Type cast the contact_info from Json to our expected structure
    return (data || []).map(patient => ({
      ...patient,
      contact_info: castContactInfo(patient.contact_info)
    }));
  },

  async getById(id: string): Promise<Patient | null> {
    const { data, error } = await supabase
      .from('patients')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching patient:', error);
      throw new Error('Failed to fetch patient');
    }

    return {
      ...data,
      contact_info: castContactInfo(data.contact_info)
    };
  },

  async create(patientData: CreatePatientData): Promise<Patient> {
    // Ensure required fields are present
    if (!patientData.date_of_birth) {
      throw new Error('Date of birth is required');
    }

    const { data, error } = await supabase
      .from('patients')
      .insert({
        ...patientData,
        contact_info: patientData.contact_info as Json,
        admission_datetime: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating patient:', error);
      throw new Error('Failed to create patient');
    }

    return {
      ...data,
      contact_info: castContactInfo(data.contact_info)
    };
  },

  async update(id: string, patientData: Partial<CreatePatientData>): Promise<Patient> {
    const { data, error } = await supabase
      .from('patients')
      .update({
        ...patientData,
        contact_info: patientData.contact_info as Json,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating patient:', error);
      throw new Error('Failed to update patient');
    }

    return {
      ...data,
      contact_info: castContactInfo(data.contact_info)
    };
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('patients')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting patient:', error);
      throw new Error('Failed to delete patient');
    }
  }
};
