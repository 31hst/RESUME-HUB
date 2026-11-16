import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ApiKeyModal } from './components/ApiKeyModal';
import { HeroSection } from './components/Landing/HeroSection';
import { HowItWorks } from './components/Landing/HowItWorks';
import { FeaturesGrid } from './components/Landing/FeaturesGrid';
import { ResumeUpload } from './components/Analyzer/ResumeUpload';
import { AnalyzingModal } from './components/Analyzer/AnalyzingModal';
import { DashboardHeader } from './components/Dashboard/DashboardHeader';
import { ScoreGauge } from './components/Dashboard/ScoreGauge';
import { ScoreBreakdown } from './components/Dashboard/ScoreBreakdown';
import { StrengthsWeaknesses } from './components/Dashboard/StrengthsWeaknesses';
import { SkillGapSection } from './components/Dashboard/SkillGapSection';
import { SectionFeedback } from './components/Dashboard/SectionFeedback';
import { BulletRewrites } from './components/Dashboard/BulletRewrites';
import { JobMatchSection } from './components/Dashboard/JobMatchSection';
import { CareerAdvisor } from './components/Dashboard/CareerAdvisor';
import { InterviewPrep } from './components/Dashboard/InterviewPrep';
import { ResumeAnalysis } from './types';
import { 
  SAMPLE_ANALYSIS_RESULT, 
  SAMPLE_TARGET_ROLE 
} from './utils/sampleData';
import { AlertCircle, X, Sparkles } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'analyzer' | 'dashboard'>('landing');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [targetRole, setTargetRole] = useState(SAMPLE_TARGET_ROLE);
  const [fileName, setFileName] = useState<string | undefined>('Resume_Document.pdf');
  const [hasCustomJd, setHasCustomJd] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Custom API Key state
  const [apiKey, setApiKey] = useState(() => {
    return sessionStorage.getItem('careerlens_gemini_key') || '';
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Save API key
  const handleSaveApiKey = (key: string) => {
    setApiKey(key);
    if (key) {
      sessionStorage.setItem('careerlens_gemini_key', key);
    } else {
      sessionStorage.removeItem('careerlens_gemini_key');
    }
  };

  const fireCelebrationConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#BC0202', '#FF0000', '#830000', '#FFA8A8', '#FFFFFF']
      });
    } catch {
      // Ignore if confetti fails
    }
  };

  // See Sample Report Handler
  const handleLoadSampleReport = () => {
    setAnalysisResult(SAMPLE_ANALYSIS_RESULT);
    setTargetRole(SAMPLE_TARGET_ROLE);
    setFileName('Alexander_Vance_Resume.pdf');
    setHasCustomJd(true);
    setCurrentView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(fireCelebrationConfetti, 400);
  };

  // Perform Analysis
  const handleAnalyze = async (data: {
    resumeText: string;
    targetRole: string;
    jobDescription: string;
    experienceLevel: string;
    fileName?: string;
  }) => {
    setIsAnalyzing(true);
    setErrorMsg(null);
    setTargetRole(data.targetRole);
    setFileName(data.fileName);
    setHasCustomJd(Boolean(data.jobDescription && data.jobDescription.length > 20));

    try {
      // Call Netlify serverless function or dev server proxy endpoint
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeText: data.resumeText,
          targetRole: data.targetRole,
          jobDescription: data.jobDescription,
          experienceLevel: data.experienceLevel,
          apiKey: apiKey || undefined,
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('GEMINI_API_KEY is not configured on the server. Please click "API Key" in the top bar to provide your key, or explore the live report with "See Sample Report".');
        }
        throw new Error(result.error || `Server responded with ${response.status}: Failed to analyze resume.`);
      }

      if (!result.data || typeof result.data !== 'object') {
        throw new Error('Malformed analysis payload returned by the AI engine.');
      }

      setAnalysisResult(result.data);
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(fireCelebrationConfetti, 400);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      setErrorMsg(err.message || 'An error occurred while analyzing the resume.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setCurrentView('analyzer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-[#BC0202] selection:text-white flex flex-col font-sans bg-grid-pattern relative">
      
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasCustomApiKey={Boolean(apiKey)}
        onLoadSampleReport={handleLoadSampleReport}
      />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={handleSaveApiKey}
      />

      {/* Loading Analysis Modal */}
      <AnalyzingModal isOpen={isAnalyzing} />

      {/* Error Floating Banner */}
      {errorMsg && (
        <div className="max-w-4xl mx-auto px-4 mt-6 w-full">
          <div className="p-4 rounded-xl bg-[#830000]/30 border border-[#BC0202] text-sm text-white flex items-start gap-3 shadow-red-glow">
            <AlertCircle className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
            <div className="flex-1 space-y-2">
              <p className="font-semibold">{errorMsg}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#BC0202] text-white hover:bg-[#FF0000] transition-colors"
                >
                  Enter Gemini API Key
                </button>
                <button
                  onClick={handleLoadSampleReport}
                  className="px-3 py-1 rounded-lg text-xs font-medium border border-[#830000] text-gray-200 hover:text-white hover:border-[#BC0202] transition-colors"
                >
                  Load Sample Report Instead
                </button>
              </div>
            </div>
            <button onClick={() => setErrorMsg(null)} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <>
            <HeroSection
              onStartAnalysis={() => {
                setCurrentView('analyzer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSeeSampleReport={handleLoadSampleReport}
            />
            <HowItWorks
              onStartAnalysis={() => {
                setCurrentView('analyzer');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
            <FeaturesGrid />
          </>
        )}

        {currentView === 'analyzer' && (
          <ResumeUpload
            onAnalyze={handleAnalyze}
            isLoading={isAnalyzing}
            onLoadSampleReport={handleLoadSampleReport}
          />
        )}

        {currentView === 'dashboard' && analysisResult && (
          <div id="resume-dashboard-report" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
            
            {/* Header with actions */}
            <DashboardHeader
              candidateRole={targetRole}
              fileName={fileName}
              score={analysisResult.overallScore}
              onReset={handleReset}
            />

            {/* Score row: Gauge (col-span-4) + Breakdown bars (col-span-8) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-4">
                <ScoreGauge score={analysisResult.overallScore} />
              </div>
              <div className="lg:col-span-8">
                <ScoreBreakdown breakdown={analysisResult.breakdown} />
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <StrengthsWeaknesses
              strengths={analysisResult.strengths}
              weaknesses={analysisResult.weaknesses}
            />

            {/* Skill Gap & Radar */}
            <SkillGapSection
              skillsFound={analysisResult.skillsFound}
              skillsMissing={analysisResult.skillsMissing}
              targetRole={targetRole}
            />

            {/* Section Feedback */}
            <SectionFeedback sectionFeedback={analysisResult.sectionFeedback} />

            {/* Bullet Rewrites */}
            <BulletRewrites bulletRewrites={analysisResult.bulletRewrites} />

            {/* Job Match against JD */}
            <JobMatchSection
              jobMatch={analysisResult.jobMatch}
              hasCustomJd={hasCustomJd}
            />

            {/* Career Advisor: Suggested roles, 30/60/90 roadmap, certifications, projects */}
            <CareerAdvisor
              suggestedRoles={analysisResult.suggestedRoles}
              roadmap={analysisResult.roadmap}
              certifications={analysisResult.certifications}
              projectIdeas={analysisResult.projectIdeas}
            />

            {/* Interview Prep: 8 tailored questions */}
            <InterviewPrep questions={analysisResult.interviewQuestions} />

          </div>
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={setCurrentView}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

    </div>
  );
}

export default App;
