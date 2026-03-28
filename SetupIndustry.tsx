import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Store, Building2, ChevronRight, Activity, ShieldCheck } from 'lucide-react';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--bg-main);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 60px;
  z-index: 1;

  .subtitle {
    font-family: 'Inter', sans-serif;
    color: var(--accent-cyan);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-size: 0.85rem;
    margin-bottom: 12px;
  }
  
  h2 {
    font-family: 'Outfit', sans-serif;
    font-size: 2.5rem;
    font-weight: 800;
    color: #fff;
  }
`;

const CardsGrid = styled.div`
  display: flex;
  gap: 32px;
  z-index: 1;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const IndustryCard = styled(motion.button)`
  background: rgba(22, 22, 29, 0.8);
  backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-neon);
  border-radius: 20px;
  padding: 40px;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &:hover {
    .icon-wrapper {
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 0 30px var(--accent-cyan);
    }
    .chevron {
      transform: translateX(10px);
      opacity: 1;
    }
  }
`;

const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(6, 182, 212, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-cyan);
  margin-bottom: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(6, 182, 212, 0.2);
`;

const CardTitle = styled.h3`
  font-family: 'Outfit', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
`;

const CardDesc = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 24px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
  width: 100%;

  .feature {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: var(--text-muted);
  }
`;

const ContinueRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: var(--accent-cyan);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  margin-top: auto;
`;

interface Props {
  onSelect: (type: 'retail' | 'corporate') => void;
}

const SetupIndustry: React.FC<Props> = ({ onSelect }) => {
  return (
    <Container>
      <Header>
        <div className="subtitle">Context Configuration</div>
        <h2>Select Operating Environment</h2>
      </Header>

      <CardsGrid>
        <IndustryCard
          whileHover={{ y: -10, borderColor: 'var(--accent-purple)', boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('retail')}
        >
          <IconWrapper className="icon-wrapper" style={{ color: 'var(--accent-purple)', borderColor: 'var(--accent-purple)', background: 'rgba(168,85,247,0.1)' }}>
            <Store size={32} />
          </IconWrapper>
          <CardTitle>Retail / Direct</CardTitle>
          <CardDesc>Optimal for e-commerce, localized vendors, and high-frequency inventory operations.</CardDesc>
          <FeatureList>
            <div className="feature"><Activity size={14} color="var(--accent-purple)"/> Supply Chain Mapping</div>
            <div className="feature"><ShieldCheck size={14} color="var(--accent-purple)"/> Point-of-Sale Log Parsing</div>
          </FeatureList>
          <ContinueRow style={{ color: 'var(--accent-purple)' }}>
            Initialize Schema <ChevronRight size={18} className="chevron" style={{ opacity: 0.5, transition: 'all 0.3s' }} />
          </ContinueRow>
        </IndustryCard>

        <IndustryCard
          whileHover={{ y: -10, borderColor: 'var(--accent-cyan)', boxShadow: '0 20px 40px rgba(6, 182, 212, 0.2)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect('corporate')}
        >
          <IconWrapper className="icon-wrapper">
            <Building2 size={32} />
          </IconWrapper>
          <CardTitle>Corporate Enterprise</CardTitle>
          <CardDesc>Geared for B2B conglomerates, heavy SaaS infrastructure, and complex SLA management.</CardDesc>
          <FeatureList>
            <div className="feature"><Activity size={14} color="var(--accent-cyan)"/> SaaS Zombie Tracker</div>
            <div className="feature"><ShieldCheck size={14} color="var(--accent-cyan)"/> AWS/GCP Billing Validation</div>
          </FeatureList>
          <ContinueRow>
            Initialize Schema <ChevronRight size={18} className="chevron" style={{ opacity: 0.5, transition: 'all 0.3s' }} />
          </ContinueRow>
        </IndustryCard>
      </CardsGrid>
    </Container>
  );
};

export default SetupIndustry;
