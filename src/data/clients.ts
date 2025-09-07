import type { Client } from '@/types/types';

export const mockClients: Client[] = [
  {
    id: '1',
    name: 'Oceanfront Resort Group',
    contactPerson: 'Sarah Johnson',
    contactEmail: 'sarah.johnson@oceanfront.com',
    contactPhone: '+1 (555) 123-4567',
    address: '123 Ocean Drive, Miami Beach, FL 33139',
    notes: 'High-value client specializing in luxury resort maintenance',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Marina Bay Properties',
    contactPerson: 'Michael Rodriguez',
    contactEmail: 'mrodriguez@marinabay.com',
    contactPhone: '+1 (555) 987-6543',
    address: '456 Bay Street, Fort Lauderdale, FL 33301',
    notes: 'Regular maintenance contracts for marina facilities',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Coastal Development Corp',
    contactPerson: 'Jennifer Chen',
    contactEmail: 'jchen@coastaldev.com',
    contactPhone: '+1 (555) 456-7890',
    address: '789 Coastal Highway, Key Largo, FL 33037',
    notes: 'New construction and renovation projects',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'Paradise Hotels & Resorts',
    contactPerson: 'David Thompson',
    contactEmail: 'dthompson@paradisehotels.com',
    contactPhone: '+1 (555) 321-0987',
    address: '321 Paradise Boulevard, Key West, FL 33040',
    notes: 'Chain of boutique hotels requiring specialized services',
    createdAt: new Date('2024-03-25'),
  },
];
