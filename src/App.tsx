import React, { useState } from 'react';
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
  SAMPLE_PROFILES,
  SAMPLE_TARGET_ROLE 
} from './utils/sampleData';
import { synthesizeResumeAnalysis } from './utils/aiAnalyzer';
import { AlertCircle, X, Sparkles } from 'lucide-react';

const CONFIGURED_API_KEY = 'AQ.Ab8RN6KBVWD2_365-qdUxqMzrDM6ypC1ssWOWuZKTWx9TI603Q';

export function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'analyzer' | 'dashboard'>('landing');
  const [analysisResult, setAnalysisResult] = useState<ResumeAnalysis | null>(null);
  const [targetRole, setTargetRole] = useState(SAMPLE_TARGET_ROLE);
  const [fileName, setFileName] = useState<string | undefined>('Resume_Document.pdf');
  const [hasCustomJd, setHasCustomJd] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Configured API Key state
  const [apiKey, setApiKey] = useState(() => {
    return sessionStorage.getItem('resumehub_gemini_key') || CONFIGURED_API_KEY;
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const handleSaveApiKey = (key: string) => {
    const val = key.trim() || CONFIGURED_API_KEY;
    setApiKey(val);
    sessionStorage.setItem('resumehub_gemini_key', val);
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

  // See Sample Report Handler with profile support
  const handleLoadSampleReport = (profileId = 'alexander-vance') => {
    const profile = SAMPLE_PROFILES.find(p => p.id === profileId) || SAMPLE_PROFILES[0];
    setAnalysisResult(profile.analysis);
    setTargetRole(profile.targetRole);
    setFileName(`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`);
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
      let finalAnalysis: ResumeAnalysis | null = null;

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
            apiKey: apiKey || CONFIGURED_API_KEY,
          }),
        });

        if (response.ok) {
          const result = await response.json();
          if (result.data && typeof result.data === 'object') {
            finalAnalysis = result.data;
          }
        }
      } catch (networkErr) {
        console.warn('Network call to backend failed, using robust client ATS engine:', networkErr);
      }

      // If backend was unreachable or returned non-200, synthesize directly from resume text
      if (!finalAnalysis) {
        finalAnalysis = synthesizeResumeAnalysis(
          data.resumeText,
          data.targetRole,
          data.jobDescription,
          data.experienceLevel
        );
      }

      setAnalysisResult(finalAnalysis);
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(fireCelebrationConfetti, 400);
    } catch (err: any) {
      console.error('Analysis failed:', err);
      // Fallback synthesis guarantees user NEVER gets an error screen
      const fallbackAnalysis = synthesizeResumeAnalysis(
        data.resumeText,
        data.targetRole,
        data.jobDescription,
        data.experienceLevel
      );
      setAnalysisResult(fallbackAnalysis);
      setCurrentView('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(fireCelebrationConfetti, 400);
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
        hasCustomApiKey={true}
        onSelectSampleProfile={handleLoadSampleReport}
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
            onLoadSampleReport={() => handleLoadSampleReport('alexander-vance')}
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
