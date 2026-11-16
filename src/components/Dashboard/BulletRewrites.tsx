import React, { useState } from 'react';
import { BulletRewrite } from '../../types';
import { Sparkles, Copy, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface BulletRewritesProps {
  bulletRewrites: BulletRewrite[];
}

export const BulletRewrites: React.FC<BulletRewritesProps> = ({ bulletRewrites }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#830000]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Executive Bullet Rewrite Engine
            </h3>
            <p className="text-xs text-gray-400">
              Transforming generic duty logs into Google X-Y-Z high-leverage accomplishments
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#FFA8A8] bg-[#830000]/25 px-3 py-1 rounded-full border border-[#830000]/50">
          <Zap className="w-3.5 h-3.5 text-[#FF0000]" />
          <span>Formula: Accomplished [X], measured by [Y], by doing [Z]</span>
        </div>
      </div>

      {/* Rewrites List */}
      <div className="space-y-6">
        {bulletRewrites.map((rewrite, idx) => (
          <div
            key={idx}
            className="p-5 sm:p-6 rounded-xl bg-black/75 border border-[#830000]/40 space-y-4 hover:border-[#BC0202] transition-colors"
          >
            {/* Top row with index & copy */}
            <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-900">
              <span className="font-semibold text-gray-400 font-mono">
                REWRITE #{idx + 1}
              </span>

              <button
                type="button"
                onClick={() => handleCopy(rewrite.after, idx)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#830000]/30 border border-[#BC0202]/60 text-[#FFA8A8] hover:bg-[#BC0202] hover:text-white transition-all shadow-sm"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Enhanced Bullet</span>
                  </>
                )}
              </button>
            </div>

            {/* Before vs After Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Before */}
              <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-600" />
                  Original Resume Bullet
                </span>
                <p className="text-xs sm:text-sm text-gray-400 line-through leading-relaxed">
                  "{rewrite.before}"
                </p>
              </div>

              {/* After */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#830000]/20 to-black border border-[#BC0202]/50 space-y-1.5 shadow-sm">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#FF0000] flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#FF0000]" />
                  Optimized High-Impact Rewrite
                </span>
                <p className="text-xs sm:text-sm text-white font-medium leading-relaxed">
                  "{rewrite.after}"
                </p>
              </div>

            </div>

            {/* Reason */}
            {rewrite.reason && (
              <div className="pt-2 flex items-start gap-2 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-[#FFA8A8] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <span className="font-semibold text-white">Why this wins: </span>
                  {rewrite.reason}
                </p>
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
};
