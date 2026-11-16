import React, { useState } from 'react';
import { X, Key, ShieldCheck, ExternalLink, Check, AlertCircle } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) => {
  const [inputVal, setInputVal] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(inputVal.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleClear = () => {
    setInputVal('');
    onSaveApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="relative w-full max-w-md p-6 rounded-2xl glass-panel border border-[#830000]/60 shadow-red-glow-lg text-white"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-[#830000]/30 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#830000]/40 border border-[#BC0202]">
            <Key className="w-5 h-5 text-[#FF0000]" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-display text-white">Gemini API Key</h3>
            <p className="text-xs text-gray-400">Environment variable or direct key configuration</p>
          </div>
        </div>

        {/* Info Note */}
        <div className="p-3 mb-4 rounded-xl bg-black/60 border border-[#830000]/40 text-xs text-gray-300 space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FFA8A8] shrink-0 mt-0.5" />
            <p>
              In production, <span className="text-white font-medium">GEMINI_API_KEY</span> is read server-side by the Netlify function and is never exposed in browser network calls.
            </p>
          </div>
          <p className="text-gray-400 pl-6 text-[11px]">
            If running locally or testing without server env vars, you can paste your personal Google Gemini API key below. It will be stored in your browser session only.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
              API Key (gemini-2.5-flash / gemini-1.5)
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/80 border border-[#830000]/60 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#FF0000] focus:ring-1 focus:ring-[#FF0000] transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-white"
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noreferrer"
              className="text-[#FFA8A8] hover:text-[#FF0000] flex items-center gap-1 transition-colors underline"
            >
              Get a Gemini API Key from Google AI Studio
              <ExternalLink className="w-3 h-3" />
            </a>
            {apiKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                Remove
              </button>
            )}
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-[#830000]/40 text-gray-300 hover:bg-[#830000]/20 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save Key</span>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
