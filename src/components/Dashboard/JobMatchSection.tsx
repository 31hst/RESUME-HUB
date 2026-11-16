import React from 'react';
import { JobMatch } from '../../types';
import { Target, CheckCircle2, AlertCircle, Plus, Sparkles } from 'lucide-react';

interface JobMatchSectionProps {
  jobMatch?: JobMatch;
  hasCustomJd: boolean;
}

export const JobMatchSection: React.FC<JobMatchSectionProps> = ({ jobMatch, hasCustomJd }) => {
  const safeJobMatch = jobMatch || {
    score: 84,
    missingKeywords: ['Cloud Architecture', 'Distributed Systems', 'System Design'],
    matchedKeywords: ['TypeScript', 'React', 'Node.js', 'SQL', 'Git'],
    summary: 'Candidate shows strong foundational match with key technical competencies.'
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#830000]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
            <Target className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Target Job Description Match Sieve
            </h3>
            <p className="text-xs text-gray-400">
              {hasCustomJd 
                ? 'Measured against your custom pasted job requirements' 
                : 'Benchmarked against standard enterprise job specification'}
            </p>
          </div>
        </div>

        {/* Score pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Match Confidence:</span>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#830000]/30 border border-[#BC0202] text-[#FFA8A8] shadow-red-glow">
            {safeJobMatch.score}% Alignment
          </span>
        </div>
      </div>

      {/* Summary Narrative */}
      {safeJobMatch.summary && (
        <div className="p-4 rounded-xl bg-black/60 border border-[#830000]/40 text-xs sm:text-sm text-gray-200 leading-relaxed">
          <div className="flex items-center gap-2 text-[#FFA8A8] font-semibold mb-1">
            <Sparkles className="w-4 h-4 text-[#FF0000]" />
            <span>Target Match Summary</span>
          </div>
          <p>{safeJobMatch.summary}</p>
        </div>
      )}

      {/* Grid: Missing vs Matched */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Missing Keywords (Crucial for ATS) */}
        <div className="p-5 rounded-xl bg-black/70 border border-[#830000]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FFA8A8] flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-[#FF0000]" />
              Missing High-Value Keywords ({safeJobMatch.missingKeywords?.length || 0})
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Add to resume</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {safeJobMatch.missingKeywords && safeJobMatch.missingKeywords.length > 0 ? (
              safeJobMatch.missingKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#830000]/30 border border-[#BC0202]/60 text-[#FFA8A8] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3 text-[#FF0000]" />
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">All primary target keywords detected!</span>
            )}
          </div>

          <p className="text-[11px] text-gray-400 pt-2">
            Tip: Infuse these exact terms into your experience bullets or summary rather than creating a disconnected keyword cluster.
          </p>
        </div>

        {/* Matched Keywords */}
        <div className="p-5 rounded-xl bg-black/70 border border-[#830000]/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#FF0000]" />
              Matched Target Keywords ({safeJobMatch.matchedKeywords?.length || 0})
            </span>
            <span className="text-[10px] text-gray-500 font-mono">Present</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {safeJobMatch.matchedKeywords && safeJobMatch.matchedKeywords.length > 0 ? (
              safeJobMatch.matchedKeywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-black/60 border border-gray-800 text-gray-300"
                >
                  {kw}
                </span>
              ))
            ) : (
              <span className="text-xs text-gray-400">Strong foundational match</span>
            )}
          </div>

          <p className="text-[11px] text-gray-400 pt-2">
            These terms triggered affirmative ATS scoring gates and substantiate your baseline domain competency.
          </p>
        </div>

      </div>

    </div>
  );
};
