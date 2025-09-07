import { z } from 'zod';

// Lead validation schema
export const leadSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  contactEmail: z.string().email('Invalid email format'),
  contactPhone: z.string().min(10, 'Phone number must be at least 10 digits'),
  companyName: z.string().optional(),
  source: z.string().min(1, 'Lead source is required'),
  status: z.string().min(1, 'Status is required'),
  projectType: z.string().min(1, 'Project type is required'),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadSchema>;

// Project validation schema
export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(200, 'Project name too long'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  status: z.string().min(1, 'Status is required'),
  serviceType: z.string().min(1, 'Service type is required'),
  estimatedBudget: z.string().optional(),
  timeline: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

// Utility function for safe validation
export function validateFormData<T>(schema: z.ZodSchema<T>, data: unknown): {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
} {
  try {
    const result = schema.safeParse(data);
    
    if (result.success) {
      return { success: true, data: result.data };
    } else {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        const field = err.path.join('.');
        errors[field] = err.message;
      });
      return { success: false, errors };
    }
  } catch {
    return { 
      success: false, 
      errors: { general: 'Validation failed. Please check your input.' }
    };
  }
}
