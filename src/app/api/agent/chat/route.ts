import { NextRequest, NextResponse } from 'next/server';

export const runtime = "nodejs";
export const maxDuration = 30; // 30 seconds for AI chat operations

interface ChatRequest {
  message: string;
  context: {
    page?: string;
    data?: any;
    action?: string;
  };
  page: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, context, page }: ChatRequest = await request.json();

    // For now, return intelligent responses based on context
    // In production, this would integrate with OpenAI, Claude, or similar
    const response = generateAIResponse(message, context, page);

    return NextResponse.json({
      response,
      category: 'ai_response',
      confidence: 0.85,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('AI Chat API error:', error);
    return NextResponse.json(
      { error: 'AI service temporarily unavailable' },
      { status: 500 }
    );
  }
}

function generateAIResponse(message: string, context: any, page: string): string {
  const lowerMessage = message.toLowerCase();

  // Dashboard-specific responses
  if (page === 'dashboard') {
    if (lowerMessage.includes('opportunity') || lowerMessage.includes('best')) {
      return "🎯 **Top Opportunity Today:** The Miracle Strip seawall project ($420K) has a 72% conversion probability and fits perfectly in your 3-week weather window opening November 15th. The client is motivated and ready to sign.";
    }

    if (lowerMessage.includes('pipeline') || lowerMessage.includes('leads')) {
      return "📊 **Pipeline Analysis:** You have 18 active leads with a 32% conversion rate. The top 3 priorities are:\n\n1. **St. Andrews Bay Development** ($850K) - 85% probability\n2. **Miracle Strip Seawall** ($420K) - 72% probability\n3. **Shell Island Pier** ($650K) - 60% probability\n\nFocus on converting these high-probability opportunities.";
    }

    if (lowerMessage.includes('pricing') || lowerMessage.includes('price')) {
      return "💰 **Pricing Strategy:** Your current $1,850/sq ft pricing gives you a 15% competitive advantage over the market average of $2,100/sq ft. For premium services (eco-materials, expedited), consider $2,200-2,500/sq ft pricing.";
    }

    if (lowerMessage.includes('weather') || lowerMessage.includes('schedule')) {
      return "⛅ **Weather Intelligence:** Current conditions are excellent for marine work (1-2 ft waves, 12 mph NE winds). Your next optimal 3-week weather window opens November 15th. Schedule high-value projects then to avoid winter storm season.";
    }

    if (lowerMessage.includes('capacity') || lowerMessage.includes('team')) {
      return "⚙️ **Team Capacity:** Currently at 75% utilization with 4/7 equipment units available. Team Alpha is completing the Biscayne Bay deck, Team Beta starts Key Largo pier tomorrow. Available capacity: 2 crews, 3 equipment units.";
    }
  }

  // CRM-specific responses
  if (page === 'crm') {
    if (lowerMessage.includes('qualify') || lowerMessage.includes('lead')) {
      return "✅ **Lead Qualification Framework:**\n\n**High Priority (8-10 score):**\n- Budget: $50K+\n- Timeline: Within 3 months\n- Decision Maker: Confirmed\n- Competition: Minimal\n\n**Your top lead 'David Wilson' scores 9/10** - $75K budget, 2-month timeline, property owner.";
    }

    if (lowerMessage.includes('email') || lowerMessage.includes('follow')) {
      return "📧 **Recommended Follow-up Strategy:**\n\n**Day 1:** Send proposal with pricing ($1,850/sq ft vs $2,100 market)\n**Day 3:** Personal call to address concerns\n**Day 7:** Site visit offer + 3-week weather window advantage\n**Day 14:** Final negotiation with 5% discount for quick close\n\n**Email Template:** 'Hi [Name], Summit's competitive pricing and proven track record can save you both time and money...'";
    }

    if (lowerMessage.includes('convert') || lowerMessage.includes('close')) {
      return "🎯 **Conversion Optimization:** Focus on addressing the top 3 objections:\n\n1. **Pricing Concerns:** Highlight 15% below market value\n2. **Timeline Uncertainty:** Emphasize 3-week weather window\n3. **Quality Assurance:** Share before/after photos and references\n\n**Success Rate:** 72% for leads that receive personalized follow-up within 24 hours.";
    }
  }

  // Projects-specific responses
  if (page === 'projects') {
    if (lowerMessage.includes('schedule') || lowerMessage.includes('today')) {
      return "📅 **Today's Optimal Schedule:**\n\n**8 AM:** Team Alpha completes Biscayne Bay deck inspection\n**10 AM:** Team Beta begins Key Largo pier foundation prep\n**2 PM:** Equipment maintenance window\n**4 PM:** Client meeting for Miracle Strip project\n\n**Weather Window:** Excellent conditions today, schedule outdoor work.";
    }

    if (lowerMessage.includes('resource') || lowerMessage.includes('equipment')) {
      return "⚙️ **Resource Allocation:**\n\n**Available Equipment:** 4/7 units operational\n- 2x Excavators (Team Alpha)\n- 1x Crane (Team Beta)\n- 1x Piling Rig (Maintenance)\n\n**Team Capacity:** 75% utilized\n**Next Available:** Tomorrow morning\n**Recommendation:** Schedule Shell Island pier for next week.";
    }

    if (lowerMessage.includes('progress') || lowerMessage.includes('status')) {
      return "📊 **Project Status Overview:**\n\n**Biscayne Bay Deck:** 75% complete, on schedule\n**Key Largo Pier:** Starting tomorrow, 0% complete\n**Miracle Strip Seawall:** Planning phase, 10% complete\n**Shell Island Pier:** Bid preparation, 0% complete\n\n**Overall:** 3 active projects, $2.4M total value.";
    }
  }

  // Proposals-specific responses
  if (page === 'proposals') {
    if (lowerMessage.includes('review') || lowerMessage.includes('terms')) {
      return "📋 **Proposal Review Checklist:**\n\n✅ **Pricing:** $1,850/sq ft (15% below market)\n✅ **Timeline:** 3-week weather window advantage\n✅ **Scope:** Clearly defined deliverables\n✅ **Payment Terms:** 30% upfront, 70% completion\n✅ **Warranties:** 2-year workmanship guarantee\n✅ **Change Orders:** Approved in writing only\n\n**Recommendation:** Add 10% contingency for unforeseen marine conditions.";
    }

    if (lowerMessage.includes('email') || lowerMessage.includes('send')) {
      return "📧 **Email Strategy for Proposals:**\n\n**Subject:** Summit Marine Proposal - [Project Name] - $1,850/sq ft Competitive Pricing\n\n**Key Points to Include:**\n1. Competitive pricing advantage\n2. 3-week weather window availability\n3. Proven track record with references\n4. Electronic signature capability\n5. 2-year warranty included\n\n**Follow-up:** Call within 24 hours of sending.";
    }

    if (lowerMessage.includes('objection') || lowerMessage.includes('concern')) {
      return "🎯 **Common Objections & Responses:**\n\n**'Too Expensive':** 'Our $1,850/sq ft is actually 15% below market average. We save you money through efficiency and weather window optimization.'\n\n**'Timeline Too Long':** 'Our 3-week weather window gives us uninterrupted construction time, actually completing faster than competitors.'\n\n**'Quality Concerns':** 'We offer 2-year warranties and have completed 50+ projects with 98% satisfaction rate.'";
    }
  }

  // General business responses
  if (lowerMessage.includes('profit') || lowerMessage.includes('margin')) {
    return "💰 **Profitability Analysis:**\n\n**Current Margins:**\n- Dock Construction: 28% margin ($1,850/sq ft cost basis)\n- Seawall: 32% margin ($2,200/lf cost basis)\n- Repairs: 35% margin (premium pricing)\n\n**Optimization Opportunities:**\n- Bundle services for 5-10% margin increase\n- Seasonal pricing (June-October) for 15% premium\n- Eco-friendly materials command 20% premium pricing";
  }

  if (lowerMessage.includes('competitor') || lowerMessage.includes('competition')) {
    return "🏆 **Competitive Landscape:**\n\n**Market Position:** Summit ranks #2 in Panama City with 15% pricing advantage\n\n**Key Competitors:**\n- Bay County Marine: Premium pricing ($2,800/sq ft), slow response\n- Panama City Marine: Market rate ($2,100/sq ft), good reputation\n- PCB Construction: Discount pricing ($1,600/sq ft), quality concerns\n\n**Your Advantages:**\n- Competitive pricing\n- Fast response time\n- Weather expertise\n- 2-year warranty";
  }

  if (lowerMessage.includes('forecast') || lowerMessage.includes('future')) {
    return "🔮 **Market Forecast:**\n\n**Next 6 Months:**\n- 25+ dock projects from St. Andrews Bay development\n- Increased seawall demand due to storm season prep\n- 40% growth in repair/maintenance work\n\n**Recommendations:**\n- Hire 2 additional crew members\n- Invest in SnapJacket technology\n- Expand eco-friendly material offerings\n- Increase marketing spend by 20%";
  }

  // Default response
  return "🤖 I'm here to help with your marine construction business! I can assist with:\n\n• **Lead qualification** and conversion strategies\n• **Pricing optimization** and competitive analysis\n• **Project scheduling** and resource allocation\n• **Weather impact** assessments\n• **Proposal review** and email strategies\n• **Market forecasting** and business planning\n\nWhat specific question can I help you with today?";
}
