import type { Project } from '@/types/types';

// Import demo clients and leads for references
import { demoClients } from './demo-clients';
import { demoLeads } from './demo-leads';

export const demoProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Gulf Coast Marina Expansion',
    description: 'Expand marina dock capacity from 120 to 180 slips with new floating dock system',
    client: demoClients[0], // Gulf Coast Marina & Resort
    sourceLead: demoLeads[0], // Gulf Coast Marina Expansion lead
    status: 'active',
    budget: 850000,
    actualCost: 425000,
    startDate: new Date('2024-10-15'),
    expectedEndDate: new Date('2025-03-30'),
    createdAt: new Date('2024-10-01')
  },
  {
    id: 'proj-002', 
    name: 'Luxury Resort Seawall',
    description: 'Construct 800-foot decorative seawall with integrated lighting and landscaping',
    client: demoClients[1], // Azure Shores Resort
    sourceLead: demoLeads[1], // Waterfront Home Dock lead
    status: 'planning',
    budget: 1200000,
    actualCost: 75000,
    startDate: new Date('2025-02-01'),
    expectedEndDate: new Date('2025-08-15'),
    createdAt: new Date('2024-11-20')
  },
  {
    id: 'proj-003',
    name: 'Residential Boat Lift Installation',
    description: 'Install 16,000 lb boat lift with composite decking and electrical systems',
    client: demoClients[2], // Thompson Family
    sourceLead: demoLeads[2], // Commercial Seawall lead
    status: 'completed',
    budget: 45000,
    actualCost: 42500,
    startDate: new Date('2024-11-01'),
    expectedEndDate: new Date('2024-11-30'),
    actualEndDate: new Date('2024-11-28'),
    createdAt: new Date('2024-10-15')
  }
];
