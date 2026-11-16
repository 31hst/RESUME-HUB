import React, { useState } from 'react';
import { SectionFeedback as ISectionFeedback } from '../../types';
import { 
  FileCheck2, 
  User, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  Wrench,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface SectionFeedbackProps {
  sectionFeedback: ISectionFeedback;
}

export const SectionFeedback: React.FC<SectionFeedbackProps> = ({ sectionFeedback }) => {
  const sections = [
    {
      id: 'summary',
      title: 'Professional Summary',
      icon: User,
      feedback: sectionFeedback.summary || 'Summary is well structured. Keep focused on quantified achievements.',
      benchmark: 'Strong Headline • Add Cloud Focus'
    },
    {
      id: 'experience',
      title: 'Work Experience & History',
      icon: Briefcase,
      feedback: sectionFeedback.experience || 'Strong metric density. Ensure business outcomes are clear for senior tiers.',
      benchmark: 'Top Tier • Google X-Y-Z Aligned'
    },
    {
      id: 'projects',
      title: 'Projects & Open Source',
      icon: FolderGit2,
      feedback: sectionFeedback.projects || 'Projects highlight initiative. Include live links, stars, and user counts.',
      benchmark: 'High Signal • Needs Live URLs'
    },
    {
      id: 'skills',
      title: 'Technical Skills Layout',
      icon: Wrench,
      feedback: sectionFeedback.skills || 'Categorization is clean. Incorporate missing cloud infrastructure keywords.',
      benchmark: 'ATS Optimized Category Tree'
    },
    {
      id: 'education',
      title: 'Education & Certifications',
      icon: GraduationCap,
      feedback: sectionFeedback.education || 'Education is succinct and appropriate for experienced engineering levels.',
      benchmark: 'Accredited • Succinct Format'
    },
  ];

  const [activeTab, setActiveTab] = useState(sections[0].id);
  const activeSection = sections.find(s => s.id === activeTab) || sections[0];
  const ActiveIcon = activeSection.icon;

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#830000]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Section-by-Section Forensic Feedback
            </h3>
            <p className="text-xs text-gray-400">
              Granular review of each structural section against recruiting criteria
            </p>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap gap-2 border-b border-[#830000]/30 pb-3">
        {sections.map(section => {
          const Icon = section.icon;
          const isActive = section.id === activeTab;
          return (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#BC0202] to-[#830000] text-white border border-[#FF0000]/50 shadow-red-glow'
                  : 'bg-black/50 text-gray-400 hover:text-white border border-gray-900 hover:border-[#830000]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{section.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Feedback Panel */}
      <div className="p-5 sm:p-6 rounded-xl bg-black/70 border border-[#830000]/40 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-gray-900">
          <div className="flex items-center gap-2">
            <ActiveIcon className="w-4 h-4 text-[#FF0000]" />
            <span className="text-sm font-bold text-white font-display">
              {activeSection.title} Analysis
            </span>
          </div>
          <span className="inline-block text-[11px] font-mono text-[#FFA8A8] bg-[#830000]/25 px-2.5 py-0.5 rounded border border-[#830000]/50">
            {activeSection.benchmark}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
          {activeSection.feedback}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs text-[#FFA8A8]">
          <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
          <span>Recommendations generated with Gemini Career Intelligence</span>
        </div>
      </div>

    </div>
  );
};
