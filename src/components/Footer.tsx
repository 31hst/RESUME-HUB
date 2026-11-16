import React from 'react';
import { ResumeHubLogo } from './ResumeHubLogo';
import { Shield, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: 'landing' | 'analyzer' | 'dashboard') => void;
  onOpenApiKeyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-[#830000]/30 bg-black/95 py-12 text-gray-400 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div 
              onClick={() => onNavigate('landing')}
              className="cursor-pointer inline-block"
            >
              <ResumeHubLogo size="md" />
            </div>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              Enterprise AI ATS resume deconstruction, skill gap telemetry, executive bullet rewrites, and 90-day career execution roadmaps.
            </p>

            <div className="p-3 rounded-xl bg-black/60 border border-[#830000]/40 max-w-md flex items-start gap-2.5 text-xs text-gray-300">
              <Shield className="w-4 h-4 text-[#FF0000] shrink-0 mt-0.5" />
              <p>
                <span className="font-semibold text-white">In-Session Privacy Guarantee:</span> Your uploaded document is parsed client-side in the browser. Text is evaluated in-session and never persisted or shared.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analyzer')} className="hover:text-white transition-colors">
                  Resume Analyzer
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features Breakdown
                </a>
              </li>
            </ul>
          </div>

          {/* Tech Stack Spec */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-3">
              Engineered With
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>• Gemini 2.5 Flash Intelligence</li>
              <li>• In-Browser pdf.js &amp; mammoth</li>
              <li>• Netlify Serverless Functions</li>
              <li>• React 18 &amp; Tailwind CSS</li>
              <li>• Framer Motion &amp; Recharts</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#830000]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Resume Hub. Designed for senior career mobility.</p>
          <div className="flex items-center gap-6">
            <span>Built with precision &amp; dark aesthetics</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
