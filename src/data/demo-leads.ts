import type { Lead } from '@/types/types';

export const demoLeads: Lead[] = [
  {
    id: 'demo-1',
    name: 'Gulf Coast Marina Project',
    contactPerson: 'Mike Johnson',
    contactEmail: 'mike@gulfcoastmarina.com',
    status: 'qualified',
    source: 'website',
    createdAt: new Date('2024-01-15'),
    contactPhone: '(850) 555-0123',
    companyName: 'Gulf Coast Marina',
    notes: 'Needs 200ft of seawall repair after storm damage. Urgent project due to winter weather concerns.'
  },
  {
    id: 'demo-2',
    name: 'Waterfront Home Dock',
    contactPerson: 'Sarah Williams',
    contactEmail: 'sarah.williams@email.com',
    status: 'new',
    source: 'referral',
    createdAt: new Date('2024-01-18'),
    contactPhone: '(850) 555-0456',
    companyName: '',
    notes: 'New dock construction for waterfront home. Looking for floating dock with electricity hookup.'
  },
  {
    id: 'demo-3',
    name: 'Commercial Seawall',
    contactPerson: 'Robert Chen',
    contactEmail: 'robert@bayviewresort.com',
    status: 'qualified',
    source: 'google',
    createdAt: new Date('2024-01-12'),
    contactPhone: '(850) 555-0789',
    companyName: 'Bayview Resort',
    notes: 'Seawall replacement for resort property. 300ft section needs complete rebuild.'
  }
];
