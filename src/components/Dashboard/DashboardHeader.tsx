import React, { useState } from 'react';
import { Download, RefreshCw, FileText, Check, Sparkles, Printer, Share2 } from 'lucide-react';
import { downloadReportAsPdf } from '../../utils/exportPdf';

interface DashboardHeaderProps {
  candidateRole: string;
  fileName?: string;
  score: number;
  onReset: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  candidateRole,
  fileName,
  score,
  onReset
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleDownload = async () => {
    try {
      setIsExporting(true);
      await downloadReportAsPdf('resume-dashboard-report', fileName?.replace(/\.[^/.]+$/, '') || 'CareerLens_Analysis');
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 2500);
    } catch (err) {
      console.error('PDF export error:', err);
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-8 border-b border-[#830000]/30 no-print">
      
      {/* Title & Metadata */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold uppercase tracking-wider bg-[#830000]/30 text-[#FFA8A8] border border-[#BC0202]/50">
            Analysis Complete
          </span>
          <span className="text-xs text-gray-400 font-mono">
            {fileName || 'Document parsed'} • Evaluated just now
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
          Executive ATS &amp; Career Diagnostic
        </h1>

        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Targeted against: <span className="text-white font-semibold">{candidateRole}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        
        {/* Analyze Another */}
        <button
          type="button"
          onClick={onReset}
          className="btn-secondary px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4 text-[#FFA8A8]" />
          <span>Analyze Another</span>
        </button>

        {/* Share */}
        <button
          type="button"
          onClick={handleShare}
          className="btn-secondary px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-1.5 cursor-pointer"
          title="Copy Link"
        >
          {copiedLink ? <Check className="w-4 h-4 text-[#FF0000]" /> : <Share2 className="w-4 h-4" />}
          <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
        </button>

        {/* Download PDF */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={isExporting}
          className="btn-primary px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-red-glow disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <span>Generating PDF...</span>
          ) : exportSuccess ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Report Downloaded!</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF Report</span>
            </>
          )}
        </button>

      </div>

    </div>
  );
};
