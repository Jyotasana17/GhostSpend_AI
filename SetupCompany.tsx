import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Container = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-main);
  padding: 24px;
`;

const Card = styled.div`
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  padding: 48px;
  border-radius: 24px;
  border: 1px solid var(--border-neon);
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
  width: 100%;
  max-width: 480px;
`;

const Title = styled.h2`
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 8px;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 32px;
  line-height: 1.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: var(--text-primary);
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  transition: all 0.2s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    outline: none;
    border-color: var(--accent-cyan);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 14px;
  background: var(--gradient-neon);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(168, 85, 247, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(168, 85, 247, 0.4);
  }

  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: var(--text-muted);
    box-shadow: none;
    cursor: not-allowed;
  }
`;

interface Props {
  onSubmit: (companyName: string) => void;
}

const SetupCompany: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <Container
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <Title>Register Organization</Title>
        <Subtitle>
          What is the official name of the company you are analyzing today?
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              type="text"
              placeholder="e.g. Acme Corp..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </InputGroup>

          <SubmitButton type="submit" disabled={!name.trim()}>
            Initialize Audit Engine
            <ArrowRight size={18} />
          </SubmitButton>
        </Form>
      </Card>
    </Container>
  );
};

export default SetupCompany;
