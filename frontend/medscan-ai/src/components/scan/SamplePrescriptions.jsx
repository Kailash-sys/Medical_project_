import React from 'react';
import { SAMPLE_PRESCRIPTIONS } from '../../data/sampleImages';
import { Sparkles, ArrowRight } from 'lucide-react';
import { RiskBadge } from '../common/RiskBadge';

export const SamplePrescriptions = ({ onSelectSample }) => {
  return (
    <div className="mt-8 pt-8 border-t border-[#e2ece9]">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#006859]" />
        <h4 className="font-bold text-slate-800 text-sm">
          Or Select a Sample Hackathon Prescription to Test Instantly:
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {SAMPLE_PRESCRIPTIONS.map((sample) => (
          <div
            key={sample.id}
            onClick={() => onSelectSample(sample)}
            className="bg-white rounded-2xl border border-[#e2e8f0] hover:border-[#006859] p-4 text-left cursor-pointer transition-all duration-200 hover:shadow-md group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-semibold text-slate-500">
                  {sample.patient}
                </span>
                <RiskBadge level={sample.riskLevel} />
              </div>
              <h5 className="font-bold text-slate-800 group-hover:text-[#006859] text-sm transition-colors">
                {sample.title}
              </h5>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                Prescriber: {sample.doctor}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006859]">
              <span>Use This Sample</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
