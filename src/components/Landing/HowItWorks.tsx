import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Compass, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onStartAnalysis: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onStartAnalysis }) => {
  const steps = [
    {
      number: "01",
      title: "Upload or Paste",
      description: "Drop your PDF or DOCX file. Text is extracted entirely in your browser using pdf.js & mammoth with zero server-side storage.",
      icon: UploadCloud,
      highlight: "In-Browser Privacy",
    },
    {
      number: "02",
      title: "Gemini AI Analysis",
      description: "Evaluates your resume against corporate ATS filters, target role expectations, keyword density, and quantifiable business impact.",
      icon: Cpu,
      highlight: "Gemini 2.5 Flash",
    },
    {
      number: "03",
      title: "Get Roadmap & Rewrites",
      description: "Receive an actionable ATS score, missing keywords, Google X-Y-Z bullet rewrites, 8 interview questions, and a 90-day plan.",
      icon: Compass,
      highlight: "30/60/90-Day Strategy",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 border-t border-[#830000]/25 bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-[#FFA8A8] bg-[#830000]/20 border border-[#830000]/50 mb-4">
            Transparent Workflow
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white mb-4">
            How Resume Hub Works
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            From raw document to senior career execution in under 15 seconds.
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group relative p-8 rounded-2xl glass-panel border border-[#830000]/40 flex flex-col justify-between hover:border-[#BC0202] transition-all"
              >
                {/* Step Number Glow */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#830000] to-black border border-[#BC0202]/50 text-[#FF0000] shadow-red-glow">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-extrabold font-display text-gray-700 group-hover:text-[#FF0000] transition-colors">
                    {step.number}
                  </span>
                </div>

                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold text-[#FFA8A8] bg-[#830000]/30 border border-[#830000]/50 mb-3">
                    {step.highlight}
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#830000]/25 flex items-center text-xs font-semibold text-gray-500 group-hover:text-white transition-colors">
                  <span>Step {idx + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#FF0000] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 text-center">
          <button
            onClick={onStartAnalysis}
            className="btn-primary inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold shadow-red-glow"
          >
            <span>Start Free Resume Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
