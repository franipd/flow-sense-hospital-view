
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AppRole } from '@/types/auth';

export const useUserRole = () => {
  const [role, setRole] = useState<AppRole | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const fetchedUserIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  useEffect(() => {
    console.log('useUserRole effect triggered', { 
      userId: user?.id, 
      fetchedUserId: fetchedUserIdRef.current,
      isInitialized: isInitializedRef.current 
    });

    const fetchUserRole = async () => {
      // If no user, clear everything and stop loading
      if (!user) {
        console.log('No user, clearing role data');
        setRole(null);
        setDepartment(null);
        setLoading(false);
        fetchedUserIdRef.current = null;
        isInitializedRef.current = true;
        return;
      }

      // If we already fetched for this user, don't fetch again
      if (fetchedUserIdRef.current === user.id && isInitializedRef.current) {
        console.log('Already fetched for this user, skipping');
        setLoading(false);
        return;
      }

      // Mark that we're fetching for this user
      fetchedUserIdRef.current = user.id;
      setLoading(true);

      try {
        console.log('Fetching user role for:', user.id);
        const { data, error } = await supabase
          .from('user_roles')
          .select('role, department')
          .eq('user_id', user.id)
          .single();

        if (error) {
          if (error.code !== 'PGRST116') {
            console.error('Error fetching user role:', error);
          } else {
            console.log('No role found for user');
          }
          setRole(null);
          setDepartment(null);
        } else {
          console.log('User role fetched:', data);
          setRole(data.role as AppRole);
          setDepartment(data.department);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
        setDepartment(null);
      } finally {
        setLoading(false);
        isInitializedRef.current = true;
      }
    };

    fetchUserRole();
  }, [user?.id]); // Keep dependency on user?.id but use refs to prevent unnecessary fetches

  // Reset when user changes
  useEffect(() => {
    if (!user) {
      fetchedUserIdRef.current = null;
      isInitializedRef.current = false;
    }
  }, [user]);

  return { role, department, loading };
};
