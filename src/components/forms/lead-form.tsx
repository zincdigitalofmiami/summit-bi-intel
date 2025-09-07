'use client';

import { useState } from 'react';
import type { Lead } from '@/types/types';
import { Form, FormField, FormActions } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectOption } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading';
import { leadSchema, validateFormData } from '@/lib/validation';

interface LeadFormData extends Partial<Lead> {
  projectType?: string;
  budget?: string;
  timeline?: string;
  location?: string;
}

interface LeadFormProps {
  onSubmit: (lead: LeadFormData) => void;
  onCancel: () => void;
  initialData?: LeadFormData;
  isLoading?: boolean;
}

export function LeadForm({ onSubmit, onCancel, initialData, isLoading }: LeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: initialData?.name || '',
    contactEmail: initialData?.contactEmail || '',
    contactPhone: initialData?.contactPhone || '',
    companyName: initialData?.companyName || '',
    source: initialData?.source || 'website',
    status: initialData?.status || 'new',
    projectType: initialData?.projectType || '',
    budget: initialData?.budget || '',
    timeline: initialData?.timeline || '',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    ...initialData
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const validation = validateFormData(leadSchema, formData);
    
    if (validation.success) {
      setErrors({});
      return true;
    } else {
      setErrors(validation.errors || {});
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({
        ...formData,
        createdAt: initialData?.createdAt || new Date(),
      });
    }
  };

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Name" required error={errors.name}>
          <Input
            value={formData.name || ''}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="John Smith"
          />
        </FormField>

        <FormField label="Email" required error={errors.contactEmail}>
          <Input
            type="email"
            value={formData.contactEmail || ''}
            onChange={(e) => updateField('contactEmail', e.target.value)}
            placeholder="john@example.com"
          />
        </FormField>

        <FormField label="Phone" required error={errors.contactPhone}>
          <Input
            type="tel"
            value={formData.contactPhone || ''}
            onChange={(e) => updateField('contactPhone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </FormField>

        <FormField label="Company" error={errors.companyName}>
          <Input
            value={formData.companyName || ''}
            onChange={(e) => updateField('companyName', e.target.value)}
            placeholder="Company Name"
          />
        </FormField>

        <FormField label="Project Type" required error={errors.projectType}>
          <Select
            value={formData.projectType || ''}
            onValueChange={(value) => updateField('projectType', value)}
            placeholder="Select project type"
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

        <FormField label="Lead Source" error={errors.source}>
          <Select
            value={formData.source || 'website'}
            onValueChange={(value) => updateField('source', value)}
          >
            <SelectOption value="website">Website</SelectOption>
            <SelectOption value="referral">Referral</SelectOption>
            <SelectOption value="google">Google Search</SelectOption>
            <SelectOption value="facebook">Facebook</SelectOption>
            <SelectOption value="nextdoor">Nextdoor</SelectOption>
            <SelectOption value="yard-sign">Yard Sign</SelectOption>
            <SelectOption value="repeat-customer">Repeat Customer</SelectOption>
            <SelectOption value="trade-show">Trade Show</SelectOption>
            <SelectOption value="other">Other</SelectOption>
          </Select>
        </FormField>

        <FormField label="Budget Range" error={errors.budget}>
          <Select
            value={formData.budget || ''}
            onValueChange={(value) => updateField('budget', value)}
            placeholder="Select budget range"
          >
            <SelectOption value="under-10k">Under $10,000</SelectOption>
            <SelectOption value="10k-25k">$10,000 - $25,000</SelectOption>
            <SelectOption value="25k-50k">$25,000 - $50,000</SelectOption>
            <SelectOption value="50k-100k">$50,000 - $100,000</SelectOption>
            <SelectOption value="100k-200k">$100,000 - $200,000</SelectOption>
            <SelectOption value="over-200k">Over $200,000</SelectOption>
            <SelectOption value="unknown">Not specified</SelectOption>
          </Select>
        </FormField>

        <FormField label="Timeline" error={errors.timeline}>
          <Select
            value={formData.timeline || ''}
            onValueChange={(value) => updateField('timeline', value)}
            placeholder="When do you need this completed?"
          >
            <SelectOption value="asap">As soon as possible</SelectOption>
            <SelectOption value="1-month">Within 1 month</SelectOption>
            <SelectOption value="2-3-months">2-3 months</SelectOption>
            <SelectOption value="6-months">Within 6 months</SelectOption>
            <SelectOption value="next-year">Next year</SelectOption>
            <SelectOption value="just-planning">Just planning</SelectOption>
          </Select>
        </FormField>
      </div>

      <FormField label="Location" error={errors.location}>
        <Input
          value={formData.location || ''}
          onChange={(e) => updateField('location', e.target.value)}
          placeholder="Panama City, FL or specific address"
        />
      </FormField>

      <FormField label="Project Details" error={errors.notes}>
        <Textarea
          value={formData.notes || ''}
          onChange={(e) => updateField('notes', e.target.value)}
          placeholder="Tell us about your project needs, any specific requirements, or additional details..."
          rows={4}
        />
      </FormField>

      <FormActions>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <LoadingSpinner size="sm" className="mr-2" />}
          {isLoading ? 'Saving...' : initialData?.id ? 'Update Lead' : 'Create Lead'}
        </Button>
      </FormActions>
    </Form>
  );
}
