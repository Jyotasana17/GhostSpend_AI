import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import type { DailyTrend } from '../../utils/aiCore';

const ChartWrapper = styled.div`
  width: 100%;
  height: 440px;
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  padding: 32px;
  border-radius: 12px;
`;

const CustomTooltipContainer = styled.div`
  background: rgba(11, 11, 14, 0.95);
  border: 1px solid var(--border-neon);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  padding: 16px;
  backdrop-filter: blur(10px);
  min-width: 200px;
`;

const TooltipDate = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 12px;
  border-bottom: 1px solid var(--border-subtle);
  padding-bottom: 8px;
`;

const TooltipRow = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin-top: 6px;

  span:first-child {
    color: var(--text-muted);
  }
`;

const TrendIndicator = styled.div<{ $up: boolean }>`
  display: inline-flex;
  font-weight: 700;
  color: ${p => p.$up ? '#ef4444' : '#22c55e'};
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--border-subtle);
  width: 100%;
  justify-content: center;
  font-size: 0.9rem;
`;

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as DailyTrend;
    const isLeak = data.trend === 'up';

    return (
      <CustomTooltipContainer>
        <TooltipDate>{label}</TooltipDate>
        <TooltipRow><span>High</span> <span>₹{data.high.toLocaleString('en-IN')}</span></TooltipRow>
        <TooltipRow><span>Open</span> <span>₹{data.open.toLocaleString('en-IN')}</span></TooltipRow>
        <TooltipRow><span>Close</span> <span>₹{data.close.toLocaleString('en-IN')}</span></TooltipRow>
        <TooltipRow><span>Low</span> <span>₹{data.low.toLocaleString('en-IN')}</span></TooltipRow>
        
        <TrendIndicator $up={isLeak}>
          {isLeak ? 'Anomaly Surge (+)' : 'Optimization Recovery (-)'}
        </TrendIndicator>
      </CustomTooltipContainer>
    );
  }
  return null;
};

// Custom Candlestick Shape Renderer for Recharts
const CustomCandlestick = (props: any) => {
  const { x, width, payload, yAxis } = props;
  
  if (!yAxis || !yAxis.scale) return null;

  // value is passed as an array [low, high] because of dataKey="candleBounds"
  const yLow = yAxis.scale(payload.low);
  const yHigh = yAxis.scale(payload.high);
  const yOpen = yAxis.scale(payload.open);
  const yClose = yAxis.scale(payload.close);

  const isUp = payload.close > payload.open;
  // Green for Down (Recovery), Red for Up (Leak/Spike) - Standard Stock rules
  const color = isUp ? '#ef4444' : '#22c55e';
  
  const bodyTop = Math.min(yOpen, yClose);
  const bodyBottom = Math.max(yOpen, yClose);
  const bodyHeight = Math.max(bodyBottom - bodyTop, 2); 
  
  const midX = x + width / 2;

  // Adjust coordinates slightly for visual crispness
  return (
    <g>
      {/* Wick */}
      <line 
        x1={midX} y1={yHigh} 
        x2={midX} y2={yLow} 
        stroke={color} 
        strokeWidth={2}
      />
      {/* Body */}
      <rect 
        x={x} 
        y={bodyTop} 
        width={width} 
        height={bodyHeight} 
        fill={isUp ? 'transparent' : color} 
        stroke={color}
        strokeWidth={2}
        rx={1}
        style={{ filter: `drop-shadow(0px 0px 4px ${color}88)` }}
      />
    </g>
  );
};

interface Props {
  data: DailyTrend[];
}

const ObsidianAnalyticsChart: React.FC<Props> = ({ data }) => {
  const [visibleData, setVisibleData] = useState<DailyTrend[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;
    
    setVisibleData([]);
    let currentIdx = 0;
    
    // Animate the streaming of stock candles
    const interval = setInterval(() => {
      if (currentIdx < data.length) {
        setVisibleData(prev => [...prev, data[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [data]);

  const domainParams = React.useMemo(() => {
    if (data.length === 0) return { min: 0, max: 10000 };
    const minLow = Math.min(...data.map(d => d.low));
    const maxHigh = Math.max(...data.map(d => d.high));
    return { 
      min: Math.floor(minLow * 0.95), 
      max: Math.ceil(maxHigh * 1.05) 
    };
  }, [data]);

  // Transform data slightly to include the [low, high] bounds array for the Bar chart anchoring
  const chartData = visibleData.map(d => ({
    ...d,
    candleBounds: [d.low, d.high]
  }));

  return (
    <ChartWrapper>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(dateStr) => {
              const d = new Date(dateStr);
              return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Inter' }}
            dy={10}
            minTickGap={20}
          />
          <YAxis 
            domain={[domainParams.min, domainParams.max]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontFamily: 'Inter' }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(1)}k`}
            dx={-10}
          />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ fill: 'rgba(255,255,255,0.03)' }} 
          />
          
          <Bar 
            dataKey="candleBounds" 
            shape={<CustomCandlestick />}
            isAnimationActive={false} 
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default ObsidianAnalyticsChart;
