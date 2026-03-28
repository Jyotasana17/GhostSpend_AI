import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import UploadView from '../layout/UploadView';
import ObsidianAnalyticsChart from '../charts/ObsidianAnalyticsChart';
import { ShieldAlert, Cpu, Calculator, Activity, AlertTriangle, ArrowRight, Share, Zap, ShieldCheck } from 'lucide-react';
import type { AuditOutput, Leak } from '../../utils/aiCore';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  margin: 24px 0;
`;

const ContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
`;

const Card = styled(motion.div)`
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-neon);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
`;

const StatCard = styled(Card)`
  padding: 24px;
  position: relative;
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 8px;
`;

const StatValue = styled.div<{ $accent?: string }>`
  font-family: 'Outfit', sans-serif;
  font-size: 2.2rem;
  font-weight: 800;
  color: ${p => p.$accent || 'var(--text-primary)'};
  line-height: 1;
`;

const StatSub = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 6px;
`;

const StatIcon = styled.div<{ $bg: string; $color: string }>`
  position: absolute;
  top: 24px; right: 24px;
  width: 44px; height: 44px;
  border-radius: 12px;
  background: ${p => p.$bg};
  display: flex; align-items: center; justify-content: center;
  color: ${p => p.$color};
  box-shadow: inset 0 0 10px ${p => p.$color}33;
`;

const SectionTitle = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary);
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CopyBriefBtn = styled.button`
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid var(--accent-cyan);
  color: var(--accent-cyan);
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: var(--accent-cyan);
    color: #fff;
    box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
  }
`;

const LeakGrid = styled.div`
  padding: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  background: rgba(0,0,0,0.2);
`;

const LeakItem = styled.div<{ $borderColor: string }>`
  background: var(--bg-card);
  border: 1px solid var(--border-subtle);
  border-top: 4px solid ${p => p.$borderColor};
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    border-color: ${p => p.$borderColor}44;
  }
`;

const LeakItemHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const AgentSourceBadge = styled.div<{ $color: string; $bg: string }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${p => p.$color};
  background: ${p => p.$bg};
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  box-shadow: inset 0 0 8px ${p => p.$bg};
`;

const BadgeGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const MetricBadge = styled.div<{ $type: 'confidence' | 'effort' }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: ${p => p.$type === 'confidence' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(236, 72, 153, 0.1)'};
  color: ${p => p.$type === 'confidence' ? '#10b981' : '#ec4899'};
  border: 1px solid ${p => p.$type === 'confidence' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(236, 72, 153, 0.2)'};
`;

const LeakHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const LeakType = styled.h3`
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.01em;
`;

const LeakImpact = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--accent-red);
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  padding: 4px 10px;
  border-radius: 6px;
`;

const ProblemBox = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--border-subtle);
`;

const SolutionBox = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
  line-height: 1.5;
  background: rgba(6, 182, 212, 0.05);
  border: 1px solid rgba(6, 182, 212, 0.2);
  padding: 16px;
  border-radius: 8px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
`;

function getAgentTheme(type: string) {
  switch (type) {
    case 'zombie_subscription':
    case 'duplicate_vendor':
      return { icon: <ShieldAlert size={16} />, color: '#A855F7', bg: 'rgba(168,85,247,0.1)', name: 'Spend Intelligence Agent' };
    case 'sla_penalty':
      return { icon: <AlertTriangle size={16} />, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', name: 'SLA Prevention Agent' };
    case 'model_over_spend':
      return { icon: <Cpu size={16} />, color: '#ec4899', bg: 'rgba(236,72,153,0.1)', name: 'Resource Optimization Agent' };
    case 'financial_variance':
      return { icon: <Calculator size={16} />, color: '#10b981', bg: 'rgba(16,185,129,0.1)', name: 'FinOps Agent' };
    default:
      return { icon: <Activity size={16} />, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', name: 'System Core' };
  }
}

interface Props {
  data: AuditOutput | null;
  onUploadStart: () => void;
}

const AnalysisTab: React.FC<Props> = ({ data, onUploadStart }) => {
  if (!data) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <UploadView onComplete={onUploadStart} />
      </motion.div>
    );
  }

  const handleCopySummary = () => {
    const text = `GhostSpend AI - Executive Summary:\nTotal Leak Identified: ₹${data.total_savings_opportunity.toLocaleString()}\n\nIssues:\n` + data.leaks.map(l => `- ${l.type.toUpperCase()}: ${l.root_cause} (₹${l.impact})`).join('\n');
    navigator.clipboard.writeText(text);
    alert('Executive Summary copied to clipboard!');
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {/* Metrics Header */}
      <Grid>
        <StatCard>
          <StatIcon $bg="rgba(239, 68, 68, 0.1)" $color="var(--accent-red)"><ShieldAlert size={20} /></StatIcon>
          <StatLabel>Total Hidden Leak</StatLabel>
          <StatValue $accent="var(--accent-red)">₹{data.total_savings_opportunity.toLocaleString('en-IN')}</StatValue>
          <StatSub>Identified across operations</StatSub>
        </StatCard>
        
        <StatCard>
          <StatIcon $bg="rgba(168, 85, 247, 0.1)" $color="var(--accent-purple)"><Cpu size={20} /></StatIcon>
          <StatLabel>Intelligence Engine</StatLabel>
          <StatValue $accent="var(--accent-purple)">{data.api_used ? 'Groq AI' : 'Simulation'}</StatValue>
          <StatSub>{data.api_used ? 'Live Model: Llama-3 8B' : 'High-Fidelity Offline Mock'}</StatSub>
        </StatCard>

        <StatCard>
          <StatIcon $bg="rgba(6, 182, 212, 0.1)" $color="var(--accent-cyan)"><Activity size={20} /></StatIcon>
          <StatLabel>Audit Status</StatLabel>
          <StatValue $accent="var(--accent-cyan)">Decoded</StatValue>
          <StatSub>4 Agentic monitors triggered</StatSub>
        </StatCard>
      </Grid>

      <ContentLayout>
        {/* KPI Intelligence Cards */}
        <Card>
          <SectionTitle>
            <TitleLeft>Agentic Cost Intelligence Manifest</TitleLeft>
            <CopyBriefBtn onClick={handleCopySummary}>
              <Share size={14} /> Export Exec Brief
            </CopyBriefBtn>
          </SectionTitle>
          <LeakGrid>
            {data.leaks.map((leak: Leak) => {
              const theme = getAgentTheme(leak.type);
              return (
                <LeakItem key={leak.id} $borderColor={theme.color}>
                  <LeakItemHeaderRow>
                    <AgentSourceBadge $bg={theme.bg} $color={theme.color}>
                      {theme.icon} {theme.name}
                    </AgentSourceBadge>
                    <BadgeGroup>
                      {leak.confidence && (
                        <MetricBadge $type="confidence">
                          <ShieldCheck size={12} /> {leak.confidence}% Match
                        </MetricBadge>
                      )}
                      {leak.effort && (
                        <MetricBadge $type="effort">
                          <Zap size={12} /> {leak.effort} Effort
                        </MetricBadge>
                      )}
                    </BadgeGroup>
                  </LeakItemHeaderRow>
                  
                  <LeakHeader>
                    <LeakType>{leak.type.replace(/_/g, ' ').toUpperCase()}</LeakType>
                    <LeakImpact>- ₹{leak.impact.toLocaleString('en-IN')}</LeakImpact>
                  </LeakHeader>

                  <ProblemBox>
                    <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Identified Pattern:</strong>
                    {leak.root_cause}
                  </ProblemBox>

                  <SolutionBox>
                    <ArrowRight size={18} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: 2 }} />
                    <div>
                      <strong style={{ display: 'block', marginBottom: '4px', color: 'var(--accent-cyan)' }}>AI Recovery Protocol:</strong>
                      {leak.actionable_fix}
                    </div>
                  </SolutionBox>
                </LeakItem>
              );
            })}
          </LeakGrid>
        </Card>

        {/* Temporal Candlesticks */}
        <Card>
          <SectionTitle>
            <TitleLeft>Daily Operational Variance (OHLC)</TitleLeft>
          </SectionTitle>
          <ObsidianAnalyticsChart data={data.daily_leak_trend} />
        </Card>
      </ContentLayout>
    </motion.div>
  );
};

export default AnalysisTab;
