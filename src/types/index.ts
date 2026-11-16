export interface ScoreBreakdown {
  atsCompatibility: number;
  keywords: number;
  formatting: number;
  impactMetrics: number;
  clarity: number;
}

export interface SectionFeedback {
  summary: string;
  experience: string;
  projects: string;
  education: string;
  skills: string;
}

export interface BulletRewrite {
  before: string;
  after: string;
  reason?: string;
}

export interface JobMatch {
  score: number;
  missingKeywords: string[];
  matchedKeywords?: string[];
  summary?: string;
}

export interface SuggestedRole {
  title: string;
  match: number;
  reason: string;
}

export interface Roadmap {
  days30: string[];
  days60: string[];
  days90: string[];
}

export interface CertificationItem {
  name: string;
  provider?: string;
  relevance?: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
  techStack?: string[];
}

export interface InterviewQuestion {
  question: string;
  category?: string;
  tip?: string;
}

export interface ResumeAnalysis {
  overallScore: number;
  breakdown: ScoreBreakdown;
  strengths: string[];
  weaknesses: string[];
  skillsFound: string[];
  skillsMissing: string[];
  sectionFeedback: SectionFeedback;
  bulletRewrites: BulletRewrite[];
  jobMatch: JobMatch;
  suggestedRoles: SuggestedRole[];
  roadmap: Roadmap;
  certifications: (string | CertificationItem)[];
  projectIdeas: (string | ProjectIdea)[];
  interviewQuestions: (string | InterviewQuestion)[];
}

export interface AnalysisRequest {
  resumeText: string;
  targetRole?: string;
  jobDescription?: string;
  experienceLevel?: string;
  apiKey?: string;
}
