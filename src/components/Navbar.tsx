import React, { useState } from 'react';
import { ResumeHubLogo } from './ResumeHubLogo';
import { Sparkles, Key, FileText, ArrowRight, ChevronDown, Check, ShieldCheck } from 'lucide-react';
import { SAMPLE_PROFILES } from '../utils/sampleData';

interface NavbarProps {
  currentView: 'landing' | 'analyzer' | 'dashboard';
  onNavigate: (view: 'landing' | 'analyzer' | 'dashboard') => void;
  onOpenApiKeyModal: () => void;
  hasCustomApiKey: boolean;
  onSelectSampleProfile: (profileId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenApiKeyModal,
  hasCustomApiKey,
  onSelectSampleProfile
}) => {
  const [isSampleDropdownOpen, setIsSampleDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/85 border-b border-[#830000]/35 transition-all shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Live Engine Status */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => onNavigate('landing')}
            className="cursor-pointer"
          >
            <ResumeHubLogo size="md" />
          </div>

          {/* Engine Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 border border-[#830000]/40 text-[11px] text-gray-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF0000] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF0000]"></span>
            </span>
            <span className="font-mono text-gray-300">Gemini 2.5 AI Ready</span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => onNavigate('landing')} 
            className={`transition-colors hover:text-white ${currentView === 'landing' ? 'text-[#FF0000] font-semibold' : ''}`}
          >
            Overview
          </button>
          <a 
            href="#features" 
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors hover:text-white"
          >
            Features
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => {
              if (currentView !== 'landing') {
                e.preventDefault();
                onNavigate('landing');
                setTimeout(() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }
            }}
            className="transition-colors hover:text-white"
          >
            How It Works
          </a>

          {/* Sample Profiles Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsSampleDropdownOpen(!isSampleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold text-gray-300 hover:text-white bg-black/50 border border-[#830000]/40 hover:border-[#830000] transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-[#FFA8A8]" />
              <span>Sample Reports</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {isSampleDropdownOpen && (
              <div 
                className="absolute top-full mt-2 right-0 w-64 p-2 rounded-xl bg-black/95 border border-[#830000]/60 shadow-red-glow-lg z-50 backdrop-blur-2xl space-y-1"
                onMouseLeave={() => setIsSampleDropdownOpen(false)}
              >
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 border-b border-[#830000]/30 mb-1">
                  Select Verified Sample
                </div>
                {SAMPLE_PROFILES.map(profile => (
                  <button
                    key={profile.id}
                    onClick={() => {
                      onSelectSampleProfile(profile.id);
                      setIsSampleDropdownOpen(false);
                    }}
                    className="w-full text-left p-2 rounded-lg hover:bg-[#830000]/30 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-[#FFA8A8] transition-colors">
                        {profile.name}
                      </div>
                      <div className="text-[10px] text-gray-400 truncate max-w-[150px]">
                        {profile.targetRole}
                      </div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-[#FFA8A8] px-1.5 py-0.5 rounded bg-[#830000]/40 border border-[#BC0202]">
                      {profile.analysis.overallScore}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Active Key Indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-[#830000]/20 border border-[#830000]/50 text-[#FFA8A8] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
            <span className="hidden sm:inline">AI Key Connected</span>
          </div>

          {/* Primary Action Button */}
          {currentView !== 'analyzer' ? (
            <button
              onClick={() => onNavigate('analyzer')}
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide cursor-pointer"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onSelectSampleProfile('alexander-vance')}
              className="btn-secondary flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#FFA8A8]" />
              <span>Load Sample</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
