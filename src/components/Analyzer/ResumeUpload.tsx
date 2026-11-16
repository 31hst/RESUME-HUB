import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  FileText, 
  Sparkles, 
  AlertCircle, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { parseResumeFile, MAX_FILE_SIZE_BYTES } from '../../utils/resumeParser';
import { SAMPLE_PROFILES } from '../../utils/sampleData';

interface ResumeUploadProps {
  onAnalyze: (data: {
    resumeText: string;
    targetRole: string;
    jobDescription: string;
    experienceLevel: string;
    fileName?: string;
  }) => void;
  isLoading: boolean;
  onLoadSampleReport: () => void;
}

const POPULAR_ROLES = [
  "Senior Full Stack Engineer (Cloud & AI Platforms)",
  "Full Stack Software Engineer",
  "Senior Frontend Engineer (React / TypeScript)",
  "Backend Distributed Systems Engineer",
  "Staff AI / ML Systems Engineer",
  "DevOps / SRE / Cloud Platform Engineer",
  "Staff Software Architect",
  "Engineering Manager / Tech Lead",
  "Custom Role..."
];

const EXPERIENCE_LEVELS = [
  "Entry Level (0-2 years)",
  "Mid-Level (3-5 years)",
  "Senior Level (5-8 years)",
  "Staff / Principal (8+ years)",
  "Engineering Management"
];

