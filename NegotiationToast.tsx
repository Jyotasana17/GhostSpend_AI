import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { X, Mail, Zap } from 'lucide-react';
import type { NegotiationDraft } from '../../utils/aiCore';

const Overlay = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 50;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
  width: 100%;
`;

const Toast = styled(motion.div)`
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 4px; height: 100%;
    background: #3b82f6;
  }
`;

const ToastHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ToastTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  transition: color 0.2s;
  &:hover { color: #0f172a; background: #f1f5f9; }
`;

const ToastVendor = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 4px;
`;

const ToastPreview = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #64748b;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ExpandedDraft = styled(motion.div)`
  margin-top: 12px;
  padding: 12px;
  background: #f8fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #334155;
  white-space: pre-wrap;
  line-height: 1.6;
  max-height: 200px;
  overflow-y: auto;
`;

interface Props {
  drafts: NegotiationDraft[];
  visible: boolean;
}

const NegotiationToast: React.FC<Props> = ({ drafts, visible }) => {
  const [dismissed, setDismissed] = React.useState<Set<number>>(new Set());
  const [expanded, setExpanded] = React.useState<number | null>(null);

  React.useEffect(() => {
    setDismissed(new Set());
    setExpanded(null);
  }, [drafts]);

  const visibleDrafts = drafts.filter((_, i) => !dismissed.has(i));

  return (
    <Overlay>
      <AnimatePresence>
        {visible &&
          visibleDrafts.map((draft, i) => (
            <Toast
              key={`${draft.vendor}-${i}`}
              initial={{ x: 120, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: 120, opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: i * 0.08 }}
              onClick={() => setExpanded(expanded === i ? null : i)}
              layout
            >
              <ToastHeader>
                <ToastTitle>
                  <Zap size={14} />
                  Sentinel Playbook
                </ToastTitle>
                <CloseBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setDismissed(prev => new Set([...prev, i]));
                  }}
                >
                  <X size={14} />
                </CloseBtn>
              </ToastHeader>
              <ToastVendor>
                <Mail size={12} style={{ display: 'inline', marginRight: 6, verticalAlign: 'middle', color: '#64748b' }} />
                {draft.vendor}
              </ToastVendor>
              <ToastPreview>{draft.draft}</ToastPreview>
              <AnimatePresence>
                {expanded === i && (
                  <ExpandedDraft
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {draft.draft}
                  </ExpandedDraft>
                )}
              </AnimatePresence>
            </Toast>
          ))}
      </AnimatePresence>
    </Overlay>
  );
};

export default NegotiationToast;
