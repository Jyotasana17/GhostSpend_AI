import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const scanLine = keyframes`
  0% { top: 0%; opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.02); }
`;

const flicker = keyframes`
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.4; }
  94% { opacity: 1; }
  97% { opacity: 0.7; }
`;

const Wrapper = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: #0B0B0E;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  overflow: hidden;
`;

const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(168, 85, 247, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(168, 85, 247, 0.05) 1px, transparent 1px);
  background-size: 40px 40px;
`;

const ScanWindow = styled.div`
  position: relative;
  width: 320px;
  height: 320px;
  border: 1px solid rgba(6, 182, 212, 0.4);
  border-radius: 16px;
  background: rgba(22, 22, 29, 0.8);
  backdrop-filter: blur(20px);
  overflow: hidden;
  box-shadow: 0 0 60px rgba(6, 182, 212, 0.15), inset 0 0 40px rgba(6, 182, 212, 0.05);
`;

const CornerTL = styled.div`
  position: absolute; top: -1px; left: -1px;
  width: 24px; height: 24px;
  border-top: 2px solid #06B6D4; border-left: 2px solid #06B6D4;
  border-radius: 4px 0 0 0;
`;
const CornerTR = styled.div`
  position: absolute; top: -1px; right: -1px;
  width: 24px; height: 24px;
  border-top: 2px solid #06B6D4; border-right: 2px solid #06B6D4;
  border-radius: 0 4px 0 0;
`;
const CornerBL = styled.div`
  position: absolute; bottom: -1px; left: -1px;
  width: 24px; height: 24px;
  border-bottom: 2px solid #06B6D4; border-left: 2px solid #06B6D4;
  border-radius: 0 0 0 4px;
`;
const CornerBR = styled.div`
  position: absolute; bottom: -1px; right: -1px;
  width: 24px; height: 24px;
  border-bottom: 2px solid #06B6D4; border-right: 2px solid #06B6D4;
  border-radius: 0 0 4px 0;
`;

const LaserLine = styled.div`
  position: absolute;
  left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #06B6D4, #A855F7, #06B6D4, transparent);
  box-shadow: 0 0 12px 4px rgba(6, 182, 212, 0.6);
  animation: ${scanLine} 2.5s ease-in-out infinite;
`;

const ScanPattern = styled.div`
  position: absolute;
  inset: 20px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const ScanRow = styled.div<{ $w?: string; $opacity?: number }>`
  height: 1px;
  width: ${p => p.$w || '100%'};
  background: rgba(6, 182, 212, ${p => p.$opacity || 0.3});
  border-radius: 1px;
`;

const Title = styled.div`
  margin-top: 32px;
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  background: linear-gradient(135deg, #A855F7 0%, #06B6D4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${flicker} 3s ease-in-out infinite;
`;

const SubTitle = styled.div`
  margin-top: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(6, 182, 212, 0.8);
  letter-spacing: 0.25em;
  text-transform: uppercase;
`;

const StatusBar = styled.div`
  margin-top: 20px;
  width: 320px;
  height: 4px;
  background: rgba(168, 85, 247, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const StatusFill = styled(motion.div)`
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, #A855F7, #06B6D4);
  box-shadow: 0 0 12px rgba(6, 182, 212, 0.6);
`;

const StatusText = styled.div`
  margin-top: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  color: rgba(168, 85, 247, 0.7);
  letter-spacing: 0.15em;
`;

interface Props {
  onComplete: () => void;
}

const IntroScreen: React.FC<Props> = ({ onComplete }) => {
  const [progress, setProgress] = React.useState(0);
  const [statusMsg, setStatusMsg] = React.useState('INITIALIZING SECURE CHANNEL...');

  React.useEffect(() => {
    const messages = [
      'INITIALIZING SECURE CHANNEL...',
      'LOADING ENCRYPTION KEYS...',
      'VERIFYING INTEGRITY HASH...',
      'DECRYPTING VAULT DATA...',
      'ACCESS GRANTED',
    ];
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const pct = Math.min(step * 22, 100);
      setProgress(pct);
      setStatusMsg(messages[Math.min(step - 1, messages.length - 1)]);
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(onComplete, 700);
      }
    }, 600);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <Wrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <GridOverlay />
        <ScanWindow>
          <CornerTL /><CornerTR /><CornerBL /><CornerBR />
          <LaserLine />
          <ScanPattern>
            {[100, 80, 90, 60, 100, 70, 85, 55, 95, 65].map((w, i) => (
              <ScanRow key={i} $w={`${w}%`} $opacity={0.2 + (i % 3) * 0.15} />
            ))}
          </ScanPattern>
        </ScanWindow>

        <Title>GHOSTSPEND AI</Title>
        <SubTitle>Secure Vault Access • Enterprise Profit Recovery</SubTitle>

        <StatusBar>
          <StatusFill
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </StatusBar>
        <StatusText>{statusMsg}</StatusText>
      </Wrapper>
    </AnimatePresence>
  );
};

export default IntroScreen;
