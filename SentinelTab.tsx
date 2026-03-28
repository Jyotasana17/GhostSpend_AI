import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Zap, CheckCircle2, CircleDashed, Edit3, Send } from 'lucide-react';
import type { AuditOutput, NegotiationDraft } from '../../utils/aiCore';

const TabContainer = styled(motion.div)`
  padding: 24px 0;
`;

const SentinelHeader = styled.div`
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-neon);
  border-radius: 16px;
  padding: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
`;

const HeaderLeft = styled.div`
  max-width: 600px;
`;

const Title = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
`;

const ToggleContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
`;

const ToggleLabel = styled.span<{ $active: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: ${p => p.$active ? 'var(--accent-cyan)' : 'var(--text-muted)'};
  transition: color 0.3s;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Switch = styled.div<{ $active: boolean }>`
  width: 64px;
  height: 36px;
  background: ${p => p.$active ? 'rgba(6, 182, 212, 0.2)' : 'rgba(255,255,255,0.1)'};
  border: 1px solid ${p => p.$active ? 'var(--accent-cyan)' : 'var(--border-subtle)'};
  border-radius: 18px;
  position: relative;
  transition: all 0.3s;

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    left: ${p => p.$active ? '32px' : '4px'};
    width: 26px;
    height: 26px;
    background: ${p => p.$active ? 'var(--accent-cyan)' : 'var(--text-muted)'};
    border-radius: 50%;
    transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${p => p.$active ? '0 0 10px rgba(6,182,212,0.8)' : 'none'};
  }
`;

const EmptyState = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px dashed var(--border-subtle);
  border-radius: 16px;
  padding: 80px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--text-muted);
`;

const DraftsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 32px;
`;

const DraftCard = styled(motion.div)`
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  transition: border-color 0.3s;

  &:hover {
    border-color: rgba(6, 182, 212, 0.3);
  }
`;

const DraftHeader = styled.div`
  background: rgba(0,0,0,0.3);
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-subtle);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TargetChip = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusChip = styled.div`
  background: rgba(16, 185, 129, 0.1);
  color: var(--accent-green);
  border: 1px solid rgba(16, 185, 129, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const DraftBody = styled.div`
  padding: 24px;
  flex-grow: 1;
`;

const Editor = styled.textarea`
  width: 100%;
  min-height: 250px;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 2px rgba(6,182,212,0.1);
  }
`;

const DraftFooter = styled.div`
  padding: 20px 24px;
  background: rgba(0,0,0,0.3);
  border-top: 1px solid var(--border-subtle);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SendButton = styled.button`
  background: var(--gradient-neon);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(6, 182, 212, 0.5);
  }
`;

interface Props {
  data: AuditOutput | null;
}

const DraftItem: React.FC<{ draft: NegotiationDraft, index: number }> = ({ draft, index }) => {
  const [content, setContent] = React.useState(draft.draft);
  const [status, setStatus] = React.useState<'Drafting' | 'Awaiting Approval' | 'Dispatched'>('Awaiting Approval');

  const handleDispatch = () => {
    setStatus('Dispatched');
  };

  return (
    <DraftCard
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: 'spring', damping: 20 }}
    >
      <DraftHeader>
        <TargetChip>
          <Mail size={18} color="var(--accent-cyan)" />
          {draft.vendor}
        </TargetChip>
        <StatusChip style={{ 
          color: status === 'Dispatched' ? 'var(--accent-purple)' : 'var(--accent-green)',
          background: status === 'Dispatched' ? 'rgba(168,85,247,0.1)' : 'rgba(16,185,129,0.1)',
          borderColor: status === 'Dispatched' ? 'rgba(168,85,247,0.2)' : 'rgba(16,185,129,0.2)'
        }}>
          {status}
        </StatusChip>
      </DraftHeader>
      <DraftBody>
        <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
          <Edit3 size={14} /> AI Generated Draft (Editable)
        </div>
        <Editor 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={status === 'Dispatched'}
        />
      </DraftBody>
      <DraftFooter>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
          <CheckCircle2 size={16} color={status === 'Dispatched' ? 'var(--accent-purple)' : 'var(--text-muted)'} /> 
          {status === 'Dispatched' ? 'Sent to Legal/Vendor' : 'Review required before transmission'}
        </div>
        {status !== 'Dispatched' && (
          <SendButton onClick={handleDispatch}>
            Approve & Dispatch <Send size={16} />
          </SendButton>
        )}
      </DraftFooter>
    </DraftCard>
  );
};

const SentinelTab: React.FC<Props> = ({ data }) => {
  const [enabled, setEnabled] = React.useState(false);

  return (
    <TabContainer initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <SentinelHeader>
        <HeaderLeft>
          <Title>
            <Zap color={enabled ? 'var(--accent-cyan)' : 'var(--text-muted)'} fill={enabled ? 'var(--accent-cyan)' : 'none'} size={28} />
            Sentinel Defense Mode
          </Title>
          <Subtitle>
            When enabled, Sentinel intercepts the leaked capital anomalies from the Analysis tab and dynamically generates ready-to-dispatch vendor negotiation playbooks.
          </Subtitle>
        </HeaderLeft>
        <ToggleContainer>
          <ToggleLabel $active={enabled}>{enabled ? 'System Active' : 'Standby'}</ToggleLabel>
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => setEnabled(e.target.checked)}
            style={{ display: 'none' }}
          />
          <Switch $active={enabled} />
        </ToggleContainer>
      </SentinelHeader>

      <AnimatePresence mode="wait">
        {!enabled && (
          <EmptyState
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <CircleDashed size={64} strokeWidth={1} color="var(--border-subtle)" />
            <div>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: 8 }}>
                Sentinel Standby
              </div>
              <div style={{ fontSize: '0.95rem' }}>
                Toggle Sentinel Defense Mode ON to automatically generate negotiation drafts.
              </div>
            </div>
          </EmptyState>
        )}

        {enabled && data && data.negotiation_drafts && (
          <DraftsGrid
            key="drafts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data.negotiation_drafts.map((draft, i) => (
              <DraftItem key={i} draft={draft} index={i} />
            ))}
          </DraftsGrid>
        )}

        {enabled && (!data || !data.negotiation_drafts || data.negotiation_drafts.length === 0) && (
          <EmptyState
            key="no-data"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div style={{ fontSize: '0.95rem' }}>
              No leaks detected to generate drafts for. Upload data in the Analysis tab first.
            </div>
          </EmptyState>
        )}
      </AnimatePresence>
    </TabContainer>
  );
};

export default SentinelTab;
