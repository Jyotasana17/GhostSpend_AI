import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { Shield, Zap, Lock, Server, Target, Building2, Sparkles, TrendingUp, Globe, Brain, ChevronDown, Check } from 'lucide-react';

// ─── Animations ───────────────────────────────────────────────────────────────
const scanLine = keyframes`
  0% { top: 0%; opacity: 1; }
  70% { opacity: 1; }
  100% { top: 100%; opacity: 0; }
`;

const radarPing = keyframes`
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const borderTrace = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const gridFade = keyframes`
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.1; }
`;

const marquee = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const shimmer = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 20px rgba(168,85,247,0.5), 0 0 40px rgba(6,182,212,0.3); }
  50% { text-shadow: 0 0 40px rgba(168,85,247,0.9), 0 0 80px rgba(6,182,212,0.6); }
`;

const dataFlow = keyframes`
  0% { stroke-dashoffset: 1000; opacity: 0; }
  20% { opacity: 0.5; }
  80% { opacity: 0.5; }
  100% { stroke-dashoffset: 0; opacity: 0; }
`;

const pulseTag = keyframes`
  0%, 100% { opacity: 0.2; transform: translateY(0); }
  50% { opacity: 0.4; transform: translateY(-10px); }
`;

// ─── Page Layout ─────────────────────────────────────────────────────────────
const PageWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background: #080810;
  overflow-x: hidden;
  position: relative;

  /* Perspective grid */
  &::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image:
      linear-gradient(rgba(168, 85, 247, 0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(168, 85, 247, 0.06) 1px, transparent 1px),
      linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
    background-size: 80px 80px, 80px 80px, 20px 20px, 20px 20px;
    animation: ${gridFade} 4s ease-in-out infinite;
    pointer-events: none;
    z-index: 0;
  }

  /* Radial spotlight */
  &::after {
    content: '';
    position: fixed;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 600px;
    background: radial-gradient(ellipse at 50% 40%, rgba(168, 85, 247, 0.12) 0%, rgba(6, 182, 212, 0.06) 40%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }
`;

const TopNav = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 100;
`;

const NavLoginBtn = styled(motion.button)`
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(168, 85, 247, 0.3);
  padding: 10px 24px;
  border-radius: 100px;
  color: #fff;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s;

  &:hover {
    background: rgba(168, 85, 247, 0.1);
    box-shadow: 0 0 15px rgba(168, 85, 247, 0.3);
  }
`;

// ─── Hero Section ─────────────────────────────────────────────────────────────
const HeroSection = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 24px 60px;
  position: relative;
  z-index: 1;
  text-align: center;
`;

// ─── Floating Background Nodes ──────────────────────────────────────────────
const NodeContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`;

const Node = styled(motion.div)<{ $top: string; $left: string; $size: string }>`
  position: absolute;
  top: ${p => p.$top};
  left: ${p => p.$left};
  width: ${p => p.$size};
  height: ${p => p.$size};
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 75%);
  border: 1px solid rgba(168, 85, 247, 0.05);
  filter: blur(40px);
`;

const GhostDataStream = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.4;

  path {
    fill: none;
    stroke: url(#streamGradient);
    stroke-width: 1;
    stroke-dasharray: 500;
    animation: ${dataFlow} 20s linear infinite;
  }
`;

const FloatingTag = styled(motion.div)<{ $top: string; $left: string }>`
  position: absolute;
  top: ${p => p.$top};
  left: ${p => p.$left};
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  pointer-events: none;
  animation: ${pulseTag} 6s ease-in-out infinite;
  z-index: 0;
  display: flex;
  align-items: center;
  gap: 6px;

  .point { width: 4px; height: 4px; border-radius: 50%; background: #A855F7; }
`;

// ─── Login Modal ─────────────────────────────────────────────────────────────
const LoginOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(25px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`;

const LoginBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 440px;
  text-align: center;
  position: relative;
`;

const ModalClose = styled.button`
  position: absolute;
  top: 24px; right: 24px;
  background: none; border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  &:hover { color: #fff; }
`;

const LoginTitle = styled.h2`
  font-family: 'Outfit';
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 12px;
`;

const LoginSubtitle = styled.p`
  font-family: 'Inter';
  font-size: 0.95rem;
  color: rgba(255,255,255,0.45);
  margin-bottom: 40px;
`;

const LoginOption = styled(motion.button)`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.02);
  color: #fff;
  font-family: 'Outfit';
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: all 0.3s;

  &:hover {
    background: rgba(255,255,255,0.06);
    border-color: rgba(168, 85, 247, 0.4);
  }
`;

const GoogleLogo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

// ─── Trust Bar ──────────────────────────────────────────────────────────────
const TrustMarquee = styled.div`
  width: 100%;
  padding: 40px 0;
  border-top: 1px solid rgba(255,255,255,0.03);
  overflow: hidden;
  background: rgba(0,0,0,0.2);
  display: flex;
  position: relative;
  z-index: 1;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0; width: 150px;
    z-index: 2;
  }
  &::before { left: 0; background: linear-gradient(90deg, #080810, transparent); }
  &::after { right: 0; background: linear-gradient(-90deg, #080810, transparent); }
`;

const MarqueeTrack = styled.div`
  display: flex;
  gap: 80px;
  animation: ${marquee} 40s linear infinite;
  white-space: nowrap;
`;

const TrustLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Outfit';
  font-size: 1.1rem;
  font-weight: 700;
  color: rgba(255,255,255,0.15);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  svg { opacity: 0.3; }
`;

// ─── Flow Steps ───────────────────────────────────────────────────────────────
const FlowRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0;
  max-width: 950px;
  margin: 0 auto 100px;
  position: relative;
  z-index: 2;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const FlowStep = styled(motion.div)`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 24px;
  position: relative;

  &:not(:last-child)::after {
    content: '→';
    position: absolute;
    right: -10px;
    top: 20px;
    color: rgba(168,85,247,0.4);
    font-size: 1.5rem;
    font-family: 'Outfit';
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const FlowNum = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #A855F7 0%, #06B6D4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Outfit';
  font-size: 1.2rem;
  font-weight: 800;
  color: #000;
  margin-bottom: 16px;
  box-shadow: 0 10px 20px rgba(168,85,247,0.25);
`;

const FlowLabel = styled.div`
  font-family: 'Outfit';
  font-size: 0.95rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 6px;
`;

const FlowDesc = styled.div`
  font-family: 'Inter';
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.5;
`;

// ─── Comparison Grid ────────────────────────────────────────────────────────
const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
`;

const ComparisonCard = styled.div<{ $pro: boolean }>`
  background: ${p => p.$pro ? 'rgba(6, 182, 212, 0.03)' : 'rgba(255,255,255,0.01)'};
  border: 1px solid ${p => p.$pro ? 'rgba(6,182,212,0.2)' : 'rgba(255,255,255,0.05)'};
  border-radius: 16px;
  padding: 32px;
  text-align: left;

  h4 { font-family: 'Outfit'; font-size: 1.2rem; color: #fff; margin-bottom: 20px; }
  ul { list-style: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
  li { display: flex; align-items: center; gap: 10px; font-family: 'Inter'; font-size: 0.9rem; color: var(--text-secondary); }
`;

// Floating logo orb
const LogoOrb = styled(motion.div)`
  width: 100px;
  height: 100px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(168,85,247,0.2), rgba(6,182,212,0.2));
  border: 1px solid rgba(168, 85, 247, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  animation: ${floatY} 4s ease-in-out infinite;
  box-shadow: 0 0 40px rgba(168,85,247,0.3), inset 0 0 30px rgba(6,182,212,0.1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 30px;
    background: linear-gradient(135deg, #A855F7, #06B6D4, #A855F7);
    background-size: 200% auto;
    animation: ${borderTrace} 3s linear infinite;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    padding: 2px;
  }
`;

const LiveBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.2);
  border-radius: 100px;
  font-family: 'Inter', sans-serif;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #A855F7;
  margin-bottom: 24px;

  .dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #A855F7;
    box-shadow: 0 0 6px #A855F7;
    animation: ${radarPing} 1.5s infinite;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-family: 'Outfit', sans-serif;
  font-size: clamp(3rem, 7.5vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  color: #fff;
  margin-bottom: 4px;
  letter-spacing: -0.05em;
`;

const HeroGradientText = styled.div`
  font-family: 'Outfit', sans-serif;
  font-size: clamp(3rem, 7.5vw, 5.5rem);
  font-weight: 900;
  line-height: 0.95;
  letter-spacing: -0.05em;
  background: linear-gradient(135deg, #A855F7 0%, #06B6D4 50%, #A855F7 100%);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 4s linear infinite, ${glow} 3s ease-in-out infinite;
  margin-bottom: 32px;
`;

const HeroDesc = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: rgba(255,255,255,0.6);
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto 48px;
  letter-spacing: -0.01em;
`;

// ─── Unique CTA Button ────────────────────────────────────────────────────────
const CTAWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
`;

const ScanButton = styled(motion.button)`
  position: relative;
  padding: 22px 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  color: #000;
  border-radius: 16px;
  overflow: hidden;
  letter-spacing: 0.02em;

  /* Gradient background */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #A855F7 0%, #06B6D4 100%);
    border-radius: 16px;
    z-index: 0;
    transition: opacity 0.3s;
  }

  /* Scanner sweep */
  &::after {
    content: '';
    position: absolute;
    left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
    animation: ${scanLine} 2s ease-in-out infinite;
    z-index: 2;
  }

  span {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &:hover::before {
    opacity: 0.85;
  }
`;

const RadarRing = styled.div`
  position: absolute;
  inset: -1px;
  border-radius: 16px;
  border: 2px solid rgba(255,255,255,0.6);
  animation: ${radarPing} 2s ease-out infinite;
`;

const MicroCopy = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.3);
  margin-top: 8px;

  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

// Redundant block removed to resolve duplication errors.


// ─── Scroll Indicator ────────────────────────────────────────────────────────
const ScrollCue = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-family: 'Inter';
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
`;

// ─── Stats Bar ────────────────────────────────────────────────────────────────
const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0;
  background: rgba(255,255,255,0.02);
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: relative;
  z-index: 1;
`;

const StatItem = styled.div`
  flex: 1;
  max-width: 260px;
  padding: 40px 20px;
  text-align: center;
  border-right: 1px solid rgba(255,255,255,0.05);

  &:last-child { border-right: none; }

  h3 {
    font-family: 'Outfit';
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #A855F7, #06B6D4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 4px;
  }

  p {
    font-family: 'Inter';
    font-size: 0.85rem;
    color: rgba(255,255,255,0.4);
  }
`;

// ─── Section Component ────────────────────────────────────────────────────────
const Section = styled.div`
  position: relative;
  z-index: 1;
  padding: 100px 80px;
  max-width: 1300px;
  margin: 0 auto;

  @media (max-width: 768px) { padding: 60px 24px; }
`;

const SectionLabel = styled.div`
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent-cyan);
  margin-bottom: 12px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'Outfit', sans-serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
`;

const SectionDesc = styled.p`
  text-align: center;
  font-family: 'Inter';
  color: rgba(255,255,255,0.45);
  font-size: 1.05rem;
  max-width: 600px;
  margin: 0 auto 64px;
  line-height: 1.6;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(168,85,247,0.25), rgba(6,182,212,0.25), transparent);
  position: relative;
  z-index: 1;
`;

// ─── Why Us Cards ─────────────────────────────────────────────────────────────
const WhyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
`;

const WhyCard = styled(motion.div)<{ $accent: string }>`
  background: linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 20px;
  padding: 36px;
  cursor: default;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${p => p.$accent}40;
    &::before { opacity: 1; }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: ${p => p.$accent};
    opacity: 0;
    transition: opacity 0.3s;
  }
`;

const WhyIcon = styled.div<{ $c: string }>`
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: ${p => p.$c}14;
  border: 1px solid ${p => p.$c}30;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => p.$c};
  margin-bottom: 20px;
`;

const WhyTitle = styled.h3`
  font-family: 'Outfit';
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
`;

const WhyDesc = styled.p`
  font-family: 'Inter';
  font-size: 0.88rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.65;
  margin-bottom: 16px;
`;

const VsTag = styled.span<{ $c: string }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: 'Inter';
  font-size: 0.72rem;
  font-weight: 700;
  background: ${p => p.$c}12;
  color: ${p => p.$c};
  border: 1px solid ${p => p.$c}25;
`;

// ─── Future Cards ────────────────────────────────────────────────────────────
const FutureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
`;

const FutureCard = styled(motion.div)`
  background: rgba(255,255,255,0.02);
  border: 1px dashed rgba(168,85,247,0.2);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s, background 0.3s;

  &:hover {
    border-color: rgba(168,85,247,0.5);
    background: rgba(168,85,247,0.04);
  }
`;

const PillBadge = styled.div`
  position: absolute;
  top: 16px; right: 16px;
  font-family: 'Inter';
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #A855F7;
  background: rgba(168,85,247,0.1);
  border: 1px solid rgba(168,85,247,0.2);
  padding: 3px 10px;
  border-radius: 100px;
`;

const FutureIcon = styled.div<{ $c: string }>`
  color: ${p => p.$c};
  margin-bottom: 16px;
`;

const FutureTitle = styled.h4`
  font-family: 'Outfit';
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
`;

const FutureDesc = styled.p`
  font-family: 'Inter';
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  line-height: 1.55;
`;

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 48px 24px;
  border-top: 1px solid rgba(255,255,255,0.04);
  font-family: 'Inter';
  font-size: 0.85rem;
  color: rgba(255,255,255,0.2);

  strong {
    display: block;
    font-family: 'Outfit';
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(255,255,255,0.6);
    margin-bottom: 8px;
  }
`;

interface Props {
  onLogin: () => void;
}

const Login: React.FC<Props> = ({ onLogin }) => {
  const [showModal, setShowModal] = React.useState(false);

  const handleAuth = () => {
    setShowModal(false);
    onLogin();
  };

  return (
    <PageWrapper>
      <TopNav>
        <NavLoginBtn onClick={() => setShowModal(true)} whileTap={{ scale: 0.95 }}>
          <Lock size={14} /> Portal Login
        </NavLoginBtn>
      </TopNav>

      <NodeContainer>
        <Node $top="5%" $left="10%" $size="500px" animate={{ y: [0, 80, 0] }} transition={{ repeat: Infinity, duration: 15 }} />
        <Node $top="45%" $left="75%" $size="450px" animate={{ y: [0, -70, 0] }} transition={{ repeat: Infinity, duration: 12 }} />
        <Node $top="25%" $left="35%" $size="700px" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 18 }} />
        <Node $top="80%" $left="20%" $size="400px" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 10 }} />
        
        <GhostDataStream viewBox="0 0 1000 1000">
          <defs>
            <linearGradient id="streamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#A855F7" stopOpacity="0.2" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path d="M -100 200 Q 250 100 500 500 T 1100 800" />
          <path d="M -100 800 Q 400 900 600 400 T 1100 200" style={{ animationDelay: '-5s' }} />
          <path d="M 200 -100 Q 100 400 500 500 T 800 1100" style={{ animationDelay: '-10s' }} />
        </GhostDataStream>

        <FloatingTag $top="15%" $left="15%" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <div className="point" /> SLA_GUARD: ENGAGED
        </FloatingTag>
        <FloatingTag $top="25%" $left="82%" style={{ animationDelay: '-1s' }}>
          <div className="point" style={{ background: '#06B6D4' }} /> AUTO_AUDIT: ACTIVE
        </FloatingTag>
        <FloatingTag $top="72%" $left="8%" style={{ animationDelay: '-3s' }}>
          <div className="point" /> RECOVERY_SENTINEL: ON
        </FloatingTag>
        <FloatingTag $top="85%" $left="88%" style={{ animationDelay: '-4s' }}>
          <div className="point" style={{ background: '#06B6D4' }} /> DATA_VAULT: SECURED
        </FloatingTag>
      </NodeContainer>

      {/* ── LOGIN MODAL ──────────────────────────────────────────────── */}
      {showModal && (
        <LoginOverlay 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          onClick={() => setShowModal(false)}
        >
          <LoginBox 
            initial={{ scale: 0.9, y: 20 }} 
            animate={{ scale: 1, y: 0 }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <ModalClose onClick={() => setShowModal(false)}>✕</ModalClose>
            <LoginTitle>Access Profit Vault</LoginTitle>
            <LoginSubtitle>Secure session authorization required.</LoginSubtitle>
            
            <LoginOption onClick={handleAuth} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <GoogleLogo /> Continue with Google
            </LoginOption>
            <LoginOption onClick={handleAuth} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Building2 size={20} color="#06B6D4" /> Enterprise SSO
            </LoginOption>
            
            <div style={{ marginTop: '24px', fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)' }}>
              By continuing, you agree to GhostSpend's Zero-Knowledge Privacy Policy.
            </div>
          </LoginBox>
        </LoginOverlay>
      )}

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <HeroSection>
        <LogoOrb initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          <Shield size={44} color="#A855F7" />
        </LogoOrb>

        <LiveBadge initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="dot" /> Autonomous Intelligence · Active
        </LiveBadge>

        <HeroTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          The Money Leak
        </HeroTitle>
        <HeroGradientText>Stops Here.</HeroGradientText>

        <HeroDesc initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          GhostSpend AI is an autonomous enterprise cost-recovery engine. Upload your operations data — our 4-agent LLM swarm decodes hidden leaks and recovers capital automatically.
        </HeroDesc>

        <CTAWrapper>
          <ScanButton onClick={() => setShowModal(true)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <RadarRing />
            <span>
              <Lock size={20} />
              Initialize Recovery Engine
            </span>
          </ScanButton>

          <MicroCopy>
            <span><Check size={11} /> No credit card required</span>
            <span><Check size={11} /> PII scrubbed locally</span>
            <span><Check size={11} /> 60s Global Audit</span>
          </MicroCopy>
        </CTAWrapper>



        {/* Flow Steps */}
        <FlowRow>
          {[
            { n: '1', label: 'Ingest', desc: 'Drop your CSV' },
            { n: '2', label: 'Scrub', desc: 'PII stripped locally' },
            { n: '3', label: 'Hunt', desc: '4 AI Agents activate' },
            { n: '4', label: 'Clawback', desc: 'Recover capital' },
          ].map((s, i) => (
            <FlowStep key={s.n} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1 }}>
              <FlowNum>{s.n}</FlowNum>
              <FlowLabel>{s.label}</FlowLabel>
              <FlowDesc>{s.desc}</FlowDesc>
            </FlowStep>
          ))}
        </FlowRow>

        <ScrollCue animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <span>Explore Ecosystem</span>
          <ChevronDown size={16} />
        </ScrollCue>
      </HeroSection>

      {/* ── TRUST BAR ───────────────────────────────────────────────── */}
      <TrustMarquee>
        <MarqueeTrack>
          {[1,2,3].map(i => (
            <React.Fragment key={i}>
              <TrustLogo><Building2 size={24} /> Nexus Corp</TrustLogo>
              <TrustLogo><Server size={24} /> Global Logic</TrustLogo>
              <TrustLogo><Target size={24} /> FinStream</TrustLogo>
              <TrustLogo><Shield size={24} /> SecureNode</TrustLogo>
              <TrustLogo><Zap size={24} /> Electro-Bank</TrustLogo>
            </React.Fragment>
          ))}
        </MarqueeTrack>
      </TrustMarquee>

      {/* ── STATS ───────────────────────────────────────────────────── */}
      <StatsBar>
        {[
          { val: '4', label: 'Specialized AI Agents' },
          { val: '98%', label: 'Leak Detection Accuracy' },
          { val: '₹0', label: 'Data Leaves Your Browser' },
          { val: '<60s', label: 'Time to First Insight' },
        ].map(s => (
          <StatItem key={s.val}><h3>{s.val}</h3><p>{s.label}</p></StatItem>
        ))}
      </StatsBar>

      <Divider />

      {/* ── COMPARISON ──────────────────────────────────────────────── */}
      <Section>
        <SectionLabel>The Sentinel Difference</SectionLabel>
        <SectionTitle>GhostSpend vs. The Status Quo</SectionTitle>
        <SectionDesc>Old auditing firms take weeks. Static dashboards take hours of your time. GhostSpend takes 60 seconds of your attention.</SectionDesc>
        
        <ComparisonGrid>
          <ComparisonCard $pro={false}>
            <h4>Legacy Auditing</h4>
            <ul>
              <li><span style={{color: '#ef4444'}}>✕</span> 6-week manual data ingestion</li>
              <li><span style={{color: '#ef4444'}}>✕</span> PII data exits your perimeter</li>
              <li><span style={{color: '#ef4444'}}>✕</span> Static spreadsheet reports</li>
              <li><span style={{color: '#ef4444'}}>✕</span> 30% recovery commission fees</li>
            </ul>
          </ComparisonCard>
          <ComparisonCard $pro={true}>
            <h4>GhostSpend AI</h4>
            <ul>
              <li><span style={{color: '#22c55e'}}>✓</span> 60-second Agentic Scanning</li>
              <li><span style={{color: '#22c55e'}}>✓</span> Zero-Knowledge (PII stays local)</li>
              <li><span style={{color: '#22c55e'}}>✓</span> Interactive OHLC Financial Charts</li>
              <li><span style={{color: '#22c55e'}}>✓</span> Flat SaaS Pricing — Keep your savings</li>
            </ul>
          </ComparisonCard>
        </ComparisonGrid>
      </Section>

      <Divider />

      {/* ── WHY US ──────────────────────────────────────────────────── */}
      <Section>
        <SectionLabel>Competitive Edge</SectionLabel>
        <SectionTitle>Why GhostSpend Wins</SectionTitle>
        <SectionDesc>Traditional audit tools give you a spreadsheet. We give you an autonomous recovery engine that works while you sleep.</SectionDesc>

        <WhyGrid>
          {[
            { icon: <Target size={22} />, c: '#06B6D4', title: 'Autonomous 4-Agent Swarm', desc: 'No dashboard tells you to "check" costs. Our swarm proactively hunts across Spend, SLA, Resources, and FinOps simultaneously — like 4 expert analysts on 24/7 duty.', vs: 'vs. Static Dashboards' },
            { icon: <Lock size={22} />, c: '#A855F7', title: 'Zero-Knowledge Data Vault', desc: 'Competitors send your raw financial data to their servers. We PII-scrub everything in-browser with a cryptographic audit trail — GDPR & SOC2 compliant by default.', vs: 'vs. Cloud-First Competitors' },
            { icon: <Sparkles size={22} />, c: '#10B981', title: 'Sentinel Negotiation Engine', desc: 'Finding leaks isn\'t enough. The Sentinel auto-generates legally defensible vendor penalty notices, breach letters, and cancellation drafts. Recovery is automated.', vs: 'vs. Manual Audit Firms' },
            { icon: <TrendingUp size={22} />, c: '#F59E0B', title: 'OHLC Candlestick Analytics', desc: 'The only cost-intelligence platform using financial candlestick charting to visualize daily operational variance — the same technique used by Wall Street.', vs: 'vs. Basic Bar Charts' },
            { icon: <Server size={22} />, c: '#EC4899', title: 'Offline-Ready Architecture', desc: 'Export a Python-based local auditor script that works with zero internet on air-gapped enterprise environments — critical for defense, banking, and government.', vs: 'vs. SaaS-Only Platforms' },
            { icon: <Brain size={22} />, c: '#8B5CF6', title: 'Groq-Powered Speed', desc: 'Powered by the world\'s fastest LLM inference engine (Groq), our agents produce full cost audit reports in under 60 seconds — not hours like consulting engagements.', vs: 'vs. Consulting Firms' },
          ].map((w, i) => (
            <WhyCard key={w.title} $accent={w.c} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <WhyIcon $c={w.c}>{w.icon}</WhyIcon>
              <WhyTitle>{w.title}</WhyTitle>
              <WhyDesc>{w.desc}</WhyDesc>
              <VsTag $c={w.c}><Zap size={10} /> {w.vs}</VsTag>
            </WhyCard>
          ))}
        </WhyGrid>
      </Section>

      <Divider />

      {/* ── FUTURE SCOPE ──────────────────────────────────────────────── */}
      <Section>
        <SectionLabel>Roadmap 2026</SectionLabel>
        <SectionTitle>Where We're Headed</SectionTitle>
        <SectionDesc>GhostSpend AI is growing into a full Enterprise Profit Operating System. Here's what's next on the horizon.</SectionDesc>

        <FutureGrid>
          {[
            { icon: <Globe size={26} />, c: '#A855F7', title: 'Multi-ERP Integration', desc: 'Direct API connectors to SAP, Oracle NetSuite, QuickBooks, and Tally — pulling live financial data without needing a CSV upload.' },
            { icon: <Brain size={26} />, c: '#06B6D4', title: 'Predictive Leak Forecasting', desc: 'A time-series LSTM model that predicts which vendor contracts will breach SLA in the next 90 days — before it happens.' },
            { icon: <Building2 size={26} />, c: '#10B981', title: 'Procurement Autopilot', desc: 'An AI agent that autonomously renegotiates vendor contracts, submits RFQs, and benchmarks pricing against live market rates.' },
            { icon: <Zap size={26} />, c: '#F59E0B', title: 'Real-time Slack Alerts', desc: 'Instant push notifications to Slack, MS Teams, or WhatsApp the moment the Sentinel detects a new cost spike or SLA breach.' },
            { icon: <TrendingUp size={26} />, c: '#EC4899', title: 'Blockchain Audit Ledger', desc: 'Immutable, tamper-proof audit trails on a permissioned blockchain — legally defensible evidence for every automated financial decision.' },
            { icon: <Sparkles size={26} />, c: '#8B5CF6', title: 'GhostScore™ Benchmarking', desc: 'Compare your spend efficiency anonymously against 10,000+ businesses in your industry and receive a proprietary GhostScore™ ranking.' },
          ].map((f, i) => (
            <FutureCard key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <PillBadge>UPCOMING</PillBadge>
              <FutureIcon $c={f.c}>{f.icon}</FutureIcon>
              <FutureTitle>{f.title}</FutureTitle>
              <FutureDesc>{f.desc}</FutureDesc>
            </FutureCard>
          ))}
        </FutureGrid>
      </Section>

      <Footer>
        <strong>GhostSpend AI</strong>
        © 2026 · Enterprise Profit Recovery Platform · Zero-Knowledge Architecture · Groq LLM Intelligence
      </Footer>

    </PageWrapper>
  );
};

export default Login;
