import React from 'react';
import { motion } from 'framer-motion';
import { ScoreBreakdown as IScoreBreakdown } from '../../types';
import { Sliders, CheckCircle, AlertCircle } from 'lucide-react';

interface ScoreBreakdownProps {
  breakdown: IScoreBreakdown;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ breakdown }) => {
  const safeBreakdown = breakdown || {
    atsCompatibility: 88,
    keywords: 82,
    formatting: 85,
    impactMetrics: 78,
    clarity: 80,
  };

  const metrics = [
    {
      key: 'atsCompatibility',
      label: 'ATS Compatibility',
      value: safeBreakdown.atsCompatibility ?? 88,
      desc: 'Parsable layout, clear contact info, and standard section headers.',
    },
    {
      key: 'keywords',
      label: 'Keywords & Hard Skills',
      value: safeBreakdown.keywords ?? 82,
      desc: 'Alignment with target role industry terminology and core tooling.',
    },
    {
      key: 'formatting',
      label: 'Formatting & Layout',
      value: safeBreakdown.formatting ?? 85,
      desc: 'Typography hierarchy, whitespace consistency, and visual flow.',
    },
    {
      key: 'impactMetrics',
      label: 'Impact & Quantified Metrics',
      value: safeBreakdown.impactMetrics ?? 78,
      desc: 'Presence of numerical results, latency drops, revenue, and scale.',
    },
    {
      key: 'clarity',
      label: 'Clarity & Conciseness',
      value: safeBreakdown.clarity ?? 80,
      desc: 'High-signal verbs without jargon filler or redundant phrases.',
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 h-full flex flex-col justify-between">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[#FF0000]" />
          <h3 className="text-base font-bold font-display text-white">
            Score Breakdown Diagnostics
          </h3>
        </div>
        <span className="text-xs text-gray-400 font-mono">5 Core Dimensions</span>
      </div>

      <div className="space-y-4">
        {metrics.map((m, idx) => (
          <div key={m.key} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-semibold text-gray-200">{m.label}</span>
              <span className="font-mono font-bold text-white flex items-center gap-1.5">
                {m.value}%
                {m.value >= 80 ? (
                  <CheckCircle className="w-3.5 h-3.5 text-[#FF0000]" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5 text-[#FFA8A8]" />
                )}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 rounded-full bg-black/80 border border-[#830000]/40 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#830000] via-[#BC0202] to-[#FF0000] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, m.value))}%` }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: 'easeOut' }}
              />
            </div>

            <p className="text-[11px] text-gray-400">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
