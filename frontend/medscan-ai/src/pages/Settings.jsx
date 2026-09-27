import React, { useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { Settings as SettingsIcon, Key, Sliders, Bell, Shield, Save, CheckCircle } from 'lucide-react';

export const Settings = () => {
  const { settings, setSettings } = useAnalysis();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
          <SettingsIcon className="w-8 h-8 text-[#006859]" />
          System Settings & API Configuration
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-1">
          Configure AI model engine, API keys for backend integration, and clinical workflow preferences.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-[#e2e8f0] p-8 shadow-xs space-y-8">
        
        {/* Hackathon API Integration Slot */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-[#006859]" />
            <h3 className="font-bold text-lg text-slate-900">AI Model & Custom API Endpoint</h3>
          </div>
          <p className="text-xs text-slate-500">
            Select an AI backend or input your hackathon team's custom API Key to connect live Gemini/OpenAI vision services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Active AI Provider / Model
              </label>
              <select
                value={settings.aiModel}
                onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006859]"
              >
                <option value="Gemini 1.5 Pro (Clinical Fine-Tuned)">Gemini 1.5 Pro (Clinical Vision)</option>
                <option value="OpenAI GPT-4o (Medical Vision)">OpenAI GPT-4o (Medical Vision)</option>
                <option value="Custom Hackathon Team API">Custom Hackathon Team API</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Custom API Key
              </label>
              <input
                type="password"
                value={settings.apiKey}
                onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                placeholder="sk-..."
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006859]"
              />
            </div>
          </div>
        </div>

        {/* Clinical Toggles */}
        <div className="space-y-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-[#006859]" />
            <h3 className="font-bold text-lg text-slate-900">Clinical Workflow Rules</h3>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-sm text-slate-800 block">Auto-Flag High Risk Prescriptions</span>
                <span className="text-xs text-slate-500">Automatically trigger urgent notifications when interaction score &gt; 75</span>
              </div>
              <input
                type="checkbox"
                checked={settings.autoFlagHighRisk}
                onChange={(e) => setSettings({ ...settings, autoFlagHighRisk: e.target.checked })}
                className="w-5 h-5 accent-[#006859]"
              />
            </label>

            <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 cursor-pointer">
              <div>
                <span className="font-bold text-sm text-slate-800 block">Enable Real-Time Clinical Notifications</span>
                <span className="text-xs text-slate-500">Show notification alerts in top header bar</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                className="w-5 h-5 accent-[#006859]"
              />
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-between pt-2">
          {saved && (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Settings updated successfully!
            </span>
          )}
          <button
            type="submit"
            className="ml-auto flex items-center gap-2 px-8 py-3 bg-[#006859] hover:bg-[#005044] text-white font-bold text-sm rounded-full shadow-md transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>

      </form>
    </div>
  );
};
