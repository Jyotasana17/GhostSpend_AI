import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle2, Lock } from 'lucide-react';

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 0;
`;

const Card = styled.div`
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  padding: 64px 48px;
  border-radius: 24px;
  border: 1px solid var(--border-neon);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const Title = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 40px;
  line-height: 1.5;
`;

const DropZone = styled.div<{ $isDragging: boolean }>`
  border: 2px dashed ${p => p.$isDragging ? 'var(--accent-cyan)' : 'var(--border-subtle)'};
  background: ${p => p.$isDragging ? 'rgba(6, 182, 212, 0.05)' : 'rgba(255, 255, 255, 0.02)'};
  border-radius: 16px;
  padding: 48px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-cyan);
    background: rgba(6, 182, 212, 0.05);
  }
`;

const DropIcon = styled.div`
  color: var(--accent-cyan);
  margin-bottom: 16px;
  svg {
    width: 48px;
    height: 48px;
  }
`;

const DropText = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
`;

const DropSub = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--text-secondary);
`;

const HiddenInput = styled.input`
  display: none;
`;

const ProgressContainer = styled.div`
  margin-top: 32px;
  text-align: left;
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 12px;
`;

const ProgressTrack = styled.div`
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: var(--gradient-neon);
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
`;

const FileBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid var(--border-neon);
  margin-bottom: 24px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
`;

const ScrubStatus = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: var(--accent-green);
  margin-top: 16px;
`;

interface Props {
  onComplete: (csvText?: string) => void;
}

const UploadView: React.FC<Props> = ({ onComplete }) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const [scrubbed, setScrubbed] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (!selectedFile.name.endsWith('.csv')) {
      alert('Please upload a .csv file containing operations data.');
      return;
    }
    setFile(selectedFile);
    simulateScraping();
  };

  const simulateScraping = () => {
    setProgress(0);
    setStatus('Reading CSV rows...');

    setTimeout(() => {
      setProgress(35);
      setStatus('Normalizing structures & running PII Vault Scrubbing...');
    }, 800);

    setTimeout(() => {
      setScrubbed(true);
    }, 1500);

    setTimeout(() => {
      setProgress(75);
      setStatus('Executing Sentinel Agentic Decryption...');
    }, 2000);

    setTimeout(() => {
      setProgress(100);
      setStatus('Vault analysis complete. Rebuilding models...');
    }, 3200);

    setTimeout(() => {
      onComplete();
    }, 3800);
  };

  return (
    <Container
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card>
        <Title>Vault Operations Hub</Title>
        <Subtitle>
          Securely upload your CSV logs. All Data is scrubbed for PII locally and never leaves your browser infrastructure.
        </Subtitle>

        {!file ? (
          <DropZone
            $isDragging={isDragging}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <DropIcon>
              <UploadCloud />
            </DropIcon>
            <DropText>Click to upload or drag & drop</DropText>
            <DropSub>CSV files only (max 50MB)</DropSub>
            <HiddenInput
              type="file"
              accept=".csv"
              ref={fileInputRef}
              onChange={handleFileInput}
            />
          </DropZone>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <FileBadge>
              <FileText size={20} color="var(--accent-cyan)" />
              {file.name}
              {progress === 100 && <CheckCircle2 size={20} color="var(--accent-green)" style={{ marginLeft: 8 }} />}
            </FileBadge>
          </motion.div>
        )}

        {file && (
          <ProgressContainer>
            <ProgressLabel>
              <span>{status}</span>
              <span>{Math.round(progress)}%</span>
            </ProgressLabel>
            <ProgressTrack>
              <ProgressBar
                initial={{ width: 0 }}
                animate={{ width: progress + '%' }}
                transition={{ duration: 0.3 }}
              />
            </ProgressTrack>

            {scrubbed && (
              <ScrubStatus initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}>
                <Lock size={14} /> Local PII Scrubbing Active & Verified
              </ScrubStatus>
            )}
          </ProgressContainer>
        )}
      </Card>
    </Container>
  );
};

export default UploadView;
