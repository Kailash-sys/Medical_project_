import React from 'react';
import { AlertTriangle, ShieldAlert, CheckCircle, FileText } from 'lucide-react';
import { RiskBadge } from '../components/common/RiskBadge';
import { useAnalysis } from '../context/AnalysisContext';

export const InteractionReports = () => {
  const { analyses } = useAnalysis();

  const flaggedAnalyses = analyses.filter(a => a.clinicalInteractions && a.clinicalInteractions.length > 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <AlertTriangle className="w-8 h-8 text-amber-600" />
          Clinical Interaction Reports
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-1">
          High-priority drug-drug contraindication matrix and therapeutic warnings.
        </p>
      </div>

      <div className="space-y-6">
        {flaggedAnalyses.map((item) => (
          <div key={item.id} className="bg-white rounded-3xl border border-red-200 p-6 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">
                  Patient: {item.patientName} ({item.patientId})
                </h3>
                <span className="text-xs text-slate-500">Scan Date: {item.date}</span>
              </div>
              <RiskBadge level={item.riskLevel} />
            </div>

            <div className="space-y-3">
              {item.clinicalInteractions.map((ci, idx) => (
                <div key={idx} className="p-4 bg-red-50/70 rounded-2xl border border-red-200 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-red-700 uppercase tracking-wider">{ci.severity}</span>
                    <span className="font-bold text-slate-700">{ci.drugs.join(' ↔ ')}</span>
                  </div>
                  <p className="text-slate-800">
                    <strong>Mechanism:</strong> {ci.mechanism}
                  </p>
                  <p className="text-slate-700 bg-white p-2.5 rounded-xl border border-red-100">
                    <strong>Action Plan:</strong> {ci.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
