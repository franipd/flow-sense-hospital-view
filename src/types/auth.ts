
export type AppRole = 'admin' | 'doctor' | 'nurse' | 'technician' | 'receptionist';

export interface UserRole {
  id: string;
  user_id: string;
  role: AppRole;
  department?: string;
  created_at: string;
}

export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: any;
  new_values?: any;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
