import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, CheckCircle2, ShieldCheck, Zap, Sparkles, TrendingUp, Cpu, Users } from 'lucide-react';
import { SAMPLE_PROFILES } from '../../utils/sampleData';

interface HeroSectionProps {
  onStartAnalysis: () => void;
  onSeeSampleReport: (profileId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartAnalysis,
  onSeeSampleReport
}) => {
  const [selectedMockProfile, setSelectedMockProfile] = useState(SAMPLE_PROFILES[0]);

  return (
    <section className="relative pt-10 pb-24 md:pt-16 md:pb-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 radial-glow-top pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#830000]/25 border border-[#BC0202]/50 text-xs text-[#FFA8A8] backdrop-blur-md shadow-red-glow"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
            <span className="font-semibold text-white">Next-Gen Career Intelligence:</span>
            <span>Enterprise ATS Diagnostics &amp; Google X-Y-Z Rewriter</span>
          </motion.div>
        </div>

        {/* Hero Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-display leading-[1.08] mb-6">
            Your resume, <br />
            <span className="text-gradient-red drop-shadow-[0_0_35px_rgba(255,0,0,0.35)]">
              decoded.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            Upload your resume and get an instant, forensic breakdown. Uncover hidden ATS filters, map critical skill gaps, generate executive bullet rewrites, and receive a tailored 90-day career roadmap.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={onStartAnalysis}
              className="btn-primary w-full sm:w-auto px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-3 shadow-red-glow cursor-pointer"
            >
              <span>Analyze My Resume</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onSeeSampleReport(selectedMockProfile.id)}
              className="btn-secondary w-full sm:w-auto px-7 py-4 rounded-xl text-base font-medium flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <FileText className="w-5 h-5 text-[#FFA8A8]" />
              <span>See Sample Report ({selectedMockProfile.name.split(' ')[0]})</span>
            </button>
          </div>

          {/* Social Proof & Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF0000]" />
              <span>100% In-Session • Zero Data Stored</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FF0000]" />
              <span>Instant In-Browser Parsing (PDF &amp; DOCX)</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#FF0000]" />
              <span>Google X-Y-Z Bullet Formulas</span>
            </div>
          </div>
        </motion.div>

        {/* Animated Mock Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-14 max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-[#BC0202]/50 via-[#830000]/30 to-black/80 shadow-red-glow-lg">
            
            {/* Inner Dashboard Mock Container */}
            <div className="rounded-[14px] bg-black/90 backdrop-blur-2xl p-6 sm:p-8 border border-[#830000]/40 overflow-hidden">
              
              {/* Mock Top bar with Profile Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#830000]/30 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#BC0202]" />
                    <span className="w-3 h-3 rounded-full bg-[#830000]" />
                    <span className="w-3 h-3 rounded-full bg-gray-800" />
                  </div>
                  <span className="text-xs font-mono text-gray-300">
                    Live Dashboard Preview: <strong className="text-white">{selectedMockProfile.name}</strong>
                  </span>
                </div>

                {/* Profile Pill Switcher */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/70 border border-[#830000]/50 text-xs">
                  <span className="text-[10px] uppercase font-mono text-gray-500 px-2">Sample Candidate:</span>
                  {SAMPLE_PROFILES.map(p => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedMockProfile(p)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        selectedMockProfile.id === p.id 
                          ? 'bg-[#830000]/50 text-[#FFA8A8] border border-[#BC0202]' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {p.name.split(' ')[0]} ({p.analysis.overallScore})
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Grid Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMockProfile.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                  
                  {/* Gauge Col */}
                  <div className="lg:col-span-4 rounded-xl p-5 bg-gradient-to-b from-[#830000]/25 to-black border border-[#830000]/50 flex flex-col items-center justify-center text-center">
                    <div className="relative w-36 h-36 flex items-center justify-center mb-3">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-black/60"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          className="stroke-[#BC0202]"
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={(2 * Math.PI * 40) * (1 - selectedMockProfile.analysis.overallScore / 100)}
                          strokeLinecap="round"
                          style={{ filter: 'drop-shadow(0 0 8px #FF0000)' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-extrabold font-display text-white">
                          {selectedMockProfile.analysis.overallScore}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#FFA8A8]">
                          ATS Score
                        </span>
                      </div>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#830000]/40 text-[#FFA8A8] border border-[#BC0202]/40">
                      {selectedMockProfile.analysis.overallScore >= 90 ? 'Top 5% Elite Tier' : 'Top 15% Strong Match'}
                    </span>
                  </div>

                  {/* Breakdown Bars & Quick Highlights */}
                  <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
                    
                    {/* Progress Bars */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-black/60 border border-[#830000]/40">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">ATS Parsing</span>
                          <span className="text-white font-bold">{selectedMockProfile.analysis.breakdown.atsCompatibility}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-gray-900 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#830000] to-[#FF0000] rounded-full transition-all duration-700" 
                            style={{ width: `${selectedMockProfile.analysis.breakdown.atsCompatibility}%` }} 
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-black/60 border border-[#830000]/40">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Keyword Density</span>
                          <span className="text-white font-bold">{selectedMockProfile.analysis.breakdown.keywords}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-gray-900 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#830000] to-[#FF0000] rounded-full transition-all duration-700" 
                            style={{ width: `${selectedMockProfile.analysis.breakdown.keywords}%` }} 
                          />
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-black/60 border border-[#830000]/40 col-span-2 sm:col-span-1">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Impact Metrics</span>
                          <span className="text-white font-bold">{selectedMockProfile.analysis.breakdown.impactMetrics}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-gray-900 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#830000] to-[#FF0000] rounded-full transition-all duration-700" 
                            style={{ width: `${selectedMockProfile.analysis.breakdown.impactMetrics}%` }} 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Bullet Rewrite Preview */}
                    <div className="p-4 rounded-xl bg-black/70 border border-[#830000]/40">
                      <div className="flex items-center justify-between text-xs font-semibold mb-2">
                        <span className="text-[#FFA8A8] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#FF0000]" />
                          Google X-Y-Z Bullet Rewrite
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase tracking-wider">+35% Recruiter Signal</span>
                      </div>
                      <div className="space-y-1.5 text-xs">
                        <div className="p-2 rounded bg-black/50 text-gray-400 line-through text-[11px] border border-gray-900">
                          "{selectedMockProfile.analysis.bulletRewrites[0]?.before}"
                        </div>
                        <div className="p-2 rounded bg-[#830000]/20 text-white font-medium text-[11px] border border-[#BC0202]/30">
                          "{selectedMockProfile.analysis.bulletRewrites[0]?.after}"
                        </div>
                      </div>
                    </div>

                    {/* Skills chips */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] text-gray-400 mr-1">Skills Found:</span>
                      {selectedMockProfile.analysis.skillsFound.slice(0, 5).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-black/80 border border-gray-800 text-gray-300">
                          {s}
                        </span>
                      ))}
                      <span className="text-[11px] text-[#FFA8A8] ml-2 mr-1">Missing Gap:</span>
                      {selectedMockProfile.analysis.skillsMissing.slice(0, 3).map((s, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-[#830000]/30 border border-[#BC0202]/50 text-[#FFA8A8]">
                          + {s}
                        </span>
                      ))}
                    </div>

                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
