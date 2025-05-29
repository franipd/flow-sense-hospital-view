
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import type { AppRole } from '@/types/auth';

interface RoleBasedAccessProps {
  allowedRoles: AppRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const RoleBasedAccess = ({ allowedRoles, children, fallback }: RoleBasedAccessProps) => {
  const { role, loading } = useUserRole();

  if (loading) {
    return <div className="animate-pulse bg-white/10 h-8 rounded"></div>;
  }

  if (!role || !allowedRoles.includes(role)) {
    return fallback || (
      <div className="text-center p-4 bg-red-500/20 text-red-300 rounded-lg">
        <p>Access denied. Required role: {allowedRoles.join(', ')}</p>
      </div>
    );
  }

  return <>{children}</>;
};
