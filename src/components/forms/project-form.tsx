'use client';

import { useState } from 'react';
import type { Project, Lead } from '@/types/types';
import { Form, FormField, FormActions } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectOption } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface ProjectFormData extends Partial<Project> {
  serviceType?: string;
  estimatedBudget?: string;
  timeline?: string;
  location?: string;
  notes?: string;
}

interface ProjectFormProps {
  onSubmit: (project: ProjectFormData) => void;
  onCancel: () => void;
  initialData?: ProjectFormData;
  fromLead?: Lead;
  isLoading?: boolean;
}

export function ProjectForm({ onSubmit, onCancel, initialData, fromLead, isLoading }: ProjectFormProps) {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: initialData?.name || (fromLead ? `${fromLead.name} - Marine Construction Project` : ''),
    description: initialData?.description || '',
    status: initialData?.status || 'planning',
    serviceType: initialData?.serviceType || '',
    estimatedBudget: initialData?.estimatedBudget || '',
    timeline: initialData?.timeline || '',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Project name is required';
    }

    if (!formData.description?.trim()) {
      newErrors.description = 'Project description is required';
    }

    if (!formData.serviceType?.trim()) {
      newErrors.serviceType = 'Service type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        createdAt: initialData?.createdAt || new Date(),
        startDate: formData.startDate || new Date(),
        expectedEndDate: formData.expectedEndDate || new Date(),
        budget: typeof formData.budget === 'number' ? formData.budget : 0,
      });
    }
  };

  const updateField = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fromLead && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-6">
          <h3 className="font-medium text-blue-900 dark:text-blue-200">Converting Lead to Project</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Lead: {fromLead.name} ({fromLead.contactEmail})
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Project Name" required error={errors.name}>
          <Input
            value={formData.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="Seawall Construction - Smith Property"
          />
        </FormField>

        <FormField label="Service Type" required error={errors.serviceType}>
          <Select
            value={formData.serviceType || ''}
            onValueChange={(value) => updateField('serviceType', value)}
            placeholder="Select service type"
          >
            <SelectOption value="seawall-construction">Seawall Construction</SelectOption>
            <SelectOption value="seawall-repair">Seawall Repair</SelectOption>
            <SelectOption value="dock-construction">Dock Construction</SelectOption>
            <SelectOption value="dock-repair">Dock Repair</SelectOption>
            <SelectOption value="retaining-wall">Retaining Wall</SelectOption>
            <SelectOption value="permitting">Marine Permitting</SelectOption>
            <SelectOption value="other">Other Marine Construction</SelectOption>
          </Select>
        </FormField>

        <FormField label="Project Status" error={errors.status}>
          <Select
            value={formData.status || 'planning'}
            onValueChange={(value) => updateField('status', value)}
          >
            <SelectOption value="planning">Planning</SelectOption>
            <SelectOption value="permit-pending">Permit Pending</SelectOption>
            <SelectOption value="in-progress">In Progress</SelectOption>
            <SelectOption value="on-hold">On Hold</SelectOption>
            <SelectOption value="completed">Completed</SelectOption>
            <SelectOption value="cancelled">Cancelled</SelectOption>
          </Select>
        </FormField>

        <FormField label="Estimated Budget" error={errors.estimatedBudget}>
          <Select
            value={formData.estimatedBudget || ''}
            onValueChange={(value) => updateField('estimatedBudget', value)}
            placeholder="Select budget range"
          >
            <SelectOption value="under-10k">Under $10,000</SelectOption>
            <SelectOption value="10k-25k">$10,000 - $25,000</SelectOption>
            <SelectOption value="25k-50k">$25,000 - $50,000</SelectOption>
            <SelectOption value="50k-100k">$50,000 - $100,000</SelectOption>
            <SelectOption value="100k-200k">$100,000 - $200,000</SelectOption>
            <SelectOption value="over-200k">Over $200,000</SelectOption>
          </Select>
        </FormField>

        <FormField label="Timeline" error={errors.timeline}>
          <Select
            value={formData.timeline || ''}
            onValueChange={(value) => updateField('timeline', value)}
            placeholder="Expected completion timeframe"
          >
            <SelectOption value="1-2-weeks">1-2 weeks</SelectOption>
            <SelectOption value="3-4-weeks">3-4 weeks</SelectOption>
            <SelectOption value="1-2-months">1-2 months</SelectOption>
            <SelectOption value="3-6-months">3-6 months</SelectOption>
            <SelectOption value="6-12-months">6-12 months</SelectOption>
            <SelectOption value="over-1-year">Over 1 year</SelectOption>
          </Select>
        </FormField>

        <FormField label="Location" error={errors.location}>
          <Input
            value={formData.location || ''}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="Project address or area"
          />
        </FormField>
      </div>

      <FormField label="Project Description" required error={errors.description}>
        <Textarea
          value={formData.description || ''}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Detailed description of the marine construction project, materials needed, scope of work..."
          rows={4}
        />
      </FormField>

      <FormField label="Additional Notes" error={errors.notes}>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Special requirements, client preferences, site conditions..."
          rows={3}
        />
      </FormField>

      <FormActions>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Creating...' : initialData?.id ? 'Update Project' : 'Create Project'}
        </Button>
      </FormActions>
    </Form>
  );
}
