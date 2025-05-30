
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GradientButton } from '@/components/ui/gradient-button';
import { Separator } from '@/components/ui/separator';
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
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center gap-2 mb-6">
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-full border border-border"
          aria-hidden="true"
        >
          <svg
            className="stroke-zinc-800 dark:stroke-zinc-100"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 text-center">
          {patient?.id ? 'Edit Patient Information' : 'Add New Patient'}
        </h3>
        <p className="text-gray-600 text-center text-sm">
          {patient?.id ? 'Update patient details and medical information' : 'Enter patient details to create a new medical record'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full max-w-md">
          {/* Basic Patient Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mrn">Medical Record Number *</Label>
              <FormField
                control={form.control}
                name="mrn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="mrn" placeholder="Enter MRN" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="first_name" placeholder="First name" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="last_name" placeholder="Last name" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_of_birth">Date of Birth *</Label>
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="date_of_birth" type="date" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
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
            </div>
          </div>

          <Separator />

          {/* Medical Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Medical Information</h4>
            
            <div className="space-y-2">
              <Label>Current Status</Label>
              <FormField
                control={form.control}
                name="current_status"
                render={({ field }) => (
                  <FormItem>
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
            </div>

            <div className="space-y-2">
              <Label>Triage Priority</Label>
              <FormField
                control={form.control}
                name="triage_priority"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current_location">Current Location</Label>
                <FormField
                  control={form.control}
                  name="current_location"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="current_location" placeholder="e.g., ICU, ED" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assigned_bed">Assigned Bed</Label>
                <FormField
                  control={form.control}
                  name="assigned_bed"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="assigned_bed" placeholder="e.g., ICU-101" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insurance_type">Insurance Type</Label>
              <FormField
                control={form.control}
                name="insurance_type"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="insurance_type" placeholder="e.g., Medicare, Private" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact Information</h4>
            
            <div className="space-y-2">
              <Label htmlFor="contact_phone">Phone Number</Label>
              <FormField
                control={form.control}
                name="contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="contact_phone" placeholder="Phone number" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact_street">Street Address</Label>
              <FormField
                control={form.control}
                name="contact_street"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="contact_street" placeholder="Street address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_city">City</Label>
                <FormField
                  control={form.control}
                  name="contact_city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="contact_city" placeholder="City" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_state">State</Label>
                <FormField
                  control={form.control}
                  name="contact_state"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="contact_state" placeholder="State" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_zip">ZIP</Label>
                <FormField
                  control={form.control}
                  name="contact_zip"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="contact_zip" placeholder="ZIP" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Emergency Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Emergency Contact</h4>
            
            <div className="space-y-2">
              <Label htmlFor="emergency_contact_name">Contact Name</Label>
              <FormField
                control={form.control}
                name="emergency_contact_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="emergency_contact_name" placeholder="Emergency contact name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
              <FormField
                control={form.control}
                name="emergency_contact_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="emergency_contact_phone" placeholder="Emergency contact phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="emergency_contact_relationship">Relationship</Label>
              <FormField
                control={form.control}
                name="emergency_contact_relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} id="emergency_contact_relationship" placeholder="e.g., Spouse, Parent" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <GradientButton type="submit" className="flex-1">
              {patient?.id ? 'Update Patient' : 'Add Patient'}
            </GradientButton>
          </div>
        </form>
      </Form>
    </div>
  );
};
