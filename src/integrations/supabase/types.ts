export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          ip_address: unknown
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      csv_import_staging: {
        Row: {
          created_at: string | null
          id: string
          import_batch_id: string | null
          processed: boolean | null
          raw_data: Json
          table_name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          import_batch_id?: string | null
          processed?: boolean | null
          raw_data: Json
          table_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          import_batch_id?: string | null
          processed?: boolean | null
          raw_data?: Json
          table_name?: string
        }
        Relationships: []
      }
      last_run_metadata: {
        Row: {
          agent_name: string
          id: string
          last_run: string
        }
        Insert: {
          agent_name: string
          id?: string
          last_run: string
        }
        Update: {
          agent_name?: string
          id?: string
          last_run?: string
        }
        Relationships: []
      }
      patient_events: {
        Row: {
          created_at: string | null
          department: string | null
          duration_minutes: number | null
          event_data: Json | null
          event_timestamp: string
          event_type: string
          id: string
          patient_id: string | null
          staff_id: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          duration_minutes?: number | null
          event_data?: Json | null
          event_timestamp: string
          event_type: string
          id?: string
          patient_id?: string | null
          staff_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          duration_minutes?: number | null
          event_data?: Json | null
          event_timestamp?: string
          event_type?: string
          id?: string
          patient_id?: string | null
          staff_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patient_events_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          admission_datetime: string | null
          assigned_bed: string | null
          contact_info: Json | null
          created_at: string | null
          current_location: string | null
          current_status: string | null
          date_of_birth: string
          first_name: string
          gender: string | null
          id: string
          insurance_type: string | null
          last_name: string
          mrn: string
          triage_priority: number | null
          updated_at: string | null
        }
        Insert: {
          admission_datetime?: string | null
          assigned_bed?: string | null
          contact_info?: Json | null
          created_at?: string | null
          current_location?: string | null
          current_status?: string | null
          date_of_birth: string
          first_name: string
          gender?: string | null
          id?: string
          insurance_type?: string | null
          last_name: string
          mrn: string
          triage_priority?: number | null
          updated_at?: string | null
        }
        Update: {
          admission_datetime?: string | null
          assigned_bed?: string | null
          contact_info?: Json | null
          created_at?: string | null
          current_location?: string | null
          current_status?: string | null
          date_of_birth?: string
          first_name?: string
          gender?: string | null
          id?: string
          insurance_type?: string | null
          last_name?: string
          mrn?: string
          triage_priority?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      process_definitions: {
        Row: {
          created_at: string | null
          department: string | null
          expected_duration_minutes: number | null
          id: string
          process_name: string
          quality_metrics: Json | null
          standard_steps: Json | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          expected_duration_minutes?: number | null
          id?: string
          process_name: string
          quality_metrics?: Json | null
          standard_steps?: Json | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          expected_duration_minutes?: number | null
          id?: string
          process_name?: string
          quality_metrics?: Json | null
          standard_steps?: Json | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          capacity: number | null
          created_at: string | null
          current_utilization: number | null
          department: string | null
          id: string
          metadata: Json | null
          resource_name: string
          resource_type: string
          status: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          current_utilization?: number | null
          department?: string | null
          id?: string
          metadata?: Json | null
          resource_name: string
          resource_type: string
          status?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          current_utilization?: number | null
          department?: string | null
          id?: string
          metadata?: Json | null
          resource_name?: string
          resource_type?: string
          status?: string | null
        }
        Relationships: []
      }
      staff: {
        Row: {
          active: boolean | null
          created_at: string | null
          department: string | null
          employee_id: string
          first_name: string
          id: string
          last_name: string
          role: string
          shift_pattern: string | null
          skills: Json | null
        }
        Insert: {
          active?: boolean | null
          created_at?: string | null
          department?: string | null
          employee_id: string
          first_name: string
          id?: string
          last_name: string
          role: string
          shift_pattern?: string | null
          skills?: Json | null
        }
        Update: {
          active?: boolean | null
          created_at?: string | null
          department?: string | null
          employee_id?: string
          first_name?: string
          id?: string
          last_name?: string
          role?: string
          shift_pattern?: string | null
          skills?: Json | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          department: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_department_metrics: {
        Args: { dept_name: string }
        Returns: Json
      }
      get_current_user_department: { Args: never; Returns: string }
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      get_patient_journey: { Args: { patient_uuid: string }; Returns: Json }
      get_staging_summary: { Args: { batch_id_param: string }; Returns: Json }
      has_role:
        | {
            Args: { _role: Database["public"]["Enums"]["app_role"] }
            Returns: boolean
          }
        | {
            Args: {
              _role: Database["public"]["Enums"]["app_role"]
              _user_id: string
            }
            Returns: boolean
          }
      import_csv_data: {
        Args: { batch_id?: string; csv_data: Json; target_table: string }
        Returns: string
      }
      log_audit_event: {
        Args: {
          p_action: string
          p_new_values?: Json
          p_old_values?: Json
          p_record_id?: string
          p_table_name: string
        }
        Returns: undefined
      }
      process_staged_data: { Args: { batch_id_param: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "doctor" | "nurse" | "technician" | "receptionist"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "doctor", "nurse", "technician", "receptionist"],
    },
  },
} as const
