import React from 'react';
import { motion } from 'framer-motion';
import { 
  Gauge, 
  Layers, 
  Sparkles, 
  Milestone, 
  Target, 
  HelpCircle,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export const FeaturesGrid: React.FC = () => {
  const features = [
    {
      title: "Automated ATS Compatibility Score",
      description: "Get an overarching 0-100 score plus granular diagnostics for formatting, keyword presence, ATS parseability, and quantifiable metrics.",
      icon: Gauge,
      badge: "Diagnostic Score",
      details: ["0-100 Radial Gauge", "Keyword Frequency", "Parseability Audit"]
    },
    {
      title: "Target Role Skill Gap Analysis",
      description: "Compare your current skills against high-tier job market expectations. Pinpoint missing libraries, cloud architectures, and methodologies.",
      icon: Layers,
      badge: "Skill Taxonomy",
      details: ["Found vs Missing Chips", "Interactive Competency Radar", "Tech Stack Alignment"]
    },
    {
      title: "Google X-Y-Z Bullet Rewrites",
      description: "Transform passive duty lists into high-impact accomplishment bullets using the Google X-Y-Z formula: Accomplished [X] as measured by [Y] by doing [Z].",
      icon: Sparkles,
      badge: "Actionable Rewrites",
      details: ["Before → After Diff", "1-Click Copy", "Senior Bar Justifications"]
    },
    {
      title: "30 / 60 / 90-Day Career Roadmap",
      description: "Receive a personalized tactical trajectory to close skill gaps, complete recommended real-world projects, and earn high-leverage certifications.",
      icon: Milestone,
      badge: "Action Plan",
      details: ["30-Day Foundation", "60-Day Scaling", "90-Day Market Mastery"]
    },
    {
      title: "Job Description Match Engine",
      description: "Paste a target job opening to compute your match percentage and isolate exact required keywords missing from your resume.",
      icon: Target,
      badge: "Tailored Targeting",
      details: ["Match % Gauge", "Missing Keyword Tags", "Relevancy Summary"]
    },
    {
      title: "8 Tailored Interview Questions",
      description: "Prepare with 8 realistic technical and behavioral interview questions generated directly from the claims and projects in your resume.",
      icon: HelpCircle,
      badge: "Interview Prep",
      details: ["Role-Specific Questions", "Coaching Strategy Tips", "STAR Method Alignment"]
    }
  ];

  return (
    <section id="features" className="relative py-24 border-t border-[#830000]/25 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FFA8A8] bg-[#830000]/20 border border-[#830000]/50 mb-4">
            Engineered For Impact
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            Features Built For Senior Outcomes
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Stop guessing why recruiters aren't calling. Every tool you need to optimize your candidate profile.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-7 rounded-2xl glass-panel border border-[#830000]/40 flex flex-col justify-between hover:border-[#BC0202] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[#830000]/30 border border-[#830000] text-[#FF0000] shadow-red-glow group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#FFA8A8] bg-[#830000]/20 border border-[#830000]/50">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-white mb-2.5 group-hover:text-[#FFA8A8] transition-colors flex items-center justify-between">
                    <span>{feature.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-[#FF0000] transition-colors" />
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#830000]/25 space-y-2">
                  {feature.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FF0000] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
