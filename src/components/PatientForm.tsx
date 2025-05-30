
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { EnhancedButton, EnhancedInput, EnhancedLabel, EnhancedSeparator } from '@/components/ui/form-2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
    <div className="sm:mx-auto sm:max-w-4xl">
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-foreground">
          {patient?.id ? 'Edit Patient Information' : 'Add New Patient'}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {patient?.id ? 'Update patient details and medical information' : 'Enter patient details to create a new medical record'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Patient Information */}
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="mrn"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="mrn" className="text-sm font-medium text-foreground">
                      Medical Record Number
                      <span className="text-red-500">*</span>
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="mrn"
                        placeholder="MRN" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="first_name" className="text-sm font-medium text-foreground">
                      First Name
                      <span className="text-red-500">*</span>
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="first_name"
                        placeholder="First name" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="last_name" className="text-sm font-medium text-foreground">
                      Last Name
                      <span className="text-red-500">*</span>
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="last_name"
                        placeholder="Last name" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="date_of_birth" className="text-sm font-medium text-foreground">
                      Date of Birth
                      <span className="text-red-500">*</span>
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="date_of_birth"
                        type="date" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel className="text-sm font-medium text-foreground">
                      Gender
                    </EnhancedLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-2">
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
            </div>

            <div className="col-span-full sm:col-span-2">
              <FormField
                control={form.control}
                name="current_status"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel className="text-sm font-medium text-foreground">
                      Status
                    </EnhancedLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="mt-2">
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
            </div>

            <div className="col-span-full sm:col-span-2">
              <FormField
                control={form.control}
                name="triage_priority"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel className="text-sm font-medium text-foreground">
                      Triage Priority
                    </EnhancedLabel>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select priority" />
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
            </div>

            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="current_location"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="current_location" className="text-sm font-medium text-foreground">
                      Current Location
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="current_location"
                        placeholder="e.g., ICU, Emergency Department" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="assigned_bed"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="assigned_bed" className="text-sm font-medium text-foreground">
                      Assigned Bed
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="assigned_bed"
                        placeholder="e.g., ICU-101, ED-Bay-3" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-full sm:col-span-3">
              <FormField
                control={form.control}
                name="insurance_type"
                render={({ field }) => (
                  <FormItem>
                    <EnhancedLabel htmlFor="insurance_type" className="text-sm font-medium text-foreground">
                      Insurance Type
                    </EnhancedLabel>
                    <FormControl>
                      <EnhancedInput 
                        {...field} 
                        id="insurance_type"
                        placeholder="e.g., Medicare, Private, Medicaid" 
                        className="mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <EnhancedSeparator className="my-6" />

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Contact Information</h4>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <FormField
                  control={form.control}
                  name="contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="contact_phone" className="text-sm font-medium text-foreground">
                        Phone Number
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="contact_phone"
                          placeholder="Phone number" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full">
                <FormField
                  control={form.control}
                  name="contact_street"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="contact_street" className="text-sm font-medium text-foreground">
                        Street Address
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="contact_street"
                          placeholder="Street address" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full sm:col-span-2">
                <FormField
                  control={form.control}
                  name="contact_city"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="contact_city" className="text-sm font-medium text-foreground">
                        City
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="contact_city"
                          placeholder="City" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full sm:col-span-2">
                <FormField
                  control={form.control}
                  name="contact_state"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="contact_state" className="text-sm font-medium text-foreground">
                        State
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="contact_state"
                          placeholder="State" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full sm:col-span-2">
                <FormField
                  control={form.control}
                  name="contact_zip"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="contact_zip" className="text-sm font-medium text-foreground">
                        ZIP Code
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="contact_zip"
                          placeholder="ZIP code" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <EnhancedSeparator className="my-6" />

          {/* Emergency Contact */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Emergency Contact</h4>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full sm:col-span-3">
                <FormField
                  control={form.control}
                  name="emergency_contact_name"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="emergency_contact_name" className="text-sm font-medium text-foreground">
                        Emergency Contact Name
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="emergency_contact_name"
                          placeholder="Emergency contact name" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <FormField
                  control={form.control}
                  name="emergency_contact_phone"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="emergency_contact_phone" className="text-sm font-medium text-foreground">
                        Emergency Contact Phone
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="emergency_contact_phone"
                          placeholder="Emergency contact phone" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="col-span-full sm:col-span-3">
                <FormField
                  control={form.control}
                  name="emergency_contact_relationship"
                  render={({ field }) => (
                    <FormItem>
                      <EnhancedLabel htmlFor="emergency_contact_relationship" className="text-sm font-medium text-foreground">
                        Relationship
                      </EnhancedLabel>
                      <FormControl>
                        <EnhancedInput 
                          {...field} 
                          id="emergency_contact_relationship"
                          placeholder="e.g., Spouse, Parent, Child" 
                          className="mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <EnhancedSeparator className="my-6" />

          <div className="flex items-center justify-end space-x-4">
            <EnhancedButton
              type="button"
              variant="outline"
              onClick={onCancel}
              className="whitespace-nowrap"
            >
              Cancel
            </EnhancedButton>
            <EnhancedButton type="submit" className="whitespace-nowrap">
              {patient?.id ? 'Update Patient' : 'Add Patient'}
            </EnhancedButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
