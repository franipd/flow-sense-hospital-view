
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import type { PatientEvent, Resource } from '@/types/database';

export const useRealtimePatientEvents = () => {
  const [events, setEvents] = useState<PatientEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const loadEvents = async () => {
      const { data } = await supabase
        .from('patient_events')
        .select(`
          *,
          patients!inner(mrn, first_name, last_name)
        `)
        .order('event_timestamp', { ascending: false })
        .limit(50);
      
      if (data) {
        setEvents(data as PatientEvent[]);
      }
      setLoading(false);
    };

    loadEvents();

    // Real-time subscription
    const subscription = supabase
      .channel('patient_events_channel')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'patient_events'
      }, (payload) => {
        console.log('Real-time patient event update:', payload);
        
        if (payload.eventType === 'INSERT') {
          setEvents(prev => [payload.new as PatientEvent, ...prev.slice(0, 49)]);
        } else if (payload.eventType === 'UPDATE') {
          setEvents(prev => prev.map(event => 
            event.id === payload.new.id ? { ...event, ...payload.new } as PatientEvent : event
          ));
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { events, loading };
};

export const useRealtimeResources = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    const loadResources = async () => {
      const { data } = await supabase
        .from('resources')
        .select('*')
        .order('department');
      
      if (data) {
        setResources(data as Resource[]);
      }
      setLoading(false);
    };

    loadResources();

    // Real-time subscription
    const subscription = supabase
      .channel('resources_channel')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'resources'
      }, (payload) => {
        console.log('Real-time resource update:', payload);
        
        setResources(prev => prev.map(resource => 
          resource.id === payload.new.id ? { ...resource, ...payload.new } as Resource : resource
        ));
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { resources, loading };
};
