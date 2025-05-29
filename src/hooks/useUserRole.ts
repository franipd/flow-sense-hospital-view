
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { AppRole } from '@/types/auth';

export const useUserRole = () => {
  const [role, setRole] = useState<AppRole | null>(null);
  const [department, setDepartment] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      // If no user, clear everything
      if (!user) {
        setRole(null);
        setDepartment(null);
        setLoading(false);
        lastUserIdRef.current = null;
        return;
      }

      // If this is the same user we already fetched, don't fetch again
      if (lastUserIdRef.current === user.id) {
        setLoading(false);
        return;
      }

      // Mark that we're fetching for this user
      lastUserIdRef.current = user.id;
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role, department')
          .eq('user_id', user.id)
          .single();

        if (error) {
          // Only log actual errors, not expected "no data" scenarios
          if (error.code !== 'PGRST116') {
            console.error('Error fetching user role:', error);
          }
          setRole(null);
          setDepartment(null);
        } else {
          setRole(data.role as AppRole);
          setDepartment(data.department);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
        setDepartment(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.id]); // Only depend on user.id, not the entire user object

  return { role, department, loading };
};
