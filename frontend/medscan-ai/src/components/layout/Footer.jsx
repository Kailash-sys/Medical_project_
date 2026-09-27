import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="mt-auto border-t border-[#e2ece9] bg-[#f2f6f5]/50 px-6 py-4 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-slate-600">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Medical Disclaimer:</strong> MediScan AI is an auxiliary clinical decision tool. AI-generated analyses must be reviewed by a licensed medical professional before clinical action.
          </span>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-slate-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006859]" />
            HIPAA Compliant Standard
          </span>
          <span>v2.4 Clinical Precision</span>
        </div>
      </div>
    </footer>
  );
};
