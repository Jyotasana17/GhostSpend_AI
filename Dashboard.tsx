import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Building2, Download } from 'lucide-react';
import AnalysisTab from '../tabs/AnalysisTab';
import SentinelTab from '../tabs/SentinelTab';
import PredictivePulse from '../ui/PredictivePulse';
import { runMasterAudit, type AuditOutput } from '../../utils/aiCore';
import { computeHash } from '../../utils/security';
import { downloadOfflineScript } from '../../utils/exportScript';

// ─── Shell Layout ─────────────────────────────────────────────────────────────
const DashboardWrapper = styled.div`
  min-height: 100vh;
  padding: 0 0 40px;
  background: var(--bg-main);
`;

const TopNav = styled.header`
  background: rgba(11, 11, 14, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 32px;
  position: sticky;
  top: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const LogoArea = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 0;
  border-right: 1px solid var(--border-subtle);
  padding-right: 24px;

  span { 
    background: var(--gradient-neon);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const CompanyContext = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
`;

const IndustryBadge = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--accent-cyan);
  background: rgba(6, 182, 212, 0.1);
  border: 1px solid rgba(6, 182, 212, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
  text-transform: uppercase;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const TabButton = styled.button<{ $active: boolean }>`
  background: none;
  border: none;
  padding: 22px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${p => p.$active ? 'var(--text-primary)' : 'var(--text-secondary)'};
  border-bottom: 2px solid ${p => p.$active ? 'var(--accent-purple)' : 'transparent'};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    color: var(--text-primary);
  }
`;

const ExportBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 8px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  margin-right: 16px;

  &:hover {
    background: rgba(6, 182, 212, 0.1);
    border-color: var(--accent-cyan);
    color: var(--accent-cyan);
  }
`;

const ContentContainer = styled.main`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
`;

interface Props {
  companyName: string;
  industry: 'retail' | 'corporate' | null;
}

const Dashboard: React.FC<Props> = ({ companyName, industry }) => {
  const [activeTab, setActiveTab] = React.useState<'analysis' | 'sentinel'>('analysis');
  const [auditData, setAuditData] = React.useState<AuditOutput | null>(null);

  // Triggered when UploadView interior completes
  const handleUploadComplete = async (csvText?: string) => {
    try {
      // Simulate typical 4-second Deep Dive load to look professional, then run AI
      setTimeout(async () => {
        const hash = await computeHash(new Date().toISOString());
        const findings = await runMasterAudit(hash, csvText);
        setAuditData(findings);
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOfflineExport = () => {
    downloadOfflineScript();
  };

  return (
    <DashboardWrapper>
      <TopNav>
        <NavLeft>
          <LogoArea>
            GhostSpend <span>AI</span>
          </LogoArea>
          <CompanyContext>
            <Building2 size={16} />
            {companyName || 'Enterprise Context'}
          </CompanyContext>
          {industry && (
            <IndustryBadge>{industry} ENGINE</IndustryBadge>
          )}
        </NavLeft>

        <NavRight>
          <ExportBtn onClick={handleOfflineExport} title="Download the python script to run local audits without internet">
            <Download size={14} /> Local Auditor Vault
          </ExportBtn>
          <TabButton
            $active={activeTab === 'analysis'}
            onClick={() => setActiveTab('analysis')}
          >
            Upload & Analysis
          </TabButton>
          <TabButton
            $active={activeTab === 'sentinel'}
            onClick={() => setActiveTab('sentinel')}
          >
            <Shield size={16} />
            Sentinel Mode
          </TabButton>
        </NavRight>
      </TopNav>

      {/* The neon pulse header wave */}
      {auditData && <PredictivePulse totalSavings={auditData.total_savings_opportunity} />}

      <ContentContainer>
        {activeTab === 'analysis' && (
          <motion.div
            key="analysis"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <AnalysisTab data={auditData} onUploadStart={handleUploadComplete} />
          </motion.div>
        )}

        {activeTab === 'sentinel' && (
          <motion.div
            key="sentinel"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SentinelTab data={auditData} />
          </motion.div>
        )}
      </ContentContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;
