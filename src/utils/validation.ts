
import { z } from 'zod';

// Patient validation schema
export const PatientSchema = z.object({
  mrn: z.string().min(1, 'MRN is required').max(50),
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name: z.string().min(1, 'Last name is required').max(100),
  date_of_birth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  gender: z.string().optional(),
  insurance_type: z.string().optional(),
  current_location: z.string().max(100).optional(),
  current_status: z.string().max(50).optional(),
  assigned_bed: z.string().max(50).optional(),
  triage_priority: z.number().min(1).max(5).optional(),
  contact_info: z.object({
    phone: z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zip: z.string().optional(),
    }).optional(),
    emergency_contact: z.object({
      name: z.string().optional(),
      phone: z.string().optional(),
      relationship: z.string().optional(),
    }).optional(),
  }).optional(),
});

// Patient Event validation schema
export const PatientEventSchema = z.object({
  patient_id: z.string().uuid('Invalid patient ID'),
  event_type: z.string().min(1, 'Event type is required').max(100),
  event_timestamp: z.string(),
  department: z.string().max(100).optional(),
  staff_id: z.string().uuid('Invalid staff ID').optional(),
  duration_minutes: z.number().min(0).optional(),
  event_data: z.record(z.any()).optional(),
});

// CSV validation
export const validateCSVHeaders = (headers: string[], requiredHeaders: string[]): boolean => {
  return requiredHeaders.every(header => headers.includes(header));
};

export const sanitizeInput = (input: string): string => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
              .replace(/javascript:/gi, '')
              .replace(/on\w+\s*=/gi, '');
};

export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};
