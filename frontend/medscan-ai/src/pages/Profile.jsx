import React from 'react';
import { User, Mail, Shield, Building, Award, CheckCircle2 } from 'lucide-react';

export const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Physician Profile
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-1">
          Clinical credentials, active license, and hospital network affiliations.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full ring-4 ring-[#006859]/20 overflow-hidden shadow-lg shrink-0">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
              alt="Doctor Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-slate-900">Dr. Sarah Jenkins, MD</h2>
              <CheckCircle2 className="w-5 h-5 text-[#006859]" />
            </div>
            <p className="text-sm font-semibold text-[#006859]">Senior Clinical Pharmacologist</p>
            <p className="text-xs text-slate-500">St. Jude Medical Network • NPI #1982049182</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400">Department</span>
            <p className="font-bold text-slate-800">Clinical Pharmacology & Internal Medicine</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400">License Status</span>
            <p className="font-bold text-emerald-700 flex items-center gap-1">
              Active & Verified (Exp. 2028)
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400">Email Address</span>
            <p className="font-bold text-slate-800">s.jenkins@stjude-clinical.org</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold uppercase text-slate-400">Assigned Facility</span>
            <p className="font-bold text-slate-800">St. Jude Medical Center, Suite 400</p>
          </div>
        </div>
      </div>
    </div>
  );
};
