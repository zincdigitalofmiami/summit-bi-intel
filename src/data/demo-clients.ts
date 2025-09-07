import type { Client } from '@/types/types';

export const demoClients: Client[] = [
  {
    id: 'client-001',
    name: 'Gulf Coast Marina & Resort',
    contactPerson: 'Sarah Martinez',
    contactEmail: 'sarah.martinez@gulfcoastmarina.com',
    contactPhone: '(850) 555-0123',
    address: '1425 Harbor Drive, Pensacola, FL 32501',
    notes: 'Family-owned marina in operation for 30+ years. Looking to expand to accommodate larger vessels.',
    createdAt: new Date('2024-09-15')
  },
  {
    id: 'client-002',
    name: 'Azure Shores Resort',
    contactPerson: 'Michael Chen',
    contactEmail: 'mchen@azureshores.com',
    contactPhone: '(239) 555-0189',
    address: '850 Beachfront Boulevard, Naples, FL 34102',
    notes: 'Luxury waterfront resort expanding their marine amenities. High-end finishing requirements.',
    createdAt: new Date('2024-11-01')
  },
  {
    id: 'client-003',
    name: 'Thompson Family',
    contactPerson: 'Robert Thompson',
    contactEmail: 'rob.thompson@email.com',
    contactPhone: '(941) 555-0167',
    address: '245 Bayview Terrace, Sarasota, FL 34236',
    notes: 'Recently purchased waterfront property. First-time boat owners seeking guidance on dock setup.',
    createdAt: new Date('2024-10-08')
  }
];
