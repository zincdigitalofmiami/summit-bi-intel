import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { calculateTotal, type ProposalRecord } from '@/lib/proposals';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

interface SendProposalRequest {
  proposalId: string;
  recipientEmail: string;
  recipientName: string;
  customMessage?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { proposalId, recipientEmail, recipientName, customMessage }: SendProposalRequest = await request.json();

    // Get proposal details (in production, fetch from database)
    // For now, create a sample proposal
    const sampleProposal: ProposalRecord = {
      id: proposalId,
      clientName: recipientName,
      clientEmail: recipientEmail,
      projectName: "Marine Construction Project",
      lineItems: [
        { description: "Dock Construction (200 sq ft)", amount: 370000 },
        { description: "Seawall Installation (150 lf)", amount: 330000 },
        { description: "Equipment & Materials", amount: 75000 },
        { description: "Permitting & Engineering", amount: 25000 }
      ],
      notes: "Complete marine construction package with 2-year warranty",
      createdAt: new Date().toISOString()
    };

    const total = calculateTotal(sampleProposal.lineItems);
    const signToken = `sign_${Date.now()}_${proposalId}`;
    const signUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/proposals/sign/${signToken}`;

    // Generate PDF (simplified for demo)
    const pdfContent = generateProposalPDF(sampleProposal, total, signUrl);

    // Email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #1e40af;">Summit Marine Development Proposal</h1>

        <p>Dear ${recipientName},</p>

        ${customMessage ? `<p>${customMessage}</p>` : ''}

        <p>Thank you for considering Summit Marine Development for your marine construction project. We're excited about the opportunity to work with you on "${sampleProposal.projectName}".</p>

        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Project Summary</h3>
          <p><strong>Client:</strong> ${sampleProposal.clientName}</p>
          <p><strong>Project:</strong> ${sampleProposal.projectName}</p>
          <p><strong>Total Amount:</strong> $${total.toLocaleString()}</p>
        </div>

        <p>Please review the attached proposal and sign electronically using the link below:</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${signUrl}" style="background: #1e40af; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
            Review & Sign Proposal
          </a>
        </div>

        <p>If you have any questions, please don't hesitate to contact us at (850) 555-0123 or reply to this email.</p>

        <p>Best regards,<br/>
        Summit Marine Development Team</p>

        <hr style="margin: 40px 0; border: none; border-top: 1px solid #e5e7eb;" />

        <p style="font-size: 12px; color: #6b7280;">
          This proposal is valid for 30 days. Electronic signatures are legally binding and secure.
        </p>
      </div>
    `;

    try {
      if (!resend) {
        // Email service not configured - return sign link only
        return NextResponse.json({
          success: false,
          error: 'Email service not configured',
          signUrl,
          fallback: true,
          message: 'Email service not configured. Use the sign link below to send manually.'
        });
      }

      // Send email with Resend
      const emailResponse = await resend.emails.send({
        from: 'Summit Marine <proposals@summitmarine.com>',
        to: recipientEmail,
        subject: `Summit Marine Proposal - ${sampleProposal.projectName} - $${total.toLocaleString()}`,
        html: emailHtml,
        attachments: [
          {
            filename: `Summit-Proposal-${proposalId}.pdf`,
            content: Buffer.from(pdfContent).toString('base64')
          }
        ]
      });

      return NextResponse.json({
        success: true,
        messageId: emailResponse.data?.id,
        recipient: recipientEmail,
        signUrl,
        sentAt: new Date().toISOString()
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);

      // Fallback response if email service fails
      return NextResponse.json({
        success: false,
        error: 'Email service temporarily unavailable',
        signUrl,
        fallback: true
      });
    }
  } catch (error) {
    console.error('Proposal send API error:', error);
    return NextResponse.json(
      { error: 'Failed to send proposal' },
      { status: 500 }
    );
  }
}

function generateProposalPDF(proposal: ProposalRecord, total: number, signUrl: string): string {
  // Simplified PDF content (in production, use pdf-lib or similar)
  const pdfContent = `
    SUMMIT MARINE DEVELOPMENT
    MARINE CONSTRUCTION PROPOSAL

    Client: ${proposal.clientName}
    Project: ${proposal.projectName}
    Date: ${new Date().toLocaleDateString()}

    LINE ITEMS:
    ${proposal.lineItems.map(item =>
      `${item.description}: $${item.amount.toLocaleString()}`
    ).join('\n')}

    TOTAL: $${total.toLocaleString()}

    NOTES: ${proposal.notes || 'N/A'}

    Electronic Signature Required: ${signUrl}

    This proposal is valid for 30 days.
    Summit Marine Development - Excellence in Marine Construction
  `;

  // Convert to base64 (simplified)
  return Buffer.from(pdfContent).toString('base64');
}
