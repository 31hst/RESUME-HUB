import React, { useState } from 'react';
import { InterviewQuestion } from '../../types';
import { HelpCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface InterviewPrepProps {
  questions?: (string | InterviewQuestion)[];
}

export const InterviewPrep: React.FC<InterviewPrepProps> = ({ questions = [] }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const safeQuestions = questions && questions.length > 0 ? questions : [
    {
      question: "Walk me through how you benchmarked and optimized web application performance in production.",
      category: "System Performance",
      tip: "Structure your response with the STAR framework: measure Core Web Vitals (LCP/FID/CLS), diagnose bottlenecks, and quantify the throughput increase."
    },
    {
      question: "Describe your strategy for architecting distributed microservices with high availability.",
      category: "System Design",
      tip: "Mention containerization with Docker, ECS/Kubernetes autoscaling, circuit breakers, and rate limiting."
    }
  ];

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#830000]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Tailored Interview Questions &amp; Answer Strategies
            </h3>
            <p className="text-xs text-gray-400">
              Formulated specifically from the accomplishments and architectures cited on your resume
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#830000]/25 text-[#FFA8A8] border border-[#830000]/50">
          {safeQuestions.length} Live Prompts
        </span>
      </div>

      {/* Questions List */}
      <div className="space-y-3.5">
        {safeQuestions.map((item, idx) => {
          const isObj = typeof item === 'object' && item !== null;
          const questionText = isObj ? item.question : String(item);
          const category = isObj ? item.category || 'Technical Evaluation' : 'Technical Evaluation';
          const tip = isObj ? item.tip : 'Use the STAR method: describe the Situation, Task, Action you took, and quantifiable Results.';
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all ${
                isExpanded 
                  ? 'bg-black/90 border-[#BC0202]/70 shadow-red-glow' 
                  : 'bg-black/60 border-[#830000]/40 hover:border-[#830000]'
              }`}
            >
              {/* Question Clickable Header */}
              <button
                type="button"
                onClick={() => toggleExpand(idx)}
                className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#FFA8A8]">
                      Q{idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#830000]/30 text-[#FFA8A8] border border-[#830000]/50">
                      {category}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                    {questionText}
                  </h4>
                </div>

                <div className="p-1 rounded-lg text-gray-400 hover:text-white shrink-0 mt-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[#FF0000]" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Collapsible Answer Coaching Tip */}
              {isExpanded && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 border-t border-gray-900 mt-1">
                  <div className="p-3.5 rounded-lg bg-[#830000]/15 border border-[#BC0202]/30 text-xs text-gray-300 space-y-1.5 mt-3">
                    <div className="flex items-center gap-2 text-[#FFA8A8] font-semibold">
                      <Lightbulb className="w-3.5 h-3.5 text-[#FF0000]" />
                      <span>Expert Strategy &amp; Talking Points</span>
                    </div>
                    <p className="leading-relaxed text-gray-300">{tip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
