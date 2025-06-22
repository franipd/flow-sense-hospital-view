
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Patient, Resource, Staff } from '@/types/database';

// Define a local interface that matches Supabase's structure
interface SupabasePatientEvent {
  id: string;
  patient_id: string | null;
  event_type: string;
  event_timestamp: string;
  department: string | null;
  staff_id: string | null;
  duration_minutes: number | null;
  event_data: any;
  created_at: string | null;
}

// Our app's PatientEvent interface
interface PatientEvent {
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

interface HealthcareSummary {
  totalPatients: number;
  criticalPatients: number;
  departmentBreakdown: Record<string, number>;
  triagePriorities: Record<string, number>;
  resourceUtilization: Record<string, number>;
  staffByDepartment: Record<string, number>;
  recentActivity: PatientEvent[];
  loading: boolean;
  error: string | null;
}

export const useHealthcareContext = () => {
  const [summary, setSummary] = useState<HealthcareSummary>({
    totalPatients: 0,
    criticalPatients: 0,
    departmentBreakdown: {},
    triagePriorities: {},
    resourceUtilization: {},
    staffByDepartment: {},
    recentActivity: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchHealthcareData = async () => {
      try {
        setSummary(prev => ({ ...prev, loading: true, error: null }));

        // Fetch all healthcare data
        const [patientsResult, resourcesResult, staffResult, eventsResult] = await Promise.all([
          supabase.from('patients').select('*'),
          supabase.from('resources').select('*'),
          supabase.from('staff').select('*').eq('active', true),
          supabase.from('patient_events').select('*').order('event_timestamp', { ascending: false }).limit(10)
        ]);

        const patients = patientsResult.data || [];
        const resources = resourcesResult.data || [];
        const staff = staffResult.data || [];
        const rawEvents = eventsResult.data as SupabasePatientEvent[] || [];

        // Convert Supabase events to our PatientEvent interface
        const events: PatientEvent[] = rawEvents.map(event => ({
          id: event.id,
          patient_id: event.patient_id || undefined,
          event_type: event.event_type,
          event_timestamp: event.event_timestamp,
          department: event.department || undefined,
          staff_id: event.staff_id || undefined,
          duration_minutes: event.duration_minutes || undefined,
          event_data: event.event_data ? {
            ...event.event_data,
            priority: event.event_data.priority as 'high' | 'medium' | 'low' | undefined,
            acuity: event.event_data.acuity as 'critical' | 'standard' | undefined
          } : undefined,
          created_at: event.created_at || undefined
        }));

        // Calculate summaries
        const totalPatients = patients.length;
        const criticalPatients = patients.filter(p => p.triage_priority && p.triage_priority <= 2).length;

        // Department breakdown
        const departmentBreakdown: Record<string, number> = {};
        patients.forEach(patient => {
          const dept = patient.current_location || 'Unassigned';
          departmentBreakdown[dept] = (departmentBreakdown[dept] || 0) + 1;
        });

        // Triage priorities
        const triagePriorities: Record<string, number> = {};
        patients.forEach(patient => {
          const priority = patient.triage_priority?.toString() || 'Unassigned';
          triagePriorities[priority] = (triagePriorities[priority] || 0) + 1;
        });

        // Resource utilization
        const resourceUtilization: Record<string, number> = {};
        resources.forEach(resource => {
          const dept = resource.department || 'General';
          const utilization = resource.current_utilization || 0;
          resourceUtilization[dept] = (resourceUtilization[dept] || 0) + utilization;
        });

        // Staff by department
        const staffByDepartment: Record<string, number> = {};
        staff.forEach(member => {
          const dept = member.department || 'General';
          staffByDepartment[dept] = (staffByDepartment[dept] || 0) + 1;
        });

        setSummary({
          totalPatients,
          criticalPatients,
          departmentBreakdown,
          triagePriorities,
          resourceUtilization,
          staffByDepartment,
          recentActivity: events,
          loading: false,
          error: null
        });

      } catch (error) {
        console.error('Error fetching healthcare context:', error);
        setSummary(prev => ({
          ...prev,
          loading: false,
          error: error instanceof Error ? error.message : 'Failed to fetch healthcare data'
        }));
      }
    };

    fetchHealthcareData();

    // Set up real-time subscription for updates
    const subscription = supabase
      .channel('healthcare_context')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patients'
      }, () => {
        fetchHealthcareData();
      })
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patient_events'
      }, () => {
        fetchHealthcareData();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return summary;
};