export const ResumeUpload: React.FC<ResumeUploadProps> = ({
  onAnalyze,
  isLoading,
  onLoadSampleReport
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'paste'>('upload');
  const [resumeText, setResumeText] = useState('');
  const [fileDetails, setFileDetails] = useState<{ name: string; size: number } | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Form Fields
  const [selectedRole, setSelectedRole] = useState(POPULAR_ROLES[0]);
  const [customRole, setCustomRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(EXPERIENCE_LEVELS[2]);
  const [jobDescription, setJobDescription] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    setParseError(null);
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setParseError(`File size exceeds 5MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please upload a smaller file.`);
      return;
    }

    try {
      setIsParsing(true);
      const result = await parseResumeFile(file);
      setResumeText(result.text);
      setFileDetails({ name: result.fileName, size: result.fileSize });
    } catch (err: any) {
      setParseError(err.message || 'Failed to extract text from document.');
      setFileDetails(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleLoadSample = (profileIndex = 0) => {
    const profile = SAMPLE_PROFILES[profileIndex] || SAMPLE_PROFILES[0];
    setResumeText(profile.resumeText);
    setFileDetails({ name: `${profile.name.replace(/\s+/g, '_')}_Resume.pdf`, size: 1024 * 142 });
    setSelectedRole(profile.targetRole);
    setJobDescription(profile.jobDescription);
    setExperienceLevel(profile.experienceLevel);
    setActiveTab('upload');
    setParseError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setParseError(null);

    if (!resumeText || resumeText.trim().length < 50) {
      setParseError('Please upload a resume or paste at least 50 characters of resume text to analyze.');
      return;
    }

    const finalRole = selectedRole === 'Custom Role...' ? customRole.trim() : selectedRole;
    if (selectedRole === 'Custom Role...' && !finalRole) {
      setParseError('Please specify your custom target role title.');
      return;
    }

    onAnalyze({
      resumeText: resumeText.trim(),
      targetRole: finalRole || 'Software Engineer',
      jobDescription: jobDescription.trim(),
      experienceLevel,
      fileName: fileDetails?.name
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      
      {/* Title & Quick Demo Pill */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Resume <span className="text-gradient-red">Analyzer</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Benchmark against enterprise ATS algorithms and target job descriptions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-gray-500 font-mono hidden sm:inline">Pre-fill demo:</span>
          <button
            type="button"
            onClick={() => handleLoadSample(0)}
            className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FFA8A8] hover:text-white"
          >
            <UserCheck className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>Alexander (Full Stack)</span>
          </button>
          <button
            type="button"
            onClick={() => handleLoadSample(1)}
            className="btn-secondary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#FFA8A8] hover:text-white"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF0000]" />
            <span>Elena (Staff AI)</span>
          </button>
        </div>
      </div>

      {/* Parse Error Banner */}
      {parseError && (
        <div className="mb-6 p-4 rounded-xl bg-[#830000]/30 border border-[#BC0202] text-sm text-white flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#FF0000] shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-semibold text-white">Notice: </span>
            {parseError}
          </div>
          <button onClick={() => setParseError(null)} className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Analyzer Card */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/40 space-y-8 shadow-red-glow-lg">
        
        {/* Step 1: Resume Source */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#830000] text-white text-[11px] flex items-center justify-center font-mono">1</span>
              Resume Document
            </label>

            {/* Toggle Tabs */}
            <div className="flex p-0.5 rounded-lg bg-black/60 border border-[#830000]/40 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'upload' 
                    ? 'bg-[#BC0202] text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('paste')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  activeTab === 'paste' 
                    ? 'bg-[#BC0202] text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Paste Text
              </button>
            </div>
          </div>

          {activeTab === 'upload' ? (
            <div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,.txt"
                onChange={handleFileChange}
                className="hidden"
              />

              {fileDetails ? (
                /* Selected File Card */
                <div className="p-5 rounded-xl bg-black/70 border border-[#BC0202]/60 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-[#830000]/40 border border-[#BC0202] text-[#FF0000]">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{fileDetails.name}</p>
                      <p className="text-xs text-gray-400">
                        {(fileDetails.size / 1024).toFixed(1)} KB • In-browser parsed text ready
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-700 text-gray-300 hover:text-white hover:border-[#830000] transition-colors"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFileDetails(null);
                        setResumeText('');
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Drag and drop dropzone */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                    isDragging
                      ? 'border-[#FF0000] bg-[#830000]/25 shadow-red-glow'
                      : 'border-[#830000]/50 hover:border-[#BC0202] bg-black/40 hover:bg-[#830000]/10'
                  }`}
                >
                  <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#830000]/30 border border-[#830000] text-[#FF0000] mx-auto mb-4">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <p className="text-base font-semibold text-white mb-1">
                    {isParsing ? 'Parsing document in browser...' : 'Click to upload or drag & drop'}
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    PDF, DOCX, or TXT (Max file size: 5MB)
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-[#FFA8A8] bg-[#830000]/30 px-3 py-1 rounded-full border border-[#830000]/50">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>In-Browser text extraction • Zero cloud storage</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Paste Text Tab */
            <div>
              <textarea
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste the raw text of your resume here (Summary, Experience, Education, Skills)..."
                rows={9}
                className="w-full p-4 rounded-xl bg-black/80 border border-[#830000]/50 text-white placeholder-gray-600 text-xs sm:text-sm font-mono focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors leading-relaxed"
              />
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                <span>{resumeText.length} characters • ~{Math.round(resumeText.split(/\s+/).filter(Boolean).length)} words</span>
                {resumeText.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setResumeText('')}
                    className="text-gray-400 hover:text-red-400"
                  >
                    Clear Text
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Step 2: Target Role & Experience Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#830000]/30">
          
          {/* Target Role Dropdown */}
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-gray-200 flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#830000] text-white text-[11px] flex items-center justify-center font-mono">2</span>
              Target Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                className="w-full appearance-none px-3.5 py-3 rounded-xl bg-black/80 border border-[#830000]/60 text-white text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors cursor-pointer pr-10"
              >
                {POPULAR_ROLES.map(role => (
                  <option key={role} value={role} className="bg-black text-white">
                    {role}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>

            {selectedRole === 'Custom Role...' && (
              <input
                type="text"
                value={customRole}
                onChange={e => setCustomRole(e.target.value)}
                placeholder="e.g., Principal Distributed Systems Engineer"
                className="w-full mt-2.5 px-3.5 py-2.5 rounded-xl bg-black/80 border border-[#830000]/60 text-white text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors"
              />
            )}
          </div>

          {/* Experience Level */}
          <div>
            <label className="text-sm font-bold uppercase tracking-wider text-gray-200 flex items-center gap-2 mb-2">
              <span className="w-5 h-5 rounded-full bg-[#830000] text-white text-[11px] flex items-center justify-center font-mono">3</span>
              Experience Level
            </label>
            <div className="relative">
              <select
                value={experienceLevel}
                onChange={e => setExperienceLevel(e.target.value)}
                className="w-full appearance-none px-3.5 py-3 rounded-xl bg-black/80 border border-[#830000]/60 text-white text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors cursor-pointer pr-10"
              >
                {EXPERIENCE_LEVELS.map(lvl => (
                  <option key={lvl} value={lvl} className="bg-black text-white">
                    {lvl}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

        </div>

        {/* Step 3: Optional Job Description */}
        <div className="pt-4 border-t border-[#830000]/30">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold uppercase tracking-wider text-gray-200 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#830000] text-white text-[11px] flex items-center justify-center font-mono">4</span>
              Target Job Description <span className="text-xs text-gray-500 font-normal lowercase">(optional but recommended)</span>
            </label>
            {jobDescription && (
              <button
                type="button"
                onClick={() => setJobDescription('')}
                className="text-xs text-gray-400 hover:text-red-400"
              >
                Clear JD
              </button>
            )}
          </div>
          <textarea
            value={jobDescription}
            onChange={e => setJobDescription(e.target.value)}
            placeholder="Paste target job posting or requirements to calculate your exact Match % and uncover missing role-specific keywords..."
            rows={4}
            className="w-full p-3.5 rounded-xl bg-black/80 border border-[#830000]/50 text-white placeholder-gray-600 text-xs sm:text-sm font-sans focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors leading-relaxed"
          />
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#830000]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4 text-[#FF0000]" />
            <span>Strict In-Session Privacy • Data is discarded after analysis</span>
          </div>

          <button
            type="submit"
            disabled={isLoading || isParsing}
            className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2.5 shadow-red-glow disabled:opacity-50 cursor-pointer"
          >
            <span>{isLoading ? 'Analyzing with Gemini...' : 'Analyze Resume'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>

    </div>
  );
};
