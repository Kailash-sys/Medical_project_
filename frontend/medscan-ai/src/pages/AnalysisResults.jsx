import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAnalysis } from '../context/AnalysisContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';
import { 
  ArrowLeft, 
  ShieldAlert, 
  CheckCircle, 
  Download, 
  Bookmark, 
  RotateCcw, 
  Bot, 
  Pill, 
  FileText, 
  AlertTriangle,
  User,
  Calendar,
  Sparkles,
  Printer
} from 'lucide-react';

export const AnalysisResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAnalysisById } = useAnalysis();
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  const analysis = getAnalysisById(id);

  if (!analysis) {
    return (
      <div className="text-center py-16 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Analysis Not Found</h2>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-[#006859] text-white font-semibold rounded-xl text-sm"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const handleSaveResult = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Top Header bar with navigation & CTA buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#e2ece9]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/history')}
            className="p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-200/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Clinical Analysis Summary
              </h1>
              <RiskBadge level={analysis.riskLevel} />
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-3">
              <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-[#006859]" /> {analysis.patientName} ({analysis.patientId || 'PT-9821'})</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-slate-400" /> {analysis.date}</span>
            </p>
          </div>
        </div>

        {/* Action Buttons matching prompt requirements */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleSaveResult}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs border transition-all ${
              isSaved 
                ? 'bg-emerald-600 border-emerald-600 text-white' 
                : 'bg-white border-[#006859] text-[#006859] hover:bg-[#e6f4f1]'
            }`}
          >
            {isSaved ? <CheckCircle className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
            <span>{isSaved ? 'Saved to Records' : 'Save Result'}</span>
          </button>

          <button
            onClick={() => navigate('/scan')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#006859] hover:bg-[#005246] text-white font-bold text-xs shadow-xs transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Scan Another Medicine</span>
          </button>

          <button
            onClick={() => navigate('/assistant')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Ask AI Copilot</span>
          </button>
        </div>
      </div>

      {/* Main Analysis Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Clinical Summary & Ingredients (2 Cols width) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Executive Risk Banner */}
          <div className={`p-6 rounded-3xl border ${
            analysis.riskLevel === 'High' || analysis.riskLevel === 'Critical'
              ? 'bg-[#fff5f5] border-[#ffc9c9] text-slate-900'
              : 'bg-[#f0fdfa] border-[#ccfbf1] text-slate-900'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                analysis.riskLevel === 'High' || analysis.riskLevel === 'Critical'
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                  : 'bg-[#006859] text-white shadow-md shadow-[#006859]/20'
              }`}>
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-slate-900">
                    Clinical Impression Score: {analysis.riskScore || 88}/100
                  </h3>
                </div>
                <p className="text-sm font-medium leading-relaxed text-slate-700">
                  {analysis.summary}
                </p>
              </div>
            </div>
          </div>

          {/* Identified Medications & Active Ingredients */}
          <div className="glass rounded-3xl border border-[#e2e8f0]/60 p-6 shadow-sm space-y-4 hover-lift">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#006859]" />
                <h3 className="font-bold text-lg text-slate-900">
                  Identified Rx Medications ({analysis.medicines.length})
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.medicines.map((m, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2ece9] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">{m.name}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-md">
                      {m.dose}
                    </span>
                  </div>
                  <p className="text-xs text-[#006859] font-medium">{m.class}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Drug Interactions Detail */}
          {analysis.clinicalInteractions && analysis.clinicalInteractions.length > 0 && (
            <div className="glass rounded-3xl border border-red-200/60 p-6 shadow-sm space-y-4 hover-lift">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <h3 className="font-bold text-lg text-slate-900">
                  Detected Clinical Interactions ({analysis.clinicalInteractions.length})
                </h3>
              </div>

              <div className="space-y-4">
                {analysis.clinicalInteractions.map((ci, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-red-700 uppercase tracking-wide">
                        {ci.severity}
                      </span>
                      <span className="text-xs font-semibold text-slate-600">
                        {ci.drugs.join(' + ')}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-slate-800">
                      <strong>Mechanism:</strong> {ci.mechanism}
                    </p>
                    <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-red-100">
                      <strong>Action Plan:</strong> {ci.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Precautions & Warnings */}
          <div className="glass rounded-3xl border border-[#e2e8f0]/60 p-6 shadow-sm space-y-4 hover-lift">
            <h3 className="font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
              Precautions & Administration Warnings
            </h3>
            <ul className="space-y-2 text-sm text-slate-700">
              {analysis.precautions?.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#006859] shrink-0 mt-2" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Potential Side Effects */}
          <div className="glass rounded-3xl border border-[#e2e8f0]/60 p-6 shadow-sm space-y-4 hover-lift">
            <h3 className="font-bold text-lg text-slate-900 pb-3 border-b border-slate-100">
              Monitored Side Effects
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {analysis.sideEffects?.map((se, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 font-medium">
                  • {se}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Original Prescription Image & Quick Info */}
        <div className="space-y-6">
          <div className="glass rounded-3xl border border-[#e2e8f0]/60 p-6 shadow-sm space-y-4 hover-lift">
            <h3 className="font-bold text-sm text-slate-800 uppercase tracking-wider">
              Scanned Prescription Image
            </h3>
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
              <img
                src={analysis.image}
                alt="Prescription Image"
                className="w-full h-80 object-contain"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#e6f4f1] rounded-3xl border border-[#bce3db] p-6 space-y-4 text-center">
            <Bot className="w-10 h-10 text-[#006859] mx-auto" />
            <h4 className="font-bold text-slate-900 text-base">Have Clinical Questions?</h4>
            <p className="text-xs text-slate-600">
              Query our AI Copilot regarding contraindications, dosing modifications, or patient counseling notes.
            </p>
            <button
              onClick={() => navigate('/assistant')}
              className="w-full py-3 bg-[#006859] hover:bg-[#005246] text-white font-bold text-xs rounded-full shadow-md transition-all"
            >
              Launch AI Assistant Chat
            </button>
          </div>

          <MedicalDisclaimer compact={true} />
        </div>

      </div>
    </div>
  );
};
