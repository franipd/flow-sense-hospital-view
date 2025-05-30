
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { securePatientApi } from '@/services/securePatientApi';
import { toast } from '@/components/ui/use-toast';
import type { Patient } from '@/types/database';

const patientFormSchema = z.object({
  mrn: z.string().min(1, 'MRN is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  date_of_birth: z.string().min(1, 'Date of birth is required'),
  gender: z.string().optional(),
  current_status: z.string().optional(),
  triage_priority: z.number().min(1).max(5).optional(),
  current_location: z.string().optional(),
  assigned_bed: z.string().optional(),
  insurance_type: z.string().optional(),
  contact_phone: z.string().optional(),
  contact_street: z.string().optional(),
  contact_city: z.string().optional(),
  contact_state: z.string().optional(),
  contact_zip: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
});

type PatientFormData = z.infer<typeof patientFormSchema>;

interface PatientFormProps {
  patient?: Patient | null;
  onSave: (patient: Patient) => void;
  onCancel: () => void;
}

export const PatientForm = ({ patient, onSave, onCancel }: PatientFormProps) => {
  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      mrn: patient?.mrn || '',
      first_name: patient?.first_name || '',
      last_name: patient?.last_name || '',
      date_of_birth: patient?.date_of_birth || '',
      gender: patient?.gender || '',
      current_status: patient?.current_status || '',
      triage_priority: patient?.triage_priority || undefined,
      current_location: patient?.current_location || '',
      assigned_bed: patient?.assigned_bed || '',
      insurance_type: patient?.insurance_type || '',
      contact_phone: patient?.contact_info?.phone || '',
      contact_street: patient?.contact_info?.address?.street || '',
      contact_city: patient?.contact_info?.address?.city || '',
      contact_state: patient?.contact_info?.address?.state || '',
      contact_zip: patient?.contact_info?.address?.zip || '',
      emergency_contact_name: patient?.contact_info?.emergency_contact?.name || '',
      emergency_contact_phone: patient?.contact_info?.emergency_contact?.phone || '',
      emergency_contact_relationship: patient?.contact_info?.emergency_contact?.relationship || '',
    },
  });

  const onSubmit = async (data: PatientFormData) => {
    try {
      const patientData = {
        mrn: data.mrn,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        gender: data.gender,
        current_status: data.current_status,
        triage_priority: data.triage_priority,
        current_location: data.current_location,
        assigned_bed: data.assigned_bed,
        insurance_type: data.insurance_type,
        contact_info: {
          phone: data.contact_phone,
          address: {
            street: data.contact_street,
            city: data.contact_city,
            state: data.contact_state,
            zip: data.contact_zip,
          },
          emergency_contact: {
            name: data.emergency_contact_name,
            phone: data.emergency_contact_phone,
            relationship: data.emergency_contact_relationship,
          },
        },
      };

      let savedPatient: Patient;
      if (patient?.id) {
        savedPatient = await securePatientApi.update(patient.id, patientData);
        toast({
          title: "Patient Updated",
          description: "Patient information has been successfully updated.",
        });
      } else {
        savedPatient = await securePatientApi.create(patientData);
        toast({
          title: "Patient Created",
          description: "New patient has been successfully added.",
        });
      }

      onSave(savedPatient);
    } catch (error) {
      console.error('Error saving patient:', error);
      toast({
        title: "Error",
        description: "Failed to save patient information. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="mrn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>MRN *</FormLabel>
                <FormControl>
                  <Input placeholder="Medical Record Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name *</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date_of_birth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of Birth *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="current_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="Urgent">Urgent</SelectItem>
                    <SelectItem value="Stable">Stable</SelectItem>
                    <SelectItem value="Waiting">Waiting</SelectItem>
                    <SelectItem value="In Treatment">In Treatment</SelectItem>
                    <SelectItem value="Discharge Ready">Discharge Ready</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="triage_priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Triage Priority</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Level 1 - Resuscitation</SelectItem>
                    <SelectItem value="2">Level 2 - Emergent</SelectItem>
                    <SelectItem value="3">Level 3 - Urgent</SelectItem>
                    <SelectItem value="4">Level 4 - Less Urgent</SelectItem>
                    <SelectItem value="5">Level 5 - Non-Urgent</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="current_location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ICU, Emergency Department" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assigned_bed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigned Bed</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., ICU-101, ED-Bay-3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="insurance_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Insurance Type</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Medicare, Private, Medicaid" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contact_zip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ZIP Code</FormLabel>
                  <FormControl>
                    <Input placeholder="ZIP code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Emergency Contact</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="emergency_contact_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Emergency contact name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergency_contact_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Emergency contact phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="emergency_contact_relationship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Relationship</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Spouse, Parent, Child" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {patient?.id ? 'Update Patient' : 'Add Patient'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
