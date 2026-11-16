import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, AlertTriangle } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({ score }) => {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = Math.min(100, Math.max(0, score));
    if (start === end) {
      setDisplayScore(end);
      return;
    }
    const duration = 1200; // ms
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplayScore(end);
        clearInterval(timer);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [score]);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getTier = (val: number) => {
    if (val >= 85) return { label: 'Elite Tier • Top 10% ATS Candidate', color: '#FF0000', badge: 'Excellent' };
    if (val >= 75) return { label: 'Strong Competitive Match', color: '#BC0202', badge: 'High Potential' };
    if (val >= 60) return { label: 'Moderate Match • Key Gaps Found', color: '#FFA8A8', badge: 'Good' };
    return { label: 'Critical ATS Revisions Needed', color: '#830000', badge: 'Needs Work' };
  };

  const tier = getTier(score);

  return (
    <div className="relative p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background glow behind gauge */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 radial-glow-center pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center gap-2 mb-4">
        <Award className="w-4 h-4 text-[#FF0000]" />
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">
          Overall Resume Score
        </span>
      </div>

      {/* SVG Radial Gauge */}
      <div className="relative w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center my-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 130 130">
          {/* Base track */}
          <circle
            cx="65"
            cy="65"
            r={radius}
            className="stroke-black/80"
            strokeWidth="10"
            fill="transparent"
          />
          {/* Active progress */}
          <motion.circle
            cx="65"
            cy="65"
            r={radius}
            stroke="url(#redScoreGradient)"
            strokeWidth="10"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            strokeLinecap="round"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.45))'
            }}
          />
          <defs>
            <linearGradient id="redScoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#830000" />
              <stop offset="60%" stopColor="#BC0202" />
              <stop offset="100%" stopColor="#FF0000" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Numbers */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl sm:text-6xl font-extrabold font-display text-white tracking-tight">
            {displayScore}
          </span>
          <span className="text-xs font-mono text-gray-400 mt-0.5">out of 100</span>
        </div>
      </div>

      {/* Status Pill */}
      <div className="mt-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#830000]/30 border border-[#BC0202]/40 text-[#FFA8A8]">
          <TrendingUp className="w-3.5 h-3.5 text-[#FF0000]" />
          <span>{tier.label}</span>
        </div>
      </div>

    </div>
  );
};
