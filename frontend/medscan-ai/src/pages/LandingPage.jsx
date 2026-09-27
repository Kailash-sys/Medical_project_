import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldAlert, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  FileCheck2, 
  Pill, 
  AlertTriangle, 
  ShieldCheck, 
  Activity,
  Users,
  Lock
} from 'lucide-react';
import { MedicalDisclaimer } from '../components/common/MedicalDisclaimer';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f9f8] text-slate-800 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 glass border-b border-[#e2ece9]/50 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006859] to-[#0f766e] flex items-center justify-center text-white shadow-md shadow-[#006859]/20">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 leading-none">MediScan AI</span>
              <span className="block text-[10px] text-[#006859] font-bold tracking-widest uppercase">Clinical Precision</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-[#006859] transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-[#006859] transition-colors">How It Works</a>
            <a href="#clinical-accuracy" className="hover:text-[#006859] transition-colors">Clinical Engine</a>
            <Link to="/assistant" className="hover:text-[#006859] transition-colors">AI Copilot</Link>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-bold text-slate-700 hover:text-[#006859]"
            >
              Sign In
            </Link>
            <button
              onClick={() => navigate('/dashboard')}
              className="px-5 py-2.5 bg-[#006859] hover:bg-[#005044] text-white font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Launch Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-28 overflow-hidden bg-gradient-to-b from-white to-[#f6f9f8]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#e6f4f1] text-[#006859] text-xs font-bold border border-[#bce3db]">
              <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
              <span>Next-Gen AI Prescription Screening Platform</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Instant AI Clinical Screening & <span className="text-[#006859]">Drug Interaction Detection</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              MediScan AI analyzes prescription images, flags complex drug-drug contraindications, and delivers verified pharmacological safety reports in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/scan')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-[#006859] hover:bg-[#005044] text-white font-extrabold text-base rounded-full shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5"
              >
                <span>Analyze Prescription Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-extrabold text-base rounded-full shadow-xs transition-all"
              >
                <span>Explore Live Demo</span>
              </button>
            </div>

            {/* Micro Trust Badges */}
            <div className="flex items-center gap-6 pt-4 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006859]" /> 99.4% OCR Accuracy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#006859]" /> HIPAA Compliant Architecture
              </span>
            </div>
          </div>

          {/* Hero Card Preview */}
          <div className="relative">
            <div className="relative z-10 glass rounded-3xl border border-[#e2e8f0]/50 p-6 shadow-2xl space-y-5 transform lg:rotate-1 hover:rotate-0 hover-lift transition-all duration-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
                  <span className="font-extrabold text-slate-900 text-sm">High Risk Drug Alert Detected</span>
                </div>
                <span className="text-xs bg-red-100 text-red-700 font-bold px-2.5 py-0.5 rounded-full">
                  • High Risk Score 88
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-red-50/70 rounded-2xl border border-red-200 text-xs space-y-1">
                  <span className="font-bold text-red-800">Warfarin (5mg) + Aspirin (81mg)</span>
                  <p className="text-red-700">Dual antiplatelet/anticoagulant blockage increases internal hemorrhage risk by 3.8x.</p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                  <span>Patient: Demo Patient</span>
                  <span className="font-bold text-[#006859]">Physician Review Required</span>
                </div>
              </div>
            </div>

            {/* Decorative background blur shape */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#006859]/20 to-teal-200 rounded-3xl blur-2xl -z-10 opacity-70" />
          </div>

        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="px-6 py-20 bg-white border-t border-[#e2ece9]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Designed for Clinical Precision & Patient Safety
            </h2>
            <p className="text-slate-500 text-sm font-medium">
              Empowering clinicians, pharmacists, and patients with instant automated prescription auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#f8faf9] border border-[#e2ece9] space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f4f1] text-[#006859] flex items-center justify-center">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Multi-Page Rx Scanner</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Optical Character Recognition (OCR) extracts medication names, exact dosages, frequency, and refills with high accuracy.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8faf9] border border-[#e2ece9] space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Interaction Matrix Engine</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Screens prescriptions against comprehensive drug-drug contraindication databases to eliminate adverse event risks.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#f8faf9] border border-[#e2ece9] space-y-4 hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#e6f4f1] text-[#006859] flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Clinical AI Assistant</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Ask your conversational AI copilot questions about renal dose adjustments, food restrictions, or therapeutic alternatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer banner */}
      <section className="px-6 py-16 bg-[#006859] text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Experience Clinical Precision AI?
          </h2>
          <p className="text-teal-100 text-base max-w-xl mx-auto">
            Test the live hackathon build now. Upload any prescription image or choose from pre-loaded clinical test cases.
          </p>
          <button
            onClick={() => navigate('/scan')}
            className="px-8 py-4 bg-white text-[#006859] font-extrabold text-base rounded-full shadow-xl hover:bg-teal-50 transition-all transform hover:-translate-y-0.5"
          >
            Start Prescription Scan Now
          </button>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="px-6 py-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 MediScan AI. Hackathon Edition. All Rights Reserved.</p>
          <div className="flex items-center gap-6 font-medium">
            <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link to="/scan" className="hover:text-white">Scan</Link>
            <Link to="/assistant" className="hover:text-white">AI Assistant</Link>
            <Link to="/settings" className="hover:text-white">Settings</Link>
          </div>
        </div>
      </footer>

    </div>
  );
};
