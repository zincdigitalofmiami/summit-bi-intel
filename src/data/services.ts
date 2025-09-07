import type { Service } from '@/types/types';

export const mockServices: Service[] = [
  {
    id: 'svc-1',
    name: 'Seawall Construction',
    description: 'Design and construction of durable seawalls to protect waterfront properties from erosion and storm damage',
    unit: 'linear ft',
    pricePerUnit: 0, // To be filled with real pricing
    costPerUnit: 0, // To be filled with real costs
    serviceType: 'construction',
    materialType: 'concrete_steel',
    dimensionsRequired: true,
    typicalDurationDays: 0, // To be filled with actual project timelines
    regulatoryRequirements: 'DEP permits, Corps of Engineers approval, local zoning compliance',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'svc-2',
    name: 'Seawall Repair',
    description: 'Comprehensive repair and reinforcement of existing seawalls',
    unit: 'linear ft',
    pricePerUnit: 0, // To be filled with real pricing
    costPerUnit: 0, // To be filled with real costs
    serviceType: 'repair',
    materialType: 'concrete_steel',
    dimensionsRequired: true,
    typicalDurationDays: 0, // To be filled with actual project timelines
    regulatoryRequirements: 'Local permits, environmental compliance',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'svc-3',
    name: 'Dock Construction',
    description: 'Custom dock design and construction for residential and commercial waterfront properties',
    unit: 'sq ft',
    pricePerUnit: 0, // To be filled with real pricing
    costPerUnit: 0, // To be filled with real costs
    serviceType: 'construction',
    materialType: 'composite_aluminum',
    dimensionsRequired: true,
    typicalDurationDays: 0, // To be filled with actual project timelines
    regulatoryRequirements: 'DEP permits, local building codes, environmental review',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'svc-4',
    name: 'Dock Repair',
    description: 'Maintenance and repair services for existing dock structures',
    unit: 'service call',
    pricePerUnit: 0, // To be filled with real pricing
    costPerUnit: 0, // To be filled with real costs
    serviceType: 'repair',
    materialType: 'composite_aluminum',
    dimensionsRequired: false,
    typicalDurationDays: 0, // To be filled with actual project timelines
    regulatoryRequirements: 'Minimal permitting for standard repairs',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'svc-5',
    name: 'Retaining Wall Construction',
    description: 'Design and construction of retaining walls for waterfront and upland properties',
    unit: 'linear ft',
    pricePerUnit: 0, // To be filled with real pricing
    costPerUnit: 0, // To be filled with real costs
    serviceType: 'construction',
    materialType: 'concrete_block',
    dimensionsRequired: true,
    typicalDurationDays: 0, // To be filled with actual project timelines
    regulatoryRequirements: 'Building permits, engineering review',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: 'svc-6',
    name: 'Marine Construction Permitting',
    description: 'Permit acquisition and regulatory compliance services for marine construction projects',
    unit: 'project',
    pricePerUnit: 0, // To be filled with real pricing
    costPerUnit: 0, // To be filled with real costs
    serviceType: 'permitting',
    materialType: 'documentation',
    dimensionsRequired: false,
    typicalDurationDays: 0, // To be filled with actual permit timelines
    regulatoryRequirements: 'DEP, Corps of Engineers, local authorities',
    createdAt: new Date('2024-01-01'),
  },
];
