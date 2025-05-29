
import { supabase } from "@/integrations/supabase/client";
import { PatientSchema } from '@/utils/validation';
import type { Patient } from '@/types/database';

export const securePatientApi = {
  async getAll(limit = 50) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        console.error('Error fetching patients:', error);
        throw new Error('Failed to fetch patients. Please check your permissions.');
      }
      return data;
    } catch (error) {
      console.error('Secure patient API error:', error);
      throw error;
    }
  },

  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error('Error fetching patient:', error);
        throw new Error('Failed to fetch patient. Please check your permissions.');
      }
      return data;
    } catch (error) {
      console.error('Secure patient API error:', error);
      throw error;
    }
  },

  async create(patient: Omit<Patient, 'id' | 'created_at' | 'updated_at'>) {
    try {
      // Validate input
      const validatedData = PatientSchema.parse(patient);
      
      const { data, error } = await supabase
        .from('patients')
        .insert(validatedData)
        .select()
        .single();
      
      if (error) {
        console.error('Error creating patient:', error);
        throw new Error('Failed to create patient. Please check your permissions.');
      }

      // Log the action
      await supabase.rpc('log_audit_event', {
        p_action: 'PATIENT_CREATED',
        p_table_name: 'patients',
        p_record_id: data.id,
        p_new_values: data
      });

      return data;
    } catch (error) {
      console.error('Secure patient API error:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Patient>) {
    try {
      // Get old values for audit
      const { data: oldData } = await supabase
        .from('patients')
        .select('*')
        .eq('id', id)
        .single();

      const { data, error } = await supabase
        .from('patients')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating patient:', error);
        throw new Error('Failed to update patient. Please check your permissions.');
      }

      // Log the action
      await supabase.rpc('log_audit_event', {
        p_action: 'PATIENT_UPDATED',
        p_table_name: 'patients',
        p_record_id: id,
        p_old_values: oldData,
        p_new_values: data
      });

      return data;
    } catch (error) {
      console.error('Secure patient API error:', error);
      throw error;
    }
  }
};
