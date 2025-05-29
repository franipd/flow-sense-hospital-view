
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole } from '@/hooks/useUserRole';
import type { AppRole } from '@/types/auth';

interface SecurityContextType {
  role: AppRole | null;
  department: string | null;
  hasRole: (requiredRole: AppRole) => boolean;
  canAccessDepartment: (targetDepartment: string) => boolean;
  isAdmin: boolean;
  loading: boolean;
}

const SecurityContext = createContext<SecurityContextType>({
  role: null,
  department: null,
  hasRole: () => false,
  canAccessDepartment: () => false,
  isAdmin: false,
  loading: true,
});

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

export const SecurityProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { role, department, loading } = useUserRole();

  const hasRole = (requiredRole: AppRole): boolean => {
    return role === requiredRole;
  };

  const canAccessDepartment = (targetDepartment: string): boolean => {
    if (role === 'admin') return true;
    if (role === 'receptionist') return true;
    return department === targetDepartment;
  };

  const isAdmin = role === 'admin';

  const value: SecurityContextType = {
    role,
    department,
    hasRole,
    canAccessDepartment,
    isAdmin,
    loading: loading || !user,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
};
