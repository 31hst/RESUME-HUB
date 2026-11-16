import React from 'react';
import { Sparkles, Key, FileText, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'analyzer' | 'dashboard';
  onNavigate: (view: 'landing' | 'analyzer' | 'dashboard') => void;
  onOpenApiKeyModal: () => void;
  hasCustomApiKey: boolean;
  onLoadSampleReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenApiKeyModal,
  hasCustomApiKey,
  onLoadSampleReport
}) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/70 border-b border-[#830000]/30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#BC0202] to-[#830000] border border-[#FF0000]/40 shadow-red-glow transition-transform group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-xl bg-[#FF0000] opacity-0 group-hover:opacity-20 blur-sm transition-opacity" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              Career<span className="text-[#FF0000]">Lens</span>
            </span>
            <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#FFA8A8] bg-[#830000]/30 border border-[#830000]/60 rounded">
              AI ATS
            </span>
          </div>
        </div>

        {/* Center Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <button 
            onClick={() => onNavigate('landing')} 
            className={`transition-colors hover:text-white ${currentView === 'landing' ? 'text-[#FF0000]' : ''}`}
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
          <button 
            onClick={onLoadSampleReport}
            className="transition-colors text-gray-300 hover:text-white flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#FFA8A8]" />
            Sample Report
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasCustomApiKey 
                ? 'bg-[#830000]/30 border-[#BC0202] text-[#FFA8A8]' 
                : 'bg-black/40 border-[#830000]/40 text-gray-400 hover:text-white hover:border-[#830000]'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {hasCustomApiKey ? 'Custom Key Active' : 'API Key'}
            </span>
            {hasCustomApiKey && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] animate-pulse" />
            )}
          </button>

          {/* Primary Action Button */}
          {currentView !== 'analyzer' ? (
            <button
              onClick={() => onNavigate('analyzer')}
              className="btn-primary flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide"
            >
              <span>Analyze Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onLoadSampleReport}
              className="btn-secondary flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium"
            >
              <FileText className="w-4 h-4 text-[#FFA8A8]" />
              <span>View Sample</span>
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
