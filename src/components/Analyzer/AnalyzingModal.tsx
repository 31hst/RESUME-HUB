import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2, Loader2, Shield } from 'lucide-react';

interface AnalyzingModalProps {
  isOpen: boolean;
}

const STEPS = [
  { text: "Extracting structural sections & metrics...", duration: 2200 },
  { text: "Executing ATS parser heuristic benchmarks...", duration: 2400 },
  { text: "Evaluating keyword density against target role...", duration: 2600 },
  { text: "Isolating skill gaps & technical competencies...", duration: 2400 },
  { text: "Synthesizing Google X-Y-Z bullet rewrites...", duration: 2500 },
  { text: "Assembling personalized 30/60/90-day career roadmap...", duration: 2500 },
  { text: "Finalizing 8 targeted interview prep questions...", duration: 2500 }
];

export const AnalyzingModal: React.FC<AnalyzingModalProps> = ({ isOpen }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex(prev => (prev < STEPS.length - 1 ? prev + 1 : prev));
    }, 2400);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(Math.round(((currentStepIndex + 1) / STEPS.length) * 100), 96);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md p-8 rounded-2xl glass-panel border border-[#BC0202]/60 shadow-red-glow-lg text-center relative overflow-hidden"
      >
        {/* Glow ambient background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 radial-glow-top pointer-events-none" />

        {/* Radar Spinner Animation */}
        <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border border-[#830000] animate-ping opacity-25" />
          <div className="absolute inset-2 rounded-full border border-[#BC0202]/50 animate-pulse" />
          
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#830000] to-[#BC0202] border border-[#FF0000]/60 shadow-red-glow">
            <Sparkles className="w-8 h-8 text-white animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold font-display text-white mb-2">
          Deconstructing Resume
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          AI CareerLens &amp; ATS Evaluation Engine
        </p>

        {/* Active Step Box */}
        <div className="p-3.5 rounded-xl bg-black/80 border border-[#830000]/50 mb-6 min-h-[58px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2.5 text-xs text-[#FFA8A8] font-medium"
            >
              <Loader2 className="w-4 h-4 text-[#FF0000] animate-spin shrink-0" />
              <span>{STEPS[currentStepIndex].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 mb-6">
          <div className="flex justify-between text-[11px] font-mono text-gray-400">
            <span>Analyzing candidate telemetry</span>
            <span className="text-[#FFA8A8] font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black border border-[#830000]/40 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#830000] via-[#BC0202] to-[#FF0000] rounded-full"
              initial={{ width: '10%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500">
          <Shield className="w-3.5 h-3.5 text-[#830000]" />
          <span>In-session parsing • Zero persistent storage</span>
        </div>

      </motion.div>
    </div>
  );
};
