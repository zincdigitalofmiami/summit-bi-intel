import type { AISuggestion, AIEmailTemplate, GeneratedEmail } from '@/types/types';

export const mockAISuggestions: AISuggestion[] = [
  {
    id: 'ai-1',
    targetEntity: 'Lead',
    targetEntityId: '1',
    suggestionType: 'next_action',
    content: 'Schedule on-site assessment within 3 days. High conversion probability based on project size and client profile.',
    generatedAt: new Date('2024-09-06'),
    relevanceScore: 0.92,
  },
  {
    id: 'ai-2',
    targetEntity: 'Lead',
    targetEntityId: '2',
    suggestionType: 'follow_up',
    content: 'Send detailed service catalog focusing on emergency repair services. Client shows urgency indicators.',
    generatedAt: new Date('2024-09-06'),
    relevanceScore: 0.87,
  },
  {
    id: 'ai-3',
    targetEntity: 'Project',
    targetEntityId: 'proj-2',
    suggestionType: 'resource_optimization',
    content: 'Consider scheduling additional crew for Marina Bay project to complete ahead of hurricane season.',
    generatedAt: new Date('2024-09-06'),
    relevanceScore: 0.94,
  },
  {
    id: 'ai-4',
    targetEntity: 'Client',
    targetEntityId: '1',
    suggestionType: 'upsell_opportunity',
    content: 'Oceanfront Resort Group may benefit from annual maintenance contract. Previous projects show consistent quality satisfaction.',
    generatedAt: new Date('2024-09-06'),
    relevanceScore: 0.89,
  },
];

export const mockEmailTemplates: AIEmailTemplate[] = [
  {
    id: 'template-1',
    name: 'Lead Follow-up - Initial Contact',
    purpose: 'First contact with new leads',
    baseContent: `Dear {{contactPerson}},

Thank you for your interest in our waterproofing services. We specialize in providing comprehensive solutions for {{serviceType}} projects.

Based on your inquiry about {{projectDescription}}, I believe we can provide significant value to your project. Our team has over 15 years of experience working with similar properties in the South Florida area.

I'd love to schedule a brief call to discuss your specific needs and provide you with a detailed assessment.

Best regards,
{{senderName}}`,
    generatedAt: new Date('2024-08-01'),
    lastUsed: new Date('2024-09-05'),
  },
  {
    id: 'template-2',
    name: 'Proposal Follow-up',
    purpose: 'Following up on sent proposals',
    baseContent: `Hi {{contactPerson}},

I wanted to follow up on the proposal we sent for {{projectName}} on {{proposalDate}}. 

I hope you've had a chance to review our comprehensive approach to your waterproofing needs. Our team is excited about the opportunity to work with {{companyName}}.

Do you have any questions about our proposal? I'm happy to schedule a call to discuss any details or concerns you might have.

Looking forward to hearing from you soon.

Best regards,
{{senderName}}`,
    generatedAt: new Date('2024-08-01'),
    lastUsed: new Date('2024-09-04'),
  },
  {
    id: 'template-3',
    name: 'Emergency Service Response',
    purpose: 'Responding to emergency repair requests',
    baseContent: `Dear {{contactPerson}},

We received your emergency repair request for {{issueDescription}}. We understand the urgency of waterproofing issues and are prepared to respond immediately.

Our emergency response team can be on-site within {{responseTime}} hours. We'll provide:
- Immediate assessment and temporary solutions
- Detailed damage evaluation
- Comprehensive repair plan
- Long-term prevention recommendations

Please call us at {{emergencyPhone}} to confirm the appointment.

Emergency Response Team
{{companyName}}`,
    generatedAt: new Date('2024-08-01'),
    lastUsed: new Date('2024-09-06'),
  },
];

export const mockGeneratedEmails: GeneratedEmail[] = [
  {
    id: 'email-1',
    recipientEmail: 'amanda@tropicalvilla.com',
    subject: 'Waterproofing Solutions for Tropical Villa Resort',
    body: `Dear Amanda Martinez,

Thank you for your interest in our waterproofing services. We specialize in providing comprehensive solutions for luxury resort properties.

Based on your inquiry about pool maintenance and waterproofing for your 15,000 sq ft facility, I believe we can provide significant value to your project. Our team has over 15 years of experience working with similar resort properties in the South Florida area.

I'd love to schedule a brief call to discuss your specific needs and provide you with a detailed assessment.

Best regards,
Sarah Thompson
Summit Waterproofing Solutions`,
    generatedAt: new Date('2024-09-06'),
    sentAt: new Date('2024-09-06'),
    user: {
      id: 'user-1',
      displayName: 'Sarah Thompson',
      email: 'sarah@summitwaterproofing.com',
      role: 'Sales Manager',
      createdAt: new Date('2024-01-01'),
    },
    templateUsed: {
      id: 'template-1',
      name: 'Lead Follow-up - Initial Contact',
      purpose: 'First contact with new leads',
      baseContent: 'Template content...',
      generatedAt: new Date('2024-08-01'),
    },
    context: 'Lead from website form, 15000 sq ft resort property',
  },
  {
    id: 'email-2',
    recipientEmail: 'lwang@harborview.com',
    subject: 'Following up on Harbor View Apartments Proposal',
    body: `Hi Lisa Wang,

I wanted to follow up on the proposal we sent for Harbor View Apartments Waterproofing Project on August 28th.

I hope you've had a chance to review our comprehensive approach to your waterproofing needs. Our team is excited about the opportunity to work with Harbor View Properties LLC.

Do you have any questions about our proposal? I'm happy to schedule a call to discuss any details or concerns you might have.

Looking forward to hearing from you soon.

Best regards,
Michael Chen
Summit Waterproofing Solutions`,
    generatedAt: new Date('2024-09-05'),
    sentAt: new Date('2024-09-05'),
    user: {
      id: 'user-2',
      displayName: 'Michael Chen',
      email: 'michael@summitwaterproofing.com',
      role: 'Project Manager',
      createdAt: new Date('2024-01-01'),
    },
    templateUsed: {
      id: 'template-2',
      name: 'Proposal Follow-up',
      purpose: 'Following up on sent proposals',
      baseContent: 'Template content...',
      generatedAt: new Date('2024-08-01'),
    },
    context: 'Proposal sent 5 days ago, multi-building complex',
  },
];
