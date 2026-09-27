import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle, ShieldCheck, Cpu, Database, AlertOctagon } from 'lucide-react';

export const ScanProgress = ({ image, onComplete }) => {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Preprocessing Image & Enhancing OCR Contrast', icon: Cpu },
    { label: 'Extracting Rx Medication Names & Dosages', icon: Database },
    { label: 'Cross-referencing Drug-Drug Interaction Matrices', icon: ShieldCheck },
    { label: 'Calculating Patient Contraindication Risk Score', icon: AlertOctagon },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    const timer3 = setTimeout(() => setStep(3), 2400);
    const timer4 = setTimeout(() => {
      onComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="bg-white rounded-3xl border border-[#e2ece9] p-8 shadow-xl max-w-2xl mx-auto text-center space-y-6">
      {/* Animated Image Preview with Scan Line */}
      <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700 shadow-inner">
        <img
          src={image}
          alt="Scanning prescription"
          className="w-full h-full object-contain opacity-80"
        />
        {/* Animated Laser Scanning Line */}
        <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006859] to-transparent shadow-[0_0_15px_#006859] animate-laser" />
        <div className="absolute inset-0 bg-[#006859]/10 pointer-events-none" />
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-bold text-slate-800 flex items-center justify-center gap-2">
          <Loader2 className="w-6 h-6 text-[#006859] animate-spin" />
          AI Clinical Engine Processing...
        </h3>
        <p className="text-xs text-slate-500 font-medium">
          Analyzing active ingredients and clinical contraindications in real-time.
        </p>
      </div>

      {/* Checklist steps */}
      <div className="space-y-3 text-left bg-[#f8faf9] p-5 rounded-2xl border border-[#e2ece9]">
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isDone = idx < step;
          const isCurrent = idx === step;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                isDone
                  ? 'text-[#006859] font-semibold'
                  : isCurrent
                  ? 'text-slate-900 font-bold'
                  : 'text-slate-400 opacity-60'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle className="w-5 h-5 text-[#006859]" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-[#006859] animate-spin" />
                ) : (
                  <Icon className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
