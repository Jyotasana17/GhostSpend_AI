import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 40;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const Logo = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LogoApp = styled.span`
  color: #3b82f6;
`;

const Badge = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #1e3a8a;
  background: #dbeafe;
  border-radius: 4px;
  padding: 4px 8px;
  text-transform: uppercase;
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const NavPill = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 500;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '';
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #10b981;
  }
`;

const AlertIndicator = styled.div<{ $active: boolean }>`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: ${p => p.$active ? '#ef4444' : '#64748b'};
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${p => p.$active ? '#ef4444' : '#e2e8f0'};
  }
`;

interface Props {
  totalSavings: number;
}

const PredictivePulse: React.FC<Props> = ({ totalSavings }) => {
  const isAlert = totalSavings > 50000;

  return (
    <HeaderWrapper>
      <HeaderContent>
        <Logo>GhostSpend <LogoApp>AI</LogoApp></Logo>
        <Badge>Sentinel Mode</Badge>
      </HeaderContent>
      <NavRight>
        <AlertIndicator $active={isAlert}>
          {isAlert ? 'High Value Action Pending' : 'Monitoring Operations'}
        </AlertIndicator>
        <NavPill>4 Active Agents</NavPill>
      </NavRight>
    </HeaderWrapper>
  );
};

export default PredictivePulse;
