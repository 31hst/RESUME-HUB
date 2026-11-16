import React, { useState } from 'react';
import { SuggestedRole, Roadmap, CertificationItem, ProjectIdea } from '../../types';
import { 
  Compass, 
  TrendingUp, 
  Calendar, 
  Award, 
  Code2, 
  CheckCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface CareerAdvisorProps {
  suggestedRoles?: SuggestedRole[];
  roadmap?: Roadmap;
  certifications?: (string | CertificationItem)[];
  projectIdeas?: (string | ProjectIdea)[];
}

export const CareerAdvisor: React.FC<CareerAdvisorProps> = ({
  suggestedRoles = [],
  roadmap = { days30: [], days60: [], days90: [] },
  certifications = [],
  projectIdeas = []
}) => {
  const [activeRoadmapTab, setActiveRoadmapTab] = useState<'days30' | 'days60' | 'days90'>('days30');

  const safeRoadmap = {
    days30: roadmap?.days30 && roadmap.days30.length > 0 ? roadmap.days30 : [
      "Review and refine resume bullets with quantified business metrics.",
      "Conduct keyword alignment against top 5 target job postings.",
      "Publish an updated technical portfolio with architecture diagrams."
    ],
    days60: roadmap?.days60 && roadmap.days60.length > 0 ? roadmap.days60 : [
      "Complete a targeted project demonstrating missing high-demand technologies.",
      "Pursue recognized cloud or architecture credentials.",
      "Engage in structured system design interview simulations."
    ],
    days90: roadmap?.days90 && roadmap.days90.length > 0 ? roadmap.days90 : [
      "Reach out to engineering leaders and recruiters for target team opportunities.",
      "Practice STAR-method responses for behavioral leadership scenarios.",
      "Negotiate senior compensation benchmarks based on validated metrics."
    ]
  };

  const safeSuggestedRoles = suggestedRoles && suggestedRoles.length > 0 ? suggestedRoles : [
    { title: "Senior Full Stack Architect", match: 92, reason: "Aligns with your cross-stack engineering and API design track record." },
    { title: "Lead Systems Engineer", match: 86, reason: "Matches your distributed architecture, caching, and scalability background." },
    { title: "AI Application Specialist", match: 82, reason: "Builds on your modern web engineering and LLM workflow integrations." }
  ];

  const roadmapTabs = [
    { key: 'days30' as const, label: '30 Days: Foundation & ATS Alignment', items: safeRoadmap.days30 },
    { key: 'days60' as const, label: '60 Days: High-Leverage Skills & Credentials', items: safeRoadmap.days60 },
    { key: 'days90' as const, label: '90 Days: Pipeline Execution & Interviews', items: safeRoadmap.days90 },
  ];

  const currentRoadmap = roadmapTabs.find(t => t.key === activeRoadmapTab) || roadmapTabs[0];

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[#830000]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Executive Career Advisor &amp; Growth Trajectory
            </h3>
            <p className="text-xs text-gray-400">
              Personalized roadmap, adjacent role matches, and upskilling milestones
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#830000]/25 text-[#FFA8A8] border border-[#830000]/50">
          3-Month Horizon
        </span>
      </div>

      {/* Suggested Adjacent Roles */}
      <div>
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-[#FF0000]" />
          Top 3 Adjacent High-Match Roles
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {safeSuggestedRoles.map((role, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-black/70 border border-[#830000]/40 flex flex-col justify-between hover:border-[#BC0202] transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono text-gray-500">Tier #{idx + 1}</span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#830000]/30 border border-[#BC0202] text-[#FFA8A8]">
                    {role.match}% Match
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mb-2">{role.title}</h5>
                <p className="text-xs text-gray-400 leading-relaxed">{role.reason}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-900 flex items-center justify-between text-[11px] text-[#FFA8A8]">
                <span>Viable Pivot</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF0000]" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 30/60/90-Day Roadmap */}
      <div className="pt-4 border-t border-[#830000]/30">
        <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#FF0000]" />
          30 / 60 / 90-Day Tactical Upskilling Roadmap
        </h4>

        {/* Roadmap Sub-tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {roadmapTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveRoadmapTab(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeRoadmapTab === tab.key
                  ? 'bg-gradient-to-r from-[#BC0202] to-[#830000] text-white border border-[#FF0000]/50 shadow-red-glow'
                  : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Roadmap Items */}
        <div className="p-5 rounded-xl bg-black/75 border border-[#830000]/40 space-y-3">
          {currentRoadmap.items.map((item, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200">
              <CheckCircle className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
              <p className="leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications & Project Ideas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#830000]/30">
        
        {/* Recommended Certifications */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FF0000]" />
            High-Leverage Certifications
          </h4>

          <div className="space-y-2.5">
            {certifications && certifications.length > 0 ? (
              certifications.map((cert, idx) => {
                const isObj = typeof cert === 'object' && cert !== null;
                const name = isObj ? cert.name : String(cert);
                const provider = isObj ? cert.provider : 'Industry Standard';
                const relevance = isObj ? cert.relevance : 'Directly addresses identified technical gap';

                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-[#830000]/30 space-y-1">
                    <div className="flex items-center justify-between text-xs font-bold text-white">
                      <span>{name}</span>
                      {provider && <span className="text-[10px] text-gray-400 font-mono font-normal">{provider}</span>}
                    </div>
                    {relevance && <p className="text-[11px] text-gray-400">{relevance}</p>}
                  </div>
                );
              })
            ) : (
              <div className="p-3.5 rounded-xl bg-black/60 border border-[#830000]/30 text-xs text-gray-400">
                Prioritize cloud architect or Kubernetes certifications to solidify senior standing.
              </div>
            )}
          </div>
        </div>

        {/* Real-World Project Ideas */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#FF0000]" />
            Portfolio Proof-of-Work Projects
          </h4>

          <div className="space-y-2.5">
            {projectIdeas && projectIdeas.length > 0 ? (
              projectIdeas.map((project, idx) => {
                const isObj = typeof project === 'object' && project !== null;
                const title = isObj ? project.title : String(project);
                const desc = isObj ? project.description : '';
                const stack = isObj ? project.techStack : [];

                return (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/60 border border-[#830000]/30 space-y-2">
                    <span className="text-xs font-bold text-white block">{title}</span>
                    {desc && <p className="text-[11px] text-gray-400 leading-relaxed">{desc}</p>}
                    {stack && stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {stack.map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-black border border-gray-800 text-gray-300">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="p-3.5 rounded-xl bg-black/60 border border-[#830000]/30 text-xs text-gray-400">
                Build an end-to-end distributed system demonstrating async messaging and cloud observability.
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
