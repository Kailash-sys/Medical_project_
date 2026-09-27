import React from 'react';
import { AlertCircle } from 'lucide-react';

export const MedicalDisclaimer = ({ compact = false }) => {
  return (
    <div className={`rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 ${compact ? 'p-3 text-xs' : 'p-4 text-sm'} flex items-start gap-3`}>
      <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
      <div>
        <h4 className="font-semibold text-amber-950">Clinical Disclaimer</h4>
        <p className="text-amber-800 mt-0.5 leading-relaxed">
          MediScan AI is an automated prescription & drug interaction screening system designed for qualified healthcare professionals and patient reference. Always consult a certified pharmacist or physician before altering drug regimens.
        </p>
      </div>
    </div>
  );
};
