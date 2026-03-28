export interface DailyTrend {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  trend: 'up' | 'down';
}

export interface Leak {
  id: string; 
  agent_source: string; 
  type: string;
  impact: number;
  root_cause: string;
  actionable_fix: string;
  confidence: number;
  effort: 'Low' | 'Medium' | 'High';
}

export interface NegotiationDraft {
  vendor: string;
  draft: string;
}

export interface AuditOutput {
  total_savings_opportunity: number;
  leaks: Leak[];
  daily_leak_trend: DailyTrend[];
  negotiation_drafts: NegotiationDraft[];
  offline_logic_hash: string;
  api_used: boolean; // Tracking if Live Groq API was utilized
}

// ─── Mock Data Generation ─────────────────────────────────────────────────────
function generateDailyTrend(days = 30): DailyTrend[] {
  const metrics: DailyTrend[] = [];
  const today = new Date();
  let currentPrice = 5000;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const open = currentPrice;
    const volatility = (Math.random() * 0.4) - 0.2; 
    const close = open * (1 + volatility);
    const high = Math.max(open, close) * (1 + Math.random() * 0.15);
    const low = Math.min(open, close) * (1 - Math.random() * 0.15);
    
    currentPrice = close;
    metrics.push({
      date: dateStr,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      trend: close >= open ? 'up' : 'down'
    });
  }
  return metrics;
}

// ─── Live Groq LLM Client ───────────────────────────────────────────────────
async function fetchGroqAudit(csvText: string, apiKey: string, hash: string): Promise<AuditOutput> {
  const systemPrompt = `You are GhostSpend AI, a 4-Agent Cost Intelligence Array. 
Your job is to analyze corporate CSV expenses and detect hidden leaks.
Analyze the provided CSV data. Find duplicate vendors, zombie subscriptions, penalty candidates, and cloud over-spends.
Return ONLY a valid JSON object with the exact following structure:
{
  "total_savings_opportunity": number,
  "leaks": [
    {
      "id": "string",
      "agent_source": "Spend Intelligence Agent | SLA & Penalty Prevention Agent | Resource Optimization Agent | FinOps Agent",
      "type": "zombie_subscription | duplicate_vendor | sla_penalty | model_over_spend | financial_variance",
      "impact": number,
      "root_cause": "Detailed explanation of the problem",
      "actionable_fix": "AI recommended solution",
      "confidence": number (0-100),
      "effort": "Low | Medium | High"
    }
  ],
  "negotiation_drafts": [
    {
      "vendor": "string",
      "draft": "Full email template demanding penalty deduction or cancellation"
    }
  ]
}`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this CSV snippet:\n\n${csvText.substring(0, 4000)}` }
        ],
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API Error: ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    
    return {
      total_savings_opportunity: parsed.total_savings_opportunity || 0,
      leaks: parsed.leaks || [],
      daily_leak_trend: generateDailyTrend(30), // Always generate candlestick locally for UI speed
      negotiation_drafts: parsed.negotiation_drafts || [],
      offline_logic_hash: hash,
      api_used: true
    };
  } catch (error) {
    console.error("Groq Live API Failed. Falling back to High-Fidelity Simulation.", error);
    return getFallbackAudit(hash); // Fallback so the prototype never crashes
  }
}

// ─── High-Fidelity Local Simulation Fallback ────────────────────────────────
function getFallbackAudit(hash: string): AuditOutput {
  const leaks: Leak[] = [
    {
      id: 'SIA-001',
      agent_source: 'Spend Intelligence Agent',
      type: 'zombie_subscription',
      impact: 14500,
      root_cause: '23 Adobe CC and Figma licenses show last_login_days > 30.',
      actionable_fix: 'Run deprovisioning playbook to reclaim licenses immediately.',
      confidence: 98.5,
      effort: 'Low'
    },
    {
      id: 'SIA-002',
      agent_source: 'Spend Intelligence Agent',
      type: 'duplicate_vendor',
      impact: 9600,
      root_cause: 'Duplicate contracts detected for Video Conferencing (Zoom & MS Teams).',
      actionable_fix: 'Cancel Zoom subscription and migrate all users to existing Teams enterprise plan.',
      confidence: 92.0,
      effort: 'Medium'
    },
    {
      id: 'SLA-001',
      agent_source: 'SLA & Penalty Prevention Agent',
      type: 'sla_penalty',
      impact: 4250,
      root_cause: 'Vendor "LogiCorp Express" missed Promised_Date by 3 days on Order #88912.',
      actionable_fix: 'Automatically calculate and deduct 5% late penalty from the current invoice.',
      confidence: 100.0,
      effort: 'Low'
    },
    {
      id: 'ROA-001',
      agent_source: 'Resource Optimization Agent',
      type: 'model_over_spend',
      impact: 38200,
      root_cause: 'Data pipeline using high-cost Gemini Ultra / GPT-4 for simple document categorization.',
      actionable_fix: 'Switch API endpoint to Gemini 1.5 Flash to achieve 90% cost savings on inference.',
      confidence: 89.2,
      effort: 'High'
    },
    {
      id: 'FIN-001',
      agent_source: 'FinOps Agent',
      type: 'financial_variance',
      impact: 12400,
      root_cause: 'Cloud compute invoice is 18% higher than provisioned capacity due to unattached persistent volumes.',
      actionable_fix: 'Execute cleanup script for unattached EBS volumes across all AWS regions.',
      confidence: 95.8,
      effort: 'Medium'
    }
  ];

  const total_savings_opportunity = parseFloat(leaks.reduce((s, l) => s + l.impact, 0).toFixed(2));

  const negotiation_drafts: NegotiationDraft[] = [
    {
      vendor: 'LogiCorp Express',
      draft: `Subject: SLA Penalty Deduction Notice – Invoice #88912\n\nDear LogiCorp Team,\n\nOur autonomous monitoring system detected a 3-day delay past the Promised_Date for Order #88912. Per our SLA contract (Clause 4.b), a 5% late penalty has been calculated.\n\nPlease note that ₹4,250 has been deducted from the pending invoice. Let us know if you require the detailed delivery logs.\n\nRegards,\nGhostSpend AI Action Engine`
    },
    {
      vendor: 'Zoom Video Communications',
      draft: `Subject: Notice of Contract Non-Renewal\n\nDear Zoom Account Manager,\n\nFollowing an internal FinOps audit, we have identified functional overlap with our existing Microsoft Teams deployment.\n\nWe will not be renewing our contract at the end of this billing cycle. Please initiate the offboarding workflow.\n\nThank you,\nProcurement, GhostSpend AI`
    }
  ];

  return {
    total_savings_opportunity,
    leaks,
    daily_leak_trend: generateDailyTrend(30),
    negotiation_drafts,
    offline_logic_hash: hash,
    api_used: false
  };
}

// ─── Unified Routing Engine ─────────────────────────────────────────────────
export async function runMasterAudit(hash: string, csvText?: string): Promise<AuditOutput> {
  const groqKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (groqKey && csvText && csvText.trim().length > 10) {
    console.log("[GhostSpend LLM Bridge] Live Groq API Key Detected. Executing remote intelligence...");
    return await fetchGroqAudit(csvText, groqKey, hash);
  } else {
    console.log("[GhostSpend Vault] Running Local Fallback Simulation Mode...");
    return getFallbackAudit(hash);
  }
}
