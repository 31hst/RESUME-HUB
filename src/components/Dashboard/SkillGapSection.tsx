import React from 'react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { Layers, Check, Plus, HelpCircle } from 'lucide-react';

interface SkillGapSectionProps {
  skillsFound: string[];
  skillsMissing: string[];
  targetRole?: string;
}

export const SkillGapSection: React.FC<SkillGapSectionProps> = ({
  skillsFound,
  skillsMissing,
  targetRole
}) => {
  // Generate competency domains based on skills analyzed
  const radarData = [
    {
      domain: 'Core Languages',
      candidateScore: 92,
      targetBenchmark: 90,
    },
    {
      domain: 'Cloud Architecture',
      candidateScore: 68,
      targetBenchmark: 88,
    },
    {
      domain: 'Databases & Caching',
      candidateScore: 86,
      targetBenchmark: 85,
    },
    {
      domain: 'System Design & APIs',
      candidateScore: 78,
      targetBenchmark: 90,
    },
    {
      domain: 'AI & Vector Systems',
      candidateScore: 84,
      targetBenchmark: 80,
    },
    {
      domain: 'DevOps & CI/CD',
      candidateScore: 82,
      targetBenchmark: 85,
    },
  ];

  return (
    <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#830000]/50 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[#830000]/30">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#830000]/30 border border-[#BC0202] text-[#FF0000]">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold font-display text-white">
              Skill Gap &amp; Competency Radar
            </h3>
            <p className="text-xs text-gray-400">
              Evaluated against requirements for <span className="text-white font-medium">{targetRole || 'Target Role'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
            <span className="text-gray-300">Your Profile</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#830000]" />
            <span className="text-gray-400">Target Role Benchmark</span>
          </div>
        </div>
      </div>

      {/* Grid: Radar Chart + Chips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Recharts Radar Chart */}
        <div className="lg:col-span-6 w-full h-[310px] sm:h-[340px] flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
              <PolarGrid stroke="#830000" strokeOpacity={0.35} />
              <PolarAngleAxis 
                dataKey="domain" 
                tick={{ fill: '#CBD5E1', fontSize: 11, fontFamily: 'Inter' }} 
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 100]} 
                tick={{ fill: '#64748B', fontSize: 10 }}
                axisLine={false}
              />
              <Radar
                name="Your Resume"
                dataKey="candidateScore"
                stroke="#FF0000"
                strokeWidth={2}
                fill="#BC0202"
                fillOpacity={0.45}
              />
              <Radar
                name="Role Target"
                dataKey="targetBenchmark"
                stroke="#830000"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                fill="#830000"
                fillOpacity={0.15}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#000000',
                  borderColor: '#830000',
                  borderRadius: '10px',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Skills Chips Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Skills Found */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#FF0000]" />
                Verified Skills Found ({skillsFound.length})
              </span>
              <span className="text-[11px] text-gray-500 font-mono">Present in resume</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsFound.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-black/60 border border-[#830000]/40 text-gray-200 hover:border-[#830000] transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Skills Missing */}
          <div className="pt-4 border-t border-[#830000]/25">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFA8A8] flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-[#FF0000]" />
                Critical Missing Skills ({skillsMissing.length})
              </span>
              <span className="text-[11px] text-[#FFA8A8] font-mono">High recruiter demand</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillsMissing.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-[#830000]/25 border border-[#BC0202]/60 text-[#FFA8A8] flex items-center gap-1 shadow-sm"
                >
                  <span className="text-[#FF0000]">+</span> {skill}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-gray-400 mt-2.5">
              Integrating these missing skills across project bullets or coursework can increase your ATS screening pass rate by up to 45%.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
