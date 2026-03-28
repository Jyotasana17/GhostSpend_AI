import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Login from './components/layout/Login';
import SetupIndustry from './components/layout/SetupIndustry';
import SetupCompany from './components/layout/SetupCompany';
import Dashboard from './components/layout/Dashboard';

type Phase = 'login' | 'industry' | 'company' | 'dashboard';

const App: React.FC = () => {
  const [phase, setPhase] = React.useState<Phase>('login');
  const [industry, setIndustry] = React.useState<'retail' | 'corporate' | null>(null);
  const [companyName, setCompanyName] = React.useState('');

  const handleLogin = () => {
    setPhase('industry');
  };

  const handleIndustrySelect = (selection: 'retail' | 'corporate') => {
    setIndustry(selection);
    setPhase('company');
  };

  const handleCompanySubmit = (name: string) => {
    setCompanyName(name);
    setPhase('dashboard');
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Login onLogin={handleLogin} />
          </motion.div>
        )}

        {phase === 'industry' && (
          <SetupIndustry key="industry" onSelect={handleIndustrySelect} />
        )}

        {phase === 'company' && (
          <SetupCompany key="company" onSubmit={handleCompanySubmit} />
        )}

        {phase === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}
          >
            <Dashboard companyName={companyName} industry={industry} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;


