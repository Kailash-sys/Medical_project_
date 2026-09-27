import React, { useState } from 'react';
import { MOCK_MEDICATIONS } from '../data/mockData';
import { Pill, Search, ShieldAlert, Plus, Filter, Info } from 'lucide-react';
import { RiskBadge } from '../components/common/RiskBadge';

export const Medications = () => {
  const [search, setSearch] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);

  const filteredMeds = MOCK_MEDICATIONS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.brandName.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Pill className="w-8 h-8 text-[#006859]" />
            Pharmacology Index
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Clinical drug reference database, risk classification, and therapeutic indices.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#e2e8f0] p-4 shadow-xs">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search active ingredient or brand name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#006859]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMeds.map((med, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-[#e2e8f0] hover:border-[#006859] p-6 shadow-xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {med.category}
                </span>
                <RiskBadge level={med.riskTier} />
              </div>

              <h3 className="font-extrabold text-lg text-slate-900">
                {med.name}
              </h3>
              <p className="text-xs font-semibold text-[#006859]">
                Brand: {med.brandName}
              </p>

              <p className="text-xs text-slate-600 leading-relaxed pt-2">
                {med.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#006859]">
              <span className="flex items-center gap-1"><Info className="w-4 h-4" /> Full Monograph</span>
              <span>Rx Tier 1</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
