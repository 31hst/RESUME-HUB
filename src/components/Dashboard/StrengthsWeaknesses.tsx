import React from 'react';
import { CheckCircle2, AlertTriangle, ThumbsUp, ShieldAlert } from 'lucide-react';

interface StrengthsWeaknessesProps {
  strengths?: string[];
  weaknesses?: string[];
}

export const StrengthsWeaknesses: React.FC<StrengthsWeaknessesProps> = ({
  strengths = [],
  weaknesses = []
}) => {
  const safeStrengths = strengths && strengths.length > 0 ? strengths : [
    "Clean standard section headers compatible with all major ATS parsers.",
    "Clear chronology with verified progression in software engineering roles.",
    "Strong core technical stack presence aligned with modern web standards."
  ];

  const safeWeaknesses = weaknesses && weaknesses.length > 0 ? weaknesses : [
    "Quantified metrics can be sharpened to highlight scale and business impact.",
    "Executive summary could better spotlight domain specialization."
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Strengths Card */}
      <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-[#830000]/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#830000]/30">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Standout Strengths</h3>
              <p className="text-xs text-gray-400">Competitive advantages identified in your background</p>
            </div>
          </div>

          <ul className="space-y-3.5">
            {safeStrengths.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-3 border-t border-[#830000]/25 text-[11px] text-[#FFA8A8] font-medium flex items-center gap-1.5">
          <span>✓ Keep these elements prominent in your headline &amp; interview narrative</span>
        </div>
      </div>

      {/* Weaknesses / Gaps Card */}
      <div className="p-6 sm:p-7 rounded-2xl glass-panel border border-[#830000]/40 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-[#830000]/30">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FFA8A8]">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold font-display text-white">Critical Gaps &amp; Blindspots</h3>
              <p className="text-xs text-gray-400">High-priority elements requiring revision or clarification</p>
            </div>
          </div>

          <ul className="space-y-3.5">
            {safeWeaknesses.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-[#BC0202] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-3 border-t border-[#830000]/25 text-[11px] text-gray-400 font-medium flex items-center gap-1.5">
          <span>⚠ Rectifying these will yield the largest jump in interview invitations</span>
        </div>
      </div>

    </div>
  );
};
